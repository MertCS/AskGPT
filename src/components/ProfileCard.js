import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {useSelector} from 'react-redux';
import defaultImage from '../assets/defaultImage.png';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from "react-i18next";
import Input from './Input';
import { updateUser } from '../api/apiCalls';

const ProfileCard = (props) => {

    const[inEditMode, setInEditMode] = useState(false);
    const [updatedUsername, setUpdatedUsername] = useState();
    const [updatedEmail, setUpdatedEmail] = useState();
    const [updatedName, setUpdatedName] = useState();
    const [updatedSurname, setUpdatedSurname] = useState();
    const {username:loggedInUsername} = useSelector((store) => ({username:store.username}));
    const routeParams = useParams();
    const {t} = useTranslation();
    const {user} = props;
    const {email, name, surname, username, image} = user;

    useEffect(()=>{
        if(!inEditMode){
            setUpdatedUsername(undefined);
            setUpdatedEmail(undefined);
            setUpdatedName(undefined);
            setUpdatedSurname(undefined);
        }
        else{
            setUpdatedUsername(username);
            setUpdatedEmail(email);
            setUpdatedName(name);
            setUpdatedSurname(surname);
        }
    },[inEditMode, username])

    const onClickSave = () => {
        console.log(updatedUsername);
        console.log(updatedEmail);
        console.log(updatedName);
        console.log(updatedSurname);
    }

    const pathUsername = routeParams.username;
    let message = "No editing";
    if(pathUsername === loggedInUsername){
        message = "We can edit";
    };
    let imageSource = defaultImage;
    if(image) {
        imageSource = image;
    }
    return <div className='card text-center'>
        <div className='card-header'>
            <ProfileImageWithDefault
            className='rounded-circle shadow' 
            width="200" 
            height="200"
            alt = {`${username} profile`}
            image = {image}
            />
        </div>
        <div className='card-body text-center'>
        {!inEditMode && <h5>{t('Kullanıcı Adı')}: <span style={{fontSize: '20px',
  color: '#999'}}>{username}</span></h5>}
  {pathUsername === loggedInUsername && !inEditMode &&(
    <>
      <h5>{t('E-posta')}: <span style={{fontSize: '20px',
  color: '#999'}}>{email}</span></h5>
      <h5>{t('İsim')}: <span style={{fontSize: '20px',
  color: '#999'}}>{name}</span></h5>
      <h5>{t('Soyisim')}: <span style={{fontSize: '20px',
  color: '#999'}}>{surname}</span></h5>
  {!inEditMode && <button className='btn btn-success d-inline-flex' onClick={() => setInEditMode(true)}>
    <i className='material-icons'>edit</i>{t('Profili Güncelle')}</button>}
    </>
  )}
  {inEditMode && (
    <div>
        <Input label = {t('Kullanıcı Adı')} defaultValue={username} onChange={(event) => {setUpdatedUsername(event.target.value)}}/>
        <Input label = {t('E-posta')} defaultValue={email} onChange={(event) => {setUpdatedEmail(event.target.value)}}/>
        <Input label = {t('İsim')} defaultValue={name} onChange={(event) => {setUpdatedName(event.target.value)}}/>
        <Input label = {t('Soyisim')} defaultValue={surname} onChange={(event) => {setUpdatedSurname(event.target.value)}}/>
        <button className='btn btn-success d-inline-flex' onClick={onClickSave}><i className='material-icons'>save</i>{t('Kaydet')}</button>
        <button className='btn btn-danger d-inline-flex m-1' onClick={() => {setInEditMode(false)}}><i className='material-icons'>cancel</i>{t('İptal')}</button>
    </div>
  )
  }
</div>



    </div>
};

export default ProfileCard;
