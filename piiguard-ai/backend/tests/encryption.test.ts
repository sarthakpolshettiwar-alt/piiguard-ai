import { encrypt, decrypt } from '../src/utils/encryption'

describe('Encryption', () => {
  test('should encrypt and decrypt text correctly', () => {
    const original = 'john@example.com'
    const encrypted = encrypt(original)
    const decrypted = decrypt(encrypted)
    expect(decrypted).toBe(original)
    expect(encrypted).not.toBe(original)
  })

  test('should produce different ciphertext for same input', () => {
    const text = 'test@test.com'
    const enc1 = encrypt(text)
    const enc2 = encrypt(text)
    // AES with random IV should produce different ciphertexts
    // CryptoJS uses random salt, so they should differ
    expect(enc1).not.toBe(enc2)
  })

  test('should handle empty string', () => {
    const encrypted = encrypt('')
    const decrypted = decrypt(encrypted)
    expect(decrypted).toBe('')
  })
})
