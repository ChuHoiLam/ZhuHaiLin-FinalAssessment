//获取简易函数 构造axios函数
    function myAxios(config){
    return new Promise((resolve, reject) => {
        if(config.params) {
            const paramsObj = new URLSearchParams(config.params)
            const queryString = paramsObj.toString()
            config.url += `?${queryString}`
        }

        const xhr = new XMLHttpRequest()
        xhr.open(config.method || 'GET', config.url)
        xhr.addEventListener('loadend', () => {
            if (xhr.status >= 200 && xhr.status < 300){
                resolve(JSON.parse(xhr.response))
            } else {
                reject(new Error(xhr.response))
            }
        })

        //如果有data 即有请求体 则在send中发送请求 转换数据类型json
        if(config.data){
            const jsonStr = JSON.stringify(config.data)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(jsonStr)
        } else {
            //没有则直接发送请求
            xhr.send()
        }
    })
}

//log-in
    document.querySelector('.submitBtn').addEventListener('click', () => {
        const account = document.querySelector('.account').value
        const password = document.querySelector('.password').value

        //长度判断
        if (account.length < 4){
            console.log('用户名过短')
            return
        }
        if (password.length < 3){
            console.log('密码过短')
            return
        }

        function D(){
            console.log('delaying')
        }

        myAxios({
            url: 'http://8.134.148.60:4000/user/login',
            method: 'POST',
            data: {
                password: password,
                account: account
            }
        }).then(result=>{ //初稿 尚未添加动画
                console.log(result.msg)
                const info = document.querySelector('.log-in-info')
                info.style.display = 'flex'
                info.innerHTML = result.msg
                document.querySelector('.log-In').style.display = 'none'
                const lll = document.querySelector('.homepage')
                document.querySelector('.homepage').style.display = 'block'
                console.log(lll)
        }).catch(error => {
            console.log(error)
            const info = document.querySelector('.log-in-info')
            info.innerHTML = error.msg
            info.style.display = 'flex'
        })
    })

//homepage的top-tab栏切换
const topTabNav_ul = document.querySelector('.top-tap-nav ul')
topTabNav_ul.addEventListener('click', function(e) {
    if(e.target.tagName === 'SPAN') {
        document.querySelector('.top-tap-nav .active').classList.remove('active')
        e.target.classList.add('active')
        //被带动一起变化的大盒子模型
        const i = +e.target.dataset.id
        //排他
        document.querySelector('.home-container .opened').classList.remove('opened')
        document.querySelector(`.home-container .item:nth-child(${i+1})`).classList.add('opened')
    }
})

//homepage的inner-tab栏切换
const innerTapNavul = document.querySelector('.inner-tap-nav ul')
innerTapNavul.addEventListener('click', function(e){
    if(e.target.tagName === 'LI') {
        document.querySelector('.inner-tap-nav .active').classList.remove('active')
        e.target.classList.add('active')
        //带动大盒子
        const i = +e.target.dataset.id
        //排他
        document.querySelector('.wrapper02 .focused').classList.remove('focused')
        document.querySelector(`.wrapper02 .notes:nth-child(${i + 1})`).classList.add('focused')
    }

    
})

//消除input方框获取focus后出现边框
const lgi = document.querySelector('.log-In')

lgi.addEventListener('click', function(e){
    if(e.target.tagName === 'INPUT'){
        document.querySelector('.log-In .active').classList.remove('active')
        e.target.classList.add('active')
    }
})

//点击垃圾桶删除搜索记录(隐藏) //半成品
const deleteBtn = document.querySelector('.delete')
 
deleteBtn.addEventListener('click', () => {
    document.querySelector('.history-box').style.display = 'none'
})

//点击返回箭头返回上一页
const backBtn = document.querySelector('.search-back')

backBtn.addEventListener('click', () => {
    document.querySelector('.search-page').style.display = 'none'
    document.querySelector('.homepage').style.display = 'flex'
})

//点击搜索框进入搜索页
const searchingBox = document.querySelector('.homepage-searching-box')
searchingBox.addEventListener('click', () => {
    document.querySelector('.homepage').style.display = 'none'
    document.querySelector('.search-page').style.display = 'flex'
})

const searchingBox111 = document.querySelector('.homepage-searching-box111')
searchingBox111.addEventListener('click', () => {
    document.querySelector('.homepage').style.display = 'none'
    document.querySelector('.search-page').style.display = 'flex'
})

//拖拽尝试
const homepage = document.querySelector('.homepage')
homepage.addEventListener('touchmove', (e) => {
    let pageY = e.targetTouches[0].pageY
})