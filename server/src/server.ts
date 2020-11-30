import compression from 'compression';
import cors from 'cors';
import express from 'express';
import mysql from 'mysql';
import fs from 'fs';
import path from 'path';

(async () => {
  try {
    console.log('Starting...');

    const connection = mysql.createConnection({
      host: 'atelierestimate1.mysql.database.azure.com',
      port: 3306,
      user: 'team2@atelierestimate1',
      password: 'estimate123!',
      database: 'estimate2',
      ssl: { ca: fs.readFileSync(path.resolve(__dirname, 'BaltimoreCyberTrustRoot.crt.pem')) },
    });

    connection.connect();

    const app = express();
    app.listen(6969);

    app.use(compression());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get('/customers', (req, res) => {
      connection.query('SELECT * FROM customer', (error, results, fields) => {
        res.send(results);
      });
    });

    app.get('/customer/:id', (req, res) => {
      connection.query(`SELECT * FROM customer WHERE customerID=${req.params.id}`, (error, results, fields) => {
        res.send(results);
      });
    });

    app.get('/estimates', (req, res) => {
      connection.query('SELECT * FROM estimate', (error, results, fields) => {
        res.send(results);
      });
    });

    app.get('/estimate/:id', (req, res) => {
      connection.query(`SELECT * FROM estimate WHERE estimateID=${req.params.id}`, (error, results, fields) => {
        res.send(results);
      });
    });

    app.get('/products', (req, res) => {
      connection.query('SELECT * FROM product', (error, results, fields) => {
        res.send(results);
      });
    });

    app.get('/product/:id', (req, res) => {
      connection.query(`SELECT * FROM product WHERE productID=${req.params.id}`, (error, results, fields) => {
        res.send(results);
      });
    });

    app.get('/header/:id', (req, res) => {
      connection.query(`SELECT * FROM product WHERE id=${req.params.id}`, (error, results, fields) => {
        res.send(results);
      });
    });
  } catch (err) {
    console.error(err);
  }
})();

process.on('exit', () => {
  console.debug('Process exit');
});

process.on('uncaughtException', (err: Error) => {
  const errorMsg = (err ? err.stack || err : '').toString().replace(new RegExp(`${__dirname}/`, 'g'), './');
  console.error(errorMsg);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(err);
});
