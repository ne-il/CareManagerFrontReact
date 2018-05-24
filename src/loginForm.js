import React, {Component} from 'react';
import {FormGroup, FormControl, HelpBlock, ControlLabel, Button, Checkbox, FieldGroup, Radio} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import request from "superagent";


class LoginForm extends Component {


    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state)
        request.get("http://127.0.0.1:5000/login")
            .auth(this.state.email, this.state.password)
            .then(
                (res) => {
                    console.log(res.body.token)
                    localStorage.setItem("token", res.body.token)
                    let url = "http://127.0.0.1:5000/staffs/asking_staff";
                    request
                        .get(url)
                        .set('x-access-token', localStorage.getItem("token"))
                        .then(
                            (res) => {
                                if (res.body.type == "DOCTOR" || res.body.type == "NURSE" || res.body.type == "SECRETARY")
                                    this.props.history.push('/patientList')
                                else if (res.body.type == "ADMIN")
                                    this.props.history.push('/admin')
                            },
                            (err) => {
                                console.error(err.response)
                                if(err.status == 401){
                                    alert(err.response.text)
                                    this.props.history.push('/login')
                                }
                            }
                        )
                },
                (err) =>
                    this.setState({
                        email: "",
                        password: ""
                    })
                )
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }

}

export default LoginForm;

