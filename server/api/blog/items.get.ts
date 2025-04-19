let counter = 0

export default eventHandler(async (event) => {
  counter++
  // console.log(`server receive get blog items. counter: ${counter}`);

  return await queries().blogQueries.getAll()
})
