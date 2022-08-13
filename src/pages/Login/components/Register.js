import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Btn8.scss';
import '../styles/Register.scss';
import LoginLogo from './LoginLogo';
import Verify from './Verify';
import { alert } from '../../../components/AlertComponent';
import { v4 as uuidv4 } from 'uuid';

const Register = ({
  setLoginCard,
  registerNone,
  loginLogoText,
  setLoginLogoText,
  setLogoMove,
  logoMove
}) => {
  // 頁面導向
  const navigate = useNavigate();
  // 取得頭貼input
  const registerAvatarRef = useRef(null);
  const [memberAvatar, setMemberAvatar] = useState('');

  const [verify, setVerify] = useState(false);

  // 點擊頭貼 觸發頭貼input
  function clickAvatar() {
    registerAvatarRef.current.click();
  }

  // 頭貼input值有變換時
  async function uploadAvatar(e) {
    const data = new FormData();
    data.append('avatar', e.target.files[0]);
    // console.log(data.get('avatar'));
    const response = await axios.post(
      'http://localhost:3000/member/upload',
      data
    );
    console.log(response.data.filename);
    setMemberAvatar(response.data.filename);
    setFields({ ...fields, avatar: response.data.filename });
  }

  // 記錄表單每個欄位輸入值
  const [fields, setFields] = useState({
    avatar: '',
    name: '',
    account: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  // 結束時清空欄位用
  const endRegister = {
    avatar: '',
    name: '',
    account: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  // onChange存值到fields
  const handleFieldsChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  // 記錄表單每個欄位有錯誤時的訊息
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    account: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  // 表單檢查，有不合法的驗証出現時會觸發
  const handleInvalid = (e) => {
    // 先阻擋預設行為-泡泡訊息
    e.preventDefault();

    // 錯誤訊息
    // console.log(e.target.validationMessage)

    // 填入錯誤訊息
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    });
  };

  // 表單點擊送出後
  async function handleSubmit(e) {
    // 先阻擋預設送出行為
    e.preventDefault();

    // 作更多驗証
    if (fields.name.length < 2) {
      // 填入錯誤訊息
      setFieldErrors({
        ...fieldErrors,
        name: '最少兩個字',
      });

      return;
    }

    if (fields.password !== fields.confirmPassword) {
      // 填入錯誤訊息
      setFieldErrors({
        ...fieldErrors,
        password: '密碼與確認密碼不符',
        confirmPassword: '密碼與確認密碼不符',
      });

      return;
    }

    const response = await axios.post(
      'http://localhost:3000/member/register',
      fields
    );

    if (response.data.success === true) {
      alert('註冊成功，請立即去信箱驗證您的帳號');
      // 呈現驗證頁面
      setVerify(true);
      // 清空欄位
      // setFields({ ...endRegister });
      // 頭貼狀態設回空字串
      setMemberAvatar('');
      // 卡片翻回去
      // setLoginCard('');
      // setLoginLogoText('Login');
    } else {
      alert('註冊失敗');
    }
  }

  // 表單更動時用於讓使用者清空某個正在修改的欄位的錯誤訊息
  const handleFormChange = (e) => {
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: '',
    });
  };

  // 點擊input就消除錯誤訊息
  const clickErrorText = (e) => {
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: '',
    });
  };
  return (
    <>
      <div className={`h-100 w-100 Register LoginBack ${registerNone}`}>
        <div className="w-100 LoginLogoRWDbox">
          <LoginLogo loginLogoText={loginLogoText} logoMove={logoMove} />
        </div>
        {verify ? (
          <Verify
            fields={fields}
            setVerify={setVerify}
            endRegister={endRegister}
            setFields={setFields}
            setLoginCard={setLoginCard}
            setLoginLogoText={setLoginLogoText}
            setLogoMove={setLogoMove}
          />
        ) : (
          <form
            className="w-100 text-white text-center"
            // 表單點擊
            onSubmit={handleSubmit}
            // 表單檢查
            onInvalid={handleInvalid}
            // 表單有更動時
            onChange={handleFormChange}
          >
            <div className="w-100 d-flex justify-content-center mb-2">
              <img
                // 有選頭貼就給頭貼照片 否則給預設照片
                src={
                  memberAvatar === ''
                    ? '../../imgs/GaryComponents/images.png'
                    : `http://localhost:3000/avatar/${memberAvatar}`
                }
                alt=""
                className="cursorpointer"
                // 點擊頭貼input
                onClick={clickAvatar}
              />
            </div>
            <input
              type="file"
              name="avatar"
              ref={registerAvatarRef}
              onChange={uploadAvatar}
              hidden
            />
            <div className="w-100 d-flex">
              <div className="col-6">
                <h3>Name</h3>
                <input
                  type="text"
                  name="name"
                  required // 必填欄位
                  value={fields.name}
                  onChange={handleFieldsChange}
                  onClick={clickErrorText}
                />
                <p>{fieldErrors.name}</p>
                <h3>Account</h3>
                <input
                  type="text"
                  name="account"
                  required
                  value={fields.account}
                  onChange={handleFieldsChange}
                  onClick={clickErrorText}
                />
                <p>{fieldErrors.account}</p>
              </div>
              <div className="col-6">
                <h3>Password</h3>
                <input
                  type="password"
                  name="password"
                  required
                  value={fields.password}
                  onChange={handleFieldsChange}
                  onClick={clickErrorText}
                  autoComplete="on"
                />
                <p>{fieldErrors.password}</p>
                <h3>Check</h3>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={fields.confirmPassword}
                  onChange={handleFieldsChange}
                  onClick={clickErrorText}
                  autoComplete="on"
                />
                <p>{fieldErrors.confirmPassword}</p>
              </div>
            </div>
            <h3>Email</h3>
            <input
              type="email"
              name="email"
              className="w-40"
              required
              value={fields.email}
              onChange={handleFieldsChange}
              onClick={clickErrorText}
            />
            <p>{fieldErrors.email}</p>
            <div className="h-24 w-100 d-flex justify-content-around">
              <button
                className="buttonChangePage"
                onClick={(e) => {
                  e.preventDefault();
                  setLoginCard('');
                  setLoginLogoText('Login');
                  setLogoMove(uuidv4());
                }}
              >
                Login
              </button>
              <button className="buttonChangePage">CONFIRM</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Register;
