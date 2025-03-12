export default eventHandler(async (event) => {
  console.log("server receive get blog items");

  return await queries().blogQueries.getAll();
});
