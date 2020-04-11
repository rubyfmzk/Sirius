$processor.init();
$pl = {};

$pl.timezone = (function(){
  var dt = new Date();
  return dt.getTimezoneOffset() / -60;
})();

$pl.planet = {};

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
  'chiron',
  'sirius',
];

$pl.setTimezone = function(timezone){
  $pl.timezone = timezone;
}

$pl.setCurrentDate = function(){
  var date = new Date();
  $pl.setJsUtcDate(date);
}

$pl.setDate = function(year, month, day, hours, minutes, seconds, timezone){
  if($pl.func.isNull(timezone)) timezone = $pl.timezone;

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

$pl.getUTCDate = function(){
  return $const.date;
}

$pl.getPosition = function(planet){
  $processor.calc($const.date, $moshier.body[planet]);
  $pl.planet[planet] = {
    longitude: $const.body.position.apparentLongitude,
  }

  switch (planet){
    case 'sun':
      break;
    case 'moon':
      $pl.planet[planet].latitude = $const.body.position.apparentGeocentric.latitude;
      break;
    default:
      $pl.planet[planet].longitude60 = {
        degree: $const.body.position.apparentGeocentric[3].degree,
        minutes: $const.body.position.apparentGeocentric[3].minutes,
        seconds: $const.body.position.apparentGeocentric[3].seconds,
      }
  }
  return $pl.planet[planet];
}

$pl.getAllPositions = function(planet){
  for(var i=0; i<$pl.planets.length; i++){

  }
  $processor.calc($const.date, $moshier.body[planet]);
}

$pl.func = {
  isNull: function(val){
    if(val === null || val === undefined) return true;
    return false;
  },
}
