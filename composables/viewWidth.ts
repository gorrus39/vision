export const useViewWidth = () => {
  const width = ref<number>(0)

  const updateWidth = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    updateWidth()
    window.addEventListener("resize", updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener("resize", updateWidth)
  })

  return width
}
