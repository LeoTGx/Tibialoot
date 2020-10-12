const Discord = require('discord.js');
const client = new Discord.Client();
 
const prefix = '!';
 
const fs = require('fs');
const log = require('./log.json');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('Tibialoot is online!');
});



client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot || message.channel.name != 'loot-tibia') return;
    let args=[];
    let x = [];
    let y = [];
    let aux=0;
    let command =[];
 	if(message.content.search(" 2 ") != -1){
 		args = message.content.slice(prefix.length).split(/ +/);
 		command = args.shift().toLowerCase();
 		aux = args.findIndex(word=>word === "2");
 		args.splice(aux,1);
 		x = args.slice(0,aux).join(' ');
 		y = args.slice(aux,args.length-1).join(' ');
 		args = args.filter(word=>word !== "2");
 		if(y == ''){
 			args = [x,args[args.length-1]];
 		}else{
 			args = [x,y,args[args.length-1]];
 		}
 	}else{
 		args = message.content.slice(prefix.length).split(/\s+/);
 		command = args.shift().toLowerCase();
 	}

    for (i in args) {
    	args[i] = args[i].toLowerCase();
    }

    if(command == 'ping'){
        client.commands.get('ping').execute(message, args);
    } 

    if(command == 'help'){
        client.commands.get('commandlist').execute(message, args);
    } 

    // if(command == 'chars'){
    //     client.commands.get('chars').execute(message, args);
    // } 

    if(command == 'undo'){
        client.commands.get('undo').execute(message, args);
    } 

    if(command == 'addkina'){
        client.commands.get('addk').execute(message, args);
    }

    if(command == 'addper'){
    	let firstId = client.commands.get('addper').execute(message, args); 
        if(firstId != 0){
        	client.users.cache.get(firstId).send(`${client.users.cache.get(firstId).username}, <@${message.author.id}> tentou adicionar permissoes para ${client.users.cache.get(message.mentions.users.first().id)} no Leader ${args[0]}.`);
        }
    }

    if(command == 'removeper'){
        client.commands.get('removeper').execute(message, args);
    }

    if(command == 'addchar'){
        client.commands.get('add').execute(message, args);
    } 

    if(command == 'delchar'){
        client.commands.get('del').execute(message, args);
    } 

    if(command == 'delkina'){
        client.commands.get('delk').execute(message, args);
    }

    if(command === 'hunt' || command === 'hunt\n'){
        client.commands.get('hunt').execute(message, args);
    } 

    if(command == 'pay'){
        let id = client.commands.get('pay').execute(message, args);
        if(id != 0){
        	if(id[0]=='all'){
        		console.log(id);
        		for(i in id[1]){
        			if(id[1][i] != undefined){
        				client.users.cache.get(id[1][i]).send(`${client.users.cache.get(id[1][i]).username}, <@${message.author.id}> (${args[0]}) te pagou ${id[2][i]}`);
        			}
        		}
        	}else{
        		if(id[0] != undefined){
        			client.users.cache.get(id[0]).send(`${client.users.cache.get(id[0]).username}, <@${message.author.id}> (${args[0]}) te pagou ${id[1]}`);
        		}
        	}
        }
    }

    if(command == 'payback'){
        client.commands.get('payback').execute(message, args);
    }

    if(command == 'bal'){
        client.commands.get('bal').execute(message, args);
    }

    if(command == 'mybal'){
        client.commands.get('mybal').execute(message, args);
    }

});
 
client.login('NzU1MDUwMjMwOTQ4NDI5ODQ0.X19pUw.daHaUXmgND7FVde7c9J4jupjj88');