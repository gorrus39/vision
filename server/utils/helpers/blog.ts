import { readMultipartFormData, H3Event } from "h3";
import type { EventHandlerRequest } from "h3";
// import { Buffer } from "node:buffer";
import { Buffer } from "buffer";
import { BlogItem } from "~/types/all";

export const convertDataFromFront = async (
  event: H3Event<EventHandlerRequest>,
) => {
  const formData = await readMultipartFormData(event);
  if (!formData) return { error: "undefined FormData" };

  let items: BlogItem[] = [];
  let files: (Buffer | null)[] = [];
  let fileNames: string[] = [];
  let fileTypes: string[] = [];

  formData.forEach((part) => {
    if (!part.name) return; // ✅ Пропускаем, если name undefined

    if (part.name === "items") {
      items = JSON.parse(part.data.toString()); // ✅ Парсим JSON
    } else if (part.name.startsWith("files[")) {
      const match = part.name.match(/\d+/);
      if (match) {
        const index = parseInt(match[0], 10);
        files[index] = part.data.toString() === "null" ? null : part.data;
      }
    } else if (part.name.startsWith("fileNames[")) {
      const match = part.name.match(/\d+/);
      if (match) {
        const index = parseInt(match[0], 10);
        fileNames[index] =
          part.data.toString() === "null"
            ? `file_${index}.bin`
            : part.data.toString();
      }
    } else if (part.name.startsWith("fileTypes[")) {
      const match = part.name.match(/\d+/);
      if (match) {
        const index = parseInt(match[0], 10);
        fileTypes[index] =
          part.data.toString() === "null"
            ? "application/octet-stream"
            : part.data.toString();
      }
    }
  });

  // ✅ Преобразуем Buffer в File с оригинальным именем и типом
  const sameFrontendItems = items.map((item, index) => {
    const fileBuffer = files[index];
    const fileName = fileNames[index] || `file_${index}.bin`;
    const fileType = fileTypes[index] || "application/octet-stream"; // ✅ Используем переданный MIME type

    const fileObject =
      fileBuffer instanceof Buffer
        ? new File([fileBuffer], fileName, { type: fileType }) // ✅ Устанавливаем правильный MIME type
        : null;

    return { ...item, file: fileObject };
  });

  return sameFrontendItems;
};

export const getBlogImageUrl = (imgPath: string) => {
  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath;

  // Формируем полный путь к изображению через API
  return `/api/blob/blog-items/${imgPath}`;
};

export const handleBlobImg = async (
  frontend_item: BlogItem,
  db_item: BlogItem | undefined,
  frontendAction: "deleted" | "updated" | "created",
): Promise<string | null> => {
  const file = frontend_item.file;

  if (frontendAction == "deleted" && db_item && db_item.img) {
    await hubBlob().del(db_item.img);
    return null;
  }

  if (frontendAction == "created" && db_item) {
    if (file) {
      const res = await hubBlob().put(`${db_item.id}__${file.name}`, file, {
        addRandomSuffix: false,
        prefix: "blog-items",
      });
      return res.pathname;
    } else return null;
  }

  // await hubBlob().del(getBlogImageUrl(`${db_item.id}__${db_item.img}`));

  // варианты update (4)
  // фотка не поменялась(была или null или фотка)
  // была, но стала null
  // было null, стала фотка
  // была одна, стала другая фотка
  if (frontendAction == "updated" && db_item) {
    // фотка не поменялась
    if (db_item.img == frontend_item.img) return db_item.img;
    // была, но стала null
    else if (db_item.img && frontend_item.img === null) {
      await hubBlob().del(db_item.img);
      return null;
      // было null, стала фотка
    } else if (db_item.img === null && frontend_item.img && file) {
      const res = await hubBlob().put(`${db_item.id}__${file.name}`, file, {
        addRandomSuffix: false,
        prefix: "blog-items",
      });
      return res.pathname;
      // была одна, стала другая фотка
    } else if (
      db_item.img &&
      frontend_item.img &&
      db_item.img !== frontend_item.img &&
      file
    ) {
      await hubBlob().del(db_item.img);
      const res = await hubBlob().put(`${db_item.id}__${file.name}`, file, {
        addRandomSuffix: false,
        prefix: "blog-items",
      });
      return res.pathname;
    }
  }

  console.log("handleBlobImg - unexpected reaction");
  return null;
};
