const db =require('../db/db');
const ApiError = require('../error/ApiError');
class UserDao {
    
    async createPost() {
        const post = await db('posts').insert({
            id: 1
        }).returning(['id']);
        return post;
    }

    async getAllUsers() {
        let users= await db.column("id","user_name","email", "first_name", "last_name","phone","birthday", "role_id").select().from("users");
        return users;
    }

    async getUserById(userId) {
        let user = await db.column("id", "user_name", "email", "first_name", "last_name", "phone", "birthday", "role_id").select().from("users").where('id', userId);
        return user[0];
    }

    async getUserByEmail(email){
        let user = await db.column("id","user_name","email", "first_name", "last_name","phone","birthday", "password", "role_id").select().from("users").where('email', email);
        return user[0];
    }

    async getUserByUserName(user_name){
        let user = await db.column("id","user_name","email", "first_name", "last_name","phone","birthday", "password", "role_id").select().from("users").where('user_name', user_name);
        return user[0];
    }

    async updateUser(userId, body) {
        const userToUpdate = await db.select().from('users').where('id', userId);
        if (userToUpdate.length == 0){
            throw ApiError.routeNotFound(`Can't find this user`);
        }
        
        for (const [key, value] of Object.entries(body)){
            if((key in userToUpdate[0])){
                if((key == "password" || key == "email" || key == "user_name") && value == ""){
                    throw ApiError.badRequest(`${key} can't be empty`);
                }
                userToUpdate[key] = value;
            }else{
               throw ApiError.badRequest(`${key} is not a valid field`);
            }
        }
        let user =  db('users').where('id', userId).update({
            user_name: userToUpdate.user_name,
            email: userToUpdate.email,
            first_name: userToUpdate.first_name,
            last_name: userToUpdate.last_name,
            phone: userToUpdate.phone,
            birthday: userToUpdate.birthday,
            role_id: userToUpdate.role_id

        }, ['id', 'user_name', 'email', 'last_name', 'first_name', 'phone', 'birthday', 'role_id'])
        return user;
    }

    async deleteUserById(userId) {
        const deletedUser = await db('users').where('id', userId).del(['id']);
        return deletedUser[0]; 
    }
}

module.exports = new UserDao();