import React from 'react';
import logo from '../assets/logo.png';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { logoutSuccess } from '../redux/authActions';
import { connect } from 'react-redux';

const TopBar = (props) => { 

const{t, username, isLoggedIn, onLogoutSuccess} = props;
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

const TopBarWithTranslation = withTranslation()(TopBar);

const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.isLoggedIn,
        username: store.username
    };
};

const mapDispatchToProps = dispatch  => {
    return {
        onLogoutSuccess: ()  => dispatch(logoutSuccess())
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(TopBarWithTranslation);
