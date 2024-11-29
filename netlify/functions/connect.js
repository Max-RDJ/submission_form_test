const mysql = require('mysql');


exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    if (!data.firstName || !data.lastName || !data.review) {
      console.error("Missing input fields:", data);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing input fields" }),
      };
    }


    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: "sql7748230",
      password: process.env.DB_PASSWORD,
      database: "sql7748230",
      port: process.env.DB_PORT,
    });

    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO name_and_review (firstName, lastName, review) VALUES (?, ?, ?)",
        [data.firstName, data.lastName, data.review],
        (error, results) => {
          if (error) {
            console.error("Database error:", error);
            reject({ statusCode: 500, body: JSON.stringify({ error: "Database query failed", details: error }) });
          } else {
            console.log("Insert successful")
            resolve({ statusCode: 200, body: JSON.stringify({ message: "Review submitted successfully" }) });
          }
          // connection.end();
        }
      );
    });
  } catch (error) {
    console.error("Handler error:", error)
    return { 
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format", details: error.message }),
    };
  }
};
