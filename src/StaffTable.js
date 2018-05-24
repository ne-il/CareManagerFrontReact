import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';

import "./Login.css";
import request from "superagent";
import PatientProfilCard from './PatientProfilCard'

const documentTypes = ['DOCTOR', 'NURSE', 'ADMIN', 'SECRETARY'];


class StaffTable extends Component {

    constructor(props) {
        super(props);

        this.postStaffOnServerSide = this.postStaffOnServerSide.bind(this)
        this.get_asking_staff = this.get_asking_staff.bind(this)
        this.post_staff = this.post_staff.bind(this)
        this.fromNodeIdToLabel = this.fromNodeIdToLabel.bind(this)
        this.getNodeList = this.getNodeList.bind(this)
        this.getStaffList = this.getStaffList.bind(this)

        this.state = {
            dataReceived: false,
            asking_staff: "",
            labelToId_node_dict: {},
            idToLabel_node_dict: {},
            staffList: [],
            nodeLabelList: []
        }

        // this.get_patient_info(this.props.patientId)
        this.get_asking_staff()
        this.getNodeList()
        this.getStaffList()
    }

    post_staff(staff) {
        let url = "http://127.0.0.1:5000/staffs";
        request
            .post(url)
            .set('x-access-token', localStorage.getItem("token"))
            .send(staff)
            .then(
                (res) => {
                    console.log("SUCCES")
                    console.log(res.response)
                }
                ,
                (err) => {
                    console.error(err.response)
                    this.setState({
                        errorMessage: err.response.text
                    })
                    this.handleShowErrorPopUp()
                    console.error(err.response)
                    if(err.status == 401){
                        alert(err.response.text)
                        this.props.history.push('/login')
                    }
                }
            )
    }

    get_asking_staff() {
        let url = "http://127.0.0.1:5000/staffs/asking_staff";
        request
            .get(url)
            .set('x-access-token', localStorage.getItem("token"))
            .then(
                (res) => {
                    this.setState({asking_staff: res.body})
                },
                (err) => {
                    console.error(err.response)
                }
            )
    }

    getNodeList() {
        request.get("http://127.0.0.1:5000/nodes")
            .set('x-access-token', localStorage.getItem("token"))
            .then(
                (res) => {
                    var labelToId = {}
                    var idToLabel = {}
                    var nodeLabelList = []
                    for (var i in res.body) {
                        console.log(res.body[i])
                        labelToId[res.body[i].label] = res.body[i].id
                        idToLabel[res.body[i].id] = res.body[i].label
                        nodeLabelList.push(res.body[i].label)
                    }
                    this.setState({labelToId_node_dict: labelToId, idToLabel_node_dict: idToLabel, nodeLabelList: nodeLabelList})
                    console.log('nodeLabelList')
                    console.log(nodeLabelList)
                },
                (err) => {
                    console.error(err.response)
                    if(err.status == 401){
                        alert(err.response.text)
                        this.props.history.push('/login')
                    }
                }
            )
    }

    getStaffList() {
        request.get("http://127.0.0.1:5000/staffs")
            .set('x-access-token', localStorage.getItem("token"))
            .then(
                (res) => {
                    this.setState({staffList: res.body, dataReceived: true})
                },
                (err) => {
                    console.error(err.response)
                    if(err.status == 401){
                        alert(err.response.text)
                        this.props.history.push('/login')
                    }
                }
            )
    }




    postStaffOnServerSide(row) {
        console.log(row)
        debugger
        var new_patient_info = {};
        var staff = {};
        staff.firstName = row.description;
        staff.lastName = row.status;
        staff.type = row.type;
        staff.node_id = this.state.labelToId_node_dict[row.node_id]
        staff.email = row.email
        staff.login = row.login
        staff.password = row.password
        console.log(staff)
        debugger
        this.post_staff(staff)

    }

    fromNodeIdToLabel(cell, row) {
        return this.state.idToLabel_node_dict[cell]
    }


    render() {

        var options = {
            afterInsertRow: this.postStaffOnServerSide,   // A hook for after insert rows
            insertText: 'Créer un nouveau membre du personnel',
        };

        var staffTable = (
            <BootstrapTable data={this.state.staffList} striped hover insertRow={true}
                            options={options}>

                <TableHeaderColumn isKey dataField='id' isKey={true} autoValue={true}>Staff ID</TableHeaderColumn>



                <TableHeaderColumn dataField='firstName'
                                   editable={{type: 'textarea'}}>
                    firstName
                </TableHeaderColumn>

                <TableHeaderColumn dataField='lastName'
                                   editable={{type: 'textarea'}}>
                    lastName
                </TableHeaderColumn>

                <TableHeaderColumn dataField='type' editable={{
                    type: 'select',
                    options: {values: documentTypes}
                }}>
                    role
                </TableHeaderColumn>

                <TableHeaderColumn dataField='email'
                                   editable={{type: 'textarea'}}>
                    email
                </TableHeaderColumn>

                <TableHeaderColumn dataField='login'
                                   editable={{type: 'textarea'}}>
                    login
                </TableHeaderColumn>

                <TableHeaderColumn dataField='password'
                                   editable={{type: 'textarea'}}>
                    password
                </TableHeaderColumn>

                <TableHeaderColumn dataField='node_id'
                                   editable={{type: 'select', options: {values: this.state.nodeLabelList}}}
                                   // dataFormat={this.fromNodeIdToLabel}
                >
                    node_id
                </TableHeaderColumn>

            </BootstrapTable>
        )


        if (this.state.dataReceived) {
            // debugger
            return (
                <div>
                    {staffTable}
                </div>
            )
        }
        else {
            return <ProgressSpinner/>
        }
    }

}

export default StaffTable;

