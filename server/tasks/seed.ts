import { BlogItem } from "~/types/all";
import { tables, useDrizzle } from "../utils/drizzle";
import { readFile } from "fs/promises";
import path from "path";

const getPriority = (): "High" | "Low" => (Math.random() < 0.5 ? "High" : "Low");

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task",
  },
  async run() {
    console.log("Running DB seed task...");

    // const fsp = await import("fs/promises");
    // const path = await import("path");

    const itemsAmount = 60;
    // const BATCH_SIZE = 10;
    // const blogItems: BlogItem[] = [];

    // const fileName = "5.jpg";
    // const filePath = path.join(process.cwd(), "public", fileName);
    // const file = await fsp.readFile(filePath);

    // const res = await hubBlob().put(fileName, file, {
    //   addRandomSuffix: false,
    //   prefix: "test-images",
    // });

    // const fileName = "5.jpeg";
    const fileNames = [1, 2, 3, 4, 5, 6].map((name) => `${name}.jpeg`);
    const pathNames: string[] = [];

    for (const fileName of fileNames) {
      const filePath = path.join(process.cwd(), "public/images-test", fileName);

      // Читаем файл
      const fileBuffer = await readFile(filePath);

      // Создаём Blob
      const blob = new Blob([fileBuffer], { type: "image/jpeg" });

      // Преобразуем Blob в File
      const file = new File([blob], fileName, { type: "image/jpeg" });

      // Отправляем в hubBlob
      const res = await hubBlob().put(`test-${fileName}`, file, {
        addRandomSuffix: false,
        prefix: "blog-items",
      });
      pathNames.push(res.pathname);
    }

    const drizzle = queries().blogQueries;

    const getAnyIndex = (arr: any[]) => {
      return Math.floor(Math.random() * arr.length);
    };

    for (let i = 0; i < itemsAmount; i++) {
      const image_paths = Array(5).fill(null);

      if (i % 2 == 0) image_paths[0] = pathNames[getAnyIndex(pathNames)];

      const item: BlogItem = {
        id: -1,
        published_at: new Date(),
        category: `Category ${i + 1}`,
        title: `Main TITLE ${i + 1}`,
        sub_title: `Sub Title Sub Title ${i + 1}`,
        text: "text Text ".repeat(10),
        priority: getPriority(),
        order_index: i + 1,
        image_paths,
        lang: "en",
      };

      drizzle.create(item);
      // blogItems.push(item);
    }

    // Разбиваем вставку на батчи
    // for (let i = 0; i < blogItems.length; i += BATCH_SIZE) {
    //   await useDrizzle()
    //     .insert(tables.blogItems)
    //     .values(blogItems.slice(i, i + BATCH_SIZE));
    // }

    return { result: "success" };
  },
});
