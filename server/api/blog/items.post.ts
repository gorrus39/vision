import { BlogItemsSchema } from "~/types/all";
import { handleBlobImg } from "~/server/utils/helpers/blog";

export default eventHandler(async (event) => {
  console.log("server receive");

  const sameFrontendItems = await convertDataFromFront(event);

  const { success, data, error } = BlogItemsSchema.safeParse(sameFrontendItems);
  if (success) {
    for (const recievedItem of data) {
      try {
        const db_item = (
          await queries().blogQueries.getById(recievedItem.id)
        )[0];

        const isItemDeleted = recievedItem.modified == "deleted";
        const isItemCreated = db_item === undefined;
        const isItemUpdated = !isItemCreated && !isItemDeleted;

        // const file = recievedItem.file
        // delete recievedItem.file;
        // delete recievedItem.modified;

        if (isItemDeleted) {
          await handleBlobImg(recievedItem, db_item, "deleted");
          await queries().blogQueries.delete(recievedItem.id);
        } else if (isItemCreated) {
          const created_db_item = (
            await queries().blogQueries.create(recievedItem)
          )[0];

          const img = await handleBlobImg(
            recievedItem,
            created_db_item,
            "created",
          );

          created_db_item.img = img;

          await queries().blogQueries.update(
            created_db_item.id,
            created_db_item,
          );
        } else if (isItemUpdated) {
          const img = await handleBlobImg(recievedItem, db_item, "updated");
          recievedItem.img = img;

          await queries().blogQueries.update(recievedItem.id, recievedItem);
        }
      } catch (error) {
        return { error: "Failed to insert data", details: error };
      }
    }

    console.log("success");
    return { success: true };
  } else if (error) {
    console.log("error", error);
    return { success: false };
  } else {
    console.log("unknown situation");
    return { success: false };
  }
});
