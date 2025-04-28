import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

interface StatusPiePopupProps {
  data: { title: string; value: number; color: string }[];
  onClose: () => void;
}

const StatusPiePopup: React.FC<StatusPiePopupProps> = ({ data, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(30, 41, 59, 0.25)' }} // semi-transparent dark overlay
      onClick={onClose}
    >
      <div
        className="flex items-center justify-center"
        style={{ background: 'transparent' }}
        onClick={e => e.stopPropagation()}
      >
        <PieChart
          data={data}
          lineWidth={100} // 100 makes it a pie chart, not a donut
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          labelStyle={{
            fontSize: '0.9rem',
            fontFamily: 'inherit',
            fill: '#374151',
            fontWeight: 600,
          }}
          labelPosition={70}
          style={{ width: 180, height: 180 }}
        />
      </div>
    </div>
  );
};

export default StatusPiePopup;