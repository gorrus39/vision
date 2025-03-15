import { BlogItem } from "~/types/all";
import { tables, useDrizzle } from "../utils/drizzle";

const getPriority = (): "High" | "Low" =>
  Math.random() < 0.5 ? "High" : "Low";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task",
  },
  async run() {
    console.log("Running DB seed task...");

    const itemsAmount = 30;
    const BATCH_SIZE = 10;
    const blogItems: BlogItem[] = [];

    for (let i = 0; i < itemsAmount; i++) {
      blogItems.push({
        // id: i + 1,
        published_at: new Date(),
        category: `Category ${i + 1}`,
        title: `Main TITLE ${i + 1}`,
        img: null,
        sub_title: `Sub Title Sub Title ${i + 1}`,
        text: "text Text ".repeat(10),
        priority: getPriority(),
        order_index: i + 1,
      });
    }

    // Разбиваем вставку на батчи
    for (let i = 0; i < blogItems.length; i += BATCH_SIZE) {
      await useDrizzle()
        .insert(tables.blogItems)
        .values(blogItems.slice(i, i + BATCH_SIZE));
    }

    return { result: "success" };
  },
});
