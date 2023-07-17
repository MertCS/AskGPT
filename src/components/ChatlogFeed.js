import React, { useEffect, useState } from 'react';
import { getChatlogs } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import ChatlogView from './ChatlogView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ChatlogFeed = () => {
    const [chatlogPage, setChatlogPage] = useState({content:[], last: true, number : 0});
    const {t} = useTranslation();
    const {username} = useParams();

    const path = username ? `api/1.0/users/${username}/chatlogs?page=` : '/api/1.0/chatlogs?page='; 
    const pendingApiCall = useApiProgress('get', path)

    useEffect(()=>{
        loadChatlogs();
    }, []);

    const loadChatlogs = async (page) => {
        try{
            const response = await getChatlogs(username, page);
            setChatlogPage(previousChatlogPage => ({
                ...response.data,
                content: [...previousChatlogPage.content, ...response.data.content]
            }));
        }catch(error){}
    }

    const {content, last, number} = chatlogPage;

    if(content.length === 0){
        return <div className='alert alert-secondary text-center'>{pendingApiCall ? <Spinner/> : t('Sohbet kaydı yok!')}</div>
    }

    return (
        <div>
            {content.map(chatlog => {
                return <ChatlogView key = {chatlog.id} chatlog = {chatlog}/>
            })}
            {!last && <div className='alert alert-secondary text-center' style = {{cursor: pendingApiCall ? 'not-allowed' : 'pointer'}} onClick={pendingApiCall ? () => {} : () => loadChatlogs(number + 1)}>{pendingApiCall ? <Spinner/> : t('Eski sohbet kayıtlarına git')}</div>}
        </div>
    );
};

export default ChatlogFeed;