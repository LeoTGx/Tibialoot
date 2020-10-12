const fs = require('fs');
const chars = require('../chars.json');
const utils = require('../utils.js');

module.exports = {
    name: 'mybal',
    description: 'balance of a char',
    execute(message, args){

    	if(args.length > 1){
            for(i=1; i < args.length;i++){
                args[0] += ' '+args[i];
            }
        }

        let pass = utils.checkMember(chars,args[0]);

        if(!pass){
            message.channel.send(`<@${message.author.id}> this Char (${args[0]}) does not exist.`)
            return;
        }

        let mes = [];
        mes.push(args[0]+' sua lista de lideres:')
    	for(i in chars){
    		for(j in chars[i].members){
    			if(j == args[0]){
                    if(chars[i].members[args[0]].id){
    				    if(chars[i].members[args[0]].id == message.author.id){
                            mes.push(`  ${i} te deve: ${chars[i].members[j].balance}`);
                        }
                    }else{
                        mes.push(`  ${i} te deve: ${chars[i].members[j].balance}`);
                    }
    			}
    		}
    	}

        message.author.send(mes);
        
        fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
    			if(err) console.log(err);
    		});
    }
}