// 整頁的dom依照點到的id進來重組   單一房型需要的html結構 在該處位置render
// 顯示單一房型 位置dom 並把wrapper下的內容都覆蓋
const singleRoom = document.querySelector(".wrapper");

let id = localStorage.getItem('id'); //抓到我點擊的那個id

let roomData = {}  //存放抓回的物件 裡面是該單一房型的資訊

// -----------------------------------------

function initRoom() {
    getSingleroom(); //房型列初始列顯示 
}
initRoom();

// -----------------------------------------------------
// 取得單一房型

function getSingleroom() {
    axios
        .get(
            `${urlOne}/${id}`, {
            headers: {
                Authorization: token,
            },
        }
        ).then(function (response) {
            console.log(response);
            roomData = response.data.room[0];  // 資料存放外面 讓render函式 可以直接拉取


            iconObjtoAry();
            switchInfo();
            descriptionObjtoAry();
            timeCatch()
            renderRoom();
            removeDnone();
        })
        .catch(function (error) {
            console.log(error); // 失敗回傳內容
        })
        .then(function () {  // 非同步問題很頭大 只能這樣做 否則axios還沒回傳他們跑完沒地方塞就報錯
            effectPage()
            dateShow()
            // reGetDate()
        })
}


// -----------------------------------------------------
// 執行各種判斷

let room_type = {};
function switchInfo() {
    if (roomData.descriptionShort.Bed[0] == 'Single') {
        room_type.type = '單人床'
    }

    if (roomData.descriptionShort.Bed[0] == 'Small Double') {
        room_type.type = '豪華單人床'
    }
    if (roomData.descriptionShort.Bed[0] == 'Double' && !roomData.descriptionShort.Bed[1]) {
        room_type.type = '雙人大床'
    }
    if (roomData.descriptionShort.Bed[0] == 'Queen' && !roomData.descriptionShort.Bed[1]) {
        room_type.type = '豪華雙人大床'
    }
    if (roomData.descriptionShort.Bed[0] == 'Double' && roomData.descriptionShort.Bed[1]) {
        room_type.type = '雙床房'
    }
    if (roomData.descriptionShort.Bed[0] == 'Queen' && roomData.descriptionShort.Bed[1]) {
        room_type.type = '豪華雙床房'
    }
}



// -----------------------------------------------------
// 進來看到的時間呈現

let nowTime = '';
function timeCatch() {
    let myTime = new Date();
    nowTime = myTime.getDay()
}


// ------------------------------------------------------
// 下訂單頁的只有true才呈現的圖示

// 先做篩選資料 物件資料蒐集 抓出屬性之類


let showSupply = {};
let iconAry = [];

function iconObjtoAry() {
    // 物件轉陣列
    // 先抓出我要的 塞進新陣列
    showSupply = roomData.amenities;

    iconAry = Object.keys(showSupply);
    sortAll();
}
// -------------------------------
// 做系統性的分類
let newArray = [];
let newStr = ''

function sortAll() {
    let newData = [];


    iconAry.forEach(function (item, index) {

        let ary = {};

        ary.area = item;
        ary.status = showSupply[item];


        if (item == 'Breakfast') {
            ary.filename = 'breakfastTrue';
            ary.num = 1;
        }
        if (item == 'Mini-Bar') {
            ary.filename = 'mini-barTrue';
            ary.num = 2;
        }
        if (item == 'Room-Service') {
            ary.filename = 'room-serviceTrue'
            ary.num = 3;
        }
        if (item == 'Wi-Fi') {
            ary.filename = 'wifiTrue'
            ary.num = 4;
        }
        if (item == 'Child-Friendly') {
            ary.filename = 'playgroundTrue'
            ary.num = 5;
        }
        if (item == 'Television') {
            ary.filename = 'phoneTrue'
            ary.num = 6;
        }
        if (item == 'Great-View') {
            ary.filename = 'viewTrue'
            ary.num = 7;
        }
        if (item == 'Refrigerator') {
            ary.filename = 'fridgeTrue'
            ary.num = 8;
        }
        if (item == 'Sofa') {
            ary.filename = 'sofaTrue'
            ary.num = 9;
        }
        if (item == 'Pet-Friendly') {
            ary.filename = 'petsTrue'
            ary.num = 10;
        }
        if (item == 'Smoke-Free') {
            ary.filename = 'no-smokingTrue'
            ary.num = 11;
        }
        if (item == 'Air-Conditioner') {
            ary.filename = 'air-conditionerTrue'
            ary.num = 12;
        }
        newData.push(ary); //push到空陣列
        // console.log(ary);

    })
    console.log(newData);


    // -------------------------------
    // 只抓帶true值的

    newArray = newData.filter(function (item, index) {
        return item.status !== false;
    })
    // console.log(newArray);
    // return newArray;



    // ------------------------------------
    // 順序組成圖示格式

    newArray.forEach(function (item) {
        newStr += `<li><img src="images/room/right/show/${item.filename}.svg" alt=""></li>`

    })
}


// -------------------------------
// 介紹形容

let SStr = '';

function descriptionObjtoAry() {

    // newDescription = Object.keys(roomData.description);
    // console.log(newDescription)

    let newDescription = []

    let origDescription = roomData.description;
    newDescription = origDescription.split('.');   // 字串變成切分陣列
    // console.log(newDescription)


    newDescription.pop()   //最後的結尾一個點也被當作 一行把陣列最後筆拿掉就可以組完整字串

    newDescription.forEach(function (item) {
        SStr += `<li>${item}</li>`
    })
}


//   <li>單人間僅供一位客人使用</li>
//                                     <li>臥室配有單人床和私人浴室</li>
//                                     <li>您需要的一切為您準備：床單和毯子，肥皂和洗髮水，吹風機</li>
//                                     <li>房間裡有AC，當然還有WIFI</li>



// -----------------------------------------------------
// 用資料加載 只渲染選到的單一房型 (使用三元運算及陣列讀取寫法較好)

function renderRoom() {

    singleRoom.innerHTML = `    <div class="room_info ">
            <div class="room_left">
                <a href="index.html" class="backpage">
                    查看其它房型</a>

                <div class="owl-carousel owl-theme d-flex justify-content-center" style="align-items: center;">
                    <div class="owl-item-control"><a data-lightbox="roadtrip" class="" href="${roomData.imageUrl[0]}">
                            <img class="img-thumbnail" src="${roomData.imageUrl[0]}" alt="Slideshow Example 1" />
                        </a>
                    </div>
                    <div class="owl-item-control"><a data-lightbox="roadtrip" class="" href="${roomData.imageUrl[1]}">
                            <img class="img-thumbnail" src="${roomData.imageUrl[1]}" alt="Slideshow Example 2" />
                        </a>
                    </div>
                    <div class="owl-item-control"><a data-lightbox="roadtrip" class="" href="${roomData.imageUrl[2]}">
                            <img class="img-thumbnail" src="${roomData.imageUrl[2]}" alt="Slideshow Example 3" />
                        </a>
                    </div>
                </div>




                <div class="booking_position">
                    <p>
                        <span value="" id='changePrice'>${nowTime == 5 || nowTime == 6 || nowTime == 0 ? toThousands(roomData.holidayPrice) : toThousands(roomData.normalDayPrice)}</span>
                        <span class='priceStyle' id='howManyNight'>${nowTime == 5 || nowTime == 6 || nowTime == 0 ? '(假日價)' : '(平日價)'} 1</span> 晚
                    </p>

                    <button onclick="openPage()" type="button" class="book_btn">Booking
                        now</button>
                </div>
                <div class="photo-txt">
                </div>
            </div>

            <div class="room_right ">
                <article class="proitem-detail">

                    <div class="proitem-sort">
                        <div class="room_title">
                            <h1 class="">${roomData.name}</h1>
                            <small>${roomData.descriptionShort.GuestMin == roomData.descriptionShort.GuestMax ? roomData.descriptionShort.GuestMin : roomData.descriptionShort.GuestMin + `~` + roomData.descriptionShort.GuestMax}人・ ${room_type.type}・ ${roomData.amenities['Breakfast'] == true ? `有早餐` : `無早餐`}・衛浴${roomData.descriptionShort["Private-Bath"]}間・${roomData.descriptionShort.Footage}平方公尺</small>
                        </div>
                    </div>

                    <br>

                    <div class="proitem-sort">

                        <div class="sort-wrap">
                            <div class="proitem-info">

                                <div class="info-list">
                                    <p>
                                        平日（一～四）價格：${toThousands(roomData.normalDayPrice)} / 假日（五〜日）價格：${toThousands(roomData.holidayPrice)}
                                    </p>
                                    <p>
                                        入住時間：${roomData.checkInAndOut.checkInEarly}（最早）/ ${roomData.checkInAndOut.checkInLate}（最晚）
                                    </p>
                                    <p>
                                        退房時間：${roomData.checkInAndOut.checkOut}
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>

                    <br>

                    <div class="proitem-sort">

                        <div class="sort-item">
                            <div class="supply-content">
                                <ul style="list-style-type: disc;">
                                 ${SStr}

                                </ul>
                            </div>
                        </div>

                    </div>

                    <br>

                    <div class="proitem-sort mt-1">
                        <div class="sort-item">

                            <ul class="supply-icon-zone">



                                ${roomData.amenities['Breakfast'] == true ? `<li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/breakfastTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : `<li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/breakfastTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>`}

                                


                                  ${roomData.amenities['Mini-Bar'] == true ? `<li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/mini-barTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : `<li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/mini-barTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>`}

                                  



                                  ${roomData.amenities['Room-Service'] == true ? `<li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/room-serviceTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : `<li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/room-serviceTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>`}

                                  


                                  ${roomData.amenities['Wi-Fi'] == true ? `<li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/wifiTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : `<li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/wifiTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>`}


                                  


                                  ${roomData.amenities['Child-Friendly'] == true ? `<li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/playgroundTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : `<li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/playgroundTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>`}


                                  



                                  ${roomData.amenities['Television'] == true ? `<li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/phoneTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : `<li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/phoneTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>`}

                                  


                                  ${roomData.amenities['Great-View'] == true ? `<li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/viewTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : `<li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/viewTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>`}

                                  


                                  ${roomData.amenities['Refrigerator'] == true ? `<li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/fridgeTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : `<li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/fridgeTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>`}
                                  
                                  



                                  ${roomData.amenities['Sofa'] == true ? `<li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/sofaTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : `  <li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/sofaTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>`}

                                


                                  ${roomData.amenities['Pet-Friendly'] == true ? `<li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/petsTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : `<li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/petsTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>`}

                                  


                                  ${roomData.amenities['Smoke-Free'] == true ? `<li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/no-smokingTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : `<li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/no-smokingTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>`}
                                  

                                  ${roomData.amenities['Air-Conditioner'] == true ? ` <li>
                                    <div class="main-icon">
                                        <img src="images/room/right/show/air-conditionerTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/ok.svg" alt="">
                                </li>` : ` <li class="hide_icon">
                                    <div class="main-icon">
                                        <img src="images/room/right/show/air-conditionerTrue.svg" alt="">
                                    </div>
                                    <img class="status-icon" src="images/room/right/status/cancel.svg" alt="">
                                </li>` }

                                 

                                <br>
                            </ul>
                        </div>
                    </div>
                </article>

                <div class="date_pick">
                <p class="empty_p">空房狀態查詢</p>

                    <input class='d-none' value="empty" id="input_range" type="text">
                </div>
            </div>
        </div>
        <div class="cover d-none">


            <div class="order_info">
                <div class="left_order">


                    <div class="order_keyinfo">
                        <div>
                            <p>姓名</p>
                            <input name="姓名" class="basic-slide" id="customerName" type="text" placeholder="填入姓名" />
                            <p class="orderInfo-message" data-message="姓名"></p><label
                                for="customerName"></label>
                        </div>
                    </div>
                    <div class="order_keyinfo">
                        <div>
                            <p>手機號碼</p>
                            <input name="手機" class="basic-slide" id="customerPhone" type="text" placeholder="填入手機號碼" /><p class="orderInfo-message" data-message="手機"></p><label
                                for="customerPhone"></label>
                        </div>
                    </div>
                    <div class="order_keyinfo">
                        <div>
                            <p>入住日期</p>

                            <input value='' type="button" id="input_start">&nbsp;</input>

                        </div>
                    </div>


                    <div class="date_range_insidezone">
                    </div>

                    <div class="order_keyinfo">
                        <div>
                            <p>退房日期</p>
                            <input value='' type="button" id="input_end">&nbsp;</input>

                        </div>
                    </div>
                    <div class="order_keyinfo">
                        <P class="calc_date"><span id='totalday'>  </span>天，<span id='normalday'>  </span>晚平日，<span id='holiday'>  </span>晚假日</P>
                    </div>
                    <div class="order_keyinfo">
                        <div class="order_total">
                            <p>總計</p>
                            <p id="changeOrderPrice">$1,380</p>
                        </div>
                    </div>
                    <div class="order_keyinfo">
                        <div class="order_submit">
                            <button class='orderInfo-btn' onclick="submitOrder()"><span>確認送出</span></button>
                        </div>
                    </div>
                    <div class="order_keyinfo">
                        <div class="order_tip">
                            <span>此預約系統僅預約功能，並不會對您進行收費</span>
                        </div>
                    </div>
                </div>


                <div class="right_order">



                    <button onclick="exitPage()" class="exitbtn" type="button">
                        <img src="images/room/right/info/exit.svg" alt="">
                    </button>





                    <div class="order_room_info">
                        <div class="text_decorate">
                            <h2>${roomData.name}</h2>


                            <p>${roomData.descriptionShort.GuestMin == roomData.descriptionShort.GuestMax ? roomData.descriptionShort.GuestMin : roomData.descriptionShort.GuestMin + `~` + roomData.descriptionShort.GuestMax}人・ ${room_type.type}・ ${roomData.amenities['Breakfast'] == true ? `附早餐` : `無早餐`}・衛浴${roomData.descriptionShort["Private-Bath"]}間・${roomData.descriptionShort.Footage}平方公尺</p>
                            <p>平日（一～四）價格：${toThousands(roomData.normalDayPrice)} / 假日（五〜日）價格：${toThousands(roomData.holidayPrice)}</p>
                        </div>




                        <ul class="order_icon_describe">
                        ${newStr}
                        </ul>


                    </div>

                    <div class="order_room_info">
                        <div class="text_decorate">
                            <h3>訂房資訊</h3>
                        </div>

                        <ul class="order_info_describe" style="list-style-type: disc;">

                            <li>入住時間：最早${roomData.checkInAndOut.checkInEarly}，最晚${roomData.checkInAndOut.checkInLate}；退房時間：${roomData.checkInAndOut.checkOut}，請自行確認行程安排。</li>
                            <li>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
                            <li>好室旅店全面禁止吸菸。</li>
                            <li>若您有任何問題，歡迎撥打 03-8321155 ( 服務時間
                                週一至週六 10:00 - 18:00 )。</li>
                        </ul>

                    </div>
                    <div class="order_room_info">
                        <div class="text_decorate">
                            <h3>預約流程</h3>
                        </div>

                        <div class="order_process">

                            <div class="step">
                                <div class="step_topbg">
                                    <img src="images/room/right/info/step1.svg" alt="">
                                </div>
                                <div class="step_bottominfo">
                                    <p>送出線上預約單</p>
                                </div>
                            </div>

                            <div class="next_icon">
                                <img src="images/room/right/info/arrow.svg" alt="">
                            </div>


                            <div class="step">
                                <div class="step_topbg">
                                    <img src="images/room/right/info/step2.svg" alt="">
                                </div>
                                <div class="step_bottominfo">
                                    <p>系統立即回覆是否預訂成功</p>
                                    <p>並以簡訊發送訂房通知</p>
                                    <p>(若未收到簡訊請來電確認)</p>
                                </div>
                            </div>




                            <div class="next_icon">
                                <img src="images/room/right/info/arrow.svg" alt="">
                            </div>

                            <div class="step">
                                <div class="step_topbg">
                                    <img src="images/room/right/info/step3.svg" alt="">
                                </div>
                                <div class="step_bottominfo">
                                    <p>入住當日憑訂房通知</p>
                                    <p>以現金或刷卡付款即可</p>
                                    <p>(僅接受VISA.JCB.銀聯卡)</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>`
}


function removeDnone() {
    $('.loading').fadeOut(2500);
    setTimeout(function () {
        document.querySelector('.wrapper').classList.remove('d-none');
    }, 1000);
}