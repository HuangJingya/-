//轮播图
var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay:{
        delay:2000
    },
    effect:'fade',

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // 如果需要滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  })


  //顶部导航栏
  getList()

  function getList() {
    $.ajax({
      url: '../lib/nav_top.json',
      dataType: 'json',
      success: function (res) {

        // 4-1. 准备一个空字符串
        let str = ''
        // 4-3. 填充到 nav_mid 里面的 ul 里面
        $('.nav-mid >ul')
          .on({
            mouseenter: () => $('.nav-mid-box').stop().slideDown(),
            mouseleave: () => $('.nav-mid-box').stop().slideUp()
          })
          .children('li') // 找到所有的一级菜单下的 li
          .on('mouseover', function () {
            // 5-1. 知道自己移入的时哪一个 li
            const index = $(this).index()
            // 5-2. 找到要渲染的数组
            const list = res[index].list
            // 5-3. 用我们找到的数组把 nav_box 位置渲染了就可以了
            let str = ''

            // 5-4. 进行组装
            list.forEach(item => {
              str += `
                <li>
                  <div>
                    <img src="${ item.list_url }" alt="">
                  </div>
                  <p class="title">${ item.list_name }</p>
                  <span class="price">${ item.list_price }</span>
                </li>
              `
            })

            // 5-5. 填充到页面里面
            $('.nav-mid-box > ul').html(str)
          })

        // 4-4. 给 nav-mid-box 添加一个移入移出事件
        $('.nav-mid-box')
          .on({
            mouseover: function () { $(this).finish().show() },
            mouseout: function () { $(this).finish().slideUp() }
          })
      }
    })
  }



  //边上的导航栏
  getBannerList()

  function getBannerList(){
    $.ajax({
      url:'../lib/banner.json',
      dataType:'json',
      success:function(res){
        console.log(res)

        let str=''
        $('.banner-left>ul')
          .on({
            mouseenter:()=>$('.banner-list').stop().show(),
            mouseleave:()=>$('.banner-list').stop().hide()
          })
          .children('li')
          .on('mouseover',function(){
            const index=$(this).index()
            const list=res[index].list
            let str=''


            list.forEach(item=>{
              str+=`
              <li>
              <img
                src="${item.src}"
                alt="">
              <span>${item.title}</span>
            </li>
              `
            })

            $('.banner-list>.banner-left-list>ul').html(str)
          })
          $('.banner-list')
          .on({
            mouseover:function(){$(this).finish().show()},
            mouseout:function(){$(this).finish().hide()}
          })
      }
    })
  }