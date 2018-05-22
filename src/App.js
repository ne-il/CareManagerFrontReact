import React, {Component} from 'react';
import './App.css';

import HeaderReactTuto from "./HeaderReactTuto";
import LoginForm from "./loginForm";
import DateTest from "./DateTest"
import PrimReacLoginForm from "./PrimReacLoginForm"
import PatientTab from "./PatientTab";
import OnePatientWindow from "./OnePatientWindow";
import TreeViewer from "./TreeViewer";
import CreatePatientForm from "./CreatePatientForm";
import PopUpCreatePatient from './PopUpCreatePatient'
import {Button} from 'react-bootstrap';
import request from "superagent";
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';



class App extends Component {
    constructor(){
        super()
        this.state = {
            token:"",
            email:"nanteur",
            password:"youpikaye",
            // email:"admin",
            // password:"admin",
            show: false
        }

        this.getToken = this.getToken.bind(this)
        this.getToken();
    }

    getToken() {
        request.get("http://127.0.0.1:5000/login")
            .auth(this.state.email, this.state.password)
            .then(
                (res) => {
                    this.setState({token: res.body.token})
                },
                (err) =>
                    console.log(err.response)
            )
    }

    render() {
        if(this.state.token.length == 0){
            return <ProgressSpinner/>
        }
        else{
            return <div>
                <HeaderReactTuto />
                {/*<PrimReacLoginForm/>*/}
                {/*<LoginForm/>*/}
                <PatientTab token={this.state.token}/>
                {/*<OnePatientWindow token={this.state.token} patientId={11}/>*/}
                {/*<TreeViewer token={this.state.token}/>*/}
                {/*<CreatePatientForm token={this.state.token}/>*/}
                {/*<PopUpCreatePatient token={this.state.token} show={this.state.show}/>*/}
                <Button
                    block
                    bsSize="large"
                    type="submit"
                    onClick={()=>{this.setState({show:true})}}
                >
                    Patient
                </Button>
            </div>
        }

    }
}

export default App;
