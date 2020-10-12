const arq2 = require('fs');

module.exports = {
	checkLeader:function(chars, leaderName){
		let pass = false;

		for (i in chars) {
           if(leaderName == i){
            pass = true;
           }
        }

        if(pass){
            return true;
        }else{
        	return false;
        }

	},

    checkMember:function(chars, memberName){

        let pass = false;

        for (i in chars){
            for(j in chars[i].members){
                if(memberName == j){
                    pass = true;
                }
            }
        }

        if(pass){
            return true;
        }else{
            return false;
        }

    },

	checkPermited:function(chars, leaderName, authorId){
		let permited = false;

		for(i in chars[leaderName].permited){
            if(authorId == chars[leaderName].permited[i]){
                permited = true;
            }
        }

        if(permited){
        	return true;
        }else{
        	return false;
        }

	},

    checkFirstPermited:function(chars, leaderName, authorId){
        let permited = false;

        if(chars[leaderName].permited[0] == authorId){
            permited = true;
        }

        if(permited){
            return true;
        }else{
            return false;
        }

    },

};