var settings=require("../settings");

exports.show500=function(req,resp,err){
    if(settings.httpMsgsFormat==="HTML"){
        resp.writeHead(500,"Internal Error Occured",{"Content-Type":"text/html"});
        resp.write("<html><head><title>500</title></head><body>500: Internal Error. Details: "+err+"</body></html>");
    }else{
        resp.writeHead(500,"Internal Error Occured",{"Content-Type":"application/json"});
        resp.write(JSON.stringify({data:"ERROR occured:" +err}));
    }
    resp.end();
};

exports.sendJson=function(req,resp,data){
    resp.writeHead(200,{"Content-Type":"application/json"});
    if(data){
        resp.write(JSON.stringify(data));
    }
    
    resp.end();
};


exports.show405=function(req,resp){
    if(settings.httpMsgsFormat==="HTML"){
        resp.writeHead(405,"Method not supported",{"Content-Type":"text/html"});
        resp.write("<html><head><title>405</title></head><body>405: Method not supported</body></html>");
    }else{
        resp.writeHead(405,"Method not supported",{"Content-Type":"application/json"});
        resp.write(JSON.stringify({data:"Method not supported" +err}));
    }
    resp.end();
};

exports.show404=function(req,resp){
    if(settings.httpMsgsFormat==="HTML"){
        resp.writeHead(404,"Resource not found",{"Content-Type":"text/html"});
        resp.write("<html><head><title>404</title></head><body>404: Resource not found</body></html>");
    }else{
        resp.writeHead(404,"Method not supported",{"Content-Type":"application/json"});
        resp.write(JSON.stringify({data:"Resource not found" +err}));
    }
    resp.end();
};


//when user send loads of data like large amount of data in mb

exports.show413=function(req,resp){
    if(settings.httpMsgsFormat==="HTML"){
        resp.writeHead(413,"Request entity too large",{"Content-Type":"text/html"});
        resp.write("<html><head><title>413</title></head><body>413: Request entity too large</body></html>");
    }else{
        resp.writeHead(413,"Method not supported",{"Content-Type":"application/json"});
        resp.write(JSON.stringify({data:"Request entity too large" +err}));
    }
    resp.end();
};

exports.show200=function(req,resp){
   
        resp.writeHead(200,{"Content-Type":"text/html"});
       resp.end();
    
};

exports.showHome=function(req,resp){
    if(settings.httpMsgsFormat==="HTML"){
        resp.writeHead(200,{"Content-Type":"text/html"});
        resp.write("<html><head><title>Home</title></head><body>Valid endpoints:<br> /Hospital  -GET -To List all Hospitals and an single hospital information with 'id'<br> /Hospital/id </body></html>");
    }else{
        resp.writeHead(200,{"Content-Type":"application/json"});
        resp.write(JSON.stringify([
            {url:"/Hospital",operation:"GET",description:"To List all Hospitals"},
            {url:"/Hospital/<id>",operation:"GET",description:"To search for hospital"}
    ]));
    }
    resp.end();
}