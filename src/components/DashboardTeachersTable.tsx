import {useDispatch, useSelector} from "react-redux";
import {PresentationChartBarIcon} from "@heroicons/react/24/outline";
import Modal from "./Modal.tsx";
import DashboardTeacherReportForm from "./DashboardTeacherReportForm.tsx";
import {getChildrenGroupForReport, getGroupForReport, getTeacherForReport} from "../store/dashbordSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";

const DashboardTeachersTable = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const dashboardTeachersList = useSelector(state => state.dashboard?.teachers ?? []);
    // @ts-ignore
    const educationPeriod = useSelector(state => state.dashboard?.educationPeriod ?? '');
    // @ts-ignore
    const dashboardTeacherToReport = useSelector(state => state.dashboard?.teacherToReport ?? null);
    const onGetTeacherReport = (teacher: {teacher_id: number, teacher_name: string}) => {
        dispatch(getTeacherForReport(teacher));
        dispatch(getGroupForReport(null));
        dispatch(getChildrenGroupForReport(null));
        dispatch(openCloseModal({open: true}))
    }


    return (
        <div className="p-6">
            <div className="">
                <div className="container mx-auto mt-10">
                    <Modal>
                        <DashboardTeacherReportForm/>
                    </Modal>
                </div>
                <h2 className="text-2xl font-bold">Статистика "Зайнятість викладачів центру" навчальний
                    рік {educationPeriod}</h2>
                {dashboardTeachersList.length === 0
                    ?
                    <p>Тут поки що немає нічого </p>
                    :
                    <div className="overflow-x-auto max-h-64">
                        <table className="min-w-full bg-white">
                            <thead className="top-0 bg-white">
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
                                <th className="py-2 px-4 border-b"></th>
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
                                            <td className="py-2 px-4 border-b text-center"><PresentationChartBarIcon
                                                title={`Отримати звіт «Про проведені навчальні заходи»`}
                                                onClick={() => onGetTeacherReport({
                                                    teacher_id: teacher?.teacher_id,
                                                    teacher_name: teacher?.teacher_full_name
                                                })}
                                                className="w-6 text-blue-600 hover:text-gray-800 cursor-pointer"/></td>
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