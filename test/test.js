var request = require('supertest')
    , assert = require('assert')
    , app = require('../index.js');


describe("infopages", function(){
    it("shows hello world", function(done){
        request(app).get("/")
            .expect(200)
            .expect(/Hello World!!!!/)
            .end(done);
    })
    it("shows courses", function(done){
        request(app).get("/api/courses")
            .expect(200)
            .end(done);
    })
})


describe("Manage Course", function(){

    var curso;
    it("adds a new course", function(done){
        request(app).post("/api/courses")
            .send({ "name": "new course"})
            .expect(200)
            .end(done);
    })

    it("shows expecific course", function(done){
        request(app).get("/api/courses/4")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });

    it("modifies a specific course", function(done){
        request(app).put("/api/courses/4")
            .send({ "name": "changed course"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });

    it("deletes a specific course", function(done){
        request(app).delete("/api/courses/4")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });
    
});


/*
it("deletes a specific course", function(done){
    request(app).delete("/api/courses/4")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(error,res){
            console.log(curso);
            curso = res.body;
            console.log(curso);
            console.log("wait a sec");
            assert.equal(res.body, curso)
            console.log(res.body);
            done();
        });
});
*/