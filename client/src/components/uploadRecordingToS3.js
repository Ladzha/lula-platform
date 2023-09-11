import AWS from 'aws-sdk';

// Configure AWS

AWS.config.update({
  accessKeyId: 'AKIAYU3ZNJW6EWGEUWGD',
  secretAccessKey: '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',
  region: 'eu-north-1', 
});

const s3 = new AWS.S3();

const uploadRecordingToS3 = async (blob) => {
  const params = {
    Bucket: 'lula-avatar-bucket',
    Key: 'NewRecords/record.mp3', // Specify the desired path and filename
    Body: blob,
  };

  try {
    await s3.upload(params).promise();
    console.log('Recording uploaded to S3 successfully');
  } catch (error) {
    console.error('Error uploading recording to S3:', error);
  }
};

export default uploadRecordingToS3;
