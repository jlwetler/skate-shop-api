import connection from "../database.js";

export async function emailCheck(email, addressCheck) {
    const emailCheck = await connection.query(`
        SELECT * FROM users WHERE email = $1
    `, [email]);

    if (emailCheck.rows.length !== 0 && addressCheck !== true) return null;

    if (emailCheck.rows.length === 0 && addressCheck === true) return null;

    return emailCheck;
}