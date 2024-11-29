const mysql = require('mysql');

exports.handler = async (event) => {
  try {
    const { firstName, lastName, review } = JSON.parse(event.body);

    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO name_and_review (firstName, lastName, review) VALUES (?, ?, ?)",
        [firstName, lastName, review],
        (error, results) => {
          if (error) {
            reject({ statusCode: 500, body: JSON.stringify({ error: "Database query failed", details: error }) });
          } else {
            resolve({ statusCode: 200, body: JSON.stringify({ message: "Review submitted successfully" }) });
          }
          connection.end();
        }
      );
    });
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format", details: error.message }),
    };
  }
};
