// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFoodTimeSheet } from "../../services/googleDriveApi";
import { insertFood, deleteAllFood } from "../../lib/queries/food";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  try {
    let response = await readFoodTimeSheet();
    await deleteAllFood();
    await insertFood(response);
    res
      .status(200)
      .json({ message: "Succesfully Imported Menu from Spreadsheet" });
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Error while trying to Import Menu from Spreadsheet",
    });
  }
}
