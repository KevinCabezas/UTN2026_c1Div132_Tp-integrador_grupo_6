import connection from '../db/db.js'

const getAdminByEmail = (email) => {
    const sql = `
        SELECT 
            id,
            email,
            password
        FROM admins
        WHERE email = ?
        LIMIT 1
    `;
    return connection.query(sql, [email]);
}

const createAdmin = (email, password) => {
    const sql = `
        INSERT INTO admins (email, password)
        VALUES (?, ?)
    `;
    return connection.query(sql, [email, password]);
}

export default {
    getAdminByEmail,
    createAdmin
};