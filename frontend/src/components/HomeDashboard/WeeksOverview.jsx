import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCircle } from 'react-icons/fa6';
import "./HomeDashboard.css";

// Add your custom styles directly into the component file
const customStyles = {
  yellow: {
    backgroundColor: '#ffeb3b', // or any yellow you like
    color: 'black', // default text color for non-Saturday yellow cards
  },
  red: {
    backgroundColor: '#f44336', // or any red you like
  },
  purple: {
    backgroundColor: '#9c27b0', // or any purple you like
  },
  grey: {
    backgroundColor: '#D3D3D3', // Bootstrap grey
  },
  orange: {
    backgroundColor: '#fd7e14', // or any orange you like
    color: 'white', // white text color for Saturday
  },
};

const DayCard = ({ day, date, events, isToday }) => {
  const headerColor = isToday ? customStyles.orange : customStyles.grey;
  const textColor = isToday ? 'white' : 'black';

  return (
    <Card
      style={{
        flex: '1 1 230px',
        borderRadius: '24px',
        marginTop: '10px',
        maxWidth:'230px',
        minWidth:'140px',
        width: '100%',
        height: '245px',
      }}
    >
      <Card.Header
        className="text-center"
        style={{
          ...headerColor,
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          height: '60.6px',
          width: '100%',
        }}
      >
        <div
          style={{
            fontSize: '22px',
            fontWeight: '600',
            lineHeight: '25.78px',
            color: textColor, // text color for today and other days
          }}
        >
          {day}
        </div>
        <div
          style={{
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: '21.09px',
            color: textColor, // text color for today and other days
          }}
        >
          {date}
        </div>
      </Card.Header>
      <Card.Body>
        {events.map((event) => (
          <div key={event.id} className="d-flex">
            <FaCircle
              style={{ width: '10.8px', height: '11px' }}
              color={event.color}
              className="me-2 mt-1 align-self-start"
            />
            <div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'gray',
                  fontWeight: '200',
                }}
              >
                {event.time}
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                }}
              >
                {event.title}
              </div>
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default function WeeksOverview() {
  const days = [
    {
      id: 1,
      day: 'Mon',
      date: 'Nov 02',
      events: [
        {
          id: 1,
          time: '09:00 - 09:30 AM',
          title: 'Parent-Teacher Meeting',
          color: '#FAE3AA',
        },
      ],
    },
    {
      id: 2,
      day: 'Tue',
      date: 'Nov 03',
      events: [
        { id: 2, time: '08:00 - 11:00 AM', title: 'Field Trip', color: '#FF6B6D' },
        {
          id: 3,
          time: '05:00 - 06:00 PM',
          title: 'Doctor Appointment',
          color: '#C29EEF',
        },
      ],
    },
    {
      id: 3,
      day: 'Wed',
      date: 'Nov 04',
      events: [
        {
          id: 4,
          time: '12:00 - 02:00 PM',
          title: 'Play Rehearsal',
          color: '#FAE3AA',
        },
      ],
    },
    {
      id: 4,
      day: 'Thu',
      date: 'Nov 05',
      events: [
        { id: 5, time: '08:00 - 11:00 AM', title: 'Field Trip', color: '#FF6B6D' },
      ],
    },
    {
      id: 5,
      day: 'Fri',
      date: 'Nov 06',
      events: [
        {
          id: 6,
          time: '12:30 - 01:30 PM',
          title: 'Soccer Practice',
          color: '#FF6B6D',
        },
      ],
    },
    {
      id: 6,
      day: 'Sat',
      date: 'Nov 07',
      events: [
        {
          id: 7,
          time: '12:30 - 01:30 PM',
          title: 'Soccer Practice',
          color: '#FF6B6D',
        },
      ],
    },
  ];

  const today = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
  const formattedDate = formatter.format(today).replace(/,/g, '');
  const todayParts = formattedDate.split(' ');

  // Define today's events
  const todayEvents = [
    { id: 8, time: '08:00 - 11:00 AM', title: 'Field Trip', color: '#FF6B6D' },
  ];

  // Add today's date to the days array
  days.unshift({
    id: 0,
    day: todayParts[0],
    date: `${todayParts[1]} ${todayParts[2]}`,
    events: todayEvents,
  });

  return (
    <div className="week-event">
      <div>
        <h5
          style={{
            fontFamily: 'Roboto',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '18.75px',
          }}
        >
          Calendar
        </h5>
      </div>

      <div>
        <p
          style={{
            fontFamily: 'Roboto',
            fontWeight: '300',
            fontSize: '16px',
            lineHeight: '18.75px',
          }}
        >
          Overview of this week’s events.
        </p>
      </div>
      <Row className="flex-nowrap" style={{ overflowX: 'auto' }}>
        {days.map((day) => (
          <Col key={day.id} style={{ flex: 1, minWidth: '160px' }}>
            <DayCard
              day={day.day}
              date={day.date}
              events={day.events}
              isToday={day.id === 0} // today is always the first element in the array
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
