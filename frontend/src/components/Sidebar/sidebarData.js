import Album from '../../media/icons/album.png';
import AlbumActive from '../../media/icons/albumActive.png';
import AlbumHover from '../../media/icons/albumHover.svg';
import Calendar from '../../media/icons/calendar.png';
import CalendarActive from '../../media/icons/calendarActive.png';
import CalendarHover from '../../media/icons/calendarHover.svg';
import Help from '../../media/icons/help.png';
import Home from '../../media/icons/home.png';
import HomeActive from '../../media/icons/homeActive.png';
import HomeHover from '../../media/icons/homeHover.svg';

import Kids from '../../media/icons/kids.png';
import KidsActive from '../../media/icons/kidsActive.svg';
import KidsHover from '../../media/icons/kidsHover.svg';
import Message from '../../media/icons/message.png';
import MessageActive from '../../media/icons/messageActive.png';
import MessageHover from '../../media/icons/messageHover.svg';
import Setting from '../../media/icons/setting.png';

export const SIDEBAR_DATA = [
  {
    title: 'Dashboard',
    icon: Home,
    activeIcon: HomeActive,
    hoverIcon: HomeHover,
    path: '/dashboard',
    alt: 'dashboard-icon',
  },
  {
    title: 'Calendar',
    icon: Calendar,
    activeIcon: CalendarActive,
    hoverIcon: CalendarHover,
    path: '/calendar',
    alt: 'calendar-icon',
  },
  {
    title: 'Messages',
    icon: Message,
    activeIcon: MessageActive,
    hoverIcon: MessageHover,
    path: '/messages',
    alt: 'messages-icon',
  },
  {
    title: 'Album',
    icon: Album,
    activeIcon: AlbumActive,
    hoverIcon: AlbumHover,
    path: '/album',
    alt: 'album-icon',
  },
  {
    title: 'Kids’ Info',
    icon: Kids,
    activeIcon: KidsActive,
    hoverIcon: KidsHover,
    path: '/kids',
    alt: 'kids-icon',
  },
  {
    title: 'Settings',
    icon: Setting,
    activeIcon:Setting,
    hoverIcon:Setting,
    path: '/settings',
    alt: 'settings-icon',
  },
  {
    title: 'Help',
    icon: Help,
    activeIcon:Help,
    hoverIcon:Help,
    path: '/help',
    alt: 'help-icon',
  },
];
