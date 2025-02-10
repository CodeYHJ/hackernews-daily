import getHeadlines from '../utils/getHeadlines.js'
test("getHeadlines", async () => {
  const headlines = await getHeadlines();
  console.log(headlines);
});
