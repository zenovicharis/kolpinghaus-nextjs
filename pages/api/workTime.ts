import { NextApiRequest, NextApiResponse } from "next";
import { getWorkTime, updateWorkTime } from "../../lib/queries/workTime";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const workTime = await getWorkTime();
      if (workTime) {
        res.status(200).json(workTime);
      } else {
        res.status(404).json({ message: "Work time not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching work time", error });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, ...data } = req.body;
      await updateWorkTime(id, data);
      res.status(200).json({ message: "Work time updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating work time", error });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
