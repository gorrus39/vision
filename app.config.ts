export default defineAppConfig({
  ui: {
    divider: {
      border: {
        base: "dark:border-white border-white",
        size: {
          horizontal: {
            custom: "border-M-t md:border-D-t",
          },
        },
      },
      default: {
        size: "custom",
      },
    },
  },
});
