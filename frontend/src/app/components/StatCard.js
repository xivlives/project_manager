import React from 'react';

const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

export default StatCard;