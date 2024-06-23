// 1 upper/lower case letter, 1 number, 1 special symbol
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/;
const emailRegExp = /^\S+@\S+\.\S+$/;

const generatePassword = () => {
  const charset =
    '!@#$%^&*()' +
    '0123456789' +
    'abcdefghijklmnopqrstuvwxyz' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let newPassword = '';
  for (let i = 0; i < 10; i++) {
    newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return newPassword;
};
module.exports = {
  generatePassword,
  passwordRegExp,
  emailRegExp,
};
