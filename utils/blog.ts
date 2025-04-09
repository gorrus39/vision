import { readMultipartFormData, H3Event } from "h3";
import type { EventHandlerRequest } from "h3";
import { Buffer } from "buffer";
import type { BlogItem } from "~/types/blog";

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

export const deleteBlobItem = async (pathname: string) => {
  try {
    await hubBlob().del(pathname);
  } catch (error) {}
};

export const putBlobItem = async (db_item: BlogItem, file: File): Promise<string> => {
  const rand = Math.floor(Math.random() * 100);
  const res = await hubBlob().put(`${db_item.id}__${rand}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: "blog-items",
  });
  return res.pathname;
};
export const get_hot_items_by_lang = (items_view: Ref<BlogItem[]>, locale: Ref<"ru" | "en" | "cn">) => {
  return items_view.value.filter((item) => {
    const isLocalDeletedByAdmin = item.modified === "deleted";
    const isHiPriority = item.priority == "High";
    const correspondingLang = locale.value == item.lang;
    return isHiPriority && !isLocalDeletedByAdmin && correspondingLang;
  });
};
export const get_items_by_lang = (items_view: Ref<BlogItem[]>, locale: Ref<"ru" | "en" | "cn">) => {
  return items_view.value.filter((item) => {
    const isLocalDeletedByAdmin = item.modified === "deleted";
    const isHiPriority = item.priority == "Low";
    const correspondingLang = locale.value == item.lang;
    return isHiPriority && !isLocalDeletedByAdmin && correspondingLang;
  });
};

export const get_all_items_by_lang = (items_view: Ref<BlogItem[]>, locale: Ref<"ru" | "en" | "cn">) => {
  return items_view.value.filter((item) => {
    const isLocalDeletedByAdmin = item.modified === "deleted";
    const correspondingLang = locale.value == item.lang;
    return !isLocalDeletedByAdmin && correspondingLang;
  });
};
