const fs = require('fs');
const chars = require('../chars.json');
const log = require('../log.json');
const AddLog = require('../log.js');

module.exports = {
    name: 'delk',
    description: "adds a player to a knights list",
    execute(message, args){

        if(args.length > 1){
            for(i=1; i < args.length;i++){
                args[0] += ' '+args[i];
            }
        }

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

        let aux = [];

        message.channel.send(`<@${message.author.id}> Knight ${args[0]} deleted`)
        aux.push(`deletion of ${args[0]} from knights`);
        aux.push(['delkina',args[0]]);

        for(i in chars[args[0]].members){
            aux.push(['delchar' ,args[0] ,i]);
            aux.push(['pay',args[0] ,i,-chars[args[0]].members[i].balance]);
        }

        delete chars[args[0]];

        AddLog.AddLog(aux,log,message.author.id);

        fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
            if(err) console.log(err);
        });       
    }
}