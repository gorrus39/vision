export default defineAppConfig({
  ui: {
    divider: {
      border: {
        base: "dark:border-white border-white",
        size: {
          horizontal: {
            mobile: "border-M-t",
            xl: "border-D-t",
          },
        },
      },
      default: {
        size: "mobile",
      },
    },
  },
});
