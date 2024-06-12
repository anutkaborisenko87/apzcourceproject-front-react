import {UserFormData} from "../apiServices/apiServicesTypes.ts";

type FormParProps = {
    userFormData: UserFormData;
    setUserFormData: () => void;
    clearErrors: () => void;
    errors: {
        first_name: [],
        last_name: [],
        patronymic_name: [],
        email: [],
        role: [],
        city: [],
        street: [],
        house_number: [],
        apartment_number: [],
        birth_date: []
    };
    roles: [];
    maxDate: Date
}
const UserFormPart = ({      userFormData,
                             setUserFormData,
                             clearErrors,
                             errors,
                             roles,
                             maxDate
                         }): FormParProps  => {
    return (
        <>

            {/* Прізвище */}
            <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Прізвище
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="last_name"
                        id="last-name"
                        value={userFormData.last_name}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.last_name?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('last_name');
                            setUserFormData(userFormData => ({ ...userFormData, last_name: e.target.value }));
                        }}
                    />
                </div>
                {errors.last_name.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {errors.last_name.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Ім'я */}
            <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Ім'я
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="first_name"
                        id="first-name"
                        value={userFormData.first_name}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.first_name?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('first_name');
                            setUserFormData(userFormData => ({ ...userFormData, first_name: e.target.value }));
                        }}
                    />
                </div>
                {errors.first_name.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {errors.first_name.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* По батькові */}
            <div className="sm:col-span-4">
                <label htmlFor="patronymic_name" className="block text-sm font-medium leading-6 text-gray-900">
                    По батькові
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="patronymic_name"
                        id="patronymic_name"
                        value={userFormData.patronymic_name ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.patronymic_name?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('patronymic_name');
                            setUserFormData(userFormData => ({ ...userFormData, patronymic_name: e.target.value }));
                        }}
                    />
                </div>
                {errors.patronymic_name.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {errors.patronymic_name.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Email */}
            <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={userFormData.email}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.email?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('email');
                            setUserFormData(userFormData => ({ ...userFormData, email: e.target.value }));
                        }}
                    />
                </div>
                {errors.email.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {errors.email.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Роль користувача у системі */}
            <div className="sm:col-span-3">
                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                    Роль користувача у системі
                </label>
                <div className="mt-2">
                    <select
                        id="role"
                        name="role"
                        value={userFormData?.role ?? ''}
                        onChange={e => {
                            clearErrors('role');
                            setUserFormData(userFormData => ({ ...userFormData, role: e.target.value }));
                        }}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        <option>не назначено</option>
                        {roles.length > 0 &&
                            roles.map((role) => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                    </select>
                </div>
                {errors.role.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {errors.role.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Населений пункт */}
            <div className="col-span-full">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    Населений пункт
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={userFormData.city}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.city?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('city');
                            setUserFormData(userFormData => ({ ...userFormData, city: e.target.value }));
                        }}
                    />
                </div>
                {errors.city.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {errors.city.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Вулиця */}
            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                    Вулиця
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="street"
                        id="street"
                        value={userFormData.street}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.street?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('street');
                            setUserFormData(userFormData => ({ ...userFormData, street: e.target.value }));
                        }}
                    />
                </div>
                {errors.street.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {errors.street.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Номер будинку */}
            <div className="sm:col-span-2">
                <label htmlFor="house_number" className="block text-sm font-medium leading-6 text-gray-900">
                    Номер будинку
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="house_number"
                        id="house_number"
                        value={userFormData.house_number}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.house_number?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('house_number');
                            setUserFormData(userFormData => ({ ...userFormData, house_number: e.target.value }));
                        }}
                    />
                </div>
                {errors.house_number.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {errors.house_number.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Номер квартири */}
            <div className="sm:col-span-2">
                <label htmlFor="apartment_number" className="block text-sm font-medium leading-6 text-gray-900">
                    Номер квартири
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="apartment_number"
                        id="apartment_number"
                        value={userFormData.apartment_number}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.apartment_number?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('apartment_number');
                            setUserFormData(userFormData => ({ ...userFormData, apartment_number: e.target.value }));
                        }}
                    />
                </div>
                {errors.apartment_number.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {errors.apartment_number.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Дата народження */}
            <div className="sm:col-span-2">
                <label htmlFor="birthdate" className="block text-sm font-medium leading-6 text-gray-900">
                    Дата народження
                </label>
                <div className="mt-2">
                    <input
                        type="date"
                        name="birthdate"
                        max={maxDate}
                        id="birthdate"
                        value={userFormData.birth_date}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.birth_date?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('birth_date');
                            setUserFormData(userFormData => ({ ...userFormData, birth_date: e.target.value }));
                        }}
                    />
                </div>
                {errors.birth_date.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {errors.birth_date.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default UserFormPart;
