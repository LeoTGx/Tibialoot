const fs = require('fs');
const chars = require('../chars.json');
const log = require('../log.json');
const AddLog = require('../log.js');
const utils = require('../utils.js');

module.exports = {
    name: 'add',
    description: "adds a player to a knights list",
    execute(message, args){

        [args[0], args[1]] = [args[1], args[0]];

        if(args.length != 3){
            message.channel.send(`<@${message.author.id}>` +' O comando certo é: `!addchar [Leader] 2 [Member] @[User]` para adicionar Member a lista de Leader');
            return;
        }

        if(args[1] == undefined){
            message.channel.send(`<@${message.author.id}>` +' O comando certo é: `!addchar [Leader] 2 [Member]` para adicionar Member a lista de Leader');
            return;
        }

        let pass = utils.checkLeader(chars,args[0]);

        if(!pass){
            message.channel.send(`<@${message.author.id}> this Leader (${args[0]}) does not exist.`);
            return;
        }

        let permited = utils.checkPermited(chars,args[0],message.author.id);

        if(!permited){
            message.channel.send(`<@${message.author.id}> Você não tem permissoes para este lider.`);
            return;
        }

        mention = message.mentions.users.first();

        if(!mention){
            message.channel.send(`<@${message.author.id}>` +' O comando certo é: `!addchar [Leader] 2 [Member] @[User]` para adicionar Member a lista de Leader');
            return;
        }

        let aux = [];

        aux.push(`addition of char ${args[1]} to ${args[0]} list`);

    	if(!chars[args[0]].members[args[1]]){
    		chars[args[0]].members[args[1]] = {
    			balance: 0,
                id: mention.id
    		}
    	}else{
            if(!chars[args[0]].members[args[1]].id){
                chars[args[0]].members[args[1]].id = mention.id;
            }else{
                message.channel.send(`<@${message.author.id}> Char ${args[1]} ja existe na lista de ${args[0]}.`);
                return;
            }
        }

        message.channel.send(`<@${message.author.id}> Char ${args[1]} adicionado a lista de ${args[0]}.`);

        aux.push(['addchar', args[0], args[1]]);

        fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
                if(err) console.log(err);
            });
        AddLog.AddLog(aux,log,message.author.id);
    }
}