import aws from "aws-sdk";

const Image = async (req, res) => {
    aws.config.update({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'ap-northeast-2',
        signatureVersion: 'v4'
    });

    const s3 = new aws.S3();
    const url = await s3.createPresignedPost({
        Bucket: process.env.BUCKET_NAME,
        Fields: { key: req.query.file },
        Expires: 60,
        Conditions: [
            ['content-length-range', 0, 1048576]
        ]
    })

    res.status(200).json(url);
}

export default Image;