const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');

let insertedUser;
describe('Test for user preferences',()=>{
    before((done) => {
        knex('users_preferences').del();
        knex('users').del().then(() => {
            done();
        })
    });

    after((done) => {
        knex('users_preferences').del();
          
        knex('users').del().then(() => {
            done();
        })
    })

    describe('Successfull route action', () => {
        it("should get 0 preferences for the user", async() => {
            let user = {
                user_name: 'Bob',
                email: "bob@bob.fr",
                password: "Bob"
            };
            insertedUser=  await request(server.app).post('/api/v1/signUp/').send(user);
            let userPref = await request(server.app).get(`/api/v1/preferences/${insertedUser.body[0].id}`)
            expect(userPref.status).to.equal(200);
            expect(userPref.body.user_id).to.equal(insertedUser.body[0].id);
            expect(userPref.body.user_preferences.length).to.equal(0);
        })

        it("should post new preferences ", async() => {
            let body = {
                user_id: insertedUser.body[0].id,
                new_user_preferences: {
                    gender: "hombre",
                    vegan: "are you serious?",
                    currency: "dollar"
                }
            }
            
            let insertedPreferences=  await request(server.app).post('/api/v1/preferences/').send(body);

            expect(insertedPreferences.status).to.equal(201);
            expect(insertedPreferences.body.user_id).to.equal(insertedUser.body[0].id);
            expect(insertedPreferences.body.new_user_preferences.length).to.equal(3);
            expect(insertedPreferences.body.new_user_preferences[0].gender).to.equal("hombre");
        })

        it("should retrieve the user preferences", async() => {
            let userPreferences =  await request(server.app).get(`/api/v1/preferences/${insertedUser.body[0].id}`);
            expect(userPreferences.status).to.equal(200);
            expect(userPreferences.body.user_id).to.equal(insertedUser.body[0].id);
            expect(userPreferences.body.user_preferences.length).to.equal(3);
            expect(userPreferences.body.user_preferences[0].gender).to.equal("hombre");
        })

        it("should retrieve the user preferences by its name", async() => {
            let userPreferences =  await request(server.app).get(`/api/v1/preferences/${insertedUser.body[0].id}/gender`);
            expect(userPreferences.status).to.equal(200);
            expect(userPreferences.body.user_id).to.equal(insertedUser.body[0].id);
            expect(userPreferences.body.user_preferences.length).to.equal(1);
            expect(userPreferences.body.user_preferences[0].gender).to.equal("hombre");
        })

        it("should update the user preferences", async() => {
            let body = {
                user_preferences: {gender: 'mujer', vegan:"not today"}
            }

            let userPreferences =  await request(server.app).put(`/api/v1/preferences/${insertedUser.body[0].id}`).send(body);
            expect(userPreferences.status).to.equal(201);
            expect(userPreferences.body.user_id).to.equal(insertedUser.body[0].id);
            expect(userPreferences.body.updated_user_preferences.length).to.equal(2);
            expect(userPreferences.body.updated_user_preferences[0].gender).to.equal("mujer");
        })

        it("should delete the user prefereces", async() => {
            let preferencesToDelete = {
                user_preferences: ["gender", "vegan"]
            }
            let userPreferences =  await request(server.app).delete(`/api/v1/preferences/${insertedUser.body[0].id}`).send(preferencesToDelete);
            expect(userPreferences.status).to.equal(202);
            expect(userPreferences.body.user_id).to.equal(insertedUser.body[0].id);

            let userPreferencesAfterDelete =  await request(server.app).get(`/api/v1/preferences/${insertedUser.body[0].id}`);
            expect(userPreferencesAfterDelete.status).to.equal(200);
            expect(userPreferencesAfterDelete.body.user_id).to.equal(insertedUser.body[0].id);
            expect(userPreferencesAfterDelete.body.user_preferences.length).to.equal(1);
        })

        
    })
    describe('Failed route action', () => {
        it("should failed to return user preferences cause deleted user", async() => {
            await request(server.app).delete(`/api/v1/users/${insertedUser.body[0].id}`);
            let userPreferences =  await request(server.app).get(`/api/v1/preferences/${insertedUser.body[0].id}`);
            expect(userPreferences.status).to.equal(404);
            expect(userPreferences.text).to.equal('"Can\'t find this user"');
        })

        it("should failed to post user preferences cause no user", async() => {
            let body = {
                user_id: insertedUser.body[0].id,
                new_user_preferences: {
                    gender: "hombre",
                    vegan: "are you serious?",
                    currency: "dollar"
                }
            }
            
            let insertedPreferences=  await request(server.app).post('/api/v1/preferences/').send(body);
            expect(insertedPreferences.status).to.equal(404);
            expect(insertedPreferences.text).to.equal('"Can\'t find this user"');
        })

        it("should failed to retrieve prefrences by name cause no user", async() => {
            let userPreferences =  await request(server.app).get(`/api/v1/preferences/${insertedUser.body[0].id}/gender`);
            expect(userPreferences.status).to.equal(404);
            expect(userPreferences.text).to.equal('"Can\'t find this user"');
        })

        
       it("should failed to delete user_preferences cause no user", async() => {
            let preferencesToDelete = {
                user_preferences: ["gender", "vegan"]
            }
            let userPreferences =  await request(server.app).delete(`/api/v1/preferences/${insertedUser.body[0].id}`).send(preferencesToDelete);
            expect(userPreferences.status).to.equal(404);
            expect(userPreferences.text).to.equal('"Can\'t find this user"');
       })

       it("should failed to update user_preferences cause no user", async() => {
        let body = {
            user_preferences: {gender: 'mujer', vegan:"not today"}
        }

        let userPreferences =  await request(server.app).put(`/api/v1/preferences/${insertedUser.body[0].id}`).send(body);
        expect(userPreferences.status).to.equal(404);
        expect(userPreferences.text).to.equal('"Can\'t find this user"');
   })

        it("should failed to retrieve preferences by name cause no existant user preferences", async() => {
            let user = {
                user_name: 'Bob',
                email: "bob@bob.fr",
                password: "Bob"
            };
            insertedUser=  await request(server.app).post('/api/v1/signUp/').send(user);
            let userPreferences =  await request(server.app).get(`/api/v1/preferences/${insertedUser.body[0].id}/gender`);
            expect(userPreferences.status).to.equal(400);
            expect(userPreferences.text).to.equal('"This preference doesn\'t exists"');
        })

    })

})
