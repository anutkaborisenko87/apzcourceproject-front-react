import Breadcrumbs from "../components/Breadcrumbs.tsx";
import {useEffect, useState} from "react";
import {useStateContext} from "../../contexts/ContextProvider.tsx";
import {useSelector} from "react-redux";
import ChildrenTabsContent from "../components/ChildrenTabsContent.tsx";

const ChildrenView = () => {
    const bredcrumpsRoutes = [{path: '/children', displayName: "Діти"}];
    const [activeTab, setActiveTab] = useState('all');
    // @ts-ignore
    const { setNotification } = useStateContext();
    // @ts-ignore
    const notification = useSelector(state => state.parrents.notification);
    useEffect(() => {
        if (notification.type !== '' && notification.message !== '') {
            setNotification(notification)
        }
    }, [notification]);
    return (
        <>
            <Breadcrumbs routes={bredcrumpsRoutes}/>
            <ul role="tablist" className="flex list-none flex-row flex-wrap border-b-0 ps-0">
                <li role="presentation">
                    <button
                        className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                ${activeTab === 'all' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}
                hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
                        onClick={() => setActiveTab('all')}
                        role="tab"
                        aria-selected={activeTab === 'all'}
                    >
                        Всі
                    </button>
                </li>
                <li role="presentation">
                    <button
                        className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                ${activeTab === 'for-enrollment' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}
                hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
                        onClick={() => setActiveTab('for-enrollment')}
                        role="tab"
                        aria-selected={activeTab === 'for-enrollment'}
                    >
                        В черзі на зарахування
                    </button>
                </li>
                <li role="presentation">
                    <button
                        className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                ${activeTab === 'in-training' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}
                hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
                        onClick={() => setActiveTab('in-training')}
                        role="tab"
                        aria-selected={activeTab === 'in-training'}
                    >
                       В процесі навчання
                    </button>
                </li>
                <li role="presentation">
                    <button
                        className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                ${activeTab === 'graduated' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}
                hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
                        onClick={() => setActiveTab('graduated')}
                        role="tab"
                        aria-selected={activeTab === 'graduated'}
                    >
                        Випускники
                    </button>
                </li>
            </ul>
            {/*<!--Tabs content-->*/}
            <div className="mb-6">
                {activeTab === 'all' && <ChildrenTabsContent tabType={'all'} tabTitle={'Всі діти'}/>}
                {activeTab === 'for-enrollment' && <ChildrenTabsContent tabType={'for-enrollment'} tabTitle={'Діти в черзі на зарахування'}/>}
                {activeTab === 'in-training' && <ChildrenTabsContent tabType={'in-training'} tabTitle={'Діти в процесі навчання'}/>}
                {activeTab === 'graduated' && <ChildrenTabsContent tabType={'graduated'} tabTitle={'Діти випускники'}/>}
            </div>
        </>
    );
};

export default ChildrenView;