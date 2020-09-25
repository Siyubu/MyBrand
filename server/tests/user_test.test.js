import chai from 'chai';
 import chaiHttp from 'chai-http';
import db from '../config/database.js'
import app from '../../index.js'
import userController from '../controllers/userController.js'


chai.use(chaiHttp);
var expect=chai.expect;
var request=chai.request;

describe("api/user",()=>{
    beforeEach((done)=>{
        const user=new db.userModel({
            email: "siyubu@gmail.com",
            password: "solange",
        });
        user.save((err)=> {
            done()
        });
    });
    afterEach((done)=>{
        db.userModel.collection.drop();
        done();
      });

    describe("POST/signup",()=>{
        it.skip ("it should signUp a user", (done)=>{
             request(app).post('/api/user/signup')
             .send({
                email: "sinanga@gmail.com",
                password: "Lambert",

             })
             .end((err,res)=>{
                 console.log("++++++++++++++++++++++")
                console.log(res)
                 expect(res.status).to.equal(200)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 expect(res.body.password).to.equal("Lambert")
                 expect(res.body.email).to.equal('sinanga@gmail.com');
                 expect(res.body).to.have.property('token');
                 done();
             })
        })
    })
    describe("POST/signup",()=>{
        it ("No user signUpwithout password", (done)=>{
             request(app).post('/api/user/signup')
             .send({
                email: "sinanga@gmail.com",
                password: "",

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('error', '"password" is not allowed to be empty')
                 done();
             })
        })
    })

    describe("POST/signup",()=>{
        it ("No user signUpwithout valid email", (done)=>{
             request(app).post('/api/user/signup')
             .send({
                email: "sinanga@gmail",
                password: "Lambert",

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('error', '"email" must be a valid email')
                 done();
             })
        })
    })

    describe("POST/signup",()=>{
        it ("No user signUp without  email", (done)=>{
             request(app).post('/api/user/signup')
             .send({
                email: "",
                password: "Lambert",

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('error', '"email" is not allowed to be empty')
                 done();
             })
        })
    })

    describe("POST/signin",()=>{
        it ("it should  give a token when the right user user signIn", (done)=>{
             request(app).post('/api/user/signin')
             .send({
                email: "siyubu@gmail.com",
                password: "solange",

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(200)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 expect(res.body).to.have.property('token');
                 done();
             })
        })
    })

    describe("POST/ wrong signin",()=>{
        it ("it should not give a token when the wrong user user signIn ", (done)=>{
             request(app).post('/api/user/signin')
             .send({
                email: "sinanga@gmail.com",
                password: "kora akazi",

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(401)
                 done();
             })
        })
    })

    describe("POST/ wrong signin email",()=>{
        it ("it should not give a token when the wrong user email entered ", (done)=>{
             request(app).post('/api/user/signin')
             .send({
                email: "siyubu@gmail",
                password: "solange",

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(401)
                 done();
             })
        })
    })

    describe("Controller / wrong signin email",()=>{
        it ("it should not give a token when the wrong user email entered ", (done)=>{
             request(app).post('/api/user/signin')
             .send({
                email: "siyubu@gmail",
                password: "solange",

             })
             .end((err,res)=>{
                 expect(res.status).to.equal(401)
                 done();
             })
        })
    })
})

