export const EMAIL_REG_EXP = /^\S+@\S+\.\S+$/;

/**
  RegExp: at least one symbol, uppercase letter, lowercase letter, number,
  min length 8 characters, max length 20 characters
*/
export const PASSWORD_REG_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
