import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index.js';
import db from '../config/database.js';

chai.use(chaiHttp);
var expect=chai.expect;
var request=chai.request;

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
                image:"this needs image url 1"
            })
              .end((err,response) => {
                expect(response).to.have.status(200)
                done();
            })
        })
    });
})



// describe("POST/ title and body  validation and are mendatory",()=>{
//     it("User should post new Article if he provide proper token and articles'title and body and image url", done => {
     
//         request(app)
//         .post('/api/user/signin')
//              .send({
//                  email: "siyubu@gmail.com",
//                  password: "solange",
//              })
//         .end((err,res)=>{
//           request(app)
//           .post("/api/article/create")
//           .set({'Authorization':res.body.token})
//           .set('Content-Type', 'application/x-www-form-urlencoded')
//           .field('title', "It is only the matter of focus")
//           .field('body', "To start with Node.js integration testing, we will use Mocha and ChaiNPM packages")
//           .attach('image','C:/Andela/Andela/MyBrand/MyBrand/ui/images/girl.JPG' )
//           .end((err,response) => {
//             console.log('&&&&&&&&&&&&&&&&&&&&&&')
//             console.log(response)
//             expect(response).to.have.status(200)
//             done();
//         }).timeout(50000)
//     });
// });
// })



describe("POST/not allowed to see article with no token",()=>{
    it("User should not see posted articles if he doesn't provide token", done => {
        request(app)
        .get("/api/article/")        
        .end((err,res) => {
            expect(res).to.have.status(401)
            done();
        })
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
          .get("/api/article/")
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
          .get("/api/article/")
          .end((err,response) => {
          expect(response).to.have.status(401)
         done();
          })
    })
})


});