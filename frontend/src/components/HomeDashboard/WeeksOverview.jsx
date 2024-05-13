import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCircle } from 'react-icons/fa6';

// Add your custom styles directly into the component file
const customStyles = {
  yellow: {
    backgroundColor: '#ffeb3b', // or any yellow you like
  },
  red: {
    backgroundColor: '#f44336', // or any red you like
  },
  purple: {
    backgroundColor: '#9c27b0', // or any purple you like
  },
  grey: {
    backgroundColor: '#D3D3D3 ', // Bootstrap grey
  },
  orange: {
    backgroundColor: '#fd7e14', // or any orange you like
  },
};

const DayCard = ({ day, date, events }) => {
  const headerColor = day === 'Sat' ? customStyles.orange : customStyles.grey;

  return (
    <>
      <Card
        style={{
          borderRadius: '24px',
          marginTop: '10px',
          width: '170px',
          height: '245px',
        }}
      >
        <Card.Header
          className=" text-center"
          style={{
            ...headerColor,
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            height: '60.6px',
            width: '170px',
          }}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: '600',

              lineHeight: '25.78px',
            }}
          >
            {day}
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: '400',

              lineHeight: '21.09px',
            }}
          >
            {date}
          </div>
        </Card.Header>
        <Card.Body>
          {events.map((event, index) => (
            <div key={index} className="d-flex">
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
    </>
  );
};

export default function WeeksOverview() {
  const days = [
    {
      day: 'Mon',
      date: 'Nov 02',
      events: [
        {
          time: '09:00 - 09:30 AM',
          title: 'Parent-Teacher Meeting',
          color: '#FAE3AA',
        },
      ],
    },
    {
      day: 'Tue',
      date: 'Nov 03',
      events: [
        { time: '08:00 - 11:00 AM', title: 'Field Trip', color: '#FF6B6D' },
        {
          time: '05:00 - 06:00 PM',
          title: 'Doctor Appointment',
          color: '#C29EEF',
        },
      ],
    },
    {
      day: 'Wed',
      date: 'Nov 04',
      events: [
        {
          time: '12:00 - 02:00 PM',
          title: 'Play Rehearsal',
          color: ' #FAE3AA     ',
        },
      ],
    },
    {
      day: 'Thu',
      date: 'Nov 05',
      events: [
        { time: '08:00 - 11:00 AM', title: 'Field Trip', color: '#FF6B6D' },
      ],
    }, // An empty events array
    {
      day: 'Fri',
      date: 'Nov 06',
      events: [
        {
          time: '12:30 - 01:30 PM',
          title: 'Soccer Practice',
          color: '#FF6B6D',
        },
      ],
    },
    {
      day: 'Sat',
      date: 'Nov 06',
      events: [
        {
          time: '12:30 - 01:30 PM',
          title: 'Soccer Practice',
          color: '#FF6B6D',
        },
      ],
    },
    {
      day: 'Sun',
      date: 'Nov 06',
      events: [
        {
          time: '12:30 - 01:30 PM',
          title: 'Soccer Practice',
          color: '#FF6B6D',
        },
      ],
    },
    // ... and so on for the rest of the days
  ];
  return (
    <Container className="mt-4">
      <div>
        <h5
          style={{
            font: 'Roboto',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '18.75px',
          }}
        >
          Calendar
        </h5>
      </div>

      <div>
        {' '}
        <p
          style={{
            font: 'Roboto',
            fontWeight: '300',
            fontSize: '16px',
            lineHeight: '18.75px',
          }}
        >
          Overview of this week’s events.
        </p>
      </div>
      <Row className="flex-nowrap" style={{ overflowX: 'auto' }}>
        {days.map((day, index) => (
          <Col key={index} style={{ flex: 1, minWidth: '160px' }}>
            {' '}
            {/* Minimum width can be adjusted */}
            <DayCard day={day.day} date={day.date} events={day.events} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
