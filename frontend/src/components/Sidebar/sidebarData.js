import Album from '../../media/icons/album.png';
import AlbumActive from '../../media/icons/albumActive.png';
import AlbumHover from '../../media/icons/albumHover.png';
import Calendar from '../../media/icons/calendar.png';
import CalendarActive from '../../media/icons/calendarActive.png';
import CalendarHover from '../../media/icons/calendarHover.png';
import Message from '../../media/icons/chat.png';
import MessageActive from '../../media/icons/chatActive.png';
import MessageHover from '../../media/icons/chatHover.png';
import Kids from '../../media/icons/face.png';
import KidsActive from '../../media/icons/faceActive.png';
import KidsHover from '../../media/icons/faceHover.png';
import Help from '../../media/icons/help.png';
import HelpActive from '../../media/icons/helpActive.png';
import Home from '../../media/icons/home.png';
import HomeActive from '../../media/icons/homeActive.png';
import HomeHover from '../../media/icons/homeHover.png';

import Setting from '../../media/icons/settings.png';
import SettingActive from '../../media/icons/settingsActive.png';
import SettingHover from '../../media/icons/settingsHover.png';

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
    activeIcon:SettingActive,
    hoverIcon:SettingHover,
    path: '/settings',
    alt: 'settings-icon',
  },
  {
    title: 'Help',
    icon: Help,
    activeIcon:HelpActive,
    hoverIcon:Help,
    path: '/help',
    alt: 'help-icon',
  },
];
