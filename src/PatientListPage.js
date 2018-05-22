import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import "./Login.css";
import request from "superagent";
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';
import OnePatientWindow from "./OnePatientWindow";
import PatientListTable from "./PatientListTable";


class PatientListPage extends Component {


    constructor(props) {

        super(props);
        console.log(localStorage.getItem("token"))

        this.state = {
            dataReceived: false,
            patientList: [],
            patientClicked: false,
            selectedPatientId: '',
            node_dict: {}
        }
        this.getPatientList();
        this.getNodeList();
        this.onRowSelect = this.onRowSelect.bind(this);
    }


    getPatientList() {
        console.log(localStorage.getItem("token"))
        request.get("http://127.0.0.1:5000/patients")
            .set('x-access-token', localStorage.getItem("token"))
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

    getNodeList() {
        request.get("http://127.0.0.1:5000/nodes")
            .set('x-access-token', localStorage.getItem("token"))
            .then(
                (res) => {
                    var tmp = {}
                    for (var i in res.body) {
                        console.log(res.body[i])
                        tmp[res.body[i].id] = res.body[i].label
                    }
                    this.setState(
                        {
                            node_dict: tmp,
                        }
                    )
                },
                (err) => {
                    console.log(err.response)
                }
            )
    }


    onRowSelect(row, isSelected, e) {
        this.setState(
            {
                patientClicked: true,
                selectedPatientId: row.id
            }
        )
    }

    render() {
        if (this.state.dataReceived) {
            if (this.state.patientClicked) {
                return <OnePatientWindow patientId={this.state.selectedPatientId} node_dict={this.state.node_dict}/>
            }
            else {
                return (
                    <PatientListTable node_dict={this.state.node_dict} onRowSelect={this.onRowSelect} patientList={this.state.patientList}/>
                )
            }

        }
        else {
            return <ProgressSpinner/>
        }
    }

}

export default PatientListPage;

