const { pool } = require("../utils/db.connection");

async function createTables() {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        CREATE TABLE IF NOT EXISTS tokens (
            id SERIAL PRIMARY KEY,
            id_user INTEGER NOT NULL,
            token uuid NOT NULL,
            expiration_date timestamp NOT NULL,
            FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS Conversations (
            id SERIAL PRIMARY KEY,
            user_id1 INT REFERENCES Users(id),
            user_id2 INT REFERENCES Users(id),
            title VARCHAR(255),
            created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS Messages (
            id SERIAL PRIMARY KEY,
            conversation_id INT REFERENCES Conversations(id),
            user_id INT REFERENCES Users(id),
            message_text TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        `);
    } 
    catch (error) {
        console.log("error : database creation failed");
        throw error;
    }
}

module.exports = {
    createTables
};
