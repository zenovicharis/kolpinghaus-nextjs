// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readWorkTimeSheet } from "../../services/googleDriveApi";

import { insertWorkTime, deleteAllWorkTimes } from "../../lib/queries/workTime";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  try {
    let response = await readWorkTimeSheet();
    await deleteAllWorkTimes();
    await insertWorkTime(response);
    res
      .status(200)
      .json({ message: "Succesfully Imported Work Time from Spreadsheet" });
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Error while trying  to Import Work Time from Spreadsheet",
    });
  }
}
