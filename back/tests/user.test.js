const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');

let insertedUserTwo, insertedUserOne, insertedUserThree;
describe('Test for user API',()=>{
    before((done) => {
        knex('users').del().then(() => {
            done();
        })
    });

    after((done) => {
        knex('users').del().then(() => {
            done();
        })
    })
    
    describe('Success action',()=>{
        it("should GET 0 user but it's ok",async()=>{
            const response= await request(server.app).get('/api/v1/users/');
            expect(response.status).to.equal(200)
            expect(response.body).to.be.an.instanceof(Array);
            expect(response.body.length).to.equal(0);
        })

        it("should GET two users", async() => {
            let userOne = {
                user_name: "Bob",
                email: "bob@bob.fr",
                password: "Bob"
            };
            let userTwo = {
                user_name: "Max",
                email: "max@max.fr",
                password: "Max"
            };
            let userThree = {
                user_name: "Margot",
                email: "gogo@gigi.fr",
                password: "Margot"
            }
            insertedUserOne =  await request(server.app).post('/api/v1/signUp/').send(userOne);
            insertedUserTwo =  await request(server.app).post('/api/v1/signUp/').send(userTwo);
            insertedUserThree =  await request(server.app).post('/api/v1/signUp/').send(userThree);

            const response= await request(server.app).get('/api/v1/users/');
            expect(response.status).to.equal(200)
            expect(response.body).to.be.an.instanceof(Array);
            expect(response.body.length).to.equal(3);
        })

        it('should GET a user by his Id', async() => {
            let response =  await request(server.app).get(`/api/v1/users/${insertedUserTwo.body[0].id}`);
            expect(response.status).to.equal(200)
            expect(response.body.email).to.equal(insertedUserTwo.body[0].email);
        })

        it('should UPDATE the chosen user', async() => {
            let userToUpdate = {
                user_name: "Maxime"
            };
            let response = await request(server.app).put(`/api/v1/users/${insertedUserTwo.body[0].id}`).send(userToUpdate);
            expect(response.status).to.equal(201);
            expect(response.body.user_name).to.equal(userToUpdate.user_name);
        })

        it('should DELETE the chosen user', async() => {
            let response = await request(server.app).delete(`/api/v1/users/${insertedUserTwo.body[0].id}`);
            expect(response.status).to.equal(202);
            const userList= await request(server.app).get('/api/v1/users/');
            expect(userList.body.length).to.equal(2);
        })
    })

    describe('Failed action', ()=> {
        it('should failed to GET user by id cause there is no user user with this ID', async() => {
            let response =  await request(server.app).get(`/api/v1/users/440`);
            expect(response.status).to.equal(404);
            expect(response.text).to.equal('"Can\'t find this user"');
        })

        it('should failed to GET user by id cause the Id is not in the correct form', async() => {
            let response =  await request(server.app).get(`/api/v1/users/wrongTypeId`);
            expect(response.status).to.equal(500);
            expect(response.text).to.equal('"Oups! Something went wrong"');
        })

        it('should failed to UPDATE a user cause there the request is wrong', async() => {
            let userToUpdate = {
                user_nname: "de"
            };
            let response = await request(server.app).put(`/api/v1/users/${insertedUserOne.body[0].id}`).send(userToUpdate);
            expect(response.status).to.equal(400);
            expect(response.text).to.equal('"user_nname is not a valid field"');
        })

        it('should failed to UPDATE a user cause not nullable field is missing', async() => {
            let userToUpdate = {
                user_name: "de",
                email: ""
            };
            let response = await request(server.app).put(`/api/v1/users/${insertedUserOne.body[0].id}`).send(userToUpdate);
            expect(response.status).to.equal(400);
            expect(response.text).to.equal('"email can\'t be empty"');
        })

        it('should failed to UPDATE cause there is no user with this Id', async() => {
            let userToUpdate = {
                user_name: "de",
                email: "yolo"
            };
            let response = await request(server.app).put(`/api/v1/users/100000000`).send(userToUpdate);
            expect(response.status).to.equal(404);
            expect(response.text).to.equal('"Can\'t find this user"');
        })

        it('should failed to UPDATE cause the Id is not in the correct form', async() => {
            let userToUpdate = {
                user_name: "de",
                email: "yolo"
            };
            let response = await request(server.app).put(`/api/v1/users/wrongIdType`).send(userToUpdate);
            expect(response.status).to.equal(500);
            expect(response.text).to.equal('"Oups! Something went wrong"');
        })

        it('should failed to UPDATE cause the username is already taken', async() => {
            let userToUpdate = {
                user_name: "Margot",
            };
            let response = await request(server.app).put(`/api/v1/users/${insertedUserOne.body[0].id}`).send(userToUpdate);
            expect(response.status).to.equal(403);
            expect(response.text).to.equal('"Username already taken"');
        })

        it('should failed to DELETE cause there is no user with this Id', async() => {
            let response = await request(server.app).delete(`/api/v1/users/10000000`);
            expect(response.status).to.equal(404);
            expect(response.text).to.equal('"Can\'t find this user"');
        })

        it('should failed to DELETE cause the Id is not in the correct form', async() => {
            let response = await request(server.app).delete(`/api/v1/users/wrongTypeId`);
            expect(response.status).to.equal(500);
            expect(response.text).to.equal('"Oups! Something went wrong"');
        })
    })
    
})