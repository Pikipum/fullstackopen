import { Patient } from "../types";
import { useParams } from "react-router-dom";

interface Props {
    patients: Patient[]
}

const PatientView = (patients: Props) => {
    const id = useParams().id;

    const patient = patients.patients.find(p => p.id === id);

    if (!patient) {
        return <div>Patient not found</div>;
    }
    return (
        <div>
            <h1>{patient.name} {patient.gender}</h1>
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