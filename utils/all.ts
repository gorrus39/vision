import type { CatalogAdmin, CatalogItem, Reward } from "~/types/catalog";
import { z } from "zod";
import { tagsSchema, type Reiting, type Tag } from "~/types/catalog";

const randElement = <T>(arr: T[]): T => {
  const length = arr.length;
  const index = Math.floor(Math.random() * length);
  if (index >= arr.length) console.error("randElement()", "arr.length", arr.length, "index", index);
  return arr[index];
};

const randNumber = ({ start, end }: { start: number; end: number }): number => {
  const amount = end - start;
  if (amount <= 0) return 0;

  const arr = Array(amount).map((_el, index) => start + index);

  return randElement(arr);
};
function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Январь — 0
  const yy = String(date.getFullYear()).slice(-2);

  return `${dd}.${mm}.${yy}`;
}

const viewLast3Reitings = (reitings: Reiting[]): string => {
  if (reitings.length === 0) return "-";

  const [firstValue, ...rest] = reitings.slice(0, 3).map((r) => String(r.value));

  let result = `<b>${firstValue}</b>`;
  if (rest) result += `, ${rest.join(", ")}`;
  if (reitings.length > 3) result += "...";

  return result;
};

const getTagsFromString = (string: string | undefined): Tag[] => {
  if (!string) return [];

  const json = JSON.parse(string);
  const { success, data: tags, error } = z.array(tagsSchema).safeParse(json);
  if (success) return tags;
  else return [];
};

const convertTagsToString = (tags: Tag[]): string => JSON.stringify(tags);

///////////////////////////////////////////////////////////////////////////////////////////////

const putBlobReward = async (db_item: Reward, file: File): Promise<string> => {
  const rand = Math.floor(Math.random() * 100);
  const res = await hubBlob().put(`${db_item.id}__${rand}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: "catalog-rewards",
  });
  return res.pathname;
};

const getRewardImageUrl = (imgPath: string) => {
  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath;

  // Формируем полный путь к изображению через API
  return `/api/blob/catalog-rewards/${imgPath}`;
};

////////////////////////////////////////////////////////////////////////////////////////////////
const putBlobCatalogItem = async (db_item: CatalogItem, file: File): Promise<string> => {
  const rand = Math.floor(Math.random() * 100);
  const res = await hubBlob().put(`${db_item.id}__${rand}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: "catalog-items",
  });
  return res.pathname;
};

const getCatalogItemImageUrl = (imgPath: string) => {
  // plug
  if (!imgPath) return;

  // из папки public для seed
  if (imgPath.startsWith("/")) return imgPath;

  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath;

  // Формируем полный путь к изображению через API
  return `/api/blob/catalog-items/${imgPath}`;
};

////////////////////////////////////////////////////////////////////////////////////////////////

const getCatalogAdminImageUrl = (imgPath: string) => {
  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath;

  // для прямых ссылок
  if (imgPath.includes("http")) return imgPath;

  // Формируем полный путь к изображению через API
  return `/api/blob/catalog-admins/${imgPath}`;
};
const putBlobCatalogAmin = async (db_item: CatalogAdmin, file: File): Promise<string> => {
  const rand = Math.floor(Math.random() * 100);
  const res = await hubBlob().put(`${db_item.id}__${rand}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: "catalog-admins",
  });
  return res.pathname;
};

export {
  formatDate,
  viewLast3Reitings,
  getTagsFromString,
  convertTagsToString,
  putBlobReward,
  getRewardImageUrl,
  getCatalogAdminImageUrl,
  putBlobCatalogAmin,
  getCatalogItemImageUrl,
  putBlobCatalogItem,
  randElement,
  randNumber,
};
