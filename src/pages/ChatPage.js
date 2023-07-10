import React, { useState, useRef, useEffect } from 'react';
import send from '../assets/send.png';
import { withTranslation } from 'react-i18next';

const ChatPage = ({ t }) => {
  const [message, setMessage] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState([]);
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
      setSubmittedMessage((prevMessages) => [
        ...prevMessages,
        {
          id: new Date().getTime(),
          content: message,
        },
      ]);
      setMessage('');
    }
  };

  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxHeight: '500px', // Adjust the max height according to your needs
          overflowY: 'auto',
          marginBottom: '60px', // Add space for the send area
        }}
        ref={containerRef}
      >
        {submittedMessage.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <p style={{ margin: '0', flex: '1' }}>{msg.content}</p>
            <img src={send} alt="send" width="20" style={{ marginLeft: '10px' }} />
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          padding: '10px',
          backgroundColor: '#f2f2f2',
          boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ display: 'flex' }}>
          <textarea
            style={{ resize: 'none', flex: '1' }}
            rows={2}
            value={message}
            onChange={handleMessageChange}
          />
          <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={handleButtonClick}>
            {t('Gönder')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(ChatPage);
