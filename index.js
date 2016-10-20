function bdecode(str) {
	return decode(0, str).result;
}

function decode(idx, str){
	while(idx < str.length){
		switch(str.charAt(idx++)){
			case 'd':
				return decodeMap(idx, str);
			case 'l':
				return decodeList(idx, str);
			case 'i':
				return decodeInt(idx, str);
			default:
				return decodeString(--idx, str);
		}
	}
}

function decodeMap(idx, str){
	var map = {};
	while(idx < str.length){
		if(str.charAt(idx) == 'e'){
			idx++;
			break;	
		}

		var key= decodeString(idx, str);
		var value = decode(key.idx, str);
		
		map[key.result] = value.result;
		idx = value.idx;
	}
	return {
		idx: idx,
		result: map
	};
}

function decodeList(idx, str) {
	var list = [];
	while(idx < str.length){
		if(str.charAt(idx) == 'e'){
			idx++
			break;
		}
		var value= decode(idx, str);
		list.push(value.result);
		idx = value.idx;
	}

	return {
		idx: value.idx,
		result: list
	};
}

function decodeString(idx, str){
	var n = '';
	while(str.charAt(idx) != ':'){
		n = n + str.charAt(idx++);
	}

	idx++;

	var length= parseInt(n);
	var key = '';

	for(var i=0; i<length; i++){
		key = key + str.charAt(idx++);
	}	

	return {
		idx: idx,
		result: key
	};
}

function decodeInt(idx, str){
	var n = '';
	while(idx < str.length){
		if(str.charAt(idx) == 'e'){
			idx++;
			break;
		}
		n = n + str.charAt(idx++);
	}
	return {
		idx: idx,
		result: n
	};
}