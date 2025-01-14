import DashboardComponent from "../components/DashboardComponent.tsx";
import Breadcrumbs from "../components/Breadcrumbs.tsx";

const Dashboard = () => {
    return (
        <div>
            <Breadcrumbs routes={[]}/>
            <DashboardComponent/>
        </div>
    );
};

export default Dashboard;
