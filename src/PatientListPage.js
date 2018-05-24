import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import "./Login.css";
import request from "superagent";
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';
import OnePatientWindow from "./OnePatientWindow";
import PatientListTable from "./PatientListTable";
import PopUpCreateUpdatePatient from './PopUpCreateUpdatePatient'
import {Button} from "react-bootstrap"


class PatientListPage extends Component {


    constructor(props) {

        super(props);
        console.log(localStorage.getItem("token"))

        this.state = {
            dataReceived: false,
            patientList: [],
            node_dict: {},
            asking_staff:{},
            showPopUp:false,
            updateMode:false,
            onRowSelect:{}
        }
        this.getPatientList = this.getPatientList.bind(this);
        this.get_asking_staff = this.get_asking_staff.bind(this);
        this.onRowSelectMedicalStaff = this.onRowSelectMedicalStaff.bind(this);
        this.onRowSelectSecretary = this.onRowSelectSecretary.bind(this);
        this.clickCreatePatient = this.clickCreatePatient.bind(this);
        this.updateAfterPatientPost = this.updateAfterPatientPost.bind(this);

        this.getPatientList();

    }

    updateAfterPatientPost(){
        this.setState({showPopUp:false})
        this.getPatientList()
    }



    getPatientList() {
        console.log(localStorage.getItem("token"))
        request.get("http://127.0.0.1:5000/patients")
            .set('x-access-token', localStorage.getItem("token"))
            .then(
                (res) => {
                    this.setState({patientList: res.body})
                    this.getNodeList()
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
                    this.setState({node_dict: tmp,})
                    this.get_asking_staff()
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

    get_asking_staff(){
        let url = "http://127.0.0.1:5000/staffs/asking_staff";
        request
            .get(url)
            .set('x-access-token', localStorage.getItem("token"))
            .then(
                (res) => {
                    var onSelect={}
                    if (res.body.type == "SECRETARY")
                        onSelect = this.onRowSelectSecretary
                    else
                        onSelect = this.onRowSelectMedicalStaff
                    this.setState({asking_staff: res.body, dataReceived: true, onRowSelect: onSelect})
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

    onRowSelectMedicalStaff(row, isSelected, e) {
        var url = '/OneGuy/' + row.id;
        this.props.history.push(url)
    }

    onRowSelectSecretary(row, isSelected, e) {
        this.setState({selectedPatient:row, showPopUp:true, updateMode: true})
    }


    clickCreatePatient() {
        this.setState({showPopUp:true, updateMode: false, selectedPatient: {} })
    }


    render() {
        var secretarySection = ""

        if (!this.state.dataReceived) {
            return <ProgressSpinner/>
        }
        if(this.state.asking_staff.type == "SECRETARY"){
            secretarySection = <div>
                <PopUpCreateUpdatePatient show={this.state.showPopUp} updateMode={this.state.updateMode} selectedPatient={this.state.selectedPatient} updateParentTable={this.updateAfterPatientPost}/>
                <Button onClick={this.clickCreatePatient}>
                    Créer un nouveau Patient
                </Button>
            </div>
        }


        return (
            <div>
                {secretarySection}
                <PatientListTable node_dict={this.state.node_dict} onRowSelect={this.state.onRowSelect}
                                  patientList={this.state.patientList}/>

            </div>

        )
    }

}

export default PatientListPage;

