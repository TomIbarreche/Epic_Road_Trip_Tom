const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');

let insertedStep, user_id, route_id;
describe('Test for route_step API',()=>{
    before((done) => {
        knex('routes_steps').del();
        knex('routes').del();
        knex('users').del().then(() => {
            done();
        })
    });

    after((done) => {
        knex('routes_steps').del();
        knex('routes').del();
        knex('users').del().then(() => {
            done();
        })
    });

    describe('Successful Route_Steps Actions', () => {
        it("Should create a route step", async() => {
            let user = {
                user_name: 'Bob',
                email: "bob@bob.fr",
                password: "Bob"
            };

            var insertedUser = await request(server.app).post('/api/v1/signUp/').send(user);
            user_id = insertedUser.body[0].id;
            let route = {
                date_planned: "2013-11-28T20:09:11.761Z",
                departure: "2013-11-28T20:09:11.761Z",
                from_label: "Toulouse, 31000, France",
                from_coords: "43.600735, 1.421452",
                to_label: "Paris, 75018, France",
                to_coords: "48.887290, 2.355641"
            };

            var  insertedRoute = await request(server.app).post('/api/v1/routes/'+ user_id).send(route);
            route_id = insertedRoute.body[0].id;


            let step = {
            	"data":"Paris, 75018, France",
            	"coords":"48.887290, 2.355641"
            };

            insertedStep = await request(server.app).post('/api/v1/routes_steps/'+user_id+'/'+route_id).send(step);
            expect(insertedStep.status).to.equal(201);
            expect(insertedStep.body).to.be.an.instanceof(Array);
            expect(insertedStep.body.length).to.equal(1);

        })

        it("Should GET all route steps", async()=>{
            const response= await request(server.app).get('/api/v1/routes_steps/'+user_id+'/'+route_id);
            expect(response.status).to.equal(200)
            expect(response.body).to.be.an.instanceof(Array);
            // expect(response.body.length).to.equal(1);
        })

        it("Should GET 1 step",async()=>{
            const response= await request(server.app).get('/api/v1/routes_steps/'+user_id+'/'+route_id+'/'+insertedStep.body[0].id);
            expect(response.status).to.equal(200)
            // expect(response.body).to.be.an.instanceof(Object);
        })

        it("Should UPDATE the route step", async()=>{
            let to_update = {
            	"data":"Paris, 75018, Somewhere",
            	"coords":"48.887290, 2.355641"
            };
            const response= await request(server.app).put('/api/v1/routes_steps/'+user_id+'/'+route_id+'/'+insertedStep.body[0].id).send(to_update);
            expect(response.status).to.equal(201);
        })
    })


    describe('Failed Route_Steps Action', ()=> {
        it("Should fail CREATING a route step", async() => {
            user_id = 9999;
            route_id = 9999;

            let step = {
            	"data":"Paris, 75018, France",
            	"coords":"48.887290, 2.355641"
            };

            insertedStep = await request(server.app).post('/api/v1/routes_steps/'+user_id+'/'+route_id).send(step);
            expect(insertedStep.status).to.equal(400);

        })

        it("Should fail GETting all route steps", async()=>{
            const response = await request(server.app).get('/api/v1/routes_steps/'+user_id+'/'+route_id);
            expect(response.status).to.equal(404)
        })

        it("Should fail GETting 1 step",async()=>{
            const response= await request(server.app).get('/api/v1/routes_steps/'+user_id+'/'+route_id+'/99999');
            expect(response.status).to.equal(404)
        })

        it("Should fail UPDATING the route step", async()=>{
            let to_update = {
            	"data":"Paris, 75018, Somewhere",
            	"coords":"48.887290, 2.355641"
            };
            const response = await request(server.app).put('/api/v1/routes_steps/'+user_id+'/'+route_id+'/99999').send(to_update);
            expect(response.status).to.equal(404);
        })
    })

})
