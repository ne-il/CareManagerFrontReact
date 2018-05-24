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


class CreatePatientForm extends Component {
    constructor(props) {
        super(props);


        this.state = {
            dataReceived: false,
            name: "",
            type: "",
            parent_id: "",
            showErrorPopUp: false,
            errorMessage: ""
        }


        // request.get("http://127.0.0.1:5000/nodes/care_units")
        //     .set('x-access-token', localStorage.getItem("token"))
        //     .then(
        //         (res) => {
        //             console.log(res.body)
        //             this.setState(
        //                 {
        //                     dataReceived: true,
        //                     list_of_care_unit: res.body,
        //                     node_id: res.body[0].id
        //                 }
        //             )
        //         },
        //         (err) => {
        //             console.error(err.response)
        //             if (err.status == 401) {
        //                 alert(err.response.text)
        //                 this.props.history.push('/login')
        //             }
        //         }
        //     )
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
        console.log(event.target.value)
    }
    handleSubmit = event => {
        event.preventDefault();
        var copie = Object.assign({}, this.state)
        var fatherNode = this.props.fatherNode
        copie.parent_id = fatherNode.id
        if(fatherNode.type == "ROOT")
            copie.type = "HOSPITAL"
        else if(fatherNode.type == "HOSPITAL")
            copie.type = "DIVISION"
        else if(fatherNode.type == "DIVISION")
            copie.type = "HOSPITAL_UNIT"
        else if(fatherNode.type == "HOSPITAL_UNIT")
            copie.type = "CARE_UNIT"
        // console.log(cop.birthdate)


        request.post("http://127.0.0.1:5000/nodes")
            .set('x-access-token', localStorage.getItem("token"))
            .send(copie)
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
                    console.error(err.response)
                    if (err.status == 401) {
                        alert(err.response.text)
                        this.props.history.push('/login')
                    }
                }
            )

    }


    render() {
        var buttonMessage = "Créer nouveau Noeud";


        var myForm =
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="name" bsSize="small">
                    <Col sm={2}>
                        <ControlLabel>Name</ControlLabel>
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </Col>

                </FormGroup>
                <Button
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                >
                    {buttonMessage}
                </Button>
            </Form>

        var errorPopup =
            <Modal show={this.state.showErrorPopUp}
                   onHide={this.handleHideErrorPopUp}
                   dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>ERREUR CREATION NOEUD</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Il y a eu une erreur lors de la creation du noeud, Voici la reponse du serveur: <br/>
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

