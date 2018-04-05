var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8000;
var emp = [['jassi','101','9876543210','jas@gmail.com']];
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"view")));
app.get('/get',function(request, response)
{
   response.status(200);
    // response.setHeader("Content-Type", "text/plain");// 
    response.send(emp);
    console.log(emp.length);
    response.end();
})
app.delete('/del/:id',function(request, response)
{
   response.status(200);
    var id = request.param("id");
    emp.splice(id,1);
    // response.setHeader("Content-Type", "text/plain");//  
    response.end();
    console.log(id);
})
app.put('/put/:id',function(request, response)
{
   response.status(200);
    var id = request.param("id");
   
     var tempArray = [];
    tempArray[0]=request.body.name;
    tempArray[1]=request.body.code;
    tempArray[2]=request.body.phone;
    tempArray[3]=request.body.email;
    emp[id]=tempArray;
    // response.setHeader("Content-Type", "text/plain");//  
    response.end();
    console.log(id);
})
app.get('/get/:id',function(request, response)
{
   response.status(200);
    var id = request.param("id");
    response.send(emp[id]);
    response.end();
    console.log(id);
})
app.post('/post',function(request, response)
{
   response.status(200);
     var tempArray = [];
    tempArray[0]=request.body.name;
    tempArray[1]=request.body.code;
    tempArray[2]=request.body.phone;
    tempArray[3]=request.body.email;
    emp.push(tempArray);
    // response.setHeader("Content-Type", "text/plain");//  
    response.send('created');
    response.end();
    console.log(request);
})
app.listen(port);