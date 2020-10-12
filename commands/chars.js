const fs = require('fs');
const chars = require('../chars.json');

module.exports = {
    name: 'chars',
    description: "this is a ping command!",
    execute(message, args){
    	let mes = [];
    	for(i in chars){
            if(i.search("_") != -1){
                mes.push('Leader '+i.replace('_',' ')+' list:');
            }else{
                mes.push('Leader '+i+' list:');
            }

    		for(j in chars[i].members){
                if(j.search("_") != -1){
                    mes.push('  '+j.replace('_',' ')+': '+chars[i].members[j].balance);
                }else{
                    mes.push('  '+j+': '+chars[i].members[j].balance);
                }	
    		}
    	}
        message.channel.send(mes);
    }
}