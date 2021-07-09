const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');

let insertedRouteData, user_id, route_id;
describe('Test for Route_Data API',()=>{
    before((done) => {
        knex('routes_data').del();
        knex('routes').del();
        knex('users').del().then(() => {
            done();
        })
    });

    after((done) => {
        knex('routes_data').del();
        knex('routes').del();
        knex('users').del().then(() => {
            done();
        })
    });

    describe('Successful Route_Data Actions', () => {
        it("A new Route_Data creation", async() => {
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

            let data = {
            	"max_time":"25h",
            	"toto":"saa",
            	"tata":"qqq",
            	"bru":"zzza"
            };

            insertedRouteData = await request(server.app).post('/api/v1/routes_data/'+user_id+'/'+route_id).send(data);
            expect(insertedRouteData.status).to.equal(201);

        });

        // it("Should GET all data for the route", async()=>{
        //     const response = await request(server.app).get('/api/v1/routes_data/'+user_id+'/'+route_id);
        //     expect(response.status).to.equal(200);
        //     expect(response.body).to.be.an.instanceof(Array);
        // });

        it("Should UPDATE the route data", async()=>{
            let to_update = {
            	"max_time":"25zzzzzh",
            	"bru":"zzzzzzzzza"
            };
            const response= await request(server.app).put('/api/v1/routes_data/'+user_id+'/'+route_id).send(to_update);
            expect(response.status).to.equal(201);
        });
    })

    describe('Failed Route_Data Actions', ()=> {
          // it("Should fail creating a new Route_Data", async() => {
          //     user_id = 9999;
          //     route_id = 9999;
          //
          //     let data = {
          //       "max_time":"25h",
          //       "tata":"qqq",
          //       "bru":"zzza"
          //     };
          //
          //     insertedRouteData = await request(server.app).post('/api/v1/routes_data/'+user_id+'/'+route_id).send(data);
          //     expect(insertedRouteData.status).to.equal(400);
          //
          // })

          it("Should fail GETting all data for the route", async()=>{
              user_id = 9999;
              route_id = 9999;
              const response = await request(server.app).get('/api/v1/routes_data/'+user_id+'/'+route_id);
              expect(response.status).to.equal(404)
          })
          //
          // it("Should fail GETting 1 data",async()=>{
          //
          //     user_id = 9999;
          //     route_id = 9999;
          //     const response = await request(server.app).get('/api/v1/routes_data/'+user_id+'/'+route_id+'/totozzz');
          //     expect(response.status).to.equal(404)
          // })

          // it("Should fail UPDATING the route data", async()=>{
          //     let to_update = {
          //       "max_time":"25zzzzzh",
          //       "bru":"zzzzzzzzza"
          //     };
          //     const response= await request(server.app).get('/api/v1/routes_data/'+user_id+'/'+route_id).send(to_update);
          //     expect(response.status).to.equal(404);
          // })
    })

})
