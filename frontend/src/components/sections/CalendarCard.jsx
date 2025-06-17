import React, { useState } from 'react';

const CalendarCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(month, year);
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const getDaysArray = () => {
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    return daysArray;
  };

  const daysArray = getDaysArray();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  return (
    <div className="bg-white text-black rounded-lg shadow-lg p-4 w-auto">
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth} className="text-blue-500">
          &lt;
        </button>
        <h2 className="text-lg font-bold">{monthNames[month]} {year}</h2>
        <button onClick={handleNextMonth} className="text-blue-500">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-sm">
        <div className="font-bold">M</div>
        <div className="font-bold">T</div>
        <div className="font-bold">W</div>
        <div className="font-bold">T</div>
        <div className="font-bold">F</div>
        <div className="font-bold">S</div>
        <div className="font-bold">S</div>
        
        {Array(firstDayOfMonth).fill(null).map((_, i) => (
          <div key={i} className="text-gray-300"></div>
        ))}
        
        {daysArray.map(day => (
          <div
            key={day}
            className={`py-2 ${day === currentDate.getDate() ? 'bg-blue-200' : ''}`}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarCard;
