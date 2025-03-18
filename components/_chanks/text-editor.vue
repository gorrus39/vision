<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import TiptapStarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { onBeforeUnmount, ref, unref } from "vue";

const externalText = defineModel();

const editor = useEditor({
  content: "<p>default</p",
  // content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [
    TiptapStarterKit,
    Link.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: {
        class: "text-white underline",
      },
    }),
  ],
});

// Функция для вставки ссылки
const setLink = () => {
  const previousUrl = editor.value.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  if (url === null) return;
  if (url === "") {
    editor.value.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  editor.value
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run();
};

onBeforeUnmount(() => {
  unref(editor).destroy();
});

watch(
  () => editor.value?.getHTML(),
  () => {
    externalText.value = editor.value?.getHTML();
  },
);
</script>

<template>
  <div class="space-y-2 rounded-xl bg-gray-50">
    <div v-if="editor">
      <div class="flex flex-wrap gap-2">
        <!-- Добавить ссылку -->
        <UButton
          icon="i-heroicons-link"
          size="sm"
          color="primary"
          square
          variant="outline"
          @click="setLink"
        />

        <!-- Удалить ссылку -->
        <UButton
          icon="i-heroicons-link-slash"
          size="sm"
          color="red"
          square
          variant="outline"
          @click="editor.chain().focus().unsetLink().run()"
        />

        <!-- Жирный -->
        <UButton
          icon="i-heroicons-bold"
          size="sm"
          color="primary"
          square
          variant="outline"
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        />

        <!-- Курсив -->
        <UButton
          icon="i-heroicons-italic"
          size="sm"
          color="primary"
          square
          variant="outline"
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        />

        <!-- Зачеркнутый -->
        <UButton
          icon="i-heroicons-strikethrough"
          size="sm"
          color="primary"
          square
          variant="outline"
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        />

        <!-- Код
        <UButton
          icon="i-heroicons-code-bracket"
          size="sm"
          color="primary"
          square
          variant="outline"
          @click="editor.chain().focus().toggleCode().run()"
        /> -->

        <!-- Маркированный список
        <UButton
          icon="i-heroicons-list-bullet"
          size="sm"
          color="primary"
          square
          variant="outline"
          @click="editor.chain().focus().toggleBulletList().run()"
        /> -->

        <!-- Нумерованный список
        <UButton
          icon="i-heroicons-bars-3-bottom-left"
          size="sm"
          color="primary"
          square
          variant="outline"
          @click="editor.chain().focus().toggleOrderedList().run()"
        /> -->

        <!-- Блок кода
        <UButton
          icon="i-heroicons-code"
          size="sm"
          color="primary"
          square
          variant="outline"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        /> -->

        <!-- Цитата
        <UButton
          icon="i-heroicons-quote"
          size="sm"
          color="primary"
          square
          variant="outline"
          @click="editor.chain().focus().toggleBlockquote().run()"
        /> -->

        <!-- Горизонтальная линия -->
        <UButton
          icon="i-heroicons-minus"
          size="sm"
          color="primary"
          square
          variant="outline"
          @click="editor.chain().focus().setHorizontalRule().run()"
        />

        <!-- Жесткий разрыв -->
        <UButton
          icon="i-heroicons-arrow-down"
          size="sm"
          color="primary"
          square
          variant="outline"
          @click="editor.chain().focus().setHardBreak().run()"
        />

        <!-- Отменить -->
        <UButton
          icon="i-heroicons-arrow-uturn-left"
          size="sm"
          color="red"
          square
          variant="outline"
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
        />

        <!-- Повторить -->
        <UButton
          icon="i-heroicons-arrow-uturn-right"
          size="sm"
          color="green"
          square
          variant="outline"
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
        />
      </div>
    </div>
    <EditorContent class="rounded-lg bg-black" :editor="editor" />
  </div>
</template>

<style scoped>
/* Подсветка активных кнопок */
.is-active {
  background-color: #3b82f6;
  color: white;
}

/* .ProseMirror {
  padding: 10px;
} */

/* Применяем стили к ProseMirror внутри Tiptap */
::v-deep(.ProseMirror) {
  padding: 10px;
  /* border: 1px solid #ddd; */
  border-radius: 10px;
  color: white;
  outline: none;

  /* min-height: 150px; */
}

/* Стили для ссылок */
::v-deep(a) {
  color: #3b82f6;
  text-decoration: underline;
}
</style>
