import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

type ResponseData = {
  message: string;
};

const buildPath = () => path.join(process.cwd(), "src", "data", "data.json");
const extractData = (filepath: string) => {
  const jsonData = fs.readFileSync(filepath);
  const data = JSON.parse(jsonData.toString());
  return data;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;
  const filepath = buildPath();
  const { events_categories, allEvents } = extractData(filepath);

  //   If We Dont have Data in allEvents
  if (!allEvents) {
    res.status(404).json({ message: `No Data Found` });
  }
  //   When Request Method is POST
  if (method === "POST") {
    // add your code here
    const { email, eventID }: any = req.body;
    // Email Varification
    if (!email || (!email.includes("@") && !email.includes("."))) {
      res.status(422).json({ message: "Invalid Email Address" });
      return;
    }

    const newAllEvents = allEvents.map((events: any) => {
      if (events.id === eventID) {
        if (events.emails_registered.includes(email)) {
          res
            .status(409)
            .json({ message: `This Email has already been Resgistered` });
          return events;
        }
        return {
          ...events,
          emails_registered: [...events.emails_registered, email],
        };
      }
      return events;
    });

    // add data
    fs.writeFileSync(
      filepath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );

    res.status(200).json({
      message: `You have been Registered Successfully.`,
    });
  }
}
