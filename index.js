let BoxSDK = require('box-node-sdk');
let fs = require('fs');
const config = require('./config.json');

let sdk = new BoxSDK({
	clientID: config.CLIENT_ID,
	clientSecret: config.CLIENT_SECRET
});

let client = sdk.getBasicClient(config.DEV_TOKEN);

client.folders.create('0', 'Webhooks at Boxworks')
	.then((folder) => {
		console.log('Folder created!');
		client.webhooks.create(
			folder.id,
			client.itemTypes.FOLDER,
			config.TARGET_URL,
			[
				client.webhooks.triggerTypes.FILE.UPLOADED,
				client.webhooks.triggerTypes.FILE.PREVIEWED,
				client.webhooks.triggerTypes.FOLDER.CREATED,
				client.webhooks.triggerTypes.FOLDER.RESTORED,
				client.webhooks.triggerTypes.WEBHOOK.DELETED
			])
		.then(webhook => {
			console.log('Webhook: ' + webhook.id)
			console.log('Webhook Triggers: ' + webhook.triggers)
		})
		.catch(err => console.log('Webhook error', err))	
	})
	.catch(err=> console.log('Got an error!', err));