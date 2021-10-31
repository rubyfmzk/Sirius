/*
* This class contains many constants for internal use only.
* It does not need to be instantiated.
*/
import { Swe } from "./Swe"

export const SwephData = {};

SwephData.PNOINT2JPL = [
  Swe.J_EARTH,
  Swe.J_MOON,
  Swe.J_MERCURY,
  Swe.J_VENUS,
  Swe.J_MARS,
  Swe.J_JUPITER,
  Swe.J_SATURN, 
  Swe.J_URANUS,
  Swe.J_NEPTUNE,
  Swe.J_PLUTO,
  Swe.J_SUN
  ];
SwephData.pnoint2jpl = SwephData.PNOINT2JPL;

/* planetary radii in meters */
SwephData.NDIAM = (Swe.SE_VESTA + 1);
SwephData.pla_diam = [1392000000.0, /* Sun */
                         3476300.0, /* Moon */
                         2439000.0 * 2, /* Mercury */
                         6052000.0 * 2, /* Venus */
                         3397200.0 * 2, /* Mars */
                        71398000.0 * 2, /* Jupiter */
                        60000000.0 * 2, /* Saturn */
                        25400000.0 * 2, /* Uranus */
                        24300000.0 * 2, /* Neptune */
                         2500000.0 * 2, /* Pluto */
                         0, 0, 0, 0,    /* nodes and apogees */
                         6378140.0 * 2, /* Earth */
                               0.0, /* Chiron */
                               0.0, /* Pholus */
                          913000.0, /* Ceres */
                          523000.0, /* Pallas */
                          244000.0, /* Juno */
                          501000.0, /* Vesta */
                      ];

SwephData.J2000 = 2451545.0;        // 2000 January 1.5
SwephData.B1950 = 2433282.42345905; // 1950 January 0.923
SwephData.J1900 = 2415020.0;        // 1900 January 0.5

SwephData.MPC_CERES = 1;
SwephData.MPC_PALLAS = 2;
SwephData.MPC_JUNO = 3;
SwephData.MPC_VESTA = 4;
SwephData.MPC_CHIRON = 2060;
SwephData.MPC_PHOLUS = 5145;

/* Ayanamsas 
 * For each ayanamsa, there are two values:
 * t0       epoch of ayanamsa, TDT (ET)
 * ayan_t0  ayanamsa value at epoch
 */

SwephData.AyaInit = function(t0, ayan_t0){
  this.t0=t0;
  this.ayan_t0=ayan_t0;
}
SwephData.ayanamsa = [
  {t0: 2433282.5, ayan_t0: 24.042044444}, /* 0: Fagan/Bradley (Default) */

  {t0: 2435553.5, ayan_t0: 23.250182778 - 0.004660222},   /* 1: Lahiri (derived from:
                         * Indian Astronomical Ephemeris 1989, p. 556;
                         * the subtracted value is nutation) */
  {t0: SwephData.J1900, ayan_t0: 360 - 333.58695},   /* 2: De Luce (Robert Hand) */
  {t0: SwephData.J1900, ayan_t0: 360 - 338.98556},   /* 3: Raman (Robert Hand) */
  {t0: SwephData.J1900, ayan_t0: 360 - 341.33904},   /* 4: Ushashashi (Robert Hand) */
  {t0: SwephData.J1900, ayan_t0: 360 - 337.636111},  /* 5: Krishnamurti (Robert Hand) */
  {t0: SwephData.J1900, ayan_t0: 360 - 333.0369024}, /* 6: Djwhal Khool; (Graham Dawson)
                                          *    Aquarius entered on 1 July 2117 */
  {t0: SwephData.J1900, ayan_t0: 360 - 338.917778},  /* 7: Yukteshwar; (David Cochrane) */
  {t0: SwephData.J1900, ayan_t0: 360 - 338.634444},  /* 8: JN Bhasin; (David Cochrane) */
  {t0: 1684532.5, ayan_t0: -3.36667},      /* 9: Babylonian, Kugler 1 */
  {t0: 1684532.5, ayan_t0: -4.76667},      /*10: Babylonian, Kugler 2 */
  {t0: 1684532.5, ayan_t0: -5.61667},      /*11: Babylonian, Kugler 3 */
  {t0: 1684532.5, ayan_t0: -4.56667},      /*12: Babylonian, Huber */
  {t0: 1673941, ayan_t0: -5.079167},       /*13: Babylonian, Mercier;
                                          *    eta Piscium culminates with zero point */
  {t0: 1684532.5, ayan_t0: -4.44088389},   /*14: t0 is defined by Aldebaran at 15 Taurus */
  {t0: 1674484, ayan_t0: -9.33333},        /*15: Hipparchos */
  {t0: 1927135.8747793, ayan_t0: 0},       /*16: Sassanian */
  /*{1746443.513, ayan_t0: 0},                     *17: Galactic Center at 0 Sagittarius */
  {t0: 1746447.518, ayan_t0: 0},           /*17: Galactic Center at 0 Sagittarius */
  {t0: SwephData.J2000, ayan_t0: 0},                 /*18: J2000 */
  {t0: SwephData.J1900, ayan_t0: 0},                 /*19: J1900 */
  {t0: SwephData.B1950, ayan_t0: 0},                 /*20: B1950 */
  {t0: 1903396.8128654, ayan_t0: 0},       /*21: Suryasiddhanta, assuming
                                               ingress of mean Sun into Aries at point
                                               of mean equinox of date on
                                               21.3.499, noon, Ujjain (75.7684565 E)
                                               = 7:30:31.57 UT */
  {t0: 1903396.8128654, ayan_t0: -0.21463395},/*22: Suryasiddhanta, assuming
                                               ingress of mean Sun into Aries at
                                               true position of mean Sun at same epoch */
  {t0: 1903396.7895321, ayan_t0: 0},       /*23: Aryabhata, same date, but UT 6:56:55.57
                                               analogous 21 */
  {t0: 1903396.7895321, ayan_t0: -0.23763238},/*24: Aryabhata, analogous 22 */
  {t0: 1903396.8128654, ayan_t0: -0.79167046},/*25: SS, Revati/zePsc at polar long. 359Âø50'*/
  {t0: 1903396.8128654, ayan_t0: 2.11070444},/*26: SS, Citra/Spica at polar long. 180Âø */
  {t0: 0, ayan_t0: 0},                  /*27: True Citra (Spica exactly at 0 Libra) */
  {t0: 0, ayan_t0: 0},                  /*28: True Revati (zeta Psc exactly at 0 Aries) */
  {t0: 0, ayan_t0: 0},      /*29: True Pushya (delta Cnc exactly a 16 Cancer */
  {t0: 0, ayan_t0: 0},                     /*30: - */
];

/*
* earlier content
*/

SwephData.TWOPI = 2.0 * Math.PI;

SwephData.SEI_EPSILON = -2;
SwephData.SEI_NUTATION = -1;
SwephData.SEI_EMB = 0;
SwephData.SEI_EARTH = 0;
SwephData.SEI_SUN = 0;
SwephData.SEI_MOON = 1;
SwephData.SEI_MERCURY = 2;
SwephData.SEI_VENUS = 3;
SwephData.SEI_MARS = 4;
SwephData.SEI_JUPITER = 5;
SwephData.SEI_SATURN = 6;
SwephData.SEI_URANUS = 7;
SwephData.SEI_NEPTUNE = 8;
SwephData.SEI_PLUTO = 9;
SwephData.SEI_SUNBARY = 10;     // barycentric sun
SwephData.SEI_ANYBODY = 11;     // any asteroid
SwephData.SEI_CHIRON = 12;
SwephData.SEI_PHOLUS = 13;
SwephData.SEI_CERES = 14;
SwephData.SEI_PALLAS = 15;
SwephData.SEI_JUNO = 16;
SwephData.SEI_VESTA = 17;

SwephData.SEI_NPLANETS = 18;

SwephData.SEI_MEAN_NODE = 0;
SwephData.SEI_TRUE_NODE = 1;
SwephData.SEI_MEAN_APOG = 2;
SwephData.SEI_OSCU_APOG = 3;
SwephData.SEI_INTP_APOG = 4;
SwephData.SEI_INTP_PERG = 5;

SwephData.SEI_NNODE_ETC = 6;

SwephData.SEI_FLG_HELIO = 1;
SwephData.SEI_FLG_ROTATE = 2;
SwephData.SEI_FLG_ELLIPSE = 4;
SwephData.SEI_FLG_EMBHEL = 8; // TRUE, if heliocentric earth is given
                                   // instead of barycentric sun
                                   // i.e. bary sun is computed from
                                   // barycentric and heliocentric earth

SwephData.SEI_FILE_PLANET = 0;
SwephData.SEI_FILE_MOON = 1;
SwephData.SEI_FILE_MAIN_AST = 2;
SwephData.SEI_FILE_ANY_AST = 3;
SwephData.SEI_FILE_FIXSTAR = 4;

// Aus swephexph.h:
SwephData.SEI_FILE_TEST_ENDIAN = 0x616263;   // abc
SwephData.SEI_FILE_BIGENDIAN = 0;
SwephData.SEI_FILE_NOREORD = 0;
SwephData.SEI_FILE_LITENDIAN = 1;
SwephData.SEI_FILE_REORD = 2;

SwephData.SEI_FILE_NMAXPLAN = 50;
SwephData.SEI_FILE_EFPOSBEGIN = 500;

SwephData.SE_FILE_SUFFIX = "se1";

SwephData.SEI_NEPHFILES = 7;
SwephData.SEI_CURR_FPOS = -1;
SwephData.SEI_NMODELS = 20;

SwephData.SEI_ECL_GEOALT_MAX =  25000.0;
SwephData.SEI_ECL_GEOALT_MIN =  (-500.0);

/* Chiron's orbit becomes chaotic
* before 720 AD and after 4606 AD, because of close encounters
* with Saturn. Accepting a maximum error of 5 degrees,
* the ephemeris is good between the following dates:
*/
/*SwephData.CHIRON_START = 1958470.5;      * 1.1.650 old limit until v. 2.00 */
SwephData.CHIRON_START = 1967601.5;   /* 1.1.675 */
SwephData.CHIRON_END = 3419437.5;        // 1.1.4650

/* Pholus's orbit is unstable as well, because he sometimes
* approaches Saturn.
* Accepting a maximum error of 5 degrees,
* the ephemeris is good after the following date:
*/
/* SwephData.PHOLUS_START = 314845.5;       * 1.1.-3850  old limit until v. 2.00 */
SwephData.PHOLUS_START = 640648.5;  /* 1.1.-2958 jul */
SwephData.PHOLUS_END =   4390617.5;   /* 1.1.7309 */

SwephData.MOSHPLEPH_START =  625000.5;
SwephData.MOSHPLEPH_END =   2818000.5;
SwephData.MOSHLUEPH_START =  625000.5;
SwephData.MOSHLUEPH_END =   2818000.5;
/* SwephData.MOSHNDEPH_START = -254900.5; // 14 Feb -5410 00:00 ET jul.cal.*/
/* SwephData.MOSHNDEPH_END =   3697000.5; // 11 Dec 5409 00:00 ET, greg. cal. */
SwephData.MOSHNDEPH_START = -3100015.5; // 15 Aug -13200 00:00 ET jul.cal.*/
SwephData.MOSHNDEPH_END =   8000016.5; // 15 Mar 17191 00:00 ET, greg. cal */
/*
#define MOSHPLEPH_START  -225000.5
#define MOSHPLEPH_END   3600000.5
#define MOSHLUEPH_START  -225000.5
#define MOSHLUEPH_END   3600000.5
*/
SwephData.JPL_DE431_START = -3027215.5;
SwephData.JPL_DE431_END   =  7930192.5;

SwephData.MAXORD = 40;

SwephData.NCTIES = 6.0;    // number of centuries per eph. file

SwephData.NOT_AVAILABLE = -2;
SwephData.BEYOND_EPH_LIMITS = -3;

SwephData.J_TO_J2000 = 1;
SwephData.J2000_TO_J = -1;


// we always use Astronomical Almanac constants, if available
SwephData.DEGTORAD = 0.0174532925199433;
SwephData.MOON_MEAN_DIST = 384400000.0;           // in m, AA 1996, F2
SwephData.MOON_MEAN_INCL = 5.1453964;             // AA 1996, D2
SwephData.MOON_MEAN_ECC = 0.054900489;            // AA 1996, F2
// SwephData.SUN_EARTH_MRAT = 328900.561400;         Su/(Ea+Mo) AA 2006 K7
SwephData.SUN_EARTH_MRAT = 332946.050895;         // Su / (Ea only) AA 2006 K7
SwephData.EARTH_MOON_MRAT = (1 / 0.0123000383);   // AA 2006, K7

SwephData.AUNIT = 1.49597870691e+11;              // au in meters, AA 2006 K6
SwephData.CLIGHT = 2.99792458e+8;                 // m/s, AA 1996 K6
SwephData.HELGRAVCONST = 1.32712440017987e+20;    // G * M(sun), m^3/sec^2, AA 2006 K6
SwephData.GEOGCONST = 3.98600448e+14; // G * M(earth) m^3/sec^2, AA 1996 K6
SwephData.KGAUSS = 0.01720209895; // Gaussian gravitational constant K6
SwephData.KGAUSS_GEO = 0.0000298122353216;        // Earth only
// SwephData.KGAUSS_GEO = 0.0000299502129737        // Earth + Moon
SwephData.SUN_RADIUS = 959.63 / 3600 * SwephData.DEGTORAD;  // Meeus germ. p 391
SwephData.EARTH_RADIUS = 6378136.6;               // AA 2006 K6
/*SwephData.EARTH_OBLATENESS = (1.0/ 298.257223563); * AA 1998 K13 */
SwephData.EARTH_OBLATENESS = (1.0/ 298.25642);    // AA 2006 K6
SwephData.EARTH_ROT_SPEED = 7.2921151467e-5 * 86400; // in rad/day, expl. suppl., p 162

SwephData.LIGHTTIME_AUNIT = (499.0047838061/3600/24); // 8.3167 minutes (days), AA 2006 K6

/* node of ecliptic measured on ecliptic 2000 */
SwephData.SSY_PLANE_NODE_E2000 = 107.582569 * SwephData.DEGTORAD;
/* node of ecliptic measured on solar system rotation plane */
SwephData.SSY_PLANE_NODE = 107.58883388 * SwephData.DEGTORAD;
/* inclination of ecliptic against solar system rotation plane */
SwephData.SSY_PLANE_INCL = 1.578701 * SwephData.DEGTORAD;

SwephData.KM_S_TO_AU_CTY = 21.095;           // km/s to AU/century
SwephData.MOON_SPEED_INTV = 0.00005;         // 4.32 seconds (in days)
SwephData.PLAN_SPEED_INTV = 0.0001;          // 8.64 seconds (in days)
SwephData.MEAN_NODE_SPEED_INTV = 0.001;
SwephData.NODE_CALC_INTV = 0.0001;
SwephData.NODE_CALC_INTV_MOSH = 0.1;
SwephData.NUT_SPEED_INTV = 0.0001;
SwephData.DEFL_SPEED_INTV = 0.0000005;

SwephData.SE_LAPSE_RATE = 0.0065;

SwephData.STR = 4.8481368110953599359e-6;   // radians per arc second

/* dpsi and deps loaded for 100 years after 1962 */
SwephData.SWE_DATA_DPSI_DEPS = 36525;

SwephData.IS_PLANET = 0;
SwephData.IS_MOON = 1;
SwephData.IS_ANY_BODY = 2;
SwephData.IS_MAIN_ASTEROID = 3;

SwephData.DO_SAVE = true;
SwephData.NO_SAVE = false;



///////////////////////////////////////////////////////////////
// CHIRON: ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// SwephData.CHIRON_MAX_LON_SPEED = 0.1481;
// SwephData.CHIRON_MIN_LON_SPEED = -0.08136;
// SwephData.CHIRON_MAX_LON_ACCEL = 0.001985;
// SwephData.CHIRON_MIN_LON_ACCEL = -0.002076;
// SwephData.CHIRON_MAX_TOPO_LON_SPEED = 0.1490;
// SwephData.CHIRON_MIN_TOPO_LON_SPEED = -0.0826;
// SwephData.CHIRON_MAX_TOPO_LON_ACCEL = 0.00892;
// SwephData.CHIRON_MIN_TOPO_LON_ACCEL = -0.0091;
// SwephData.CHIRON_MAX_HELIO_LON_SPEED = 0.048572;
// SwephData.CHIRON_MIN_HELIO_LON_SPEED = 0.008467;
// SwephData.CHIRON_MAX_HELIO_LON_ACCEL = 0.000036235;
// SwephData.CHIRON_MIN_HELIO_LON_ACCEL = -0.000035949;
// SwephData.CHIRON_MAX_LAT_SPEED = 0.01538;
// SwephData.CHIRON_MIN_LAT_SPEED = -0.01344;
// SwephData.CHIRON_MAX_LAT_ACCEL = 0.000313;
// SwephData.CHIRON_MIN_LAT_ACCEL = -0.0002607;
// SwephData.CHIRON_MAX_TOPO_LAT_SPEED = 0.01574;
// SwephData.CHIRON_MIN_TOPO_LAT_SPEED =  -0.01368;
// SwephData.CHIRON_MAX_TOPO_LAT_ACCEL = 0.0033643;
// SwephData.CHIRON_MIN_TOPO_LAT_ACCEL = -0.003132;
// SwephData.CHIRON_MAX_HELIO_LAT_SPEED = 0.0066239;
// SwephData.CHIRON_MIN_HELIO_LAT_SPEED = -0.0018657;
// SwephData.CHIRON_MAX_HELIO_LAT_ACCEL = 0.000011620;
// SwephData.CHIRON_MIN_HELIO_LAT_ACCEL = -0.000017098;
// SwephData.CHIRON_MAX_DIST_SPEED = 0.01867;
// SwephData.CHIRON_MIN_DIST_SPEED = -0.018683;
// SwephData.CHIRON_MAX_DIST_ACCEL = 0.0003195;
// SwephData.CHIRON_MIN_DIST_ACCEL = -0.0002838;
// SwephData.CHIRON_MAX_TOPO_DIST_SPEED = 0.01883;
// SwephData.CHIRON_MIN_TOPO_DIST_SPEED = -0.01884;
// SwephData.CHIRON_MAX_TOPO_DIST_ACCEL = 0.001324;
// SwephData.CHIRON_MIN_TOPO_DIST_ACCEL = -0.001288;
// SwephData.CHIRON_MAX_HELIO_DIST_SPEED = 0.00208240;
// SwephData.CHIRON_MIN_HELIO_DIST_SPEED = -0.0020787;
// SwephData.CHIRON_MAX_HELIO_DIST_ACCEL = 0.0000023777;
// SwephData.CHIRON_MIN_HELIO_DIST_ACCEL = -0.0000012240;
// SwephData.CHIRON_MAX_RECT_SPEED = 0.1481655;
// SwephData.CHIRON_MIN_RECT_SPEED = -0.0786760;
// SwephData.CHIRON_MAX_RECT_ACCEL = 1./0.;
// SwephData.CHIRON_MIN_RECT_ACCEL = 1./0.;
// SwephData.CHIRON_MAX_TOPO_RECT_SPEED = 0.1658259;
// SwephData.CHIRON_MIN_TOPO_RECT_SPEED = -0.1149048;
// SwephData.CHIRON_MAX_TOPO_RECT_ACCEL = 1./0.;
// SwephData.CHIRON_MIN_TOPO_RECT_ACCEL = 1./0.;
// SwephData.CHIRON_MAX_HELIO_RECT_SPEED = 1./0.;
// SwephData.CHIRON_MIN_HELIO_RECT_SPEED = 1./0.;
// SwephData.CHIRON_MAX_HELIO_RECT_ACCEL = 1./0.;
// SwephData.CHIRON_MIN_HELIO_RECT_ACCEL = 1./0.;
// SwephData.CHIRON_MAX_DECL_SPEED = 0.0383058;
// SwephData.CHIRON_MIN_DECL_SPEED = -0.0553686;
// SwephData.CHIRON_MAX_DECL_ACCEL = 1./0.;
// SwephData.CHIRON_MIN_DECL_ACCEL = 1./0.;
// SwephData.CHIRON_MAX_TOPO_DECL_SPEED = 0.0447469;
// SwephData.CHIRON_MIN_TOPO_DECL_SPEED = -0.0645226;
// SwephData.CHIRON_MAX_TOPO_DECL_ACCEL = 1./0.;
// SwephData.CHIRON_MIN_TOPO_DECL_ACCEL = 1./0.;
// SwephData.CHIRON_MAX_HELIO_DECL_SPEED = 1./0.;
// SwephData.CHIRON_MIN_HELIO_DECL_SPEED = 1./0.;
// SwephData.CHIRON_MAX_HELIO_DECL_ACCEL = 1./0.;
// SwephData.CHIRON_MIN_HELIO_DECL_ACCEL = 1./0.;
