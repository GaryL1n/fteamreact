# StreetBoorn 6人電商作品 (測試請用 後端F-team-pro專案SQL資料夾裡的fteampro.sql)

後端專案連結 : https://github.com/GaryL1n/F-team-pro

## 本人前端
src/App (member資料 Context)

src/components/ScrollBox (全)

src/components/useSpinner (全)

src/components/AuthContext (全)

src/components/AuthContextProvider (全)

src/components/Navbar (會員/管理員狀態變動與token fetch使用範例)

src/components/SideBar (會員/管理員狀態變動)

src/pages/Login (全)

src/pages/Admin (全)

src/pages/Member (全)
## 本人後端
index.js (middleware token socket.io server)

modules/upload-avatar (全)

modules/upload-chatImg (全)

routes/admin (全)

routes/member (全)

## 使用語言 & 技術

 前端 : React、CSS、Sass、Bootstrap、MUI、GSAP、axios、echarts-for-react、swiper、socket.io-client、uuid

   useState、useEffect、useContext、useRef、useMemo、useNavigate、useParams

 後端 : Node、Express、bcryptjs、cors、joi、jsonwebtoken、moment-timezone、nodemon、nodemailer、socket.io、uuid、multer、mysql2

本人負責部分為

1. 會員註冊、登入、登出/管理員登入、登出

2. Navbar、SideBar 狀態變動

3. 會員中心(編輯、收藏、紀錄、聊天室)

4. 管理員進行會員管理與查看


### --註冊、登入、登出--

使用JWT進行登入登出

若未登入 點擊Navbar會員icon跳轉到會員登入頁面

會員登入頁面可選擇到註冊頁面、管理員登入頁面

登入結果將有三種 成功登入、帳密錯誤(資料庫未有該筆資料或是信箱未驗證)、帳號已被停用(資料庫有該筆資料但已被停用)

註冊頁面將填寫資料與照片檔案名稱(以亂數編碼檔名)存進資料庫

註冊完將寄Email給用戶驗證(若未驗證無法登入)

登入成功將token存進Local Storage

登出將Local Storage token進行清除

### --Navbar、SideBar 狀態變動--

以AuthContext判斷有無在登入狀態

若AuthContext為登入狀態 Navbar則發fetch讀取資料 (可讓全組共用)

Navbar若為會員登入狀態 顯示會員頭貼及暱稱

因暱稱註冊時非必填欄位 無暱稱將自動轉成顯示會員姓名(註冊時為必填欄位)

先判斷登入狀態有無，若無 不顯示會員中心/管理員介面

承上，若有 接著判斷是管理員/會員登入以決定顯示管理員介面/會員中心

### --會員中心--

左方區塊為大頭貼、會員資訊、編輯資料、密碼專區

更新密碼時會判定原密碼是否相同，更新成功將自動登出

右方區塊以MUI tabs區分收藏、購買紀錄、我的課程、聊天室

收藏可進行刪除收藏/加入購物車

購買紀錄區分為一般商品及客製化商品，可用圓餅圖查看一般商品的顏色比例數據

點擊收藏、購買紀錄均可到商品細節頁

我的課程可察看課程資訊及剩餘天數

聊天室為會員公眾聊天室，可看見他人姓名(暱稱)、頭貼

聊天室為即時更新(socket.io)，進入聊天室或有新訊息時scrollBar將自動置底，也可往上查看過往聊天紀錄(從資料庫讀取)

聊天室除了能傳一般訊息以外，也能傳超連結或圖檔(jpg、gif、png)

### --管理員進行會員管理--

可以查看全部會員或分別查看啟用會員/停用會員

承上，也能進行查詢姓名

管理員可對會員進行停用、啟用、刪除帳號並查看會員收藏，並且進行完功能後篩選條件不會消失(useMemo)