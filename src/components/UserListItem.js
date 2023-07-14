import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {Link} from 'react-router-dom';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';

const UserListItem = (props) => {

    const{user} = props;
    const {username, image} = user;
    const pendingApiCall = useApiProgress('get', '/');

    if(pendingApiCall){
        return(
          <Spinner/>
        );
      };

    return (
        <Link to = {`/user/${username}`} className='list-group-item list-group-item-action'>
            <ProfileImageWithDefault  
            className='rounded-circle shadow' 
            width="32" 
            height="32"
            alt = {`${username} profile`}
            image = {image}/>
            <span className='p-2'>
            {user.username}
            </span>
            </Link>
    );
};

export default UserListItem;