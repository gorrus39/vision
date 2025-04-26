export default eventHandler(async (event) => {
  const { pathname } = getRouterParams(event);

  const res = await hubBlob().serve(event, pathname);

  return res;
});
