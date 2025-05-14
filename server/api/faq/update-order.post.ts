export default eventHandler(async (event): Promise<{ error?: string }> => {
  type ItemsMap = Record<string, number>

  const body = (await readBody(event)) as ItemsMap
  const ids = Object.keys(body).map(Number)
  const records = await queries().faqItems.getAllByIds(ids)
  for (const record of records) {
    const orderIndexBefore = record.order_index
    const orderIndexAfter = body[record.id]
    const indexChanged = orderIndexBefore !== orderIndexAfter

    if (indexChanged) await queries().faqItems.update(record.id, { order_index: orderIndexAfter })
  }

  return {}
})
