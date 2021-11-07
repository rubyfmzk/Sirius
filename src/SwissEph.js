/**
* Constructs a new SwissEph object with the default search path for the
* Swiss Ephemeris data files.
* @see Swe#SE_EPHE_PATH
*/
import { Swe } from "./Swe"
import { SwephData } from "./SwephData"
import { SwissData } from "./SwissData"
import { SweDate } from "./SweDate"
import { SwephMosh } from "./SwephMosh"
import { SwissLib } from "./SwissLib"
import { Swemmoon } from "./Swemmoon"
import { SweHouse } from "./SweHouse"
import { Swecl } from "./Swecl"
import { FixStars } from "./FixStars"
import { MeffEle, SavePositions, Epsilon, Nut } from "./Classes"

export class SwissEph{
  constructor(sd){

    this.swed = SwissData
    this.sd    = sd         ? sd         : new SweDate()
    this.sl    = this.sl    ? this.sl    : new SwissLib(this.swed, this.sd)
    this.sm    = this.sm    ? this.sm    : new Swemmoon(this.swed, this.sl)
    this.smosh = this.smosh ? this.smosh : new SwephMosh(this.sl, this, this.swed, this.sm, this.sd)
    this.sh    = this.sh    ? this.sh    : new SweHouse(this.sl, this, this.swed, this.sd)
    this.sc    = this.sc    ? this.sc    : new Swecl(this, this.sl, this.sm, this.swed, this.sd)

    //this.ext = new Extensions;
    this.lastLat = 0.0;
    this.lastLong = 0.0;
    this.lastHSys = -1;
    this.swe_calc_epheflag_sv = 0;

    this.chck_nut_nutflag = 0;

    this.eff_arr = [

        new MeffEle(1.000, 1.000000),
        new MeffEle(0.990, 0.999979),
        new MeffEle(0.980, 0.999940),
        new MeffEle(0.970, 0.999881),
        new MeffEle(0.960, 0.999811),
        new MeffEle(0.950, 0.999724),
        new MeffEle(0.940, 0.999622),
        new MeffEle(0.930, 0.999497),
        new MeffEle(0.920, 0.999354),
        new MeffEle(0.910, 0.999192),
        new MeffEle(0.900, 0.999000),
        new MeffEle(0.890, 0.998786),
        new MeffEle(0.880, 0.998535),
        new MeffEle(0.870, 0.998242),
        new MeffEle(0.860, 0.997919),
        new MeffEle(0.850, 0.997571),
        new MeffEle(0.840, 0.997198),
        new MeffEle(0.830, 0.996792),
        new MeffEle(0.820, 0.996316),
        new MeffEle(0.810, 0.995791),
        new MeffEle(0.800, 0.995226),
        new MeffEle(0.790, 0.994625),
        new MeffEle(0.780, 0.993991),
        new MeffEle(0.770, 0.993326),
        new MeffEle(0.760, 0.992598),
        new MeffEle(0.750, 0.991770),
        new MeffEle(0.740, 0.990873),
        new MeffEle(0.730, 0.989919),
        new MeffEle(0.720, 0.988912),
        new MeffEle(0.710, 0.987856),
        new MeffEle(0.700, 0.986755),
        new MeffEle(0.690, 0.985610),
        new MeffEle(0.680, 0.984398),
        new MeffEle(0.670, 0.982986),
        new MeffEle(0.660, 0.981437),
        new MeffEle(0.650, 0.979779),
        new MeffEle(0.640, 0.978024),
        new MeffEle(0.630, 0.976182),
        new MeffEle(0.620, 0.974256),
        new MeffEle(0.610, 0.972253),
        new MeffEle(0.600, 0.970174),
        new MeffEle(0.590, 0.968024),
        new MeffEle(0.580, 0.965594),
        new MeffEle(0.570, 0.962797),
        new MeffEle(0.560, 0.959758),
        new MeffEle(0.550, 0.956515),
        new MeffEle(0.540, 0.953088),
        new MeffEle(0.530, 0.949495),
        new MeffEle(0.520, 0.945741),
        new MeffEle(0.510, 0.941838),
        new MeffEle(0.500, 0.937790),
        new MeffEle(0.490, 0.933563),
        new MeffEle(0.480, 0.928668),
        new MeffEle(0.470, 0.923288),
        new MeffEle(0.460, 0.917527),
        new MeffEle(0.450, 0.911432),
        new MeffEle(0.440, 0.905035),
        new MeffEle(0.430, 0.898353),
        new MeffEle(0.420, 0.891022),
        new MeffEle(0.410, 0.882940),
        new MeffEle(0.400, 0.874312),
        new MeffEle(0.390, 0.865206),
        new MeffEle(0.380, 0.855423),
        new MeffEle(0.370, 0.844619),
        new MeffEle(0.360, 0.833074),
        new MeffEle(0.350, 0.820876),
        new MeffEle(0.340, 0.808031),
        new MeffEle(0.330, 0.793962),
        new MeffEle(0.320, 0.778931),
        new MeffEle(0.310, 0.763021),
        new MeffEle(0.300, 0.745815),
        new MeffEle(0.290, 0.727557),
        new MeffEle(0.280, 0.708234),
        new MeffEle(0.270, 0.687583),
        new MeffEle(0.260, 0.665741),
        new MeffEle(0.250, 0.642597),
        new MeffEle(0.240, 0.618252),
        new MeffEle(0.230, 0.592586),
        new MeffEle(0.220, 0.565747),
        new MeffEle(0.210, 0.537697),
        new MeffEle(0.200, 0.508554),
        new MeffEle(0.190, 0.478420),
        new MeffEle(0.180, 0.447322),
        new MeffEle(0.170, 0.415454),
        new MeffEle(0.160, 0.382892),
        new MeffEle(0.150, 0.349955),
        new MeffEle(0.140, 0.316691),
        new MeffEle(0.130, 0.283565),
        new MeffEle(0.120, 0.250431),
        new MeffEle(0.110, 0.218327),
        new MeffEle(0.100, 0.186794),
        new MeffEle(0.090, 0.156287),
        new MeffEle(0.080, 0.128421),
        new MeffEle(0.070, 0.102237),
        new MeffEle(0.060, 0.077393),
        new MeffEle(0.050, 0.054833),
        new MeffEle(0.040, 0.036361),
        new MeffEle(0.030, 0.020953),
        new MeffEle(0.020, 0.009645),
        new MeffEle(0.010, 0.002767),
        new MeffEle(0.000, 0.000000)
      ];

  };

  /**
  * This is the main calculation routine for all planets, asteroids, lunar
  * nodes and apogees.
  * See swe_calc(...) for more information.<br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_ut The Julian Day number in UT (Universal Time).
  * @param ipl The body to be calculated. See
  * <A HREF="Swe.html">Swe</A> for a list of bodies
  * @param iflag A flag that contains detailed specification on how the body
  * is to be computed. See <A HREF="Swe.html">Swe</A>
  * for a list of valid flags (SEFLG_*).
  * @param xx A double[6] in which the result is returned. See swe_calc() for
  * the description of this parameter
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return iflag or Swe.ERR (-1); iflag MAY have changed from input
  * parameter!
  * @see SwissEph#swe_calc(double, int, int, double[], java.lang.StringBuffer)
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_calc_ut(tjd_ut, ipl, iflag, xx) {
    var deltat;
    var retval = Swe.OK;
    this.sd.swi_set_tid_acc(tjd_ut, iflag, 0);  
    deltat = this.sd.getDeltaT(tjd_ut);
    retval = this.swe_calc(tjd_ut + deltat, ipl, iflag, xx);
    return retval;
  }

  /**
  * This is the main calculation routine for all planets, asteroids, lunar
  * nodes and apogees. It is equal to swe_calc_ut() with the exception that
  * the time has to be given in ET (Ephemeris Time or Dynamical Time). You
  * would get ET by adding deltaT to the UT, e.g.,
  * <CODE>tjd_et + SweDate.getDeltaT(tjd_et)</CODE>.
  * <P>The parameter xx is used as an output parameter containing the
  * following info:
  * <BLOCKQUOTE><CODE>xx[0]:   longitude<BR>
  * xx[1]:   latitude<BR>
  * xx[2]:   distance in AU<BR>
  * xx[3]:   speed in longitude (degree / day)<BR>
  * xx[4]:   speed in latitude (degree / day)<BR>
  * xx[5]:   speed in distance (AU / day)<BR>
  * </CODE></BLOCKQUOTE><P>
  * The speed infos will be calculated only, if the appropriate SEFLG_*
  * switch is set.
  * @param tjd The Julian Day number in ET (UT + deltaT).
  * @param ipl The body to be calculated. See
  * <A HREF="Swe.html">Swe</A> for a list of bodies
  * @param iflag A flag that contains detailed specification on how the body
  * is to be computed. See <A HREF="Swe.html">Swe</A>
  * for a list of valid flags (SEFLG_*).
  * @param xx A double[6] in which the result is returned. See above for more
  * details.
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return iflag or Swe.ERR (-1); iflag MAY have changed from input
  * parameter, when the calculation had used different flags, e.g.: when
  * specified Swe.SEFLG_SWIEPH, but the ephemeris data files wheren't
  * available, the calculation automatically switches to Moshier calculations
  * (Swe.SEFLG_MOSEPH).
  * @see #swe_calc_ut(double, int, int, double[], java.lang.StringBuffer)
  * @see #swe_fixstar_ut(java.lang.StringBuffer, double, int, double[], java.lang.StringBuffer)
  * @see #swe_fixstar(java.lang.StringBuffer, double, int, double[], java.lang.StringBuffer)
  */
  swe_calc(tjd, ipl, iflag, xx) {
    var ret = 0;
    try {
      ret = this._calc(tjd, ipl, iflag, xx);
    } catch (e) {
      console.error(e);
    }
    return ret;
  };

  // This is the new recommended interface for planetary calculations.
  // It should be rewritten to be used for fixstars as well.
  /**
  * This method will probably be deprecated some time in future or change
  * parameters. Use swe_calc() or swe_calc_ut() instead.
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param jdET The Julian Day number in ET (UT + deltaT).
  * @param ipl The body to be calculated. See
  * <A HREF="Swe.html">Swe</A> for a list of bodies
  * @param iflag A flag that contains detailed specification on how the body
  * is to be computed. See <A HREF="Swe.html">Swe</A>
  * for a list of valid flags (SEFLG_*).
  * @param xx A double[6] in which the result is returned. See above for more
  * details.
  * @return iflag; iflag MAY have changed from input parameter, when the
  * calculation had used different flags, e.g.: when specified Swe.SEFLG_SWIEPH,
  * but the ephemeris data files wheren't available, the calculation automatically
  * switches to Moshier calculations (Swe.SEFLG_MOSEPH) and changes iflag.
  * @see #swe_calc_ut(double, int, int, double[], java.lang.StringBuffer)
  * @see #swe_calc(double, int, int, double[], java.lang.StringBuffer)
  */
  calc(jdET, ipl, iflag, xx){
    return this._calc(jdET, ipl, iflag, xx);
  };

  _calc(tjd, ipl, iflag, xx){
    var i, j;
    var iflgcoor;
    var iflgsave = iflag;
    var epheflag;
    var sd = new SavePositions();
    var x = new Array(6);
    var xs = new Array();
    var x0 = new Array(24);
    var x2 = new Array(24);
    var dt;

    /* function calls for Pluto with asteroid number 134340
     * are treated as calls for Pluto as main body SE_PLUTO.
     * Reason: Our numerical integrator takes into account Pluto
     * perturbation and therefore crashes with body 134340 Pluto. */
    if (ipl == Swe.SE_AST_OFFSET + 134340) {
      ipl = Swe.SE_PLUTO;
    }
    /* if ephemeris flag != ephemeris flag of last call,
     * we clear the save area, to prevent swecalc() using
     * previously computed data for current calculation.
     * except with ipl = SE_ECL_NUT which is not dependent
     * on ephemeris, and except if change is from
     * ephemeris = 0 to ephemeris = SEFLG_DEFAULTEPH
     * or vice-versa.
     */
    epheflag = iflag & Swe.SEFLG_EPHMASK;
    if ((epheflag & Swe.SEFLG_DEFAULTEPH)!=0) {
      epheflag = 0;
    }
    if (this.swe_calc_epheflag_sv != epheflag && ipl != Swe.SE_ECL_NUT) {
      this.free_planets();
      this.swe_calc_epheflag_sv = epheflag;
    }
    /* high precision speed prevails fast speed */
    if ((iflag & Swe.SEFLG_SPEED3)!=0 && (iflag & Swe.SEFLG_SPEED)!=0) {
      iflag = iflag & ~Swe.SEFLG_SPEED3;
    }
    /* cartesian flag excludes radians flag */
    if (((iflag & Swe.SEFLG_XYZ)!=0) && ((iflag & Swe.SEFLG_RADIANS)!=0)) {
      iflag = iflag & ~Swe.SEFLG_RADIANS;
    }
    /* pointer to save area */
    if (ipl < Swe.SE_NPLANETS && ipl >= Swe.SE_SUN) {
      sd = this.swed.savedat[ipl];
    }
    else {
      sd = this.swed.savedat[Swe.SE_NPLANETS];
    }

    /*
     * if position is available in save area, it is returned.
     * this is the case, if tjd = tsave and iflag = iflgsave.
     * coordinate flags can be neglected, because save area
     * provides all coordinate types.
     * if ipl > SE_AST(EROID)_OFFSET, ipl must be checked,
     * because all asteroids called by MPC number share the same
     * save area.
     */
    iflgcoor = Swe.SEFLG_EQUATORIAL | Swe.SEFLG_XYZ | Swe.SEFLG_RADIANS;
    try {
      if (sd.tsave != tjd || tjd == 0 || ipl != sd.ipl ||
        ((sd.iflgsave & ~iflgcoor) != (iflag & ~iflgcoor))) {
        if ((iflag & Swe.SEFLG_SPEED3) == 0) {
          sd.tsave = tjd;
          sd.ipl = ipl;
//console.log(112,xx, tjd);
          if ((sd.iflgsave = this.swecalc(tjd, ipl, iflag, sd.xsaves)) == Swe.ERR) {
//console.log(115,sd.iflgsave);
            return this.swe_calc_error(xx);
          }
        }
        else {
          /*
           * with speed from three calls of swecalc(), slower and less accurate.
           * (SLOW speed, for test only)
           */
          sd.tsave = tjd;
          sd.ipl = ipl;
          switch(ipl) {
            case Swe.SE_MOON:
              dt = SwephData.MOON_SPEED_INTV;
              break;
            case Swe.SE_OSCU_APOG:
            case Swe.SE_TRUE_NODE:
              /* this is the optimum dt with Moshier ephemeris, but not with
               * JPL ephemeris or SWISSEPH. To avoid completely false speed
               * in case that JPL is wanted but the program returns Moshier,
               * we use Moshier optimum.
               * For precise speed, use JPL and FAST speed computation,
               */
              dt = SwephData.NODE_CALC_INTV_MOSH;
              break;
            default:
              dt = SwephData.PLAN_SPEED_INTV;
              break;
          }
          sd.iflgsave = this.swecalc(tjd-dt, ipl, iflag, x0, serr);
          if (sd.iflgsave == Swe.ERR) {
            return this.swe_calc_error(xx);
          }
          sd.iflgsave = this.swecalc(tjd+dt, ipl, iflag, x2, serr);
          if (sd.iflgsave == Swe.ERR) {
            return this.swe_calc_error(xx);
          }
          sd.iflgsave = this.swecalc(tjd, ipl, iflag, sd.xsaves, serr);
          if (sd.iflgsave == Swe.ERR) {
            return this.swe_calc_error(xx);
          }
          this.denormalize_positions(x0, sd.xsaves, x2);
          this.calc_speed(x0, sd.xsaves, x2, dt);

        }
      }
    }
    catch (e) {
      console.error(e);
    }

    var xsOffset=0;
    xs=sd.xsaves;

    if ((iflag & Swe.SEFLG_EQUATORIAL) != 0) {
      xsOffset=12;        /* equatorial coordinates */
//    } else {
//      xsOffset=0;         /* ecliptic coordinates */
    }
    if ((iflag & Swe.SEFLG_XYZ)!=0) {
      xsOffset+=6;         /* cartesian coordinates */
    }

    if (ipl == Swe.SE_ECL_NUT) {
      i = 4;
    }
    else {
      i = 3;
    }
    for (j = 0; j < i; j++){
      x[j] = xs[j+xsOffset]; 
    }
    for (j = i; j < 6; j++) {
      x[j] = 0;
    }
    if ((iflag & (Swe.SEFLG_SPEED3 | Swe.SEFLG_SPEED))!=0) {
      for (j = 3; j < 6; j++) { x[j] = xs[j+xsOffset]; }
    }

    if ((iflag & Swe.SEFLG_RADIANS)!=0) {
      if (ipl == Swe.SE_ECL_NUT) {
        for (j = 0; j < 4; j++)
          x[j] *= this.swed.DEGTORAD;
      } else {
        for (j = 0; j < 2; j++)
          x[j] *= this.swed.DEGTORAD;
        if ((iflag & (Swe.SEFLG_SPEED3 | Swe.SEFLG_SPEED))!=0) {
          for (j = 3; j < 5; j++)
            x[j] *= this.swed.DEGTORAD;
        }
      }  
    } 

    for (i = 0; i <= 5; i++) {
      xx[i] = x[i];
    }
    iflag = sd.iflgsave;
    if ((iflgsave & Swe.SEFLG_EPHMASK) == 0) {
      iflag = iflag & ~Swe.SEFLG_DEFAULTEPH;
    }

    return iflag;
  };

  free_planets() {
    var i;
    try {
      /* free planets data space */
      for(i=0;i<SwephData.SEI_NPLANETS;i++) {
        this.swed.pldat[i].clearData();
      }
      for (i=0; i <= Swe.SE_NPLANETS; i++) {/* "<=" is correct! see decl.*/
        this.swed.savedat[i].clearData();
      }
      /* clear node data space */
      for(i=0;i<SwephData.SEI_NNODE_ETC;i++) {
        this.swed.nddat[i].clearData();
      }
      this.swed.oec.clearData();
      this.swed.oec2000.clearData();
      this.swed.nut.clearData();
      this.swed.nut2000.clearData();
      this.swed.nutv.clearData();
    } catch (e) {
      console.error(e);
    }
  }

  swe_close() {
    var i;
    this.free_planets();
    this.swed.oec.clearData();
    this.swed.oec2000.clearData();
    this.swed.nut.clearData();
    this.swed.nut2000.clearData();
    this.swed.nutv.clearData();
    // memset((void *) &this.swed.astro_models, SEI_NMODELS, sizeof(int32));
    for(var a = 0; a < SwephData.SEI_NMODELS; a++) {
      this.swed.astro_models[a] = 0;
    }
    this.swed.jpldenum = 0;
    this.sd.swe_set_tid_acc(Swe.SE_TIDAL_AUTOMATIC);
    this.swed.geopos_is_set = false;
    this.swed.ayana_is_set = false;
    this.swed.is_old_starfile = false;
    this.swed.i_saved_planet_name = 0;
    this.swed.saved_planet_name = "";
    this.swed.topd.clearData();
    this.swed.sidd.clearData();
    this.swed.timeout = 0;
    this.swed.dpsi = null;
    this.swed.deps = null;
  }

  init(path) {
    var i, iflag;
    var s="";
    var xx = new Array(6);
    this.swed.ephe_path_is_set=true;
    /* close all open files and delete all planetary data */
    this.swe_close();
    if (path == null || path === undefined || path.length() == 0) {
      s=Swe.SE_EPHE_PATH;
    } else if (path.length() <= this.swed.AS_MAXCH-1-13) {
      s=path;
    } else {
      s=Swe.SE_EPHE_PATH;
    }

    this.swed.ephepath=s;
  }

  load_dpsi_deps() {
  }

  /**
  * This sets a custom ayanamsha mode for sidereal planet calculations.
  * Use SE_SIDM_USER optionally together with SE_SIDBIT_ECL_T0 or
  * SE_SIDBIT_SSY_PLANE for custom modes.<br>
  * You may want to use swe_set_sid_mode(int), if your are satisfied with
  * the predefined ayanamsa modes.<br>
  * This method is also for compatibility to the original C-source code.
  * So you may also use any of the predefined sid_modes from
  * swe_set_sid_mode(int), neglecting t0 and ayan_t0 parameters.<br>
  * E.g., those two calls are identical:
  * <blockquote>
  * swe_set_sid_mode(Swe.SE_SIDM_LAHIRI)<br>
  * swe_set_sid_mode(Swe.SE_SIDM_LAHIRI, 0, 0)
  * </blockquote>
  * Normally, you would use this method in the sense of:
  * <blockquote>
  * swe_set_sid_mode(Swe.SE_SIDM_USER, 2450789.5, 23.454578)<br>
  * </blockquote>
  * If you don't set any ayanamsha mode via one of the swe_set_sid_mode()
  * methods, it will default to Fagan/Bradley (SE_SIDM_FAGAN_BRADLEY).<br>
  * @param sid_mode Swe.SE_SIDM_USER plus (optionally)
  * one of the non-standard sidereal calculation modes of
  * <CODE>SE_SIDBIT_ECL_T0</CODE> or <CODE>SE_SIDBIT_SSY_PLANE</CODE>.
  * You may also use any of the SE_SIDM_* parameters of swe_set_sid_mode(int).
  * The parameters t0 and ayan_t0 will be irrelevant in that case.
  * @param t0 Reference date (Julian day), if sid_mode is SE_SIDM_USER
  * @param ayan_t0 Initial ayanamsha at t0, if sid_mode is SE_SIDM_USER. This
  * is (tropical position - sidereal position) at date t0.
  * @see #swe_set_sid_mode(int)
  * @see Swe#SE_SIDM_USER
  * @see Swe#SE_SIDBIT_ECL_T0
  * @see Swe#SE_SIDBIT_SSY_PLANE
  */
  swe_set_sid_mode(sid_mode, t0, ayan_t0) {
    if(t0 === undefined){
      return this.swe_set_sid_mode(sid_mode, 0, 0);
    }

    if (sid_mode < 0) sid_mode = 0;

    var sip = this.swed.sidd;
    sip.sid_mode = sid_mode;
    if (sid_mode >= Swe.SE_SIDBITS) {
      sid_mode %= Swe.SE_SIDBITS;
    }
 
    if (sid_mode == Swe.SE_SIDM_J2000
            || sid_mode == Swe.SE_SIDM_J1900
            || sid_mode == Swe.SE_SIDM_B1950) {
      sip.sid_mode &= ~Swe.SE_SIDBIT_SSY_PLANE;
      sip.sid_mode |= Swe.SE_SIDBIT_ECL_T0;
    }

    if (sid_mode == Swe.SE_SIDM_TRUE_CITRA || sid_mode == Swe.SE_SIDM_TRUE_REVATI) 
      sip.sid_mode &= ~(Swe.SE_SIDBIT_ECL_T0 | Swe.SE_SIDBIT_SSY_PLANE);

    if (sid_mode >= this.swed.SE_NSIDM_PREDEF && sid_mode != Swe.SE_SIDM_USER){
      sip.sid_mode = sid_mode = Swe.SE_SIDM_FAGAN_BRADLEY;
    }

    this.swed.ayana_is_set = true;
    if (sid_mode == Swe.SE_SIDM_USER) {
      sip.t0 = t0;
      sip.ayan_t0 = ayan_t0;
    }
    else {
      sip.t0 = SwephData.ayanamsa[sid_mode].t0;
      sip.ayan_t0 = SwephData.ayanamsa[sid_mode].ayan_t0;
    }
    this.swi_force_app_pos_etc();
  }

  /* the ayanamsa (precession in longitude)
   * according to Newcomb's definition: 360 -
   * longitude of the vernal point of t referred to the
   * ecliptic of t0.
   */
  /**
  * This calculates the ayanamsha for a given date. You should call
  * swe_set_sid_mode(...) before, where you will set the mode of ayanamsha,
  * as many different ayanamshas are used in the world today.
  * @param tjd_et The date as Julian Day in ET (Ephemeris Time or Dynamic Time)
  * @return The value of the ayanamsha
  * @see #swe_set_sid_mode(int, double, double)
  * @see #swe_get_ayanamsa_ut(double)
  */
  swe_get_ayanamsa(tjd_et) {
    var x=new Array(6), eps;
    var sip = this.swed.sidd;
    if (!this.swed.ayana_is_set) {
      this.swe_set_sid_mode(Swe.SE_SIDM_FAGAN_BRADLEY, 0, 0);
    }

    if (sip.sid_mode == Swe.SE_SIDM_TRUE_CITRA) {
      star.append("Spica"); /* Citra */
      swe_fixstar(star, tjd_et, Swe.SEFLG_NONUT, x, null);
      return this.sl.swe_degnorm(x[0] - 180);
    }
    if (sip.sid_mode == Swe.SE_SIDM_TRUE_REVATI) {
      star.append(",zePsc"); /* Revati */
      swe_fixstar(star, tjd_et, Swe.SEFLG_NONUT, x, null);
      return this.sl.swe_degnorm(x[0]);
      /*return swe_degnorm(x[0] - 359.83333333334);*/
    }
    if (sip.sid_mode == Swe.SE_SIDM_TRUE_PUSHYA) {
      star.append(",deCnc"); /* Pushya = Asellus Australis */
      swe_fixstar(star, tjd_et, Swe.SEFLG_NONUT, x, null);
      return this.sl.swe_degnorm(x[0] - 106);
    }

    /* vernal point (tjd), cartesian */
    x[0] = 1;
    x[1] = x[2] = 0;
    /* to J2000 */
    if (tjd_et != SwephData.J2000) {
      this.sl.swi_precess(x, tjd_et, 0, SwephData.J_TO_J2000);
    }
    /* to t0 */
    this.sl.swi_precess(x, sip.t0, 0, SwephData.J2000_TO_J);
    /* to ecliptic */
    eps = this.sl.swi_epsiln(sip.t0, 0);
    this.sl.swi_coortrf(x, x, eps);
    /* to polar */
    this.sl.swi_cartpol(x, x);
    /* subtract initial value of ayanamsa */
    x[0] = x[0] * this.swed.RADTODEG - sip.ayan_t0;
    /* get ayanamsa */
    return this.sl.swe_degnorm(-x[0]);
  }

  /**
  * This calculates the ayanamsha for a given date. You should call
  * swe_set_sid_mode(...) before, where you will set the mode of ayanamsha,
  * as many different ayanamshas are used in the world today.
  * @param tjd_ut The date as Julian Day in UT (Universal Time)
  * @return The value of the ayanamsha
  * @see #swe_set_sid_mode(int, double, double)
  * @see #swe_get_ayanamsa(double)
  */
  swe_get_ayanamsa_ut(tjd_ut) {
    return swe_get_ayanamsa(tjd_ut + this.sd.getDeltaT(tjd_ut));
  }

  /* set geographic position and altitude of observer */
  /**
  * If you want to do calculations relative to the observer on some place
  * on the earth rather than relative to the center of the earth, you will
  * want to set the geographic location with this method.
  * @param geolon The Longitude in degrees
  * @param geolat The Latitude in degrees
  * @param geoalt The height above sea level in meters
  */
  swe_get_ayanamsa_name(isidmode) {
    isidmode %= Swe.SE_SIDBITS;
    if (isidmode < this.swed.SE_NSIDM_PREDEF)
      return this.swed.ayanamsa_name[isidmode];
    return null;
  }


  /**********************************************************
   * get fixstar positions
   * parameters:
   * star         name of star or line number in star file
   *              (start from 1, don't count comment).
   *              If no error occurs, the name of the star is returned
   *              in the format trad_name, nomeclat_name
   *
   * tjd          absolute julian day
   * iflag        s. swecalc(); speed bit does not function
   * x            pointer for returning the ecliptic coordinates
   * serr         error return string
  **********************************************************/
  /**
  * Computes fixed stars. This method is identical to swe_fixstar_ut() with
  * the one exception that the time has to be given in ET (Ephemeris Time or
  * Dynamical Time instead of Universal Time UT). You would get ET by adding
  * deltaT to the UT, e.g.,
  * <CODE>tjd_et + SweDate.getDeltaT(tjd_et)</CODE>.<P>
  * See swe_fixstar_ut(...) for missing information.
  * @see #swe_fixstar_ut(java.lang.StringBuffer, double, int, double[], java.lang.StringBuffer)
  */
  /**
  * Computes fixed stars. This method is identical to swe_fixstar_ut() with
  * the one exception that the time has to be given in ET (Ephemeris Time or
  * Dynamical Time instead of Universal Time UT). You would get ET by adding
  * deltaT to the UT, e.g.,
  * <CODE>tjd_et + SweDate.getDeltaT(tjd_et)</CODE>.<P>
  * The fixed stars are defined in the file sefstars.txt and the star
  * parameter must refer to any entry in that file. The entries in that file
  * start with <I>traditional_name ,nomenclature_name,...</I>, e.g.,
  * "<CODE>Alpheratz    ,alAnd,</CODE>"[...].
  * @param star Actually, it is an input and an output parameter at the same
  * time. So it is not possible to define it as a String, but rather as a
  * StringBuffer. On input it defines the star to be calculated and can be
  * in three forms:<BR>
  * - as a positive integer number meaning the star in the file sefstars.txt
  * that is given on the line number of the given number, without counting
  * any comment lines beginning with #.<BR>
  * - as a traditional name case insensitively compared to the first name
  * on every line in sefstars.txt.<BR>
  * - as a nomenclature prefixed by a comma. This name is compared in a case
  * preserving manner to the nomenclature name on every line in
  * sefstars.txt.<BR>
  * On Output it returns the complete name (traditional plus nomenclature
  * name), e.g. "<CODE>Alpheratz,alAnd</CODE>".<br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd The Julian Day in ET
  * @param iflag Any of the Swe.SEFLG_* flags
  * @param xx A double[6] used as output parameter only. This returns
  * longitude, latitude and the distance (in AU) of the fixed stars, but
  * it does <B>not</B> return any speed values in xx[3] to xx[5] as it does
  * in swe_calc() / swe_calc_ut(), even if you specify Swe.SEFLG_SPEED
  * in the flags parameter!
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return iflag or Swe.ERR (-1); iflag MAY have changed from input
  * parameter!
  * @see #swe_fixstar(java.lang.StringBuffer, double, int, double[], java.lang.StringBuffer)
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_fixstar(star, tjd, iflag, xx) {
    let i;
    let epheflag, iflgsave;
    iflag |= Swe.SEFLG_SPEED; /* we need this in order to work correctly */
    iflgsave = iflag;

    iflag = this.plaus_iflag(iflag, -1, tjd);
    /* JPL Horizons is only reproduced with SEFLG_JPLEPH */
    if (((iflag & Swe.SEFLG_SIDEREAL)!=0) && !this.swed.ayana_is_set) {
      this.swe_set_sid_mode(Swe.SE_SIDM_FAGAN_BRADLEY, 0, 0);
    }
    epheflag = iflag & Swe.SEFLG_EPHMASK;
    /******************************************
     * obliquity of ecliptic 2000 and of date *
     ******************************************/
    this.swi_check_ecliptic(tjd, iflag);
    /******************************************
     * nutation                               *
     ******************************************/
    this.swi_check_nutation(tjd, iflag);
    let star_info = FixStars[star];
    if (star_info != null) {
      return this.swe_fixstar_found(star_info, star, tjd, iflag, iflgsave, epheflag, xx);
    }
    return this.swe_fixstar_error(xx, Swe.ERR);
  }

  /**
  * Computes fixed stars. This method is identical to swe_fixstar() with the
  * one exception that the time has to be given in UT (Universal Time instead
  * of Ephemeris Time or Dynamical Time ET).<P>
  * The fixed stars are defined in the file sefstars.txt and the star
  * parameter must refer to any entry in that file. The entries in that file
  * start with <I>traditional_name ,nomenclature_name,...</I>, e.g.,
  * "<CODE>Alpheratz    ,alAnd,</CODE>"[...].
  * @param star Actually, it is an input and an output parameter at the same
  * time. So it is not possible to define it as a String, but rather as a
  * StringBuffer. On input it defines the star to be calculated and can be
  * in three forms:<BR>
  * - as a positive integer number meaning the star in the file sefstars.txt
  * that is given on the line number of the given number, without counting
  * any comment lines beginning with #.<BR>
  * - as a traditional name case insensitively compared to the first name
  * on every line in sefstars.txt.<BR>
  * - as a nomenclature prefixed by a comma. This name is compared in a case
  * preserving manner to the nomenclature name on every line in
  * sefstars.txt.<BR>
  * On Output it returns the complete name (traditional plus nomenclature
  * name), e.g. "<CODE>Alpheratz,alAnd</CODE>".<br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_ut The Julian Day in UT
  * @param iflag Any of the Swe.SEFLG_* flags
  * @param xx A double[6] used as output parameter only. This returns
  * longitude, latitude and the distance (in AU) of the fixed stars, but
  * it does <B>not</B> return any speed values in xx[3] to xx[5] as it does
  * in swe_calc() / swe_calc_ut(), even if you specify Swe.SEFLG_SPEED
  * in the flags parameter!
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return iflag or Swe.ERR (-1); iflag MAY have changed from input
  * parameter!
  * @see #swe_fixstar(java.lang.StringBuffer, double, int, double[], java.lang.StringBuffer)
  * @see #preloadFixstarsFile(java.lang.StringBuffer)
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_fixstar_ut(star, tjd_ut, iflag, xx) {
    this.sd.swi_set_tid_acc(tjd_ut, iflag, 0);  
    return this.swe_fixstar(star, tjd_ut + this.sd.getDeltaT(tjd_ut),
                       iflag, xx);
  }

  /* set geographic position and altitude of observer */
  /**
  * If you want to do calculations relative to the observer on some place
  * on the earth rather than relative to the center of the earth, you will
  * want to set the geographic location with this method.
  * @param geolon The Longitude in degrees
  * @param geolat The Latitude in degrees
  * @param geoalt The height above sea level in meters
  */
  swe_set_topo(geolon, geolat, geoalt) {

    this.swed.topd.geolon = geolon;
    this.swed.topd.geolat = geolat;
    this.swed.topd.geoalt = geoalt;
    this.swed.geopos_is_set = true;
    /* to force new calculation of observer position vector */
    this.swed.topd.teval = 0;
    /* to force new calculation of light-time etc.
     */
    this.swi_force_app_pos_etc();
  }

  /**
  * Computes the azimut and height from either ecliptic or equatorial
  * coordinates.
  * <P>xaz is an output parameter as follows:
  * <P><CODE>
  * xaz[0]:   azimuth, i.e. position degree, measured from
  * the south point to west.<BR>
  * xaz[1]:   true altitude above horizon in degrees.<BR>
  * xaz[2]:   apparent (refracted) altitude above horizon
  * in degrees.
  * </CODE><P>
  * @param tjd_ut time and date in UT
  * @param calc_flag Swe.SE_ECL2HOR (xin[0] contains ecliptic
  * longitude, xin[1] the ecliptic latitude) or Swe.SE_EQU2HOR (xin[0] =
  * rectascension, xin[1] = declination)
  * @param geopos A double[3] containing the longitude, latitude and
  * height of the geographic position. Eastern longitude and northern
  * latitude is given by positive values, western longitude and southern
  * latitude by negative values.
  * @param atpress atmospheric pressure in mBar (hPa). If it is 0, the pressure
  * will be estimated from geopos[2] and attemp.
  * @param attemp atmospheric temperature in degrees Celsius.
  * @param xin double[3] with a content depending on parameter calc_flag.
  * See there. xin[3] does not need to be defined.
  * @param xaz Output parameter: a double[3] returning values as specified
  * above.
  */
  swe_azalt(tjd_ut, calc_flag, geopos, atpress, attemp, xin, xaz) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed);
    }
    this.sc.swe_azalt(tjd_ut, calc_flag, geopos, atpress, attemp, xin, xaz);
  }

  /**
  * Computes either ecliptic or equatorial coordinates from azimuth and true
  * altitude. The true altitude might be gained from an apparent altitude by
  * calling swe_refrac.<P>xout is an output parameter containing the ecliptic
  * or equatorial coordinates, depending on the value of the parameter
  * calc_flag.
  * @param tjd_ut time and date in UT
  * @param calc_flag Swe.SE_HOR2ECL or Swe.SE_HOR2EQU
  * @param geopos A double[3] containing the longitude, latitude and
  * height of the geographic position. Eastern longitude and northern
  * latitude is given by positive values, western longitude and southern
  * latitude by negative values.
  * @param xin double[2] with azimuth and true altitude of planet
  * @param xout Output parameter: a double[2] returning either ecliptic or
  * equatorial coordinates
  */
  swe_azalt_rev(tjd_ut, calc_flag, geopos, xin, xout) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed);
    }
    this.sc.swe_azalt_rev(tjd_ut, calc_flag, geopos, xin, xout);
  }

  /**
  * Computes the attributes of a lunar eclipse for a given Julian Day,
  * geographic longitude, latitude, and height.
  * <BLOCKQUOTE><P><CODE>
  * attr[0]:   umbral magnitude at tjd<BR>
  * attr[1]:   penumbral magnitude<BR>
  * attr[4]:   azimuth of moon at tjd. <I>Not yet
  * implemented.</I><BR>
  * attr[5]:   true altitude of moon above horizon at tjd.
  * <I>Not yet implemented.</I><BR>
  * attr[6]:   apparent altitude of moon above horizon at tjd.
  * <I>Not yet implemented.</I><BR>
  * attr[7]:   distance of moon from opposition in degrees
  * </CODE></BLOCKQUOTE><P><B>Attention: attr must be a double[20]!</B><br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_ut The Julian Day number in UT
  * @param ifl To indicate, which ephemeris should be used (SEFLG_MOSEPH
  * only for JAVAME)
  * @param geopos A double[3] containing geographic longitude, latitude and
  * height in meters above sea level in this order. Eastern longitude and
  * northern latitude is given by positive values, western longitude and
  * southern latitude by negative values.
  * @param attr A double[20], on return containing the attributes of the
  * eclipse as above
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails
  * @return -1 (Swe.ERR), if the calculation failed<BR>
  * 0, if there is no lunar eclipse at that time and location<BR>
  * otherwise:<BR>
  * Swe.SE_ECL_TOTAL<BR>
  * Swe.SE_ECL_PENUMBRAL<BR>
  * Swe.SE_ECL_PARTIAL
  * @see Swe#SE_ECL_TOTAL
  * @see Swe#SE_ECL_PENUMBRAL
  * @see Swe#SE_ECL_PARTIAL
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_lun_eclipse_how(tjd_ut, ifl, geopos, attr) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd);
    }
    return this.sc.swe_lun_eclipse_how(tjd_ut, ifl, geopos, attr);
  }

  /**
  * Computes the next lunar eclipse anywhere on earth.
  * <P>tret is an output parameter with the following meaning:
  * <P><CODE>
  * tret[0]:   time of maximum eclipse.<BR>
  * tret[1]:   <BR>
  * tret[2]:   time of the begin of partial phase.<BR>
  * tret[3]:   time of the end of partial phaseend.<BR>
  * tret[4]:   time of the begin of totality.<BR>
  * tret[5]:   time of the end of totality.<BR>
  * tret[6]:   time of the begin of center line.<BR>
  * tret[7]:   time of the end of center line<BR>
  * </CODE><P><B>Attention: tret must be a double[10]!</B><br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_start The Julian Day number in UT, from when to start searching
  * @param ifl To indicate, which ephemeris should be used (SEFLG_JPLEPH,
  * SEFLG_SWIEPH or SEFLG_MOSEPH)
  * @param ifltype Swe.SE_ECL_TOTAL for total eclipse or 0 for any eclipse
  * @param tret A double[10], on return containing the times of different
  * occasions of the eclipse as above
  * @param backward 1, if search should be done backwards.
  *                    If you want to have only one conjunction
  *                    of the moon with the body tested, add the following flag:
  *                    backward |= SE_ECL_ONE_TRY. If this flag is not set,
  *                    the function will search for an occultation until it
  *                    finds one. For bodies with ecliptical latitudes &gt; 5,
  *                    the function may search successlessly until it reaches
  *                    the end of the ephemeris.
  *                    (Note: we do not add SE_ECL_ONE_TRY to ifl, because
  *                    ifl may contain SEFLG_TOPOCTR (=SE_ECL_ONE_TRY) from
  *                    the parameter iflag of swe_calc() etc. Although the
  *                    topocentric flag is irrelevant here, it might cause
  *                    confusion.)
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return -1 (Swe.ERR), if the calculation failed<BR>
  * otherwise:<BR>
  * Swe.SE_ECL_TOTAL<BR>
  * Swe.SE_ECL_ANNULAR<BR>
  * Swe.SE_ECL_PARTIAL<BR>
  * Swe.SE_ECL_ANNULAR_TOTAL<BR>in combination with:<BR>
  * Swe.SE_ECL_CENTRAL<BR>
  * Swe.SE_ECL_NONCENTRAL
  * @see Swe#SE_ECL_TOTAL
  * @see Swe#SE_ECL_ANNULAR
  * @see Swe#SE_ECL_PARTIAL
  * @see Swe#SE_ECL_ANNULAR_TOTAL
  * @see Swe#SE_ECL_CENTRAL
  * @see Swe#SE_ECL_NONCENTRAL
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_lun_eclipse_when(tjd_start, ifl, ifltype, tret, backward) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_lun_eclipse_when(tjd_start,ifl,ifltype,tret,backward);
  }

  /**
  * Computes planetary nodes and apsides (perihelia, aphelia, second focal
  * points of the orbital ellipses). This method is identical to
  * swe_nod_aps_ut() with the one exception that the time has to be given
  * in ET (Ephemeris Time or Dynamical Time). You would get ET by adding
  * deltaT to the UT, e.g.,
  * <CODE>tjd_et + SweDate.getDeltaT(tjd_et)</CODE>.<P>
  * @param tjd_et The time in ET
  * @param ipl Planet number
  * @param iflag Any of the SEFLG_* flags
  * @param method Defines, what kind of calculation is wanted (SE_NODBIT_MEAN,
  * SE_NODBIT_OSCU, SE_NODBIT_OSCU_BAR, SE_NODBIT_FOPOINT)
  * @param xnasc Output parameter of double[6]. On return it contains six
  * doubles for the ascending node
  * @param xndsc Output parameter of double[6]. On return it contains six
  * doubles for the descending node
  * @param xperi Output parameter of double[6]. On return it contains six
  * doubles for the perihelion
  * @param xaphe Output parameter of double[6]. On return it contains six
  * doubles for the aphelion
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return Swe.OK (0) or Swe.ERR (-1)
  * @see SwissEph#swe_nod_aps_ut(double, int, int, int, double[], double[], double[], double[], java.lang.StringBuffer)
  * @see Swe#OK
  * @see Swe#ERR
  * @see Swe#SE_NODBIT_MEAN
  * @see Swe#SE_NODBIT_OSCU
  * @see Swe#SE_NODBIT_OSCU_BAR
  * @see Swe#SE_NODBIT_FOPOINT
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_nod_aps(tjd_et, ipl, iflag, method, xnasc, xndsc, xperi, xaphe) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_nod_aps(tjd_et, ipl, iflag, method, xnasc, xndsc, xperi, xaphe);
  }

  /**
  * Computes planetary nodes and apsides (perihelia, aphelia, second focal
  * points of the orbital ellipses). This method is identical to
  * swe_nod_aps() with the one exception that the time has to be given
  * in UT (Universal Time) and not in ET (Ephemeris Time or Dynamical Time).<br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_ut The time in UT
  * @param ipl Planet number
  * @param iflag Any of the SEFLG_* flags
  * @param method Defines, what kind of calculation is wanted (SE_NODBIT_MEAN,
  * SE_NODBIT_OSCU, SE_NODBIT_OSCU_BAR, SE_NODBIT_FOPOINT)
  * @param xnasc Output parameter of double[6]. On return it contains six
  * doubles for the ascending node
  * @param xndsc Output parameter of double[6]. On return it contains six
  * doubles for the descending node
  * @param xperi Output parameter of double[6]. On return it contains six
  * doubles for the perihelion
  * @param xaphe Output parameter of double[6]. On return it contains six
  * doubles for the aphelion
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return Swe.OK (0) or Swe.ERR (-1)
  * @see SwissEph#swe_nod_aps(double, int, int, int, double[], double[], double[], double[], java.lang.StringBuffer)
  * @see Swe#OK
  * @see Swe#ERR
  * @see Swe#SE_NODBIT_MEAN
  * @see Swe#SE_NODBIT_OSCU
  * @see Swe#SE_NODBIT_OSCU_BAR
  * @see Swe#SE_NODBIT_FOPOINT
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_nod_aps_ut(tjd_ut, ipl, iflag, method, xnasc, xndsc, xperi, xaphe) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_nod_aps_ut(tjd_ut, ipl, iflag, method, xnasc, xndsc, xperi, xaphe);
  }

  /**
  * Computes phase, phase angel, elongation, apparent diameter and apparent
  * magnitude for sun, moon, all planets and asteroids. This method is
  * identical to swe_pheno_ut() with the one exception that the time
  * has to be given in ET (Ephemeris Time or Dynamical Time). You
  * would get ET by adding deltaT to the UT, e.g.,
  * <CODE>tjd_et + SweDate.getDeltaT(tjd_et)</CODE>.<P>
  * See swe_pheno_ut() for missing information.
  * Computes phase, phase angel, elongation, apparent diameter and apparent
  * magnitude for sun, moon, all planets and asteroids.
  * <P>attr is an output parameter with the following meaning:</p>
  * <BLOCKQUOTE><CODE>
  * attr[0]:   phase angle (earth-planet-sun).<BR>
  * attr[1]:   phase (illumined fraction of disc).<BR>
  * attr[2]:   elongation of planet.<BR>
  * attr[3]:   apparent diameter of disc.<BR>
  * attr[4]:   apparent magnitude.<BR>
  * </CODE></BLOCKQUOTE><P><B>Attention: attr must be a double[20]!</B><br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd The Julian Day number in ET.
  * @param ipl The body number to be calculated. See class
  * <A HREF="Swe.html">Swe</A> for a list of bodies (SE_*)
  * @param iflag Which ephemeris is to be used (SEFLG_MOSEPH only
  * for JavaME)
  * @param attr A double[20] in which the result is returned. See above for more
  * details.
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return Swe.OK (0) or Swe.ERR (-1)
  * @see SwissEph#swe_pheno_ut(double, int, int, double[], java.lang.StringBuffer)
  * @see Swe#OK
  * @see Swe#ERR
  * @see Swe#SEFLG_MOSEPH
  * @see Swe#SEFLG_TRUEPOS
  * @see Swe#SEFLG_HELCTR
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_pheno(tjd, ipl, iflag, attr) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }

    return this.sc.swe_pheno(tjd, ipl, iflag, attr);
  }

  /**
  * Computes phase, phase angel, elongation, apparent diameter and apparent
  * magnitude for sun, moon, all planets and asteroids.
  * <P>attr is an output parameter with the following meaning:</p>
  * <BLOCKQUOTE><CODE>
  * attr[0]:   phase angle (earth-planet-sun).<BR>
  * attr[1]:   phase (illumined fraction of disc).<BR>
  * attr[2]:   elongation of planet.<BR>
  * attr[3]:   apparent diameter of disc.<BR>
  * attr[4]:   apparent magnitude.<BR>
  * </CODE></BLOCKQUOTE><P><B>Attention: attr must be a double[20]!</B><br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_ut The Julian Day number in UT (Universal Time).
  * @param ipl The body number to be calculated. See class
  * <A HREF="Swe.html">Swe</A> for a list of bodies (SE_*)
  * @param iflag Which ephemeris is to be used (SEFLG_MOSEPH only
  * for JavaME)
  * @param attr A double[20] in which the result is returned. See above for more
  * details.
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return Swe.OK (0) or Swe.ERR (-1)
  * @see Swe#OK
  * @see Swe#ERR
  * @see Swe#SEFLG_MOSEPH
  * @see Swe#SEFLG_TRUEPOS
  * @see Swe#SEFLG_HELCTR
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_pheno_ut(tjd_ut, ipl, iflag, attr) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_pheno_ut(tjd_ut, ipl, iflag, attr);
  }

  /**
  * Calculates the true altitude from the apparent altitude or vice versa.
  * @param inalt The true or apparent altitude to be converted
  * @param atpress Atmospheric pressure in mBar (hPa). If it is 0, the pressure
  * will be estimated from attemp on sea level.
  * @param attemp Atmospheric temperature in degrees Celsius.
  * @param calc_flag Swe.SE_TRUE_TO_APP or Swe.SE_APP_TO_TRUE
  * @return The converted altitude
  */
  swe_refrac(inalt, atpress, attemp, calc_flag) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_refrac(inalt, atpress, attemp, calc_flag);
  }

  /**
  * Calculates the true altitude from the apparent altitude or vice versa.
  * @param inalt The true or apparent altitude to be converted
  * @param geoalt altitude of observer above sea level in meters
  * @param atpress Atmospheric pressure in mBar (hPa). If it is 0, the pressure
  * will be estimated from attemp on sea level.
  * @param attemp Atmospheric temperature in degrees Celsius.
  * @param lapse_rate (dattemp/dgeoalt) = [ÂøK/m]
  * @param calc_flag Swe.SE_TRUE_TO_APP or Swe.SE_APP_TO_TRUE
  * @param dret output parameter, use a double[4] as input.
  * <pre>
  * - dret[0] true altitude, if possible; otherwise input value
  * - dret[1] apparent altitude, if possible; otherwise input value
  * - dret[2] refraction
  * - dret[3] dip of the horizon
  * </pre>
  * @return The converted altitude; see parameter dret for more output values
  */
  swe_refrac_extended(inalt, geoalt, atpress, lapse_rate, attemp, calc_flag, dret) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_refrac_extended(inalt, geoalt, atpress, lapse_rate, attemp, calc_flag, dret);
  }

  /**
  * Calculates the times of rising, setting and meridian transits for all
  * planets, asteroids, the moon, and the fixed stars.
  * @param tjd_ut The Julian Day number in UT, from when to start searching
  * @param ipl Planet number, if times for planet or moon are to be calculated.
  * @param starname The name of the star, if times for a star should be
  * calculated. It has to be null or the empty string otherwise!
  * @param epheflag To indicate, which ephemeris should be used (SEFLG_MOSEPH
  * only for JavaME)
  * @param rsmi Specification, what type of calculation is wanted
  * (SE_CALC_RISE, SE_CALC_SET, SE_CALC_MTRANSIT, SE_CALC_ITRANSIT). For
  * SE_CALC_RISE or SE_CALC_SET you may add SE_BIT_DISC_CENTER for rise
  * or set of the center of the body, SE_BIT_DISC_BOTTOM for the completely
  * visible object. Add SE_BIT_NO_REFRACTION for calculation without refraction
  * effects. Add SE_BIT_CIVIL_TWILIGHT or SE_BIT_NAUTIC_TWILIGHT or
  * SE_BIT_ASTRO_TWILIGHT for civil, nautical, or astronomical twilight.
  * Use SE_BIT_FIXED_DISC_SIZE to neglect the effect of distance on disc size.
  * The calculation method defaults to SE_CALC_RISE.
  * @param geopos A double[3] containing the longitude, latitude and
  * height of the observer. Eastern longitude and northern
  * latitude is given by positive values, western longitude and southern
  * latitude by negative values.
  * @param atpress atmospheric pressure in mBar (hPa). If it is 0, the pressure
  * will be estimated from geopos[2] and attemp (1013.25 mbar for sea level).
  * When calculating MTRANSIT or ITRANSIT, this parameter is not used.
  * @param attemp atmospheric temperature in degrees Celsius. When
  * calculating MTRANSIT or ITRANSIT, this parameter is not used.
  * @param tret Return value containing the time of rise or whatever was
  * requested. This is UT.
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails
  * @return Swe.OK (0) or Swe.ERR (-1)  or -2 if the body does not rise or set
  * @see Swe#OK
  * @see Swe#ERR
  * @see Swe#SEFLG_SWIEPH
  * @see Swe#SEFLG_MOSEPH
  * @see Swe#SE_CALC_RISE
  * @see Swe#SE_CALC_SET
  * @see Swe#SE_CALC_MTRANSIT
  * @see Swe#SE_CALC_ITRANSIT
  * @see Swe#SE_BIT_DISC_CENTER
  * @see Swe#SE_BIT_DISC_BOTTOM
  * @see Swe#SE_BIT_NO_REFRACTION
  * @see Swe#SE_BIT_CIVIL_TWILIGHT
  * @see Swe#SE_BIT_NAUTIC_TWILIGHT
  * @see Swe#SE_BIT_ASTRO_TWILIGHT
  * @see Swe#SE_BIT_FIXED_DISC_SIZE
  * @see DblObj
  */
  swe_rise_trans(tjd_ut, ipl, starname, epheflag, rsmi, geopos, atpress, attemp, tret) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_rise_trans(tjd_ut, ipl, starname, epheflag, rsmi, geopos,
                             atpress, attemp, tret);
  }

  /**
  * Same as swe_rise_trans(), but allows to define the height of the horizon
  * at the point of the rising or setting (horhgt) in degree.<br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_ut The Julian Day number in UT, from when to start searching
  * @param ipl Planet number, if times for planet or moon are to be calculated.
  * @param starname The name of the star, if times for a star should be
  * calculated. It has to be null or the empty string otherwise!
  * @param epheflag To indicate, which ephemeris should be used (or SEFLG_MOSEPH
  * only for JavaME)
  * @param rsmi Specification, what type of calculation is wanted
  * (SE_CALC_RISE, SE_CALC_SET, SE_CALC_MTRANSIT, SE_CALC_ITRANSIT) plus
  * optionally SE_BIT_DISC_CENTER, when the rise time of the disc center
  * of the body is requested and / or SE_BIT_NO_REFRACTION for calculation
  * without refraction effects. The calculation method defaults to
  * SE_CALC_RISE.
  * @param geopos A double[3] containing the longitude, latitude and
  * height of the observer. Eastern longitude and northern
  * latitude is given by positive values, western longitude and southern
  * latitude by negative values.
  * @param atpress atmospheric pressure in mBar (hPa). If it is 0, the pressure
  * will be estimated from geopos[2] and attemp (1013.25 mbar for sea level).
  * When calculating MTRANSIT or ITRANSIT, this parameter is not used.
  * @param attemp atmospheric temperature in degrees Celsius. When
  * calculating MTRANSIT or ITRANSIT, this parameter is not used.
  * @param horhgt Height of horizon in degree.
  * @param tret Return value containing the time of rise or whatever was
  * requested. This is UT.
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails
  * @return Swe.OK (0) or Swe.ERR (-1)  or -2 if the body does not rise or set
  * @see #swe_rise_trans(double, int, StringBuffer, int, int, double[], double, double, DblObj, StringBuffer)
  * @see Swe#OK
  * @see Swe#ERR
  * @see Swe#SEFLG_SWIEPH
  * @see Swe#SEFLG_MOSEPH
  * @see Swe#SE_CALC_RISE
  * @see Swe#SE_CALC_SET
  * @see Swe#SE_CALC_MTRANSIT
  * @see Swe#SE_CALC_ITRANSIT
  * @see Swe#SE_BIT_DISC_CENTER
  * @see Swe#SE_BIT_NO_REFRACTION
  * @see DblObj
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_rise_trans_true_hor(tjd_ut, ipl, starname, epheflag, rsmi, geopos, atpress, attemp, horhgt, tret) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_rise_trans_true_hor(tjd_ut, ipl, starname, epheflag, rsmi, geopos, atpress, attemp, horhgt, tret);
  }

  /**
  * Computes the attributes of a solar eclipse for a given Julian Day,
  * geographic longitude, latitude, and height.
  * <BLOCKQUOTE><CODE>
  * attr[0]:   fraction of solar diameter covered by moon
  * (magnitude)<BR>
  * attr[1]:   ratio of lunar diameter to solar one<BR>
  * attr[2]:   fraction of solar disc covered by moon
  * (obscuration)<BR>
  * attr[3]:   diameter of core shadow in km<BR>
  * attr[4]:   azimuth of sun at tjd<BR>
  * attr[5]:   true altitude of sun above horizon at tjd<BR>
  * attr[6]:   apparent altitude of sun above horizon at tjd<BR>
  * attr[7]:   angular distance of moon from sun in degrees
  * </CODE></BLOCKQUOTE><p><B>Attention: attr must be a double[20]!</B><br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_ut The Julian Day number in UT
  * @param ifl To indicate, which ephemeris should be used (SEFLG_MOSEPH
  * only for JavaME)
  * @param geopos A double[3] containing geographic longitude, latitude and
  * height in meters above sea level in this order. Eastern longitude and
  * northern latitude is given by positive values, western longitude and
  * southern latitude by negative values.
  * @param attr A double[20], on return containing the attributes of the
  * eclipse as above
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails
  * @return -1 (Swe.ERR), if the calculation failed<BR>
  * 0, if there is no solar eclipse at that time and location<BR>
  * Swe.SE_ECL_TOTAL<BR>
  * Swe.SE_ECL_ANNULAR<BR>
  * Swe.SE_ECL_PARTIAL
  * @see Swe#SE_ECL_TOTAL
  * @see Swe#SE_ECL_ANNULAR
  * @see Swe#SE_ECL_PARTIAL
  * @see Swe#SEFLG_SWIEPH
  * @see Swe#SEFLG_MOSEPH
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_sol_eclipse_how(tjd_ut, ifl, geopos, attr) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_sol_eclipse_how(tjd_ut, ifl, geopos, attr);
  }

  /**
  * Computes the next solar eclipse anywhere on earth.
  * <P>tret is an output parameter with the following meaning:
  * <P><CODE>
  * tret[0]:   time of maximum eclipse.<BR>
  * tret[1]:   time, when the eclipse takes place at local
  * apparent noon.</code><BR><BLOCKQUOTE><code>
  * tret[2]:   time of the begin of the eclipse.<BR>
  * tret[3]:   time of the end of the eclipse.<BR>
  * tret[4]:   time of the begin of totality.<BR>
  * tret[5]:   time of the end of totality.<BR>
  * tret[6]:   time of the begin of center line.<BR>
  * tret[7]:   time of the end of center line<BR>
  * tret[8]:   time, when annular-total eclipse becomes total --
  * <I>Not yet implemented.</I><BR>
  * tret[9]:   time, when annular-total eclipse becomes annular
  * again -- <I>Not yet implemented.</I>
  * </CODE></BLOCKQUOTE><P><B>Attention: tret must be a double[10]!</B><br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_start The Julian Day number in UT, from when to start searching
  * @param ifl To indicate, which ephemeris should be used (SEFLG_MOSEPH
  * only for JavaME)
  * @param ifltype Swe.SE_ECL_TOTAL or any other SE_ECL_* constant
  * or 0 for any type of eclipse:
  * <blockquote>
  * Swe.SE_ECL_TOTAL<BR>
  * Swe.SE_ECL_ANNULAR<BR>
  * Swe.SE_ECL_PARTIAL<BR>
  * Swe.SE_ECL_ANNULAR_TOTAL<BR>in combination with:<BR>
  * Swe.SE_ECL_CENTRAL<BR>
  * Swe.SE_ECL_NONCENTRAL
  * </blockquote>
  * @param tret A double[10], on return containing the times of different
  * occasions of the eclipse as above
  * @param backward !=0, if search should be done backwards
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return -1 (Swe.ERR), if the calculation failed<BR>
  * @see Swe#SE_ECL_TOTAL
  * @see Swe#SE_ECL_ANNULAR
  * @see Swe#SE_ECL_PARTIAL
  * @see Swe#SE_ECL_ANNULAR_TOTAL
  * @see Swe#SE_ECL_CENTRAL
  * @see Swe#SEFLG_SWIEPH
  * @see Swe#SEFLG_MOSEPH
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_sol_eclipse_when_glob(tjd_start, ifl, ifltype, tret, backward) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_sol_eclipse_when_glob(tjd_start, ifl, ifltype, tret, backward);
  }

  /**
  * Computes the next solar eclipse at a given geographical position. Note the
  * uncertainty of Delta T for the remote past and the future.<P>
  * tret is an output parameter with the following meaning:
  * <P><CODE>
  * tret[0]:   time of maximum eclipse.<BR>
  * tret[1]:   time of first contact.<BR>
  * tret[2]:   time of second contact.<BR>
  * tret[3]:   time of third contact.<BR>
  * tret[4]:   time of forth contact.<BR>
  * tret[5]:   time of sun rise between first and forth contact
  * -- <I>Not yet implemented.</I><BR>
  * tret[6]:   time of sun set between first and forth contact
  * -- <I>Not yet implemented.</I><BR>
  * </CODE><P>
  * attr is an output parameter with the following meaning:
  * <P><CODE>
  * attr[0]:   fraction of solar diameter covered by moon
  * (magnitude).<BR>
  * attr[1]:   ratio of lunar diameter to solar one.<BR>
  * attr[2]:   fraction of solar disc covered by moon
  * (obscuration).<BR>
  * attr[3]:   diameter of core shadow in km.<BR>
  * attr[4]:   azimuth of sun at tjd.<BR>
  * attr[5]:   true altitude of sun above horizon at tjd.<BR>
  * attr[6]:   apparent altitude of sun above horizon at tjd.<BR>
  * attr[7]:   elongation of moon in degrees.<BR>
  * </CODE><P><B>Attention: attr must be a double[20]!</B><br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_start The Julian Day number in UT, from when to start searching
  * @param ifl To indicate, which ephemeris should be used (SEFLG_MOSEPH
  * only for JavaME)
  * @param geopos A double[3] containing the longitude, latitude and
  * height of the geographic position. Eastern longitude and northern
  * latitude is given by positive values, western longitude and southern
  * latitude by negative values.
  * @param tret A double[7], on return containing the times of different
  * occasions of the eclipse as specified above
  * @param attr A double[20], on return containing different attributes of
  * the eclipse. See above.
  * @param backward true, if search should be done backwards
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return -1 (Swe.ERR), if the calculation failed<BR>
  * Swe.SE_ECL_TOTAL<BR>
  * Swe.SE_ECL_ANNULAR<BR>
  * Swe.SE_ECL_PARTIAL<BR>in combination with:<BR>
  * Swe.SE_ECL_VISIBLE<BR>
  * Swe.SE_ECL_MAX_VISIBLE<BR>
  * Swe.SE_ECL_1ST_VISIBLE<BR>
  * Swe.SE_ECL_2ND_VISIBLE<BR>
  * Swe.SE_ECL_3RD_VISIBLE<BR>
  * Swe.SE_ECL_4TH_VISIBLE
  * @see Swe#SE_ECL_TOTAL
  * @see Swe#SE_ECL_ANNULAR
  * @see Swe#SE_ECL_PARTIAL
  * @see Swe#SE_ECL_VISIBLE
  * @see Swe#SE_ECL_MAX_VISIBLE
  * @see Swe#SE_ECL_1ST_VISIBLE
  * @see Swe#SE_ECL_2ND_VISIBLE
  * @see Swe#SE_ECL_3RD_VISIBLE
  * @see Swe#SE_ECL_4TH_VISIBLE
  * @see Swe#SEFLG_SWIEPH
  * @see Swe#SEFLG_MOSEPH
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_sol_eclipse_when_loc(tjd_start, ifl, geopos, tret, attr, backward) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_sol_eclipse_when_loc(tjd_start, ifl, geopos, tret, attr, backward);
  }

  /**
  * <p>Computes the geographic location for a given time, where a solar
  * eclipse is central (or maximum for a non-central eclipse).</p>
  * <P>Output parameters:</P><BLOCKQUOTE><CODE>
  * geopos[0]:   geographic longitude of central line, positive
  * values mean east of Greenwich, negative values west of Greenwich<BR>
  * geopos[1]:   geographic latitude of central line,
  * positive values mean north of equator, negative values south<BR>
  * </CODE><P><CODE>
  * attr[0]:   fraction of solar diameter covered by moon
  * (magnitude)<BR>
  * attr[1]:   ratio of lunar diameter to solar one<BR>
  * attr[2]:   fraction of solar disc covered by moon
  * (obscuration)<BR>
  * attr[3]:   diameter of core shadow in km<BR>
  * attr[4]:   azimuth of sun at tjd<BR>
  * attr[5]:   true altitude of sun above horizon at tjd<BR>
  * attr[6]:   apparent altitude of sun above horizon at tjd<BR>
  * attr[7]:   angular distance of moon from sun in degrees
  * </CODE></BLOCKQUOTE><P><B>ATTENTION: geopos must be a double[10], attr
  * a double[20]!</B><br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_ut The Julian Day number in UT
  * @param ifl To indicate, which ephemeris should be used (SEFLG_JPLEPH,
  * SEFLG_SWIEPH or SEFLG_MOSEPH)
  * @param geopos A double[10], on return containing the geographic positions.
  * @param attr A double[20], on return containing the attributes of the
  * eclipse as above.
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return -1 (Swe.ERR), if the calculation failed<BR>
  * 0, if there is no solar eclipse at that time<BR>
  * Swe.SE_ECL_TOTAL<BR>
  * Swe.SE_ECL_ANNULAR<BR>
  * Swe.SE_ECL_TOTAL | Swe.SE_ECL_CENTRAL<BR>
  * Swe.SE_ECL_TOTAL | Swe.SE_ECL_NONCENTRAL<BR>
  * Swe.SE_ECL_ANNULAR | Swe.SE_ECL_CENTRAL<BR>
  * Swe.SE_ECL_ANNULAR | Swe.SE_ECL_NONCENTRAL<BR>
  * Swe.SE_ECL_PARTIAL<BR>
  * @see Swe#SE_ECL_TOTAL
  * @see Swe#SE_ECL_ANNULAR
  * @see Swe#SE_ECL_CENTRAL
  * @see Swe#SE_ECL_NONCENTRAL
  * @see Swe#SE_ECL_PARTIAL
  * @see Swe#SEFLG_SWIEPH
  * @see Swe#SEFLG_MOSEPH
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_sol_eclipse_where(tjd_ut,ifl, geopos, attr) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_sol_eclipse_where(tjd_ut, ifl, geopos, attr)
  }

  /* Same declaration as swe_sol_eclipse_when_loc().
   * In addition:
   * int32 ipl          planet number of occulted body
   * char* starname     name of occulted star. Must be NULL or "", if a planetary
   *                    occultation is to be calculated. For the use of this
   *                    field, also see swe_fixstar().
   * int32 ifl        ephemeris flag. If you want to have only one conjunction
   *                    of the moon with the body tested, add the following flag:
   *                    ifl |= SE_ECL_ONE_TRY. If this flag is not set,
   *                    the function will search for an occultation until it
   *                    finds one. For bodies with ecliptical latitudes > 5,
   *                    the function may search successlessly until it reaches
   *                    the end of the ephemeris.
   */
  /**
  * Computes the next eclipse of any planet or fixstar at a given geographical
  * position. Note the uncertainty of Delta T for the remote past and the
  * future.<P>
  * tret is an output parameter with the following meaning:
  * <P><CODE>
  * tret[0]:   time of maximum eclipse.<BR>
  * tret[1]:   time of first contact.<BR>
  * tret[2]:   time of second contact.<BR>
  * tret[3]:   time of third contact.<BR>
  * tret[4]:   time of forth contact.<BR>
  * tret[5]:   time of sun rise between first and forth contact
  * -- <I>Not yet implemented.</I><BR>
  * tret[6]:   time of sun set between first and forth contact
  * -- <I>Not yet implemented.</I><BR>
  * </CODE><P>
  * attr is an output parameter with the following meaning:
  * <P><CODE>
  * attr[0]:   fraction of solar diameter covered by moon
  * (magnitude).<BR>
  * attr[1]:   ratio of lunar diameter to solar one.<BR>
  * attr[2]:   fraction of solar disc covered by moon
  * (obscuration).<BR>
  * attr[3]:   diameter of core shadow in km.<BR>
  * attr[4]:   azimuth of sun at tjd.<BR>
  * attr[5]:   true altitude of sun above horizon at tjd.<BR>
  * attr[6]:   apparent altitude of sun above horizon at tjd.<BR>
  * attr[7]:   elongation of moon in degrees.<BR>
  * </CODE><P><B>Attention: attr must be a double[20]!</B><br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_start The Julian Day number in UT, from when to start searching
  * @param ipl Planet number of the occulted planet. See SE_SUN etc. for the
  * planet numbers.
  * @param starname The name of the fixstar, if looking for an occulted
  * fixstar. This has to be null or an empty StringBuffer, if you are looking
  * for a planet specified in parameter ipl. See routine swe_fixstar() for this
  * parameter.
  * @param ifl To indicate, which ephemeris should be used (SEFLG_MOSEPH
  * only for JavaME)
  * Additionally, you can specify SE_ECL_ONE_TRY,
  * to only search for one conjunction of the moon with the planetary body.
  * If this flag is not set, the function will search for an occultation until
  * it finds one. For bodies with ecliptical latitudes &gt; 5, the function may
  * search successlessly until it reaches the end of the ephemeris.
  * @param geopos A double[3] containing the longitude, latitude and
  * height of the geographic position. Eastern longitude and northern
  * latitude is given by positive values, western longitude and southern
  * latitude by negative values.
  * @param tret A double[7], on return containing the times of different
  * occasions of the eclipse as specified above
  * @param attr A double[20], on return containing different attributes of
  * the eclipse. See above.
  * @param backward any value != 0 means, search should be done backwards
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return -1 (Swe.ERR), if the calculation failed<BR>
  * Swe.SE_ECL_TOTAL<BR>
  * Swe.SE_ECL_ANNULAR<BR>
  * Swe.SE_ECL_PARTIAL<BR>in combination with:<BR>
  * Swe.SE_ECL_VISIBLE<BR>
  * Swe.SE_ECL_MAX_VISIBLE<BR>
  * Swe.SE_ECL_1ST_VISIBLE<BR>
  * Swe.SE_ECL_2ND_VISIBLE<BR>
  * Swe.SE_ECL_3RD_VISIBLE<BR>
  * Swe.SE_ECL_4TH_VISIBLE
  * @see #swe_fixstar_ut(StringBuffer, double, int, double[], StringBuffer)
  * @see Swe#SE_ECL_ONE_TRY
  * @see Swe#SE_ECL_TOTAL
  * @see Swe#SE_ECL_ANNULAR
  * @see Swe#SE_ECL_PARTIAL
  * @see Swe#SE_ECL_VISIBLE
  * @see Swe#SE_ECL_MAX_VISIBLE
  * @see Swe#SE_ECL_1ST_VISIBLE
  * @see Swe#SE_ECL_2ND_VISIBLE
  * @see Swe#SE_ECL_3RD_VISIBLE
  * @see Swe#SE_ECL_4TH_VISIBLE
  * @see Swe#SE_ECL_ONE_TRY
  * @see Swe#SEFLG_SWIEPH
  * @see Swe#SEFLG_MOSEPH
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_lun_occult_when_loc(tjd_start, ipl, starname, ifl, geopos, tret, attr, backward) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_lun_occult_when_loc(tjd_start, ipl, starname, ifl, geopos, tret, attr, backward);
  }

  /* When is the next lunar eclipse, observable at a geographic position?
   *
   * retflag      SE_ECL_TOTAL or SE_ECL_PENUMBRAL or SE_ECL_PARTIAL
   *
   * tret[0]      time of maximum eclipse
   * tret[1]
   * tret[2]      time of partial phase begin (indices consistent with solar eclipses)
   * tret[3]      time of partial phase end
   * tret[4]      time of totality begin
   * tret[5]      time of totality end
   * tret[6]      time of penumbral phase begin
   * tret[7]      time of penumbral phase end
   * tret[8]      time of moonrise, if it occurs during the eclipse
   * tret[9]      time of moonset, if it occurs during the eclipse
   *
   * attr[0]      umbral magnitude at tjd
   * attr[1]      penumbral magnitude
   * attr[4]      azimuth of moon at tjd
   * attr[5]      true altitude of moon above horizon at tjd
   * attr[6]      apparent altitude of moon above horizon at tjd
   * attr[7]      distance of moon from opposition in degrees
   * attr[8]      umbral magnitude at tjd (= attr[0])
   * attr[9]      saros series number
   * attr[10]     saros series member number
   *         declare as attr[20] at least !
   */
  swe_lun_eclipse_when_loc(tjd_start, ifl, geopos, tret, attr, backward) {

    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_lun_eclipse_when_loc(tjd_start, ifl, geopos, tret, attr, backward);
  }

  /**
  * Computes the geographic location for a given time, where a planet
  * occultation by the moon is central or maximum for a non-central
  * occultation.
  * @param tjd_ut The Julian Day number in UT
  * @param ipl The planet, whose occultation by the moon should be searched.
  * @param starname The fixstar, whose occultation by the moon should be
  * searched. See swe_fixstar() for details. It has to be null or the empty
  * string, if a planet (see parameter ipl) is to be searched.<br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param ifl To indicate, which ephemeris should be used (SEFLG_MOSEPH
  * only for JavaME)
  * @param geopos A double[10], on return containing the geographic positions.
  * @param attr A double[20], on return containing the attributes of the
  * eclipse as above.<br>
  * attr[0] fraction of solar diameter covered by moon (magnitude)<br>
  * attr[1] ratio of lunar diameter to solar one<br>
  * attr[2] fraction of solar disc covered by moon (obscuration)<br>
  * attr[3] diameter of core shadow in km<br>
  * attr[4] azimuth of sun at tjd<br>
  * attr[5] true altitude of sun above horizon at tjd<br>
  * attr[6] apparent altitude of sun above horizon at tjd<br>
  * attr[7] angular distance of moon from sun in degrees<br>
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return -1 (Swe.ERR), if the calculation failed<BR>
  * 0, if there is no solar eclipse at that time<BR>
  * Swe.SE_ECL_TOTAL<br>
  * Swe.SE_ECL_ANNULAR<br>
  * Swe.SE_ECL_TOTAL | Swe.SE_ECL_CENTRAL<br>
  * Swe.SE_ECL_TOTAL | Swe.SE_ECL_NONCENTRAL<br>
  * Swe.SE_ECL_ANNULAR | Swe.SE_ECL_CENTRAL<br>
  * Swe.SE_ECL_ANNULAR | Swe.SE_ECL_NONCENTRAL<br>
  * Swe.SE_ECL_PARTIAL<br>
  * @see #swe_sol_eclipse_where(double, int, double[], double[], java.lang.StringBuffer)
  * @see #swe_fixstar_ut(StringBuffer, double, int, double[], StringBuffer)
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_lun_occult_where(tjd_ut, ipl, starname,ifl, geopos, attr) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_lun_occult_where(tjd_ut, ipl, starname, ifl, geopos, attr);
  }

  /* When is the next lunar occultation anywhere on earth?
   * This function also finds solar eclipses, but is less efficient
   * than swe_sol_eclipse_when_glob().
   *
   * input parameters:
   *
   * tjd_start          start time for search (UT)
   * ipl                planet number of occulted body
   * starname           name of occulted star. Must be NULL or "", if a planetary
   *                    occultation is to be calculated. For the use of this
   *                    field, also see swe_fixstar().
   * ifl                      ephemeris to be used (SEFLG_SWIEPH, etc.)
   *                  ephemeris flag. If you want to have only one conjunction
   *                    of the moon with the body tested, add the following flag:
   *                    ifl |= SE_ECL_ONE_TRY. If this flag is not set,
   *                    the function will search for an occultation until it
   *                    finds one. For bodies with ecliptical latitudes > 5,
   *                    the function may search successlessly until it reaches
   *                    the end of the ephemeris.
   *
   * ifltype          eclipse type to be searched (SE_ECL_TOTAL, etc.)
   *                    0, if any type of eclipse is wanted
   *                    this functionality also works with occultations
   *
   * return values:
   *
   * retflag    SE_ECL_TOTAL or SE_ECL_ANNULAR or SE_ECL_PARTIAL
   *              or SE_ECL_ANNULAR_TOTAL
   *              SE_ECL_CENTRAL
   *              SE_ECL_NONCENTRAL
   *
   * tret[0]    time of maximum eclipse
   * tret[1]    time, when eclipse takes place at local apparent noon
   * tret[2]    time of eclipse begin
   * tret[3]    time of eclipse end
   * tret[4]    time of totality begin
   * tret[5]    time of totality end
   * tret[6]    time of center line begin
   * tret[7]    time of center line end
   * tret[8]    time when annular-total eclipse becomes total
   *               not implemented so far
   * tret[9]    time when annular-total eclipse becomes annular again
   *               not implemented so far
   *         declare as tret[10] at least!
   *
   */
  /**
  * Computes the next lunar occultation anywhere on earth.
  * This method also finds solar eclipses, but is less efficient
  * than swe_sol_eclipse_when_glob().
  * <P>tret is an output parameter with the following meaning:
  * <P><CODE>
  * tret[0]:   time of maximum eclipse.<BR>
  * tret[1]:   time, when the eclipse takes place at local
  * apparent noon.</code><BR><BLOCKQUOTE><code>
  * tret[2]:   time of the begin of the eclipse.<BR>
  * tret[3]:   time of the end of the eclipse.<BR>
  * tret[4]:   time of the begin of totality.<BR>
  * tret[5]:   time of the end of totality.<BR>
  * tret[6]:   time of the begin of center line.<BR>
  * tret[7]:   time of the end of center line<BR>
  * tret[8]:   time, when annular-total eclipse becomes total --
  * <I>Not yet implemented.</I><BR>
  * tret[9]:   time, when annular-total eclipse becomes annular
  * again -- <I>Not yet implemented.</I>
  * </CODE></BLOCKQUOTE><P><B>Attention: tret must be a double[10]!</B><br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_start The Julian Day number in UT, from when to start searching
  * @param ipl planet number of occulted body
  * @param starname name of occulted star. Must be null or &quot;&quot;, if
  * a planetary occultation is to be calculated. For the use of this
  * field, also see swe_fixstar().
  * @param ifl To indicate, which ephemeris should be used (SEFLG_MOSEPH
  * only for JavaME)
  * If you like to have only one conjunction
  * of the moon with the body tested, add flag SE_ECL_ONE_TRY. If this flag
  * is not set, the function will search for an occultation until it
  * finds one. For bodies with ecliptical latitudes &gt; 5, the function may
  * search successlessly until it reaches the end of the ephemeris.
  * @param ifltype eclipse type to be searched (SE_ECL_TOTAL, etc.).
  * 0, if any type of eclipse is wanted. This functionality also works
  * with occultations.
  * @param tret A double[10], on return containing the times of different
  * occasions of the eclipse as above
  * @param backward if != 0, search is done backwards
  * @param serr A StringBuffer containing a warning or error message, if
  * something fails.
  * @return -1 (Swe.ERR), if the calculation failed<BR>
  * Swe.SE_ECL_TOTAL<BR>
  * Swe.SE_ECL_ANNULAR<BR>
  * Swe.SE_ECL_PARTIAL<BR>
  * Swe.SE_ECL_ANNULAR_TOTAL<BR>in combination with:<BR>
  * Swe.SE_ECL_CENTRAL<BR>
  * Swe.SE_ECL_NONCENTRAL
  * @see #swe_sol_eclipse_when_glob(double, int, int, double[], int, java.lang.StringBuffer)
  * @see #swe_fixstar_ut(StringBuffer, double, int, double[], StringBuffer)
  * @see Swe#SE_ECL_ONE_TRY
  * @see Swe#SE_ECL_TOTAL
  * @see Swe#SE_ECL_ANNULAR
  * @see Swe#SE_ECL_PARTIAL
  * @see Swe#SE_ECL_ANNULAR_TOTAL
  * @see Swe#SE_ECL_CENTRAL
  * @see Swe#SE_ECL_NONCENTRAL
  * @see Swe#SEFLG_SWIEPH
  * @see Swe#SEFLG_MOSEPH
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_lun_occult_when_glob(tjd_start, ipl, starname, ifl, ifltype, tret, backward) {
    if (this.sc==null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_lun_occult_when_glob(tjd_start, ipl, starname, ifl, ifltype, tret, backward);
  }

  /* function finds the gauquelin sector position of a planet or fixed star
   * 
   * if starname != NULL then a star is computed.
   * iflag: use the flags SE_MOSEPH, SEFLG_TOPOCTR.
   *
   * imeth defines method:
   *           imeth = 0                  sector from longitude and latitude
   *           imeth = 1                  sector from longitude, with lat = 0
   *           imeth = 2                  sector from rise and set
   *           imeth = 3                  sector from rise and set with refraction
   * rise and set are defined as appearance and disappearance of disc center.
   *
   * geopos is an array of 3 doubles for geo. longitude, geo. latitude, elevation.
   * atpress and attemp are only needed for imeth = 3. If imeth = 3,
   * If imeth=3 and atpress not given (= 0), the programm assumes 1013.25 mbar;
   * if a non-zero height above sea is given in geopos, atpress is estimated.
   * dgsect is return area (pointer to a double)
   * serr is pointer to error string, may be NULL
   */
  /**
  * Finds the gauquelin sector position of a planet or fixed star.
  * @param t_ut Time in UT.
  * @param ipl Planet number.
  * @param starname If starname != null and not an empty string, then a
  * fixstar is computed and not a planet specified in ipl. See swe_fixstar()
  * method on this.
  * @param iflag Use the flags SE_MOSEPH, SEFLG_TOPOCTR.
  * @param imeth defines the method.<br>
  * <blockquote>
  * imeth = 0: sector from longitude and latitude<br>
  * imeth = 1: sector from longitude, with lat = 0<br>
  * imeth = 2: sector from rise and set<br>
  * imeth = 3: sector from rise and set with refraction<br>
  * </blockquote>
  * Rise and set are defined as appearance and disappearance of disc center.
  * @param geopos An array of 3 doubles for geo. longitude, geo. latitude, elevation in meter.
  * @param atpress Only needed for imeth = 3.
  * If imeth=3 and atpress not given (= 0), the programm assumes 1013.25 mbar;
  * if a non-zero height above sea is given in geopos, atpress is estimated.
  * @param attemp Temperature. Only needed for imeth = 3.
  * @param dgsect Return value.
  * @param serr Pointer to error string, may be null.
  * @return Swe.OK (0) or Swe.ERR (-1) on error.
  * @see #swe_fixstar_ut(StringBuffer, double, int, double[], StringBuffer)
  * @see Swe#SEFLG_TOPOCTR
  * @see Swe#SEFLG_SWIEPH
  * @see Swe#SEFLG_MOSEPH
  */
  swe_gauquelin_sector(t_ut, ipl, starname, iflag, imeth, geopos, atpress, attemp, dgsect) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed, this.sd)
    }
    return this.sc.swe_gauquelin_sector(t_ut, ipl, starname, iflag, imeth, geopos, atpress, attemp, dgsect);
  }

  /**
  * The function returns the name of the house system.
  * @param hsys House system character
  * house systems are:<BLOCKQUOTE><CODE>
  * A  equal<br>
  * E  equal<br>
  * B  Alcabitius<br>
  * C  Campanus<br>
  * G  36 Gauquelin sectors<br>
  * H  horizon / azimut<br>
  * K  Koch<br>
  * M  Morinus<br>
  * O  Porphyry<br>
  * P  Placidus<br>
  * R  Regiomontanus<br>
  * T  Polich/Page ("topocentric")<br>
  * U  Krusinski-Pisa-Goelzer<br>
  * V  equal Vehlow<br>
  * W  equal, whole sign<br>
  * X  axial rotation system/ Meridian houses<br>
  * Y  APC houses
  * </code></blockquote>
  * @return The name of the house system
  */
  swe_house_name(hsys) {
    if (this.sh==null) {
      this.sh=new SweHouse(sl, this, this.swed);
    }
    return this.sh.swe_house_name(Math.float(hsys));
  }

  /**
  * The function returns a value between 1.0 and 12.999999, indicating in
  * which house a planet is and how far from its cusp it is. With Koch houses,
  * the function sometimes returns 0, if the computation was not possible.
  * @param armc The ARMC (= sidereal time)
  * @param geolat The latitude
  * @param eps The ecliptic obliquity (e.g. xx[0] of swe_calc(...))
  * @param hsys The house system. See swe_houses(...) for a list of all
  * houses.
  * @param xpin A double[2] containing the ecliptic longitude (xpin[0]) and
  * latitude (xpin[1]) of the planet in degrees. It is an input parameter,
  * describing tropical positions. Indeed, it needs a double[6] as parameter
  * with any value in the other doubles, but the methods now accepts both a
  * double[2] and a double[6].
  * @param serr StringBuffer to contain any error messages or warnings
  * @return A value between 1.0 and 12.999999, indicating in which house a
  * planet is and how far from its cusp it is. Koch may return 0, if the
  * calculation was not possible.
  * @see #swe_houses(double, int, double, double, int, double[], double[])
  */
  swe_house_pos(armc, geolat, eps, hsys, xpin) {
    if (this.sh==null) {
      this.sh=new SweHouse(this.sl, this, this.swed);
    }
    if (xpin.length != 6) {
      xpin = [xpin[0], xpin[1], 0, 0, 0, 0];
    }
    return this.sh.swe_house_pos(armc, geolat, eps, hsys, xpin);
  }

  /**
  * Calculates the house positions and other vital points. You would use
  * this method instead of swe_houses, if you do not have a date available,
  * but just the ARMC (sidereal time).
  * @param armc The ARMC (= sidereal time)
  * @param geolat The latitude on earth, for which the calculation has to be
  * done.
  * @param eps The ecliptic obliquity (e.g. xx[0] of swe_calc(...))
  * @param hsys The house system as a character given as an integer. See
  * swe_houses(...) for a list of all houses.
  * @param cusp The house cusps are returned here in cusp[1...12] for
  * the house 1 to 12.
  * @param ascmc The special points like ascendant etc. are returned here.
  * See swe_houses(...) for further info on this parameter.
  * @see SwissEph#swe_houses(double, int, double, double, int, double[], double[])
  * @see SwissEph#swe_calc(double, int, int, double[], java.lang.StringBuffer)
  * @return Swe.OK (==0) or Swe.ERR (==-1), if calculation was not
  * possible due to nearness to the polar circle in Koch or Placidus house system
  * or when requesting Gauquelin sectors. Calculation automatically switched to
  * Porphyry house calculation method in this case, so that valid houses will be
  * returned anyway, just in a different house system than requested.
  */
  swe_houses_armc(armc, geolat, eps, hsys, cusp, ascmc) {
    if (this.sh==null) {
      this.sh=new SweHouse(sl, this, this.swed);
    }
    return this.sh.swe_houses_armc(armc, geolat, eps, hsys, cusp, ascmc, 0);
  }

  /**
  * Calculates the house positions and other vital points. The possible
  * house systems are:<BLOCKQUOTE><CODE>
  * (int)'A'  equal<br>
  * (int)'E'  equal<br>
  * (int)'B'  Alcabitius<br>
  * (int)'C'  Campanus<br>
  * (int)'G'  36 Gauquelin sectors<br>
  * (int)'H'  horizon / azimut<br>
  * (int)'K'  Koch<br>
  * (int)'M'  Morinus<br>
  * (int)'O'  Porphyry<br>
  * (int)'P'  Placidus<br>
  * (int)'R'  Regiomontanus<br>
  * (int)'T'  Polich/Page ("topocentric")<br>
  * (int)'U'  Krusinski-Pisa-Goelzer<br>
  * (int)'V'  equal Vehlow<br>
  * (int)'W'  equal, whole sign<br>
  * (int)'X'  axial rotation system/ Meridian houses<br>
  * (int)'Y'  APC houses
  * </CODE></BLOCKQUOTE><P>
  *
  * The parameter ascmc is defined as double[10] and will return the
  * following points:<BLOCKQUOTE><CODE>
  * ascmc[0] = ascendant<BR>
  * ascmc[1] = mc<BR>
  * ascmc[2] = armc (= sidereal time)<BR>
  * ascmc[3] = vertex<BR>
  * ascmc[4] = equatorial ascendant<BR>
  * ascmc[5] = co-ascendant (Walter Koch)<BR>
  * ascmc[6] = co-ascendant (Michael Munkasey)<BR>
  * ascmc[7] = polar ascendant (Michael Munkasey)<BR>
  * ascmc[8] = reserved for future use<BR>
  * ascmc[9] = reserved for future use
  *  </CODE></BLOCKQUOTE>
  * You can use the SE_ constants below from Swe.java to access
  * these values in ascmc[].<p>
  * @param tjd_ut The Julian Day number in UT
  * @param iflag An additional flag for calculation. It must be 0 or
  * SEFLG_SIDEREAL and / or SEFLG_RADIANS.
  * @param geolat The latitude on earth, for which the calculation has to be
  * done.
  * @param geolon The longitude on earth, for which the calculation has to be
  * done. Eastern longitude and northern latitude is given by positive values,
  * western longitude and southern latitude by negative values.
  * @param hsys The house system as a character given as an integer.
  * @param cusp (double[13]) The house cusps are returned here in
  * cusp[1...12] for the houses 1 to 12.
  * @param ascmc (double[10]) The special points like ascendant etc. are
  * returned here. See the list above.
  * @return Swe.OK (==0) or Swe.ERR (==-1), if calculation was not
  * possible due to nearness to the polar circle in Koch or Placidus house system
  * or when requesting Gauquelin sectors. Calculation automatically switched to
  * Porphyry house calculation method in this case, so that valid houses will be
  * returned anyway, just in a different house system than requested.
  * @see SwissEph#swe_set_sid_mode(int, double, double)
  * @see Swe#SEFLG_RADIANS
  * @see Swe#SEFLG_SIDEREAL
  * @see Swe#SE_ASC
  * @see Swe#SE_MC
  * @see Swe#SE_ARMC
  * @see Swe#SE_VERTEX
  * @see Swe#SE_EQUASC
  * @see Swe#SE_COASC1
  * @see Swe#SE_COASC2
  * @see Swe#SE_POLASC
  */
  swe_houses(tjd_ut, iflag, geolat, geolon, hsys, cusp, ascmc, aOffs) {
    if(aOffs === undefined){
      return this.swe_houses(tjd_ut, iflag, geolat, geolon, hsys, cusp, ascmc, 0);
    }
    if (this.sh===null) {
      this.sh = new SweHouse(this.sl, this, this.swed);
    }
    return this.sh.swe_houses(tjd_ut, iflag, geolat, geolon, hsys, cusp, ascmc, aOffs);
  }

  swe_calc_error(xx) {
    for(var i = 0; i < xx.length; i++) {
      xx[i] = 0;
    }
    return Swe.ERR;
  }


  swecalc(tjd, ipl, iflag, x) {
    var i;
    var ipli, ipli_ast, ifno;
    var retc;
    var epheflag = Swe.SEFLG_DEFAULTEPH;
    var pdp;
    var pedp = this.swed.pldat[SwephData.SEI_EARTH];
    var psdp = this.swed.pldat[SwephData.SEI_SUNBARY];
    var ndp;
    var xp, xp2;
    let ss=new Array(3);
    /******************************************
     * iflag plausible?                       *
     ******************************************/
    iflag = this.plaus_iflag(iflag, ipl, tjd);
 
    if ((iflag & Swe.SEFLG_MOSEPH)!=0) {
      epheflag = Swe.SEFLG_MOSEPH;
    }
    /* no barycentric calculations with Moshier ephemeris */
    if (((iflag & Swe.SEFLG_BARYCTR)!=0) &&
        ((iflag & Swe.SEFLG_MOSEPH)!=0)) {
      console.error("barycentric Moshier positions are not supported.");
    }
    if (epheflag != Swe.SEFLG_MOSEPH && !this.swed.ephe_path_is_set) {
      this.swe_set_ephe_path(null);
    }
    if ((iflag & Swe.SEFLG_SIDEREAL)!=0 && !this.swed.ayana_is_set) {
      this.swe_set_sid_mode(Swe.SE_SIDM_FAGAN_BRADLEY, 0, 0);
    }
    /******************************************
     * obliquity of ecliptic 2000 and of date *
     ******************************************/
    this.swi_check_ecliptic(tjd, iflag);

    /******************************************
     * nutation                               *
     ******************************************/
    this.swi_check_nutation(tjd, iflag);

    /******************************************
     * select planet and ephemeris            *
     *                                        *
     * ecliptic and nutation                  *
     ******************************************/

    if (ipl == Swe.SE_ECL_NUT) {
      x[0] = this.swed.oec.eps + this.swed.nut.nutlo[1];  /* true ecliptic */
      x[1] = this.swed.oec.eps;      /* mean ecliptic */
      x[2] = this.swed.nut.nutlo[0];   /* nutation in longitude */
      x[3] = this.swed.nut.nutlo[1];   /* nutation in obliquity */
      /*if ((iflag & Swe.SEFLG_RADIANS) == 0)*/
      for (i = 0; i <= 3; i++){
        x[i] *= this.swed.RADTODEG;
      }
      return(iflag);
    /******************************************
     * moon                                   *
     ******************************************/
    }
    else if (ipl == Swe.SE_MOON) {

      /* internal planet number */
      ipli = SwephData.SEI_MOON;
      pdp = this.swed.pldat[ipli];
      xp = pdp.xreturn;
      switch(epheflag) {
        case Swe.SEFLG_MOSEPH:
          retc = this.moshier_moon(tjd, SwephData.DO_SAVE, null);
          if (retc == Swe.ERR) {
            return this.swecalc_error(x);
          }
          break;
        default:
          break;
      }

      /* heliocentric, lighttime etc. */
      if ((retc = this.app_pos_etc_moon(iflag))!=Swe.OK) {
        return this.swecalc_error(x); // retc may be wrong with sidereal calculation
      }

    }
    /******************************************
     * mercury - pluto                        *
     ******************************************/

    else if (ipl == Swe.SE_SUN 
      || ipl == Swe.SE_MERCURY
      || ipl == Swe.SE_VENUS
      || ipl == Swe.SE_MARS
      || ipl == Swe.SE_JUPITER
      || ipl == Swe.SE_SATURN
      || ipl == Swe.SE_URANUS
      || ipl == Swe.SE_NEPTUNE
      || ipl == Swe.SE_PLUTO
      || ipl == Swe.SE_EARTH) {
      if ((iflag & Swe.SEFLG_HELCTR)!=0) {
        if (ipl == Swe.SE_SUN) {
          for (i = 0; i < 24; i++) {
            x[i] = 0;
          }
          return iflag;
        }
      }
      else if ((iflag & Swe.SEFLG_BARYCTR)!=0) {

      }
      else {    /* geocentric */
        if (ipl == Swe.SE_EARTH) {
          for (i = 0; i < 24; i++) {
            x[i] = 0;
          }
          return iflag;
        }
      }
      /* internal planet number */
      ipli = this.swed.pnoext2int[ipl];
      pdp = this.swed.pldat[ipli];
      xp = pdp.xreturn;
      retc = this.main_planet(tjd, ipli, epheflag, iflag);

      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }

      iflag = pdp.xflgs;

    }
    else if (ipl == Swe.SE_MEAN_NODE) {
      if (((iflag & Swe.SEFLG_HELCTR)!=0) ||
          ((iflag & Swe.SEFLG_BARYCTR)!=0)) {
        for (i = 0; i < 24; i++) {
          x[i] = 0;
        }
        return iflag;
      }
      ndp = this.swed.nddat[SwephData.SEI_MEAN_NODE];
      xp = ndp.xreturn;
      xp2 = ndp.x;
      retc = this.sm.swi_mean_node(tjd, xp2);
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }

      retc = this.sm.swi_mean_node(tjd - SwephData.MEAN_NODE_SPEED_INTV, xp2, 3);
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }
      xp2[3] = this.sl.swe_difrad2n(xp2[0], xp2[3]) / SwephData.MEAN_NODE_SPEED_INTV;
      xp2[4] = xp2[5] = 0;
      ndp.teval = tjd;
      ndp.xflgs = -1;
      /* lighttime etc. */
      retc = this.app_pos_etc_mean(SwephData.SEI_MEAN_NODE, iflag);
      if (retc != Swe.OK) {
        return this.swecalc_error(x);
      }
      /* to avoid infinitesimal deviations from latitude = 0
       * that result from conversions */
      if ((iflag & Swe.SEFLG_SIDEREAL)==0 &&
          (iflag & Swe.SEFLG_J2000)==0) {
        ndp.xreturn[1] = 0.0; /* ecl. latitude       */
        ndp.xreturn[4] = 0.0; /*               speed */
        ndp.xreturn[5] = 0.0; /*      radial   speed */
        ndp.xreturn[8] = 0.0; /* z coordinate        */
        ndp.xreturn[11] = 0.0;  /*               speed */
      }
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }
    /**********************************************
     * mean lunar apogee ('dark moon', 'lilith')  *
     * for comment s. moshmoon.c, swi_mean_apog() *
     **********************************************/

    }
    else if (ipl == Swe.SE_MEAN_APOG) {
      if (((iflag & Swe.SEFLG_HELCTR)!=0) ||
          ((iflag & Swe.SEFLG_BARYCTR)!=0)) {

        for (i = 0; i < 24; i++) {
          x[i] = 0;
        }
        return iflag;
      }
      ndp = this.swed.nddat[SwephData.SEI_MEAN_APOG];
      xp = ndp.xreturn;
      xp2 = ndp.x;
      retc = this.sm.swi_mean_apog(tjd, xp2);
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }

      retc = this.sm.swi_mean_apog(tjd - SwephData.MEAN_NODE_SPEED_INTV, xp2, 3);
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }
      for(i = 0; i <= 1; i++) {
        xp2[3+i] = this.sl.swe_difrad2n(xp2[i], xp2[3+i]) / SwephData.MEAN_NODE_SPEED_INTV;
      }
      xp2[5] = 0;
      ndp.teval = tjd;
      ndp.xflgs = -1;
      /* lighttime etc. */
      if ((retc = this.app_pos_etc_mean(SwephData.SEI_MEAN_APOG, iflag)) !=
                                                                  Swe.OK) {
        return this.swecalc_error(x);
      }

      ndp.xreturn[5] = 0.0; /*               speed */
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }
    /***********************************************
     * osculating lunar node ('true node')         *
     ***********************************************/
    }
    else if (ipl == Swe.SE_TRUE_NODE) {
      if (((iflag & Swe.SEFLG_HELCTR)!=0) ||
          ((iflag & Swe.SEFLG_BARYCTR)!=0)) {
        /* heliocentric/barycentric lunar node not allowed */
        for (i = 0; i < 24; i++) {
          x[i] = 0;
        }
        return iflag;
      }
      ndp = this.swed.nddat[SwephData.SEI_TRUE_NODE];
      xp = ndp.xreturn;
      retc = this.lunar_osc_elem(tjd, SwephData.SEI_TRUE_NODE, iflag);
      iflag = ndp.xflgs;

      if ((iflag & Swe.SEFLG_SIDEREAL)==0 &&
          (iflag & Swe.SEFLG_J2000)==0) {
        ndp.xreturn[1] = 0.0; /* ecl. latitude       */
        ndp.xreturn[4] = 0.0; /*               speed */
        ndp.xreturn[8] = 0.0; /* z coordinate        */
        ndp.xreturn[11] = 0.0;  /*               speed */
      }
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }

    /***********************************************
     * osculating lunar node ('true node')         *
     ***********************************************/
    }
    else if (ipl == Swe.SE_TRUE_NODE) {
      if (((iflag & Swe.SEFLG_HELCTR)!=0) ||
          ((iflag & Swe.SEFLG_BARYCTR)!=0)) {
        /* heliocentric/barycentric lunar node not allowed */
        for (i = 0; i < 24; i++) {
          x[i] = 0;
        }
        return iflag;
      }
      ndp = this.swed.nddat[SwephData.SEI_TRUE_NODE];
      xp = ndp.xreturn;
      retc = this.lunar_osc_elem(tjd, SwephData.SEI_TRUE_NODE, iflag);
      iflag = ndp.xflgs;
      /* to avoid infinitesimal deviations from latitude = 0
       * that result from conversions */
      if ((iflag & Swe.SEFLG_SIDEREAL)==0 &&
          (iflag & Swe.SEFLG_J2000)==0) {
        ndp.xreturn[1] = 0.0; /* ecl. latitude       */
        ndp.xreturn[4] = 0.0; /*               speed */
        ndp.xreturn[8] = 0.0; /* z coordinate        */
        ndp.xreturn[11] = 0.0;  /*               speed */
      }
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }
    /***********************************************
     * osculating lunar apogee                     *
     ***********************************************/
    }
    else if (ipl == Swe.SE_OSCU_APOG) {
      if (((iflag & Swe.SEFLG_HELCTR)!=0) ||
          ((iflag & Swe.SEFLG_BARYCTR)!=0)) {
        /* heliocentric/barycentric lunar apogee not allowed */
        for (i = 0; i < 24; i++) {
          x[i] = 0;
        }

        return iflag;
      }
      ndp = this.swed.nddat[SwephData.SEI_OSCU_APOG];
      xp = ndp.xreturn;
      retc = this.lunar_osc_elem(tjd, SwephData.SEI_OSCU_APOG, iflag);
      iflag = ndp.xflgs;
      if (retc == Swe.ERR) {

        return this.swecalc_error(x);
      }
    /***********************************************
     * interpolated lunar apogee                   *    
     ***********************************************/
    }
    else if (ipl == Swe.SE_INTP_APOG) {
      if ((iflag & Swe.SEFLG_HELCTR)!=0 ||
          (iflag & Swe.SEFLG_BARYCTR)!=0) {
        /* heliocentric/barycentric lunar apogee not allowed */
        for (i = 0; i < 24; i++) {
          x[i] = 0;
        }

        return iflag;
      }
      if (tjd < SwephData.MOSHLUEPH_START || tjd > SwephData.MOSHLUEPH_END) {
        for (i = 0; i < 24; i++)
    x[i] = 0;
        return Swe.ERR;
      }
      ndp = this.swed.nddat[SwephData.SEI_INTP_APOG];
      xp = ndp.xreturn;
      retc = this.intp_apsides(tjd, SwephData.SEI_INTP_APOG, iflag); 
      iflag = ndp.xflgs;
      if (retc == Swe.ERR)
        return this.swecalc_error(x);
    /*********************************************** 
     * interpolated lunar perigee                  *    
     ***********************************************/
    }
    else if (ipl == Swe.SE_INTP_PERG) {
      if ((iflag & Swe.SEFLG_HELCTR)!=0 ||
          (iflag & Swe.SEFLG_BARYCTR)!=0) {
        /* heliocentric/barycentric lunar apogee not allowed */
        for (i = 0; i < 24; i++) {
          x[i] = 0;
        }
        return iflag;
      }
      if (tjd < SwephData.MOSHLUEPH_START || tjd > SwephData.MOSHLUEPH_END) {
        for (i = 0; i < 24; i++){
          x[i] = 0;
        }
        return Swe.ERR;
      }
      ndp = this.swed.nddat[SwephData.SEI_INTP_PERG];
      xp = ndp.xreturn;
      retc = this.intp_apsides(tjd, SwephData.SEI_INTP_PERG, iflag); 
      iflag = ndp.xflgs;
      if (retc == Swe.ERR){
        return this.swecalc_error(x);
      }

    /*********************************************** 
     * minor planets                               *
     ***********************************************/
    }
    else if (ipl == Swe.SE_CHIRON
      || ipl == Swe.SE_PHOLUS
      || ipl == Swe.SE_CERES   /* Ceres - Vesta */
      || ipl == Swe.SE_PALLAS
      || ipl == Swe.SE_JUNO
      || ipl == Swe.SE_VESTA
      || ipl > Swe.SE_AST_OFFSET) {

      if (ipl < Swe.SE_NPLANETS) {

        ipli = this.swed.pnoext2int[ipl];
      }
      else if (ipl <= Swe.SE_AST_OFFSET + SwephData.MPC_VESTA) {
        ipli = SwephData.SEI_CERES + ipl - Swe.SE_AST_OFFSET - 1;
        ipl = Swe.SE_CERES + ipl - Swe.SE_AST_OFFSET - 1;
      }
      else {
        ipli = SwephData.SEI_ANYBODY;
      }

      if (ipli == SwephData.SEI_ANYBODY) {
        ipli_ast = ipl;
      }
      else {
        ipli_ast = ipli;
      }

      pdp = this.swed.pldat[ipli];
      xp = pdp.xreturn;
      if (ipli_ast > Swe.SE_AST_OFFSET) {
        ifno = SwephData.SEI_FILE_ANY_AST;
      }
      else {
        ifno = SwephData.SEI_FILE_MAIN_AST;
      }

      if (ipli == SwephData.SEI_CHIRON && (tjd < SwephData.CHIRON_START || tjd > SwephData.CHIRON_END)) {
        console.error("Chiron's ephemeris is restricted to JD " +
                      SwephData.CHIRON_START + " - JD " + SwephData.CHIRON_EN);
        return Swe.ERR;
      }
      if (ipli == SwephData.SEI_PHOLUS && (tjd < SwephData.PHOLUS_START || tjd > SwephData.PHOLUS_END)) {
        console.error("Pholus's ephemeris is restricted to JD " +
                  SwephData.PHOLUS_START + " - JD " + SwephData.PHOLUS_END);
        return Swe.ERR;
      }
      while (true) {

        retc = this.main_planet(tjd, SwephData.SEI_EARTH, epheflag, iflag);

        if (retc == Swe.ERR) {
          return this.swecalc_error(x);
        }

        iflag = this.swed.pldat[SwephData.SEI_EARTH].xflgs;
        retc = this.sweph(tjd, ipli_ast, ifno, iflag, psdp.x, SwephData.DO_SAVE, null);

        if (retc == Swe.ERR || retc == SwephData.NOT_AVAILABLE) {
          return this.swecalc_error(x);
        }
        retc = this.app_pos_etc_plan(ipli_ast, iflag);

        if (retc == Swe.ERR) {
          return this.swecalc_error(x);
        }
        /* app_pos_etc_plan() might have failed, if t(light-time)
         * is beyond ephemeris range. in this case redo with Moshier
         */

        if (retc == SwephData.NOT_AVAILABLE ||
            retc == SwephData.BEYOND_EPH_LIMITS) {

          if (epheflag != Swe.SEFLG_MOSEPH) {
            iflag = (iflag & ~Swe.SEFLG_EPHMASK) | Swe.SEFLG_MOSEPH;
            epheflag = Swe.SEFLG_MOSEPH;
//          goto do_asteroid;
            continue;
          }
          else{
            return this.swecalc_error(x);
          }
        }
        break;
      }

    /***********************************************
     * invalid body number                         *
     ***********************************************/
    }
    else {
      console.error("illegal planet number "+ipl+".");
      return this.swecalc_error(x);
    }

    for (i = 0; i < 24; i++) {
      x[i] = xp[i];
    }
    
    return(iflag);
  }

  moshier_moon(tjd, do_save, xpmret) {
    var retc = this.sm.swi_moshmoon(tjd, do_save, null);/**/
    if (retc == Swe.ERR) {
      return Swe.ERR;
    }
    /* for hel. position, we need earth as well */
    retc = this.smosh.swi_moshplan(tjd, SwephData.SEI_EARTH, do_save, null, null);/**/
    if (retc == Swe.ERR) {
      return Swe.ERR;
    }
    return Swe.OK;
  }

  swecalc_error(x) {
    /***********************************************
     * return error                                *
     ***********************************************/
    for(var i = 0; i < 24; i++) {
      x[i] = 0.;
    }
    return Swe.ERR;
  }

  sweph_sbar(tjd, iflag, psdp, pedp) {
    var retc;
    /* sweplan() provides barycentric sun as a by-product in save area;
     * it is saved in swed.pldat[SEI_SUNBARY].x */
    retc = this.sweplan(tjd, SwephData.SEI_EARTH, SwephData.SEI_FILE_PLANET, iflag,
                   SwephData.DO_SAVE, null, null, null, null);

    if (retc == Swe.ERR || retc == SwephData.NOT_AVAILABLE) {
      return Swe.ERR;
    }
    psdp.teval = tjd;
    /* pedp.teval = tjd; */
    return Swe.OK;
  }

  sweph_moon(tjd, ipli, iflag) {
    var retc;

        retc = this.sweplan(tjd, ipli, SwephData.SEI_FILE_MOON, iflag, SwephData.DO_SAVE,
                        null, null, null, null);
    if (retc == Swe.ERR) {
      return Swe.ERR;
    }
    /* if sweph file not found, switch to moshier */
    if (retc == SwephData.NOT_AVAILABLE) {
      return Swe.ERR;
    }
    return Swe.OK;
  }

  /* calculates obliquity of ecliptic and stores it together
   * with its date, sine, and cosine
   */
  calc_epsilon(tjd, iflag, e) {
    e.teps = tjd;
    e.eps = this.sl.swi_epsiln(tjd, iflag);
    e.seps = Math.sin(e.eps);
    e.ceps = Math.cos(e.eps);
  }

  /* computes a main planet from any ephemeris, if it
   * has not yet been computed for this date.
   * since a geocentric position requires the earth, the
   * earth's position will be computed as well. With SWISSEPH
   * files the barycentric sun will be done as well.
   * With Moshier, the moon will be done as well.
   *
   * tjd          = julian day
   * ipli         = body number
   * epheflag     = which ephemeris? SWISSEPH, Moshier?
   * iflag        = other flags
   *
   * the geocentric apparent position of ipli (or whatever has
   * been specified in iflag) will be saved in
   * &swed.pldat[ipli].xreturn[];
   *
   * the barycentric (heliocentric with Moshier) position J2000
   * will be kept in
   * &swed.pldat[ipli].x[];
   */
  main_planet(tjd, ipli, epheflag, iflag){
    var retc;
    var calc_swieph=false;
    var calc_moshier=false;

    if (epheflag == Swe.SEFLG_MOSEPH || this.calc_moshier) {
      retc = this.smosh.swi_moshplan(tjd, ipli, SwephData.DO_SAVE, null, null);

      if (retc == Swe.ERR) {
        return Swe.ERR;
      }
      if (ipli == SwephData.SEI_SUN) {
        retc = this.app_pos_etc_sun(iflag);
      } else {
        retc = this.app_pos_etc_plan(ipli, iflag);
      }
      if (retc == Swe.ERR) {
        return Swe.ERR;
      }
    }
    return Swe.OK;
  }

  /* Computes a main planet from any ephemeris or returns
   * it again, if it has been computed before.
   * In barycentric equatorial position of the J2000 equinox.
   * The earth's position is computed as well. With SWISSEPH
   * ephemeris the barycentric sun is computed, too.
   * With Moshier, the moon is returned, as well.
   *
   * tjd          = julian day
   * ipli         = body number
   * epheflag     = which ephemeris? SWISSEPH, Moshier?
   * iflag        = other flags
   * xp, xe, xs, and xm are the pointers, where the program
   * either finds or stores (if not found) the barycentric
   * (heliocentric with Moshier) positions of the following
   * bodies:
   * xp           planet
   * xe           earth
   * xs           sun
   * xm           moon
   *
   * xm is used with Moshier only
   */
  main_planet_bary(tjd, ipli, epheflag, iflag, do_save, xp, xe, xs, xm) {
    var i;
    var retc;
    var calc_moshier=false;
    var calc_swieph=false;

    if (epheflag == Swe.SEFLG_MOSEPH || calc_moshier) {
        retc = this.smosh.swi_moshplan(tjd, ipli, do_save, xp, xe);
        if (retc == Swe.ERR) {
          return Swe.ERR;
        }
        for (let i = 0; i <= 5; i++) {
          xs[i] = 0;
        }
    }
    return Swe.OK;
  }

  /* SWISSEPH
   * this routine computes heliocentric cartesian equatorial coordinates
   * of equinox 2000 of
   * geocentric moon
   *
   * tjd          julian date
   * iflag        flag
   * do_save      save J2000 position in save area pdp->x ?
   * xp           array of 6 doubles for lunar position and speed
   * serr         error string
   */
  swemoon(tjd, iflag, do_save, xpret) {
    let i, retc;
    let pdp = this.swed.pldat[SwephData.SEI_MOON];
    let speedf1, speedf2;
    let xx=new Array(6), xp;
    if (do_save) {
      xp = pdp.x;
    } else {
      xp = xx;
    }
    /* if planet has already been computed for this date, return
     * if speed flag has been turned on, recompute planet */
    speedf1 = pdp.xflgs & Swe.SEFLG_SPEED;
    speedf2 = iflag & Swe.SEFLG_SPEED;
    if (tjd == pdp.teval
        && pdp.iephe == Swe.SEFLG_SWIEPH
        && ((speedf2==0) || (speedf1!=0))) {
      xp = pdp.x;
    } else {
      /* call sweph for moon */
      retc = this.sweph(tjd, SwephData.SEI_MOON, SwephData.SEI_FILE_MOON, iflag,
                   null, do_save, xp);
      if (retc != Swe.OK) {
        return(retc);
      }
      if (do_save) {
        pdp.teval = tjd;
        pdp.xflgs = -1;
        pdp.iephe = Swe.SEFLG_SWIEPH;
      }
    }
    if (xpret != null) {
      for (let i = 0; i <= 5; i++) {
        xpret[i] = xp[i];
      }
    }
    return Swe.OK;
  }

  /* SWISSEPH
   * this function computes
   * 1. a barycentric planet
   * plus, under certain conditions,
   * 2. the barycentric sun,
   * 3. the barycentric earth, and
   * 4. the geocentric moon,
   * in barycentric cartesian equatorial coordinates J2000.
   *
   * these are the data needed for calculation of light-time etc.
   *
   * tjd          julian date
   * ipli         SEI_ planet number
   * ifno         ephemeris file number
   * do_save      write new positions in save area
   * xp           array of 6 doubles for planet's position and velocity
   * xpe                                 earth's
   * xps                                 sun's
   * xpm                                 moon's
   * serr         error string
   *
   * xp - xpm can be NULL. if do_save is TRUE, all of them can be NULL.
   * the positions will be written into the save area (swed.pldat[ipli].x)
   */
  sweplan(tjd, ipli, ifno, iflag, do_save,
              xpret, xperet, xpsret,
              xpmret) {
    var i, retc;
    var do_earth = false, do_moon = false, do_sunbary = false;
    var pdp = this.swed.pldat[ipli];
    var pebdp = this.swed.pldat[SwephData.SEI_EMB];
    var psbdp = this.swed.pldat[SwephData.SEI_SUNBARY];
    var pmdp = this.swed.pldat[SwephData.SEI_MOON];
    var xxp=new Array(6), xxm=new Array(6),
           xxs=new Array(6), xxe=new Array(6);
    var xp, xpe, xpm, xps;
    var speedf1, speedf2;
    /* xps (barycentric sun) may be necessary because some planets on sweph
     * file are heliocentric, other ones are barycentric. without xps,
     * the heliocentric ones cannot be returned barycentrically.
     */
    if (do_save || ipli == SwephData.SEI_SUNBARY
        || (pdp.iflg & SwephData.SEI_FLG_HELIO)!=0
        || xpsret != null || (iflag & Swe.SEFLG_HELCTR)!=0) {
      do_sunbary = true;
    }
    if (do_save || ipli == SwephData.SEI_EARTH || xperet != null) {
      do_earth = true;
    }
    if (ipli == SwephData.SEI_MOON) {
        do_earth = true;
        do_sunbary = true;
    }
    if (do_save || ipli == SwephData.SEI_MOON || ipli == SwephData.SEI_EARTH ||
        xperet != null || xpmret != null) {
      do_moon = true;
    }
    if (do_save) {
      xp = pdp.x;
      xpe = pebdp.x;
      xps = psbdp.x;
      xpm = pmdp.x;
    }
    else {
      xp = xxp;
      xpe = xxe;
      xps = xxs;
      xpm = xxm;
    }
    speedf2 = iflag & Swe.SEFLG_SPEED;
    /* barycentric sun */
    if (do_sunbary) {
      speedf1 = psbdp.xflgs & Swe.SEFLG_SPEED;
        retc = this.sweph(tjd, SwephData.SEI_SUNBARY, SwephData.SEI_FILE_PLANET, iflag,
                     null, do_save, xps);/**/
        if (retc != Swe.OK) {
          return(retc);
        }
      if (xpsret != null) {
        for (let i = 0; i <= 5; i++) {
          xpsret[i] = xps[i];
        }
      }
    }
    /* moon */
    if (do_moon) {
      speedf1 = pmdp.xflgs & Swe.SEFLG_SPEED;
        retc = this.sweph(tjd, SwephData.SEI_MOON, SwephData.SEI_FILE_MOON, iflag, null,
                     do_save, xpm);
        if (retc == Swe.ERR) {
          return(retc);
        }
          return Swe.ERR;

      if (xpmret != null) {
        for (let i = 0; i <= 5; i++) {
          xpmret[i] = xpm[i];
        }
      }
    }
    /* barycentric earth */
    if (do_earth) {
      speedf1 = pebdp.xflgs & Swe.SEFLG_SPEED;
        retc = this.sweph(tjd, SwephData.SEI_EMB, SwephData.SEI_FILE_PLANET, iflag, null,
                     do_save, xpe);
        if (retc != Swe.OK) {
          return(retc);
        }
        /* earth from emb and moon */
        this.embofs(xpe, 0, xpm, 0);
        /* speed is needed, if
         * 1. true position is being computed before applying light-time etc.
         *    this is the position saved in pdp->x.
         *    in this case, speed is needed for light-time correction.
         * 2. the speed flag has been specified.
         */
        if (xpe == pebdp.x || ((iflag & Swe.SEFLG_SPEED)!=0)) {
          this.embofs(xpe, 3, xpm, 3);
        }

      if (xperet != null) {
        for (let i = 0; i <= 5; i++) {
          xperet[i] = xpe[i];
        }
      }
    }
    if (ipli == SwephData.SEI_MOON) {
      for (let i = 0; i <= 5; i++) {
        xp[i] = xpm[i];
      }
    } else if (ipli == SwephData.SEI_EARTH) {
      for (let i = 0; i <= 5; i++) {
        xp[i] = xpe[i];
      }
    } else if (ipli == SwephData.SEI_SUN) {
      for (let i = 0; i <= 5; i++) {
        xp[i] = xps[i];
      }
    } else {
      /* planet */
      speedf1 = pdp.xflgs & Swe.SEFLG_SPEED;
        retc = this.sweph(tjd, ipli, ifno, iflag, null, do_save, xp);
        if (retc != Swe.OK) {
          return(retc);
        }
        /* if planet is heliocentric, it must be transformed to barycentric */
        if ((pdp.iflg & SwephData.SEI_FLG_HELIO)!=0) {
          /* now barycentric planet */
          for (i = 0; i <= 2; i++) {
            xp[i] += xps[i];
          }
          if (do_save || ((iflag & Swe.SEFLG_SPEED)!=0)) {
            for (i = 3; i <= 5; i++) {
              xp[i] += xps[i];
            }
          }
        }
    }
    if (xpret != null) {
      for (let i = 0; i <= 5; i++) {
        xpret[i] = xp[i];
      }
    }
    return Swe.OK;
  }

  /*
   * this function looks for an ephemeris file,
   * opens it, if not yet open,
   * reads constants, if not yet read,
   * computes a planet, if not yet computed
   * attention: asteroids are heliocentric
   *            other planets barycentric
   *
   * tjd          julian date
   * ipli         SEI_ planet number
   * ifno         ephemeris file number
   * xsunb        INPUT (!) array of 6 doubles containing barycentric sun
   *              (must be given with asteroids)
   * do_save      boolean: save result in save area
   * xp           return array of 6 doubles for planet's position
   * serr         error string
   */
  sweph(tjd, ipli, ifno, iflag, xsunb, do_save, xpret) {
    return Swe.ERR;
  }

  /* converts planets from barycentric to geocentric,
   * apparent positions
   * precession and nutation
   * according to flags
   * ipli         planet number
   * iflag        flags
   * serr         error string
   */
  app_pos_etc_plan(ipli, iflag) {
    var i, j, niter;
    var retc = Swe.OK;
    var ifno, ibody;
    var flg1, flg2;
    var xx = [0,0,0,0,0,0];
    var dx = [0,0,0];
    var dt, t, dtsave_for_defl;
    var xobs = [0,0,0,0,0,0];
    var xobs2 = [0,0,0,0,0,0];
    var xearth = [0,0,0,0,0,0];
    var xsun = [0,0,0,0,0,0];
    var xxsp = [0,0,0,0,0,0];
    var xxsv = [0,0,0,0,0,0];
    var pedp = this.swed.pldat[SwephData.SEI_EARTH];
    var pdp;
    var oe = this.swed.oec2000;
    var epheflag = iflag & Swe.SEFLG_EPHMASK;

    t = dtsave_for_defl = 0;      /* dummy assignment to silence gcc */
    /* ephemeris file */
    if (ipli > Swe.SE_AST_OFFSET) {
      ifno = SwephData.SEI_FILE_ANY_AST;
      ibody = SwephData.IS_ANY_BODY;
      pdp = this.swed.pldat[SwephData.SEI_ANYBODY];
    }
    else if (ipli == SwephData.SEI_CHIRON
        || ipli == SwephData.SEI_PHOLUS
        || ipli == SwephData.SEI_CERES
        || ipli == SwephData.SEI_PALLAS
        || ipli == SwephData.SEI_JUNO
        || ipli == SwephData.SEI_VESTA) {
      ifno = SwephData.SEI_FILE_MAIN_AST;
      ibody = SwephData.IS_MAIN_ASTEROID;
      pdp = this.swed.pldat[ipli];
    }
    else {
      ifno = SwephData.SEI_FILE_PLANET;
      ibody = SwephData.IS_PLANET;
      pdp = this.swed.pldat[ipli];
    }

    /* if the same conversions have already been done for the same
     * date, then return */
    flg1 = iflag & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    flg2 = pdp.xflgs & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    if (flg1 == flg2) {
      pdp.xflgs = iflag;
      pdp.iephe = iflag & Swe.SEFLG_EPHMASK;
      return Swe.OK;
    }
    /* the conversions will be done with xx. */
    for (let i = 0; i <= 5; i++) {
      xx[i] = pdp.x[i];
    }
    /* if heliocentric position is wanted */
    if ((iflag & Swe.SEFLG_HELCTR)!=0) {
        for (let i = 0; i <= 5; i++) {
          xx[i] -= this.swed.pldat[SwephData.SEI_SUNBARY].x[i];
        }
    }

    /************************************
     * observer: geocenter or topocenter
     ************************************/
    /* if topocentric position is wanted  */
    if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
      if (this.swed.topd.teval != pedp.teval
        || pedp.teval == 0) {
        if (this.swi_get_observer(pedp.teval, iflag | Swe.SEFLG_NONUT, SwephData.DO_SAVE, xobs) != Swe.OK) {
          return Swe.ERR;
        }
      } else {
        for (let i = 0; i <= 5; i++) {
          xobs[i] = this.swed.topd.xobs[i];
        }
      }
      /* barycentric position of observer */
      for (let i = 0; i <= 5; i++) {
        xobs[i] = xobs[i] + pedp.x[i];
      }
    } else {
      /* barycentric position of geocenter */
      for (let i = 0; i <= 5; i++) {
        xobs[i] = pedp.x[i];
      }
    }
    /*******************************
     * light-time geocentric       *
     *******************************/

    if ((iflag & Swe.SEFLG_TRUEPOS)==0) {
      /* number of iterations - 1 */
      niter = 0;
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        for (i = 0; i <= 2; i++) {
          xxsv[i] = xxsp[i] = xx[i] - xx[i+3];
        }
        for (j = 0; j <= niter; j++) {
          for (i = 0; i <= 2; i++) {
            dx[i] = xxsp[i];
            if (((iflag & Swe.SEFLG_HELCTR)==0) &&
                 (iflag & Swe.SEFLG_BARYCTR)==0) {
              dx[i] -= (xobs[i] - xobs[i+3]);
            }
          }
          /* new dt */
          dt = Math.sqrt(this.sl.square_sum(dx)) * Swe.AUNIT / SwephData.CLIGHT / 86400.0;
          for (i = 0; i <= 2; i++) {      /* rough apparent position at t-1 */
            xxsp[i] = xxsv[i] - dt * pdp.x[i+3];
          }
        }
        /* true position - apparent position at time t-1 */
        for (i = 0; i <= 2; i++) {
          xxsp[i] = xxsv[i] - xxsp[i];
        }
      }
      /* dt and t(apparent) */
      for (j = 0; j <= niter; j++) {
        for (i = 0; i <= 2; i++) {
          dx[i] = xx[i];
          if ((iflag & Swe.SEFLG_HELCTR)==0 &&
              (iflag & Swe.SEFLG_BARYCTR)==0) {
            dx[i] -= xobs[i];
          }
        }
        dt = Math.sqrt(this.sl.square_sum(dx)) *Swe.AUNIT / SwephData.CLIGHT / 86400.0;
        /* new t */
        t = pdp.teval - dt;
        dtsave_for_defl = dt;
        for (i = 0; i <= 2; i++) {        /* rough apparent position at t*/
          xx[i] = pdp.x[i] - dt * pdp.x[i+3];
        }
      }
      /* part of daily motion resulting from change of dt */
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        for (i = 0; i <= 2; i++) {
          xxsp[i] = pdp.x[i] - xx[i] - xxsp[i];
        }
      }

      /* new position, accounting for light-time (accurate) */
      switch(epheflag) {
        case Swe.SEFLG_MOSEPH:
        default:
          if ((iflag & Swe.SEFLG_SPEED)!=0
            && (iflag & (Swe.SEFLG_HELCTR | Swe.SEFLG_BARYCTR))==0) {
            if (ibody == SwephData.IS_PLANET) {
              retc = this.smosh.swi_moshplan(t, ipli, SwephData.NO_SAVE, xxsv,xearth);
            }
            else {                /* if asteroid */
              retc = this.sweph(t, ipli, ifno, iflag, null, SwephData.NO_SAVE, xxsv);

              if (retc == Swe.OK) {
                retc = this.smosh.swi_moshplan(t, SwephData.SEI_EARTH,
                                          SwephData.NO_SAVE, xearth, xearth);
              }
            }

            if (retc != Swe.OK) {
              return(retc);
            }
            for (i = 3; i <= 5; i++) {
              xx[i] = xxsv[i];
            }
          }
          break;
      }

      if ((iflag & Swe.SEFLG_HELCTR)!=0) {
        if (pdp.iephe == Swe.SEFLG_SWIEPH) {
          for (i = 0; i <= 5; i++) {
            xx[i] -= this.swed.pldat[SwephData.SEI_SUNBARY].x[i];
          }
        }
      }

      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        /* observer position for t(light-time) */
        if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
          if (this.swi_get_observer(t, iflag | Swe.SEFLG_NONUT, SwephData.NO_SAVE, xobs2) != Swe.OK) {
            return Swe.ERR;
          }
          for (i = 0; i <= 5; i++) {
            xobs2[i] += xearth[i];
          }
        } else {
          for (i = 0; i <= 5; i++) {
            xobs2[i] = xearth[i];
          }
        }
      }
    }

    /*******************************
     * conversion to geocenter     *
     *******************************/
    if ((iflag & Swe.SEFLG_HELCTR)==0 &&
        (iflag & Swe.SEFLG_BARYCTR)==0) {
      /* subtract earth */
      for (i = 0; i <= 5; i++) {
        xx[i] -= xobs[i];
      }

      if ((iflag & Swe.SEFLG_TRUEPOS) == 0 ) {
        /*
         * Apparent speed is also influenced by
         * the change of dt during motion.
         * Neglect of this would result in an error of several 0.01"
         */
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          for (i = 3; i <= 5; i++) {
            xx[i] -= xxsp[i-3];
          }
        }
      }
    }
    if ((iflag & Swe.SEFLG_SPEED)==0) {
      for (i = 3; i <= 5; i++) {
        xx[i] = 0;
      }
    }
    /************************************
     * relativistic deflection of light *
     ************************************/


    if ((iflag & Swe.SEFLG_TRUEPOS)==0 &&
        (iflag & Swe.SEFLG_NOGDEFL)==0) {
                  /* SEFLG_NOGDEFL is on, if SEFLG_HELCTR or SEFLG_BARYCTR */
      this.swi_deflect_light(xx, 0, dtsave_for_defl, iflag);
    }
    /**********************************
     * 'annual' aberration of light   *
     **********************************/
    if ((iflag & Swe.SEFLG_TRUEPOS)==0 &&
        (iflag & Swe.SEFLG_NOABERR)==0) {
                  /* SEFLG_NOABERR is on, if SEFLG_HELCTR or SEFLG_BARYCTR */
      this.swi_aberr_light(xx, xobs, iflag);
      /*
       * Apparent speed is also influenced by
       * the difference of speed of the earth between t and t-dt.
       * Neglecting this would involve an error of several 0.1"
       */
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        for (i = 3; i <= 5; i++) {
          xx[i] += xobs[i] - xobs2[i];
        }
      }
    }
    if ((iflag & Swe.SEFLG_SPEED) == 0) {
      for (i = 3; i <= 5; i++) {
        xx[i] = 0;
      }
    }

    /* ICRS to J2000 */
    if ((iflag & Swe.SEFLG_ICRS) == 0 && this.swed.jpldenum >= 403) {
      this.sl.swi_bias(xx, t, iflag, false);
    }/**/
    /* save J2000 coordinates; required for sidereal positions */
    for (i = 0; i <= 5; i++) {
      xxsv[i] = xx[i];
    }

    /************************************************
     * precession, equator 2000 -> equator of date *
     ************************************************/
    if ((iflag & Swe.SEFLG_J2000)==0) {
      this.sl.swi_precess(xx, pdp.teval, iflag, SwephData.J2000_TO_J);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.swi_precess_speed(xx, pdp.teval, iflag, SwephData.J2000_TO_J);
      }
      oe = this.swed.oec;
    } else {
      oe = this.swed.oec2000;
    }

    var ret = this.app_pos_rest(pdp, iflag, xx, xxsv, oe);
        return ret;
  }

  app_pos_rest(pdp, iflag, xx, x2000, oe) {
    var i;
    /************************************************
     * nutation                                     *
     ************************************************/
    if ((iflag & Swe.SEFLG_NONUT)==0) {
      this.swi_nutate(xx, 0, iflag, false);
    }
    /* now we have equatorial cartesian coordinates; save them */
    for (i = 0; i <= 5; i++) {
      pdp.xreturn[18+i] = xx[i];
    }

    /************************************************
     * transformation to ecliptic.                  *
     * with sidereal calc. this will be overwritten *
     * afterwards.                                  *
     ************************************************/
    this.sl.swi_coortrf2(xx, xx, oe.seps, oe.ceps);
    if ((iflag & Swe.SEFLG_SPEED) !=0) {
      this.sl.swi_coortrf2(xx, 3, xx, 3, oe.seps, oe.ceps);
    }
    if ((iflag & Swe.SEFLG_NONUT)==0) {
      this.sl.swi_coortrf2(xx, xx, this.swed.nut.snut, this.swed.nut.cnut);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.sl.swi_coortrf2(xx, 3, xx, 3, this.swed.nut.snut, this.swed.nut.cnut);
      }
    }
    /* now we have ecliptic cartesian coordinates */
    for (i = 0; i <= 5; i++) {
      pdp.xreturn[6+i] = xx[i];
    }
    /************************************
     * sidereal positions               *
     ************************************/
    if ((iflag & Swe.SEFLG_SIDEREAL)!=0) {
      if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_ECL_T0)!=0) {
        if (this.swi_trop_ra2sid_lon(x2000, pdp.xreturn, 6, pdp.xreturn, 18, iflag,
                                serr) != Swe.OK) {
          return Swe.ERR;
        }
      /* project onto solar system equator */
      } else if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_SSY_PLANE)!=0) {
        if (this.swi_trop_ra2sid_lon_sosy(x2000, pdp.xreturn, 6, pdp.xreturn, 18,
                                     iflag, serr) != Swe.OK) {
          return Swe.ERR;
        }
      }
      else {
        this.sl.swi_cartpol_sp(pdp.xreturn, 6, pdp.xreturn, 0);
        pdp.xreturn[0] -= this.swe_get_ayanamsa(pdp.teval) * this.swed.DEGTORAD;
        this.sl.swi_polcart_sp(pdp.xreturn, 0, pdp.xreturn, 6);
      }
    }

    /************************************************
     * transformation to polar coordinates          *
     ************************************************/
    this.sl.swi_cartpol_sp(pdp.xreturn, 18, pdp.xreturn, 12);
    this.sl.swi_cartpol_sp(pdp.xreturn, 6, pdp.xreturn, 0);
    /**********************
     * radians to degrees *
     **********************/
    /*if ((iflag & SEFLG_RADIANS) == 0) {*/
    for (i = 0; i < 2; i++) {
      pdp.xreturn[i] *= this.swed.RADTODEG;                /* ecliptic */
      pdp.xreturn[i+3] *= this.swed.RADTODEG;
      pdp.xreturn[i+12] *= this.swed.RADTODEG;     /* equator */
      pdp.xreturn[i+15] *= this.swed.RADTODEG;
    }


    pdp.xflgs = iflag;
    pdp.iephe = iflag & Swe.SEFLG_EPHMASK;

    
    return Swe.OK;
  }


  /*
   * input coordinates are J2000, cartesian.
   * xout         ecliptical sidereal position
   * xoutr        equatorial sidereal position
   */
  swi_trop_ra2sid_lon(xin, xout, xoOffs, xoutr, xrOffs, iflag) {
    if(xrOffs === undefined){
      return this.swi_trop_ra2sid_lon(xin, xout, 0, xoutr, 0, iflag);
    }

    let x=new Array(6);
    let i;
    let sip = this.swed.sidd;
    let oectmp=new Epsilon();
    for (i = 0; i <= 5; i++) {
      x[i] = xin[i];
    }
    if (sip.t0 != SwephData.J2000) {
      /* iflag must not contain SEFLG_JPLHOR here */
      this.sl.swi_precess(x, sip.t0, 0, SwephData.J2000_TO_J);
      this.sl.swi_precess(x, 3, sip.t0, 0, SwephData.J2000_TO_J);      /* speed */
    }
    for (i = 0; i <= 5; i++) {
      xoutr[i+xrOffs] = x[i];
    }
    this.calc_epsilon(this.swed.sidd.t0, iflag, oectmp);
    this.sl.swi_coortrf2(x, x, oectmp.seps, oectmp.ceps);
    if ((iflag & Swe.SEFLG_SPEED)!=0) {
      this.sl.swi_coortrf2(x, 3, x, 3, oectmp.seps, oectmp.ceps);
    }
    /* to polar coordinates */
    this.sl.swi_cartpol_sp(x, x);
    /* subtract ayan_t0 */
    x[0] -= sip.ayan_t0 * this.swed.DEGTORAD;
    /* back to cartesian */
    this.sl.swi_polcart_sp(x, 0, xout, xoOffs);
    return Swe.OK;
  }

  /*
   * input coordinates are J2000, cartesian.
   * xout         ecliptical sidereal position
   * xoutr        equatorial sidereal position
   */
  swi_trop_ra2sid_lon_sosy(xin, xout, xoOffs, xoutr, xrOffs, iflag) {
    if(xrOffs === undefined){
      return this.swi_trop_ra2sid_lon_sosy(xin, xout, 0, xoutr, 0, iflag);
    }

    let x=new Array(6), x0=new Array(6);
    let i;
    let sip = swed.sidd;
    let oe = swed.oec2000;
    let plane_node = SwephData.SSY_PLANE_NODE_E2000;
    let plane_incl = SwephData.SSY_PLANE_INCL;
    for (i = 0; i <= 5; i++) {
      x[i] = xin[i];
    }
    /* planet to ecliptic 2000 */
    this.sl.swi_coortrf2(x, x, oe.seps, oe.ceps);
    if ((iflag & Swe.SEFLG_SPEED)!=0) {
      this.sl.swi_coortrf2(x, 3, x, 3, oe.seps, oe.ceps);
    }
    /* to polar coordinates */
    this.sl.swi_cartpol_sp(x, x);
    /* to solar system equator */
    x[0] -= plane_node;
    this.sl.swi_polcart_sp(x, x);
    this.sl.swi_coortrf(x, x, plane_incl);
    this.sl.swi_coortrf(x, 3, x, 3, plane_incl);
    this.sl.swi_cartpol_sp(x, x);
    /* zero point of t0 in J2000 system */
    x0[0] = 1;
    x0[1] = x0[2] = 0;
    if (sip.t0 != SwephData.J2000) {
      /* iflag must not contain SEFLG_JPLHOR here */
      this.sl.swi_precess(x0, sip.t0, 0, SwephData.J_TO_J2000);
    }
    /* zero point to ecliptic 2000 */
    this.sl.swi_coortrf2(x0, x0, oe.seps, oe.ceps);
    /* to polar coordinates */
    this.sl.swi_cartpol(x0, x0);
    /* to solar system equator */
    x0[0] -= plane_node;
    this.sl.swi_polcart(x0, x0);
    this.sl.swi_coortrf(x0, x0, plane_incl);
    this.sl.swi_cartpol(x0, x0);
    /* measure planet from zero point */
    x[0] -= x0[0];
    x[0] *= this.swed.RADTODEG;
    /* subtract ayan_t0 */
    x[0] -= sip.ayan_t0;
    x[0] = this.sl.swe_degnorm(x[0]) * this.swed.DEGTORAD;
    /* back to cartesian */
    this.sl.swi_polcart_sp(x, 0, xout, xoOffs);
    return Swe.OK;
  }

  /* converts planets from barycentric to geocentric,
   * apparent positions
   * precession and nutation
   * according to flags
   * ipli         planet number
   * iflag        flags
   */
  app_pos_etc_plan_osc(ipl, ipli, iflag) {
    let i, j, niter, retc;
    let xx=new Array(6), dx=new Array(3), dt, dtsave_for_defl;
    let xearth=new Array(6), xsun=new Array(6), xmoon=new Array(6);
    let xxsv=new Array(6), xxsp=new Array(3),
           xobs=new Array(6), xobs2=new Array(6);
    let t;
    let pdp = this.swed.pldat[ipli];
    let pedp = this.swed.pldat[SwephData.SEI_EARTH];
    let psdp = this.swed.pldat[SwephData.SEI_SUNBARY];
    let oe = this.swed.oec2000;
    let epheflag = Swe.SEFLG_DEFAULTEPH;
    dt = dtsave_for_defl = 0;     /* dummy assign to silence gcc */
    if ((iflag & Swe.SEFLG_MOSEPH)!=0) {
      epheflag = Swe.SEFLG_MOSEPH;
    }
    /* the conversions will be done with xx[]. */
    for (i = 0; i <= 5; i++) {
      xx[i] = pdp.x[i];
    }
    /************************************
     * barycentric position is required *
     ************************************/
    /* = heliocentric position with Moshier ephemeris */
    /************************************
     * observer: geocenter or topocenter
     ************************************/
    /* if topocentric position is wanted  */
    if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
      if (this.swed.topd.teval != pedp.teval
        || this.swed.topd.teval != 0) {
        if (this.swi_get_observer(pedp.teval, iflag | Swe.SEFLG_NONUT, SwephData.DO_SAVE, xobs)
                                                              != Swe.OK) {
          return Swe.ERR;
        }
      } else {
        for (i = 0; i <= 5; i++) {
          xobs[i] = this.swed.topd.xobs[i];
        }
      }
      /* barycentric position of observer */
      for (i = 0; i <= 5; i++) {
        xobs[i] = xobs[i] + pedp.x[i];
      }
    } else if ((iflag & Swe.SEFLG_BARYCTR)!=0) {
      for (i = 0; i <= 5; i++) {
        xobs[i] = 0;
      }
    } else if ((iflag & Swe.SEFLG_HELCTR)!=0) {
      if ((iflag & Swe.SEFLG_MOSEPH)!=0) {
        for (i = 0; i <= 5; i++) {
          xobs[i] = 0;
        }
      } else {
        for (i = 0; i <= 5; i++) {
          xobs[i] = psdp.x[i];
        }
      }
    } else {
      for (i = 0; i <= 5; i++) {
        xobs[i] = pedp.x[i];
      }
    }
    /*******************************
     * light-time                  *
     *******************************/
    if ((iflag & Swe.SEFLG_TRUEPOS)==0) {
      niter = 1;
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        /*
         * Apparent speed is influenced by the fact that dt changes with
         * motion. This makes a difference of several hundredths of an
         * arc second. To take this into account, we compute
         * 1. true position - apparent position at time t - 1.
         * 2. true position - apparent position at time t.
         * 3. the difference between the two is the daily motion resulting from
         * the change of dt.
         */
        for (i = 0; i <= 2; i++) {
          xxsv[i] = xxsp[i] = xx[i] - xx[i+3];
        }
        for (j = 0; j <= niter; j++) {
          for (i = 0; i <= 2; i++) {
            dx[i] = xxsp[i];
            if ((iflag & Swe.SEFLG_HELCTR)==0 &&
                (iflag & Swe.SEFLG_BARYCTR)==0) {
              dx[i] -= (xobs[i] - xobs[i+3]);
            }
          }
          /* new dt */
          dt = Math.sqrt(this.sl.square_sum(dx)) * Swe.AUNIT / SwephData.CLIGHT /
                                                                      86400.0;
          for (i = 0; i <= 2; i++) {
            xxsp[i] = xxsv[i] - dt * pdp.x[i+3];/* rough apparent position */
          }
        }
        /* true position - apparent position at time t-1 */
        for (i = 0; i <= 2; i++) {
          xxsp[i] = xxsv[i] - xxsp[i];
        }
      }
      /* dt and t(apparent) */
      for (j = 0; j <= niter; j++) {
        for (i = 0; i <= 2; i++) {
          dx[i] = xx[i];
          if ((iflag & Swe.SEFLG_HELCTR)==0 &&
              (iflag & Swe.SEFLG_BARYCTR)==0) {
            dx[i] -= xobs[i];
          }
        }
        /* new dt */
        dt = Math.sqrt(this.sl.square_sum(dx)) *Swe.AUNIT / SwephData.CLIGHT / 86400.0;
        dtsave_for_defl = dt;
        /* new position: subtract t * speed
         */
        for (i = 0; i <= 2; i++) {
          xx[i] = pdp.x[i] - dt * pdp.x[i+3];/**/
          xx[i+3] = pdp.x[i+3];
        }
      }
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        /* part of daily motion resulting from change of dt */
        for (i = 0; i <= 2; i++) {
          xxsp[i] = pdp.x[i] - xx[i] - xxsp[i];
        }
        t = pdp.teval - dt;
        /* for accuracy in speed, we will need earth as well */
        retc = this.main_planet_bary(t, SwephData.SEI_EARTH, epheflag, iflag,
                                SwephData.NO_SAVE, xearth, xearth, xsun,
                                xmoon);
        if (this.smosh.swi_osc_el_plan(t, xx, ipl-Swe.SE_FICT_OFFSET, ipli,
                                  xearth, xsun) != Swe.OK) {
          return(Swe.ERR);
        }
        if (retc != Swe.OK) {
          return(retc);
        }
        if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
          if (this.swi_get_observer(t, iflag | Swe.SEFLG_NONUT, SwephData.NO_SAVE, xobs2, serr) !=
                                                                  Swe.OK) {
            return Swe.ERR;
          }
          for (i = 0; i <= 5; i++) {
            xobs2[i] += xearth[i];
          }
        } else {
          for (i = 0; i <= 5; i++) {
            xobs2[i] = xearth[i];
          }
        }
      }
    }
    /*******************************
     * conversion to geocenter     *
     *******************************/
    for (i = 0; i <= 5; i++) {
      xx[i] -= xobs[i];
    }
    if ((iflag & Swe.SEFLG_TRUEPOS)==0) {
      /*
       * Apparent speed is also influenced by
       * the change of dt during motion.
       * Neglect of this would result in an error of several 0.01"
       */
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        for (i = 3; i <= 5; i++) {
          xx[i] -= xxsp[i-3];
        }
      }
    }
    if ((iflag & Swe.SEFLG_SPEED)==0) {
      for (i = 3; i <= 5; i++) {
        xx[i] = 0;
      }
    }
    /************************************
     * relativistic deflection of light *
     ************************************/
    if ((iflag & Swe.SEFLG_TRUEPOS)==0 &&
        (iflag & Swe.SEFLG_NOGDEFL)==0) {
                  /* SEFLG_NOGDEFL is on, if SEFLG_HELCTR or SEFLG_BARYCTR */
      this.swi_deflect_light(xx, 0, dtsave_for_defl, iflag);
    }
    /**********************************
     * 'annual' aberration of light   *
     **********************************/
    if ((iflag & Swe.SEFLG_TRUEPOS)==0 &&
        (iflag & Swe.SEFLG_NOABERR)==0) {
                  /* SEFLG_NOABERR is on, if SEFLG_HELCTR or SEFLG_BARYCTR */
      this.swi_aberr_light(xx, xobs, iflag);
      /*
       * Apparent speed is also influenced by
       * the difference of speed of the earth between t and t-dt.
       * Neglecting this would involve an error of several 0.1"
       */
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        for (i = 3; i <= 5; i++) {
          xx[i] += xobs[i] - xobs2[i];
        }
      }
    }
    /* save J2000 coordinates; required for sidereal positions */
    for (i = 0; i <= 5; i++) {
      xxsv[i] = xx[i];
    }
    /************************************************
     * precession, equator 2000 -> equator of date *
     ************************************************/
    if ((iflag & Swe.SEFLG_J2000)==0) {
      this.sl.swi_precess(xx, pdp.teval, iflag, SwephData.J2000_TO_J);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.swi_precess_speed(xx, pdp.teval, iflag, SwephData.J2000_TO_J);
      }
      oe = this.swed.oec;
    } else
      oe = this.swed.oec2000;
    return this.app_pos_rest(pdp, iflag, xx, xxsv, oe, serr);
  }

  /* influence of precession on speed
   * xx           position and speed of planet in equatorial cartesian
   *              coordinates */
  swi_precess_speed(xx, xOffs, t, iflag, direction) {
    if(direction === undefined){
      this.swi_precess_speed(xx, 0, xOffs, t, iflag);
      return;
    }
    
    var oe;
    var fac, dpre = new Array(1), dpre2 = new Array(1);
    var tprec = (t - SwephData.J2000) / 36525.0;
    var prec_model = this.swed.astro_models[Swe.SE_MODEL_PREC_LONGTERM];
    if (prec_model == 0) prec_model = Swe.SEMOD_PREC_DEFAULT;
    if (direction == SwephData.J2000_TO_J) {
      fac = 1;
      oe = this.swed.oec;
    } else {
      fac = -1;
      oe = this.swed.oec2000;
    }
    /* first correct rotation.
     * this costs some sines and cosines, but neglect might
     * involve an error > 1"/day */
    this.sl.swi_precess(xx, 3+xOffs, t, iflag, direction);
    /* then add 0.137"/day */
    this.sl.swi_coortrf2(xx, xOffs, xx, xOffs, oe.seps, oe.ceps);
    this.sl.swi_coortrf2(xx, 3+xOffs, xx, 3+xOffs, oe.seps, oe.ceps);
    this.sl.swi_cartpol_sp(xx, xOffs, xx, xOffs);
    if (prec_model == Swe.SEMOD_PREC_VONDRAK_2011) {
      this.sl.swi_ldp_peps(t, dpre, null);
      this.sl.swi_ldp_peps(t + 1, dpre2, null);
      xx[3] += (dpre2[0] - dpre[0]) * fac;
    } else {
      xx[3] += (50.290966 + 0.0222226 * tprec) / 3600 / 365.25 * this.swed.DEGTORAD * fac;
        /* formula from Montenbruck, German 1994, p. 18 */
    }
    this.sl.swi_polcart_sp(xx, xOffs, xx, xOffs);
    this.sl.swi_coortrf2(xx, xOffs, xx, xOffs, -oe.seps, oe.ceps);
    this.sl.swi_coortrf2(xx, 3+xOffs, xx, 3+xOffs, -oe.seps, oe.ceps);
  }

  /* multiplies cartesian equatorial coordinates with previously
   * calculated nutation matrix. also corrects speed.
   */
  swi_nutate(xx, offs, iflag, backward) {
    var i;
    var x=new Array(6), xv=new Array(6);
    for (i = 0; i <= 2; i++) {
      if (backward) {
        x[i] = xx[0+offs] * this.swed.nut.matrix[i][0] +
               xx[1+offs] * this.swed.nut.matrix[i][1] +
               xx[2+offs] * this.swed.nut.matrix[i][2];
      } else {
        x[i] = xx[0+offs] * this.swed.nut.matrix[0][i] +
               xx[1+offs] * this.swed.nut.matrix[1][i] +
               xx[2+offs] * this.swed.nut.matrix[2][i];
      }
    }
    if ((iflag & Swe.SEFLG_SPEED)!=0) {
      /* correct speed:
       * first correct rotation */
      for (i = 0; i <= 2; i++) {
        if (backward) {
          x[i+3] = xx[3+offs] * this.swed.nut.matrix[i][0] +
                   xx[4+offs] * this.swed.nut.matrix[i][1] +
                   xx[5+offs] * this.swed.nut.matrix[i][2];
        } else {
          x[i+3] = xx[3+offs] * this.swed.nut.matrix[0][i] +
                   xx[4+offs] * this.swed.nut.matrix[1][i] +
                   xx[5+offs] * this.swed.nut.matrix[2][i];
        }
      }
      /* then apparent motion due to change of nutation during day.
       * this makes a difference of 0.01" */
      for (i = 0; i <= 2; i++) {
        if (backward) {
          xv[i] = xx[0+offs] * this.swed.nutv.matrix[i][0] +
                 xx[1+offs] * this.swed.nutv.matrix[i][1] +
                 xx[2+offs] * this.swed.nutv.matrix[i][2];
        } else {
          xv[i] = xx[0+offs] * this.swed.nutv.matrix[0][i] +
                 xx[1+offs] * this.swed.nutv.matrix[1][i] +
                 xx[2+offs] * this.swed.nutv.matrix[2][i];
        }
        /* new speed */
        xx[3+i+offs] = x[3+i] + (x[i] - xv[i]) / SwephData.NUT_SPEED_INTV;
      }
    }
    /* new position */
    for (i = 0; i <= 2; i++) {
      xx[i+offs] = x[i];
    }
  }

  /* computes 'annual' aberration
   * xx           planet's position accounted for light-time
   *              and gravitational light deflection
   * xe           earth's position and speed
   */
  swi_aberr_light(xx, xxOffs, xe, iflag) {
    if(iflag === undefined){
      this.swi_aberr_light(xx, 0, xxOffs, xe);
      return;
    }
    
    var i;
    var xxs=[0,0,0,0,0,0], v=[0,0,0,0,0,0], u=[0,0,0,0,0,0], ru;
    var xx2=[0,0,0,0,0,0], dx1, dx2;
    var b_1, f1, f2;
    var v2;
    var intv = SwephData.PLAN_SPEED_INTV;
    for (i = 0; i <= 5; i++) {
      u[i] = xxs[i] = xx[i+xxOffs];
    }
    ru = Math.sqrt(this.sl.square_sum(u));
    for (i = 0; i <= 2; i++) {
      v[i] = xe[i+3] / 24.0 / 3600.0 / SwephData.CLIGHT * Swe.AUNIT;
    }
    v2 = this.sl.square_sum(v);
    b_1 = Math.sqrt(1 - v2);
    f1 = this.dot_prod(u, v) / ru;
    f2 = 1.0 + f1 / (1.0 + b_1);
    for (i = 0; i <= 2; i++) {
      xx[i+xxOffs] = (b_1*xx[i+xxOffs] + f2*ru*v[i]) / (1.0 + f1);
    }
    if ((iflag & Swe.SEFLG_SPEED)!=0) {
      /* correction of speed
       * the influence of aberration on apparent velocity can
       * reach 0.4"/day
       */
      for (i = 0; i <= 2; i++) {
        u[i] = xxs[i] - intv * xxs[i+3];
      }
      ru = Math.sqrt(this.sl.square_sum(u));
      f1 = this.dot_prod(u, v) / ru;
      f2 = 1.0 + f1 / (1.0 + b_1);
      for (i = 0; i <= 2; i++) {
        xx2[i] = (b_1*u[i] + f2*ru*v[i]) / (1.0 + f1);
      }
      for (i = 0; i <= 2; i++) {
        dx1 = xx[i+xxOffs] - xxs[i];
        dx2 = xx2[i] - u[i];
        dx1 -= dx2;
        xx[i+3+xxOffs] += dx1 / intv;
      }
    }
  }

  /* computes relativistic light deflection by the sun
   * ipli         sweph internal planet number
   * xx           planet's position accounted for light-time
   * dt           dt of light-time
   */
  swi_deflect_light(xx, offs, dt, iflag) {
    var i;
    var xx2 = [0,0,0,0,0,0];
    var u = [0,0,0,0,0,0];
    var e = [0,0,0,0,0,0];
    var q = [0,0,0,0,0,0];
    var ru = 0, re = 0, rq = 0, uq = 0, ue = 0, qe = 0, g1 = 0, g2 = 0;
    var xx3 = [0,0,0,0,0,0];
    var dx1 = 0, dx2 = 0, dtsp = 0;
    var xsun = [0,0,0,0,0,0];
    var xearth = [0,0,0,0,0,0];
    var sina = 0, sin_sunr = 0, meff_fact = 0;
    var pedp = this.swed.pldat[SwephData.SEI_EARTH];
    var psdp = this.swed.pldat[SwephData.SEI_SUNBARY];
    var iephe = pedp.iephe;

    for (i = 0; i <= 5; i++) {
      xearth[i] = pedp.x[i];
    }
    if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
      for (i = 0; i <= 5; i++) {
        xearth[i] += this.swed.topd.xobs[i];
      }
    }
    /* U = planetbary(t-tau) - earthbary(t) = planetgeo */
    for (i = 0; i <= 2; i++) {
      u[i] = xx[i+offs];
    }
    /* Eh = earthbary(t) - sunbary(t) = earthhel */
      for (i = 0; i <= 2; i++) {
        e[i] = xearth[i];
      }

    /* Q = planetbary(t-tau) - sunbary(t-tau) = 'planethel' */
    /* first compute sunbary(t-tau) for */
      for (i = 0; i <= 5; i++) {
        xsun[i] = psdp.x[i];
      }
    for (i = 0; i <= 2; i++) {
      q[i] = xx[i+offs] + xearth[i] - xsun[i];
    }
    ru = Math.sqrt(this.sl.square_sum(u));
    rq = Math.sqrt(this.sl.square_sum(q));
    re = Math.sqrt(this.sl.square_sum(e));
    for (i = 0; i <= 2; i++) {
      u[i] /= ru;
      q[i] /= rq;
      e[i] /= re;
    }
    uq = this.dot_prod(u,q);
    ue = this.dot_prod(u,e);
    qe = this.dot_prod(q,e);
    sina = Math.sqrt(1 - ue * ue);      /* sin(angle) between sun and planet */
    sin_sunr = SwephData.SUN_RADIUS / re;   /* sine of sun radius (= sun radius) */
    if (sina < sin_sunr) {
      meff_fact = this.meff(sina / sin_sunr);
    } else {
      meff_fact = 1;
    }
    g1 = 2.0 * SwephData.HELGRAVCONST * meff_fact / SwephData.CLIGHT / SwephData.CLIGHT / Swe.AUNIT / re;
    g2 = 1.0 + qe;
    /* compute deflected position */
    for (i = 0; i <= 2; i++) {
      xx2[i] = ru * (u[i] + g1/g2 * (uq * e[i] - ue * q[i]));
    }

    if ((iflag & Swe.SEFLG_SPEED)!=0) {
      dtsp = -SwephData.DEFL_SPEED_INTV;
      /* U = planetbary(t-tau) - earthbary(t) = planetgeo */
      for (i = 0; i <= 2; i++) {
        u[i] = xx[i+offs] - dtsp * xx[i+3+offs];
      }
      /* Eh = earthbary(t) - sunbary(t) = earthhel */

        for (i = 0; i <= 2; i++) {
          e[i] = xearth[i] - dtsp * xearth[i+3];
        }

      /* Q = planetbary(t-tau) - sunbary(t-tau) = 'planethel' */
      for (i = 0; i <= 2; i++) {
        q[i] = u[i] + xearth[i] - xsun[i] - dtsp * (xearth[i+3] - xsun[i+3]);
      }
      ru = Math.sqrt(this.sl.square_sum(u));
      rq = Math.sqrt(this.sl.square_sum(q));
      re = Math.sqrt(this.sl.square_sum(e));
      for (i = 0; i <= 2; i++) {
        u[i] /= ru;
        q[i] /= rq;
        e[i] /= re;
      }
      uq = this.dot_prod(u,q);
      ue = this.dot_prod(u,e);
      qe = this.dot_prod(q,e);
      sina = Math.sqrt(1 - ue * ue);    /* sin(angle) between sun and planet */
      sin_sunr = SwephData.SUN_RADIUS / re; /* sine of sun radius (= sun radius) */
      if (sina < sin_sunr) {
        meff_fact = this.meff(sina / sin_sunr);
      } else {
        meff_fact = 1;
      }
      g1 = 2.0 * SwephData.HELGRAVCONST * meff_fact / SwephData.CLIGHT /
           SwephData.CLIGHT / Swe.AUNIT / re;
      g2 = 1.0 + qe;
      for (i = 0; i <= 2; i++) {
        xx3[i] = ru * (u[i] + g1/g2 * (uq * e[i] - ue * q[i]));
      }
      for (i = 0; i <= 2; i++) {
        dx1 = xx2[i] - xx[i+offs];
        dx2 = xx3[i] - u[i] * ru;
        dx1 -= dx2;
        xx[i+3+offs] += dx1 / dtsp;
      }
    } /* endif speed */

    /* deflected position */
    for (i = 0; i <= 2; i++) {
      xx[i+offs] = xx2[i];
    }
  }

  /* converts the sun from barycentric to geocentric,
   *          the earth from barycentric to heliocentric
   * computes
   * apparent position,
   * precession, and nutation
   * according to flags
   * iflag        flags
   * serr         error string
   */
  app_pos_etc_sun(iflag) {
    
    var i, j, niter, retc = Swe.OK;
    var flg1, flg2;
    var xx=new Array(6), xxsv=new Array(6), dx=new Array(3), dt, t = 0;
    var xearth=new Array(6), xsun=new Array(6), xobs=new Array(6);
    var pedp = this.swed.pldat[SwephData.SEI_EARTH];
    var psdp = this.swed.pldat[SwephData.SEI_SUNBARY];
    var oe = this.swed.oec2000;
    /* if the same conversions have already been done for the same
     * date, then return */
    flg1 = iflag & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    flg2 = pedp.xflgs & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    if (flg1 == flg2) {
      pedp.xflgs = iflag;
      pedp.iephe = iflag & Swe.SEFLG_EPHMASK;
      return Swe.OK;
    }
    /************************************
     * observer: geocenter or topocenter
     ************************************/
    /* if topocentric position is wanted  */
    if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
      if (this.swed.topd.teval != pedp.teval
        || this.swed.topd.teval == 0) {
        if (this.swi_get_observer(pedp.teval, iflag | Swe.SEFLG_NONUT, SwephData.DO_SAVE, xobs)
                                                              != Swe.OK) {
          return Swe.ERR;
        }
      }
      else {
        for (i = 0; i <= 5; i++) {
          xobs[i] = this.swed.topd.xobs[i];
        }
      }
      /* barycentric position of observer */
      for (i = 0; i <= 5; i++) {
        xobs[i] = xobs[i] + pedp.x[i];
      }
    }
    else {
      /* barycentric position of geocenter */
      for (i = 0; i <= 5; i++) {
        xobs[i] = pedp.x[i];
      }
    }
    /***************************************
     * true heliocentric position of earth *
     ***************************************/
    if (pedp.iephe == Swe.SEFLG_MOSEPH ||
        (iflag & Swe.SEFLG_BARYCTR)!=0) {
      for (i = 0; i <= 5; i++) {
        xx[i] = xobs[i];
      }
    }
    else {
      for (i = 0; i <= 5; i++) {
        xx[i] = xobs[i] - psdp.x[i];
      }
    }
    /*******************************
     * light-time                  *
     *******************************/
    if ((iflag & Swe.SEFLG_TRUEPOS)==0) {

      if (
          (iflag & Swe.SEFLG_HELCTR)!=0 ||
          (iflag & Swe.SEFLG_BARYCTR)!=0) {
        for (i = 0; i <= 5; i++) {
          xearth[i] = xobs[i];
          if (pedp.iephe == Swe.SEFLG_MOSEPH) {
            xsun[i] = 0;
          } else {
            xsun[i] = psdp.x[i];
          }
        }
        niter = 1;        /* # of iterations */
        for (j = 0; j <= niter; j++) {
          /* distance earth-sun */
          for (i = 0; i <= 2; i++) {
            dx[i] = xearth[i];
            if ((iflag & Swe.SEFLG_BARYCTR)==0) {
              dx[i] -= xsun[i];
            }
          }
          /* new t */
          dt = Math.sqrt(this.sl.square_sum(dx)) * Swe.AUNIT / SwephData.CLIGHT / 86400.0;
          t = pedp.teval - dt;
          /* new position */
          switch(pedp.iephe) {
            /* if geocentric sun, new sun at t'
             * if heliocentric or barycentric earth, new earth at t' */
            case Swe.SEFLG_MOSEPH:
              if ((iflag & Swe.SEFLG_HELCTR)!=0 ||
                  (iflag & Swet.SEFLG_BARYCTR)!=0) {
                retc = this.smosh.swi_moshplan(t, SwephData.SEI_EARTH,
                                          SwephData.NO_SAVE, xearth, xearth);
              }
              /* with moshier there is no barycentric sun */
              break;
            default:
              retc = Swe.ERR;
              break;
          }
          if (retc != Swe.OK) {
            return(retc);
          }
        }
        /* apparent heliocentric earth */
        for (i = 0; i <= 5; i++) {
          xx[i] = xearth[i];
          if ((iflag & Swe.SEFLG_BARYCTR)==0) {
            xx[i] -= xsun[i];
          }
        }
      }
    }
    if ((iflag & Swe.SEFLG_SPEED)==0) {
      for (i = 3; i <= 5; i++) {
        xx[i] = 0;
      }
    }
    /*******************************
     * conversion to geocenter     *
     *******************************/
    if ((iflag & Swe.SEFLG_HELCTR)==0 &&
        (iflag & Swe.SEFLG_BARYCTR)==0) {
      for (i = 0; i <= 5; i++) {
        xx[i] = -xx[i];
      }
    }
    /**********************************
     * 'annual' aberration of light   *
     **********************************/
    if ((iflag & Swe.SEFLG_TRUEPOS)==0 &&
        (iflag & Swe.SEFLG_NOABERR)==0) {
                /* SEFLG_NOABERR is on, if SEFLG_HELCTR or SEFLG_BARYCTR */
      this.swi_aberr_light(xx, xobs, iflag);
    }
    if ((iflag & Swe.SEFLG_SPEED) == 0) {
      for (i = 3; i <= 5; i++) {
        xx[i] = 0;
      }
    }
    /* ICRS to J2000 */
    if ((iflag & Swe.SEFLG_ICRS) == 0 && this.swed.jpldenum >= 403) {
      this.sl.swi_bias(xx, t, iflag, false);
    }/**/
    /* save J2000 coordinates; required for sidereal positions */
    for (i = 0; i <= 5; i++) {
      xxsv[i] = xx[i];
    }
    /************************************************
     * precession, equator 2000 -> equator of date *
     ************************************************/
    if ((iflag & Swe.SEFLG_J2000)==0) {
      this.sl.swi_precess(xx, pedp.teval, iflag, SwephData.J2000_TO_J);/**/
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.swi_precess_speed(xx, pedp.teval, iflag, SwephData.J2000_TO_J);/**/
      }
      oe = this.swed.oec;
    } else
      oe = this.swed.oec2000;

    var ret = this.app_pos_rest(pedp, iflag, xx, xxsv, oe);
    
    return ret;
  }

  /* transforms the position of the moon:
   * heliocentric position
   * barycentric position
   * astrometric position
   * apparent position
   * precession and nutation
   *
   * note:
   * for apparent positions, we consider the earth-moon
   * system as independant.
   * for astrometric positions (SEFLG_NOABERR), we
   * consider the motions of the earth and the moon
   * related to the solar system barycenter.
   */
  app_pos_etc_moon(iflag) {
    
    var i;
    var flg1, flg2;
    var xx=new Array(6), xxsv=new Array(6), xobs=new Array(6),
           xxm=new Array(6), xs=new Array(6), xe=new Array(6),
           xobs2=new Array(6), dt;
    var pedp = this.swed.pldat[SwephData.SEI_EARTH];
    var psdp = this.swed.pldat[SwephData.SEI_SUNBARY];
    var pdp = this.swed.pldat[SwephData.SEI_MOON];
    var oe = this.swed.oec;
    var t = 0;
    var retc;
    /* if the same conversions have already been done for the same
     * date, then return */
    flg1 = iflag & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    flg2 = pdp.xflgs & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    if (flg1 == flg2) {
      pdp.xflgs = iflag;
      pdp.iephe = (iflag & Swe.SEFLG_EPHMASK);
      return Swe.OK;
    }
    /* the conversions will be done with xx. */
    for (i = 0; i <= 5; i++) {
      xx[i] = pdp.x[i];
      xxm[i] = xx[i];
    }
    /***********************************
     * to solar system barycentric
     ***********************************/
    for (i = 0; i <= 5; i++) {
      xx[i] += pedp.x[i];
    }
    /*******************************
     * observer
     *******************************/
    if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
      if (this.swed.topd.teval != pdp.teval
        || this.swed.topd.teval == 0) {
        if (this.swi_get_observer(pdp.teval, iflag | Swe.SEFLG_NONUT, SwephData.DO_SAVE, xobs, null) != Swe.OK) {
          return Swe.ERR;
        }
      } else {
        for (i = 0; i <= 5; i++) {
          xobs[i] = this.swed.topd.xobs[i];
        }
      }
      for (i = 0; i <= 5; i++) {
        xxm[i] -= xobs[i];
      }
      for (i = 0; i <= 5; i++) {
        xobs[i] += pedp.x[i];
      }
    } else if ((iflag & Swe.SEFLG_BARYCTR)!=0) {
      for (i = 0; i <= 5; i++) {
        xobs[i] = 0;
      }
      for (i = 0; i <= 5; i++) {
        xxm[i] += pedp.x[i];
      }
    } else if ((iflag & Swe.SEFLG_HELCTR)!=0) {
      for (i = 0; i <= 5; i++) {
        xobs[i] = psdp.x[i];
      }
      for (i = 0; i <= 5; i++) {
        xxm[i] += pedp.x[i] - psdp.x[i];
      }
    } else {
      for (i = 0; i <= 5; i++) {
        xobs[i] = pedp.x[i];
      }
    }
    /*******************************
     * light-time                  *
     *******************************/
    if ((iflag & Swe.SEFLG_TRUEPOS) == 0) {
      dt = Math.sqrt(this.sl.square_sum(xxm)) * Swe.AUNIT / SwephData.CLIGHT / 86400.0;
      t = pdp.teval - dt;
      switch(pdp.iephe) {

        case Swe.SEFLG_MOSEPH:
          /* this method results in an error of a milliarcsec in speed */
          for (i = 0; i <= 2; i++) {
            xx[i] -= dt * xx[i+3];
            xe[i] = pedp.x[i] - dt * pedp.x[i+3];
                    xe[i+3] = pedp.x[i+3];
            xs[i] = 0;
            xs[i+3] = 0;
          }
          break;
      }
      if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
        if (this.swi_get_observer(t, iflag | Swe.SEFLG_NONUT, SwephData.NO_SAVE, xobs2, null) != Swe.OK) {
          return Swe.ERR;
        }
        for (i = 0; i <= 5; i++) {
          xobs2[i] += xe[i];
        }
      } else if ((iflag & Swe.SEFLG_BARYCTR)!=0) {
        for (i = 0; i <= 5; i++) {
          xobs2[i] = 0;
        }
      } else if ((iflag & Swe.SEFLG_HELCTR)!=0) {
        for (i = 0; i <= 5; i++) {
          xobs2[i] = xs[i];
        }
      } else {
        for (i = 0; i <= 5; i++) {
          xobs2[i] = xe[i];
        }
      }
    }
    /*************************
     * to correct center
     *************************/
    for (i = 0; i <= 5; i++) {
      xx[i] -= xobs[i];
    }
    /**********************************
     * 'annual' aberration of light   *
     **********************************/
    if ((iflag & Swe.SEFLG_TRUEPOS)==0 &&
        (iflag & Swe.SEFLG_NOABERR)==0) {
                  /* SEFLG_NOABERR is on, if SEFLG_HELCTR or SEFLG_BARYCTR */
      this.swi_aberr_light(xx, xobs, iflag);

      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        for (i = 3; i <= 5; i++) {
          xx[i] += xobs[i] - xobs2[i];
        }
      }
    }
    /* if !speedflag, speed = 0 */
    if ((iflag & Swe.SEFLG_SPEED)==0) {
      for (i = 3; i <= 5; i++) {
        xx[i] = 0;
      }
    }
    /* ICRS to J2000 */
    if ((iflag & Swe.SEFLG_ICRS) == 0 && this.swed.jpldenum >= 403) {
      this.sl.swi_bias(xx, t, iflag, false);
    }/**/
    /* save J2000 coordinates; required for sidereal positions */
    for (i = 0; i <= 5; i++) {
      xxsv[i] = xx[i];
    }
    /************************************************
     * precession, equator 2000 -> equator of date *
     ************************************************/
    if ((iflag & Swe.SEFLG_J2000) == 0) {
      this.sl.swi_precess(xx, pdp.teval, iflag, SwephData.J2000_TO_J);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.swi_precess_speed(xx, pdp.teval, iflag, SwephData.J2000_TO_J);
      }
      oe = this.swed.oec;
    } else {
      oe = this.swed.oec2000;
    }

    var ret = this.app_pos_rest(pdp, iflag, xx, xxsv, oe);
    
    return ret;
  }

  /* transforms the position of the barycentric sun:
   * precession and nutation
   * according to flags
   * iflag        flags
   * serr         error string
   */
  app_pos_etc_sbar(iflag) {
    var i;
    var xx=new Array(6), xxsv=new Array(6), dt;
    var pedp = this.swed.pldat[SwephData.SEI_EARTH];
    var psbdp = this.swed.pldat[SwephData.SEI_SUNBARY];
    var oe = this.swed.oec2000;
    /* the conversions will be done with xx[]. */
    for (i = 0; i <= 5; i++) {
      xx[i] = psbdp.x[i];
    }
    /**************
     * light-time *
     **************/
    if ((iflag & Swe.SEFLG_TRUEPOS)==0) {
      dt = Math.sqrt(this.sl.square_sum(xx)) * Swe.AUNIT / SwephData.CLIGHT / 86400.0;
      for (i = 0; i <= 2; i++) {
        xx[i] -= dt * xx[i+3];    /* apparent position */
      }
    }
    if ((iflag & Swe.SEFLG_SPEED)==0) {
      for (i = 3; i <= 5; i++) {
        xx[i] = 0;
      }
    }
    /* ICRS to J2000 */
    if ((iflag & Swe.SEFLG_ICRS) == 0 && this.swed.jpldenum >= 403) {
      this.sl.swi_bias(xx, psdp.teval, iflag, false);
    }/**/
    /* save J2000 coordinates; required for sidereal positions */
    for (i = 0; i <= 5; i++) {
      xxsv[i] = xx[i];
    }
    /************************************************
     * precession, equator 2000 -> equator of date *
     ************************************************/
    if ((iflag & Swe.SEFLG_J2000)==0) {
      this.sl.swi_precess(xx, psbdp.teval, iflag, SwephData.J2000_TO_J);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.swi_precess_speed(xx, psbdp.teval, iflag, SwephData.J2000_TO_J);
      }
      oe = this.swed.oec;
    } else {
      oe = this.swed.oec2000;
    }
    return this.app_pos_rest(psdp, iflag, xx, xxsv, oe);
  }

  /* transforms position of mean lunar node or apogee:
   * input is polar coordinates in mean ecliptic of date.
   * output is, according to iflag:
   * position accounted for light-time
   * position referred to J2000 (i.e. precession subtracted)
   * position with nutation
   * equatorial coordinates
   * cartesian coordinates
   * heliocentric position is not allowed ??????????????
   *         DAS WAERE ZIEMLICH AUFWENDIG. SONNE UND ERDE MUESSTEN
   *         SCHON VORHANDEN SEIN!
   * ipl          bodynumber (SE_MEAN_NODE or SE_MEAN_APOG)
   * iflag        flags
   * serr         error string
   */
  app_pos_etc_mean(ipl, iflag) {
    
    var i;
    var flg1, flg2;
    var xx=new Array(6), xxsv=new Array(6);
    var pdp = this.swed.nddat[ipl];
    var oe;
    /* if the same conversions have already been done for the same
     * date, then return */
    flg1 = iflag & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    flg2 = pdp.xflgs & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    if (flg1 == flg2) {
      pdp.xflgs = iflag;
      pdp.iephe = iflag & Swe.SEFLG_EPHMASK;
      return Swe.OK;
    }
    for (i = 0; i <= 5; i++) {
      xx[i] = pdp.x[i];
    }
    /* cartesian equatorial coordinates */
    this.sl.swi_polcart_sp(xx, xx);
    this.sl.swi_coortrf2(xx, xx, -this.swed.oec.seps, this.swed.oec.ceps);
    this.sl.swi_coortrf2(xx, 3, xx, 3, -this.swed.oec.seps, this.swed.oec.ceps);
    if ((iflag & Swe.SEFLG_SPEED)==0) {
      for (i = 3; i <= 5; i++) {
        xx[i] = 0;
      }
    }

    /* J2000 coordinates; required for sidereal positions */
    if (((iflag & Swe.SEFLG_SIDEREAL)!=0
      && (this.swed.sidd.sid_mode & Swe.SE_SIDBIT_ECL_T0)!=0)
        || (this.swed.sidd.sid_mode & Swe.SE_SIDBIT_SSY_PLANE)!=0) {
      for (i = 0; i <= 5; i++) {
        xxsv[i] = xx[i];
      }
      /* xxsv is not J2000 yet! */
      if (pdp.teval != SwephData.J2000) {
        this.sl.swi_precess(xxsv, pdp.teval, iflag, SwephData.J_TO_J2000);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.swi_precess_speed(xxsv, pdp.teval, iflag, SwephData.J_TO_J2000);
        }
      }
    }

    /*****************************************************
     * if no precession, equator of date -> equator 2000 *
     *****************************************************/
    if ((iflag & Swe.SEFLG_J2000)!=0) {
      this.sl.swi_precess(xx, pdp.teval, iflag, SwephData.J_TO_J2000);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.swi_precess_speed(xx, pdp.teval, iflag, SwephData.J_TO_J2000);
      }
      oe = this.swed.oec2000;
    } else {
      oe = this.swed.oec;
    }

    var ret =  this.app_pos_rest(pdp, iflag, xx, xxsv, oe);
    
    return ret
  }

  /* SWISSEPH
   * adds reference orbit to chebyshew series (if SEI_FLG_ELLIPSE),
   * rotates series to mean equinox of J2000
   *
   * ipli         planet number
   */
  rot_back(ipli) {
    var i;
    var t, tdiff;
    var qav, pav, dn;
    var omtild, com, som, cosih2;
    var x = new Array(SwephData.MAXORD+1);
    for(var i=0; i<SwephData.MAXORD+1; i++){
      x[i] = new Array(3).fill(0.0);
    }
    var uix=new Array(3), uiy=new Array(3), uiz=new Array(3);
    var xrot, yrot, zrot;
    var chcfx;
    var refepx;
    var seps2000 = this.swed.oec2000.seps;
    var ceps2000 = this.swed.oec2000.ceps;
    var pdp = this.swed.pldat[ipli];
    var nco = pdp.ncoe;
    var chcfyOffs;
    var chcfzOffs;
    var refepyOffs;
    t = pdp.tseg0 + pdp.dseg / 2;
    chcfx = pdp.segp;
    chcfyOffs = nco;
    chcfzOffs = 2 * nco;
    tdiff= (t - pdp.telem) / 365250.0;
    if (ipli == SwephData.SEI_MOON) {
      dn = pdp.prot + tdiff * pdp.dprot;
      i = Math.float(dn / SwephData.TWOPI);
      dn -= i * SwephData.TWOPI;
      qav = (pdp.qrot + tdiff * pdp.dqrot) * Math.cos(dn);
      pav = (pdp.qrot + tdiff * pdp.dqrot) * Math.sin(dn);
    } else {
      qav = pdp.qrot + tdiff * pdp.dqrot;
      pav = pdp.prot + tdiff * pdp.dprot;
    }
    /*calculate cosine and sine of average perihelion longitude. */
    for (i = 0; i < nco; i++) {
      x[i][0] = chcfx[i];
      x[i][1] = chcfx[i+chcfyOffs];
      x[i][2] = chcfx[i+chcfzOffs];
    }
    if ((pdp.iflg & SwephData.SEI_FLG_ELLIPSE)!=0) {
      refepx = pdp.refep;
      refepyOffs = nco;
      omtild = pdp.peri + tdiff * pdp.dperi;
      i = Math.float(omtild / SwephData.TWOPI);
      omtild -= i * SwephData.TWOPI;
      com = Math.cos(omtild);
      som = Math.sin(omtild);
      /*add reference orbit.  */
      for (i = 0; i < nco; i++) {
        x[i][0] = chcfx[i] + com * refepx[i] - som * refepx[i+refepyOffs];
        x[i][1] = chcfx[i+chcfyOffs] + com * refepx[i+refepyOffs] + som * refepx[i];
      }
    }
    /* construct right handed orthonormal system with first axis along
       origin of longitudes and third axis along angular momentum
       this uses the standard formulas for equinoctal variables
       (see papers by broucke and by cefola).      */
    cosih2 = 1.0 / (1.0 + qav * qav + pav * pav);
    /*     calculate orbit pole. */
    uiz[0] = 2.0 * pav * cosih2;
    uiz[1] = -2.0 * qav * cosih2;
    uiz[2] = (1.0 - qav * qav - pav * pav) * cosih2;
    /*     calculate origin of longitudes vector. */
    uix[0] = (1.0 + qav * qav - pav * pav) * cosih2;
    uix[1] = 2.0 * qav * pav * cosih2;
    uix[2] = -2.0 * pav * cosih2;
    /*     calculate vector in orbital plane orthogonal to origin of
          longitudes.                                               */
    uiy[0] =2.0 * qav * pav * cosih2;
    uiy[1] =(1.0 - qav * qav + pav * pav) * cosih2;
    uiy[2] =2.0 * qav * cosih2;
    /*     rotate to actual orientation in space.         */
    for (i = 0; i < nco; i++) {
      xrot = x[i][0] * uix[0] + x[i][1] * uiy[0] + x[i][2] * uiz[0];
      yrot = x[i][0] * uix[1] + x[i][1] * uiy[1] + x[i][2] * uiz[1];
      zrot = x[i][0] * uix[2] + x[i][1] * uiy[2] + x[i][2] * uiz[2];
      if (Math.abs(xrot) + Math.abs(yrot) + Math.abs(zrot) >= 1e-14) {
        pdp.neval = i;
      }
      x[i][0] = xrot;
      x[i][1] = yrot;
      x[i][2] = zrot;
      if (ipli == SwephData.SEI_MOON) {
        /* rotate to j2000 equator */
        x[i][1] = ceps2000 * yrot - seps2000 * zrot;
        x[i][2] = seps2000 * yrot + ceps2000 * zrot;
      }
    }
    for (i = 0; i < nco; i++) {
      chcfx[i] = x[i][0];
      chcfx[i+chcfyOffs] = x[i][1];
      chcfx[i+chcfzOffs] = x[i][2];
    }
  }

  /* Adjust position from Earth-Moon barycenter to Earth
   *
   * xemb = hel./bar. position or velocity vectors of emb (input)
   *                                                  earth (output)
   * xmoon= geocentric position or velocity vector of moon
   */
  embofs(xemb, eOffs, xmoon, mOffs) {
    var i;
    for (i = 0; i <= 2; i++) {
      xemb[i+eOffs] -= xmoon[i+mOffs] / (SwephData.EARTH_MOON_MRAT + 1.0);
    }
  }

  /* calculates the nutation matrix
   * nu           pointer to nutation data structure
   * oe           pointer to epsilon data structure
   */
  nut_matrix(nu, oe) {
    var psi, eps;
    var sinpsi, cospsi, sineps, coseps, sineps0, coseps0;
    psi = nu.nutlo[0];
    eps = oe.eps + nu.nutlo[1];
    sinpsi = Math.sin(psi);
    cospsi = Math.cos(psi);
    sineps0 = oe.seps;
    coseps0 = oe.ceps;
    sineps = Math.sin(eps);
    coseps = Math.cos(eps);
    nu.matrix[0][0] = cospsi;
    nu.matrix[0][1] = sinpsi * coseps;
    nu.matrix[0][2] = sinpsi * sineps;
    nu.matrix[1][0] = -sinpsi * coseps0;
    nu.matrix[1][1] = cospsi * coseps * coseps0 + sineps * sineps0;
    nu.matrix[1][2] = cospsi * sineps * coseps0 - coseps * sineps0;
    nu.matrix[2][0] = -sinpsi * sineps0;
    nu.matrix[2][1] = cospsi * coseps * sineps0 - sineps * coseps0;
    nu.matrix[2][2] = cospsi * sineps * sineps0 + coseps * coseps0;
  }

  /* lunar osculating elements, i.e.
   * osculating node ('true' node) and
   * osculating apogee ('black moon', 'lilith').
   * tjd          julian day
   * ipl          body number, i.e. SEI_TRUE_NODE or SEI_OSCU_APOG
   * iflag        flags (which ephemeris, nutation, etc.)
   * serr         error string
   *
   * definitions and remarks:
   * the osculating node and the osculating apogee are defined
   * as the orbital elements of the momentary lunar orbit.
   * their advantage is that when the moon crosses the ecliptic,
   * it is really at the osculating node, and when it passes
   * its greatest distance from earth it is really at the
   * osculating apogee. with the mean elements this is not
   * the case. (some define the apogee as the second focus of
   * the lunar ellipse. but, as seen from the geocenter, both
   * points are in the same direction.)
   * problems:
   * the osculating apogee is given in the 'New International
   * Ephemerides' (Editions St. Michel) as the 'True Lilith'.
   * however, this name is misleading. this point is based on
   * the idea that the lunar orbit can be approximated by an
   * ellipse.
   * arguments against this:
   * 1. this procedure considers celestial motions as two body
   *    problems. this is quite good for planets, but not for
   *    the moon. the strong gravitational attraction of the sun
   *    destroys the idea of an ellipse.
   * 2. the NIE 'True Lilith' has strong oscillations around the
   *    mean one with an amplitude of about 30 degrees. however,
   *    when the moon is in apogee, its distance from the mean
   *    apogee never exceeds 5 degrees.
   * besides, the computation of NIE is INACCURATE. the mistake
   * reaches 20 arc minutes.
   * According to Santoni, the point was calculated using 'les 58
   * premiers termes correctifs au Perigee moyen' published by
   * Chapront and Chapront-Touze. And he adds: "Nous constatons
   * que meme en utilisant ces 58 termes CORRECTIFS, l'erreur peut
   * atteindre 0,5d!" (p. 13) We avoid this error, computing the
   * orbital elements directly from the position and the speed vector.
   *
   * how about the node? it is less problematic, because we
   * we needn't derive it from an orbital ellipse. we can say:
   * the axis of the osculating nodes is the intersection line of
   * the actual orbital plane of the moon and the plane of the
   * ecliptic. or: the osculating nodes are the intersections of
   * the two great circles representing the momentary apparent
   * orbit of the moon and the ecliptic. in this way they make
   * some sense. then, the nodes are really an axis, and they
   * have no geocentric distance. however, in this routine
   * we give a distance derived from the osculating ellipse.
   * the node could also be defined as the intersection axis
   * of the lunar orbital plane and the solar orbital plane,
   * which is not precisely identical to the ecliptic. this
   * would make a difference of several arcseconds.
   *
   * is it possible to keep the idea of a continuously moving
   * apogee that is exact at the moment when the moon passes
   * its greatest distance from earth?
   * to achieve this, we would probably have to interpolate between
   * the actual apogees.
   * the nodes could also be computed by interpolation. the resulting
   * nodes would deviate from the so-called 'true node' by less than
   * 30 arc minutes.
   *
   * sidereal and j2000 true node are first computed for the ecliptic
   * of epoch and then precessed to ecliptic of t0(ayanamsa) or J2000.
   * there is another procedure that computes the node for the ecliptic
   * of t0(ayanamsa) or J2000. it is excluded by
   * #ifdef SID_TNODE_FROM_ECL_T0
   */
  lunar_osc_elem(tjd, ipl, iflag) {
    var i, j, istart;
    var epheflag = Swe.SEFLG_DEFAULTEPH;
    var retc = Swe.ERR;
    var flg1, flg2;
    var ndp, ndnp, ndap;
    var oe = new Epsilon();
    var speed_intv = SwephData.NODE_CALC_INTV;   /* to silence gcc warning */
    var a, b;
    var xpos = new Array(3);
    for(var i=0; i<3; i++){
      xpos[i] = new Array(6).fill(0.0);
    }
    var xx = new Array(3);
    for(var i=0; i<3; i++){
      xx[i] = new Array(6).fill(0.0);
    }
    var xxa = new Array(3);
    for(var i=0; i<3; i++){
      xxa[i] = new Array(6).fill(0.0);
    }
    var xnorm=new Array(6), r=new Array(6);
    var rxy, rxyz, t, dt, fac, sgn;
    var sinnode, cosnode, sinincl, cosincl, sinu, cosu, sinE, cosE;
    var uu, ny, sema, ecce, Gmsm, c2, v2, pp;
    var speedf1, speedf2;
    var sip = this.swed.sidd;
    var oectmp = new Epsilon();
    if ((iflag & Swe.SEFLG_SIDEREAL)!=0) {
      this.calc_epsilon(sip.t0, iflag, oectmp);
      oe = oectmp;
    } else if ((iflag & Swe.SEFLG_J2000)!=0) {
      oe = this.swed.oec2000;
    } else{
      oe = this.swed.oec;
    }

    ndp = this.swed.nddat[ipl];
    /* if elements have already been computed for this date, return
     * if speed flag has been turned on, recompute */
    flg1 = iflag & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    flg2 = ndp.xflgs & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    speedf1 = ndp.xflgs & Swe.SEFLG_SPEED;
    speedf2 = iflag & Swe.SEFLG_SPEED;
    if (tjd == ndp.teval
          && tjd != 0
          && flg1 == flg2
          && ((speedf2==0) || (speedf1!=0))) {
      ndp.xflgs = iflag;
      ndp.iephe = iflag & Swe.SEFLG_EPHMASK;
      return Swe.OK;
    }

    /*********************************************
     * now three lunar positions with speeds     *
     *********************************************/
    if ((iflag & Swe.SEFLG_MOSEPH)!=0) {
      epheflag = Swe.SEFLG_MOSEPH;
    }
    /* there may be a moon of wrong ephemeris in save area
     * force new computation: */
    this.swed.pldat[SwephData.SEI_MOON].teval = 0;
    if ((iflag & Swe.SEFLG_SPEED)!=0) {
      istart = 0;
    } else {
      istart = 2;
    }

    do{
        speed_intv = SwephData.NODE_CALC_INTV_MOSH;
        for (i = istart; i <= 2; i++) {
          if (i == 0) {
            t = tjd - speed_intv;
          } else if (i == 1) {
            t = tjd + speed_intv;
          } else {
            t = tjd;
          }
          retc = this.sm.swi_moshmoon(t, SwephData.NO_SAVE, xpos[i]);/**/
          if (retc == Swe.ERR) {
            return(retc);
          }
          /* precession and nutation etc. */
          retc = this.swi_plan_for_osc_elem(iflag|Swe.SEFLG_SPEED, t, xpos[i]); /* retc is always ok */
        }
    } while(retc == SwephData.NOT_AVAILABLE || retc == SwephData.BEYOND_EPH_LIMITS)


    /*********************************************
     * node with speed                           *
     *********************************************/
    /* node is always needed, even if apogee is wanted */
    ndnp = this.swed.nddat[SwephData.SEI_TRUE_NODE];
    /* three nodes */
    for (i = istart; i <= 2; i++) {
      if (Math.abs(xpos[i][5]) < 1e-15) {
        xpos[i][5] = 1e-15;
      }
      fac = xpos[i][2] / xpos[i][5];
      sgn = xpos[i][5] / Math.abs(xpos[i][5]);
      for (j = 0; j <= 2; j++) {
        xx[i][j] = (xpos[i][j] - fac * xpos[i][j+3]) * sgn;
      }
    }

    for (i = 0; i <= 2; i++) {
      ndnp.x[i] = xx[2][i];
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        b = (xx[1][i] - xx[0][i]) / 2;
        a = (xx[1][i] + xx[0][i]) / 2 - xx[2][i];
        ndnp.x[i+3] = (2 * a + b) / speed_intv;
      } else
        ndnp.x[i+3] = 0;
      ndnp.teval = tjd;
      ndnp.iephe = epheflag;
    }
    /************************************************************
     * apogee with speed                                        *
     * must be computed anyway to get the node's distance       *
     ************************************************************/
    ndap = this.swed.nddat[SwephData.SEI_OSCU_APOG];
    Gmsm = SwephData.GEOGCONST * (1 + 1 / SwephData.EARTH_MOON_MRAT) /
                           Swe.AUNIT/Swe.AUNIT/Swe.AUNIT*86400.0*86400.0;
    /* three apogees */
    for (i = istart; i <= 2; i++) {
      /* node */
      rxy =  Math.sqrt(xx[i][0] * xx[i][0] + xx[i][1] * xx[i][1]);
      cosnode = xx[i][0] / rxy;
      sinnode = xx[i][1] / rxy;
      /* inclination */
      this.sl.swi_cross_prod(xpos[i], 0, xpos[i], 3, xnorm, 0);
      rxy =  xnorm[0] * xnorm[0] + xnorm[1] * xnorm[1];
      c2 = (rxy + xnorm[2] * xnorm[2]);
      rxyz = Math.sqrt(c2);
      rxy = Math.sqrt(rxy);
      sinincl = rxy / rxyz;
      cosincl = Math.sqrt(1 - sinincl * sinincl);
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
      sinE = 1 / ecce / Math.sqrt(sema * Gmsm) * this.dot_prod(xpos[i], xpos[i], 3);
      /* true anomaly */
      ny = 2 * Math.atan(Math.sqrt((1+ecce)/(1-ecce)) * sinE / (1 + cosE));
      /* distance of apogee from ascending node */
      xxa[i][0] = this.sl.swi_mod2PI(uu - ny + Math.PI);
      xxa[i][1] = 0;                      /* latitude */
      xxa[i][2] = sema * (1 + ecce);      /* distance */
      /* transformation to ecliptic coordinates */
      this.sl.swi_polcart(xxa[i], xxa[i]);
      this.sl.swi_coortrf2(xxa[i], xxa[i], -sinincl, cosincl);
      this.sl.swi_cartpol(xxa[i], xxa[i]);
      /* adding node, we get apogee in ecl. coord. */
      xxa[i][0] += Math.atan2(sinnode, cosnode);
      this.sl.swi_polcart(xxa[i], xxa[i]);
      /* new distance of node from orbital ellipse:
       * true anomaly of node: */
      ny = this.sl.swi_mod2PI(ny - uu);
      /* eccentric anomaly */
      cosE = Math.cos(2 * Math.atan(Math.tan(ny / 2) / Math.sqrt((1+ecce) / (1-ecce))));
      /* new distance */
      r[0] = sema * (1 - ecce * cosE);
      /* old node distance */
      r[1] = Math.sqrt(this.sl.square_sum(xx[i]));
      /* correct length of position vector */
      for (j = 0; j <= 2; j++) {
        xx[i][j] *= r[0] / r[1];
      }
    }
    /* save position and speed */
    for (i = 0; i <= 2; i++) {
      /* apogee */
      ndap.x[i] = xxa[2][i];
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        ndap.x[i+3] = (xxa[1][i] - xxa[0][i]) / speed_intv / 2;
      } else {
        ndap.x[i+3] = 0;
      }
      ndap.teval = tjd;
      ndap.iephe = epheflag;
      /* node */
      ndnp.x[i] = xx[2][i];
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        ndnp.x[i+3] = (xx[1][i] - xx[0][i]) / speed_intv / 2;/**/
      } else {
        ndnp.x[i+3] = 0;
      }
    }
    /**********************************************************************
     * precession and nutation have already been taken into account
     * because the computation is on the basis of lunar positions
     * that have gone through this.swi_plan_for_osc_elem.
     * light-time is already contained in lunar positions.
     * now compute polar and equatorial coordinates:
     **********************************************************************/
    var  x=new Array(6);
    for (var j = 0; j <= 1; j++) {
      if (j == 0) {
        ndp = this.swed.nddat[SwephData.SEI_TRUE_NODE];
      } else {
        ndp = this.swed.nddat[SwephData.SEI_OSCU_APOG];
      }
//  memset((void *) ndp.xreturn, 0, 24 * sizeof(double));
      for(var z=0; z<ndp.xreturn.length; z++) { ndp.xreturn[z]=0.0; }
      /* cartesian ecliptic */
      for(var i = 0; i <= 5; i++) {
        ndp.xreturn[6+i] = ndp.x[i];
      }
      /* polar ecliptic */
      this.sl.swi_cartpol_sp(ndp.xreturn, 6, ndp.xreturn, 0);
      /* cartesian equatorial */
      this.sl.swi_coortrf2(ndp.xreturn, 6, ndp.xreturn, 18, -oe.seps, oe.ceps);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.sl.swi_coortrf2(ndp.xreturn, 9, ndp.xreturn, 21, -oe.seps, oe.ceps);
      }

      /* sideral: we return NORMAL equatorial coordinates, there are no
       * sidereal ones */
      if ((iflag & Swe.SEFLG_SIDEREAL)!=0) {
        /* to J2000 */
        this.sl.swi_precess(ndp.xreturn, 18, sip.t0, iflag, SwephData.J_TO_J2000);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.swi_precess_speed(ndp.xreturn, 21, sip.t0, iflag, SwephData.J_TO_J2000);
        }
        if ((iflag & Swe.SEFLG_J2000)==0) {
          /* to tjd */
          this.sl.swi_precess(ndp.xreturn, 18, tjd, iflag, SwephData.J2000_TO_J);
          if ((iflag & Swe.SEFLG_SPEED)!=0) {
            this.swi_precess_speed(ndp.xreturn, 21, tjd, iflag, SwephData.J2000_TO_J);
          }
        }
      }

      if ((iflag & Swe.SEFLG_NONUT) == 0) {
        this.sl.swi_coortrf2(ndp.xreturn, 18, ndp.xreturn, 18, -this.swed.nut.snut,
                        this.swed.nut.cnut);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.sl.swi_coortrf2(ndp.xreturn, 21, ndp.xreturn, 21, -this.swed.nut.snut, this.swed.nut.cnut);
        }
      }
      /* polar equatorial */
      this.sl.swi_cartpol_sp(ndp.xreturn, 18, ndp.xreturn, 12);
      ndp.xflgs = iflag;
      ndp.iephe = iflag & Swe.SEFLG_EPHMASK;

      if ((iflag & Swe.SEFLG_SIDEREAL)!=0) {

        if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_ECL_T0)!=0
          || (this.swed.sidd.sid_mode & Swe.SE_SIDBIT_SSY_PLANE)!=0) {
          for (i = 0; i <= 5; i++) {
            x[i] = ndp.xreturn[18+i];
          }
          if ((iflag & Swe.SEFLG_NONUT)==0) {
            this.swi_nutate(x, 0, iflag, true);
          }
          this.sl.swi_precess(x, tjd, iflag, SwephData.J_TO_J2000);
          if ((iflag & Swe.SEFLG_SPEED)!=0) {
            this.swi_precess_speed(x, tjd, iflag, SwephData.J_TO_J2000);
          }
          if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_ECL_T0)!=0) {
            this.swi_trop_ra2sid_lon(x, ndp.xreturn, 6, ndp.xreturn, 18, iflag,
                                null);
          } else if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_SSY_PLANE)!=0) {
            this.swi_trop_ra2sid_lon_sosy(x, ndp.xreturn, 6, ndp.xreturn, 18, iflag,
                                     null);
          }
          this.sl.swi_cartpol_sp(ndp.xreturn, 6, ndp.xreturn, 0);
          this.sl.swi_cartpol_sp(ndp.xreturn, 18, ndp.xreturn, 12);
        } else {
          this.sl.swi_cartpol_sp(ndp.xreturn, 6, ndp.xreturn, 0);
          ndp.xreturn[0] -= this.swe_get_ayanamsa(ndp.teval) * this.swed.DEGTORAD;
          this.sl.swi_polcart_sp(ndp.xreturn, 0, ndp.xreturn, 6);
        }
      } else if ((iflag & Swe.SEFLG_J2000)!=0) {

        for (i = 0; i <= 5; i++) {
          x[i] = ndp.xreturn[18+i];
        }

        this.sl.swi_precess(x, tjd, iflag, SwephData.J_TO_J2000);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.swi_precess_speed(x, tjd, iflag, SwephData.J_TO_J2000);
        }
        for (i = 0; i <= 5; i++) {
          ndp.xreturn[18+i] = x[i];
        }
        this.sl.swi_cartpol_sp(ndp.xreturn, 18, ndp.xreturn, 12);
        this.sl.swi_coortrf2(ndp.xreturn, 18, ndp.xreturn, 6, this.swed.oec2000.seps,
                        this.swed.oec2000.ceps);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.sl.swi_coortrf2(ndp.xreturn, 21, ndp.xreturn, 9, this.swed.oec2000.seps,
                          this.swed.oec2000.ceps);
        }
        this.sl.swi_cartpol_sp(ndp.xreturn, 6, ndp.xreturn, 0);
      }

      for (i = 0; i < 2; i++) {
        ndp.xreturn[i] *= this.swed.RADTODEG;              /* ecliptic */
        ndp.xreturn[i+3] *= this.swed.RADTODEG;
        ndp.xreturn[i+12] *= this.swed.RADTODEG;   /* equator */
        ndp.xreturn[i+15] *= this.swed.RADTODEG;
      }
      ndp.xreturn[0] = this.sl.swe_degnorm(ndp.xreturn[0]);
      ndp.xreturn[12] = this.sl.swe_degnorm(ndp.xreturn[12]);
      /*}*/
    }

    return Swe.OK;
  }

  /* lunar osculating elements, i.e.
   */ 
  intp_apsides(tjd, ipl, iflag) {
    
    var i;
    var flg1, flg2;
    var ndp;
    var oe;
    var nut;
    var speed_intv = 0.1;
    var t, dt;
    var xpos = new Array(3);
    for(var i=0; i<3; i++){
      xpos[i] = new Array(6).fill(0.0);
    }
    var xx = new Array(6), x = new Array(6);
    var speedf1, speedf2;
// TM - temporary inclusion for version 2.00.00 to give an end date to -pg / -pc //
    if (tjd < SwephData.MOSHLUEPH_START || tjd > SwephData.MOSHLUEPH_END) {
      var s = "jd "+tjd+" outside Moshier's Moon range "+
          SwephData.MOSHLUEPH_START+" .. "+
          SwephData.MOSHLUEPH_END+" ";
      console.error(s);
      return Swe.ERR;
    }
// TM - end of inclusion //////////////////////////////////////////////////////////

    oe = this.swed.oec;
    nut = this.swed.nut;
    ndp = this.swed.nddat[ipl];
    /* if same calculation was done before, return
     * if speed flag has been turned on, recompute */
    flg1 = iflag & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    flg2 = ndp.xflgs & ~Swe.SEFLG_EQUATORIAL & ~Swe.SEFLG_XYZ;
    speedf1 = ndp.xflgs & Swe.SEFLG_SPEED;
    speedf2 = iflag & Swe.SEFLG_SPEED;
    if (tjd == ndp.teval 
    && tjd != 0 
    && flg1 == flg2
    && ((speedf2==0) || (speedf1!=0))) {
      ndp.xflgs = iflag;
      ndp.iephe = iflag & Swe.SEFLG_MOSEPH;
      return Swe.OK;
    }
    /*********************************************
     * now three apsides * 
     *********************************************/
    for (t = tjd - speed_intv, i = 0; i < 3; t += speed_intv, i++) {
      if ( ((iflag & Swe.SEFLG_SPEED)==0) && i != 1) continue;
      this.sm.swi_intp_apsides(t, xpos[i], ipl);
    }
    /************************************************************
     * apsis with speed                                         * 
     ************************************************************/
    for (i = 0; i < 3; i++) {
      xx[i] = xpos[1][i];
      xx[i+3] = 0;
    }
    if ((iflag & Swe.SEFLG_SPEED) != 0) {
      xx[3] = this.sl.swe_difrad2n(xpos[2][0], xpos[0][0]) / speed_intv / 2.0;
      xx[4] = (xpos[2][1] - xpos[0][1]) / speed_intv / 2.0;
      xx[5] = (xpos[2][2] - xpos[0][2]) / speed_intv / 2.0;
    }
    // memset((void *) ndp.xreturn, 0, 24 * sizeof(double));
    for(var p=0;p<24;p++) { ndp.xreturn[p]=0.; }
    /* ecliptic polar to cartesian */
    this.sl.swi_polcart_sp(xx, xx);
    /* light-time */
    if ((iflag & Swe.SEFLG_TRUEPOS) == 0) {
      dt = Math.sqrt(this.sl.square_sum(xx)) * Swe.AUNIT / SwephData.CLIGHT / 86400.0;     
      for (i = 1; i < 3; i++)
        xx[i] -= dt * xx[i+3];
    }
    for (i = 0; i <= 5; i++) {
      ndp.xreturn[i+6] = xx[i];
    }
    /*printf("%.10f, %.10f, %.10f, %.10f\n", xx[0] /DEGTORAD, xx[1] / DEGTORAD, xx [2], xx[3] /DEGTORAD);*/
    /* equatorial cartesian */
    this.sl.swi_coortrf2(ndp.xreturn, 6, ndp.xreturn, 18, -oe.seps, oe.ceps);
    if ((iflag & Swe.SEFLG_SPEED) != 0){
      this.sl.swi_coortrf2(ndp.xreturn, 9, ndp.xreturn, 21, -oe.seps, oe.ceps);
    }
    ndp.teval = tjd;
    ndp.xflgs = iflag;
    ndp.iephe = iflag & Swe.SEFLG_EPHMASK;

    if ((iflag & Swe.SEFLG_SIDEREAL) != 0) {

      if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_ECL_T0) != 0
        || (this.swed.sidd.sid_mode & Swe.SE_SIDBIT_SSY_PLANE) != 0) {
        for (i = 0; i <= 5; i++){
          x[i] = ndp.xreturn[18+i];
        }
        /* precess to J2000 */
        this.sl.swi_precess(x, tjd, iflag, SwephData.J_TO_J2000);
        if ((iflag & Swe.SEFLG_SPEED) != 0){
          this.swi_precess_speed(x, tjd, iflag, SwephData.J_TO_J2000);
        }
        if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_ECL_T0) != 0) {
          this.swi_trop_ra2sid_lon(x, ndp.xreturn, 6, ndp.xreturn, 18, iflag, null);
        }
          /* project onto solar system equator */
        else if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_SSY_PLANE) != 0){
          this.swi_trop_ra2sid_lon_sosy(x, ndp.xreturn, 6, ndp.xreturn, 18, iflag, null);
        }
        /* to polar */
        this.sl.swi_cartpol_sp(ndp.xreturn, 6, ndp.xreturn, 0);
        this.sl.swi_cartpol_sp(ndp.xreturn, 18, ndp.xreturn, 12);
      }
      else {
        this.sl.swi_cartpol_sp(ndp.xreturn, 6, ndp.xreturn, 0); 
        ndp.xreturn[0] -= this.swe_get_ayanamsa(ndp.teval) * this.swed.DEGTORAD;
        this.sl.swi_polcart_sp(ndp.xreturn, 0, ndp.xreturn, 6); 
        this.sl.swi_cartpol_sp(ndp.xreturn, 18, ndp.xreturn, 12);
      }
    }

    else if ((iflag & Swe.SEFLG_J2000) != 0) {
      /* node and apogee are referred to t; 
       * the ecliptic position must be transformed to J2000 */
      for (i = 0; i <= 5; i++){
        x[i] = ndp.xreturn[18+i];
      }
      /* precess to J2000 */
      this.sl.swi_precess(x, tjd, iflag, SwephData.J_TO_J2000);
      if ((iflag & Swe.SEFLG_SPEED) != 0)
        this.swi_precess_speed(x, tjd, iflag, SwephData.J_TO_J2000);
      for (i = 0; i <= 5; i++)
        ndp.xreturn[18+i] = x[i];
      this.sl.swi_cartpol_sp(ndp.xreturn, 18, ndp.xreturn, 12);
      this.sl.swi_coortrf2(ndp.xreturn, 18, ndp.xreturn, 6, this.swed.oec2000.seps, this.swed.oec2000.ceps);
      if ((iflag & Swe.SEFLG_SPEED) != 0)
        this.sl.swi_coortrf2(ndp.xreturn, 21, ndp.xreturn, 9, this.swed.oec2000.seps, this.swed.oec2000.ceps);
      this.sl.swi_cartpol_sp(ndp.xreturn, 6, ndp.xreturn, 0);
    }
    else {
      /* tropical ecliptic positions */
      /* precession has already been taken into account, but not nutation */
      if ((iflag & Swe.SEFLG_NONUT) == 0) {
        this.swi_nutate(ndp.xreturn, 18, iflag, false);
      }
      /* equatorial polar */
      this.sl.swi_cartpol_sp(ndp.xreturn, 18, ndp.xreturn, 12);
      /* ecliptic cartesian */
      this.sl.swi_coortrf2(ndp.xreturn, 18, ndp.xreturn, 6, oe.seps, oe.ceps);
      if ((iflag & Swe.SEFLG_SPEED) != 0){
        this.sl.swi_coortrf2(ndp.xreturn, 21, ndp.xreturn, 9, oe.seps, oe.ceps);
      }
      if ((iflag & Swe.SEFLG_NONUT) == 0) {
        this.sl.swi_coortrf2(ndp.xreturn, 6, ndp.xreturn, 6, nut.snut, nut.cnut);
        if ((iflag & Swe.SEFLG_SPEED) != 0){
          sl.swi_coortrf2(ndp.xreturn, 9, ndp.xreturn, 9, nut.snut, nut.cnut);
        }
      }
      /* ecliptic polar */
      this.sl.swi_cartpol_sp(ndp.xreturn, 6, ndp.xreturn, 0);
    }

    /********************** 
     * radians to degrees *
     **********************/
    /*if ((iflag & Swe.SEFLG_RADIANS)==0) {*/
    for (i = 0; i < 2; i++) {
      ndp.xreturn[i] *= this.swed.RADTODEG;   /* ecliptic */
      ndp.xreturn[i+3] *= this.swed.RADTODEG;
      ndp.xreturn[i+12] *= this.swed.RADTODEG;  /* equator */
      ndp.xreturn[i+15] *= this.swed.RADTODEG;
    }
    ndp.xreturn[0] = this.sl.swe_degnorm(ndp.xreturn[0]);
    ndp.xreturn[12] = this.sl.swe_degnorm(ndp.xreturn[12]);
    /*}*/
    return Swe.OK;
  }

  /* transforms the position of the moon in a way we can use it
   * for calculation of osculating node and apogee:
   * precession and nutation (attention to speed vector!)
   * according to flags
   * iflag        flags
   * tjd          time for which the element is computed
   *              i.e. date of ecliptic
   * xx           array equatorial cartesian position and speed
   * serr         error string
   */
  swi_plan_for_osc_elem(iflag, tjd, xx) {
    var i;
    var x=new Array(6);
    var nuttmp=new Nut();
    var nutp = nuttmp;   /* dummy assign, to silence gcc warning */
    var oe = this.swed.oec;
    var oectmp=new Epsilon();
    /* ICRS to J2000 */
    if ((iflag & Swe.SEFLG_ICRS)==0 && this.swed.jpldenum >= 403) {
      this.sl.swi_bias(xx, tjd, iflag, false);
    }/**/
    /************************************************
     * precession, equator 2000 -> equator of date  *
     * attention: speed vector has to be rotated,   *
     * but daily precession 0.137" may not be added!*/

    var sip = this.swed.sidd;
    /* For sidereal calculation we need node refered*
     * to ecliptic of t0 of ayanamsa                *
     ************************************************/
    if ((iflag & Swe.SEFLG_SIDEREAL) != 0) {
      tjd = sip.t0;
      this.sl.swi_precess(xx, tjd, iflag, SwephData.J2000_TO_J);
      this.sl.swi_precess(xx, 3, tjd, iflag, SwephData.J2000_TO_J);
      this.calc_epsilon(tjd, iflag, oectmp);
      oe = oectmp;
    }
    else if ((iflag & Swe.SEFLG_J2000)==0) {

      this.sl.swi_precess(xx, tjd, iflag, SwephData.J2000_TO_J);
      this.sl.swi_precess(xx, 3, tjd, iflag, SwephData.J2000_TO_J);
      /* epsilon */
      if (tjd == this.swed.oec.teps) {
        oe = this.swed.oec;
      }
      else if (tjd == SwephData.J2000) {
        oe = this.swed.oec2000;
      }
      else {
        this.calc_epsilon(tjd, iflag, oectmp);
        oe = oectmp;
      }

    }
    else {      /* if SEFLG_J2000 */
      oe = this.swed.oec2000;
    }
    /************************************************
     * nutation                                     *
     * again: speed vector must be rotated, but not *
     * added 'speed' of nutation                    *
     ************************************************/
    if ((iflag & Swe.SEFLG_NONUT) == 0) {
      if (tjd == this.swed.nut.tnut) {
        nutp = this.swed.nut;
      }
      else if (tjd == SwephData.J2000) {
        nutp = this.swed.nut2000;
      }
      else if (tjd == this.swed.nutv.tnut) {
        nutp = this.swed.nutv;
      }
      else {
        nutp = nuttmp;
        this.sl.swi_nutation(tjd, iflag, nutp.nutlo);
        nutp.tnut = tjd;
        nutp.snut = Math.sin(nutp.nutlo[1]);
        nutp.cnut = Math.cos(nutp.nutlo[1]);
        this.nut_matrix(nutp, oe);
      }
      for (i = 0; i <= 2; i++) {
        x[i] = xx[0] * nutp.matrix[0][i] +
               xx[1] * nutp.matrix[1][i] +
               xx[2] * nutp.matrix[2][i];
      }
      /* speed:
       * rotation only */
      for (i = 0; i <= 2; i++) {
        x[i+3] = xx[3] * nutp.matrix[0][i] +
                 xx[4] * nutp.matrix[1][i] +
                 xx[5] * nutp.matrix[2][i];
      }
      for (i = 0; i <= 5; i++) {
        xx[i] = x[i];
      }
    }
    /************************************************
     * transformation to ecliptic                   *
     ************************************************/
    this.sl.swi_coortrf2(xx, xx, oe.seps, oe.ceps);
    this.sl.swi_coortrf2(xx, 3, xx, 3, oe.seps, oe.ceps);

    if ((iflag & Swe.SEFLG_SIDEREAL)!=0) {
      /* subtract ayan_t0 */
      this.sl.swi_cartpol_sp(xx, xx);
      xx[0] -= sip.ayan_t0 * this.swed.DEGTORAD;//bug fix by Ruby Fumizki
      this.sl.swi_polcart_sp(xx, xx);
    } 
    else if ((iflag & Swe.SEFLG_NONUT) == 0) {
      this.sl.swi_coortrf2(xx, xx, nutp.snut, nutp.cnut);
      this.sl.swi_coortrf2(xx, 3, xx, 3, nutp.snut, nutp.cnut);
    }
    return Swe.OK;
  }

  meff(r) {
    var f, m;
    var i;
    if (r <= 0) {
      return 0.0;
    } else if (r >= 1) {
      return 1.0;
    }
    for (i = 0; this.eff_arr[i].r > r; i++) {
      ; /* empty body */
    }
    f = (r - this.eff_arr[i-1].r) / (this.eff_arr[i].r - this.eff_arr[i-1].r);
    m = this.eff_arr[i-1].m + f * (this.eff_arr[i].m - this.eff_arr[i-1].m);
    return m;
  }

  denormalize_positions(x0, x1, x2) {
    var i;
    /* x*[0] = ecliptic longitude, x*[12] = rectascension */
    for (i = 0; i <= 12; i += 12) {
      if (x1[i] - x0[i] < -180) {
        x0[i] -= 360;
      }
      if (x1[i] - x0[i] > 180) {
        x0[i] += 360;
      }
      if (x1[i] - x2[i] < -180) {
        x2[i] -= 360;
      }
      if (x1[i] - x2[i] > 180) {
        x2[i] += 360;
      }
    }
  }

  calc_speed(x0, x1, x2, dt) {
    var i, j, k;
    var a, b;
    for (j = 0; j <= 18; j += 6) {
      for (i = 0; i < 3; i++) {
        k = j + i;
        b = (x2[k] - x0[k]) / 2;
        a = (x2[k] + x0[k]) / 2 - x1[k];
        x1[k+3] = (2 * a + b) / dt;
      }
    }
  }

  swi_check_ecliptic(tjd, iflag) {
    
    if (this.swed.oec2000.teps != SwephData.J2000) {
      this.calc_epsilon(SwephData.J2000, iflag, this.swed.oec2000);
    }
    if (tjd == SwephData.J2000) {
      this.swed.oec.teps = this.swed.oec2000.teps;
      this.swed.oec.eps = this.swed.oec2000.eps;
      this.swed.oec.seps = this.swed.oec2000.seps;
      this.swed.oec.ceps = this.swed.oec2000.ceps;
      return;
    }
    if (this.swed.oec.teps != tjd || tjd == 0) {
      this.calc_epsilon(tjd, iflag, this.swed.oec);
    }
  }

  /* computes nutation, if it is wanted and has not yet been computed.
   * if speed flag has been turned on since last computation,
   * nutation is recomputed */
  swi_check_nutation(tjd, iflag) {
    
    var speedf1, speedf2;
    var t;
    speedf1 = this.chck_nut_nutflag & Swe.SEFLG_SPEED;
    speedf2 = iflag & Swe.SEFLG_SPEED;
    if ((iflag & Swe.SEFLG_NONUT) == 0
          && (tjd != this.swed.nut.tnut || tjd == 0
          || ((speedf1==0) && (speedf2!=0)))) {
      this.sl.swi_nutation(tjd, iflag, this.swed.nut.nutlo);
      this.swed.nut.tnut = tjd;
      this.swed.nut.snut = Math.sin(this.swed.nut.nutlo[1]);
      this.swed.nut.cnut = Math.cos(this.swed.nut.nutlo[1]);
      this.chck_nut_nutflag = iflag;
      this.nut_matrix(this.swed.nut, this.swed.oec);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        /* once more for 'speed' of nutation, which is needed for
         * planetary speeds */
        t = tjd - SwephData.NUT_SPEED_INTV;
        this.sl.swi_nutation(t, iflag, this.swed.nutv.nutlo);
        this.swed.nutv.tnut = t;
        this.swed.nutv.snut = Math.sin(this.swed.nutv.nutlo[1]);
        this.swed.nutv.cnut = Math.cos(this.swed.nutv.nutlo[1]);
        this.nut_matrix(this.swed.nutv, this.swed.oec);
      }
    }
  }

  plaus_iflag(iflag, ipl, tjd) {
    var epheflag = 0;
    var jplhor_model = this.swed.astro_models[Swe.SE_MODEL_JPLHOR_MODE];
    var jplhora_model = this.swed.astro_models[Swe.SE_MODEL_JPLHORA_MODE];
    if (jplhor_model == 0) jplhor_model = Swe.SEMOD_JPLHOR_DEFAULT;
    if (jplhora_model == 0) jplhora_model = Swe.SEMOD_JPLHORA_DEFAULT;

    /* either Horizons mode or simplified Horizons mode, not both */
    if ((iflag & Swe.SEFLG_JPLHOR) != 0)
      iflag &= ~Swe.SEFLG_JPLHOR_APPROX;
    /* if topocentric bit, turn helio- and barycentric bits off;
     * also turn JPL Horizons mode off */
    if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
      iflag = iflag & ~(Swe.SEFLG_HELCTR | Swe.SEFLG_BARYCTR);
      iflag = iflag & ~(Swe.SEFLG_JPLHOR | Swe.SEFLG_JPLHOR_APPROX);
    }
    /* if heliocentric bit, turn aberration and deflection off */
    if ((iflag & Swe.SEFLG_HELCTR)!=0) {
      iflag |= Swe.SEFLG_NOABERR | Swe.SEFLG_NOGDEFL;
                                              /*iflag |= SEFLG_TRUEPOS;*/
    }
    /* same, if barycentric bit */
    if ((iflag & Swe.SEFLG_BARYCTR)!=0) {
      iflag |= Swe.SEFLG_NOABERR | Swe.SEFLG_NOGDEFL;
                                              /*iflag |= SEFLG_TRUEPOS;*/
    }
    /* if no_precession bit is set, set also no_nutation bit */
    if ((iflag & Swe.SEFLG_J2000)!=0) {
      iflag |= Swe.SEFLG_NONUT;
    }
    /* if truepos is set, turn off grav. defl. and aberration */
    if ((iflag & Swe.SEFLG_TRUEPOS)!=0) {
      iflag |= (Swe.SEFLG_NOGDEFL | Swe.SEFLG_NOABERR);
    }

    /* if sidereal bit is set, set also no_nutation bit *
     * also turn JPL Horizons mode off */
    if ((iflag & Swe.SEFLG_SIDEREAL)!=0) {
      iflag |= Swe.SEFLG_NONUT;
      iflag = iflag & ~(Swe.SEFLG_JPLHOR | Swe.SEFLG_JPLHOR_APPROX);
    }

    if (epheflag == 0) {
      epheflag = Swe.SEFLG_DEFAULTEPH;
    }
    iflag = (iflag & ~Swe.SEFLG_EPHMASK) | epheflag;

    if (ipl == Swe.SE_OSCU_APOG || ipl == Swe.SE_TRUE_NODE 
        || ipl == Swe.SE_MEAN_APOG || ipl == Swe.SE_MEAN_NODE
        || ipl == Swe.SE_INTP_APOG || ipl == Swe.SE_INTP_PERG) {
      iflag = iflag & ~(Swe.SEFLG_JPLHOR | Swe.SEFLG_JPLHOR_APPROX);
    }
    if (ipl >= Swe.SE_FICT_OFFSET && ipl <= Swe.SE_FICT_MAX){
      iflag = iflag & ~(Swe.SEFLG_JPLHOR | Swe.SEFLG_JPLHOR_APPROX);
    }
    if ((iflag & Swe.SEFLG_JPLHOR) != 0) {
      if (this.swed.eop_dpsi_loaded <= 0 
         || ((tjd < this.swed.eop_tjd_beg || tjd > this.swed.eop_tjd_end)
         && jplhor_model != Swe.SEMOD_JPLHOR_EXTENDED_1800)) {

        switch (this.swed.eop_dpsi_loaded) {
          case 0:
            console.error("you did not call swe_set_jpl_file(); default to SEFLG_JPLHOR_APPROX");
            break;
          case -1:
            console.error("file eop_1962_today.txt not found; default to SEFLG_JPLHOR_APPROX");
            break;
          case -2:
            console.error("file eop_1962_today.txt corrupt; default to SEFLG_JPLHOR_APPROX");
            break;
          case -3:
            console.error("file eop_finals.txt corrupt; default to SEFLG_JPLHOR_APPROX");
            break;
        }
        iflag &= ~Swe.SEFLG_JPLHOR;
        iflag |= Swe.SEFLG_JPLHOR_APPROX;
      }
    }
    if ((iflag & Swe.SEFLG_JPLHOR) != 0)
      iflag |= Swe.SEFLG_ICRS;
    if ((iflag & Swe.SEFLG_JPLHOR_APPROX) != 0 && jplhora_model != Swe.SEMOD_JPLHORA_1)
      iflag |= Swe.SEFLG_ICRS;
    return iflag;
  }

  swe_fixstar_found(star_info, star, tjd, iflag, iflgsave, epheflag, xx) {
    let xpo = null;
    let ra_s, ra_pm, de_pm, ra, de, t, cosra, cosde, sinra, sinde;
    let ra_h, ra_m, de_d, de_m, de_s;
    let sde_d;
    let radv, parall, u;
    let x=new Array(0,0,0,0,0,0)
    let xxsv=new Array(0,0,0,0,0,0)
    let xobs=new Array(0,0,0,0,0,0)
    let retc;
    let pedp = this.swed.pldat[SwephData.SEI_EARTH];
    let psdp = this.swed.pldat[SwephData.SEI_SUNBARY];
    let oe = this.swed.oec2000;
    let n=0;
    let epoch = 0

    // JAVA: Grrr: zumindest cpos[2] muss keine Zahl sein, aber es FAENGT
    // moeglicherweise mit einer Zahl AN!!!
    ra_h = star_info[1];
    ra_m = star_info[2];
    ra_s = star_info[3];
    de_d = star_info[4];
    sde_d = star_info[4];
    de_m = star_info[5];
    de_s = star_info[6];
    ra_pm = star_info[7];
    de_pm = star_info[8];
    radv = star_info[9];
    parall = star_info[10];
    /* return trad. name, nomeclature name */
    // if (cpos[0].length() > Swe.SE_MAX_STNAME) {
    //   cpos[0]=cpos[0].substring(0,Swe.SE_MAX_STNAME);
    // }
    // if (cpos[1].length() > Swe.SE_MAX_STNAME-1) {
    //   cpos[1]=cpos[1].substring(0,Swe.SE_MAX_STNAME-1);
    // }
    // name of star:
    // star.setLength(0);
    // star.append(cpos[0]);
    // if (cpos[0].length() + cpos[1].length() + 1 < Swe.SE_MAX_STNAME - 1)
    //   star.append(","+cpos[1]);
    /****************************************
     * position and speed (equinox)
     ****************************************/
    /* ra and de in degrees */
    ra = (ra_s / 3600.0 + ra_m / 60.0 + ra_h) * 15.0;
    if (sde_d > 0) {
      de = de_s / 3600.0 + de_m / 60.0 + de_d;
    }
    else {
      de = -de_s / 3600.0 - de_m / 60.0 + de_d;
    }
    /* speed in ra and de, degrees per century */
    if (this.swed.is_old_starfile) {
      ra_pm = ra_pm * 15 / 3600.0;
      de_pm = de_pm / 3600.0;
    }
    else {
      ra_pm = ra_pm / 10.0 / 3600.0;
      de_pm = de_pm / 10.0 / 3600.0;
      parall /= 1000.0;
    }
    /* parallax, degrees */
    if (parall > 1) {
      parall = (1 / parall / 3600.0);
    }
    else {
      parall /= 3600;
    }
    /* radial velocity in AU per century */
    radv *= SwephData.KM_S_TO_AU_CTY;
    /*printf("ra=%.17f,de=%.17f,ma=%.17f,md=%.17f,pa=%.17f,rv=%.17f\n",ra,de,ra_pm,de_pm,parall,radv);*/
    /* radians */
    ra *= this.swed.DEGTORAD;
    de *= this.swed.DEGTORAD;
    ra_pm *= this.swed.DEGTORAD;
    de_pm *= this.swed.DEGTORAD;
    ra_pm /= Math.cos(de); /* catalogues give proper motion in RA as great circle */
    parall *= this.swed.DEGTORAD;
    x[0] = ra;
    x[1] = de;
    x[2] = 1;     /* -> unit vector */
    /* cartesian */
    this.sl.swi_polcart(x, x);
    /*space motion vector */
    cosra = Math.cos(ra);
    cosde = Math.cos(de);
    sinra = Math.sin(ra);
    sinde = Math.sin(de);
    x[3] = -ra_pm * cosde * sinra - de_pm * sinde * cosra
                          + radv * parall * cosde * cosra;
    x[4] = ra_pm * cosde * cosra - de_pm * sinde * sinra
                          + radv * parall * cosde * sinra;
    x[5] = de_pm * cosde + radv * parall * sinde;
    x[3] /= 36525;
    x[4] /= 36525;
    x[5] /= 36525;
    /******************************************
     * FK5
     ******************************************/
    /*if (epoch == 1950) {
      this.sl.swi_FK4_FK5(x, SwephData.B1950);
      this.sl.swi_precess(x, SwephData.B1950, 0, SwephData.J_TO_J2000);
      this.sl.swi_precess(x, 3, SwephData.B1950, 0, SwephData.J_TO_J2000);
    }*/ //use only ICRS
    /* FK5 to ICRF, if jpl ephemeris is referred to ICRF.
     * With data that are already ICRF, epoch = 0 */
    if (epoch != 0) {
      this.sl.swi_icrs2fk5(x, iflag, true); /* backward, i. e. to icrf */
      /* with ephemerides < DE403, we now convert to J2000 */
      if (this.swed.jpldenum < 403)
        this.sl.swi_bias(x, SwephData.J2000, Swe.SEFLG_SPEED, false);
    }

    /****************************************************
     * earth/sun
     * for parallax, light deflection, and aberration,
     ****************************************************/
    if ((iflag & Swe.SEFLG_BARYCTR)==0 &&
        ((iflag & Swe.SEFLG_HELCTR)==0 || (iflag & Swe.SEFLG_MOSEPH)==0)) {
      if ((retc = this.main_planet(tjd, SwephData.SEI_EARTH, epheflag, iflag)) != Swe.OK) {
        /*retc = ERR;
        goto return_err;*/
        iflag &= ~(Swe.SEFLG_TOPOCTR|Swe.SEFLG_HELCTR);
        /* on error, we provide barycentric position: */
        iflag |= Swe.SEFLG_BARYCTR | Swe.SEFLG_TRUEPOS | Swe.SEFLG_NOGDEFL;
        retc = iflag;
      } else {
        /* iflag (ephemeris bit) may have changed in main_planet() */
        iflag = this.swed.pldat[SwephData.SEI_EARTH].xflgs;
      }
    }
    /************************************
     * observer: geocenter or topocenter
     ************************************/
    /* if topocentric position is wanted  */
    if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
      if (this.swed.topd.teval != pedp.teval
        || this.swed.topd.teval == 0) {
        if (this.swi_get_observer(pedp.teval, iflag | Swe.SEFLG_NONUT, SwephData.DO_SAVE, xobs)!=
                                                                  Swe.OK) {
          return Swe.ERR;
        }
      } else {
        for (let i = 0; i <= 5; i++) {
          xobs[i] = this.swed.topd.xobs[i];
        }
      }
      /* barycentric position of observer */
      for (let i = 0; i <= 5; i++) {
        xobs[i] = xobs[i] + pedp.x[i];
      }
    }
    else if ((iflag & Swe.SEFLG_BARYCTR)==0 &&
        ((iflag & Swe.SEFLG_HELCTR)==0 || (iflag & Swe.SEFLG_MOSEPH)==0)) {
      /* barycentric position of geocenter */
      for (let i = 0; i <= 5; i++) {
        xobs[i] = pedp.x[i];
      }
    }
    /************************************
     * position and speed at tjd        *
     ************************************/
    if (epoch == 1950) {
      t= (tjd - SwephData.B1950);   /* days since 1950.0 */
    }
    else { /* epoch == 2000 */
      t= (tjd - SwephData.J2000);   /* days since 2000.0 */
    }
    /* for parallax */
    if ((iflag & Swe.SEFLG_HELCTR)!=0 &&
        (iflag & Swe.SEFLG_MOSEPH)!=0) {
      xpo = null;         /* no parallax, if moshier and heliocentric */
    }
    else if ((iflag & Swe.SEFLG_HELCTR)!=0) {
      xpo = psdp.x;
    }
    else if ((iflag & Swe.SEFLG_BARYCTR)!=0) {
      xpo = null;         /* no parallax, if barycentric */
    }
    else {
      xpo = xobs;
    }
    if (xpo == null) {
      for (let i = 0; i <= 2; i++) {
        x[i] += t * x[i+3];
      }
    }
    else {
      for (let i = 0; i <= 2; i++) {
        x[i] += t * x[i+3] - parall * xpo[i];
        x[i+3] -= parall * xpo[i+3];
      }
    }
    /************************************
     * relativistic deflection of light *
     ************************************/
    for (let i = 0; i <= 5; i++) {
      x[i] *= 10000;      /* great distance, to allow
                           * algorithm used with planets */
    }
    if ((iflag & Swe.SEFLG_TRUEPOS) == 0 &&
        (iflag & Swe.SEFLG_NOGDEFL) == 0) {
      this.swi_deflect_light(x, 0, 0, iflag & Swe.SEFLG_SPEED);
    }
    /**********************************
     * 'annual' aberration of light   *
     * speed is incorrect !!!         *
     **********************************/
    if ((iflag & Swe.SEFLG_TRUEPOS) == 0 &&
        (iflag & Swe.SEFLG_NOABERR) == 0) {
      this.swi_aberr_light(x, xpo, iflag & Swe.SEFLG_SPEED);
    }
    /* ICRS to J2000 */
    if ((iflag & Swe.SEFLG_ICRS) == 0 &&
        (this.swed.jpldenum >= 403 || (iflag & Swe.SEFLG_BARYCTR) != 0)) {
      this.sl.swi_bias(x, tjd, iflag, false);
    }/**/
    /* save J2000 coordinates; required for sidereal positions */
    for (let i = 0; i <= 5; i++) {
      xxsv[i] = x[i];
    }
    /************************************************
     * precession, equator 2000 -> equator of date *
     ************************************************/
    /*x[0] = -0.374018403; x[1] = -0.312548592; x[2] = -0.873168719;*/
    if ((iflag & Swe.SEFLG_J2000) == 0) {
      this.sl.swi_precess(x, tjd, iflag, SwephData.J2000_TO_J);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.swi_precess_speed(x, tjd, iflag, SwephData.J2000_TO_J);
      }
      oe = this.swed.oec;
    }
    else {
      oe = this.swed.oec2000;
    }
    /************************************************
     * nutation                                     *
     ************************************************/
    if ((iflag & Swe.SEFLG_NONUT) == 0) {
      this.swi_nutate(x, 0, 0, false);
    }

    /************************************************
     * unit vector (distance = 1)                   *
     ************************************************/
    u = Math.sqrt(this.sl.square_sum(x));
    for (let i = 0; i <= 5; i++) {
      x[i] /= u;
    }
    u = Math.sqrt(this.sl.square_sum(xxsv));
    for (let i = 0; i <= 5; i++) {
      xxsv[i] /= u;
    }
    /************************************************
     * set speed = 0, because not correct (aberration)
     ************************************************/
    for (let i = 3; i <= 5; i++) {
      x[i] = xxsv[i] = 0;
    }
    /************************************************
     * transformation to ecliptic.                  *
     * with sidereal calc. this will be overwritten *
     * afterwards.                                  *
     ************************************************/
    if ((iflag & Swe.SEFLG_EQUATORIAL) == 0) {
      this.sl.swi_coortrf2(x, x, oe.seps, oe.ceps);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.sl.swi_coortrf2(x, 3, x, 3, oe.seps, oe.ceps);
      }
      if ((iflag & Swe.SEFLG_NONUT) == 0) {
        this.sl.swi_coortrf2(x, x, this.swed.nut.snut, this.swed.nut.cnut);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.sl.swi_coortrf2(x, 3, x, 3, this.swed.nut.snut, this.swed.nut.cnut);
        }
      }
    }
    /************************************
     * sidereal positions               *
     ************************************/
    if ((iflag & Swe.SEFLG_SIDEREAL)!=0) {

      /* rigorous algorithm */
      if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_ECL_T0)!=0) {
        if (this.swi_trop_ra2sid_lon(xxsv, x, xxsv, iflag) != Swe.OK) {
          return Swe.ERR;
        }
        if ((iflag & Swe.SEFLG_EQUATORIAL)!=0) {
          for (let i = 0; i <= 5; i++) {
            x[i] = xxsv[i];
          }
        }
      /* project onto solar system equator */
      }
      else if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_SSY_PLANE)!=0) {
        if (this.swi_trop_ra2sid_lon_sosy(xxsv, x, xxsv, iflag) !=
                                                                Swe.OK) {
          return Swe.ERR;
        }
        if ((iflag & Swe.SEFLG_EQUATORIAL)!=0) {
          for (let i = 0; i <= 5; i++) {
            x[i] = xxsv[i];
          }
        }
      /* traditional algorithm */
      }
      else {
        this.sl.swi_cartpol_sp(x, x);
        x[0] -= this.swe_get_ayanamsa(tjd) * this.swed.DEGTORAD;
        this.sl.swi_polcart_sp(x, x);

      }
    }
    /************************************************
     * transformation to polar coordinates          *
     ************************************************/
    if ((iflag & Swe.SEFLG_XYZ) == 0) {
      this.sl.swi_cartpol_sp(x, x);
    }
    /**********************
     * radians to degrees *
     **********************/
    if ((iflag & Swe.SEFLG_RADIANS) == 0 &&
        (iflag & Swe.SEFLG_XYZ) == 0) {
      for (let i = 0; i < 2; i++) {
        x[i] *= this.swed.RADTODEG;
        x[i+3] *= this.swed.RADTODEG;
      }
    }
    for (let i = 0; i <= 5; i++) {
      xx[i] = x[i];
    }
    /* if no ephemeris has been specified, do not return chosen ephemeris */
    if ((iflgsave & Swe.SEFLG_EPHMASK) == 0) {
      iflag = iflag & ~Swe.SEFLG_DEFAULTEPH;
    }
    iflag = iflag & ~Swe.SEFLG_SPEED;
    return iflag;
  }

  swe_fixstar_error(xx, retc) {
    for (let i = 0; i <= 5; i++) {
      xx[i] = 0;
    }
    return retc;
  }

  /**********************************************************
   * get fixstar magnitude
   * parameters:
   * star         name of star or line number in star file
   *              (start from 1, don't count comment).
   *              If no error occurs, the name of the star is returned
   *              in the format trad_name, nomeclat_name
   *
   * mag          pointer to a double, for star magnitude
   * serr         error return string
  **********************************************************/
  /**
  * Returns the magnitude (brightness) of a fixstar.
  * @param star (Both input and output parameter.) Name of star
  *             or line number in star file (start from 1, don't
  *             count comment lines).<p>
  *             If no error occurs, the name of the star is returned
  *             in the format trad_name, nomeclat_name in this
  *             parameter.
  * @param mag  (Output parameter.) The magnitude of the star. The
  *             parameter has to be a double[1].
  * @param serr Buffer for error message on output
  * @return     Swe.OK. All errors will throw a
  *             SwissephException.
  */
  swe_fixstar_mag(star, mag) {
    mag[0] = Swe.FixStars[star][11];

    return Swe.OK;
  }

  swi_force_app_pos_etc() {
    var i;
    for (i = 0; i < SwephData.SEI_NPLANETS; i++) {
      this.swed.pldat[i].xflgs = -1;
    }
    for (i = 0; i < SwephData.SEI_NNODE_ETC; i++) {
      this.swed.nddat[i].xflgs = -1;
    }
    for (i = 0; i < Swe.SE_NPLANETS; i++) {
      this.swed.savedat[i].tsave = 0;
      this.swed.savedat[i].iflgsave = -1;
    }
  }

  swi_get_observer(tjd, iflag, do_save, xobs) {
    var i;
    var sidt, delt, tjd_ut, eps, nut, nutlo=new Array(2);
    var f = SwephData.EARTH_OBLATENESS;
    var re = SwephData.EARTH_RADIUS;
    var cosfi, sinfi, cc, ss, cosl, sinl, h;
    if (!this.swed.geopos_is_set) {
      console.error("geographic position has not been set");
      return Swe.ERR;
    }
    delt = this.sd.getDeltaT(tjd);
    tjd_ut = tjd - delt;
    if (this.swed.oec.teps == tjd && this.swed.nut.tnut == tjd) {
      eps = this.swed.oec.eps;
      nutlo[1] = this.swed.nut.nutlo[1];
      nutlo[0] = this.swed.nut.nutlo[0];
    } else {
      eps = this.sl.swi_epsiln(tjd, iflag);
      if ((iflag & Swe.SEFLG_NONUT)==0) {
        this.sl.swi_nutation(tjd, iflag, nutlo);
      }
    }
    if ((iflag & Swe.SEFLG_NONUT)!=0) {
      nut = 0;
    } else {
      eps += nutlo[1];
      nut = nutlo[0];
    }

    sidt = this.sl.swe_sidtime0(tjd_ut, eps, nut);
    sidt *= 15;   
    cosfi = Math.cos(this.swed.topd.geolat * this.swed.DEGTORAD);
    sinfi = Math.sin(this.swed.topd.geolat * this.swed.DEGTORAD);
    cc= 1 / Math.sqrt(cosfi * cosfi + (1-f) * (1-f) * sinfi * sinfi);
    ss= (1-f) * (1-f) * cc;
    /* neglect polar motion (displacement of a few meters), as long as 
     * we use the earth ellipsoid */
    /* ... */
    /* add sidereal time */
    cosl = Math.cos((this.swed.topd.geolon + sidt) * this.swed.DEGTORAD);
    sinl = Math.sin((this.swed.topd.geolon + sidt) * this.swed.DEGTORAD);
    h = this.swed.topd.geoalt;
    xobs[0] = (re * cc + h) * cosfi * cosl;
    xobs[1] = (re * cc + h) * cosfi * sinl;
    xobs[2] = (re * ss + h) * sinfi;
    /* polar coordinates */
    this.sl.swi_cartpol(xobs, xobs);
    /* speed */
    xobs[3] = SwephData.EARTH_ROT_SPEED;
    xobs[4] = xobs[5] = 0;
    this.sl.swi_polcart_sp(xobs, xobs);
    /* to AUNIT */
    for (i = 0; i <= 5; i++) {
      xobs[i] /= Swe.AUNIT;
    }
    /* subtract nutation, set backward flag */
    if ((iflag & Swe.SEFLG_NONUT)==0) {
      this.sl.swi_coortrf2(xobs, xobs, -this.swed.nut.snut, this.swed.nut.cnut);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.sl.swi_coortrf2(xobs, 3, xobs, 3, -this.swed.nut.snut, this.swed.nut.cnut);
      }
      this.swi_nutate(xobs, 0, iflag, true);
    }
    /* precess to J2000 */
    this.sl.swi_precess(xobs, tjd, iflag, SwephData.J_TO_J2000);
    if ((iflag & Swe.SEFLG_SPEED)!=0) {
      this.swi_precess_speed(xobs, tjd, iflag, SwephData.J_TO_J2000);
    }

    if (do_save) {
      for (i = 0; i <= 5; i++) {
        this.swed.topd.xobs[i] = xobs[i];
      }
      this.swed.topd.teval = tjd;
      this.swed.topd.tjd_ut = tjd_ut;  /* -> save area */
    }
    return Swe.OK;
  }

  /* Equation of Time
   *
   * The function returns the difference between
   * local apparent and local mean time in days.
   * E = LAT - LMT
   * Input variable tjd is UT.
   */
  /**
  * Returns the difference between local apparent and local mean time in
  * days. E = LAT - LMT<br>
  * <b>ATTENTION: This method possibly (re-)sets a global parameter used
  * in calculation of delta T. See SweDate.setGlobalTidalAcc(double).</b>
  * @param tjd_ut input date in julian days (UT)
  * @param E double[1], output value: the difference between the times
  * @param serr buffer for error message on output
  * @return Swe.ERR on error, Swe.OK else
  * @see SweDate#setGlobalTidalAcc(double)
  */
  swe_time_equ(tjd_ut, E) {
    var retval;
    var t, dt, x = new Array(6);
    var sidt = this.sl.swe_sidtime(tjd_ut);
    var iflag = Swe.SEFLG_EQUATORIAL;
    t = tjd_ut + 0.5;
    dt = t - Math.floor(t);
    sidt -= dt * 24;
    sidt *= 15;
    if ((retval = this.swe_calc_ut(tjd_ut, Swe.SE_SUN, iflag, x)) == Swe.ERR)
      return Swe.ERR;
    dt = this.sl.swe_degnorm(sidt - x[0] - 180);
    if (dt > 180)
      dt -= 360;
    dt *= 4;
    E[0] = dt / 1440.0;
    return Swe.OK;
  }

  swe_lmt_to_lat(tjd_lmt, geolon, tjd_lat) {
    var retval;
    var E = new Array(1), tjd_lmt0;
    tjd_lmt0 = tjd_lmt - geolon / 360.0;
    retval = this.swe_time_equ(tjd_lmt0, E);
    tjd_lat[0] = tjd_lmt + E[0];
    return retval;
  }

  swe_lat_to_lmt(tjd_lat, geolon, tjd_lmt) {
    var retval;
    var E = new Array(1), tjd_lmt0;
    tjd_lmt0 = tjd_lat - geolon / 360.0;
    retval = this.swe_time_equ(tjd_lmt0, E);
    /* iteration */
    retval = this.swe_time_equ(tjd_lmt0 - E[0], E);
    retval = this.swe_time_equ(tjd_lmt0 - E[0], E);
    tjd_lmt[0] = tjd_lat - E[0];
    return retval;
  }

  dot_prod(x, y, yOffs) {
    if(yOffs === undefined){
      return x[0]*y[0]+x[1]*y[1]+x[2]*y[2];
    }

    return x[0]*y[yOffs]+x[1]*y[1+yOffs]+x[2]*y[2+yOffs];
  }

};
