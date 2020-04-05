// 04E8445082A72F29B75CA48748A914DF60622A609CACFCE8ED0E35804560741D292728AD8D58A140050C1016E21F285636A580F4D2711B7FAC3957A594DDF416A0
// x
// E8445082A72F29B75CA48748A914DF60622A609CACFCE8ED0E35804560741D29
// y
// 2728AD8D58A140050C1016E21F285636A580F4D2711B7FAC3957A594DDF416A0 
// 0xE8445082A72F29B75CA48748A914DF60622A609CACFCE8ED0E35804560741D29
// 立方 +7
// bf3282f2d45600c70f435e454a8b5084074088323c659b419080964716d5a9fdf7e41c7b827d9fb161a835ea3eb4bbdcb9ae0c71bc772ba278e2d58700031ae83f7948f59a92e3af45c5e3ab8d7ba75af38ea656ead55bb46d93f558806b5440
// 5fd6b57c2d52bba3c17457223759c2c30f03a5ab19aadcb8e392d6ee451ad7bc9f5a2def2308f3a67f72cce4f36e182b9d6c5f6b54ff1a8a893c0cb62ffe400
// 68f17887bdd3b66be03cd193d4002084304027e212da64f15b193e019addf90a
var bigInt = require("big-integer");

let p = bigInt("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F",16);

function checkPublicKey(_pubKeyHex) {

	if (!(_pubKeyHex.slice(0, 2) == '04' || _pubKeyHex.slice(0, 2) == '03' || _pubKeyHex.slice(0, 2) == '02'))
		return false;

	if (_pubKeyHex.slice(0, 2) == '04') {
		let x = _pubKeyHex.slice(2, 66);
		let y = _pubKeyHex.slice(66, 130);

		if (!(isValidAxis(x) && isValidAxis(y) && isPoint(x, y))) {
			return false;
		}
		return true;
	}

	if (_pubKeyHex.slice(0, 2) == '03' || _pubKeyHex.slice(0, 2) == '02') {
		let x = _pubKeyHex.slice(2, 66);
		return isValidAxis(x);
	}

	return false;
}

function isValidAxis(_xHex) {

	let xBI = bigInt(_xHex, 16);
	return xBI.greaterOrEquals(1) && xBI.lesser(p);
}

function isPoint(_xHex, _yHex) {
	let xBI = bigInt(_xHex, 16);
	let yBI = bigInt(_yHex, 16);
	let x_res = xBI.pow(3).add(7).mod(p);
	let y_res = yBI.pow(2).mod(p);
	return x_res.equals(y_res);
}


module.exports = {
	checkPublicKey: checkPublicKey
}