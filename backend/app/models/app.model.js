const config = require('../config/db.config');
const pool = require('../db');

async function findOneApp(appid) {
    const rows = await pool.query(
        "select * from application where appid = $1",
        [appid]
    );

    return {
        'rows': rows.rows,
    }
}

async function findAllApp(hostname) {
    const rows = await pool.query(
        "select * from application where hostname = $1",
        [hostname]
    );

    return {
        'rows': rows.rows,
    }
}

async function addApp(appid, name, status, owner, hostname) {
    const rows = await pool.query(
        "insert into application values ($1, $2, $3, $4, $5)",
        [appid, name, status, owner, hostname]
    );

    return {
        'rows': rows,
    }
}

async function deleteApp(appid) {
    const rows = await pool.query(
        "delete from application where appid = $1",
        [appid]
    );

    return {
        'rows': rows,
    }
}

async function modifyApp(appid1, appid2, name, status, owner, hostname) {
    const rows = await pool.query(
        "update application set appid = $2, name = $3, status = $4, owner = $5, hostname = $6 where appid = $1",
        [appid1, appid2, name, status, owner, hostname]
    );

    return {
        'rows': rows,
    }
}

module.exports = {
    findOneApp,
    findAllApp,
    addApp,
    deleteApp,
    modifyApp
}