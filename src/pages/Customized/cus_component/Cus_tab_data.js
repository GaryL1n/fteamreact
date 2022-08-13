import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Cus_attributes from './Cus_attributes';
import Cus_heatmap from './Cus_heatmap';
import CustBar from './CustBar';
import './Cus_tab_data.scss';

function TabPanel(props) {
  const { children, value, index, shareDetailData, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DataTabs(props) {
  const { shareDetailData } = props;
  // console.log('shareDetailData',shareDetailData)

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="ATTRIBUTES"
            {...a11yProps(0)}
            sx={{ width: '30%' }}
            disableRipple={true}
          />
          <Tab
            label="FEEBACKS"
            {...a11yProps(1)}
            sx={{ width: '30%' }}
            disableRipple={true}
          />
          <Tab
            label="ACTIVITIES"
            {...a11yProps(2)}
            sx={{ width: '30%' }}
            disableRipple={true}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="row detail_tab">
          <div className="attributes col-4">
            <label>style</label>
            <img
              src={`/imgs/Customized/${shareDetailData.back_style}.png`}
              className="cus-atrib-img"
            />
          </div>
          <div className="attributes col-4">
            <label>pattern</label>
            <img
              src={`/imgs/Customized/pattern/${shareDetailData.back_pattern}.png`}
              className="cus-atrib-img bg-secondary"
            />
          </div>
          <div className="attributes col-4">
            <label>base color</label>
            <div
              className="cus-atrib-img"
              style={{ backgroundColor: `${shareDetailData.back_color}` }}
            ></div>
          </div>
          <div className="attributes col-4">
            <label>sticker</label>
            <img
              src={`/imgs/Customized/sticker/${shareDetailData.back_sticker}.png`}
              className="cus-atrib-img bg-black"
            />
            
          </div>
          <div className="attributes col-4">
            <label>text</label>
            <p >{shareDetailData.back_text}</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustBar />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Cus_heatmap className="h-100" />
      </TabPanel>
    </Box>
  );
}
