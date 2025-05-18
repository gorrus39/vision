export default defineEventHandler(async (event) => {
  const method = event.method.toUpperCase()
  const session = await getUserSession(event)

  if (method !== "GET" && !("user" in session)) throw new Error("Unauthorized client try make sequre request")
})
