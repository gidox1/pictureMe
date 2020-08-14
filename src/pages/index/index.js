import React, {Component, Fragment} from 'react';
import styles from './index.scss';
import Header from '../components/header/header';
import {data, } from './data';
import axios from 'axios';
import config from './../../config';
import requestHandler from './../../handler';


/**
 * 
 * @param {React.Component} props 
 * TextBanner Component
 */
const FormContainer = (props) => {
    return (
        <div className={styles.formContainer}>
            <div className={styles.formBody}>
                <div className={styles.formHead}>
                    <a className={styles.actionBtn}>Login</a>
                    <a className={styles.actionBtn}>Sign up</a>
                </div>
                <input name="username"
                    placeholder="User name"
                    className={styles.inputField}
                />
            </div>
        </div>
    )
}


const ImageContainer = (props) => {
    return (
        <div className={styles.imageContainer}>

        </div>
    )
}




/**
 * @returns {React.Component} React Component
 */
class Index extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.state = {
            isHovered: false,
            value: '',
            isSignUp: false,
            input: {
                email: '',
                password: '',
                username: '',
                preference: 'male',
                sex: 'male'
                },
            login: {
                email: '',
                password: ''
            }
        };
    }




    myChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState(state => ({
            input: {
                ...state.input,
                [name]: value,
            },
            login: {
                ...state.login,
                [name]: value,
            }
        }))
    }

    handleClick() {
        const currentState = this.state.isSignUp;
        this.setState({isSignUp: !currentState});
    }

    submitForm(e) {
        e.preventDefault();
        let userData;
        const signUpSlug = 'create';
        const loginSlug = 'login';

        let slug;
        if(this.state.isSignUp) {
            userData = { ...this.state.input, };
            slug = signUpSlug;
        } else {
            userData = { ...this.state.login, };
            slug = loginSlug;
        }

        axios.post(`/api/${slug}`, { userData })
            .then(res => {
                if(res.data.hasOwnProperty('error')) {
                    return window.alert(res.data.error.message);
                }
                if(res.data.hasOwnProperty('token')) {
                    const token = res.data.token;
                    localStorage.setItem('this_user_token', token);
                    const jwt = localStorage.getItem('this_user_token');

                    return requestHandler.handleRequest(jwt)
                        .then(() => {
                            return window.location = '/gallery'
                        })
                        .catch(err => {
                            throw err;
                        });
                }
                window.alert('Success');
            })
            .catch(err => {
                window.alert('An error occured, please try again');
            })
    }


    render() {
        const {
        } = this.props;
        const placeHolders = data.inputFields
        const isSignUp = this.state.isSignUp
        return (
            <Fragment>
                <div className={styles.mainContainer}>
                    <Header
                        logo = {data.image.url}
                    >
                    </Header>
                    <div className={styles.bannerContainer}>
                        <div className={styles.signUpContainer}>
                            <div className={styles.innerContainer}>
                                <a className={styles.actionBtn} onClick = {this.handleClick}>Login</a>
                                <a className={styles.actionBtn} onClick = {this.handleClick}>Sign up</a>
                            </div>
                            <div className={styles.inputContainer}>
                                <form
                                    action="/"
                                    method="POST"
                                    onSubmit={(event) => this.submitForm(event)}
                                >
                                    {!isSignUp && placeHolders.loginPlaceHolders && Array.isArray(placeHolders.loginPlaceHolders) 
                                        && placeHolders.loginPlaceHolders.map((info, key) => (
                                            <input
                                                type={info}
                                                value={this.state.login[{info}]}
                                                onChange={this.myChangeHandler}
                                                name={info}
                                                placeholder={info}
                                                key={key}
                                                className={styles.singleInput}
                                            />
                                        ))
                                    }
                                    {!isSignUp && (
                                        <center>
                                            <input type="submit" className={styles.loginBtn} value="Login"/>
                                        </center>  
                                        )
                                    }
                                </form>
                                {isSignUp && placeHolders.signUpPlaceHolders && (
                                    <form
                                        action="/"
                                        className={styles.signupFormClass}
                                        method="POST"
                                        onSubmit={(event) => this.submitForm(event)}
                                    >
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Choose Username"
                                            className={styles.singleInput}
                                            value={this.state.input.username}
                                            onChange={this.myChangeHandler}
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter Email"
                                            className={styles.singleInput}
                                            value={this.state.input.email}
                                            onChange={this.myChangeHandler}
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Choose Password"
                                            className={styles.singleInput}
                                            value={this.state.input.password}
                                            onChange={this.myChangeHandler}
                                        />
                                        <label>
                                            What are you interested in?
                                        </label>
                                        <select 
                                            name="preference" 
                                            value={this.state.input.preference} 
                                            onChange={this.myChangeHandler} 
                                            className={styles.selectButton}
                                        >
                                            <option value="male" >Male</option>
                                            <option value="female">Female</option>
                                            <option value="both">Both</option>
                                        </select><br/><br/>
                                        <label>
                                            Sex: 
                                            <select 
                                                name="sex" 
                                                value={this.state.input.sex} 
                                                onChange={this.myChangeHandler} 
                                                className={styles.selectButton}
                                            >
                                                <option value="male" >Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </label>
                                        <center>
                                            {
                                                isSignUp && (
                                                    <input type="submit" className={styles.loginBtn} value="Sign Up"/> 
                                                )
                                            }
                                        </center>    
                                    </form>
                                    )
                                }
                    
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <div className={styles.imgDiv}>
                                <img src={data.imageUrl} className={styles.bannerImage}/>
                            </div>
                        </div>
                    </div>                    
                </div>
            </Fragment>
        )
    }
}

Index.defaultProps = {
    isSignUp: true
}

export default Index;