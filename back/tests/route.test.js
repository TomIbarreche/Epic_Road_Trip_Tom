const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');

let insertedRoute, user_id;
describe('Test for route API',()=>{
    before((done) => {
        knex('routes').del();
        knex('users').del().then(() => {
            done();
        })
    });

    after((done) => {
        knex('routes').del();
        knex('users').del().then(() => {
            done();
        })
    });

    describe('Successful Route Actions', () => {
        it("Register a new route", async() => {
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

            insertedRoute = await request(server.app).post('/api/v1/routes/'+ user_id).send(route);
            expect(insertedRoute.status).to.equal(201);
            expect(insertedRoute.body).to.be.an.instanceof(Array);
            expect(insertedRoute.body.length).to.equal(1);

        })

        it("Should GET all routes", async()=>{
            const response = await request(server.app).get('/api/v1/routes/'+user_id);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an.instanceof(Array);
            // expect(response.body.length).to.equal(1);
        })

        it("Should GET 1 route", async()=>{
            const response = await request(server.app).get('/api/v1/routes/'+user_id+'/'+insertedRoute.body[0].id);
            expect(response.status).to.equal(200);
            // expect(response.body).to.be.an.instanceof(Object);
        })

        it("Should UPDATE the route", async()=>{
            let to_update = {
                date_planned: "2013-11-28T20:09:11.761Z",
                departure: "2013-11-29T20:09:11.761Z",
                from_label: "Toulouse, 31000, France",
                from_coords: "43.600735, 1.421452",
                to_label: "Paris, 75018, France",
                to_coords: "48.887290, 2.355641"
            };
            const response = await request(server.app).put('/api/v1/routes/'+user_id+'/'+insertedRoute.body[0].id).send(to_update);
            expect(response.status).to.equal(201);
        })


        it("Should DELETE the route", async()=>{
          const response = await request(server.app).delete('/api/v1/routes/'+user_id+'/'+insertedRoute.body[0].id).send();
          expect(response.status).to.equal(202);
        })
    })


    describe('Failed Route Actions', ()=> {
     /* it('Should fail to CREATE the route because user does not exists', async() => {
          let route = {
              date_planned: "2013-11-28T20:09:11.761Z",
              departure: "2013-11-28T20:09:11.761Z",
              from_label: "Toulouse, 31000, France",
              from_coords: "43.600735, 1.421452",
              to_label: "Paris, 75018, France",
              to_coords: "48.887290, 2.355641"
          };
          let response =  await request(server.app).post('/api/v1/routes/999999').send(route);
          expect(response.status).to.equal(500);
      });

      it("Should fail to GET the user's routes as the user doesn't exists", async()=>{
          const response = await request(server.app).get('/api/v1/routes/999999');
          expect(response.status).to.equal(404);
      });

      it("Should fail to GET the user's route, the route nor user doesn't exists", async()=>{
          const response = await request(server.app).get('/api/v1/routes/999999/9999999');
          expect(response.status).to.equal(404);
      });*/

      it("Should fail to UPDATE the user's route, the route nor user doesn't exists", async()=>{
          let to_update = {
              date_planned: "2013-11-28T20:09:11.761Z",
              departure: "2013-11-29T20:09:11.761Z",
              from_label: "Toulouse, 31000, France",
              from_coords: "43.600735, 1.421452",
              to_label: "Paris, 75018, France",
              to_coords: "48.887290, 2.355641"
          };
          const response = await request(server.app).put('/api/v1/routes/'+user_id+'/'+insertedRoute.body[0].id).send(to_update);
          expect(response.status).to.equal(404);
      });

      it("Should fail to DELETE the user's route, the route nor user doesn't exists", async()=>{
          const response = await request(server.app).delete('/api/v1/routes/99999/9999').send();
          expect(response.status).to.equal(404);
      });
    });
});
