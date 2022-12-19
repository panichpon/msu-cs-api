const express = require('express');
const router = express.Router();
const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: '3306',
    database: 'tripbooking',
    connectionLimit: 5
});
//const pool = mariadb.createPool({
//    host: '10.148.0.5',
//    user: 'msudb',
//    password: 'msudb@1234',
//    port: '3307',
//    database: 'tripbooking',
//    connectionLimit: 2
//});
const utils = require("../util/util.js");

// middleware that is specific to this router
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log('Time: ', Date.now())
    next()
});




router.get("/trip", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM trip");
        console.log(rows);
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

router.get("/trip/:id", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM trip WHERE idx = ?", 
        [req.params.id]);
        console.log(rows);
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

router.post("/trip", async (req, res) => {
    let conn;
    try {
        let reqjson = req.body;
        console.log(reqjson);
        conn = await pool.getConnection();
        const rows = await conn.query("INSERT INTO trip (name, country, destinationid, coverimage, detail, price, duration) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [reqjson.name, reqjson.country, reqjson.destinationid, reqjson.coverimage, reqjson.detail, reqjson.price, reqjson.duration]);
        // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        console.log(rows);
        res.send(utils.toJson(rows));
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

router.put("/trip/:id", async (req, res) => {
    let conn;
    try {
        let reqjson = req.body;
        console.log(reqjson);
        conn = await pool.getConnection();
        const rows = await conn.query("UPDATE trip SET name = ?, country = ?, destinationid = ?, coverimage = ?, detail = ?, price = ?, duration = ? WHERE idx = ?", 
        [reqjson.name, reqjson.country, reqjson.destinationid, reqjson.coverimage, reqjson.detail, reqjson.price, reqjson.duration]);
        // { affectedRows: 1, insertId: 0, warningStatus: 0 }
        console.log(rows);
        res.send(utils.toJson(rows));
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

router.delete("/trip/:id", async (req, res) => {
    let conn;
    try {
        let reqjson = req.body;
        console.log(reqjson);
        conn = await pool.getConnection();
        const rows = await conn.query("DELETE FROM trip WHERE idx = ?", 
        [req.params.id]);
        // { affectedRows: 1, insertId: 0, warningStatus: 0 }
        console.log(rows);
        res.send(utils.toJson(rows));
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

module.exports = router;