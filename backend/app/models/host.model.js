const config = require('../config/db.config');
const pool = require('../db');

async function findOneHost(hostname) {
    const rows = await pool.query(
        "select * from host where hostname = $1",
        [hostname]
    );

    return {
        'rows': rows.rows,
    }
}

async function findAllHost() {
    const rows = await pool.query(
        "select * from host"
    );

    return {
        'rows': rows.rows,
    }
}

async function addHost(hostname, ipaddress, macaddress, ostype, influx) {
    console.log(influx===true);
    const rows = await pool.query(
        "insert into host values ($1, $2, $3, $4, $5)",
        [hostname, ipaddress, macaddress, ostype, influx]
    );

    return {
        'rows': rows,
    }
}

async function deleteHost(hostname) {
    const rows = await pool.query(
        "delete from host where hostname = $1",
        [hostname]
    );

    return {
        'rows': rows,
    }
}

async function modifyHost(hostname1, hostname2, ipaddress, macaddress, ostype, influx) {
    const rows = await pool.query(
        "update host set hostname = $2, ipaddress = $3, macaddress = $4, ostype = $5, influx = $6 where hostname = $1",
        [hostname1, hostname2, ipaddress, macaddress, ostype, influx]
    );

    return {
        'rows': rows,
    }
}

module.exports = {
    findOneHost,
    findAllHost,
    addHost,
    deleteHost,
    modifyHost
}