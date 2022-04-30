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

async function findAllApp(hnamelist) {
    query_str = "select * from application where hostname in (";
    for(i=0;i<hnamelist.length-1;i++){
        query_str = query_str.concat("'", hnamelist[i], "',");
    }
    query_str = query_str.concat("'", hnamelist[hnamelist.length-1], "')");
    const rows = await pool.query(query_str);

    return {
        'rows': rows.rows,
    }
}

async function addApp( name, status, owner, hostname) {
    const rows = await pool.query(
        "insert into application values (DEFAULT ,$1, $2, $3, $4)",
        [name, status, owner, hostname]
    );

    return {
        'rows': rows,
    }
}

async function getAllApp() {
    const rows = await pool.query(
        "select * from application"
    );

    return {
        'rows': rows.rows,
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
    modifyApp,
    getAllApp,
}