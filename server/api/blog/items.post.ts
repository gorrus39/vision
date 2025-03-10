import { readMultipartFormData } from "h3";
import { useDrizzle } from "~/server/utils/drizzle";
import { BlogItemsSchema } from "~/types/all";
const db = useDrizzle();

export default eventHandler(async (event) => {
  console.log("server receive");

  // Считываем multipart form data
  const formData = await readMultipartFormData(event);

  if (!formData) return { error: "undefined FormData" };

  // Ищем и распарсим нужные поля
  let items: any[] = [];
  let files: any[] = [];

  // Проходим по всем частям формы и распределяем их по массивам
  formData.forEach((part) => {
    if (part.name === "items") {
      const jsonArray = JSON.parse(part.data.toString()); // Преобразуем строку в массив JSON строк

      // Преобразуем каждую строку в объект
      const parsedItems = jsonArray.map((item: string) => JSON.parse(item));

      console.log(parsedItems);

      // Добавляем каждый объект в items
      items.push(...parsedItems);
    } else if (part.name === "files") {
      // console.log(part);
      // Добавляем файл в массив файлов
      files.push(part.data); // Здесь нужно понимать, что это может быть файл или null
    }
  });
  // Теперь у нас есть два массива: items и files
  const itemsWithFiles = items.map((item, index) => {
    // Если файл есть (и он представлен как Buffer), создаем объект File
    const file = files[index];
    const fileObject =
      file instanceof Buffer
        ? new File([file], `file_${index}.bin`, {
            type: "application/octet-stream",
          })
        : null; // или null, если файла нет

    return {
      ...item,
      file: fileObject,
    };
  });

  const { success, data, error } = BlogItemsSchema.safeParse(itemsWithFiles);
  if (success) {
    //////////////////////////////////////////
    for (const item of data) {
      try {
        // Вставляем данные в БД
        // await addBlogItem(db, item);
        return { success: true };
      } catch (error) {
        return { error: "Failed to insert data", details: error };
      }
    }

    console.log("success");
    return { success: true };

    //////////////////////////////////////////////
  } else if (error) {
    console.log("error", error);
  } else {
    console.log("unknown situation");
  }

  // Дальше можете использовать itemsWithFiles для обработки данных (например, сохранения в базе)
});
