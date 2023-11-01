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

exports.createConversation = function(userID, email) {
  return new Promise((resolve, reject) => {
    if (userID && email) {
      pool.query(
        "SELECT * FROM users WHERE email = $1", [email], (error, results) => {
          if (error) {
            return reject(new Error("Failed to create a conversation"));
          } else {
            if (results.rows.length > 0) {
              pool.query(
                "INSERT INTO conversations (user_id1, user_id2, title, created_at) " +
                "VALUES ($1, $2, 'hello', NOW()) RETURNING *", [userID, results.rows[0].id], (error, results) => {
                  if (error) {
                    return reject(new Error("Failed to create a conversation"));
                  } else {
                    return resolve(results.rows[0]); // Retourne la conversation créée
                  }
                }
              );
            } else {
              return reject(new Error("User not found"));
            }
          }
        }
      );
    } else {
      return reject(new Error("Missing userID or email"));
    }
  });
}