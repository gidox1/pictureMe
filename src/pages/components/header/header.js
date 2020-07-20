import PropTypes from 'prop-types';
import React, { Component, Fragment,} from 'react';
import styles from './header.scss';

class Header extends Component {


    constructor(props) {
        super(props);
    }

    /***
     * @returns {React.Component} React Component
     */
    render() {
        return (
            <Fragment>
                <div className={styles.headerStyle}>
                    <img src={this.props.logo} className={styles.logo}/>
                </div>
            </Fragment>
        )
    }
}

Header.propTypes = {
    logo: PropTypes.string.isRequired
}

export default Header;

