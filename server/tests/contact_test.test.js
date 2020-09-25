import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../config/database.js'
import app from '../../index.js'


chai.use(chaiHttp);
var expect=chai.expect;
var request=chai.request;

describe("api/query",()=>{
    beforeEach((done)=>{
        const query=new db.contactModel({
            names: "Andela Andelian",
            subject: "This week we will be finishing",
            email: "andela@gmail.com",
            message: " It was hard and great. the good news is your 'I am wondering if we will get a break ooh!' is answered by yes"

        });
        query.save((err)=> {
            done()
        });
    });
    afterEach((done)=>{
        db.contactModel.collection.drop();
        done();
      });

    describe("POST/create",()=>{
        it ("should post a query", (done)=>{
             request(app).post('/api/query/create')
             .send({
                names: "test1Contact",
                subject: "Testing is harder",
                email: "contact@gmail.com",
                message: "I am wondering if we will get a break ooh!"

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('names');
                 expect(res.body).to.have.property('subject');
                 expect(res.body).to.have.property('email');
                 expect(res.body).to.have.property('message');
                 expect(res.body).to.have.property('_id');
                 expect(res.body.names).to.equal('test1Contact');
                 expect(res.body.subject).to.equal('Testing is harder');
                 expect(res.body.email).to.equal('contact@gmail.com');
                 expect(res.body.message).to.equal('I am wondering if we will get a break ooh!')
                 done();
             })
        })
    })

    describe("POST/create",()=>{
        it ("should not post a query with empty name", (done)=>{
             request(app).post('/api/query/create')
             .send({
                names: "",
                subject: "Testing is harder",
                email: "contact@gmail.com",
                message: "I am wondering if we will get a break ooh!"

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('error');
                 done();
             })
        })
    })

    describe("POST/create",()=>{
        it ("should not post a query with invalid name", (done)=>{
             request(app).post('/api/query/create')
             .send({
                names: "A",
                subject: "Testing is harder",
                email: "contact@gmail.com",
                message: "I am wondering if we will get a break ooh!"

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('error');
                 done();
             })
        })
    })
    describe("POST/create",()=>{
        it ("should not post a query with empty subject", (done)=>{
             request(app).post('/api/query/create')
             .send({
                names: "test1Contact",
                subject: "",
                email: "contact@gmail.com",
                message: "I am wondering if we will get a break ooh!"

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('error');
                 done();
             })
        })
    })

    describe("POST/create",()=>{
        it ("should not post a query with invalid subject", (done)=>{
             request(app).post('/api/query/create')
             .send({
                names: "test1Contact",
                subject: "T",
                email: "contact@gmail.com",
                message: "I am wondering if we will get a break ooh!"

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('error');
                 done();
             })
        })
    })

    describe("POST/create",()=>{
        it ("should not post a query with empty email", (done)=>{
             request(app).post('/api/query/create')
             .send({
                names: "test1Contact",
                subject: "Testing is harder",
                email: "",
                message: "I am wondering if we will get a break ooh!"

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('error');
                 done();
             })
        })
    })
    describe("POST/create",()=>{
        it ("should not post a query with invalid email", (done)=>{
             request(app).post('/api/query/create')
             .send({
                names: "test1Contact",
                subject: "Testing is harder",
                email: "contact@gmail",
                message: "I am wondering if we will get a break ooh!"

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('error');
                 done();
             })
        })
    })

    describe("POST/create",()=>{
        it ("should not post a query with empty message", (done)=>{
             request(app).post('/api/query/create')
             .send({
                names: "test1Contact",
                subject: "Testing is harder",
                email: "contact@gmail.com",
                message: ""

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('error');
                 done();
             })
        })
    })

    describe("POST/create",()=>{
        it ("should not post a query with invalid message", (done)=>{
             request(app).post('/api/query/create')
             .send({
                names: "test1Contact",
                subject: "",
                email: "contact@gmail.com",
                message: "I"

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('error');
                 done();
             })
        })
    })

describe("GET /", ()=>{
it("It should return all queries",(done)=>{
    request(app).get('/api/query/')
    .end((err,res)=>{
     expect(res.status).to.equal(200);
     expect(res).to.be.json;
     expect(res.body).to.be.a('Array');
     expect(res.body[0]).to.have.property('_id');
     expect(res.body[0]).to.have.property('names');
     expect(res.body[0]).to.have.property('subject');
     expect(res.body[0]).to.have.property('email');
     expect(res.body[0]).to.have.property('message');
     expect(res.body[0].names).to.equal('Andela Andelian');
     expect(res.body[0].email).to.equal('andela@gmail.com')
  
     done();
    });
})
})


describe("DELETE/:id", ()=>{
    it("it should delete a query",(done)=>{
        request(app)
        .get('/api/query')
        .end((err,res)=>{
          request(app)
          .delete(`/api/query/${res.body[0]._id}`)
          .end((err,response)=>{
         expect(response.status).to.equal(204);
         done();
          })
        });
    })
    })



})
