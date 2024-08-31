import { Address, getAddress } from 'viem'
import crypto from 'crypto'
// import { generateSiweNonce } from 'viem/siwe'

export const encryptAddress = async (address: Address, salt: string) => {
  const normalizedAddress = getAddress(address)
  console.log('normalizedAddress', normalizedAddress)

  const key = crypto.scryptSync(salt, 'salt', 32)
  console.log('salt', salt)
  const iv = crypto.randomBytes(16)
  console.log('iv', iv)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  console.log('cipher', cipher)
  let encryptedAddress = cipher.update(normalizedAddress, 'utf8', 'hex')
  encryptedAddress += cipher.final('hex')
  console.log('encrypted', iv + ':' + encryptedAddress)
  return iv.toString('hex') + ':' + encryptedAddress
}

export const decryptAddress = async (data: string, salt: Buffer) => {
  const [ivHex, encryptedAddress] = data.split(':')
  console.log('ivHex', ivHex)
  console.log('encryptedAddress', encryptedAddress)
  console.log('salt', salt)
  // Create a key from the salt
  const key = crypto.scryptSync(salt, 'salt', 32)
  console.log('key', key)
  // Create decipher
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    key,
    Buffer.from(ivHex, 'hex')
  )
  let decryptedAddress = decipher.update(encryptedAddress, 'hex', 'utf8')
  console.log('decryptedAddress', decryptedAddress)
  decryptedAddress += decipher.final('utf8')
  console.log('decryptedAddress', getAddress(decryptedAddress))
  return decryptedAddress.toLowerCase()
}
