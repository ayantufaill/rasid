import ReportsTable from './ReportsTable';

export default function Register() {
  return (
    <div>
      <div className="dtop">
        <div>
          <div className="dtitle display">Hazard register</div>
          <div className="dsub">Every observation, near-miss, unsafe act and positive report, with its audit trail</div>
        </div>
        <input className="dsearch" placeholder="Search ticket or keyword" />
      </div>
      <ReportsTable title="All records" wide />
    </div>
  );
}
