const { pool } = require("../../db.connection");

exports.getConvByIDuser = function(userID) {
  return new Promise((resolve, reject) => {
    if (userID != null) {
      pool.query(
        "SELECT c.*, " +
        "CASE " +
        "  WHEN c.user_id1 = $1 THEN u2.username " +
        "  WHEN c.user_id2 = $1 THEN u1.username " +
        "END AS other_username " +
        "FROM Conversations c " +
        "LEFT JOIN users AS u1 ON c.user_id1 = u1.id " +
        "LEFT JOIN users AS u2 ON c.user_id2 = u2.id " +
        "WHERE user_id1 = $1 OR user_id2 = $1", [userID], (error, results) => {
          if (error) {
            return reject(new Error("Conversation not found"));
          } else {
            return resolve(results.rows);
          }
        }
      );
    } else {
      return reject(new Error("userID is null"));
    }
  });
}

