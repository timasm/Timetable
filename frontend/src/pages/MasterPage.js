import NavBar from "../components/NavBar";
import ShiftSchedule from "../components/ShiftSchedule";

const MasterPage = () => {
   return (
      <div className="master-page">
         <NavBar></NavBar>
         <ShiftSchedule></ShiftSchedule>
      </div>
   );
};

export default MasterPage;
