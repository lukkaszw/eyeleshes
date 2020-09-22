const ERRORS = require('./errors');

const sendGetErrors = (error, res) => {
  if(error.kind && error.kind === "ObjectId") {
    res.status(400).json({
      error: ERRORS.BAD_LINK,
    });
    return;
  }

  res.status(500).json({
    error: ERRORS.BAD_SERVER,
  });
}

const sendPostErrors = (error, res, formError) => {
  if(error.errors) {
    res.status(400).json({
      error: formError,
    })
    return;
  }

  res.status(500).json({
    error: ERRORS.BAD_SERVER,
  });
}

const sendPutErrors = (error, res, formError) => {
  if(error.kind && error.kind === "ObjectId") {
    res.status(400).json({
      error: ERRORS.BAD_LINK,
    });
    return;
  }

  sendPostErrors(error, res, formError);
}

module.exports = {
  sendGetErrors,
  sendPostErrors,
  sendPutErrors,
}