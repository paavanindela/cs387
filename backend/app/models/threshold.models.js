const config = require('../config/db.config');
const pool = require('../db');

async function allThreshold(username){
    const rows = await pool.query(
        "select * from threshold where username = $1",
        [username]
    );

    return {
        'rows': rows.rows,
    }
}

async function modifyThreshold(username, hostname, metricname, threshold) {
    const rows = await pool.query(
        "update threshold set threshold = $4 where username = $1, hostname = $2, metricname = $3",
        [username, hostname, metricname, threshold]
    );

    return {
        'rows': rows.rows,
    }
}

async function addThreshold(username, hostname, metricname, threshold) {
    const rows = await pool.query(
        "insert into threshold values($1, $2, $3, $4)",
        [username, hostname, metricname, threshold]
    );

    return {
        'rows': rows.rows,
    }
}

async function deleteThreshold(username, hostname, metricname) {
    const rows = await pool.query(
        "delete from threshold where username=$1, hostname=$2, metricname=$3",
        [username, hostname, metricname]
    );

    return {
        'rows': rows.rows,
    }
}

async function allMessage(username) {
    const rows = await pool.query(
        "select * from message where username = $1",
        [username]
    );

    return {
        'rows': rows.rows,
    }
}

module.exports = {
    allThreshold,
    modifyThreshold,
    deleteThreshold,
    addThreshold,
    allMessage
}