/*
  Pluto.js version 0.2

  Pluto.js is ephemeris calculator for Sun, Moon and Planets.
  This file is made from the Swiss Ephemeris Free Edition,
  Version 2.00.00 of Astrodienst AG, Switzerland
  from the original C Code to JAVA and JAVA to JavaScript.

  For any questions or comments regarding this port to JavaScript,
  you should ONLY contact me and not Astrodienst,
  as the Astrodienst AG is not involved in this port in any way.

  Licensed under GNU General Public License v2.0

  Copyright 2020- Ruby Fumizuki
  https://rubyfmzk.com
  https://github.com/rubyfmzk/Y2J
  rubyfmzk@gmail.com
*/
$pl = {};

$pl.swe = new SwissEph();
$pl.swe.init();

$pl.timezone = (function(){
  var dt = new Date();
  return dt.getTimezoneOffset() / -60;
})();

$pl.planets = {};
$pl.houses = {};
$pl.iflag = Swe.SEFLG_MOSEPH|Swe.SEFLG_SPEED;
$pl.julian_utc = 0;
$pl.longitude = 0;
$pl.latitude = 0;
$pl.house = "";

$pl.planetNames = {

  Sun: Swe.SE_SUN,
  Moon: Swe.SE_MOON,
  Mercury: Swe.SE_MERCURY,
  Venus: Swe.SE_VENUS,
  Mars: Swe.SE_MARS,
  Jupiter: Swe.SE_JUPITER,
  Saturn: Swe.SE_SATURN,
  Uranus: Swe.SE_URANUS,
  Neptune: Swe.SE_NEPTUNE,
  Pluto: Swe.SE_PLUTO,
  Earth: Swe.SE_EARTH,
  TrueNode: Swe.SE_TRUE_NODE,
  MeanNode: Swe.SE_MEAN_NODE,
  Lilith: Swe.SE_MEAN_APOG,
  //Chiron: Swe.SE_CHIRON, 
  //Juno: Swe.SE_JUNO,
};

$pl.setTimezone = function(timezone){
  $pl.timezone = timezone;
}

$pl.setCurrentDate = function(){
  var date = new Date();
  $pl.setJsUtcDate(date);
}

$pl.setDate = function(year, month, day, hours, minutes, seconds, timezone){
  if($pl._func.isNull(timezone)) timezone = $pl.timezone;

  if($pl.sd){
    $pl.sd.setDate(
      parseInt(year),
      parseInt(month),
      parseInt(day),
      parseInt(hours) + parseInt(minutes) / 60 + parseFloat(seconds) / 3600 - parseFloat(timezone)
    );
  }
  else{
    $pl.sd = new SweDate(
      parseInt(year),
      parseInt(month),
      parseInt(day),
      parseInt(hours) + parseInt(minutes) / 60 + parseFloat(seconds) / 3600 - parseFloat(timezone)
    );
  }

  $pl.julian_utc = $pl.sd.getJulDay();
}

$pl.setDateArray = function(array){
  var seconds = array.seconds ? array.seconds : 0;
  var timezone = array.timezone ? array.timezone : 0;

  $pl.setDate(array.year, array.month, array.day, array.hours, array.minutes, seconds, timezone);
}

$pl.getJulDay = function(){
  return $pl.julian_utc;
}

$pl.setJulDay = function(newJD){
  $pl.sd = $pl.sd ? $pl.sd : new SweDate();

  $pl.sd.setJulDay(newJD);
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
  var dt = new Date(
    $pl.sd.year,
    $pl.sd.month - 1,
    $pl.sd.day,
    parseInt($pl.sd.hour),
    parseInt($pl.sd.hour % 1 * 60),
    $pl.sd.hour * 60 % 1 * 60,
    $pl.sd.hour * 60 % 1 * 60 % 1 * 1000,
  );

  var res = {
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate(),
    hour: dt.getHours(),
    minute: dt.getMinutes(),
    second: Math.round(dt.getSeconds() + dt.getMilliseconds() / 1000),
  }
  return res;
}

$pl.setGeoPosition = function(latitude, longitude){
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);
  if(latitude > -90 && latitude < 90) $pl.latitude = latitude;
  if(longitude > -180 && longitude < 180) $pl.longitude = longitude;
}

$pl.setHouseSystem = function(house){
  $pl.house = house;
  return $pl.house;
}

$pl.getPlanets = function(planet){
  $pl.planets = {};

  for(var planet in $pl.planetNames){
    $pl._func.getPlanetsPosition(planet);
  }

  return $pl.planets;
}

$pl.getHouses = function(house){
  if($pl._func.isset(house)) $pl.house = house;

  var cusp = Array(13);
  var ascmc = Array(10);
  $pl.swe.swe_houses($pl.julian_utc,$pl.iflag, $pl.latitude, $pl.longitude, $pl.house, cusp, ascmc, 0);
  $pl.houses = cusp;

  return $pl.houses;
}

$pl.setSiderial = function(siderialType){
  if(!siderialType) siderialType = 0;

  $pl.iflag = $pl.iflag | Swe.SEFLG_SIDEREAL;
  $pl.swe.swe_set_sid_mode(siderialType,0,0);
}

$pl.unsetSiderial = function(){
  $pl.iflag = ($pl.iflag | Swe.SEFLG_SIDEREAL) ^ Swe.SEFLG_SIDEREAL;
}

$pl.getAyanamsha = function(){
  return $pl.swe.swe_get_ayanamsa($pl.julian_utc);
}

$pl.setHeliocentric = function(){
  $pl.iflag = $pl.iflag | Swe.SEFLG_HELCTR;
}

$pl.unsetHeliocentric = function(){
  $pl.iflag = ($pl.iflag | Swe.SEFLG_HELCTR) ^ Swe.SEFLG_HELCTR;
}


$pl._func = {
  isNull: function(val){
    if(val === null || val === undefined) return true;
    return false;
  },

  isset: function(val){
    if(val === null || val === undefined) return false;
    return true;
  },

  getPlanetsPosition: function(planet){
    var ret = {};
    var ret_matrix = new Array(6);

    $pl.swe.calc($pl.julian_utc, $pl.planetNames[planet], $pl.iflag, ret_matrix);
    var longitude = ret_matrix[0];
    var latitude = ret_matrix[1];
    var distance = ret_matrix[2];
    var longitudeSpeed = ret_matrix[3];
    var latitudeSpeed = ret_matrix[4];
    var distanceSpeed = ret_matrix[5];

    $pl.planets[planet] = {
      longitude: longitude,
      latitude: latitude,
      longitudeSpeed: longitudeSpeed,
      latitudeSpeed: latitudeSpeed,
      distance: distance,
      distanceSpeed: distanceSpeed,
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

    return $pl.planets[planet];
  },
}
