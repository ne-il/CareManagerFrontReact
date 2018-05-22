import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'superagent';



class HeaderReactTuto extends Component {

    constructor(props) {
        super();
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload. Nique ta mere.
                </p>
            </div>
        );
    }
}

export default HeaderReactTuto;
