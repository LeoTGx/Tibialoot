const fs = require('fs');
const chars = require('../chars.json');
let log = require('../log.json');
const AddLog = require('../log.js');

module.exports = {
    name: 'addk',
    description: "indicates that you paid for the hunts above",
    execute(message, args){
        let aux = [];

        if(args.length > 1){
            for(i=1; i < args.length;i++){
                args[0] += ' '+args[i];
            }
        }

    	if(!chars[args[0]]){
    		chars[args[0]] = {
    			members: {},
                permited:[message.author.id]
    		}

        log[message.author.id] = {
             command: []
        }

        fs.writeFile('./log.json', JSON.stringify(log), (err) => {
            if(err) console.log(err);
        });


        message.channel.send(`<@${message.author.id}> Leader ${args[0]} added`);
        aux.push(`addition of ${args[0]} to Leaders`);
        aux.push(['addkina' ,args[0]]);
        AddLog.AddLog(aux,log,message.author.id);

		fs.writeFile('./chars.json', JSON.stringify(chars), (err) => {
			if(err) console.log(err);
		});
    	}else{
            message.channel.send(`<@${message.author.id}> this Leader ${args[0]} already exists`);
        }
    	
    }
}