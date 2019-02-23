import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';

class Home extends Component {
    componentWillMount(){
        if (typeof(Storage) !== "undefined") {
            if (!window.sessionStorage.AUTH_TOKEN) {
                this.props.history.push('/')
            }
        }
    }
    render() {
        return (
            <div>
                <Header />
                <h1>Home page</h1>
            </div>
        )
    }
}

export default Home;
