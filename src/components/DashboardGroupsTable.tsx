import {useDispatch, useSelector} from "react-redux";
import {ListBulletIcon, PrinterIcon} from "@heroicons/react/24/outline";
import {openCloseModal} from "../store/modalSlice.ts";
import {getChildrenGroupForReport, getGroupForReport, getTeacherForReport} from "../store/dashbordSlice.ts";

const DashboardGroupsTable = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const dashboardGroupsList = useSelector(state => state.dashboard?.groups ?? []);
    // @ts-ignore
    const educationPeriod = useSelector(state => state.dashboard?.educationPeriod ?? '');
    const onGetGroupReport = (group: {group_id: number, title: string}) => {
        dispatch(openCloseModal({open: true}))
        dispatch(getChildrenGroupForReport(null));
        dispatch(getTeacherForReport(null));
        dispatch(getGroupForReport(group));
    }
    const onGetChildrenReport = (group: {group_id: number, title: string}) => {
        dispatch(openCloseModal({open: true}))
        dispatch(getGroupForReport(null));
        dispatch(getTeacherForReport(null));
        dispatch(getChildrenGroupForReport(group));
    }

    return (
        <div className="p-6">
            <div className="">
                <h2 className="text-2xl font-bold my-3">Статистика "Cклад груп дітей" навчальний
                    рік {educationPeriod}</h2>
                {dashboardGroupsList.length === 0
                    ?
                    <p>Тут поки що немає нічого </p>
                    :
                    <div className="overflow-x-auto max-h-64">
                        <table className="min-w-full bg-white">
                            <thead className="top-0 bg-white">
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
                                <th className="py-2 px-4 border-b"></th>
                                <th className="py-2 px-4 border-b"></th>
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
                                            <td className="py-2 px-4 border-b text-center"><PrinterIcon
                                                title={`Отримати звіт «Список групи»`}
                                                onClick={() => onGetGroupReport({
                                                    group_id: group?.group_id,
                                                    title: group?.group_title
                                                })}
                                                className="w-6 text-green-600 hover:text-gray-800 cursor-pointer"/></td>
                                            <td className="py-2 px-4 border-b text-center"><ListBulletIcon
                                                title={`Отримати звіт «Про прогрес вихованців групи»`}
                                                className="w-6 text-blue-600 hover:text-gray-800 cursor-pointer"
                                                onClick={() => onGetChildrenReport({
                                                    group_id: group?.group_id,
                                                    title: group?.group_title
                                                })}
                                            /></td>
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