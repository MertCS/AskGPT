import React from "react";
import {signUp} from '../api/apiCalls'
import Input from "../components/Input";
import {withTranslation} from 'react-i18next';
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class SignUpPage extends React.Component{
    
state = {
    email: null,
    name: null,
    surname: null,
    userName: null,
    pass: null,
    passCheck: null,
    agreed: false,
    errors: {},
    signUpSuccess: false
}   

onChange = event => {
    const {t} = this.props;
    const {name, value} = event.target;
    const errors = {...this.state.errors};
    errors[name] = undefined;
    if(name == 'pass' || name == 'passCheck'){
        if(name == 'pass' && value != this.state.passCheck){
            errors.passCheck = t('Şifreler aynı olmalı');
        } else if(name == 'passCheck' && value != this.state.pass){
            errors.passCheck = t('Şifreler aynı olmalı');
        } else{
            errors.passCheck = undefined;
        }
    }
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

    event.preventDefault();
    const {email, name, surname, userName, pass} = this.state;

    const body ={
        email,
        name,
        surname,
        userName,
        pass
    };

    try{
        const response = await signUp(body);
        this.setState({ signUpSuccess: true });
    } catch(error){
        if(error.response.data.validationErrors){
            this.setState({errors: error.response.data.validationErrors});
        }   
    }
};



render(){

    const {t, pendingApiCall} = this.props;
    const{ errors, signUpSuccess } = this.state;
    const {email, name, surname, userName, pass, passCheck} = errors

    return( 
        <div className="container">
        <form>
            <h1 className ="text-center">{t('Kayıt Ol')}</h1>
            <div className="form-group">
                <label>{t('E-posta')} </label>
                <input 
                className={email ? "form-control is-invalid" : "form-control"}
                name = 'email'
                type = 'email'
                onChange={this.onChange}></input>
                <small id="emailHelp" 
                className="form-text text-muted">{t('E-postanız kimseyle paylaşılmayacaktır.')}</small>
                <div className="invalid-feedback">{email}</div>
            </div><br/>
            <Input name = "name" label = {t('İsim')} error = {name} onChange = {this.onChange} type = 'text' />
            <Input name = "surname" label = {t("Soyisim")} error = {surname} onChange = {this.onChange} type = 'text'/> <br/>
            <Input name = "userName" label = {t("Kullanıcı Adı")} error = {userName} onChange = {this.onChange} type = 'text'/><br/>
            <Input name = "pass" label = {t("Şifre")} error = {pass} onChange = {this.onChange} type = 'password'/>
            <Input name = "passCheck" label = {t("Şifre Yeniden")} error = {passCheck} onChange = {this.onChange} type = 'password'/><br/>
            {signUpSuccess && <div class="alert alert-success">
                        {t('Kullanıcı Sisteme Başarıyla Kaydedildi')}
            </div>}
            <div className="form-check">
                <input 
                className="form-check-input"
                type = 'checkbox'
                onChange={this.onChangeTerms}
                ></input>
                <label>{t('Terim ve Koşulları kabul ediyorum')}</label>
            </div><br/>
            <div className="text-center">
            <ButtonWithProgress 
            className="btn btn-primary"
            disabled = {!this.state.agreed || pendingApiCall || passCheck != undefined}
            onClick ={this.onClickSignup}
            pendingApiCall = {pendingApiCall}
            text = {t('Kayıt Ol')}
            > </ButtonWithProgress>
            </div> 
        </form>
        </div>
    );
}
}


const SignUpPageWithApiProgress = withApiProgress(SignUpPage, '/api/1.0/users')
const SignUpPageWithTranslation = withTranslation()(SignUpPageWithApiProgress);


export default SignUpPageWithTranslation;