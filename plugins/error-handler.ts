export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // handle error, e.g. report to a service
    console.log("error-handler 1", error);
  };

  // Also possible
  nuxtApp.hook("vue:error", (error, instance, info) => {
    // handle error, e.g. report to a service
    console.log("error-handler 2", error);
  });
});
