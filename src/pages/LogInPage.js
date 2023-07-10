import React, { Component } from 'react';
import Input from '../components/Input';
import {withTranslation} from 'react-i18next';
import { login } from '../api/apiCalls';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import { Authentication } from '../shared/AuthenticationContext';

class LogInPage extends Component {

    static contextType = Authentication;

    state = {
        username:null,
        password:null,
        error: null,
    }; 

onChange = event => {
    const {name, value} = event.target;
    this.setState({
        [name]: value,
        error: null
    });
    // todo valid check
}

onClickLogIn = async event => {
    const errorMessage = this.props.t('Kullanici adi veya şifre hatalı');
    const {onLoginSuccess} = this.context;
    event.preventDefault();
    const { username, password } = this.state;

    const creds = {
        username,
        password
    
    };

    const{push} = this.props.history;

    this.setState({
        error:null
    });
    // todo valid check
    try{
        const response = await login(creds);
        push('/');

    const authState = {
      ...response.data,
      password
    };

        onLoginSuccess(authState);
    }catch (apiError){
        this.setState({
            error: errorMessage
            //apiError.response.data.message
        });
    }

}

    render() {

        const {username, password, error} = this.state;
        const buttonEnabled = username && password;
        const {t, pendingApiCall} = this.props;
        
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
              <div className="card p-4">
                <div className="card-body">
                  <h1 className="card-title text-center bg-dark text-white py-2 mb-4">{t('Giriş Yap')}</h1>
                  <form>
                    <Input label={t('Kullanıcı Adı')} name="username" onChange={this.onChange} />
                    <br />
                    <Input label={t('Şifre')} name="password" type="password" onChange={this.onChange} />
                    <br />
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="text-center">
                      <ButtonWithProgress
                        onClick={this.onClickLogIn}
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
}

const LogInPageWithTranslation = withTranslation()(LogInPage);

export default withApiProgress(LogInPageWithTranslation, '/api/1.0/auth');