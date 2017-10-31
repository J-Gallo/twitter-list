const chai = require('chai')
const should = chai.should()
const RedisService = require('../services/RedisService')
const redisInstance = new RedisService()

describe('Redis Service Tests', () => {
  it('Should get a valid key', (done) => {
    redisInstance.set('keyTest', 'valueTest', 10);
    redisInstance.get('keyTest').then((data) => {
      data.should.equal('valueTest');
      done();
    })
  });

  it('Should not get an invalid key', (done) => {
    redisInstance.get('keyTest2').then((data) => {
      should.not.exist(data);
      done();
    })
  });

  it('Should set a key with TTL', (done) => {
    redisInstance.set('keyTest3', 'valueTest3', 10);
    redisInstance.get('keyTest3').then((data) => {
      should.exist(data);
      done();
    })
  })

  it('Should set a key without TTL', (done) => {
    redisInstance.set('keyTest3', 'valueTest3');
    redisInstance.get('keyTest3').then((data) => {
      should.exist(data);
      done();
    })
  })
});