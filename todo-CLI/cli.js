const fs = require('fs')
const { Command } = require('commander');
const program = new Command();

program
.name('Add todo')
.description('CLI to do file based task')
.version('0.8.0')

program.command('addTodo')
.description('Add Todo in file that is given')
.argument('<string>', 'task that have to be added')
.action((str)=>{
    fs.appendFile('tests.txt', str, err => {
        if(err){
            console.log(err);
        } else{
            console.log('Task added successfully')
        }
    });
});

program.parse();
 