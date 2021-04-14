const Express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');  
const { response } = require('express');
const PORT = 5000;
const app = Express();

var data = [
    {
        name: "Sakshi",
        age: 20
    },
    {
        name: "Kajal",
        age: 22
    },
    {
        name: "Navya",
        age: 19
    },
    {
        name: "Neha",
        age: 18
    },
    {
        name: "Ankit",
        age: 24
    }
]

app.get('/get_users', (req, res) => {
    res.send(JSON.stringify(data));
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
  }
  
app.use(requestTime);
  
app.post('/add_user', urlencodedParser, function (req, res) {  
    let response = {  
        name:req.body.name,  
        age:req.body.age,
        created_on:req.requestTime   
    };
     
    data.push(response);  
    res.json(
        {
            "status": 200,
            "description": "user added"
        }
    );  
})

app.post('/delete_user', urlencodedParser, (req, res) => {
    var userToBeDeleted = req.body.name
    data = data.filter((user) => userToBeDeleted !== user.name)
    res.json({
        "status": 200,
        "description": "user deleted"
    }); 
});

app.listen(PORT, () => {
   console.log("Server is running @:http://localhost:%d", PORT);
});
