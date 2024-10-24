import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {v4 as uuidv4} from "uuid"


const s3Client = new S3Client({
    region: 'auto',
    endpoint: `${process.env.CLOUDFLARE_ENDPOINT}`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY || '',
    },
    forcePathStyle: true
  });

const uploadImg = async (req: any, res: any) => {
    console.log("hitting");
    
    try {
        if (!req.file) {
            console.log("No file");
            return
        }

        if (!process.env.CLOUDFLARE_BUCKET_NAME || !process.env.CLOUDFLARE_PUBLIC_URL) {
            throw new Error('Missing required environment variables');
          }

          const fileExtension = req.file.originalname.split(".").pop();
          const fileName = `${uuidv4()}.${fileExtension}`

          const uploadParams = {
            Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
          };

          await s3Client.send(new PutObjectCommand(uploadParams))

          const url = `${process.env.CLOUDFLARE_PUBLIC_URL}/${fileName}`
          return res.status(200).json({message: "success",url: url })
    } catch (error) {
        console.log(error);
    }
}

export {uploadImg}