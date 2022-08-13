import React, { useState } from 'react';
import MuiTabs from './MuiTabs';
import '../../styles/AllRecord.scss';
import Favorite from './Favorite';
import Record from './Record';
import Lesson from './Lesson';
import Chat from './Chat';

const AllRecord = ({setCartTotalDep}) => {
  const [selectItem, setSelectItem] = useState('SAVED');
  let moveTrain = 'translateX(0%)';
  if (selectItem === 'RECORD') {
    moveTrain = 'translateX(-25%)';
  }
  if (selectItem === 'MY LESSON') {
    moveTrain = 'translateX(-50%)';
  }
  if (selectItem === 'CHAT') {
    moveTrain = 'translateX(-75%)';
  }
  return (
    <>
      <div className="allRecordWarp">
        <MuiTabs selectItem={selectItem} setSelectItem={setSelectItem} />
        <div className="w-100 h-90 memberAllRecordWrap">
          <div
            className="h-100 d-flex"
            style={{
              width: '400%',
              transform: moveTrain,
              transition: '0.5s ease',
            }}
          >
            <div className="w-25">
              <Favorite setCartTotalDep={setCartTotalDep} />
            </div>
            <div className="w-25">
              <Record />
            </div>
            <div className="w-25">
              <Lesson />
            </div>
            <div className="w-25">
              <Chat selectItem={selectItem} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRecord;
