import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {openCloseModal} from "../store/modalSlice.ts";
import {getDashboardGroupReportExcel, getDashboardGroupReportWord} from "../apiServices/dashboardApiServices.ts";
import {cleanDashdoardErrors, getGroupForReport} from "../store/dashbordSlice.ts";

export default function DashboardGroupReportForm() {
    // @ts-ignore
    const dashboardGroupToReport = useSelector(state => state.dashboard?.groupToReport ?? null);
    // @ts-ignore
    const isModalOpen = useSelector(state => state.modal.isOpen);
    // @ts-ignore
    const formLoading = useSelector(state => state.dashboard.statusForm === 'loading');
    const today = new Date();
    const maxDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    // @ts-ignore
    const errors = useSelector(state => state.dashboard.validationDAshboardErrors);
    // @ts-ignore
    const allertError = useSelector(state => state.dashboard.error);

    const dispatch = useDispatch();
    const [dashboardGroupToReportFormData, setDashboardGroupToReportFormData] = useState({
        group_id: dashboardGroupToReport?.group_id,
        from: '',
        to: maxDate
    });
    const clearErrors = (field: string) => {
        // @ts-ignore
        dispatch(cleanDashdoardErrors());
        dispatch(cleanDashdoardErrors({field}));
    };

    const submitWordForm = async (ev: any) => {
        ev.preventDefault();
        const cleanedFormData = cleanObject(dashboardGroupToReportFormData);
        try {
            const response = await getDashboardGroupReportWord(cleanedFormData);
            const blob = new Blob([response.data], {type: response.headers['content-type']});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = response.headers['content-disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1].replace(/["']/g, '')
                : 'report.docx';
            link.download = filename || 'downloaded-file';
            link.click();
            window.URL.revokeObjectURL(url);
            dispatch(openCloseModal({open: false}));
            dispatch(getGroupForReport(null));
        } catch (e) {
            console.log(e);
        }
    }

    const submitExcelForm = async (ev: any) => {
        ev.preventDefault();
        const cleanedFormData = cleanObject(dashboardGroupToReportFormData);
        try {
            const response = await getDashboardGroupReportExcel(cleanedFormData);
            const blob = new Blob([response.data], {type: response.headers['content-type']});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = response.headers['content-disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1].replace(/["']/g, '')
                : 'report.xlsx';
            link.download = filename || 'downloaded-file';
            link.click();
            window.URL.revokeObjectURL(url);
            dispatch(openCloseModal({open: false}));
            dispatch(getGroupForReport(null));
        } catch (e) {
            console.log(e);
        }
    }
    const cleanObject = (object: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        return Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(object).filter(([_, v]) => v != null && v !== '')
        );
    }


    useEffect(() => {

    }, [dispatch, isModalOpen]);
    return (
        <form>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Запит на отримання звіту «Список групи»
                    </h2>

                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Назва групи - {dashboardGroupToReport?.title ?? ''}
                    </h2>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {allertError !== null ?
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                                <p className="font-bold">Помилка!</p>
                                <p>{allertError}</p>
                            </div>
                            : ''

                        }
                        {/* Підзвітний період */}
                        <div className="sm:col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900 text-center">
                                Підзвітний період
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="from" className="block text-sm font-medium leading-6 text-gray-900">
                                Від дати
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="from"
                                    max={maxDate}
                                    id="from"
                                    value={dashboardGroupToReportFormData.from}
                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                                        errors.from?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                                    }`}
                                    onChange={e => {
                                        clearErrors('from');
                                        // @ts-ignore
                                        setDashboardGroupToReportFormData(dashboardGroupToReportFormData => ({...dashboardGroupToReportFormData, from: e.target.value}));
                                    }}
                                />
                            </div>
                            {errors.from.length > 0 && (
                                <div className="text-red-500 text-xs">
                                    {
                                        // @ts-ignore
                                        errors.from.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))}
                                </div>
                            )}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="to" className="block text-sm font-medium leading-6 text-gray-900">
                                До дати
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="to"
                                    max={maxDate}
                                    min={dashboardGroupToReportFormData.from ?? ''}
                                    id="to"
                                    value={dashboardGroupToReportFormData.to}
                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                                        errors.to?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                                    }`}
                                    onChange={e => {
                                        clearErrors('from');
                                        // @ts-ignore
                                        setDashboardGroupToReportFormData(dashboardGroupToReportFormData => ({...dashboardGroupToReportFormData, to: e.target.value}));
                                    }}
                                />
                            </div>
                            {errors.to.length > 0 && (
                                <div className="text-red-500 text-xs">
                                    {
                                        // @ts-ignore
                                        errors.to.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={submitWordForm} type="button"
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        disabled={formLoading || dashboardGroupToReportFormData.from === '' || dashboardGroupToReportFormData.to === '' || dashboardGroupToReportFormData.from > dashboardGroupToReportFormData.to}>
                    Отримати звіт у форматі Word
                </button>
                <button
                    onClick={submitExcelForm}
                    type="button"
                    disabled={formLoading || dashboardGroupToReportFormData.from === '' || dashboardGroupToReportFormData.to === '' || dashboardGroupToReportFormData.from > dashboardGroupToReportFormData.to}
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                    Отримати звіт у форматі Excel
                </button>
            </div>
        </form>
    )
}
