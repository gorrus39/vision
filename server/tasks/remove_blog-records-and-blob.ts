import { TaskEvent } from "nitropack";

export default defineTask({
  meta: {
    name: "remove blog records and blob",
  },
  async run() {
    const drizzle = queries().blogQueries;
    const allItems = await drizzle.getAll();
    const ids = allItems.map((item) => item.id);
    for (const id of ids) {
      await drizzle.delete(id);
    }
    return { result: "success" };
    // throw new Error("Function not implemented.");
  },
});
