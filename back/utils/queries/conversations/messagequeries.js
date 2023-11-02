const { pool } = require("../../db.connection");

exports.getMessageByIDconv = function(convID, userID) {
    return new Promise((resolve, reject) => {
      if (convID != null) {
        pool.query(
          "SELECT m.*, " +
          "CASE " +
          "  WHEN m.user_id = $1 THEN 'actual_user' " +
          "  ELSE 'other_user' " +
          "END AS user_type, " +
          "u.username AS user_name " +
          "FROM messages m " +
          "LEFT JOIN users u ON m.user_id = u.id " +
          "WHERE m.conversation_id = $2 "+
          "ORDER BY m.created_at ASC",
          [userID, convID], (error, results) => {
            if (error) {
              console.log(error);
              return reject(new Error("Message not found"));
            } else {
              return resolve(results.rows);
            }
          }
        );
      } else {
        return reject(new Error("convID is null"));
      }
    });
  }


exports.createMessage = function(conversationId, userID, message) {
  return new Promise((resolve, reject) => {
    if (conversationId && userID && message) {
      pool.query(
        "INSERT INTO messages (conversation_id, user_id, message_text, created_at) " +
        "VALUES ($1, $2, $3, NOW()) RETURNING *", [conversationId, userID, message], (error, results) => {
          if (error) {
            return reject(new Error("Failed to create a message"));
          } else {
            return resolve(results.rows[0]); // Retourne le message créé
          }
        }
      );
    } else {
      return reject(new Error("Missing conversationId, userID, or message"));
    }
  });
}