let express = require("express");
let app = express();
let morgan = require("morgan");
let bodyParser = require('body-parser');
// convert data to objects

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//Setup the static assets directories
app.use(express.static('img'));
app.use(express.static('css'));
app.set('views','public');

let db = [];
db.push({
    Name: "Task1",
    DueDate: "7/9/2019",
    Description: "Build new Module"
});

app.get('/',function(req,res){
    res.render('index.html')
})

app.get('/addtask',function(req,res){
    res.render('addtask.html')
})
app.get('/listtasks',function(req,res){
    res.render('listtasks.html',{db:db});
})

app.post('/data',function(req,res){
    res.render('addtask.html')
})
app.post('/data2',function(req,res){
    res.render('listtasks.html',{db:db});
})

// add task
app.post('/add',function(req,res){
    console.log(req.body);
    let name = req.body.taskName;
    let due = req.body.dueDate;
    let des = req.body.description;
    db.push({
        Name: name,
        DueDate: due,
        Description: des
    });
    console.log(db);
    
    res.render('listtasks.html',{db:db});
})
app.listen(8080);