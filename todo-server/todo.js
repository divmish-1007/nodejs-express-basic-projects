const express = require('express')
const app = express()

let todos = [
    {
        id: 1,
        title: "Go to Gym"
    },
    {
        id: 2, 
        title: "Take classes"
    }
]

app.use(express.json())


// const name = req.params.filName

app.get('/', function(req, res){
    res.send(todos)
})

app.get('/todo', function(req, res){
    const noOfTodos = todos.length
    res.send({
        todos, 
        noOfTodos
    })
})

app.get('/todo/:ide', function(req, res){
    const idtoFind = parseInt(req.params.ide);
    let data;
    for(let i=0; i<todos.length; i++){
        if(todos[i].id === idtoFind){
            data = todos[i]
            break;
        }
    }
    if(data){
        res.json(data)
    } else{
        res.status(404).send('Todo not found');
    }
})

app.post('/todo', function(req, res){
    
    const newTodo = {
        id:req.body.id,
        title:req.body.title
    }
    todos.push(newTodo)
    res.json({
        msg: "Done" 
    })
})

app.put('/todo/:id', function(req, res){
    const idToupdate = parseInt(req.params.id)
    for(let i=0; i<todos.length; i++){
        if(idToupdate === todos[i].id){
            todos[i].title = "Updated todo"
        }
    }
    res.json({})
})

app.listen(3000)