const arq2 = require('fs');

module.exports = {

    // CreateLog:function(command,log,id){
    //     log[id][]
    // }
	AddLog:function(command,log,id){
		for (var i = 9; i > 0; i--) {
			log[id].command[i] = log[id].command[i-1];
		}
		log[id].command[0] = command;
		arq2.writeFile('./log.json', JSON.stringify(log), (err) => {
    			if(err) console.log(err);
    		});
	},

	SubLog:function(log,id){
		//log['command'+0] = [];
		for (var i = 0; i < 9; i++) {
			log[id].command[i] = log[id].command[i+1]; 
		}
        log[id].command[9] = null;
		arq2.writeFile('./log.json', JSON.stringify(log), (err) => {
    			if(err) console.log(err);
    		});
	},


	isEqual:function(obj1,obj2){
    	const obj1Keys = Object.keys(obj1);
    	const obj2Keys = Object.keys(obj2);

    	if(obj1Keys.length !== obj2Keys.length) {
        	return false;
    	}

    	for (let objKey of obj1Keys) {
        	if (obj1[objKey] !== obj2[objKey]) {
            	if(typeof obj1[objKey] == "object" && typeof obj2[objKey] == "object") {
                	if(!isEqual(obj1[objKey], obj2[objKey])) {
                    	return false;
                	}
            	} 
            	else {
                	return false;
            	}
        	}
    	}

    	return true;
	
	}
};