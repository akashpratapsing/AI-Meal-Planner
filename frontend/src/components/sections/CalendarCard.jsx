const CalendarCard = () => (
  <div className="card bg-white shadow text-sm p-4 text-center">
    <p className="font-medium mb-2">August 2023</p>
    <div className="grid grid-cols-7 gap-2 text-gray-700">
      {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
        <span key={d} className="font-semibold">{d}</span>
      ))}
      {Array.from({ length: 31 }, (_, i) => (
        <span key={i} className={`py-1 rounded-full ${i + 1 === 15 ? "bg-blue-500 text-white" : ""}`}>
          {i + 1}
        </span>
      ))}
    </div>
  </div>
);
export default CalendarCard;
