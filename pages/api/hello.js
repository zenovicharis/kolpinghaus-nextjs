// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFoodTimeSheet } from "../../services/googleDriveApi";
// import { insertFood, deleteAllFood } from "../../lib/queries/food";

export default async function handler(req, res) {
  try {
    let response = await readFoodTimeSheet();

    res.status(200).json({
      message: "Succesfully Imported Menu from Spreadsheet",
      data: response,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Error while trying to Import Menu from Spreadsheet",
    });
  }
}
