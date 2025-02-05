var CryptoJS = require('crypto-js');
const REACT_APP_SESSION_SECRET_KEY = process.env.REACT_APP_DOMAIN_ENDPOINT;
//console.log('decrypted Data -');
//EecodeData+++++++++++++++++++Starts
const encrypt = async endata => {
  if (endata) {
    //console.log('Inside encrypt');
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(endata), 'myezmoov-secret-key@123').toString();
    //console.log(ciphertext);
    return ciphertext;
  }
};
//EecodeData+++++++++++++++++++Ends

//DecodeData+++++++++++++++++++Starts
const decrypt = dedata => {
  if (dedata) {
    var bytes = CryptoJS.AES.decrypt(dedata, 'myezmoov-secret-key@123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    //log decrypted Data
    //console.log('decrypted Data -');
    // console.log(decryptedData);
    return decryptedData;
  }
};
//DecodeData+++++++++++++++++++Ends
// module.exports = { encrypt, decrypt };
export { encrypt, decrypt };
