const db =require('../db/db');
class AuthDAO {
    async signUp(user_name, email, password) {
       
        const user = await db('users').insert({
            user_name: user_name,
            email: email,
            password: password,
            role_id: 2
        }).returning(['id', 'user_name','email']);
        return user;
        
    }
}

module.exports = new AuthDAO();