import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {useSelector} from 'react-redux';
import defaultImage from '../assets/defaultImage.png';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from "react-i18next";

const ProfileCard = (props) => {

    const {username:loggedInUsername} = useSelector((store) => ({username:store.username}));
    const routeParams = useParams();
    const {t} = useTranslation();

    const {user} = props;
    const {email, name, surname, username, image} = user;

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
  {pathUsername === loggedInUsername && (
    <>
      <h5>{t('E-posta')}: <span style={{fontSize: '20px',
  color: '#999'}}>{email}</span></h5>
      <h5>{t('İsim')}: <span style={{fontSize: '20px',
  color: '#999'}}>{name}</span></h5>
      <h5>{t('Soyisim')}: <span style={{fontSize: '20px',
  color: '#999'}}>{surname}</span></h5>
    </>
  )}
  <h5>{t('Kullanıcı Adı')}: <span style={{fontSize: '20px',
  color: '#999'}}>{username}</span></h5>
</div>



    </div>
};

export default ProfileCard;
