import React from 'react';
import {useHistory} from 'react-router-dom';
import {withTranslation} from 'react-i18next';

function HomePage({ isLoggedIn, userName, t}) {

    const history = useHistory();

  const handleButtonClick = () => {
    history.push(`/user/${userName}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {isLoggedIn ? (
        <button 
            className="btn btn-primary"
            onClick ={handleButtonClick}
        > {t('Hemen Sohbet Etmeye Başla!')}
    </button>
      ) : (
        <h1>{t('Giriş Yap veya hesabın yoksa kaydol!')}</h1>
      )}
    </div>
  );
}

export default withTranslation()(HomePage);
