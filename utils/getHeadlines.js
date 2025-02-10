import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
export const getHeadlines = async (date) => {
  console.log("start fetching headlines");
  try {
    const res = await axios.get(`https://hnrss.org/newest?points=100`);
    const xmlData = res.data;
    if (xmlData) {
      const parser = new XMLParser();
      let rssData = parser.parse(xmlData);
      const {
        rss: {
          channel: { item = [] },
        },
      } = rssData;
      const contents = item
        .map((i, index) => {
          const { comments, title, link } = i;
          return `${index + 1
            }. **[${title}](${link})** | [comments](${comments})

`;
        })
        .join("");
      return contents;
    }
    throw new Error("请求异常");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

