import { Card } from 'antd';
const PatientsList = ({sortedPatientsList}) => {
    console.log("sortedPatientsList", sortedPatientsList)
    sortedPatientsList.forEach((p)=>{
        console.log("patient", p)
    })
    return (
        <>
            <h1>
                List:
            </h1>
            <div>
                {sortedPatientsList.map((patient, index) =>
                    <div key={patient.id} style={{margin: "5px"}} >
                        <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                            <p>Patient ID: {patient.id}</p>
                            <p>Имя: {patient.name}</p>
                            <p>Пол: {patient.gender}</p>
                            <p>Дата рождения: {patient.birthDate}</p>
                            <p>* количество записей на прием - количество ресурсов `Appointment`, которые имеют ссылку на конкретного пациента;</p>
                            <p>* дата и время приема - `Appointment.start` и `Appointment.description` для каждого `Appointment`;</p>
                        </Card>
                    </div>
                )}
            </div>
        </>
    )
};

export default PatientsList;