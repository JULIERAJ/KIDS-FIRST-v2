import moment from 'moment';
import { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { DayEvent, DayViewHeader } from './DayEvent.jsx';
import events from './events.js';
import KFToolbar from './KFToolbar.jsx';

import MonthEvent from './MonthEvent.jsx';

import './styles.css';

moment.locale('en-GB');

const localizer = momentLocalizer(moment);

const KFCalendar = () => {

  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        day: { event: DayEvent },
        week: { header: DayViewHeader },
        month: { event: MonthEvent },
        toolbar: KFToolbar,
      },
      defaultDate: new Date(),
    }),
    []
  );

  return (
    <div style={{ height: '100vh' }}>
      <Calendar
        events={events}
        step={15}
        localizer={localizer}
        views={{
          day: true,
          week: true,
          month: true,
        }}
        defaultDate={defaultDate}
        components={components}
      />
    </div>
  );
};

export default KFCalendar;
