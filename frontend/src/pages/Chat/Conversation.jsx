import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { io } from 'socket.io-client';

import styles from './Conversation.module.css';

import Message from './Message';

import StartMessaging from '../../media/features/messaging_pic.png';
import Clip from '../../media/icons/clip.png';
import Search from '../../media/icons/search.png';

const Conversation = () => {
  // eslint-disable-next-line
  const [messages, setMessages] = useState(['hello']);
  // eslint-disable-next-line
  const [socket, setSocket] = useState(null);
  // const [newMessage, setNewMessage] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const showInput = () => {
    setShowSearch((prev) => !prev);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);
  }, []);

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.main}>
          <div className={styles.recipient}>
            <span className={styles.letterOfFirstName}>M</span>
            <div className={styles.userOnline}>
              <h1>Michael Daniel</h1>
              <span>Online</span>
            </div>
          </div>

          {!showSearch && <Image src={Search} onClick={showInput} />}
          {showSearch && (
            <input
              type='text'
              className={styles.searchInput}
              placeholder='Search...'
            />
          )}
        </div>
      </div>
      <div className={styles.chatBox}>
        {messages.length > 0 ? (
          <div className={styles.chatBoxWrapper}>
            <Message own={false} />
            <Message own={false} />
            <Message own={true} />
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
          <Col className={styles.sendMessage}>
            <Row className={styles.writeMessage}>
              <textarea
                className={styles.messageInput}
                rows='8'
                cols='100'
                placeholder='Write Message...'></textarea>
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
          </Col>
        </Container>
      </div>
    </>
  );
};

export default Conversation;
