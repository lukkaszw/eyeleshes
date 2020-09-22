const ERRORS = {
  BAD_LINK: 'Niewłaściwy link do zasobu! Sprawdź go i spróbuj ponownie!',
  BAD_SERVER: 'Niepowodzenie! Problemy z serwerem! Spróbuj ponownie później.',
  NOT_FOUND: 'Nie znaleziono szukanego zasobu!',
  FORMS: {  
    client: {
      post: 'Nieprawidłowe dane z formularza! Koniecznie wypełnij imię i nazwisko (oba maksymalnie po 30 znaków)!',
      update: 'Nieprawidłowa próba edycji! Zezwolono edytować: imię i nazwisko!',
    },
    visit: {
      post: 'Nieprawidłowe dane z formularza! Koniecznie podaj parametry i datę, opcjonalnie komentarz (maksymalnie 500 znaków)',
      update: 'Nieprawidłowa próba edycji! Zezwolono edytować: parametry, data, komentarz.',
    }
  }
}

module.exports = ERRORS;