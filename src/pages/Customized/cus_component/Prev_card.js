import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../Product/commons/axios';
import { alert } from '../../Carts/Nathan_components/AlertComponent';
import { confirm } from '../../Carts/Nathan_components/ConfirmComponent';
function Prev_card(props) {
  const { prevdata, singleShareData, setOwnDep } = props;
  // console.log(singleShareData)
  console.log(prevdata);
  const navigate = useNavigate();

  const deleteitem = () => {
    let i = confirm('刪除物件？');
    i.then((res) => {
      if (res === true) {
        axios
          .delete(`http://localhost:3000/custom/delete?sid=${prevdata.sid}`)
          .then(()=>{
            let i = alert('確認刪除');
            i.then((res)=>{
              if(res===true){
                setOwnDep((prev)=>prev-1)
              }
            })
          });
      }
    });
  };

  return (
    <>
      <div className="share-card-con p-3 ">
        <div className="share-card">
          <div className="board">
            <img src={`http://localhost:3000/custom/${prevdata.back_img}`} />
          </div>
          <div className="share-right ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-1 w-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              stroke-width="2"
              onClick={deleteitem}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            <h3> {prevdata.custom_product_name}</h3>
            <div className="share-creator">
              <div className="share-ava">
                <img
                  src={`http://localhost:3000/avatar/${prevdata.mem_avatar}`}
                />
              </div>
              <div className="share-name">
                <h6>{prevdata.mem_name}</h6>
              </div>
            </div>
            <Link to={`/customized/create/detail/${singleShareData.sid}`}>
              <button className="viv-btn">View</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prev_card;
