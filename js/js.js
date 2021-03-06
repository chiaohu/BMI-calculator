//變數宣告
var height = document.querySelector('.height-input');
var weight = document.querySelector('.weight-input');
var list = document.querySelector('.list');
var checkBtn = document.querySelector('.check');
var resultBtn = document.querySelector('.result');
var deleteBtn = document.querySelector('.delete');
var delself = document.querySelector('.deleteself');

var data = JSON.parse(localStorage.getItem('listData')) || [];

//監聽事件
checkBtn.addEventListener('click', count, false)
deleteBtn.addEventListener('click', remove, false)
list.addEventListener('click',removeself,false)


//個別移除
function removeself(e){
    e.prevenetDefault;
    if (e.target.nodeName !== "A"){return}
    var num = e.target.dataset.num;
    data.splice(num,1);
    localStorage.setItem('listData',JSON.stringify(data));
    updateList(data);
}


updateList(data);

//addList

function count() {
    var h = height.value / 100;
    var w = weight.value;
    var bmiNum = w / (h * h)
    var resultBMI = bmiNum.toFixed(2);//取小數點2位
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var monthCHANGE = month + 1;
    var day = date.getDate();

    if (h == '' || w == '') {
        alert('請輸入資料') //提醒輸入框不可空白
        return;
    }
    var condition = "";
    var classcolor = "";

    if (resultBMI <= 18.5) {
        condition = "過輕";
        classcolor = "light";
    } else if (resultBMI > 18.5 && resultBMI <= 25) {
        condition = "適中";
        classcolor = "good";
    } else if (resultBMI > 25 && resultBMI <= 30) {
        condition = "過重";
        classcolor = "overWeight";
    } else if (resultBMI > 30 && resultBMI <= 35) {
        condition = "輕度肥胖";
        classcolor = "fatLittle";
    } else if (resultBMI > 35 && resultBMI <= 40) {
        condition = "中度肥胖";
        classcolor = "fatMiddle";
    } else {
        condition = "重度肥胖";
        classcolor = "fatAlot";
    }

    var BMIlist = {
        height: h,
        weight: w,
        bmi: resultBMI,
        day: day,
        month: monthCHANGE,
        year: year,
        condition: condition,
        classcolor: classcolor,
    }
    data.push(BMIlist);
    localStorage.setItem('listData',JSON.stringify(data));

    updateList(data);

    checkBtn.style.display = "none";
    resultBtn.style.display = "block";

    var strSTR = '<li class="number">' + resultBMI + '</li>' +
        '<li>BMI</li>' +
        '<div class="reset ' + classcolor + '"><img src="https://upload.cc/i1/2020/10/01/voJMKS.png" alt=""></div>' +
        '<p>' + condition + '</p>'

    resultBtn.innerHTML = strSTR;

    if (resultBMI <= 18.5) { //判斷bmi 將樣式套用至按鈕上
        resultBtn.classList.add('light');
    } else if (resultBMI > 18.5 && resultBMI <= 25) {
        resultBtn.classList.add('good');
    } else if (resultBMI > 25 && resultBMI <= 30) {
        resultBtn.classList.add('overWeight');
    } else if (resultBMI > 30 && resultBMI <= 35) {
        resultBtn.classList.add('fatLittle');
    } else if (resultBMI > 35 && resultBMI <= 40) {
        resultBtn.classList.add('fatMiddle');
    } else {
        resultBtn.classList.add('fatAlot');
    }

    height.value = ''; //清空輸入框
    weight.value = '';
}

function goback() {
    checkBtn.style.display = "block";
    resultBtn.style.display = "none";
    height.value = ''; //清空輸入框
    weight.value = '';
}

resultBtn.addEventListener('click',goback, false);

function updateList() {
    var str = "";
    var len = data.length;
    for (var i = 0; i < len; i++) {
        str += '<li class="' + data[i].classcolor + '" data-num="' + i + '">' +'<a href="#" class ="deleteself">刪除</a>'+'<span class="status">' + data[i].condition + '</span>' +
            '<span>BMI ' + '<em>' + data[i].bmi + '</em>' + '</span>' +
            '<span>Weight ' + '<em>' + data[i].weight + '</em>' + ' kg' + '</span>' +
            '<span>height ' + '<em>' + data[i].height + '</em>' + ' cm' + '</span>' +
            '<span>' + data[i].day + '-' + data[i].month + '-' + data[i].year + '</span>' +
            '</li>'
    }
    list.innerHTML = str;
}

//刪除紀錄

function remove() {
    data = [];
    localStorage.setItem('listData', JSON.stringify(data));
    updateList();
}