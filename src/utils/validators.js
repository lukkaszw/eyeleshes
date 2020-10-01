export const authValidators = {
  login: v => v.length < 3 || v.length > 12 || /[\s]+/.test(v),
  password: v => v.length < 8,
  confirmPassword: (passV, confPassV) => passV !== confPassV, 
};

export const visitsValidator = {
  //later
  parameters: v => false,
  //
  price: v => !/^\d+(.\d{1,2})?$/.test(v),
  comment: v => v.length > 500,
}

export const yearsValidators = {
  yearFrom: v => parseInt(v) < 2000,
  yearTo: (v, firstV) => parseInt(v) < parseInt(firstV),
}