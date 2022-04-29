const config = require('../config/db.config');
const pool = require('../db');

async function findAllMetric() {
    const rows = await pool.query(
        "select * from metric"
    );
    
    return {
        'rows': rows.rows,
    }
}

async function addMetric(name) {
    const rows = await pool.query(
        "insert into metric values($1)",
        [name]
    );

    return {
        'rows': rows,
    }
}

async function deleteMetric(name) {
    const rows = await pool.query(
        "delete from metric where name = $1",
        [name]
    );

    return {
        'rows': rows,
    }
}

module.exports = {
    findAllMetric,
    addMetric,
    deleteMetric
}