import React, {Component} from 'react';

import "./Login.css";
import {
    Button,
    Modal
} from 'react-bootstrap';
import CreatePatientForm from './CreatePatientForm'
import request from "superagent";

class PopUpCreateUpdatePatient extends Component {
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
        // this.props.updateParentTable();
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
        var title = "Creation d'un patient"
        if(this.props.updateMode){
            title = "Modification d'un patient"
        }
        return <div className="static-modal">
            <Modal show={this.props.show}
                          onHide={this.props.updateParentTable}
                          dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <CreatePatientForm updateMode={this.props.updateMode} selectedPatient={this.props.selectedPatient} closeThePopUp={this.props.updateParentTable} />
                </Modal.Body>

            </Modal>
        </div>;

    }

}

export default PopUpCreateUpdatePatient;

