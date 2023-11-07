class Maps {
    constructor() {
        this.init();
    }

    init() {
        ymaps.ready(mapView);
    }
}

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

export default Maps;