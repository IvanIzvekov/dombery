//import Maps from "./modules/Maps";
import FindForm from "./modules/FindForm";

const isMobile = document.documentElement.clientWidth < 768;
const isTablet = document.documentElement.clientWidth < 1140;

function isWebp() {
    // Проверка поддержки webp
    const testWebp = (callback) => {
        const webP = new Image();

        webP.onload = webP.onerror = () => callback(webP.height === 2);
        webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    // Добавление класса _webp или _no-webp для HTML
    testWebp((support) => {
        const className = support ? 'webp' : 'no-webp';
        document.querySelector('html').classList.add(className);
        console.log(support ? 'webp поддерживается' : 'webp не поддерживается');
    });
}

isWebp();

document.addEventListener('DOMContentLoaded', (event) => {
    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });
    const findFormNode = document.querySelector('.find__input-group');
    if(findFormNode) {
        new FindForm(findFormNode);
    }
})
function mapView() {
    var node = document.getElementById('complexStreet').innerHTML;

    var myGeocoder = ymaps.geocode("Новосибирск " + node);

    myGeocoder.then(
        function (res) {
            var coords = res.geoObjects.get(0).geometry.getCoordinates();
            
            var myMap = new ymaps.Map("map", {
                center: coords,
                zoom: 16
            });
            var myGeoObject = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: coords
                }
            })
            myMap.geoObjects.add(myGeoObject);
        })
}

ymaps.ready(mapView);