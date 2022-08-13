import React, { useState, useEffect, useContext } from 'react';
import Logo from '../logo_imgs/fteam-logo2.png';
import MenuSelect from './MenuSelect';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MemberContext } from '../App';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import ScrollBox from './ScrollBox/ScrollBox';
import { confirm } from './ConfirmComponent';
import { alert } from './AlertComponent';
const Navbar = (props) => {
  const {
    productTotalQty,
    lessonTotalQty,
    customTotalQty,
    setProductTotalQty,
    setLessonTotalQty,
    setCustomTotalQty,
    favoritesNum,
    setFavoritesNum,
    cartTotalDep,
    setCartTotalDep,
    setProductBg,
  } = props;
  const navigate = useNavigate();
  // 從這支Context拿值
  // auth為登入判斷(true,false) token為會員JWT的token logout是登出涵式
  const { auth, token, logout, auths, grade } = useContext(AuthContext);
  // 會員個人資料的State
  const { member, setMember } = useContext(MemberContext);
  // 接NavBar要顯示的姓名或暱稱
  const [navName, setNavName] = useState('');

  // 收藏清單開關
  const [IamKevin, setIamKevin] = useState(false);

  // 收藏列表清單加入購物車
  const [kevinCartsMemId, setKevinCartsMemId] = useState(0);

  // Icon收藏列表清單
  const [iconFavorites, setIconFavorites] = useState([]);

  // 判斷有沒有登入存的值
  useEffect(() => {
    // 登入狀態不是false再執行 否則直接return
    // console.log(token);
    if (!auth) {
      setProductTotalQty(0);
      setLessonTotalQty(0);
      setCustomTotalQty(0);
      setFavoritesNum(0);
      return;
    } else {
      axios
        .get('http://localhost:3000/member/memberself', {
          // 發JWT一定要加這個headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // 接會員所有資料
          setMember(res.data);
          // 先接會員暱稱 NavBar顯示專用
          setNavName(res.data.mem_nickname);
          // 收藏列表清單加入購物車
          setKevinCartsMemId(res.data.sid);
          // 如果會員沒有暱稱改接姓名
          if (res.data.mem_nickname === '') {
            setNavName(res.data.mem_name);
          }
          // 讀取購物車總數
          axios
            .get(`http://localhost:3000/carts/getTotal?memID=${res.data.sid}`)
            .then((res) => {
              if (res.data.productResult.length !== 0) {
                let productTotal = 0;
                for (let i of res.data.productResult) {
                  productTotal += i.quantity;
                }
                setProductTotalQty(productTotal);
              }
              if (res.data.customResult.length !== 0) {
                let customTotal = 0;
                for (let i of res.data.customResult) {
                  customTotal += i.quantity;
                }
                setCustomTotalQty(customTotal);
              }
              if (res.data.lessonResult.length !== 0) {
                let lessonTotal = 0;
                for (let i of res.data.lessonResult) {
                  lessonTotal += i.quantity;
                }
                setLessonTotalQty(lessonTotal);
              }
            });
          // 紀錄該會員商品收藏總數
          axios
            .get(`http://localhost:3000/product/favoriteCount`, {
              // 發JWT一定要加這個headers
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              let favoritesNum = res.data[`count(sid)`];
              setFavoritesNum(favoritesNum);
            });
          // 顯示收藏icon清單商品資料
          axios
            .get(`http://localhost:3000/product/iconFavorites`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setIconFavorites(res.data);
            });
        });
    }
  }, [
    auths,
    auth,
    token,
    // setMember,
    setFavoritesNum,
    cartTotalDep,
    favoritesNum,
  ]); // 有變更資料才刷新
  return (
    <>
      <div className="w-100 top-grid d-flex">
        <div className="col-4 h-100 d-flex align-items-center">
          <div
            className="logo-wrap"
            onClick={() => {
              navigate('/');
            }}
          >
            <img src={Logo} alt="" />
          </div>
        </div>
        <div className="col-4 h-100"></div>
        <div className="col-4 h-100 ">
          <MenuSelect />
          <div className="nav-icon-wrap w-100 h-100 d-md-flex d-none justify-content-end align-items-center">
            {auth ? (
              // 登入
              grade === 'low' ? (
                <Link
                  className="text-decoration-none d-flex"
                  to={grade === 'low' ? '/member' : '/admin'}
                >
                  <div className="userLogin-icon-box">
                    <img
                      className="col-2 userLogin-icon-wrap"
                      style={{
                        objectFit: 'cover',
                        borderRadius: '50%',
                        aspectRatio: '1/1',
                      }}
                      src={`http://localhost:3000/avatar/${member.mem_avatar}`}
                      alt=""
                    />
                    <span className="user-icon-text col-6">{navName}</span>
                  </div>
                </Link>
              ) : (
                <div className="user-icon-wrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )
            ) : (
              // 未登入狀態顯示會員icon
              <Link to={'/login'}>
                <div className="user-icon-wrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </Link>
            )}
            <div
              className="like-icon-wrap"
              onClick={() => {
                setIamKevin(!IamKevin);
              }}
            >
              <div
                className="like-icon-count"
                style={{ display: favoritesNum === 0 ? 'none' : '' }}
              >
                <span style={{ width: favoritesNum >= 10 ? '65%' : '50%' }}>
                  {favoritesNum}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>

              <div
                className="favoritesList"
                style={{ display: IamKevin === false ? 'none' : 'block' }}
                onMouseLeave={() => {
                  setIamKevin(!IamKevin);
                }}
              >
                <ScrollBox>
                  {iconFavorites.map((r) => {
                    return (
                      <div className="favoritesBigBox" key={r.sid}>
                        <div className="favoritesBox d-flex">
                          <div className="col-4 favoritesBoxImg">
                            <img
                              src={`/imgs/Products/${r.favoriteImg}`}
                              alt=""
                            />
                          </div>

                          <div className="col-8 favoritesBody">
                            <h5 className="favoritesBodyName">
                              {r.favoriteName}
                            </h5>
                            <p className="favoritesBodyBrand">
                              {r.favoriteBrand}
                            </p>
                            <p className="favoritesBodyPrice">
                              <span>$ {r.favoritePrice}</span>
                            </p>
                          </div>
                        </div>

                        <div className="favoritesInt">
                          <button
                            onClick={() => {
                              const favoritesToCarts = {
                                sid: r.sid,
                                type: 'product',
                                quantity: 1,
                                memID: kevinCartsMemId,
                              };
                              axios
                                .post(
                                  'http://localhost:3000/carts',
                                  favoritesToCarts
                                )
                                .then((res) => {
                                  if (res.data.success === true) {
                                    alert('商品加入購物車成功');
                                  } else {
                                    alert('商品已經存在購物車');
                                  }

                                  console.log('res.data===', res.data);
                                  setCartTotalDep((prev) => prev + 1);
                                });
                            }}
                          >
                            Add to Carts
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </ScrollBox>
              </div>
            </div>

            <div
              onClick={() => {
                if (!auth) {
                  let i = confirm('您尚未登入,是否前往登入會員?');
                  i.then((res) => {
                    if (res === true) {
                      navigate('/login');
                    } else {
                      return;
                    }
                  });
                } else {
                  navigate('/carts');
                }
              }}
            >
              <div className="cart-icon-wrap">
                <div
                  style={{
                    display:
                      productTotalQty + lessonTotalQty + customTotalQty === 0
                        ? 'none'
                        : 'flex',
                  }}
                  className="cart-icon-count"
                >
                  <span
                    style={{
                      width:
                        productTotalQty + lessonTotalQty + customTotalQty > 10
                          ? '70%'
                          : '40%',
                    }}
                  >
                    {productTotalQty + lessonTotalQty + customTotalQty}
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            {auth ? (
              // 登入狀態顯示SIGNOUT
              <div
                className="text-decoration-none text-black auth-text-wrap"
                onClick={() => {
                  // 呼叫登出函式
                  logout();
                }}
              >
                SIGNOUT
              </div>
            ) : (
              // 未登入狀態顯示LOGIN
              <Link className=" text-decoration-none text-black" to={'/login'}>
                <div className="auth-text-wrap">LOGIN</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
