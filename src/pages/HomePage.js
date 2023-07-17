import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import UserList from '../components/UserList';
import ChatSubmit from '../components/ChatSubmit';
import ChatlogFeed from '../components/ChatlogFeed';
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
      <div className='container'>
        <div style={{ alignItems: 'center', height: '100vh' }}>
        <div style={{ backgroundColor: 'rgba(58, 58, 58, 1)', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
          {isLoggedIn ? 
          <>
          <div className='row'>
            <div className='col'>
              <div className='mb-1'>
                <ChatSubmit/>
              </div>
            <ChatlogFeed/>
            </div>
            <div className='col'>
            <UserList/>
            </div>
          </div>
          <div className='text-center'>
            <button className="btn btn-primary text-center" onClick={handleButtonClick} style={{ marginTop: '20px' }}>
                          {t('Hemen Sohbet Etmeye Başla!')}
                        </button>
          </div>
          
          </>
          : (
            <h1 style={{ color: 'white' }}>{t('Giriş Yap veya hesabın yoksa kaydol!')}</h1>
          )}
        </div>
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

// (
//   <button className="btn btn-primary" onClick={handleButtonClick}>
//     {t('Hemen Sohbet Etmeye Başla!')}
//   </button>
// )