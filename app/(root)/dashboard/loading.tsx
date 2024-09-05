import React from "react";

const Loading = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 animate-pulse">
      <div className="bg-gray-300 h-8 w-48 mb-4 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-1/2 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
