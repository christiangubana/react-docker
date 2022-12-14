import React from 'react';

function DateCard({ date }) {
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  // eslint-disable-next-line no-unused-vars
  const year = date.getFullYear();

  return (
    <div className="date">
      <div className="date__month">{month}</div>
      <div className="date__day">{day}</div>
    </div>
  );
}

export default DateCard;
