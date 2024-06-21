document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();
    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearInfo();
        showWarning('Carregando...');

        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=81ddaf07f2ff0dd96694ff507866d925&units=metric&lang=pt_br`;
        let req = await fetch(URL);
        let json = await req.json();
        
        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg

            })
        } else {
            clearInfo();
            showWarning('Não encontramos essa localização...');
        }
        
    } else {
        clearInfo();
    }
});

function showInfo(json) {
    showWarning('');
    
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp.toFixed(0)} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.ventoPonto').style.rotate = `${json.windAngle-90}deg`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.resultado').style.display = 'grid';

    console.log(json);
}
function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

