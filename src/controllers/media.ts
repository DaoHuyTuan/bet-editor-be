import { Request, Response } from 'express'
import { generateSiweNonce } from 'viem/siwe'
import { s3Client } from '../S3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
const upload = async (req: Request, res: Response, next: any) => {
  try {
    const { name } = req.body
    const key = generateSiweNonce()
    const timestamp = new Date().getTime()
    s3Client.send
    const urlAssets = `${timestamp}-${key}-${name}`
    const command = new PutObjectCommand({
      Bucket: 'bet-s3',
      Key: urlAssets,
      ContentType: 'image/jpeg'
    })

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
    console.log('url', url)
    return res.status(200).json({ url })
  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong!', error })
  }
}

export default {
  upload
}
