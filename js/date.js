// 不允許90天之後(出問題 塞不進去)
let nowTiming
let nowTimingPlus90
let dataTiming
let combinDate = '';

let getDateValue = '';

function dontallow3monthafter() { 
    let getNow = new Date();
    nowTiming = getNow.getTime()


    nowTimingPlus90 = nowTiming + 7776000000;
    dataTiming = new Date(nowTimingPlus90);

    combinDate = `${dataTiming.getFullYear()}-${dataTiming.getMonth() + 1}-${dataTiming.getDate()}`
    
    console.log(combinDate)
}
dontallow3monthafter();

// -----------------------------------------------



function dateShow() {
    // let input_range = document.getElementById('input_range');
    let input_range = document.querySelector('#input_range');

  
   

    let datepicker = new HotelDatepicker(input_range, {
        inline: true,
        // clearButton: true,  // clear清除按鈕
        moveBothMonths: true,  // 兩個月的左右顯示頁面
        showTopbar: false,  // 上面的文字取消  我記得有計算幾晚的 不知該如何取值
        topbarPosition: 'bottom',  // 幾夜資訊顯示位置
        selectForward: true,  // 不允許反向挑選日期



        endDate: '2022-12-04',  //假資料
        // endDate: 2022 - 09 - 29




        // 搞不懂 還有問題
        // ---------------------
        // 禁用某些日期 (但前一天會變得不能下訂那天過夜)
        disabledDates: [
            // '2022-10-15',
            // '2022-10-07',
            // '2022-10-08',
            // '2022-10-10',
            // '2022-10-12',
            // '2022-10-20',
            // '2022-10-24'
        ],

        // noCheckInDates: [
        //     '2022-09-04',
        //     '2022-09-11',
        //     '2022-09-24'
        // ],

        // disableCheckin: true,   // 不允許當天
        // ---------------------


        // i18n: {
        //     selected: 'Your stay:',
        //     night: 'Night',
        //     nights: 'Nights',
        //     button: 'Close',
        //     clearButton: 'Clear',
        //     submitButton: 'Submit',
           
        // },

        onDayClick: function () {
            console.log('Day clicked!');
            // disabledDates.setValue('2022-10-09')
            // console.log(datepicker.getValue());
            // console.log(datepicker.getDatePicker());
            // console.log(datepicker.getNights());
        },


        onSelectRange: function () {
            getDateValue = datepicker.getValue()
            reGetDate();
            // console.log(datepicker.getValue());
        }
    });
 
}








// 不允許90天之後的預約時段
// startDate傳入今天
// endDate 傳入今天＋90天 先抓出今天日期push進去




// input_range.addEventListener('change', function (e) {

//     console.log(e)
//     console.log(e.target)
//     console.log(e.target.value)
//     console.log(input_range)
// })


// $("#claendar").datepicker().on('changeDate', function (e) {
//     e.format();
// });

// input_range.datepicker().on('changeDate', function (e) {
//     e.format();
// });





