const {expect} = require('chai');
const config = require('../src/config/config');
const knex = require('../src/db/db');
const {app, redisClient} = require('../index');

describe('Server', ()=>{
    it('should running on config defined port', async()=>{
        expect(config.port).to.equal('5000');
    })

    it('should running on config env', async()=>{
        expect(config.name).to.equal("Server Test");
    })

    it('should be connect to a test database', async()=>{
        let dataBase = await knex.count().from("pg_database").where("datname", "postgres");
        expect(dataBase[0].count).to.equal('1');
    })

    it('should be connected to a redis database', async() => {
        expect(redisClient.ready).to.be.true;
    })
});