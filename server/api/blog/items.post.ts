import { BlogItemSchema, BlogItemsSchema } from "~/types/all";
import { deleteBlobItem, putBlobItem } from "~/server/utils/helpers/blog";

function diffImages(backendImages: (string | null)[], frontendImages: (string | null)[]) {
  const added: { path: string; index: number }[] = [];
  const removed: { path: string; index: number }[] = [];
  const moved: { path: string; from: number; to: number }[] = [];
  const unchanged: { path: string; index: number }[] = [];

  const backendMap = new Map<string, number>(); // Сопоставляем пути с индексами
  backendImages.forEach((path, index) => {
    if (path) backendMap.set(path, index);
  });

  const seen = new Set<string>(); // Для отслеживания обработанных изображений

  frontendImages.forEach((path, index) => {
    if (!path) return; // Пропускаем `null`

    if (path.startsWith("blob")) {
      // Новый файл (его не было в бэке)
      added.push({ path, index });
    } else if (backendMap.has(path)) {
      const oldIndex = backendMap.get(path)!;
      if (oldIndex === index) {
        // Если индекс не изменился, считаем элемент неизменным
        unchanged.push({ path, index });
      } else {
        moved.push({ path, from: oldIndex, to: index });
      }
      seen.add(path); // Отмечаем как обработанный
    } else {
      // Новый путь (не blob, но его не было в базе)
      // этот case вроде не нужен
      added.push({ path, index });
    }
  });

  // Проверяем удаленные файлы (были в `backend`, но их нет во `frontend`)
  backendImages.forEach((path, index) => {
    if (path && !seen.has(path) && !frontendImages.includes(path)) {
      removed.push({ path, index });
    }
  });

  return { added, removed, moved, unchanged };
}

export default eventHandler(async (event) => {
  console.log("server receive");

  const sameFrontendItems = await convertDataFromFront(event);

  const { success, data, error } = BlogItemsSchema.safeParse(sameFrontendItems);
  if (success) {
    for (const frontend_item of data) {
      try {
        const db_item_raw = (await queries().blogQueries.getById(frontend_item.id))[0];
        const { success, data: db_data, error } = BlogItemSchema.safeParse(db_item_raw);
        let db_item = db_data;

        // удалено
        if (frontend_item.modified == "deleted" && db_item) {
          // удаляем блоб
          for (const pathname of db_item.image_paths) {
            if (pathname !== null) await deleteBlobItem(pathname);
          }
          // удаляем из бд
          await queries().blogQueries.delete(db_item.id);
        } else {
          // создаём в бд, если не было
          if (db_item == undefined) {
            const created_db_item = (
              await queries().blogQueries.create({ ...frontend_item, image_paths: [null, null, null, null, null] })
            )[0];
            const { success, data: created_data, error } = BlogItemSchema.safeParse(created_db_item);
            if (!created_data) throw new Error("unexpected situation, when saveParse created blog item");

            db_item = created_data;
          }

          const updated_image_paths: (string | null)[] = Array(5).fill(null);

          const { added, moved, removed, unchanged } = diffImages(db_item.image_paths, frontend_item.image_paths);

          for (const { path, index } of added) {
            const file = frontend_item.files![index] as File;
            const pathname = await putBlobItem(db_item!, file);
            updated_image_paths[index] = pathname;
          }

          // 🔹 Обрабатываем перемещения (moved) синхронно
          for (const { path, from, to } of moved) {
            updated_image_paths[to] = path;
          }

          // 🔹 Обрабатываем удаления (removed) синхронно
          for (const { path, index } of removed) {
            await deleteBlobItem(path);
          }

          for (const { path, index } of unchanged) {
            updated_image_paths[index] = path;
          }

          // ensure блоб
          // for (let i = 0; i < db_images_paths_sorted.length; i++) {
          //   const db_path = db_images_paths_sorted[i];
          //   const frontend_path = frontend_images_paths_origin[i];

          //   if (db_path === frontend_path) {
          //     // одинаковые null или путь
          //     updated_image_paths.push(db_path);
          //   } else if (db_path === null && frontend_path) {
          //     // был null стал путь
          //     const files = frontend_item.files;
          //     const file = files ? files[i] : null;
          //     if (!file) throw new Error("file must present");

          //     const pathname = await putBlobItem(db_item, file);
          //     updated_image_paths.push(pathname);
          //   } else if (frontend_path === null && db_path) {
          //     // был путь стал null
          //     await deleteBlobItem(db_path);
          //     updated_image_paths.push(null);
          //   } else if (frontend_path !== db_path) {
          //     // изменился путь
          //     if (!db_path) throw new Error("db_path must present");

          //     await deleteBlobItem(db_path);

          //     const files = frontend_item.files;
          //     const file = files ? files[i] : null;
          //     if (!file) throw new Error("file must present");

          //     const pathname = await putBlobItem(db_item, file);
          //     updated_image_paths.push(pathname);
          //   }
          // }

          // изменяем в бд
          const data = { ...frontend_item, image_paths: updated_image_paths, id: db_item.id };
          await queries().blogQueries.update(db_item.id, data);
        }
      } catch (error) {
        console.error(error);
        return { error: "Failed to insert data", details: error };
      }
    }

    // console.log("success");
    return { success: true };
  } else if (error) {
    // console.log("error", error);
    return { success: false };
  } else {
    // console.log("unknown situation");
    return { success: false };
  }
});
