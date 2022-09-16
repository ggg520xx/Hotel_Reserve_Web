//產品 DOM
const indexRoom = document.querySelector(".gap"); // 顯示產品的位置dom

let indexData = []; //房型陣列


// -----------------------------------------------------

//初始抓取列表
function initIndex() {
    getIndexroom(); //房型列初始列顯示 

}
initIndex();

// -----------------------------------------------------
// 取得首頁API房型
function getIndexroom() {
    axios
        .get(
            `${url}`, {
            headers: {
                Authorization: token,
            },
        }
        )
        .then(function (response) {
            console.log("有收到資料回傳了");
            console.log(response);
            console.log(response.data.items);


            indexData = response.data.items; // 找到我要的資料 把它放進我的陣列

            // ------------------
            let str = "";

            indexData.forEach(function (item, index) {

                str += `    <div class="img_zone">
                                <a data-id="${item.id}" href="javascript: void(0)">
                                    <img src="${item.imageUrl}" alt="">
                                    <span class="text_show">${item.name}</span>
                                </a>
                            </div>`

            })
            // ------------------
            indexRoom.innerHTML = str;


            removeDnone();
        });
}

// --------------------------------------------------------------------




function removeDnone() {
    $('.loading').fadeOut(2500);
    setTimeout(function () {
        document.querySelector('.wrapper').classList.remove('d-none');
    }, 1000);
}



// 在我點擊我要的那個房型查看 取到id存起來
indexRoom.addEventListener("click", getLinkroom);

function getLinkroom(e) {

    let id = e.target.closest("a").dataset.id;
    localStorage.setItem('id', id);
    location.href = 'view.html';
}

