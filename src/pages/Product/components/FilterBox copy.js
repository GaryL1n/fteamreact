import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React, { useState } from 'react';

const FilterBox = (props) => {
  // 按鈕 SVG 開關
  const [price, setPrice] = useState(false);
  const [colour, setColour] = useState(false);
  const [brand, setBrand] = useState(false);
  const [sortby, setSortby] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const { filter, setFilter, messages, setMessages } = props;

  // double range input
  const [value, setValue] = useState([1200, 10000]);
  const handleChange = (event, newValue) => {
    // console.log('newValue=', newValue);
    // console.log('newValue[0]=', newValue[0]);
    // console.log('newValue[1]=', newValue[1]);
    setValue(newValue);
    setFilter({
      ...filter,
      priceRange: [newValue[0], newValue[1]],
      where: 'price',
      orderfield: 'price',
    });
  };
  const [sortbyItems, setSortbyItems] = useState([
    'Name asc (A-Z)',
    'Name desc (Z-A)',
    'Price Lowest',
    'Price Highest',
  ]);
  const [brandItems, setBrandItems] = useState([
    'POLAR',
    'PALACE',
    'FUCKING AWESOME',
    'HOCKEY',
    'GX1000',
    'CREATURE',
    'SOUR',
    'ALLTIMERS',
    'Paris',
  ]);
  const [colorItems, setColorItems] = useState([
    'White',
    'Black',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Red',
    'Pink',
    'Purple',
  ]);
  const [colorBoxItems, setColorBoxItems] = useState([
    'whiteBox',
    'blackBox',
    'blueBox',
    'greenBox',
    'yellowBox',
    'orangeBox',
    'redBox',
    'pinkBox',
    'purpleBox',
  ]);

  // sortBy filter box messages 開關
  const [msgNameASC, setMsgNameASC] = useState(false);
  const [msgNameDESC, setMsgNameDESC] = useState(false);
  const [msgPriceASC, setMsgPriceASC] = useState(false);
  const [msgPriceDESC, setMsgPriceDESC] = useState(false);

  return (
    <>
      <div className="row filterBox p-0 m-0">
        <div className="col-10 d-flex justify-content-center">
          <div className="col-3">
            <div
              className="filter"
              onClick={() => {
                setPrice(!price);
              }}
            >
              <h5>Price</h5>
              <span
                style={{
                  display: price === false ? 'block' : 'none',
                }}
                id="span1"
                onClick={() => {
                  setPrice(!price);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ width: '24px' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              <span
                style={{
                  display: price === false ? 'none' : 'block',
                }}
                id="span2"
                onClick={() => {
                  setPrice(!price);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ width: '24px' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </span>
            </div>

            <div
              className="priceFilter w-80"
              style={{
                display: price === false ? 'none' : 'block',
              }}
            >
              <div className="priceFilterText">
                <span className="pb-2">
                  Min Price <h5>{value[0]}</h5>
                </span>
                <span className="pb-2">
                  Max Price <h5>{value[1]}</h5>
                </span>
              </div>

              <div className="priceFilterInput">
                <Box sx={{ width: '100%' }}>
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    // getAriaValueText={valuetext}
                    min={1200}
                    max={10000}
                  />
                </Box>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div
              className="filter"
              onClick={() => {
                setColour(!colour);
              }}
            >
              <h5>Colour</h5>
              <span
                style={{
                  display: colour === false ? 'block' : 'none',
                }}
                onClick={() => {
                  setColour(!colour);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ width: '24px' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              <span
                style={{
                  display: colour === false ? 'none' : 'block',
                }}
                onClick={() => {
                  setColour(!colour);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ width: '24px' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </span>
            </div>

            <div
              className="colorFilter"
              style={{
                display: colour === false ? 'none' : 'block',
              }}
            >
              {colorItems.map((v, i) => {
                return (
                  <div className="colorBox pt-2">
                    <div className="colorBoxCheckbox">
                      <input
                        type="checkbox"
                        key={i}
                        value={v}
                        checked={filter.color.includes(v)}
                        onChange={(e) => {
                          //先判斷是否有在color狀態陣列中
                          if (filter.color.includes(e.target.value)) {
                            // if有 -> 移出陣列
                            const newLikeList = filter.color.filter((v, i) => {
                              return v !== e.target.value;
                            });
                            setFilter({ ...filter, color: newLikeList });
                          } else {
                            // else -> 加入陣列
                            const newLikeList = [
                              ...filter.color,
                              e.target.value,
                            ];
                            setFilter({ ...filter, color: newLikeList });
                          }

                          setMessages([...messages, v]);
                        }}
                      />
                      <span>{v}</span>
                    </div>

                    <div className="color">
                      <div className={colorBoxItems[i]}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-3">
            <div
              className="filter"
              onClick={() => {
                setBrand(!brand);
              }}
            >
              <h5>Brand</h5>
              <span
                style={{
                  display: brand === false ? 'block' : 'none',
                }}
                onClick={() => {
                  setBrand(!brand);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ width: '24px' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              <span
                style={{
                  display: brand === false ? 'none' : 'block',
                }}
                onClick={() => {
                  setBrand(!brand);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ width: '24px' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </span>
            </div>

            <div
              className="brandFilter"
              style={{
                display: brand === false ? 'none' : 'block',
              }}
            >
              {brandItems.map((v, i) => {
                return (
                  <div className="brandBox pt-2" key={i}>
                    <input
                      type="checkbox"
                      value={v}
                      onChange={(e) => {
                        //先判斷是否有在brand狀態陣列中
                        if (filter.brand.includes(e.target.value)) {
                          // if有 -> 移出陣列

                          const newLikeList = filter.brand.filter((v, i) => {
                            return v !== e.target.value;
                          });

                          const msgLikeList = messages.filter((v, i) => {
                            return v !== e.target.value;
                          });
                          setFilter({ ...filter, brand: newLikeList });
                          setMessages(msgLikeList);
                        } else {
                          // else -> 加入陣列
                          const newLikeList = [...filter.brand, e.target.value];
                          setFilter({ ...filter, brand: newLikeList });

                          setMessages([...messages, e.target.value]);
                        }

                        // setMessages([...messages, v]);
                      }}
                    />
                    <span>{v}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-3">
            <div
              className="filter"
              onClick={() => {
                setSortby(!sortby);
              }}
            >
              <h5>Sort by</h5>
              <span
                style={{
                  display: sortby === false ? 'block' : 'none',
                }}
                onClick={() => {
                  setSortby(!sortby);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ width: '24px' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              <span
                style={{
                  display: sortby === false ? 'none' : 'block',
                }}
                onClick={() => {
                  setSortby(!sortby);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ width: '24px' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </span>
            </div>
            <div
              className="sortbyFilter"
              style={{
                display: sortby === false ? 'none' : 'block',
              }}
            >
              {sortbyItems.map((v, i) => {
                return (
                  <div
                    className="sortbyBox"
                    key={i}
                    onClick={(e) => {
                      switch (i) {
                        case 0:
                          if (msgNameASC === false) {
                            setFilter({
                              ...filter,
                              orderfield: 'name',
                              sort: 'ASC',
                            });
                            setMessages([...messages, v]);
                            setMsgNameASC(!msgNameASC);
                          } else {
                            const msgNameASCList = messages.filter((v2) => {
                              return v2 !== e.target.innerText;
                            });
                            setFilter({
                              ...filter,
                              orderfield: '',
                              sort: '',
                            });
                            setMessages(msgNameASCList);
                            setMsgNameASC(!msgNameASC);
                          }

                          break;
                        case 1:
                          const msgNameDESCList = messages.filter((v3) => {
                            return v3 !== e.target.innerText;
                          });

                          if (msgNameDESC === false) {
                            setFilter({
                              ...filter,
                              orderfield: 'name',
                              sort: 'DESC',
                            });
                            setMessages([...messages, v]);
                            setMsgNameDESC(!msgNameDESC);
                          } else {
                            setFilter({
                              ...filter,
                              orderfield: '',
                              sort: '',
                            });
                            setMessages(msgNameDESCList);
                            setMsgNameASC(!msgNameDESC);
                          }

                          break;
                        case 2:
                          setFilter({
                            ...filter,
                            orderfield: 'price',
                            sort: 'ASC',
                          });
                          setMessages([...messages, v]);
                          break;
                        case 3:
                          setFilter({
                            ...filter,
                            orderfield: 'price',
                            sort: 'DESC',
                          });
                          setMessages([...messages, v]);
                          break;

                        default:
                          i = 0;
                      }
                    }}
                  >
                    <span>{v}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-2 d-flex search">
          <input
            className="col-10 search-input"
            type="search"
            placeholder=" Search"
            aria-label="Search"
            style={{ width: searchInput === false ? '40%' : '80%' }}
            onMouseOver={() => {
              setSearchInput(!searchInput);
            }}
            onMouseOut={() => {
              setSearchInput(!searchInput);
            }}
          />
          <button className="col-2 search-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterBox;
