import React from 'react';
import defaultImage from '../assets/defaultImage.png';


const ProfileImageWithDefault = (props) => {

    const {image} = props;

    let imageSource = defaultImage;
    if(image){
        imageSource = image;
    }

    return (
        <img alt = {`Profile`} src = {imageSource} {...props}/>
    );
};

export default ProfileImageWithDefault;