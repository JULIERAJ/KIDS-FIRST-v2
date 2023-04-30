import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

import styles from './Chat.module.css';

import StartMessaging from '../../media/features/messaging_pic.png';
import Clip from '../../media/icons/clip.png';
import Search from '../../media/icons/search.png';

const Chat = () => {
  return (
    <Container>
      <div className={styles.navbar}>
        <div className={styles.main}>
          <div className={styles.recipient}>
            <span className={styles.letterOfFirstName}>M</span>
            <div className={styles.userOnline}>
              <h1>Michael Daniel</h1>
              <span>Online</span>
            </div>
          </div>

          <Image src={Search} />
        </div>
      </div>
      <figure className={styles.bodyForMsg}>
        <Image src={StartMessaging} alt='start-messaging' />
        <figcaption>Start Messaging</figcaption>
      </figure>

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
    </Container>
  );
};

export default Chat;
