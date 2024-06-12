import {EmployeeFormData} from "../apiServices/apiServicesTypes.ts";

type FormParProps = {
    employeeFormData: EmployeeFormData;
    setEmployeeFormData: () => void;
    clearEmployeeErrors: () => void;
    employeeErrors: {
        position_id: [],
        phone: [],
        contract_number: [],
        passport_data: [],
        bank_account: [],
        bank_title: [],
        EDRPOU_bank_code: [],
        code_IBAN: [],
        medical_card_number: [],
        employment_date: []
    };
    positons: [];
    maxDate: string
}
const EmployeeFormPart = ({
                          employeeFormData,
                          setEmployeeFormData,
                          clearEmployeeErrors,
                          employeeErrors,
                          positons,
                          maxDate
                      }: FormParProps) => {
    return (
        <>
            {/* Позиція співробітника */}
            <div className="sm:col-span-3">
                <label htmlFor="position_id" className="block text-sm font-medium leading-6 text-gray-900">
                    Позиція співробітника
                </label>
                <div className="mt-2">
                    <select
                        id="position_id"
                        name="position_id"
                        value={employeeFormData?.position_id ?? ''}
                        onChange={e => {
                            clearEmployeeErrors('position_id');
                            setEmployeeFormData(employeeFormData => ({...employeeFormData, position_id: e.target.value}));
                        }}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        <option>не назначено</option>
                        {positons.length > 0 &&
                            positons.map((positon) => (
                                <option key={positon.id} value={positon.id}>{positon.title}</option>
                            ))}
                    </select>
                </div>
                {employeeErrors.position_id.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {employeeErrors.position_id.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>


            {/* номер телефону */}
            <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    Номер телефону
                </label>
                <div className="mt-2">
                    <input
                        type="phone"
                        name="phone"
                        id="phone"
                        value={employeeFormData?.phone ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            employeeErrors.phone?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearEmployeeErrors('phone');
                            setEmployeeFormData(employeeFormData => ({...employeeFormData, phone: e.target.value}));
                        }}
                    />
                </div>
                {employeeErrors.phone.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {employeeErrors.phone.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/*Номер контракту*/}
            <div className="sm:col-span-3">
                <label htmlFor="contract_number" className="block text-sm font-medium leading-6 text-gray-900">
                    Номер контракту
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="contract_number"
                        id="contract_number"
                        value={employeeFormData?.contract_number ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            employeeErrors.contract_number?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearEmployeeErrors('contract_number');
                            setEmployeeFormData(employeeFormData => ({...employeeFormData, contract_number: e.target.value}));
                        }}
                    />
                </div>
                {employeeErrors.contract_number.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {employeeErrors.contract_number.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Паспортні дані  */}
            <div className="sm:col-span-4">
                <label htmlFor="passport_data" className="block text-sm font-medium leading-6 text-gray-900">
                    Паспортні дані
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="passport_data"
                        id="passport_data"
                        value={employeeFormData?.passport_data ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            employeeErrors.passport_data?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearEmployeeErrors('passport_data');
                            setEmployeeFormData(employeeFormData => ({...employeeFormData, passport_data: e.target.value}));
                        }}
                    />
                </div>
                {employeeErrors.passport_data.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {employeeErrors.passport_data.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Банківські дані */}
            <div className="sm:col-span-4">
                <label htmlFor="bank_account" className="block text-sm font-medium leading-6 text-gray-900">
                    Акаунт у банку
                </label>
                <div className="mt-2">
                    <input
                        id="bank_account"
                        name="bank_account"
                        type="bank_account"
                        value={employeeFormData?.bank_account ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            employeeErrors.bank_account?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearEmployeeErrors('bank_account');
                            setEmployeeFormData(employeeFormData => ({...employeeFormData, bank_account: e.target.value}));
                        }}
                    />
                </div>
                {employeeErrors.bank_account.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {employeeErrors.bank_account.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            <div className="col-span-full">
                <label htmlFor="bank_title" className="block text-sm font-medium leading-6 text-gray-900">
                    Назва банку
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="bank_title"
                        id="bank_title"
                        value={employeeFormData?.bank_title ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            employeeErrors.bank_title?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearEmployeeErrors('bank_title');
                            setEmployeeFormData(employeeFormData => ({...employeeFormData, bank_title: e.target.value}));
                        }}
                    />
                </div>
                {employeeErrors.bank_title.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {employeeErrors.bank_title.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="EDRPOU_bank_code" className="block text-sm font-medium leading-6 text-gray-900">
                    ЄДРПОУ
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="EDRPOU_bank_code"
                        id="EDRPOU_bank_code"
                        value={employeeFormData?.EDRPOU_bank_code ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            employeeErrors.EDRPOU_bank_code?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearEmployeeErrors('EDRPOU_bank_code');
                            setEmployeeFormData(employeeFormData => ({...employeeFormData, street: e.target.value}));
                        }}
                    />
                </div>
                {employeeErrors.EDRPOU_bank_code.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {employeeErrors.EDRPOU_bank_code.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="code_IBAN" className="block text-sm font-medium leading-6 text-gray-900">
                    Код IBAN
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="code_IBAN"
                        id="code_IBAN"
                        value={employeeFormData?.code_IBAN ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            employeeErrors.code_IBAN?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearEmployeeErrors('code_IBAN');
                            setEmployeeFormData(employeeFormData => ({...employeeFormData, code_IBAN: e.target.value}));
                        }}
                    />
                </div>
                {employeeErrors.code_IBAN.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {employeeErrors.code_IBAN.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Номер медичної карти */}
            <div className="sm:col-span-2">
                <label htmlFor="medical_card_number" className="block text-sm font-medium leading-6 text-gray-900">
                    Номер медичної карти
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="medical_card_number"
                        id="medical_card_number"
                        value={employeeFormData?.medical_card_number ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            employeeErrors.medical_card_number?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearEmployeeErrors('medical_card_number');
                            setEmployeeFormData(employeeFormData => ({...employeeFormData, medical_card_number: e.target.value}));
                        }}
                    />
                </div>
                {employeeErrors.medical_card_number.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {employeeErrors.medical_card_number.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Дата прийняття на роботу */}
            <div className="sm:col-span-2">
                <label htmlFor="employment_date" className="block text-sm font-medium leading-6 text-gray-900">
                    Дата прийняття на роботу
                </label>
                <div className="mt-2">
                    <input
                        type="date"
                        name="employment_date"
                        max={maxDate}
                        id="employment_date"
                        value={employeeFormData?.employment_date ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            employeeErrors.employment_date?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearEmployeeErrors('employment_date');
                            setEmployeeFormData(employeeFormData => ({...employeeFormData, employment_date: e.target.value}));
                        }}
                    />
                </div>
                {employeeErrors.employment_date.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {employeeErrors.employment_date.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default EmployeeFormPart;
