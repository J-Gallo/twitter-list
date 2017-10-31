const chai = require('chai'),
  should = chai.should(),
  expect = chai.expect,
  config = require('../config'),
  server = require('../server');

describe('Config Tests', () => {
  it('Local base url', (done) => {
    config()('test').should.equal('http://localhost:3000');
    done();
  });

  it('Prod base url', (done) => {
    config()('production').should.equal('https://twitter-list.now.sh');
    done();
  });
});