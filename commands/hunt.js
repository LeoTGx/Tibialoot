const AddLog = require('../log.js');
const log = require('../log.json');
const fs = require('fs');
const chars = require('../chars.json');
const utils = require('../utils.js');

module.exports = {
    name: 'hunt',
    description: "test",
    execute(message, args){

    	const lines = message.content.split(/\r\n|\n/);
    	const names = new Array();
    	const balances = new Array();
    	let kina = 'err';
        let blank = 0;
    	var i;
    	var j=0;

        for (i in lines) {
            if(lines[i].length < 1){
            	message.channel.send(`<@${message.author.id}> Formatação errada, digite "!hunt" aperte Space e Ctrl + V`);
            	return;
            }
        }

    	for(i = 6; i<(lines.length-5); i += 6){
    		if(lines[i].search("(Leader)") != -1){
    			var pos = lines[i].indexOf("(Leader)");
    			kina = lines[i].slice(0,pos-1).toLowerCase();
    			continue;
    		}

    	 	names[j] = lines[i].toLowerCase();
            pos = lines[i+3].indexOf(":")+1;
            balances[j] = lines[i+3].slice(pos);
    	 	balances[j] = balances[j].replace(",","");
    	 	balances[j] = parseInt(balances[j]);
    	 	j++;	
    	}

    	if(kina == 'err'){
    		message.channel.send(`<@${message.author.id}> Formatação errada, digite "!hunt" aperte Space e Ctrl + V`);
    		return;
    	}

        let pass = utils.checkLeader(chars,kina);

        if(!pass){
            message.channel.send(`<@${message.author.id}> This Knight (${kina}) does not exist.`)
            return;
        }

        let permited = utils.checkPermited(chars,kina,message.author.id);

        if(!permited){
            message.channel.send(`<@${message.author.id}> Você não tem permissoes para este lider.`)
            return;
        }

    	var bal = lines[5+blank].slice(8);
    	bal = bal.replace(",","");
    	bal = parseInt(bal);
    	var profit_each = parseInt(bal/(j+1));

        let added = [];
        let aux = [];
        let mes = [];
        mes.push(`<@${message.author.id}>`);
        for(i = 0; i < names.length;i++){
            if(!chars[kina].members[names[i]]){
                chars[kina].members[names[i]] = {
                    balance: 0
                }
                added.push(names[i]);
                mes.push('Added '+names[i]+' to '+kina+' list');
            }
        }

        if(added.length == 0){
            aux.push(`hunt by leader ${kina} and members: ${names} with ${bal} profit`);
        }else{
            aux.push(`hunt by leader ${kina} with ${bal} profit and deleted the following members: ${added}`);
        }

    	for(i = 0; i < names.length;i++){
            aux.push(['pay' ,kina ,names[i] ,Math.abs(balances[i]) + profit_each]);
			chars[kina].members[names[i]].balance += Math.abs(balances[i]) + profit_each;
            mes.push(`transfer ${Math.abs(balances[i]) + profit_each} to ${names[i]}`);
		}

        for(i in added){
            aux.push(['addchar' ,kina ,names[i]]);
        }

        message.channel.send(mes);
        AddLog.AddLog(aux,log,message.author.id);

    	fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
    			if(err) console.log(err);
    		});
    }
}

