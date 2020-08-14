import React, { Component, Fragment,} from 'react';
import styles from './post.scss';
import PropTypes from 'prop-types';
import { data } from '../../index/data';
import axios from 'axios';
import config from './../../../config';
import FormData from 'form-data'
import fetch from 'isomorphic-unfetch'
const logger = require('turbo-logger').createStream({});


class Post extends Component {

    constructor(props) {
        super(props);
        this.updateImage = this.updateImage.bind(this);
        this.fileHandler = this.fileHandler.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.state = {
            file: null,
            imageUrl: data.noImage,
            imageData: null
        }
    }

    fileHandler(event) {
        this.setState({
            file: event.target.files[0]
        })
    }

    updateImage(){
        this.setState({
            imageUrl: res.data.image_url
        })
    }

    uploadImage() {
        const formData = new FormData()
        if(!this.state.file) {
            return window.alert('Please select a file...')
        }
        formData.append('imageUploaded', this.state.file, this.state.file.name);
            axios.post(`http://localhost:${config.port}/api/upload`, formData, {  
                headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          }})
        .then(res => {
            if(res.data.hasOwnProperty('image_url')) {
                this.setState({
                    imageUrl: res.data.image_url
                })
            }
        })
        .catch(err => logger.log(err))
    }


    /***
     * @returns {React.Component} React Component
     */
    render() {
        const {imageData} = this.state;
        return (
            <Fragment>
                <div className={styles.main}>
                    <div className={styles.postContainer}>
                        <div className={styles.imgContainer}>
                            <img src={this.state.imageUrl} className={styles.imageStyle} onChange={this.updateImage}/>
                            <div className={styles.buttonDiv}>
                                <input 
                                    // style={{display: "none"}} 
                                    type="file" 
                                    name="file"
                                    onChange={this.fileHandler}
                                    // ref = {fileInput => this.fileInput = fileInput}
                                    className={styles.actionBtn}
                                />
                                <label for="file" className={styles.chooseFile}>choose a file...</label>
                                {/* <button onClick={() =>this.fileInput.click()}className={styles.actionBtn}>Change Image</button> */}
                                <button 
                                    type="submit" 
                                    value="upload" 
                                    onClick={this.uploadImage} 
                                    className={styles.upload}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div className={styles.floatBanner}>
                        <input type="button" value="Upload Image" className={styles.inputImage}/>
                        <h3 className={styles.floatBannerText}>You can find your uploaded images as well as that of other users here. Feel free to like!</h3>
                    </div>
                </div>
            </Fragment>
        )
    }
}


Post.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
}

export default Post;

