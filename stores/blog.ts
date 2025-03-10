import _ from "lodash";
import { defineStore } from "pinia";
import type { BlogItem } from "~/types/all";

const test_items: BlogItem[] = [
  {
    id: 1,
    published_at: new Date(),
    category: "Category 1",
    title: "Title 1",
    img: "img",
    sub_title: "Sub Title 1",
    text: "text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text ",
    priority: "High",
    order_index: 0,
  },
  {
    id: 2,
    published_at: new Date(),
    category: "Category 2",
    title: "Title 2",
    img: null,

    sub_title: "Sub Title 2",
    text: "text text text text text text text text text text text text text text text text ",
    priority: "High",
    order_index: 1,
  },
  {
    id: 3,
    published_at: new Date(),
    category: "Category 3",
    title: "Title 3",
    img: "img",

    sub_title: "Sub Title 3",
    text: "text text text text text text text text text text text text text text text text ",
    priority: "High",
    order_index: 2,
  },
  {
    id: 4,
    published_at: new Date(),
    category: "Category 4",
    title: "Title 4",
    img: null,

    sub_title: "Sub Title 4",
    text: "text text text text text text text text text text text text text text text text ",
    priority: "High",
    order_index: 3,
  },
];

export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    items_origin: _.cloneDeep(test_items), // изначальные, для отмены превью

    items_view: _.cloneDeep(test_items), // отображаются на основной части могут быть origin могут быть prview после админа
    items_admin: _.cloneDeep(test_items), // то, что в админке

    has_admin_changes: false,
    previewed: false,
  }),
  actions: {
    update_admin_items_order() {
      // изменяет порядок в массиве draggable
      // иногда, когда там же всё осталось.
      let hasChanges = false;

      this.items_admin.forEach((item, index) => {
        if (item.order_index !== index) {
          item.order_index = index;
          hasChanges = true;
        }
      });
      if (hasChanges) this.has_admin_changes = true;
    },
    create_admin_item(item: Ref<BlogItem>) {
      item.value.modified = "created";
      this.items_admin.unshift(item.value);
      this.update_admin_items_order();
    },
    update_admin_item(updatedItem: Ref<BlogItem>) {
      updatedItem.value.modified = "updated";

      this.items_admin = this.items_admin.map((item) =>
        item.id === updatedItem.value.id ? updatedItem.value : item,
      );

      this.has_admin_changes = true;
    },
    delete_admin_item(itemId: number | undefined) {
      this.items_admin = this.items_admin.map((item) => {
        if (item.id == itemId) item.modified = "deleted";
        return item;
      });
      this.has_admin_changes = true;
    },
    discard_admin_changes() {
      this.items_admin = _.cloneDeep(this.items_origin);
      this.items_view = _.cloneDeep(this.items_origin);
      this.has_admin_changes = false;
      this.previewed = false;
    },
    preview_changes() {
      this.items_view = _.cloneDeep(this.items_admin);
      this.previewed = true;
    },
    async post_admin_changes_to_remote() {
      const formData = new FormData();

      // Массив для хранения данных всех айтемов
      const itemsData: any[] = [];
      // Массив для хранения файлов
      const filesData: any[] = [];

      this.items_admin.forEach((item) => {
        // Создаём объект данных для каждого айтема
        const itemData = {
          id: item.id,
          published_at: item.published_at.toISOString(),
          category: item.category,
          title: item.title,
          text: item.text,
          priority: item.priority,
          order_index: item.order_index,
          sub_title: item.sub_title || null,
          modified: item.modified || null,
          img: item.img || null,
        };

        // Добавляем JSON-строку айтема в массив
        itemsData.push(JSON.stringify(itemData));

        // Если файл существует, добавляем его в массив файлов
        if (item.file) {
          filesData.push(item.file);
        } else {
          // Если файла нет, добавляем null (можно добавить пустое значение)
          filesData.push(null);
        }
      });

      // Добавляем оба массива в formData
      formData.append("items", JSON.stringify(itemsData)); // Передаем массив айтемов
      formData.append("files", JSON.stringify(filesData)); // Передаем массив файлов

      try {
        const response = await $fetch("/api/blog/items", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        return response as null | { success: true };
      } catch (error) {
        console.error(error);
      }
    },

    post_preview_changes_to_remote() {},
  },
  getters: {},
});
