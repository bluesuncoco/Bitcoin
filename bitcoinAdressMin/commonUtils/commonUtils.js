var utils = {};
var path = require('path');
var crypto = require('crypto');

utils.sendSuccess = function(res, body) {

	res.status(200).json({
		message: "success",
		code: "1",
		content: body
	});
}

utils.sendFailure = function(res, body) {

	utils.sendFailureCode(res, body, "0")
}

utils.sendFailureCode = function(res, body, code) {
	// console.debug(code)
	code = code==1?'0':code;
	// console.debug(code)
	
	res.status(200).json({
		message: "failure",
		code: code,
		content: body + ""
	});
}

utils.isEmptyString = function(input) {
	if (typeof(input) !== 'string')
		return true;
	if (input.length == 0)
		return true;
	return false
}


utils.isEmptyObjt = function(input) {
	if (input.keys.length < 1)
		return true;

}

//是否某个字段为空
utils.isFieldEmptyString = function(objt, field) {

	var value = objt[field];
	return utils.isEmptyString(value);
}

utils.getRandom = function(total) {

	return Math.floor(Math.random() * total);
}

//json 三种格式
utils.isEmptyJsonField = function(field) {
	return (field == "" || field == undefined || field == null);
}

//json
utils.pickUpAndCheckNull = function(objt, fields, reqFields) {

	var newObjt = {};

	for (var i = fields.length; i--;) {
		newObjt[fields[i]] = objt[fields[i]];
	}


	for (var i = reqFields.length; i--;) {

		var key = reqFields[i];
		if (this.isEmptyJsonField(objt[key]))
			throw ERR_EMPTY_FILED;

		newObjt[key] = objt[key];
	}
	return newObjt;
}



utils.toJsonString = function(objt, cb) {

	try {
		cb(nil, JSON.stringify(objt));
	} catch (error) {
		cb(error, nil);
	}

}

utils.ParseJson = function(js, cb) {

	try {
		cb(nil, JSON.parse(js));
	} catch (error) {
		cb(error, nil);
	}
}

utils.checkFileExtName = function(filePath, names) {


	var result = false;
	var extName = this.getFileExtensionName(filePath);
	if (this.isEmptyString(extName))
		return false;

	extname = this.toLower(extName);
	names.forEach(function(current) {

		current = '.' + current;
		if (current === extName)
			result = true;
	});
	return result;
}

utils.getFileExtensionName = function(filePath) {

	return path.extname(filePath);
}

utils.toLower = function(_targetS) {

	return _targetS.toLowerCase()
}

utils.toUpper = function(_targetS) {

	return _targetS.toUpperCase()
}

utils.sha256 = function(_buffer) {

	var hash = crypto.createHash('sha256');
	hash.update(_buffer);
	return hash.digest('hex');
}

utils.deepCopy = function(p, c) {
	　　　　
	var c = c || {};　　　　
	for (var i in p) {　　　　　　
		if (typeof p[i] === 'object') {　　　　　　　　
			c[i] = (p[i].constructor === Array) ? [] : {};　　　　　　　　
			this.deepCopy(p[i], c[i]);　　　　　　
		} else {　　　　　　　　　
			c[i] = p[i];　　　　　　
		}　　　　
	}　　　
	return c;　　
}




module.exports = utils;