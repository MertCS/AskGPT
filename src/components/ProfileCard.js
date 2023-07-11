import React from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import {connect} from 'react-redux';

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    let message = "No editing";
    if(pathUsername === props.loggedInusername){
        message = "We can edit";
    };
    return <div>{message}</div>
};

const mapStateToProps = (store) => {
    return {
        loggedInusername: store.username
    };
};

export default connect(mapStateToProps)(withRouter(ProfileCard));
