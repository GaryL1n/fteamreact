import React, { useState, useEffect } from 'react';
import ScrollBox from '../../../components/ScrollBox/ScrollBox';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import '../styles/WatchFavorite.scss';

const WatchFavorite = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [favoritesData, setFavoritesData] = useState([]);
  const [memId, setMemId] = useState('');

  const memberFavoriteDetails = async (memberId) => {
    setMemId(memberId);
    axios
      .get(`http://localhost:3000/admin/memberfavorite/${memberId}`)
      .then((res) => {
        setFavoritesData(res.data);
      });
  };
  useEffect(() => {
    memberFavoriteDetails(params.memberId);
  }, [params.memberId]);

  console.log(favoritesData);

  return (
    <>
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-dark watchFavoriteWrap">
        <div className="h-90 w-30 bg-light watchFavoriteBox">
          <div className="h-10 w-100 d-flex justify-content-center align-items-center watchFavoriteTitle">
            <h2>{memId} Favorite</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-10 cursorpointer"
              onClick={() => {
                navigate('/admin');
              }}
            >
              <path
                fill="red"
                d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM143 208.1L190.1 255.1L143 303C133.7 312.4 133.7 327.6 143 336.1C152.4 346.3 167.6 346.3 176.1 336.1L223.1 289.9L271 336.1C280.4 346.3 295.6 346.3 304.1 336.1C314.3 327.6 314.3 312.4 304.1 303L257.9 255.1L304.1 208.1C314.3 199.6 314.3 184.4 304.1 175C295.6 165.7 280.4 165.7 271 175L223.1 222.1L176.1 175C167.6 165.7 152.4 165.7 143 175C133.7 184.4 133.7 199.6 143 208.1V208.1z"
              />
            </svg>
          </div>
          <div className="h-90 w-100">
            <ScrollBox>
              {favoritesData.map((v, i) => {
                return (
                  <div className="w-95 m-3 adminfavoriteCard" key={uuidv4()}>
                    <div className="d-flex h-100 w-100">
                      <div className="col-xl-3">
                        <img
                          src={`/imgs/Products/${v.favoriteImg}`}
                          alt=""
                          className="h-100"
                          style={{
                            objectFit: 'cover',
                            aspectRatio: '1/1',
                          }}
                          onClick={() => {
                            navigate(`/PRODUCTS/details/${v.favoriteId}`);
                          }}
                        />
                      </div>
                      <div className="col-xl-9">
                        <p
                          className="h-50 p-3 m-0"
                          onClick={() => {
                            navigate(`/PRODUCTS/details/${v.favoriteId}`);
                          }}
                        >
                          {v.favoriteName}
                        </p>
                        <div className="h-50 d-flex justify-content-end align-items-center">
                          <h5 className="text-gray p-3">$ {v.favoritePrice}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollBox>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchFavorite;
