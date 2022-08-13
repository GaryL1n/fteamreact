// import { render } from '@testing-library/react';
import axios from 'axios';
import React, { Fragment, useEffect } from 'react';
import '../style/Lesson_card.scss';
import { alert } from '../../Carts/Nathan_components/AlertComponent';
function Lesson_card(props) {
  const {
    lessonDisplay,
    setLessonDisplay,
    lessonRaw,
    danceList,
    timeList,
    loginID,
    setCartTotalDep,
  } = props;

  useEffect(() => {
    danceRefresh();
  }, [danceList]);

  useEffect(() => {
    timeRefresh();
  }, [timeList]);

  const danceRefresh = () => {
    const newLessonDisplay = lessonRaw.filter((v, i) => {
      return v.type.includes(danceList);
    });
    console.log('danceRefresh', newLessonDisplay);
    setLessonDisplay(newLessonDisplay);
  };

  const timeRefresh = () => {
    const newLessonDisplay = lessonRaw.filter((v, i) => {
      return v.duringtime_begin.includes(timeList);
    });
    console.log('timeRefresh', newLessonDisplay);
    setLessonDisplay(newLessonDisplay);
  };

  const displayTable = lessonDisplay.map((v, i) => {
    return (
      <div
        key={v.sid}
        className=" col-sm-11 col-12 cooler_lesson_card   h-20 d-flex flex-wrap border-bottom "
      >
        <div className=" col-sm-6 col-12">
          <div className="cooler_lesson_card_title_collect d-flex">
            <h5 className="cooler_lesson_card_title w-90">{v.name}</h5>
            <div className="cooler_lesson_card_collect w-10   d-flex justify-content-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-1 w-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p className="cooler_lesson_card_name text-center m-0  ">
            {v.teacher_name}
          </p>
          <div className=" cooler_gray">
            {/* <span>{v.duringtime_begin}</span> */}
            <span>{v.duringtime_begin.slice(5, 7)}</span>
            <span>/</span>
            <span>{v.duringtime_begin.slice(8, 10)}</span>
            <span className=" p-1">-</span>
            <span>{v.duringtime_end.slice(5, 7)}</span>
            <span>/</span>
            <span>{v.duringtime_end.slice(8, 10)}</span>
          </div>
        </div>
        <div className=" cooler_lesson_card_quota_number col-sm-2 col-12 d-flex  align-items-end justify-content-around">
          <span className="cooler_lesson_card_quota fw-bold">剩餘名額</span>

          <span className="cooler_gray ">{v.quota}</span>
        </div>
        <div className="  col-sm-4 col-12 d-flex ">
          <div className="cooler_lesson_card_category_price w-50 h-100 d-flex  flex-column justify-content-between align-items-center ">
            <p className=" cooler_lesson_card_category cooler_gray ">
              {v.type}
            </p>
            <p className="cooler_lesson_card_price cooler_gray h-13 ">
              {v.price}
            </p>
          </div>
          <div className="w-50 h-100 d-flex align-items-center justify-content-center  ">
            <div className="w-50 h-50 ms-4 col-sm-6 col-4  cooler_lesson_card_btn  d-flex align-items-center justify-content-center">
              <button
                className=" cooler_lesson_card_book"
                onClick={() => {
                  axios
                    .post('http://localhost:3000/carts', {
                      sid: v.sid,
                      quantity: 1,
                      type: 'lesson',
                      memID: loginID,
                    })
                    .then((res) => {
                      if (res.data.success === true) {
                        setCartTotalDep((prev) => prev + 1);
                        alert('課程新增成功');
                      } else {
                        alert('此課程已經在購物車');
                      }
                    });
                }}
              >
                BOOK
              </button>
            </div>
            <div className=" col-sm-6 h-100 d-flex justify-content-end">
              <div className="cooler_lesson_card_collect w-70  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-1 w-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <>{displayTable}</>;
}
export default Lesson_card;
