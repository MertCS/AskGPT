import React, { useState, useRef, useEffect } from 'react';

const UserPage = () => {
  const [message, setMessage] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [submittedMessage]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleButtonClick = () => {
    if (message.trim() !== '') {
      setSubmittedMessage((prevMessage) => prevMessage + message + '\n');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <textarea
        readOnly={true}
        rows={20}
        cols={150}
        value={submittedMessage}
        style={{ resize: 'none' }}
        ref={containerRef}
      />
      <div style={{ display: 'flex' }}>
        <textarea
          style={{ marginRight: '20px', resize: 'none' }}
          rows={2}
          cols={137}
          value={message}
          onChange={handleMessageChange}
        />
        <button className="btn btn-primary" onClick={handleButtonClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserPage;
