var express = require('express');
var router = express.Router();
var utils = require('../commonUtils/commonUtils.js');
var multisigAddress = require('../bitcoinUtil/multisigAddress.js');
var publicKey = require('../bitcoinUtil/publickey.js');
/* given a path and a seed to generate a segwit address */
router.post('/multisig-address', function(req, res) {

	let m = req.body.m;
	let n = req.body.n;
	let pubkeys = req.body.pubkeys;
	console.log(m,n);
	if (!Number.isInteger(m)) {

		utils.sendFailure(res, 'empty m');
		return;
	}
	if (!Number.isInteger(n)) {

		utils.sendFailure(res, 'empty n');
		return;
	}

	if (pubkeys.length < 1) {
		utils.sendFailure(res, 'pubkeys empty');
		return;
	}

	for (var i = 0; i < pubkeys.length; i++) {
		if (!publicKey.checkPublicKey(pubkeys[i])) {
			utils.sendFailure(res, 'pubkeys not valid');
			return;
		}
	}

	try {
		let address = multisigAddress.generateMultiSegAddress(m,n,pubkeys);
		utils.sendSuccess(res, address);
	} catch (err) {
		console.log(err);
		utils.sendFailure(res, err);
	}
});


module.exports = router;