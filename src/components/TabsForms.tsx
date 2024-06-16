import {useState} from "react";
import AddUpdateUserForm from "./AddUpdateUserForm.tsx";
import AddUpdateEmployeeForm from "./AddUpdatEmployeeForm.tsx";
import AddUpdateParrentForm from "./AddUpdatParrentForm.tsx";


const TabsForms = () => {
    const [activeTab, setActiveTab] = useState('users');
    return (
        <>
            <ul role="tablist" className="flex list-none flex-row flex-wrap border-b-0 ps-0">
                <li role="presentation">
                    <button
                        className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                ${activeTab === 'users' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}
                hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
                        onClick={() => setActiveTab('users')}
                        role="tab"
                        aria-selected={activeTab === 'users'}
                    >
                        Адмін персонал
                    </button>
                </li>
                <li role="presentation">
                    <button
                        className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                ${activeTab === 'employees' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}
                hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
                        onClick={() => setActiveTab('employees')}
                        role="tab"
                        aria-selected={activeTab === 'employees'}
                    >
                        Співробітники
                    </button>
                </li>
                <li role="presentation">
                    <button
                        className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                ${activeTab === 'parrents' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}
                hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
                        onClick={() => setActiveTab('parrents')}
                        role="tab"
                        aria-selected={activeTab === 'parrents'}
                    >
                        Батьки
                    </button>
                </li>
            </ul>

            {/*<!--Tabs content-->*/}
            <div className="mb-6">
                {activeTab === 'users' && <AddUpdateUserForm/>}
                {activeTab === 'employees' && <AddUpdateEmployeeForm tableType={'active'}/>}
                {activeTab === 'parrents' && <AddUpdateParrentForm/>}
            </div>

        </>
    );
};

export default TabsForms;