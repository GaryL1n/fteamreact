import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Bar,
  // CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from 'recharts';

const data = [
  {
    month: 'Nov 15, 2019',
    Arm1: { val: 4000, desc: 'descktop...' },
    Arm2: { val: 2400, desc: 'b desc' },
    Arm3: { val: 2400, desc: 'c desc' },
  },
  {
    month: 'Dec 01, 2019',
    Arm1: { val: 3000, desc: 'descktop...' },
    Arm2: { val: 1398, desc: 'b desc' },
    Arm3: { val: 2210, desc: 'c desc' },
  },
  {
    month: 'Dec 15, 2019',
    Arm1: { val: 2000, desc: 'descktop...' },
    Arm2: { val: 9800, desc: 'b desc' },
    Arm3: { val: 2290, desc: 'c desc' },
  },
  {
    month: 'Jan 01, 2020',
    Arm1: { val: 2780, desc: 'descktop...' },
    Arm2: { val: 3900, desc: 'b desc' },
    Arm3: { val: 2000, desc: 'c desc' },
  },
  {
    month: 'Jan 15, 2020',
    Arm1: { val: 1890, desc: 'descktop...' },
    Arm2: { val: 4800, desc: 'b desc' },
    Arm3: { val: 2180, desc: 'c desc' },
  },
  {
    month: 'Feb 01, 2020',
    Arm1: { val: 4000, desc: 'descktop...' },
    Arm2: { val: 2400, desc: 'b desc' },
    Arm3: { val: 2400, desc: 'c desc' },
  },
];

function CustBar() {
  return (
    <>
      <ResponsiveContainer width="100%" height={144}>
        <BarChart
          width={600}
          height={144}
          data={data}
          stackOffset="expand"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip cursor={false} />
          <Bar
            dataKey="Arm1.val"
            stackId="1"
            stroke="#61dafb"
            fill="#61dafb"
            id="aarea"
            name="Arm1"
          />
          <Bar
            dataKey="Arm2.val"
            stackId="1"
            stroke="#00ced1"
            fill="#00ced1"
            id="barea"
            name="Arm2"
            cursor={'pointer'}
            onClick={(data, i) => alert('Arm2 clicked ' + i)}
          />
          <Bar
            cursor={'pointer'}
            dataKey="Arm3.val"
            stackId="1"
            stroke="#c0c0c0"
            fill="#c0c0c0"
            id="carea"
            name="Arm3"
            onClick={(data, i) => alert('Arm3 clicked ' + i)}
            // onMouseOver={() => alert()}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default CustBar;
