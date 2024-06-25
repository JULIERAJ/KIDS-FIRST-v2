import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaChevronDown, FaPlusCircle } from 'react-icons/fa'; // Importing the chevron down icon

import styles from './EventModal.module.css';

const CustomDropdown = ({
  value,
  onChange,
  options,
  placeholder,
  hasPlusIcon,
  hasChevronIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      className={styles.customDropdown}
      style={{ width: '465px', height: '48px' }}>
      <div className={styles.inputContainer}>
        <div className={styles.selectWithIcon}>
          <Form.Control
            as='select'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.selectField}
            style={{ height: '48px' }}
          >
            <option value='' disabled hidden>{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Form.Control>
          {hasPlusIcon && value === '' && <FaPlusCircle className={styles.dropdownIcon}
            style={{ color: 'gray', fontSize: '24px', marginRight: '90%' }} />}
          {hasChevronIcon && <FaChevronDown className={styles.dropdownIcon} onClick={() => setIsOpen(!isOpen)} />}
        </div>
      </div>
      {isOpen && (
        <div className={styles.dropdownOptions}>
          {options.map((option) => (
            <div key={option} onClick={() => handleOptionSelect(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  hasPlusIcon: PropTypes.bool,
  hasChevronIcon: PropTypes.bool,
};

const EventModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedKids, setSelectedKids] = useState('');
  const [shareWith, setShareWith] = useState('');
  const [repeat, setRepeat] = useState('');
  const [location, setLocation] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [parentName, setParentName] = useState('');
  const [showParentInput, setShowParentInput] = useState(false);

  const handleAllDayChange = () => {
    setAllDay(!allDay);
  };

  const handleShareWithChange = (value) => {
    setShareWith(value);
    if (value === "Enter Parent's Name") {
      setShowParentInput(true);
    } else {
      setShowParentInput(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let shareWithDisplay = shareWith;
    if (shareWith === "Enter Parent's Name") {
      shareWithDisplay = parentName;
    }
    const resultString = `Title: ${title}\nDescription: ${description}\nStart Date:
     ${startDate}\nStart Time: ${startTime}\nEnd Date: ${endDate}\nEnd Time: ${endTime}\nSelected Kids:
      ${selectedKids}\nShare With: ${shareWithDisplay}\nRepeat: ${repeat}\nLocation: ${location}`;
    alert(`Event Data:\n${resultString}`);

    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header
        closeButton
        className={styles.modalHeader}
        style={{ background: '#FFD666', width: '589px', height: '80px' }}>
        <Modal.Title
          className={styles.modalTitle}
          style={{ color: '#FFFEF9', fontSize: '22px', marginLeft: '38%' }}>
          Event Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#F0F2F2', width: '589px' }}>
        <Form
          onSubmit={handleSubmit}
          style={{ background: '#F0F2F2', width: '456px', marginLeft: '48px' }}>
          <Form.Group>
            <Form.Label className={styles.formLabel}>Title:</Form.Label>
            <Form.Control
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter title'
              required
              style={{ width: '465px', height: '48px' }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label
              className={styles.formLabel}
              style={{ marginTop: '10px', marginBottom: '10px' }}>
              Description:
            </Form.Label>
            <Form.Control
              as='textarea'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label
              className={styles.formLabel}
              style={{ marginTop: '10px', marginBottom: '10px' }}>
              Date & Time:
            </Form.Label>
            <div className={styles.dateTimeInputs}>
              <div>
                <Form.Control
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', marginLeft: '40px' }}>
                <Form.Control
                  type='time'
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
                <div style={{ marginLeft: '10px' }}>
                  <Form.Check
                    className={styles.customCheckbox}
                    type='checkbox'
                    checked={allDay}
                    onChange={handleAllDayChange}
                  />
                </div>
              </div>
              <Form.Label style={{ marginLeft: '10px', marginTop: '8px' }}>
                All Day
              </Form.Label>
            </div>
            <div className={styles.dateTimeInputs}>
              <div>
                <Form.Control
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div style={{ marginLeft: '40px' }}>
                <Form.Control
                  type='time'
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label
              className={styles.formLabel}
              style={{ marginBottom: '15px' }}>
              Kid(s):
            </Form.Label>
            <CustomDropdown
              value={selectedKids}
              onChange={setSelectedKids}
              options={['red', 'yellow', 'purple']}
              placeholder=''
              hasPlusIcon={true}
              style={{ width: '365px', height: '48px' }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label
              className={styles.formLabel}
              style={{ marginTop: '15px', marginBottom: '15px' }}>
              Share with:
            </Form.Label>
            <div className={styles.selectWithIcon}>
              {showParentInput ? (
                <Form.Control
                  type='text'
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Enter parent's name"
                  required={showParentInput}
                  style={{ width: '465px', height: '48px' }}
                />
              ) : (
                <Form.Control
                  as='select'
                  value={shareWith}
                  onChange={(e) => handleShareWithChange(e.target.value)}
                  style={{ width: '465px', height: '48px' }}>
                  <option value='Only Me'>Only Me</option>
                  <option value="Enter Parent's Name">
                    Enter Parent&apos;s Name
                  </option>
                </Form.Control>
              )}
              <FaChevronDown className={styles.dropdownIcon} />
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label
              className={styles.formLabel}
              style={{
                marginTop: '15px',
                marginBottom: '0px',
                width: '465px',
                height: '48px',
              }}>
              Repeat:
            </Form.Label>
            <CustomDropdown
              value={repeat}
              onChange={setRepeat}
              options={['Never', 'Everyday', 'Every Week', 'Every Month']}
              hasPlusIcon={false} // No plus icon for the 'Repeat' dropdown
              hasChevronIcon={true} // Add a chevron icon for the 'Repeat' dropdown
              style={{ width: '465px', height: '48px' }} // Add height and width styles here
            />
          </Form.Group>
          <Form.Group style={{ marginBottom: '20px' }}>
            <Form.Label
              className={styles.formLabel}
              style={{ marginTop: '10px', marginBottom: '10px' }}>
              Location:
            </Form.Label>
            <Form.Control
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder='Event Location'
              required
              style={{ width: '465px', height: '48px' }}
            />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            className={styles.submitButton}
            style={{ color: '#7A7D7D' }}>
            Create Event
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

EventModal.propTypes = {
  onClose: PropTypes.func,
};

export default EventModal;
