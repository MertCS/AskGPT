import React, {useEffect, useState}from 'react';
import Input from '../components/Input';
import {useTranslation} from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import {useDispatch} from 'react-redux';
import { loginHandler } from '../redux/authActions';

const LogInPage = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const {t} = useTranslation();

    useEffect(() => {
      setError(undefined);
    }, [username, password])

const onClickLogIn = async event => {
    const errorMessage = t('Kullanici adi veya şifre hatalı');

    event.preventDefault();
    const creds = {
        username,
        password
    
    };

    const {history} = props;
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
const pendingApiCall = useApiProgress('/api/1.0/auth')

return (
  <div className="container d-flex justify-content-center align-items-center">
  <div className="card text-center">
    <div className="card-header">
      <h1 className="m-0">{t('Giriş Yap')}</h1>
    </div>
    <div className="card-body">
      <form>
        <Input label={t('Kullanıcı Adı')} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <Input label={t('Şifre')} type="password" onChange={(event) => setPassword(event.target.value)} />
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

export default LogInPage;