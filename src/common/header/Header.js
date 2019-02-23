import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <header className='app-header'>
                    <span className='app-logo'>instagram clone</span>
                    {this.props.login && <img className="flex-item logged-in-user" src={this.props.login} alt="profile pic"/>}
                </header>
            </div>
        )
    }
}

export default Header;
