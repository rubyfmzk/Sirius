import { Swe } from "./Swe"
import { SwephData } from "./SwephData"
import { SwissData } from "./SwissData"
import { Swemmoon } from "./Swemmoon"
import { SwemptabMer } from "./SwemptabMer"
import { SwemptabVen } from "./SwemptabVen"
import { SwemptabEar } from "./SwemptabEar"
import { SwemptabMar } from "./SwemptabMar"
import { SwemptabJup } from "./SwemptabJup"
import { SwemptabSat } from "./SwemptabSat"
import { SwemptabUra } from "./SwemptabUra"
import { SwemptabNep } from "./SwemptabNep"
import { SwemptabPlu } from "./SwemptabPlu"

export class SwephMosh{
  constructor(sl, sw, swed){
    this.sl    = sl;
    this.sw    = sw;
    this.swed  = swed;
    if (this.sl   ==null) { this.sl   =new SwissLib(); }
    if (this.sw   ==null) { this.sw   =new SwissEph(); }
    if (this.swed ==null) { this.swed =SwissData; }
    this.sm    = new Swemmoon(this.swed, this.sl);

    this.TIMESCALE=3652500.0;
    this.FICT_GEO=1;
    this.pnoint2msh = [2, 2, 0, 1, 3, 4, 5, 6, 7, 8];

    /* From Simon et al (1994)  */
    this.freqs = [
    /* Arc sec per 10000 Julian years.  */
      53810162868.8982,
      21066413643.3548,
      12959774228.3429,
      6890507749.3988,
      1092566037.7991,
      439960985.5372,
      154248119.3933,
      78655032.0744,
      52272245.1795
    ];

    this.phases = [
    /* Arc sec.  */
      252.25090552 * 3600.,
      181.97980085 * 3600.,
      100.46645683 * 3600.,
      355.43299958 * 3600.,
      34.35151874 * 3600.,
      50.07744430 * 3600.,
      314.05500511 * 3600.,
      304.34866548 * 3600.,
      860492.1546,
    ];

    this.ss = new Array(9);
    for(var i=0; i<9; i++){
      this.ss[i] = new Array(24);
    }
    this.cc = new Array(9);
    for(var i=0; i<9; i++){
      this.cc[i] = new Array(24);
    }

    this.plan_oscu_elem = [

      [SwephData.J1900, SwephData.J1900, 163.7409, 40.99837, 0.00460, 171.4333, 129.8325, 1.0833],/* Cupido Neely */
      [SwephData.J1900, SwephData.J1900,  27.6496, 50.66744, 0.00245, 148.1796, 161.3339, 1.0500],/* Hades Neely */
      [SwephData.J1900, SwephData.J1900, 165.1232, 59.21436, 0.00120, 299.0440,   0.0000, 0.0000],/* Zeus Neely */
      [SwephData.J1900, SwephData.J1900, 169.0193, 64.81960, 0.00305, 208.8801,   0.0000, 0.0000],/* Kronos Neely */
      [SwephData.J1900, SwephData.J1900, 138.0533, 70.29949, 0.00000,   0.0000,   0.0000, 0.0000],/* Apollon Neely */
      [SwephData.J1900, SwephData.J1900, 351.3350, 73.62765, 0.00000,   0.0000,   0.0000, 0.0000],/* Admetos Neely */
      [SwephData.J1900, SwephData.J1900,  55.8983, 77.25568, 0.00000,   0.0000,   0.0000, 0.0000],/* Vulcanus Neely */
      [SwephData.J1900, SwephData.J1900, 165.5163, 83.66907, 0.00000,   0.0000,   0.0000, 0.0000],/* Poseidon Neely */
      /* Isis-Transpluto; elements from "Die Sterne" 3/1952, p. 70ff.
       * Strubell does not give an equinox. 1945 is taken to best reproduce
       * ASTRON ephemeris. (This is a strange choice, though.)
       * The epoch is 1772.76. The year is understood to have 366 days.
       * The fraction is counted from 1 Jan. 1772 */
      [2368547.66, 2431456.5, 0.0, 77.775, 0.3, 0.7, 0, 0],
      /* Nibiru, elements from Christian Woeltge, Hannover */
      [1856113.380954, 1856113.380954, 0.0, 234.8921, 0.981092, 103.966, -44.567, 158.708],
      /* Harrington, elements from Astronomical Journal 96(4), Oct. 1988 */
      [2374696.5, SwephData.J2000, 0.0, 101.2, 0.411, 208.5, 275.4, 32.4],
      /* Leverrier's Neptune,
            according to W.G. Hoyt, "Planets X and Pluto", Tucson 1980, p. 63 */
      [2395662.5, 2395662.5, 34.05, 36.15, 0.10761, 284.75, 0, 0],
      /* Adam's Neptune */
      [2395662.5, 2395662.5, 24.28, 37.25, 0.12062, 299.11, 0, 0],
      /* Lowell's Pluto */
      [2425977.5, 2425977.5, 281, 43.0, 0.202, 204.9, 0, 0],
      /* Pickering's Pluto */
      [2425977.5, 2425977.5, 48.95, 55.1, 0.31, 280.1, 100, 15], /**/
    ];

    this.mer = new SwemptabMer;
    this.ven = new SwemptabVen;
    this.ear = new SwemptabEar;
    this.mar = new SwemptabMar;
    this.jup = new SwemptabJup;
    this.sat = new SwemptabSat;
    this.ura = new SwemptabUra;
    this.nep = new SwemptabNep;
    this.plu = new SwemptabPlu;

    this.plan_fict_nam = ["Cupido", "Hades", "Zeus", "Kronos",
     "Apollon", "Admetos", "Vulkanus", "Poseidon",
     "Isis-Transpluto", "Nibiru", "Harrington",
     "Leverrier", "Adams",
     "Lowell", "Pickering"];

    this.planets = [
      this.mer.mer404,
      this.ven.ven404,
      this.ear.ear404,
      this.mar.mar404,
      this.jup.jup404,
      this.sat.sat404,
      this.ura.ura404,
      this.nep.nep404,
      this.plu.plu404,
    ];
  }


  swi_moshplan2 (J, iplm, pobj) {
    var i, j, k, m, k1, ip, np, nt;
    var p;
    var pOff=0;
    var pl, pb, pr;
    var plOff=0, pbOff=0, prOff=0;
    var su, cu, sv, cv, T;
    var t, sl, sb, sr;
    var plan = this.planets[iplm];

    T = (J - SwephData.J2000) / this.TIMESCALE;
    /* Calculate sin( i*MM ), etc. for needed multiple angles.  */
    for (i = 0; i < 9; i++) {
      if ((j = plan.max_harmonic[i]) > 0) {
        sr = (this.sm.mods3600 (this.freqs[i] * T) + this.phases[i]) * SwephData.STR;
        this.sscc (i, sr, j);
      }
    }

    /* Point to start of table of arguments. */
    p = plan.arg_tbl;
    /* Point to tabulated cosine and sine amplitudes.  */
    pl = plan.lon_tbl;
    pb = plan.lat_tbl;
    pr = plan.rad_tbl;
    sl = 0.0;
    sb = 0.0;
    sr = 0.0;

    while(true){
      np = p[pOff++];
      if (np < 0) {
        break;
      }
      if (np == 0) {                       /* It is a polynomial term.  */
          nt = p[pOff++];
          /* Longitude polynomial. */
          cu = pl[plOff++];
          for (ip = 0; ip < nt; ip++)
            {
              cu = cu * T + pl[plOff++];
            }
          sl +=  this.sm.mods3600 (cu);
          /* Latitude polynomial. */
          cu = pb[pbOff++];
          for (ip = 0; ip < nt; ip++)
            {
              cu = cu * T + pb[pbOff++];
            }
          sb += cu;
          /* Radius polynomial. */
          cu = pr[prOff++];
          for (ip = 0; ip < nt; ip++)
            {
              cu = cu * T + pr[prOff++];
            }
          sr += cu;
          continue;
        }
      k1 = 0;
      cv = 0.0;
      sv = 0.0;
      for (ip = 0; ip < np; ip++)
        {
          /* What harmonic.  */
          j = p[pOff++];
          /* Which planet.  */
          m = p[pOff++] - 1;
          if (j!=0) {
              k = j;
              if (j < 0) {
                k = -k;
              }
              k -= 1;
              su = this.ss[m][k];    /* sin(k*angle) */
              if (j < 0) {
                su = -su;
              }
              cu = this.cc[m][k];
              if (k1 == 0) {               /* set first angle */
                  sv = su;
                  cv = cu;
                  k1 = 1;
                }
              else
                {               /* combine angles */
                  t = su * cv + cu * sv;
                  cv = cu * cv - su * sv;
                  sv = t;
                }
            }
        }
      /* Highest power of T.  */
      nt = p[pOff++];
      /* Longitude. */
      cu = pl[plOff++];
      su = pl[plOff++];
      for (ip = 0; ip < nt; ip++)
        {
          cu = cu * T + pl[plOff++];
          su = su * T + pl[plOff++];
        }
      sl += cu * cv + su * sv;
      /* Latitiude. */
      cu = pb[pbOff++];
      su = pb[pbOff++];
      for (ip = 0; ip < nt; ip++)
        {
          cu = cu * T + pb[pbOff++];
          su = su * T + pb[pbOff++];
        }
      sb += cu * cv + su * sv;
      /* Radius. */
      cu = pr[prOff++];
      su = pr[prOff++];
      for (ip = 0; ip < nt; ip++)
        {
          cu = cu * T + pr[prOff++];
          su = su * T + pr[prOff++];
        }
      sr += cu * cv + su * sv;
    }
    pobj[0] = SwephData.STR * sl;
    pobj[1] = SwephData.STR * sb;
    pobj[2] = SwephData.STR * plan.distance * sr + plan.distance;
    return Swe.OK;
  }

  /* Moshier ephemeris.
   * computes heliocentric cartesian equatorial coordinates of
   * equinox 2000
   * for earth and a planet
   * tjd          julian day
   * ipli         internal SWEPH planet number
   * xp           array of 6 doubles for planet's position and speed
   * xe                                  earth's
   * serr         error string
   */
  swi_moshplan(tjd, ipli, do_save, xpret, xeret) {
    var i;
    var do_earth = false;
    var dx=[0,0,0];
    var x2=[0,0,0];
    var xxe=[0,0,0,0,0,0];
    var xxp=[0,0,0,0,0,0];
    var xp, xe;
    var dt;
    var s;
    var iplm = this.pnoint2msh[ipli];
    var pdp = this.swed.pldat[ipli];
    var pedp = this.swed.pldat[SwephData.SEI_EARTH];
    var seps2000 = this.swed.oec2000.seps;
    var ceps2000 = this.swed.oec2000.ceps;

    if (do_save) {
      xp = pdp.x;
      xe = pedp.x;
    } else {
      xp = xxp;
      xe = xxe;
    }
    if (do_save || ipli == SwephData.SEI_EARTH || xeret != null) {
      do_earth = true;
    }
    /* tjd beyond ephemeris limits, give some margin for spped at edge */
    if (tjd < SwephData.MOSHPLEPH_START - 0.3 ||
        tjd > SwephData.MOSHPLEPH_END + 0.3) {

      s="jd "+tjd+" outside Moshier planet range "+
        SwephData.MOSHPLEPH_START+" .. "+
        SwephData.MOSHPLEPH_END+" ";
      console.error(s);

      return(Swe.ERR);
    }

    /* earth, for geocentric position */
    if (do_earth) {
      if (tjd == pedp.teval && pedp.iephe == Swe.SEFLG_MOSEPH) {
        xe = pedp.x;
      } else {
        /* emb */
        this.swi_moshplan2(tjd, this.pnoint2msh[SwephData.SEI_EMB], xe); /* emb hel. ecl. 2000 polar */
        this.sl.swi_polcart(xe, xe);                        /* to cartesian */
        this.sl.swi_coortrf2(xe, xe, -seps2000, ceps2000);/* and equator 2000 */
        this.embofs_mosh(tjd, xe);               /* emb -> earth */
        if (do_save) {
          pedp.teval = tjd;
          pedp.xflgs = -1;
          pedp.iephe = Swe.SEFLG_MOSEPH;
        }
        /* one more position for speed. */
        this.swi_moshplan2(tjd - SwephData.PLAN_SPEED_INTV, this.pnoint2msh[SwephData.SEI_EMB], x2);
        this.sl.swi_polcart(x2, x2);
        this.sl.swi_coortrf2(x2, x2, -seps2000, ceps2000);
        this.embofs_mosh(tjd - SwephData.PLAN_SPEED_INTV, x2);/**/
        for (i = 0; i <= 2; i++)
          dx[i] = (xe[i] - x2[i]) / SwephData.PLAN_SPEED_INTV;
        /* store speed */
        for (i = 0; i <= 2; i++) {
          xe[i+3] = dx[i];
        }
      }
      if (xeret != null) {
        for (i = 0; i <= 5; i++) {
          xeret[i] = xe[i];
        }
      }
    }

    /* earth is the planet wanted */
    if (ipli == SwephData.SEI_EARTH) {
      xp = xe;
    } else {

      /* other planet */
      /* if planet has already been computed, return */
      if (tjd == pdp.teval && pdp.iephe == Swe.SEFLG_MOSEPH) {
        xp = pdp.x;
      } else {
        this.swi_moshplan2(tjd, iplm, xp);
        this.sl.swi_polcart(xp, xp);
        this.sl.swi_coortrf2(xp, xp, -seps2000, ceps2000);
        if (do_save) {
          pdp.teval = tjd;/**/
          pdp.xflgs = -1;
          pdp.iephe = Swe.SEFLG_MOSEPH;
        }

        dt = SwephData.PLAN_SPEED_INTV;
        this.swi_moshplan2(tjd - dt, iplm, x2);
        this.sl.swi_polcart(x2, x2);
        this.sl.swi_coortrf2(x2, x2, -seps2000, ceps2000);

        for (i = 0; i <= 2; i++)
          dx[i] = (xp[i] - x2[i]) / dt;
        /* store speed */
        for (i = 0; i <= 2; i++) {
          xp[i+3] = dx[i];
        }
      }
      if (xpret != null) {
        for (i = 0; i <= 5; i++) {
          xpret[i] = xp[i];
        }
      }
    }
    return(Swe.OK);
  }

  /* Prepare lookup table of sin and cos ( i*Lj )
   * for required multiple angles
   */
  sscc (k, arg, n) {
    
    var cu, su, cv, sv, s;
    var i;

    su = Math.sin (arg);
    cu = Math.cos (arg);
    this.ss[k][0] = su;                /* sin(L) */
    this.cc[k][0] = cu;                /* cos(L) */
    sv = 2.0 * su * cu;
    cv = cu * cu - su * su;
    this.ss[k][1] = sv;                /* sin(2L) */
    this.cc[k][1] = cv;
    for (i = 2; i < n; i++)
      {
        s = su * cv + cu * sv;
        cv = cu * cv - su * sv;
        sv = s;
        this.ss[k][i] = sv;            /* sin( i+1 L ) */
        this.cc[k][i] = cv;
      }
  }

  /* Adjust position from Earth-Moon barycenter to Earth
   *
   * J = Julian day number
   * xemb = rectangular equatorial coordinates of Earth
   */
  embofs_mosh(tjd, xemb) {
    
    var T, M, a, L, B, p;
    var smp, cmp, s2mp, c2mp, s2d, c2d, sf, cf;
    var s2f, sx, cx, xyz=new Array(6);
    var seps = this.swed.oec.seps;
    var ceps = this.swed.oec.ceps;
    var i;
    /* Short series for position of the Moon
     */
    T = (tjd-SwephData.J1900)/36525.0;
    /* Mean anomaly of moon (MP) */
    a = this.sl.swe_degnorm(((1.44e-5*T + 0.009192)*T + 477198.8491)*T + 296.104608);
    a *= this.swed.DEGTORAD;
    smp = Math.sin(a);
    cmp = Math.cos(a);
    s2mp = 2.0*smp*cmp;           /* sin(2MP) */
    c2mp = cmp*cmp - smp*smp;     /* cos(2MP) */
    /* Mean elongation of moon (D) */
    a = this.sl.swe_degnorm(((1.9e-6*T - 0.001436)*T + 445267.1142)*T + 350.737486);
    a  = 2.0 * this.swed.DEGTORAD * a;
    s2d = Math.sin(a);
    c2d = Math.cos(a);
    /* Mean distance of moon from its ascending node (F) */
    a = this.sl.swe_degnorm((( -3.e-7*T - 0.003211)*T + 483202.0251)*T + 11.250889);
    a  *= this.swed.DEGTORAD;
    sf = Math.sin(a);
    cf = Math.cos(a);
    s2f = 2.0*sf*cf;      /* sin(2F) */
    sx = s2d*cmp - c2d*smp;       /* sin(2D - MP) */
    cx = c2d*cmp + s2d*smp;       /* cos(2D - MP) */
    /* Mean longitude of moon (LP) */
    L = ((1.9e-6*T - 0.001133)*T + 481267.8831)*T + 270.434164;
    /* Mean anomaly of sun (M) */
    M = this.sl.swe_degnorm((( -3.3e-6*T - 1.50e-4)*T + 35999.0498)*T + 358.475833);
    /* Ecliptic longitude of the moon */
    L =   L
          + 6.288750*smp
          + 1.274018*sx
          + 0.658309*s2d
          + 0.213616*s2mp
          - 0.185596*Math.sin( this.swed.DEGTORAD * M )
          - 0.114336*s2f;
    /* Ecliptic latitude of the moon */
    a = smp*cf;
    sx = cmp*sf;
    B =     5.128189*sf
          + 0.280606*(a+sx)               /* sin(MP+F) */
          + 0.277693*(a-sx)               /* sin(MP-F) */
          + 0.173238*(s2d*cf - c2d*sf);   /* sin(2D-F) */
    B *= this.swed.DEGTORAD;
    /* Parallax of the moon */
    p =    0.950724
          +0.051818*cmp
          +0.009531*cx
          +0.007843*c2d
          +0.002824*c2mp;
    p *= this.swed.DEGTORAD;
    /* Elongation of Moon from Sun
     */
    L = this.sl.swe_degnorm(L);
    L *= this.swed.DEGTORAD;
    /* Distance in au */
    a = 4.263523e-5/Math.sin(p);
    /* Convert to rectangular ecliptic coordinates */
    xyz[0] = L;
    xyz[1] = B;
    xyz[2] = a;
    this.sl.swi_polcart(xyz, xyz);
    /* Convert to equatorial */
    this.sl.swi_coortrf2(xyz, xyz, -seps, ceps);
    /* Precess to equinox of J2000.0 */
    this.sl.swi_precess(xyz, tjd, 0, SwephData.J_TO_J2000);/**/
    /* now emb -> earth */
    for (i = 0; i <= 2; i++)
      xemb[i] -= xyz[i] / (SwephData.EARTH_MOON_MRAT + 1.0);
  }

  swi_get_fict_name(ipl, snam) {
    if (snam==null) { snam=""; }
    var sbnam=new StringBuffer(snam);
    if (this.read_elements_file(ipl, 0, null, null,
         null, null, null, null, null, null,
         sbnam, null, null) == Swe.ERR) {
      return "name not found";
    }
    return sbnam.toString();
  }

  /* computes a planet from osculating elements *
   * tjd          julian day
   * ipl          body number
   * ipli         body number in planetary data structure
   * iflag        flags
   */
  swi_osc_el_plan(tjd, xp, ipl, ipli, xearth, xsun) {
    var pqr = new Array(9);
    var x = new Array(6);
    var eps, K, fac, rho, cose, sine;
    var alpha, beta, zeta, sigma, M2, Msgn, M_180_or_0;
    var tjd0=new DblObj();
    var tequ=new DblObj();
    var mano=new DblObj();
    var sema=new DblObj();
    var ecce=new DblObj();
    var parg=new DblObj();
    var node=new DblObj();
    var incl=new DblObj();
    var dmot;
    var cosnode, sinnode, cosincl, sinincl, cosparg, sinparg;
    var M, E;
    var pedp = this.swed.pldat[SwephData.SEI_EARTH];
    var pdp = this.swed.pldat[ipli];
    var fict_ifl = new IntObj(); fict_ifl.val = 0;
    var i;
    /* orbital elements, either from file or, if file not found,
     * from above built-in set
     */
    if (this.read_elements_file(ipl, tjd, tjd0, tequ,
         mano, sema, ecce, parg, node, incl,
         null, fict_ifl) == Swe.ERR) {
      return Swe.ERR;
    }
    dmot = 0.9856076686 * this.swed.DEGTORAD / sema.val / Math.sqrt(sema.val);
                                                            /* daily motion */
    if ((fict_ifl.val & FICT_GEO) != 0) {
      dmot /= Math.sqrt(SwephData.SUN_EARTH_MRAT);
    }
    cosnode = Math.cos(node.val);
    sinnode = Math.sin(node.val);
    cosincl = Math.cos(incl.val);
    sinincl = Math.sin(incl.val);
    cosparg = Math.cos(parg.val);
    sinparg = Math.sin(parg.val);
    /* Gaussian vector */
    pqr[0] = cosparg * cosnode - sinparg * cosincl * sinnode;
    pqr[1] = -sinparg * cosnode - cosparg * cosincl * sinnode;
    pqr[2] = sinincl * sinnode;
    pqr[3] = cosparg * sinnode + sinparg * cosincl * cosnode;
    pqr[4] = -sinparg * sinnode + cosparg * cosincl * cosnode;
    pqr[5] = -sinincl * cosnode;
    pqr[6] = sinparg * sinincl;
    pqr[7] = cosparg * sinincl;
    pqr[8] = cosincl;
    /* Kepler problem */
    E = M = this.sl.swi_mod2PI(mano.val + (tjd - tjd0.val) * dmot); /* mean anomaly of date*/
    /* better E for very high eccentricity and small M */
    if (ecce.val > 0.975) {
      M2 = M * this.swed.RADTODEG;
      if (M2 > 150 && M2 < 210) {
        M2 -= 180;
        M_180_or_0 = 180;
      } else
        M_180_or_0 = 0;
      if (M2 > 330) {
        M2 -= 360;
      }
      if (M2 < 0) {
        M2 = -M2;
        Msgn = -1;
      } else {
        Msgn = 1;
      }
      if (M2 < 30) {
        M2 *= this.swed.DEGTORAD;
        alpha = (1 - ecce.val) / (4 * ecce.val + 0.5);
        beta = M2 / (8 * ecce.val + 1);
        zeta = Math.pow(beta + Math.sqrt(beta * beta + alpha * alpha), 1/3);
        sigma = zeta - alpha / 2;
        sigma = sigma - 0.078 * sigma * sigma * sigma * sigma * sigma / (1 + ecce.val);
        E = Msgn * (M2 + ecce.val * (3 * sigma - 4 * sigma * sigma * sigma))
                          + M_180_or_0;
      }
    }
    E = this.sl.swi_kepler(E, M, ecce.val);
    /* position and speed, referred to orbital plane */
    if ((fict_ifl.val & FICT_GEO) != 0) {
      K = SwephData.KGAUSS_GEO / Math.sqrt(sema.val); 
    } else {
      K = SwephData.KGAUSS / Math.sqrt(sema.val);
    }
    cose = Math.cos(E);
    sine = Math.sin(E);
    fac = Math.sqrt((1 - ecce.val) * (1 + ecce.val));
    rho = 1 - ecce.val * cose;
    x[0] = sema.val * (cose - ecce.val);
    x[1] = sema.val * fac * sine;
    x[3] = -K * sine / rho;
    x[4] = K * fac * cose / rho;
    /* transformation to ecliptic */
    xp[0] = pqr[0] * x[0] + pqr[1] * x[1];
    xp[1] = pqr[3] * x[0] + pqr[4] * x[1];
    xp[2] = pqr[6] * x[0] + pqr[7] * x[1];
    xp[3] = pqr[0] * x[3] + pqr[1] * x[4];
    xp[4] = pqr[3] * x[3] + pqr[4] * x[4];
    xp[5] = pqr[6] * x[3] + pqr[7] * x[4];
    /* transformation to equator */
    eps = this.sl.swi_epsiln(tequ.val, 0);
    this.sl.swi_coortrf(xp, xp, -eps);
    this.sl.swi_coortrf(xp, 3, xp, 3, -eps);
    /* precess to J2000 */
    if (tequ.val != SwephData.J2000) {
      this.sl.swi_precess(xp, tequ.val, 0, SwephData.J_TO_J2000);
      this.sl.swi_precess(xp, 3, tequ.val, 0, SwephData.J_TO_J2000);
    }
    /* to solar system barycentre */
    if ((fict_ifl.val & FICT_GEO) != 0) {
      for (i = 0; i <= 5; i++) {
        xp[i] += xearth[i];
      }
    } else {
      for (i = 0; i <= 5; i++) {    
        xp[i] += xsun[i];
      }
    }
    if (pdp.x == xp) {
      pdp.teval = tjd;   /* for precession! */
      pdp.iephe = pedp.iephe;
    }
    return Swe.OK;
  }

  /* note: input parameter tjd is required for T terms in elements */
  read_elements_file(ipl, tjd, tjd0, tequ,
                                 mano, sema, ecce,
                                 parg, node, incl,
                                 pname, fict_ifl) {
    var i, iline, iplan, retc, ncpos;
    var s, sp;
    var spIdx=0;
    var elem_found = false;
    var tt = 0;
    /* file does not exist, use built-in bodies */
    if (ipl >= Swe.SE_NFICT_ELEM) {
      return Swe.ERR;
    }
    if (tjd0 != null) {
      tjd0.val = this.plan_oscu_elem[ipl][0];                   /* epoch */
    }
    if (tequ != null) {
      tequ.val = this.plan_oscu_elem[ipl][1];                   /* equinox */
    }
    if (mano != null) {
      mano.val = this.plan_oscu_elem[ipl][2] * this.swed.DEGTORAD; /* mean anomaly */
    }
    if (sema != null) {
      sema.val = this.plan_oscu_elem[ipl][3];                   /* semi-axis */
    }
    if (ecce != null) {
      ecce.val = this.plan_oscu_elem[ipl][4];                   /* eccentricity */
    }
    if (parg != null) {
      parg.val = this.plan_oscu_elem[ipl][5] * this.swed.DEGTORAD; /* arg. of peri. */
    }
    if (node != null) {
      node.val = this.plan_oscu_elem[ipl][6] * this.swed.DEGTORAD;  /* asc. node */
    }
    if (incl != null) {
      incl.val = this.plan_oscu_elem[ipl][7] * this.swed.DEGTORAD; /* inclination*/
    }
    if (pname != null) {
      pname.setLength(0);
      pname.append(this.plan_fict_nam[ipl]);
    }
    return Swe.OK;
  }

  check_t_terms(t, sinp, doutp) {
    var i, isgn = 1, z;
    var retc = 0;
    var spidx;
    var tt = new Array(5); 
    var fac;
    tt[0] = t / 36525;
    tt[1] = tt[0];
    tt[2] = tt[1] * tt[1];
    tt[3] = tt[2] * tt[1];
    tt[4] = tt[3] * tt[1];
    if (sinp.indexOf('+') + sinp.indexOf('-') > -2) {
      retc = 1; /* with additional terms */
    }
    spidx=0;
    doutp.val = 0;
    fac = 1;
    z = 0;
    while (true) {
      while(spidx<sinp.length() &&
            (sinp.charAt(spidx)==' ' || sinp.charAt(spidx)=='\t')) {
        spidx++;
      }
      if (spidx==sinp.length() ||
          sinp.charAt(spidx)=='+' || sinp.charAt(spidx)=='-') {
        if (z > 0) {
          doutp.val += fac;
        }
        isgn = 1;
        if (spidx!=sinp.length() && sinp.charAt(spidx) == '-') {
          isgn = -1;
        }
        fac = 1 * isgn;
        if (spidx==sinp.length()) {
          return retc;
        }
        spidx++;
      } else {
        while(spidx<sinp.length() &&
              (sinp.charAt(spidx)=='*' || sinp.charAt(spidx)==' '
              || sinp.charAt(spidx)=='\t')) {
          spidx++;
        }
        if (spidx<sinp.length() &&
            (sinp.charAt(spidx)=='t' || sinp.charAt(spidx)=='T')) {
                /* a T */
          spidx++;
          if (spidx<sinp.length() &&
              (sinp.charAt(spidx)=='+' || sinp.charAt(spidx)=='-')) {
            fac *= tt[0];
          } else if ((i = SwissLib.atoi(sinp.substring(Math.min(sinp.length(),spidx)))) <= 4 && i >= 0) {
            fac *= tt[i];
          }
        } else {
          /* a number */
          var db=SwissLib.atof(sinp.substring(spidx));
          if (db!=0 || sinp.charAt(spidx)=='0') {
            fac *= db;
          }
        }
        while (spidx<sinp.length() &&
               (Character.isDigit(sinp.charAt(spidx)) ||
                sinp.charAt(spidx)=='.'))
          spidx++;
      }
      z++;
    }
  }
}
