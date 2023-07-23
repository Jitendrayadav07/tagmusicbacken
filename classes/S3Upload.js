const fs = require('fs');
const AWS = require('aws-sdk');

class S3Upload {
    s3 = new AWS.S3({
        endpoint: new AWS.Endpoint("sgp1.digitaloceanspaces.com"), 
        accessKeyId: "DO00BHGHW8KU2NY9H3CD",
        secretAccessKey: "1Va+j7k8MrNMuZq6t4RkyhEORyTRI6gk99S4RURC50Y"
    });

    constructor(bucketName) {
        this.bucketName = bucketName ? bucketName : null;
    }
        async uploadImage (blob,ref){
            const uploadImage = await this.s3.upload({
                Bucket: this.bucketName,
                Key: ref,
                Body: blob,
                ACL: "public-read",
            }).promise();
            return uploadImage;
        }
}
module.exports = S3Upload