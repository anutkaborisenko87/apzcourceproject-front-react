import Breadcrumbs from "../components/Breadcrumbs.tsx";
import {useState} from "react";
import EmployeesActive from "../components/EmployeesActive.tsx";
import EmployeesWorking from "../components/EmployeesWorking.tsx";
import EmployeesNotActive from "../components/EmployeesNotActive.tsx";

const EmployeesView = () => {
    const bredcrumpsRoutes = [{path: '/eployees', displayName: "Співробітники"}];
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
                <li role="presentation">
                    <button
                        className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                ${activeTab === 'working' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}
                hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
                        onClick={() => setActiveTab('working')}
                        role="tab"
                        aria-selected={activeTab === 'working'}
                    >
                        Працюючі
                    </button>
                </li>
            </ul>

            {/*<!--Tabs content-->*/}
            <div className="mb-6">
                {activeTab === 'active' && <EmployeesActive/>}
                {activeTab === 'notActive' && <EmployeesNotActive/>}
                {activeTab === 'working' && <EmployeesWorking/>}
            </div>
        </>
    );
};

export default EmployeesView;