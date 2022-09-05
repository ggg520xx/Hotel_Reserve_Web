function exitPage() {
    document.querySelector('.cover').classList.add('d-none');
}





// --------------------------------------------------

// 如果日期為空值 則不能點選booking

function openPage() {

    if (newAryDate[0] == undefined) {
        alert('請先選擇入住時段')
        return
    }
    document.querySelector('.cover').classList.remove('d-none');

    document.getElementById("input_start").value = newAryDate[0];
    document.getElementById("input_end").value = newAryDate[1];
}


// ------------------------------------------------------

// 日期要組出post所要求的選取期間的所有日期

function getDateBetween(start, end) {
    var result = [];
    //使用传入参数的时间
    var startTime = new Date(start);
    var endTime = new Date(end);
    while (endTime - startTime >= 0) {
        let year = startTime.getFullYear();
        let month = startTime.getMonth();
        month = month < 9 ? '0' + (month + 1) : month + 1;
        let day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
        //加入数组
        result.push(year + "-" + month + "-" + day);
        //更新日期
        startTime.setDate(startTime.getDate() + 1);
    }
    return result;

}

// ------------------------------------------------------




// ------------------------------------------------------
// Post組完成的

function submitOrder() {


    if (
        document.getElementById("customerName").value == "" ||
        document.getElementById("customerPhone").value == ""
    ) {
        alert("請勿留空 請填寫完整資訊");
        return;
    }




    let orderName = document.getElementById("customerName").value;
    let orderPhone = document.getElementById("customerPhone").value;
        
        



    let startOrderDate = document.getElementById("input_start").value;
    let endOrderDate = document.getElementById("input_end").value;
    
    let finalDate = getDateBetween(startOrderDate, endOrderDate)
    
 


    if (validatePhone(orderPhone) == false) {
        alert("請填寫正確的手機格式");
        return;
    }
 



    // return

    let orderCustomer = {
        name: orderName,
        tel: orderPhone,
        date: finalDate,
    }


    axios.post(
        `${urlOne}/${id}`, orderCustomer, {
        headers: {
            Authorization: token,
        },
    }
    ).then(function (response) {
        console.log(response)
        alert(`你已成功預訂該房型 ${response.data.booking.length} 天 `);

    }).catch(function (error) {
        console.log(error)
        alert(error.response.data.message); // 失敗回傳內容
    })
}

