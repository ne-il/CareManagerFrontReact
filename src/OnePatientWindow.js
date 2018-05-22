import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';

import "./Login.css";
import request from "superagent";
import PatientProfilCard from './PatientProfilCard'

const documentTypes = [ 'PRESCRIPTION', 'OBSERVATION', 'RADIOGRAPH' ];


class PatientTab extends Component {

    get_patient_info(id){
        // debugger
        let url = "http://127.0.0.1:5000/patients/" + id
        request
            .get(url)
            .set('x-access-token', this.props.token)
            .then(
                (res) => {
                    console.log(res.body)
                    this.setState(
                        {
                            dataReceived: true,
                            patientInfo: res.body
                        }
                    )
                },
                (err) => {
                    console.error(err.response)
                }
            )
    }

    post_document(document){
        let url = "http://127.0.0.1:5000/documents";
        request
            .post(url)
            .set('x-access-token', this.props.token)
            .send(document)
            .then(
                (res) => {
                    console.log("SUCCES")
                    this.get_patient_info(document.patient_id)
                }
                ,
                (err) => {
                    console.error(err.response)
                    this.setState({
                        errorMessage: err.response.text
                    })
                }
            )
    }

    get_asking_staff(){
        let url = "http://127.0.0.1:5000/staffs/asking_staff";
        request
            .get(url)
            .set('x-access-token', this.props.token)
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

    constructor(props) {

        super(props);
        this.postDocumentOnServerSide = this.postDocumentOnServerSide.bind(this)
        this.get_patient_info = this.get_patient_info.bind(this)
        this.get_asking_staff = this.get_asking_staff.bind(this)
        this.post_document = this.post_document.bind(this)

        this.state = {
            dataReceived: false,
            patientInfo: "",
            asking_staff: "",
        }

        this.get_patient_info(this.props.patientId)
        this.get_asking_staff()

    }


    postDocumentOnServerSide(row) {

        var new_patient_info = {};

        var document = {};
        document.description = row.description;
        document.status = row.status;
        document.type = row.type;
        document.author_id = this.state.asking_staff.id
        document.patient_id = this.state.patientInfo.id
        this.post_document(document)
    }




    render() {
        var options = {
            afterInsertRow: this.postDocumentOnServerSide,   // A hook for after insert rows
            insertText: 'Ajouter un document',
        };
        if (this.state.dataReceived) {
            return (
                <div>
                    <PatientProfilCard patientInfo={this.state.patientInfo}/>

                    <BootstrapTable data={this.state.patientInfo.documents} striped hover insertRow={true} options={ options }>

                        <TableHeaderColumn isKey dataField='id' isKey={ true } autoValue={true}>document ID</TableHeaderColumn>

                        <TableHeaderColumn dataField='type' editable={ { type: 'select', options: { values: documentTypes }}} >type</TableHeaderColumn>

                        <TableHeaderColumn dataField='description' editable={ { type: 'textarea' } }  >description</TableHeaderColumn>

                        <TableHeaderColumn dataField='author_id' hiddenOnInsert>author_id</TableHeaderColumn>

                        <TableHeaderColumn dataField='status' editable={ { type: 'checkbox', options: { values: 'IN_PROGRESS:VALIDATED' } } } hidden>SAVE AS DRAFT ?</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }
        else {
            return <ProgressSpinner/>
        }
    }

}

export default PatientTab;

