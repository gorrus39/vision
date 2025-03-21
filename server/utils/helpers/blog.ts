import { readMultipartFormData, H3Event } from "h3";
import type { EventHandlerRequest } from "h3";
// import { Buffer } from "node:buffer";
import { Buffer } from "buffer";
import { BlogItem } from "~/types/all";

// export const convertDataFromFront = async (
//   event: H3Event<EventHandlerRequest>,
// ) => {
//   const formData = await readMultipartFormData(event);
//   if (!formData) return { error: "undefined FormData" };

//   let items: BlogItem[] = [];
//   let files: (Buffer | null)[] = [];
//   let fileNames: string[] = [];
//   let fileTypes: string[] = [];

//   formData.forEach((part) => {
//     if (!part.name) return; // ✅ Пропускаем, если name undefined

//     if (part.name === "items") {
//       items = JSON.parse(part.data.toString()); // ✅ Парсим JSON
//     } else if (part.name.startsWith("files[")) {
//       const match = part.name.match(/\d+/);
//       if (match) {
//         const index = parseInt(match[0], 10);
//         files[index] = part.data.toString() === "null" ? null : part.data;
//       }
//     } else if (part.name.startsWith("fileNames[")) {
//       const match = part.name.match(/\d+/);
//       if (match) {
//         const index = parseInt(match[0], 10);
//         fileNames[index] =
//           part.data.toString() === "null"
//             ? `file_${index}.bin`
//             : part.data.toString();
//       }
//     } else if (part.name.startsWith("fileTypes[")) {
//       const match = part.name.match(/\d+/);
//       if (match) {
//         const index = parseInt(match[0], 10);
//         fileTypes[index] =
//           part.data.toString() === "null"
//             ? "application/octet-stream"
//             : part.data.toString();
//       }
//     }
//   });

//   // ✅ Преобразуем Buffer в File с оригинальным именем и типом
//   const sameFrontendItems = items.map((item, index) => {
//     const fileBuffer = files[index];
//     const fileName = fileNames[index] || `file_${index}.bin`;
//     const fileType = fileTypes[index] || "application/octet-stream"; // ✅ Используем переданный MIME type

//     const fileObject =
//       fileBuffer instanceof Buffer
//         ? new File([fileBuffer], fileName, { type: fileType }) // ✅ Устанавливаем правильный MIME type
//         : null;

//     return { ...item, file: fileObject };
//   });

//   return sameFrontendItems;
// };

export const convertDataFromFront = async (event: H3Event<EventHandlerRequest>) => {
  const formData = await readMultipartFormData(event);
  if (!formData) return { error: "undefined FormData" };

  let items: BlogItem[] = [];
  let files: Record<number, Record<number, Buffer | null>> = {};
  let fileNames: Record<number, Record<number, string>> = {};
  let fileTypes: Record<number, Record<number, string>> = {};

  formData.forEach((part) => {
    if (!part.name) return;

    if (part.name === "items") {
      items = JSON.parse(part.data.toString());
    } else {
      const match = part.name.match(/item_index:(\d+)\]\[file_index:(\d+)/);
      if (match) {
        const itemIndex = parseInt(match[1], 10);
        const fileIndex = parseInt(match[2], 10);

        files[itemIndex] = files[itemIndex] || {};
        fileNames[itemIndex] = fileNames[itemIndex] || {};
        fileTypes[itemIndex] = fileTypes[itemIndex] || {};

        if (part.name.startsWith("files[")) {
          files[itemIndex][fileIndex] = part.data.toString() === "null" ? null : part.data;
        } else if (part.name.startsWith("fileNames[")) {
          fileNames[itemIndex][fileIndex] =
            part.data.toString() === "null" ? `file_${fileIndex}.bin` : part.data.toString();
        } else if (part.name.startsWith("fileTypes[")) {
          fileTypes[itemIndex][fileIndex] =
            part.data.toString() === "null" ? "application/octet-stream" : part.data.toString();
        }
      }
    }
  });

  return items.map((item, itemIndex) => {
    const itemFiles = files[itemIndex] || {};
    const itemFileNames = fileNames[itemIndex] || {};
    const itemFileTypes = fileTypes[itemIndex] || {};

    const processedFiles = Object.keys(itemFiles).map((fileIndex) => {
      const fileBuffer = itemFiles[Number(fileIndex)];
      const fileName = itemFileNames[Number(fileIndex)] || `file_${fileIndex}.bin`;
      const fileType = itemFileTypes[Number(fileIndex)] || "application/octet-stream";

      return fileBuffer instanceof Buffer ? new File([fileBuffer], fileName, { type: fileType }) : null;
    });

    return { ...item, files: processedFiles };
  });
};

export const getBlogImageUrl = (imgPath: string) => {
  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath;

  // Формируем полный путь к изображению через API
  return `/api/blob/blog-items/${imgPath}`;
};

// делает операции с хранилищем blob и возвращает image_paths(для записи в бд) или null
// export const handleBlobImg = async (
//   frontend_item: BlogItem,
//   db_item: BlogItem | undefined,
//   frontendAction: "deleted" | "updated" | "created",
// ): Promise<string | null> => {
//   if (frontendAction == "deleted" && db_item) {
//     const image_paths: string[] = JSON.parse(db_item.image_paths || "[]");
//     if (image_paths.length > 0) {
//       for (const path of image_paths) await hubBlob().del(path);
//     }
//     return null;
//   }

//   if (frontendAction == "created" && db_item) {
//     const frontendFiles = frontend_item.files;
//     if (frontendFiles) {
//       const file_paths: string[] = [];
//       for (let fileIndex = 0; fileIndex < frontendFiles.length; fileIndex++) {
//         const res = await hubBlob().put(
//           `${db_item.id}__${fileIndex}__${frontendFiles[fileIndex].name}`,
//           frontendFiles[fileIndex],
//           {
//             addRandomSuffix: false,
//             prefix: "blog-items",
//           },
//         );
//         file_paths.push(res.pathname);
//       }
//       return JSON.stringify(file_paths);
//     } else return null;
//   }

//   // await hubBlob().del(getBlogImageUrl(`${db_item.id}__${db_item.img}`));

//   // варианты update (4)
//   // фотка не поменялась(была или null или фотка)
//   // была, но стала null
//   // было null, стала фотка
//   // была одна, стала другая фотка
//   if (frontendAction == "updated" && db_item) {
//     // фотки не поменялись
//     if (db_item.image_paths == frontend_item.image_paths)
//       return db_item.image_paths;
//     // были, но что-то или все изменились на null
//     else if (db_item.img && frontend_item.img === null) {
//       await hubBlob().del(db_item.img);
//       return null;
//       // было null, стала фотка
//     } else if (db_item.img === null && frontend_item.img && file) {
//       const res = await hubBlob().put(`${db_item.id}__${file.name}`, file, {
//         addRandomSuffix: false,
//         prefix: "blog-items",
//       });
//       return res.pathname;
//       // была одна, стала другая фотка
//     } else if (
//       db_item.img &&
//       frontend_item.img &&
//       db_item.img !== frontend_item.img &&
//       file
//     ) {
//       await hubBlob().del(db_item.img);
//       const res = await hubBlob().put(`${db_item.id}__${file.name}`, file, {
//         addRandomSuffix: false,
//         prefix: "blog-items",
//       });
//       return res.pathname;
//     }
//   }

//   console.log("handleBlobImg - unexpected reaction");
//   return null;
// };

export const deleteBlobItem = async (pathname: string) => {
  try {
    await hubBlob().del(pathname);
  } catch (error) {}
};

// export const ensureDeleteBlobItem = async (pathname: string) => {
//   await hubBlob().del(pathname);
// };

export const putBlobItem = async (db_item: BlogItem, file: File): Promise<string> => {
  const rand = Math.floor(Math.random() * 100);
  const res = await hubBlob().put(`${db_item.id}__${rand}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: "blog-items",
  });
  return res.pathname;
};

// export const handleBlobImages = async (
//   frontend_item: BlogItem,
//   db_item: BlogItem,
//   frontendAction: "deleted" | "updated" | "created",
// ): Promise<StringifyedArray | null> => {
//   if (frontendAction === "deleted" && db_item) {
//     const image_paths: string[] = JSON.parse(db_item.image_paths || "[]");
//     if (image_paths.length > 0) {
//       for (const pathname of image_paths) deleteBlobItem(pathname);
//     }
//     return null;
//   }

//   if (frontendAction === "created" && db_item) {
//     const frontendFiles = frontend_item.files;
//     if (frontendFiles) {
//       const file_paths: string[] = [];
//       for (let fileIndex = 0; fileIndex < frontendFiles.length; fileIndex++) {
//         const pathname = await putImageToBlob(db_item, fileIndex, frontendFiles[fileIndex]);
//         file_paths.push(pathname);
//       }
//       return JSON.stringify(file_paths);
//     }
//     return null;
//   }

//   // update дудлирует логику добавления, удаления
//   if (frontendAction === "updated" && db_item) {
//     const frontendFiles = frontend_item.files;
//     const backendImagePaths: (string | null)[] = JSON.parse(db_item.image_paths || "[]");
//     let frontendImagePaths: (string | null)[] = JSON.parse(frontend_item.image_paths || "[]");
//     // добавляем до null, чтоб заполнить остатки
//     frontendImagePaths = frontendImagePaths.concat(Array(5).fill(null)).slice(0, 5);

//     // одинаковое
//     if (backendImagePaths == frontendImagePaths) return db_item.image_paths;

//     for (let i = 0; i < frontendImagePaths.length; i++) {
//       const fontPath = frontendImagePaths[i];
//     }

// const oldImagePaths: string[] = JSON.parse(db_item.image_paths || "[]");
// const newFiles = frontend_item.files || [];
// const newImagePaths: string[] = [];

// for (let fileIndex = 0; fileIndex < newFiles.length; fileIndex++) {
//   const file = newFiles[fileIndex];
//   if (file) {
//     const res = await hubBlob().put(
//       `${db_item.id}__${fileIndex}__${file.name}`,
//       file,
//       {
//         addRandomSuffix: false,
//         prefix: "blog-items",
//       },
//     );
//     newImagePaths.push(res.pathname);
//   }
// }

// // Удаляем старые файлы, если они не используются
// for (const oldPath of oldImagePaths) {
//   if (!newImagePaths.includes(oldPath)) {
//     await hubBlob().del(oldPath);
//   }
// }

// return JSON.stringify(newImagePaths);
//   }

//   console.log("handleBlobImg - unexpected reaction");
//   return null;
// };
