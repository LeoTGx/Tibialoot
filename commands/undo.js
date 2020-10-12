const AddLog = require('../log.js');
const fs = require('fs');
const chars = require('../chars.json');
const log = require('../log.json');

const prefix = '!';

module.exports = {
    name: 'undo',
    description: "undoes the last command",
    execute(message, x){
        if(log[message.author.id]){
            if(log[message.author.id].command[0]){
                message.channel.send(`<@${message.author.id}> Undo ${log[message.author.id].command[0][0]}`);
            	for (i=1; i < log[message.author.id].command[0].length; i++){

                    let aux = log[message.author.id].command[0][i];

                    if(AddLog.isEqual(aux[0],'pay')){
                        if(aux[2] == 'all'){
                            for(var i in chars[aux[1]].members){
                                chars[aux[1]].members[i].balance = 0;
                            }
                        }

                        if(aux[aux.length-1] == 'all'){
                            chars[aux[1]].members[aux[2]].balance = 0;
                        }else{
                            chars[aux[1]].members[aux[2]].balance += -aux[aux.length-1];    
                        }

                    }

                    if(AddLog.isEqual(aux[0],'delchar')){
                        if(!chars[aux[1]].members[aux[2]]){
                            chars[aux[1]].members[aux[2]] = {
                                balance: 0
                            }
                        }
                    }

                    if(AddLog.isEqual(aux[0],'delkina')){
                        console.log(aux);
                        if(!chars[aux[1]]){
                            chars[aux[1]] = {
                                members: {
                                }
                            }
                        }
                    }

                    if(AddLog.isEqual(aux[0],'addchar')){
                        if(chars[aux[1]].members[aux[2]]){
                            delete chars[aux[1]].members[aux[2]];
                        }
                    }

                    if(AddLog.isEqual(aux[0],'addkina')){
                        delete chars[aux[1]];
                    }

                    if(AddLog.isEqual(aux[0], 'addper')){
                        for(i = 0; i < chars[aux[1]].permited.length; i++){
                            if(aux[2] == chars[aux[1]].permited[i]){
                                chars[aux[1]].permited = chars[aux[1]].permited.splice(i-1,1);
                            }
                        }
                    }
                }

                AddLog.SubLog(log,message.author.id);

            }else{
                message.channel.send(`<@${message.author.id}> limite de undoes atingido`);
            }
        }else{
            message.channel.send(`<@${message.author.id}> você nao tem ações registradas`);
        }

         fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
                 if(err) console.log(err);
             });
    }
}