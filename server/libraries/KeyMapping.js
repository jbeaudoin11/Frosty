"use strict";

//use in key map file like 
// var keyMap = {
// 	"UUID" : {
// 		def
// 	}
// }

//if the id doesnt exist return null
exports.buildGetById = (map) => {
	return (id) => {
		var elem = map[id];
		if(elem) {
			return JSON.parse(JSON.stringify(elem))
		} else {
			return null;
		}
	}
}


//if the id doesnt exist put null in the array
exports.buildGetByIds = (map) => {
	return (ids) => {
		return ids.map((id) => {
			var elem = map[id];
			if(elem) {
				return JSON.parse(JSON.stringify(elem))
			} else {
				return null;
			}
		})
	}
}