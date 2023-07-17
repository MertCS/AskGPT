import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';

const ChatlogView = (props) => {
    const {chatlog} = props;
    const{user, content, timestamp} = chatlog;
    const{username, image} = user;

    const {i18n} = useTranslation();

    const formatted = format(timestamp, i18n.language);

    return (
        <div className='card p-1'>
            <div className='d-flex'>
                <ProfileImageWithDefault image = {image} width="32" height = "32" className="rounded-circle shadow m-1"/>
                <div className='flex-fill m-auto ps-2'>
                    <Link to={`/user/${username}`} className="text-dark">
                        <h6 className='d-inline'>
                            {username}
                        </h6>
                        <span>-</span>
                        <span>{formatted}</span>
                    </Link>
                </div>
                
            </div>
            <div className="ps-5">
               {chatlog.content} 
            </div>
        </div>
    );
};

export default ChatlogView;