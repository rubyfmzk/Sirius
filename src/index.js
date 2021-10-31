import { Swe } from "./Swe"
import { SweDate } from "./SweDate"
import { SwissEph } from "./SwissEph"

export default class {

  constructor(){
    this.swe = new SwissEph()
    this.sd = new SweDate()
  }

  setDate(year, month, day, hour, minute, second, timezone){
    if(this._func.isNull(timezone)) timezone = this.timezone;
    if(this._func.isNull(month)) month = 1;
    if(this._func.isNull(day)) day = 1;
    if(this._func.isNull(hour)) hour = 0;
    if(this._func.isNull(minute)) minute = 0;
    if(this._func.isNull(second)) second = 0;

    if(this.sd){
      this.sd.setDate(
        parseInt(year),
        parseInt(month),
        parseInt(day),
        parseInt(hour) + parseInt(minute) / 60 + parseFloat(second) / 3600 - parseFloat(timezone)
      );
    }
    else{
      this.sd = new SweDate(
        parseInt(year),
        parseInt(month),
        parseInt(day),
        parseInt(hour) + parseInt(minute) / 60 + parseFloat(second) / 3600 - parseFloat(timezone)
      );
    }
  }

  setTimezone = function(timezone){
    this.timezone = timezone;
  }

  setCurrentDate = function(){
    var date = new Date();
    this.setJsUtcDate(date);
  }

  setDate = function(year, month, day, hour, minute, second, timezone){
    if(this._func.isNull(timezone)) timezone = this.timezone;
    if(this._func.isNull(month)) month = 1;
    if(this._func.isNull(day)) day = 1;
    if(this._func.isNull(hour)) hour = 0;
    if(this._func.isNull(minute)) minute = 0;
    if(this._func.isNull(second)) second = 0;

    if(this.sd){
      this.sd.setDate(
        parseInt(year),
        parseInt(month),
        parseInt(day),
        parseInt(hour) + parseInt(minute) / 60 + parseFloat(second) / 3600 - parseFloat(timezone)
      );
    }
    else{
      this.sd = new SweDate(
        parseInt(year),
        parseInt(month),
        parseInt(day),
        parseInt(hour) + parseInt(minute) / 60 + parseFloat(second) / 3600 - parseFloat(timezone)
      );
    }
  }

  setDateArray = function(array){
    var second = array.seconds ? array.seconds : 0;
    var timezone = array.timezone ? array.timezone : 0;

    this.setDate(array.year, array.month, array.day, array.hour, array.minute, second, timezone);
  }

  getJulDay = function(){
    return this.sd.jd;
  }

  setJulDay = function(newJD){
    this.sd = this.sd ? this.sd : new SweDate();

    this.sd.setJulDay(newJD);
  }

  addJulDay = function(addDay){
    var julDay = this.getJulDay();

    this.setJulDay(julDay + addDay);
  }

  setJsUtcDate = function(date){
    this.setDate(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      0
    );
  }

  getUtcDate = function(){
    var dt = new Date(
      this.sd.year,
      this.sd.month - 1,
      this.sd.day,
      parseInt(this.sd.hour),
      parseInt(this.sd.hour % 1 * 60),
      this.sd.hour * 60 % 1 * 60,
      this.sd.hour * 60 % 1 * 60 % 1 * 1000,
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

  getLocalDate = function(timezone){
    var dt = new Date(
      this.sd.year,
      this.sd.month - 1,
      this.sd.day,
      parseInt(this.sd.hour) + parseInt(timezone),
      parseInt(this.sd.hour % 1 * 60) + parseInt(timezone * 60 % 60),
      this.sd.hour * 60 % 1 * 60,
      this.sd.hour * 60 % 1 * 60 % 1 * 1000,
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

  setGeoPosition = function(latitude, longitude){
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    if(latitude > -90 && latitude < 90) this.latitude = latitude;
    if(longitude > -180 && longitude < 180) this.longitude = longitude;
  }

  setHouseSystem = function(house){
    this.house = house;
    return this.house;
  }

  getPlanets = function(planet){
    this.planets = {};

    for(var planet in this.planetNames){
      this._func.getPlanetsPosition(planet);
    }

    return this.planets;
  }

  getHouses = function(house){
    if(this._func.isset(house)) this.house = house;

    var cusp = Array(13);
    var ascmc = Array(10);
    this.swe.swe_houses(this.getJulDay(),this.iflag, this.latitude, this.longitude, this.house, cusp, ascmc, 0);
    this.houses = cusp;

    return this.houses;
  }

  setSiderial = function(siderialType){
    if(!siderialType) siderialType = 0;

    this.iflag = this.iflag | Swe.SEFLG_SIDEREAL;
    this.swe.swe_set_sid_mode(siderialType,0,0);
  }

  unsetSiderial = function(){
    this.iflag = (this.iflag | Swe.SEFLG_SIDEREAL) ^ Swe.SEFLG_SIDEREAL;
  }

  getAyanamsha = function(){
    return this.swe.swe_get_ayanamsa(this.getJulDay());
  }

  setHeliocentric = function(){
    this.iflag = this.iflag | Swe.SEFLG_HELCTR;
  }

  unsetHeliocentric = function(){
    this.iflag = (this.iflag | Swe.SEFLG_HELCTR) ^ Swe.SEFLG_HELCTR;
  }


  _func = {
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

      this.swe.calc(this.getJulDay(), this.planetNames[planet], this.iflag, ret_matrix);
      var longitude = ret_matrix[0];
      var latitude = ret_matrix[1];
      var distance = ret_matrix[2];
      var longitudeSpeed = ret_matrix[3];
      var latitudeSpeed = ret_matrix[4];
      var distanceSpeed = ret_matrix[5];

      this.planets[planet] = {
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

      return this.planets[planet];
    },
  }
}