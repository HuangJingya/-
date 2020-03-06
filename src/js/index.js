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
  getRange()

  function getRange() {
      $.ajax({
          url: '../lib/nav_top.json',
          dataType: 'json',
          success: function (res) {
              console.log(res)
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
                      console.log(arr);
                      
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