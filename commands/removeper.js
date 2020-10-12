const fs = require('fs');
const chars = require('../chars.json');
const log = require('../log.json');
const AddLog = require('../log.js');
const utils = require('../utils.js');

module.exports = {
    name: 'removeper',
    description: "indicates that you paid for the hunts above",
    execute(message, args){

    	const pass = utils.checkLeader(chars,args[0]);

    	if(!pass){
    		message.channel.send(`<@${message.author.id}> this Leader (${args[0]}) does not exist.`);
            return;
    	}

    	const mention = message.mentions.users.first();

    	if(!mention){
    		message.channel.send(`<@${message.author.id}>`+' O comando certo é `!removeper [Leader] 2 @[User]`');
    		return;
    	}

        let aux = [];

        aux.push(`permition add of <@${mention.id}> to ${args[0]} Leader.`);
        aux.push(['removeper' ,args[0] ,mention.id]);

        let found = false;

        for(i = 0; i < chars[args[0]].permited.length; i++){
        	if(mention.id == chars[args[0]].permited[i]){
        		chars[args[0]].permited = chars[args[0]].permited.splice(i-1,1);
        		found = true;
        	}
        }

        if(!found){
        	message.channel.send(`<@${message.author.id}> O membro <@${mention.id}> não tem permissoes para o Leader ${args[0]}`);
        	return;
        }

        AddLog.AddLog(aux,log,message.author.id);

		fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
			if(err) console.log(err);
		});
    	
    }
}