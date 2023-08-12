import DashboardIcon from '../../../assest/icons/dashboard.svg';
import ShippingIcon from '../../../assest/icons/uniIcon.png';
import ProductIcon from '../../../assest/icons/productIcon.png';
import UserIcon from '../../../assest/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/forms',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: UserIcon,
        path: '/users',
        title: 'User',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/product',
        title: 'Products',
    },
    
]

export default sidebar_menu;