// Set up S3
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname+'/../.env')});
const AWS = require('aws-sdk');
const apiVersion = '2006-03-01';

// Create a S3 bucket with given bucketName
const createBucket = (bucketName) => {
    // Create a promise on S3 service object
    const bucketPromise = new AWS.S3({apiVersion: apiVersion}).createBucket({Bucket: bucketName}).promise();
    bucketPromise.then((data) => {
        console.log("created")
        console.log(data)
    }).catch((err) => {
        console.error(err.message);
    })
}

// Check to see if an object with given 's3Key' exists in bucket with given 'bucketName'
async function checkS3(bucketName, s3Key) {

    const bucketParams = { Bucket: bucketName, Key: s3Key };
    const s3 = new AWS.S3({apiVersion: apiVersion})

    try {
        const data = await s3.getObject(bucketParams).promise();
        return data.Body.toString('utf-8');
    } catch (err) {
        throw new Error(err.code)
    }
    
}

// Store 'responseJSON' into an object of a bucket.
const storeIntoS3 = (bucketName, s3Key, responseJSON) => {
    const body = JSON.stringify({ source: 'S3 Bucket', responseJSON });
    const objectParams = { Bucket: bucketName, Key: s3Key, Body: body};
    const uploadPromise = new AWS.S3({apiVersion: apiVersion}).putObject(objectParams).promise();

    //  Store into S3
    uploadPromise.then((data) => {
        console.log("Succesfully uploaded data to " + bucketName + "/" + s3Key);
    }).catch((err) => {
        console.error(err.message);
    })
}

module.exports = {createBucket, checkS3, storeIntoS3}