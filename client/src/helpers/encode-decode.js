const { base64encode, base64decode } = require('nodejs-base64');

//ENCODE
const encrypttheid = (req, res) => {
  //console.log(req);
  const dataid = req; //34
  //console.log(dataid);//34
  const encryptdata = (dataid * 123456789 * 5678) / 956783;
  //console.log(encryptdata);
  let encoded = base64encode(encryptdata);
  //console.log(encoded);//MjQ5MTAxMjAuNzE3MDU3MDUz
  return encoded;
};
//-----------------------------------------------------------------
//DECODE
const decodetheid = (req, res) => {
  const encodeddata = req; //MjQ5MTAxMjAuNzE3MDU3MDUz
  let decoded = base64decode(encodeddata);
  const orgidBeforeRounding = (decoded * 956783) / (123456789 * 5678);
  const orgid = Math.round(orgidBeforeRounding);
  //console.log(orgid);//34

  return orgid;
};
//-----------------------------------------------------------------
module.exports = { encrypttheid, decodetheid };
