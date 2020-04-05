var express = require('express');
var router = express.Router();
var utils = require('../commonUtils/commonUtils.js');
var hdPath = require('../bitcoinUtil/hdprivate.js');
var segwitAddress = require('../bitcoinUtil/segwitAddress.js');

/* given a path and a seed to generate a segwit address */
router.post('/segwit-address', function(req, res) {

	let seed = req.body.seed;
	let path = req.body.path;
	console.log('path ',path)
	if (utils.isEmptyString(seed)) {

		utils.sendFailure(res, 'empty seed');
		return;
	}
	if (utils.isEmptyString(path)) {

		utils.sendFailure(res, 'path seed');
		return;
	}

	try {
		let pkey = hdPath.generatePrivate(path,seed);
		let address = segwitAddress.encodeSegWitFromPri(pkey.toString('hex'));
		pkey.fill(0);
		seed = '';
		utils.sendSuccess(res,address);
	} catch (err) {
		console.log(err);
		utils.sendFailure(res,err);
	}


});


module.exports = router;