//reference: https://mochajs.org/#asynchronous-code
//https://www.chaijs.com/guide/styles/ 

const chai = require("chai");
const server = require('./index');
const chaiHttp = require('chai-http');
const { request } = require("./index");

const { expect } = chai;
chai.should();
chai.use(chaiHttp);


describe("Test", () => {
    describe(' / Server working', () => {
      it('should return status code 200', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
      })
    })

    describe(' GET LIST OF BOOKS' , () => {
        it('shoud return a JSON dictionary', (done) => {
            chai.request(server)
            .get('/api/getBooks')
            .end((err, res) => { 
                res.should.have.status(200);
                res.body.should.be.an('object');
            })
            done();
        })
    })


    // describe('GET api/getBooks/14', () => {
    //     it('should return a book json dictionary for id 14', (done) => {
    //         chai.request(server)
    //         .get('/api/getBooks/14')
    //         .end((err, res) => {
    //             console.log(rest);
    //             res.should.have.status(200);
    //             res.body.should.be.an('object')
    //             res.body.should.have.a.property('rank')
    //         })
    //         done();
    //     });
    // });

    describe('GET api/getBooks/9000', () => {
        it('should return an EMPTY json dictionary for id 9000', (done) => {
            chai.request(server)
            .get('/api/getBooks/9000')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.empty;
            })
            done();
        });
    });
  });