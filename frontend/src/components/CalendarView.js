import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment); 

function CalendarView() {
  return (
    <div style={{ height: '100vh' }}>
      <Calendar
        localizer={localizer}
        events={[
          // your events here
        ]}
        views={['month', 'week', 'day']}
        defaultView="month"
        selectable={true}
        onSelectSlot={(slotInfo) => console.log(slotInfo)}
        style={{ height: '100%' }}
      />
    </div>
  );
}

export default CalendarView;
