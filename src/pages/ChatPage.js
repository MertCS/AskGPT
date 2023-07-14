import React, { useState, useRef, useEffect } from 'react';
import send from '../assets/send.png';
import { withTranslation } from 'react-i18next';
import logo from '../assets/logo.png'

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

  const messagesText = [
    "Merhaba",
    "Nasılsınız?",
    "İyi günler",
    "Ne yapıyorsunuz?",
    "Hava nasıl?",
    "Hayırlı olsun",
    "Teşekkür ederim",
    "İyi akşamlar",
    "Başarılar",
    "Güle güle"
  ];

  const handleButtonClick = () => {
    if (message.trim() !== '') {
      setSubmittedMessage((prevMessages) => [
        ...prevMessages,
        {
          id: new Date().getTime(),
          content: message,
          userSent : true,
          hour : getHour()
        },
      ]);
      setMessage('');
      setTimeout(() => {
        setSubmittedMessage((prevMessages) => [
          ...prevMessages,
          {
            id: new Date().getTime(),
            content: getRandomMessage(),
            userSent : false,
            hour : getHour()
          },
        ]);
        setMessage('');
      }, 2000);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default behavior of the Enter key (usually a line break)
      handleButtonClick();
    }
  };

  const getHour = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return `${hours}:${minutes}`;
  }

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messagesText.length);
    const randomMessage = messagesText[randomIndex];

    return <span>{randomMessage}</span>;
  }

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
              alignItems: 'right',
              backgroundColor: msg.userSent ? '#ddd' : '#bbb',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <p style={{ margin: '0', flex: '1' }}>
              <span style={{ color: '#a3a3a3', fontWeight: '500' }}>{msg.hour}</span> <br /> {msg.content}
            </p>
            {msg.userSent ? (
              <img
                src={send}
                alt="send"
                width="25"
                height="25"
                style={{ objectFit: 'contain', marginLeft: '10px' }}
              />
            ) : (
              <img
                src={logo}
                alt="reply"
                width="25"
                height="25"
                style={{ objectFit: 'contain', marginLeft: '10px' }}
              />
            )}
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
            onKeyPress={handleKeyPress} // Added event listener for key press
          />
          <div>
            <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={handleButtonClick}>
              {t('Gönder')}
            </button>
            <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={handleButtonClick}>
              {t('Kaydet')}
            </button>
            <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={handleButtonClick}>
              {t('İptal')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(ChatPage);
