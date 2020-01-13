exports.nickCheck = (username, lists) => {
	var result = true;
	if(!username || username == '시스템') {
		result = false;
	} else {
		lists.some((element) => {
			if(username == element.name) {
				result = false;
				return false; // Break
			}
		});
	}
	return result;
}