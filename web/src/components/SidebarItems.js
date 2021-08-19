import { ImBooks, ImUsers } from 'react-icons/im';

export const SidebarItems = [
    {
        title: 'Tài Khoản',
        path: '/accounts',
        icon: <ImUsers />,
        cName: 'nav-text'
    },
    {
        title: 'Sách',
        path: '/books',
        icon: <ImBooks />,
        cName: 'nav-text'
    },
]