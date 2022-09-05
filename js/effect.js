function effectPage() {

    $(document).ready(function () {
        $('.owl-carousel').owlCarousel({

            items: 1,
            // 預設值為3， 代表一次輪播幾個項目
            autoplay: true,
            // 預設值為false， 可自動輪播切換圖片

            // nav:true,
            // 預設值為false，是否顯示切換上下張的按鈕
            // navText:['<','>'],
            // 預設值為[next, prev]， 可自行調整欲顯示的文字或圖案。

            loop: true,
            // 預設值為false， 是否循環輪播
            margin: 0,
            // 預設值為0， 調整與右邊圖片的距離。

            // video:true,
            // 預設值為false， 是否啟用影片輪播。

            // center:false,
            // 預設值為false， 適用於圖片總數為奇數， 可自動置中。

        });
    })


    // ------------------------------------------------



    // 下面這個 垃圾燈箱效果 很久沒更新 點開的圖片不會自適應 爛死
    // 創建的虛擬元素document又無法被抓取
    // 浪費三個小時在搞定還弄不好  只能抓新的重新測試


    // $("a[data-rel^=lightcase]").lightcase({

    //     // 在lightcase初始化之後會立即呼叫
    //     onInit: {
    //         foo: function () {
    //             alert('Lightcase process is initialized');
    //         }
    //     },
    //     // 在生成內容之前需要呼叫
    //     onStart: {
    //         bar: function () {
    //             alert('Lightcase process is started');
    //         }
    //     },
    //     // 在顯示內容之前會被呼叫
    //     onFinish: {
    //         baz: function () {
    //             // $("html body img").addClass("ss");

    //             // let a = document.querySelector('.lightcase-contentInner img')
    //             // console.log(a)



    //             alert('Lightcase process is finished');
    //         }
    //     },
    //     // 在中止lightcase的時候會被呼叫
    //     onClose: {
    //         qux: function () {
    //             alert('Lightcase closes now');
    //         }
    //     },
    //     // 當lightcase進行清理時，會呼叫它
    //     onCleanup: {
    //         quux: function () {
    //             alert('Lightcase process is cleaned up');
    //         }
    //     },

    //     typeMapping: {
    //         'image': 'webp,jpg,jpeg,gif,png,bmp',
    //     }
    // });






}





