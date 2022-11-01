const process = require("process");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const WORK_TIME_SHEET = process.env.WORK_TIME_SHEET;
const FOOD_SHEET = process.env.FOOD_SHEET;
const CREDENTIALS_PATH = process.env.CREDENTIALS_PATH;

function getGoogleSheet() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES,
  });
  return google.sheets({ version: "v4", auth });
}

export async function readWorkTimeSheet() {
  const sheets = getGoogleSheet();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: WORK_TIME_SHEET,
    range: "Öffnungszeiten!1:2",
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }
  const [keys, values] = rows;
  return Object.assign(...keys.map((k, i) => ({ [k]: values[i] })));
}

export async function readFoodTimeSheet() {
  const sheets = getGoogleSheet();

  const res = await sheets.spreadsheets.values.batchGet({
    majorDimension: "ROWS",
    spreadsheetId: FOOD_SHEET,
    ranges: [
      "Vorspeise!A:D",
      "Hauptgericht!A:D",
      "Spezialangebote!A:D",
      "Beilage!A:D",
      "Getrankenkarte!A:D",
      "Dessert!A:D",
    ],
  });

  return formatRows(res.data);
}

function formatRows(rows) {
  return rows.valueRanges.map((r) => {
    let typesObj = r.values.reduce((acc, a) => {
      let [name, price, info, type] = a;
      if (type == "Type") {
        return acc;
      }
      acc[type] = acc[type] || [];
      acc[type].push({ name, price, info });
      return acc;
    }, {});

    return {
      name: r.range.split("!")[0],
      types: Object.keys(typesObj).map((type) => {
        return { name: type, list: typesObj[type] };
      }),
    };
  });
}
