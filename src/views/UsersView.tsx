import Breadcrumbs from "../components/Breadcrumbs.tsx";
import {useState} from "react";
import UsersActive from "../components/UsersActive.tsx";
import UsersNotActive from "../components/UserNotActive.tsx";

const UsersView = () => {
    const bredcrumpsRoutes = [{path: '/users', displayName: "Користувачі"}];
    const [activeTab, setActiveTab] = useState('active');
    return (
        <>
            <Breadcrumbs routes={bredcrumpsRoutes}/>
            <ul role="tablist" className="flex list-none flex-row flex-wrap border-b-0 ps-0">
                <li role="presentation">
                    <button
                        className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                ${activeTab === 'active' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}
                hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
                        onClick={() => setActiveTab('active')}
                        role="tab"
                        aria-selected={activeTab === 'active'}
                    >
                        Активні
                    </button>
                </li>
                <li role="presentation">
                    <button
                        className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                ${activeTab === 'notActive' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}
                hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
                        onClick={() => setActiveTab('notActive')}
                        role="tab"
                        aria-selected={activeTab === 'notActive'}
                    >
                        Деактивовані
                    </button>
                </li>
            </ul>

            {/*<!--Tabs content-->*/}
            <div className="mb-6">
                {activeTab === 'active' && <UsersActive/>}
                {activeTab === 'notActive' && <UsersNotActive/>}
            </div>
        </>
    );
};

export default UsersView;