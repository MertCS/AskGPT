import React from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Authentication } from '../shared/AuthenticationContext';

const ProfileCard = (props) => {
    return (
        <Authentication.Consumer>
            {value => {
                const pathusername = props.match.params.username;
                const loggedInusername = value.state.username;
                let message = "No editing";
                if(pathusername === loggedInusername){
                message = "We can edit";
                };
                return <div>{message}</div>
            }}
        </Authentication.Consumer>
    );
};

export default withRouter(ProfileCard);