import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginMember.scss';
import '../styles/Btn8.scss';
import LoginLogo from './LoginLogo';
import AuthContext from '../../../components/AuthContext';
import { alert } from '../../../components/AlertComponent';
import { v4 as uuidv4 } from 'uuid';

const LoginMember = ({
  setLoginCard,
  setRegisterNone,
  loginLogoText,
  setLoginLogoText,
  setLogoMove,
  logoMove
}) => {
  const { auths, setAuths } = useContext(AuthContext);
  // 頁面導向
  const navigate = useNavigate();
  // 眼睛查看密碼
  const [memberSeePassword, setMemberSeePassword] = useState(false);
  // 記錄表單每個欄位輸入值
  const [fields, setFields] = useState({
    account: '',
    password: '',
  });
  // onChange存值到fields
  const handleFieldsChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  // 記錄表單每個欄位有錯誤時的訊息
  const [fieldErrors, setFieldErrors] = useState({
    account: '',
    password: '',
  });
  // 表單檢查，有不合法的驗証出現時會觸發
  const handleInvalid = (e) => {
    // 先阻擋預設行為-泡泡訊息
    e.preventDefault();
    // 填入錯誤訊息
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    });
  };
  // 表單更動時用於讓使用者清空某個正在修改的欄位的錯誤訊息
  const handleFormChange = (e) => {
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: '',
    });
  };
  const clickErrorText = (e) => {
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: '',
    });
  };
  // 表單點擊送出後
  async function handleSubmit(e) {
    // 先阻擋預設送出行為
    e.preventDefault();

    const response = await axios.post(
      'http://localhost:3000/member/login',
      fields
    );
    // 如果登入成功
    if (response.data.success) {
      localStorage.setItem('user_info', JSON.stringify(response.data.info));
      localStorage.setItem('user_token', response.data.token);
      let i = alert('登入成功');
      i.then((res) => {
        if (res) {
          // 整個網站判斷有沒有登入
          setAuths({ ...auths, token: response.data.token, auth: true });
          // 頁面轉向
          navigate('/', { replace: true });
        }
      });
    } else if (response.data.bollen === true) {
      alert('帳號已被停用');
    } else {
      alert('登入失敗');
    }
  }

  return (
    <>
      <div className="h-100 w-100 LoginMember LoginFront">
        <div className="w-100 LoginLogoRWDbox">
          <LoginLogo loginLogoText={loginLogoText} logoMove={logoMove} />
        </div>
        <form
          className="w-100 text-white text-center"
          // 表單點擊
          onSubmit={handleSubmit}
          // 表單檢查
          onInvalid={handleInvalid}
          // 表單有更動時
          onChange={handleFormChange}
        >
          <h3>Account</h3>
          <input
            type="text"
            placeholder="User Account"
            name="account"
            required
            autoComplete="off"
            value={fields.account}
            onChange={handleFieldsChange}
            onClick={clickErrorText}
          />
          <p>{fieldErrors.account}</p>
          <h3>Password</h3>
          <input
            type={memberSeePassword ? 'text' : 'password'}
            placeholder="User Password"
            name="password"
            required
            autoComplete="off"
            value={fields.password}
            onChange={handleFieldsChange}
            onClick={clickErrorText}
            className="passwordInput"
          />
          {memberSeePassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="cursorpointer seePassword"
              onClick={() => {
                setMemberSeePassword(!memberSeePassword);
              }}
            >
              <path
                fill="white"
                d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="cursorpointer seePassword"
              onClick={() => {
                setMemberSeePassword(!memberSeePassword);
              }}
            >
              <path
                fill="white"
                d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z"
              />
            </svg>
          )}
          <p>{fieldErrors.password}</p>
          <div className="d-flex justify-content-center mb-4">
            <button className="custom-btn btn-8">
              <span>LOGIN</span>
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="custom-btn btn-8"
              onClick={(e) => {
                e.preventDefault();
                setLoginCard('LoginCardRotate');
                setRegisterNone('');
                setLoginLogoText('Register');
                setLogoMove(345364634);
              }}
            >
              <span>SIGN UP</span>
            </button>
          </div>
        </form>
        <div className="w-100 d-flex justify-content-center googleFBsvgBox d-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            className="cursorpointer"
          >
            <path
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              fill="white"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="cursorpointer"
          >
            <path
              d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
              fill="white"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="cursorpointer"
          >
            <path
              d="M272.1 204.2v71.1c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.1 0-2.1-.6-2.6-1.3l-32.6-44v42.2c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2H219c1 0 2.1.5 2.6 1.4l32.6 44v-42.2c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8-.1 3.3 1.4 3.3 3.1zm-82-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 1.8 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-71.1c0-1.7-1.4-3.2-3.2-3.2zm-27.5 59.6h-31.1v-56.4c0-1.8-1.4-3.2-3.2-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 .9.3 1.6.9 2.2.6.5 1.3.9 2.2.9h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.7-1.4-3.2-3.1-3.2zM332.1 201h-45.7c-1.7 0-3.2 1.4-3.2 3.2v71.1c0 1.7 1.4 3.2 3.2 3.2h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2V234c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c-.1-1.7-1.5-3.2-3.2-3.2zM448 113.7V399c-.1 44.8-36.8 81.1-81.7 81H81c-44.8-.1-81.1-36.9-81-81.7V113c.1-44.8 36.9-81.1 81.7-81H367c44.8.1 81.1 36.8 81 81.7zm-61.6 122.6c0-73-73.2-132.4-163.1-132.4-89.9 0-163.1 59.4-163.1 132.4 0 65.4 58 120.2 136.4 130.6 19.1 4.1 16.9 11.1 12.6 36.8-.7 4.1-3.3 16.1 14.1 8.8 17.4-7.3 93.9-55.3 128.2-94.7 23.6-26 34.9-52.3 34.9-81.5z"
              fill="white"
            />
          </svg>
        </div>
        <div className="h-20 w-100 d-flex justify-content-center">
          <button
            className="buttonChangePage"
            onClick={() => {
              setLoginCard('LoginCardRotate');
              setRegisterNone('d-none');
              setLogoMove(uuidv4());
            }}
          >
            Admin
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginMember;
