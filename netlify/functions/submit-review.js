const querystring = require('querystring');
const mysql = require('mysql');

exports.handler = async (event) => {
  const data = querystring.parse(event.body);

  const connection = mysql.createConnection({
    host: "http://sql7.freesqldatabase.com/",
    user: "sql7748230",
    password: "NdC6XG8Ly8",
    database: "name_and_review",
    port: "3306",
  });

  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO name_and_review (firstName, lastName, review) VALUES (?, ?, ?)",
      [data.firstName, data.lastName, data.review],
      (error, results) => {
        if (error) {
          reject({ statusCode: 500, body: JSON.stringify(error) });
        } else {
          resolve({ statusCode: 200, body: "Review submitted successfully" });
        }
        connection.end();
      }
    );
  });
};



// Add spam filter?