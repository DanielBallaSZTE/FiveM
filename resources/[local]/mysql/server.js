const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fiveM'
});

connection.connect((err) => {
    if (err) {
        console.log(`[MySQL]: ${err.message}`);
        return;
    }

    console.log('[MySQL]: Connected');
});

const SQLQuery = (query, callback) => {
    connection.query(query, (err, rows) => {
        if (err) {
            console.log(`[MySQL]: Query failed, ${err.message}`);
            callback(err);
        }

        callback(rows);
    });
};

exports('SQLQuery', SQLQuery);
