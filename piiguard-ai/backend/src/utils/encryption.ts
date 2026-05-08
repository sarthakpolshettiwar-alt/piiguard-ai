import CryptoJS from 'crypto-js'
import { env } from '../config/env'

export function encrypt(plainText: string): string {
  return CryptoJS.AES.encrypt(plainText, env.ENCRYPTION_KEY).toString()
}

export function decrypt(cipherText: string): string {
  const bytes = CryptoJS.AES.decrypt(cipherText, env.ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}
