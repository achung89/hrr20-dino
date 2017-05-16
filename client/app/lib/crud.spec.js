import chai from 'chai';
chai.should();
import sinon from 'sinon';
import Crud from './crud';
import axios from 'axios';

describe('Client Crud Library', function() {

  beforeEach(function() {
    sinon.stub(axios, 'get');
  });

  afterEach(function() {
  });

  it('should parse fetched data as JSON', function(done) {
    const data = { foo: 'bar' };
    const dataJSON = JSON.stringify(data);

    crud.get('/users')
      .then(function(res) {
        res.should.deep.equal(data);
        done();
      });

    this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJSON);
  });

});
