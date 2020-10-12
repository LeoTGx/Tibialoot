module.exports = {
    name: 'commandlist',
    description: "this is a ping command!",
    execute(message, args){
        message.author.send(
        '!chars - Displays all registered leaders and members\n'+
        '!undo - Undoes the last command\n'+
        '!addkina [Leader name] - Registers a new leader\n'+
        '!delkina [Leader name] - Deletes the leader\n'+
        '!addchar [Leader name] [Member name] - Registers a new member to the leaders list\n'+
        '!delchar [Leader name] [Member name] - Deletes a member from the leaders list\n'+
        '!bal [Leader name] - Displays current balance of the leaders list\n'+
        '!pay [Leader name] [Member name OR all] [Amount OR all] - Pays\n'+
        '!hunt [Ctrl+V analyser] - Registers a hunt, REMEMBER THAT THE LEADER MUST BE REGISTERED\n'
        );
    }
}