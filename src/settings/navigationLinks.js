import { faReply, faUsers, faList, faChartLine, faUserCog  } from '@fortawesome/free-solid-svg-icons';

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

export const ACCOUNT_NAV = [
  {
    id: 1,
    ariaLabel: 'wróć',
    icon: faReply,
    exact: true,
    callback: 'go back',
  },
  {
    id: 2,
    ariaLabel: 'klienci',
    icon: faUsers,
    to: '/clients',
  },
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
  {
    id: 5,
    ariaLabel: 'ustawienia konta',
    icon: faUserCog,
    to: '/account/settings',
  },
];