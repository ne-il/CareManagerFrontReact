import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import "./Login.css";
import request from "superagent";
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';


class PatientTab extends Component {


    constructor(props) {

        super(props);

        this.state = {
            dataReceived: false,
            patientList: []
        }
        this.getPatientList();

    }


    getPatientList() {
        request.get("http://127.0.0.1:5000/patients")
            .set('x-access-token', this.props.token)
            .then(
                (res) => {
                    console.log("SUCCES")
                    console.log(res.body)
                    this.setState(
                        {
                            dataReceived: true,
                            patientList: res.body
                        }
                    )
                },
                (err) => {
                    console.log(err.response)
                }
            )
    }

    render() {
        if (this.state.dataReceived) {
            return (
                <BootstrapTable data={this.state.patientList} striped hover>
                    <TableHeaderColumn isKey dataField='id'>Patient ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='firstName'>firstName</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastName'>lastName</TableHeaderColumn>
                    <TableHeaderColumn dataField='social_security_number'>social_security_number</TableHeaderColumn>
                    <TableHeaderColumn dataField='address'>address</TableHeaderColumn>
                    <TableHeaderColumn dataField='place_of_birth'>place_of_birth</TableHeaderColumn>
                    <TableHeaderColumn dataField='birthdate'>birthdate</TableHeaderColumn>
                </BootstrapTable>
            )
        }
        else {
            return <ProgressSpinner/>

        }
    }

}

export default PatientTab;

