import React, {Component} from 'react';


class PatientProfilCard extends Component {


    constructor(props) {
        super(props);

    }


    render() {
        return <div>
            <div>
                Id: {this.props.patientInfo.id}
            </div>
            <div>
                Prenom: {this.props.patientInfo.firstName}
            </div>
            <div>
                nom de famille: {this.props.patientInfo.lastName}
            </div>
            <div>
                adresse: {this.props.patientInfo.address}
            </div>
            <div>
                numéro de sécurité sociale: {this.props.patientInfo.social_security_number}
            </div>
            <div>
                Date de naissance: {this.props.patientInfo.birthdate}
            </div>
            <div>
                Lieu de naissance: {this.props.patientInfo.place_of_birth}
            </div>

            <div>
                Unité de soins: {this.props.node_dict[this.props.patientInfo.node_id]}
            </div>

        </div>
    }


}

export default PatientProfilCard;

