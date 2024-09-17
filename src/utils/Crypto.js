import CryptoJS from "crypto-js";
const secretKey = "ounetwork_crypto_secretkey";

// Encoded html
export const encryptHTML = (htmlContent) => {
  return CryptoJS.AES.encrypt(htmlContent, secretKey).toString();
}

// Decoded html
export const decryptHTML = (encryptedContent) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedContent, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    // Check if decryption was successful (i.e., if decryptedText is not empty)
    if (!decryptedText) {
      throw new Error('Decryption failed or the content is not valid UTF-8.');
    }
    return decryptedText;
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
}
