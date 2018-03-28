const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const isOnline = require('is-online');



function sendEmail() {
	isOnline({
		// Break on 5 seconds
		timeout: 5000,
		// v4 or v6
		version: "v4"
	}).then(online => {
		if (online) {
			console.log("We have internet");			
			configureEmail();			
		} else {
			console.log("Sem conexão, checando novamente....");
			sendEmail();
		}
	});
}


function configureEmail() {
	var params = {
		Destination: { /* required */
			ToAddresses: [
				'marcelo.junior107@gmail.com',
				/* more items */
			]
		},
		Message: { /* required */
			Body: { /* required */
				Html: {
					Charset: "UTF-8",
					Data: "Atenção, o computador foi ligado"
				},
				Text: {
					Charset: "UTF-8",
					Data: "TEXT_FORMAT_BODY"
				}
			},
			Subject: {
				Charset: 'UTF-8',
				Data: 'Computador ligado'
			}
		},
		Source: 'marcelo.junior107@gmail.com',
	};

	var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
	sendPromise.then(
		function (data) {			
			console.log(data.MessageId);
			process.exit(0);
		}).catch(
			function (err) {
				console.error(err, err.stack);
			});	
}

sendEmail();

