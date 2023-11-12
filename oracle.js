const oracledb = require('oracledb');
const DBCONF = require('./db/oracleConnection');

let connection;

async function getInventory() {
  try {
    connection = await oracledb.getConnection(DBCONF.connection);
    const result = await connection.execute(
      `select group_name, host from IM_inventary`,
      {},
      { autoCommit: true}
      );
      return result;
  } catch(err) {
    console.log('🚀 ~ file: sasdb.js:16 ~ getData ~ err:', err)
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch(err) {
        console.log('Error when closing the database connection: ', err);
      }
    }
  }
}

async function getVars() {
  try {
    connection = await oracledb.getConnection(DBCONF.connection);
    const result = await connection.execute(
      `select * from IM_vars_group`,
      {},
      { autoCommit: true}
      );
      return result;
  } catch(err) {
    console.log('🚀 ~ file: sasdb.js:38 ~ getVars ~ err:', err)
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch(err) {
        console.log('Error when closing the database connection: ', err);
      }
    }
  }
}

async function getChildGroups() {
  try {
    connection = await oracledb.getConnection(DBCONF.connection);
    const result = await connection.execute(
      `select * from IM_child_group`,
      {},
      { autoCommit: true}
    );
    return result;
  } catch(err) {
    console.log('🚀 ~ file: sasdb.js:38 ~ getVars ~ err:', err)
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch(err) {
        console.log('Error when closing the database connection: ', err);
      }
    }
  }
}

module.exports = { getChildGroups, getVars, getInventory }