import React, { Component } from 'react';
import logo from '../assets/logo.png';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class TopBar extends React.Component {

    logoutSuccess =() => {
        this.setState({
          isLoggedIn: false,
          userName: ""
        });
        
        
    };

    render() {
        const{t, isLoggedIn, userName} = this.props;

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
                    <Link className='nav-link' to={"/user/"+userName}>
                    {userName}
                    </Link>           
                </li> 
                <li className='nav-link' onClick={this.logoutSuccess} style={{cursor: 'pointer'}}>
                    {t('Çıkış Yap')}
                </li>             
            </ul>
            );
        };
        return (
            <div className='shadow-sm bg-light mb-2'>
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src = {logo} width = "60" alt='logo'/>AskGPT</Link>
                        {links}
                </nav>
            </div>
        );
    }
}

export default withTranslation()(TopBar);