const fs = require('fs');
const chars = require('../chars.json');
const log = require('../log.json');
const AddLog = require('../log.js');
const utils = require('../utils.js');

module.exports = {
    name: 'coin',
    description: "this is a ping command!",
    execute(message, args){

    	let pass = utils.checkLeader(chars,args[0]);

        if(!pass){
            message.channel.send(`<@${message.author.id}> This Knight (${args[0]}) does not exist. Example: ${"`"}!coin [nome_leader] 2 [TC price]${"`"}`)
            return;
        }

        let permited = utils.checkPermited(chars,args[0] ,message.author.id);

        if(!permited){
            message.channel.send(`<@${message.author.id}> Você não tem permissoes para este lider.`)
            return;
        }

        chars[args[0]].coin = args[1];

        message.channel.send(`<@${message.author.id}> TC = ${args[1]} para ${args[0]}`)

        fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
        	if(err) console.log(err);
        });
        //AddLog.AddLog(aux,log,message.author.id);
    }
}