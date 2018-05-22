import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';

import "./Login.css";
import request from "superagent";
import {
    Radio,
    FormGroup,
    Checkbox,
    ControlLabel,
    FormControl,
    Button,
    HelpBlock,
    Form,
    Col,
    Modal
} from 'react-bootstrap';
import {Calendar} from 'primereact/components/calendar/Calendar';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwdWJsaWNfaWQiOiI4YTIxMGY4MC1mZjQzLTQ5ZjktOTViZS1mMjMzNmQzMTZmY2MiLCJleHAiOjE1MjY1NjE2NzJ9.7U88_Voxi7QYanbzD4Un34fEkffbBgIKgK8cHudnPgo'

class CreatePatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataReceived: false,
            firstName: "",
            lastName: "",
            address: "",
            social_security_number: "",
            place_of_birth: "",
            birthdate: "",
            node_id: "",
            list_of_care_unit: [],
            showErrorPopUp: false,
            errorMessage: ""
        }

        request.get("http://127.0.0.1:5000/nodes/care_units")
            .set('x-access-token', localStorage.getItem("token"))
            .then(
                (res) => {
                    console.log(res.body)
                    this.setState(
                        {
                            dataReceived: true,
                            list_of_care_unit: res.body
                        }
                    )
                },
                (err) => {
                    console.log(err.response)
                }
            )
        this.handleShowErrorPopUp = this.handleShowErrorPopUp.bind(this);
        this.handleHideErrorPopUp = this.handleHideErrorPopUp.bind(this);
    }

    handleShowErrorPopUp() {
        this.setState({showErrorPopUp: true});
    }

    handleHideErrorPopUp() {
        this.setState({showErrorPopUp: false});
    }

    validateForm() {
        // return this.state.firstName.length > 0 && this.state.firstName.length > 0;
        return true;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        var cop = Object.assign({}, this.state)
        cop.truc = 'eee'
        delete(cop.list_of_care_unit)
        console.log('this.state')
        console.log(this.state)


        console.log('cop')
        console.log(cop)
        request.post("http://127.0.0.1:5000/patients")
            .set('x-access-token', localStorage.getItem("token"))
            .send(this.state)
            .then(
                (res) => {
                    console.log("SUCCES")
                    console.log(res.body)
                    this.props.closeThePopUp()
                }
                ,
                (err) => {
                    console.error(err.response)
                    this.setState({
                        errorMessage: err.response.text
                    })
                    this.handleShowErrorPopUp()
                }
            )
    }


    render() {

        var careUnitSelectDisplay = '';
        if (this.state.dataReceived) {
            careUnitSelectDisplay =
                <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
                    {this.state.list_of_care_unit.map(function (e, index) {
                        return <option key={e.id} value={e.id}>{e.label}</option>;
                    })}
                </FormControl>

        }
        else {
            careUnitSelectDisplay = <ProgressSpinner/>
        }

        var myForm =
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="firstName" bsSize="small">
                    <Col sm={2}>
                        <ControlLabel>First Name</ControlLabel>
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </Col>

                </FormGroup>

                <FormGroup controlId="lastName" bsSize="small">
                    <Col sm={2}>
                        <ControlLabel>Last Name</ControlLabel>
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="address" bsSize="small">
                    <Col sm={2}>
                        <ControlLabel>Adresse</ControlLabel>
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.address}
                            onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="social_security_number" bsSize="small">
                    <Col sm={2}>
                        <ControlLabel>Numero de sécurite sociale </ControlLabel>
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.social_security_number}
                            onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="place_of_birth" bsSize="small">
                    <Col sm={2}>
                        <ControlLabel> Lieu de Naissance </ControlLabel>
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.place_of_birth}
                            onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="node_id" bsSize="small">
                    <Col sm={2}>
                        <ControlLabel>Unité de soins</ControlLabel>
                    </Col>

                    <Col sm={10}>
                        {careUnitSelectDisplay}
                    </Col>
                </FormGroup>

                <FormGroup controlId="birthdate" bsSize="small">
                    <Col sm={2}>
                        <ControlLabel>Date de naissance</ControlLabel>
                    </Col>
                    <Col sm={10}>
                        <Calendar value={this.state.birthdate} showIcon="true" monthNavigator="true"
                                  yearNavigator="true" yearRange="1800:2030"
                                  onChange={(e) => this.setState({birthdate: e.value})}></Calendar>
                    </Col>
                </FormGroup>


                <Button
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                >
                    Submit
                </Button>
            </Form>

        var errorPopup =
            <Modal show={this.state.showErrorPopUp}
                   onHide={this.handleHideErrorPopUp}
                   dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>ERREUR CREATION PATIENT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Il y a eu une erreur lors de la creation du patient, Voici la reponse du serveur: <br />
                    {this.state.errorMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleHideErrorPopUp}>Close</Button>
                </Modal.Footer>
            </Modal>
        return <div>
            {myForm}
            {errorPopup}
        </div>

    }

}

export default CreatePatientForm;

