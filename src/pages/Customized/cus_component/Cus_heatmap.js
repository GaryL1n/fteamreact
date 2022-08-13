import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';
import './Cus_heatmap.css';

function Cus_heatmap() {
  return (
    <>
      <CalendarHeatmap 
        startDate={new Date('2022-03-01')}
        endDate={new Date('2022-08-30')}
        values={[
         
          { date: '2022-03-15', count: 3 },
          { date: '2022-03-17', count: 3 },
          { date: '2022-03-18', count: 3 },
          { date: '2022-03-21', count: 3 },
          { date: '2022-03-27', count: 3 },
          { date: '2022-03-30', count: 3 },
          { date: '2022-04-01', count: 3 },
          { date: '2022-04-05', count: 3 },
          { date: '2022-04-08', count: 3 }, 
          { date: '2022-04-09', count: 3 },
          { date: '2022-05-20', count: 6 },
          { date: '2022-07-02', count: 5000 },
          { date: '2022-07-03', count: 4 },
          { date: '2022-07-15', count: 3 },
          { date: '2022-07-20', count: 10000},
          // ...and so on
        ]}
      />
    </>
  );
}

export default Cus_heatmap;
