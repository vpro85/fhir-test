import {Card} from 'antd';

const PatientsList = ({sortedPatientsList}) => {
    function convertTime(timeStr) {
        const date = new Date(Date.parse(timeStr))
        return date.toLocaleString()
    }

    return (
        <>
            <h1 className="font-bold justify-center text-center mt-6 text-lg">
                Список пациентов:
            </h1>
            <div className="max-w-2xl container mx-auto p-2 mt-4 ">
                {sortedPatientsList.map((patient) =>
                    <div key={patient.id} style={{margin: "5px"}} >
                        <Card title={`${patient.name} (id: ${patient.id})`} className="mb-6">
                            <div className="mb-2">
                                {/*<p>Patient ID: {patient.id}</p>*/}
                                <p>Имя: {patient.name}</p>
                                <p>Пол: {patient.gender}</p>
                                <p>Дата рождения: {patient.birthDate}</p>
                                <p>Количество записей на прием: {patient.appointments.length}</p>
                            </div>
                            <h2 className="font-bold">Записи на прием:</h2>
                            <div className="flex">
                                {patient.appointments.map((r) =>
                                    <Card key={r.resource.id} type={"inner"} className="my-2 mr-2"
                                          title={r.resource.description}
                                          style={{width: "300px"}}>
                                        <p>Начало: {convertTime(r.resource.start)}</p>
                                        <p>Окончание: {convertTime(r.resource.end)}</p>
                                    </Card>
                                )}
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </>
    )
};

export default PatientsList;