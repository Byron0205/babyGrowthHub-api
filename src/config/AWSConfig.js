const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();
const mime = require('mime');

const fs = require('fs');

const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const region = 'us-east-1';


AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region,
});


async function subirArchivoA_S3(nombreArchivo, rutaArchivo, nombreBucket) {
    const s3 = new AWS.S3();
    const mimeType = mime.getType(rutaArchivo);
    const params = {
        Bucket: nombreBucket,
        Key: 'ArchivosUsuarios/' + nombreArchivo,
        Body: fs.createReadStream(rutaArchivo),
        ContentType: mimeType,
        ACL: 'public-read',
        ResponseContentDisposition: 'inline'
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
        });
    });
}

module.exports = {
    subirArchivoA_S3,
};