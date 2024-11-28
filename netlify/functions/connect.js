const mysql = require('mysql');

exports.handler = async (event) => {
  try {
    // Parse the incoming JSON request body
    const { firstName, lastName, review } = JSON.parse(event.body);

    const connection = mysql.createConnection({
      host: "sql7.freesqldatabase.com",
      user: "sql7748230",
      password: "NdC6XG8Ly8",
      database: "sql7748230",
      port: "3306",
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
    // Handle any errors (like invalid JSON)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format", details: error.message }),
    };
  }
};
