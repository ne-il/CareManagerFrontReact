import React, {Component} from 'react';

import "./Login.css";
import {
    Button,
    Modal
} from 'react-bootstrap';
import CreatePatientForm from './CreatePatientForm'
import request from "superagent";

class PopUpCreatePatient extends Component {



    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: this.props.show
        };
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.show){
            this.handleShow()
        }
        else {
            this.handleHide()
        }
    }

    render() {
        return <div className="static-modal">
            <Modal show={this.state.show}
                          onHide={this.handleHide}
                          dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Creation d'un patient</Modal.Title>
                </Modal.Header>


                <Modal.Body>

                    <CreatePatientForm closeThePopUp={this.handleHide} bordel={"kdkjeid"}/>

                </Modal.Body>

            </Modal>
        </div>;

    }

}

export default PopUpCreatePatient;

