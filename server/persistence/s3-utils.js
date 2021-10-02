// Set up S3
require('dotenv').config();
const AWS = require('aws-sdk');
const apiVersion = '2006-03-01';

const createBucket = (bucketName) => {
    // Create a promise on S3 service object
    const bucketPromise = new AWS.S3({apiVersion: apiVersion}).createBucket({Bucket: bucketName}).promise();
    bucketPromise.then((data) => {
        console.log("Succesfully created" + bucketName);
    }).catch((err) => {
        // Implement Error hanlding for later (i.e. err.code = 'ExpiredToken', return res.status(400).json("")
        console.error(err, err.stack);
    })
}

async function checkS3(bucketName, s3Key) {
    const bucketParams = { Bucket: bucketName, Key: s3Key };
    const s3 = new AWS.S3({apiVersion: apiVersion})

    try {
        const data = await s3.getObject(bucketParams).promise();
        return data.Body.toString('utf-8');
    } catch (e) {
        throw new Error(`Could not retrieve file from S3: ${e.message}`)
    }
    
}

const storeIntoS3 = (bucketName, s3Key, responseJSON) => {
    const body = JSON.stringify({ source: 'S3 Bucket', responseJSON });
    const objectParams = { Bucket: bucketName, Key: s3Key, Body: body};
    const uploadPromise = new AWS.S3({apiVersion: apiVersion}).putObject(objectParams).promise();

    //  Store into S3
    uploadPromise.then((data) => {
        console.log("Succesfully uploaded data to " + bucketName + "/" + s3Key);
    }).catch((err) => {
        console.error(err);
    })
}

module.exports = {createBucket, checkS3, storeIntoS3}