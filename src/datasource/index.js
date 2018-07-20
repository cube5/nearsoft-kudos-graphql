/**
 * So, the project currently supports mongo db OR a google spreadsheet as a datasource
 */

/**
 * This function is not necessary, I just wanted to log
 * to the console which ds is being used.
 */
function selectedDatasource() {
  const options = ["mongo", "graphcms", "spreadsheet"];
  const selected = options[1];
  console.info(`Using --- ${selected} --- as database.`);
  return selected;
}

// module.exports = require("./mongo");
// module.exports = require("./graphcms");
// module.exports = require("./spreadsheet");
module.exports = require(`./${selectedDatasource()}`);
