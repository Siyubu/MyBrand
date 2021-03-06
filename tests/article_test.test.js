import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import db from '../server/config/database';
import path from  'path';
import JWT from 'jsonwebtoken';

chai.use(chaiHttp);
var expect=chai.expect;
var request=chai.request;
let articleId;
let token


describe("api/article",()=>{
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

      describe("POST/ title and body  validation and are mendatory",()=>{
        it("User should post new Article if he provide proper token and articles'title and body are validated", done => {
            request(app)
            .post('/api/user/signin')
                 .send({
                     email: "siyubu@gmail.com",
                     password: "solange",
                 })
            .end((err,res)=>{
              request(app)
              .post("/api/article/create")
              .set({'Authorization':res.body.token})
              .send({
                title: "It is only the matter of focus",
                body: `To start with Node.js integration testing, we will use Mocha and ChaiNPM packages.`,
                image: path.join(__dirname,'assets/girl.JPG')
            })
              .end((err,response) => {
                expect(response).to.have.status(200)
                done();
            })
        })
    });
})



describe("POST/ without valid token",()=>{
    it("User should post new Article if he provide proper token and articles'title and body and image url", done => {
         
        var token=JWT.sign({
            iss: 'CodeWorkr',
            sub: '5f6df915167855296c71aef8',
            iat: new Date().getTime(), 
            exp: new Date().setDate(new Date().getDate() + 1) 
          }, 'secret_token');
        request(app)
          .post("/api/article/create")
          .set({'Authorization':token})
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .field('title', "It is only the matter of focus")
          .field('body', "To start with Node.js integration testing, we will use Mocha and ChaiNPM packages")
          .attach('image',path.join(__dirname,'assets/girl.JPG') )
          .end((err,response) => {
            expect(response).to.have.status(401)
            done();
        })
    
});
})

describe("POST/ Valid Post",()=>{
    it("User should post new Article", done => {
        request(app)
        .post('/api/user/signin')
             .send({
                 email: "siyubu@gmail.com",
                 password: "solange",
             })
        .end((err,res)=>{
        request(app)
          .post("/api/article/create")
          .set({'Authorization':res.body.token})
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .field('title', "It is only the matter of focus")
          .field('body', "To start with Node.js integration testing, we will use Mocha and ChaiNPM packages")
          .attach('image',path.join(__dirname,'assets/girl.JPG') )
          .end((err,response) => {
            articleId=response.body._id;
            token=res.body.token;
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.property('title');
            expect(response.body).to.have.property('body');
            expect(response.body).to.have.property('_id');
            expect(response.body).to.have.property('likes');
            expect(response.body).to.have.property('comments');
            expect(response.body.comments).to.be.a('array');

            done();
        })
    })
    
}).timeout(50000);
})




describe("GET/not allowed to see article with no token",()=>{
    it("User should not see posted articles if he doesn't provide token", done => {
        request(app)
        .get("/api/articles/")        
        .end((err,res) => {
            expect(res).to.have.status(401)
            done();
        })
    });
});

describe("GET/ allowed to see article with a valid token",()=>{
    it("User should see posted articles if he  provide valid token", done => {

        request(app)
        .post('/api/user/signin')
                 .send({
                     email: "siyubu@gmail.com",
                     password: "solange",
                 })
                 .end((err,res)=>{
                     request(app)
                     .get("/api/articles/") 
                     .set({'Authorization':res.body.token})
                     .end((err,response) => {
                         expect(response).to.have.status(200)
                         expect(response.body).to.be.a('Array');
                        
                         done();
                         })
                        });
                    });
                });

describe("POST/ no post without title",()=>{
    it("User should not post if he doesn't fill out title ", done => {
        request(app)
        .post('/api/user/signin')
             .send({
                 email: "siyubu@gmail.com",
                 password: "solange",
             })
        .end((err,res)=>{
          request(app)
          .post("/api/article/create")
          .set({'Authorization':res.body.token})
          .send({
            title: "",
            body: `To start with Node.js integration testing, we will use Mocha and ChaiNPM packages.`,
            image:"this needs image url 1"
            })
          .end((err,response) => {
            expect(response).to.have.status(200)
            expect(response.body).to.have.property("error",'"title" is not allowed to be empty')
            done();
        })
    })
})
})

describe("POST/ no post without body",()=>{
    it("User should not post without fill out body", done => {
        request(app)
        .post('/api/user/signin')
             .send({
                 email: "siyubu@gmail.com",
                 password: "solange",
             })
        .end((err,res)=>{
          request(app)
          .post("/api/article/create")
          .set({'Authorization':res.body.token})
          .send({
            title: "It is only the matter of focus",
            body: "",
            image:"this needs image url 1"
            })
          .end((err,response) => {
            expect(response).to.have.status(200)
            expect(response.body).to.have.property("error",'"body" is not allowed to be empty')
            done();
        })
    })
})
})

describe("POST/ no post without Image",()=>{
    it("User should not post without fill out title image", done => {
        request(app)
        .post('/api/user/signin')
             .send({
                 email: "siyubu@gmail.com",
                 password: "solange",
             })
        .end((err,res)=>{
          request(app)
          .post("/api/article/create")
          .set({'Authorization':res.body.token})
          .send({
            title: "It is only the matter of focus",
            body: "User should not post if he doesn't fill out title and/or article",
            image:""
            })
          .end((err,response) => {
            expect(response).to.have.status(200)
            expect(response.body).to.have.property("error",'"image" is not allowed')
            done();
        })
    })
})
})
describe("POST/ no post with invalid title",()=>{
    it("User should not post if he doesn't fill out valid title ", done => {
        request(app)
        .post('/api/user/signin')
             .send({
                 email: "siyubu@gmail.com",
                 password: "solange",
             })
        .end((err,res)=>{
          request(app)
          .post("/api/article/create")
          .set({'Authorization':res.body.token})
          .send({
            title: "A",
            body: `To start with Node.js integration testing, we will use Mocha and ChaiNPM packages.`,
            image:"this needs image url 1"
            })
          .end((err,response) => {
            expect(response).to.have.status(200)
            expect(response.body).to.have.property("error",'"title" length must be at least 3 characters long')
            done();
        })
    })
})
})
describe("POST/ no post without invalid body",()=>{
    it("User should not post without fill out valid body", done => {
        request(app)
        .post('/api/user/signin')
             .send({
                 email: "siyubu@gmail.com",
                 password: "solange",
             })
        .end((err,res)=>{
          request(app)
          .post("/api/article/create")
          .set({'Authorization':res.body.token})
          .send({
            title: "It is only the matter of focus",
            body: "ab",
            image:"this needs image url 1"
            })
          .end((err,response) => {
            expect(response).to.have.status(200)
            expect(response.body).to.have.property("error",'"body" length must be at least 10 characters long')
            done();
        })
    })
})
})





describe("Get/ article", ()=>{
    it("User should read article if provide valid token",(done)=>{
        request(app)
        .post('/api/user/signin')
             .send({
                 email: "siyubu@gmail.com",
                 password: "solange",
             })
        .end((err,res)=>{
          request(app)
          .get("/api/articles/")
          .set({'Authorization':res.body.token})
          .end((err,response) => {
          expect(response).to.have.status(200)
         done();
          })
        });
    })
})

describe("Get/ no article without  token", ()=>{
    it("User shouldn't read articles if no token",(done)=>{
          request(app)
          .get("/api/articles/")
          .end((err,response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.a('object');
         done();
          })
    })
})
describe("GET/ allowed to see article with a valid ID",()=>{
    it("User should see posted article if he  provide valid ID", done => {

        request(app)
        .post('/api/user/signin')
                 .send({
                     email: "siyubu@gmail.com",
                     password: "solange",
                 })
                 .end((err,res)=>{
                     request(app)
                     .get("/api/article/"+ articleId) 
                     .set({'Authorization':res.body.token})
                     .end((err,response) => {
                         expect(response).to.have.status(200)
                         expect(response.body).to.be.a('object');
                        
                         done();
                         })
                        });
                    });
                });

describe("PACTH/ no update without valid id", ()=>{
    it("should fail to update the blog",(done)=>{
        request(app)
        .patch(`/api/article/${'5f6df915167855296c71aef8'}`)
        .end((err,resp)=>{
            expect(resp).to.have.status(401)
            expect(resp.body).to.be.a('object');
            done();

        })
    })
})
describe("PACTH/  update with valid id", ()=>{
    it("should  update the blog",(done)=>{
        request(app)
        .post('/api/user/signin')
                 .send({
                     email: "siyubu@gmail.com",
                     password: "solange",
                 })
                 .end((err,res)=>{
         request(app)
        .patch("/api/article/"+ articleId)
        .set({'Authorization':res.body.token})
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('title', "Updating gave me hard time")
        .end((err,resp)=>{
            console.log("************************************ ");
            console.log(resp.body)
            
            expect(resp).to.have.status(200)
            expect(resp.body).to.be.a('object');
            done();

        })
    })
    })
})
describe("COMMENT/ no comment without valid id", ()=>{
    it("should fail to post a comment on the blog",(done)=>{
        request(app)
        .post(`/api/article/comment/${'5f6df915167855296c71aef8'}`)
        .end((err,resp)=>{
            expect(resp).to.have.status(401)
            expect(resp.body).to.be.a('object');
            done();

        })
    })
})
describe("COMMENT/comment with valid id", ()=>{
    it("should post a comment on the blog",(done)=>{
        request(app)
        .post('/api/user/signin')
                 .send({
                     email: "siyubu@gmail.com",
                     password: "solange",
                 })
                 .end((err,res)=>{
        request(app)
        .post("/api/article/comment/"+ articleId)
        .set({'Authorization':res.body.token})
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('body', "It is only the matter of focus")
        .field('name', "Soso Bala")
        .end((err,resp)=>{
            expect(resp).to.have.status(200)
            expect(resp.body).to.be.a('array');
            done();

        })
    })
    })
})

describe("LIKE/like with valid id", ()=>{
    it("should like a blog",(done)=>{
        request(app)
        .post('/api/user/signin')
                 .send({
                     email: "siyubu@gmail.com",
                     password: "solange",
                 })
                 .end((err,res)=>{
        request(app)
        .post("/api/article/like/"+ articleId)
        .set({'Authorization':res.body.token})
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err,resp)=>{
            expect(resp).to.have.status(200)
            done();

        })
    })
    })
})



describe("DELETE/ no deletion without valid id", ()=>{
    it("should fail to update the blog",(done)=>{
        request(app)
        .delete(`/api/article/${'5f6df915167855296c71aef8'}`)
        .end((err,resp)=>{
            expect(resp).to.have.status(401)
            expect(resp.body).to.be.a('object');
            done();

        })
    })
})

describe("DELETE/ with valid id a blog have to be deleted", ()=>{
    it("should delete a blog",(done)=>{
        request(app)
        .post('/api/user/signin')
                 .send({
                     email: "siyubu@gmail.com",
                     password: "solange",
                 })
                 .end((err,res)=>{
        request(app)
        .delete(`/api/article/${articleId}`)
        .set({'Authorization':res.body.token})
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err,resp)=>{
            expect(resp).to.have.status(204)
            done();

        })
    })
    })
})




});