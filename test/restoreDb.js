const Importer = require("mysql-import");
require("dotenv").config();

const restoreDb = async () => {
    const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;

    const importer = new Importer({
        user: MYSQL_USER || 'root',
        password: MYSQL_PASSWORD || 'password',
        host: MYSQL_HOST || 'localhost',
      });

      await importer.import("./StoreManager.sql");

      await importer.disconnect();
};

module.exports = restoreDb;

if (!module.parent) {
    restoreDb();
}