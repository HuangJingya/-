getList()
//分页
function getList() {
    $.ajax({
        url: '../lib/goodsList2.json',
        dataType: 'json',
        success: function (res) {
            // 渲染分页器
            $('.pagi-con').pagination({
                pageCount: Math.ceil(res.length / 20),
                current: 1,
                jump: true,
                coping: true,
                homePage: '首页',
                endPage: '末页',
                prevContent: '上页',
                nextContent: '下页',
                callback: function (api) {
                    let curr = api.getCurrent();
                    // console.log(curr);

                    var list = res.slice((curr - 1) * 20, curr * 20)
                    // console.log(list)

                    //使用分页器渲染一次
                    bindHtml(list)
                }
            })
            //使用第一页渲染一次
            bindHtml(res.slice(0, 20))
        }
    })
}
//分页渲染
function bindHtml(list) {
    // console.log(list)
    let str = ''
    list.forEach(item => {
        str += ` <li>
        <div class="product">
            <a href=""><img src="${item.image}" alt=""></a>
        </div>
        <h6>
            <a href="">${item.name}</a>
            <a href="">${item.desc}</a>
        </h6>
        <p class="pro-right">
            <strong>${item.price}</strong>
            <span>元起</span>
            <del>${item.del}元</del>
        </p>
    </li>`
    })
    $('.goods>.goods-con>ul').html(str)

}


//顶部导航栏
getRange()
function getRange() {
    $.ajax({
        url: '../lib/nav_top.json',
        dataType: 'json',
        success: function (res) {
            // console.log(res)
            let arr=''
            $('.nav-mid>ul')
                .on({
                    mouseenter: () => $('.nav-mid-box').stop().slideDown(),
                    mouseleave: () => $('.nav-mid-box').stop().slideUp()
                })
                .children('li')
                .on('mouseover', function () {
                    const index = $(this).index()
                    const list = res[index].list
                    let arr = ''

                    list.forEach(item => {
                        arr += ` <li>
                        <div class="line"><img
                                src="${item.list_url}"
                                alt=""></div>
                        <p>${item.list_name}</p>
                        <span>${item.list_price}</span>
                    </li> `
                    })
                    // console.log(arr);
                    
                    $('.nav-mid-box>.nav-mid-con>ul').html(arr)
                })
            $('.nav-mid-box')
                .on({
                    mouseover: function () {
                        $(this).finish().show()},
                    mouseout: function () {
                        $(this).finish().slideUp()}
                })
        }
    })
}

//边上的导航栏


function getBannerList(){
    $.ajax({
        url:'../lib/data.json',
        dataType:'json',
        success:function(res){
            console.log(res)

            $('.banner-left>ul')
            .on({
                mouseenter:()=>$('.banner-con').stop().show(),
                mouseleave:()=>$('.banner-con').stop().hide()
            })
            .children('li')
            .on('mouseover',function(){
                const index=$(this).index()
                const list=res[index].list
                let str=''

                list.forEach(item=>{
                    str+=` <li>
                    <div><img src="${item.src}"
                            alt=""></div>
                    <p>${item.title}</p>
                </li>`
                })

                $('.banner-con>ul').html(str)
            })
            $('.banner-con')
            .on({
                mouseover:function(){$(this).finish().show()},
                mouseout:function(){$(this).finish().hide()}
            })
        }
    })
}

getSlide()

function getSlide(){
 $('#slide').on('mouseenter',function(){
     $('.banner-left').show(),
     getBannerList()
 })
 $('.banner-left').mouseleave().hide()
}