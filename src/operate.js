$processor.init();
$pl = {};

$pl.timezone = (function(){
  var dt = new Date();
  return dt.getTimezoneOffset() / -60;
})();

$pl.planets = {};
$pl.planetsAfterMinute = {};

$pl.planetNames = [
  'sun',
  'moon',
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
  //'chiron',
  //'sirius',
];

$pl.setTimezone = function(timezone){
  $pl.timezone = timezone;
}

$pl.setCurrentDate = function(){
  var date = new Date();
  $pl.setJsUtcDate(date);
}

$pl.setDate = function(year, month, day, hours, minutes, seconds, timezone){
  if($pl._func.isNull(timezone)) timezone = $pl.timezone;

  $const.date = {
    year: year,
    month: month,
    day: day,
    hours: hours - timezone,
    minutes: minutes,
    seconds: seconds,
  };
}

$pl.setJsUtcDate = function(date){
  $pl.setDate(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    0
  );
}

$pl.getUtcDate = function(){
  return $const.date;
}

$pl.getPositions = function(planet){
  $pl.planets = {};
  $pl.planetsAfterMinute = {};

  //1分後のデータ作成
  $const.date.minutes += 1;

  for(var i=0; i<$pl.planetNames.length; i++){
    var planet = $pl.planetNames[i];
    $pl._func.getPositionAfterMinute(planet);
  }

  //1分後のデータを戻す
  $const.date.minutes -= 1;

  for(var i=0; i<$pl.planetNames.length; i++){
    var planet = $pl.planetNames[i];
    $pl._func.getPosition(planet);
  }
  return $pl.planets;
}

$pl._func = {
  isNull: function(val){
    if(val === null || val === undefined) return true;
    return false;
  },

  getPosition: function(planet){
    $processor.calc($const.date, $moshier.body[planet]);

    var longitude = $const.body.position.apparentLongitude;
    var latitude;

    switch (planet){
      case 'sun':
        latitude = $const.body.position.equinoxEclipticLonLat[1] * ( 180 / Math.PI );
        break;
      case 'moon':
        latitude = $const.body.position.geometric.latitude;
        break;
      case 'sirius':
        break;
      default:
        latitude = $const.body.position.apparentGeocentric[1] * ( 180 / Math.PI );
    }

    var longitudeSpeed = ($pl.planetsAfterMinute[planet].longitude - longitude) * 60 * 24;
    var latitudeSpeed = ($pl.planetsAfterMinute[planet].latitude - latitude) * 60 * 24;

    switch (planet){
      case 'sirius':
        $pl.planets[planet] = {
          longitude: longitude,
          latitude: latitude,
          longitudeSpeed: longitudeSpeed,
          latitudeSpeed: latitudeSpeed,
          longitude60: {
            degree: parseInt(longitude),
            minutes: parseInt(Math.abs(longitude) % 1 * 60),
            seconds: Math.abs(longitude * 60) % 1 * 60,
          },
          longitudeSpeed60: {
            degree: parseInt(longitudeSpeed),
            minutes: parseInt(Math.abs(longitudeSpeed) % 1 * 60),
            seconds: Math.abs(longitudeSpeed * 60) % 1 * 60,
          },
        }
        break;
      default:
        $pl.planets[planet] = {
          longitude: longitude,
          latitude: latitude,
          longitudeSpeed: longitudeSpeed,
          latitudeSpeed: latitudeSpeed,
          longitude60: {
            degree: parseInt(longitude),
            minutes: parseInt(Math.abs(longitude) % 1 * 60),
            seconds: Math.abs(longitude * 60) % 1 * 60,
          },
          latitude60: {
            degree: parseInt(latitude),
            minutes: parseInt(Math.abs(latitude) % 1 * 60),
            seconds: Math.abs(latitude * 60) % 1 * 60,
          },
          longitudeSpeed60: {
            degree: parseInt(longitudeSpeed),
            minutes: parseInt(Math.abs(longitudeSpeed) % 1 * 60),
            seconds: Math.abs(longitudeSpeed * 60) % 1 * 60,
          },
          latitudeSpeed60: {
            degree: parseInt(latitudeSpeed),
            minutes: parseInt(Math.abs(latitudeSpeed) % 1 * 60),
            seconds: Math.abs(latitudeSpeed * 60) % 1 * 60,
          }
        }
    }

    return $pl.planets[planet];
  },

  getPositionAfterMinute: function(planet){
    $processor.calc($const.date, $moshier.body[planet]);

    var longitude = $const.body.position.apparentLongitude;
    var latitude;

    switch (planet){
      case 'sun':
        latitude = $const.body.position.equinoxEclipticLonLat[1] * ( 180 / Math.PI );
        break;
      case 'moon':
        latitude = $const.body.position.geometric.latitude;
        break;
      case 'sirius':
        break;
      default:
        latitude = $const.body.position.apparentGeocentric[1] * ( 180 / Math.PI );
    }

    $pl.planetsAfterMinute[planet] = {
      longitude: longitude,
      latitude: latitude,
    }

    return $pl.planetsAfterMinute[planet];
  },
}
