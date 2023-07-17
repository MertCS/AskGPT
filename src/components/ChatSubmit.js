import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import { postChatLog } from '../api/apiCalls';
import ButtonWithProgress from './ButtonWithProgress';

const ChatSubmit = () => {
    
    const {image} = useSelector((store) => ({image: store.image}))
    const [focused, setFocused] = useState(false);
    const [chat, setChat] = useState('');
    const [errors, setErrors] = useState({});
    const {t} = useTranslation();

    useEffect(()=> {
        if(!focused){
            setChat('');
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
    }, [chat, focused])

    const onClickChatSubmit = async () => {
        const body = {
            content: chat
        }
        try{
            await postChatLog(body);
            setFocused(false);
        }catch(error){
            if(error.response.data.validationErrors){
                setErrors(error.response.data.validationErrors);
            } 
        };
        
    };

    let textAreaClass = "form-control";
    if(errors.content){
        textAreaClass += " is-invalid"
    };

    const {pendingApiCall} = useApiProgress('post', '/api/1.0/chatlogs');

    return (
        <div className='card p-1 flex-row'>
            <ProfileImageWithDefault 
            image = {image}
            width = "32"
            height = "32"
            className = "rounded-circle"
            />
            <div className='flex-fill'>
                <textarea 
                className={textAreaClass} 
                rows = {focused ? '3' : '1'} 
                onFocus={() => {setFocused(true)}}
                onChange={(event) => setChat(event.target.value)}
                value = {chat} 
                style={{ resize: 'none'}}/>
                 <div className="invalid-feedback">{errors.content}</div>
                    {focused && (<div className='text-end mt-1'>
                        <ButtonWithProgress 
                        className='btn btn-primary' 
                        onClick={onClickChatSubmit}
                        text = {t('Gönder')}
                        pendingApiCall = {pendingApiCall}
                        disabled = {pendingApiCall}/>
                        <button 
                            className='btn btn-danger d-inline-flex m-1' 
                            onClick={() => {setFocused(false)}}
                            disabled={pendingApiCall}>
                            <i className='material-icons'>cancel</i>{t('İptal')}</button>
                    </div>) }   
            </div>
        </div>
    );
};

export default ChatSubmit;