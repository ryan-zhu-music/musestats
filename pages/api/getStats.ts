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
  fetch(req.body.link).then((response) => {
    response.text().then((data) => {
      if (data.includes("Page not found")) {
        res.status(404).json({
          link: req.body.link,
          response: "Not found",
        });
      } else {
        res.status(200).json({
          link: req.body.link,
          response: data,
        });
      }
    });
  });
}
