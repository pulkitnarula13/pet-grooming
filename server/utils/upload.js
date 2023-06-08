const AWS = require('aws-sdk');
require('dotenv').config();

const S3 = new AWS.S3({
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET,
    region: "us-east-1"
});


/**
 * @description Uploads the image to s3 server
 * @param {*} imageName
 * @param {*} base64Image
 * @param {*} type
 * @param {*} user
 * @return {*} 
 */
async function upload(imageName, base64Image, type, user, name)  {
    const params = {
        Bucket: `${process.env.BUCKET}/images/${user}/${name}`,
        Key: imageName,
        Body: new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        ContentType: type
    };

    let data;

    try {
        data = await promiseUpload(params);
    } catch (err) {
        console.error(err);

        return "";
    }

    return data.Location;
}

/**
 * @description Promise an upload to S3
 * @param params S3 bucket params
 * @return data/err S3 response object
 */
function promiseUpload(params) {
    return new Promise(function (resolve, reject) {
        S3.upload(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = upload;