const pool = require('../connect');

class User {
    static async createUser({ Login, Picture, Password, Email, Role }) {
        const [result] = await pool.execute('INSERT INTO users (Login, Picture, Password, email, Role) VALUES (?, ?, ?, ?, ?)', [Login, Picture, Password, Email, Role]);
        return { id: result.insertId, Login, Picture, Email, Role };
    }

    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM users');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows;
    }

    static async updateById(id, { Login, Picture, Password, Email, Role }) {
        const [result] = await pool.execute('UPDATE users SET Login = ?, Picture = ?, Password = ?, Email = ?, Role = ? WHERE id = ?', [Login, Picture, Password, Email, Role, id]);
        return result.affectedRows > 0 ? { id, Login, Picture, Email, Role } : null;
    }

    static async deleteById(id) {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            await connection.execute('DELETE FROM projects_members WHERE MemberId = ?', [id]);
            await connection.execute('DELETE FROM members WHERE UserId = ?', [id]);
            await connection.execute('DELETE FROM users WHERE id = ?', [id]);
            await connection.commit();

            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = {
    User,
};