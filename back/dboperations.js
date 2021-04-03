var config = require("./dbconfig");
const sql = require("mssql");

async function getTipo() {
  try {
    let pool = await sql.connect(config);
    let personalBudget = await pool
      .request()
      .query("SELECT * from movimientos");
    return personalBudget.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getTipo: getTipo,
};
