import HeaderSec1 from "../../../pages/worker/HeaderSec1";
import DashboardSec2 from "../DashboardSec2";
import DashboardSec3 from "../DashboardSec3";
import '../../../style/dashboard.css'

const WorkerDashboard = () => {
  return (
    <div className="dashboard-page">
      <HeaderSec1 />
      <DashboardSec2 />
      <DashboardSec3 />
    </div>
  );
};

export default WorkerDashboard;
