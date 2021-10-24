import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Estadisticas',
    icon: 'trending-up',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Configuraciones',
    group: true
  },
  {
    title: 'Empresas',
    icon: 'briefcase-outline',
    link: '/pages/companies',
    data: ['view', 'users'],
  },
  {
    title: 'Usuarios',
    icon: 'people-outline',
    link: '/pages/users',
    data: ['view', 'users'],
    children: [
      {
        title: 'Listado',
        link: '/pages/users/list',
      },
      {
        title: 'Nuevo',
        link: '/pages/users/create',
        data: ['create', 'users'],
      }
    ]
  }
];
