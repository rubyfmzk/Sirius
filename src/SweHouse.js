/**
* This class does all the calculations that are related to astrological
* houses.
* <P><I><B>You will find the complete documentation for the original
* SwissEphemeris package at <A HREF="http://www.astro.ch/swisseph/sweph_g.htm">
* http://www.astro.ch/swisseph/sweph_g.htm</A>. By far most of the information 
* there is directly valid for this port to Java as well.</B></I>
* @version 1.0.0a
*/
import { Swe } from "./Swe"
import { SwissLib } from "./SwissLib"
import { SwissData } from "./SwissData"
import { SwissEph } from "./SwissEph"
import { SweDate } from "./SweDate"
import { Houses } from "./Classes"

export class SweHouse{

  constructor(sl, sw, swed, sd){
    this.MILLIARCSEC = 1.0 / 3600000.0;
    this.VERY_SMALL=1E-10;
    this.sd   = sd   ? sd : new SweDate()
    this.sl   = sl   ? sl : new SwissLib()
    this.sw   = sw   ? sw : new SwissEph(this.sd)
    this.swed = swed ? swed : SwissData
  }

  sind(x) {
    return Math.sin(x * this.swed.DEGTORAD);
  }
  cosd(x) {
    return Math.cos(x * this.swed.DEGTORAD);
  }
  tand(x) {
    return Math.tan(x * this.swed.DEGTORAD);
  }
  asind(x) {
    return (Math.asin(x) * this.swed.RADTODEG);
  }
  atand(x) {
    return (Math.atan(x) * this.swed.RADTODEG);
  }
/*
  swe_houses(tjd_ut, geolat, geolon, hsys, cusp, ascmc) {
    var i, retc = 0;
    var armc, eps, nutlo=new Array(2);
    var tjde = tjd_ut + SweDate.getDeltaT(tjd_ut);
    eps = this.sl.swi_epsiln(tjde, 0) * SwissData.RADTODEG;
    this.sl.swi_nutation(tjde, 0, nutlo);
    for (i = 0; i < 2; i++)
      nutlo[i] *= SwissData.RADTODEG;
    armc = this.sl.swe_degnorm(this.sl.swe_sidtime0(tjd_ut, eps + nutlo[1], nutlo[0]) * 15 + geolon);
    retc = swe_houses_armc(armc, geolat, eps + nutlo[1], hsys, cusp, ascmc);
    return retc;
  }
*/
  swe_houses(tjd_ut, iflag, geolat, geolon, hsys, cusp, ascmc, aOffs) {
    if(ascmc === undefined){
      var i, retc = 0;
      var armc, eps, nutlo=new Array(2);
      var tjde = tjd_ut + this.sd.getDeltaT(tjd_ut);
      eps = this.sl.swi_epsiln(tjde, 0) * this.swed.RADTODEG;
      this.sl.swi_nutation(tjde, 0, nutlo);
      for (i = 0; i < 2; i++)
        nutlo[i] *= this.swed.RADTODEG;
      armc = this.sl.swe_degnorm(this.sl.swe_sidtime0(tjd_ut, eps + nutlo[1], nutlo[0]) * 15 + geolon);
      retc = this.swe_houses_armc(armc, geolat, eps + nutlo[1], hsys, cusp, ascmc);
      return retc;
    }

    var i, retc = 0;
    var armc, eps_mean, nutlo=new Array(2);
    var tjde = tjd_ut + this.sd.getDeltaT(tjd_ut);
    var sip = this.swed.sidd;
    var ito;
    if (hsys == 'G') {
      ito = 36;
    } else {
      ito = 12;
    }
    if ((iflag & Swe.SEFLG_SIDEREAL)!=0 && !this.swed.ayana_is_set) {
      this.sw.swe_set_sid_mode(Swe.SE_SIDM_FAGAN_BRADLEY, 0, 0);
    }
    eps_mean = this.sl.swi_epsiln(tjde, 0) * this.swed.RADTODEG;
    this.sl.swi_nutation(tjde, 0, nutlo);
    for (i = 0; i < 2; i++)
      nutlo[i] *= this.swed.RADTODEG;
      /*houses_to_sidereal(tjde, geolat, hsys, eps, cusp, ascmc, iflag);*/
    armc = this.sl.swe_degnorm(this.sl.swe_sidtime0(tjd_ut, eps_mean + nutlo[1], nutlo[0]) * 15 + geolon);
    if ((iflag & Swe.SEFLG_SIDEREAL)!=0) {
      if ((sip.sid_mode & Swe.SE_SIDBIT_ECL_T0)!=0) {
        retc = this.sidereal_houses_ecl_t0(tjde, armc, eps_mean + nutlo[1], nutlo, geolat, hsys, cusp, ascmc, aOffs);
      } else if ((sip.sid_mode & Swe.SE_SIDBIT_SSY_PLANE)!=0) {
        retc = this.sidereal_houses_ssypl(tjde, armc, eps_mean + nutlo[1], nutlo, geolat, hsys, cusp, ascmc, aOffs);
      } else {
        retc = this.sidereal_houses_trad(tjde, armc, eps_mean + nutlo[1], nutlo[0], geolat, hsys, cusp, ascmc, aOffs);
      }
    } else {
      retc = this.swe_houses_armc(armc, geolat, eps_mean + nutlo[1], hsys, cusp, ascmc, aOffs);
    }
    if ((iflag & Swe.SEFLG_RADIANS)!=0) {
      for (i = 1; i <= ito; i++)
        cusp[i] *= this.swed.DEGTORAD;
      for (i = 0; i < Swe.SE_NASCMC; i++)
        ascmc[i+aOffs] *= this.swed.DEGTORAD;
    }
    return retc;
  }

  /*
   * houses to sidereal
   * ------------------
   * there are two methods:
   * a) the traditional one
   *    houses are computed tropically, then nutation and the ayanamsa
   *    are subtracted.
   * b) the projection on the ecliptic of t0
   *    The house computation is then as follows:
   *
   * Be t the birth date and t0 the epoch at which ayanamsa = 0.
   * 1. Compute the angle between the mean ecliptic at t0 and
   *    the true equator at t.
   *    The intersection povar of these two circles we call the
   *    "auxiliary vernal point", and the angle between them the
   *    "auxiliary obliquity".
   * 2. Compute the distance of the auxiliary vernal point from the
   *    vernal point at t. (this is a section on the equator)
   * 3. subtract this value from the armc of t = aux. armc.
   * 4. Compute the axes and houses for this aux. armc and aux. obliquity.
   * 5. Compute the distance between the auxiliary vernal point and the
   *    vernal point at t0 (this is the ayanamsa at t, measured on the
   *    ecliptic of t0)
   * 6. subtract this distance from all house cusps.
   * 7. subtract ayanamsa_t0 from all house cusps.
   */
  sidereal_houses_ecl_t0(tjde, armc, eps, nutlo, lat, hsys, cusp, ascmc, aOffs) {
    var i, j, retc = Swe.OK;
    var x=new Array(6), xvpx=new Array(6), x2=new Array(6), epst0,
           xnorm=new Array(6);
    var rxy, rxyz, c2, epsx, sgn, fac, dvpx, dvpxe;
    var armcx;
    var sip = this.swed.sidd;
    var ito;
    if (hsys == 'G') {
      ito = 36;
    } else {
      ito = 12;
    }
    /* epsilon at t0 */
    epst0 = this.sl.swi_epsiln(sip.t0, 0);
    /* cartesian coordinates of an imaginary moving body on the
     * the mean ecliptic of t0; we take the vernal point: */
    x[0] = x[4] = 1;
    x[1] = x[2] = x[3] = x[5] = 0;
    /* to equator */
    this.sl.swi_coortrf(x, x, -epst0);
    this.sl.swi_coortrf(x, 3, x, 3, -epst0);
    /* to tjd_et */
    this.sl.swi_precess(x, sip.t0, 0, SwephData.J_TO_J2000);
    this.sl.swi_precess(x, tjde, 0, SwephData.J2000_TO_J);
    this.sl.swi_precess(x, 3, sip.t0, 0, SwephData.J_TO_J2000);
    this.sl.swi_precess(x, 3, tjde, 0, SwephData.J2000_TO_J);
    /* to true equator of tjd_et */
    this.sl.swi_coortrf(x, x, (eps - nutlo[1]) * this.swed.DEGTORAD);
    this.sl.swi_coortrf(x, 3, x, 3, (eps - nutlo[1]) * this.swed.DEGTORAD);
    this.sl.swi_cartpol_sp(x, 0, x, 0);
    x[0] += nutlo[0] * this.swed.DEGTORAD;
    this.sl.swi_polcart_sp(x, x);
    this.sl.swi_coortrf(x, x, -eps * this.swed.DEGTORAD);
    this.sl.swi_coortrf(x, 3, x, 3, -eps * this.swed.DEGTORAD);
    /* now, we have the moving point precessed to tjd_et.
     * next, we compute the auxiliary epsilon: */
    this.sl.swi_cross_prod(x, 0, x, 3, xnorm, 0);
    rxy =  xnorm[0] * xnorm[0] + xnorm[1] * xnorm[1];
    c2 = (rxy + xnorm[2] * xnorm[2]);
    rxyz = Math.sqrt(c2);
    rxy = Math.sqrt(rxy);
    epsx = Math.asin(rxy / rxyz) * this.swed.RADTODEG;           /* 1a */
    /* auxiliary vernal point */
    if (Math.abs(x[5]) < 1e-15) {
      x[5] = 1e-15;
    }
    fac = x[2] / x[5];
    sgn = x[5] / Math.abs(x[5]);
    for (j = 0; j <= 2; j++)
      xvpx[j] = (x[j] - fac * x[j+3]) * sgn;      /* 1b */
    /* distance of the auxiliary vernal point from
     * the zero point at tjd_et (a section on the equator): */
    this.sl.swi_cartpol(xvpx, x2);
    dvpx = x2[0] * this.swed.RADTODEG;                      /* 2 */
    /* auxiliary armc */
    armcx = this.sl.swe_degnorm(armc - dvpx);        /* 3 */
    /* compute axes and houses: */
    retc = this.swe_houses_armc(armcx, lat, epsx, hsys, cusp, ascmc, aOffs);  /* 4 */
    /* distance between auxiliary vernal point and
     * vernal point of t0 (a section on the sidereal plane) */
    dvpxe = Math.acos(this.sl.swi_dot_prod_unit(x, xvpx)) * this.swed.RADTODEG;  /* 5 */
    if (tjde < sip.t0) {
      dvpxe = -dvpxe;
    }
    for (i = 1; i <= ito; i++)                     /* 6, 7 */
      cusp[i] = this.sl.swe_degnorm(cusp[i] - dvpxe - sip.ayan_t0);
    for (i = 0; i <= Swe.SE_NASCMC; i++)
      ascmc[aOffs+i] = this.sl.swe_degnorm(ascmc[aOffs+i] - dvpxe - sip.ayan_t0);
    return retc;
  }

  /*
   * Be t the birth date and t0 the epoch at which ayanamsa = 0.
   * 1. Compute the angle between the solar system rotation plane and
   *    the true equator at t.
   *    The intersection point of these two circles we call the
   *    "auxiliary vernal point", and the angle between them the
   *    "auxiliary obliquity".
   * 2. Compute the distance of the auxiliary vernal point from the
   *    zero point at t. (this is a section on the equator)
   * 3. subtract this value from the armc of t = aux. armc.
   * 4. Compute the axes and houses for this aux. armc and aux. obliquity.
   * 5. Compute the distance between the auxiliary vernal point at t
   *    and the zero point of the solar system plane J2000
   *    (a section measured on the solar system plane)
   * 6. subtract this distance from all house cusps.
   * 7. compute the ayanamsa of J2000 on the solar system plane,
   *    referred to t0
   * 8. subtract ayanamsa_t0 from all house cusps.
   * 9. subtract ayanamsa_2000 from all house cusps.
   */
  sidereal_houses_ssypl(tjde, armc, eps, nutlo, lat, hsys, cusp, ascmc, aOffs) {
    var i, j, retc = Swe.OK;
    var x=new Array(6), x0=new Array(6), xvpx=new Array(6),
           x2=new Array(6), xnorm=new Array(6);
    var rxy, rxyz, c2, epsx, eps2000, sgn, fac, dvpx, dvpxe, x00;
    var armcx;
    var sip = this.swed.sidd;
    var ito;
    if (hsys == 'G') {
      ito = 36;
    } else {
      ito = 12;
    }
    eps2000 = this.sl.swi_epsiln(SwephData.J2000, 0);
    /* cartesian coordinates of the zero point on the
     * the solar system rotation plane */
    x[0] = x[4] = 1;
    x[1] = x[2] = x[3] = x[5] = 0;
    /* to ecliptic 2000 */
    this.sl.swi_coortrf(x, x, -SwephData.SSY_PLANE_INCL);
    this.sl.swi_coortrf(x, 3, x, 3, -SwephData.SSY_PLANE_INCL);
    this.sl.swi_cartpol_sp(x, 0, x, 0);
    x[0] += SwephData.SSY_PLANE_NODE_E2000;
    this.sl.swi_polcart_sp(x, x);
    /* to equator 2000 */
    this.sl.swi_coortrf(x, x, -eps2000);
    this.sl.swi_coortrf(x, 3, x, 3, -eps2000);
    /* to mean equator of t */
    this.sl.swi_precess(x, tjde, 0, SwephData.J2000_TO_J);
    this.sl.swi_precess(x, 3, tjde, 0, SwephData.J2000_TO_J);
    /* to true equator of t */
    this.sl.swi_coortrf(x, x, (eps - nutlo[1]) * this.swed.DEGTORAD);
    this.sl.swi_coortrf(x, 3, x, 3, (eps - nutlo[1]) * this.swed.DEGTORAD);
    this.sl.swi_cartpol_sp(x, 0, x, 0);
    x[0] += nutlo[0] * this.swed.DEGTORAD;
    this.sl.swi_polcart_sp(x, x);
    this.sl.swi_coortrf(x, x, -eps * this.swed.DEGTORAD);
    this.sl.swi_coortrf(x, 3, x, 3, -eps * this.swed.DEGTORAD);
    /* now, we have the moving point precessed to tjd_et.
     * next, we compute the auxiliary epsilon: */
    this.sl.swi_cross_prod(x, 0, x, 3, xnorm, 0);
    rxy =  xnorm[0] * xnorm[0] + xnorm[1] * xnorm[1];
    c2 = (rxy + xnorm[2] * xnorm[2]);
    rxyz = Math.sqrt(c2);
    rxy = Math.sqrt(rxy);
    epsx = Math.asin(rxy / rxyz) * this.swed.RADTODEG;           /* 1a */
    /* auxiliary vernal point */
    if (Math.abs(x[5]) < 1e-15) {
      x[5] = 1e-15;
    }
    fac = x[2] / x[5];
    sgn = x[5] / Math.abs(x[5]);
    for (j = 0; j <= 2; j++)
      xvpx[j] = (x[j] - fac * x[j+3]) * sgn;      /* 1b */
    /* distance of the auxiliary vernal point from
     * mean vernal point at tjd_et (a section on the equator): */
    this.sl.swi_cartpol(xvpx, x2);
    dvpx = x2[0] * this.swed.RADTODEG;                      /* 2 */
    /* auxiliary armc */
    armcx = this.sl.swe_degnorm(armc - dvpx);        /* 3 */
    /* compute axes and houses: */
    retc = this.swe_houses_armc(armcx, lat, epsx, hsys, cusp, ascmc, aOffs);  /* 4 */
    /* distance between the auxiliary vernal point at t and
     * the sidereal zero point of 2000 at t
     * (a section on the sidereal plane).
     */
    dvpxe = Math.acos(this.sl.swi_dot_prod_unit(x, xvpx)) * this.swed.RADTODEG;  /* 5 */
                  /* (always positive for dates after 5400 bc) */
    dvpxe -= SwephData.SSY_PLANE_NODE * this.swed.RADTODEG;
    /* ayanamsa between t0 and J2000, measured on solar system plane: */
    /* position of zero point of t0 */
    x0[0] = 1;
    x0[1] = x0[2] = 0;
    /* zero point of t0 in J2000 system */
    if (sip.t0 != SwephData.J2000) {
      this.sl.swi_precess(x0, sip.t0, 0, SwephData.J_TO_J2000);
    }
    /* zero point to ecliptic 2000 */
    this.sl.swi_coortrf(x0, x0, eps2000);
    /* to solar system plane */
    this.sl.swi_cartpol(x0, x0);
    x0[0] -= SwephData.SSY_PLANE_NODE_E2000;
    this.sl.swi_polcart(x0, x0);
    this.sl.swi_coortrf(x0, x0, SwephData.SSY_PLANE_INCL);
    this.sl.swi_cartpol(x0, x0);
    x0[0] += SwephData.SSY_PLANE_NODE;
    x00 = x0[0] * this.swed.RADTODEG;                       /* 7 */
    for (i = 1; i <= ito; i++)                     /* 6, 8, 9 */
      cusp[i] = this.sl.swe_degnorm(cusp[i] - dvpxe - sip.ayan_t0 - x00);
    for (i = 0; i <= Swe.SE_NASCMC; i++)
      ascmc[aOffs+i] = this.sl.swe_degnorm(ascmc[aOffs+i] - dvpxe - sip.ayan_t0 - x00);
    return retc;
  }

  /* common simplified procedure */
  sidereal_houses_trad(tjde, armc, eps, nutl, lat, hsys, cusp, ascmc, aOffs) {
    var i, retc = Swe.OK;
    var ay;
    var ito;
    var ihs = hsys;
    var ihs2 = ihs;
    ay = this.sw.swe_get_ayanamsa(tjde);
    if (ihs == 'G') {
      ito = 36;
    } else {
      ito = 12;
    }
    if (ihs == 'W')  /* whole sign houses: treat as 'E' and fix later */
      ihs2 = 'E';
    retc = this.swe_houses_armc(armc, lat, eps, ihs2, cusp, ascmc, aOffs);
    for (i = 1; i <= ito; i++)
      cusp[i] = this.sl.swe_degnorm(cusp[i] - ay - nutl);
      if (ihs == 'W') /* whole sign houses */
        cusp[i] -= (cusp[i] % 30);
    for (i = 0; i < Swe.SE_NASCMC; i++) {
      if (i == 2) /* armc */ {
        continue;
      }
      ascmc[aOffs+i] = this.sl.swe_degnorm(ascmc[aOffs+i] - ay - nutl);
    }
    return retc;
  }

  /*
   * this function is required for very special computations
   * where no date is given for house calculation,
   * e.g. for composite charts or progressive charts.
   * cusps are returned in double cusp[13],
   *                           or cusp[37] with house system 'G'.
   * cusp[1...12] houses 1 - 12
   * additional points are returned in ascmc[10].
   * ascmc[0] = ascendant
   * ascmc[1] = mc
   * ascmc[2] = armc
   * ascmc[3] = vertex
   * ascmc[4] = equasc            * "equatorial ascendant" *
   * ascmc[5] = coasc1            * "co-ascendant" (Walter Koch) *
   * ascmc[6] = coasc2            * "co-ascendant" (Michael Munkasey) *
   * ascmc[7] = polasc            * "polar ascendant" (Michael Munkasey) *
   */
  /**
  * Calculates the house positions and other vital points. You would use
  * this method instead of swe_houses, if you do not have a date available,
  * but just the ARMC (==sidereal time).
  * @param armc The ARMC (==sidereal time)
  * @param geolat The latitude on earth, for which the calculation has to be
  * done.
  * @param eps The ecliptic obliquity (e.g. xx[0] of swe_calc(...))
  * @param hsys The house system as a character given as an integer.
  * @param cusp The house cusps are returned here in cusp[1...12] for
  * the house 1 to 12.
  * @param ascmc The special points like ascendant etc. are returned here.
  * @see #swe_houses(double, int, double, double, int, double[], double[])
  * @see swisseph.SwissEph#swe_calc
  * @return SweConst.OK (==0) or SweConst.ERR (==-1), if an error occured.
  */
  swe_houses_armc(armc, geolat, eps, hsys, cusp, ascmc, aOffs) {
    var h=new Houses();
    var i, retc = 0;
    var ito;
    if (hsys == 'G') {
      ito = 36;
    } else {
      ito = 12;
    }
    armc = this.sl.swe_degnorm(armc);
    retc = this.CalcH(armc,
                 geolat,
                 eps,
                 hsys, 2, h);
    cusp[0] = 0;
    for (i = 1; i <= ito; i++) {
      cusp[i] = h.cusp[i];
    }
    ascmc[aOffs+0] = h.ac;        /* Asc */
    ascmc[aOffs+1] = h.mc;        /* Mid */
    ascmc[aOffs+2] = armc;
    ascmc[aOffs+3] = h.vertex;
    ascmc[aOffs+4] = h.equasc;
    ascmc[aOffs+5] = h.coasc1;  /* "co-ascendant" (Walter Koch) */
    ascmc[aOffs+6] = h.coasc2;  /* "co-ascendant" (Michael Munkasey) */
    ascmc[aOffs+7] = h.polasc;  /* "polar ascendant" (Michael Munkasey) */
    for (i = Swe.SE_NASCMC; i < 10; i++)
      ascmc[aOffs+i] = 0;
    return retc;
  }

  /* for APC houses */
  /* n  number of house
   * ph geographic latitude 
   * e  ecliptic obliquity
   * az armc
   */
  apc_sector(n, ph, e, az) {
    var k, is_below_hor = 0;
    var dasc, kv, a, dret;
    /* ascensional difference of the ascendant */
    kv   = Math.atan(Math.tan(ph) * Math.tan(e) * Math.cos(az)/(1 + Math.tan(ph) * Math.tan(e) * Math.sin(az)));
    /* declination of the ascendant */
    dasc = Math.atan(Math.sin(kv) / Math.tan(ph));
    /* note, at polar circles, when the mc sinks below the horizon,
     * kv and dasc change sign in the above formulae.
     * this is what we need, because the ascendand jumps by 180 deg */
    /* printf("%f, %f\n", kv*RADTODEG, dasc*RADTODEG); */
    if (n < 8) {
      is_below_hor = 1;  /* 1 and 7 are included here */
      k = n - 1;
    } else {
      k = n - 13;
    }
    /* az + PI/2 + kv = armc + 90 + asc. diff. = right ascension of ascendant
     * PI/2 +- kv = semi-diurnal or seminocturnal arc of ascendant 
     * a = right ascension of house cusp on apc circle (ascendant-parallel
     * circle), with declination dasc */
    if (is_below_hor != 0) {
      a = kv + az + Math.PI/2 + k * (Math.PI/2 - kv) / 3;
    } else {
      a = kv + az + Math.PI/2 + k * (Math.PI/2 + kv) / 3;
    }
    a = this.sl.swe_radnorm(a);
    dret = Math.atan2(Math.tan(dasc) * Math.tan(ph) * Math.sin(az) + Math.sin(a),
      Math.cos(e) * (Math.tan(dasc) * Math.tan(ph) * Math.cos(az) + Math.cos(a)) + Math.sin(e) * Math.tan(ph) * Math.sin(az - a));
    dret = this.sl.swe_degnorm(dret * this.swed.RADTODEG);
    return dret;
  }

  swe_house_name(hsys) {
    switch (hsys) {
      case 'A': return "equal";
      case 'E': return "equal";
      case 'B': return "Alcabitius";
      case 'C': return "Campanus";
      case 'G': return "Gauquelin sectors";
      case 'H': return "horizon/azimut";
      case 'K': return "Koch";
      case 'M': return "Morinus";
      case 'O': return "Porphyry";
      case 'R': return "Regiomontanus";
      case 'T': return "Polich/Page";
      case 'U': return "Krusinski-Pisa-Goelzer";
      case 'V': return "equal/Vehlow";
      case 'W': return "equal/ whole sign";
      case 'X': return "axial rotation system/Meridian houses";
      case 'Y': return "APC houses";
      default: return "Placidus";
    }
  }

  CalcH(th, fi, ekl, hsy, iteration_count, hsp)
  /* *********************************************************
   *  Arguments: th = sidereal time (angle 0..360 degrees
   *             hsy = letter code for house system;
   *                   A  equal
   *                   E  equal
   *                   B  Alcabitius
   *                   C  Campanus
   *                   G  36 Gauquelin sectors
   *                   H  horizon / azimut
   *                   K  Koch
   *                   M  Morinus
   *                   O  Porphyry
   *                   P  Placidus
   *                   R  Regiomontanus
   *                   T  Polich/Page ("topocentric")
   *                   U  Krusinski-Pisa-Goelzer
   *                   V  equal Vehlow
   *                   W  equal, whole sign
   *                   X  axial rotation system/ Meridian houses
   *                   Y  APC houses
   *             fi = geographic latitude
   *             ekl = obliquity of the ecliptic
   *             iteration_count = number of iterations in
   *             Placidus calculation; can be 1 or 2.
   * *********************************************************
   *  Koch and Placidus don't work in the polar circle.
   *  We swap MC/IC so that MC is always before AC in the zodiac
   *  We than divide the quadrants into 3 equal parts.
   * *********************************************************
   *  All angles are expressed in degrees.
   *  Special trigonometric functions sind, cosd etc. are
   *  implemented for arguments in degrees.
   ***********************************************************/
  {
    var tane, tanfi, cosfi, tant, sina, cosa, th2;
    var a, c, f, fh1, fh2, xh1, xh2, rectasc, ad3, acmc, vemc;
    var i, ih, ih2, retc = Swe.OK;
    var sine, cose;
    var x=new Array(3), krHorizonLon; /* BK 14.02.2006 */
    cose  = this.cosd(ekl);
    sine  = this.sind(ekl);
    tane  = this.tand(ekl);
    /* north and south poles */
    if (Math.abs(Math.abs(fi) - 90) < this.VERY_SMALL) {
      if (fi < 0) {
        fi = -90 + this.VERY_SMALL;
      } else {
        fi = 90 - this.VERY_SMALL;
      }
    }
    tanfi = this.tand(fi);
    /* mc */
    if (Math.abs(th - 90) > this.VERY_SMALL
      && Math.abs(th - 270) > this.VERY_SMALL) {
      tant = this.tand(th);
      hsp.mc = this.atand(tant / cose);
      if (th > 90 && th <= 270) {
        hsp.mc = this.sl.swe_degnorm(hsp.mc + 180);
      }
    } else {
      if (Math.abs(th - 90) <= this.VERY_SMALL) {
        hsp.mc = 90;
      } else {
        hsp.mc = 270;
      }
    } /*  if */
    hsp.mc = this.sl.swe_degnorm(hsp.mc);
    /* ascendant */
    hsp.ac = this.Asc1 (th + 90, fi, sine, cose);
    hsp.cusp[1] = hsp.ac;
    hsp.cusp[10] = hsp.mc;
    //hsy=Character.toUpperCase(hsy);
    switch (hsy) {
      case 'A':   /* equal houses */
      case 'E':
        /*
         * within polar circle we swap AC/DC if AC is on wrong side
         */
        acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
        if (acmc < 0) {
          hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
          hsp.cusp[1] = hsp.ac;
        }
        for (i = 2; i <=12; i++)
          hsp.cusp [i] = this.sl.swe_degnorm(hsp.cusp [1] + (i-1) * 30);
        break;
      case 'C': /* Campanus houses and Horizon or Azimut system */
      case 'H':
        if (hsy == 'H') {
          if (fi > 0) {
            fi = 90 - fi;
          } else {
            fi = -90 - fi;
          }
          /* equator */
          if (Math.abs(Math.abs(fi) - 90) < this.VERY_SMALL) {
            if (fi < 0) {
              fi = -90 + this.VERY_SMALL;
            } else {
              fi = 90 - this.VERY_SMALL;
            }
          }
          th = this.sl.swe_degnorm(th + 180);
        }
        fh1 = this.asind(this.sind (fi) / 2);
        fh2 = this.asind(Math.sqrt (3.0) / 2 * this.sind(fi));
        cosfi = this.cosd(fi);
        if (Math.abs(cosfi) == 0) {        /* '==' should be save! */
          if (fi > 0) {
            xh1 = xh2 = 90; /* cosfi = VERY_SMALL; */
          } else {
            xh1 = xh2 = 270; /* cosfi = -VERY_SMALL; */
          }
        } else {
          xh1 = this.atand(Math.sqrt (3.0) / cosfi);
          xh2 = this.atand(1 / Math.sqrt (3.0) / cosfi);
        }
        hsp.cusp [11] = this.Asc1 (th + 90 - xh1, fh1, sine, cose);
        hsp.cusp [12] = this.Asc1 (th + 90 - xh2, fh2, sine, cose);
        if (hsy == 'H') {
          hsp.cusp [1] = this.Asc1 (th + 90, fi, sine, cose);
        }
        hsp.cusp [2] = this.Asc1 (th + 90 + xh2, fh2, sine, cose);
        hsp.cusp [3] = this.Asc1 (th + 90 + xh1, fh1, sine, cose);
        /* within polar circle, when mc sinks below horizon and
         * ascendant changes to western hemisphere, all cusps
         * must be added 180 degrees.
         * houses will be in clockwise direction */
        if (Math.abs(fi) >= 90 - ekl) {  /* within polar circle */
          acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
          if (acmc < 0) {
            hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
            hsp.mc = this.sl.swe_degnorm(hsp.mc + 180);
            for (i = 1; i <= 12; i++)
              hsp.cusp[i] = this.sl.swe_degnorm(hsp.cusp[i] + 180);
          }
        }
        if (hsy == 'H') {
          for (i = 1; i <= 3; i++)
            hsp.cusp[i] = this.sl.swe_degnorm(hsp.cusp[i] + 180);
          for (i = 11; i <= 12; i++)
            hsp.cusp[i] = this.sl.swe_degnorm(hsp.cusp[i] + 180);
          /* restore fi and th */
          if (fi > 0) {
            fi = 90 - fi;
          } else {
            fi = -90 - fi;
          }
          th = this.sl.swe_degnorm(th + 180);
          acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
          if (acmc < 0) {
            hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
          }
        }
        break;
      case 'K': /* Koch houses */
        if (Math.abs(fi) >= 90 - ekl) {  /* within polar circle */
          retc = Swe.ERR;
          this.makePorphyry(hsp);
          break;
        }
        sina = this.sind(hsp.mc) * sine / this.cosd(fi);
        if (sina > 1) sina = 1;
        if (sina < -1) sina = -1;
        cosa = Math.sqrt(1 - sina * sina);          /* always >> 0 */
        c = this.atand(tanfi / cosa);
        ad3 = this.asind(this.sind(c) * sina) / 3.0;
        hsp.cusp [11] = this.Asc1 (th + 30 - 2 * ad3, fi, sine, cose);
        hsp.cusp [12] = this.Asc1 (th + 60 - ad3, fi, sine, cose);
        hsp.cusp [2] = this.Asc1 (th + 120 + ad3, fi, sine, cose);
        hsp.cusp [3] = this.Asc1 (th + 150 + 2 * ad3, fi, sine, cose);
        break;
      case 'O':   /* Porphyry houses */
        this.makePorphyry(hsp);
        break;
      case 'R':   /* Regiomontanus houses */
        fh1 = this.atand (tanfi * 0.5);
        fh2 = this.atand (tanfi * this.cosd(30));
        hsp.cusp [11] =  this.Asc1 (30 + th, fh1, sine, cose);
        hsp.cusp [12] =  this.Asc1 (60 + th, fh2, sine, cose);
        hsp.cusp [2] =  this.Asc1 (120 + th, fh2, sine, cose);
        hsp.cusp [3] =  this.Asc1 (150 + th, fh1, sine, cose);
        /* within polar circle, when mc sinks below horizon and
         * ascendant changes to western hemisphere, all cusps
         * must be added 180 degrees.
         * houses will be in clockwise direction */
        if (Math.abs(fi) >= 90 - ekl) {  /* within polar circle */
          acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
          if (acmc < 0) {
            hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
            hsp.mc = this.sl.swe_degnorm(hsp.mc + 180);
            for (i = 1; i <= 12; i++)
              hsp.cusp[i] = this.sl.swe_degnorm(hsp.cusp[i] + 180);
          }
        }
        break;
      case 'T':   /* 'topocentric' houses */
        fh1 = this.atand (tanfi / 3.0);
        fh2 = this.atand (tanfi * 2.0 / 3.0);
        hsp.cusp [11] =  this.Asc1 (30 + th, fh1, sine, cose);
        hsp.cusp [12] =  this.Asc1 (60 + th, fh2, sine, cose);
        hsp.cusp [2] =  this.Asc1 (120 + th, fh2, sine, cose);
        hsp.cusp [3] =  this.Asc1 (150 + th, fh1, sine, cose);
        /* within polar circle, when mc sinks below horizon and
         * ascendant changes to western hemisphere, all cusps
         * must be added 180 degrees.
         * houses will be in clockwise direction */
        if (Math.abs(fi) >= 90 - ekl) {  /* within polar circle */
          acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
          if (acmc < 0) {
            hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
            hsp.mc = this.sl.swe_degnorm(hsp.mc + 180);
            for (i = 1; i <= 12; i++)
              hsp.cusp[i] = this.sl.swe_degnorm(hsp.cusp[i] + 180);
          }
        }
        break;
      case 'V':   /* equal houses after Vehlow */
        /*
         * within polar circle we swap AC/DC if AC is on wrong side
         */
        acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
        if (acmc < 0) {
          hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
          hsp.cusp[1] = hsp.ac;
        }
        hsp.cusp [1] = this.sl.swe_degnorm(hsp.ac - 15);
        for (i = 2; i <=12; i++)
          hsp.cusp [i] = this.sl.swe_degnorm(hsp.cusp [1] + (i-1) * 30);
        break;
      case 'W':     /* equal, whole-sign houses */
        /*
        * within polar circle we swap AC/DC if AC is on wrong side
        */
        acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
        if (acmc < 0) {
          hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
          hsp.cusp[1] = hsp.ac;
        }
        hsp.cusp [1] = hsp.ac - (hsp.ac % 30);
        for (i = 2; i <=12; i++)
          hsp.cusp [i] = this.sl.swe_degnorm(hsp.cusp [1] + (i-1) * 30);
        break;
      case 'X': {
        /*
         * Meridian or axial rotation system:
         * ecliptic points whose rectascensions
         * are armc + n * 30
         */
        var j;
        var a2 = th;
        for (i = 1; i <= 12; i++) {
          j = i + 10;
          if (j > 12) {
            j -= 12;
          }
          a2 = this.sl.swe_degnorm(a2 + 30);
          if (Math.abs(a2 - 90) > this.VERY_SMALL
            && Math.abs(a2 - 270) > this.VERY_SMALL) {
            tant = this.tand(a2);
            hsp.cusp[j] = this.atand(tant / cose);
            if (a2 > 90 && a2 <= 270) {
              hsp.cusp[j] = this.sl.swe_degnorm(hsp.cusp[j] + 180);
            }
          } else {
            if (Math.abs(a2 - 90) <= this.VERY_SMALL) {
              hsp.cusp[j] = 90;
            } else {
              hsp.cusp[j] = 270;
            }
          } /*  if */
          hsp.cusp[j] = this.sl.swe_degnorm(hsp.cusp[j]);
        }
        acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
        if (acmc < 0) {
          hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
        }
        break;
        }
      case 'M': {
        /*
         * Morinus
         * points of the equator (armc + n * 30) are transformed
         * into the ecliptic coordinate system
         */
        var j;
        var am = th;
        var xm=new Array(3);
        for (i = 1; i <= 12; i++) {
          j = i + 10;
          if (j > 12) j -= 12;
          am = this.sl.swe_degnorm(am + 30);
          xm[0] = am;
          xm[1] = 0;
          this.sl.swe_cotrans(xm, 0, xm, 0, ekl);
          hsp.cusp[j] = xm[0];
        }
        acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
        if (acmc < 0) {
          hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
        }
        break;
        }
      case 'B': { /* Alcabitius */
        /* created by Alois 17-sep-2000, followed example in Matrix
           electrical library. The code reproduces the example!
           See http:           in the resuotl page, see program code example.
           I think the Alcabitius code in Walter Pullen's Astrolog 5.40
           is wrong, because he remains in RA and forgets the transform to
           the ecliptic. */
        var dek, r, sna, sda, sn3, sd3;
        if (Math.abs(fi) >= 90 - ekl) {  /* within polar circle */
          retc = Swe.ERR;
          this.makePorphyry(hsp);
          break;
        }
        acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
        if (acmc < 0) {
          hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
          hsp.cusp[1] = hsp.ac;
          acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
        }
        dek = this.asind(this.sind(hsp.ac) * sine);        /* declination of Ascendant */
        /* must treat the case fi == 90 or -90 */
        r = -tanfi * this.tand(dek);
        /* must treat the case of abs(r) > 1; probably does not happen
         * because dek becomes smaller when fi is large, as ac is close to
         * zero Aries/Libra in that case.
         */
        sda = Math.acos(r) * this.swed.RADTODEG; /* semidiurnal arc, measured on equator */
        sna = 180 - sda;          /* complement, seminocturnal arc */
        sd3 = sda / 3;
        sn3 = sna / 3;
        rectasc = this.sl.swe_degnorm(th + sd3);            /* cusp 11 */
        /* project rectasc onto eclipitic with pole height 0, i.e. along the
        declination circle */
        hsp.cusp [11] = this.Asc1 (rectasc, 0, sine, cose);
        rectasc = this.sl.swe_degnorm(th + 2 * sd3);        /* cusp 12 */
        hsp.cusp [12] = this.Asc1 (rectasc, 0, sine, cose);
        rectasc = this.sl.swe_degnorm(th + 180 - 2 * sn3);  /* cusp 2 */
        hsp.cusp [2] = this.Asc1 (rectasc, 0, sine, cose);
        rectasc = this.sl.swe_degnorm(th + 180 -  sn3);     /* cusp 3 */
        hsp.cusp [3] = this.Asc1 (rectasc, 0, sine, cose);
        }
        break;
      case 'G': {   /* 36 Gauquelin sectors */
        for (i = 1; i <= 36; i++) {
          hsp.cusp[i] = 0;
        }
        if (Math.abs(fi) >= 90 - ekl) {  /* within polar circle */
          retc = Swe.ERR;
                    this.makePorphyry(hsp);
        }
        /*************** forth/second quarter ***************/
        /* note: Gauquelin sectors are counted in clockwise direction */
        a = this.asind(this.tand(fi) * tane);
        for (ih = 2; ih <= 9; ih++) {
          ih2 = 10 - ih;
          fh1 = this.atand(this.sind(a * ih2 / 9) / tane);
          rectasc = this.sl.swe_degnorm((90 / 9) * ih2 + th);
          tant = this.tand(this.asind(sine * this.sind(this.Asc1 (rectasc, fh1, sine, cose))));
          if (Math.abs(tant) < this.VERY_SMALL) {
            hsp.cusp[ih] = rectasc;
          } else {
            /* pole height */
            f = this.atand(this.sind(this.asind(tanfi * tant) * ih2 / 9)  /tant);
            hsp.cusp [ih] = this.Asc1 (rectasc, f, sine, cose);
            for (i = 1; i <= iteration_count; i++) {
            tant = this.tand(this.asind(sine * this.sind(hsp.cusp[ih])));
            if (Math.abs(tant) < this.VERY_SMALL) {
              hsp.cusp[ih] = rectasc;
              break;
            }
            /* pole height */
            f = this.atand(this.sind(this.asind(tanfi * tant) * ih2 / 9) / tant);
            hsp.cusp[ih] = this.Asc1 (rectasc, f, sine, cose);
            }
          }
          hsp.cusp[ih+18] = this.sl.swe_degnorm(hsp.cusp[ih] + 180);
        }
        /*************** first/third quarter ***************/
        for (ih = 29; ih <= 36; ih++) {
          ih2 = ih - 28;
          fh1 = this.atand(this.sind(a * ih2 / 9) / tane);
          rectasc = this.sl.swe_degnorm(180 - ih2 * 90 / 9 + th);
          tant = this.tand(this.asind(sine * this.sind(this.Asc1 (rectasc, fh1, sine, cose))));
          if (Math.abs(tant) < this.VERY_SMALL) {
            hsp.cusp[ih] = rectasc;
          } else {
            f = this.atand(this.sind(this.asind(tanfi * tant) * ih2 / 9) / tant);
            /*  pole height */
            hsp.cusp[ih] = this.Asc1 (rectasc, f, sine, cose);
            for (i = 1; i <= iteration_count; i++) {
            tant = this.tand(this.asind(sine * this.sind(hsp.cusp[ih])));
            if (Math.abs(tant) < this.VERY_SMALL) {
              hsp.cusp[ih] = rectasc;
              break;
            }
            f = this.atand(this.sind(this.asind(tanfi * tant) * ih2 / 9) / tant);
            /*  pole height */
            hsp.cusp[ih] = this.Asc1 (rectasc, f, sine, cose);
            }
          }
          hsp.cusp[ih-18] = this.sl.swe_degnorm(hsp.cusp[ih] + 180);
        }
        hsp.cusp[1] = hsp.ac;
        hsp.cusp[10] = hsp.mc;
        hsp.cusp[19] = this.sl.swe_degnorm(hsp.ac + 180);
        hsp.cusp[28] = this.sl.swe_degnorm(hsp.mc + 180);
        break;
        }
      case 'U': /* Krusinski-Pisa */
        /*
         * The following code was written by Bogdan Krusinski in 2006.
         * bogdan@astrologia.pl
         *
         * Definition:
         * "Krusinski - house system based on the great circle passing through 
         * ascendant and zenith. This circle is divided into 12 equal parts 
         * (1st cusp is ascendant, 10th cusp is zenith), then the resulting 
         * points are projected onto the ecliptic through meridian circles.
         * The house cusps in space are half-circles perpendicular to the equator
         * and running from the north to the south celestial pole through the
         * resulting cusp points on the house circle. The points where they 
         * cross the ecliptic mark the ecliptic house cusps."
         *
         * Description of the algorithm:
         * Transform into great circle running through Asc and zenit (where arc 
         * between Asc and zenith is always 90 deg), and then return with 
         * house cusps into ecliptic. Eg. solve trigonometrical triangle 
         * with three transformations and two rotations starting from ecliptic. 
         * House cusps in space are meridian circles. 
         *
         * Notes:
         * 1. In this definition we assume MC on ecliptic as point where
         *    half-meridian (from north to south pole) cuts ecliptic,
         *    so MC may be below horizon in arctic regions.
         * 2.  could be calculated in all latitudes except the poles 
         *    themselves (-90,90) and points on arctic circle in cases where 
         *    ecliptic is equal to horizon and then ascendant is undefined. 
         *    But ascendant when 'horizon=ecliptic' could be deduced as limes 
         *    from both sides of that point and houses with that provision can 
         *    be computed also there.
         *
         * Starting values for calculations:
         *     - Asc ecliptic longitude
         *     - right ascension of MC (RAMC)
         *     - geographic latitude.
         */
        /*
         * within polar circle we swap AC/DC if AC is on wrong side
         */
        acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
        if (acmc < 0) {
          hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
        }
        /* A0. Start point - ecliptic coords of ascendant */
        x[0] = hsp.ac; /* Asc longitude   */
        x[1] = 0.0;     /* Asc declination */
        x[2] = 1.0;     /* Radius to test validity of subsequent transformations. */
        this.sl.swe_cotrans(x, x, -ekl);      /* A1. Transform into equatorial coords */
        x[0] = x[0] - (th-90);        /* A2. Rotate                           */
        this.sl.swe_cotrans(x, x, -(90-fi));  /* A3. Transform into horizontal coords */
        krHorizonLon = x[0];          /* ...save asc lon on horizon to get back later with house cusp */
        x[0] = x[0] - x[0];           /* A4. Rotate                           */
        this.sl.swe_cotrans(x, x, -90);       /* A5. Transform into this house system great circle (asc-zenith) */
        /* As it is house circle now, simple add 30 deg increments... */
        for(i = 0; i < 6; i++) {
          /* B0. Set 'n-th' house cusp. 
           *     Note that IC/MC are also calculated here to check 
           *     if really this is the asc-zenith great circle. */
          x[0] = 30.0*i;
          x[1] = 0.0;
          this.sl.swe_cotrans(x, x, 90);                 /* B1. Transform back into horizontal coords */
          x[0] = x[0] + krHorizonLon;            /* B2. Rotate back.                          */
          this.sl.swe_cotrans(x, x, 90-fi);              /* B3. Transform back into equatorial coords */
          x[0] = this.sl.swe_degnorm(x[0] + (th-90));    /* B4. Rotate back -> RA of house cusp as result. */
          /* B5. Where's this house cusp on ecliptic? */
          /* ... so last but not least - get ecliptic longitude of house cusp: */
          hsp.cusp[i+1] = this.atand(this.tand(x[0])/this.cosd(ekl));
          if (x[0] > 90 && x[0] <= 270)
            hsp.cusp[i+1] = this.sl.swe_degnorm(hsp.cusp[i+1] + 180);
          hsp.cusp[i+1] = this.sl.swe_degnorm(hsp.cusp[i+1]);
          hsp.cusp[i+7] = this.sl.swe_degnorm(hsp.cusp[i+1]+180);
        }
        break;
      case 'Y':     /* APC houses */
        for (i = 1; i <= 12; i++) {
          hsp.cusp[i] = apc_sector(i, fi * this.swed.DEGTORAD, ekl * this.swed.DEGTORAD, th * this.swed.DEGTORAD);
        }
        hsp.ac = hsp.cusp[1];
        hsp.mc = hsp.cusp[10];
        /* within polar circle, when mc sinks below horizon and 
         * ascendant changes to western hemisphere, all cusps
         * must be added 180 degrees. 
         * houses will be in clockwise direction */
        if (Math.abs(fi) >= 90 - ekl) {  /* within polar circle */
          acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
          if (acmc < 0) {
            hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
            hsp.mc = this.sl.swe_degnorm(hsp.mc + 180);
      for (i = 1; i <= 12; i++)
        hsp.cusp[i] = this.sl.swe_degnorm(hsp.cusp[i] + 180);
          }
        }
        break;
      default:    /* Placidus houses */
        if (hsy != 'P') {
        }
        if (Math.abs(fi) >= 90 - ekl) {  /* within polar circle */
          retc = Swe.ERR;
          this.makePorphyry(hsp);
          break;
        }
        a = this.asind(this.tand(fi) * tane);
        fh1 = this.atand(this.sind(a / 3) / tane);
        fh2 = this.atand(this.sind(a * 2 / 3) / tane);
        /* ************  house 11 ******************** */
        rectasc = this.sl.swe_degnorm(30 + th);
        tant = this.tand(this.asind(sine * this.sind(this.Asc1 (rectasc, fh1, sine, cose))));
        if (Math.abs(tant) < this.VERY_SMALL) {
          hsp.cusp [11] = rectasc;
        } else {
          /* pole height */
          f = this.atand(this.sind(this.asind(tanfi * tant) / 3)  /tant);
          hsp.cusp [11] = this.Asc1 (rectasc, f, sine, cose);
          for (i = 1; i <= iteration_count; i++) {
            tant = this.tand(this.asind(sine * this.sind(hsp.cusp [11])));
            if (Math.abs(tant) < this.VERY_SMALL) {
              hsp.cusp [11] = rectasc;
              break;
            }
            /* pole height */
            f = this.atand(this.sind(this.asind(tanfi * tant) / 3) / tant);
            hsp.cusp [11] = this.Asc1 (rectasc, f, sine, cose);
          }
        }
        /* ************  house 12 ******************** */
        rectasc = this.sl.swe_degnorm(60 + th);
        tant = this.tand(this.asind(sine*this.sind(this.Asc1 (rectasc,  fh2, sine, cose))));
        if (Math.abs(tant) < this.VERY_SMALL) {
          hsp.cusp [12] = rectasc;
        } else {
          f = this.atand(this.sind(this.asind(tanfi * tant) / 1.5) / tant);
          /*  pole height */
          hsp.cusp [12] = this.Asc1 (rectasc, f, sine, cose);
          for (i = 1; i <= iteration_count; i++) {
            tant = this.tand(this.asind(sine * this.sind(hsp.cusp [12])));
            if (Math.abs(tant) < this.VERY_SMALL) {
              hsp.cusp [12] = rectasc;
              break;
            }
            f = this.atand(this.sind(this.asind(tanfi * tant) / 1.5) / tant);
            /*  pole height */
            hsp.cusp [12] = this.Asc1 (rectasc, f, sine, cose);
          }
        }
        /* ************  house  2 ******************** */
        rectasc = this.sl.swe_degnorm(120 + th);
        tant = this.tand(this.asind(sine * this.sind(this.Asc1 (rectasc, fh2, sine, cose))));
        if (Math.abs(tant) < this.VERY_SMALL) {
          hsp.cusp [2] = rectasc;
        } else {
          f = this.atand(this.sind(this.asind(tanfi * tant) / 1.5) / tant);
          /*  pole height */
          hsp.cusp [2] = this.Asc1 (rectasc, f, sine, cose);
          for (i = 1; i <= iteration_count; i++) {
            tant = this.tand(this.asind(sine * this.sind(hsp.cusp [2])));
            if (Math.abs(tant) < this.VERY_SMALL) {
              hsp.cusp [2] = rectasc;
              break;
            }
            f = this.atand(this.sind(this.asind(tanfi * tant) / 1.5) / tant);
            /*  pole height */
            hsp.cusp [2] = this.Asc1 (rectasc, f, sine, cose);
          }
        }
        /* ************  house  3 ******************** */
        rectasc = this.sl.swe_degnorm(150 + th);
        tant = this.tand(this.asind(sine * this.sind(this.Asc1 (rectasc, fh1, sine, cose))));
        if (Math.abs(tant) < this.VERY_SMALL) {
          hsp.cusp [3] = rectasc;
        } else {
          f = this.atand(this.sind(this.asind(tanfi * tant) / 3) / tant);
          /*  pole height */
          hsp.cusp [3] = this.Asc1(rectasc, f, sine, cose);
          for (i = 1; i <= iteration_count; i++) {
            tant = this.tand(this.asind(sine * this.sind(hsp.cusp [3])));
            if (Math.abs(tant) < this.VERY_SMALL) {
              hsp.cusp [3] = rectasc;
              break;
            }
            f = this.atand(this.sind(this.asind(tanfi * tant) / 3) / tant);
            /*  pole height */
            hsp.cusp [3] = this.Asc1 (rectasc, f, sine, cose);
          }
        }
        break;
    } /* end switch */
    if (hsy != 'G' && hsy != 'Y') {
      hsp.cusp [4] = this.sl.swe_degnorm(hsp.cusp [10] + 180);
      hsp.cusp [5] = this.sl.swe_degnorm(hsp.cusp [11] + 180);
      hsp.cusp [6] = this.sl.swe_degnorm(hsp.cusp [12] + 180);
      hsp.cusp [7] = this.sl.swe_degnorm(hsp.cusp [1] + 180);
      hsp.cusp [8] = this.sl.swe_degnorm(hsp.cusp [2] + 180);
      hsp.cusp [9] = this.sl.swe_degnorm(hsp.cusp [3] + 180);
    }
    /* vertex */
    if (fi >= 0) {
      f = 90 - fi;
    } else {
      f = -90 - fi;
    }
    hsp.vertex = this.Asc1 (th - 90, f, sine, cose);
    /* with tropical latitudes, the vertex behaves strange,
     * in a similar way as the ascendant within the polar
     * circle. we keep it always on the western hemisphere.*/
    if (Math.abs(fi) <= ekl) {
      vemc = this.sl.swe_difdeg2n(hsp.vertex, hsp.mc);
      if (vemc > 0) {
        hsp.vertex = this.sl.swe_degnorm(hsp.vertex + 180);
      }
    }
    /*
     * some strange points:
     */
    /* equasc (equatorial ascendant) */
    th2 = this.sl.swe_degnorm(th + 90);
    if (Math.abs(th2 - 90) > this.VERY_SMALL
      && Math.abs(th2 - 270) > this.VERY_SMALL) {
      tant = this.tand(th2);
      hsp.equasc = this.atand(tant / cose);
      if (th2 > 90 && th2 <= 270) {
        hsp.equasc = this.sl.swe_degnorm(hsp.equasc + 180);
      }
    } else {
      if (Math.abs(th2 - 90) <= this.VERY_SMALL) {
        hsp.equasc = 90;
      } else {
        hsp.equasc = 270;
      }
    } /*  if */
    hsp.equasc = this.sl.swe_degnorm(hsp.equasc);
    /* "co-ascendant" W. Koch */
    hsp.coasc1 = this.sl.swe_degnorm(this.Asc1 (th - 90, fi, sine, cose) + 180);
    /* "co-ascendant" M. Munkasey */
    if (fi >= 0) {
      hsp.coasc2 = this.Asc1 (th + 90, 90 - fi, sine, cose);
    } else /* southern hemisphere */ {
      hsp.coasc2 = this.Asc1 (th + 90, -90 - fi, sine, cose);
    }
    /* "polar ascendant" M. Munkasey */
    hsp.polasc = this.Asc1 (th - 90, fi, sine, cose);
    return retc;
  } /* procedure houses */

  /**
  * This is just a wrapping function to deal with the <CODE>goto</CODE>'s in
  * the original C-Code.
  */
  makePorphyry(hsp) {
    /*
     * within polar circle we swap AC/DC if AC is on wrong side
     */
    var acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
    if (acmc < 0) {
      hsp.ac = this.sl.swe_degnorm(hsp.ac + 180);
      hsp.cusp[1] = hsp.ac;
      acmc = this.sl.swe_difdeg2n(hsp.ac, hsp.mc);
    }
    hsp.cusp [2] = this.sl.swe_degnorm(hsp.ac + (180 - acmc) / 3);
    hsp.cusp [3] = this.sl.swe_degnorm(hsp.ac + (180 - acmc) / 3 * 2);
    hsp.cusp [11] = this.sl.swe_degnorm(hsp.mc + acmc / 3);
    hsp.cusp [12] = this.sl.swe_degnorm(hsp.mc + acmc / 3 * 2);
  }

  /******************************/
  Asc1 (x1, f, sine, cose) {
    var n;
    var ass;
    x1 = this.sl.swe_degnorm(x1);
    n  = parseInt ((x1 / 90) + 1);
    if (n == 1) {
      ass = ( this.Asc2 (x1, f, sine, cose));
    } else if (n == 2) {
      ass = (180 - this.Asc2 (180 - x1, - f, sine, cose));
    } else if (n == 3) {
      ass = (180 + this.Asc2 (x1 - 180, - f, sine, cose));
    } else {
      ass = (360 - this.Asc2 (360- x1,  f, sine, cose));
    }
    ass = this.sl.swe_degnorm(ass);
    if (Math.abs(ass - 90) < this.VERY_SMALL)        /* rounding, e.g.: if */ {
      ass = 90;                           /* fi = 0 & st = 0, ac = 89.999... */
    }
    if (Math.abs(ass - 180) < this.VERY_SMALL) {
      ass = 180;
    }
    if (Math.abs(ass - 270) < this.VERY_SMALL)        /* rounding, e.g.: if */ {
      ass = 270;                          /* fi = 0 & st = 0, ac = 89.999... */
    }
    if (Math.abs(ass - 360) < this.VERY_SMALL) {
      ass = 0;
    }
    return ass;
  }  /* Asc1 */

  Asc2 (x, f, sine, cose) {
    var n;
    var ass, sinx;
    ass = - this.tand(f) * sine + cose * this.cosd(x);
    if (Math.abs(ass) < this.VERY_SMALL) {
      ass = 0;
    }
    sinx = this.sind(x);
    if (Math.abs(sinx) < this.VERY_SMALL) {
      sinx = 0;
    }
    if (sinx == 0) {
      if (ass < 0) {
        ass = -this.VERY_SMALL;
      } else {
        ass = this.VERY_SMALL;
      }
    } else if (ass == 0) {
      if (sinx < 0) {
        ass = -90;
      } else {
        ass = 90;
      }
    } else {
      ass = this.atand(sinx / ass);
    }
    if (ass < 0) {
      ass = 180 + ass;
    }
    return (ass);
  } /* Asc2 */


  /* Computes the house position of a planet or another point,
   * in degrees: 0 - 30 = 1st house, 30 - 60 = 2nd house, etc.
   * armc         sidereal time in degrees
   * geolat       geographic latitude
   * eps          true ecliptic obliquity
   * hsys         house system character
   * xpin         array of 6 doubles:
   *              only the first two of them are used: ecl. long., lat.
   * serr         error message area
   *
   * House position is returned by function.
   *
   * IMPORTANT: This function should NOT be used for sidereal astrology.
   * If you cannot avoid doing so, please note:
   * - The input longitudes (xpin) MUST always be tropical, even if you
   *   are a siderealist.
   * - Sidereal and tropical house positions are identical for most house
   *   systems, if a traditional definition of the sidereal zodiac is used
   *   (sid = trop - ayanamsa).
   * - The function does NOT provide correct positions for Whole Sign houses.
   * - The function does NOT provide correct positions, if you use a
   *   non-traditional sidereal method (where the sidereal plane is not
   *   identical to the ecliptic of date) with a house system whose definition
   *   is dependent on the ecliptic, such as:
   *   equal, Porphyry, Alcabitius, Koch, Krusinski (all others should work).
   * The Swiss Ephemeris currently does not handle these cases.
   */
  /**
  * The function returns a value between 1.0 and 12.999999, indicating in
  * which house a planet is and how far from its cusp it is. It computes
  * the house position of a planet or another point in degrees: 0 - 30 =
  * 1st house, 30 - 60 = 2nd house, etc.
  * @param armc The ARMC (sidereal time in degrees)
  * @param geolat The geographic latitude
  * @param eps The true ecliptic obliquity (e.g. xx[0] of swe_calc(...))
  * @param hsys The house system. See swe_houses(...) for a description
  * of the possible houses.
  * @param xpin A double[6] containing the ecliptic longitude and latitude of
  * the planet in degrees in xpin[0] and xpin[1]. The other xpin[] values are
  * not used, but the array has to be this size! The values must describe
  * tropical positions.
  * @param serr StringBuffer to contain any error messages or warnings
  * @return A value between 1.0 and 12.999999, indicating in which house a
  * planet is and how far from its cusp it is.
  * #swe_houses
  */
  swe_house_pos(armc, geolat, eps, hsys, xpin) {
    var xp=new Array(6), xeq=new Array(6), ra, de, mdd, mdn, sad, san;
    var hpos, sinad, ad, a, admc, adp, samc, demc, asc, mc, acmc, tant;
    var fh, ra0, tanfi, fac, dfac;
    var x=new Array(3), xasc=new Array(3), raep, raaz, oblaz, xtemp; /* BK 21.02.2006 */
    var sine = this.sind(eps);
    var cose = this.cosd(eps);
    var is_above_hor = false;
    var is_invalid = false;
    var is_circumpolar = false;

    hsys = hsys;
    xeq[0] = xpin[0];
    xeq[1] = xpin[1];
    xeq[2] = 1;
    this.sl.swe_cotrans(xpin, 0, xeq, 0, -eps);
    ra = xeq[0];
    de = xeq[1];
    mdd = this.sl.swe_degnorm(ra - armc);
    mdn = this.sl.swe_degnorm(mdd + 180);
    if (mdd >= 180) {
      mdd -= 360;
    }
    if (mdn >= 180) {
      mdn -= 360;
    }
    /* xp[0] will contain the house position, a value between 0 and 360 */
    switch(hsys) {
      case 'A':
      case 'E':
      case 'V':
      case 'W':
        asc = this.Asc1 (this.sl.swe_degnorm(armc + 90), geolat, sine, cose);
        demc = this.atand(this.sind(armc) * this.tand(eps));
        if (geolat >= 0 && 90 - geolat + demc < 0) {
          asc = this.sl.swe_degnorm(asc + 180);
        }
        if (geolat < 0 && -90 - geolat + demc > 0) {
          asc = this.sl.swe_degnorm(asc + 180);
        }
        xp[0] = this.sl.swe_degnorm(xpin[0] - asc);
        if (hsys == 'V') {
          xp[0] = this.sl.swe_degnorm(xp[0] + 15);
        }
        if (hsys == 'W') {
          xp[0] = this.sl.swe_degnorm(xp[0] + (asc % 30));
        }
        /* to make sure that a call with a house cusp position returns
         * a value within the house, 0.001" is added */
        xp[0] = this.sl.swe_degnorm(xp[0] + this.MILLIARCSEC);
        hpos = xp[0] / 30.0 + 1;
      break;
      case 'O':  /* Porphyry */
      case 'B':  /* Alcabitius */
        asc = this.Asc1 (this.sl.swe_degnorm(armc + 90), geolat, sine, cose);
        demc = this.atand(this.sind(armc) * this.tand(eps));
        /* mc */
        if (Math.abs(armc - 90) > this.VERY_SMALL
                && Math.abs(armc - 270) > this.VERY_SMALL) {
          tant = this.tand(armc);
          mc = this.sl.swe_degnorm(this.atand(tant / cose));
          if (armc > 90 && armc <= 270) {
            mc = this.sl.swe_degnorm(mc + 180);
          }
        } else {
          if (Math.abs(armc - 90) <= this.VERY_SMALL) {
            mc = 90;
          } else {
            mc = 270;
          }
        }
        /* while MC is always south,
         * Asc must always be in eastern hemisphere */
        if (geolat >= 0 && 90 - geolat + demc < 0) {
          asc = this.sl.swe_degnorm(asc + 180);
        }
        if (geolat < 0 && -90 - geolat + demc > 0) {
          asc = this.sl.swe_degnorm(asc + 180);
        }
        if (hsys ==  'O') {
          xp[0] = this.sl.swe_degnorm(xpin[0] - asc);
          /* to make sure that a call with a house cusp position returns
           * a value within the house, 0.001" is added */
          xp[0] = this.sl.swe_degnorm(xp[0] + this.MILLIARCSEC);
          if (xp[0] < 180) {
            hpos = 1;
          } else {
            hpos = 7;
            xp[0] -= 180;
          }
          acmc = this.sl.swe_difdeg2n(asc, mc);
          if (xp[0] < 180 - acmc) {
            hpos += xp[0] * 3 / (180 - acmc);
          } else {
            hpos += 3 + (xp[0] - 180 + acmc) * 3 / acmc;
          }
        } else { /* Alcabitius */
          var dek, r, sna, sda;
          dek = this.asind(this.sind(asc) * sine);  /* declination of Ascendant */
          /* must treat the case fi == 90 or -90 */
          tanfi = this.tand(geolat);
          r = -tanfi * this.tand(dek);
          /* must treat the case of abs(r) > 1; probably does not happen
           * because dek becomes smaller when fi is large, as ac is close to
           * zero Aries/Libra in that case.
           */
          sda = Math.acos(r) * this.swed.RADTODEG;       /* semidiurnal arc, measured on equator */
          sna = 180 - sda;                /* complement, seminocturnal arc */
          if (mdd > 0) {
            if (mdd < sda)
              hpos = mdd * 90 / sda;
            else
              hpos = 90 + (mdd - sda) * 90 / sna;
          } else {
            if (mdd > -sna)
              hpos = 360 + mdd * 90 / sna;
            else
              hpos = 270 + (mdd + sna) * 90 / sda;
          }
          hpos = this.sl.swe_degnorm(hpos - 90) / 30.0 + 1.0;
          if (hpos >= 13.0) hpos -= 12;
        }
      break;
      case 'X': /* Merdidian or axial rotation system */
        hpos = this.sl.swe_degnorm(mdd - 90) / 30.0 + 1.0;
      break;
      case 'M': { /* Morinus */
        var am = xpin[0];
        if (Math.abs(am - 90) > this.VERY_SMALL
          && Math.abs(am - 270) > this.VERY_SMALL) {
          tant = this.tand(am);
          hpos = this.atand(tant / cose);
          if (am > 90 && am <= 270) {
            hpos = this.sl.swe_degnorm(hpos + 180);
          }
        } else {
          if (Math.abs(am - 90) <= this.VERY_SMALL) {
            hpos = 90;
          } else {
            hpos = 270;
          }
        } /*  if */
        hpos = this.sl.swe_degnorm(hpos - armc - 90);
        hpos = hpos / 30.0 + 1;
      }
      break;

      /* version of Koch method: do calculations within circumpolar circle,
       * if possible; make sure house positions 4 - 9 only appear on western
       * hemisphere */ 
      case 'K': 
        demc = this.atand(this.sind(armc) * this.tand(eps));
        is_invalid = false;
        is_circumpolar = false;
        /* object is within a circumpolar circle */
        if (90 - geolat < de || -90 - geolat > de) {
          adp = 90;
          is_circumpolar = true;
        }
        /* object is within a circumpolar circle, southern hemisphere */
        else if (geolat - 90 > de || geolat + 90 < de) {
          adp = -90;
          is_circumpolar = true;
        }
        /* object does rise and set */
        else {
          adp = this.asind(this.tand(geolat) * this.tand(de));
        }
        admc = this.tand(eps) * this.tand(geolat) * this.sind(armc);
        /* midheaven is circumpolar */
        if (Math.abs(admc) > 1) {
          if (admc > 1)
            admc = 1;
          else
            admc = -1;
          is_circumpolar = true;
        }
        admc = this.asind(admc);
        samc = 90 + admc;
        if (samc == 0)
          is_invalid = true;
        if (Math.abs(samc) > 0) {
          if (mdd >= 0) { /* east */
            dfac = (mdd - adp + admc) / samc;
            xp[0] = this.sl.swe_degnorm((dfac - 1) * 90);
            xp[0] = this.sl.swe_degnorm(xp[0] + this.MILLIARCSEC);
            /* eastern object has longer SA than midheaven */
            if (dfac > 2 || dfac < 0)
              is_invalid = true; /* if this is omitted, funny things happen */
          } else {
            dfac = (mdd + 180 + adp + admc) / samc;
            xp[0] = this.sl.swe_degnorm((dfac + 1) * 90);
            xp[0] = this.sl.swe_degnorm(xp[0] + this.MILLIARCSEC);
            /* western object has longer SA than midheaven */
            if (dfac > 2 || dfac < 0)
              is_invalid = true; /* if this is omitted, funny things happen */
          }
        }
        if (is_invalid) {
          xp[0] = 0;
          hpos = 0;
          break;
        }

        /* to make sure that a call with a house cusp position returns
         * a value within the house, 0.001" is added */
        hpos = xp[0] / 30.0 + 1;
        break;
      case 'C':
        xeq[0] = this.sl.swe_degnorm(mdd - 90);
        this.sl.swe_cotrans(xeq, 0, xp, 0, -geolat);
        /* to make sure that a call with a house cusp position returns
         * a value within the house, 0.001" is added */
        xp[0] = this.sl.swe_degnorm(xp[0] + this.MILLIARCSEC);
        hpos = xp[0] / 30.0 + 1;
        break;
      case 'U': /* Krusinski-Pisa-Goelzer */
        /* Purpose: find point where planet's house circle (meridian)
         * cuts house plane, giving exact planet's house position.
         * Input data: ramc, geolat, asc.
         */
        asc = this.Asc1 (this.sl.swe_degnorm(armc + 90), geolat, sine, cose);
        demc = this.atand(this.sind(armc) * this.tand(eps));
        /* while MC is always south, 
         * Asc must always be in eastern hemisphere */
        if (geolat >= 0 && 90 - geolat + demc < 0) {
          asc = this.sl.swe_degnorm(asc + 180);
        }
        if (geolat < 0 && -90 - geolat + demc > 0) {
          asc = this.sl.swe_degnorm(asc + 180);
        }
        /*
         * Descr: find the house plane 'asc-zenith' - where it intersects 
         * with equator and at what angle, and then simple find arc 
         * from asc on that plane to planet's meridian intersection 
         * with this plane.
         */
        /* I. find plane of 'asc-zenith' great circle relative to equator: 
         *   solve spherical triangle 'EP-asc-intersection of house circle with equator' */
        /* Ia. Find intersection of house plane with equator: */
        x[0] = asc; x[1] = 0.0; x[2] = 1.0;          /* 1. Start with ascendant on ecliptic     */
        this.sl.swe_cotrans(x, x, -eps);                     /* 2. Transform asc into equatorial coords */
        raep = this.sl.swe_degnorm(armc + 90);               /* 3. RA of east point                     */
        x[0] = this.sl.swe_degnorm(raep - x[0]);             /* 4. Rotation - found arc raas-raep      */
        this.sl.swe_cotrans(x, x, -(90-geolat));             /* 5. Transform into horizontal coords - arc EP-asc on horizon */
        xtemp = this.atand(this.tand(x[0])/this.cosd((90-geolat))); /* 6. Rotation from horizon on circle perpendicular to equator */
        if (x[0] > 90 && x[0] <= 270)
        xtemp = this.sl.swe_degnorm(xtemp + 180);
        x[0] = this.sl.swe_degnorm(xtemp);        
        raaz = this.sl.swe_degnorm(raep - x[0]); /* result: RA of intersection 'asc-zenith' great circle with equator */
        /* Ib. Find obliquity to equator of 'asc-zenith' house plane: */
        x[0] = raaz; x[1] = 0.0; 
        x[0] = this.sl.swe_degnorm(raep - x[0]);  /* 1. Rotate start point relative to EP   */
        this.sl.swe_cotrans(x, x, -(90-geolat));  /* 2. Transform into horizontal coords    */
        x[1] = x[1] + 90;                 /* 3. Add 90 deg do decl - so get the point on house plane most distant from equ. */
        this.sl.swe_cotrans(x, x, 90-geolat);     /* 4. Rotate back to equator              */
        oblaz = x[1];                     /* 5. Obliquity of house plane to equator */
        /* II. Next find asc and planet position on house plane, 
         *     so to find relative distance of planet from 
         *     coords beginning. */
        /* IIa. Asc on house plane relative to intersection 
         *      of equator with 'asc-zenith' plane. */
        xasc[0] = asc; xasc[1] = 0.0; xasc[2] = 1.0;
        this.sl.swe_cotrans(xasc, xasc, -eps);
        xasc[0] = this.sl.swe_degnorm(xasc[0] - raaz);
        xtemp = this.atand(this.tand(xasc[0])/this.cosd(oblaz));
        if (xasc[0] > 90 && xasc[0] <= 270)
        xtemp = this.sl.swe_degnorm(xtemp + 180);
        xasc[0] = this.sl.swe_degnorm(xtemp);
        /* IIb. Planet on house plane relative to intersection 
         *      of equator with 'asc-zenith' plane */
        xp[0] = this.sl.swe_degnorm(xeq[0] - raaz);        /* Rotate on equator  */
        xtemp = this.atand(this.tand(xp[0])/this.cosd(oblaz));    /* Find arc on house plane from equator */
        if (xp[0] > 90 && xp[0] <= 270)
          xtemp = this.sl.swe_degnorm(xtemp + 180);
        xp[0] = this.sl.swe_degnorm(xtemp);
        xp[0] = this.sl.swe_degnorm(xp[0]-xasc[0]); /* find arc between asc and planet, and get planet house position  */
        /* IIc. Distance from planet to house plane on declination circle: */
        x[0] = xeq[0];
        x[1] = xeq[1];
        this.sl.swe_cotrans(x, x, oblaz);
        xp[1] = xeq[1] - x[1]; /* How many degrees is the point on declination circle from house circle */
        /* to make sure that a call with a house cusp position returns
         * a value within the house, 0.001" is added */
        xp[0] = this.sl.swe_degnorm(xp[0] + this.MILLIARCSEC);
        hpos = xp[0] / 30.0 + 1;
        break;
      case 'H':
        xeq[0] = this.sl.swe_degnorm(mdd - 90);
        this.sl.swe_cotrans(xeq, 0, xp, 0, 90 - geolat);
        /* to make sure that a call with a house cusp position returns
         * a value within the house, 0.001" is added */
        xp[0] = this.sl.swe_degnorm(xp[0] + this.MILLIARCSEC);
        hpos = xp[0] / 30.0 + 1;
        break;
      case 'R':
        if (Math.abs(mdd) < this.VERY_SMALL) {
          xp[0] = 270;
        } else if (180 - Math.abs(mdd) < this.VERY_SMALL) {
          xp[0] = 90;
        } else {
          if (90 - Math.abs(geolat) < this.VERY_SMALL) {
            if (geolat > 0) {
              geolat = 90 - this.VERY_SMALL;
            } else {
              geolat = -90 + this.VERY_SMALL;
            }
          }
          if (90 - Math.abs(de) < this.VERY_SMALL) {
            if (de > 0) {
              de = 90 - this.VERY_SMALL;
            } else {
              de = -90 + this.VERY_SMALL;
            }
          }
          a = this.tand(geolat) * this.tand(de) + this.cosd(mdd);
          xp[0] = this.sl.swe_degnorm(this.atand(-a / this.sind(mdd)));
          if (mdd < 0) {
            xp[0] += 180;
          }
          xp[0] = this.sl.swe_degnorm(xp[0]);
          /* to make sure that a call with a house cusp position returns
           * a value within the house, 0.001" is added */
          xp[0] = this.sl.swe_degnorm(xp[0] + this.MILLIARCSEC);
        }
        hpos = xp[0] / 30.0 + 1;
        break;
      case 'T':
        mdd = this.sl.swe_degnorm(mdd);
        if (de > 90 - this.VERY_SMALL) {
          de = 90 - this.VERY_SMALL;
        }
        if (de < -90 + this.VERY_SMALL) {
          de = -90 + this.VERY_SMALL;
        }
        sinad = this.tand(de) * this.tand(geolat);
        ad = this.asind(sinad);
        a = sinad + this.cosd(mdd);
        if (a >= 0) {
          is_above_hor = true;
        }
        /* mirror everything below the horizon to the opposite point
         * above the horizon */
        if (!is_above_hor) {
          ra = this.sl.swe_degnorm(ra + 180);
          de = -de;
          mdd = this.sl.swe_degnorm(mdd + 180);
        }
        /* mirror everything on western hemisphere to eastern hemisphere */
        if (mdd > 180) {
          ra = this.sl.swe_degnorm(armc - mdd);
        }
        /* binary search for "topocentric" position line of body */
        tanfi = this.tand(geolat);
        fh = geolat;
        ra0 = this.sl.swe_degnorm(armc + 90);
        xp[1] = 1;
        xeq[1] = de;
        fac = 2;
        while (Math.abs(xp[1]) > 0.000001) {
          if (xp[1] > 0) {
            fh = this.atand(this.tand(fh) - tanfi / fac);
            ra0 -= 90 / fac;
          } else {
            fh = this.atand(this.tand(fh) + tanfi / fac);
            ra0 += 90 / fac;
          }
          xeq[0] = this.sl.swe_degnorm(ra - ra0);
          this.sl.swe_cotrans(xeq, 0, xp, 0, 90 - fh);
          fac *= 2;
        }
        hpos = this.sl.swe_degnorm(ra0 - armc);
        /* mirror back to west */
        if (mdd > 180) {
          hpos = this.sl.swe_degnorm(-hpos);
        }
        /* mirror back to below horizon */
        if (!is_above_hor) {
          hpos = this.sl.swe_degnorm(hpos + 180);
        }
        hpos = this.sl.swe_degnorm(hpos - 90) / 30 + 1;
        break;
      case 'P':
      case 'G':
      default:
         /* circumpolar region */
        if (90 - Math.abs(de) <= Math.abs(geolat)) {
          if (de * geolat < 0) {
            xp[0] = this.sl.swe_degnorm(90 + mdn / 2);
          } else {
            xp[0] = this.sl.swe_degnorm(270 + mdd / 2);
          }
        } else {
          sinad = this.tand(de) * this.tand(geolat);
          ad = this.asind(sinad);
          a = sinad + this.cosd(mdd);
          if (a >= 0) {
            is_above_hor = true;
          }
          sad = 90 + ad;
          san = 90 - ad;
          if (is_above_hor) {
            xp[0] =  (mdd / sad + 3) * 90;
          } else {
            xp[0] = (mdn / san + 1) * 90;
          }
          /* to make sure that a call with a house cusp position returns
           * a value within the house, 0.001" is added */
          xp[0] = this.sl.swe_degnorm(xp[0] + this.MILLIARCSEC);
        }
        if (hsys == 'G') {
          xp[0] = 360 - xp[0]; /* Gauquelin sectors are in clockwise direction */
          hpos = xp[0] / 10.0 + 1;
        } else {
          hpos = xp[0] / 30.0 + 1;
        }
      break;
    }
    return hpos;
  }
}
