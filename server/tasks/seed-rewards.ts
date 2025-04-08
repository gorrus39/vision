import { readFile } from "fs/promises";
import path from "path";
import { faker } from "@faker-js/faker";
import { Reward } from "~/types/catalog";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task",
  },
  async run() {
    console.log("Running DB seed task...");

    const fileNames = ["1.png", "2.png", "1.svg", "2.svg"];

    const pathNames: string[] = [];

    for (const fileName of fileNames) {
      const filePath = path.join(process.cwd(), "public/images-test/catalog-rewards", fileName);
      const type_raw = fileName.split(".")[1];
      const type = type_raw == "png" ? "image/png" : "image/svg+xml";

      // Читаем файл
      const fileBuffer = await readFile(filePath);

      // Создаём Blob
      const blob = new Blob([fileBuffer], { type });

      // Преобразуем Blob в File
      const file = new File([blob], fileName, { type });

      // Отправляем в hubBlob
      const res = await hubBlob().put(`test-${fileName}`, file, {
        addRandomSuffix: false,
        prefix: "test-rewards",
      });
      pathNames.push(res.pathname);
    }

    const drizzle = queries().catalogRewards;

    for (let i = 0; i < pathNames.length; i++) {
      const item: Reward = {
        name: faker.company.name(),
        description: faker.lorem.lines({ min: 3, max: 10 }),
        img_path: pathNames[i],
      };

      drizzle.create(item);
    }

    return { result: "success" };
  },
});
