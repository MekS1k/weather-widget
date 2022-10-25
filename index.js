
let viget = document.querySelector('.viget');
let city = document.querySelector('.city')
let pCity = document.querySelector('.cityText')
let pTemp = document.querySelector('.temp')
let pDesc = document.querySelector('.descr')
let pWind = document.querySelector('.wind')
let back = document.querySelector('.viget')


fetch('https://restcountries.com/v3.1/all')
  .then(function (resp1) {
    return resp1.json()
  })
  .then(function (data1) {
    let output = '';
    data1.forEach(function (city1) {
      output += `<option class="option">${city1.capital}</option>`;
      city.innerHTML = output;
    });
  })

function search() {

  try {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=b716e8d1dec234250048fd364cfa9c6f`)
      //обрабатываем данные с API в JSON
      .then(function (resp) {
        return resp.json()
      })
      //Работаем с обработанными данными
      .then(function (data) {//получаем уже обработанные данные
        console.log(data)
        pCity.innerHTML = city.value
        pTemp.innerHTML = Math.round(data.main.temp - 273)+" °C"
        pDesc.innerHTML = data.weather[0].description
        pWind.innerHTML = data.wind.speed+" м/с"
        //Загружаем данные в sessionStorage
        sessionStorage.setItem('select', city.value)
        sessionStorage.setItem('pCity', pCity.innerHTML)
        sessionStorage.setItem('pTemp', pTemp.innerHTML)
        sessionStorage.setItem('pDesc', pDesc.innerHTML)
        sessionStorage.setItem('pWind', pWind.innerHTML)

        //Если такого города нет
        if (data.main.temp === '' || data.main.temp === 'NOT_FOUND') {
          return alert("Информации по городу " + city.value + " нет")
        }
        let temp = Math.round(data.main.temp - 273)
        temp = Number(temp) //меняем тип данных у температуры из string в number
        if (temp > 20) {
          back.style.background = "#FFFFCC"
        } else if (0 <= temp <= 20) {
          back.style.background = "#FFFFFF"
        }
        if (temp < 0) {
          back.style.background = "#CCFFFF"
        }
      })

  }
  catch (error) {
    alert(error)
  }
}
setInterval(function ()//Обновляем данные каждую минуту
{
  search()
}, 60000)//в миллисекундах

const color = sessionStorage.getItem('color')//Получаем данные из sessionStorage
back.style.background = color //присваивам данные из хранилища в html

const select = sessionStorage.getItem('select')
city.value = select

const pCity1 = sessionStorage.getItem('pCity')
pCity.innerHTML = pCity1

const pTemp1 = sessionStorage.getItem('pTemp')
pTemp.innerHTML = pTemp1

const pDesc1 = sessionStorage.getItem('pDesc')
pDesc.innerHTML = pDesc1

const pWind1 = sessionStorage.getItem('pWind')
pWind.innerHTML = pWind1

const top1 = sessionStorage.getItem('top1')
viget.style.top = top1

const left = sessionStorage.getItem('left')
viget.style.left = left


viget.addEventListener('mousedown', mouseDown)//при удерживании мыши
window.addEventListener('mouseup', mouseUp)// при отпускании

function mouseUp() {//удаляет событие передвижения
  window.removeEventListener('mousemove', move)
  sessionStorage.setItem('top1', viget.style.top)
  sessionStorage.setItem('left', viget.style.left)
  sessionStorage.setItem('color', back.style.background)
}

function mouseDown(e) { //добавляет событие передвижения
  window.addEventListener('mousemove', move)
}

function move(e) {//двигает
  viget.style.top = e.clientY + 'px'
  viget.style.left = e.clientX + 'px'
}
