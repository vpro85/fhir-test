import { Card } from 'antd';
const PatientsList = ({sortedPatientsList}) => {

    return (
        <>
            <h1>
                List:
            </h1>
            <div>
                {sortedPatientsList.map(p =>
                    <div style={{margin: "5px"}} key={p}>
                        <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                            <p>Patient ID: {p}</p>
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