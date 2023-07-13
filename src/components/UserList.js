import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
import { useApiProgress } from "../shared/ApiProgress";
import Spinner from "../components/Spinner";

const UserList = () => {
    const [page, setPage] = useState({
        content: [],
        size: 3,
        number: 0
    });

    const [loadFailure, setLoadFailure] = useState(false);

    const pendingApiCall = useApiProgress('/api/1.0/users?page')

    useEffect(() => {
        loadUsers();
    }, []);

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    };

    const onClickPrevious = () => {
        const previousPage = page.number -1;
        loadUsers(previousPage);
    };

    const loadUsers = async page => {
        setLoadFailure(false);
        try{
            const response = await getUsers(page);
            setPage(response.data);
        } catch(error){
            setLoadFailure(true);
        }
    };
    const {t} = useTranslation();
    const{content : users, last, first} = page;

    let actionDiv =(
    <div className='text-center'>
    <button className='btn btn-sm btn-light float-start' onClick={onClickPrevious} disabled={first !== false}>{t('<< Önceki')}</button>
    <button className='btn btn-sm btn-light float-end' onClick={onClickNext} disabled={last !== false}>{t('Sonraki >>')}</button>
    <span>{page.number + 1}</span>
    </div>
    );

    if(pendingApiCall){
        actionDiv = <Spinner/>;
    }

        return (
            <div className='card'>
                <h3 className='card-header text-center'><i className='material-icons'>group</i>{t('Diğer Kullanıcılar')}</h3>
                <div className='list-group list-group-flush'>
                {users.map(user => (
                    <UserListItem key = {user.username} user = {user}/>
                ))}
                </div>
                {actionDiv}
                {loadFailure && <div className='text-center text-danger'>{t('Yükleme başarısız')}</div>}
            </div>
        );
}

export default UserList;