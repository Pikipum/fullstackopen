import { Patient } from "../types";
import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface Props {
    patients: Patient[]
}

const PatientView = (patients: Props) => {
    const id = useParams().id;

    const patient = patients.patients.find(p => p.id === id);

    if (!patient) {
        return <div>Patient not found</div>;
    }

    const genderIcon = (gender: string) => {
        switch (gender) {
            case "male":
                return <MaleIcon color="primary" />;
            case "female":
                return <FemaleIcon color="secondary" />;
            default:
                return <TransgenderIcon color="action" />;
        }
    };
    return (
        <div>
            <h1>{patient.name} {genderIcon(patient.gender)}</h1>
            <div>
                ssn: {patient.ssn}
            </div>
            <div>
                occupation: {patient.occupation}
            </div>
            <div>
                <h2>entries</h2>
                {patient.entries.map(
                    entry => <li key={entry.id}>{entry.date} {entry.description}
                        <ul>
                            {entry.diagnosisCodes?.map(code =>
                                <li key={code}>
                                    {code}
                                </li>
                            )}
                        </ul>
                    </li>
                )}
            </div>
        </div>

    );
};

export default PatientView;