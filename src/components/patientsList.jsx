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
                            {/*<p>Patient ID: {patient}</p>*/}
                            <p>Name: {patient.name}</p>
                            <p>имя пациента - `Patient.name[0].text`. Если поле текст отсутствует, то собрать имя конкатенацией `Patient.name[0].family` и `Patient.name[0].given`;</p>
                            <p>пол - `Patient.gender`;</p>
                            <p>* дата рождения - `Patient.birthDate`;</p>
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