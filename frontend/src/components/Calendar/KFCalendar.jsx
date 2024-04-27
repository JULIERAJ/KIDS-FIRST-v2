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
    <div style={{ height: '100vh' }}>
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
      />
    </div>
  );
};

export default KFCalendar;
