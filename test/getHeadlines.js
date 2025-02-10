const getHeadlines = require("../utils/getHeadlines");

test("getHeadlines", async () => {
  const headlines = await getHeadlines();
  console.log(headlines);
});
