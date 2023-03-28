import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Buffer } from 'buffer';

import styles from './MemberImage.module.css';

const BASE_URL = 'http://localhost:8000/api/';

const MemberImage = ({ memberId }) => {
  const [imageData, setImageData] = useState(null);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const getMemberImage = async () => {
      // eslint-disable-next-line no-console
      try {
        const response = await axios.get(`${BASE_URL}member/${memberId}`);
        // eslint-disable-next-line no-console
        console.log(response);
        if (response.data.avatar) {
          const binaryData = response.data.avatar.data.data;
          const contentType = response.data.avatar.contentType;
          const base64ImageData = Buffer.from(binaryData).toString('base64');
          const dataUrl = `data:${contentType};base64,${base64ImageData}`;
          setImageData(dataUrl);
        } else {
          const initials =
            response.data.firstname.charAt(0) +
            response.data.lastname.charAt(0);
          setInitialData(initials);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    getMemberImage();
  }, [memberId]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      if (imageData) {
        // Update image
        await axios.put(`${BASE_URL}member/update/${memberId}`, formData);
      } else {
        // Upload new image
        await axios.post(`${BASE_URL}member/upload/${memberId}`, formData);
      }

      // Refresh image
      const response = await axios.get(`${BASE_URL}member/${memberId}`);
      if (response.data.avatar) {
        const binaryData = response.data.avatar.data.data;
        const contentType = response.data.avatar.contentType;
        const base64ImageData = Buffer.from(binaryData).toString('base64');
        const dataUrl = `data:${contentType};base64,${base64ImageData}`;
        setImageData(dataUrl);
        setInitialData(null);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className={styles.avatar}>
      {imageData && (
        <img
          src={imageData}
          alt="Member Avatar"
          style={{ maxWidth: '200px' }}
        />
      )}
      {!imageData && initialData && <div>{initialData}</div>}
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

MemberImage.propTypes = {
  memberId: PropTypes.string,
};

export default MemberImage;
