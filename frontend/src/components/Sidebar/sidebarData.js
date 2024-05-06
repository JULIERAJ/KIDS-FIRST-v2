import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import CollectionsIcon from '@mui/icons-material/Collections';
import FaceIcon from '@mui/icons-material/Face';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

export const SIDEBAR_DATA = [
  {
    title: 'Dashboard',
    icon: <HomeIcon color="action" sx={{ fontSize: 32 }} />,
    activeIcon: <HomeIcon sx={{ color: '#F08324', fontSize: 32 }} />,
    hoverIcon:  <HomeIcon sx={{ fontSize: 32 }} />,
    path: '/dashboard',
    alt: 'dashboard-icon',
  },
  {
    title: 'Calendar',
    icon: <CalendarMonthIcon color="action" sx={{ fontSize: 32 }} />,
    activeIcon: <CalendarMonthIcon sx={{ color: '#F08324', fontSize: 32 }}/>,
    hoverIcon: <CalendarMonthIcon sx={{ fontSize: 32 }} />,
    path: '/calendarview',
    alt: 'calendar-icon',
  },
  {
    title: 'Messages',
    icon: <ChatIcon color="action" sx={{ fontSize: 32 }}/>,
    activeIcon: <ChatIcon sx={{ color: '#F08324', fontSize: 32 }}/>,
    hoverIcon: <ChatIcon sx={{ fontSize: 32 }} />,
    path: '/messages',
    alt: 'messages-icon',
  },
  {
    title: 'Album',
    icon: <CollectionsIcon color="action" sx={{ fontSize: 32 }}/>,
    activeIcon: <CollectionsIcon sx={{ color: '#F08324', fontSize: 32 }}/>,
    hoverIcon: <CollectionsIcon sx={{ fontSize: 32 }}/>,
    path: '/album',
    alt: 'album-icon',
  },
  {
    title: 'Kids’ Info',
    icon: <FaceIcon color="action" sx={{ fontSize: 32 }}/>,
    activeIcon: <FaceIcon sx={{ color: '#F08324', fontSize: 32 }}/>,
    hoverIcon: <FaceIcon sx={{ fontSize: 32 }} />,
    path: '/kids',
    alt: 'kids-icon',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon color="action" sx={{ fontSize: 32 }}/>,
    activeIcon:<SettingsIcon sx={{ color: '#F08324', fontSize: 32 }}/>,
    hoverIcon:<SettingsIcon sx={{ fontSize: 32 }} />,
    path: '/settings',
    alt: 'settings-icon',
  },
  {
    title: 'Help',
    icon: <HelpOutlineIcon color="action" sx={{ fontSize: 32 }}/>,
    activeIcon: <HelpOutlineIcon sx={{ color: '#F08324', fontSize: 32 }}/>,
    hoverIcon: <HelpOutlineIcon sx={{ fontSize: 32 }} />,
    path: '/help',
    alt: 'help-icon',
  },
];
