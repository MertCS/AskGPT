import React from "react";
import {signUp} from '../api/apiCalls'
import Input from "../components/Input";
import {withTranslation} from 'react-i18next';
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import validator from 'validator';

class SignUpPage extends React.Component{
    
state = {
    email: "",
    name: "",
    surname: "",
    username: "",
    pass: "",
    passCheck: "",
    agreed: false,
    errors: {},
    signUpSuccess: false
}   

validatePassword = () => {
    const { pass } = this.state;
    const passwordArray = Array.from(pass);
    const hasCapitalLetter = passwordArray.some((char) => char >= 'A' && char <= 'Z');
    const hasNumber = passwordArray.some((char) => char >= '0' && char <= '9');
    return hasCapitalLetter && hasNumber;
  };

validateEmail = () => {
    const { email } = this.state;
    return validator.isEmail(email);
  };

onChange = event => {
    const {t} = this.props;
    const {name, value} = event.target;
    const errors = {...this.state.errors};
    errors[name] = undefined;
    const isEmailValid = this.validateEmail();
    const passStrong = this.validatePassword();


    if(name === 'pass' || name === 'passCheck'){
        if(name === 'pass' && value !== this.state.passCheck){
            errors.passCheck = t('Şifreler aynı olmalı');
        } else if(name === 'passCheck' && value !== this.state.pass){
            errors.passCheck = t('Şifreler aynı olmalı');
        } else{
            errors.passCheck = undefined;
        }
    }
    if(name === 'email'){
        if(!isEmailValid){
            errors.email = t('Geçersiz e-posta');
        }
        else{
            errors.email = undefined;
        }
    };
    if(this.state.name && name === 'name'){
        if(this.state.name.length <= 1 || this.state.name.length >= 255){
            errors.name = t('İsim uzunluğu 1 ile 255 karakter arasında olmalıdır');
        }
        else{
            errors.name = undefined;
        }
    };

    if (name === 'username') {
        if (value.length < 4 || value.length >= 255) {
          errors.username = t('Kullanıcı adı uzunluğu 4 ile 255 karakter arasında olmalıdır');
        } else {
          errors.username = value.length === 4 ? undefined : errors.username;
        }
      }

    if(this.state.surname && name === 'surname'){
        if(this.state.surname.length <= 1 || this.state.surname.length >= 255){
            errors.surname = t('İsim uzunluğu 1 ile 255 karakter arasında olmalıdır');
        }
        else{
            errors.surname = undefined;
        }
    };

    if (name === 'pass') {
        if (value.length < 8 || value.length >= 255 || !passStrong) {
          errors.pass = t('Şifre uzunluğu 8 ile 255 karakter arasında olmalıdır ve en az 1 büyük harf ve bir rakam içermelidir');
        } else {
          errors.pass = value.length === 8 ? undefined : errors.pass;
        }
      };

    this.setState({
        [name]: value,
        errors
    });
}
onChangeTerms = event => {
    this.setState({
        agreed: event.target.checked
    });
}
onClickSignup = async event => {

    const{push} = this.props.history;

    event.preventDefault();
    const {email, name, surname, username, pass} = this.state;

    const body ={
        email,
        name,
        surname,
        username,
        pass
    };

    try{
        const response = await signUp(body);
        this.setState({ signUpSuccess: true });
        push('login');
    } catch(error){
        if(error.response.data.validationErrors){
            this.setState({errors: error.response.data.validationErrors});
        }   
    }
};



render(){

    const {t, pendingApiCall} = this.props;
    const{ errors, signUpSuccess } = this.state;
    const {email, name, surname, username, pass, passCheck} = errors

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card p-4">
            <div className="card-body">
              <form>
                <h1 className="card-title text-center bg-dark text-white py-2 mb-4">{t('Kayıt Ol')}</h1>
                <div className="form-group">
                  <label>{t('E-posta')} </label>
                  <input
                    className={email ? "form-control is-invalid" : "form-control"}
                    name='email'
                    type='email'
                    onChange={this.onChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">{t('E-postanız kimseyle paylaşılmayacaktır.')}</small>
                  <div className="invalid-feedback">{email}</div>
                </div>
                <br />
                <Input name="name" label={t('İsim')} error={name} onChange={this.onChange} type='text' />
                <Input name="surname" label={t("Soyisim")} error={surname} onChange={this.onChange} type='text' /> <br />
                <Input name="username" label={t("Kullanıcı Adı")} error={username} onChange={this.onChange} type='text' /><br />
                <Input name="pass" label={t("Şifre")} error={pass} onChange={this.onChange} type='password' />
                <Input name="passCheck" label={t("Şifre Yeniden")} error={passCheck} onChange={this.onChange} type='password' /><br />
                {signUpSuccess && <div className="alert alert-success">
                  {t('Kullanıcı Sisteme Başarıyla Kaydedildi')}
                </div>}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type='checkbox'
                    onChange={this.onChangeTerms}
                  />
                  <label>{t('Terim ve Koşulları kabul ediyorum')}</label>
                </div><br />
                <div className="text-center">
                  <ButtonWithProgress
                    className="btn btn-primary"
                    disabled={!this.state.agreed || pendingApiCall || passCheck !== undefined || email !== undefined || username !== undefined || name !== undefined || surname !== undefined || pass !== undefined}
                    onClick={this.onClickSignup}
                    pendingApiCall={pendingApiCall}
                    text={t('Kayıt Ol')}
                  ></ButtonWithProgress>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}
}


const SignUpPageWithApiProgress = withApiProgress(SignUpPage, '/api/1.0/users')
const SignUpPageWithTranslation = withTranslation()(SignUpPageWithApiProgress);


export default SignUpPageWithTranslation;