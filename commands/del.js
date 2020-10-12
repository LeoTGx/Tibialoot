const fs = require('fs');
const chars = require('../chars.json');
const log = require('../log.json');
const AddLog = require('../log.js');

module.exports = {
    name: 'del',
    description: "adds a player to a knights list",
    execute(message, args){

        let pass = -1;

        for (i in chars) {
           if(args[0] == i){
            pass = 0;
           } 
        }

        if(pass == -1){
            message.channel.send(`<@${message.author.id}> This Knight (${args[0]}) does not exist.`)
            return;
        }

        if(args.length > 2){
            for(i=2; i < args.length;i++){
                args[1] += ' '+args[i];
            }
        }

        let aux = [];

        message.channel.send(`<@${message.author.id}> Char ${args[1]} deleted from ${args[0]} list`);
        aux.push(`deletion of ${args[1]} from ${args[0]} list`);
        aux.push(['delchar' , args[0], args[1]]);
        aux.push(['pay', args[0], args[1], -chars[args[0]].members[args[1]].balance]);

        if(chars[args[0]].members[args[1]]){
            delete chars[args[0]].members[args[1]];
        }

        AddLog.AddLog(aux,log,message.author.id);
    
        fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
            if(err) console.log(err);
        });

        
    }
}