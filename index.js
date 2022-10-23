
  let viget = document.querySelector('.viget');
  let city = document.querySelector('.city')
  let pCity = document.querySelector('.cityText')
  let pTemp = document.querySelector('.temp') 
  let pDesc = document.querySelector('.descr') 
  let pWind = document.querySelector('.wind') 
  let back = document.querySelector('.viget')

function search() {

  try{
 fetch('https://goweather.herokuapp.com/weather/' + city.value)
 //обрабатываем данные с API в JSON
   .then(function(resp) {
     return resp.json()
   })
   //Работаем с обработанными данными
   .then(function(data) {//получаем уже обработанные данные
     console.log(data)
     pCity.innerHTML = city.value
     pTemp.innerHTML = data.temperature
     pDesc.innerHTML = data.description
     pWind.innerHTML = data.wind
     //Загружаем данные в sessionStorage
    sessionStorage.setItem('input', city.value)
    sessionStorage.setItem('pCity', pCity.innerHTML)
    sessionStorage.setItem('pTemp',  pTemp.innerHTML)
    sessionStorage.setItem('pDesc', pDesc.innerHTML)
    sessionStorage.setItem('pWind', pWind.innerHTML)

    //Если такого города нет
    if(data.temperature === '' || data.message === 'NOT_FOUND')
     {
       return alert("Информации по городу " +city.value + " нет" )
     }
     let temp = data.temperature.replace(/[^0-9-]/g, '') //убираем в графе температура всё, кроме минуса и цифр
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
  catch(error){
    alert(error)
  }
}
//функция для закрепления виджета и сохранения фона
function zak(){
    sessionStorage.setItem('top1', viget.style.top) 
    sessionStorage.setItem('left', viget.style.left) 
    sessionStorage.setItem('color', back.style.background)
}
setInterval(function()//Обновляем данные каждую минуту
{
    search()
}, 100000)//в миллисекундах

setInterval(function()//Вызываем функцию каждую секунду, чтобы закрепить виджет (ужасный костыль)
{
    zak()
}, 100)



const color = sessionStorage.getItem('color')//Получаем данные из sessionStorage
back.style.background =  color //присваивам данные из хранилища в html

const input = sessionStorage.getItem('input')
city.value =  input

const pCity1 = sessionStorage.getItem('pCity')
pCity.innerHTML =  pCity1

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
}

function mouseDown(e) { //добавляет событие передвижения
    window.addEventListener('mousemove', move)
}

function move(e) {//двигает
    viget.style.top=  e.clientY + 'px'
    viget.style.left = e.clientX + 'px'
};
