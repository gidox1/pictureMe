
import React, { useEffect, Fragment,} from 'react';
import styles from './gallery.scss';
import handler from './../../handler';
import Header from '../components/header/header';
import {data, } from './data'
import PropTypes from 'prop-types';
import Post from './../components/post/post';
import fetch from 'isomorphic-unfetch';
import config from './../../config';
import requestHandler from './../../handler';


function Gallery ({dataObject}) { 
    
    useEffect(() => {
        const jwt = localStorage.getItem('this_user_token');
        if(!jwt) {
            return window.location = '/';
        }

        async function fetchData() {
            return requestHandler.handleRequest(jwt)
                .then(() => {
                    return;
                })
                .catch(err => {
                    localStorage.removeItem('this_user_token');
                    return window.location = '/'
                });
        }
        fetchData();
    }, [])


    return (
        <Fragment>
            <Header
                logo = {data.header_image.url}
            ></Header>
            <div className={styles.mainGallery}>
                <Post
                    imageUrl = {data.imageUrl}
                >
                </Post>
                <Fragment>
                    <div className={styles.imageLayout}>
                        {Array.isArray(dataObject) && dataObject.length > 0 ?
                            dataObject.map((info, key) => (
                                <div className={styles.frame} key={key}>
                                    <center><img src={info.image_url} className={styles.image} key={key}/></center>
                                    <label key={key} className={styles.galleryUsername}>{info.username}</label>
                                    <div className={styles.iconClass}>
                                        <div className={styles.iconAction}>
                                            <input type="image" src={data.icons.like} className={styles.likeIcon}/>
                                            <center><label className={styles.likeLabel}>Like</label></center>    
                                        </div>
                                        <div className={styles.iconAction}>
                                            <input type="image" src={data.icons.super_like} className={styles.superLike}/>
                                            <center> <label className={styles.superLikeLabel}>Super Like</label></center>   
                                        </div>
                                        <div className={styles.iconAction}>
                                            <input type="image" src={data.icons.block} className={styles.blockIcon}/>
                                            <center><label className={styles.blockIconLabel}>Block</label></center>    
                                        </div>
                                    </div>
                                </div>
                            ))
                            : 
                            (<div>
                                <center>
                                    <h3>There are no images in gallery. Begin by uploading</h3>
                                </center> 
                            </div>)
                        }
                    </div>
                </Fragment>
            </div>

        </Fragment>
    )
}

        

Gallery.getInitialProps = async ({returnData}) => {
    // Call an API endpoint to get posts.
    const data = await fetch(`http://localhost:${config.port}/api/gallery`)
    const jsonData = await data.json();
    returnData = jsonData.imageData;
    return {
        dataObject: returnData,
    }
}


export default Gallery;

