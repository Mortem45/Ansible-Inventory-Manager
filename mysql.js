const mysql = require('mysql2/promise');
const DBCONF = require('./db/mysqlConnection');


async function getInventory() {
  const connection = await mysql.createConnection(DBCONF.connection);
  try {
    const [rows] = await connection.query('select group_name, host from IM_inventary');
    return rows;
  } catch (err) {
    console.error('error:  ',err);
  } finally {
    await connection.end();
  }
}

async function getVars() {
  const connection = await mysql.createConnection(DBCONF.connection);
  try {
    const [rows] = await connection.query('select * from IM_vars_group');
    return rows;
  } catch (err) {
    console.error('error:  ',err);
  } finally {
    await connection.end();
  }
}

async function getChildGroups() {
  const connection = await mysql.createConnection(DBCONF.connection);
  try {
    const [rows] = await connection.query('select * from IM_child_group');
    return rows;
  } catch (err) {
    console.error('error:  ',err);
  } finally {
    await connection.end();
  }
}

module.exports = { getInventory, getVars, getChildGroups }