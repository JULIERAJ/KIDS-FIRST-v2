import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Buffer } from 'buffer';

import styles from './MemberImage.module.css';

const BASE_URL = 'http://localhost:8000/api/';

const MemberImage = ({ memberId }) => {
  const [responseRequest, setResponseRequest] = useState(null);
  const [error, setIsError] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [initialData, setInitialData] = useState(null);

  const getMemberImage = async (responseRequest) => {
    if (responseRequest.avatar) {
      const binaryData = responseRequest.avatar.data.data;
      const contentType = responseRequest.avatar.contentType;
      const base64ImageData = Buffer.from(binaryData).toString('base64');
      const dataUrl = `data:${contentType};base64,${base64ImageData}`;
      setImageData(dataUrl);
    } else {
      let initials = '';
      if (responseRequest.firstname) {
        initials += responseRequest.firstname.charAt(0);
      }
      if (responseRequest.lastname) {
        initials += responseRequest.lastname.charAt(0);
      }
      setInitialData(initials);
    }
  };

  useEffect(() => {
    const getMemberData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}member/${memberId}`);
        setResponseRequest(response.data);
      } catch (error) {
        setIsError(error.message);
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    getMemberData();
  }, [memberId]);

  useEffect(() => {
    if (responseRequest) {
      getMemberImage(responseRequest);
    }
  }, [responseRequest]);

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    const avatartFile = event.target.files[0];
    formData.append('avatar', avatartFile);

    try {
      if (imageData) {
        try {
          // Update image
          const response = await axios.put(
            `${BASE_URL}member/update/${memberId}`,
            formData
          );
          if (!response.data.success) {
            setIsError(response.data.message);
          } else {
            setResponseRequest(response.data.updatedMember);
            setIsError(null);
          }
        } catch (error) {
          setIsError(error.message);
          // eslint-disable-next-line no-console
          console.log(error);
        }
      } else {
        try {
          // Upload new image
          const response = await axios.post(
            `${BASE_URL}member/upload/${memberId}`,
            formData
          );
          if (!response.data.success) {
            setIsError(response.data.message);
          } else {
            setResponseRequest(response.data.specifiedMember);
            setIsError(null);
          }
        } catch (error) {
          setIsError(error.message);
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }
    } catch (error) {
      setIsError(error.message);
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
      {error && <p>{error}</p>}
      {!imageData && initialData && <div>{initialData}</div>}
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

MemberImage.propTypes = {
  memberId: PropTypes.string,
};

export default MemberImage;
