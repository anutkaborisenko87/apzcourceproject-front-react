import Breadcrumbs from "../components/Breadcrumbs.tsx";
import {useEffect, useState} from "react";
import {getProfileInfo} from "../apiServices/profileApiServices.ts";

const UserProfile = () => {
    const [profile, setProfile] = useState(null);

    const bredcrumpsRoutes = [{path: '/profile', displayName: "Профіль"}];
    useEffect(() => {
        getProfileInfo().then((data) => {
            setProfile(data);
        }).catch((error) => {
            console.error('profile', error)
        })
    }, []);
    return (
        <>
            <Breadcrumbs routes={bredcrumpsRoutes}/>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Інформація про профіль</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{profile?.role?.name}</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">ПІБ</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {profile?.last_name ?? ''} {profile?.first_name ?? ''} {profile?.patronymic_name ?? ''}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Категорія</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {profile?.user_category === "employee" ? "співробітники" : (profile?.user_category === "parent" ? "батьки" : (profile?.user_category === "children" ? "діти" : "адмін. персонал"))}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {profile?.email ?? ''}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Адреса проживання</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {profile?.city ? profile?.city : ''}
                                {profile?.street ? `, ${profile?.street}` : ''}
                                {profile?.house_number ? `, ${profile?.house_number}` : ''}
                                {profile?.house_number ? `, ${profile?.house_number}` : ''}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Дата народження</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {profile?.birthdate ?? ''}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>


    );
};

export default UserProfile;
