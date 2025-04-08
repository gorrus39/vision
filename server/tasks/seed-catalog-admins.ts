import { readFile } from "fs/promises";
import path from "path";
import { faker } from "@faker-js/faker";
import { CatalogAdmin, Reward } from "~/types/catalog";
import { array } from "zod";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task",
  },
  async run() {
    console.log("Running DB seed task...");

    const amountRecords = 10;

    const path =
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
    const pathNames: string[] = Array(amountRecords).fill(path);

    const drizzle = queries().catalogAdmin;

    for (let i = 0; i < pathNames.length; i++) {
      const item: CatalogAdmin = {
        name: faker.company.name(),
        description: faker.lorem.lines({ min: 3, max: 10 }),
        avatar_path: pathNames[i],
        link: pathNames[i],
      };

      drizzle.create(item);
    }

    return { result: "success" };
  },
});
