import React, { useState, useEffect } from 'react';
import { Container, Row, Image, Form } from 'react-bootstrap';
// import { io } from 'socket.io-client';

import Contacts from './Contacts';
import styles from './Conversation.module.css';

import Message from './Message';

import { getMember, getAllConversationForParticularUser } from '../../api';

import StartMessaging from '../../media/features/messaging_pic.png';
import Clip from '../../media/icons/clip.png';
// import Search from '../../media/icons/search.png';

const Conversation = () => {
  // eslint-disable-next-line
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line
  const [firstSenderName, setFirstSenderName] = useState('');
  const [lastSenderName, setSenderLastName] = useState('');
  // eslint-disable-next-line
  const [conversations, setConversations] = useState(['hello', 'hi']);
  // eslint-disable-next-line
  const [socket, setSocket] = useState(null);
  // user who is logged in (principle OR family member ?)
  const userId = '64b5b57804639d47fa598271';

  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        const res = await getMember(userId);
        // eslint-disable-next-line
        console.log(res.data);
        const { firstName, lastName } = res.data;
        setFirstSenderName(firstName);
        setSenderLastName(lastName);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };
    getMemberInfo();
  }, [userId]);
  
  useEffect(() => {
    const getAllConversations = async () => {
      try {
        const res = await getAllConversationForParticularUser(userId);
        // eslint-disable-next-line
        console.log('RES', res.data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };
    getAllConversations();
  }, [userId]);

  // useEffect(() => {
  //   const newSocket = io('http://localhost:3001');
  //   setSocket(newSocket);
  // }, []);

  return (
    <Container className={styles.messenger}>
      <Container className={styles.conversationMenu}>
        <h1>Contacts</h1>
        <hr />
        {conversations.map((c) => (
          <Contacts
            key={c._id}
            conversation={c}
            currentUser={userId}
            firstSenderName={firstSenderName}
            lastSenderName={lastSenderName}
          />
        ))}
      </Container>
      <Container className={styles.conversationBox}>
        <Container className={styles.navbar}>
          <div className={styles.main}>
            <div className={styles.recipient}>
              <span className={styles.letterOfFirstName}>X</span>
              <div className={styles.userOnline}>
                <h1>Michael Daniel</h1>
                <span>Online</span>
              </div>
            </div>
          </div>
        </Container>
        <Container className={styles.chatBox}>
          {messages.length > 0 ? (
            <div className={styles.chatBoxWrapper}>
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
            </div>
          ) : (
            <figure className={styles.bodyForMsg}>
              <Image src={StartMessaging} alt='start-messaging' />
              <figcaption>Start Messaging</figcaption>
            </figure>
          )}
          <hr />
          <Container className={styles.messageBox}>
            <div className={styles.sendMessage}>
              <Row className={styles.writeMessage}>
                <Form.Control
                  as='textarea'
                  className={styles.messageInput}
                  style={{ height: '100px' }}
                  placeholder='Write Message...'
                />
                <label htmlFor='photo-input'>
                  <Image src={Clip} alt='clip' />
                </label>
                <input
                  type='file'
                  id='photo-input'
                  accept='image/*'
                  style={{ display: 'none' }}
                />
              </Row>
              <button>Send</button>
            </div>
          </Container>
        </Container>
      </Container>
      <Container className={styles.conversationOnline}>
        <h1>Emma Clark</h1>
      </Container>
    </Container>
  );
};

export default Conversation;
