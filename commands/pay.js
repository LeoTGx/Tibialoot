const AddLog = require('../log.js');
const fs = require('fs');
const chars = require('../chars.json');
const log = require('../log.json');
const utils = require('../utils.js');

module.exports = {
    name: 'pay',
    description: "indicates that you paid for the hunts above",
    execute(message, args){

        let aux = [];

    	let pass = utils.checkLeader(chars,args[0]);

        if(!pass){
            message.channel.send(`<@${message.author.id}> this Leader (${args[0]}) does not exist.`);
            return 0;
        }

        let permited = utils.checkPermited(chars,args[0],message.author.id);

        if(!permited){
            message.channel.send(`<@${message.author.id}> Você não tem permissoes para este lider.`);
            return 0;
        }

        if(args[1] == 'all'){

            aux.push(`last payment by ${args[0]} to ${args[1]}`);
            message.channel.send(`@here <@${message.author.id}> (${args[0]}) payed all`);
            let ids = [];
            let amount = [];
    		for(var i in chars[args[0]].members){
                aux.push(['pay', args[0], i, -chars[args[0]].members[i].balance]);
                ids.push(chars[args[0]].members[i].id);
                amount.push(`no char ${i} all (${chars[args[0]].members[i].balance})`);
                chars[args[0]].members[i].balance = 0;
    		}

            AddLog.AddLog(aux,log,message.author.id);

    		fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
    			if(err) console.log(err);
    		});

            let ret = ["all",ids,amount];
			return ret;
    	}

        if(args.length > 3){
            for(i=2; i < args.length-1;i++){
                args[1] += ' '+args[i];
            }
        }

        aux.push(`last payment of ${args[args.length-1]} by ${args[0]} to ${args[1]}`);

        pass = -1;
        for(i in chars[args[0]].members){
            if(args[1] == i){
                pass = 0;
            }
        }

        if(pass == -1){
            message.channel.send('This Player ('+ args[1] + ') does not exist in the Knights ('+ args[0] + ') list.')
            return 0;
        }

        let amount = [];

        if(args[args.length-1] == 'all'){
            aux.push(['pay',args[0],args[1],-chars[args[0]].members[args[1]].balance]);
            amount.push(`no char ${args[1]} all (${chars[args[0]].members[args[1]].balance})`);
        	chars[args[0]].members[args[1]].balance = 0;
        }else{
            args[args.length-1] = parseInt(args[args.length-1]);
            aux.push(['pay', args[0], args[1], -args[args.length-1]]);
            amount.push(`no char ${args[1]} ${args[args.length-1]}`);
        	chars[args[0]].members[args[1]].balance += -args[args.length-1];	
        }
	       
        message.channel.send(`<@${message.author.id}> (${args[0]}) payed ${args[1]} ${args[args.length-1]}`);
        
        AddLog.AddLog(aux,log,message.author.id);

        fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
    			if(err) console.log(err);
    		});

        let ret = [chars[args[0]].members[args[1]].id, amount];
        return ret;
    }
}