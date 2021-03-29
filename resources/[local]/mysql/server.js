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

exports('SQLQuery', (query) => {
    connection.query(query, (err, rows) => {
        if (err) {
            console.log(`[MySQL]: Query failed, ${err.message}`);
            return;
        }

        console.log('[MySQL]: Query successful');
        console.log(rows);
    });
});
