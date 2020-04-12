var Swe = Swe || {};
Swe.SwephData = {};

Swe.SwephData.PNOINT2JPL = [
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
Swe.SwephData.pnoint2jpl = Swe.SwephData.PNOINT2JPL;

/* planetary radii in meters */
Swe.SwephData.NDIAM = (Swe.SE_VESTA + 1);
Swe.SwephData.pla_diam = [1392000000.0, /* Sun */
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

Swe.SwephData.J2000 = 2451545.0;        // 2000 January 1.5
Swe.SwephData.B1950 = 2433282.42345905; // 1950 January 0.923
Swe.SwephData.J1900 = 2415020.0;        // 1900 January 0.5

Swe.SwephData.MPC_CERES = 1;
Swe.SwephData.MPC_PALLAS = 2;
Swe.SwephData.MPC_JUNO = 3;
Swe.SwephData.MPC_VESTA = 4;
Swe.SwephData.MPC_CHIRON = 2060;
Swe.SwephData.MPC_PHOLUS = 5145;

/* Ayanamsas 
 * For each ayanamsa, there are two values:
 * t0       epoch of ayanamsa, TDT (ET)
 * ayan_t0  ayanamsa value at epoch
 */

Swe.SwephData.AyaInit = function(t0, ayan_t0){
  this.t0=t0;
  this.ayan_t0=ayan_t0;
}
Swe.SwephData.ayanamsa = [
  {t0: 2433282.5, ayan_t0: 24.042044444}, /* 0: Fagan/Bradley (Default) */

  {t0: 2435553.5, ayan_t0: 23.250182778 - 0.004660222},   /* 1: Lahiri (derived from:
                         * Indian Astronomical Ephemeris 1989, p. 556;
                         * the subtracted value is nutation) */
  {t0: Swe.SwephData.J1900, ayan_t0: 360 - 333.58695},   /* 2: De Luce (Robert Hand) */
  {t0: Swe.SwephData.J1900, ayan_t0: 360 - 338.98556},   /* 3: Raman (Robert Hand) */
  {t0: Swe.SwephData.J1900, ayan_t0: 360 - 341.33904},   /* 4: Ushashashi (Robert Hand) */
  {t0: Swe.SwephData.J1900, ayan_t0: 360 - 337.636111},  /* 5: Krishnamurti (Robert Hand) */
  {t0: Swe.SwephData.J1900, ayan_t0: 360 - 333.0369024}, /* 6: Djwhal Khool; (Graham Dawson)
                                          *    Aquarius entered on 1 July 2117 */
  {t0: Swe.SwephData.J1900, ayan_t0: 360 - 338.917778},  /* 7: Yukteshwar; (David Cochrane) */
  {t0: Swe.SwephData.J1900, ayan_t0: 360 - 338.634444},  /* 8: JN Bhasin; (David Cochrane) */
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
  {t0: Swe.SwephData.J2000, ayan_t0: 0},                 /*18: J2000 */
  {t0: Swe.SwephData.J1900, ayan_t0: 0},                 /*19: J1900 */
  {t0: Swe.SwephData.B1950, ayan_t0: 0},                 /*20: B1950 */
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

Swe.SwephData.TWOPI = 2.0 * Math.PI;

Swe.SwephData.SEI_EPSILON = -2;
Swe.SwephData.SEI_NUTATION = -1;
Swe.SwephData.SEI_EMB = 0;
Swe.SwephData.SEI_EARTH = 0;
Swe.SwephData.SEI_SUN = 0;
Swe.SwephData.SEI_MOON = 1;
Swe.SwephData.SEI_MERCURY = 2;
Swe.SwephData.SEI_VENUS = 3;
Swe.SwephData.SEI_MARS = 4;
Swe.SwephData.SEI_JUPITER = 5;
Swe.SwephData.SEI_SATURN = 6;
Swe.SwephData.SEI_URANUS = 7;
Swe.SwephData.SEI_NEPTUNE = 8;
Swe.SwephData.SEI_PLUTO = 9;
Swe.SwephData.SEI_SUNBARY = 10;     // barycentric sun
Swe.SwephData.SEI_ANYBODY = 11;     // any asteroid
Swe.SwephData.SEI_CHIRON = 12;
Swe.SwephData.SEI_PHOLUS = 13;
Swe.SwephData.SEI_CERES = 14;
Swe.SwephData.SEI_PALLAS = 15;
Swe.SwephData.SEI_JUNO = 16;
Swe.SwephData.SEI_VESTA = 17;

Swe.SwephData.SEI_NPLANETS = 18;

Swe.SwephData.SEI_MEAN_NODE = 0;
Swe.SwephData.SEI_TRUE_NODE = 1;
Swe.SwephData.SEI_MEAN_APOG = 2;
Swe.SwephData.SEI_OSCU_APOG = 3;
Swe.SwephData.SEI_INTP_APOG = 4;
Swe.SwephData.SEI_INTP_PERG = 5;

Swe.SwephData.SEI_NNODE_ETC = 6;

Swe.SwephData.SEI_FLG_HELIO = 1;
Swe.SwephData.SEI_FLG_ROTATE = 2;
Swe.SwephData.SEI_FLG_ELLIPSE = 4;
Swe.SwephData.SEI_FLG_EMBHEL = 8; // TRUE, if heliocentric earth is given
                                   // instead of barycentric sun
                                   // i.e. bary sun is computed from
                                   // barycentric and heliocentric earth

Swe.SwephData.SEI_FILE_PLANET = 0;
Swe.SwephData.SEI_FILE_MOON = 1;
Swe.SwephData.SEI_FILE_MAIN_AST = 2;
Swe.SwephData.SEI_FILE_ANY_AST = 3;
Swe.SwephData.SEI_FILE_FIXSTAR = 4;

// Aus swephexph.h:
Swe.SwephData.SEI_FILE_TEST_ENDIAN = 0x616263;   // abc
Swe.SwephData.SEI_FILE_BIGENDIAN = 0;
Swe.SwephData.SEI_FILE_NOREORD = 0;
Swe.SwephData.SEI_FILE_LITENDIAN = 1;
Swe.SwephData.SEI_FILE_REORD = 2;

Swe.SwephData.SEI_FILE_NMAXPLAN = 50;
Swe.SwephData.SEI_FILE_EFPOSBEGIN = 500;

Swe.SwephData.SE_FILE_SUFFIX = "se1";

Swe.SwephData.SEI_NEPHFILES = 7;
Swe.SwephData.SEI_CURR_FPOS = -1;
Swe.SwephData.SEI_NMODELS = 20;

Swe.SwephData.SEI_ECL_GEOALT_MAX =  25000.0;
Swe.SwephData.SEI_ECL_GEOALT_MIN =  (-500.0);

/* Chiron's orbit becomes chaotic
* before 720 AD and after 4606 AD, because of close encounters
* with Saturn. Accepting a maximum error of 5 degrees,
* the ephemeris is good between the following dates:
*/
/*Swe.SwephData.CHIRON_START = 1958470.5;      * 1.1.650 old limit until v. 2.00 */
Swe.SwephData.CHIRON_START = 1967601.5;   /* 1.1.675 */
Swe.SwephData.CHIRON_END = 3419437.5;        // 1.1.4650

/* Pholus's orbit is unstable as well, because he sometimes
* approaches Saturn.
* Accepting a maximum error of 5 degrees,
* the ephemeris is good after the following date:
*/
/* Swe.SwephData.PHOLUS_START = 314845.5;       * 1.1.-3850  old limit until v. 2.00 */
Swe.SwephData.PHOLUS_START = 640648.5;  /* 1.1.-2958 jul */
Swe.SwephData.PHOLUS_END =   4390617.5;   /* 1.1.7309 */

Swe.SwephData.MOSHPLEPH_START =  625000.5;
Swe.SwephData.MOSHPLEPH_END =   2818000.5;
Swe.SwephData.MOSHLUEPH_START =  625000.5;
Swe.SwephData.MOSHLUEPH_END =   2818000.5;
/* Swe.SwephData.MOSHNDEPH_START = -254900.5; // 14 Feb -5410 00:00 ET jul.cal.*/
/* Swe.SwephData.MOSHNDEPH_END =   3697000.5; // 11 Dec 5409 00:00 ET, greg. cal. */
Swe.SwephData.MOSHNDEPH_START = -3100015.5; // 15 Aug -13200 00:00 ET jul.cal.*/
Swe.SwephData.MOSHNDEPH_END =   8000016.5; // 15 Mar 17191 00:00 ET, greg. cal */
/*
#define MOSHPLEPH_START  -225000.5
#define MOSHPLEPH_END   3600000.5
#define MOSHLUEPH_START  -225000.5
#define MOSHLUEPH_END   3600000.5
*/
Swe.SwephData.JPL_DE431_START = -3027215.5;
Swe.SwephData.JPL_DE431_END   =  7930192.5;

Swe.SwephData.MAXORD = 40;

Swe.SwephData.NCTIES = 6.0;    // number of centuries per eph. file

Swe.SwephData.NOT_AVAILABLE = -2;
Swe.SwephData.BEYOND_EPH_LIMITS = -3;

Swe.SwephData.J_TO_J2000 = 1;
Swe.SwephData.J2000_TO_J = -1;


// we always use Astronomical Almanac constants, if available
Swe.SwephData.DEGTORAD = 0.0174532925199433;
Swe.SwephData.MOON_MEAN_DIST = 384400000.0;           // in m, AA 1996, F2
Swe.SwephData.MOON_MEAN_INCL = 5.1453964;             // AA 1996, D2
Swe.SwephData.MOON_MEAN_ECC = 0.054900489;            // AA 1996, F2
// Swe.SwephData.SUN_EARTH_MRAT = 328900.561400;         Su/(Ea+Mo) AA 2006 K7
Swe.SwephData.SUN_EARTH_MRAT = 332946.050895;         // Su / (Ea only) AA 2006 K7
Swe.SwephData.EARTH_MOON_MRAT = (1 / 0.0123000383);   // AA 2006, K7

Swe.SwephData.AUNIT = 1.49597870691e+11;              // au in meters, AA 2006 K6
Swe.SwephData.CLIGHT = 2.99792458e+8;                 // m/s, AA 1996 K6
Swe.SwephData.HELGRAVCONST = 1.32712440017987e+20;    // G * M(sun), m^3/sec^2, AA 2006 K6
Swe.SwephData.GEOGCONST = 3.98600448e+14; // G * M(earth) m^3/sec^2, AA 1996 K6
Swe.SwephData.KGAUSS = 0.01720209895; // Gaussian gravitational constant K6
Swe.SwephData.KGAUSS_GEO = 0.0000298122353216;        // Earth only
// Swe.SwephData.KGAUSS_GEO = 0.0000299502129737        // Earth + Moon
Swe.SwephData.SUN_RADIUS = 959.63 / 3600 * Swe.SwephData.DEGTORAD;  // Meeus germ. p 391
Swe.SwephData.EARTH_RADIUS = 6378136.6;               // AA 2006 K6
/*Swe.SwephData.EARTH_OBLATENESS = (1.0/ 298.257223563); * AA 1998 K13 */
Swe.SwephData.EARTH_OBLATENESS = (1.0/ 298.25642);    // AA 2006 K6
Swe.SwephData.EARTH_ROT_SPEED = 7.2921151467e-5 * 86400; // in rad/day, expl. suppl., p 162

Swe.SwephData.LIGHTTIME_AUNIT = (499.0047838061/3600/24); // 8.3167 minutes (days), AA 2006 K6

/* node of ecliptic measured on ecliptic 2000 */
Swe.SwephData.SSY_PLANE_NODE_E2000 = 107.582569 * Swe.SwephData.DEGTORAD;
/* node of ecliptic measured on solar system rotation plane */
Swe.SwephData.SSY_PLANE_NODE = 107.58883388 * Swe.SwephData.DEGTORAD;
/* inclination of ecliptic against solar system rotation plane */
Swe.SwephData.SSY_PLANE_INCL = 1.578701 * Swe.SwephData.DEGTORAD;

Swe.SwephData.KM_S_TO_AU_CTY = 21.095;           // km/s to AU/century
Swe.SwephData.MOON_SPEED_INTV = 0.00005;         // 4.32 seconds (in days)
Swe.SwephData.PLAN_SPEED_INTV = 0.0001;          // 8.64 seconds (in days)
Swe.SwephData.MEAN_NODE_SPEED_INTV = 0.001;
Swe.SwephData.NODE_CALC_INTV = 0.0001;
Swe.SwephData.NODE_CALC_INTV_MOSH = 0.1;
Swe.SwephData.NUT_SPEED_INTV = 0.0001;
Swe.SwephData.DEFL_SPEED_INTV = 0.0000005;

Swe.SwephData.SE_LAPSE_RATE = 0.0065;

Swe.SwephData.STR = 4.8481368110953599359e-6;   // radians per arc second

/* dpsi and deps loaded for 100 years after 1962 */
Swe.SwephData.SWE_DATA_DPSI_DEPS = 36525;

Swe.SwephData.IS_PLANET = 0;
Swe.SwephData.IS_MOON = 1;
Swe.SwephData.IS_ANY_BODY = 2;
Swe.SwephData.IS_MAIN_ASTEROID = 3;

Swe.SwephData.DO_SAVE = true;
Swe.SwephData.NO_SAVE = false;
