const { google } = require("googleapis");

const RANGE = "kudos!A2:F";
const API_KEY = process.env.SPREADSHEET_API_KEY;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

const sheets = google.sheets({ version: "v4", auth: API_KEY });

async function save(kudo) {
  const { id, from, to, message, imgUrl, createdAt } = kudo;
  const values = [[id, from, to, message, imgUrl, createdAt]];

  try {
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "RAW",
      resource: { values }
    });
    // console.log("addKudo res -----------> ", res);
    return kudo;
  } catch (err) {
    console.error("Error in addKudo: ", err);
  }
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit?usp=sharing
 *
 */
async function find(filters) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE
    });

    const { data } = res;

    const rows = data.values;

    if (rows.length) {
      const kudos = rows.map(row => ({
        id: row[0],
        from: row[1],
        to: row[2],
        message: row[3],
        imgUrl: row[4],
        createdAt: row[5]
      }));

      return kudos;
    } else {
      console.log("No data found.");
      return [];
    }
  } catch (err) {
    console.error("The API returned an error:", err);
  }
}

module.exports = {
  find,
  save
};
