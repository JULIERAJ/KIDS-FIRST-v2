import React from 'react';

import styles from './Chat.module.css';

import StartMessaging from '../../media/features/messaging_pic.png';
import Clip from '../../media/icons/clip.png';
import Search from '../../media/icons/search.png';

const Chat = () => {
  return (
    <>
      <section className={styles.navbar}>
        <div className={styles.main}>
          <div className={styles.recipient}>
            <span className={styles.letterOfFirstName}>M</span>
            <div className={styles.userOnline}>
              <h1>Michael Daniel</h1>
              <span>Online</span>
            </div>
          </div>

          <img src={Search} />
        </div>
      </section>
      <figure className={styles.bodyForMsg}>
        <img src={StartMessaging} alt='start-messaging' />
        <figcaption>Start Messaging</figcaption>
      </figure>

      <section className={styles.messageBox}>
        <div className={styles.sendMessage}>
          <div className={styles.writeMessage}>
            <textarea
              className={styles.messageInput}
              rows='8'
              cols='100'
              placeholder='Write Message...'></textarea>
            <label htmlFor='photo-input'>
              <img src={Clip} alt='clip' />
            </label>
            <input
              type='file'
              id='photo-input'
              accept='image/*'
              style={{ display: 'none' }}
            />
          </div>
          <button>Send</button>
        </div>
      </section>
    </>
  );
};

export default Chat;
