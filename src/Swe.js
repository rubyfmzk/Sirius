export const Swe = {

  J_MERCURY :  0,
  J_VENUS   :  1,
  J_EARTH   :  2,
  J_MARS    :  3,
  J_JUPITER :  4,
  J_SATURN  :  5,
  J_URANUS  :  6,
  J_NEPTUNE :  7,
  J_PLUTO   :  8,
  J_MOON    :  9,
  J_SUN     : 10,
  J_SBARY   : 11,
  J_EMB     : 12,
  J_NUT     : 13,
  J_LIB     : 14,

  OK:0,
  ERR:-1,

  /*
  * planet numbers for the ipl parameter in swe_calc()
  */
  SE_ECL_NUT:-1,
  SE_SUN:0,
  SE_MOON:1,
  SE_MERCURY:2,
  SE_VENUS:3,
  SE_MARS:4,
  SE_JUPITER:5,
  SE_SATURN:6,
  SE_URANUS:7,
  SE_NEPTUNE:8,
  SE_PLUTO:9,
  SE_MEAN_NODE:10,
  SE_TRUE_NODE:11,
  SE_MEAN_APOG:12,
  SE_OSCU_APOG:13,
  SE_EARTH:14,
  SE_CHIRON:15,
  SE_PHOLUS:16,
  SE_CERES:17,
  SE_PALLAS:18,
  SE_JUNO:19,
  SE_VESTA:20,
  SE_INTP_APOG:21,
  SE_INTP_PERG:22,
  SE_NPLANETS:23,
  SE_AST_OFFSET:10000,
  // SE_VARUNA : this.SE_AST_OFFSET + 20000,
  SE_VARUNA : 10000 + 20000,
  SE_FICT_OFFSET:40,
  SE_FICT_OFFSET_1:39,
  SE_FICT_MAX:999,
  SE_NFICT_ELEM:15,
  SE_COMET_OFFSET:2000,
  // SE_NALL_NAT_POINTS:(  this.SE_NPLANETS + this.SE_NFICT_ELEM),
  SE_NALL_NAT_POINTS:( 23 + 15 ),
  SE_CUPIDO:40,
  SE_HADES:41,
  SE_ZEUS:42,
  SE_KRONOS:43,
  SE_APOLLON:44,
  SE_ADMETOS:45,
  SE_VULKANUS:46,
  SE_POSEIDON:47,
  SE_ISIS:48,
  SE_NIBIRU:49,
  SE_HARRINGTON:50,
  SE_NEPTUNE_LEVERRIER:51,
  SE_NEPTUNE_ADAMS:52,
  SE_PLUTO_LOWELL:53,
  SE_PLUTO_PICKERING:54,
  SE_VULCAN:55,
  SE_WHITE_MOON:56,
  SE_PROSERPINA:57,
  SE_WALDEMATH:58,
  SE_FIXSTAR:-10,
  SE_ASC   :0,
  SE_MC    :1,
  SE_ARMC  :2,
  SE_VERTEX:3,
  SE_EQUASC:4,
  SE_COASC1:5,
  SE_COASC2:6,
  SE_POLASC:7,
  SE_NASCMC:8,

  SEFLG_HELCTR:8,     // return heliocentric position
  SEFLG_TRUEPOS:16,   // return true positions, not apparent
  SEFLG_J2000:32,     // no precession, i.e. give J2000 equinox
  SEFLG_NONUT:64,     // no nutation, i.e. mean equinox of date
  SEFLG_SPEED3:128,   // speed from 3 positions (do not use
                                     // it, SEFLG_SPEED is faster and more
                                     // precise.)
  SEFLG_SPEED:256,    // high precision speed
  SEFLG_NOGDEFL:512,  // turn off gravitational deflection
  SEFLG_NOABERR:1024, // turn off 'annual' aberration of light
  SEFLG_EQUATORIAL:2*1024, // equatorial positions are wanted
  SEFLG_XYZ:4*1024,     // cartesian, not polar, coordinates
  SEFLG_RADIANS:8*1024, // coordinates in radians, not degrees
  SEFLG_BARYCTR:16*1024, // barycentric positions
  SEFLG_TOPOCTR:32*1024, // topocentric positions
  SEFLG_SIDEREAL:64*1024, // sidereal positions
  SEFLG_ICRS:128*1024, // ICRS (DE406 reference frame)
  SEFLG_DPSIDEPS_1980:(256*1024), /* reproduce JPL Horizons 
                                    * 1962 - today to 0.002 arcsec. */
  // SEFLG_JPLHOR:  this.SEFLG_DPSIDEPS_1980,
  SEFLG_JPLHOR: (256*1024),
  SEFLG_JPLHOR_APPROX:(512*1024),   /* approximate JPL Horizons 1962 - today */
  SEFLG_TRANSIT_LONGITUDE :  128*1024,
  SEFLG_TRANSIT_LATITUDE  :  256*1024,
  SEFLG_TRANSIT_DISTANCE  :  512*1024,
  SEFLG_TRANSIT_SPEED     : 1024*1024,
  SEFLG_YOGA_TRANSIT      : 2048*1024,
  SEFLG_PARTILE_TRANSIT_START : 4096*1024,
  SEFLG_PARTILE_TRANSIT_END : 8192*1024,
  // SEFLG_PARTILE_TRANSIT :   this.SEFLG_PARTILE_TRANSIT_START +   this.SEFLG_PARTILE_TRANSIT_END,

  SE_HOUSE1 : -1,
  SE_HOUSE2 : -2,
  SE_HOUSE3 : -3,
  SE_HOUSE4 : -4,
  SE_HOUSE5 : -5,
  SE_HOUSE6 : -6,
  SE_HOUSE7 : -7,
  SE_HOUSE8 : -8,
  SE_HOUSE9 : -9,
  SE_HOUSE10 : -10,
  SE_HOUSE11 : -11,
  SE_HOUSE12 : -12,
  SE_HSYS_PLACIDUS : 'P',
  SE_HSYS_KOCH : 'K',
  SE_HSYS_PORPHYRIUS : 'O',
  SE_HSYS_REGIOMONTANUS : 'R',
  SE_HSYS_CAMPANUS : 'C',
  SE_HSYS_EQUAL : 'E',
  SE_HSYS_VEHLOW : 'V',
  SE_HSYS_MERIDIAN : 'X',
  SE_HSYS_HORIZONTAL : 'H',
  SE_HSYS_POLICH_PAGE : 'T',
  SE_HSYS_ALCABITIUS : 'B',
  SE_HSYS_GAUQUELIN_SECTORS : 'G',
  SE_HSYS_MORINUS : 'M',
  SE_HSYS_KRUSINSKI : 'U',
  SE_HSYS_WHOLE_SIGN : 'W',
  SEFLG_SWIEPH:2,

  SEFLG_MOSEPH:4,
  // SEFLG_DEFAULTEPH:  this.SEFLG_MOSEPH,
  SEFLG_DEFAULTEPH:  4,
  // SEFLG_EPHMASK:1|2|  this.SEFLG_MOSEPH,
  SEFLG_EPHMASK:1|2|4,
  SE_SIDBITS             :256,
  SE_SIDBIT_ECL_T0       :256,
  SE_SIDBIT_SSY_PLANE    :512,
  SE_SIDM_FAGAN_BRADLEY  : 0,
  SE_SIDM_LAHIRI         : 1,
  SE_SIDM_DELUCE         : 2,
  SE_SIDM_RAMAN          : 3,
  SE_SIDM_USHASHASHI     : 4,
  SE_SIDM_KRISHNAMURTI   : 5,
  SE_SIDM_DJWHAL_KHUL    : 6,
  SE_SIDM_YUKTESHWAR     : 7,
  SE_SIDM_JN_BHASIN      : 8,
  SE_SIDM_BABYL_KUGLER1  : 9,
  SE_SIDM_BABYL_KUGLER2  :10,
  SE_SIDM_BABYL_KUGLER3  :11,
  SE_SIDM_BABYL_HUBER    :12,
  SE_SIDM_BABYL_ETPSC    :13,
  SE_SIDM_ALDEBARAN_15TAU:14,
  SE_SIDM_HIPPARCHOS     :15,
  SE_SIDM_SASSANIAN      :16,
  SE_SIDM_GALCENT_0SAG   :17,
  SE_SIDM_J2000          :18,
  SE_SIDM_J1900          :19,
  SE_SIDM_B1950          :20,

  SE_SIDM_SURYASIDDHANTA :21,
  SE_SIDM_SURYASIDDHANTA_MSUN :22,
  SE_SIDM_ARYABHATA      :23,
  SE_SIDM_ARYABHATA_MSUN :24,
  SE_SIDM_SS_REVATI      :25,
  SE_SIDM_SS_CITRA       :26,
  SE_SIDM_TRUE_CITRA     :27,
  SE_SIDM_TRUE_REVATI    :28,
  SE_SIDM_TRUE_PUSHYA    :29,
  SE_SIDM_USER          :255,
  SE_MAX_STNAME:256,   // maximum size of fixstar 

  SE_NODBIT_MEAN    :1, // mean nodes/apsides
  SE_NODBIT_OSCU    :2, // osculating nodes/apsides
  SE_NODBIT_OSCU_BAR:4, // same, but motion about solar
  SE_NODBIT_FOPOINT :256, // focal point of orbit instead of aphelion

  SE_SPLIT_DEG_ROUND_SEC :  1,
  SE_SPLIT_DEG_ROUND_MIN :  2,
  SE_SPLIT_DEG_ROUND_DEG :  4,
  SE_SPLIT_DEG_ZODIACAL  :  8,
  SE_SPLIT_DEG_KEEP_SIGN : 16,
                                        /* don't round to next sign,
                                         * e.g. 29.9999999 will be rounded
                                         * to 29d59'59" (or 29d59' or 29d) */
  SE_SPLIT_DEG_KEEP_DEG  : 32,
                                        /* don't round to next degree
                                         * e.g. 13.9999999 will be rounded
                                         * to 13d59'59" (or 13d59' or 13d) */

  SE_HELIACAL_RISING          : 1,
  SE_HELIACAL_SETTING         : 2,
  // SE_MORNING_FIRST            :   this.SE_HELIACAL_RISING,
  // SE_EVENING_LAST             :   this.SE_HELIACAL_SETTING,
  SE_EVENING_FIRST            : 3,
  SE_MORNING_LAST             : 4,
  SE_ACRONYCHAL_RISING        : 5,  /* still not implemented */
  SE_ACRONYCHAL_SETTING       : 6,  /* still not implemented */
  // SE_COSMICAL_SETTING         :   this.SE_ACRONYCHAL_SETTING,

  SE_HELFLAG_LONG_SEARCH      : 128,
  SE_HELFLAG_HIGH_PRECISION   : 256,
  SE_HELFLAG_OPTICAL_PARAMS   : 512,
  SE_HELFLAG_NO_DETAILS       : 1024,
  SE_HELFLAG_SEARCH_1_PERIOD  : (1 << 11), /*  2048 */
  SE_HELFLAG_VISLIM_DARK      : (1 << 12), /*  4096 */
  SE_HELFLAG_VISLIM_NOMOON    : (1 << 13), /*  8192 */
  SE_HELFLAG_VISLIM_PHOTOPIC  : (1 << 14), /* 16384 */
  SE_HELFLAG_AV               : (1 << 15), /* 32768 */
  SE_HELFLAG_AVKIND_VR        : (1 << 15), /* 32768 */
  SE_HELFLAG_AVKIND_PTO       : (1 << 16),
  SE_HELFLAG_AVKIND_MIN7      : (1 << 17),
  SE_HELFLAG_AVKIND_MIN9      : (1 << 18),
  // SE_HELFLAG_AVKIND :   this.SE_HELFLAG_AVKIND_VR|  this.SE_HELFLAG_AVKIND_PTO|  this.SE_HELFLAG_AVKIND_MIN7|  this.SE_HELFLAG_AVKIND_MIN9,
  TJD_INVALID              : 99999999.0,
//    SIMULATE_VICTORVB           : 1  // is a #define for SweHel

  SE_HELIACAL_LONG_SEARCH       : 128,
  SE_HELIACAL_HIGH_PRECISION    : 256,
  SE_HELIACAL_OPTICAL_PARAMS    : 512,
  SE_HELIACAL_NO_DETAILS        : 1024,
  SE_HELIACAL_SEARCH_1_PERIOD   : (1 << 11), /*  2048 */
  SE_HELIACAL_VISLIM_DARK       : (1 << 12), /*  4096 */
  SE_HELIACAL_VISLIM_NOMOON     : (1 << 13), /*  8192 */
  SE_HELIACAL_VISLIM_PHOTOPIC   : (1 << 14), /* 16384 */
  SE_HELIACAL_AVKIND_VR         : (1 << 15), /* 32768 */
  SE_HELIACAL_AVKIND_PTO        : (1 << 16),
  SE_HELIACAL_AVKIND_MIN7       : (1 << 17),
  SE_HELIACAL_AVKIND_MIN9       : (1 << 18),
  // SE_HELIACAL_AVKIND : (  this.SE_HELFLAG_AVKIND_VR|  this.SE_HELFLAG_AVKIND_PTO|  this.SE_HELFLAG_AVKIND_MIN7|  this.SE_HELFLAG_AVKIND_MIN9),

  SE_PHOTOPIC_FLAG            : 0,
  SE_SCOTOPIC_FLAG            : 1,
  SE_MIXEDOPIC_FLAG           : 2,

/* for setGlobalTidalAcc() and ephemeris-dependent delta t:
 * intrinsic tidal acceleration in the mean motion of the moon,
 * not given in the parameters list of the ephemeris files but computed
 * by Chapront/Chapront-TouzÃ©/Francou A&A 387 (2002), p. 705.
 */
  SE_TIDAL_DE200       :  (-23.8946),
  SE_TIDAL_DE403       :  (-25.580),  /* was (-25.8) until V. 1.76.2 */
  SE_TIDAL_DE404       :  (-25.580),  /* was (-25.8) until V. 1.76.2 */
  SE_TIDAL_DE405       :  (-25.826),  /* was (-25.7376) until V. 1.76.2 */
  SE_TIDAL_DE406       :  (-25.826),  /* was (-25.7376) until V. 1.76.2 */
  SE_TIDAL_DE421       :  (-25.85),   /* JPL Interoffice Memorandum 14-mar-2008 on DE421 Lunar Orbit */
  SE_TIDAL_DE430       :  (-25.82),   /* JPL Interoffice Memorandum 9-jul-2013 on DE430 Lunar Orbit */
  SE_TIDAL_DE431       :  (-25.80),   /* IPN Progress Report 42-196 ƒÇ› February 15, 2014, p. 15 */
  SE_TIDAL_26          :  (-26.0),
  // SE_TIDAL_DEFAULT     :    this.SE_TIDAL_DE431,
  SE_TIDAL_DEFAULT     :    (-25.80),
  SE_TIDAL_AUTOMATIC   :  999999,
  // SE_TIDAL_MOSEPH      :    this.SE_TIDAL_DE404,
  SE_TIDAL_MOSEPH      :    (-25.580),
  // SE_TIDAL_SWIEPH      :    this.SE_TIDAL_DEFAULT,
  SE_TIDAL_SWIEPH      :    (-25.80),
  // SE_TIDAL_JPLEPH      :    this.SE_TIDAL_DEFAULT,
  SE_TIDAL_JPLEPH      :    (-25.80),

  SE_MODEL_PREC_LONGTERM  : 0,
  SE_MODEL_PREC_SHORTTERM : 1,
  SE_MODEL_NUT            : 2,
  SE_MODEL_SIDT           : 3,
  SE_MODEL_BIAS           : 4,
  SE_MODEL_JPLHOR_MODE    : 5,
  SE_MODEL_JPLHORA_MODE   : 6,
  SE_MODEL_DELTAT         : 7,

/* precession models */
  SEMOD_PREC_IAU_1976       : 1,
  SEMOD_PREC_IAU_2000       : 2,
  SEMOD_PREC_IAU_2006       : 3,
  SEMOD_PREC_BRETAGNON_2003 : 4,
  SEMOD_PREC_LASKAR_1986    : 5,
  SEMOD_PREC_SIMON_1994     : 6,
  SEMOD_PREC_WILLIAMS_1994  : 7,
  SEMOD_PREC_VONDRAK_2011   : 8,
  // SEMOD_PREC_DEFAULT        :   this.SEMOD_PREC_VONDRAK_2011,

/* former implementations of the used 
 * IAU 1976, 2000 and 2006 for a limited time range
 * in combination with a different model for 
 * long term precession. 
#define SEMOD_PREC_DEFAULT_SHORT SEMOD_PREC_IAU_2000
 */
  // SEMOD_PREC_DEFAULT_SHORT :   this.SEMOD_PREC_VONDRAK_2011,
  SEMOD_PREC_DEFAULT_SHORT :   8,
/* nutation models */
  SEMOD_NUT_IAU_1980        : 1,
  SEMOD_NUT_IAU_CORR_1987   : 2, /* Herring's (1987) corrections to IAU 1980 
            * nutation series. AA (1996) neglects them.*/
  SEMOD_NUT_IAU_2000A       : 3, /* very time consuming ! */
  SEMOD_NUT_IAU_2000B       : 4, /* fast, but precision of milli-arcsec */
  // SEMOD_NUT_DEFAULT         :   this.SEMOD_NUT_IAU_2000B,  /* fast, but precision of milli-arcsec */
  SEMOD_NUT_DEFAULT         : 4,

/* methods for sidereal time */
  SEMOD_SIDT_LONGTERM       : 1,
  SEMOD_SIDT_IERS_CONV_2010 : 2,
  SEMOD_SIDT_PREC_MODEL     : 3,
  // SEMOD_SIDT_DEFAULT        :   this.SEMOD_SIDT_LONGTERM,
  SEMOD_SIDT_DEFAULT        : 1,

/* frame bias methods */
  SEMOD_BIAS_IAU2000        : 1,  /* use frame bias matrix IAU 2000 */
  SEMOD_BIAS_IAU2006        : 2,  /* use frame bias matrix IAU 2000 */
  // SEMOD_BIAS_DEFAULT        :   this.SEMOD_BIAS_IAU2006,

/* methods of JPL Horizons (iflag & SEFLG_JPLHOR), 
 * using daily dpsi, deps  see explanations below */
  SEMOD_JPLHOR_EXTENDED_1800 : 1,  /* daily dpsi and deps from file are 
                                     * lifmited to 1962 - today. JPL uses the
             * first and last value for all  dates 
             * beyond this time range. */
  SEMOD_JPLHOR_NOT_EXTENDED  : 2,  /* outside the available time range 
                                     * 1962 - today default to SEFLG_JPLHOR_APROX */
  // SEMOD_JPLHOR_DEFAULT       :   this.SEMOD_JPLHOR_EXTENDED_1800,
  SEMOD_JPLHOR_DEFAULT       : 1,
  SEMOD_JPLHORA_1     : 1,
  SEMOD_JPLHORA_2     : 2,
  // SEMOD_JPLHORA_DEFAULT     :   this.SEMOD_JPLHORA_1,
  SEMOD_JPLHORA_DEFAULT     : 1,
  SEMOD_DELTAT_ESPENAK_MEEUS_2006   : 1,
  SEMOD_DELTAT_STEPHENSON_MORRISON_2004   : 2,
  // SEMOD_DELTAT_DEFAULT :   this.SEMOD_DELTAT_ESPENAK_MEEUS_2006,
  SEMOD_DELTAT_DEFAULT : 1,

/* defines for eclipse computations */

  SE_ECL_CENTRAL:1,
  SE_ECL_NONCENTRAL:2,
  SE_ECL_TOTAL:4,
/**
* Annular eclipse. This is an eclipse, where the moon is seen smaller
* than the sun, so you get a "ring" of the sun around the moon.
*/
  SE_ECL_ANNULAR:8,
  SE_ECL_PARTIAL:16,
  SE_ECL_ANNULAR_TOTAL:32,
  SE_ECL_PENUMBRAL:64,
  // SE_ECL_ALLTYPES_SOLAR :   this.SE_ECL_CENTRAL|  this.SE_ECL_NONCENTRAL|  this.SE_ECL_TOTAL|  this.SE_ECL_ANNULAR|  this.SE_ECL_PARTIAL|  this.SE_ECL_ANNULAR_TOTAL,
  // SE_ECL_ALLTYPES_LUNAR : this.SE_ECL_TOTAL|  this.SE_ECL_PARTIAL|  this.SE_ECL_PENUMBRAL,
  SE_ECL_ALLTYPES_LUNAR : 4|16|64,
  SE_ECL_VISIBLE:128,
  SE_ECL_MAX_VISIBLE:256,
  SE_ECL_1ST_VISIBLE  :512, /* begin of partial eclipse */
  SE_ECL_PARTBEG_VISIBLE:512, /* begin of partial eclipse */
  SE_ECL_2ND_VISIBLE  :1024,  /* begin of total eclipse */
  SE_ECL_TOTBEG_VISIBLE :1024,  /* begin of total eclipse */
  SE_ECL_3RD_VISIBLE  :2048,    /* end of total eclipse */
  SE_ECL_TOTEND_VISIBLE :2048,    /* end of total eclipse */
  SE_ECL_4TH_VISIBLE  :4096,    /* end of partial eclipse */
  SE_ECL_PARTEND_VISIBLE:4096,    /* end of partial eclipse */
  SE_ECL_PENUMBBEG_VISIBLE:8192,    /* begin of penumbral eclipse */
  SE_ECL_PENUMBEND_VISIBLE:16384,   /* end of penumbral eclipse */
  SE_ECL_OCC_BEG_DAYLIGHT:8192,    /* occultation begins during the day */
  SE_ECL_OCC_END_DAYLIGHT:16384,   /* occultation ends during the day */
  SE_ECL_ONE_TRY:32*1024,
  SE_CALC_RISE          : 1,
  SE_CALC_SET           : 2,
  SE_CALC_MTRANSIT      : 4,
  SE_CALC_ITRANSIT      : 8,
  SE_BIT_DISC_CENTER   : 256,
                                  /* to be or'ed to SE_CALC_RISE/SET
                                   * if rise or set of disc center is
                                   * required */
  SE_BIT_DISC_BOTTOM   : 8192,
                                  /* to be or'ed to SE_CALC_RISE/SET,
                                   * if rise or set of lower limb of
                                   * disc is requried */
  SE_BIT_NO_REFRACTION : 512,
                                  /* to be or'ed to SE_CALC_RISE/SET,
                                   * if refraction is not to be considered */
  SE_BIT_CIVIL_TWILIGHT :  1024, /* to be or'ed to SE_CALC_RISE/SET */
  SE_BIT_NAUTIC_TWILIGHT : 2048, /* to be or'ed to SE_CALC_RISE/SET */
  SE_BIT_ASTRO_TWILIGHT :  4096, /* to be or'ed to SE_CALC_RISE/SET */
  SE_BIT_FIXED_DISC_SIZE  : (16*1024), /* or'ed to SE_CALC_RISE/SET:
                                   * neglect the effect of distance on
                                   * disc size */
  SE_ECL2HOR            : 0,
  SE_EQU2HOR            : 1,
  SE_HOR2ECL            : 0,
  SE_HOR2EQU            : 1,
  SE_TRUE_TO_APP :0,
  SE_APP_TO_TRUE :1,

  AUNIT:1.4959787066e+11,
}