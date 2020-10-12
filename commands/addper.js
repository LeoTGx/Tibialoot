const fs = require('fs');
const chars = require('../chars.json');
const log = require('../log.json');
const AddLog = require('../log.js');
const utils = require('../utils.js');

module.exports = {
    name: 'addper',
    description: "indicates that you paid for the hunts above",
    execute(message, args){

    	let mention;
    	const pass = utils.checkLeader(chars,args[0]);

    	if(!pass){
    		message.channel.send(`<@${message.author.id}> this Leader (${args[0]}) does not exist.`);
            return 0;
    	}

    	const firstPer = utils.checkFirstPermited(chars, args[0], message.author.id);

    	if(!firstPer){
    		message.channel.send(`<@${message.author.id}> apenas <@${chars[args[0]].permited[0]}> pode adicionar permissões para o Leader (${args[0]})`);
    		return chars[args[0]].permited[0];
    	}

    	mention = message.mentions.users.first();

    	if(!mention){
    		message.channel.send(`<@${message.author.id}>`+' O comando certo é `!addper [Leader] 2 @[User]`');
    		return 0;
    	}

        let found = false;

        for(i = 0; i < chars[args[0]].permited.length; i++){
        	if(mention.id == chars[args[0]].permited[i]){
        		found = true;
        	}
        }

        if(found){
        	message.channel.send(`<@${message.author.id}> O membro <@${mention.id}> já tem permissoes para o Leader ${args[0]}`);
        	return 0;
        }

        message.channel.send(`<@${message.author.id}> added permitions to <@${mention.id}> for Leader ${args[0]}`);

        let aux = [];

        aux.push(`permition add of <@${mention.id}> to ${args[0]} Leader.`);

        chars[args[0]].permited.push(mention.id);

        aux.push(['addper' ,args[0] ,mention.id]);

        AddLog.AddLog(aux,log,message.author.id);

		fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
			if(err) console.log(err);
		});

		return 0;
    	
    }
}