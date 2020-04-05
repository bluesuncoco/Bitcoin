
var fs = require('fs')
var util = require('util');
var log_stdout = process.stdout;
var log_file;

function setLogger(Configuration) {
	
	// console.log(Configuration)
	console.line = function(d) {

		console.log('-------------------' + d + '-------------------');
	}


	if (Configuration.logToFile) {

		log_file = fs.createWriteStream(__dirname+'/'+Configuration.logPath, {
			flags: 'w'
		});
		console.log = function(d) {
			// console.error("main log function")

			log_file.write(util.format.apply(util, arguments) + '\n');
			log_stdout.write(util.format.apply(util, arguments) + '\n');
		}

		if (Configuration.debug) {
			console.debug = console.log;
		} else {
			console.log('set debug to true in config/basicConfig.json to log debug info')
			console.debug = function() {}
		}


		process.on('uncaughtException', function(err) {
			console.error("uncaughtException");
			console.log((err && err.stack) ? err.stack : err);
		});

		process.on('SIGUSR2', function() {
			// app.use(morgan('combined', { stream: accessLogStream }))
			console.log('SIGUSER2');
			log_file.end("file strem closed !!!!!!!");
			log_file = fs.createWriteStream(Configuration.logPath, {
				flags: 'r+'
			});
		});
	}
}

module.exports = setLogger;