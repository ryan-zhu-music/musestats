// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  link: string;
  response: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const link = req.body.link;
  if (link.startsWith("https://musescore.com/")) {
    fetch(link + "sheetmusic/?page=" + req.body.page)
      .then((response) => {
        response.text().then((data) => {
          if (data.includes("Page not found")) {
            res.status(404).json({
              link: link,
              response: "Not found",
            });
          } else {
            res.status(200).json({
              link: link,
              response: data,
            });
          }
        });
      })
      .catch((error) => {
        res.status(500).json({
          link: link,
          response: error,
        });
      });
  } else {
    res.status(400).json({
      link: link,
      response: "Invalid link",
    });
  }
}
