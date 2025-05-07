import _ from "lodash"
import { defineStore } from "pinia"
import type { BlogItem } from "~/types/blog"

let counter = 0

export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    items_origin: [] as BlogItem[], //_.cloneDeep(test_items), // изначальные, для отмены превью

    items_view: [] as BlogItem[], //_.cloneDeep(test_items), // отображаются на основной части могут быть origin могут быть prview после админа
    items_admin: [] as BlogItem[], //_.cloneDeep(test_items), // то, что в админке

    has_admin_changes: false,
    previewed: false,
    initialized: false,
  }),
  actions: {
    async init() {
      try {
        const data = await $fetch("/api/blog/items")
        // const { data } = await useFetch("/api/blog/items");

        if (data) {
          const items = data.map((item) => ({
            ...item,
            published_at: new Date(item.published_at), // Конвертация в Date
            image_paths: JSON.parse(item.image_paths !== null ? item.image_paths : "[null,null,null,null,null]"),
            files: [null, null, null, null, null],
          })) as unknown as BlogItem[]
          this.items_origin = _.cloneDeep(items)
          this.items_view = _.cloneDeep(items)
          this.items_admin = _.cloneDeep(items)

          this.has_admin_changes = false
          this.previewed = false
          this.initialized = true
          counter++
          // console.log(`initialized blog-items. counter: ${counter}`);
        }
      } catch (error) {
        console.log("init state blog items ERROR", error)
      }
    },
    update_admin_items_order() {
      // update_admin_items_order(list: { [key: number]: number } = {}) {
      // изменяет порядок в массиве draggable
      // иногда, когда там же всё осталось.
      let hasChanges = false

      this.items_admin.forEach((item, index) => {
        // if (item.id in list) {
        if (item.order_index !== index) {
          item.order_index = index
          // item.order_index = list[item.id]; //index;
          hasChanges = true
        }
      })
      if (hasChanges) this.has_admin_changes = true
    },
    create_admin_item(item: Ref<BlogItem>) {
      item.value.modified = "created"
      this.items_admin.unshift(item.value)
      this.update_admin_items_order()
    },
    update_admin_item(updatedItem: Ref<BlogItem>) {
      updatedItem.value.modified = "updated"

      this.items_admin = this.items_admin.map((item) => (item.id === updatedItem.value.id ? updatedItem.value : item))

      this.has_admin_changes = true
    },
    delete_admin_item(itemId: number | undefined) {
      this.items_admin = this.items_admin.map((item) => {
        if (item.id == itemId) item.modified = "deleted"
        return item
      })
      this.has_admin_changes = true
    },
    discard_admin_changes() {
      this.items_admin = _.cloneDeep(this.items_origin)
      this.items_view = _.cloneDeep(this.items_origin)
      this.has_admin_changes = false
      this.previewed = false
    },
    preview_changes() {
      this.items_view = _.cloneDeep(this.items_admin)
      this.previewed = true
    },
    async post_admin_changes_to_remote(type_changes?: "preview-changes") {
      const formData = new FormData()

      // Массив для хранения данных всех айтемов
      const itemsData: any[] = []
      // Массив для хранения файлов

      const items = type_changes == "preview-changes" ? this.items_view : this.items_admin

      items.forEach((item, index) => {
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
          image_paths: item.image_paths || null,
          lang: item.lang,
        }

        // Добавляем JSON-строку айтема в массив
        itemsData.push(itemData)

        const itemFiles = item.files
        const itemIndex = index

        if (itemFiles && itemFiles.length > 0) {
          itemFiles.forEach((currentFile, fileIndex) => {
            if (currentFile) {
              formData.append(`files[item_index:${itemIndex}][file_index:${fileIndex}]`, currentFile)
              formData.append(`fileNames[item_index:${itemIndex}][file_index:${fileIndex}]`, currentFile.name)
              formData.append(`fileTypes[item_index:${itemIndex}][file_index:${fileIndex}]`, currentFile.type)
            } else {
              formData.append(`files[item_index:${itemIndex}][file_index:${fileIndex}]`, "null")
              formData.append(`fileNames[item_index:${itemIndex}][file_index:${fileIndex}]`, "null")
              formData.append(`fileTypes[item_index:${itemIndex}][file_index:${fileIndex}]`, "null")
            }
          })
        }
      })

      // Добавляем оба массива в formData
      formData.append("items", JSON.stringify(itemsData)) // Передаем массив айтемов

      try {
        const response = await $fetch("/api/blog/items", {
          method: "POST",
          body: formData,
        })
        // console.log(response);
        this.init()

        return response as null | { success: true }
      } catch (error) {
        console.error(error)
      }
    },

    async post_preview_changes_to_remote() {
      await this.post_admin_changes_to_remote("preview-changes")
    },
  },
  getters: {},
})

// Автоматический вызов init() при первом использовании стора
export const useInitializedBlogStore = async () => {
  const store = useBlogStore()
  if (!store.initialized) {
    await store.init()
  }
  return store
}
