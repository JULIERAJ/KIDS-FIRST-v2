import moment from 'moment';
import { useMemo, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { DayEvent, DayViewHeader } from './DayEvent.jsx';

import EventContext from './EventContext';
import KFToolbar from './KFToolbar.jsx';
import MonthEvent from './MonthEvent.jsx';
import './styles.css';
import WeekEvent from './WeekEvent.jsx';

moment.locale('en-GB');

const localizer = momentLocalizer(moment);

const KFCalendar = (props) => {

  const { filteredEventsData } = useContext(EventContext);
  //console.log(filteredEventsData);
  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        day: { event: DayEvent, header: DayViewHeader },
        week: { event: WeekEvent, header: DayViewHeader},
        month: { event: MonthEvent, header: DayViewHeader },
        toolbar: KFToolbar,
      },
      defaultDate: new Date(),
    }),
    []
  );

  return (
    <div style={{ height: '100vh' }}>
      <Calendar
        events={ filteredEventsData }
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
