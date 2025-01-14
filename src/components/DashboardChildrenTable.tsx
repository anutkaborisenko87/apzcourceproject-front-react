import {useSelector} from "react-redux";

const DashboardChildrenTable = () => {

    // @ts-ignore
    const dashboardChildrenList = useSelector(state => state.dashboard?.childrens ?? []);
    // @ts-ignore
    const educationPeriod = useSelector(state => state.dashboard?.educationPeriod ?? '');


    return (
        <div className="p-6">
            <div className="">
                <h2 className="text-2xl font-bold my-3 text-center">Статистика "Прогрес вихованців центру" навчальний рік {educationPeriod}</h2>
                {dashboardChildrenList.length === 0
                    ?
                    <p>Тут поки що немає нічого </p>
                    :
                    <div className="overflow-x-auto max-h-64">
                        <table className="min-w-full bg-white">
                            <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>ПІБ дитини</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Рік народження</span>

                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Вік дитини</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Група</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Кількість відвіданих занять</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Середні результати засвоєння пройденого матеріалу</span>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="">
                            {dashboardChildrenList.map((child: {
                                    child_id: number;
                                    founded?: boolean;
                                    child_full_name: string;
                                    birth_year: string;
                                    age: number;
                                    group: string;
                                    visited_educational_events: number;
                                    avg_estimation_mark: number
                                }) => {
                                    return (
                                        <tr key={child?.child_id}
                                            className={`${child?.founded == true ? 'bg-blue-300 hover:bg-blue-200' : 'hover:bg-gray-100'} `}>
                                            <td className="py-2 px-4 border-b">{child?.child_full_name ?? ''}</td>
                                            <td className="py-2 px-4 border-b">{child?.birth_year}</td>
                                            <td className="py-2 px-4 border-b">{child?.age}</td>
                                            <td className="py-2 px-4 border-b">{child?.group}</td>
                                            <td className="py-2 px-4 border-b">{child?.visited_educational_events}</td>
                                            <td className="py-2 px-4 border-b">{child?.avg_estimation_mark}</td>
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
export default DashboardChildrenTable;