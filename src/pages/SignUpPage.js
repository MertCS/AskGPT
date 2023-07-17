import React, { useState } from "react";
import Input from "../components/Input";
import {useTranslation} from 'react-i18next';
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useApiProgress } from "../shared/ApiProgress";
import validator from 'validator';
import { useDispatch } from "react-redux";
import { signUpHandler } from "../redux/authActions";

const SignUpPage = (props) =>{

  const [form, setForm] = useState({
    email: "",
    name: "",
    surname: "",
    username: "",
    password: "",
    passCheck: ""
  })
  const [errors,setErrors] = useState({});
  const dispatch = useDispatch();

const validatePassword = () => {
    const passwordArray = Array.from(form.password);
    const hasCapitalLetter = passwordArray.some((char) => char >= 'A' && char <= 'Z');
    const hasNumber = passwordArray.some((char) => char >= '0' && char <= '9');
    return hasCapitalLetter && hasNumber;
  };

const validateEmail = () => {
    return validator.isEmail(form.email);
  };

const onChange = event => {
    const {name, value} = event.target;
    const errorsCopy = {...errors};
    errorsCopy[name] = undefined;
    const isEmailValid = validateEmail();
    const passStrong = validatePassword();


    // if(name === 'password' || name === 'passCheck'){
    //     if(name === 'password' && value !== form.passCheck){
    //       errorsCopy.passCheck = t('Şifreler aynı olmalı');
    //     } else if(name === 'passCheck' && value !== form.password){
    //       errorsCopy.passCheck = t('Şifreler aynı olmalı');
    //     } else{
    //       errorsCopy.passCheck = undefined;
    //     }
    // }
    if(name === 'email'){
        if(!isEmailValid){
          errorsCopy.email = t('Geçersiz e-posta');
        }
        else{
          errorsCopy.email = undefined;
        }
    };
    if(form.name && name === 'name'){
        if(value.length <= 1 || value.length >= 255){
          errorsCopy.name = t('İsim uzunluğu 1 ile 255 karakter arasında olmalıdır');
        }
        else{
          errorsCopy.name = undefined;
        }
    };

    if (name === 'username') {
        if (value.length < 4 || value.length >= 255) {
          errorsCopy.username = t('Kullanıcı adı uzunluğu 4 ile 255 karakter arasında olmalıdır');
        } else {
          errorsCopy.username = value.length === 4 ? undefined : errorsCopy.username;
        }
      }

    if(form.surname && name === 'surname'){
        if(value.length <= 1 || value.length >= 255){
          errorsCopy.surname = t('Soyisim uzunluğu 1 ile 255 karakter arasında olmalıdır');
        }
        else{
          errorsCopy.surname = undefined;
        }
    };

    if (name === 'password') {
        if (value.length < 8 || value.length >= 255 || !passStrong) {
          errorsCopy.password = t('Şifre uzunluğu 8 ile 255 karakter arasında olmalıdır ve en az 1 büyük harf ve bir rakam içermelidir');
        } else {
          errorsCopy.password = value.length === 8 ? undefined : errorsCopy.password;
        }
      };

//     this.setState({
//         [name]: value,
//         errors
//     });
// }
    setErrors(errorsCopy);
    const formCopy = {...form};
    formCopy[name] = value;
    setForm((previousForm) =>({...previousForm, [name]:value}));
};

const onClickSignup = async event => {
    const {history} = props;
    const{push} = history;

    event.preventDefault();
    const {email, name, surname, username, password} = form;

    const body ={
        email,
        name,
        surname,
        username,
        password
    };

    try{
        await dispatch(signUpHandler(body));
        push('/');   
    } catch(error){
        if(error.response.data.validationErrors){
            setErrors(error.response.data.validationErrors);
        }   
    };
};

const {t} = useTranslation();
const pendingApiCallSignup = useApiProgress('post', '/api/1.0/users');
const pendingApiCallLogin = useApiProgress('post', '/api/1.0/auth');

const pendingApiCall = pendingApiCallLogin || pendingApiCallSignup;

const {email : emailError, name : nameError, surname : surnameError, username : usernameError, password : passwordError} = errors


let passCheckError; 
if(form.password !== form.passCheck){
  passCheckError = t('Şifreler aynı olmalı');
}

return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="card text-center">
    <div className="card-header">
      <h1 className="m-0">{t('Kayıt Ol')}</h1>
    </div>
    <div className="card-body pt-0">
      <form>
        <div className="form-group">
          <label>{t('E-posta')}</label>
          <input
            className={form.email ? "form-control is-invalid" : "form-control"}
            name="email"
            type="email"
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            {t('E-postanız kimseyle paylaşılmayacaktır.')}
          </small>
          <div className="invalid-feedback">{emailError}</div>
        </div>
        <br />
        <Input name="name" label={t('İsim')} error={nameError} onChange={onChange} type="text" />
        <Input name="surname" label={t("Soyisim")} error={surnameError} onChange={onChange} type="text" />
        <br />
        <Input name="username" label={t("Kullanıcı Adı")} error={usernameError} onChange={onChange} type="text" />
        <br />
        <Input name="password" label={t("Şifre")} error={passwordError} onChange={onChange} type="password" />
        <Input name="passCheck" label={t("Şifre Yeniden")} error={passCheckError} onChange={onChange} type="password" />
        <br />
        <br />
        <div className="text-center">
          <ButtonWithProgress
            className="btn btn-primary"
            disabled={
              pendingApiCall ||
              passCheckError !== undefined ||
              emailError !== undefined ||
              usernameError !== undefined ||
              nameError !== undefined ||
              surnameError !== undefined ||
              passwordError !== undefined
            }
            onClick={onClickSignup}
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

export default SignUpPage;