import { CatalogAdmin, Reward } from "~/types/catalog";

///////////////////////////////////////////////////////////////////////////////////////////////

export const putBlobReward = async (db_item: Reward, file: File): Promise<string> => {
  const rand = Math.floor(Math.random() * 100);
  const res = await hubBlob().put(`${db_item.id}__${rand}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: "catalog-rewards",
  });
  return res.pathname;
};

export const getRewardImageUrl = (imgPath: string) => {
  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath;

  // Формируем полный путь к изображению через API
  return `/api/blob/catalog-rewards/${imgPath}`;
};

////////////////////////////////////////////////////////////////////////////////////////////////

export const getCatalogAdminImageUrl = (imgPath: string) => {
  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath;

  // для прямых ссылок
  if (imgPath.includes("http")) return imgPath;

  // Формируем полный путь к изображению через API
  return `/api/blob/catalog-admins/${imgPath}`;
};
export const putBlobCatalogAmin = async (db_item: CatalogAdmin, file: File): Promise<string> => {
  const rand = Math.floor(Math.random() * 100);
  const res = await hubBlob().put(`${db_item.id}__${rand}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: "catalog-admins",
  });
  return res.pathname;
};
