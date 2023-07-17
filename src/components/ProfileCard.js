import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {useSelector, useDispatch} from 'react-redux';
import defaultImage from '../assets/defaultImage.png';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from "react-i18next";
import Input from './Input';
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import { updateSuccess } from '../redux/authActions';

const ProfileCard = (props) => {

    const[inEditMode, setInEditMode] = useState(false);
    const [updatedName, setUpdatedName] = useState();
    const [updatedSurname, setUpdatedSurname] = useState();
    const {username:loggedInUsername} = useSelector((store) => ({username:store.username}));
    const routeParams = useParams();
    const {t} = useTranslation();
    const [user, setUser] = useState({});
    const [authorized, setAuthorized] = useState(false);
    const [newImage, setNewImage] = useState();
    const dispatch = useDispatch();

    const pathUsername = routeParams.username;

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        setAuthorized(pathUsername === loggedInUsername)
    }, [pathUsername, loggedInUsername]);

    const {email, name, surname, username, image} = user;

    useEffect(()=>{
        if(!inEditMode){
            setUpdatedName(undefined);
            setUpdatedSurname(undefined);
            setNewImage(undefined);
        }
        else{
            setUpdatedName(name);
            setUpdatedSurname(surname);
        }
    },[inEditMode, username])

    const onClickSave = async () => {

    let image;
    if(newImage){
        image = newImage.split(',')[1]
    }
    else{
        const body = {
            name: updatedName,
            surname: updatedSurname,
            image  
        };
        try{
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data);
            dispatch(updateSuccess(response.data));
        }catch(error){}

    }
        
        };

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);


    let imageSource = defaultImage;
    if(image) {
        imageSource = image;
    };

    const onChangeFile = (event) => {
        if(event.target.files.length < 1){
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return (
    <div className='card text-center'>
        <div className='card-header'>
            <ProfileImageWithDefault
            className='rounded-circle shadow' 
            width="200" 
            height="200"
            alt = {`${username} profile`}
            image = {image}
            tempimage = {newImage}
            />
        </div>
        <div className='card-body text-center'>
        {!inEditMode && <h5>{t('Kullanıcı Adı')}: <span style={{fontSize: '20px',
  color: '#999'}}>{username}</span></h5>}
  {authorized && !inEditMode &&(
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
        <Input label = {t('İsim')} defaultValue={name} onChange={(event) => {setUpdatedName(event.target.value)}}/>
        <Input label = {t('Soyisim')} defaultValue={surname} onChange={(event) => {setUpdatedSurname(event.target.value)}}/>
        <input type='file' onChange={onChangeFile}/>
        <ButtonWithProgress
         className='btn btn-success d-inline-flex' 
         onClick={onClickSave}
         disabled = {pendingApiCall}
         pendingApiCall={pendingApiCall}
         text = {<>
         <i className='material-icons'>save</i>{t('Kaydet')}
         </>
         }/>
        <button 
        className='btn btn-danger d-inline-flex m-1' 
        onClick={() => {setInEditMode(false)}}
        disabled={pendingApiCall}>
        <i className='material-icons'>cancel</i>{t('İptal')}</button>
    </div>
  )
  }
</div>



    </div>)
};

export default ProfileCard;
