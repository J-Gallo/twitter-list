const chai = require('chai'),
  chaiHttp = require('chai-http'),
  should = chai.should(),
  expect = chai.expect,
  redisService = require('../services/RedisService');
  redisInstance = new redisService(),
  server = require('../server');

chai.use(chaiHttp);

describe('Search Controller Tests', () => {
  describe('getTweet', () => {
      it('it should have status code 200', (done) => {
        chai.request(server)        
          .get('/api/tweet/916022080935809025')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      it('it should be an object', (done) => {
        chai.request(server)        
          .get('/api/tweet/916022080935809025')
          .end((err, res) => {
            res.body.should.be.an('object');
            done();
          });
      });

      it('it should have property text', (done) => {
        chai.request(server)        
          .get('/api/tweet/916022080935809025')
          .end((err, res) => {
            expect(res.body).to.have.property('text');
            done();
          });
      });

      it('it should have property id', (done) => {
        chai.request(server)        
          .get('/api/tweet/916022080935809025')
          .end((err, res) => {
            expect(res.body).to.have.property('id');
            done();
          });
      });
      
      it('it should have property retweet_count', (done) => {
        chai.request(server)        
          .get('/api/tweet/916022080935809025')
          .end((err, res) => {
            expect(res.body).to.have.property('retweet_count');
            done();
          });
      });

      it('it should have property user', (done) => {
        chai.request(server)        
          .get('/api/tweet/916022080935809025')
          .end((err, res) => {
            expect(res.body).to.have.property('user');
            done();
          });
      });

      it('it should set a key in redis', (done) => {
        redisInstance.del('916022080935809025');
        chai.request(server)        
          .get('/api/tweet/916022080935809025')
          .end((err, res) => {
            redisInstance.get('916022080935809025').then((data) => {
              should.exist(data);
              done();
            })
          });
      });

      it('On fetching error it should return an empty object', (done) => {
        redisInstance.del('test');
        chai.request(server)        
          .get('/api/tweet/test')
          .end((err, res) => {            
            expect(res.body).to.be.empty;
            done();
          });
      });
  });
  describe('getTweets', () => {
    it('it should have status code 200', (done) => {
      chai.request(server)        
        .get('/api/search?query=JuanGallo')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it should fetch data from api', (done) => {
      redisInstance.del('JuanGallo');
      chai.request(server)        
        .get('/api/search?query=JuanGallo')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('On fetching error it should return an empty object', (done) => {
      redisInstance.del('|||');
      chai.request(server)        
        .get('/api/search?query=|||')
        .end((err, res) => {    
          expect(res.body).to.be.empty;
          done();
        });
    });
  });
});