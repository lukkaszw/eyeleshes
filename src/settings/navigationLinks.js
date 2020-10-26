import { faReply, faUsers, faList, faChartLine, faUserCog, faPlus  } from '@fortawesome/free-solid-svg-icons';

export const NOT_AUTH_LINKS = [
  {
    id: 1,
    title: 'Strona główna',
    to: '/',
  },
  {
    id: 2,
    title: 'O nas',
    to: '/about',
  },
  {
    id: 3,
    title: 'Zaloguj się',
    to: '/auth/#login',
  },
];

export const AUTH_LINKS = [
  {
    id: 1,
    title: 'Klienci',
    to: '/clients',
  },
  {
    id: 2,
    title: 'Moje konto',
    to: '/account',
  },
  {
    id: 3,
    title: 'Wyloguj się',
    to: '/logout',
  },
];

const BACK_LINK =  {
  id: 1,
  ariaLabel: 'wróć',
  icon: faReply,
  exact: true,
  callback: 'GO_BACK',
};

const CLIENTS_LINK =  {
  id: 2,
  ariaLabel: 'klienci',
  icon: faUsers,
  to: '/clients',
};

const ACCOUNT_LINK = {
  id: 9,
  ariaLabel: 'ustawienia konta',
  icon: faUserCog,
  to: '/account/settings',
};

export const ACCOUNT_NAV = [
  BACK_LINK,
  CLIENTS_LINK,
  {
    id: 3,
    ariaLabel: 'wizyty',
    icon: faList,
    exact: true,
    to: '/account/visits',
  },
  {
    id: 4,
    ariaLabel: 'statystyki',
    icon: faChartLine,
    exact: true,
    to: '/account',
  },
  ACCOUNT_LINK,
];

export const CLIENTS_LINKS = [
  BACK_LINK,
  CLIENTS_LINK,
  {
    id: 3,
    ariaLabel: 'Dodaj klienta',
    callback: 'ADD',
    to: "/#",
    exact: true,
    icon: faPlus,
  },
  ACCOUNT_LINK,
];

export const CLIENT_LINKS = [
  BACK_LINK,
  {
    ...CLIENTS_LINK,
    exact: true,
  },
  {
    id: 3,
    ariaLabel: 'Dodaj wizytę',
    callback: 'ADD',
    to: "/#",
    exact: true,
    icon: faPlus,
  },
  ACCOUNT_LINK,
];

export const ADD_VISIT_PAGE_LINKS = [
  BACK_LINK,
  {
    ...CLIENTS_LINK,
    exact: true,
  },
  ACCOUNT_LINK,
]