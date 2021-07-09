const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');

let insertedStepReview, user_id, route_id, step_id;
describe('Test for Route_Step_Seview API',()=>{
    before((done) => {
        knex('steps_reviews').del();
        knex('routes_steps').del();
        knex('routes').del();
        knex('users').del().then(() => {
            done();
        })
    });

    after((done) => {
        knex('steps_reviews').del();
        knex('routes_steps').del();
        knex('routes').del();
        knex('users').del().then(() => {
            done();
        })
    });

    describe('Successful Route_Step_Review Actions', () => {
        it("Should CREATE a Route Step Review", async() => {

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

            var insertedRoute = await request(server.app).post('/api/v1/routes/'+ user_id).send(route);
            route_id = insertedRoute.body[0].id;


            let step = {
            	"data":"Paris, 75018, France",
            	"coords":"48.887290, 2.355641"
            };

            var insertedStep = await request(server.app).post('/api/v1/routes_steps/'+user_id+'/'+route_id).send(step);
            step_id = insertedStep.body[0].id;

            let review = {
            	"review":"Cool",
            	"rate":"5",
            	"reviewer_id":user_id
            };
            insertedStepReview = await request(server.app).post('/api/v1/routes_steps_reviews/'+user_id+'/'+route_id+'/'+step_id).send(review);

            expect(insertedStepReview.status).to.equal(201);
            expect(insertedStepReview.body).to.be.an.instanceof(Array);
            expect(insertedStepReview.body.length).to.equal(1);

        });

        it("Should GET all reviews for the step", async()=>{
            const response = await request(server.app).get('/api/v1/routes_steps_reviews/'+user_id+'/'+route_id+'/'+step_id);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an.instanceof(Array);
            // expect(response.body.length).to.equal(1);
        });

        it("Should GET 1 review",async()=>{
            const response= await request(server.app).get('/api/v1/routes_steps_reviews/'+user_id+'/'+route_id+'/'+step_id+'/'+insertedStepReview.body[0].id);
            expect(response.status).to.equal(200)
            expect(response.body).to.be.an.instanceof(Object);
        });

        it("Should UPDATE the route step", async()=>{
            let to_update = {
            	"review":"Mouai...",
            	"rate":"3"
            };
            const response= await request(server.app).put('/api/v1/routes_steps_reviews/'+user_id+'/'+route_id+'/'+step_id+'/'+insertedStepReview.body[0].id).send(to_update);
            expect(response.status).to.equal(201);
        });
    })


    describe('Failed Route_Step_Review Actions', ()=> {
        it("Should fail to CREATE a Route Step Review", async() => {

            user_id = 999;
            route_id = 999;
            step_id = 999;

            let review = {
            	"review":"Cool",
            	"rate":"5",
            	"reviewer_id":user_id
            };
            insertedStepReview = await request(server.app).post('/api/v1/routes_steps_reviews/'+user_id+'/'+route_id+'/'+step_id).send(review);

            expect(insertedStepReview.status).to.equal(400);

        });

        it("Should GET all reviews for the step", async()=>{
            const response = await request(server.app).get('/api/v1/routes_steps_reviews/'+user_id+'/'+route_id+'/'+step_id);
            expect(response.status).to.equal(404);
        });

        it("Should GET 1 review",async()=>{
            const response= await request(server.app).get('/api/v1/routes_steps_reviews/'+user_id+'/'+route_id+'/'+step_id+'/'+'999');
            expect(response.status).to.equal(404)
        });

        it("Should UPDATE the route step", async()=>{
            let to_update = {
            	"review":"Mouai...",
            	"rate":"3"
            };
            const response= await request(server.app).put('/api/v1/routes_steps_reviews/'+user_id+'/'+route_id+'/'+step_id+'/'+insertedStepReview.body[0].id).send(to_update);
            expect(response.status).to.equal(400);
        });

    })

})
