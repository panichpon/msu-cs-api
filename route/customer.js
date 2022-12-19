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
//    database: 'msudb',
//    connectionLimit: 5
//});
const crypto = require('crypto')
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

router.get("/customer", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM customer");
        console.log(rows);
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

router.get("/customer/:id", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM customer WHERE idx = ?", 
        [req.params.id]);
        console.log(rows);
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

router.post("/customer/register", async (req, res) => {
    let conn;
    try {
        let reqjson = req.body;
        console.log(reqjson);
        conn = await pool.getConnection();
        console.log("-----");
        const hash = crypto.createHash('sha256').update(reqjson.password).digest('hex');
        console.log("-----x");
        const rows = await conn.query("INSERT INTO customer (fullname, phone, email, image, password) VALUES (?, ?, ?, ?, ?)", 
        [reqjson.fullname, reqjson.phone, reqjson.email, reqjson.image, hash]);
        // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        console.log(rows);
        res.send(utils.toJson(rows));
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

router.post("/customer/login", async (req, res) => {
    let conn;
    try {
        let reqjson = req.body;
        console.log(reqjson);
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM customer WHERE email = ? LIMIT 1", 
        [reqjson.email]);
        // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        console.log(rows);
        const hash = crypto.createHash('sha256').update(reqjson.password).digest('hex');
        
        var login = {
            "status": false,            
            "email": rows[0].email,
            "data": [{"idx": rows[0].idx}, {"fullname": rows[0].fullname}, {"phone": rows[0].phone}, {"image": rows[0].image}]
        };

        if(hash === rows[0].password) {
            login.status = true;
        }


        res.send(utils.toJson(login));
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

router.put("/customer/:id", async (req, res) => {
    let conn;
    try {
        let reqjson = req.body;
        console.log(reqjson);
        conn = await pool.getConnection();
        const rows = await conn.query("UPDATE customer SET fullname = ?, phone = ? WHERE idx = ?", 
        [reqjson.fullname, reqjson.phone, req.params.id]);
        // { affectedRows: 1, insertId: 0, warningStatus: 0 }
        console.log(rows);
        res.send(utils.toJson(rows));
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

router.delete("/customer/:id", async (req, res) => {
    let conn;
    try {
        let reqjson = req.body;
        console.log(reqjson);
        conn = await pool.getConnection();
        const rows = await conn.query("DELETE FROM customer WHERE idx = ?", 
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