import React from 'react';
import { io } from 'socket.io-client';
import './CustomChat.scss';
const CustomChat = (props) => {
  const { isChatOpen, setIsChatOpen } = props;
  const cus_socket = io('http://localhost:3100');
  return (
    <>
      {/* custom chat icon */}
      <div
        style={{ transition: '.3s ease' }}
        onClick={() => {
          setIsChatOpen(!isChatOpen);
        }}
        className={
          isChatOpen
            ? 'd-none d-md-block position-fixed cus-chat-wrap-open'
            : 'd-none d-md-block position-fixed cus-chat-wrap-close'
        }
      >
        <div
          style={{ display: isChatOpen ? 'none' : 'flex' }}
          className="w-100 h-100 cus-chat-icon justify-content-center align-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-80 w-80"
            fill="var(--main)"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <div
          style={{ display: isChatOpen ? 'flex' : 'none' }}
          className="w-100 h-100 justify-content-center align-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-40 w-40"
            fill="var(--main)"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      {/* custom chat window */}
      <div
        style={{
          transition: '.3s ease',
          width: isChatOpen ? '250px' : '0px',
          height: isChatOpen ? '350px' : '0px',
        }}
        className="d-none d-md-block position-fixed cus-chat-window"
      >
        <div
          style={{ display: isChatOpen ? 'flex' : 'none' }}
          className="w-100 h-10 chat-window-title"
        >
          <span>Instant Message</span>
        </div>
        <div
          style={{ display: isChatOpen ? 'flex' : 'none' }}
          className="w-100 h-80 chat-window-body"
        >
          <div className="w-100 h-100"></div>
        </div>
        <div
          style={{ display: isChatOpen ? 'flex' : 'none' }}
          className="w-100 h-10 chat-window-footer"
        >
          <div className="w-100 h-100 d-flex">
            <input className=" w-85 h-100" type="text" />
            <button className="btn w-15 h-100 focus-none send-msg-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomChat;
