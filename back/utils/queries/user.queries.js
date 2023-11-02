const { pool } = require('../db.connection')

async function checkExistsUser(email) {
    try {
        const query = await pool.query('SELECT count(*) FROM users WHERE email = $1', [email]);
        return query.rows[0]?.count > 0;
    }
    catch {return false}
}

async function getUserByEmail(email) {
    try {
        const query = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return query.rows[0] ?? null;
    }
    catch {return null}
}

async function getUserById(id) {
    try {
    const query = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return query.rows[0] ?? null;
    }
    catch {return null}
}

async function createUser(email, password, username) {
    try {
        const query = await pool.query('INSERT INTO users (email, password_hash, username) VALUES ($1, $2, $3) RETURNING id', [email, password, username]);
        return query.rows[0]?.id ?? null;        
    }
    catch {return null}
}

async function updateUser(id, username, about, phone, mess_notif, conv_notif, offer_notif, phone_notif) {
    try {
        const query = await pool.query('UPDATE users SET username = $1, about = $2, phone = $3, mess_notif = $4, conv_notif = $5, offer_notif = $6, phone_notif = $7 WHERE id = $8 RETURNING id',
            [username, about, phone, mess_notif, conv_notif, offer_notif, phone_notif, id]);
        return query.rows[0]?.id ?? null;        
    }
    catch {return null}
}

async function deleteUser(id) {
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        return id;
    }
    catch {return null}
}

module.exports = {
    checkExistsUser,
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}