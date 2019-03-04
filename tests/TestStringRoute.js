const expect = require('chai').expect;
const {getProcessor,postProcessor} = require('../routes/string');


describe('String Route', function() {
    describe('String get', function () {
        let req = {
            body: {},
        };

        let res = {
            sendCalledWith: '',
            cookieCalledWith: '',
            send: function (arg) {
                this.sendCalledWith = arg;
            },
            cookie: function(...args){
                this.cookieCalledWith = args;
            }
        };

        it('Should give out random string, cookie should be set to same', function () {
            getProcessor(req,res,null);
            expect(res.sendCalledWith.length>7).to.be.ok;
            expect(res.sendCalledWith.length<39).to.be.ok;
            expect(res.sendCalledWith).to.equal(res.cookieCalledWith[1]);
        });
    });

    describe('String post',function(){
        it('Should send out OK if called with correct data', function (done) {
            let req = {
                signedCookies:{
                    string:"m0GIuA5z4GOPH5ZXVRLsJbg7b3TpNf2"
                },
                body: "$2a$10$vdK33S6wPUzit.LnQquqF.Rflp/Q8Lt4sv1vyGQIbyd.6E6tUIDeO"
            };

            let res = {
                sendCalledWith: '',
                cookieCalledWith: '',
                send: function (arg) {
                    this.sendCalledWith = arg;
                },
                cookie: function(...args){
                    this.cookieCalledWith = args;
                }
            };

            postProcessor(req,res,null).then(result=>{
                expect(res.sendCalledWith).to.equal("OK");
                done();
            }).catch(error=>{
                done(error);
            })
        });

        it('Should send out NOK if called with correct data', function (done) {
            let req = {
                signedCookies:{
                    string:"pollo"
                },
                body: "$2a$10$vdK33S6wPUzit.LnQquqF.Rflp/Q8Lt4sv1vyGQIbyd.6E6tUIDeO"
            };

            let res = {
                sendCalledWith: '',
                cookieCalledWith: '',
                send: function (arg) {
                    this.sendCalledWith = arg;
                },
                cookie: function(...args){
                    this.cookieCalledWith = args;
                }
            };

            postProcessor(req,res,null).then(result=>{
                expect(res.sendCalledWith).to.equal("NOK");
                done();
            }).catch(error=>{
                done(error);
            })
        });


    })
});