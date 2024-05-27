import moment from 'moment';
import React, { useState, useContext, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { DayEvent, DayViewHeader } from './DayEvent.jsx';
import EventContext from './EventContext';
import KFToolbar from './KFToolbar.jsx';
import MonthEvent from './MonthEvent.jsx';
import './styles.css';
import WeekEvent from './WeekEvent.jsx';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const KFCalendar = () => {
  const { filteredEventsData } = useContext(EventContext);
  const [activeView, setActiveView] = useState('month'); // State to manage active view

  const getMaxOverlaps = (event, events) => {
    let maxOverlaps = 1; // Assume at least the event itself
    const eventStart = new Date(event.start).getTime();
    const eventEnd = new Date(event.end).getTime();
    // eslint-disable-next-line no-console
    console.log('events: ', events);
    events.forEach(otherEvent => {

      if (event.id !== otherEvent.id) {
        const otherStart = new Date(otherEvent.start).getTime();
        const otherEnd = new Date(otherEvent.end).getTime();

        if ((otherStart < eventEnd && otherEnd > eventStart) || (eventStart < otherEnd && eventEnd > otherStart)) {
          maxOverlaps++;
        }
      }
    });

    return maxOverlaps;
  };

  const eventStyleGetter = (event) => {
    const overlaps = getMaxOverlaps(event, filteredEventsData);
    const width = 100 / overlaps; // Divide 100% by the number of overlapping events
    // eslint-disable-next-line no-console
    console.log('width is : ', width);
    return {
      style: {
        width: `${width}% !important`
      }
    };
  };

  const handleViewChange = (view) => {
    setActiveView(view); // Update active view state
  };

  const { components, defaultDate } = useMemo(() => ({
    components: {
      day: { event: DayEvent },
      week: { header: DayViewHeader, event: WeekEvent },
      month: { event: MonthEvent },
      toolbar: (props) => (
        <KFToolbar {...props} activeView={activeView} setActiveView={setActiveView} />
      ),
    },
    defaultDate: new Date(),
  }), [activeView]);

  return (
    <div style={{ height: 'calc(100vh - 104px)' }}>
      <Calendar
        events={filteredEventsData}
        step={15}
        localizer={localizer}
        views={{
          day: true,
          week: true,
          month: true,
        }}
        components={components}
        defaultDate={defaultDate}
        onView={handleViewChange}
        popup={true}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default KFCalendar;
