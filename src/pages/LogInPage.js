import React, {useEffect, useState}from 'react';
import Input from '../components/Input';
import {withTranslation} from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import {connect} from 'react-redux';
import { loginHandler } from '../redux/authActions';

const LogInPage = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    useEffect(() => {
      setError(undefined);
    }, [username, password])

const onClickLogIn = async event => {
    const errorMessage = props.t('Kullanici adi veya şifre hatalı');

    event.preventDefault();
    const creds = {
        username,
        password
    
    };

    const {history, dispatch} = props;
    const{push} = history;

    setError(undefined);

    try{
      await dispatch(loginHandler(creds));
    push('/');
    }catch (apiError){
        setError(errorMessage);
    };

};
const buttonEnabled = username && password;
const {t, pendingApiCall} = props;

return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <div className="card-body">
          <h1 className="card-title text-center bg-dark text-white py-2 mb-4">{t('Giriş Yap')}</h1>
          <form>
            <Input label={t('Kullanıcı Adı')} onChange={(event) => {setUsername(event.target.value)}} />
            <br />
            <Input label={t('Şifre')} type="password" onChange={(event) => {setPassword(event.target.value)}}/>
            <br />
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="text-center">
              <ButtonWithProgress
                onClick={onClickLogIn}
                pendingApiCall={pendingApiCall}
                disabled={!buttonEnabled || pendingApiCall}
                text={t('Giriş Yap')}
              ></ButtonWithProgress>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const LogInPageWithTranslation = withTranslation()(LogInPage);

export default connect()(withApiProgress(LogInPageWithTranslation, '/api/1.0/auth'));