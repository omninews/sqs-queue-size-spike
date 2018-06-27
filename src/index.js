const AWS = require('aws-sdk');
const sqs = new AWS.SQS({region: 'eu-west-1'});

if (process.argv.length < 2) {
  console.error(`${process.argv[0]} ${process.argv[1]} <queueUrl>`)
  process.exit(1);
}

sqs.getQueueAttributes({
  QueueUrl: process.argv[2],
  AttributeNames: ['ApproximateNumberOfMessages'],
}).promise()
  .then(r => r.Attributes.ApproximateNumberOfMessages)
  .then(console.log)
  .catch(console.error);
