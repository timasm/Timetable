import "../scss/shift-schedule.scss";

const ShiftScheduleEmployee = ({ employee }) => {
  return (
    <div className="employee-div" draggable={true}>
      <div>
        <label>{`${employee.firstname} ${employee.lastname}`}</label>
      </div>
      <div>
        <label>{`Verbleibende Stunden: ${employee.duration}`}</label>
      </div>
    </div>
  );
};

export default ShiftScheduleEmployee;
