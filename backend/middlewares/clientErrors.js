const sendGetErrors = (error, res) => {
  if(error.kind && error.kind === "ObjectId") {
    res.status(400).json({
      error: 'Niewłaściwy link do zasobu! Sprawdź go i spróbuj ponownie!',
    });
    return;
  }

  res.status(500).json({
    error: 'Niepowodzenie! Problemy z serwerem! Spróbuj ponownie później.',
  });
}

const sendPostErrors = (error, res) => {
  if(error.errors) {
    res.status(400).json({
      error: 'Nieprawidłowe dane z formularza! Możliwe pola: name, surname (oba maksymalnie po 30 znaków).',
    })
    return;
  }

  res.status(500).json({
    error: 'Niepowodzenie! Problemy z serwerem. Spróbuj ponownie później!',
  });
}

const sendPutErrors = (error, res) => {
  if(error.kind && error.kind === "ObjectId") {
    res.status(400).json({
      error: 'Niewłaściwy link do zasobu! Sprawdź go i spróbuj ponownie!',
    });
    return;
  }

  sendPostErrors(error, res);
}

module.exports = {
  sendGetErrors,
  sendPostErrors,
  sendPutErrors,
}