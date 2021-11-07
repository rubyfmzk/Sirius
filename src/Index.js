import { Swe } from "./Swe"
import { SwissEph } from "./SwissEph"
import { SweDate } from "./SweDate"
import { FixStars } from "./FixStars"

export default class {

  constructor(){

    this.sd   = new SweDate()
    this.sw   = new SwissEph(this.sd)

    this.planetNames = {
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
      TrueLilith: Swe.SE_OSCU_APOG,
      MeanLilith: Swe.SE_MEAN_APOG,
    }

    this.timezone = (function(){
      const dt = new Date();
      return dt.getTimezoneOffset() / -60;
    })()
    this.iflag = Swe.SEFLG_MOSEPH|Swe.SEFLG_SPEED
    this.calendar_type = 'Auto'
    this.planets = {}
    this.longitude = 0
    this.latitude = 0
    this.sw.init()
  }

  set_datetime(year, month, day, hour, minute, timezone){
    if(this._isNull(timezone)) timezone = this.timezone;
    if(this._isNull(month)) month = 1;
    if(this._isNull(day)) day = 1;
    if(this._isNull(hour)) hour = 0;
    if(this._isNull(minute)) minute = 0;

    this.sd.setDate(
      parseInt(year),
      parseInt(month),
      parseInt(day),
      parseInt(hour) + parseInt(minute) / 60 - parseFloat(timezone)
    )
    if(this.calendar_type === 'Auto'){
      this.sd.updateCalendarType()
    }
  }

  get_datetime(jd) {
    jd = jd ? jd : this.sd.jd

    const second = (jd-this.sd.JD0)*24*3600*1000
    return new Date(second)
  }


  set_calendar_type(type){
    switch(type){
      case 'Greg':
        this.calendar_type = 'Greg'
        this.sd.setCalendarType(this.sd.SE_GREG_CAL, 1)
        break
      case 'Jul':
        this.calendar_type = 'Jul'
        this.sd.setCalendarType(this.sd.SE_JUL_CAL, 1)
        break
      default:
        this.calendar_type = 'Auto'
        this.sd.updateCalendarType()
        break
    }
  }

  set_geo_position(latitude, longitude){
    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)
    if(latitude > -90 && latitude < 90) this.latitude = latitude
    if(longitude > -180 && longitude < 180) this.longitude = longitude
  }

  set_house_system(house){
    this.house = house
    return this.house
  }

  get_planets(planet){
    this.planets = {};

    for(var planet in this.planetNames){
      this._getPlanetsPosition(planet);
    }

    return this.planets
  }

  get_houses(house){
    if(this._isset(house)) this.house = house;

    var cusp = Array(13)
    var ascmc = Array(10)
    this.sw.swe_houses(this.sd.jd, this.iflag, this.latitude, this.longitude, this.house, cusp, ascmc, 0);
    this.houses = cusp

    return this.houses
  }

  set_siderial(siderialType){
    if(!siderialType) siderialType = 0;

    this.iflag = this.iflag | Swe.SEFLG_SIDEREAL;
    this.sw.swe_set_sid_mode(siderialType,0,0);
  }

  unset_siderial(){
    this.iflag = (this.iflag | Swe.SEFLG_SIDEREAL) ^ Swe.SEFLG_SIDEREAL;
  }

  get_ayanamsha(){
    return this.sw.swe_get_ayanamsa(this.sd.jd)
  }

  set_heliocentric(){
    this.iflag = this.iflag | Swe.SEFLG_HELCTR;
  }

  unset_heliocentric(){
    this.iflag = (this.iflag | Swe.SEFLG_HELCTR) ^ Swe.SEFLG_HELCTR;
  }

  get_solar_eclipse(backward){
    const tret = new Array(8)
    const attr = new Array(11)
    const geopos = new Array(6)
    backward = backward ? 1 : 0

    this.sw.swe_sol_eclipse_when_glob(this.sd.jd, this.iflag, 0, tret, backward)
    const retflag = this.sw.swe_sol_eclipse_where(tret[0], this.iflag, geopos, attr)

    const ret = {
      is_central_eclipse: retflag & Swe.SE_ECL_CENTRAL ? true : false,
      is_total_eclipse:   retflag & Swe.SE_ECL_TOTAL   ? true : false,
      is_annular_eclipse: retflag & Swe.SE_ECL_ANNULAR ? true : false,
      is_partial_eclipse: retflag & Swe.SE_ECL_PARTIAL ? true : false,
      maximum_eclipse:{
        julian_date: tret[0],
        datetime: this.get_datetime(tret[0]),
        center_longitude: geopos[0],
        center_latitude: geopos[1],
      },
      // eclipse_takes_place_at_local:{
      //   julian_date: tret[1],
      //   datetime: this.get_datetime(tret[1])
      // },
      begin_eclipse:{
        julian_date: tret[2],
        datetime: this.get_datetime(tret[2])
      },
      end_eclipse:{
        julian_date: tret[3],
        datetime: this.get_datetime(tret[3])
      },
      begin_totality: tret[4] ? {
        julian_date: tret[4],
        datetime: this.get_datetime(tret[4])
      } : null,
      end_totality: tret[5] ? {
        julian_date: tret[5],
        datetime: this.get_datetime(tret[5])
      } : null,
      begin_center_line: tret[6] ? {
        julian_date: tret[6],
        datetime: this.get_datetime(tret[6])
      } : null,
      end_center_line: tret[7] ? {
        julian_date: tret[7],
        datetime: this.get_datetime(tret[7])
      } : null,
    }

    return ret
  }

  get_lunar_eclipse(backward){
    const tret = new Array(8)
    const attr = new Array(11)
    const geopos = new Array(6)
    backward = backward ? 1 : 0

    const retflag = this.sw.swe_lun_eclipse_when(this.sd.jd, this.iflag, 0, tret, backward)
    const ret = {
      is_total_eclipse:   retflag & Swe.SE_ECL_TOTAL   ? true : false,
      is_partial_eclipse: retflag & Swe.SE_ECL_PARTIAL ? true : false,
      is_penumbral_eclipse: retflag & Swe.SE_ECL_PENUMBRAL ? true : false,
      maximum_eclipse:{
        julian_date: tret[0],
        datetime: this.get_datetime(tret[0]),
        center_longitude: geopos[0],
        center_latitude: geopos[1],
      },
      begin_eclipse:{
        julian_date: tret[2],
        datetime: this.get_datetime(tret[2])
      },
      end_eclipse:{
        julian_date: tret[3],
        datetime: this.get_datetime(tret[3])
      },
      begin_totality: tret[4] ? {
        julian_date: tret[4],
        datetime: this.get_datetime(tret[4])
      } : null,
      end_totality: tret[5] ? {
        julian_date: tret[5],
        datetime: this.get_datetime(tret[5])
      } : null,
      begin_center_line: tret[6] ? {
        julian_date: tret[6],
        datetime: this.get_datetime(tret[6])
      } : null,
      end_center_line: tret[7] ? {
        julian_date: tret[7],
        datetime: this.get_datetime(tret[7])
      } : null,
    }

    return ret
  }

  get_fixstar(star){
    const xx = Array(6)
    this.sw.swe_fixstar(star, this.sd.jd, this.iflag, xx)
    const star_info = FixStars[star]
    // console.log(xx, star_info)

    const ret = {
      longitude: xx[0],
      latitude : xx[1],
      names    : star_info[0],
    }
    return ret
  }

  _isNull(val){
    if(val === null || val === undefined) return true;
    return false;
  }

  _isset(val){
    if(val === null || val === undefined) return false;
    return true;
  }

  _getPlanetsPosition(planet){
    var ret = {};
    var ret_matrix = new Array(6);

    this.sw.calc(this.sd.jd, this.planetNames[planet], this.iflag, ret_matrix);

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
  }
}