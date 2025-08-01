import React from 'react';

const SkeletonCard = ({ lines = 3, showAvatar = true }) => {
  return (
    <div className="card animate-pulse">
      {showAvatar && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div 
            key={index}
            className="h-3 bg-gray-200 rounded"
            style={{ 
              width: index === lines - 1 ? '60%' : '100%' 
            }}
          ></div>
        ))}
      </div>
      
      <div className="flex gap-2 mt-6">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
