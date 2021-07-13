const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');

let insertedUser;
describe('Test for authentification',()=>{
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

    describe('Successfull signUp', () => {
        it("should sign up a new user", async() => {
            let user = {
                user_name: 'Bob',
                email: "bob@bob.fr",
                password: "Bob"
            };
            insertedUser=  await request(server.app).post('/api/v1/signUp/').send(user);
            expect(insertedUser.status).to.equal(201);
            expect(insertedUser.body).to.be.an.instanceof(Array);
            expect(insertedUser.body.length).to.equal(10);
            expect(insertedUser.body[0].email).to.equal(user.email);
            expect(insertedUser.body[0].user_name).to.equal(user.user_name);

        })

        it("should hash the user's password", async () => {
            let user = await knex('users').where('email', "bob@bob.fr");
            expect(user[0].password).to.not.equal(insertedUser.password);
        })
    })

    describe('Successfull signIn', () => {
       it("should be a successfull sign in with email", async() => {
            let user = {
                email: "bob@bob.fr",
                password: "Bob"
            };
            let signInUser = await request(server.app).post('/api/v1/signIn/').send(user);
            expect(signInUser.status).to.equal(201);
        })

        it("should be a successfull sign in with username", async() => {
            let user = {
                user_name: "Bob",
                password: "Bob"
            };
            let signInUser = await request(server.app).post('/api/v1/signIn/').send(user);

            expect(signInUser.status).to.equal(201);
        })
    })

        

    describe('Failed SignUp', ()=> {
        it('should failed cause user email already exists', async() => {
            let user = {
                user_name: "Bob",
                email: "bob@bob.fr",
                password: "Tom"
            };
            const response = await request(server.app).post('/api/v1/signUp/').send(user);
            expect(response.status).to.equal(500);
            expect(response.text).to.equal('"Oups! Something went wrong"');
        })

        it('should fail due to a malform request', async() => {
            let user = {
                user_name: "Bob",
                email: "bob@bob",
                password: "Tom"
            };
            const response = await request(server.app).post('/api/v1/signUp/').send(user);
            expect(response.status).to.equal(400);
            expect(response.text).to.equal('"valid email adress required"');
        })
    })

    describe('Failed SignIn', () => {
        it('should fail due to a malform request even if good credentials', async()=> {
            let user = {
                email: "v",
                pasfsword: "Bob"
            };
            const response = await request(server.app).post('/api/v1/signIn/').send(user);
            expect(response.status).to.equal(400);
            expect(response.text).to.equal('"password is required"');
        })

        it('should fail due to bad credentials', async()=> {
            let user = {
                email: "bob@bob.fr",
                password: "Bobob"
            };
            const response = await request(server.app).post('/api/v1/signIn/').send(user);
            expect(response.status).to.equal(401);
            expect(response.text).to.equal('"Password incorrect"');
        })

        it('should fail cause bad email', async()=> {
            let user = {
                email: "bob@bad.fr",
                password: "Bobob"
            };
            const response = await request(server.app).post('/api/v1/signIn/').send(user);
            expect(response.status).to.equal(404);
            expect(response.text).to.equal('"Email incorrect"');
        })
    })
})
