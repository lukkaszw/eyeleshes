const checkFieldsError = (fields) => fields.some(field => {
    if(field.error || (field.exact && field.value.length === 0)) {
      return true;
    }
    return false;
  })

export default checkFieldsError;