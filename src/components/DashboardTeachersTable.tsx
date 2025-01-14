import {useSelector} from "react-redux";

const DashboardTeachersTable = () => {

    // @ts-ignore
    const dashboardTeachersList = useSelector(state => state.dashboard?.teachers ?? []);
    // @ts-ignore
    const educationPeriod = useSelector(state => state.dashboard?.educationPeriod ?? '');


    return (
        <div className="p-6">
            <div className="">
                <h2 className="text-2xl font-bold">Статистика "Зайнятість викладачів центру" навчальний рік {educationPeriod}</h2>
                {dashboardTeachersList.length === 0
                    ?
                    <p>Тут поки що немає нічого </p>
                    :
                    <div className="overflow-x-auto max-h-64">
                        <table className="min-w-full bg-white">
                            <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>ПІБ викладача</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Група</span>

                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Процент проведених занять</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Середня оцінка учнів</span>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="">
                            {dashboardTeachersList.map((teacher: {
                                teacher_id: number;
                                teacher_full_name: string;
                                group: string;
                                past_events_percentage: string;
                                average_estimation_mark: number;
                                }) => {
                                    return (
                                        <tr key={teacher?.teacher_id}
                                            className={'hover:bg-gray-100'}>
                                            <td className="py-2 px-4 border-b">{teacher?.teacher_full_name ?? ''}</td>
                                            <td className="py-2 px-4 border-b">{teacher?.group}</td>
                                            <td className="py-2 px-4 border-b">{teacher?.past_events_percentage}</td>
                                            <td className="py-2 px-4 border-b">{teacher?.average_estimation_mark}</td>
                                        </tr>
                                    )
                                }
                            )}
                            </tbody>
                        </table>
                    </div>

                }
            </div>
        </div>
    );
};
export default DashboardTeachersTable;