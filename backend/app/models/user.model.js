const config = require('../config/db.config');
const pool = require('../db');
// const helper = require('../helper');

async function findOne(username) {
  
  const rows = await pool.query(
     "SELECT * FROM controller WHERE username = $1",
    [username]
  );
  
  return {
    'rows': rows.rows,
  }
}

async function create(username, password) {
  
  const rows = await pool.query(
     "INSERT INTO controller (username, password, status) values($1, $2, $3)",
    [username, password, 0]
  );
  
  return {
    'rows': rows,
  }
}

async function findAll() {
  
  const rows = await pool.query(
     "SELECT controller.username,controller.status FROM controller WHERE status < 2"
  );
  return {
    'rows': rows.rows,
  }
}

async function makeActive(username) {
  console.log(username);
  const rows = await pool.query(
     "UPDATE controller set status=1 where username = $1",
     [username]
  );
  return {
    'rows': rows.rows,
  }
}

async function revokeAccess(username){
  const rows = await pool.query(
    "UPDATE controller set status=0 where username = $1",
    [username]
 );
  return {
   'rows': rows.rows,
 }
}

async function addController(username, hostname) {
  console.log(hostname);
  for (i=0; i<hostname.length; i++){
  const rows = await pool.query(
    "INSERT into controllerhost (username, hostname) values ($1, $2)",
    [username, hostname[i]]
 );
}
 return {
   'rows': 'success',
 }
}

async function deleteController(username) {
  const rows = await pool.query(
    "DELETE from controller where username = $1",
    [username]
 );
 return {
   'rows': rows.rows,
 }
}

async function getHosts(username) {
  const rows = await pool.query(
    "SELECT hostname from host where hostname not in (SELECT hostname from controllerhost where username = $1)",
    [username]
 );
 return {
   'rows': rows.rows,
 }
}

async function getApps(username, hosts) {
  const rows = await pool.query(
    "SELECT appid from controllerapplication natural join application where username = $1 and hostname in ($2)",
    [username, hosts]
 );

 return {
   'rows': rows.rows,
 }
}

async function getMetrics(username) {
  const rows = await pool.query(
    "SELECT name from controllermetric where username = $1",
    [username]
 );
 // console.log(rows.rows)
 // const data = helper.emptyOrRows(rows);
 return {
   'rows': rows.rows,
 }
}

module.exports = {
  findOne,
  create, 
  findAll,
  makeActive,
  addController,
  deleteController,
  getHosts,
  getApps,
  getMetrics,
  revokeAccess,
}