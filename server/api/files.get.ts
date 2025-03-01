export default eventHandler(async () => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!___________________________");
  const { blobs } = await hubBlob().list({ limit: 10 });

  return blobs;
});
