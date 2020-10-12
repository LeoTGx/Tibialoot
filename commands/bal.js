const fs = require('fs');
const chars = require('../chars.json');
const utils = require('../utils.js');

module.exports = {
    name: 'bal',
    description: 'balance of chars in the knights list',
    execute(message, args){

        if(args.length > 1){
            for(i=1; i < args.length;i++){
                args[0] += ' '+args[i];
            }
        }

        let pass = utils.checkLeader(chars,args[0]);

        if(!pass){
            message.channel.send(`<@${message.author.id}> This Knight ('+ args[0] + ') does not exist.`);
            return;
        }

        let permited = utils.checkPermited(chars,args[0],message.author.id);

        if(!permited){
            message.channel.send(`<@${message.author.id}> Você não tem permissoes para este lider.`);
            return;
        }

        let mes = [];
        mes.push(args[0]+':');
    	for(var i in chars[args[0]].members){
    		mes.push(`transfer ${chars[args[0]].members[i].balance} to ${i}`);
    	}

        message.author.send(mes);
        
        fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
    			if(err) console.log(err);
    		});
    }
}