/**
* This class is a date class specialized for the use with the swisseph
* package. You will like to use it, if you need a Julian Day number or
* the deltaT for a date or a Julian Day or if like to convert from Gregorian
* to Julian calendar system or vice versa.<P>
* This is a port of the SwissEphemeris package to Java. See
* <A HREF="http://www.astro.ch">Astrodienst Z&uuml;rich</A>
* for more infos and the original authors.
* <P><I><B>You will find the complete documentation for the original
* SwissEphemeris package at <A HREF="http://www.astro.ch/swisseph/sweph_g.htm">
* http://www.astro.ch/swisseph/sweph_g.htm</A>. By far most of the information
* there is directly valid for this port to Java as well.</B></I>
* @author Thomas Mack / mack@ifis.cs.tu-bs.de
* @version 1.0.0c
*/
import { Swe } from "./Swe"
import { SwissData } from "./SwissData"
import { SwephData } from "./SwephData"
import { IDate } from "./Classes"

export class SweDate{
  constructor(year, month, day, hour, calType){
    this.swed = SwissData;
    this.SUNDAY = 0;
    this.MONDAY = 1,
    this.TUESDAY = 2;
    this.WEDNESDAY = 3;
    this.THURSDAY = 4;
    this.FRIDAY = 5;
    this.SATURDAY = 6;
    this.SE_JUL_CAL = false;
    this.SE_GREG_CAL = true;
    this.SE_KEEP_DATE = true;
    this.SE_KEEP_JD = false;
    this.init_leapseconds_done = false;

    this.JD0 = 2440587.5;
    this.tid_acc  = Swe.SE_TIDAL_DEFAULT;

    this.is_tid_acc_manual  = false;
    this.init_dt_done = false;
    this.jd = 0.0;
    // JD for the start of the Gregorian calendar system (October 15, 1582):
    this.jdCO  = 2299160.5;
    this.calType = false
    this.year = 0;
    this.month = 0;
    this.day = 0;
    this.hour = 0.0;
    this.deltaT = null;
    this.deltatIsValid = false;

    this.TABSTART =1620;
    this.TABEND = 2019;
    this.TABSIZ = this.TABEND - this.TABSTART + 1;

    /* we make the table greater for additional values read from external file */
    this.TABSIZ_SPACE = this.TABSIZ + 100;

    this.dt = [
      /* 1620.0 thru 1659.0 */
      124.00, 119.00, 115.00, 110.00, 106.00, 102.00, 98.00, 95.00, 91.00, 88.00,
      85.00, 82.00, 79.00, 77.00, 74.00, 72.00, 70.00, 67.00, 65.00, 63.00,
      62.00, 60.00, 58.00, 57.00, 55.00, 54.00, 53.00, 51.00, 50.00, 49.00,
      48.00, 47.00, 46.00, 45.00, 44.00, 43.00, 42.00, 41.00, 40.00, 38.00,
      /* 1660.0 thru 1699.0 */
      37.00, 36.00, 35.00, 34.00, 33.00, 32.00, 31.00, 30.00, 28.00, 27.00,
      26.00, 25.00, 24.00, 23.00, 22.00, 21.00, 20.00, 19.00, 18.00, 17.00,
      16.00, 15.00, 14.00, 14.00, 13.00, 12.00, 12.00, 11.00, 11.00, 10.00,
      10.00, 10.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00,
      /* 1700.0 thru 1739.0 */
      9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 10.00, 10.00,
      10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 11.00, 11.00, 11.00,
      11.00, 11.00, 11.00, 11.00, 11.00, 11.00, 11.00, 11.00, 11.00, 11.00,
      11.00, 11.00, 11.00, 11.00, 12.00, 12.00, 12.00, 12.00, 12.00, 12.00,
      /* 1740.0 thru 1779.0 */
      12.00, 12.00, 12.00, 12.00, 13.00, 13.00, 13.00, 13.00, 13.00, 13.00,
      13.00, 14.00, 14.00, 14.00, 14.00, 14.00, 14.00, 14.00, 15.00, 15.00,
      15.00, 15.00, 15.00, 15.00, 15.00, 16.00, 16.00, 16.00, 16.00, 16.00,
      16.00, 16.00, 16.00, 16.00, 16.00, 17.00, 17.00, 17.00, 17.00, 17.00,
      /* 1780.0 thru 1799.0 */
      17.00, 17.00, 17.00, 17.00, 17.00, 17.00, 17.00, 17.00, 17.00, 17.00,
      17.00, 17.00, 16.00, 16.00, 16.00, 16.00, 15.00, 15.00, 14.00, 14.00,
      /* 1800.0 thru 1819.0 */
      13.70, 13.40, 13.10, 12.90, 12.70, 12.60, 12.50, 12.50, 12.50, 12.50,
      12.50, 12.50, 12.50, 12.50, 12.50, 12.50, 12.50, 12.40, 12.30, 12.20,
      /* 1820.0 thru 1859.0 */
      12.00, 11.70, 11.40, 11.10, 10.60, 10.20, 9.60, 9.10, 8.60, 8.00,
      7.50, 7.00, 6.60, 6.30, 6.00, 5.80, 5.70, 5.60, 5.60, 5.60,
      5.70, 5.80, 5.90, 6.10, 6.20, 6.30, 6.50, 6.60, 6.80, 6.90,
      7.10, 7.20, 7.30, 7.40, 7.50, 7.60, 7.70, 7.70, 7.80, 7.80,
      /* 1860.0 thru 1899.0 */
      7.88, 7.82, 7.54, 6.97, 6.40, 6.02, 5.41, 4.10, 2.92, 1.82,
      1.61, .10, -1.02, -1.28, -2.69, -3.24, -3.64, -4.54, -4.71, -5.11,
      -5.40, -5.42, -5.20, -5.46, -5.46, -5.79, -5.63, -5.64, -5.80, -5.66,
      -5.87, -6.01, -6.19, -6.64, -6.44, -6.47, -6.09, -5.76, -4.66, -3.74,
      /* 1900.0 thru 1939.0 */
      -2.72, -1.54, -.02, 1.24, 2.64, 3.86, 5.37, 6.14, 7.75, 9.13,
      10.46, 11.53, 13.36, 14.65, 16.01, 17.20, 18.24, 19.06, 20.25, 20.95,
      21.16, 22.25, 22.41, 23.03, 23.49, 23.62, 23.86, 24.49, 24.34, 24.08,
      24.02, 24.00, 23.87, 23.95, 23.86, 23.93, 23.73, 23.92, 23.96, 24.02,
      /* 1940.0 thru 1979.0 */
       24.33, 24.83, 25.30, 25.70, 26.24, 26.77, 27.28, 27.78, 28.25, 28.71,
       29.15, 29.57, 29.97, 30.36, 30.72, 31.07, 31.35, 31.68, 32.18, 32.68,
       33.15, 33.59, 34.00, 34.47, 35.03, 35.73, 36.54, 37.43, 38.29, 39.20,
       40.18, 41.17, 42.23, 43.37, 44.49, 45.48, 46.46, 47.52, 48.53, 49.59,
      /* 1980.0 thru 1999.0 */
       50.54, 51.38, 52.17, 52.96, 53.79, 54.34, 54.87, 55.32, 55.82, 56.30,
       56.86, 57.57, 58.31, 59.12, 59.98, 60.78, 61.63, 62.30, 62.97, 63.47,
      /* 2000.0 thru 2009.0 */
       63.83, 64.09, 64.30, 64.47, 64.57, 64.69, 64.85, 65.15, 65.46, 65.78,      
      /* 2010.0 thru 2015.0 */
       66.07, 66.32, 66.60, 66.907,67.281,67.644,
      /* Extrapolated values, 2016 - 2019 */
                                                 68.01, 68.50, 69.00, 69.50,
      // JAVA ONLY: add 100 empty elements, see constant TABSIZ_SPACE above!
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    /*#define DELTAT_ESPENAK_MEEUS_2006 TRUE*/
    this.TAB2_SIZ     =  27;
    this.TAB2_START   =  -1000;
    this.TAB2_END     =  1600;
    this.TAB2_STEP    =  100;
    this.LTERM_EQUATION_YSTART  =  1820;
    this.LTERM_EQUATION_COEFF  =  32;
    /* Table for -1000 through 1600, from Morrison & Stephenson (2004).  */
    this.dt2 = [
      /*-1000  -900  -800  -700  -600  -500  -400  -300  -200  -100*/
        25400,23700,22000,21000,19040,17190,15530,14080,12790,11640,
      /*    0   100   200   300   400   500   600   700   800   900*/
        10580, 9600, 8640, 7680, 6700, 5710, 4740, 3810, 2960, 2200,
      /* 1000  1100  1200  1300  1400  1500  1600,                 */
         1570, 1090,  740,  490,  320,  200,  120,
    ];

    /* Leap seconds were inserted at the end of the following days:*/
    this.NLEAP_SECONDS = 26;
    this.NLEAP_SECONDS_SPACE = 100;
    this.leap_seconds = [
      19720630,
      19721231,
      19731231,
      19741231,
      19751231,
      19761231,
      19771231,
      19781231,
      19791231,
      19810630,
      19820630,
      19830630,
      19850630,
      19871231,
      19891231,
      19901231,
      19920630,
      19930630,
      19940630,
      19951231,
      19970630,
      19981231,
      20051231,
      20081231,
      20120630,
      20150630,
      0,  /* keep this 0 as end mark */
      // JAVA ONLY to have the array extended to NLEAP_SECONDS_SPACE elements:
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    this.J1972 = 2441317.5;
    this.NLEAP_INIT = 10;

    //引数がゼロ
    if(year === undefined){
      var now = new Date();
      year = now.getUTCFullYear();
      month = now.getUTCMonth() + 1;
      day = now.getUTCDate();
      hour = now.getUTCHours() + now.getUTCMinutes()/60 + now.getUTCSeconds()/3600;
      this.setFields(year, month, day, hour, this.SE_GREG_CAL);
    //引数が1つ
    }else if(month === undefined){
      var jd = year;
      this.initDateFromJD(jd, this.jdCO<=jd?this.SE_GREG_CAL:this.SE_JUL_CAL);
    //引数が2つ
    }else if(day === undefined){
      var jd = year;
      var calType = month;
      this.initDateFromJD(jd, calType);
    //引数が4つ
    }else if(calType === undefined){
      this.setFields(year, month, day, hour);
    //引数が5つ
    }else{
      this.setFields(year, month, day, hour, calType);
    }
  };

  /**
  * Queries the Julian Day number of the given date that is interpreted as
  * a date in the given calendar system - this is a static method.
  * @param year The year of the date
  * @param month The month of the date
  * @param day The day-number of the date
  * @param hour The hour of the day
  * @param calType calendar type (Gregorian or Julian calendar system)
  * @return Julian Day number
  * @see #SE_GREG_CAL
  * @see #SE_JUL_CAL
  */
  getJulDay(year, month, day, hour, calType) {
    if(year === undefined){
      return this.jd;
    }

    if(calType === undefined){
      return this.swe_julday(year, month, day, hour, this.SE_GREG_CAL);
    }

    return this.swe_julday(year, month, day, hour, calType);
  };

  /**
  * Queries the day of the week of the given date that is interpreted as
  * being a date in the given calendar system. Sunday is represented by 0,
  * Saturday by 6. Any discontinuity in the sequence of weekdays is
  * <b>not</b> taken into account! <B>Attention: the numbers are different
  * from the numbers returned by the java.awt.Calendar class!</B>
  * @return Number of the day of week
  * @param year The year of the date
  * @param month The month of the date
  * @param day The day-number of the date
  * @param calType calendar type (Gregorian or Julian calendar system)
  * @see #SE_GREG_CAL
  * @see #SE_JUL_CAL
  * @see #SUNDAY
  * @see #MONDAY
  * @see #TUESDAY
  * @see #WEDNESDAY
  * @see #THURSDAY
  * @see #FRIDAY
  * @see #SATURDAY
  */
  getDayOfWeekNr(year, month, day, calType) {
    //引数がゼロ
    if(year === undefined){
      return (Math.floor(this.jd-5.5))%7;
    //引数が1つ
    }else if(month === undefined){
      var jd = year;
      return (Math.floor(jd-5.5))%7;
    //引数が3つ
    }else if(calType === undefined){
      return (Math.floor(this.swe_julday(year, month, day, 0.0, this.SE_GREG_CAL)-5.5))%7;
    //引数が4つ
    }else{
      return (Math.floor(this.swe_julday(year, month, day, 0.0, calType)-5.5))%7;
    }
  }

  /**
  * Queries the type of calendar in effect - Gregorian or Julian calendar.
  * This will effect what date you will get back for a given Julian Day.
  * @return Calendar type
  * @see #SE_GREG_CAL
  * @see #SE_JUL_CAL
  */
  getCalendarType() {
    return this.calType;
  }

  getYear() {
    return this.year;
  }

  getMonth() {
    return this.month;
  }

  getDay() {
    return this.day;
  }

  getHour() {
    return this.hour;
  }

  /**
  * Queries the delta T value for the given Julian Day number - this is a
  * static method. Delta T is calculated with a tidal acceleration of
  * SE_TIDAL_DEFAULT.
  * @param tjd Julian Day number
  * @return delta T
  * @see swisseph.SweConst#SE_TIDAL_DEFAULT
  */
  getDeltaT(tjd) {
    if(tjd === undefined){
      if (this.deltatIsValid) { return this.deltaT; }

      this.deltaT = this.calc_deltaT(this.getJulDay());
      this.deltatIsValid = true;
      return this.deltaT;
    }

    return this.calc_deltaT(tjd);
  }

  /**
  * This will return a java.util.Date object from a julian day number.
  * @param jd The julian day number for which to create a Date object.
  * @return the Date object for the JD
  */
  getDate(jd) {
    //引数がoffsetである
    if(Math.floor(jd) === jd){
      var millis=((this.getJulDay()-this.JD0)*24*3600*1000)+offset;
      return new Date(millis);
    }

    var millis=(jd-this.JD0)*24*3600*1000;
    return new Date(millis);
  }

  // Write access: //
  /**
  * Sets the new Julian Day for this object. This operation does NOT
  * change the calendar type (Gregorian or Julian calendar). Use methods
  * setCalendarType() or updateCalendarType() for this.
  * @param newJD Julian Day number
  */
  setJulDay(newJD) {
    this.jd=newJD;
    this.deltatIsValid=false;
    var dt=this.swe_revjul(newJD,this.calType);
    this.year=dt.year;
    this.month=dt.month;
    this.day=dt.day;
    this.hour=dt.hour;
  }

  /**
  * Sets the calendar type for this object.
  * @param newCalType Calendar type (Greogorian or Julian calendar)
  * @param keepDate Determines, if the date or the julian day should
  * be fix in this operation.
  * @see #SE_GREG_CAL
  * @see #SE_JUL_CAL
  * @see #SE_KEEP_DATE
  * @see #SE_KEEP_JD
  */
  setCalendarType(newCalType, keepDate) {
    if (this.calType != newCalType) {
      this.calType=newCalType;
      this.deltatIsValid=false;
      if (keepDate) {
        this.jd=this.swe_julday(this.year, this.month, this.day,
                           this.hour, this.calType);
      } else {
        var dt=this.swe_revjul(this.jd,newCalType);
        this.year=dt.year;
        this.month=dt.month;
        this.day=dt.day;
        this.hour=dt.hour;
      }
    }
  }

  /**
  * Update the calendar type according to the Gregorian calendar start
  * date and the date of this object.
  */
  updateCalendarType() {
    this.calType=(this.jdCO<=this.jd?this.SE_GREG_CAL:this.SE_JUL_CAL)
    this.jd=this.swe_julday(this.year, this.month, this.day,
                       this.hour, this.calType)
  }

  /**
  * Sets a new date for this object. The input can be checked, if it is a
  * valid date and can be modified, if not. See parameter "check".
  * @param newYear the year-part of the new date
  * @param newMonth the month-part of the new date [1-12]
  * @param newDay the day-part of the new date [1-31]
  * @param newHour the hour of the new date
  * @param check if true it returns if the date is valid and converts the
  * the date into a valid date
  * @return true, if check==false, or if the date is valid. False otherwise
  */
  setDate(newYear, newMonth, newDay, newHour) {
    this.year=newYear
    this.month=newMonth
    this.day=newDay
    this.hour=newHour
    this.deltatIsValid=false
    this.jd=this.swe_julday(this.year, this.month, this.day,
                       this.hour, this.calType)
    return true
  }

  /**
  * Returns the tidal acceleration used in calculations of delta T.<br>
  * Was <code>double swe_get_tid_acc()</code> in the original
  * C sources.
  * @return Tidal acceleration
  */
  getGlobalTidalAcc() {
    return this.tid_acc;
  }

  /* function sets tidal acceleration of the Moon.
   * t_acc can be either
   * - the value of the tidal acceleration in arcsec/cty^2
   * - the DE number of an ephemeris; in this case the tidal acceleration
   *   of the Moon will be set consistent with that ephemeris.
   * - SE_TIDAL_AUTOMATIC, 
   */
  /**
  * @see #setGlobalTidalAcc(double)
  */
  swe_set_tid_acc(t_acc) {
    this.setGlobalTidalAcc(t_acc);
  }

  swi_set_tid_acc(tjd_ut, iflag, denum) {
    this.setGlobalTidalAcc(tjd_ut, iflag, denum);
  }

  /**
  * Sets the tidal acceleration used in calculations of delta T.
  * Corresponds to <code>void swi_set_tid_acc(double, int, int)</code> method in the original
  * C version.
  * @param t_acc tidal acceleration
  * @param iflag
  * @param denum
  * @see #setGlobalTidalAcc(double)
  * @see swisseph.SweConst#SE_TIDAL_DE403
  * @see swisseph.SweConst#SE_TIDAL_DE404
  * @see swisseph.SweConst#SE_TIDAL_DE405
  * @see swisseph.SweConst#SE_TIDAL_DE406
  * @see swisseph.SweConst#SE_TIDAL_DE421
  * @see swisseph.SweConst#SE_TIDAL_DE430
  * @see swisseph.SweConst#SE_TIDAL_DE431
  * @see swisseph.SweConst#SE_TIDAL_DE200
  * @see swisseph.SweConst#SE_TIDAL_26
  * @see swisseph.SweConst#SE_TIDAL_AUTOMATIC
  * @see swisseph.SweConst#SE_TIDAL_DEFAULT
  */
  setGlobalTidalAcc(tjd_ut, iflag, denum) {
    //引数が1つの場合
    if(iflag === undefined){
      var t_acc = tjd_ut;

      if (t_acc == Swe.SE_TIDAL_AUTOMATIC) {
        this.tid_acc = Swe.SE_TIDAL_DEFAULT;
        this.is_tid_acc_manual = false;
        return;
      }
      this.tid_acc = t_acc;
      this.is_tid_acc_manual = true;
      return;
    }

    var xx = new Array(6);
    var tjd_et;
    var retval = 0;
    /* manual tid_acc overrides automatic tid_acc */
    if (this.is_tid_acc_manual)
      return;
    if (denum == 0) {
      if ((iflag & Swe.SEFLG_MOSEPH) != 0) {
        this.tid_acc = Swe.SE_TIDAL_DE404;
        return;
      }
      if (denum == 0) {
        denum = 404; /* DE number of Moshier ephemeris */
      }
    }
    switch(denum) {
      case 200: this.tid_acc = Swe.SE_TIDAL_DE200; break;
      case 403: this.tid_acc = Swe.SE_TIDAL_DE403; break;
      case 404: this.tid_acc = Swe.SE_TIDAL_DE404; break;
      case 405: this.tid_acc = Swe.SE_TIDAL_DE405; break;
      case 406: this.tid_acc = Swe.SE_TIDAL_DE406; break;
      case 421: this.tid_acc = Swe.SE_TIDAL_DE421; break; 
      case 430: this.tid_acc = Swe.SE_TIDAL_DE430; break;
      case 431: this.tid_acc = Swe.SE_TIDAL_DE431; break;
      default: this.tid_acc = Swe.SE_TIDAL_DEFAULT; break;
    }
  }

  /**
  * This method is needed to have a consistent global SwissData object "swed",
  * whose contents may determine the tidal acceleration. Called from the
  * SwissEph constructor only.
  * @param swiss The SwissEph object to be used
  */
  setSwissEphObject(swiss) {
    this.sw = swiss;
  }

  /**
  * Returns the date, calendar type (gregorian / julian), julian day
  * number and the deltaT value of this object.
  * @return Infos about this object
  */
  toString() {
    var hour = getHour();
    var h = (hour<10?" ":"") + Math.floor(hour) + ":";
    hour = 60 * (hour - Math.floor(hour));
    h += (hour<10?"0":"") + Math.floor(hour) + ":";
    hour = 60 * (hour - Math.floor(hour));
    h += (hour<10?"0":"") + hour ;

    return "(YYYY/MM/DD) " +
           this.getYear() + "/" +
           (this.getMonth()<10?"0":"") + this.getMonth() + "/" +
           (this.getDay()<10?"0":"") + this.getDay() + ", " +
           h + "h " +
           (this.getCalendarType()?"(greg)":"(jul)") + "\n" +
           "Jul. Day: " + this.getJulDay() + "; " +
           "DeltaT: " + this.getDeltaT();
  }

/*************** swe_julday ********************************************
 * This function returns the absolute Julian day number (JD)
 * for a given calendar date.
 * The arguments are a calendar date: day, month, year as integers,
 * hour as double with decimal fraction.
 * If gregflag = SE_GREG_CAL (1), Gregorian calendar is assumed,
 * if gregflag = SE_JUL_CAL (0),Julian calendar is assumed.

 The Julian day number is a system of numbering all days continously
 within the time range of known human history. It should be familiar
 to every astrological or astronomical programmer. The time variable
 in astronomical theories is usually expressed in Julian days or
 Julian centuries (36525 days per century) relative to some start day;
 the start day is called 'the epoch'.
 The Julian day number is a double representing the number of
 days since JD = 0.0 on 1 Jan -4712, 12:00 noon (in the Julian calendar).

 Midnight has always a JD with fraction .5, because traditionally
 the astronomical day started at noon. This was practical because
 then there was no change of date during a night at the telescope.
 From this comes also the fact the noon ephemerides were printed
 before midnight ephemerides were introduced early in the 20th century.

 NOTE: The Julian day number must not be confused with the Julian
 calendar system.

 Be aware the we always use astronomical year numbering for the years
 before Christ, not the historical year numbering.
 Astronomical years are done with negative numbers, historical
 years with indicators BC or BCE (before common era).
 Year 0 (astronomical)          = 1 BC
 year -1 (astronomical)         = 2 BC
 etc.

 Original author: Marc Pottenger, Los Angeles.
 with bug fix for year < -4711   15-aug-88 by Alois Treindl
 (The parameter sequence m,d,y still indicates the US origin,
  be careful because the similar function date_conversion() uses
  other parameter sequence and also Astrodienst relative juldate.)

 References: Oliver Montenbruck, Grundlagen der Ephemeridenrechnung,
             Verlag Sterne und Weltraum (1987), p.49 ff

 related functions: swe_revjul() reverse Julian day number: compute the
                               calendar date from a given JD
                    date_conversion() includes test for legal date values
                    and notifies errors like 32 January.
 ****************************************************************/
  swe_julday(year, month, day, hour, calType) {
    var jd, u, u0, u1, u2;
    u = year;
    if (month < 3) { u -=1; }
    u0 = u + 4712.0;
    u1 = month + 1.0;
    if (u1 < 4) { u1 += 12.0; }
    jd = Math.floor(u0*365.25)
       + Math.floor(30.6*u1+0.000001)
       + day + hour/24.0 - 63.5;
    if (calType == this.SE_GREG_CAL) {
      u2 = Math.floor(Math.abs(u) / 100) - Math.floor(Math.abs(u) / 400);
      if (u < 0.0) {
        u2 = -u2;
      }
      jd = jd - u2 + 2;
      if ((u < 0.0) && (u/100 == Math.floor(u/100)) &&
                          (u/400 != Math.floor(u/400))) {
        jd -=1;
      }
    }
    return jd;
  }

  //////////////////////////////////////////////////////////////////////
  // Erzeugt aus einem jd/calType Jahr, Monat, Tag und Stunde.        //
  // It does NOT change any global variables.                         //
  //////////////////////////////////////////////////////////////////////
  swe_revjul (jd, calType) {
    var dt=new IDate();
    var u0,u1,u2,u3,u4;

    u0 = jd + 32082.5;
    if (calType == this.SE_GREG_CAL) {
      u1 = u0 + Math.floor (u0/36525.0) - Math.floor (u0/146100.0) - 38.0;
      if (jd >= 1830691.5) {
        u1 +=1;
      }
      u0 = u0 + Math.floor (u1/36525.0) - Math.floor (u1/146100.0) - 38.0;
    }
    u2 = Math.floor (u0 + 123.0);
    u3 = Math.floor ( (u2 - 122.2) / 365.25);
    u4 = Math.floor ( (u2 - Math.floor (365.25 * u3) ) / 30.6001);
    dt.month = Math.floor(u4 - 1.0);
    if (dt.month > 12) {
      dt.month -= 12;
    }
    dt.day = Math.floor(u2 - Math.floor (365.25 * u3) - Math.floor (30.6001 * u4));
    dt.year = Math.floor(u3 + Math.floor ( (u4 - 2.0) / 12.0) - 4800);
    dt.hour = (jd - Math.floor (jd + 0.5) + 0.5) * 24.0;

    return dt;
  }

  /* returns DeltaT (ET - UT) in days
   * double tjd   =   julian day in UT
   */
  calc_deltaT(tjd) {
    var ans = 0;
    var B, Y, Ygreg, dd;
    var iy;
    var deltat_model = this.swed.astro_models[Swe.SE_MODEL_DELTAT];
    if (deltat_model == 0) deltat_model = Swe.SEMOD_DELTAT_DEFAULT;
    /* read additional values from swedelta.txt */
    /*AS_BOOL use_espenak_meeus = DELTAT_ESPENAK_MEEUS_2006;*/
    Y = 2000.0 + (tjd - SwephData.J2000)/365.25;
    Ygreg = 2000.0 + (tjd - SwephData.J2000)/365.2425;
    /* Before 1633 AD, if the macro DELTAT_ESPENAK_MEEUS_2006 is TRUE: 
     * Polynomials by Espenak & Meeus 2006, derived from Stephenson & Morrison 
     * 2004. 
     * Note, Espenak & Meeus use their formulae only from 2000 BC on.
     * However, they use the long-term formula of Morrison & Stephenson,
     * which can be used even for the remoter past.
     */
    /*if (use_espenak_meeus && tjd < 2317746.13090277789) {*/
    if (deltat_model == Swe.SEMOD_DELTAT_ESPENAK_MEEUS_2006 && tjd < 2317746.13090277789) {
      return this.deltat_espenak_meeus_1620(tjd);
    }
    /* If the macro DELTAT_ESPENAK_MEEUS_2006 is FALSE:
     * Before 1620, we follow Stephenson & Morrsion 2004. For the tabulated 
     * values 1000 BC through 1600 AD, we use linear interpolation.
     */
    if (Y < this.TABSTART) {
      if (Y < this.TAB2_END) {
        return this.deltat_stephenson_morrison_1600(tjd);
      } else {
        /* between 1600 and 1620:
         * linear interpolation between 
         * end of table dt2 and start of table dt */
        if (Y >= this.TAB2_END) { 
          B = this.TABSTART - this.TAB2_END;
          iy = (this.TAB2_END - this.TAB2_START) / this.TAB2_STEP;
          dd = (Y - this.TAB2_END) / B;
          /*ans = dt2[iy] + dd * (dt[0] / 100.0 - dt2[iy]);*/
          ans = this.dt2[iy] + dd * (dt[0] - this.dt2[iy]);
          ans = this.adjust_for_tidacc(ans, Ygreg);
          return ans / 86400.0;
        }
      }
    }
    /* 1620 - today + a few years (tabend):
     * Besselian interpolation from tabulated values in table dt.
     * See AA page K11.
     */
    if (Y >= this.TABSTART) {
      return this.deltat_aa(tjd);
    }
    return ans / 86400.0;
  }

  deltat_aa(tjd) {
    var ans = 0, ans2, ans3;
    var p, B, B2, Y, dd;
    var d = new Array(6);
    var i, iy, k;
    var tabsiz = this.TABSIZ;
    var tabend = this.TABSTART + tabsiz - 1;
    /*Y = 2000.0 + (tjd - J2000)/365.25;*/
    Y = 2000.0 + (tjd - SwephData.J2000)/365.2425;
    if (Y <= tabend) {
      /* Index into the table.
       */
      p = Math.floor(Y);
      iy = Math.floor(p - this.TABSTART);
      /* Zeroth order estimate is value at start of year */
      ans = this.dt[iy];
      k = iy + 1;
      if( k >= tabsiz )
        return this.deltat_aa_label_done(ans, Y); /* No data, can't go on. */
      /* The fraction of tabulation interval */
      p = Y - p;
      /* First order interpolated value */
      ans += p*( this.dt[k] - this.dt[iy]);
      if( (iy-1 < 0) || (iy+2 >= tabsiz) )
        return this.deltat_aa_label_done(ans, Y); /* can't do second differences */
      /* Make table of first differences */
      k = iy - 2;
      for( i=0; i<5; i++ ) {
        if( (k < 0) || (k+1 >= tabsiz) ){
          d[i] = 0;
        }
        else{
          d[i] = this.dt[k+1] - this.dt[k];
        }
        k += 1;
      }
      /* Compute second differences */
      for( i=0; i<4; i++ )
        d[i] = d[i+1] - d[i];
      B = 0.25*p*(p-1.0);
      ans += B*(d[1] + d[2]);

      if( iy+2 >= tabsiz )
        return this.deltat_aa_label_done(ans, Y);
      /* Compute third differences */
      for( i=0; i<3; i++ )
        d[i] = d[i+1] - d[i];
      B = 2.0*B/3.0;
      ans += (p-0.5)*B*d[1];

      if( (iy-2 < 0) || (iy+3 > tabsiz) )
        return this.deltat_aa_label_done(ans, Y);
      /* Compute fourth differences */
      for( i=0; i<2; i++ )
        d[i] = d[i+1] - d[i];
      B = 0.125*B*(p+1.0)*(p-2.0);
      ans += B*(d[0] + d[1]);

      return this.deltat_aa_label_done(ans, Y); /* No data, can't go on. */
    }
    B = 0.01 * (Y - 1820);
    ans = -20 + 31 * B * B;
    /* slow transition from tabulated values to Stephenson formula: */
    if (Y <= tabend+100) {
      B2 = 0.01 * (tabend - 1820);
      ans2 = -20 + 31 * B2 * B2;
      ans3 = this.dt[tabsiz-1];
      dd = (ans2 - ans3);
      ans += dd * (Y - (tabend + 100)) * 0.01;
    }
    return ans / 86400.0;
  }

  deltat_longterm_morrison_stephenson(tjd) {
    var Ygreg =  2000.0 + (tjd - SwephData.J2000)/365.2425;
    var u = (Ygreg  - 1820) / 100.0;
    return (-20 + 32 * u * u);
  }

  deltat_stephenson_morrison_1600(tjd) {
    var ans = 0, ans2, ans3;
    var p, B, dd;
    var tjd0;
    var iy;
    var Y = 2000.0 + (tjd - SwephData.J2000)/365.2425;
    if( Y < this.TAB2_START ) {
      /*B = (Y - LTERM_EQUATION_YSTART) * 0.01;
      ans = -20 + LTERM_EQUATION_COEFF * B * B;*/
      ans = this.deltat_longterm_morrison_stephenson(tjd);
      ans = this.adjust_for_tidacc(ans, Y);
      /* transition from formula to table over 100 years */
      if (Y >= this.TAB2_START - 100) {
        /* starting value of table dt2: */
        ans2 = this.adjust_for_tidacc(dt2[0], this.TAB2_START);
        tjd0 = (this.TAB2_START - 2000) * 365.2425 + SwephData.J2000;
        ans3 = this.deltat_longterm_morrison_stephenson(tjd0);
        ans3 = this.adjust_for_tidacc(ans3, Y);
        dd = ans3 - ans2;
        B = (Y - (this.TAB2_START - 100)) * 0.01;
        ans = ans - dd * B;
      }
    }
    if (Y >= this.TAB2_START && Y < this.TAB2_END) { 
      var Yjul = 2000 + (tjd - 2451557.5) / 365.25;
      p = Math.floor(Yjul);
      iy = Math.floor((p - this.TAB2_START) / this.TAB2_STEP);
      dd = (Yjul - (this.TAB2_START + this.TAB2_STEP * iy)) / this.TAB2_STEP;
      ans = this.dt2[iy] + (this.dt2[iy+1] - this.dt2[iy]) * dd;
      ans = this.adjust_for_tidacc(ans, Y);
    }
    ans /= 86400.0;
    return ans;
  }

  deltat_espenak_meeus_1620(tjd) {
    var ans = 0;
    var Ygreg;
    var u;
    Ygreg = 2000.0 + (tjd - SwephData.J2000)/365.2425;
    if (Ygreg < -500) {
      ans = this.deltat_longterm_morrison_stephenson(tjd);
    } else if (Ygreg < 500) {
      u = Ygreg / 100.0;
      ans = (((((0.0090316521 * u + 0.022174192) * u - 0.1798452) * u - 5.952053) * u+ 33.78311) * u - 1014.41) * u + 10583.6;
    } else if (Ygreg < 1600) {
      u = (Ygreg - 1000) / 100.0;
      ans = (((((0.0083572073 * u - 0.005050998) * u - 0.8503463) * u + 0.319781) * u + 71.23472) * u - 556.01) * u + 1574.2;
    } else if (Ygreg < 1700) {
      u = Ygreg - 1600;
      ans = 120 - 0.9808 * u - 0.01532 * u * u + u * u * u / 7129.0;
    } else if (Ygreg < 1800) {
      u = Ygreg - 1700;
      ans = (((-u / 1174000.0 + 0.00013336) * u - 0.0059285) * u + 0.1603) * u + 8.83;
    } else if (Ygreg < 1860) {
      u = Ygreg - 1800;
      ans = ((((((0.000000000875 * u - 0.0000001699) * u + 0.0000121272) * u - 0.00037436) * u + 0.0041116) * u + 0.0068612) * u - 0.332447) * u + 13.72;
    } else if (Ygreg < 1900) {
      u = Ygreg - 1860;
      ans = ((((u / 233174.0 - 0.0004473624) * u + 0.01680668) * u - 0.251754) * u + 0.5737) * u + 7.62;
    } else if (Ygreg < 1920) {
      u = Ygreg - 1900;
      ans = (((-0.000197 * u + 0.0061966) * u - 0.0598939) * u + 1.494119) * u -2.79;
    } else if (Ygreg < 1941) {
      u = Ygreg - 1920;
      ans = 21.20 + 0.84493 * u - 0.076100 * u * u + 0.0020936 * u * u * u;
    } else if (Ygreg < 1961) {
      u = Ygreg - 1950;
      ans = 29.07 + 0.407 * u - u * u / 233.0 + u * u * u / 2547.0;
    } else if (Ygreg < 1986) {
      u = Ygreg - 1975;
      ans = 45.45 + 1.067 * u - u * u / 260.0 - u * u * u / 718.0;
    } else if (Ygreg < 2005) {
      u = Ygreg - 2000;
      ans = ((((0.00002373599 * u + 0.000651814) * u + 0.0017275) * u - 0.060374) * u + 0.3345) * u + 63.86;
    }
    ans = this.adjust_for_tidacc(ans, Ygreg);
    ans /= 86400.0;
    return ans;
  }

  deltat_aa_label_done(ans, Y) {
    ans = this.adjust_for_tidacc(ans, Y);
    return ans / 86400.0;
  }

  /* Read delta t values from external file.
   * record structure: year(whitespace)delta_t in 0.01 sec.
   */
  init_dt() {
    return this.TABSIZ;
  }

  /* Astronomical Almanac table is corrected by adding the expression
   *     -0.000091 (ndot + 26)(year-1955)^2  seconds
   * to entries prior to 1955 (AA page K8), where ndot is the secular
   * tidal term in the mean motion of the Moon.
   *
   * Entries after 1955 are referred to atomic time standards and
   * are not affected by errors in Lunar or planetary theory.
   */
  adjust_for_tidacc(ans, Y) {
    var B;
    if( Y < 1955.0 ) {
      B = (Y - 1955.0);
      ans += -0.000091 * (this.tid_acc + 26.0) * B * B;
    }

    return ans;
  }

  /**
  * Sets the year, month, day, hour, calType and jd fields of this
  * SweDate instance.
  */
  initDateFromJD(jd, calType) {
    this.jd=jd;
    this.calType=calType;
    var dt=this.swe_revjul(jd, calType);
    this.year=dt.year;
    this.month=dt.month;
    this.day=dt.day;
    this.hour=dt.hour;
  }

  /**
  * Sets the year, month, day, hour, calType and jd fields of this
  * object.
  */
  setFields(year, month, day, hour, calType) {
    if(calType === undefined){
      var dt=this.swe_revjul(this.jdCO,this.SE_GREG_CAL);
      var calType = this.SE_GREG_CAL;
      if (dt.year > year ||
          (dt.year == year && dt.month > month) ||
          (dt.year == year && dt.month == month && dt.day > day)) {
        calType = this.SE_JUL_CAL;
      }
      this.setFields(year, month, day, hour, calType);
      return
    }

    this.year=year;
    this.month=month;
    this.day=day;
    this.hour=hour;
    this.calType=calType;
    this.jd=this.swe_julday(year, month, day, hour, calType);
  }

  /** Transform local time to UTC.
  *
  * For time zones east of Greenwich, d_timezone is positive.
  * For time zones west of Greenwich, d_timezone is negative.
  *
  * @param iyear Year of the input date (UTC)
  * @param imonth Month of the input date (UTC, 1 to 12)
  * @param iday Day of the input date (UTC, 1 to 31)
  * @param ihour Hour of the input date (UTC, 0 to 23)
  * @param imin Minute of the input date (UTC, 0 to 59)
  * @param dsec Second of the input date (UTC, 0.0 to less than 61.0)
  * @param d_timezone Timezone in hours
  * @return The converted date fields
  * @see #getLocalTimeFromUTC(int, int, int, int, int, double, double)
  */
  getUTCFromLocalTime(iyear, imonth, iday, ihour, imin, dsec, d_timezone) {
    return this.getLocalTimeFromUTC(iyear, imonth, iday, ihour, imin, dsec, -d_timezone);
  };

  /* transform local time to UTC or UTC to local time
   *
   * input
   *   iyear ... dsec     date and time
   *   d_timezone   timezone offset
   * output
   *   iyear_out ... dsec_out
   *
   * For time zones east of Greenwich, d_timezone is positive.
   * For time zones west of Greenwich, d_timezone is negative.
   *
   * For conversion from local time to utc, use +d_timezone.
   * For conversion from utc to local time, use -d_timezone.
   */
  /** Transform UTC to local time. This method is identical to
  * the swe_utc_time_zone() method in the original API from
  * AstroDienst Zurich.
  *
  * For time zones east of Greenwich, d_timezone is positive.
  * For time zones west of Greenwich, d_timezone is negative.
  *
  * @param iyear Year of the input date (UTC)
  * @param imonth Month of the input date (UTC, 1 to 12)
  * @param iday Day of the input date (UTC, 1 to 31)
  * @param ihour Hour of the input date (UTC, 0 to 23)
  * @param imin Minute of the input date (UTC, 0 to 59)
  * @param dsec Second of the input date (UTC, 0.0 to less than 61.0)
  * @param d_timezone Timezone in hours. You can use -d_timezone
  * to reverse the conversion, but you may also use the
  * getUTCFromLocalTime() method for this.
  * @return The converted date fields
  * @see #getUTCFromLocalTime(int, int, int, int, int, double, double)
  */
  getLocalTimeFromUTC(iyear, imonth, iday, ihour, imin, dsec, d_timezone) {
    var iyear_out, imonth_out, iday_out, ihour_out, imin_out;
    var dsec_out;
    var tjd, d;
    var have_leapsec = false;
    var dhour;
    if (dsec >= 60.0) {
      have_leapsec = true;
      dsec -= 1.0;
    }
    dhour = ihour + imin / 60.0 + dsec / 3600.0;
    tjd = this.swe_julday(iyear, imonth, iday, 0, this.SE_GREG_CAL);
    dhour -= d_timezone;
    if (dhour < 0.0) {
      tjd -= 1.0;
      dhour += 24.0;
    }
    if (dhour >= 24.0) {
      tjd += 1.0;
      dhour -= 24.0;
    }
//    swe_revjul(tjd + 0.001, SE_GREG_CAL, iyear_out, imonth_out, iday_out, &d);
    var dt = this.swe_revjul(tjd + 0.001, this.SE_GREG_CAL);
    iyear_out = dt.year;
    imonth_out = dt.month;
    iday_out = dt.day;
    ihour_out = Math.floor(dhour);
    d = (dhour - ihour_out) * 60;
    imin_out = Math.floor(d);
    dsec_out = (d - imin_out) * 60;
    if (have_leapsec) dsec_out += 1.0;
    return new SDate(iyear_out, imonth_out, iday_out, ihour_out, imin_out, dsec_out);
  }

  /* 
    Read additional leap second dates from external file, if given.
   */
  init_leapsec() {
    return NLEAP_SECONDS;
  }

  /**
  * Determines, if the year, month, day, hour, minute and second fields
  * describe a valid date.
  * @param iyear Year of the input date (UTC)
  * @param imonth Month of the input date (UTC, 1 to 12)
  * @param iday Day of the input date (UTC, 1 to 31)
  * @param ihour Hour of the input date (UTC, 0 to 23)
  * @param imin Minute of the input date (UTC, 0 to 59)
  * @param dsec Second of the input date (UTC, 1.0 to less than 61.0)
  * @param gregflag true == Gregorian calendar, false == Julian calendar
  * @return true, if the date is valid, false otherwise.
  */
  isValidUTCDate(iyear, imonth, iday, ihour, imin, dsec, gregflag) {
    return this.getInvalidUTCDateError(iyear, imonth, iday, ihour, imin, dsec, gregflag) == null;
  }

  /**
  * Returns a String error message, if the year, month, day, hour, minute and
  * second fields do not describe a valid date.
  * @param iyear Year of the input date (UTC)
  * @param imonth Month of the input date (UTC, 1 to 12)
  * @param iday Day of the input date (UTC, 1 to 31)
  * @param ihour Hour of the input date (UTC, 0 to 23)
  * @param imin Minute of the input date (UTC, 0 to 59)
  * @param dsec Second of the input date (UTC, 1.0 to less than 61.0)
  * @param gregflag true == Gregorian calendar, false == Julian calendar
  * @return null, if the date is valid, otherwise it returns a message in english, describing the error field.
  */
  getInvalidUTCDateError(iyear, imonth, iday, ihour, imin, dsec, gregflag) {
    var dret = new Array(2);
    var tjd_ut1, tjd_et, tjd_et_1972, dhour, d;
    var iyear2, imonth2, iday2;
    var i, j, ndat, nleap, tabsiz_nleap;
    tjd_ut1 = this.swe_julday(iyear, imonth, iday, 0, gregflag);
    var dt = this.swe_revjul(tjd_ut1, gregflag);

    if (iyear != dt.year || imonth != dt.month || iday != dt.day) {
      return "invalid date: year = " + iyear + ", month = " + imonth + ", day = " + iyear + iday;
    }
    if (ihour < 0 || ihour > 23
     || imin < 0 || imin > 59
     || dsec < 0 || dsec >= 61
     || (dsec >= 60 && (imin < 59 || ihour < 23 || tjd_ut1 < J1972))) {
      return "invalid time: " + ihour + ":" + imin + ":" + dsec;
    }

    tabsiz_nleap = this.init_leapsec();
    ndat = iyear * 10000 + imonth * 100 + iday;

    if (dsec >= 60) {
      j = 0;
      for (i = 0; i < tabsiz_nleap; i++) {
        if (ndat == this.leap_seconds[i]) {
          j = 1;
          break;
        }
      }
      if (j != 1) {
        return "invalid time (no leap second!): " + ihour + ":" + imin + ":" + dsec;
      }
    }
    return null;
  }

  /**
  * Calculates the julian day numbers (TT (==ET) and UT1) from a given date.
  * @param iyear Year of the input date (UTC)
  * @param imonth Month of the input date (UTC, 1 to 12)
  * @param iday Day of the input date (UTC, 1 to 31)
  * @param ihour Hour of the input date (UTC, 0 to 23)
  * @param imin Minute of the input date (UTC, 0 to 59)
  * @param dsec Second of the input date (UTC, 1.0 to less than 61.0)
  * @param gregflag true == Gregorian calendar, false == Julian calendar
  * @param checkValidInput if true, throws SwissephException, when any of month,
  * day, hour, minute or second are out of their valid ranges. If false, it
  * doesn't care about invalid values (e.g. month = 13 or second = 61, even
  * though there is no leap second on that date and time).
  * @return an array of two doubles<br>
  *         first value = Julian day number TT (ET)<br>
  *         second value = Julian day number UT1<p>
  *
  * Note:<pre>
  * - Before 1972, swe_utc_to_jd() treats its input time as UT1.
  *   Note: UTC was introduced in 1961. From 1961 - 1971, the length of the
  *   UTC second was regularly changed, so that UTC remained very close to UT1.
  * - From 1972 on, input time is treated as UTC.
  * - If delta_t - nleap - 32.184 &gt; 1, the input time is treated as UT1.
  *   Note: Like this we avoid errors greater than 1 second in case that
  *   the leap seconds table (or the Swiss Ephemeris version) is not updated
  *   for a long time.</pre>
  * @see #getUTCfromJDET(double, boolean)
  * @see #getUTCfromJDUT1(double, boolean)
  * @see #SE_GREG_CAL
  * @see #SE_JUL_CAL
  */
  /*
   * Input:  Clock time UTC, year, month, day, hour, minute, second (decimal).
   *         gregflag  Calendar flag
   *         serr      error string
   * Output: An array of doubles:
   *         dret[0] = Julian day number TT (ET)
   *         dret[1] = Julian day number UT1
   *
   * Function returns OK or Error.
   *
   * - Before 1972, swe_utc_to_jd() treats its input time as UT1.
   *   Note: UTC was introduced in 1961. From 1961 - 1971, the length of the
   *   UTC second was regularly changed, so that UTC remained very close to UT1.
   * - From 1972 on, input time is treated as UTC.
   * - If delta_t - nleap - 32.184 > 1, the input time is treated as UT1.
   *   Note: Like this we avoid errors greater than 1 second in case that
   *   the leap seconds table (or the Swiss Ephemeris version) is not updated
   *   for a long time.
  */
  getJDfromUTC(iyear, imonth, iday, ihour, imin, dsec, gregflag, checkValidInput) {
    var dret = new Array(2);
    var tjd_ut1, tjd_et, tjd_et_1972, dhour, d;
    var i, j, ndat, nleap, tabsiz_nleap;

    if (checkValidInput) {
      var err = this.getInvalidUTCDateError(iyear, imonth, iday, ihour, imin, dsec, gregflag);
      if (err != null) {
        tjd_ut1 = this.swe_julday(iyear, imonth, iday, ihour+imin/60.+dsec/3600., gregflag);
        throw new SwissephException(tjd_ut1, SwissephException.INVALID_DATE, err);
      }
    }
    tjd_ut1 = this.swe_julday(iyear, imonth, iday, 0, gregflag);
    dhour = ihour + imin / 60.0 + dsec / 3600.0;

    if (tjd_ut1 < J1972) {
      dret[1] = this.swe_julday(iyear, imonth, iday, dhour, gregflag);
      dret[0] = dret[1] + this.getDeltaT(dret[1]);
      return dret;
    }

    if (gregflag == this.SE_JUL_CAL) {
      gregflag = this.SE_GREG_CAL;
      var dt = this.swe_revjul(tjd_ut1, gregflag);
    }

    tabsiz_nleap = init_leapsec();
    nleap = this.NLEAP_INIT;
    ndat = iyear * 10000 + imonth * 100 + iday;
    for (i = 0; i < tabsiz_nleap; i++) {
      if (ndat <= this.leap_seconds[i])
        break;
      nleap++;
    }

    d = this.getDeltaT(tjd_ut1) * 86400.0;
    if (d - nleap - 32.184 >= 1.0) {
      dret[1] = tjd_ut1 + dhour / 24.0;
      dret[0] = dret[1] + this.getDeltaT(dret[1]);
      return dret;
    }
    /*
     * convert UTC to ET and UT1
     */
    /* the number of days between input date and 1 jan 1972: */
    d = tjd_ut1 - J1972;
    /* SI time since 1972, ignoring leap seconds: */
    d += ihour / 24.0 + imin / 1440.0 + dsec / 86400.0;
    /* ET (TT) */
    tjd_et_1972 = J1972 + (32.184 + this.NLEAP_INIT) / 86400.0;
    tjd_et = tjd_et_1972 + d + ((nleap - this.NLEAP_INIT)) / 86400.0;
    d = this.getDeltaT(tjd_et);
    tjd_ut1 = tjd_et - this.getDeltaT(tjd_et - d);
    tjd_ut1 = tjd_et - this.getDeltaT(tjd_ut1);
    dret[0] = tjd_et;
    dret[1] = tjd_ut1;
    return dret;
  }

  /**
  * Calculates the UTC date from ET Julian day number.
  * @param tjd_et Julian day number (ET) to be converted.
  * @param gregflag true == Gregorian calendar, false == Julian calendar
  * @return The UTC date as SDate object.
  *
  * Note:<pre>
  * - Before 1 jan 1972 UTC, output UT1.
  *   Note: UTC was introduced in 1961. From 1961 - 1971, the length of the
  *   UTC second was regularly changed, so that UTC remained very close to UT1.
  * - From 1972 on, output is UTC.
  * - If delta_t - nleap - 32.184 &gt; 1, the output is UT1.
  *   Note: Like this we avoid errors greater than 1 second in case that
  *   the leap seconds table (or the Swiss Ephemeris version) has not been
  *   updated for a long time.</pre>
  * @see #getUTCfromJDUT1(double, boolean)
  * @see swisseph.SDate
  * @see #SE_GREG_CAL
  * @see #SE_JUL_CAL
  */
  /*
   * Input:  tjd_et   Julian day number, terrestrial time (ephemeris time).
   *         gregfalg Calendar flag
   * Output: UTC year, month, day, hour, minute, second (decimal).
   *
   * - Before 1 jan 1972 UTC, output UT1.
   *   Note: UTC was introduced in 1961. From 1961 - 1971, the length of the
   *   UTC second was regularly changed, so that UTC remained very close to UT1.
   * - From 1972 on, output is UTC.
   * - If delta_t - nleap - 32.184 > 1, the output is UT1.
   *   Note: Like this we avoid errors greater than 1 second in case that
   *   the leap seconds table (or the Swiss Ephemeris version) has not been
   *   updated for a long time.
   */
  getUTCfromJDET(tjd_et, gregflag) {
    var i;
    var second_60 = 0;
    var iyear, imonth, iday, ihour, imin, iyear2, imonth2, iday2, nleap, ndat, tabsiz_nleap;
    var dsec, d, tjd, tjd_et_1972, tjd_ut;
    var dret = new Array(10);
    /*
     * if tjd_et is before 1 jan 1972 UTC, return UT1
     */
    tjd_et_1972 = J1972 + (32.184 + NLEAP_INIT) / 86400.0;
    d = getDeltaT(tjd_et);
    tjd_ut = tjd_et - this.getDeltaT(tjd_et - d);
    tjd_ut = tjd_et - this.getDeltaT(tjd_ut);

    if (tjd_et < tjd_et_1972) {
      var dt=this.swe_revjul(tjd_ut, gregflag);
      return new SDate(dt.year, dt.month, dt.day, dt.hour);
    }

    tabsiz_nleap = this.init_leapsec();
    var dt=this.swe_revjul(tjd_ut-1, this.SE_GREG_CAL);
    iyear2 = dt.year;
    imonth2 = dt.month;
    iday2 = dt.day;
    d = dt.hour;
    ndat = iyear2 * 10000 + imonth2 * 100 + iday2;
    nleap = 0;
    for (i = 0; i < tabsiz_nleap; i++) {
      if (ndat <= this.leap_seconds[i])
        break;
      nleap++;
    }
    /* date of potentially missing leapsecond */
    if (nleap < tabsiz_nleap) {
      i = this.leap_seconds[nleap];
      iyear2 = i / 10000;
      imonth2 = (i % 10000) / 100;;
      iday2 = i % 100;
      tjd = this.swe_julday(iyear2, imonth2, iday2, 0, this.SE_GREG_CAL);

      dt=this.swe_revjul(tjd_ut+1, this.SE_GREG_CAL);
      iyear2 = dt.year;
      imonth2 = dt.month;
      iday2 = dt.day;
      d = dt.hour;
      dret = this.getJDfromUTC(iyear2,imonth2,iday2, 0, 0, 0, this.SE_GREG_CAL, false);
      d = tjd_et - dret[0];
      if (d >= 0) {
        nleap++;
      } else if (d < 0 && d > -1.0/86400.0) {
        second_60 = 1;
      }
    }

    tjd = J1972 + (tjd_et - tjd_et_1972) - (nleap + second_60) / 86400.0;

    dt=this.swe_revjul(tjd, this.SE_GREG_CAL);
    iyear = dt.year;
    imonth = dt.month;
    iday = dt.day;
    d = dt.hour;
    ihour = Math.floor(d);
    d -= ihour;
    d *= 60;
    imin = Math.floor(d);
    dsec = (d - imin) * 60.0 + second_60;

    d = this.getDeltaT(tjd_et);
    d = this.getDeltaT(tjd_et - d);
    if (d * 86400.0 - (nleap + this.NLEAP_INIT) - 32.184 >= 1.0) {

      dt=this.swe_revjul(tjd_et - d, this.SE_GREG_CAL);
      iyear = dt.year;
      imonth = dt.month;
      iday = dt.day;
      d = dt.hour;
      ihour = Math.floor(d);
      d -= ihour;
      d *= 60;
      imin = Math.floor(d);
      dsec = (d - imin) * 60.0;
    }
    if (gregflag == this.SE_JUL_CAL) {
      tjd = this.swe_julday(iyear, imonth, iday, 0, this.SE_GREG_CAL);

      dt=this.swe_revjul(tjd, this.SE_GREG_CAL);
      return new SDate(dt.year, dt.month, dt.day, dt.hour);
    }
    return new SDate(iyear, imonth, iday, ihour, imin, dsec);
  }

  /**
  * Calculates the UTC date from UT1 (universal time) Julian day number.
  * @param tjd_ut Julian day number (UT1) to be converted.
  * @param gregflag true == Gregorian calendar, false == Julian calendar
  * @return The UTC date as SDate object.
  *
  * Note:<pre>
  * - Before 1 jan 1972 UTC, output UT1.
  *   Note: UTC was introduced in 1961. From 1961 - 1971, the length of the
  *   UTC second was regularly changed, so that UTC remained very close to UT1.
  * - From 1972 on, output is UTC.
  * - If delta_t - nleap - 32.184 &gt; 1, the output is UT1.
  *   Note: Like this we avoid errors greater than 1 second in case that
  *   the leap seconds table (or the Swiss Ephemeris version) has not been
  *   updated for a long time.</pre>
  * @see #getUTCfromJDET(double, boolean)
  * @see swisseph.SDate
  * @see #SE_GREG_CAL
  * @see #SE_JUL_CAL
  */
  /*
   * Input:  tjd_ut   Julian day number, universal time (UT1).
   *         gregfalg Calendar flag
   * Output: UTC year, month, day, hour, minute, second (decimal).
   *
   * - Before 1 jan 1972 UTC, output UT1.
   *   Note: UTC was introduced in 1961. From 1961 - 1971, the length of the
   *   UTC second was regularly changed, so that UTC remained very close to UT1.
   * - From 1972 on, output is UTC.
   * - If delta_t - nleap - 32.184 > 1, the output is UT1.
   *   Note: Like this we avoid errors greater than 1 second in case that
   *   the leap seconds table (or the Swiss Ephemeris version) has not been
   *   updated for a long time.
   */
  getUTCfromJDUT1(tjd_ut, gregflag) {
    var tjd_et = tjd_ut + this.getDeltaT(tjd_ut);
    return this.getUTCfromJDET(tjd_et, gregflag);
  }
};
