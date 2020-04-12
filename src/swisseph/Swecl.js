/*
  Pluto.js version 0.1

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
/*
   This is a port of the Swiss Ephemeris Free Edition, Version 2.00.00
   of Astrodienst AG, Switzerland from the original C Code to Java. For
   copyright see the original copyright notices below and additional
   copyright notes in the file named LICENSE, or - if this file is not
   available - the copyright notes at http://www.astro.com/swisseph/ and
   following. 

   Thomas Mack, mack@ifis.cs.tu-bs.de, 23rd of April 2001

*/
/* SWISSEPH
   $Header: /home/dieter/sweph/RCS/swecl.c,v 1.75 2008/08/26 07:23:27 dieter Exp $

    Ephemeris computations
    Author: Dieter Koch

************************************************************/
/* Copyright (C) 1997 - 2008 Astrodienst AG, Switzerland.  All rights reserved.

  License conditions
  ------------------

  This file is part of Swiss Ephemeris.

  Swiss Ephemeris is distributed with NO WARRANTY OF ANY KIND.  No author
  or distributor accepts any responsibility for the consequences of using it,
  or for whether it serves any particular purpose or works at all, unless he
  or she says so in writing.

  Swiss Ephemeris is made available by its authors under a dual licensing
  system. The software developer, who uses any part of Swiss Ephemeris
  in his or her software, must choose between one of the two license models,
  which are
  a) GNU public license version 2 or later
  b) Swiss Ephemeris Professional License

  The choice must be made before the software developer distributes software
  containing parts of Swiss Ephemeris to others, and before any public
  service using the developed software is activated.

  If the developer choses the GNU GPL software license, he or she must fulfill
  the conditions of that license, which includes the obligation to place his
  or her whole software project under the GNU GPL or a compatible license.
  See http://www.gnu.org/licenses/old-licenses/gpl-2.0.html

  If the developer choses the Swiss Ephemeris Professional license,
  he must follow the instructions as found in http://www.astro.com/swisseph/
  and purchase the Swiss Ephemeris Professional Edition from Astrodienst
  and sign the corresponding license contract.

  The License grants you the right to use, copy, modify and redistribute
  Swiss Ephemeris, but only under certain conditions described in the License.
  Among other things, the License requires that the copyright notices and
  this notice be preserved on all copies.

  Authors of the Swiss Ephemeris: Dieter Koch and Alois Treindl

  The authors of Swiss Ephemeris have no control or influence over any of
  the derived works, i.e. over software or services created by other
  programmers which use Swiss Ephemeris functions.

  The names of the authors or of the copyright holder (Astrodienst) must not
  be used for promoting any software, product or service which uses or contains
  the Swiss Ephemeris. This copyright notice is the ONLY place where the
  names of the authors can legally appear, except in cases where they have
  given special permission in writing.

  The trademarks 'Swiss Ephemeris' and 'Swiss Ephemeris inside' may be used
  for promoting such software, products or services.
*/
/* start */
/**
* This class initiates the calculation of solar and lunar eclipses, of
* sun risetime and time of sunset, and lastly the calculation of the
* phenomena phase angle, phase, elongation of planet, apparent diameter
* of disc and apparent magnitude of the sun, moon, any planet or asteroid.<BR>
*
* <P><I><B>You will find the complete documentation for the original
* SwissEphemeris package at <A HREF="http://www.astro.ch/swisseph/sweph_g.htm">
* http://www.astro.ch/swisseph/sweph_g.htm</A>. By far most of the information 
* there is directly valid for this port to Java as well.</B></I>
*/
class Swecl{
  constructor(sw, sl, sm, swed){
    this.sw=sw;
    this.sl=sl;
    this.swed=swed;
    if (sw===undefined) { this.sw=new SwissEph(); }
    if (sl===undefined) { this.sl=new SwissLib(); }
    if (swed===undefined) { this.swed = Swe.SwissData; }

    this.const_lapse_rate = Swe.SwephData.SE_LAPSE_RATE;  /* for refraction */
    this.sd = new SweDate();

    this.EULER=2.718281828459;
    this.NMAG_ELEM=Swe.SE_VESTA + 1;

    this.mag_elem = new Array(
                    /* DTV-Atlas Astronomie, p. 32 */
                    [-26.86, 0, 0, 0],
                    [-12.55, 0, 0, 0],
                    /* IAU 1986 */
                    [-0.42, 3.80, -2.73, 2.00],
                    [-4.40, 0.09, 2.39, -0.65],
                    [- 1.52, 1.60, 0, 0],   /* Mars */
                    [- 9.40, 0.5, 0, 0],    /* Jupiter */
                    [- 8.88, -2.60, 1.25, 0.044],   /* Saturn */
                    [- 7.19, 0.0, 0, 0],    /* Uranus */
                    [- 6.87, 0.0, 0, 0],    /* Neptune */
                    [- 1.00, 0.0, 0, 0],    /* Pluto */
                    [99, 0, 0, 0],          /* nodes and apogees */
                    [99, 0, 0, 0],
                    [99, 0, 0, 0],
                    [99, 0, 0, 0],
                    [99, 0, 0, 0],          /* Earth */
                    /* from Bowell data base */
                    [6.5, 0.15, 0, 0],      /* Chiron */
                    [7.0, 0.15, 0, 0],      /* Pholus */
                    [3.34, 0.12, 0, 0],     /* Ceres */
                    [4.13, 0.11, 0, 0],     /* Pallas */
                    [5.33, 0.32, 0, 0],     /* Juno */
                    [3.20, 0.32, 0, 0],     /* Vesta */
                    );

    this.el_node = new Array(
      [ 48.330893,  1.1861890,  0.00017587,  0.000000211,], /* Mercury */
      [ 76.679920,  0.9011190,  0.00040665, -0.000000080,], /* Venus   */
      [  0       ,  0        ,  0         ,  0          ,], /* Earth   */
      [ 49.558093,  0.7720923,  0.00001605,  0.000002325,], /* Mars    */
      [100.464441,  1.0209550,  0.00040117,  0.000000569,], /* Jupiter */
      [113.665524,  0.8770970, -0.00012067, -0.000002380,], /* Saturn  */
      [ 74.005947,  0.5211258,  0.00133982,  0.000018516,], /* Uranus  */
      [131.784057,  1.1022057,  0.00026006, -0.000000636,], /* Neptune */
      );
    this.el_peri = new Array(
      [ 77.456119,  1.5564775,  0.00029589,  0.000000056,], /* Mercury */
      [131.563707,  1.4022188, -0.00107337, -0.000005315,], /* Venus   */
      [102.937348,  1.7195269,  0.00045962,  0.000000499,], /* Earth   */
      [336.060234,  1.8410331,  0.00013515,  0.000000318,], /* Mars    */
      [ 14.331309,  1.6126668,  0.00103127, -0.000004569,], /* Jupiter */
      [ 93.056787,  1.9637694,  0.00083757,  0.000004899,], /* Saturn  */
      [173.005159,  1.4863784,  0.00021450,  0.000000433,], /* Uranus  */
      [ 48.123691,  1.4262677,  0.00037918, -0.000000003,], /* Neptune */
      );
    this.el_incl = new Array(
      [  7.004986,  0.0018215, -0.00001809,  0.000000053,], /* Mercury */
      [  3.394662,  0.0010037, -0.00000088, -0.000000007,], /* Venus   */
      [  0,         0,          0,           0          ,], /* Earth   */
      [  1.849726, -0.0006010,  0.00001276, -0.000000006,], /* Mars    */
      [  1.303270, -0.0054966,  0.00000465, -0.000000004,], /* Jupiter */
      [  2.488878, -0.0037363, -0.00001516,  0.000000089,], /* Saturn  */
      [  0.773196,  0.0007744,  0.00003749, -0.000000092,], /* Uranus  */
      [  1.769952, -0.0093082, -0.00000708,  0.000000028,], /* Neptune */
      );
    this.el_ecce = new Array(
      [  0.20563175,  0.000020406, -0.0000000284, -0.00000000017,], /* Mercury */
      [  0.00677188, -0.000047766,  0.0000000975,  0.00000000044,], /* Venus   */
      [  0.01670862, -0.000042037, -0.0000001236,  0.00000000004,], /* Earth   */
      [  0.09340062,  0.000090483, -0.0000000806, -0.00000000035,], /* Mars    */
      [  0.04849485,  0.000163244, -0.0000004719, -0.00000000197,], /* Jupiter */
      [  0.05550862, -0.000346818, -0.0000006456,  0.00000000338,], /* Saturn  */
      [  0.04629590, -0.000027337,  0.0000000790,  0.00000000025,], /* Uranus  */
      [  0.00898809,  0.000006408, -0.0000000008, -0.00000000005,], /* Neptune */
      );
    this.el_sema = new Array(
      [  0.387098310,  0.0,  0.0,  0.0,], /* Mercury */
      [  0.723329820,  0.0,  0.0,  0.0,], /* Venus   */
      [  1.000001018,  0.0,  0.0,  0.0,], /* Earth   */
      [  1.523679342,  0.0,  0.0,  0.0,], /* Mars    */
      [  5.202603191,  0.0000001913,  0.0,  0.0,], /* Jupiter */
      [  9.554909596,  0.0000021389,  0.0,  0.0,], /* Saturn  */
      [ 19.218446062, -0.0000000372,  0.00000000098,  0.0,], /* Uranus  */
      [ 30.110386869, -0.0000001663,  0.00000000069,  0.0,], /* Neptune */
      );
    /* Ratios of mass of Sun to masses of the planets */
    this.plmass = new Array(
        6023600,        /* Mercury */
         408523.5,      /* Venus */
         328900.5,      /* Earth and Moon */
        3098710,        /* Mars */
           1047.350,    /* Jupiter */
           3498.0,      /* Saturn */
          22960,        /* Uranus */
          19314,        /* Neptune */
      130000000,        /* Pluto */
    );

    this.ipl_to_elem = [2, 0, 0, 1, 3, 4, 5, 6, 7, 0, 0, 0, 0, 0, 2,];

  }

  log10(x) { return Math.log(x)/this.lnlog; }

  swe_azalt(tjd_ut, calc_flag, geopos, atpress, attemp, xin, xaz) {
    var i;
    var x = new Array(6);
    var xra = new Array(3);
    var armc = this.sl.swe_degnorm(this.sl.swe_sidtime(tjd_ut) * 15 + geopos[0]);
    var mdd, eps_true, tjd_et;
    for (i = 0; i < 2; i++)
      xra[i] = xin[i];
    xra[2] = 1;
    if (calc_flag == Swe.SE_ECL2HOR) {
          tjd_et = tjd_ut + this.sd.getDeltaT(tjd_ut);
      this.sw.swe_calc(tjd_et, Swe.SE_ECL_NUT, 0, x, null);
      eps_true = x[0];
          this.sl.swe_cotrans(xra, 0, xra, 0, -eps_true);
    }
    mdd = this.sl.swe_degnorm(xra[0] - armc);
    x[0] = this.sl.swe_degnorm(mdd - 90);
    x[1] = xra[1];
    x[2] = 1;
    /* azimuth from east, counterclock */
    this.sl.swe_cotrans(x, 0, x, 0, 90 - geopos[1]);
    /* azimuth from south to west */
    x[0] = this.sl.swe_degnorm(x[0] + 90);
    xaz[0] = 360 - x[0];
    xaz[1] = x[1];                /* true height */
    if (atpress == 0) {
      /* estimate atmospheric pressure */
      atpress = 1013.25 * Math.pow(1 - 0.0065 * geopos[2] / 288, 5.255);
    }
    xaz[2] = this.swe_refrac_extended(x[1], geopos[2], atpress, attemp, this.const_lapse_rate, Swe.SE_TRUE_TO_APP, null);
  }

  swe_azalt_rev(tjd_ut, calc_flag, geopos, xin, xout) {
    var i;
    var x = new Array(6), xaz = new Array(3);
    var geolon = geopos[0];
    var geolat = geopos[1];
    var armc = this.sl.swe_degnorm(this.sl.swe_sidtime(tjd_ut) * 15 + geolon);
    var eps_true, tjd_et, dang;
    for (i = 0; i < 2; i++)
      xaz[i] = xin[i];
    xaz[2] = 1;
    /* azimuth is from south, clockwise.
     * we need it from east, counterclock */
    xaz[0] = 360 - xaz[0];
    xaz[0] = this.sl.swe_degnorm(xaz[0] - 90);
    /* equatorial positions */
    dang = geolat - 90;
    this.sl.swe_cotrans(xaz, 0, xaz, 0, dang);
    xaz[0] = this.sl.swe_degnorm(xaz[0] + armc + 90);
    xout[0] = xaz[0];
    xout[1] = xaz[1];
    /* ecliptic positions */
    if (calc_flag == Swe.SE_HOR2ECL) {
      tjd_et = tjd_ut + SweDate.getDeltaT(tjd_ut);
      this.sw.swe_calc(tjd_et, Swe.SE_ECL_NUT, 0, x, null);
      eps_true = x[0];
      this.sl.swe_cotrans(xaz, 0, x, 0, eps_true);
      xout[0] = x[0];
      xout[1] = x[1];
    }
  }

  swe_refrac(inalt, atpress, attemp, calc_flag) {
    var  a, refr;
    var  pt_factor = atpress / 1010.0 * 283.0 / (273.0 + attemp);
    var  trualt, appalt;

    /* another algorithm, from Meeus, German, p. 114ff.
     */
    if (calc_flag == Swe.SE_TRUE_TO_APP) {
      trualt = inalt;
      if (trualt > 15) {
        a = Math.tan((90 - trualt) * Swe.SwissData.DEGTORAD);
        refr = (58.276 * a - 0.0824 * a * a * a);
        refr *=  pt_factor / 3600.0;
      } else if (trualt > -5) {
        /* the following tan is not defined for a value
         * of trualt near -5.00158 and 89.89158 */
        a = trualt + 10.3 / (trualt + 5.11);
        if (a + 1e-10 >= 90) {
          refr = 0;
        } else {
          refr = 1.02 / Math.tan(a * Swe.SwissData.DEGTORAD);
        }
        refr *= pt_factor / 60.0;
      } else {
        refr = 0;
      }
      appalt = trualt;
      if (appalt + refr > 0) {
        appalt += refr;
      }
      return appalt;
    } else { // SE_TRUE_TO_APP
    /* apparent to true */
      appalt = inalt;
      /* the following tan is not defined for a value
       * of inalt near -4.3285 and 89.9225 */
      a = appalt + 7.31 / (appalt + 4.4);
      if (a + 1e-10 >= 90)
        refr = 0;
      else {
        refr = 1.00 / Math.tan(a * Swe.SwissData.DEGTORAD);
        refr -= 0.06 * Math.sin(14.7 * refr + 13);
      }
      refr *= pt_factor / 60.0;
      trualt = appalt;
      if (appalt - refr > 0)
        trualt = appalt - refr;
      return trualt;
    }
  }

  swe_set_lapse_rate(lapse_rate) {
    this.const_lapse_rate = lapse_rate;
  }

  swe_refrac_extended(inalt, geoalt, atpress, attemp, lapse_rate, calc_flag, dret) {
    var  refr;
    var  trualt;
    var  dip = this.calc_dip(geoalt, atpress, attemp, lapse_rate);
    var  D, D0, N, y, yy0;
    var i;
    /* make sure that inalt <=90 */
    if( (inalt>90) )
      inalt=180-inalt;
    if (calc_flag == Swe.SE_TRUE_TO_APP) {
      if (inalt < -10) {
        if (dret != null && dret.length > 3) {
          dret[0]=inalt;
          dret[1]=inalt;
          dret[2]=0;
          dret[3]=dip;
        }
        return inalt;
      }
      /* by iteration */
      y = inalt;
      D = 0.0;
      yy0 = 0;
      D0 = D;
      for(i=0; i<5; i++) {
        D = this.calc_astronomical_refr(y,atpress,attemp);
        N = y - yy0;
        yy0 = D - D0 - N; /* denominator of derivative */
        if (N != 0.0 && yy0 != 0.0) /* sic !!! code by Moshier */
          N = y - N*(inalt + D - y)/yy0; /* Newton iteration with numerically estimated derivative */
        else /* Can't do it on first pass */
          N = inalt + D;
        yy0 = y;
        D0 = D;
        y = N;
      }
      refr = D;
      if( (inalt + refr < dip) ) {
        if (dret != null) {
          dret[0]=inalt;
          dret[1]=inalt;
          dret[2]=0;
          dret[3]=dip;
        }
        return inalt;
      }
      if (dret != null) {
        dret[0]=inalt;
        dret[1]=inalt+refr;
        dret[2]=refr;
        dret[3]=dip;
      }
      return inalt+refr;
    } else {
      refr = this.calc_astronomical_refr(inalt,atpress,attemp);
      trualt=inalt-refr;
      if (dret != null) {
        if (inalt > dip) {
          dret[0]=trualt;
          dret[1]=inalt;
          dret[2]=refr;
          dret[3]=dip;
        } else {
          dret[0]=inalt;
          dret[1]=inalt;
          dret[2]=0;
          dret[3]=dip;
        }
      }
      if (trualt > dip)
        return trualt;
      else
        return inalt;
    }
  }

  calc_astronomical_refr(inalt, atpress, attemp) {
    var  r;
    if (inalt > 17.904104638432) { /* for continuous function, instead of '>15' */
      r = 0.97 / Math.tan(inalt * Swe.SwissData.DEGTORAD);
    } else {
      r = (34.46 + 4.23 * inalt + 0.004 * inalt * inalt) / (1 + 0.505 * inalt + 0.0845 * inalt * inalt);
    }
    r = ((atpress - 80) / 930 / (1 + 0.00008 * (r + 39) * (attemp - 10)) * r) / 60.0;
    return r;
  }

  calc_dip(geoalt, atpress, attemp, lapse_rate) {
    var  krefr = (0.0342 + lapse_rate) / (0.154 * 0.0238);
    var  d = 1-1.8480*krefr*atpress/(273.16+attemp)/(273.16+attemp);
    return -180.0/Math.PI * Math.acos(1 / (1 + geoalt / Swe.SwephData.EARTH_RADIUS)) * Math.sqrt(d);
  }

  swe_pheno(tjd, ipl, iflag, attr) {
    var i;
    var  xx = new Array(6), xx2 = new Array(6), xxs = new Array(6),
           lbr = new Array(6), lbr2 = new Array(6), dt = 0, dd;
    var  fac;
    var  T, in2, om, sinB, u1, u2, du;
    var  ph1, ph2, me = new Array(2);
    var iflagp, epheflag;
    iflag &= ~(Swe.SEFLG_JPLHOR | Swe.SEFLG_JPLHOR_APPROX);
    /* function calls for Pluto with asteroid number 134340
     * are treated as calls for Pluto as main body SE_PLUTO */
    if (ipl == Swe.SE_AST_OFFSET + 134340) {
      ipl = Swe.SE_PLUTO;
    }
    for (i = 0; i < 20; i++)
      attr[i] = 0;
    /* Ceres - Vesta must be SE_CERES etc., not 10001 etc. */
    if (ipl > Swe.SE_AST_OFFSET && ipl <= Swe.SE_AST_OFFSET + 4) {
      ipl = ipl - Swe.SE_AST_OFFSET - 1 + Swe.SE_CERES;
    }
    iflag = iflag & (Swe.SEFLG_EPHMASK |
                     Swe.SEFLG_TRUEPOS |
                     Swe.SEFLG_J2000 |
                     Swe.SEFLG_NONUT |
                     Swe.SEFLG_NOGDEFL |
                     Swe.SEFLG_NOABERR |
                     Swe.SEFLG_TOPOCTR);
    iflagp = iflag & (Swe.SEFLG_EPHMASK |
                     Swe.SEFLG_TRUEPOS |
                     Swe.SEFLG_J2000 |
                     Swe.SEFLG_NONUT |
                     Swe.SEFLG_NOABERR);
    iflagp |= Swe.SEFLG_HELCTR;
    epheflag = (iflag & Swe.SEFLG_EPHMASK);
    /*
     * geocentric planet
     */
    if (this.sw.swe_calc(tjd, ipl, iflag | Swe.SEFLG_XYZ, xx) ==
                                                                 Swe.ERR) {
      return Swe.ERR;
    }
    if (this.sw.swe_calc(tjd, ipl, iflag, lbr) == Swe.ERR) {
      return Swe.ERR;
    }
    /* if moon, we need sun as well, for magnitude */
    if (ipl == Swe.SE_MOON) {
      if (this.sw.swe_calc(tjd, Swe.SE_SUN, iflag | Swe.SEFLG_XYZ,
                      xxs) == Swe.ERR) {
        return Swe.ERR;
      }
    }
    if (ipl != Swe.SE_SUN && ipl != Swe.SE_EARTH &&
      ipl != Swe.SE_MEAN_NODE && ipl != Swe.SE_TRUE_NODE &&
      ipl != Swe.SE_MEAN_APOG && ipl != Swe.SE_OSCU_APOG) {
      /*
       * light time planet - earth
       */
      dt = lbr[2] * Swe.AUNIT / Swe.SwephData.CLIGHT / 86400.0;
      if ((iflag & Swe.SEFLG_TRUEPOS)!=0) {
        dt = 0;
      }
      /*
       * heliocentric planet at tjd - dt
       */
      if (this.sw.swe_calc(tjd - dt, ipl, iflagp | Swe.SEFLG_XYZ, xx2) ==
                                                                 Swe.ERR) {
        return Swe.ERR;
      }
      if (this.sw.swe_calc(tjd - dt, ipl, iflagp, lbr2) == Swe.ERR) {
        return Swe.ERR;
      }
      /*
       * phase angle
       */
      attr[0] = Math.acos(this.sl.swi_dot_prod_unit(xx, xx2)) * Swe.SwissData.RADTODEG;
      /*
       * phase
       */
      attr[1] = (1 + Math.cos(attr[0] * Swe.SwissData.DEGTORAD)) / 2;
    }
    /*
     * apparent diameter of disk
     */
    if (ipl < Swe.SwephData.NDIAM) {
      dd = Swe.SwephData.pla_diam[ipl];
    } else if (ipl > Swe.SE_AST_OFFSET) {
      dd = this.swed.ast_diam * 1000;        /* km -> m */
    } else {
      dd = 0;
    }
    if (lbr[2] < dd / 2 / Swe.AUNIT) {
      attr[3] = 180;  /* assume position on surface of earth */
    } else {
      attr[3] = Math.asin(dd / 2 / Swe.AUNIT / lbr[2]) * 2 * Swe.SwissData.RADTODEG;
    }
    /*
     * apparent magnitude
     */
    if (ipl > Swe.SE_AST_OFFSET ||
        (ipl < this.NMAG_ELEM && this.mag_elem[ipl][0] < 99)) {
      if (ipl == Swe.SE_SUN) {
        /* ratio apparent diameter : average diameter */
        fac = attr[3] / (Math.asin(Swe.SwephData.pla_diam[Swe.SE_SUN] / 2.0 /
                                            Swe.AUNIT) * 2 * Swe.SwissData.RADTODEG);
        fac *= fac;
        attr[4] = this.mag_elem[ipl][0] - 2.5 * this.log10(fac);
      } else if (ipl == Swe.SE_MOON) {
        /*attr[4] = -21.62 + 5 * this.log10(384410497.8 / EARTH_RADIUS) / this.log10(10) + 0.026 * fabs(attr[0]) + 0.000000004 * pow(attr[0], 4);*/
        attr[4] = -21.62 + 5 * this.log10(lbr[2] * Swe.SwephData.AUNIT / Swe.SwephData.EARTH_RADIUS) / this.log10(10) + 0.026 * Math.abs(attr[0]) + 0.000000004 * Math.pow(attr[0], 4);

        /*printf("1 = %f, 2 = %f\n", mag, mag2);*/
      } else if (ipl == Swe.SE_SATURN) {
        /* rings are considered according to Meeus, German, p. 329ff. */
        T = (tjd - dt - Swe.SwephData.J2000) / 36525.0;
        in2 = (28.075216 - 0.012998 * T + 0.000004 * T * T) * Swe.SwissData.DEGTORAD;
        om = (169.508470 + 1.394681 * T + 0.000412 * T * T) * Swe.SwissData.DEGTORAD;
        sinB = Math.abs(Math.sin(in2) * Math.cos(lbr[1] * Swe.SwissData.DEGTORAD)
                      * Math.sin(lbr[0] * Swe.SwissData.DEGTORAD - om)
                      - Math.cos(in2) * Math.sin(lbr[1] * Swe.SwissData.DEGTORAD));
        u1 = Math.atan2(Math.sin(in2) * Math.tan(lbr2[1] * Swe.SwissData.DEGTORAD)
                               + Math.cos(in2) * Math.sin(lbr2[0] *
                                                          Swe.SwissData.DEGTORAD - om),
                          Math.cos(lbr2[0] * Swe.SwissData.DEGTORAD - om)) *
                                                                 Swe.SwissData.RADTODEG;
        u2 = Math.atan2(Math.sin(in2) * Math.tan(lbr[1] * Swe.SwissData.DEGTORAD)
                        + Math.cos(in2) * Math.sin(lbr[0] * Swe.SwissData.DEGTORAD - om),
                          Math.cos(lbr[0] * Swe.SwissData.DEGTORAD - om)) *
                                                                 Swe.SwissData.RADTODEG;
        du = this.sl.swe_degnorm(u1 - u2);
        if (du > 10) {
          du = 360 - du;
        }
        attr[4] = 5 * this.log10(lbr2[2] * lbr[2])
                    + this.mag_elem[ipl][1] * sinB
                    + this.mag_elem[ipl][2] * sinB * sinB
                    + this.mag_elem[ipl][3] * du
                    + this.mag_elem[ipl][0];
      } else if (ipl < Swe.SE_CHIRON) {
        attr[4] = 5 * this.log10(lbr2[2] * lbr[2])
                    + this.mag_elem[ipl][1] * attr[0] /100.0
                    + this.mag_elem[ipl][2] * attr[0] * attr[0] / 10000.0
                    + this.mag_elem[ipl][3] * attr[0] * attr[0] * attr[0] / 1000000.0
                    + this.mag_elem[ipl][0];
      } else if (ipl < this.NMAG_ELEM || ipl > Swe.SE_AST_OFFSET) {/*asteroids*/
        ph1 = Math.pow(this.EULER, -3.33 *
                        Math.pow(Math.tan(attr[0] * Swe.SwissData.DEGTORAD / 2), 0.63));
        ph2 = Math.pow(this.EULER, -1.87 *
                        Math.pow(Math.tan(attr[0] * Swe.SwissData.DEGTORAD / 2), 1.22));
        if (ipl < this.NMAG_ELEM) {    /* main asteroids */
          me[0] = this.mag_elem[ipl][0];
          me[1] = this.mag_elem[ipl][1];
        } else if (ipl == Swe.SE_AST_OFFSET + 1566) {
                    /* Icarus has elements from JPL database */
                  me[0] = 16.9;
                  me[1] = 0.15;
        } else {      /* other asteroids */
          me[0] = this.swed.ast_H;
          me[1] = this.swed.ast_G;
        }
        attr[4] = 5 * this.log10(lbr2[2] * lbr[2])
            + me[0]
            - 2.5 * this.log10((1 - me[1]) * ph1 + me[1] * ph2);
      } else { /* ficticious bodies */
        attr[4] = 0;
      }
    }
    if (ipl != Swe.SE_SUN && ipl != Swe.SE_EARTH) {
      /*
       * elongation of planet
       */
      if (this.sw.swe_calc(tjd, Swe.SE_SUN, iflag | Swe.SEFLG_XYZ,
                      xx2) == Swe.ERR) {
        return Swe.ERR;
      }
      if (this.sw.swe_calc(tjd, Swe.SE_SUN, iflag, lbr2) == Swe.ERR) {
        return Swe.ERR;
      }
      attr[2] = Math.acos(this.sl.swi_dot_prod_unit(xx, xx2)) * Swe.SwissData.RADTODEG;
    }
    /* horizontal parallax */
    if (ipl == Swe.SE_MOON) {
      var  sinhp, xm =  new Array(6);
      /* geocentric horizontal parallax */
      /* Expl.Suppl. to the AA 1984, p.400 */
      if (this.sw.swe_calc(tjd, Math.floor(ipl), epheflag|Swe.SEFLG_TRUEPOS|Swe.SEFLG_EQUATORIAL|Swe.SEFLG_RADIANS, xm) == Swe.ERR)
        /* int cast can be removed when swe_calc() gets int32 ipl definition */
        return Swe.ERR;
      sinhp = Swe.SwephData.EARTH_RADIUS / xm[2] / Swe.SwephData.AUNIT;
      attr[5] = Math.asin(sinhp) / Swe.SwissData.DEGTORAD;
      /* topocentric horizontal parallax */
      if ((iflag & Swe.SEFLG_TOPOCTR) != 0) {
      if (this.sw.swe_calc(tjd, Math.floor(ipl), epheflag|Swe.SEFLG_XYZ|Swe.SEFLG_TOPOCTR, xm) == Swe.ERR)
        return Swe.ERR;
      if (this.sw.swe_calc(tjd, Math.floor(ipl), epheflag|Swe.SEFLG_XYZ, xx) == Swe.ERR)
        return Swe.ERR;
      attr[5] = Math.acos(this.sl.swi_dot_prod_unit(xm, xx)) / Swe.SwissData.DEGTORAD;

      }
    }
    return Swe.OK;
  }
  swe_pheno_ut(tjd_ut, ipl, iflag, attr) {
    this.sd.swi_set_tid_acc(tjd_ut, iflag, 0);
    return this.swe_pheno(tjd_ut + this.sd.getDeltaT(tjd_ut), ipl, iflag, attr);
  }


  find_maximum(y00, y11, y2, dx, dxret, yret) {
    var  a, b, c, x, y;
    c = y11;
    b = (y2 - y00) / 2.0;
    a = (y2 + y00) / 2.0 - c;
    x = -b / 2 / a;
    y = (4 * a * c - b * b) / 4 / a;
    dxret.val = (x - 1) * dx;
    if (yret != null) {
      yret.val = y;
    }
    return Swe.OK;
  }


  find_zero(y00, y11, y2, dx, dxret, dxret2) {
    var  a, b, c, x1, x2;
    c = y11;
    b = (y2 - y00) / 2.0;
    a = (y2 + y00) / 2.0 - c;
    if (b * b - 4 * a * c < 0) {
      return Swe.ERR;
    }
    x1 = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a;
    x2 = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a;
      dxret.val = (x1 - 1) * dx;
      dxret2.val = (x2 - 1) * dx;
    return Swe.OK;
  }

  rdi_twilight(rsmi) {
    var  rdi = 0;
    if ((rsmi & Swe.SE_BIT_CIVIL_TWILIGHT) != 0)
      rdi = 6;
    if ((rsmi & Swe.SE_BIT_NAUTIC_TWILIGHT) != 0)
      rdi = 12;
    if ((rsmi & Swe.SE_BIT_ASTRO_TWILIGHT) != 0)
      rdi = 18;
    return rdi;
  }
  swe_rise_trans(tjd_ut, ipl, starname, epheflag, rsmi, geopos, atpress, attemp, tret) {
    return this.swe_rise_trans_true_hor(tjd_ut, ipl, starname, epheflag, rsmi, geopos, atpress, attemp, 0, tret);
  }

  /* same as swe_rise_trans(), but allows to define the height of the horizon
   * at the point of the rising or setting (horhgt) */  
  swe_rise_trans_true_hor(tjd_ut, ipl, starname, epheflag, rsmi, geopos, atpress, attemp, horhgt, tret) 
  {
    var i, j, k, ii, calc_culm, nculm = -1;
    var  tjd_et = tjd_ut + SweDate.getDeltaT(tjd_ut);
    var  xc = new Array(6);
    var xh = new Array(20);
    for(var i=0; i<20; i++){
      xh[i] = new Array(6);
    }
    var ah = new Array(6);
           aha;
    var  tculm = new Array(4), tcu, tc = new Array(20), h = new Array(20),
           t2 = new Array(6), dc = new Array(6);
    var dtint=new DblObj();
    var dx=new DblObj();
    var  rdi, dd = 0;
    var iflag = epheflag;
    var jmax = 14;
    var  t, te, tt, dt, twohrs = 1.0 / 12.0;
    var  curdist;
    var do_calc_twilight = false;

    var do_fixstar = (starname != null && starname.length() > 0);
    if (geopos[2] < Swe.SwephData.SEI_ECL_GEOALT_MIN || geopos[2] > Swe.SwephData.SEI_ECL_GEOALT_MAX) {
      console.error("location for swe_rise_trans() must be between " + Math.floor(Swe.SwephData.SEI_ECL_GEOALT_MIN) + " and " + Math.floor(Swe.SwephData.SEI_ECL_GEOALT_MAX) + " m above sea");
      return Swe.ERR;
    }
    SweDate.swi_set_tid_acc(tjd_ut, epheflag, 0);  
    /* function calls for Pluto with asteroid number 134340
     * are treated as calls for Pluto as main body SE_PLUTO */
    if (ipl == Swe.SE_AST_OFFSET + 134340) {
      ipl = Swe.SE_PLUTO;
    }
    // xh[0][0] = 0; /* to shut up mint */
    /* allowing SEFLG_NONUT and SEFLG_TRUEPOS speeds it up */
    iflag &= (Swe.SEFLG_EPHMASK | Swe.SEFLG_NONUT | Swe.SEFLG_TRUEPOS);
    tret.val = 0;
    iflag |= (Swe.SEFLG_EQUATORIAL | Swe.SEFLG_TOPOCTR);
    this.sw.swe_set_topo(geopos[0], geopos[1], geopos[2]);

    if ((rsmi & (Swe.SE_CALC_MTRANSIT | Swe.SE_CALC_ITRANSIT))!=0) {
      return this.calc_mer_trans(tjd_ut, ipl, epheflag, rsmi,
                  geopos, starname,
                  tret);
    }
    if ((rsmi & ( Swe.SE_CALC_RISE | Swe.SE_CALC_SET))==0) {
      rsmi |= Swe.SE_CALC_RISE;
    }
    /* twilight calculation */
    if (ipl == Swe.SE_SUN && ((rsmi & (Swe.SE_BIT_CIVIL_TWILIGHT|Swe.SE_BIT_NAUTIC_TWILIGHT|Swe.SE_BIT_ASTRO_TWILIGHT)) != 0)) {
      rsmi |= (Swe.SE_BIT_NO_REFRACTION | Swe.SE_BIT_DISC_CENTER);
      horhgt = -rdi_twilight(rsmi); 
        /* note: twilight is not dependent on height of horizon, so we can
         * use this parameter and define a fictitious height of horizon */
    }
    /* find culmination points within 28 hours from t0 - twohrs.
     * culminations are required in case there are maxima or minima
     * in height slightly above or below the horizon.
     * we do not use meridian transits, because in polar regions
     * the culmination points may considerably deviate from
     * transits. also, there are cases where the moon rises in the
     * western half of the sky for a short time.
     */

    for (ii = 0, t = tjd_ut - twohrs; ii <= jmax; ii++, t += twohrs) {
      tc[ii] = t;

      if (!do_fixstar) {
        te = t + SweDate.getDeltaT(t);
        if (this.sw.swe_calc(te, ipl, iflag, xc) == Swe.ERR) {
          return Swe.ERR;
        }
      }
      /* diameter of object in km */
      if (ii == 0) {
               if ((rsmi & Swe.SE_BIT_DISC_CENTER)!=0) {
          dd = 0;
        } else if (ipl < Swe.SwephData.NDIAM && ipl >= 0) { // added for ArrayOutOfBoundsException
          dd = Swe.SwephData.pla_diam[ipl];
        } else if (ipl > Swe.SE_AST_OFFSET) {
          dd = this.swed.ast_diam * 1000;        /* km -> m */
        } else {
          dd = 0;
        }
      }
      curdist = xc[2];
      if ((rsmi & Swe.SE_BIT_FIXED_DISC_SIZE) != 0) {
        if (ipl == Swe.SE_SUN) {
          curdist = 1.0;
        } else if (ipl == Swe.SE_MOON) {
          curdist = 0.00257;
        }
      }
      /* apparent radius of disc */
      rdi = Math.asin( dd / 2 / Swe.AUNIT / curdist ) * Swe.SwissData.RADTODEG;
      /* true height of center of body */
      this.swe_azalt(t, Swe.SE_EQU2HOR, geopos, atpress, attemp, xc, xh[ii]);
      if ((rsmi & Swe.SE_BIT_DISC_BOTTOM) != 0) {
        /* true height of bottom point of body */
        xh[ii][1] -= rdi;
      } else {
        /* true height of uppermost point of body */
        xh[ii][1] += rdi;
      }
      /* apparent height of uppermost point of body */
      if ((rsmi & Swe.SE_BIT_NO_REFRACTION)!=0) {
        xh[ii][1] -= horhgt;
        h[ii] = xh[ii][1];
      } else {
        this.swe_azalt_rev(t, Swe.SE_HOR2EQU, geopos, xh[ii], xc);
        this.swe_azalt(t, Swe.SE_EQU2HOR, geopos, atpress, attemp, xc, xh[ii]);
        xh[ii][1] -= horhgt;
        xh[ii][2] -= horhgt;
        h[ii] = xh[ii][2];
      }
      calc_culm = 0;
      if (ii > 1) {
        dc[0] = xh[ii-2][1];
        dc[1] = xh[ii-1][1];
        dc[2] = xh[ii][1];
        if (dc[1] > dc[0] && dc[1] > dc[2]) {
          calc_culm = 1;
        }
        if (dc[1] < dc[0] && dc[1] < dc[2]) {
          calc_culm = 2;
        }
      }
      if (calc_culm!=0) {
        dt = twohrs;
        tcu = t - dt;
        find_maximum(dc[0], dc[1], dc[2], dt, dtint, dx);
        tcu += dtint.val + dt;
        dt /= 3;
        for (; dt > 0.0001; dt /= 3) {
          for (i = 0, tt = tcu - dt; i < 3; tt += dt, i++) {
            te = tt + SweDate.getDeltaT(tt);

            if (!do_fixstar) {

              if (this.sw.swe_calc(te, ipl, iflag, xc) == Swe.ERR) {
                return Swe.ERR;
              }

            }

            this.swe_azalt(tt, Swe.SE_EQU2HOR, geopos, atpress, attemp, xc, ah);
      ah[1] -= horhgt;
            dc[i] = ah[1];
          }
          find_maximum(dc[0], dc[1], dc[2], dt, dtint, dx);
          tcu += dtint.val + dt;
        }
        nculm++;
        tculm[nculm] = tcu;
      }
    }
    /* note: there can be a rise or set on the poles, even if
     * there is no culmination. So, we must not leave here
     * in any case. */
    /* insert culminations into array of heights */
    for (i = 0; i <= nculm; i++) {
      for (j = 1; j <= jmax; j++) {
        if (tculm[i] < tc[j]) {
          for (k = jmax; k >= j; k--) {
            tc[k+1] = tc[k];
            h[k+1] = h[k];
          }
          tc[j] = tculm[i];

          if (!do_fixstar) {
            te = tc[j] + SweDate.getDeltaT(tc[j]);
            if (this.sw.swe_calc(te, ipl, iflag, xc) == Swe.ERR) {
              return Swe.ERR;

            }
          }
          curdist = xc[2];
          if ((rsmi & Swe.SE_BIT_FIXED_DISC_SIZE) != 0) {
            if ( ipl == Swe.SE_SUN ) {
              curdist = 1.0;
            } else if (ipl == Swe.SE_MOON) {
              curdist = 0.00257;
            }
          }
          /* apparent radius of disc */
          rdi = Math.asin( dd / 2 / Swe.AUNIT / curdist ) * Swe.SwissData.RADTODEG;
          /* true height of center of body */
          this.swe_azalt(tc[j], Swe.SE_EQU2HOR, geopos, atpress, attemp, xc, ah);
          if ((rsmi & Swe.SE_BIT_DISC_BOTTOM) != 0) {
            /* true height of bottom point of body */
            ah[1] -= rdi;
          } else {
      /* true height of uppermost point of body */
      ah[1] += rdi;
          }
          /* apparent height of uppermost point of body */
          if ((rsmi & Swe.SE_BIT_NO_REFRACTION)!=0) {
      ah[1] -= horhgt;
            h[j] = ah[1];
          } else {
            this.swe_azalt_rev(tc[j], Swe.SE_HOR2EQU, geopos, ah, xc);
            this.swe_azalt(tc[j], Swe.SE_EQU2HOR, geopos, atpress, attemp, xc, ah);
      ah[1] -= horhgt;
      ah[2] -= horhgt;
            h[j] = ah[2];
          }
          jmax++;
          break;
        }
      }
    }
    tret.val = 0;
    /* find points with zero height.
     * binary search */
    for (ii = 1; ii <= jmax; ii++) {
      if (h[ii-1] * h[ii] >= 0) {
        continue;
      }
      if (h[ii-1] < h[ii] && ((rsmi & Swe.SE_CALC_RISE) == 0)) {
        continue;
      }
      if (h[ii-1] > h[ii] && ((rsmi & Swe.SE_CALC_SET) == 0)) {
        continue;
      }
      dc[0] = h[ii-1];
      dc[1] = h[ii];
      t2[0] = tc[ii-1];
      t2[1] = tc[ii];
      for (i = 0; i < 20; i++) {
        t = (t2[0] + t2[1]) / 2;

        if (!do_fixstar) {

          te = t + SweDate.getDeltaT(t);
          if (this.sw.swe_calc(te, ipl, iflag, xc) == Swe.ERR) {
            return Swe.ERR;
          }
        }
        curdist = xc[2];
        if ((rsmi & Swe.SE_BIT_FIXED_DISC_SIZE) != 0) {
          if (ipl == Swe.SE_SUN) {
            curdist = 1.0;
          } else if (ipl == Swe.SE_MOON) {
            curdist = 0.00257;
          }
        }
        /* apparent radius of disc */
        rdi = Math.asin( dd / 2 / Swe.AUNIT / curdist ) * Swe.SwissData.RADTODEG;
        /* true height of center of body */
        this.swe_azalt(t, Swe.SE_EQU2HOR, geopos, atpress, attemp, xc, ah);
        if ((rsmi & Swe.SE_BIT_DISC_BOTTOM) != 0) {
          /* true height of bottom point of body */
          ah[1] -= rdi;
        } else {
    /* true height of uppermost point of body */
    ah[1] += rdi;
        }
        /* apparent height of uppermost point of body */
        if ((rsmi & Swe.SE_BIT_NO_REFRACTION)!=0) {
    ah[1] -= horhgt;
          aha = ah[1];
        } else {
          this.swe_azalt_rev(t, Swe.SE_HOR2EQU, geopos, ah, xc);
          this.swe_azalt(t, Swe.SE_EQU2HOR, geopos, atpress, attemp, xc, ah);
    ah[1] -= horhgt;
    ah[2] -= horhgt;
          aha = ah[2];
        }
        if (aha * dc[0] <= 0) {
          dc[1] = aha;
          t2[1] = t;
        } else {
          dc[0] = aha;
          t2[0] = t;
        }
      }
      if (t > tjd_ut) {
       tret.val = t;
       return Swe.OK;
      }
    }

    console.error("rise or set not found for planet "+ipl);
    return -2; /* no t of rise or set found */
  }


  calc_mer_trans(tjd_ut, ipl, epheflag, rsmi, geopos, starname, tret) {
    var i;
    var  tjd_et = tjd_ut + SweDate.getDeltaT(tjd_ut);
    var  armc, armc0, arxc, x0 = new Array(6), x = new Array(6), t, te;
    var  mdd;
    var iflag = epheflag;
    var do_fixstar = (starname != null && starname.length() > 0);
    iflag &= Swe.SEFLG_EPHMASK;
    tret.val = 0;
    iflag |= (Swe.SEFLG_EQUATORIAL | Swe.SEFLG_TOPOCTR);
    armc0 = this.sl.swe_sidtime(tjd_ut) + geopos[0] / 15;
    if (armc0 >= 24) {
      armc0 -= 24;
    }
    if (armc0 < 0) {
      armc0 += 24;
    }
    armc0 *= 15;
    if (this.sw.swe_calc(tjd_et, ipl, iflag, x0) == Swe.ERR) {
      return Swe.ERR;
    }
    /*
     * meridian transits
     */
    x[0] = x0[0];
    x[1] = x0[1];
    t = tjd_ut;
    arxc = armc0;
    if ((rsmi & Swe.SE_CALC_ITRANSIT)!=0) {
      arxc = this.sl.swe_degnorm(arxc + 180);
    }
    for (var i = 0; i < 4; i++) {
      mdd = this.sl.swe_degnorm(x[0] - arxc);
      if (i > 0 && mdd > 180) {
        mdd -= 360;
      }
      t += mdd / 361;
      armc = this.sl.swe_sidtime(t) + geopos[0] / 15;
      if (armc >= 24) {
        armc -= 24;
      }
      if (armc < 0) {
        armc += 24;
      }
      armc *= 15;

      arxc = armc;
      if ((rsmi & Swe.SE_CALC_ITRANSIT)!=0) {
        arxc = this.sl.swe_degnorm(arxc + 180);
      }
      if (!do_fixstar) {
        te = t + SweDate.getDeltaT(t);
        if (this.sw.swe_calc(te, ipl, iflag, x) == Swe.ERR) {
          return Swe.ERR;
        }
      }
    }
    tret.val = t;
    return Swe.OK;
  }


  swe_nod_aps(tjd_et, ipl, iflag, method, xnasc, xndsc, xperi, xaphe) {
    var ij, i, j;
    var iplx;
    var ipli;
    var istart, iend;
    var iflJ2000;
    var plm;
    var t = (tjd_et - Swe.SwephData.J2000) / 36525, dt;
    var x = new Array(6);
    var xx = new Array(24);
    var xp = new Array(6);
    var xobs = new Array(6);
    var x2000 = new Array(6);
    var xpOffs=0;
    var xpos = new Array(3);
    for(var i=0; i<3; i++){
      xpos[i] = new Array(6).fill(0.0);
    }
    var xnorm = new Array(6);
    var xposm = new Array(6);
    var xn = new Array(3);
    for(var i=0; i<3; i++){
      xn[i] = new Array(6).fill(0.0);
    }
    var xs = new Array(3);
    for(var i=0; i<3; i++){
      xs[i] = new Array(6).fill(0.0);
    }
    var xq = new Array(3);
    for(var i=0; i<3; i++){
      xq[i] = new Array(6).fill(0.0);
    }
    var xa = new Array(3);
    for(var i=0; i<3; i++){
      xa[i] = new Array(6).fill(0.0);
    }

    var xobs2 = new Array(6), x2 = new Array(6);
    var xna, xnd, xpe, xap;
    var xndOffs = 6, xpeOffs = 12, xapOffs = 18;
    var incl, sema, ecce, parg, ea, vincl, vsema, vecce, pargx, eax;
    var pedp = this.swed.pldat[Swe.SwephData.SEI_EARTH];
    var psbdp = this.swed.pldat[Swe.SwephData.SEI_SUNBARY];
    var pldat=new PlanData();
    var xsun = psbdp.x;
    var xear = pedp.x;
    var ep;
    var Gmsm, dzmin;
    var rxy, rxyz, fac, sgn;
    var sinnode, cosnode, sinincl, cosincl, sinu, cosu, sinE, cosE, cosE2;
    var uu, ny, ny2, c2, v2, pp, ro, ro2, rn, rn2;
    var oe;
    var is_true_nodaps = false;
    var do_aberr = (iflag &
                        (Swe.SEFLG_TRUEPOS | Swe.SEFLG_NOABERR))==0;
    var do_defl = (iflag & Swe.SEFLG_TRUEPOS)==0 &&
                      (iflag & Swe.SEFLG_NOGDEFL)==0;
    var do_focal_point = (method & Swe.SE_NODBIT_FOPOINT) != 0;
    var ellipse_is_bary = false;
    var iflg0;
    iflag &= ~(Swe.SEFLG_JPLHOR | Swe.SEFLG_JPLHOR_APPROX);
    /* function calls for Pluto with asteroid number 134340
     * are treated as calls for Pluto as main body SE_PLUTO */
    if (ipl == Swe.SE_AST_OFFSET + 134340) {
      ipl = Swe.SE_PLUTO;
    }
    xna = xx; 
    xnd = xx; // xndOffs = 6; 
    xpe = xx; // xpeOffs = 12; 
    xap = xx; // xapOffs = 18;
    // xpos[0][0] = 0; /* to shut up mint */
    /* to get control over the save area: */
    this.sw.swi_force_app_pos_etc();
    method %= Swe.SE_NODBIT_FOPOINT;
    ipli = ipl;
    if (ipl == Swe.SE_SUN) {
      ipli = Swe.SE_EARTH;
    }
    if (ipl == Swe.SE_MOON) {
      do_defl = false;
      if ((iflag & Swe.SEFLG_HELCTR)==0) {
        do_aberr = false;
      }
    }
    iflg0 = (iflag & (Swe.SEFLG_EPHMASK|Swe.SEFLG_NONUT)) |
            Swe.SEFLG_SPEED | Swe.SEFLG_TRUEPOS;
    if (ipli != Swe.SE_MOON) {
      iflg0 |= Swe.SEFLG_HELCTR;
    }
    if (ipl == Swe.SE_MEAN_NODE || ipl == Swe.SE_TRUE_NODE ||
            ipl == Swe.SE_MEAN_APOG || ipl == Swe.SE_OSCU_APOG ||
            ipl < 0 ||
            (ipl >= Swe.SE_NPLANETS && ipl <= Swe.SE_AST_OFFSET)) {

      console.error("nodes/apsides for planet "+ipl+" are not implemented");

      if (xnasc != null) {
        for (i = 0; i <= 5; i++)
          xnasc[i] = 0;
      }
      if (xndsc != null) {
        for (i = 0; i <= 5; i++)
          xndsc[i] = 0;
      }
      if (xaphe != null) {
        for (i = 0; i <= 5; i++)
          xaphe[i] = 0;
      }
      if (xperi != null) {
        for (i = 0; i <= 5; i++)
          xperi[i] = 0;
      }
      return Swe.ERR;
    }
    for (i = 0; i < 24; i++)
      xx[i] = 0;
    /***************************************
     * mean nodes and apsides
     ***************************************/
    /* mean points only for Sun - Neptune */
    if ((method == 0 || (method & Swe.SE_NODBIT_MEAN)!=0) &&
          ((ipl >= Swe.SE_SUN && ipl <= Swe.SE_NEPTUNE) ||
                                                    ipl == Swe.SE_EARTH)) {
      if (ipl == Swe.SE_MOON) {
//      this.sm.swi_mean_lunar_elements(tjd_et, &xna[0], &xna[3], &xpe[0], &xpe[3]);
        var xna0=new DblObj(); xna0.val=xna[0];
        var xna3=new DblObj(); xna3.val=xna[3];
        var xpe0=new DblObj(); xpe0.val=xpe[0+xpeOffs];
        var xpe3=new DblObj(); xpe3.val=xpe[3+xpeOffs];
        this.sm.swi_mean_lunar_elements(tjd_et, xna0, xna3, xpe0, xpe3);
        xna[0]=xna0.val;
        xna[3]=xna3.val;
        xpe[0+xpeOffs]=xpe0.val;
        xpe[3+xpeOffs]=xpe3.val;
        incl = Swe.SwephData.MOON_MEAN_INCL;
        vincl = 0;
        ecce = Swe.SwephData.MOON_MEAN_ECC;
        vecce = 0;
        sema = Swe.SwephData.MOON_MEAN_DIST / Swe.AUNIT;
        vsema = 0;
      } else {
        iplx = this.ipl_to_elem[ipl];
        ep = this.el_incl[iplx];
        incl = ep[0] + ep[1] * t + ep[2] * t * t + ep[3] * t * t * t;
        vincl = ep[1] / 36525;
        ep = this.el_sema[iplx];
        sema = ep[0] + ep[1] * t + ep[2] * t * t + ep[3] * t * t * t;
        vsema = ep[1] / 36525;
        ep = this.el_ecce[iplx];
        ecce = ep[0] + ep[1] * t + ep[2] * t * t + ep[3] * t * t * t;
        vecce = ep[1] / 36525;
        ep = this.el_node[iplx];
        /* ascending node */
        xna[0] = ep[0] + ep[1] * t + ep[2] * t * t + ep[3] * t * t * t;
        xna[3] = ep[1] / 36525;
        /* perihelion */
        ep = this.el_peri[iplx];
        xpe[0+xpeOffs] = ep[0] + ep[1] * t + ep[2] * t * t + ep[3] * t * t * t;
        xpe[3+xpeOffs] = ep[1] / 36525;
      }
      /* descending node */
      xnd[0+xndOffs] = this.sl.swe_degnorm(xna[0] + 180);
      xnd[3+xndOffs] = xna[3];
      /* angular distance of perihelion from node */
      parg = xpe[0+xpeOffs] = this.sl.swe_degnorm(xpe[0+xpeOffs] - xna[0]);
      pargx = xpe[3+xpeOffs] = this.sl.swe_degnorm(xpe[0+xpeOffs] + xpe[3+xpeOffs]  - xna[3]);
      /* transform from orbital plane to mean ecliptic of date */
      this.sl.swe_cotrans(xpe, xpeOffs, xpe, xpeOffs, -incl);
      /* xpe+3 is aux. position, not speed!!! */
      this.sl.swe_cotrans(xpe, 3+xpeOffs, xpe, 3+xpeOffs, -incl-vincl);
      /* add node again */
      xpe[0+xpeOffs] = this.sl.swe_degnorm(xpe[0+xpeOffs] + xna[0]);
      /* xpe+3 is aux. position, not speed!!! */
      xpe[3+xpeOffs] = this.sl.swe_degnorm(xpe[3+xpeOffs] + xna[0] + xna[3]);
      /* speed */
      xpe[3+xpeOffs] = this.sl.swe_degnorm(xpe[3+xpeOffs] - xpe[0+xpeOffs]);
      /* heliocentric distance of perihelion and aphelion */
      xpe[2+xpeOffs] = sema * (1 - ecce);
      xpe[5+xpeOffs] = (sema + vsema) * (1 - ecce - vecce) - xpe[2+xpeOffs];
      /* aphelion */
      xap[0+xapOffs] = this.sl.swe_degnorm(xpe[xpeOffs] + 180);
      xap[1+xapOffs] = -xpe[1+xpeOffs];
      xap[3+xapOffs] = xpe[3+xpeOffs];
      xap[4+xapOffs] = -xpe[4+xpeOffs];
      if (do_focal_point) {
        xap[2+xapOffs] = sema * ecce * 2;
        xap[5+xapOffs] = (sema + vsema) * (ecce + vecce) * 2 - xap[2+xapOffs];
      } else {
        xap[2+xapOffs] = sema * (1 + ecce);
        xap[5+xapOffs] = (sema + vsema) * (1 + ecce + vecce) - xap[2+xapOffs];
      }
      /* heliocentric distance of nodes */
      ea = Math.atan(Math.tan(-parg * Swe.SwissData.DEGTORAD / 2) *
                                              Math.sqrt((1-ecce)/(1+ecce))) * 2;
      eax = Math.atan(Math.tan(-pargx * Swe.SwissData.DEGTORAD / 2) *
                                  Math.sqrt((1-ecce-vecce)/(1+ecce+vecce))) * 2;
      xna[2] = sema * (Math.cos(ea) - ecce) / Math.cos(parg * Swe.SwissData.DEGTORAD);
      xna[5] = (sema+vsema) * (Math.cos(eax) - ecce - vecce) /
                                                Math.cos(pargx * Swe.SwissData.DEGTORAD);
      xna[5] -= xna[2];
      ea = Math.atan(Math.tan((180 - parg) * Swe.SwissData.DEGTORAD / 2) *
                                              Math.sqrt((1-ecce)/(1+ecce))) * 2;
      eax = Math.atan(Math.tan((180 - pargx) * Swe.SwissData.DEGTORAD / 2) *
                                  Math.sqrt((1-ecce-vecce)/(1+ecce+vecce))) * 2;
      xnd[2+xndOffs] = sema * (Math.cos(ea) - ecce) / Math.cos((180 - parg) * Swe.SwissData.DEGTORAD);
      xnd[5+xndOffs] = (sema+vsema) * (Math.cos(eax) - ecce - vecce) /
                                             Math.cos((180 - pargx) * Swe.SwissData.DEGTORAD);
      xnd[5+xndOffs] -= xnd[2+xndOffs];
      /* no light-time correction because speed is extremely small */
      for (i = 0, xp = xx, xpOffs = 0; i < 4; i++, xpOffs += 6) {
        /* to cartesian coordinates */
        xp[0+xpOffs] *= Swe.SwissData.DEGTORAD;
        xp[1+xpOffs] *= Swe.SwissData.DEGTORAD;
        xp[3+xpOffs] *= Swe.SwissData.DEGTORAD;
        xp[4+xpOffs] *= Swe.SwissData.DEGTORAD;
        this.sl.swi_polcart_sp(xp, xpOffs, xp, xpOffs);
      }
    /***************************************
     * "true" or osculating nodes and apsides
     ***************************************/
    } else {
      /* first, we need a heliocentric distance of the planet */
      if (this.sw.swe_calc(tjd_et, ipli, iflg0, x) == Swe.ERR) {
        return Swe.ERR;
      }
      iflJ2000 = (iflag & Swe.SEFLG_EPHMASK)|
                 Swe.SEFLG_J2000|
                 Swe.SEFLG_EQUATORIAL|
                 Swe.SEFLG_XYZ|
                 Swe.SEFLG_TRUEPOS|
                 Swe.SEFLG_NONUT|
                 Swe.SEFLG_SPEED;
      ellipse_is_bary = false;
      if (ipli != Swe.SE_MOON) {
        if ((method & Swe.SE_NODBIT_OSCU_BAR)!=0 && x[2] > 6) {
          iflJ2000 |= Swe.SEFLG_BARYCTR; /* only planets beyond Jupiter */
          ellipse_is_bary = true;
        } else {
          iflJ2000 |= Swe.SEFLG_HELCTR;
        }
      }
      /* we need three positions and three speeds
       * for three nodes/apsides. from the three node positions,
       * the speed of the node will be computed. */
      if (ipli == Swe.SE_MOON) {
        dt = Swe.SwephData.NODE_CALC_INTV;
        dzmin = 1e-15;
        Gmsm = Swe.SwephData.GEOGCONST * (1 + 1 / Swe.SwephData.EARTH_MOON_MRAT) /
                            Swe.AUNIT/Swe.AUNIT/Swe.AUNIT*86400.0*86400.0;
      } else {
        if ((ipli >= Swe.SE_MERCURY && ipli <= Swe.SE_PLUTO) ||
                                                   ipli == Swe.SE_EARTH) {
          plm = 1 / this.plmass[this.ipl_to_elem[ipl]];
        } else {
          plm = 0;
        }
        dt = Swe.SwephData.NODE_CALC_INTV * 10 * x[2];
        dzmin = 1e-15 * dt / Swe.SwephData.NODE_CALC_INTV;
        Gmsm = Swe.SwephData.HELGRAVCONST * (1 + plm) /
                            Swe.AUNIT/Swe.AUNIT/Swe.AUNIT*86400.0*86400.0;
      }
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        istart = 0;
        iend = 2;
      } else {
        istart = iend = 0;
        dt = 0;
      }
      for (i = istart, t = tjd_et - dt; i <= iend; i++, t += dt) {
        if (istart == iend) {
          t = tjd_et;
        }
        if (this.sw.swe_calc(t, ipli, iflJ2000, xpos[i]) == Swe.ERR) {
          return Swe.ERR;
        }
        /* the EMB is used instead of the earth */
        if (ipli == Swe.SE_EARTH) {
          if (this.sw.swe_calc(t,
                       Swe.SE_MOON,
                       iflJ2000 & ~(Swe.SEFLG_BARYCTR|Swe.SEFLG_HELCTR),
                       xposm) == Swe.ERR) {
            return Swe.ERR;
          }
          for (j = 0; j <= 2; j++)
            xpos[i][j] += xposm[j] / (Swe.SwephData.EARTH_MOON_MRAT + 1.0);
        }
        this.sw.swi_plan_for_osc_elem(iflg0, t, xpos[i]);
      }
      for (i = istart; i <= iend; i++) {
        if (Math.abs(xpos[i][5]) < dzmin) {
          xpos[i][5] = dzmin;
        }
        fac = xpos[i][2] / xpos[i][5];
        sgn = xpos[i][5] / Math.abs(xpos[i][5]);
        for (j = 0; j <= 2; j++) {
          xn[i][j] = (xpos[i][j] - fac * xpos[i][j+3]) * sgn;
          xs[i][j] = -xn[i][j];
        }
      }
      for (i = istart; i <= iend; i++) {
        /* node */
        rxy =  Math.sqrt(xn[i][0] * xn[i][0] + xn[i][1] * xn[i][1]);
        cosnode = xn[i][0] / rxy;
        sinnode = xn[i][1] / rxy;
        /* inclination */
        this.sl.swi_cross_prod(xpos[i], 0, xpos[i], 3, xnorm, 0);
        rxy =  xnorm[0] * xnorm[0] + xnorm[1] * xnorm[1];
        c2 = (rxy + xnorm[2] * xnorm[2]);
        rxyz = Math.sqrt(c2);
        rxy = Math.sqrt(rxy);
        sinincl = rxy / rxyz;
        cosincl = Math.sqrt(1 - sinincl * sinincl);
        if (xnorm[2] < 0) cosincl = -cosincl; /* retrograde asteroid, e.g. 20461 Dioretsa */
        /* argument of latitude */
        cosu = xpos[i][0] * cosnode + xpos[i][1] * sinnode;
        sinu = xpos[i][2] / sinincl;
        uu = Math.atan2(sinu, cosu);
        /* semi-axis */
        rxyz = Math.sqrt(this.sl.square_sum(xpos[i]));
        v2 = this.sl.square_sum(xpos[i], 3);
        sema = 1 / (2 / rxyz - v2 / Gmsm);
        /* eccentricity */
        pp = c2 / Gmsm;
        ecce = Math.sqrt(1 - pp / sema);
        /* eccentric anomaly */
        cosE = 1 / ecce * (1 - rxyz / sema);
        sinE = 1 / ecce / Math.sqrt(sema * Gmsm) *
                                        this.sw.dot_prod(xpos[i], xpos[i], 3);
        /* true anomaly */
        ny = 2 * Math.atan(Math.sqrt((1+ecce)/(1-ecce)) * sinE / (1 + cosE));
        /* distance of perihelion from ascending node */
        xq[i][0] = this.sl.swi_mod2PI(uu - ny);
        xq[i][1] = 0;                        /* latitude */
        xq[i][2] = sema * (1 - ecce);        /* distance of perihelion */
        /* transformation to ecliptic coordinates */
        this.sl.swi_polcart(xq[i], xq[i]);
        this.sl.swi_coortrf2(xq[i], xq[i], -sinincl, cosincl);
        this.sl.swi_cartpol(xq[i], xq[i]);
        /* adding node, we get perihelion in ecl. coord. */
        xq[i][0] += Math.atan2(sinnode, cosnode);
        xa[i][0] = this.sl.swi_mod2PI(xq[i][0] + Math.PI);
        xa[i][1] = -xq[i][1];
        if (do_focal_point) {
          xa[i][2] = sema * ecce * 2;        /* distance of aphelion */
        } else {
          xa[i][2] = sema * (1 + ecce);        /* distance of aphelion */
        }
        this.sl.swi_polcart(xq[i], xq[i]);
        this.sl.swi_polcart(xa[i], xa[i]);
        /* new distance of node from orbital ellipse:
         * true anomaly of node: */
        ny = this.sl.swi_mod2PI(ny - uu);
        ny2 = this.sl.swi_mod2PI(ny + Math.PI);
        /* eccentric anomaly */
        cosE = Math.cos(2 * Math.atan(Math.tan(ny / 2) /
                                             Math.sqrt((1+ecce) / (1-ecce))));
        cosE2 = Math.cos(2 * Math.atan(Math.tan(ny2 / 2) /
                                             Math.sqrt((1+ecce) / (1-ecce))));
        /* new distance */
        rn = sema * (1 - ecce * cosE);
        rn2 = sema * (1 - ecce * cosE2);
        /* old node distance */
        ro = Math.sqrt(this.sl.square_sum(xn[i]));
        ro2 = Math.sqrt(this.sl.square_sum(xs[i]));
        /* correct length of position vector */
        for (j = 0; j <= 2; j++) {
          xn[i][j] *= rn / ro;
          xs[i][j] *= rn2 / ro2;
        }
      }
      for (i = 0; i <= 2; i++) {
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          xpe[i+xpeOffs] = xq[1][i];
          xpe[i+3+xpeOffs] = (xq[2][i] - xq[0][i]) / dt / 2;
          xap[i+xapOffs] = xa[1][i];
          xap[i+3+xapOffs] = (xa[2][i] - xa[0][i]) / dt / 2;
          xna[i] = xn[1][i];
          xna[i+3] = (xn[2][i] - xn[0][i]) / dt / 2;
          xnd[i+xndOffs] = xs[1][i];
          xnd[i+3+xndOffs] = (xs[2][i] - xs[0][i]) / dt / 2;
        } else {
          xpe[i+xpeOffs] = xq[0][i];
          xpe[i+3+xpeOffs] = 0;
          xap[i+xapOffs] = xa[0][i];
          xap[i+3+xapOffs] = 0;
          xna[i] = xn[0][i];
          xna[i+3] = 0;
          xnd[i+xndOffs] = xs[0][i];
          xnd[i+3+xndOffs] = 0;
        }
      }
      is_true_nodaps = true;
    }
    /* to set the variables required in the save area,
     * i.e. ecliptic, nutation, barycentric sun, earth
     * we compute the planet */
    if (ipli == Swe.SE_MOON &&
        (iflag & (Swe.SEFLG_HELCTR | Swe.SEFLG_BARYCTR))!=0) {
      this.sw.swi_force_app_pos_etc();
      if (this.sw.swe_calc(tjd_et, Swe.SE_SUN, iflg0, x) == Swe.ERR) {
        return Swe.ERR;
      }
    } else {
      if (this.sw.swe_calc(tjd_et, ipli,
                   iflg0 | (iflag & Swe.SEFLG_TOPOCTR), x) ==
                                                                Swe.ERR) {
        return Swe.ERR;
      }
    }
    /***********************
     * position of observer
     ***********************/
    if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
      /* geocentric position of observer */
      if (this.sw.swi_get_observer(tjd_et, iflag, false, xobs) != Swe.OK) {
        return Swe.ERR;
      }
      /*for (i = 0; i <= 5; i++)
        xobs[i] = this.swed.topd.xobs[i];*/
    } else {
      for (i = 0; i <= 5; i++)
        xobs[i] = 0;
    }
    if ((iflag & (Swe.SEFLG_HELCTR | Swe.SEFLG_BARYCTR))!=0) {
      if ((iflag & Swe.SEFLG_HELCTR)!=0 &&
          (iflag & Swe.SEFLG_MOSEPH)==0) {
        for (i = 0; i <= 5; i++)
          xobs[i] = xsun[i];
      }
    } else if (ipl == Swe.SE_SUN && (iflag & Swe.SEFLG_MOSEPH)==0) {
      for (i = 0; i <= 5; i++)
        xobs[i] = xsun[i];
    } else {
      /* barycentric position of observer */
      for (i = 0; i <= 5; i++)
        xobs[i] += xear[i];
    }
    /* ecliptic obliqity */
    if ((iflag & Swe.SEFLG_J2000)!=0) {
      oe = this.swed.oec2000;
    } else {
      oe = this.swed.oec;
    }
    /*************************************************
     * conversions shared by mean and osculating points
     *************************************************/
    for (ij = 0, xp = xx, xpOffs = 0; ij < 4; ij++, xpOffs += 6) {
      /* no nodes for earth */
      if (ipli == Swe.SE_EARTH && ij <= 1) {
        for (i = 0; i <= 5; i++)
              xp[i+xpOffs] = 0;
        continue;
      }
      /*********************
       * to equator
       *********************/
      if (is_true_nodaps && (iflag & Swe.SEFLG_NONUT)==0) {
        this.sl.swi_coortrf2(xp, xpOffs, xp, xpOffs, -this.swed.nut.snut, this.swed.nut.cnut);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.sl.swi_coortrf2(xp, 3+xpOffs, xp, 3+xpOffs, -this.swed.nut.snut, this.swed.nut.cnut);
        }
      }
      this.sl.swi_coortrf2(xp, xpOffs, xp, xpOffs, -oe.seps, oe.ceps);
      this.sl.swi_coortrf2(xp, 3+xpOffs, xp, 3+xpOffs, -oe.seps, oe.ceps);
      if (is_true_nodaps) {
        /****************************
         * to mean ecliptic of date
         ****************************/
        if ((iflag & Swe.SEFLG_NONUT)==0) {
          this.sw.swi_nutate(xp, xpOffs, iflag, true);
        }
      }
      /*********************
       * to J2000
       *********************/
      this.sl.swi_precess(xp, xpOffs, tjd_et, iflag, Swe.SwephData.J_TO_J2000);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.sw.swi_precess_speed(xp, xpOffs, tjd_et, iflag, Swe.SwephData.J_TO_J2000);
      }
      /*********************
       * to barycenter
       *********************/
      if (ipli == Swe.SE_MOON) {
        for (i = 0; i <= 5; i++)
          xp[i+xpOffs] += xear[i];
      } else {
        if ((iflag & Swe.SEFLG_MOSEPH)==0 && !ellipse_is_bary) {
          for (j = 0; j <= 5; j++)
            xp[j+xpOffs] += xsun[j];
        }
      }
      /*********************
       * to correct center
       *********************/
      for (j = 0; j <= 5; j++)
        xp[j+xpOffs] -= xobs[j];
          /* geocentric perigee/apogee of sun */
      if (ipl == Swe.SE_SUN &&
          (iflag & (Swe.SEFLG_HELCTR | Swe.SEFLG_BARYCTR))==0) {
        for (j = 0; j <= 5; j++)
          xp[j+xpOffs] = -xp[j+xpOffs];
      }
      /*********************
       * light deflection
       *********************/
      dt = Math.sqrt(this.sl.square_sum(xp, xpOffs)) * Swe.AUNIT / Swe.SwephData.CLIGHT / 86400.0;
      if (do_defl) {
        this.sw.swi_deflect_light(xp, xpOffs, dt, iflag);
      }
      /*********************
       * aberration
       *********************/
      if (do_aberr) {
        this.sw.swi_aberr_light(xp, xpOffs, xobs, iflag);
        /*
         * Apparent speed is also influenced by
         * the difference of speed of the earth between t and t-dt.
         * Neglecting this would result in an error of several 0.1"
         */
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          /* get barycentric sun and earth for t-dt into save area */
          if (this.sw.swe_calc(tjd_et - dt, ipli,
                       iflg0 | (iflag & Swe.SEFLG_TOPOCTR), x2) ==
                                                                Swe.ERR) {
            return Swe.ERR;
          }
          if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
            /* geocentric position of observer */
            for (i = 0; i <= 5; i++)
              xobs2[i] = this.swed.topd.xobs[i];
          } else {
            for (i = 0; i <= 5; i++)
              xobs2[i] = 0;
          }
          if ((iflag & (Swe.SEFLG_HELCTR | Swe.SEFLG_BARYCTR))!=0) {
            if ((iflag & Swe.SEFLG_HELCTR)!=0 &&
                (iflag & Swe.SEFLG_MOSEPH)==0) {
              for (i = 0; i <= 5; i++)
                xobs2[i] = xsun[i];
            }
          } else if (ipl == Swe.SE_SUN && (iflag & Swe.SEFLG_MOSEPH)==0) {
            for (i = 0; i <= 5; i++)
              xobs2[i] = xsun[i];
          } else {
            /* barycentric position of observer */
            for (i = 0; i <= 5; i++)
              xobs2[i] += xear[i];
          }
          for (i = 3; i <= 5; i++)
            xp[i+xpOffs] += xobs[i] - xobs2[i];
          /* The above call of swe_calc() has destroyed the
           * parts of the save area
           * (i.e. bary sun, earth nutation matrix!).
           * to restore it:
           */
          if (this.sw.swe_calc(tjd_et, Swe.SE_SUN,
                       iflg0 | (iflag & Swe.SEFLG_TOPOCTR), x2) ==
                                                                Swe.ERR) {
            return Swe.ERR;
          }
        }
      }
      /*********************
       * precession
       *********************/
      /* save J2000 coordinates; required for sidereal positions */
      for (j = 0; j <= 5; j++)
        x2000[j] = xp[j+xpOffs];
      if ((iflag & Swe.SEFLG_J2000)==0) {
        this.sl.swi_precess(xp, xpOffs, tjd_et, iflag, Swe.SwephData.J2000_TO_J);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.sw.swi_precess_speed(xp, xpOffs, tjd_et, iflag, Swe.SwephData.J2000_TO_J);
        }
      }
      /*********************
       * nutation
       *********************/
      if ((iflag & Swe.SEFLG_NONUT)==0) {
        this.sw.swi_nutate(xp, xpOffs, iflag, false);
      }
      /* now we have equatorial cartesian coordinates; keep them */
      for (j = 0; j <= 5; j++)
        pldat.xreturn[18+j] = xp[j+xpOffs];
      /************************************************
       * transformation to ecliptic.                  *
       * with sidereal calc. this will be overwritten *
       * afterwards.                                  *
       ************************************************/
      this.sl.swi_coortrf2(xp, xpOffs, xp, xpOffs, oe.seps, oe.ceps);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.sl.swi_coortrf2(xp, 3+xpOffs, xp, 3+xpOffs, oe.seps, oe.ceps);
      }
      if ((iflag & Swe.SEFLG_NONUT)==0) {
        this.sl.swi_coortrf2(xp, xpOffs, xp, xpOffs, this.swed.nut.snut, this.swed.nut.cnut);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.sl.swi_coortrf2(xp, 3+xpOffs, xp, 3+xpOffs,
                          this.swed.nut.snut, this.swed.nut.cnut);
        }
      }
        /* now we have ecliptic cartesian coordinates */
        for (j = 0; j <= 5; j++)
          pldat.xreturn[6+j] = xp[j+xpOffs];
      /************************************
       * sidereal positions               *
       ************************************/
      if ((iflag & Swe.SEFLG_SIDEREAL)!=0) {
        /* project onto ecliptic t0 */
        if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_ECL_T0)!=0) {
          if (this.sw.swi_trop_ra2sid_lon(x2000, pldat.xreturn, 6, pldat.xreturn, 18, iflag) != Swe.OK) {
            return Swe.ERR;
          }
        /* project onto solar system equator */
        } else if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_SSY_PLANE)!=0) {
          if (this.sw.swi_trop_ra2sid_lon_sosy(x2000, pldat.xreturn, 6, pldat.xreturn, 18, iflag) != Swe.OK) {
            return Swe.ERR;
        }
        } else {
        /* traditional algorithm */
        this.sl.swi_cartpol_sp(pldat.xreturn, 6, pldat.xreturn, 0);
        pldat.xreturn[0] -= sw.swe_get_ayanamsa(tjd_et) * Swe.SwissData.DEGTORAD;
        this.sl.swi_polcart_sp(pldat.xreturn, 0, pldat.xreturn, 6);
        }
      }
      if ((iflag & Swe.SEFLG_XYZ)!=0 &&
          (iflag & Swe.SEFLG_EQUATORIAL)!=0) {
        for (j = 0; j <= 5; j++)
          xp[j+xpOffs] = pldat.xreturn[18+j];
        continue;
      }
      if ((iflag & Swe.SEFLG_XYZ)!=0) {
        for (j = 0; j <= 5; j++)
          xp[j+xpOffs] = pldat.xreturn[6+j];
        continue;
      }
      /************************************************
       * transformation to polar coordinates          *
       ************************************************/
      this.sl.swi_cartpol_sp(pldat.xreturn, 18, pldat.xreturn, 12);
      this.sl.swi_cartpol_sp(pldat.xreturn, 6, pldat.xreturn, 0);
      /**********************
       * radians to degrees *
       **********************/
      if ((iflag & Swe.SEFLG_RADIANS) == 0) {
        for (j = 0; j < 2; j++) {
    pldat.xreturn[j] *= Swe.SwissData.RADTODEG;   /* ecliptic */
    pldat.xreturn[j+3] *= Swe.SwissData.RADTODEG;
    pldat.xreturn[j+12] *= Swe.SwissData.RADTODEG;  /* equator */
    pldat.xreturn[j+15] *= Swe.SwissData.RADTODEG;
        }
      }
      if ((iflag & Swe.SEFLG_EQUATORIAL)!=0) {
        for (j = 0; j <= 5; j++)
          xp[j+xpOffs] = pldat.xreturn[12+j];
        continue;
      } else {
        for (j = 0; j <= 5; j++)
          xp[j+xpOffs] = pldat.xreturn[j];
        continue;
      }
    }
    for (i = 0; i <= 5; i++) {
      if (i > 2 && (iflag & Swe.SEFLG_SPEED)==0) {
        xna[i] = xnd[i+xndOffs] = xpe[i+xpeOffs] = xap[i+xapOffs] = 0;
      }
      if (xnasc != null) {
        xnasc[i] = xna[i];
      }
      if (xndsc != null) {
        xndsc[i] = xnd[i+xndOffs];
      }
      if (xperi != null) {
        xperi[i] = xpe[i+xpeOffs];
      }
      if (xaphe != null) {
        xaphe[i] = xap[i+xapOffs];
      }
    }
    return Swe.OK;
  }
  swe_nod_aps_ut(tjd_ut, ipl, iflag,  method, xnasc, xndsc, xperi, xaphe) {
    SweDate.swi_set_tid_acc(tjd_ut, iflag, 0);
    return this.swe_nod_aps(tjd_ut + SweDate.getDeltaT(tjd_ut),
                        ipl, iflag, method, xnasc, xndsc, xperi, xaphe);
  }

  swe_gauquelin_sector(t_ut, ipl, starname, iflag, imeth, geopos, atpress, attemp, dgsect) {
    var dtmp=new DblObj();
    var rise_found = true;
    var set_found = true;
    var retval;
    var tret = new Array(3);
    var t_et, t;
    var x0 = new Array(6);
    var eps, nutlo = new Array(2), armc;
    var epheflag = iflag & Swe.SEFLG_EPHMASK;
    var do_fixstar = (starname != null && starname.length() > 0);
    var risemeth = 0;
    var above_horizon = false;
    if (imeth < 0 || imeth > 5) {
      console.error("invalid method: "+imeth);
      return Swe.ERR;
    }
    /* function calls for Pluto with asteroid number 134340
     * are treated as calls for Pluto as main body SE_PLUTO */
    if (ipl == Swe.SE_AST_OFFSET + 134340) {
      ipl = Swe.SE_PLUTO;
    }
    /* 
     * geometrically from ecl. longitude and latitude 
     */
    if (imeth == 0 || imeth == 1) {
      t_et = t_ut + SweDate.getDeltaT(t_ut);
      eps = this.sl.swi_epsiln(t_et, iflag) * Swe.SwissData.RADTODEG;
      this.sl.swi_nutation(t_et, iflag, nutlo);
      nutlo[0] *= Swe.SwissData.RADTODEG;
      nutlo[1] *= Swe.SwissData.RADTODEG;
      armc = this.sl.swe_degnorm(this.sl.swe_sidtime0(t_ut, eps + nutlo[1], nutlo[0]) * 15 + geopos[0]);
        if (this.sw.swe_calc(t_et, ipl, iflag, x0) == Swe.ERR)
    return Swe.ERR;

      if (imeth == 1)
        x0[1] = 0;
      dgsect.val = this.sw.swe_house_pos(armc, geopos[1], eps + nutlo[1], 'G', x0, null);
      return Swe.OK;
    }
    /* 
     * from rise and set times
     */
    if (imeth == 2 || imeth == 4)
      risemeth |= Swe.SE_BIT_NO_REFRACTION;
    if (imeth == 2 || imeth == 3)
      risemeth |= Swe.SE_BIT_DISC_CENTER;
    /* find the next rising time of the planet or star */
    dtmp.val=tret[0];
    retval = this.swe_rise_trans(t_ut, ipl, starname, epheflag,
                            Swe.SE_CALC_RISE|risemeth, geopos, atpress, attemp,

                            dtmp);
    tret[0]=dtmp.val;
    if (retval == Swe.ERR) {
      return Swe.ERR; 
    } else if (retval == -2) {
      /* actually, we could return ERR here. However, we
       * keep this variable, in case we implement an algorithm
       * for Gauquelin sector positions of circumpolar bodies.
       * As with the Ludwig Otto procedure with Placidus, one 
       * could replace missing rises or sets by meridian transits,
       * although there are cases where even this is not possible.
       * Sometimes a body both appears and disappears on the western 
       * part of the horizon. Using true culminations rather than meridan
       * transits would not help in any case either, because there are
       * cases where a body does not have a culmination within days,
       * e.g. the sun near the poles.
       */
      rise_found = false;    
    }
    /* find the next setting time of the planet or star */
    dtmp.val=tret[1];
    retval = this.swe_rise_trans(t_ut, ipl, starname, epheflag,
                            Swe.SE_CALC_SET|risemeth, geopos, atpress, attemp,
                            dtmp);
    tret[1]=dtmp.val;
    if (retval == Swe.ERR) {
      return Swe.ERR; 
    } else if (retval == -2) {
      set_found = false;
    }
    if (tret[0] < tret[1] && rise_found == true) {
      above_horizon = false;
      /* find last set */
      t = t_ut - 1.2;
      if (set_found) t = tret[1] - 1.2;
      set_found = true;
      dtmp.val=tret[1];
      retval = this.swe_rise_trans(t, ipl, starname, epheflag,
                            Swe.SE_CALC_SET|risemeth, geopos, atpress, attemp,
                            dtmp);
      tret[1]=dtmp.val;
      if (retval == Swe.ERR) {
        return Swe.ERR; 
      } else if (retval == -2) {
        set_found = false;
      }
    } else if (tret[0] >= tret[1] && set_found == true) {
      above_horizon = true;
      /* find last rise */
      t = t_ut - 1.2;
      if (rise_found) t = tret[0] - 1.2;
      rise_found = true;
      dtmp.val=tret[0];
      retval = this.swe_rise_trans(t, ipl, starname, epheflag,
                            Swe.SE_CALC_RISE|risemeth, geopos, atpress, attemp,
                            dtmp);

      tret[0]=dtmp.val;
      if (retval == Swe.ERR) {
        return Swe.ERR; 
      } else if (retval == -2) {
        rise_found = false;
      }
    }
    if (rise_found && set_found) {
      if (above_horizon) {
        dgsect.val = (t_ut - tret[0]) / (tret[1] - tret[0]) * 18 + 1;
      } else {
        dgsect.val = (t_ut - tret[1]) / (tret[0] - tret[1]) * 18 + 19;
      }
      return Swe.OK;
    } else {
      dgsect.val = 0;

      console.error("rise or set not found for planet "+ipl);
      return Swe.ERR;
    }
  }
};
