export const authValidators = {
  login: v => v.length < 3 || v.length > 12 || /[\s]+/.test(v),
  password: v => v.length < 8,
  confirmPassword: (passV, confPassV) => passV !== confPassV, 
};