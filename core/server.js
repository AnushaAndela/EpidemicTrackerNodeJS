var http=require("http");

var express = require('express');
//var bodyParser=require('body-parser');

var settings=require("../settings")
var httpMsgs=require("./httpMsgs")
var hospital=require("../Controllers/hospital");

var cors=require('cors');
const {json}=require("express");
var app = express();
app.use(cors());
app.use(json());

http.createServer(function(req,resp){
    
    switch(req.method){
        case "GET":
            if(req.url==="/"){
               // resp.end();
               httpMsgs.showHome(req,resp);
            }
            else if(req.url==="/Hospital"){
                hospital.getList(req,resp);

            }
            else {
                var hospitalpatt="[0-9]+";
                var patt=new RegExp("/Hospital/"+hospitalpatt);
                if(patt.test(req.url)){
                    patt=new RegExp(hospitalpatt);
                    var id=patt.exec(req.url);
                    hospital.get(req,resp,id);
                }else{
                    httpMsgs.show404(req,resp);
                }
            }
            break;
        case "POST":
            if(req.url==="/Hospital"){
                var reqBody='';
                req.on("data",function(data){
                    reqBody+=data;
                    if(reqBody.length>1e7)//10MB
                    {
                        httpMsgs.show413(req,resp);
                    }
                });
                req.on("end",function(){
                    hospital.add(req,resp,reqBody);

                });

            }else{
                httpMsgs.show404(req,resp);

            }
            break;
            case "PUT":
                if(req.url==="/Hospital"){
                    var reqBody='';
                    req.on("data",function(data){
                        reqBody+=data;
                        if(reqBody.length>1e7)//10MB
                        {
                            httpMsgs.show413(req,resp);
                        }
                    });
                    req.on("end",function(){
                        hospital.update(req,resp,reqBody);
    
                    });
    
                }else{
                    httpMsgs.show404(req,resp);
    
                }
                break;
        case "DELETE":
            if(req.url==="/"){
                // resp.end();
                httpMsgs.showHome(req,resp);
             }else{
                var hospitalpatt="[0-9]+";
                var patt=new RegExp("/Hospital/"+hospitalpatt);
                if(patt.test(req.url)){
                    patt=new RegExp(hospitalpatt);
                    var id=patt.exec(req.url);
                    hospital.delete(req,resp,id);
                }else{
                    httpMsgs.show404(req,resp);
                }

            }
            break;
        default:
            httpMsgs.show405(req,resp);
            break;
    }
}).listen(settings.webPort,function(){
    console.log("started listening at:"+settings.webPort);
});