var db=require("../core/db");
var httpMsgs=require("../core/httpMsgs");
var util=require("util");

exports.getList=function(req,resp){
    db.executeSql("SELECT * FROM Hospital",function(data,err){
        if(err)
        {
           httpMsgs.show500(req,resp,err);
          
        }
        else{
            httpMsgs.sendJson(req,resp,data);
        }
       

    });
};

exports.get=function(req,resp,id){
    db.executeSql("SELECT * FROM Hospital where HospitalID="+id,function(data,err){
        if(err)
        {
           httpMsgs.show500(req,resp,err);
          
        }
        else{
            httpMsgs.sendJson(req,resp,data);
        }
       

    }); 
};

exports.add=function(req,resp,reqBody){
    debugger;
  try{
      if(!reqBody) throw new Error("Input not valid");
      var data=JSON.parse(reqBody);
      if(data){
          debugger;
        console.log(data);
         var sql="INSERT into Hospital(Name,Phone,StreetNo,Area,City,State,Country,Pincode) VALUES ('"+data.Name+"','"+data.Phone+"','"+data.StreetNo+"','"+data.Area+"','"+data.City+"','"+data.State+"','"+data.Country+"','"+data.Pincode+"')";
        //Insted of doin like this we can using util which is builtin package
          //sql+="("+data.HospitalID+data.Name+data.Phone+data.StreetNo+data.Area+data.City+data.State+data.Country+data.Pincode+")";
        // sql+=util.format("(%d,%s,%d,%s,%s,%s,%s,%s,%d)",data.HospitalID,data.Name,data.Phone,data.StreetNo,data.Area,data.City,data.State,data.Country,data.Pincode);
         db.executeSql(sql,function(data,err){
            if(err)
            {
               httpMsgs.show500(req,resp,err);
              
            }
            else{
                httpMsgs.show200(req,resp);
            }
         })
        }else{
        throw new Error("Input not valid");
      }

  } catch(er){
    httpMsgs.show500(req,resp,er);
  }
};

exports.delete=function(req,resp,id){
    db.executeSql("DELETE  FROM Hospital where HospitalID="+id,function(data,err){
        if(err)
        {
           httpMsgs.show500(req,resp,err);
          
        }
        else{
            httpMsgs.sendJson(req,resp,data);
        }
       

    });
  
};
exports.update=function(req,resp,reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid");
        var data=JSON.parse(reqBody);
        if(data){
            console.log(data);
            if(!data.HospitalID) throw new Error("Input not valid");
            var sql="UPDATE Hospital SET";
            var isDataProvided=false;
            // if(data.HospitalID){
            //     sql +=" HospitalID = '"+data.HospitalID+"' ,";
            //     isDataProvided=true;
            // }
            if(data.Name){
                sql +=" Name = '"+data.Name+"' ,";
                isDataProvided=true;
            }
            if(data.Phone){
                sql +=" Phone= '" +data.Phone+ "' ,";
                isDataProvided=true;
            }
            if(data.StreetNo){
                sql +=" StreetNo= '"+data.StreetNo +"' ,";
                isDataProvided=true;
            }
            if(data.Area){
                sql +=" Area= '" + data.Area + "' ,";
                isDataProvided=true;
            }
            if(data.City){
                sql +=" City= '" + data.City + "' ,";
                isDataProvided=true;
            }
            if(data.State){
                sql +=" State= '" + data.State +"' ,";
                isDataProvided=true;
            }
            if(data.Country){
                sql +=" Country= '"+data.Country+"' ,";
                isDataProvided=true;
            }
            if(data.Pincode){
                sql +=" Pincode= " + data.Pincode + " ,";
                isDataProvided=true;
            }
        
           sql=sql.slice(0,-1);//remove last comma
           sql+= " WHERE HospitalID= "+data.HospitalID;
           console.log(data.HospitalID);
           db.executeSql(sql,function(data,err){
              if(err)
              {
                 httpMsgs.show500(req,resp,err);
                
              }
              else{
                  httpMsgs.show200(req,resp);
              }
           })
          }else{
          throw new Error("Input not valid");
        }
  
    } catch(er){
      httpMsgs.show500(req,resp,er);
    }
};