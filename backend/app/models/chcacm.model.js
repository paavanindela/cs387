const config = require('../config/db.config');
const pool = require('../db');

async function addch(hlist, username) {
    const rows = await pool.query(
        "select hostname from controllerhost where username = $1",
        [username]
    );

    hlistold = [];
    for(i=0;i<rows.rowCount;i++){
        hlistold.push(rows.rows[i]["hostname"]);
    }
    hlistrem = hlistold.filter(x => !hlist.includes(x));
    hlistadd = hlist.filter(x => !hlistold.includes(x));

    if(hlistrem.length!=0){
        remstr = "delete from controllerhost where username = $1 and hostname in (";
        for(i=0;i<hlistrem.length-1;i++){
            remstr += "'" + hlistrem[i] + "',";
        }
        remstr += "'" + hlistrem[hlistrem.length-1] + "')"
        const rows1 = await pool.query(remstr, [username]);
    }

    if(hlistadd.length!=0){
        addstr = "insert into controllerhost values";
        for(i=0;i<hlistadd.length-1;i++){
            addstr += "($1, '" + hlistadd[i] + "'),";
        }
        addstr += "($1, '" + hlistadd[hlistadd.length-1] + "')";
        const rows2 = await pool.query(addstr, [username]);
    }

    return {
        'rows': rows.rows,
    }
}

async function addca(alist, username) {
    const rows = await pool.query(
        "select appid from controllerapplication where username = $1",
        [username]
    );

    alistold = [];
    for(i=0;i<rows.rowCount;i++){
        alistold.push(rows.rows[i]["appid"]);
    }
    alistrem = alistold.filter(x => !alist.includes(x));
    alistadd = alist.filter(x => !alistold.includes(x));

    console.log(alist);
    console.log(alistold);
    console.log(alistrem);
    console.log(alistadd);

    if(alistrem.length!=0){
        remstr = "delete from controllerapplication where username = $1 and appid in (";
        for(i=0;i<alistrem.length-1;i++){
            remstr += alistrem[i] + ",";
        }
        remstr += alistrem[alistrem.length-1] + ")"
        const rows1 = await pool.query(remstr, [username]);
    }

    if(alistadd.length!=0){
        addstr = "insert into controlerapplication values";
        for(i=0;i<alistadd.length-1;i++){
            addstr += "($1, " + alistadd[i] + "),";
        }
        addstr += "($1, " + alistadd[alistadd.length-1] + ")";
        const rows2 = await pool.query(addstr, [username]);
    }

    return {
        'rows': rows.rows,
    }
}

async function addcm(mlist, username) {
    const rows = await pool.query(
        "select name from controllermetric where username = $1",
        [username]
    );

    mlistold = [];
    for(i=0;i<rows.rowCount;i++){
        mlistold.push(rows.rows[i]["appid"]);
    }
    mlistrem = mlistold.filter(x => !mlist.includes(x));
    mlistadd = mlist.filter(x => !mlistold.includes(x));

    if(mlistrem.length!=0){
        remstr = "delete from controllermetric where username = $1 and name in (";
        for(i=0;i<mlistrem.length-1;i++){
            remstr += "'" + mlistrem[i] + "',";
        }
        remstr += "'" + mlistrem[mlistrem.length-1] + "')"
        const rows1 = await pool.query(remstr, [username]);
    }

    if(mlistadd.length!=0){
        addstr = "insert into controlermetric values";
        for(i=0;i<mlistadd.length-1;i++){
            addstr += "($1, '" + mlistadd[i] + "'),";
        }
        addstr += "($1, '" + mlistadd[mlistadd.length-1] + "')";
        const rows2 = await pool.query(addstr, [username]);
    }

    return {
        'rows': rows.rows,
    }
}

async function getch(username) {
    const rows = await pool.query(
        "select hostname from controllerhost where username = $1",
        [username]
    );

    return {
        'rows': rows.rows,
    }
}

async function getchall() {
    const rows = await pool.query(
        "select hostname from controllerhost"
    );

    return {
        'rows': rows.rows,
    }
}

async function getca(username) {
    const rows = await pool.query(
        "select * from controllerapplication inner join application on application.appid=controllerapplication.appid where username=$1;",
        [username]
    );

    return {
        'rows': rows.rows,
    }
}

async function getcaall() {
    const rows = await pool.query(
        "select * from controllerapplication inner join application on application.appid=controllerapplication.appid;",
    );

    return {
        'rows': rows.rows,
    }
}

async function getcm(username) {
    const rows = await pool.query(
        "select name from controllermetric where username = $1",
        [username]
    );

    return {
        'rows': rows.rows,
    }
}

async function getcmall() {
    const rows = await pool.query(
        "select name from controllermetric"
    );

    return {
        'rows': rows.rows,
    }
}

module.exports = {
    addch,
    getch,
    addca,
    getca,
    addcm,
    getcm,
    getcaall,
    getchall,
    getcmall
}
