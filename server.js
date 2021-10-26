const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const { Console } = require('console');

const connection = mysql.createConnection({
	host : conf.host,
	user : conf.user,
	password : conf.password,
	port : conf.port,
	database: conf.database
});

connection.connect();

app.get('/api/testdata/:itemCode', (req, res) => {
	connection.query(
		"SELECT INDEXCODE, IDCODE, TESTDATE, TESTEXAMINATION, RESULT, TREATMENT FROM(SELECT INDEXCODE, IDCODE, TESTDATE, TESTEXAMINATION, RESULT, TREATMENT FROM MONKEYDATA WHERE " + req.params.itemCode +" ORDER BY TESTDATE DESC, INDEXCODE DESC) AS MONKEYDATA",
		(err, rows, fields) => {
			res.send(rows);
		}
	)
})

app.get('/api/testdata', (req, res) => {
	connection.query(
		"SELECT INDEXCODE, IDCODE, TESTDATE, TESTEXAMINATION, RESULT, TREATMENT FROM(SELECT INDEXCODE, IDCODE, TESTDATE, TESTEXAMINATION, RESULT, TREATMENT FROM MONKEYDATA ORDER BY TESTDATE DESC, INDEXCODE DESC) AS MONKEYDATA",
		(err, rows, fields) => {
			res.send(rows);
		}
	)
})

app.post('/api/testdata', (req, res) => {
	sql = "INSERT INTO MONKEYDATA (INDEXCODE, IDCODE, TESTDATE, TESTEXAMINATION, RESULT, TREATMENT) VALUES (?, ?, ?, ?, ?, ?)";
	let params = [req.body.INDEXCODE, req.body.IDCODE, req.body.TESTDATE, req.body.TESTEXAMINATION, req.body.RESULT, req.body.TREATMENT];
	connection.query(sql, params,
		(err, rows, fields) => {
			res.send(rows);
		}
	);
});

app.get('/api/exportBoard', (req, res) => {
	connection.query(
		"SELECT IDCODE, MTYPE, FATHER, MOTHER, SEX, WEIGHT, BIRTHDAY, WEANED, WEANEDWEIGHT, CITES, CUSTOMER, DESTINATION, EXPDATE, CONTRACT, EXPWEIGHT, DELETED FROM BOARD ORDER BY IDCODE DESC",
		(err, rows, fields) => {
			res.send(rows);
		}
	)
})

app.put('/api/exportBoard', (req, res) => {
	let sql = 'UPDATE BOARD SET CITES = ?, CUSTOMER = ?, DESTINATION = ?, EXPDATE = ?, CONTRACT = ?, EXPWEIGHT = ? WHERE IDCODE = ?';
	let params = [req.body.CITES, req.body.CUSTOMER, req.body.DESTINATION, req.body.EXPDATE, req.body.CONTRACT, req.body.EXPWEIGHT, req.body.IDCODE];
	connection.query(sql, params,
		(err, rows, fields) => {
			res.send(rows);
		}
	)
});

app.get('/api/board', (req, res) => {
	connection.query(
		"SELECT IDCODE, MTYPE, FATHER, MOTHER, SEX, WEIGHT, BIRTHDAY, WEANED, WEANEDWEIGHT, ROW1, CAGE1, ROW2, CAGE2, DELETED FROM BOARD ORDER BY IDCODE DESC",
		(err, rows, fields) => {
			res.send(rows);
		}
	)
})

app.post('/api/board', (req, res) => {
	sql = "INSERT INTO BOARD (IDCODE, MTYPE, FATHER, MOTHER, SEX, WEIGHT, BIRTHDAY, WEANED, WEANEDWEIGHT, ROW1, CAGE1, ROW2, CAGE2, DELETED) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
	let params = [req.body.IDCODE, req.body.MTYPE, req.body.FATHER, req.body.MOTHER, req.body.SEX, req.body.WEIGHT, req.body.BIRTHDAY, req.body.WEANED, req.body.WEANEDWEIGHT, req.body.ROW1, req.body.CAGE1, req.body.ROW2, req.body.CAGE2];
	connection.query(sql, params,
		(err, rows, fields) => {
			res.send(rows);
		}
	);
});

app.delete('/api/board/:id', (req, res) => {
	let sql = 'UPDATE BOARD SET DELETED = 1 WHERE IDCODE = ?';
	let params = [req.params.id];
	connection.query(sql, params,
		(err, rows, fields) => {
			res.send(rows);
		}
	)
});

app.put('/api/board', (req, res) => {
	let sql = 'UPDATE BOARD SET MTYPE = ?, FATHER = ?, MOTHER = ?, SEX = ?, WEIGHT = ?, BIRTHDAY = ?, WEANED = ?, WEANEDWEIGHT = ?, ROW1 = ?, CAGE1 = ?, ROW2 = ?, CAGE2 = ? WHERE IDCODE = ?';
	let params = [req.body.MTYPE, req.body.FATHER, req.body.MOTHER, req.body.SEX, req.body.WEIGHT, req.body.BIRTHDAY, req.body.WEANED, req.body.WEANEDWEIGHT, req.body.ROW1, req.body.CAGE1, req.body.ROW2, req.body.CAGE2, req.body.IDCODE];
	connection.query(sql, params,
		(err, rows, fields) => {
			res.send(rows);
		}
	)
});

app.post('/api/login', (req, res) => {
	sql = 'INSERT INTO ADMINUSER VALUE (?, ?, ?)';
	let params = [req.body.ID, req.body.PASSWORD, req.body.NAME];
	connection.query(sql, params,
		(err, rows, fields) => {
			res.send(rows);
		}
	);
});

app.listen(port, () => console.log(`ddddddddddd PORT Number ${port}`));