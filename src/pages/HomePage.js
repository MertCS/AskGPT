import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
//import { Authentication } from '../shared/AuthenticationContext';

class HomePage extends React.Component {

  //static contextType = Authentication;

  render() {
    const{t, username, isLoggedIn} = this.props;

    const handleButtonClick = () => {

      const{push} = this.props.history;

      push(`/chat/${username}`);
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ backgroundColor: 'rgba(58, 58, 58, 1)', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
          {isLoggedIn ? (
            <button className="btn btn-primary" onClick={handleButtonClick}>
              {t('Hemen Sohbet Etmeye Başla!')}
            </button>
          ) : (
            <h1 style={{ color: 'white' }}>{t('Giriş Yap veya hesabın yoksa kaydol!')}</h1>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
      isLoggedIn: store.isLoggedIn,
      username: store.username
  };
};

export default connect(mapStateToProps)(withTranslation()(withRouter(HomePage)));

