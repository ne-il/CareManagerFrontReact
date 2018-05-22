import React, {Component} from 'react';
import './App.css';

import HeaderReactTuto from "./HeaderReactTuto";
import LoginForm from "./loginForm";
import DateTest from "./DateTest"
import PrimReacLoginForm from "./PrimReacLoginForm"
import PatientListPage from "./PatientListPage";
import OnePatientWindow from "./OnePatientWindow";
import TreeViewer from "./TreeViewer";
import CreatePatientForm from "./CreatePatientForm";
import PopUpCreatePatient from './PopUpCreatePatient'
import {Button} from 'react-bootstrap';
import request from "superagent";
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';


class App extends Component {
    constructor() {
        super()
        this.state = {
            email: "nanteur",
            password: "youpikaye",
            // email:"admin",
            // password:"admin",
            show: false,
            asking_staff:{},
            token_received:false
        }

        this.getToken = this.getToken.bind(this)
        this.get_asking_staff = this.get_asking_staff.bind(this)
        this.getToken()


    }

    getToken() {
        request.get("http://127.0.0.1:5000/login")
            .auth(this.state.email, this.state.password)
            .then(
                (res) => {
                    // Save data to sessionStorage
                    localStorage.setItem("token", res.body.token);
                    this.setState({token_received: true})
                    this.get_asking_staff(res.body.token)

                },
                (err) =>
                    console.log(err.response)
            )
    }

    get_asking_staff(token){
        let url = "http://127.0.0.1:5000/staffs/asking_staff";
        request
            .get(url)
            .set('x-access-token', token)
            .then(
                (res) => {
                    this.setState(
                        {
                            asking_staff: res.body
                        }
                    )
                },
                (err) => {
                    console.error(err.response)
                }
            )
    }

    render() {
        if (!( this.state.token_received)) {
            debugger
            return <ProgressSpinner/>
        }
        else {
            debugger
            return <div>
                <HeaderReactTuto/>
                {/*<PrimReacLoginForm/>*/}
                {/*<LoginForm/>*/}
                <PatientListPage />
                {/*<OnePatientWindow  patientId={11}/>*/}
                {/*<TreeViewer />*/}
                {/*<CreatePatientForm />*/}
                {/*<PopUpCreatePatient  show={this.state.show}/>*/}
                {/*<Button*/}
                {/*block*/}
                {/*bsSize="large"*/}
                {/*type="submit"*/}
                {/*onClick={()=>{this.setState({show:true})}}*/}
                {/*>*/}
                {/*Patient*/}
                {/*</Button>*/}
            </div>
        }

    }
}

export default App;
