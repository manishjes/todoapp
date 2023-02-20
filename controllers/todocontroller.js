const bodyparser = require('body-parser');
const { data } = require('jquery');
const mongoose = require('mongoose');

//connect to the database

mongoose.connect('mongodb://manishj:Dkjb63NWWrqZ1PFykr0W@15.206.7.200:28017/manishj?authMechanism=DEFAULT&authSource=admin')

// create a schema

const todoschema = new mongoose.Schema({
    item: String
})

const Todo = mongoose.model('todo', todoschema )
// const itemone = Todo({item: 'use codes'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved')
// })


//const data = [{item: 'write code '}, {item: 'read code  '}, { item: 'use now'}];
const urlencodeparser = bodyparser.urlencoded({extended: false});

module.exports = (app)=>{
   
    
    app.get('/todo', (req, res)=>{
        // get data from mongodb and pass it to the view
        Todo.find({}, (err, data)=>{
            if (err) throw err;
            res.render('todo', {todos: data})
        });
        
        //res.render('todo', {todos: data})

    });
    app.post('/todo', urlencodeparser, (req, res)=>{
        // get data from the view and add it to the mongodb
        const newtodo = Todo(req.body).save((err, data)=> {
            if(err) throw err
            res.json(data);
        });
        // data.push(req.body);
        // res.json(data);

        
    });
    app.delete('/todo/:item', (req, res)=> {
        // delete the requested item from mongodb
        Todo.find({ item: req.params.item.replace(/\-/g, " ")}).remove((err, data)=>{
            if (err) throw err;
            res.json(data)
        })

        // not working
        // data = data.filter((todo)=>{
        //     return todo.item.replace(/ /g, '-') !==req.params.item;
        // });

        // working
        // data.splice(req.params.item, 1)
        // res.json(data);

    });
}