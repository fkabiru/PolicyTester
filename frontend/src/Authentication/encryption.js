const Cipherer = () => {
  var CryptoJS = require("crypto-js");
  var iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  var salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);

  var aesUtil = new AesUtil(128, 1000);
  var ciphertext = aesUtil.encrypt(salt, iv, $("#key").text(), $scope.password);

  var aesPassword = iv + "::" + salt + "::" + ciphertext;
  var password = btoa(aesPassword);
  var data = {
    userName: $scope.userName,
    password: password,
  };
};
export default Cipherer;
