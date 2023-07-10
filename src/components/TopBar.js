import React from 'react';
import logo from '../assets/logo.png';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Authentication } from '../shared/AuthenticationContext';

class TopBar extends React.Component {
        
    static contextType = Authentication;

    render() {
        const{t} = this.props;
        const{state, onLogoutSuccess} = this.context;
        const{isLoggedIn, username} = state;
        let links = (
            <ul className="navbar-nav ms-auto">
                            <li>
                            <Link className='nav-link' to ='/login'>
                            {t('Giriş Yap')}
                            </Link>
                            </li>
                            <li>
                            <Link className='nav-link' to ='/signup'>
                            {t('Kayıt Ol')}
                            </Link>
                            </li>
                        </ul>
        );
        if(isLoggedIn){
            links = (
            <ul className="navbar-nav ms-auto">
                <li>
                    <Link className='nav-link' to={"/user/"+username}>
                    {username}
                    </Link>           
                </li> 
                <li className='nav-link' onClick={onLogoutSuccess} style={{cursor: 'pointer'}}>
                    <Link className='nav*link' to ={"/"}>
                    {t('Çıkış Yap')}
                    </Link>
                </li>             
            </ul>
            );
        };
        return (
            <div className='shadow-sm bg-light mb-2' >
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src = {logo} width = "60" alt='logo'/>AskGPT</Link>
                        {links}
                </nav>
            </div>
        );

        
    };
};

export default withTranslation()(TopBar);