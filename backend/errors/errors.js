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
      post: 'Nieprawidłowe dane z formularza! Koniecznie podaj parametry, methodę, grubość rzęs, datę, cenę, opcjonalnie komentarz (maks. 500 znaków)',
      update: 'Nieprawidłowa próba edycji! Zezwolono edytować: parametry, methoda, grubość rzęs, data, komentarz, cena.',
    },
    user: {
      removePassword: 'Nie udało się usunąć użytkownika! Nieprawidłowe hasło!',
      updateUser: 'Nie udało się zmienić danych użytkownika. Nieprawidłowe hasło lub login!',
    }
  },

}

module.exports = ERRORS;