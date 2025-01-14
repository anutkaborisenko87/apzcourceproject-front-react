import {useSelector} from "react-redux";

const DashboardGroupsTable = () => {

    // @ts-ignore
    const dashboardGroupsList = useSelector(state => state.dashboard?.groups ?? []);
    // @ts-ignore
    const educationPeriod = useSelector(state => state.dashboard?.educationPeriod ?? '');


    return (
        <div className="p-6">
            <div className="">
                <h2 className="text-2xl font-bold my-3 text-center">Статистика "Cклад груп дітей" навчальний рік {educationPeriod}</h2>
                {dashboardGroupsList.length === 0
                    ?
                    <p>Тут поки що немає нічого </p>
                    :
                    <div className="overflow-x-auto max-h-64">
                        <table className="min-w-full bg-white">
                            <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Назва групи</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Викладачі</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Рік початку навчання</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Рік випуску</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Кількість дітей в групі</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Відсоток пройденого матеріалу</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Середній прогрес учнів</span>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="">
                            {dashboardGroupsList.map((group: {
                                group_id: number;
                                group_title: string;
                                teachers: string[];
                                children_count: number;
                                date_finish: string;
                                date_start: string;
                                past_events_percentage: number;
                                average_estimation_mark: number;
                                }) => {
                                    return (
                                        <tr key={group?.group_id}
                                            className={'hover:bg-gray-100'}>
                                            <td className="py-2 px-4 border-b">{group?.group_title ?? ''}</td>
                                            <td className="py-2 px-4 border-b">{
                                                group?.teachers.map((teacher, index) => {
                                                    return <p key={index}>{teacher}</p>
                                                })
                                            }</td>
                                            <td className="py-2 px-4 border-b text-center">{group?.date_start}</td>
                                            <td className="py-2 px-4 border-b text-center">{group?.date_finish}</td>
                                            <td className="py-2 px-4 border-b text-center">{group?.children_count}</td>
                                            <td className="py-2 px-4 border-b text-center">{group?.past_events_percentage}</td>
                                            <td className="py-2 px-4 border-b text-center">{group?.average_estimation_mark}</td>
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
export default DashboardGroupsTable;