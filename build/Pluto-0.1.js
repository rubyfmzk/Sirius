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
   available - the copyright notes at http://www.astro.ch/swisseph/ and
   following.

   Thomas Mack, mack@ifis.cs.tu-bs.de, 23rd of April 2001

*/
/* SWISSEPH
   $Header: /home/dieter/sweph/RCS/sweph.c,v 1.75 2008/08/26 07:23:27 dieter Exp $

   Ephemeris computations

  Authors: Dieter Koch and Alois Treindl, Astrodienst Zurich

**************************************************************/
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
/**
* This class contains all the constants that might be interesting to the
* user of the swisseph package.<P>
* All constants are static, so there is no need to instantiate the class.
* <P><I><B>You will find the complete documentation for the original
* SwissEphemeris package at <A HREF="http://www.astro.ch/swisseph/sweph_g.htm">
* http://www.astro.ch/swisseph/sweph_g.htm</A>. By far most of the information 
* there is directly valid for this port to Java as well.</B></I>
* @version 1.0.0a
*/
var Swe = Swe || {};

Swe.J_MERCURY =  0;
Swe.J_VENUS   =  1;
Swe.J_EARTH   =  2;
Swe.J_MARS    =  3;
Swe.J_JUPITER =  4;
Swe.J_SATURN  =  5;
Swe.J_URANUS  =  6;
Swe.J_NEPTUNE =  7;
Swe.J_PLUTO   =  8;
Swe.J_MOON    =  9;
Swe.J_SUN     = 10;
Swe.J_SBARY   = 11;
Swe.J_EMB     = 12;
Swe.J_NUT     = 13;
Swe.J_LIB     = 14;

Swe.OK=0;
Swe.ERR=-1;

/*
* planet numbers for the ipl parameter in swe_calc()
*/
Swe.SE_ECL_NUT=-1;
Swe.SE_SUN=0;
Swe.SE_MOON=1;
Swe.SE_MERCURY=2;
Swe.SE_VENUS=3;
Swe.SE_MARS=4;
Swe.SE_JUPITER=5;
Swe.SE_SATURN=6;
Swe.SE_URANUS=7;
Swe.SE_NEPTUNE=8;
Swe.SE_PLUTO=9;
Swe.SE_MEAN_NODE=10;
Swe.SE_TRUE_NODE=11;
Swe.SE_MEAN_APOG=12;
Swe.SE_OSCU_APOG=13;
Swe.SE_EARTH=14;
Swe.SE_CHIRON=15;
Swe.SE_PHOLUS=16;
Swe.SE_CERES=17;
Swe.SE_PALLAS=18;
Swe.SE_JUNO=19;
Swe.SE_VESTA=20;
Swe.SE_INTP_APOG=21;
Swe.SE_INTP_PERG=22;
Swe.SE_NPLANETS=23;
Swe.SE_AST_OFFSET=10000;
Swe.SE_VARUNA = Swe.SE_AST_OFFSET + 20000;
Swe.SE_FICT_OFFSET=40;
Swe.SE_FICT_OFFSET_1=39;
Swe.SE_FICT_MAX=999;
Swe.SE_NFICT_ELEM=15;
Swe.SE_COMET_OFFSET=2000;
Swe.SE_NALL_NAT_POINTS=(Swe.SE_NPLANETS + Swe.SE_NFICT_ELEM);
Swe.SE_CUPIDO=40;
Swe.SE_HADES=41;
Swe.SE_ZEUS=42;
Swe.SE_KRONOS=43;
Swe.SE_APOLLON=44;
Swe.SE_ADMETOS=45;
Swe.SE_VULKANUS=46;
Swe.SE_POSEIDON=47;
Swe.SE_ISIS=48;
Swe.SE_NIBIRU=49;
Swe.SE_HARRINGTON=50;
Swe.SE_NEPTUNE_LEVERRIER=51;
Swe.SE_NEPTUNE_ADAMS=52;
Swe.SE_PLUTO_LOWELL=53;
Swe.SE_PLUTO_PICKERING=54;
Swe.SE_VULCAN=55;
Swe.SE_WHITE_MOON=56;
Swe.SE_PROSERPINA=57;
Swe.SE_WALDEMATH=58;
Swe.SE_FIXSTAR=-10;
Swe.SE_ASC   =0;
Swe.SE_MC    =1;
Swe.SE_ARMC  =2;
Swe.SE_VERTEX=3;
Swe.SE_EQUASC=4;
Swe.SE_COASC1=5;
Swe.SE_COASC2=6;
Swe.SE_POLASC=7;
Swe.SE_NASCMC=8;

Swe.SEFLG_HELCTR=8;     // return heliocentric position
Swe.SEFLG_TRUEPOS=16;   // return true positions, not apparent
Swe.SEFLG_J2000=32;     // no precession, i.e. give J2000 equinox
Swe.SEFLG_NONUT=64;     // no nutation, i.e. mean equinox of date
Swe.SEFLG_SPEED3=128;   // speed from 3 positions (do not use
                                     // it, SEFLG_SPEED is faster and more
                                     // precise.)
Swe.SEFLG_SPEED=256;    // high precision speed
Swe.SEFLG_NOGDEFL=512;  // turn off gravitational deflection
Swe.SEFLG_NOABERR=1024; // turn off 'annual' aberration of light
Swe.SEFLG_EQUATORIAL=2*1024; // equatorial positions are wanted
Swe.SEFLG_XYZ=4*1024;     // cartesian, not polar, coordinates
Swe.SEFLG_RADIANS=8*1024; // coordinates in radians, not degrees
Swe.SEFLG_BARYCTR=16*1024; // barycentric positions
Swe.SEFLG_TOPOCTR=32*1024; // topocentric positions
Swe.SEFLG_SIDEREAL=64*1024; // sidereal positions
Swe.SEFLG_ICRS=128*1024; // ICRS (DE406 reference frame)
Swe.SEFLG_DPSIDEPS_1980=(256*1024); /* reproduce JPL Horizons 
                                    * 1962 - today to 0.002 arcsec. */
Swe.SEFLG_JPLHOR=Swe.SEFLG_DPSIDEPS_1980;
Swe.SEFLG_JPLHOR_APPROX=(512*1024);   /* approximate JPL Horizons 1962 - today */
Swe.SEFLG_TRANSIT_LONGITUDE =  128*1024;
Swe.SEFLG_TRANSIT_LATITUDE  =  256*1024;
Swe.SEFLG_TRANSIT_DISTANCE  =  512*1024;
Swe.SEFLG_TRANSIT_SPEED     = 1024*1024;
Swe.SEFLG_YOGA_TRANSIT      = 2048*1024;
Swe.SEFLG_PARTILE_TRANSIT_START = 4096*1024;
Swe.SEFLG_PARTILE_TRANSIT_END = 8192*1024;
Swe.SEFLG_PARTILE_TRANSIT = Swe.SEFLG_PARTILE_TRANSIT_START + Swe.SEFLG_PARTILE_TRANSIT_END;

Swe.SE_HOUSE1 = -1;
Swe.SE_HOUSE2 = -2;
Swe.SE_HOUSE3 = -3;
Swe.SE_HOUSE4 = -4;
Swe.SE_HOUSE5 = -5;
Swe.SE_HOUSE6 = -6;
Swe.SE_HOUSE7 = -7;
Swe.SE_HOUSE8 = -8;
Swe.SE_HOUSE9 = -9;
Swe.SE_HOUSE10 = -10;
Swe.SE_HOUSE11 = -11;
Swe.SE_HOUSE12 = -12;
Swe.SE_HSYS_PLACIDUS = 'P';
Swe.SE_HSYS_KOCH = 'K';
Swe.SE_HSYS_PORPHYRIUS = 'O';
Swe.SE_HSYS_REGIOMONTANUS = 'R';
Swe.SE_HSYS_CAMPANUS = 'C';
Swe.SE_HSYS_EQUAL = 'E';
Swe.SE_HSYS_VEHLOW = 'V';
Swe.SE_HSYS_MERIDIAN = 'X';
Swe.SE_HSYS_HORIZONTAL = 'H';
Swe.SE_HSYS_POLICH_PAGE = 'T';
Swe.SE_HSYS_ALCABITIUS = 'B';
Swe.SE_HSYS_GAUQUELIN_SECTORS = 'G';
Swe.SE_HSYS_MORINUS = 'M';
Swe.SE_HSYS_KRUSINSKI = 'U';
Swe.SE_HSYS_WHOLE_SIGN = 'W';

Swe.SEFLG_MOSEPH=4;
Swe.SEFLG_DEFAULTEPH=Swe.SEFLG_MOSEPH;
Swe.SEFLG_EPHMASK=1|2|Swe.SEFLG_MOSEPH;
Swe.SE_SIDBITS             =256;
Swe.SE_SIDM_FAGAN_BRADLEY  = 0;
Swe.SE_SIDM_LAHIRI         = 1;
Swe.SE_SIDM_DELUCE         = 2;
Swe.SE_SIDM_RAMAN          = 3;
Swe.SE_SIDM_USHASHASHI     = 4;
Swe.SE_SIDM_KRISHNAMURTI   = 5;
Swe.SE_SIDM_DJWHAL_KHUL    = 6;
Swe.SE_SIDM_YUKTESHWAR     = 7;
Swe.SE_SIDM_JN_BHASIN      = 8;
Swe.SE_SIDM_BABYL_KUGLER1  = 9;
Swe.SE_SIDM_BABYL_KUGLER2  =10;
Swe.SE_SIDM_BABYL_KUGLER3  =11;
Swe.SE_SIDM_BABYL_HUBER    =12;
Swe.SE_SIDM_BABYL_ETPSC    =13;
Swe.SE_SIDM_ALDEBARAN_15TAU=14;
Swe.SE_SIDM_HIPPARCHOS     =15;
Swe.SE_SIDM_SASSANIAN      =16;
Swe.SE_SIDM_GALCENT_0SAG   =17;

Swe.SE_SIDM_SURYASIDDHANTA =21;
Swe.SE_SIDM_SURYASIDDHANTA_MSUN =22;
Swe.SE_SIDM_ARYABHATA      =23;
Swe.SE_SIDM_ARYABHATA_MSUN =24;
Swe.SE_SIDM_SS_REVATI      =25;
Swe.SE_SIDM_SS_CITRA       =26;

Swe.SE_SIDM_TRUE_CITRA     =27;
Swe.SE_SIDM_TRUE_REVATI    =28;

Swe.SE_SIDM_TRUE_PUSHYA    =29;
Swe.SE_SIDM_USER          =255;
Swe.SE_MAX_STNAME=256;   // maximum size of fixstar 

Swe.SE_NODBIT_MEAN    =1; // mean nodes/apsides
Swe.SE_NODBIT_OSCU    =2; // osculating nodes/apsides
Swe.SE_NODBIT_OSCU_BAR=4; // same, but motion about solar
Swe.SE_NODBIT_FOPOINT =256; // focal point of orbit instead of aphelion

Swe.SE_SPLIT_DEG_ROUND_SEC =  1;
Swe.SE_SPLIT_DEG_ROUND_MIN =  2;
Swe.SE_SPLIT_DEG_ROUND_DEG =  4;
Swe.SE_SPLIT_DEG_ZODIACAL  =  8;
Swe.SE_SPLIT_DEG_KEEP_SIGN = 16;
                                        /* don't round to next sign,
                                         * e.g. 29.9999999 will be rounded
                                         * to 29d59'59" (or 29d59' or 29d) */
Swe.SE_SPLIT_DEG_KEEP_DEG  = 32;
                                        /* don't round to next degree
                                         * e.g. 13.9999999 will be rounded
                                         * to 13d59'59" (or 13d59' or 13d) */

Swe.SE_HELIACAL_RISING          = 1;
Swe.SE_HELIACAL_SETTING         = 2;
Swe.SE_MORNING_FIRST            = Swe.SE_HELIACAL_RISING;
Swe.SE_EVENING_LAST             = Swe.SE_HELIACAL_SETTING;
Swe.SE_EVENING_FIRST            = 3;
Swe.SE_MORNING_LAST             = 4;
Swe.SE_ACRONYCHAL_RISING        = 5;  /* still not implemented */
Swe.SE_ACRONYCHAL_SETTING       = 6;  /* still not implemented */
Swe.SE_COSMICAL_SETTING         = Swe.SE_ACRONYCHAL_SETTING;

Swe.SE_HELFLAG_LONG_SEARCH      = 128;
Swe.SE_HELFLAG_HIGH_PRECISION   = 256;
Swe.SE_HELFLAG_OPTICAL_PARAMS   = 512;
Swe.SE_HELFLAG_NO_DETAILS       = 1024;
Swe.SE_HELFLAG_SEARCH_1_PERIOD  = (1 << 11); /*  2048 */
Swe.SE_HELFLAG_VISLIM_DARK      = (1 << 12); /*  4096 */
Swe.SE_HELFLAG_VISLIM_NOMOON    = (1 << 13); /*  8192 */
Swe.SE_HELFLAG_VISLIM_PHOTOPIC  = (1 << 14); /* 16384 */
Swe.SE_HELFLAG_AV               = (1 << 15); /* 32768 */
Swe.SE_HELFLAG_AVKIND_VR        = (1 << 15); /* 32768 */
Swe.SE_HELFLAG_AVKIND_PTO       = (1 << 16);
Swe.SE_HELFLAG_AVKIND_MIN7      = (1 << 17);
Swe.SE_HELFLAG_AVKIND_MIN9      = (1 << 18);
Swe.SE_HELFLAG_AVKIND = Swe.SE_HELFLAG_AVKIND_VR|Swe.SE_HELFLAG_AVKIND_PTO|Swe.SE_HELFLAG_AVKIND_MIN7|Swe.SE_HELFLAG_AVKIND_MIN9;
Swe.TJD_INVALID              = 99999999.0;
//  Swe.SIMULATE_VICTORVB           = 1;  // is a #define for SweHel

Swe.SE_HELIACAL_LONG_SEARCH       = 128;
Swe.SE_HELIACAL_HIGH_PRECISION    = 256;
Swe.SE_HELIACAL_OPTICAL_PARAMS    = 512;
Swe.SE_HELIACAL_NO_DETAILS        = 1024;
Swe.SE_HELIACAL_SEARCH_1_PERIOD   = (1 << 11); /*  2048 */
Swe.SE_HELIACAL_VISLIM_DARK       = (1 << 12); /*  4096 */
Swe.SE_HELIACAL_VISLIM_NOMOON     = (1 << 13); /*  8192 */
Swe.SE_HELIACAL_VISLIM_PHOTOPIC   = (1 << 14); /* 16384 */
Swe.SE_HELIACAL_AVKIND_VR         = (1 << 15); /* 32768 */
Swe.SE_HELIACAL_AVKIND_PTO        = (1 << 16);
Swe.SE_HELIACAL_AVKIND_MIN7       = (1 << 17);
Swe.SE_HELIACAL_AVKIND_MIN9       = (1 << 18);
Swe.SE_HELIACAL_AVKIND = (Swe.SE_HELFLAG_AVKIND_VR|Swe.SE_HELFLAG_AVKIND_PTO|Swe.SE_HELFLAG_AVKIND_MIN7|Swe.SE_HELFLAG_AVKIND_MIN9);

Swe.SE_PHOTOPIC_FLAG            = 0;
Swe.SE_SCOTOPIC_FLAG            = 1;
Swe.SE_MIXEDOPIC_FLAG           = 2;

/* for setGlobalTidalAcc() and ephemeris-dependent delta t:
 * intrinsic tidal acceleration in the mean motion of the moon,
 * not given in the parameters list of the ephemeris files but computed
 * by Chapront/Chapront-TouzÃ©/Francou A&A 387 (2002), p. 705.
 */
Swe.SE_TIDAL_DE200       =  (-23.8946);
Swe.SE_TIDAL_DE403       =  (-25.580);  /* was (-25.8) until V. 1.76.2 */
Swe.SE_TIDAL_DE404       =  (-25.580);  /* was (-25.8) until V. 1.76.2 */
Swe.SE_TIDAL_DE405       =  (-25.826);  /* was (-25.7376) until V. 1.76.2 */
Swe.SE_TIDAL_DE406       =  (-25.826);  /* was (-25.7376) until V. 1.76.2 */
Swe.SE_TIDAL_DE421       =  (-25.85);   /* JPL Interoffice Memorandum 14-mar-2008 on DE421 Lunar Orbit */
Swe.SE_TIDAL_DE430       =  (-25.82);   /* JPL Interoffice Memorandum 9-jul-2013 on DE430 Lunar Orbit */
Swe.SE_TIDAL_DE431       =  (-25.80);   /* IPN Progress Report 42-196 ƒÇ› February 15, 2014, p. 15 */
Swe.SE_TIDAL_26          =  (-26.0);
Swe.SE_TIDAL_DEFAULT     =  Swe.SE_TIDAL_DE431;
Swe.SE_TIDAL_AUTOMATIC   =  999999;
Swe.SE_TIDAL_MOSEPH      =  Swe.SE_TIDAL_DE404;
Swe.SE_TIDAL_SWIEPH      =  Swe.SE_TIDAL_DEFAULT;
Swe.SE_TIDAL_JPLEPH      =  Swe.SE_TIDAL_DEFAULT;

Swe.SE_MODEL_PREC_LONGTERM  = 0;
Swe.SE_MODEL_PREC_SHORTTERM = 1;
Swe.SE_MODEL_NUT            = 2;
Swe.SE_MODEL_SIDT           = 3;
Swe.SE_MODEL_BIAS           = 4;
Swe.SE_MODEL_JPLHOR_MODE    = 5;
Swe.SE_MODEL_JPLHORA_MODE   = 6;
Swe.SE_MODEL_DELTAT         = 7;

/* precession models */
Swe.SEMOD_PREC_IAU_1976       = 1;
Swe.SEMOD_PREC_IAU_2000       = 2;
Swe.SEMOD_PREC_IAU_2006       = 3;
Swe.SEMOD_PREC_BRETAGNON_2003 = 4;
Swe.SEMOD_PREC_LASKAR_1986    = 5;
Swe.SEMOD_PREC_SIMON_1994     = 6;
Swe.SEMOD_PREC_WILLIAMS_1994  = 7;
Swe.SEMOD_PREC_VONDRAK_2011   = 8;
Swe.SEMOD_PREC_DEFAULT        = Swe.SEMOD_PREC_VONDRAK_2011;
/* former implementations of the used 
 * IAU 1976, 2000 and 2006 for a limited time range
 * in combination with a different model for 
 * long term precession. 
#define SEMOD_PREC_DEFAULT_SHORT SEMOD_PREC_IAU_2000
 */
Swe.SEMOD_PREC_DEFAULT_SHORT = Swe.SEMOD_PREC_VONDRAK_2011;

/* nutation models */
Swe.SEMOD_NUT_IAU_1980        = 1;
Swe.SEMOD_NUT_IAU_CORR_1987   = 2; /* Herring's (1987) corrections to IAU 1980 
            * nutation series. AA (1996) neglects them.*/
Swe.SEMOD_NUT_IAU_2000A       = 3; /* very time consuming ! */
Swe.SEMOD_NUT_IAU_2000B       = 4; /* fast, but precision of milli-arcsec */
Swe.SEMOD_NUT_DEFAULT         = Swe.SEMOD_NUT_IAU_2000B;  /* fast, but precision of milli-arcsec */

/* methods for sidereal time */
Swe.SEMOD_SIDT_LONGTERM       = 1;
Swe.SEMOD_SIDT_IERS_CONV_2010 = 2;
Swe.SEMOD_SIDT_PREC_MODEL     = 3;
Swe.SEMOD_SIDT_DEFAULT        = Swe.SEMOD_SIDT_LONGTERM;

/* frame bias methods */
Swe.SEMOD_BIAS_IAU2000        = 1;  /* use frame bias matrix IAU 2000 */
Swe.SEMOD_BIAS_IAU2006        = 2;  /* use frame bias matrix IAU 2000 */
Swe.SEMOD_BIAS_DEFAULT        = Swe.SEMOD_BIAS_IAU2006;
/* methods of JPL Horizons (iflag & SEFLG_JPLHOR), 
 * using daily dpsi, deps;  see explanations below */
Swe.SEMOD_JPLHOR_EXTENDED_1800 = 1;  /* daily dpsi and deps from file are 
                                     * limited to 1962 - today. JPL uses the
             * first and last value for all  dates 
             * beyond this time range. */
Swe.SEMOD_JPLHOR_NOT_EXTENDED  = 2;  /* outside the available time range 
                                     * 1962 - today default to SEFLG_JPLHOR_APROX */
Swe.SEMOD_JPLHOR_DEFAULT       = Swe.SEMOD_JPLHOR_EXTENDED_1800;
Swe.SEMOD_JPLHORA_1     = 1;
Swe.SEMOD_JPLHORA_2     = 2;
Swe.SEMOD_JPLHORA_DEFAULT     = Swe.SEMOD_JPLHORA_1;
Swe.SEMOD_DELTAT_ESPENAK_MEEUS_2006   = 1;
Swe.SEMOD_DELTAT_STEPHENSON_MORRISON_2004   = 2;
Swe.SEMOD_DELTAT_DEFAULT = Swe.SEMOD_DELTAT_ESPENAK_MEEUS_2006;

Swe.SE_EPHE_PATH="";
Swe.SE_STARFILE_OLD="fixstars.cat";
Swe.SE_STARFILE="sefstars.txt";
Swe.SE_ASTNAMFILE="seasnam.txt";
/**
* The name of the file containing the orbital elements of ficticious planets.
*/
Swe.SE_FICTFILE="seorbel.txt";


/* defines for eclipse computations */

Swe.SE_ECL_CENTRAL=1;
Swe.SE_ECL_NONCENTRAL=2;
Swe.SE_ECL_TOTAL=4;
/**
* Annular eclipse. This is an eclipse, where the moon is seen smaller
* than the sun, so you get a "ring" of the sun around the moon.
*/
Swe.SE_ECL_ANNULAR=8;
Swe.SE_ECL_PARTIAL=16;
Swe.SE_ECL_ANNULAR_TOTAL=32;
Swe.SE_ECL_PENUMBRAL=64;
Swe.SE_ECL_ALLTYPES_SOLAR = Swe.SE_ECL_CENTRAL|Swe.SE_ECL_NONCENTRAL|Swe.SE_ECL_TOTAL|Swe.SE_ECL_ANNULAR|Swe.SE_ECL_PARTIAL|Swe.SE_ECL_ANNULAR_TOTAL;
Swe.SE_ECL_ALLTYPES_LUNAR = Swe.SE_ECL_TOTAL|Swe.SE_ECL_PARTIAL|Swe.SE_ECL_PENUMBRAL;
Swe.SE_ECL_VISIBLE=128;
Swe.SE_ECL_MAX_VISIBLE=256;
Swe.SE_ECL_1ST_VISIBLE  =512; /* begin of partial eclipse */
Swe.SE_ECL_PARTBEG_VISIBLE=512; /* begin of partial eclipse */
Swe.SE_ECL_2ND_VISIBLE  =1024;  /* begin of total eclipse */
Swe.SE_ECL_TOTBEG_VISIBLE =1024;  /* begin of total eclipse */
Swe.SE_ECL_3RD_VISIBLE  =2048;    /* end of total eclipse */
Swe.SE_ECL_TOTEND_VISIBLE =2048;    /* end of total eclipse */
Swe.SE_ECL_4TH_VISIBLE  =4096;    /* end of partial eclipse */
Swe.SE_ECL_PARTEND_VISIBLE=4096;    /* end of partial eclipse */
Swe.SE_ECL_PENUMBBEG_VISIBLE=8192;    /* begin of penumbral eclipse */
Swe.SE_ECL_PENUMBEND_VISIBLE=16384;   /* end of penumbral eclipse */
Swe.SE_ECL_OCC_BEG_DAYLIGHT=8192;    /* occultation begins during the day */
Swe.SE_ECL_OCC_END_DAYLIGHT=16384;   /* occultation ends during the day */
Swe.SE_ECL_ONE_TRY=32*1024;
Swe.SE_CALC_RISE          = 1;
Swe.SE_CALC_SET           = 2;
Swe.SE_BIT_DISC_CENTER   = 256;
                                  /* to be or'ed to SE_CALC_RISE/SET
                                   * if rise or set of disc center is
                                   * required */
Swe.SE_BIT_DISC_BOTTOM   = 8192;
                                  /* to be or'ed to SE_CALC_RISE/SET,
                                   * if rise or set of lower limb of
                                   * disc is requried */
Swe.SE_BIT_NO_REFRACTION = 512;
                                  /* to be or'ed to SE_CALC_RISE/SET,
                                   * if refraction is not to be considered */
Swe.SE_BIT_CIVIL_TWILIGHT =  1024; /* to be or'ed to SE_CALC_RISE/SET */
Swe.SE_BIT_NAUTIC_TWILIGHT = 2048; /* to be or'ed to SE_CALC_RISE/SET */
Swe.SE_BIT_ASTRO_TWILIGHT =  4096; /* to be or'ed to SE_CALC_RISE/SET */
Swe.SE_BIT_FIXED_DISC_SIZE  = (16*1024); /* or'ed to SE_CALC_RISE/SET:
                                   * neglect the effect of distance on
                                   * disc size */
Swe.SE_ECL2HOR            = 0;
Swe.SE_EQU2HOR            = 1;
Swe.SE_HOR2ECL            = 0;
Swe.SE_HOR2EQU            = 1;
Swe.SE_TRUE_TO_APP =0;
Swe.SE_APP_TO_TRUE =1;

Swe.AUNIT=1.4959787066e+11; 

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
   available - the copyright notes at http://www.astro.ch/swisseph/ and
   following. 

   Thomas Mack, mack@ifis.cs.tu-bs.de, 23rd of April 2001

*/
/* SWISSEPH
   $Header: /home/dieter/sweph/RCS/swemplan.c,v 1.74 2008/06/16 10:07:20 dieter Exp $
   Moshier planet routines

   modified for SWISSEPH by Dieter Koch

**************************************************************/
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
class IntObj{
  constructor(val){
    this.val = val;
    if(val === undefined) this.val = 0;
  }
};

class DblObj{
  constructor(val){
    this.val = val;
    if(val === undefined) this.val = 0;
  }
};

class Epsilon{
  constructor(){
    this.teps = 0.0;
    this.eps = 0.0;
    this.seps = 0.0;
    this.ceps = 0.0;
  }
  clearData(){
    this.teps = 0.0;
    this.eps = 0.0;
    this.seps = 0.0;
    this.ceps = 0.0;
  }
};

class FileData{
  constructor(){
    this.SEI_FILE_NMAXPLAN=50;
    this.ipl = new Array(this.SEI_FILE_NMAXPLAN);
    this.fnam="";
    this.fversion=0;
    this.astnam="";
    this.sweph_denum=0;
    this.tfstart=1.0;
    this.tfend=0.0;
    this.iflg=0;
    this.npl=0;
  }
  clearData(){
    for(var j=0; j<this.ipl.length; j++) { this.ipl[j]=0.0; }
    this.fnam="";
    this.fversion=0;
    this.astnam="";
    this.sweph_denum=0;
    this.tfstart=1.0;
    this.tfend=0.0;
    this.iflg=0;
    this.npl=0;
  }
};

class IDate{
  constructor(){
    this.year;
    this.month;
    this.day;
    this.hour;
  }
}

class MeffEle{
  constructor(r, m){
    this.r = r;
    this.m = m;
  }
};

class Nut{
  constructor(){
    this.tnut=0.0;
    this.snut=0.0;
    this.cnut=0.0;
    this.nutlo = new Array(2);
    this.matrix = new Array(3);
    for(var j=0; j<3; j++) {
      this.matrix[j] = new Array(3);
    }
  }
  clearData(){
    this.tnut=0.0;
    this.snut=0.0;
    this.cnut=0.0;
    for(var j=0; j<2; j++) { this.nutlo[j]=0.0; }
    for(var j=0; j<3; j++) {
      for(var i=0; i<3; i++) {
        this.matrix[j][i]=0.0;
      }
    }
  }
};

class Plantbl{
  constructor(max_harmonic, max_power_of_t, arg_tbl, lon_tbl, lat_tbl, rad_tbl, distance){
    this.max_harmonic=max_harmonic;
    this.max_power_of_t=max_power_of_t;
    this.arg_tbl=arg_tbl;
    this.lon_tbl=lon_tbl;
    this.lat_tbl=lat_tbl;
    this.rad_tbl=rad_tbl;
    this.distance=distance;
  }
}
class PlanData{
  constructor(r, m){
    this.x = new Array(6);
    this.xreturn = new Array(24);
    for(var i=0; i<6; i++) { this.x[i]=0.0; }
    for(var i=0; i<24; i++) { this.xreturn[i]=0.0; }
    this.ibdy=0;   
    this.iflg=0;
    this.ncoe=0; 
    this.lndx0=0;
    this.nndx=0;         
    this.tfstart=0;     /* file contains ephemeris for tfstart thru tfend */
    this.tfend=0;       /*      for this particular planet !!!            */
    this.dseg=0;        /* segment size (days covered by a polynomial)  */
    this.telem=0;       /* epoch of elements */
    this.prot=0;
    this.qrot=0;
    this.dprot=0;
    this.dqrot=0;
    this.rmax=0;        /* normalisation factor of cheby coefficients */
    this.peri=0;
    this.dperi=0;
    this.refep=null;
    this.segp=null; 
    this.neval=0;
    this.teval=0;       /* time for which previous computation was made */
    this.iephe=0;          /* which ephemeris was used */
    this.xflgs=0;         /* hel., light-time, aberr., prec. flags etc. */
  }

  clearData(){
    this.ibdy=0;
    this.iflg=0;
    this.ncoe=0;
    this.lndx0=0;
    this.nndx=0;
    this.tfstart=0.0;
    this.tfend=0.0;
    this.dseg=0.0;
    this.telem=0.0;
    this.prot=0.0;
    this.qrot=0.0;
    this.dprot=0.0;
    this.dqrot=0.0;
    this.rmax=0.0;
    this.peri=0.0;
    this.dperi=0.0;
    this.tseg0=0.0;
    this.tseg1=0.0;
    this.neval=0;
    this.teval=0.0;
    this.iephe=0;
    this.xflgs=0;
    for(var j=0; j<this.x.length; j++) { this.x[j]=0.0; }
    for(var j=0; j<this.xreturn.length; j++) { this.xreturn[j]=0.0; }
    this.refep=null;
    this.segp=null;
  }
};

class SarosData{
  constructor(series_no, tstart){
    this.series_no = series_no;
    this.tstart = tstart;
  }
};


class SavePositions{
  constructor(){
    this.ipl = 0;
    this.tsave = 0.0;
    this.iflgsave = 0;
    this.xsaves = new Array(24);
  }
  clearData(){
    this.ipl = 0;
    this.tsave = 0.0;
    this.iflgsave = 0;
    for(var j=0; j<this.xsaves.length; j++) { this.xsaves[j]=0.0; }
  }
};

class SidData{
  constructor(){
    this.sid_mode = 0.0;
    this.ayan_t0 = 0.0;
    this.t0 = 0;
  }

  clearData(){
    this.sid_mode = 0.0;
    this.ayan_t0 = 0.0;
    this.t0 = 0;
  }
};

class TopoData{
  constructor(){
    this.geolon = 0.0;
    this.geolat = 0.0;
    this.geoalt = 0.0;
    this.teval = 0.0;
    this.tjd_ut = 0.0;
    this.xobs = new Array(6);
  }

  clearData(){
    this.geolon = 0.0;
    this.geolat = 0.0;
    this.geoalt = 0.0;
    this.teval = 0.0;
    this.tjd_ut = 0.0;
    this.xobs = new Array(6);
  }
};

class Houses{
  constructor(){
    this.cusp = new Array(37);
    this.ac = 0.0;
    this.mc = 0.0;
    this.vertex = 0.0;
    this.equasc = 0.0;
    this.coasc1 = 0.0;
    this.coasc2 = 0.0;
    this.polasc = 0.0;
  }
}

Swe.Swenut2000a = {
    O1MAS2DEG : 1 / 3600.0 / 10000000.0,
    NLS : 678,
    NLS_2000B : 77,
    NPL : 687,
    icpl : [
  1440, 0, 0, 0,
  56, -117, -42, -40,
  125, -43, 0, -54,
  0, 5, 0, 0,
  3, -7, -3, 0,
  3, 0, 0, -2,
  -114, 0, 0, 61,
  -219, 89, 0, 0,
  -3, 0, 0, 0,
  -462, 1604, 0, 0,
  99, 0, 0, -53,
  -3, 0, 0, 2,
  0, 6, 2, 0,
  3, 0, 0, 0,
  -12, 0, 0, 0,
  14, -218, 117, 8,
  31, -481, -257, -17,
  -491, 128, 0, 0,
  -3084, 5123, 2735, 1647,
  -1444, 2409, -1286, -771,
  11, -24, -11, -9,
  26, -9, 0, 0,
  103, -60, 0, 0,
  0, -13, -7, 0,
  -26, -29, -16, 14,
  9, -27, -14, -5,
  12, 0, 0, -6,
  -7, 0, 0, 0,
  0, 24, 0, 0,
  284, 0, 0, -151,
  226, 101, 0, 0,
  0, -8, -2, 0,
  0, -6, -3, 0,
  5, 0, 0, -3,
  -41, 175, 76, 17,
  0, 15, 6, 0,
  425, 212, -133, 269,
  1200, 598, 319, -641,
  235, 334, 0, 0,
  11, -12, -7, -6,
  5, -6, 3, 3,
  -5, 0, 0, 3,
  6, 0, 0, -3,
  15, 0, 0, 0,
  13, 0, 0, -7,
  -6, -9, 0, 0,
  266, -78, 0, 0,
  -460, -435, -232, 246,
  0, 15, 7, 0,
  -3, 0, 0, 2,
  0, 131, 0, 0,
  4, 0, 0, 0,
  0, 3, 0, 0,
  0, 4, 2, 0,
  0, 3, 0, 0,
  -17, -19, -10, 9,
  -9, -11, 6, -5,
  -6, 0, 0, 3,
  -16, 8, 0, 0,
  0, 3, 0, 0,
  11, 24, 11, -5,
  -3, -4, -2, 1,
  3, 0, 0, -1,
  0, -8, -4, 0,
  0, 3, 0, 0,
  0, 5, 0, 0,
  0, 3, 2, 0,
  -6, 4, 2, 3,
  -3, -5, 0, 0,
  -5, 0, 0, 2,
  4, 24, 13, -2,
  -42, 20, 0, 0,
  -10, 233, 0, 0,
  -3, 0, 0, 1,
  78, -18, 0, 0,
  0, 3, 1, 0,
  0, -3, -1, 0,
  0, -4, -2, 1,
  0, -8, -4, -1,
  0, -5, 3, 0,
  -7, 0, 0, 3,
  -14, 8, 3, 6,
  0, 8, -4, 0,
  0, 19, 10, 0,
  45, -22, 0, 0,
  -3, 0, 0, 0,
  0, -3, 0, 0,
  0, 3, 0, 0,
  3, 5, 3, -2,
  89, -16, -9, -48,
  0, 3, 0, 0,
  -3, 7, 4, 2,
  -349, -62, 0, 0,
  -15, 22, 0, 0,
  -3, 0, 0, 0,
  -53, 0, 0, 0,
  5, 0, 0, -3,
  0, -8, 0, 0,
  15, -7, -4, -8,
  -3, 0, 0, 1,
  -21, -78, 0, 0,
  20, -70, -37, -11,
  0, 6, 3, 0,
  5, 3, 2, -2,
  -17, -4, -2, 9,
  0, 6, 3, 0,
  32, 15, -8, 17,
  174, 84, 45, -93,
  11, 56, 0, 0,
  -66, -12, -6, 35,
  47, 8, 4, -25,
  0, 8, 4, 0,
  10, -22, -12, -5,
  -3, 0, 0, 2,
  -24, 12, 0, 0,
  5, -6, 0, 0,
  3, 0, 0, -2,
  4, 3, 1, -2,
  0, 29, 15, 0,
  -5, -4, -2, 2,
  8, -3, -1, -5,
  0, -3, 0, 0,
  10, 0, 0, 0,
  3, 0, 0, -2,
  -5, 0, 0, 3,
  46, 66, 35, -25,
  -14, 7, 0, 0,
  0, 3, 2, 0,
  -5, 0, 0, 0,
  -68, -34, -18, 36,
  0, 14, 7, 0,
  10, -6, -3, -5,
  -5, -4, -2, 3,
  -3, 5, 2, 1,
  76, 17, 9, -41,
  84, 298, 159, -45,
  3, 0, 0, -1,
  -3, 0, 0, 2,
  -3, 0, 0, 1,
  -82, 292, 156, 44,
  -73, 17, 9, 39,
  -9, -16, 0, 0,
  3, 0, -1, -2,
  -3, 0, 0, 0,
  -9, -5, -3, 5,
  -439, 0, 0, 0,
  57, -28, -15, -30,
  0, -6, -3, 0,
  -4, 0, 0, 2,
  -40, 57, 30, 21,
  23, 7, 3, -13,
  273, 80, 43, -146,
  -449, 430, 0, 0,
  -8, -47, -25, 4,
  6, 47, 25, -3,
  0, 23, 13, 0,
  -3, 0, 0, 2,
  3, -4, -2, -2,
  -48, -110, -59, 26,
  51, 114, 61, -27,
  -133, 0, 0, 57,
  0, 4, 0, 0,
  -21, -6, -3, 11,
  0, -3, -1, 0,
  -11, -21, -11, 6,
  -18, -436, -233, 9,
  35, -7, 0, 0,
  0, 5, 3, 0,
  11, -3, -1, -6,
  -5, -3, -1, 3,
  -53, -9, -5, 28,
  0, 3, 2, 1,
  4, 0, 0, -2,
  0, -4, 0, 0,
  -50, 194, 103, 27,
  -13, 52, 28, 7,
  -91, 248, 0, 0,
  6, 49, 26, -3,
  -6, -47, -25, 3,
  0, 5, 3, 0,
  52, 23, 10, -23,
  -3, 0, 0, 1,
  0, 5, 3, 0,
  -4, 0, 0, 0,
  -4, 8, 3, 2,
  10, 0, 0, 0,
  3, 0, 0, -2,
  0, 8, 4, 0,
  0, 8, 4, 1,
  -4, 0, 0, 0,
  -4, 0, 0, 0,
  -8, 4, 2, 4,
  8, -4, -2, -4,
  0, 15, 7, 0,
  -138, 0, 0, 0,
  0, -7, -3, 0,
  0, -7, -3, 0,
  54, 0, 0, -29,
  0, 10, 4, 0,
  -7, 0, 0, 3,
  -37, 35, 19, 20,
  0, 4, 0, 0,
  -4, 9, 0, 0,
  8, 0, 0, -4,
  -9, -14, -8, 5,
  -3, -9, -5, 3,
  -145, 47, 0, 0,
  -10, 40, 21, 5,
  11, -49, -26, -7,
  -2150, 0, 0, 932,
  -12, 0, 0, 5,
  85, 0, 0, -37,
  4, 0, 0, -2,
  3, 0, 0, -2,
  -86, 153, 0, 0,
  -6, 9, 5, 3,
  9, -13, -7, -5,
  -8, 12, 6, 4,
  -51, 0, 0, 22,
  -11, -268, -116, 5,
  0, 12, 5, 0,
  0, 7, 3, 0,
  31, 6, 3, -17,
  140, 27, 14, -75,
  57, 11, 6, -30,
  -14, -39, 0, 0,
  0, -6, -2, 0,
  4, 15, 8, -2,
  0, 4, 0, 0,
  -3, 0, 0, 1,
  0, 11, 5, 0,
  9, 6, 0, 0,
  -4, 10, 4, 2,
  5, 3, 0, 0,
  16, 0, 0, -9,
  -3, 0, 0, 0,
  0, 3, 2, -1,
  7, 0, 0, -3,
  -25, 22, 0, 0,
  42, 223, 119, -22,
  -27, -143, -77, 14,
  9, 49, 26, -5,
  -1166, 0, 0, 505,
  -5, 0, 0, 2,
  -6, 0, 0, 3,
  -8, 0, 1, 4,
  0, -4, 0, 0,
  117, 0, 0, -63,
  -4, 8, 4, 2,
  3, 0, 0, -2,
  -5, 0, 0, 2,
  0, 31, 0, 0,
  -5, 0, 1, 3,
  4, 0, 0, -2,
  -4, 0, 0, 2,
  -24, -13, -6, 10,
  3, 0, 0, 0,
  0, -32, -17, 0,
  8, 12, 5, -3,
  3, 0, 0, -1,
  7, 13, 0, 0,
  -3, 16, 0, 0,
  50, 0, 0, -27,
  0, -5, -3, 0,
  13, 0, 0, 0,
  0, 5, 3, 1,
  24, 5, 2, -11,
  5, -11, -5, -2,
  30, -3, -2, -16,
  18, 0, 0, -9,
  8, 614, 0, 0,
  3, -3, -1, -2,
  6, 17, 9, -3,
  -3, -9, -5, 2,
  0, 6, 3, -1,
  -127, 21, 9, 55,
  3, 5, 0, 0,
  -6, -10, -4, 3,
  5, 0, 0, 0,
  16, 9, 4, -7,
  3, 0, 0, -2,
  0, 22, 0, 0,
  0, 19, 10, 0,
  7, 0, 0, -4,
  0, -5, -2, 0,
  0, 3, 1, 0,
  -9, 3, 1, 4,
  17, 0, 0, -7,
  0, -3, -2, -1,
  -20, 34, 0, 0,
  -10, 0, 1, 5,
  -4, 0, 0, 2,
  22, -87, 0, 0,
  -4, 0, 0, 2,
  -3, -6, -2, 1,
  -16, -3, -1, 7,
  0, -3, -2, 0,
  4, 0, 0, 0,
  -68, 39, 0, 0,
  27, 0, 0, -14,
  0, -4, 0, 0,
  -25, 0, 0, 0,
  -12, -3, -2, 6,
  3, 0, 0, -1,
  3, 66, 29, -1,
  490, 0, 0, -213,
  -22, 93, 49, 12,
  -7, 28, 15, 4,
  -3, 13, 7, 2,
  -46, 14, 0, 0,
  -5, 0, 0, 0,
  2, 1, 0, 0,
  0, -3, 0, 0,
  -28, 0, 0, 15,
  5, 0, 0, -2,
  0, 3, 0, 0,
  -11, 0, 0, 5,
  0, 3, 1, 0,
  -3, 0, 0, 1,
  25, 106, 57, -13,
  5, 21, 11, -3,
  1485, 0, 0, 0,
  -7, -32, -17, 4,
  0, 5, 3, 0,
  -6, -3, -2, 3,
  30, -6, -2, -13,
  -4, 4, 0, 0,
  -19, 0, 0, 10,
  0, 4, 2, -1,
  0, 3, 0, 0,
  4, 0, 0, -2,
  0, -3, -1, 0,
  -3, 0, 0, 0,
  5, 3, 1, -2,
  0, 11, 0, 0,
  118, 0, 0, -52,
  0, -5, -3, 0,
  -28, 36, 0, 0,
  5, -5, 0, 0,
  14, -59, -31, -8,
  0, 9, 5, 1,
  -458, 0, 0, 198,
  0, -45, -20, 0,
  9, 0, 0, -5,
  0, -3, 0, 0,
  0, -4, -2, -1,
  11, 0, 0, -6,
  6, 0, 0, -2,
  -16, 23, 0, 0,
  0, -4, -2, 0,
  -5, 0, 0, 2,
  -166, 269, 0, 0,
  15, 0, 0, -8,
  10, 0, 0, -4,
  -78, 45, 0, 0,
  0, -5, -2, 0,
  7, 0, 0, -4,
  -5, 328, 0, 0,
  3, 0, 0, -2,
  5, 0, 0, -2,
  0, 3, 1, 0,
  -3, 0, 0, 0,
  -3, 0, 0, 0,
  0, -4, -2, 0,
  -1223, -26, 0, 0,
  0, 7, 3, 0,
  3, 0, 0, 0,
  0, 3, 2, 0,
  -6, 20, 0, 0,
  -368, 0, 0, 0,
  -75, 0, 0, 0,
  11, 0, 0, -6,
  3, 0, 0, -2,
  -3, 0, 0, 1,
  -13, -30, 0, 0,
  21, 3, 0, 0,
  -3, 0, 0, 1,
  -4, 0, 0, 2,
  8, -27, 0, 0,
  -19, -11, 0, 0,
  -4, 0, 0, 2,
  0, 5, 2, 0,
  -6, 0, 0, 2,
  -8, 0, 0, 0,
  -1, 0, 0, 0,
  -14, 0, 0, 6,
  6, 0, 0, 0,
  -74, 0, 0, 32,
  0, -3, -1, 0,
  4, 0, 0, -2,
  8, 11, 0, 0,
  0, 3, 2, 0,
  -262, 0, 0, 114,
  0, -4, 0, 0,
  -7, 0, 0, 4,
  0, -27, -12, 0,
  -19, -8, -4, 8,
  0, -3, -1, 0,
  3, 0, 0, -2,
  0, 8, 0, 0,
  3, 10, 4, -1,
  3, 0, 0, -1,
  0, -7, -3, 0,
  0, -4, -2, 0,
  6, 19, 0, 0,
  5, -173, -75, -2,
  0, -7, -3, 0,
  7, -12, -5, -3,
  -3, 0, 0, 2,
  3, -4, -2, -1,
  74, 0, 0, -32,
  -3, 12, 6, 2,
  26, -14, -6, -11,
  19, 0, 0, -8,
  6, 24, 13, -3,
  83, 0, 0, 0,
  0, -10, -5, 0,
  11, -3, -1, -5,
  3, 0, 1, -1,
  3, 0, 0, -1,
  -4, 0, 0, 0,
  5, -23, -12, -3,
  -339, 0, 0, 147,
  0, -10, -5, 0,
  5, 0, 0, 0,
  3, 0, 0, -1,
  0, -4, -2, 0,
  18, -3, 0, 0,
  9, -11, -5, -4,
  -8, 0, 0, 4,
  3, 0, 0, -1,
  0, 9, 0, 0,
  6, -9, -4, -2,
  -4, -12, 0, 0,
  67, -91, -39, -29,
  30, -18, -8, -13,
  0, 0, 0, 0,
  0, -114, -50, 0,
  0, 0, 0, 23,
  517, 16, 7, -224,
  0, -7, -3, 0,
  143, -3, -1, -62,
  29, 0, 0, -13,
  -4, 0, 0, 2,
  -6, 0, 0, 3,
  5, 12, 5, -2,
  -25, 0, 0, 11,
  -3, 0, 0, 1,
  0, 4, 2, 0,
  -22, 12, 5, 10,
  50, 0, 0, -22,
  0, 7, 4, 0,
  0, 3, 1, 0,
  -4, 4, 2, 2,
  -5, -11, -5, 2,
  0, 4, 2, 0,
  4, 17, 9, -2,
  59, 0, 0, 0,
  0, -4, -2, 0,
  -8, 0, 0, 4,
  -3, 0, 0, 0,
  4, -15, -8, -2,
  370, -8, 0, -160,
  0, 0, -3, 0,
  0, 3, 1, 0,
  -6, 3, 1, 3,
  0, 6, 0, 0,
  -10, 0, 0, 4,
  0, 9, 4, 0,
  4, 17, 7, -2,
  34, 0, 0, -15,
  0, 5, 3, 0,
  -5, 0, 0, 2,
  -37, -7, -3, 16,
  3, 13, 7, -2,
  40, 0, 0, 0,
  0, -3, -2, 0,
  -184, -3, -1, 80,
  -3, 0, 0, 1,
  -3, 0, 0, 0,
  0, -10, -6, -1,
  31, -6, 0, -13,
  -3, -32, -14, 1,
  -7, 0, 0, 3,
  0, -8, -4, 0,
  3, -4, 0, 0,
  0, 4, 0, 0,
  0, 3, 1, 0,
  19, -23, -10, 2,
  0, 0, 0, -10,
  0, 3, 2, 0,
  0, 9, 5, -1,
  28, 0, 0, 0,
  0, -7, -4, 0,
  8, -4, 0, -4,
  0, 0, -2, 0,
  0, 3, 0, 0,
  -3, 0, 0, 1,
  -9, 0, 1, 4,
  3, 12, 5, -1,
  17, -3, -1, 0,
  0, 7, 4, 0,
  19, 0, 0, 0,
  0, -5, -3, 0,
  14, -3, 0, -1,
  0, 0, -1, 0,
  0, 0, 0, -5,
  0, 5, 3, 0,
  13, 0, 0, 0,
  0, -3, -2, 0,
  2, 9, 4, 3,
  0, 0, 0, -4,
  8, 0, 0, 0,
  0, 4, 2, 0,
  6, 0, 0, -3,
  6, 0, 0, 0,
  0, 3, 1, 0,
  5, 0, 0, -2,
  3, 0, 0, -1,
  -3, 0, 0, 0,
  6, 0, 0, 0,
  7, 0, 0, 0,
  -4, 0, 0, 0,
  4, 0, 0, 0,
  6, 0, 0, 0,
  0, -4, 0, 0,
  0, -4, 0, 0,
  5, 0, 0, 0,
  -3, 0, 0, 0,
  4, 0, 0, 0,
  -5, 0, 0, 0,
  4, 0, 0, 0,
  0, 3, 0, 0,
  13, 0, 0, 0,
  21, 11, 0, 0,
  0, -5, 0, 0,
  0, -5, -2, 0,
  0, 5, 3, 0,
  0, -5, 0, 0,
  -3, 0, 0, 2,
  20, 10, 0, 0,
  -34, 0, 0, 0,
  -19, 0, 0, 0,
  3, 0, 0, -2,
  -3, 0, 0, 1,
  -6, 0, 0, 3,
  -4, 0, 0, 0,
  3, 0, 0, 0,
  3, 0, 0, 0,
  4, 0, 0, 0,
  3, 0, 0, -1,
  6, 0, 0, -3,
  -8, 0, 0, 3,
  0, 3, 1, 0,
  -3, 0, 0, 0,
  0, -3, -2, 0,
  126, -63, -27, -55,
  -5, 0, 1, 2,
  -3, 28, 15, 2,
  5, 0, 1, -2,
  0, 9, 4, 1,
  0, 9, 4, -1,
  -126, -63, -27, 55,
  3, 0, 0, -1,
  21, -11, -6, -11,
  0, -4, 0, 0,
  -21, -11, -6, 11,
  -3, 0, 0, 1,
  0, 3, 1, 0,
  8, 0, 0, -4,
  -6, 0, 0, 3,
  -3, 0, 0, 1,
  3, 0, 0, -1,
  -3, 0, 0, 1,
  -5, 0, 0, 2,
  24, -12, -5, -11,
  0, 3, 1, 0,
  0, 3, 1, 0,
  0, 3, 2, 0,
  -24, -12, -5, 10,
  4, 0, -1, -2,
  13, 0, 0, -6,
  7, 0, 0, -3,
  3, 0, 0, -1,
  3, 0, 0, -1,
  202, 0, 0, -87,
  -8, 35, 19, 5,
  0, 4, 2, 0,
  16, -5, 0, 0,
  5, 0, 0, -3,
  0, -3, 0, 0,
  1, 0, 0, 0,
  -35, -48, -21, 15,
  -3, -5, -2, 1,
  6, 0, 0, -3,
  3, 0, 0, -1,
  0, -5, 0, 0,
  12, 55, 29, -6,
  0, 5, 3, 0,
  -598, 0, 0, 0,
  -3, -13, -7, 1,
  -5, -7, -3, 2,
  3, 0, 0, -1,
  5, -7, 0, 0,
  4, 0, 0, -2,
  16, -6, 0, 0,
  8, -3, 0, 0,
  8, -31, -16, -4,
  0, 3, 1, 0,
  113, 0, 0, -49,
  0, -24, -10, 0,
  4, 0, 0, -2,
  27, 0, 0, 0,
  -3, 0, 0, 1,
  0, -4, -2, 0,
  5, 0, 0, -2,
  0, -3, 0, 0,
  -13, 0, 0, 6,
  5, 0, 0, -2,
  -18, -10, -4, 8,
  -4, -28, 0, 0,
  -5, 6, 3, 2,
  -3, 0, 0, 1,
  -5, -9, -4, 2,
  17, 0, 0, -7,
  11, 4, 0, 0,
  0, -6, -2, 0,
  83, 15, 0, 0,
  -4, 0, 0, 2,
  0, -114, -49, 0,
  117, 0, 0, -51,
  -5, 19, 10, 2,
  -3, 0, 0, 0,
  -3, 0, 0, 2,
  0, -3, -1, 0,
  3, 0, 0, 0,
  0, -6, -2, 0,
  393, 3, 0, 0,
  -4, 21, 11, 2,
  -6, 0, -1, 3,
  -3, 8, 4, 1,
  8, 0, 0, 0,
  18, -29, -13, -8,
  8, 34, 18, -4,
  89, 0, 0, 0,
  3, 12, 6, -1,
  54, -15, -7, -24,
  0, 3, 0, 0,
  3, 0, 0, -1,
  0, 35, 0, 0,
  -154, -30, -13, 67,
  15, 0, 0, 0,
  0, 4, 2, 0,
  0, 9, 0, 0,
  80, -71, -31, -35,
  0, -20, -9, 0,
  11, 5, 2, -5,
  61, -96, -42, -27,
  14, 9, 4, -6,
  -11, -6, -3, 5,
  0, -3, -1, 0,
  123, -415, -180, -53,
  0, 0, 0, -35,
  -5, 0, 0, 0,
  7, -32, -17, -4,
  0, -9, -5, 0,
  0, -4, 2, 0,
  -89, 0, 0, 38,
  0, -86, -19, -6,
  0, 0, -19, 6,
  -123, -416, -180, 53,
  0, -3, -1, 0,
  12, -6, -3, -5,
  -13, 9, 4, 6,
  0, -15, -7, 0,
  3, 0, 0, -1,
  -62, -97, -42, 27,
  -11, 5, 2, 5,
  0, -19, -8, 0,
  -3, 0, 0, 1,
  0, 4, 2, 0,
  0, 3, 0, 0,
  0, 4, 2, 0,
  -85, -70, -31, 37,
  163, -12, -5, -72,
  -63, -16, -7, 28,
  -21, -32, -14, 9,
  ],
};

Swe.Swenut2000aNls = {
  nls: [
    0, 0, 0, 0, 1,
    0, 0, 2, -2, 2,
    0, 0, 2, 0, 2,
    0, 0, 0, 0, 2,
    0, 1, 0, 0, 0,
    0, 1, 2, -2, 2,
    1, 0, 0, 0, 0,
    0, 0, 2, 0, 1,
    1, 0, 2, 0, 2,
    0, -1, 2, -2, 2,
    0, 0, 2, -2, 1,
    -1, 0, 2, 0, 2,
    -1, 0, 0, 2, 0,
    1, 0, 0, 0, 1,
    -1, 0, 0, 0, 1,
    -1, 0, 2, 2, 2,
    1, 0, 2, 0, 1,
    -2, 0, 2, 0, 1,
    0, 0, 0, 2, 0,
    0, 0, 2, 2, 2,
    0, -2, 2, -2, 2,
    -2, 0, 0, 2, 0,
    2, 0, 2, 0, 2,
    1, 0, 2, -2, 2,
    -1, 0, 2, 0, 1,
    2, 0, 0, 0, 0,
    0, 0, 2, 0, 0,
    0, 1, 0, 0, 1,
    -1, 0, 0, 2, 1,
    0, 2, 2, -2, 2,
    0, 0, -2, 2, 0,
    1, 0, 0, -2, 1,
    0, -1, 0, 0, 1,
    -1, 0, 2, 2, 1,
    0, 2, 0, 0, 0,
    1, 0, 2, 2, 2,
    -2, 0, 2, 0, 0,
    0, 1, 2, 0, 2,
    0, 0, 2, 2, 1,
    0, -1, 2, 0, 2,
    0, 0, 0, 2, 1,
    1, 0, 2, -2, 1,
    2, 0, 2, -2, 2,
    -2, 0, 0, 2, 1,
    2, 0, 2, 0, 1,
    0, -1, 2, -2, 1,
    0, 0, 0, -2, 1,
    -1, -1, 0, 2, 0,
    2, 0, 0, -2, 1,
    1, 0, 0, 2, 0,
    0, 1, 2, -2, 1,
    1, -1, 0, 0, 0,
    -2, 0, 2, 0, 2,
    3, 0, 2, 0, 2,
    0, -1, 0, 2, 0,
    1, -1, 2, 0, 2,
    0, 0, 0, 1, 0,
    -1, -1, 2, 2, 2,
    -1, 0, 2, 0, 0,
    0, -1, 2, 2, 2,
    -2, 0, 0, 0, 1,
    1, 1, 2, 0, 2,
    2, 0, 0, 0, 1,
    -1, 1, 0, 1, 0,
    1, 1, 0, 0, 0,
    1, 0, 2, 0, 0,
    -1, 0, 2, -2, 1,
    1, 0, 0, 0, 2,
    -1, 0, 0, 1, 0,
    0, 0, 2, 1, 2,
    -1, 0, 2, 4, 2,
    -1, 1, 0, 1, 1,
    0, -2, 2, -2, 1,
    1, 0, 2, 2, 1,
    -2, 0, 2, 2, 2,
    -1, 0, 0, 0, 2,
    1, 1, 2, -2, 2,
    -2, 0, 2, 4, 2,
    -1, 0, 4, 0, 2,
    2, 0, 2, -2, 1,
    2, 0, 2, 2, 2,
    1, 0, 0, 2, 1,
    3, 0, 0, 0, 0,
    3, 0, 2, -2, 2,
    0, 0, 4, -2, 2,
    0, 1, 2, 0, 1,
    0, 0, -2, 2, 1,
    0, 0, 2, -2, 3,
    -1, 0, 0, 4, 0,
    2, 0, -2, 0, 1,
    -2, 0, 0, 4, 0,
    -1, -1, 0, 2, 1,
    -1, 0, 0, 1, 1,
    0, 1, 0, 0, 2,
    0, 0, -2, 0, 1,
    0, -1, 2, 0, 1,
    0, 0, 2, -1, 2,
    0, 0, 2, 4, 2,
    -2, -1, 0, 2, 0,
    1, 1, 0, -2, 1,
    -1, 1, 0, 2, 0,
    -1, 1, 0, 1, 2,
    1, -1, 0, 0, 1,
    1, -1, 2, 2, 2,
    -1, 1, 2, 2, 2,
    3, 0, 2, 0, 1,
    0, 1, -2, 2, 0,
    -1, 0, 0, -2, 1,
    0, 1, 2, 2, 2,
    -1, -1, 2, 2, 1,
    0, -1, 0, 0, 2,
    1, 0, 2, -4, 1,
    -1, 0, -2, 2, 0,
    0, -1, 2, 2, 1,
    2, -1, 2, 0, 2,
    0, 0, 0, 2, 2,
    1, -1, 2, 0, 1,
    -1, 1, 2, 0, 2,
    0, 1, 0, 2, 0,
    0, -1, -2, 2, 0,
    0, 3, 2, -2, 2,
    0, 0, 0, 1, 1,
    -1, 0, 2, 2, 0,
    2, 1, 2, 0, 2,
    1, 1, 0, 0, 1,
    1, 1, 2, 0, 1,
    2, 0, 0, 2, 0,
    1, 0, -2, 2, 0,
    -1, 0, 0, 2, 2,
    0, 1, 0, 1, 0,
    0, 1, 0, -2, 1,
    -1, 0, 2, -2, 2,
    0, 0, 0, -1, 1,
    -1, 1, 0, 0, 1,
    1, 0, 2, -1, 2,
    1, -1, 0, 2, 0,
    0, 0, 0, 4, 0,
    1, 0, 2, 1, 2,
    0, 0, 2, 1, 1,
    1, 0, 0, -2, 2,
    -1, 0, 2, 4, 1,
    1, 0, -2, 0, 1,
    1, 1, 2, -2, 1,
    0, 0, 2, 2, 0,
    -1, 0, 2, -1, 1,
    -2, 0, 2, 2, 1,
    4, 0, 2, 0, 2,
    2, -1, 0, 0, 0,
    2, 1, 2, -2, 2,
    0, 1, 2, 1, 2,
    1, 0, 4, -2, 2,
    -1, -1, 0, 0, 1,
    0, 1, 0, 2, 1,
    -2, 0, 2, 4, 1,
    2, 0, 2, 0, 0,
    1, 0, 0, 1, 0,
    -1, 0, 0, 4, 1,
    -1, 0, 4, 0, 1,
    2, 0, 2, 2, 1,
    0, 0, 2, -3, 2,
    -1, -2, 0, 2, 0,
    2, 1, 0, 0, 0,
    0, 0, 4, 0, 2,
    0, 0, 0, 0, 3,
    0, 3, 0, 0, 0,
    0, 0, 2, -4, 1,
    0, -1, 0, 2, 1,
    0, 0, 0, 4, 1,
    -1, -1, 2, 4, 2,
    1, 0, 2, 4, 2,
    -2, 2, 0, 2, 0,
    -2, -1, 2, 0, 1,
    -2, 0, 0, 2, 2,
    -1, -1, 2, 0, 2,
    0, 0, 4, -2, 1,
    3, 0, 2, -2, 1,
    -2, -1, 0, 2, 1,
    1, 0, 0, -1, 1,
    0, -2, 0, 2, 0,
    -2, 0, 0, 4, 1,
    -3, 0, 0, 0, 1,
    1, 1, 2, 2, 2,
    0, 0, 2, 4, 1,
    3, 0, 2, 2, 2,
    -1, 1, 2, -2, 1,
    2, 0, 0, -4, 1,
    0, 0, 0, -2, 2,
    2, 0, 2, -4, 1,
    -1, 1, 0, 2, 1,
    0, 0, 2, -1, 1,
    0, -2, 2, 2, 2,
    2, 0, 0, 2, 1,
    4, 0, 2, -2, 2,
    2, 0, 0, -2, 2,
    0, 2, 0, 0, 1,
    1, 0, 0, -4, 1,
    0, 2, 2, -2, 1,
    -3, 0, 0, 4, 0,
    -1, 1, 2, 0, 1,
    -1, -1, 0, 4, 0,
    -1, -2, 2, 2, 2,
    -2, -1, 2, 4, 2,
    1, -1, 2, 2, 1,
    -2, 1, 0, 2, 0,
    -2, 1, 2, 0, 1,
    2, 1, 0, -2, 1,
    -3, 0, 2, 0, 1,
    -2, 0, 2, -2, 1,
    -1, 1, 0, 2, 2,
    0, -1, 2, -1, 2,
    -1, 0, 4, -2, 2,
    0, -2, 2, 0, 2,
    -1, 0, 2, 1, 2,
    2, 0, 0, 0, 2,
    0, 0, 2, 0, 3,
    -2, 0, 4, 0, 2,
    -1, 0, -2, 0, 1,
    -1, 1, 2, 2, 1,
    3, 0, 0, 0, 1,
    -1, 0, 2, 3, 2,
    2, -1, 2, 0, 1,
    0, 1, 2, 2, 1,
    0, -1, 2, 4, 2,
    2, -1, 2, 2, 2,
    0, 2, -2, 2, 0,
    -1, -1, 2, -1, 1,
    0, -2, 0, 0, 1,
    1, 0, 2, -4, 2,
    1, -1, 0, -2, 1,
    -1, -1, 2, 0, 1,
    1, -1, 2, -2, 2,
    -2, -1, 0, 4, 0,
    -1, 0, 0, 3, 0,
    -2, -1, 2, 2, 2,
    0, 2, 2, 0, 2,
    1, 1, 0, 2, 0,
    2, 0, 2, -1, 2,
    1, 0, 2, 1, 1,
    4, 0, 0, 0, 0,
    2, 1, 2, 0, 1,
    3, -1, 2, 0, 2,
    -2, 2, 0, 2, 1,
    1, 0, 2, -3, 1,
    1, 1, 2, -4, 1,
    -1, -1, 2, -2, 1,
    0, -1, 0, -1, 1,
    0, -1, 0, -2, 1,
    -2, 0, 0, 0, 2,
    -2, 0, -2, 2, 0,
    -1, 0, -2, 4, 0,
    1, -2, 0, 0, 0,
    0, 1, 0, 1, 1,
    -1, 2, 0, 2, 0,
    1, -1, 2, -2, 1,
    1, 2, 2, -2, 2,
    2, -1, 2, -2, 2,
    1, 0, 2, -1, 1,
    2, 1, 2, -2, 1,
    -2, 0, 0, -2, 1,
    1, -2, 2, 0, 2,
    0, 1, 2, 1, 1,
    1, 0, 4, -2, 1,
    -2, 0, 4, 2, 2,
    1, 1, 2, 1, 2,
    1, 0, 0, 4, 0,
    1, 0, 2, 2, 0,
    2, 0, 2, 1, 2,
    3, 1, 2, 0, 2,
    4, 0, 2, 0, 1,
    -2, -1, 2, 0, 0,
    0, 1, -2, 2, 1,
    1, 0, -2, 1, 0,
    0, -1, -2, 2, 1,
    2, -1, 0, -2, 1,
    -1, 0, 2, -1, 2,
    1, 0, 2, -3, 2,
    0, 1, 2, -2, 3,
    0, 0, 2, -3, 1,
    -1, 0, -2, 2, 1,
    0, 0, 2, -4, 2,
    -2, 1, 0, 0, 1,
    -1, 0, 0, -1, 1,
    2, 0, 2, -4, 2,
    0, 0, 4, -4, 4,
    0, 0, 4, -4, 2,
    -1, -2, 0, 2, 1,
    -2, 0, 0, 3, 0,
    1, 0, -2, 2, 1,
    -3, 0, 2, 2, 2,
    -3, 0, 2, 2, 1,
    -2, 0, 2, 2, 0,
    2, -1, 0, 0, 1,
    -2, 1, 2, 2, 2,
    1, 1, 0, 1, 0,
    0, 1, 4, -2, 2,
    -1, 1, 0, -2, 1,
    0, 0, 0, -4, 1,
    1, -1, 0, 2, 1,
    1, 1, 0, 2, 1,
    -1, 2, 2, 2, 2,
    3, 1, 2, -2, 2,
    0, -1, 0, 4, 0,
    2, -1, 0, 2, 0,
    0, 0, 4, 0, 1,
    2, 0, 4, -2, 2,
    -1, -1, 2, 4, 1,
    1, 0, 0, 4, 1,
    1, -2, 2, 2, 2,
    0, 0, 2, 3, 2,
    -1, 1, 2, 4, 2,
    3, 0, 0, 2, 0,
    -1, 0, 4, 2, 2,
    1, 1, 2, 2, 1,
    -2, 0, 2, 6, 2,
    2, 1, 2, 2, 2,
    -1, 0, 2, 6, 2,
    1, 0, 2, 4, 1,
    2, 0, 2, 4, 2,
    1, 1, -2, 1, 0,
    -3, 1, 2, 1, 2,
    2, 0, -2, 0, 2,
    -1, 0, 0, 1, 2,
    -4, 0, 2, 2, 1,
    -1, -1, 0, 1, 0,
    0, 0, -2, 2, 2,
    1, 0, 0, -1, 2,
    0, -1, 2, -2, 3,
    -2, 1, 2, 0, 0,
    0, 0, 2, -2, 4,
    -2, -2, 0, 2, 0,
    -2, 0, -2, 4, 0,
    0, -2, -2, 2, 0,
    1, 2, 0, -2, 1,
    3, 0, 0, -4, 1,
    -1, 1, 2, -2, 2,
    1, -1, 2, -4, 1,
    1, 1, 0, -2, 2,
    -3, 0, 2, 0, 0,
    -3, 0, 2, 0, 2,
    -2, 0, 0, 1, 0,
    0, 0, -2, 1, 0,
    -3, 0, 0, 2, 1,
    -1, -1, -2, 2, 0,
    0, 1, 2, -4, 1,
    2, 1, 0, -4, 1,
    0, 2, 0, -2, 1,
    1, 0, 0, -3, 1,
    -2, 0, 2, -2, 2,
    -2, -1, 0, 0, 1,
    -4, 0, 0, 2, 0,
    1, 1, 0, -4, 1,
    -1, 0, 2, -4, 1,
    0, 0, 4, -4, 1,
    0, 3, 2, -2, 2,
    -3, -1, 0, 4, 0,
    -3, 0, 0, 4, 1,
    1, -1, -2, 2, 0,
    -1, -1, 0, 2, 2,
    1, -2, 0, 0, 1,
    1, -1, 0, 0, 2,
    0, 0, 0, 1, 2,
    -1, -1, 2, 0, 0,
    1, -2, 2, -2, 2,
    0, -1, 2, -1, 1,
    -1, 0, 2, 0, 3,
    1, 1, 0, 0, 2,
    -1, 1, 2, 0, 0,
    1, 2, 0, 0, 0,
    -1, 2, 2, 0, 2,
    -1, 0, 4, -2, 1,
    3, 0, 2, -4, 2,
    1, 2, 2, -2, 1,
    1, 0, 4, -4, 2,
    -2, -1, 0, 4, 1,
    0, -1, 0, 2, 2,
    -2, 1, 0, 4, 0,
    -2, -1, 2, 2, 1,
    2, 0, -2, 2, 0,
    1, 0, 0, 1, 1,
    0, 1, 0, 2, 2,
    1, -1, 2, -1, 2,
    -2, 0, 4, 0, 1,
    2, 1, 0, 0, 1,
    0, 1, 2, 0, 0,
    0, -1, 4, -2, 2,
    0, 0, 4, -2, 4,
    0, 2, 2, 0, 1,
    -3, 0, 0, 6, 0,
    -1, -1, 0, 4, 1,
    1, -2, 0, 2, 0,
    -1, 0, 0, 4, 2,
    -1, -2, 2, 2, 1,
    -1, 0, 0, -2, 2,
    1, 0, -2, -2, 1,
    0, 0, -2, -2, 1,
    -2, 0, -2, 0, 1,
    0, 0, 0, 3, 1,
    0, 0, 0, 3, 0,
    -1, 1, 0, 4, 0,
    -1, -1, 2, 2, 0,
    -2, 0, 2, 3, 2,
    1, 0, 0, 2, 2,
    0, -1, 2, 1, 2,
    3, -1, 0, 0, 0,
    2, 0, 0, 1, 0,
    1, -1, 2, 0, 0,
    0, 0, 2, 1, 0,
    1, 0, 2, 0, 3,
    3, 1, 0, 0, 0,
    3, -1, 2, -2, 2,
    2, 0, 2, -1, 1,
    1, 1, 2, 0, 0,
    0, 0, 4, -1, 2,
    1, 2, 2, 0, 2,
    -2, 0, 0, 6, 0,
    0, -1, 0, 4, 1,
    -2, -1, 2, 4, 1,
    0, -2, 2, 2, 1,
    0, -1, 2, 2, 0,
    -1, 0, 2, 3, 1,
    -2, 1, 2, 4, 2,
    2, 0, 0, 2, 2,
    2, -2, 2, 0, 2,
    -1, 1, 2, 3, 2,
    3, 0, 2, -1, 2,
    4, 0, 2, -2, 1,
    -1, 0, 0, 6, 0,
    -1, -2, 2, 4, 2,
    -3, 0, 2, 6, 2,
    -1, 0, 2, 4, 0,
    3, 0, 0, 2, 1,
    3, -1, 2, 0, 1,
    3, 0, 2, 0, 0,
    1, 0, 4, 0, 2,
    5, 0, 2, -2, 2,
    0, -1, 2, 4, 1,
    2, -1, 2, 2, 1,
    0, 1, 2, 4, 2,
    1, -1, 2, 4, 2,
    3, -1, 2, 2, 2,
    3, 0, 2, 2, 1,
    5, 0, 2, 0, 2,
    0, 0, 2, 6, 2,
    4, 0, 2, 2, 2,
    0, -1, 1, -1, 1,
    -1, 0, 1, 0, 3,
    0, -2, 2, -2, 3,
    1, 0, -1, 0, 1,
    2, -2, 0, -2, 1,
    -1, 0, 1, 0, 2,
    -1, 0, 1, 0, 1,
    -1, -1, 2, -1, 2,
    -2, 2, 0, 2, 2,
    -1, 0, 1, 0, 0,
    -4, 1, 2, 2, 2,
    -3, 0, 2, 1, 1,
    -2, -1, 2, 0, 2,
    1, 0, -2, 1, 1,
    2, -1, -2, 0, 1,
    -4, 0, 2, 2, 0,
    -3, 1, 0, 3, 0,
    -1, 0, -1, 2, 0,
    0, -2, 0, 0, 2,
    0, -2, 0, 0, 2,
    -3, 0, 0, 3, 0,
    -2, -1, 0, 2, 2,
    -1, 0, -2, 3, 0,
    -4, 0, 0, 4, 0,
    2, 1, -2, 0, 1,
    2, -1, 0, -2, 2,
    0, 0, 1, -1, 0,
    -1, 2, 0, 1, 0,
    -2, 1, 2, 0, 2,
    1, 1, 0, -1, 1,
    1, 0, 1, -2, 1,
    0, 2, 0, 0, 2,
    1, -1, 2, -3, 1,
    -1, 1, 2, -1, 1,
    -2, 0, 4, -2, 2,
    -2, 0, 4, -2, 1,
    -2, -2, 0, 2, 1,
    -2, 0, -2, 4, 0,
    1, 2, 2, -4, 1,
    1, 1, 2, -4, 2,
    -1, 2, 2, -2, 1,
    2, 0, 0, -3, 1,
    -1, 2, 0, 0, 1,
    0, 0, 0, -2, 0,
    -1, -1, 2, -2, 2,
    -1, 1, 0, 0, 2,
    0, 0, 0, -1, 2,
    -2, 1, 0, 1, 0,
    1, -2, 0, -2, 1,
    1, 0, -2, 0, 2,
    -3, 1, 0, 2, 0,
    -1, 1, -2, 2, 0,
    -1, -1, 0, 0, 2,
    -3, 0, 0, 2, 0,
    -3, -1, 0, 2, 0,
    2, 0, 2, -6, 1,
    0, 1, 2, -4, 2,
    2, 0, 0, -4, 2,
    -2, 1, 2, -2, 1,
    0, -1, 2, -4, 1,
    0, 1, 0, -2, 2,
    -1, 0, 0, -2, 0,
    2, 0, -2, -2, 1,
    -4, 0, 2, 0, 1,
    -1, -1, 0, -1, 1,
    0, 0, -2, 0, 2,
    -3, 0, 0, 1, 0,
    -1, 0, -2, 1, 0,
    -2, 0, -2, 2, 1,
    0, 0, -4, 2, 0,
    -2, -1, -2, 2, 0,
    1, 0, 2, -6, 1,
    -1, 0, 2, -4, 2,
    1, 0, 0, -4, 2,
    2, 1, 2, -4, 2,
    2, 1, 2, -4, 1,
    0, 1, 4, -4, 4,
    0, 1, 4, -4, 2,
    -1, -1, -2, 4, 0,
    -1, -3, 0, 2, 0,
    -1, 0, -2, 4, 1,
    -2, -1, 0, 3, 0,
    0, 0, -2, 3, 0,
    -2, 0, 0, 3, 1,
    0, -1, 0, 1, 0,
    -3, 0, 2, 2, 0,
    1, 1, -2, 2, 0,
    -1, 1, 0, 2, 2,
    1, -2, 2, -2, 1,
    0, 0, 1, 0, 2,
    0, 0, 1, 0, 1,
    0, 0, 1, 0, 0,
    -1, 2, 0, 2, 1,
    0, 0, 2, 0, 2,
    -2, 0, 2, 0, 2,
    2, 0, 0, -1, 1,
    3, 0, 0, -2, 1,
    1, 0, 2, -2, 3,
    1, 2, 0, 0, 1,
    2, 0, 2, -3, 2,
    -1, 1, 4, -2, 2,
    -2, -2, 0, 4, 0,
    0, -3, 0, 2, 0,
    0, 0, -2, 4, 0,
    -1, -1, 0, 3, 0,
    -2, 0, 0, 4, 2,
    -1, 0, 0, 3, 1,
    2, -2, 0, 0, 0,
    1, -1, 0, 1, 0,
    -1, 0, 0, 2, 0,
    0, -2, 2, 0, 1,
    -1, 0, 1, 2, 1,
    -1, 1, 0, 3, 0,
    -1, -1, 2, 1, 2,
    0, -1, 2, 0, 0,
    -2, 1, 2, 2, 1,
    2, -2, 2, -2, 2,
    1, 1, 0, 1, 1,
    1, 0, 1, 0, 1,
    1, 0, 1, 0, 0,
    0, 2, 0, 2, 0,
    2, -1, 2, -2, 1,
    0, -1, 4, -2, 1,
    0, 0, 4, -2, 3,
    0, 1, 4, -2, 1,
    4, 0, 2, -4, 2,
    2, 2, 2, -2, 2,
    2, 0, 4, -4, 2,
    -1, -2, 0, 4, 0,
    -1, -3, 2, 2, 2,
    -3, 0, 2, 4, 2,
    -3, 0, 2, -2, 1,
    -1, -1, 0, -2, 1,
    -3, 0, 0, 0, 2,
    -3, 0, -2, 2, 0,
    0, 1, 0, -4, 1,
    -2, 1, 0, -2, 1,
    -4, 0, 0, 0, 1,
    -1, 0, 0, -4, 1,
    -3, 0, 0, -2, 1,
    0, 0, 0, 3, 2,
    -1, 1, 0, 4, 1,
    1, -2, 2, 0, 1,
    0, 1, 0, 3, 0,
    -1, 0, 2, 2, 3,
    0, 0, 2, 2, 2,
    -2, 0, 2, 2, 2,
    -1, 1, 2, 2, 0,
    3, 0, 0, 0, 2,
    2, 1, 0, 1, 0,
    2, -1, 2, -1, 2,
    0, 0, 2, 0, 1,
    0, 0, 3, 0, 3,
    0, 0, 3, 0, 2,
    -1, 2, 2, 2, 1,
    -1, 0, 4, 0, 0,
    1, 2, 2, 0, 1,
    3, 1, 2, -2, 1,
    1, 1, 4, -2, 2,
    -2, -1, 0, 6, 0,
    0, -2, 0, 4, 0,
    -2, 0, 0, 6, 1,
    -2, -2, 2, 4, 2,
    0, -3, 2, 2, 2,
    0, 0, 0, 4, 2,
    -1, -1, 2, 3, 2,
    -2, 0, 2, 4, 0,
    2, -1, 0, 2, 1,
    1, 0, 0, 3, 0,
    0, 1, 0, 4, 1,
    0, 1, 0, 4, 0,
    1, -1, 2, 1, 2,
    0, 0, 2, 2, 3,
    1, 0, 2, 2, 2,
    -1, 0, 2, 2, 2,
    -2, 0, 4, 2, 1,
    2, 1, 0, 2, 1,
    2, 1, 0, 2, 0,
    2, -1, 2, 0, 0,
    1, 0, 2, 1, 0,
    0, 1, 2, 2, 0,
    2, 0, 2, 0, 3,
    3, 0, 2, 0, 2,
    1, 0, 2, 0, 2,
    1, 0, 3, 0, 3,
    1, 1, 2, 1, 1,
    0, 2, 2, 2, 2,
    2, 1, 2, 0, 0,
    2, 0, 4, -2, 1,
    4, 1, 2, -2, 2,
    -1, -1, 0, 6, 0,
    -3, -1, 2, 6, 2,
    -1, 0, 0, 6, 1,
    -3, 0, 2, 6, 1,
    1, -1, 0, 4, 1,
    1, -1, 0, 4, 0,
    -2, 0, 2, 5, 2,
    1, -2, 2, 2, 1,
    3, -1, 0, 2, 0,
    1, -1, 2, 2, 0,
    0, 0, 2, 3, 1,
    -1, 1, 2, 4, 1,
    0, 1, 2, 3, 2,
    -1, 0, 4, 2, 1,
    2, 0, 2, 1, 1,
    5, 0, 0, 0, 0,
    2, 1, 2, 1, 2,
    1, 0, 4, 0, 1,
    3, 1, 2, 0, 1,
    3, 0, 4, -2, 2,
    -2, -1, 2, 6, 2,
    0, 0, 0, 6, 0,
    0, -2, 2, 4, 2,
    -2, 0, 2, 6, 1,
    2, 0, 0, 4, 1,
    2, 0, 0, 4, 0,
    2, -2, 2, 2, 2,
    0, 0, 2, 4, 0,
    1, 0, 2, 3, 2,
    4, 0, 0, 2, 0,
    2, 0, 2, 2, 0,
    0, 0, 4, 2, 2,
    4, -1, 2, 0, 2,
    3, 0, 2, 1, 2,
    2, 1, 2, 2, 1,
    4, 1, 2, 0, 2,
    -1, -1, 2, 6, 2,
    -1, 0, 2, 6, 1,
    1, -1, 2, 4, 1,
    1, 1, 2, 4, 2,
    3, 1, 2, 2, 2,
    5, 0, 2, 0, 1,
    2, -1, 2, 4, 2,
    2, 0, 2, 4, 1,
  ],
};

Swe.Swenut2000a_cls = {
  O1MAS2DEG: 1 / 3600.0 / 10000000.0,
  NLS: 678,
  NLS_2000B: 77,
  NPL: 687,
  cls: [
  -172064161, -174666, 33386, 92052331, 9086, 15377,
  -13170906, -1675, -13696, 5730336, -3015, -4587,
  -2276413, -234, 2796, 978459, -485, 1374,
  2074554, 207, -698, -897492, 470, -291,
  1475877, -3633, 11817, 73871, -184, -1924,
  -516821, 1226, -524, 224386, -677, -174,
  711159, 73, -872, -6750, 0, 358,
  -387298, -367, 380, 200728, 18, 318,
  -301461, -36, 816, 129025, -63, 367,
  215829, -494, 111, -95929, 299, 132,
  128227, 137, 181, -68982, -9, 39,
  123457, 11, 19, -53311, 32, -4,
  156994, 10, -168, -1235, 0, 82,
  63110, 63, 27, -33228, 0, -9,
  -57976, -63, -189, 31429, 0, -75,
  -59641, -11, 149, 25543, -11, 66,
  -51613, -42, 129, 26366, 0, 78,
  45893, 50, 31, -24236, -10, 20,
  63384, 11, -150, -1220, 0, 29,
  -38571, -1, 158, 16452, -11, 68,
  32481, 0, 0, -13870, 0, 0,
  -47722, 0, -18, 477, 0, -25,
  -31046, -1, 131, 13238, -11, 59,
  28593, 0, -1, -12338, 10, -3,
  20441, 21, 10, -10758, 0, -3,
  29243, 0, -74, -609, 0, 13,
  25887, 0, -66, -550, 0, 11,
  -14053, -25, 79, 8551, -2, -45,
  15164, 10, 11, -8001, 0, -1,
  -15794, 72, -16, 6850, -42, -5,
  21783, 0, 13, -167, 0, 13,
  -12873, -10, -37, 6953, 0, -14,
  -12654, 11, 63, 6415, 0, 26,
  -10204, 0, 25, 5222, 0, 15,
  16707, -85, -10, 168, -1, 10,
  -7691, 0, 44, 3268, 0, 19,
  -11024, 0, -14, 104, 0, 2,
  7566, -21, -11, -3250, 0, -5,
  -6637, -11, 25, 3353, 0, 14,
  -7141, 21, 8, 3070, 0, 4,
  -6302, -11, 2, 3272, 0, 4,
  5800, 10, 2, -3045, 0, -1,
  6443, 0, -7, -2768, 0, -4,
  -5774, -11, -15, 3041, 0, -5,
  -5350, 0, 21, 2695, 0, 12,
  -4752, -11, -3, 2719, 0, -3,
  -4940, -11, -21, 2720, 0, -9,
  7350, 0, -8, -51, 0, 4,
  4065, 0, 6, -2206, 0, 1,
  6579, 0, -24, -199, 0, 2,
  3579, 0, 5, -1900, 0, 1,
  4725, 0, -6, -41, 0, 3,
  -3075, 0, -2, 1313, 0, -1,
  -2904, 0, 15, 1233, 0, 7,
  4348, 0, -10, -81, 0, 2,
  -2878, 0, 8, 1232, 0, 4,
  -4230, 0, 5, -20, 0, -2,
  -2819, 0, 7, 1207, 0, 3,
  -4056, 0, 5, 40, 0, -2,
  -2647, 0, 11, 1129, 0, 5,
  -2294, 0, -10, 1266, 0, -4,
  2481, 0, -7, -1062, 0, -3,
  2179, 0, -2, -1129, 0, -2,
  3276, 0, 1, -9, 0, 0,
  -3389, 0, 5, 35, 0, -2,
  3339, 0, -13, -107, 0, 1,
  -1987, 0, -6, 1073, 0, -2,
  -1981, 0, 0, 854, 0, 0,
  4026, 0, -353, -553, 0, -139,
  1660, 0, -5, -710, 0, -2,
  -1521, 0, 9, 647, 0, 4,
  1314, 0, 0, -700, 0, 0,
  -1283, 0, 0, 672, 0, 0,
  -1331, 0, 8, 663, 0, 4,
  1383, 0, -2, -594, 0, -2,
  1405, 0, 4, -610, 0, 2,
  1290, 0, 0, -556, 0, 0,
  -1214, 0, 5, 518, 0, 2,
  1146, 0, -3, -490, 0, -1,
  1019, 0, -1, -527, 0, -1,
  -1100, 0, 9, 465, 0, 4,
  -970, 0, 2, 496, 0, 1,
  1575, 0, -6, -50, 0, 0,
  934, 0, -3, -399, 0, -1,
  922, 0, -1, -395, 0, -1,
  815, 0, -1, -422, 0, -1,
  834, 0, 2, -440, 0, 1,
  1248, 0, 0, -170, 0, 1,
  1338, 0, -5, -39, 0, 0,
  716, 0, -2, -389, 0, -1,
  1282, 0, -3, -23, 0, 1,
  742, 0, 1, -391, 0, 0,
  1020, 0, -25, -495, 0, -10,
  715, 0, -4, -326, 0, 2,
  -666, 0, -3, 369, 0, -1,
  -667, 0, 1, 346, 0, 1,
  -704, 0, 0, 304, 0, 0,
  -694, 0, 5, 294, 0, 2,
  -1014, 0, -1, 4, 0, -1,
  -585, 0, -2, 316, 0, -1,
  -949, 0, 1, 8, 0, -1,
  -595, 0, 0, 258, 0, 0,
  528, 0, 0, -279, 0, 0,
  -590, 0, 4, 252, 0, 2,
  570, 0, -2, -244, 0, -1,
  -502, 0, 3, 250, 0, 2,
  -875, 0, 1, 29, 0, 0,
  -492, 0, -3, 275, 0, -1,
  535, 0, -2, -228, 0, -1,
  -467, 0, 1, 240, 0, 1,
  591, 0, 0, -253, 0, 0,
  -453, 0, -1, 244, 0, -1,
  766, 0, 1, 9, 0, 0,
  -446, 0, 2, 225, 0, 1,
  -488, 0, 2, 207, 0, 1,
  -468, 0, 0, 201, 0, 0,
  -421, 0, 1, 216, 0, 1,
  463, 0, 0, -200, 0, 0,
  -673, 0, 2, 14, 0, 0,
  658, 0, 0, -2, 0, 0,
  -438, 0, 0, 188, 0, 0,
  -390, 0, 0, 205, 0, 0,
  639, -11, -2, -19, 0, 0,
  412, 0, -2, -176, 0, -1,
  -361, 0, 0, 189, 0, 0,
  360, 0, -1, -185, 0, -1,
  588, 0, -3, -24, 0, 0,
  -578, 0, 1, 5, 0, 0,
  -396, 0, 0, 171, 0, 0,
  565, 0, -1, -6, 0, 0,
  -335, 0, -1, 184, 0, -1,
  357, 0, 1, -154, 0, 0,
  321, 0, 1, -174, 0, 0,
  -301, 0, -1, 162, 0, 0,
  -334, 0, 0, 144, 0, 0,
  493, 0, -2, -15, 0, 0,
  494, 0, -2, -19, 0, 0,
  337, 0, -1, -143, 0, -1,
  280, 0, -1, -144, 0, 0,
  309, 0, 1, -134, 0, 0,
  -263, 0, 2, 131, 0, 1,
  253, 0, 1, -138, 0, 0,
  245, 0, 0, -128, 0, 0,
  416, 0, -2, -17, 0, 0,
  -229, 0, 0, 128, 0, 0,
  231, 0, 0, -120, 0, 0,
  -259, 0, 2, 109, 0, 1,
  375, 0, -1, -8, 0, 0,
  252, 0, 0, -108, 0, 0,
  -245, 0, 1, 104, 0, 0,
  243, 0, -1, -104, 0, 0,
  208, 0, 1, -112, 0, 0,
  199, 0, 0, -102, 0, 0,
  -208, 0, 1, 105, 0, 0,
  335, 0, -2, -14, 0, 0,
  -325, 0, 1, 7, 0, 0,
  -187, 0, 0, 96, 0, 0,
  197, 0, -1, -100, 0, 0,
  -192, 0, 2, 94, 0, 1,
  -188, 0, 0, 83, 0, 0,
  276, 0, 0, -2, 0, 0,
  -286, 0, 1, 6, 0, 0,
  186, 0, -1, -79, 0, 0,
  -219, 0, 0, 43, 0, 0,
  276, 0, 0, 2, 0, 0,
  -153, 0, -1, 84, 0, 0,
  -156, 0, 0, 81, 0, 0,
  -154, 0, 1, 78, 0, 0,
  -174, 0, 1, 75, 0, 0,
  -163, 0, 2, 69, 0, 1,
  -228, 0, 0, 1, 0, 0,
  91, 0, -4, -54, 0, -2,
  175, 0, 0, -75, 0, 0,
  -159, 0, 0, 69, 0, 0,
  141, 0, 0, -72, 0, 0,
  147, 0, 0, -75, 0, 0,
  -132, 0, 0, 69, 0, 0,
  159, 0, -28, -54, 0, 11,
  213, 0, 0, -4, 0, 0,
  123, 0, 0, -64, 0, 0,
  -118, 0, -1, 66, 0, 0,
  144, 0, -1, -61, 0, 0,
  -121, 0, 1, 60, 0, 0,
  -134, 0, 1, 56, 0, 1,
  -105, 0, 0, 57, 0, 0,
  -102, 0, 0, 56, 0, 0,
  120, 0, 0, -52, 0, 0,
  101, 0, 0, -54, 0, 0,
  -113, 0, 0, 59, 0, 0,
  -106, 0, 0, 61, 0, 0,
  -129, 0, 1, 55, 0, 0,
  -114, 0, 0, 57, 0, 0,
  113, 0, -1, -49, 0, 0,
  -102, 0, 0, 44, 0, 0,
  -94, 0, 0, 51, 0, 0,
  -100, 0, -1, 56, 0, 0,
  87, 0, 0, -47, 0, 0,
  161, 0, 0, -1, 0, 0,
  96, 0, 0, -50, 0, 0,
  151, 0, -1, -5, 0, 0,
  -104, 0, 0, 44, 0, 0,
  -110, 0, 0, 48, 0, 0,
  -100, 0, 1, 50, 0, 0,
  92, 0, -5, 12, 0, -2,
  82, 0, 0, -45, 0, 0,
  82, 0, 0, -45, 0, 0,
  -78, 0, 0, 41, 0, 0,
  -77, 0, 0, 43, 0, 0,
  2, 0, 0, 54, 0, 0,
  94, 0, 0, -40, 0, 0,
  -93, 0, 0, 40, 0, 0,
  -83, 0, 10, 40, 0, -2,
  83, 0, 0, -36, 0, 0,
  -91, 0, 0, 39, 0, 0,
  128, 0, 0, -1, 0, 0,
  -79, 0, 0, 34, 0, 0,
  -83, 0, 0, 47, 0, 0,
  84, 0, 0, -44, 0, 0,
  83, 0, 0, -43, 0, 0,
  91, 0, 0, -39, 0, 0,
  -77, 0, 0, 39, 0, 0,
  84, 0, 0, -43, 0, 0,
  -92, 0, 1, 39, 0, 0,
  -92, 0, 1, 39, 0, 0,
  -94, 0, 0, 0, 0, 0,
  68, 0, 0, -36, 0, 0,
  -61, 0, 0, 32, 0, 0,
  71, 0, 0, -31, 0, 0,
  62, 0, 0, -34, 0, 0,
  -63, 0, 0, 33, 0, 0,
  -73, 0, 0, 32, 0, 0,
  115, 0, 0, -2, 0, 0,
  -103, 0, 0, 2, 0, 0,
  63, 0, 0, -28, 0, 0,
  74, 0, 0, -32, 0, 0,
  -103, 0, -3, 3, 0, -1,
  -69, 0, 0, 30, 0, 0,
  57, 0, 0, -29, 0, 0,
  94, 0, 0, -4, 0, 0,
  64, 0, 0, -33, 0, 0,
  -63, 0, 0, 26, 0, 0,
  -38, 0, 0, 20, 0, 0,
  -43, 0, 0, 24, 0, 0,
  -45, 0, 0, 23, 0, 0,
  47, 0, 0, -24, 0, 0,
  -48, 0, 0, 25, 0, 0,
  45, 0, 0, -26, 0, 0,
  56, 0, 0, -25, 0, 0,
  88, 0, 0, 2, 0, 0,
  -75, 0, 0, 0, 0, 0,
  85, 0, 0, 0, 0, 0,
  49, 0, 0, -26, 0, 0,
  -74, 0, -3, -1, 0, -1,
  -39, 0, 0, 21, 0, 0,
  45, 0, 0, -20, 0, 0,
  51, 0, 0, -22, 0, 0,
  -40, 0, 0, 21, 0, 0,
  41, 0, 0, -21, 0, 0,
  -42, 0, 0, 24, 0, 0,
  -51, 0, 0, 22, 0, 0,
  -42, 0, 0, 22, 0, 0,
  39, 0, 0, -21, 0, 0,
  46, 0, 0, -18, 0, 0,
  -53, 0, 0, 22, 0, 0,
  82, 0, 0, -4, 0, 0,
  81, 0, -1, -4, 0, 0,
  47, 0, 0, -19, 0, 0,
  53, 0, 0, -23, 0, 0,
  -45, 0, 0, 22, 0, 0,
  -44, 0, 0, -2, 0, 0,
  -33, 0, 0, 16, 0, 0,
  -61, 0, 0, 1, 0, 0,
  28, 0, 0, -15, 0, 0,
  -38, 0, 0, 19, 0, 0,
  -33, 0, 0, 21, 0, 0,
  -60, 0, 0, 0, 0, 0,
  48, 0, 0, -10, 0, 0,
  27, 0, 0, -14, 0, 0,
  38, 0, 0, -20, 0, 0,
  31, 0, 0, -13, 0, 0,
  -29, 0, 0, 15, 0, 0,
  28, 0, 0, -15, 0, 0,
  -32, 0, 0, 15, 0, 0,
  45, 0, 0, -8, 0, 0,
  -44, 0, 0, 19, 0, 0,
  28, 0, 0, -15, 0, 0,
  -51, 0, 0, 0, 0, 0,
  -36, 0, 0, 20, 0, 0,
  44, 0, 0, -19, 0, 0,
  26, 0, 0, -14, 0, 0,
  -60, 0, 0, 2, 0, 0,
  35, 0, 0, -18, 0, 0,
  -27, 0, 0, 11, 0, 0,
  47, 0, 0, -1, 0, 0,
  36, 0, 0, -15, 0, 0,
  -36, 0, 0, 20, 0, 0,
  -35, 0, 0, 19, 0, 0,
  -37, 0, 0, 19, 0, 0,
  32, 0, 0, -16, 0, 0,
  35, 0, 0, -14, 0, 0,
  32, 0, 0, -13, 0, 0,
  65, 0, 0, -2, 0, 0,
  47, 0, 0, -1, 0, 0,
  32, 0, 0, -16, 0, 0,
  37, 0, 0, -16, 0, 0,
  -30, 0, 0, 15, 0, 0,
  -32, 0, 0, 16, 0, 0,
  -31, 0, 0, 13, 0, 0,
  37, 0, 0, -16, 0, 0,
  31, 0, 0, -13, 0, 0,
  49, 0, 0, -2, 0, 0,
  32, 0, 0, -13, 0, 0,
  23, 0, 0, -12, 0, 0,
  -43, 0, 0, 18, 0, 0,
  26, 0, 0, -11, 0, 0,
  -32, 0, 0, 14, 0, 0,
  -29, 0, 0, 14, 0, 0,
  -27, 0, 0, 12, 0, 0,
  30, 0, 0, 0, 0, 0,
  -11, 0, 0, 5, 0, 0,
  -21, 0, 0, 10, 0, 0,
  -34, 0, 0, 15, 0, 0,
  -10, 0, 0, 6, 0, 0,
  -36, 0, 0, 0, 0, 0,
  -9, 0, 0, 4, 0, 0,
  -12, 0, 0, 5, 0, 0,
  -21, 0, 0, 5, 0, 0,
  -29, 0, 0, -1, 0, 0,
  -15, 0, 0, 3, 0, 0,
  -20, 0, 0, 0, 0, 0,
  28, 0, 0, 0, 0, -2,
  17, 0, 0, 0, 0, 0,
  -22, 0, 0, 12, 0, 0,
  -14, 0, 0, 7, 0, 0,
  24, 0, 0, -11, 0, 0,
  11, 0, 0, -6, 0, 0,
  14, 0, 0, -6, 0, 0,
  24, 0, 0, 0, 0, 0,
  18, 0, 0, -8, 0, 0,
  -38, 0, 0, 0, 0, 0,
  -31, 0, 0, 0, 0, 0,
  -16, 0, 0, 8, 0, 0,
  29, 0, 0, 0, 0, 0,
  -18, 0, 0, 10, 0, 0,
  -10, 0, 0, 5, 0, 0,
  -17, 0, 0, 10, 0, 0,
  9, 0, 0, -4, 0, 0,
  16, 0, 0, -6, 0, 0,
  22, 0, 0, -12, 0, 0,
  20, 0, 0, 0, 0, 0,
  -13, 0, 0, 6, 0, 0,
  -17, 0, 0, 9, 0, 0,
  -14, 0, 0, 8, 0, 0,
  0, 0, 0, -7, 0, 0,
  14, 0, 0, 0, 0, 0,
  19, 0, 0, -10, 0, 0,
  -34, 0, 0, 0, 0, 0,
  -20, 0, 0, 8, 0, 0,
  9, 0, 0, -5, 0, 0,
  -18, 0, 0, 7, 0, 0,
  13, 0, 0, -6, 0, 0,
  17, 0, 0, 0, 0, 0,
  -12, 0, 0, 5, 0, 0,
  15, 0, 0, -8, 0, 0,
  -11, 0, 0, 3, 0, 0,
  13, 0, 0, -5, 0, 0,
  -18, 0, 0, 0, 0, 0,
  -35, 0, 0, 0, 0, 0,
  9, 0, 0, -4, 0, 0,
  -19, 0, 0, 10, 0, 0,
  -26, 0, 0, 11, 0, 0,
  8, 0, 0, -4, 0, 0,
  -10, 0, 0, 4, 0, 0,
  10, 0, 0, -6, 0, 0,
  -21, 0, 0, 9, 0, 0,
  -15, 0, 0, 0, 0, 0,
  9, 0, 0, -5, 0, 0,
  -29, 0, 0, 0, 0, 0,
  -19, 0, 0, 10, 0, 0,
  12, 0, 0, -5, 0, 0,
  22, 0, 0, -9, 0, 0,
  -10, 0, 0, 5, 0, 0,
  -20, 0, 0, 11, 0, 0,
  -20, 0, 0, 0, 0, 0,
  -17, 0, 0, 7, 0, 0,
  15, 0, 0, -3, 0, 0,
  8, 0, 0, -4, 0, 0,
  14, 0, 0, 0, 0, 0,
  -12, 0, 0, 6, 0, 0,
  25, 0, 0, 0, 0, 0,
  -13, 0, 0, 6, 0, 0,
  -14, 0, 0, 8, 0, 0,
  13, 0, 0, -5, 0, 0,
  -17, 0, 0, 9, 0, 0,
  -12, 0, 0, 6, 0, 0,
  -10, 0, 0, 5, 0, 0,
  10, 0, 0, -6, 0, 0,
  -15, 0, 0, 0, 0, 0,
  -22, 0, 0, 0, 0, 0,
  28, 0, 0, -1, 0, 0,
  15, 0, 0, -7, 0, 0,
  23, 0, 0, -10, 0, 0,
  12, 0, 0, -5, 0, 0,
  29, 0, 0, -1, 0, 0,
  -25, 0, 0, 1, 0, 0,
  22, 0, 0, 0, 0, 0,
  -18, 0, 0, 0, 0, 0,
  15, 0, 0, 3, 0, 0,
  -23, 0, 0, 0, 0, 0,
  12, 0, 0, -5, 0, 0,
  -8, 0, 0, 4, 0, 0,
  -19, 0, 0, 0, 0, 0,
  -10, 0, 0, 4, 0, 0,
  21, 0, 0, -9, 0, 0,
  23, 0, 0, -1, 0, 0,
  -16, 0, 0, 8, 0, 0,
  -19, 0, 0, 9, 0, 0,
  -22, 0, 0, 10, 0, 0,
  27, 0, 0, -1, 0, 0,
  16, 0, 0, -8, 0, 0,
  19, 0, 0, -8, 0, 0,
  9, 0, 0, -4, 0, 0,
  -9, 0, 0, 4, 0, 0,
  -9, 0, 0, 4, 0, 0,
  -8, 0, 0, 4, 0, 0,
  18, 0, 0, -9, 0, 0,
  16, 0, 0, -1, 0, 0,
  -10, 0, 0, 4, 0, 0,
  -23, 0, 0, 9, 0, 0,
  16, 0, 0, -1, 0, 0,
  -12, 0, 0, 6, 0, 0,
  -8, 0, 0, 4, 0, 0,
  30, 0, 0, -2, 0, 0,
  24, 0, 0, -10, 0, 0,
  10, 0, 0, -4, 0, 0,
  -16, 0, 0, 7, 0, 0,
  -16, 0, 0, 7, 0, 0,
  17, 0, 0, -7, 0, 0,
  -24, 0, 0, 10, 0, 0,
  -12, 0, 0, 5, 0, 0,
  -24, 0, 0, 11, 0, 0,
  -23, 0, 0, 9, 0, 0,
  -13, 0, 0, 5, 0, 0,
  -15, 0, 0, 7, 0, 0,
  0, 0, -1988, 0, 0, -1679,
  0, 0, -63, 0, 0, -27,
  -4, 0, 0, 0, 0, 0,
  0, 0, 5, 0, 0, 4,
  5, 0, 0, -3, 0, 0,
  0, 0, 364, 0, 0, 176,
  0, 0, -1044, 0, 0, -891,
  -3, 0, 0, 1, 0, 0,
  4, 0, 0, -2, 0, 0,
  0, 0, 330, 0, 0, 0,
  5, 0, 0, -2, 0, 0,
  3, 0, 0, -2, 0, 0,
  -3, 0, 0, 1, 0, 0,
  -5, 0, 0, 2, 0, 0,
  3, 0, 0, -1, 0, 0,
  3, 0, 0, 0, 0, 0,
  3, 0, 0, 0, 0, 0,
  0, 0, 5, 0, 0, 0,
  0, 0, 0, 1, 0, 0,
  4, 0, 0, -2, 0, 0,
  6, 0, 0, 0, 0, 0,
  5, 0, 0, -2, 0, 0,
  -7, 0, 0, 0, 0, 0,
  -12, 0, 0, 0, 0, 0,
  5, 0, 0, -3, 0, 0,
  3, 0, 0, -1, 0, 0,
  -5, 0, 0, 0, 0, 0,
  3, 0, 0, 0, 0, 0,
  -7, 0, 0, 3, 0, 0,
  7, 0, 0, -4, 0, 0,
  0, 0, -12, 0, 0, -10,
  4, 0, 0, -2, 0, 0,
  3, 0, 0, -2, 0, 0,
  -3, 0, 0, 2, 0, 0,
  -7, 0, 0, 3, 0, 0,
  -4, 0, 0, 2, 0, 0,
  -3, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 0,
  -3, 0, 0, 1, 0, 0,
  7, 0, 0, -3, 0, 0,
  -4, 0, 0, 2, 0, 0,
  4, 0, 0, -2, 0, 0,
  -5, 0, 0, 3, 0, 0,
  5, 0, 0, 0, 0, 0,
  -5, 0, 0, 2, 0, 0,
  5, 0, 0, -2, 0, 0,
  -8, 0, 0, 3, 0, 0,
  9, 0, 0, 0, 0, 0,
  6, 0, 0, -3, 0, 0,
  -5, 0, 0, 2, 0, 0,
  3, 0, 0, 0, 0, 0,
  -7, 0, 0, 0, 0, 0,
  -3, 0, 0, 1, 0, 0,
  5, 0, 0, 0, 0, 0,
  3, 0, 0, 0, 0, 0,
  -3, 0, 0, 2, 0, 0,
  4, 0, 0, -2, 0, 0,
  3, 0, 0, -1, 0, 0,
  -5, 0, 0, 2, 0, 0,
  4, 0, 0, -2, 0, 0,
  9, 0, 0, -3, 0, 0,
  4, 0, 0, 0, 0, 0,
  4, 0, 0, -2, 0, 0,
  -3, 0, 0, 2, 0, 0,
  -4, 0, 0, 2, 0, 0,
  9, 0, 0, -3, 0, 0,
  -4, 0, 0, 0, 0, 0,
  -4, 0, 0, 0, 0, 0,
  3, 0, 0, -2, 0, 0,
  8, 0, 0, 0, 0, 0,
  3, 0, 0, 0, 0, 0,
  -3, 0, 0, 2, 0, 0,
  3, 0, 0, -1, 0, 0,
  3, 0, 0, -1, 0, 0,
  -3, 0, 0, 1, 0, 0,
  6, 0, 0, -3, 0, 0,
  3, 0, 0, 0, 0, 0,
  -3, 0, 0, 1, 0, 0,
  -7, 0, 0, 0, 0, 0,
  9, 0, 0, 0, 0, 0,
  -3, 0, 0, 2, 0, 0,
  -3, 0, 0, 0, 0, 0,
  -4, 0, 0, 0, 0, 0,
  -5, 0, 0, 3, 0, 0,
  -13, 0, 0, 0, 0, 0,
  -7, 0, 0, 0, 0, 0,
  10, 0, 0, 0, 0, 0,
  3, 0, 0, -1, 0, 0,
  10, 0, 13, 6, 0, -5,
  0, 0, 30, 0, 0, 14,
  0, 0, -162, 0, 0, -138,
  0, 0, 75, 0, 0, 0,
  -7, 0, 0, 4, 0, 0,
  -4, 0, 0, 2, 0, 0,
  4, 0, 0, -2, 0, 0,
  5, 0, 0, -2, 0, 0,
  5, 0, 0, -3, 0, 0,
  -3, 0, 0, 0, 0, 0,
  -3, 0, 0, 2, 0, 0,
  -4, 0, 0, 2, 0, 0,
  -5, 0, 0, 2, 0, 0,
  6, 0, 0, 0, 0, 0,
  9, 0, 0, 0, 0, 0,
  5, 0, 0, 0, 0, 0,
  -7, 0, 0, 0, 0, 0,
  -3, 0, 0, 1, 0, 0,
  -4, 0, 0, 2, 0, 0,
  7, 0, 0, 0, 0, 0,
  -4, 0, 0, 0, 0, 0,
  4, 0, 0, 0, 0, 0,
  -6, 0, -3, 3, 0, 1,
  0, 0, -3, 0, 0, -2,
  11, 0, 0, 0, 0, 0,
  3, 0, 0, -1, 0, 0,
  11, 0, 0, 0, 0, 0,
  -3, 0, 0, 2, 0, 0,
  -1, 0, 3, 3, 0, -1,
  4, 0, 0, -2, 0, 0,
  0, 0, -13, 0, 0, -11,
  3, 0, 6, 0, 0, 0,
  -7, 0, 0, 0, 0, 0,
  5, 0, 0, -3, 0, 0,
  -3, 0, 0, 1, 0, 0,
  3, 0, 0, 0, 0, 0,
  5, 0, 0, -3, 0, 0,
  -7, 0, 0, 3, 0, 0,
  8, 0, 0, -3, 0, 0,
  -4, 0, 0, 2, 0, 0,
  11, 0, 0, 0, 0, 0,
  -3, 0, 0, 1, 0, 0,
  3, 0, 0, -1, 0, 0,
  -4, 0, 0, 2, 0, 0,
  8, 0, 0, -4, 0, 0,
  3, 0, 0, -1, 0, 0,
  11, 0, 0, 0, 0, 0,
  -6, 0, 0, 3, 0, 0,
  -4, 0, 0, 2, 0, 0,
  -8, 0, 0, 4, 0, 0,
  -7, 0, 0, 3, 0, 0,
  -4, 0, 0, 2, 0, 0,
  3, 0, 0, -1, 0, 0,
  6, 0, 0, -3, 0, 0,
  -6, 0, 0, 3, 0, 0,
  6, 0, 0, 0, 0, 0,
  6, 0, 0, -1, 0, 0,
  5, 0, 0, -2, 0, 0,
  -5, 0, 0, 2, 0, 0,
  -4, 0, 0, 0, 0, 0,
  -4, 0, 0, 2, 0, 0,
  4, 0, 0, 0, 0, 0,
  6, 0, 0, -3, 0, 0,
  -4, 0, 0, 2, 0, 0,
  0, 0, -26, 0, 0, -11,
  0, 0, -10, 0, 0, -5,
  5, 0, 0, -3, 0, 0,
  -13, 0, 0, 0, 0, 0,
  3, 0, 0, -2, 0, 0,
  4, 0, 0, -2, 0, 0,
  7, 0, 0, -3, 0, 0,
  4, 0, 0, 0, 0, 0,
  5, 0, 0, 0, 0, 0,
  -3, 0, 0, 2, 0, 0,
  -6, 0, 0, 2, 0, 0,
  -5, 0, 0, 2, 0, 0,
  -7, 0, 0, 3, 0, 0,
  5, 0, 0, -2, 0, 0,
  13, 0, 0, 0, 0, 0,
  -4, 0, 0, 2, 0, 0,
  -3, 0, 0, 0, 0, 0,
  5, 0, 0, -2, 0, 0,
  -11, 0, 0, 0, 0, 0,
  5, 0, 0, -2, 0, 0,
  4, 0, 0, 0, 0, 0,
  4, 0, 0, -2, 0, 0,
  -4, 0, 0, 2, 0, 0,
  6, 0, 0, -3, 0, 0,
  3, 0, 0, -2, 0, 0,
  -12, 0, 0, 0, 0, 0,
  4, 0, 0, 0, 0, 0,
  -3, 0, 0, 0, 0, 0,
  -4, 0, 0, 0, 0, 0,
  3, 0, 0, 0, 0, 0,
  3, 0, 0, -1, 0, 0,
  -3, 0, 0, 1, 0, 0,
  0, 0, -5, 0, 0, -2,
  -7, 0, 0, 4, 0, 0,
  6, 0, 0, -3, 0, 0,
  -3, 0, 0, 0, 0, 0,
  5, 0, 0, -3, 0, 0,
  3, 0, 0, -1, 0, 0,
  3, 0, 0, 0, 0, 0,
  -3, 0, 0, 1, 0, 0,
  -5, 0, 0, 3, 0, 0,
  -3, 0, 0, 2, 0, 0,
  -3, 0, 0, 2, 0, 0,
  12, 0, 0, 0, 0, 0,
  3, 0, 0, -1, 0, 0,
  -4, 0, 0, 2, 0, 0,
  4, 0, 0, 0, 0, 0,
  6, 0, 0, 0, 0, 0,
  5, 0, 0, -3, 0, 0,
  4, 0, 0, -2, 0, 0,
  -6, 0, 0, 3, 0, 0,
  4, 0, 0, -2, 0, 0,
  6, 0, 0, -3, 0, 0,
  6, 0, 0, 0, 0, 0,
  -6, 0, 0, 3, 0, 0,
  3, 0, 0, -2, 0, 0,
  7, 0, 0, -4, 0, 0,
  4, 0, 0, -2, 0, 0,
  -5, 0, 0, 2, 0, 0,
  5, 0, 0, 0, 0, 0,
  -6, 0, 0, 3, 0, 0,
  -6, 0, 0, 3, 0, 0,
  -4, 0, 0, 2, 0, 0,
  10, 0, 0, 0, 0, 0,
  -4, 0, 0, 2, 0, 0,
  7, 0, 0, 0, 0, 0,
  7, 0, 0, -3, 0, 0,
  4, 0, 0, 0, 0, 0,
  11, 0, 0, 0, 0, 0,
  5, 0, 0, -2, 0, 0,
  -6, 0, 0, 2, 0, 0,
  4, 0, 0, -2, 0, 0,
  3, 0, 0, -2, 0, 0,
  5, 0, 0, -2, 0, 0,
  -4, 0, 0, 2, 0, 0,
  -4, 0, 0, 2, 0, 0,
  -3, 0, 0, 2, 0, 0,
  4, 0, 0, -2, 0, 0,
  3, 0, 0, -1, 0, 0,
  -3, 0, 0, 1, 0, 0,
  -3, 0, 0, 1, 0, 0,
  -3, 0, 0, 2, 0, 0,
  ],
};

Swe.Swenut2000a_npl = {
  npl: [
  0, 0, 0, 0, 0, 0, 0, 8,-16, 4, 5, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -8, 16, -4, -5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 8,-16, 4, 5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 2, 2,
  0, 0, 0, 0, 0, 0, 0, -4, 8, -1, -5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 4, -8, 3, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, 3, -8, 3, 0, 0, 0, 0,
  -1, 0, 0, 0, 0, 0, 10, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, -2, 6, -3, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 4, -8, 3, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -5, 8, -3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -4, 8, -3, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 4, -8, 1, 5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -5, 6, 4, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 2, -5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 2, -5, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 2, -5, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 2, -5, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, -2, 5, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, -2, 5, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, -2, 5, 0, 0, 2,
  2, 0, -1, -1, 0, 0, 0, 3, -7, 0, 0, 0, 0, 0,
  1, 0, 0, -2, 0, 0, 19,-21, 3, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 2, -4, 0, -3, 0, 0, 0, 0,
  1, 0, 0, -1, 1, 0, 0, -1, 0, 2, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, -4, 10, 0, 0, 0,
  -2, 0, 0, 2, 1, 0, 0, 2, 0, 0, -5, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 3, -7, 4, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 0, 1, 0, 1, -1, 0, 0, 0,
  -2, 0, 0, 2, 1, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  -1, 0, 0, 0, 0, 0, 18,-16, 0, 0, 0, 0, 0, 0,
  -2, 0, 1, 1, 2, 0, 0, 1, 0, -2, 0, 0, 0, 0,
  -1, 0, 1, -1, 1, 0, 18,-17, 0, 0, 0, 0, 0, 0,
  -1, 0, 0, 1, 1, 0, 0, 2, -2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -8, 13, 0, 0, 0, 0, 0, 2,
  0, 0, 2, -2, 2, 0, -8, 11, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -8, 13, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, -8, 12, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 8,-13, 0, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 8,-14, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 8,-13, 0, 0, 0, 0, 0, 1,
  -2, 0, 0, 2, 1, 0, 0, 2, 0, -4, 5, 0, 0, 0,
  -2, 0, 0, 2, 2, 0, 3, -3, 0, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 2, 0, -3, 1, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 3, -5, 0, 2, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 2, 0, -4, 3, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, -1, 2, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 2, 0, 0, -2, 2, 0, 0, 0, 0, 0,
  -1, 0, 1, 0, 1, 0, 3, -5, 0, 0, 0, 0, 0, 0,
  -1, 0, 0, 1, 0, 0, 3, -4, 0, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 2, 0, -2, -2, 0, 0, 0,
  -2, 0, 2, 0, 2, 0, 0, -5, 9, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 0, 0, -1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 0, 0, 0, 2, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2,
  -1, 0, 0, 1, 0, 0, 0, 3, -4, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0,
  0, 0, 1, -1, 2, 0, 0, -1, 0, 0, 2, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, -9, 17, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 2, 0, -3, 5, 0, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, -1, 2, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -2, 0, 0, 0,
  1, 0, 0, -2, 0, 0, 17,-16, 0, -2, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 1, -3, 0, 0, 0,
  -2, 0, 0, 2, 1, 0, 0, 5, -6, 0, 0, 0, 0, 0,
  0, 0, -2, 2, 0, 0, 0, 9,-13, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 2, 0, 0, -1, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0,
  0, 0, -2, 2, 0, 0, 5, -6, 0, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 1, 0, 5, -7, 0, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 6, -8, 0, 0, 0, 0, 0, 0,
  2, 0, 1, -3, 1, 0, -6, 7, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, -1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -8, 15, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -8, 15, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, -9, 15, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 8,-15, 0, 0, 0, 0, 0,
  1, 0, -1, -1, 0, 0, 0, 8,-15, 0, 0, 0, 0, 0,
  2, 0, 0, -2, 0, 0, 2, -5, 0, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 2, 0, -5, 5, 0, 0, 0,
  2, 0, 0, -2, 1, 0, 0, -6, 8, 0, 0, 0, 0, 0,
  2, 0, 0, -2, 1, 0, 0, -2, 0, 3, 0, 0, 0, 0,
  -2, 0, 1, 1, 0, 0, 0, 1, 0, -3, 0, 0, 0, 0,
  -2, 0, 1, 1, 1, 0, 0, 1, 0, -3, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 2, 0, -3, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 6, -8, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 2, 0, -1, -5, 0, 0, 0,
  -1, 0, 0, 1, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0,
  -1, 0, 1, 1, 1, 0,-20, 20, 0, 0, 0, 0, 0, 0,
  1, 0, 0, -2, 0, 0, 20,-21, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 8,-15, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0,-10, 15, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 1, -1, 2, 0, 0, -1, 0, 1, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, -2, 4, 0, 0, 0,
  2, 0, 0, -2, 1, 0, -6, 8, 0, 0, 0, 0, 0, 0,
  0, 0, -2, 2, 1, 0, 5, -6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 0, -1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2,
  0, 0, 2, -2, 1, 0, 0, -9, 13, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 7,-13, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 5, -6, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 9,-17, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -9, 17, 0, 0, 0, 0, 2,
  1, 0, 0, -1, 1, 0, 0, -3, 4, 0, 0, 0, 0, 0,
  1, 0, 0, -1, 1, 0, -3, 4, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 2, 0, 0, -1, 2, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0,
  0, 0, -2, 2, 0, 1, 0, -2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 3, -5, 0, 2, 0, 0, 0, 0,
  -2, 0, 0, 2, 1, 0, 0, 2, 0, -3, 1, 0, 0, 0,
  -2, 0, 0, 2, 1, 0, 3, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 8,-13, 0, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 8,-12, 0, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, -8, 11, 0, 0, 0, 0, 0, 0,
  -1, 0, 0, 1, 0, 0, 0, 2, -2, 0, 0, 0, 0, 0,
  -1, 0, 0, 0, 1, 0, 18,-16, 0, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, -1, 1, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 3, -7, 4, 0, 0, 0, 0, 0,
  -2, 0, 1, 1, 1, 0, 0, -3, 7, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 2, 0, 0, -1, 0, -2, 5, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, -2, 5, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, -4, 8, -3, 0, 0, 0, 0,
  1, 0, 0, 0, 1, 0,-10, 3, 0, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0, -2, 0, 0, 0, 0, 0, 0,
  -1, 0, 0, 0, 1, 0, 10, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 4, -8, 3, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 2, -5, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 0, 1, 0, 2, -5, 0, 0, 0,
  2, 0, -1, -1, 1, 0, 0, 3, -7, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 2, 0, 0, -5, 0, 0, 0,
  0, 0, 0, 0, 1, 0, -3, 7, -4, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  1, 0, 0, 0, 1, 0,-18, 16, 0, 0, 0, 0, 0, 0,
  -2, 0, 1, 1, 1, 0, 0, 1, 0, -2, 0, 0, 0, 0,
  0, 0, 1, -1, 2, 0, -8, 12, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, -8, 13, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, -2, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, 0, -2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, -2, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -2, 2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -1, 2, 0, 0, 0, 0, 1,
  -1, 0, 0, 1, 1, 0, 3, -4, 0, 0, 0, 0, 0, 0,
  -1, 0, 0, 1, 1, 0, 0, 3, -4, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 0, -2, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 0, 2, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2,
  0, 0, 1, -1, 0, 0, 3, -6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, -3, 5, 0, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 2, 0, -3, 4, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, -2, 4, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, -5, 6, 0, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 5, -7, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 5, -8, 0, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 1, 0, 6, -8, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, -8, 15, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 1, 0, 0, 2, 0, -3, 0, 0, 0, 0,
  -2, 0, 0, 2, 1, 0, 0, 6, -8, 0, 0, 0, 0, 0,
  1, 0, 0, -1, 1, 0, 0, -1, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 3, -5, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, -1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2,
  0, 0, 1, -1, 2, 0, 0, -1, 0, 0, -1, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -7, 13, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 7,-13, 0, 0, 0, 0, 0,
  2, 0, 0, -2, 1, 0, 0, -5, 6, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0, -8, 11, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, -1, 0, 2, 0, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 4, -4, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 2, -2, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 0, 3, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 2,
  -2, 0, 0, 2, 0, 0, 3, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 2, 0, 0, -4, 8, -3, 0, 0, 0, 0,
  0, 0, 0, 0, 2, 0, 0, 4, -8, 3, 0, 0, 0, 0,
  2, 0, 0, -2, 1, 0, 0, -2, 0, 2, 0, 0, 0, 0,
  0, 0, 1, -1, 2, 0, 0, -1, 0, 2, 0, 0, 0, 0,
  0, 0, 1, -1, 2, 0, 0, 0, -2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 1, -2, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 0, 2, -2, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 0, 1, 0, 0, -2, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0, -2, 0, 0, 2, 0, 0, 0,
  0, 0, 1, -1, 1, 0, 3, -6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 3, -5, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 3, -5, 0, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 1, 0, -3, 4, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -3, 5, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, -3, 5, 0, 0, 0, 0, 0, 2,
  0, 0, 2, -2, 2, 0, -3, 3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -3, 5, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, -4, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, 1, -4, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, -4, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -2, 4, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, -3, 4, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -2, 4, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, -2, 4, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -5, 8, 0, 0, 0, 0, 0, 2,
  0, 0, 2, -2, 2, 0, -5, 6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -5, 8, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -5, 8, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, -5, 7, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -5, 8, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 5, -8, 0, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 2, 0, 0, -1, 0, -1, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0, -2, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -6, 11, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 6,-11, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, -1, 0, 4, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 1, 0, -4, 0, 0, 0, 0, 0, 0,
  2, 0, 0, -2, 1, 0, -3, 3, 0, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 2, 0, 0, -2, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0, -7, 9, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 4, -5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2,
  0, 0, 2, -2, 2, 0, 0, -2, 0, 2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 2,
  0, 0, 0, 0, 1, 0, 3, -5, 0, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 3, -4, 0, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, -3, 3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 2, -4, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0, -4, 4, 0, 0, 0, 0, 0,
  0, 0, 1, -1, 2, 0, -5, 7, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 3, -6, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -3, 6, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, -4, 6, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -3, 6, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, -3, 6, 0, 0, 0, 0, 2,
  0, 0, -1, 1, 0, 0, 2, -2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 2, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -5, 9, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -5, 9, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 5, -9, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 0, 1, 0, -2, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0, -2, 0, 2, 0, 0, 0, 0,
  -2, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, -2, 2, 0, 0, 3, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -6, 10, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, -6, 10, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -2, 3, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -2, 3, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, -2, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, -3, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, -1, 0, 3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 4, -8, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -4, 8, 0, 0, 0, 0, 2,
  0, 0, -2, 2, 0, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -4, 7, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -4, 7, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 4, -7, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, -2, 3, 0, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0, -2, 0, 3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -5, 10, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 1, 0, -1, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -3, 5, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -3, 5, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 3, -5, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, -2, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 1, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, -2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -1, 2, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, -1, 2, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -7, 11, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -7, 11, 0, 0, 0, 0, 0, 1,
  0, 0, -2, 2, 0, 0, 4, -4, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, -3, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, -4, 4, 0, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 4, -5, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -4, 7, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, -4, 6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -4, 7, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -4, 6, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -4, 6, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, -4, 5, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -4, 6, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 4, -6, 0, 0, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 2, -2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
  0, 0, -1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 1, -1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -1, 0, 5, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 1, -3, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -1, 3, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -7, 12, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -1, 1, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -1, 1, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 1, -2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -2, 5, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -1, 0, 4, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 1, 0, -4, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, -1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -6, 10, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -6, 10, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0, -3, 0, 3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -3, 7, 0, 0, 0, 0, 2,
  -2, 0, 0, 2, 0, 0, 4, -4, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -5, 8, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 5, -8, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -1, 0, 3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -1, 0, 3, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 1, 0, -3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, -4, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -2, 4, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, -2, 3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -2, 4, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -6, 9, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -6, 9, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 6, -9, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 1, 0, -2, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, -2, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -4, 6, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 4, -6, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 3, -4, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -1, 0, 2, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 1, 0, -2, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 1, 0, -1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -5, 9, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, -4, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -3, 4, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -3, 4, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 3, -4, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 3, -4, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 1, 0, 0, 2, -2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, -1, 0, 2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -3, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 1, -5, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -1, 0, 1, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 1, 0, -3, 5, 0, 0, 0,
  0, 0, 0, 0, 1, 0, -3, 4, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -2, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, -2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, -2, 2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -8, 14, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 2, -5, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 5, -8, 3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 5, -8, 3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 3, -8, 3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -3, 8, -3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 1, 0, -2, 5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -8, 12, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -8, 12, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 1, -2, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2,
  0, 0, 2, -2, 1, 0, -5, 5, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 3, -6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -3, 6, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, -3, 6, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -1, 4, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -5, 7, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -5, 7, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, -5, 6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 5, -7, 0, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0, -1, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, -1, 0, 3, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -2, 6, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 1, 0, 2, -2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -6, 9, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 6, -9, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -2, 2, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, -2, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, -2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, -2, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -5, 7, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 5, -7, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, -2, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 4, -5, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -1, 3, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, -1, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -1, 3, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -7, 10, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -7, 10, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 3, -3, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -4, 8, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -4, 5, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -4, 5, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 4, -5, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -2, 0, 5, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -9, 13, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -1, 5, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -2, 0, 4, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, -4, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -2, 7, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, -3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -2, 5, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, -2, 5, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -6, 8, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -6, 8, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 6, -8, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -3, 9, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 5, -6, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 5, -6, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, -2, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 2, 0, -2, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -5, 10, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 4, -4, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 4, -4, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -3, 3, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 3, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 3, -3, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 3, -3, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0, -3, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, -5, 13, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, -1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, -1, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0, -2, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0, -2, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 3, -2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 3, -2, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0, -1, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -6, 15, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -8, 15, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -3, 9, -4, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 2, -5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -2, 8, -1, -5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 6, -8, 3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1,
  0, 0, 1, -1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -6, 16, -4, -5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -2, 8, -3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -2, 8, -3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 6, -8, 1, 5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, -2, 5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 3, -5, 4, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -8, 11, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -8, 11, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, -8, 11, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 3, -3, 0, 2, 0, 0, 0, 2,
  0, 0, 2, -2, 1, 0, 0, 4, -8, 3, 0, 0, 0, 0,
  0, 0, 1, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 0, -4, 8, -3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -3, 7, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -5, 6, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -5, 6, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 5, -6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 5, -6, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -1, 6, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 7, -9, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 2, -1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, -1, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 6, -7, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 5, -5, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -1, 4, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, -1, 4, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -7, 9, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -7, 9, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 4, -3, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, -1, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -4, 4, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 4, -4, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 4, -4, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 4, -4, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -3, 0, 5, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -9, 12, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, 0, -4, 0, 0, 0, 0,
  0, 0, 2, -2, 1, 0, 1, -1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 7, -8, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, 0, -3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 3, 0, -3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -2, 6, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -6, 7, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 6, -7, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 6, -6, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, 0, -2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 3, 0, -2, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 5, -4, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 3, -2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 3, -2, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, 0, -1, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, 0, -1, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, 0, 0, -2, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 4, -2, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, 0, 0, -1, 0, 0, 2,
  0, 0, 2, -2, 1, 0, 0, 1, 0, -1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, -8, 16, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, 0, 2, -5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 7, -8, 3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -5, 16, -4, -5, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, -1, 8, -3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -8, 10, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -8, 10, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, -8, 10, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -3, 8, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -5, 5, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 5, -5, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 5, -5, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 5, -5, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 7, -7, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 7, -7, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 6, -5, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 7, -8, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 5, -3, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 4, -3, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -9, 11, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -9, 11, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 4, 0, -4, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 4, 0, -3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -6, 6, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 6, -6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 6, -6, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 4, 0, -2, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 6, -4, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 3, -1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 3, -1, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 3, -1, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 4, 0, -1, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 4, 0, 0, -2, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 5, -2, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 8, -9, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 5, -4, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, -7, 7, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 7, -7, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 4, -2, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 4, -2, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 4, -2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 4, -2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 5, 0, -4, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 5, 0, -3, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 5, 0, -2, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -8, 8, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 8, -8, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 5, -3, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 5, -3, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, -9, 9, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, -9, 9, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, -9, 9, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 9, -9, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 6, -4, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  1, 0, 0, -2, 0, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  1, 0, 0, -2, 0, 0, 2, -2, 0, 0, 0, 0, 0, 0,
  1, 0, 0, -2, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0,
  1, 0, 0, -2, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0,
  -1, 0, 0, 0, 0, 0, 3, -3, 0, 0, 0, 0, 0, 0,
  -1, 0, 0, 0, 0, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  -1, 0, 0, 2, 0, 0, 0, 4, -8, 3, 0, 0, 0, 0,
  1, 0, 0, -2, 0, 0, 0, 4, -8, 3, 0, 0, 0, 0,
  -2, 0, 0, 2, 0, 0, 0, 4, -8, 3, 0, 0, 0, 0,
  -1, 0, 0, 0, 0, 0, 0, 2, 0, -3, 0, 0, 0, 0,
  -1, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0,
  -1, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0,
  -1, 0, 0, 2, 0, 0, 2, -2, 0, 0, 0, 0, 0, 0,
  1, 0, -1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  -1, 0, 0, 2, 0, 0, 0, 2, 0, -3, 0, 0, 0, 0,
  -2, 0, 0, 0, 0, 0, 0, 2, 0, -3, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 4, -8, 3, 0, 0, 0, 0,
  -1, 0, 1, -1, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0,
  1, 0, 1, -1, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0,
  -1, 0, 0, 0, 0, 0, 0, 4, -8, 3, 0, 0, 0, 0,
  -1, 0, 0, 2, 1, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  -1, 0, 0, 2, 0, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  -1, 0, 0, 2, 0, 0, 3, -3, 0, 0, 0, 0, 0, 0,
  1, 0, 0, -2, 1, 0, 0, -2, 0, 2, 0, 0, 0, 0,
  1, 0, 2, -2, 2, 0, -3, 3, 0, 0, 0, 0, 0, 0,
  1, 0, 2, -2, 2, 0, 0, -2, 0, 2, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0,
  0, 0, 0, -2, 0, 0, 2, -2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, -2, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0,
  0, 0, 2, 0, 2, 0, -2, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 2, 0, 2, 0, 0, -1, 0, 1, 0, 0, 0, 0,
  0, 0, 2, 0, 2, 0, -1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 2, 0, 2, 0, -2, 3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 2, 0, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  0, 0, 1, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  1, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  -1, 0, 2, 0, 2, 0, 10, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  1, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 2, 0, 2, 0, 0, 4, -8, 3, 0, 0, 0, 0,
  0, 0, 2, 0, 2, 0, 0, -4, 8, -3, 0, 0, 0, 0,
  -1, 0, 2, 0, 2, 0, 0, -4, 8, -3, 0, 0, 0, 0,
  2, 0, 2, -2, 2, 0, 0, -2, 0, 3, 0, 0, 0, 0,
  1, 0, 2, 0, 1, 0, 0, -2, 0, 3, 0, 0, 0, 0,
  0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  -1, 0, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  -2, 0, 2, 2, 2, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  0, 0, 2, 0, 2, 0, 2, -3, 0, 0, 0, 0, 0, 0,
  0, 0, 2, 0, 2, 0, 1, -1, 0, 0, 0, 0, 0, 0,
  0, 0, 2, 0, 2, 0, 0, 1, 0, -1, 0, 0, 0, 0,
  0, 0, 2, 0, 2, 0, 2, -2, 0, 0, 0, 0, 0, 0,
  -1, 0, 2, 2, 2, 0, 0, -1, 0, 1, 0, 0, 0, 0,
  1, 0, 2, 0, 2, 0, -1, 1, 0, 0, 0, 0, 0, 0,
  -1, 0, 2, 2, 2, 0, 0, 2, 0, -3, 0, 0, 0, 0,
  2, 0, 2, 0, 2, 0, 0, 2, 0, -3, 0, 0, 0, 0,
  1, 0, 2, 0, 2, 0, 0, -4, 8, -3, 0, 0, 0, 0,
  1, 0, 2, 0, 2, 0, 0, 4, -8, 3, 0, 0, 0, 0,
  1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  2, 0, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  -1, 0, 2, 2, 2, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  -1, 0, 2, 2, 2, 0, 3, -3, 0, 0, 0, 0, 0, 0,
  1, 0, 2, 0, 2, 0, 1, -1, 0, 0, 0, 0, 0, 0,
  0, 0, 2, 2, 2, 0, 0, 2, 0, -2, 0, 0, 0, 0,
  ],
};

Swe.Swenut2000aNls = {
  nls:[
  0, 0, 0, 0, 1,
  0, 0, 2, -2, 2,
  0, 0, 2, 0, 2,
  0, 0, 0, 0, 2,
  0, 1, 0, 0, 0,
  0, 1, 2, -2, 2,
  1, 0, 0, 0, 0,
  0, 0, 2, 0, 1,
  1, 0, 2, 0, 2,
  0, -1, 2, -2, 2,
  0, 0, 2, -2, 1,
  -1, 0, 2, 0, 2,
  -1, 0, 0, 2, 0,
  1, 0, 0, 0, 1,
  -1, 0, 0, 0, 1,
  -1, 0, 2, 2, 2,
  1, 0, 2, 0, 1,
  -2, 0, 2, 0, 1,
  0, 0, 0, 2, 0,
  0, 0, 2, 2, 2,
  0, -2, 2, -2, 2,
  -2, 0, 0, 2, 0,
  2, 0, 2, 0, 2,
  1, 0, 2, -2, 2,
  -1, 0, 2, 0, 1,
  2, 0, 0, 0, 0,
  0, 0, 2, 0, 0,
  0, 1, 0, 0, 1,
  -1, 0, 0, 2, 1,
  0, 2, 2, -2, 2,
  0, 0, -2, 2, 0,
  1, 0, 0, -2, 1,
  0, -1, 0, 0, 1,
  -1, 0, 2, 2, 1,
  0, 2, 0, 0, 0,
  1, 0, 2, 2, 2,
  -2, 0, 2, 0, 0,
  0, 1, 2, 0, 2,
  0, 0, 2, 2, 1,
  0, -1, 2, 0, 2,
  0, 0, 0, 2, 1,
  1, 0, 2, -2, 1,
  2, 0, 2, -2, 2,
  -2, 0, 0, 2, 1,
  2, 0, 2, 0, 1,
  0, -1, 2, -2, 1,
  0, 0, 0, -2, 1,
  -1, -1, 0, 2, 0,
  2, 0, 0, -2, 1,
  1, 0, 0, 2, 0,
  0, 1, 2, -2, 1,
  1, -1, 0, 0, 0,
  -2, 0, 2, 0, 2,
  3, 0, 2, 0, 2,
  0, -1, 0, 2, 0,
  1, -1, 2, 0, 2,
  0, 0, 0, 1, 0,
  -1, -1, 2, 2, 2,
  -1, 0, 2, 0, 0,
  0, -1, 2, 2, 2,
  -2, 0, 0, 0, 1,
  1, 1, 2, 0, 2,
  2, 0, 0, 0, 1,
  -1, 1, 0, 1, 0,
  1, 1, 0, 0, 0,
  1, 0, 2, 0, 0,
  -1, 0, 2, -2, 1,
  1, 0, 0, 0, 2,
  -1, 0, 0, 1, 0,
  0, 0, 2, 1, 2,
  -1, 0, 2, 4, 2,
  -1, 1, 0, 1, 1,
  0, -2, 2, -2, 1,
  1, 0, 2, 2, 1,
  -2, 0, 2, 2, 2,
  -1, 0, 0, 0, 2,
  1, 1, 2, -2, 2,
  -2, 0, 2, 4, 2,
  -1, 0, 4, 0, 2,
  2, 0, 2, -2, 1,
  2, 0, 2, 2, 2,
  1, 0, 0, 2, 1,
  3, 0, 0, 0, 0,
  3, 0, 2, -2, 2,
  0, 0, 4, -2, 2,
  0, 1, 2, 0, 1,
  0, 0, -2, 2, 1,
  0, 0, 2, -2, 3,
  -1, 0, 0, 4, 0,
  2, 0, -2, 0, 1,
  -2, 0, 0, 4, 0,
  -1, -1, 0, 2, 1,
  -1, 0, 0, 1, 1,
  0, 1, 0, 0, 2,
  0, 0, -2, 0, 1,
  0, -1, 2, 0, 1,
  0, 0, 2, -1, 2,
  0, 0, 2, 4, 2,
  -2, -1, 0, 2, 0,
  1, 1, 0, -2, 1,
  -1, 1, 0, 2, 0,
  -1, 1, 0, 1, 2,
  1, -1, 0, 0, 1,
  1, -1, 2, 2, 2,
  -1, 1, 2, 2, 2,
  3, 0, 2, 0, 1,
  0, 1, -2, 2, 0,
  -1, 0, 0, -2, 1,
  0, 1, 2, 2, 2,
  -1, -1, 2, 2, 1,
  0, -1, 0, 0, 2,
  1, 0, 2, -4, 1,
  -1, 0, -2, 2, 0,
  0, -1, 2, 2, 1,
  2, -1, 2, 0, 2,
  0, 0, 0, 2, 2,
  1, -1, 2, 0, 1,
  -1, 1, 2, 0, 2,
  0, 1, 0, 2, 0,
  0, -1, -2, 2, 0,
  0, 3, 2, -2, 2,
  0, 0, 0, 1, 1,
  -1, 0, 2, 2, 0,
  2, 1, 2, 0, 2,
  1, 1, 0, 0, 1,
  1, 1, 2, 0, 1,
  2, 0, 0, 2, 0,
  1, 0, -2, 2, 0,
  -1, 0, 0, 2, 2,
  0, 1, 0, 1, 0,
  0, 1, 0, -2, 1,
  -1, 0, 2, -2, 2,
  0, 0, 0, -1, 1,
  -1, 1, 0, 0, 1,
  1, 0, 2, -1, 2,
  1, -1, 0, 2, 0,
  0, 0, 0, 4, 0,
  1, 0, 2, 1, 2,
  0, 0, 2, 1, 1,
  1, 0, 0, -2, 2,
  -1, 0, 2, 4, 1,
  1, 0, -2, 0, 1,
  1, 1, 2, -2, 1,
  0, 0, 2, 2, 0,
  -1, 0, 2, -1, 1,
  -2, 0, 2, 2, 1,
  4, 0, 2, 0, 2,
  2, -1, 0, 0, 0,
  2, 1, 2, -2, 2,
  0, 1, 2, 1, 2,
  1, 0, 4, -2, 2,
  -1, -1, 0, 0, 1,
  0, 1, 0, 2, 1,
  -2, 0, 2, 4, 1,
  2, 0, 2, 0, 0,
  1, 0, 0, 1, 0,
  -1, 0, 0, 4, 1,
  -1, 0, 4, 0, 1,
  2, 0, 2, 2, 1,
  0, 0, 2, -3, 2,
  -1, -2, 0, 2, 0,
  2, 1, 0, 0, 0,
  0, 0, 4, 0, 2,
  0, 0, 0, 0, 3,
  0, 3, 0, 0, 0,
  0, 0, 2, -4, 1,
  0, -1, 0, 2, 1,
  0, 0, 0, 4, 1,
  -1, -1, 2, 4, 2,
  1, 0, 2, 4, 2,
  -2, 2, 0, 2, 0,
  -2, -1, 2, 0, 1,
  -2, 0, 0, 2, 2,
  -1, -1, 2, 0, 2,
  0, 0, 4, -2, 1,
  3, 0, 2, -2, 1,
  -2, -1, 0, 2, 1,
  1, 0, 0, -1, 1,
  0, -2, 0, 2, 0,
  -2, 0, 0, 4, 1,
  -3, 0, 0, 0, 1,
  1, 1, 2, 2, 2,
  0, 0, 2, 4, 1,
  3, 0, 2, 2, 2,
  -1, 1, 2, -2, 1,
  2, 0, 0, -4, 1,
  0, 0, 0, -2, 2,
  2, 0, 2, -4, 1,
  -1, 1, 0, 2, 1,
  0, 0, 2, -1, 1,
  0, -2, 2, 2, 2,
  2, 0, 0, 2, 1,
  4, 0, 2, -2, 2,
  2, 0, 0, -2, 2,
  0, 2, 0, 0, 1,
  1, 0, 0, -4, 1,
  0, 2, 2, -2, 1,
  -3, 0, 0, 4, 0,
  -1, 1, 2, 0, 1,
  -1, -1, 0, 4, 0,
  -1, -2, 2, 2, 2,
  -2, -1, 2, 4, 2,
  1, -1, 2, 2, 1,
  -2, 1, 0, 2, 0,
  -2, 1, 2, 0, 1,
  2, 1, 0, -2, 1,
  -3, 0, 2, 0, 1,
  -2, 0, 2, -2, 1,
  -1, 1, 0, 2, 2,
  0, -1, 2, -1, 2,
  -1, 0, 4, -2, 2,
  0, -2, 2, 0, 2,
  -1, 0, 2, 1, 2,
  2, 0, 0, 0, 2,
  0, 0, 2, 0, 3,
  -2, 0, 4, 0, 2,
  -1, 0, -2, 0, 1,
  -1, 1, 2, 2, 1,
  3, 0, 0, 0, 1,
  -1, 0, 2, 3, 2,
  2, -1, 2, 0, 1,
  0, 1, 2, 2, 1,
  0, -1, 2, 4, 2,
  2, -1, 2, 2, 2,
  0, 2, -2, 2, 0,
  -1, -1, 2, -1, 1,
  0, -2, 0, 0, 1,
  1, 0, 2, -4, 2,
  1, -1, 0, -2, 1,
  -1, -1, 2, 0, 1,
  1, -1, 2, -2, 2,
  -2, -1, 0, 4, 0,
  -1, 0, 0, 3, 0,
  -2, -1, 2, 2, 2,
  0, 2, 2, 0, 2,
  1, 1, 0, 2, 0,
  2, 0, 2, -1, 2,
  1, 0, 2, 1, 1,
  4, 0, 0, 0, 0,
  2, 1, 2, 0, 1,
  3, -1, 2, 0, 2,
  -2, 2, 0, 2, 1,
  1, 0, 2, -3, 1,
  1, 1, 2, -4, 1,
  -1, -1, 2, -2, 1,
  0, -1, 0, -1, 1,
  0, -1, 0, -2, 1,
  -2, 0, 0, 0, 2,
  -2, 0, -2, 2, 0,
  -1, 0, -2, 4, 0,
  1, -2, 0, 0, 0,
  0, 1, 0, 1, 1,
  -1, 2, 0, 2, 0,
  1, -1, 2, -2, 1,
  1, 2, 2, -2, 2,
  2, -1, 2, -2, 2,
  1, 0, 2, -1, 1,
  2, 1, 2, -2, 1,
  -2, 0, 0, -2, 1,
  1, -2, 2, 0, 2,
  0, 1, 2, 1, 1,
  1, 0, 4, -2, 1,
  -2, 0, 4, 2, 2,
  1, 1, 2, 1, 2,
  1, 0, 0, 4, 0,
  1, 0, 2, 2, 0,
  2, 0, 2, 1, 2,
  3, 1, 2, 0, 2,
  4, 0, 2, 0, 1,
  -2, -1, 2, 0, 0,
  0, 1, -2, 2, 1,
  1, 0, -2, 1, 0,
  0, -1, -2, 2, 1,
  2, -1, 0, -2, 1,
  -1, 0, 2, -1, 2,
  1, 0, 2, -3, 2,
  0, 1, 2, -2, 3,
  0, 0, 2, -3, 1,
  -1, 0, -2, 2, 1,
  0, 0, 2, -4, 2,
  -2, 1, 0, 0, 1,
  -1, 0, 0, -1, 1,
  2, 0, 2, -4, 2,
  0, 0, 4, -4, 4,
  0, 0, 4, -4, 2,
  -1, -2, 0, 2, 1,
  -2, 0, 0, 3, 0,
  1, 0, -2, 2, 1,
  -3, 0, 2, 2, 2,
  -3, 0, 2, 2, 1,
  -2, 0, 2, 2, 0,
  2, -1, 0, 0, 1,
  -2, 1, 2, 2, 2,
  1, 1, 0, 1, 0,
  0, 1, 4, -2, 2,
  -1, 1, 0, -2, 1,
  0, 0, 0, -4, 1,
  1, -1, 0, 2, 1,
  1, 1, 0, 2, 1,
  -1, 2, 2, 2, 2,
  3, 1, 2, -2, 2,
  0, -1, 0, 4, 0,
  2, -1, 0, 2, 0,
  0, 0, 4, 0, 1,
  2, 0, 4, -2, 2,
  -1, -1, 2, 4, 1,
  1, 0, 0, 4, 1,
  1, -2, 2, 2, 2,
  0, 0, 2, 3, 2,
  -1, 1, 2, 4, 2,
  3, 0, 0, 2, 0,
  -1, 0, 4, 2, 2,
  1, 1, 2, 2, 1,
  -2, 0, 2, 6, 2,
  2, 1, 2, 2, 2,
  -1, 0, 2, 6, 2,
  1, 0, 2, 4, 1,
  2, 0, 2, 4, 2,
  1, 1, -2, 1, 0,
  -3, 1, 2, 1, 2,
  2, 0, -2, 0, 2,
  -1, 0, 0, 1, 2,
  -4, 0, 2, 2, 1,
  -1, -1, 0, 1, 0,
  0, 0, -2, 2, 2,
  1, 0, 0, -1, 2,
  0, -1, 2, -2, 3,
  -2, 1, 2, 0, 0,
  0, 0, 2, -2, 4,
  -2, -2, 0, 2, 0,
  -2, 0, -2, 4, 0,
  0, -2, -2, 2, 0,
  1, 2, 0, -2, 1,
  3, 0, 0, -4, 1,
  -1, 1, 2, -2, 2,
  1, -1, 2, -4, 1,
  1, 1, 0, -2, 2,
  -3, 0, 2, 0, 0,
  -3, 0, 2, 0, 2,
  -2, 0, 0, 1, 0,
  0, 0, -2, 1, 0,
  -3, 0, 0, 2, 1,
  -1, -1, -2, 2, 0,
  0, 1, 2, -4, 1,
  2, 1, 0, -4, 1,
  0, 2, 0, -2, 1,
  1, 0, 0, -3, 1,
  -2, 0, 2, -2, 2,
  -2, -1, 0, 0, 1,
  -4, 0, 0, 2, 0,
  1, 1, 0, -4, 1,
  -1, 0, 2, -4, 1,
  0, 0, 4, -4, 1,
  0, 3, 2, -2, 2,
  -3, -1, 0, 4, 0,
  -3, 0, 0, 4, 1,
  1, -1, -2, 2, 0,
  -1, -1, 0, 2, 2,
  1, -2, 0, 0, 1,
  1, -1, 0, 0, 2,
  0, 0, 0, 1, 2,
  -1, -1, 2, 0, 0,
  1, -2, 2, -2, 2,
  0, -1, 2, -1, 1,
  -1, 0, 2, 0, 3,
  1, 1, 0, 0, 2,
  -1, 1, 2, 0, 0,
  1, 2, 0, 0, 0,
  -1, 2, 2, 0, 2,
  -1, 0, 4, -2, 1,
  3, 0, 2, -4, 2,
  1, 2, 2, -2, 1,
  1, 0, 4, -4, 2,
  -2, -1, 0, 4, 1,
  0, -1, 0, 2, 2,
  -2, 1, 0, 4, 0,
  -2, -1, 2, 2, 1,
  2, 0, -2, 2, 0,
  1, 0, 0, 1, 1,
  0, 1, 0, 2, 2,
  1, -1, 2, -1, 2,
  -2, 0, 4, 0, 1,
  2, 1, 0, 0, 1,
  0, 1, 2, 0, 0,
  0, -1, 4, -2, 2,
  0, 0, 4, -2, 4,
  0, 2, 2, 0, 1,
  -3, 0, 0, 6, 0,
  -1, -1, 0, 4, 1,
  1, -2, 0, 2, 0,
  -1, 0, 0, 4, 2,
  -1, -2, 2, 2, 1,
  -1, 0, 0, -2, 2,
  1, 0, -2, -2, 1,
  0, 0, -2, -2, 1,
  -2, 0, -2, 0, 1,
  0, 0, 0, 3, 1,
  0, 0, 0, 3, 0,
  -1, 1, 0, 4, 0,
  -1, -1, 2, 2, 0,
  -2, 0, 2, 3, 2,
  1, 0, 0, 2, 2,
  0, -1, 2, 1, 2,
  3, -1, 0, 0, 0,
  2, 0, 0, 1, 0,
  1, -1, 2, 0, 0,
  0, 0, 2, 1, 0,
  1, 0, 2, 0, 3,
  3, 1, 0, 0, 0,
  3, -1, 2, -2, 2,
  2, 0, 2, -1, 1,
  1, 1, 2, 0, 0,
  0, 0, 4, -1, 2,
  1, 2, 2, 0, 2,
  -2, 0, 0, 6, 0,
  0, -1, 0, 4, 1,
  -2, -1, 2, 4, 1,
  0, -2, 2, 2, 1,
  0, -1, 2, 2, 0,
  -1, 0, 2, 3, 1,
  -2, 1, 2, 4, 2,
  2, 0, 0, 2, 2,
  2, -2, 2, 0, 2,
  -1, 1, 2, 3, 2,
  3, 0, 2, -1, 2,
  4, 0, 2, -2, 1,
  -1, 0, 0, 6, 0,
  -1, -2, 2, 4, 2,
  -3, 0, 2, 6, 2,
  -1, 0, 2, 4, 0,
  3, 0, 0, 2, 1,
  3, -1, 2, 0, 1,
  3, 0, 2, 0, 0,
  1, 0, 4, 0, 2,
  5, 0, 2, -2, 2,
  0, -1, 2, 4, 1,
  2, -1, 2, 2, 1,
  0, 1, 2, 4, 2,
  1, -1, 2, 4, 2,
  3, -1, 2, 2, 2,
  3, 0, 2, 2, 1,
  5, 0, 2, 0, 2,
  0, 0, 2, 6, 2,
  4, 0, 2, 2, 2,
  0, -1, 1, -1, 1,
  -1, 0, 1, 0, 3,
  0, -2, 2, -2, 3,
  1, 0, -1, 0, 1,
  2, -2, 0, -2, 1,
  -1, 0, 1, 0, 2,
  -1, 0, 1, 0, 1,
  -1, -1, 2, -1, 2,
  -2, 2, 0, 2, 2,
  -1, 0, 1, 0, 0,
  -4, 1, 2, 2, 2,
  -3, 0, 2, 1, 1,
  -2, -1, 2, 0, 2,
  1, 0, -2, 1, 1,
  2, -1, -2, 0, 1,
  -4, 0, 2, 2, 0,
  -3, 1, 0, 3, 0,
  -1, 0, -1, 2, 0,
  0, -2, 0, 0, 2,
  0, -2, 0, 0, 2,
  -3, 0, 0, 3, 0,
  -2, -1, 0, 2, 2,
  -1, 0, -2, 3, 0,
  -4, 0, 0, 4, 0,
  2, 1, -2, 0, 1,
  2, -1, 0, -2, 2,
  0, 0, 1, -1, 0,
  -1, 2, 0, 1, 0,
  -2, 1, 2, 0, 2,
  1, 1, 0, -1, 1,
  1, 0, 1, -2, 1,
  0, 2, 0, 0, 2,
  1, -1, 2, -3, 1,
  -1, 1, 2, -1, 1,
  -2, 0, 4, -2, 2,
  -2, 0, 4, -2, 1,
  -2, -2, 0, 2, 1,
  -2, 0, -2, 4, 0,
  1, 2, 2, -4, 1,
  1, 1, 2, -4, 2,
  -1, 2, 2, -2, 1,
  2, 0, 0, -3, 1,
  -1, 2, 0, 0, 1,
  0, 0, 0, -2, 0,
  -1, -1, 2, -2, 2,
  -1, 1, 0, 0, 2,
  0, 0, 0, -1, 2,
  -2, 1, 0, 1, 0,
  1, -2, 0, -2, 1,
  1, 0, -2, 0, 2,
  -3, 1, 0, 2, 0,
  -1, 1, -2, 2, 0,
  -1, -1, 0, 0, 2,
  -3, 0, 0, 2, 0,
  -3, -1, 0, 2, 0,
  2, 0, 2, -6, 1,
  0, 1, 2, -4, 2,
  2, 0, 0, -4, 2,
  -2, 1, 2, -2, 1,
  0, -1, 2, -4, 1,
  0, 1, 0, -2, 2,
  -1, 0, 0, -2, 0,
  2, 0, -2, -2, 1,
  -4, 0, 2, 0, 1,
  -1, -1, 0, -1, 1,
  0, 0, -2, 0, 2,
  -3, 0, 0, 1, 0,
  -1, 0, -2, 1, 0,
  -2, 0, -2, 2, 1,
  0, 0, -4, 2, 0,
  -2, -1, -2, 2, 0,
  1, 0, 2, -6, 1,
  -1, 0, 2, -4, 2,
  1, 0, 0, -4, 2,
  2, 1, 2, -4, 2,
  2, 1, 2, -4, 1,
  0, 1, 4, -4, 4,
  0, 1, 4, -4, 2,
  -1, -1, -2, 4, 0,
  -1, -3, 0, 2, 0,
  -1, 0, -2, 4, 1,
  -2, -1, 0, 3, 0,
  0, 0, -2, 3, 0,
  -2, 0, 0, 3, 1,
  0, -1, 0, 1, 0,
  -3, 0, 2, 2, 0,
  1, 1, -2, 2, 0,
  -1, 1, 0, 2, 2,
  1, -2, 2, -2, 1,
  0, 0, 1, 0, 2,
  0, 0, 1, 0, 1,
  0, 0, 1, 0, 0,
  -1, 2, 0, 2, 1,
  0, 0, 2, 0, 2,
  -2, 0, 2, 0, 2,
  2, 0, 0, -1, 1,
  3, 0, 0, -2, 1,
  1, 0, 2, -2, 3,
  1, 2, 0, 0, 1,
  2, 0, 2, -3, 2,
  -1, 1, 4, -2, 2,
  -2, -2, 0, 4, 0,
  0, -3, 0, 2, 0,
  0, 0, -2, 4, 0,
  -1, -1, 0, 3, 0,
  -2, 0, 0, 4, 2,
  -1, 0, 0, 3, 1,
  2, -2, 0, 0, 0,
  1, -1, 0, 1, 0,
  -1, 0, 0, 2, 0,
  0, -2, 2, 0, 1,
  -1, 0, 1, 2, 1,
  -1, 1, 0, 3, 0,
  -1, -1, 2, 1, 2,
  0, -1, 2, 0, 0,
  -2, 1, 2, 2, 1,
  2, -2, 2, -2, 2,
  1, 1, 0, 1, 1,
  1, 0, 1, 0, 1,
  1, 0, 1, 0, 0,
  0, 2, 0, 2, 0,
  2, -1, 2, -2, 1,
  0, -1, 4, -2, 1,
  0, 0, 4, -2, 3,
  0, 1, 4, -2, 1,
  4, 0, 2, -4, 2,
  2, 2, 2, -2, 2,
  2, 0, 4, -4, 2,
  -1, -2, 0, 4, 0,
  -1, -3, 2, 2, 2,
  -3, 0, 2, 4, 2,
  -3, 0, 2, -2, 1,
  -1, -1, 0, -2, 1,
  -3, 0, 0, 0, 2,
  -3, 0, -2, 2, 0,
  0, 1, 0, -4, 1,
  -2, 1, 0, -2, 1,
  -4, 0, 0, 0, 1,
  -1, 0, 0, -4, 1,
  -3, 0, 0, -2, 1,
  0, 0, 0, 3, 2,
  -1, 1, 0, 4, 1,
  1, -2, 2, 0, 1,
  0, 1, 0, 3, 0,
  -1, 0, 2, 2, 3,
  0, 0, 2, 2, 2,
  -2, 0, 2, 2, 2,
  -1, 1, 2, 2, 0,
  3, 0, 0, 0, 2,
  2, 1, 0, 1, 0,
  2, -1, 2, -1, 2,
  0, 0, 2, 0, 1,
  0, 0, 3, 0, 3,
  0, 0, 3, 0, 2,
  -1, 2, 2, 2, 1,
  -1, 0, 4, 0, 0,
  1, 2, 2, 0, 1,
  3, 1, 2, -2, 1,
  1, 1, 4, -2, 2,
  -2, -1, 0, 6, 0,
  0, -2, 0, 4, 0,
  -2, 0, 0, 6, 1,
  -2, -2, 2, 4, 2,
  0, -3, 2, 2, 2,
  0, 0, 0, 4, 2,
  -1, -1, 2, 3, 2,
  -2, 0, 2, 4, 0,
  2, -1, 0, 2, 1,
  1, 0, 0, 3, 0,
  0, 1, 0, 4, 1,
  0, 1, 0, 4, 0,
  1, -1, 2, 1, 2,
  0, 0, 2, 2, 3,
  1, 0, 2, 2, 2,
  -1, 0, 2, 2, 2,
  -2, 0, 4, 2, 1,
  2, 1, 0, 2, 1,
  2, 1, 0, 2, 0,
  2, -1, 2, 0, 0,
  1, 0, 2, 1, 0,
  0, 1, 2, 2, 0,
  2, 0, 2, 0, 3,
  3, 0, 2, 0, 2,
  1, 0, 2, 0, 2,
  1, 0, 3, 0, 3,
  1, 1, 2, 1, 1,
  0, 2, 2, 2, 2,
  2, 1, 2, 0, 0,
  2, 0, 4, -2, 1,
  4, 1, 2, -2, 2,
  -1, -1, 0, 6, 0,
  -3, -1, 2, 6, 2,
  -1, 0, 0, 6, 1,
  -3, 0, 2, 6, 1,
  1, -1, 0, 4, 1,
  1, -1, 0, 4, 0,
  -2, 0, 2, 5, 2,
  1, -2, 2, 2, 1,
  3, -1, 0, 2, 0,
  1, -1, 2, 2, 0,
  0, 0, 2, 3, 1,
  -1, 1, 2, 4, 1,
  0, 1, 2, 3, 2,
  -1, 0, 4, 2, 1,
  2, 0, 2, 1, 1,
  5, 0, 0, 0, 0,
  2, 1, 2, 1, 2,
  1, 0, 4, 0, 1,
  3, 1, 2, 0, 1,
  3, 0, 4, -2, 2,
  -2, -1, 2, 6, 2,
  0, 0, 0, 6, 0,
  0, -2, 2, 4, 2,
  -2, 0, 2, 6, 1,
  2, 0, 0, 4, 1,
  2, 0, 0, 4, 0,
  2, -2, 2, 2, 2,
  0, 0, 2, 4, 0,
  1, 0, 2, 3, 2,
  4, 0, 0, 2, 0,
  2, 0, 2, 2, 0,
  0, 0, 4, 2, 2,
  4, -1, 2, 0, 2,
  3, 0, 2, 1, 2,
  2, 1, 2, 2, 1,
  4, 1, 2, 0, 2,
  -1, -1, 2, 6, 2,
  -1, 0, 2, 6, 1,
  1, -1, 2, 4, 1,
  1, 1, 2, 4, 2,
  3, 1, 2, 2, 2,
  5, 0, 2, 0, 1,
  2, -1, 2, 4, 2,
  2, 0, 2, 4, 1,
  ],
}

/*
* This class contains many constants for internal use only.
* It does not need to be instantiated.
*/
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

Swe.SwissData = {
    ODEGREE_STRING : "Âø",  /* degree as string, utf8 encoding */

    ayanamsa_name : [
       "Fagan/Bradley",
       "Lahiri",
       "De Luce",
       "Raman",
       "Ushashashi",
       "Krishnamurti",
       "Djwhal Khul",
       "Yukteshwar",
       "J.N. Bhasin",
       "Babylonian/Kugler 1",
       "Babylonian/Kugler 2",
       "Babylonian/Kugler 3",
       "Babylonian/Huber",
       "Babylonian/Eta Piscium",
       "Babylonian/Aldebaran = 15 Tau",
       "Hipparchos",
       "Sassanian",
       "Galact. Center = 0 Sag",
       "J2000",
       "J1900",
       "B1950",
       "Suryasiddhanta",
       "Suryasiddhanta, mean Sun",
       "Aryabhata",
       "Aryabhata, mean Sun",
       "SS Revati",
       "SS Citra",
       "True Citra",
       "True Revati",
       "True Pushya",
    ],

    AS_MAXCH : 256, // used for string declarations,
                                          // allowing 255 char+\0

    DEGTORAD : 0.0174532925199433,
    RADTODEG : 57.2957795130823,

    DEG : 360000,  // degree expressed in centiseconds
    DEG7_30 : 2700000, // 7.5 degrees
    DEG15 : 15 * 360000,
    DEG24 : 24 * 360000,
    DEG30 : 30 * 360000,
    DEG60 : 60 * 360000,
    DEG90 : 90 * 360000,
    DEG120 : 120 * 360000,
    DEG150 : 150 * 360000,
    DEG180 : 180 * 360000,
    DEG270 : 270 * 360000,
    DEG360 : 360 * 360000,

    CSTORAD : 4.84813681109536E-08, // centisec to rad:
                                                 // pi / 180 /3600/100
    RADTOCS : 2.06264806247096E+07, // rad to centisec
                                                      // 180*3600*100/pi

    CS2DEG : 1.0/360000.0,       // centisec to degree

    BFILE_R_ACCESS : "r",  // open binary file for reading
    BFILE_RW_ACCESS : "r+",// open binary file for writing and reading
    BFILE_W_CREATE : "w",  // create/open binary file for write
    BFILE_A_ACCESS : "a+", // create/open binary file for append
    FILE_R_ACCESS : "r",   // open text file for reading
    FILE_RW_ACCESS : "r+", // open text file for writing and reading
    FILE_W_CREATE : "w",   // create/open text file for write
    FILE_A_ACCESS : "a+",  // create/open text file for append
    O_BINARY : 0,             // for open(), not defined in Unix
    OPEN_MODE : "0666",         // default file creation mode
    // file.separator may be null with JavaME
    DIR_GLUE : "/",              // glue string for directory/file
    PATH_SEPARATOR : ",:", // semicolon or colon may be used


    //////////////////////////////////////////////////////////////////////////////
    // swephexp.h: ///////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    SE_NSIDM_PREDEF          :30,

    //  static final int SE_MAX_STNAME=20,    // maximum size of fixstar name,
    //                                        // the parameter star in swe_fixstar
    //          // must allow twice this space for
    //                // the returned star name.
    //

    pnoext2int : [
      Swe.SwephData.SEI_SUN,
      Swe.SwephData.SEI_MOON,
      Swe.SwephData.SEI_MERCURY,
      Swe.SwephData.SEI_VENUS,
      Swe.SwephData.SEI_MARS,
      Swe.SwephData.SEI_JUPITER,
      Swe.SwephData.SEI_SATURN,
      Swe.SwephData.SEI_URANUS,
      Swe.SwephData.SEI_NEPTUNE,
      Swe.SwephData.SEI_PLUTO,
      0, 0, 0, 0,
      Swe.SwephData.SEI_EARTH,
      Swe.SwephData.SEI_CHIRON,
      Swe.SwephData.SEI_PHOLUS,
      Swe.SwephData.SEI_CERES,
      Swe.SwephData.SEI_PALLAS,
      Swe.SwephData.SEI_JUNO,
      Swe.SwephData.SEI_VESTA
    ],

    ephe_path_is_set : false, /* ephe_path_is_set = FALSE */
    jpl_file_is_open : false, /* jpl_file_is_open = FALSE */
    fixfp : null,     /* fixfp, fixed stars file pointer */
    fixstarsHash : null,
    ephepath : Swe.SE_EPHE_PATH,  /* ephepath, ephemeris path */
    jplfnam : Swe.SE_FNAME_DFT, /* jplfnam, JPL file name, default */
    jpldenum : 0,     /* jpldenum */
    eop_tjd_beg : 0.0,
    eop_tjd_beg_horizons : 0.0,
    eop_tjd_end : 0.0,
    eop_tjd_end_add : 0.0,
    eop_dpsi_loaded : 0,
    geopos_is_set : false,    /* geopos_is_set, for topocentric */
    ayana_is_set : false,   /* ayana_is_set, ayanamsa is set */
    is_old_starfile : false,  /* is_old_starfile, fixstars.cat is used (default is sefstars.txt) */

    fidat : new Array(Swe.SwephData.SEI_NEPHFILES),
    gcdat :  null,
    //pldat : (new Array(Swe.SwephData.SEI_NPLANETS)).fill(new PlanData),
    pldat : new Array(Swe.SwephData.SEI_NPLANETS),
    nddat : new Array(Swe.SwephData.SEI_NNODE_ETC),
    savedat : new Array(Swe.SE_NPLANETS+1),
    oec : new Epsilon,
    oec2000 : new Epsilon,
    nut : new Nut,
    nut2000 : new Nut,
    nutv : new Nut,
    topd : new TopoData,
    sidd : new SidData,
    astelem : "",
    ast_G : 0.0,
    ast_H : 0.0,
    ast_diam : 0.0,
    i_saved_planet_name : 0,
    saved_planet_name : "",
    dpsi : null,
    deps : null,
    astro_models : new Array(Swe.SwephData.SEI_NMODELS),
    timeout : 0,
};

for(var i=0; i<Swe.SwissData.fidat.length; i++){Swe.SwissData.fidat[i] = new FileData }
for(var i=0; i<Swe.SwissData.pldat.length; i++){Swe.SwissData.pldat[i] = new PlanData }
for(var i=0; i<Swe.SwissData.nddat.length; i++){Swe.SwissData.nddat[i] = new PlanData }
for(var i=0; i<Swe.SwissData.savedat.length; i++){Swe.SwissData.savedat[i] = new SavePositions }


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
class SweDate{
  constructor(year, month, day, hour, calType){
    this.sw =  Swe.SwissData;
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
    this.jdCO  = 2299160.5;
    this.calType = false;
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

  getJulDay(year, month, day, hour, calType) {
    if(year === undefined){
      return this.jd;
    }

    if(calType === undefined){
      return this.swe_julday(year, month, day, hour, this.SE_GREG_CAL);
    }

    return this.swe_julday(year, month, day, hour, calType);
  };

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

  getDeltaT(tjd) {
    if(tjd === undefined){
      if (this.deltatIsValid) { return this.deltaT; }

      this.deltaT = this.calc_deltaT(this.getJulDay());
      this.deltatIsValid = true;
      return this.deltaT;
    }

    return this.calc_deltaT(tjd);
  }

  getDate(jd) {
    //引数がoffsetである
    if(Math.floor(jd) === jd){
      var millis=((this.getJulDay()-this.JD0)*24*3600*1000)+offset;
      return new Date(millis);
    }

    var millis=(jd-this.JD0)*24*3600*1000;
    return new Date(millis);
  }

  setJulDay(newJD) {
    this.jd=newJD;
    this.deltatIsValid=false;
    var dt=this.swe_revjul(newJD,this.calType);
    this.year=dt.year;
    this.month=dt.month;
    this.day=dt.day;
    this.hour=dt.hour;
  }

  setCalendarType(newCalType, keepDate) {
    if (this.calType != this.newCalType) {
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

  updateCalendarType() {
    this.calType=(this.jdCO<=this.jd?this.SE_GREG_CAL:this.SE_JUL_CAL);;
  }


  setDate(newYear, newMonth, newDay, newHour, check) {
    this.year=newYear;
    this.month=newMonth;
    this.day=newDay;
    this.hour=newHour;
    this.deltatIsValid=false;
    this.jd=this.swe_julday(this.year, this.month, this.day,
                       this.hour, this.calType);
    if (check) {
      var oldMonth=newMonth;
      var oldDay=newDay;
      var oldHour=newHour;
      var dt=this.swe_revjul(this.jd,this.calType);
      this.year=dt.year;
      this.month=dt.month;
      this.day=dt.day;
      this.hour=dt.hour;

      return (this.year==newYear &&
          this.month==oldMonth &&
          this.day==oldDay &&
          Math.abs(this.hour-oldHour)<1E-6);
    }
    return true;
  }

  setYear(newYear, check) {

    this.year=newYear;
    this.deltatIsValid=false;
    this.jd=this.swe_julday(this.year, this.month, this.day,
                       this.hour, this.calType);  // -> erzeugt JD
    if (check) {
      var oldMonth=this.month;
      var oldDay=this.day;
      var dt=this.swe_revjul(this.jd,this.calType);  // -> erzeugt neues Datum
      this.year=dt.year;
      this.month=dt.month;
      this.day=dt.day;
      this.hour=dt.hour;

      return (this.year==newYear && this.month==oldMonth && this.day==oldDay);
    }
    return true;
  }

  setMonth(newMonth, check) {

    this.month=newMonth;
    this.deltatIsValid=false;
    this.jd=this.swe_julday(this.year, this.month, this.day,
                       this.hour, this.calType);  // -> erzeugt JD
    if (check) {
      var oldYear=this.year;
      var oldDay=this.day;
      var dt=this.swe_revjul(this.jd,this.calType);  // -> erzeugt neues Datum
      this.year=dt.year;
      this.month=dt.month;
      this.day=dt.day;
      this.hour=dt.hour;

      return (this.year==oldYear && this.month==newMonth && this.day==oldDay);
    }
    return true;
  }

  setDay(newDay, check) {

    this.day=newDay;
    this.deltatIsValid=false;
    this.jd=this.swe_julday(this.year, this.month, this.day,
                       this.hour, this.calType);  // -> erzeugt JD
    if (check) {
      var oldYear=this.year;
      var oldMonth=this.month;
      var dt=this.swe_revjul(this.jd,this.calType);  // -> erzeugt neues Datum
      this.year=dt.year;
      this.month=dt.month;
      this.day=dt.day;
      this.hour=dt.hour;

      return (this.year==oldYear && this.month==oldMonth && this.day==newDay);
    }
    return true;
  }

  setHour(newHour) {
    this.hour=newHour;
    this.jd=this.swe_julday(this.year, this.month, this.day,
                       this.hour, this.calType);
    return true;
  }

  checkDate() {
    var cd = checkDate(this.year, this.month, this.day, this.hour);
    return cd;
  }


  checkDate(year, month, day) {
    var cd = checkDate(year, month, day, 0.0);
    return cd;
  }

  checkDate(year, month, day, hour) {

    var jd=this.swe_julday(year,month,day,hour,this.SE_GREG_CAL);
    var dt=this.swe_revjul(jd,this.SE_GREG_CAL);

    return (dt.year==year && dt.month==month && dt.day==day);
  }

  makeValidDate() {
    var jd=this.swe_julday(this.year,this.month,this.day,this.hour,this.SE_GREG_CAL);
    var dt=this.swe_revjul(jd,this.SE_GREG_CAL);
    this.year=dt.year;
    this.month=dt.month;
    this.day=dt.day;
    this.hour=dt.hour;
  }

  getGregorianChange() {
    return this.jdCO;
  }

  setGregorianChange(year, month, day) {
    //引数が1つの場合
    if(month === undefined){
      var newJDCO = year;

      this.jdCO = newJDCO;
      this.calType = (this.jd>=this.jdCO?this.SE_GREG_CAL:this.SE_JUL_CAL);
      var dt = this.swe_revjul(this.jd,this.calType);
      this.year = dt.year;
      this.month = dt.month;
      this.day = dt.day;
      this.hour = dt.hour;
      return;
    }

    this.year = year;
    this.month = month;
    this.day = day;
    deltatIsValid = false;
    this.calType = this.SE_GREG_CAL;
    if (this.year < year ||
        (this.year == year && this.month < month) ||
        (this.year == year && this.month == month && this.day < day)) {
      this.calType = this.SE_JUL_CAL;
    }
    this.jdCO = this.swe_julday(year, month, day, 0., this.SE_GREG_CAL);
    this.jd = this.swe_julday(this.year, this.month, this.day, this.hour,
                         this.calType);
  }

  getGlobalTidalAcc() {
    return this.tid_acc;
  }

  swe_set_tid_acc(t_acc) {
    this.setGlobalTidalAcc(t_acc);
  }

  swi_set_tid_acc(tjd_ut, iflag, denum) {
    this.setGlobalTidalAcc(tjd_ut, iflag, denum);
  }

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

  setSwissEphObject(swiss) {
    this.sw = swiss;
  }

  toString() {
    var hour = getHour();
    var h = (hour<10?" ":"") + Math.floor(hour) + ":";
    hour = 60 * (hour - Math.floor(hour));
    h += (hour<10?"0":"") + Math.floor(hour) + ":";
    hour = 60 * (hour - Math.floor(hour));
    h += (hour<10?"0":"") + hour ;

    return "(YYYY/MM/DD) " +
           getYear() + "/" +
           (getMonth()<10?"0":"") + getMonth() + "/" +
           (getDay()<10?"0":"") + getDay() + ", " +
           h + "h " +
           (getCalendarType()?"(greg)":"(jul)") + "\n" +
           "Jul. Day: " + getJulDay() + "; " +
           "DeltaT: " + getDeltaT();
  }

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

  calc_deltaT(tjd) {

    var ans = 0;
    var B, Y, Ygreg, dd;
    var iy;
    var deltat_model = this.sw.astro_models[Swe.SE_MODEL_DELTAT];
    if (deltat_model == 0) deltat_model = Swe.SEMOD_DELTAT_DEFAULT;
    /* read additional values from swedelta.txt */
    /*AS_BOOL use_espenak_meeus = DELTAT_ESPENAK_MEEUS_2006;*/
    Y = 2000.0 + (tjd - Swe.SwephData.J2000)/365.25;
    Ygreg = 2000.0 + (tjd - Swe.SwephData.J2000)/365.2425;
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
    Y = 2000.0 + (tjd - Swe.SwephData.J2000)/365.2425;
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
    var Ygreg =  2000.0 + (tjd - Swe.SwephData.J2000)/365.2425;
    var u = (Ygreg  - 1820) / 100.0;
    return (-20 + 32 * u * u);
  }

  deltat_stephenson_morrison_1600(tjd) {
    var ans = 0, ans2, ans3;
    var p, B, dd;
    var tjd0;
    var iy;
    var Y = 2000.0 + (tjd - Swe.SwephData.J2000)/365.2425;
    if( Y < this.TAB2_START ) {
      /*B = (Y - LTERM_EQUATION_YSTART) * 0.01;
      ans = -20 + LTERM_EQUATION_COEFF * B * B;*/
      ans = this.deltat_longterm_morrison_stephenson(tjd);
      ans = this.adjust_for_tidacc(ans, Y);
      /* transition from formula to table over 100 years */
      if (Y >= this.TAB2_START - 100) {
        /* starting value of table dt2: */
        ans2 = this.adjust_for_tidacc(dt2[0], this.TAB2_START);
        tjd0 = (this.TAB2_START - 2000) * 365.2425 + Swe.SwephData.J2000;
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
    Ygreg = 2000.0 + (tjd - Swe.SwephData.J2000)/365.2425;
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

  adjust_for_tidacc(ans, Y) {
    var B;
    if( Y < 1955.0 ) {
      B = (Y - 1955.0);
      ans += -0.000091 * (this.tid_acc + 26.0) * B * B;
    }

    return ans;
  }

  initDateFromJD(jd, calType) {
    this.jd=jd;
    this.calType=calType;
    var dt=this.swe_revjul(jd, calType);
    this.year=dt.year;
    this.month=dt.month;
    this.day=dt.day;
    this.hour=dt.hour;

  }

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
    }

    this.year=year;
    this.month=month;
    this.day=day;
    this.hour=hour;
    this.calType=calType;
    this.jd=this.swe_julday(year, month, day, hour, calType);
  }


  getUTCFromLocalTime(iyear, imonth, iday, ihour, imin, dsec, d_timezone) {
    return this.getLocalTimeFromUTC(iyear, imonth, iday, ihour, imin, dsec, -d_timezone);
  };

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

  init_leapsec() {
    return NLEAP_SECONDS;
  }

  isValidUTCDate(iyear, imonth, iday, ihour, imin, dsec, gregflag) {
    return this.getInvalidUTCDateError(iyear, imonth, iday, ihour, imin, dsec, gregflag) == null;
  }

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
      dret[0] = dret[1] + getDeltaT(dret[1]);
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


  getUTCfromJDUT1(tjd_ut, gregflag) {
    var tjd_et = tjd_ut + this.getDeltaT(tjd_ut);
    return this.getUTCfromJDET(tjd_et, gregflag);
  }

};

/**
* This class offers many routines that might be interesting to a programmer.<p>
* One important note: in all this package, negative longitudes are considered
* to be <b>west</b> of Greenwich, positive longitudes are seen as <b>east</b>
* of Greenwich. Especially America often uses a different notation!<p> 
* Probably most interesting are the functions swe_sidtime() (calculate the
* sidereal time) and swe_degnorm() (normalize a position to the range of
* 0.0&nbsp;&lt;=&nbsp;x&nbsp;&lt;&nbsp;360.0) and others.
*/
class SwissLib{
  constructor(swed){
    this.sd = new SweDate;

    this.PREC_IAU_1976_CTIES = 2.0;        /* J2000 +/- two centuries */
    this.PREC_IAU_2000_CTIES = 2.0;        /* J2000 +/- two centuries */
    this.PREC_IAU_2006_CTIES = 75.0;       /* J2000 +/- 75 centuries */

    this.DPSI_DEPS_IAU1980_FILE_EOPC04  = "eop_1962_today.txt";
    this.DPSI_DEPS_IAU1980_FILE_FINALS  = "eop_finals.txt";
    this.DPSI_DEPS_IAU1980_TJD0_HORIZONS = 2437684.5;
    this.HORIZONS_TJD0_DPSI_DEPS_IAU1980 = 2437684.5;

    this.swed=swed;
    if (this.swed ===null || this.swed === undefined) { this.swed= Swe.SwissData; }


    this.AS2R = (Swe.SwissData.DEGTORAD / 3600.0);
    this.D2PI = Swe.SwephData.TWOPI;
    this.EPS0 = (84381.406 * this.AS2R);
    this.NPOL_PEPS = 4;
    this.NPER_PEPS = 10;
    this.NPOL_PECL = 4;
    this.NPER_PECL = 8;
    this.NPOL_PEQU = 4;
    this.NPER_PEQU = 14;

    /* for pre_peps(): */
    /* polynomials */
    this.pepol = [
      [+8134.017132, +84028.206305],
      [+5043.0520035, +0.3624445],
      [-0.00710733, -0.00004039],
      [+0.000000271, -0.000000110]
    ];

    /* periodics */
    this.peper = [
      [+409.90, +396.15, +537.22, +402.90, +417.15, +288.92, +4043.00, +306.00, +277.00, +203.00],
      [-6908.287473, -3198.706291, +1453.674527, -857.748557, +1173.231614, -156.981465, +371.836550, -216.619040, +193.691479, +11.891524],
      [+753.872780, -247.805823, +379.471484, -53.880558, -90.109153, -353.600190, -63.115353, -28.248187, +17.703387, +38.911307],
      [-2845.175469, +449.844989, -1255.915323, +886.736783, +418.887514, +997.912441, -240.979710, +76.541307, -36.788069, -170.964086],
      [-1704.720302, -862.308358, +447.832178, -889.571909, +190.402846, -56.564991, -296.222622, -75.859952, +67.473503, +3.014055]
    ];

    /* for pre_pecl(): */
    /* polynomials */
    this.pqpol = [
      [+5851.607687, -1600.886300],
      [-0.1189000, +1.1689818],
      [-0.00028913, -0.00000020],
      [+0.000000101, -0.000000437]
    ];

    /* periodics */
    this.pqper = [
      [708.15, 2309, 1620, 492.2, 1183, 622, 882, 547],
      [-5486.751211, -17.127623, -617.517403, 413.44294, 78.614193, -180.732815, -87.676083, 46.140315],
      [-684.66156, 2446.28388, 399.671049, -356.652376, -186.387003, -316.80007, 198.296701, 101.135679], /* typo in publication fixed */
      [667.66673, -2354.886252, -428.152441, 376.202861, 184.778874, 335.321713, -185.138669, -120.97283],
      [-5523.863691, -549.74745, -310.998056, 421.535876, -36.776172, -145.278396, -34.74445, 22.885731]
    ];

    /* for pre_pequ(): */
    /* polynomials */
    this.xypol = [
      [+5453.282155, -73750.930350],
      [+0.4252841, -0.7675452],
      [-0.00037173, -0.00018725],
      [-0.000000152, +0.000000231]
    ];

    /* periodics */
    this.xyper = [
      [256.75, 708.15, 274.2, 241.45, 2309, 492.2, 396.1, 288.9, 231.1, 1610, 620, 157.87, 220.3, 1200],
      [-819.940624, -8444.676815, 2600.009459, 2755.17563, -167.659835, 871.855056, 44.769698, -512.313065, -819.415595, -538.071099, -189.793622, -402.922932, 179.516345, -9.814756],
      [75004.344875, 624.033993, 1251.136893, -1102.212834, -2660.66498, 699.291817, 153.16722, -950.865637, 499.754645, -145.18821, 558.116553, -23.923029, -165.405086, 9.344131],
      [81491.287984, 787.163481, 1251.296102, -1257.950837, -2966.79973, 639.744522, 131.600209, -445.040117, 584.522874, -89.756563, 524.42963, -13.549067, -210.157124, -44.919798],
      [1558.515853, 7774.939698, -2219.534038, -2523.969396, 247.850422, -846.485643, -1393.124055, 368.526116, 749.045012, 444.704518, 235.934465, 374.049623, -171.33018, -22.899655]
    ];


    this.OFFSET_EPS_JPLHORIZONS = (35.95);
    this.DCOR_EPS_JPL_TJD0 = 2437846.5;
    this.NDCOR_EPS_JPL = 51;
    this.dcor_eps_jpl = [
      36.726, 36.627, 36.595, 36.578, 36.640, 36.659, 36.731, 36.765,
      36.662, 36.555, 36.335, 36.321, 36.354, 36.227, 36.289, 36.348, 36.257, 36.163,
      35.979, 35.896, 35.842, 35.825, 35.912, 35.950, 36.093, 36.191, 36.009, 35.943,
      35.875, 35.771, 35.788, 35.753, 35.822, 35.866, 35.771, 35.732, 35.543, 35.498,
      35.449, 35.409, 35.497, 35.556, 35.672, 35.760, 35.596, 35.565, 35.510, 35.394,
      35.385, 35.375, 35.415,
    ];


    this.ENDMARK=-99;
    this.nt = [
    /* LS and OC are units of 0.0001"
     *LS2 and OC2 are units of 0.00001"
     *MM,MS,FF,DD,OM, LS, LS2,OC, OC2 */
     0, 0, 0, 0, 2,  2062,  2, -895,  5,
    -2, 0, 2, 0, 1,    46,  0,  -24,  0,
     2, 0,-2, 0, 0,    11,  0,    0,  0,
    -2, 0, 2, 0, 2,    -3,  0,    1,  0,
     1,-1, 0,-1, 0,    -3,  0,    0,  0,
     0,-2, 2,-2, 1,    -2,  0,    1,  0,
     2, 0,-2, 0, 1,     1,  0,    0,  0,
     0, 0, 2,-2, 2,-13187,-16, 5736,-31,
     0, 1, 0, 0, 0,  1426,-34,   54, -1,
     0, 1, 2,-2, 2,  -517, 12,  224, -6,
     0,-1, 2,-2, 2,   217, -5,  -95,  3,
     0, 0, 2,-2, 1,   129,  1,  -70,  0,
     2, 0, 0,-2, 0,    48,  0,    1,  0,
     0, 0, 2,-2, 0,   -22,  0,    0,  0,
     0, 2, 0, 0, 0,    17, -1,    0,  0,
     0, 1, 0, 0, 1,   -15,  0,    9,  0,
     0, 2, 2,-2, 2,   -16,  1,    7,  0,
     0,-1, 0, 0, 1,   -12,  0,    6,  0,
    -2, 0, 0, 2, 1,    -6,  0,    3,  0,
     0,-1, 2,-2, 1,    -5,  0,    3,  0,
     2, 0, 0,-2, 1,     4,  0,   -2,  0,
     0, 1, 2,-2, 1,     4,  0,   -2,  0,
     1, 0, 0,-1, 0,    -4,  0,    0,  0,
     2, 1, 0,-2, 0,     1,  0,    0,  0,
     0, 0,-2, 2, 1,     1,  0,    0,  0,
     0, 1,-2, 2, 0,    -1,  0,    0,  0,
     0, 1, 0, 0, 2,     1,  0,    0,  0,
    -1, 0, 0, 1, 1,     1,  0,    0,  0,
     0, 1, 2,-2, 0,    -1,  0,    0,  0,
     0, 0, 2, 0, 2, -2274, -2,  977, -5,
     1, 0, 0, 0, 0,   712,  1,   -7,  0,
     0, 0, 2, 0, 1,  -386, -4,  200,  0,
     1, 0, 2, 0, 2,  -301,  0,  129, -1,
     1, 0, 0,-2, 0,  -158,  0,   -1,  0,
    -1, 0, 2, 0, 2,   123,  0,  -53,  0,
     0, 0, 0, 2, 0,    63,  0,   -2,  0,
     1, 0, 0, 0, 1,    63,  1,  -33,  0,
    -1, 0, 0, 0, 1,   -58, -1,   32,  0,
    -1, 0, 2, 2, 2,   -59,  0,   26,  0,
     1, 0, 2, 0, 1,   -51,  0,   27,  0,
     0, 0, 2, 2, 2,   -38,  0,   16,  0,
     2, 0, 0, 0, 0,    29,  0,   -1,  0,
     1, 0, 2,-2, 2,    29,  0,  -12,  0,
     2, 0, 2, 0, 2,   -31,  0,   13,  0,
     0, 0, 2, 0, 0,    26,  0,   -1,  0,
    -1, 0, 2, 0, 1,    21,  0,  -10,  0,
    -1, 0, 0, 2, 1,    16,  0,   -8,  0,
     1, 0, 0,-2, 1,   -13,  0,    7,  0,
    -1, 0, 2, 2, 1,   -10,  0,    5,  0,
     1, 1, 0,-2, 0,    -7,  0,    0,  0,
     0, 1, 2, 0, 2,     7,  0,   -3,  0,
     0,-1, 2, 0, 2,    -7,  0,    3,  0,
     1, 0, 2, 2, 2,    -8,  0,    3,  0,
     1, 0, 0, 2, 0,     6,  0,    0,  0,
     2, 0, 2,-2, 2,     6,  0,   -3,  0,
     0, 0, 0, 2, 1,    -6,  0,    3,  0,
     0, 0, 2, 2, 1,    -7,  0,    3,  0,
     1, 0, 2,-2, 1,     6,  0,   -3,  0,
     0, 0, 0,-2, 1,    -5,  0,    3,  0,
     1,-1, 0, 0, 0,     5,  0,    0,  0,
     2, 0, 2, 0, 1,    -5,  0,    3,  0, 
     0, 1, 0,-2, 0,    -4,  0,    0,  0,
     1, 0,-2, 0, 0,     4,  0,    0,  0,
     0, 0, 0, 1, 0,    -4,  0,    0,  0,
     1, 1, 0, 0, 0,    -3,  0,    0,  0,
     1, 0, 2, 0, 0,     3,  0,    0,  0,
     1,-1, 2, 0, 2,    -3,  0,    1,  0,
    -1,-1, 2, 2, 2,    -3,  0,    1,  0,
    -2, 0, 0, 0, 1,    -2,  0,    1,  0,
     3, 0, 2, 0, 2,    -3,  0,    1,  0,
     0,-1, 2, 2, 2,    -3,  0,    1,  0,
     1, 1, 2, 0, 2,     2,  0,   -1,  0,
    -1, 0, 2,-2, 1,    -2,  0,    1,  0,
     2, 0, 0, 0, 1,     2,  0,   -1,  0,
     1, 0, 0, 0, 2,    -2,  0,    1,  0,
     3, 0, 0, 0, 0,     2,  0,    0,  0,
     0, 0, 2, 1, 2,     2,  0,   -1,  0,
    -1, 0, 0, 0, 2,     1,  0,   -1,  0,

     1, 0, 0,-4, 0,    -1,  0,    0,  0,
    -2, 0, 2, 2, 2,     1,  0,   -1,  0,
    -1, 0, 2, 4, 2,    -2,  0,    1,  0,
     2, 0, 0,-4, 0,    -1,  0,    0,  0,
     1, 1, 2,-2, 2,     1,  0,   -1,  0,
     1, 0, 2, 2, 1,    -1,  0,    1,  0,
    -2, 0, 2, 4, 2,    -1,  0,    1,  0,
    -1, 0, 4, 0, 2,     1,  0,    0,  0,
     1,-1, 0,-2, 0,     1,  0,    0,  0,
     2, 0, 2,-2, 1,     1,  0,   -1,  0,
     2, 0, 2, 2, 2,    -1,  0,    0,  0,
     1, 0, 0, 2, 1,    -1,  0,    0,  0,
     0, 0, 4,-2, 2,     1,  0,    0,  0,
     3, 0, 2,-2, 2,     1,  0,    0,  0,
     1, 0, 2,-2, 0,    -1,  0,    0,  0,
     0, 1, 2, 0, 1,     1,  0,    0,  0,
    -1,-1, 0, 2, 1,     1,  0,    0,  0,
     0, 0,-2, 0, 1,    -1,  0,    0,  0,
     0, 0, 2,-1, 2,    -1,  0,    0,  0,
     0, 1, 0, 2, 0,    -1,  0,    0,  0,
     1, 0,-2,-2, 0,    -1,  0,    0,  0,
     0,-1, 2, 0, 1,    -1,  0,    0,  0,
     1, 1, 0,-2, 1,    -1,  0,    0,  0,
     1, 0,-2, 2, 0,    -1,  0,    0,  0,
     2, 0, 0, 2, 0,     1,  0,    0,  0,
     0, 0, 2, 4, 2,    -1,  0,    0,  0,
     0, 1, 0, 1, 0,     1,  0,    0,  0,
  /*#if NUT_CORR_1987  switch is handled in function swi_nutation_iau1980() */
    /* corrections to IAU 1980 nutation series by Herring 1987
     *             in 0.00001" !!!
     *              LS      OC      */
     101, 0, 0, 0, 1,-725, 0, 213, 0,
     101, 1, 0, 0, 0, 523, 0, 208, 0,
     101, 0, 2,-2, 2, 102, 0, -41, 0,
     101, 0, 2, 0, 2, -81, 0,  32, 0,
    /*              LC      OS !!!  */
     102, 0, 0, 0, 1, 417, 0, 224, 0,
     102, 1, 0, 0, 0,  61, 0, -24, 0,
     102, 0, 2,-2, 2,-118, 0, -47, 0,
  /*#endif*/
     this.ENDMARK,
    ];

    this.pAcof_williams = [
     -8.66e-10, -4.759e-8, 2.424e-7, 1.3095e-5, 1.7451e-4, -1.8055e-3,
     -0.235316, 0.076, 110.5407, 50287.70000 ];
    this.nodecof_williams = [
      6.6402e-16, -2.69151e-15, -1.547021e-12, 7.521313e-12, 1.9e-10, 
      -3.54e-9, -1.8103e-7,  1.26e-7,  7.436169e-5,
      -0.04207794833,  3.052115282424];
    this.inclcof_williams = [
      1.2147e-16, 7.3759e-17, -8.26287e-14, 2.503410e-13, 2.4650839e-11, 
      -5.4000441e-11, 1.32115526e-9, -6.012e-7, -1.62442e-5,
      0.00227850649, 0.0 ];

    /* SEMOD_PREC_SIMON_1994 */
    /* Precession coefficients from Simon et al: */
    this.pAcof_simon = [
      -8.66e-10, -4.759e-8, 2.424e-7, 1.3095e-5, 1.7451e-4, -1.8055e-3,
      -0.235316, 0.07732, 111.2022, 50288.200 ];
    this.nodecof_simon = [
      6.6402e-16, -2.69151e-15, -1.547021e-12, 7.521313e-12, 1.9e-10, 
      -3.54e-9, -1.8103e-7, 2.579e-8, 7.4379679e-5,
      -0.0420782900, 3.0521126906];
    this.inclcof_simon = [
      1.2147e-16, 7.3759e-17, -8.26287e-14, 2.503410e-13, 2.4650839e-11, 
      -5.4000441e-11, 1.32115526e-9, -5.99908e-7, -1.624383e-5,
      0.002278492868, 0.0 ];

    /* SEMOD_PREC_LASKAR_1986 */
    /* Precession coefficients taken from Laskar's paper: */
    this.pAcof_laskar = [
      -8.66e-10, -4.759e-8, 2.424e-7, 1.3095e-5, 1.7451e-4, -1.8055e-3,
      -0.235316, 0.07732, 111.1971, 50290.966 ];
    /* Node and inclination of the earth's orbit computed from
     * Laskar's data as done in Bretagnon and Francou's paper.
     * Units are radians.
     */
    this.nodecof_laskar = [
      6.6402e-16, -2.69151e-15, -1.547021e-12, 7.521313e-12, 6.3190131e-10, 
      -3.48388152e-9, -1.813065896e-7, 2.75036225e-8, 7.4394531426e-5,
      -0.042078604317, 3.052112654975 ];
    this.inclcof_laskar = [
      1.2147e-16, 7.3759e-17, -8.26287e-14, 2.503410e-13, 2.4650839e-11, 
      -5.4000441e-11, 1.32115526e-9, -5.998737027e-7, -1.6242797091e-5,
      0.002278495537, 0.0 ];

    this.OFFSET_JPLHORIZONS = -52.3;
    this.DCOR_RA_JPL_TJD0 = 2437846.5;
    this.NDCOR_RA_JPL = 51;
    this.dcor_ra_jpl = [
    -51.257, -51.103, -51.065, -51.503, -51.224, -50.796, -51.161, -51.181,
    -50.932, -51.064, -51.182, -51.386, -51.416, -51.428, -51.586, -51.766, -52.038, -52.370,
    -52.553, -52.397, -52.340, -52.676, -52.348, -51.964, -52.444, -52.364, -51.988, -52.212,
    -52.370, -52.523, -52.541, -52.496, -52.590, -52.629, -52.788, -53.014, -53.053, -52.902,
    -52.850, -53.087, -52.635, -52.185, -52.588, -52.292, -51.796, -51.961, -52.055, -52.134,
    -52.165, -52.141, -52.255,
    ];

    this.SIDTNTERM = 33;
    this.stcf = [
      2640.96,-0.39,
      63.52,-0.02,
      11.75,0.01,
      11.21,0.01,
      -4.55,0.00,
      2.02,0.00,
      1.98,0.00,
      -1.72,0.00,
      -1.41,-0.01,
      -1.26,-0.01,
      -0.63,0.00,
      -0.63,0.00,
      0.46,0.00,
      0.45,0.00,
      0.36,0.00,
      -0.24,-0.12,
      0.32,0.00,
      0.28,0.00,
      0.27,0.00,
      0.26,0.00,
      -0.21,0.00,
      0.19,0.00,
      0.18,0.00,
      -0.10,0.05,
      0.15,0.00,
      -0.14,0.00,
      0.14,0.00,
      -0.14,0.00,
      0.14,0.00,
      0.13,0.00,
      -0.11,0.00,
      0.11,0.00,
      0.11,0.00,
    ];
    this.SIDTNARG = 14;
    this.stfarg = [
       0,   0,   0,   0,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   0,   0,   2,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   2,  -2,   3,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   2,  -2,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   2,  -2,   2,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   2,   0,   3,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   2,   0,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   0,   0,   3,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   1,   0,   0,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   1,   0,   0,  -1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       1,   0,   0,   0,  -1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       1,   0,   0,   0,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   1,   2,  -2,   3,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   1,   2,  -2,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   4,  -4,   4,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   1,  -1,   1,   0,  -8,  12,   0,   0,   0,   0,   0,   0,
       0,   0,   2,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   2,   0,   2,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       1,   0,   2,   0,   3,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       1,   0,   2,   0,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   2,  -2,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   1,  -2,   2,  -3,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   1,  -2,   2,  -1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   0,   0,   0,   0,   8, -13,   0,   0,   0,   0,   0,  -1,
       0,   0,   0,   2,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       2,   0,  -2,   0,  -1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       1,   0,   0,  -2,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   1,   2,  -2,   2,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       1,   0,   0,  -2,  -1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   4,  -2,   4,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       0,   0,   2,  -2,   4,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       1,   0,  -2,   0,  -3,   0,   0,   0,   0,   0,   0,   0,   0,   0,
       1,   0,  -2,   0,  -1,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    ];


    /*#define SIDT_IERS_CONV_2010 TRUE*/
    /* sidtime_long_term() is not used between the following two dates */
    this.SIDT_LTERM_T0 = 2396758.5;  /* 1 Jan 1850  */
    this.SIDT_LTERM_T1 = 2469807.5;  /* 1 Jan 2050  */
    //static final double SIDT_LTERM_OFS0 =  (0.09081674334 / 3600);
    //static final double SIDT_LTERM_OFS1 =  (0.337962821868 / 3600);
    this.SIDT_LTERM_OFS0 = ( 0.032828635 / 15.0);
    this.SIDT_LTERM_OFS1 = (-0.065393299 / 15.0);
    this.PREC_IAU_CTIES = 2.0; // J2000 +/- two centuries
  }


  square_sum(x, offset) {
    if(offset === undefined){
      return x[0]*x[0]+x[1]*x[1]+x[2]*x[2];
    }
    return x[offset]*x[offset]+x[1+offset]*x[1+offset]+x[2+offset]*x[2+offset];
  }

  swe_degnorm(x) {
    var y;
    y = x%360.0;
    if (Math.abs(y) < 1e-13) {
      y = 0;   /* Alois fix 11-dec-1999 */
    }
    if( y < 0.0 ) {
      y += 360.0;
    }
    return(y);
  }

  swe_radnorm(x) {
    var y;
    y = x % Swe.SwephData.TWOPI;
    if (Math.abs(y) < 1e-13) {
      y = 0;   /* Alois fix 11-dec-1999 */
    }
    if( y < 0.0 ) {
      y += Swe.SwephData.TWOPI;
    }
    return(y);
  }

  swe_deg_midp(x1, x0) {
    var d, y;
    d = this.swe_difdeg2n(x1, x0); /* arc from x0 to x1 */
    y = this.swe_degnorm(x0 + d / 2);
    return(y);
  }

  swe_rad_midp(x1, x0) {
    return Swe.SwissData.DEGTORAD * this.swe_deg_midp(x1 * Swe.SwissData.RADTODEG, x0 * Swe.SwissData.RADTODEG);
  }

  swi_mod2PI(x) {
    var y = x%Swe.SwephData.TWOPI;
    if( y < 0.0 ) {
      y += Swe.SwephData.TWOPI;
    }
    return(y);
  }


  swi_cross_prod(a, aOffs, b, bOffs, x, xOffs) {
    x[0+xOffs] = a[1+aOffs]*b[2+bOffs] - a[2+aOffs]*b[1+bOffs];
    x[1+xOffs] = a[2+aOffs]*b[0+bOffs] - a[0+aOffs]*b[2+bOffs];
    x[2+xOffs] = a[0+aOffs]*b[1+bOffs] - a[1+aOffs]*b[0+bOffs];
  }


  swi_echeb(x, coef, offs, ncf) {
    var j;
    var x2, br, brp2, brpp;

    x2 = x * 2.;
    br = 0.;
    brp2 = 0.;    /* dummy assign to silence gcc warning */
    brpp = 0.;
    for (j = ncf - 1; j >= 0; j--) {
      brp2 = brpp;
      brpp = br;
      br = x2 * brpp - brp2 + coef[j+offs];
    }
    return (br - brp2) * .5;
  }

  /*
   * evaluates derivative of chebyshev series, see echeb
   */
  swi_edcheb(x, coef, offs, ncf) {
    var bjpl, xjpl;
    var j;
    var x2, bf, bj, dj, xj, bjp2, xjp2;
    x2 = x * 2.;
    bf = 0.;      /* dummy assign to silence gcc warning */
    bj = 0.;      /* dummy assign to silence gcc warning */
    xjp2 = 0.;
    xjpl = 0.;
    bjp2 = 0.;
    bjpl = 0.;
    for (j = ncf - 1; j >= 1; j--) {
      dj = (j + j);
      xj = coef[j+offs] * dj + xjp2;
      bj = x2 * bjpl - bjp2 + xj;
      bf = bjp2;
      bjp2 = bjpl;
      bjpl = bj;
      xjp2 = xjpl;
      xjpl = xj;
    }
    return (bj - bf) * .5;
  }

  /*swe_cotrans(xpo, xpn, eps) {
    swe_cotrans(xpo, 0, xpn, 0, eps);
  }*/
  swe_cotrans(xpo, oOffs, xpn, nOffs, eps) {
    //引数3つの場合
    if(nOffs === undefined){
      return this.swe_cotrans(xpo, 0, oOffs, 0, xpn);
    }

    var i;
    var x=[0,0,0,0,0,0], e = eps * Swe.SwissData.DEGTORAD;
    for(i = 0; i <= 1; i++)
      x[i] = xpo[i+oOffs];
    x[0] *= Swe.SwissData.DEGTORAD;
    x[1] *= Swe.SwissData.DEGTORAD;
    x[2] = 1;
    for(i = 3; i <= 5; i++)
      x[i] = 0;
    this.swi_polcart(x, x);
    this.swi_coortrf(x, x, e);
    this.swi_cartpol(x, x);
    xpn[0+nOffs] = x[0] * Swe.SwissData.RADTODEG;
    xpn[1+nOffs] = x[1] * Swe.SwissData.RADTODEG;
    xpn[2+nOffs] = xpo[2+oOffs];
    return;
  }

  /*swi_coortrf(xpo, xpn, eps) {
    swi_coortrf(xpo, 0, xpn, 0, eps);
  }*/
  swi_coortrf(xpo, oOffs, xpn, nOffs, eps) {
    //引数3つの場合
    if(nOffs === undefined){
      return this.swi_coortrf(xpo, 0, oOffs, 0, xpn);
    }

    var sineps, coseps;
    var x=[0,0,0];
    sineps = Math.sin(eps);
    coseps = Math.cos(eps);
    x[0] = xpo[oOffs];
    x[1] = xpo[1+oOffs] * coseps + xpo[2+oOffs] * sineps;
    x[2] = -xpo[1+oOffs] * sineps + xpo[2+oOffs] * coseps;
    xpn[0+nOffs] = x[0];
    xpn[1+nOffs] = x[1];
    xpn[2+nOffs] = x[2];
    return;
  }

  /*swi_coortrf2(xpo, xpn, sineps, coseps) {
    swi_coortrf2(xpo, 0, xpn, 0, sineps, coseps);
  }*/
  swi_coortrf2(xpo, oOffs, xpn, nOffs, sineps, coseps) {
    //引数4つの場合
    if(sineps === undefined){
      return this.swi_coortrf2(xpo, 0, oOffs, 0, xpn, nOffs);
    }

    

    var x=[0,0,0];
    x[0] = xpo[0+oOffs];
    x[1] = xpo[1+oOffs] * coseps + xpo[2+oOffs] * sineps;
    x[2] = -xpo[1+oOffs] * sineps + xpo[2+oOffs] * coseps;
    xpn[0+nOffs] = x[0];
    xpn[1+nOffs] = x[1];
    xpn[2+nOffs] = x[2];
    return;
  }

  /*swi_cartpol(x, l) {
    swi_cartpol(x, 0, l, 0);
  }*/
  swi_cartpol(x, xOffs, l, lOffs) {
    //引数2つの場合
    if(l === undefined){
      return this.swi_cartpol(x, 0, xOffs, 0);
    }
    var rxy;
    var ll=[0,0,0];
    if (x[0+xOffs] == 0 && x[1+xOffs] == 0 && x[2+xOffs] == 0) {
      l[0+lOffs] = l[1+lOffs] = l[2+lOffs] = 0;
      return;
    }
    rxy = x[0+xOffs]*x[0+xOffs] + x[1+xOffs]*x[1+xOffs];
    ll[2] = Math.sqrt(rxy + x[2+xOffs]*x[2+xOffs]);
    rxy = Math.sqrt(rxy);
    ll[0] = Math.atan2(x[1+xOffs], x[0+xOffs]);
    if (ll[0] < 0.0) {
      ll[0] += Swe.SwephData.TWOPI;
    }
    ll[1] = Math.atan(x[2+xOffs] / rxy);
    l[0+lOffs] = ll[0];
    l[1+lOffs] = ll[1];
    l[2+lOffs] = ll[2];
    return;
  }

  /*swi_polcart(l, x) {
    swi_polcart(l, 0, x, 0);
  }*/
  swi_polcart(l, lOffs, x, xOffs) {
    //引数2つの場合
    if(x === undefined){
      return this.swi_polcart(l, 0, lOffs, 0);
    }

    
    var xx=[0,0,0];
    var cosl1;
    cosl1 = Math.cos(l[lOffs+1]);
    xx[0] = l[lOffs+2] * cosl1 * Math.cos(l[lOffs]);
    xx[1] = l[lOffs+2] * cosl1 * Math.sin(l[lOffs]);
    xx[2] = l[lOffs+2] * Math.sin(l[lOffs+1]);
    x[xOffs] = xx[0];
    x[xOffs+1] = xx[1];
    x[xOffs+2] = xx[2];
    return;
  }

  swi_cartpol_sp(x, xOffs, l, lOffs) {
    //引数2つの場合
    if(l === undefined){
      return this.swi_cartpol_sp(x, 0, xOffs, 0);
    }

    
    var xx=[0,0,0,0,0,0];
    var ll=[0,0,0,0,0,0];
    var rxy, coslon, sinlon, coslat, sinlat;
    /* zero position */
    if (x[0+xOffs] == 0 && x[1+xOffs] == 0 && x[2+xOffs] == 0) {
      l[0+lOffs] = l[1+lOffs] = l[3+lOffs] = l[4+lOffs] = 0;
      l[5+lOffs] = Math.sqrt(square_sum(x, 3+xOffs));
      this.swi_cartpol(x, 3+xOffs, l, 0+lOffs);
      l[2+lOffs] = 0;
      return;
    }
    /* zero speed */
    if (x[3+xOffs] == 0 && x[4+xOffs] == 0 && x[5+xOffs] == 0) {
      l[3+lOffs] = l[4+lOffs] = l[5+lOffs] = 0;
      this.swi_cartpol(x, xOffs, l, lOffs);
      return;
    }
    /* position */
    rxy = x[0+xOffs]*x[0+xOffs] + x[1+xOffs]*x[1+xOffs];
    ll[2] = Math.sqrt(rxy + x[2+xOffs]*x[2+xOffs]);
    rxy = Math.sqrt(rxy);
    ll[0] = Math.atan2(x[1+xOffs], x[0+xOffs]);
    if (ll[0] < 0.0) {
      ll[0] += Swe.SwephData.TWOPI;
    }
    ll[1] = Math.atan(x[2+xOffs] / rxy);

    coslon = x[0+xOffs] / rxy;          /* cos(l[0]); */
    sinlon = x[1+xOffs] / rxy;          /* sin(l[0]); */
    coslat = rxy / ll[2];         /* cos(l[1]); */
    sinlat = x[2+xOffs] / ll[2];        /* sin(ll[1]); */
    xx[3] = x[3+xOffs] * coslon + x[4+xOffs] * sinlon;
    xx[4] = -x[3+xOffs] * sinlon + x[4+xOffs] * coslon;
    l[3+lOffs] = xx[4] / rxy;           /* speed in longitude */
    xx[4] = -sinlat * xx[3] + coslat * x[5+xOffs];
    xx[5] =  coslat * xx[3] + sinlat * x[5+xOffs];
    l[4+lOffs] = xx[4] / ll[2];         /* speed in latitude */
    l[5+lOffs] = xx[5];                 /* speed in radius */
    l[0+lOffs] = ll[0];                 /* return position */
    l[1+lOffs] = ll[1];
    l[2+lOffs] = ll[2];
    return;
  }

  /*swi_polcart_sp(l, x) {
    swi_polcart_sp(l, 0, x, 0);
  }*/
  swi_polcart_sp(l, lOffs, x, xOffs) {
    //引数2つの場合
    if(x === undefined){
      return this.swi_polcart_sp(l, 0, lOffs, 0);
    }

    
    var sinlon, coslon, sinlat, coslat;
    var xx=[0,0,0,0,0,0], rxy, rxyz;
    /* zero speed */
    if (l[3+lOffs] == 0 && l[4+lOffs] == 0 && l[5+lOffs] == 0) {
      x[3+xOffs] = x[4+xOffs] = x[5+xOffs] = 0;
      this.swi_polcart(l, lOffs, x, xOffs);
      return;
    }
    /* position */
    coslon = Math.cos(l[0+lOffs]);
    sinlon = Math.sin(l[0+lOffs]);
    coslat = Math.cos(l[1+lOffs]);
    sinlat = Math.sin(l[1+lOffs]);
    xx[0] = l[2+lOffs] * coslat * coslon;
    xx[1] = l[2+lOffs] * coslat * sinlon;
    xx[2] = l[2+lOffs] * sinlat;
    /* speed; explanation s. swi_cartpol_sp(), same method the other way round*/
    rxyz = l[2+lOffs];
    rxy = Math.sqrt(xx[0] * xx[0] + xx[1] * xx[1]);
    xx[5] = l[5+lOffs];
    xx[4] = l[4+lOffs] * rxyz;
    x[5+xOffs] = sinlat * xx[5] + coslat * xx[4];       /* speed z */
    xx[3] = coslat * xx[5] - sinlat * xx[4];
    xx[4] = l[3+lOffs] * rxy;
    x[3+xOffs] = coslon * xx[3] - sinlon * xx[4];       /* speed x */
    x[4+xOffs] = sinlon * xx[3] + coslon * xx[4];       /* speed y */
    x[0+xOffs] = xx[0];                                 /* return position */
    x[1+xOffs] = xx[1];
    x[2+xOffs] = xx[2];
    return;
  }


  swi_ldp_peps(tjd, dpre, deps) {
    
    var i;
    var npol = this.NPOL_PEPS;
    var nper = this.NPER_PEPS;
    var t, p, q, w, a, s, c;
    t = (tjd - Swe.SwephData.J2000) / 36525.0;
    p = 0;
    q = 0;
    /* periodic terms */
    for (i = 0; i < nper; i++) {
      w = this.D2PI * t;
      a = w / this.peper[0][i];
      s = Math.sin(a);
      c = Math.cos(a);
      p += c * this.peper[1][i] + s * this.peper[3][i];
      q += c * this.peper[2][i] + s * this.peper[4][i];
    }
    /* polynomial terms */
    w = 1;
    for (i = 0; i < npol; i++) {
      p += this.pepol[i][0] * w;
      q += this.pepol[i][1] * w;
      w *= t;
    }
    /* both to radians */
    p *= this.AS2R;
    q *= this.AS2R;
    /* return */
    if (dpre != null && dpre.length > 0){
      dpre[0] = p;
    }
    if (deps != null && deps.length > 0){
      deps[0] = q;
    }
    return;
  } 


  pre_pecl(tjd, vec) {
    
    var i;
    var npol = this.NPOL_PECL;
    var nper = this.NPER_PECL;
    var t, p, q, w, a, s, c, z;
    t = (tjd - Swe.SwephData.J2000) / 36525.0;
    p = 0;
    q = 0;
    /* periodic terms */
    for (i = 0; i < nper; i++) {
      w = this.D2PI * t;
      a = w / this.pqper[0][i];
      s = Math.sin(a);
      c = Math.cos(a);
      p += c * this.pqper[1][i] + s * this.pqper[3][i];
      q += c * this.pqper[2][i] + s * this.pqper[4][i];
    }
    /* polynomial terms */
    w = 1;
    for (i = 0; i < npol; i++) {
      p += this.pqpol[i][0] * w;
      q += this.pqpol[i][1] * w;
      w *= t;
    }
    /* both to radians */
    p *= this.AS2R;
    q *= this.AS2R;
    /* ecliptic pole vector */
    z = 1 - p * p - q * q;
    if (z < 0){
      z = 0;
    }
    else{
      z = Math.sqrt(z);
    }
    s = Math.sin(this.EPS0);
    c = Math.cos(this.EPS0);
    vec[0] = p;
    vec[1] = - q * c - z * s;
    vec[2] = - q * s + z * c;
    return;
  }

  /* precession of the equator */
  pre_pequ(tjd, veq) {
    
    var i;
    var npol = this.NPOL_PEQU;
    var nper = this.NPER_PEQU;
    var t, x, y, w, a, s, c;
    t = (tjd - Swe.SwephData.J2000) / 36525.0;
    x = 0;
    y = 0;
    for (i = 0; i < nper; i++) {
      w = this.D2PI * t;
      a = w / this.xyper[0][i];
      s = Math.sin(a);
      c = Math.cos(a);
      x += c * this.xyper[1][i] + s * this.xyper[3][i];
      y += c * this.xyper[2][i] + s * this.xyper[4][i];
    }
    /* polynomial terms */
    w = 1;
    for (i = 0; i < npol; i++) {
      x += this.xypol[i][0] * w;
      y += this.xypol[i][1] * w;
      w *= t;
    }
    x *= this.AS2R;
    y *= this.AS2R;
    /* equator pole vector */
    veq[0] = x;
    veq[1] = y;
    w = x * x + y * y;
    if (w < 1){
      veq[2] = Math.sqrt(1 - w);
    }
    else{
      veq[2] = 0;
    }
    return;
  }


  /* precession matrix */
  pre_pmat(tjd, rp) {
    
    var peqr = [0,0,0], pecl = [0,0,0], v = [0,0,0], w, eqx = [0,0,0];
    /*equator pole */
    this.pre_pequ(tjd, peqr);
    /* ecliptic pole */
    this.pre_pecl(tjd, pecl);
    /* equinox */
    this.swi_cross_prod(peqr, 0, pecl, 0, v, 0);
    w = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    eqx[0] = v[0] / w;
    eqx[1] = v[1] / w;
    eqx[2] = v[2] / w;
    this.swi_cross_prod(peqr, 0, eqx, 0, v, 0);
    rp[0] = eqx[0];
    rp[1] = eqx[1];
    rp[2] = eqx[2];
    rp[3] = v[0];
    rp[4] = v[1];
    rp[5] = v[2];
    rp[6] = peqr[0];
    rp[7] = peqr[1];
    rp[8] = peqr[2];
    return;
  }

  swi_epsiln(J, iflag) {
    
    var T, eps;
    var tofs, dofs, t0, t1;
    var prec_model = this.swed.astro_models[Swe.SE_MODEL_PREC_LONGTERM];
    var prec_model_short = this.swed.astro_models[Swe.SE_MODEL_PREC_SHORTTERM];
    var jplhor_model = this.swed.astro_models[Swe.SE_MODEL_JPLHOR_MODE];
    var jplhora_model = this.swed.astro_models[Swe.SE_MODEL_JPLHORA_MODE];
    if (prec_model == 0) prec_model = Swe.SEMOD_PREC_DEFAULT;
    if (prec_model_short == 0) prec_model_short = Swe.SEMOD_PREC_DEFAULT_SHORT;
    if (jplhor_model == 0) jplhor_model = Swe.SEMOD_JPLHOR_DEFAULT;
    if (jplhora_model == 0) jplhora_model = Swe.SEMOD_JPLHORA_DEFAULT;
    T = (J - 2451545.0)/36525.0;
    if ((iflag & Swe.SEFLG_JPLHOR) != 0 /*&& INCLUDE_CODE_FOR_DPSI_DEPS_IAU1980*/) {
      eps = (((1.813e-3*T-5.9e-4)*T-46.8150)*T+84381.448)*Swe.SwissData.DEGTORAD/3600;
    /*} else if ((iflag & SEFLG_JPLHOR_APPROX) && !APPROXIMATE_HORIZONS_ASTRODIENST) {*/
    } else if ((iflag & Swe.SEFLG_JPLHOR_APPROX) != 0 && jplhora_model != Swe.SEMOD_JPLHORA_1) {
      eps = (((1.813e-3*T-5.9e-4)*T-46.8150)*T+84381.448)*Swe.SwissData.DEGTORAD/3600;
    } else if (prec_model_short == Swe.SEMOD_PREC_IAU_1976 && Math.abs(T) <= this.PREC_IAU_1976_CTIES ) {
      eps = (((1.813e-3*T-5.9e-4)*T-46.8150)*T+84381.448)*Swe.SwissData.DEGTORAD/3600;
    } else if (prec_model == Swe.SEMOD_PREC_IAU_1976) {
      eps = (((1.813e-3*T-5.9e-4)*T-46.8150)*T+84381.448)*Swe.SwissData.DEGTORAD/3600;
    } else if (prec_model_short == Swe.SEMOD_PREC_IAU_2000 && Math.abs(T) <= this.PREC_IAU_2000_CTIES ) {
      eps = (((1.813e-3*T-5.9e-4)*T-46.84024)*T+84381.406)*Swe.SwissData.DEGTORAD/3600;
    } else if (prec_model == Swe.SEMOD_PREC_IAU_2000) {
      eps = (((1.813e-3*T-5.9e-4)*T-46.84024)*T+84381.406)*Swe.SwissData.DEGTORAD/3600;
    } else if (prec_model_short == Swe.SEMOD_PREC_IAU_2006 && Math.abs(T) <= this.PREC_IAU_2006_CTIES) {
      eps =  (((((-4.34e-8 * T -5.76e-7) * T +2.0034e-3) * T -1.831e-4) * T -46.836769) * T + 84381.406) * Swe.SwissData.DEGTORAD / 3600.0; 
    } else if (prec_model == Swe.SEMOD_PREC_IAU_2006) {
      eps =  (((((-4.34e-8 * T -5.76e-7) * T +2.0034e-3) * T -1.831e-4) * T -46.836769) * T + 84381.406) * Swe.SwissData.DEGTORAD / 3600.0; 
    } else if (prec_model == Swe.SEMOD_PREC_BRETAGNON_2003) {
      eps =  ((((((-3e-11 * T - 2.48e-8) * T -5.23e-7) * T +1.99911e-3) * T -1.667e-4) * T -46.836051) * T + 84381.40880) * Swe.SwissData.DEGTORAD / 3600.0;/* */
    } else if (prec_model == Swe.SEMOD_PREC_SIMON_1994) {
      eps =  (((((2.5e-8 * T -5.1e-7) * T +1.9989e-3) * T -1.52e-4) * T -46.80927) * T + 84381.412) * Swe.SwissData.DEGTORAD / 3600.0;/* */
    } else if (prec_model == Swe.SEMOD_PREC_WILLIAMS_1994) {
      eps =  ((((-1.0e-6 * T +2.0e-3) * T -1.74e-4) * T -46.833960) * T + 84381.409) * Swe.SwissData.DEGTORAD / 3600.0;/* */
    } else if (prec_model == Swe.SEMOD_PREC_LASKAR_1986) {
      T /= 10.0;
      eps = ((((((((( 2.45e-10*T + 5.79e-9)*T + 2.787e-7)*T
      + 7.12e-7)*T - 3.905e-5)*T - 2.4967e-3)*T
      - 5.138e-3)*T + 1.99925)*T - 0.0155)*T - 468.093)*T
      + 84381.448;
      eps *= Swe.SwissData.DEGTORAD/3600.0;
    } else { /* SEMOD_PREC_VONDRAK_2011 */
      var ar_eps = new Array(1);
      this.swi_ldp_peps(J, null, ar_eps);
      eps = ar_eps[0];
      /*if ((iflag & SEFLG_JPLHOR_APPROX) && APPROXIMATE_HORIZONS_ASTRODIENST) {*/
      if ((iflag & Swe.SEFLG_JPLHOR_APPROX) != 0 && jplhora_model == Swe.SEMOD_JPLHORA_1) {
        tofs = (J - this.DCOR_EPS_JPL_TJD0) / 365.25;
        dofs = this.OFFSET_EPS_JPLHORIZONS;
        if (tofs < 0) {
    tofs = 0;
    dofs = dcor_eps_jpl[0];
        } else if (tofs >= this.NDCOR_EPS_JPL - 1) {
    tofs = this.NDCOR_EPS_JPL;
    dofs = dcor_eps_jpl[this.NDCOR_EPS_JPL - 1];
        } else {
    t0 = Math.floor(tofs);
    t1 = t0 + 1;
    dofs = dcor_eps_jpl[Math.floor(t0)];
    dofs = (tofs - t0) * (dcor_eps_jpl[Math.floor(t0)] - dcor_eps_jpl[Math.floor(t1)]) + dcor_eps_jpl[Math.floor(t0)];
        }
        dofs /= (1000.0 * 3600.0);
        eps += dofs * Swe.SwissData.DEGTORAD;
      }
    }

    return(eps);
  }

  /*precess_1(R, J, direction, prec_method) {
    return precess_1(R, 0, J, direction, prec_method);
  }*/
  precess_1(R, rOffs, J, direction, prec_method) {
    //引数4つの場合
    if(prec_method === undefined){
      return this.precess_1(R, 0, rOffs, J, direction);
    }

    var T = 0;
    var Z = 0;
    var z = 0;
    var TH = 0;
    var i;
    var x = [0,0,0];
    var sinth, costh, sinZ, cosZ, sinz, cosz, A, B;
    if( J == Swe.SwephData.J2000 ) {
      return(0);
    }
    T = (J - Swe.SwephData.J2000)/36525.0;
    if (prec_method == Swe.SEMOD_PREC_IAU_1976) {
      Z =  (( 0.017998*T + 0.30188)*T + 2306.2181)*T*Swe.SwissData.DEGTORAD/3600;
      z =  (( 0.018203*T + 1.09468)*T + 2306.2181)*T*Swe.SwissData.DEGTORAD/3600;
      TH = ((-0.041833*T - 0.42665)*T + 2004.3109)*T*Swe.SwissData.DEGTORAD/3600;
    } else if (prec_method == Swe.SEMOD_PREC_IAU_2000) {
      /* AA 2006 B28:*/
      Z =  (((((- 0.0000002*T - 0.0000327)*T + 0.0179663)*T + 0.3019015)*T + 2306.0809506)*T + 2.5976176)*Swe.SwissData.DEGTORAD/3600;
      z =  (((((- 0.0000003*T - 0.000047)*T + 0.0182237)*T + 1.0947790)*T + 2306.0803226)*T - 2.5976176)*Swe.SwissData.DEGTORAD/3600;
      TH = ((((-0.0000001*T - 0.0000601)*T - 0.0418251)*T - 0.4269353)*T + 2004.1917476)*T*Swe.SwissData.DEGTORAD/3600;
    } else if (prec_method == Swe.SEMOD_PREC_IAU_2006) {
      T = (J - Swe.SwephData.J2000)/36525.0;
      Z =  (((((- 0.0000003173*T - 0.000005971)*T + 0.01801828)*T + 0.2988499)*T + 2306.083227)*T + 2.650545)*Swe.SwissData.DEGTORAD/3600;
      z =  (((((- 0.0000002904*T - 0.000028596)*T + 0.01826837)*T + 1.0927348)*T + 2306.077181)*T - 2.650545)*Swe.SwissData.DEGTORAD/3600;
      TH = ((((-0.00000011274*T - 0.000007089)*T - 0.04182264)*T - 0.4294934)*T + 2004.191903)*T*Swe.SwissData.DEGTORAD/3600;
    } else if (prec_method == Swe.SEMOD_PREC_BRETAGNON_2003) {
      Z =  ((((((-0.00000000013*T - 0.0000003040)*T - 0.000005708)*T + 0.01801752)*T + 0.3023262)*T + 2306.080472)*T + 2.72767)*Swe.SwissData.DEGTORAD/3600;
    z =  ((((((-0.00000000005*T - 0.0000002486)*T - 0.000028276)*T + 0.01826676)*T + 1.0956768)*T + 2306.076070)*T - 2.72767)*Swe.SwissData.DEGTORAD/3600;
      TH = ((((((0.000000000009*T + 0.00000000036)*T -0.0000001127)*T - 0.000007291)*T - 0.04182364)*T - 0.4266980)*T + 2004.190936)*T*Swe.SwissData.DEGTORAD/3600;
    } else {
      return 0;
    }
    sinth = Math.sin(TH);
    costh = Math.cos(TH);
    sinZ = Math.sin(Z);
    cosZ = Math.cos(Z);
    sinz = Math.sin(z);
    cosz = Math.cos(z);
    A = cosZ*costh;
    B = sinZ*costh;
    if( direction < 0 ) { /* From J2000.0 to J */
      x[0] =    (A*cosz - sinZ*sinz)*R[0+rOffs]
              - (B*cosz + cosZ*sinz)*R[1+rOffs]
                        - sinth*cosz*R[2+rOffs];
      x[1] =    (A*sinz + sinZ*cosz)*R[0+rOffs]
              - (B*sinz - cosZ*cosz)*R[1+rOffs]
                        - sinth*sinz*R[2+rOffs];
      x[2] =              cosZ*sinth*R[0+rOffs]
                        - sinZ*sinth*R[1+rOffs]
                        + costh*R[2+rOffs];
    } else { /* From J to J2000.0 */
      x[0] =    (A*cosz - sinZ*sinz)*R[0+rOffs]
              + (A*sinz + sinZ*cosz)*R[1+rOffs]
                        + cosZ*sinth*R[2+rOffs];
      x[1] =  - (B*cosz + cosZ*sinz)*R[0+rOffs]
              - (B*sinz - cosZ*cosz)*R[1+rOffs]
                        - sinZ*sinth*R[2+rOffs];
      x[2] =            - sinth*cosz*R[0+rOffs]
                        - sinth*sinz*R[1+rOffs]
                        + costh*R[2+rOffs];
    }
    for( i=0; i<3; i++ )
      R[i+rOffs] = x[i];

    return(0);
  }

  /*precess_2( R, J, iflag, direction, prec_method) {
    return precess_2(R, 0, J, iflag, direction, prec_method);
  }*/
  precess_2(R, rOffs, J, iflag, direction, prec_method) {
    //引数5つの場合
    if(prec_method === undefined){
      return this.precess_2(R, 0, rOffs, J, iflag, direction);
    }
    var i;
    var T, z;
    var eps, sineps, coseps;
    var x = [0,0,0];
    // double *p; Pointer to double[], using pn to point to index in array instead
    var pn = 0;
    var A, B, pA, W;
    var pAcof = null, inclcof = null, nodecof = null;
    if( J == Swe.SwephData.J2000 ) 
      return(0);
    if (prec_method == Swe.SEMOD_PREC_LASKAR_1986) {
      pAcof = pAcof_laskar;
      nodecof = nodecof_laskar;
      inclcof = inclcof_laskar;
    } else if (prec_method == Swe.SEMOD_PREC_SIMON_1994) {
      pAcof = pAcof_simon;
      nodecof = nodecof_simon;
      inclcof = inclcof_simon;
    } else if (prec_method == Swe.SEMOD_PREC_WILLIAMS_1994) {
      pAcof = pAcof_williams;
      nodecof = nodecof_williams;
      inclcof = inclcof_williams;
    } else {  /* default, to satisfy compiler */
      pAcof = pAcof_laskar;
      nodecof = nodecof_laskar;
      inclcof = inclcof_laskar;
    }
    T = (J - Swe.SwephData.J2000)/36525.0;
    /* Implementation by elementary rotations using Laskar's expansions.
     * First rotate about the x axis from the initial equator
     * to the ecliptic. (The input is equatorial.)
     */
    if( direction == 1 ) {
      eps = this.swi_epsiln(J, iflag); /* To J2000 */
    } else {
      eps = this.swi_epsiln(Swe.SwephData.J2000, iflag); /* From J2000 */
    }
    sineps = Math.sin(eps);
    coseps = Math.cos(eps);
    x[0] = R[0+rOffs];
    z = coseps*R[1+rOffs] + sineps*R[2+rOffs];
    x[2] = -sineps*R[1+rOffs] + coseps*R[2+rOffs];
    x[1] = z;
    /* Precession in longitude */
    T /= 10.0; /* thousands of years */
    pn=0; //p = pAcof;
    pA = pAcof[pn]; pn++;
    for( i=0; i<9; i++ ) {
      pA = pA * T + pAcof[pn]; pn++;
    }
    pA *= Swe.SwissData.DEGTORAD/3600 * T;
    /* Node of the moving ecliptic on the J2000 ecliptic.
     */
    pn=0; // p = nodecof;
    W = nodecof[pn]; pn++;
    for( i=0; i<10; i++ ) {
      W = W * T + nodecof[pn]; pn++;
    }
    /* Rotate about z axis to the node.
     */
    if( direction == 1 ) {
      z = W + pA;
    } else {
      z = W;
    }
    B = Math.cos(z);
    A = Math.sin(z);
    z = B * x[0] + A * x[1];
    x[1] = -A * x[0] + B * x[1];
    x[0] = z;
    /* Rotate about new x axis by the inclination of the moving
     * ecliptic on the J2000 ecliptic.
     */
    pn=0; // p = inclcof;
    z = inclcof[pn]; pn++;
    for( i=0; i<10; i++ ) {
      z = z * T + inclcof[pn]; pn++;
    }
    if( direction == 1 ) {
      z = -z;
    }
    B = Math.cos(z);
    A = Math.sin(z);
    z = B * x[1] + A * x[2];
    x[2] = -A * x[1] + B * x[2];
    x[1] = z;
    /* Rotate about new z axis back from the node.
     */
    if( direction == 1 ) {
      z = -W;
    } else {
      z = -W - pA;
    }
    B = Math.cos(z);
    A = Math.sin(z);
    z = B * x[0] + A * x[1];
    x[1] = -A * x[0] + B * x[1];
    x[0] = z;
    /* Rotate about x axis to final equator.
     */
    if( direction == 1 ) {
      eps = this.swi_epsiln(Swe.SwephData.J2000, iflag);
    } else {
      eps = this.swi_epsiln(J, iflag);
    }
    sineps = Math.sin(eps);
    coseps = Math.cos(eps);
    z = coseps * x[1] - sineps * x[2];
    x[2] = sineps * x[1] + coseps * x[2];
    x[1] = z;
    for( i=0; i<3; i++ )
      R[i+rOffs] = x[i];

    return(0);
  }

  /*precess_3(R, J, direction, prec_meth) {
    return precess_3(R, 0, J, direction, prec_meth);
  }*/
  precess_3(R, rOffs, J, direction, prec_meth) {
    //引数4つの場合
    if(prec_meth === undefined){
      return this.precess_3(R, 0, rOffs, J, direction);
    }

    var T;
    var x = [0,0,0], pmat = new Array(9);
    var i, j;
    if( J == Swe.SwephData.J2000 ){
      return(0);
    }
    /* Each precession angle is specified by a polynomial in
     * T = Julian centuries from J2000.0.  See AA page B18.
     */
    T = (J - Swe.SwephData.J2000)/36525.0;
    this.pre_pmat(J, pmat);
    if (direction == -1) {
      for (i = 0, j = 0; i <= 2; i++, j = i * 3) {
        x[i] = R[0+rOffs] *  pmat[j + 0] +
          R[1+rOffs] * pmat[j + 1] +
        R[2+rOffs] * pmat[j + 2];
      }
    } else {
      for (i = 0, j = 0; i <= 2; i++, j = i * 3) {
        x[i] = R[0+rOffs] * pmat[i + 0] +
          R[1+rOffs] * pmat[i + 3] +
          R[2+rOffs] * pmat[i + 6];
      }
    }
    for (i = 0; i < 3; i++){
      R[i+rOffs] = x[i];
    }
    return(0);
  }

  /*swi_precess(R, J, iflag, direction ) {
    return swi_precess(R, 0, J, iflag, direction);
  }*/
  swi_precess(R, rOffs, J, iflag, direction ) {
    //引数4つの場合
    if(direction === undefined){
      return this.swi_precess(R, 0, rOffs, J, iflag);
    }
    

    var T = (J - Swe.SwephData.J2000)/36525.0;
    var prec_model = this.swed.astro_models[Swe.SE_MODEL_PREC_LONGTERM];
    var prec_model_short = this.swed.astro_models[Swe.SE_MODEL_PREC_SHORTTERM];
    var jplhor_model = this.swed.astro_models[Swe.SE_MODEL_JPLHOR_MODE];
    if (prec_model == 0) prec_model = Swe.SEMOD_PREC_DEFAULT;
    if (prec_model_short == 0) prec_model_short = Swe.SEMOD_PREC_DEFAULT_SHORT;
    if (jplhor_model == 0) jplhor_model = Swe.SEMOD_JPLHOR_DEFAULT;
    /* JPL Horizons uses precession IAU 1976 and nutation IAU 1980 plus
     * some correction to nutation, arriving at extremely high precision */
    /*if ((iflag & SEFLG_JPLHOR) && (jplhor_model & SEMOD_JPLHOR_DAILY_DATA)) {*/
    if ((iflag & Swe.SEFLG_JPLHOR) != 0 /*&& INCLUDE_CODE_FOR_DPSI_DEPS_IAU1980*/) {
      return this.precess_1(R, rOffs, J, direction, Swe.SEMOD_PREC_IAU_1976);
    /* Use IAU 1976 formula for a few centuries.  */
    } else if (prec_model_short == Swe.SEMOD_PREC_IAU_1976 && Math.abs(T) <= this.PREC_IAU_1976_CTIES) {
      return this.precess_1(R, rOffs, J, direction, Swe.SEMOD_PREC_IAU_1976);
    } else if (prec_model == Swe.SEMOD_PREC_IAU_1976) {
      return this.precess_1(R, rOffs, J, direction, Swe.SEMOD_PREC_IAU_1976);
    /* Use IAU 2000 formula for a few centuries.  */
    } else if (prec_model_short == Swe.SEMOD_PREC_IAU_2000 && Math.abs(T) <= this.PREC_IAU_2000_CTIES) {
      return this.precess_1(R, rOffs, J, direction, Swe.SEMOD_PREC_IAU_2000);
    } else if (prec_model == Swe.SEMOD_PREC_IAU_2000) {
      return this.precess_1(R, rOffs, J, direction, Swe.SEMOD_PREC_IAU_2000);
    /* Use IAU 2006 formula for a few centuries.  */
    } else if (prec_model_short == Swe.SEMOD_PREC_IAU_2006 && Math.abs(T) <= this.PREC_IAU_2006_CTIES) {
      return this.precess_1(R, rOffs, J, direction, Swe.SEMOD_PREC_IAU_2006);
    } else if (prec_model == Swe.SEMOD_PREC_IAU_2006) {
      return this.precess_1(R, rOffs, J, direction, Swe.SEMOD_PREC_IAU_2006);
    } else if (prec_model == Swe.SEMOD_PREC_BRETAGNON_2003) {
      return this.precess_1(R, rOffs, J, direction, Swe.SEMOD_PREC_BRETAGNON_2003);
    } else if (prec_model == Swe.SEMOD_PREC_LASKAR_1986) {
      return this.precess_2(R, rOffs, J, iflag, direction, Swe.SEMOD_PREC_LASKAR_1986);
    } else if (prec_model == Swe.SEMOD_PREC_SIMON_1994) {
      return this.precess_2(R, rOffs, J, iflag, direction, Swe.SEMOD_PREC_SIMON_1994);
    } else { /* SEMOD_PREC_VONDRAK_2011 */
      return this.precess_3(R, rOffs, J, direction, Swe.SEMOD_PREC_VONDRAK_2011);
    }
  }

  swi_nutation_iau1980(J, nutlo) {

    /* arrays to hold sines and cosines of multiple angles */
    var ss=new Array(5);
    for(var i=0; i<5; i++){
      ss[i] = new Array(8).fill(0.0);
    }
    var cc=new Array(5);
    for(var i=0; i<5; i++){
      cc[i] = new Array(8).fill(0.0);
    }
    var arg;
    var args=new Array(5);
    var f, g, T, T2;
    var MM, MS, FF, DD, OM;
    var cu, su, cv, sv, sw, s;
    var C, D;
    var i, j, k, k1, m, n;
    var ns=new Array(5);
    var pn;
    var nut_model = this.swed.astro_models[Swe.SE_MODEL_NUT];
    if (nut_model == 0) nut_model = Swe.SEMOD_NUT_DEFAULT;
    /* Julian centuries from 2000 January 1.5,
     * barycentric dynamical time
     */
    T = (J - 2451545.0) / 36525.0;
    T2 = T * T;
    /* Fundamental arguments in the FK5 reference system.
     * The coefficients, originally given to 0.001",
     * are converted here to degrees.
     */
    /* longitude of the mean ascending node of the lunar orbit
     * on the ecliptic, measured from the mean equinox of date
     */
    OM = -6962890.539 * T + 450160.280 + (0.008 * T + 7.455) * T2;
    OM = this.swe_degnorm(OM/3600) * Swe.SwissData.DEGTORAD;
    /* mean longitude of the Sun minus the
     * mean longitude of the Sun's perigee
     */
    MS = 129596581.224 * T + 1287099.804 - (0.012 * T + 0.577) * T2;
    MS = this.swe_degnorm(MS/3600) * Swe.SwissData.DEGTORAD;
    /* mean longitude of the Moon minus the
     * mean longitude of the Moon's perigee
     */
    MM = 1717915922.633 * T + 485866.733 + (0.064 * T + 31.310) * T2;
    MM = this.swe_degnorm(MM/3600) * Swe.SwissData.DEGTORAD;
    /* mean longitude of the Moon minus the
     * mean longitude of the Moon's node
     */
    FF = 1739527263.137 * T + 335778.877 + (0.011 * T - 13.257) * T2;
    FF = this.swe_degnorm(FF/3600) * Swe.SwissData.DEGTORAD;
    /* mean elongation of the Moon from the Sun.
     */
    DD = 1602961601.328 * T + 1072261.307 + (0.019 * T - 6.891) * T2;
    DD = this.swe_degnorm(DD/3600) * Swe.SwissData.DEGTORAD;
    args[0] = MM;
    ns[0] = 3;
    args[1] = MS;
    ns[1] = 2;
    args[2] = FF;
    ns[2] = 4;
    args[3] = DD;
    ns[3] = 4;
    args[4] = OM;
    ns[4] = 2;
    /* Calculate sin( i*MM ), etc. for needed multiple angles
     */
    for (k = 0; k <= 4; k++) {
      arg = args[k];
      n = ns[k];
      su = Math.sin(arg);
      cu = Math.cos(arg);
      ss[k][0] = su;                      /* sin(L) */
      cc[k][0] = cu;                      /* cos(L) */
      sv = 2.0*su*cu;
      cv = cu*cu - su*su;
      ss[k][1] = sv;                      /* sin(2L) */
      cc[k][1] = cv;
      for( i=2; i<n; i++ ) {
        s =  su*cv + cu*sv;
        cv = cu*cv - su*sv;
        sv = s;
        ss[k][i] = sv;            /* sin( i+1 L ) */
        cc[k][i] = cv;
      }
    }
    /* first terms, not in table: */
    C = (-0.01742*T - 17.1996)*ss[4][0];  /* sin(OM) */
    D = ( 0.00089*T +  9.2025)*cc[4][0];  /* cos(OM) */
    for(pn = 0; nt[pn] != this.ENDMARK; pn += 9) {
      if (nut_model != Swe.SEMOD_NUT_IAU_CORR_1987 && (nt[pn] == 101 || nt[pn] == 102))
        continue;
      /* argument of sine and cosine */
      k1 = 0;
      cv = 0.0;
      sv = 0.0;
      for( m=0; m<5; m++ ) {
        j = nt[pn+m];
        if (j > 100) {
          j = 0; /* p[0] is a flag */
        }
        if( j!=0 ) {
          k = j;
          if( j < 0 ) {
            k = -k;
          }
          su = ss[m][k-1]; /* sin(k*angle) */
          if( j < 0 ) {
            su = -su;
          }
          cu = cc[m][k-1];
          if( k1 == 0 ) { /* set first angle */
            sv = su;
            cv = cu;
            k1 = 1;
          }
          else {          /* combine angles */
            sw = su*cv + cu*sv;
            cv = cu*cv - su*sv;
            sv = sw;
          }
        }
      }
      /* longitude coefficient, in 0.0001" */
      f  = nt[pn+5] * 0.0001;
      if( nt[pn+6] != 0 ) {
        f += 0.00001 * T * nt[pn+6];
      }
      /* obliquity coefficient, in 0.0001" */
      g = nt[pn+7] * 0.0001;
      if( nt[pn+8] != 0 ) {
        g += 0.00001 * T * nt[pn+8];
      }
      if (nt[pn] >= 100) {    /* coefficients in 0.00001" */
        f *= 0.1;
        g *= 0.1;
      }
      /* accumulate the terms */
      if (nt[pn] != 102) {
        C += f * sv;
        D += g * cv;
      }
      else {              /* cos for nutl and sin for nuto */
        C += f * cv;
        D += g * sv;
      }
    }
    /* Save answers, expressed in radians */
    nutlo[0] = Swe.SwissData.DEGTORAD * C / 3600.0;
    nutlo[1] = Swe.SwissData.DEGTORAD * D / 3600.0;
  /*  nutlo[0] += (-0.071590 / 3600.0) * Swe.SwissData.DEGTORAD;
    nutlo[1] += (-0.008000 / 3600.0) * Swe.SwissData.DEGTORAD;*/
  /* nutlo[0] += (-0.047878 / 3600.0) * Swe.SwissData.DEGTORAD;
    nutlo[1] += (-0.004035 / 3600.0) * Swe.SwissData.DEGTORAD;*/

    return(0);
  }

  swi_nutation_iau2000ab(J, nutlo) {

    var i, j, k, inls;
    var M, SM, F, D, OM;
    var AL, ALSU, AF, AD, AOM, APA;
    var ALME, ALVE, ALEA, ALMA, ALJU, ALSA, ALUR, ALNE;
    var darg, sinarg, cosarg;
    var dpsi = 0, deps = 0;
    var T = (J - Swe.SwephData.J2000 ) / 36525.0;
    var nut_model = this.swed.astro_models[Swe.SE_MODEL_NUT];
    if (nut_model == 0) nut_model = Swe.SEMOD_NUT_DEFAULT;
    /* luni-solar nutation */
    /* Fundamental arguments, Simon & al. (1994) */
    /* Mean anomaly of the Moon. */
    M  = this.swe_degnorm(( 485868.249036 +
                T*( 1717915923.2178 +
                T*(         31.8792 +
                T*(          0.051635 +
                T*(        - 0.00024470 ))))) / 3600.0) * Swe.SwissData.DEGTORAD;
    /* Mean anomaly of the Sun */
    SM = this.swe_degnorm((1287104.79305 +
                T*(  129596581.0481 +
                T*(        - 0.5532 +
                T*(          0.000136 +
                T*(        - 0.00001149 ))))) / 3600.0) * Swe.SwissData.DEGTORAD;
    /* Mean argument of the latitude of the Moon. */
    F   = this.swe_degnorm(( 335779.526232 +
                T*( 1739527262.8478 +
                T*(       - 12.7512 +
                T*(       -  0.001037 +
                T*(          0.00000417 ))))) / 3600.0) * Swe.SwissData.DEGTORAD;
    /* Mean elongation of the Moon from the Sun. */
    D   = this.swe_degnorm((1072260.70369 +
                T*( 1602961601.2090 +
                T*(        - 6.3706 +
                T*(          0.006593 +
                T*(        - 0.00003169 ))))) / 3600.0) * Swe.SwissData.DEGTORAD;
    /* Mean longitude of the ascending node of the Moon. */
    OM  = this.swe_degnorm(( 450160.398036 +
                T*(  - 6962890.5431 +
                T*(          7.4722 +
                T*(          0.007702 +
                T*(        - 0.00005939 ))))) / 3600.0) * Swe.SwissData.DEGTORAD;
    /* luni-solar nutation series, in reverse order, starting with small terms */
    if (nut_model == Swe.SEMOD_NUT_IAU_2000B)
      inls = Swe.Swenut2000a.NLS_2000B;
    else
      inls = Swe.Swenut2000a.NLS;
    for (i = inls - 1; i >= 0; i--) {
      j = i * 5;
      darg = this.swe_radnorm( Swe.Swenut2000aNls.nls[j + 0] * M  +
                          Swe.Swenut2000aNls.nls[j + 1] * SM +
                          Swe.Swenut2000aNls.nls[j + 2] * F   +
                          Swe.Swenut2000aNls.nls[j + 3] * D   +
                          Swe.Swenut2000aNls.nls[j + 4] * OM);
      sinarg = Math.sin(darg);
      cosarg = Math.cos(darg);
      k = i * 6;
      dpsi += (Swe.Swenut2000a_cls.cls[k+0] + Swe.Swenut2000a_cls.cls[k+1] * T) * sinarg + Swe.Swenut2000a_cls.cls[k+2] * cosarg;
      deps += (Swe.Swenut2000a_cls.cls[k+3] + Swe.Swenut2000a_cls.cls[k+4] * T) * cosarg + Swe.Swenut2000a_cls.cls[k+5] * sinarg;
    }
    nutlo[0] = dpsi * Swe.Swenut2000a.O1MAS2DEG;
    nutlo[1] = deps * Swe.Swenut2000a.O1MAS2DEG;
    if (nut_model == Swe.SEMOD_NUT_IAU_2000A) {
      /* planetary nutation
       * note: The MHB2000 code computes the luni-solar and planetary nutation
       * in different routines, using slightly different Delaunay
       * arguments in the two cases.  This behaviour is faithfully
       * reproduced here.  Use of the Simon et al. expressions for both
       * cases leads to negligible changes, well below 0.1 microarcsecond.*/
      /* Mean anomaly of the Moon.*/
      AL = this.swe_radnorm(2.35555598 + 8328.6914269554 * T);
      /* Mean anomaly of the Sun.*/
      ALSU = this.swe_radnorm(6.24006013 + 628.301955 * T);
      /* Mean argument of the latitude of the Moon. */
      AF = this.swe_radnorm(1.627905234 + 8433.466158131 * T);
      /* Mean elongation of the Moon from the Sun. */
      AD = this.swe_radnorm(5.198466741 + 7771.3771468121 * T);
      /* Mean longitude of the ascending node of the Moon. */
      AOM = this.swe_radnorm(2.18243920 - 33.757045 * T);
      /* Planetary longitudes, Mercury through Neptune (Souchay et al. 1999). */
      ALME = this.swe_radnorm(4.402608842 + 2608.7903141574 * T);
      ALVE = this.swe_radnorm(3.176146697 + 1021.3285546211 * T);
      ALEA = this.swe_radnorm(1.753470314 +  628.3075849991 * T);
      ALMA = this.swe_radnorm(6.203480913 +  334.0612426700 * T);
      ALJU = this.swe_radnorm(0.599546497 +   52.9690962641 * T);
      ALSA = this.swe_radnorm(0.874016757 +   21.3299104960 * T);
      ALUR = this.swe_radnorm(5.481293871 +    7.4781598567 * T);
      ALNE = this.swe_radnorm(5.321159000 +    3.8127774000 * T);
      /* General accumulated precession in longitude. */
      APA = (0.02438175 + 0.00000538691 * T) * T;
      /* planetary nutation series (in reverse order).*/
      dpsi = 0;
      deps = 0;
      for (i = Swe.Swenut2000a.NPL - 1; i >= 0; i--) {
        j = i * 14;
        darg = this.swe_radnorm( Swe.Swenut2000a_npl.npl[j + 0] * AL   +
             Swe.Swenut2000a_npl.npl[j + 1] * ALSU +
             Swe.Swenut2000a_npl.npl[j + 2] * AF   +
             Swe.Swenut2000a_npl.npl[j + 3] * AD   +
             Swe.Swenut2000a_npl.npl[j + 4] * AOM  +
             Swe.Swenut2000a_npl.npl[j + 5] * ALME +
             Swe.Swenut2000a_npl.npl[j + 6] * ALVE +
             Swe.Swenut2000a_npl.npl[j + 7] * ALEA +
             Swe.Swenut2000a_npl.npl[j + 8] * ALMA +
             Swe.Swenut2000a_npl.npl[j + 9] * ALJU +
             Swe.Swenut2000a_npl.npl[j +10] * ALSA +
             Swe.Swenut2000a_npl.npl[j +11] * ALUR +
             Swe.Swenut2000a_npl.npl[j +12] * ALNE +
             Swe.Swenut2000a_npl.npl[j +13] * APA);
        k = i * 4;
        sinarg = Math.sin(darg);
        cosarg = Math.cos(darg);
        dpsi +=  Swe.Swenut2000a.icpl[k+0] * sinarg +  Swe.Swenut2000a.icpl[k+1] * cosarg;
        deps +=  Swe.Swenut2000a.icpl[k+2] * sinarg +  Swe.Swenut2000a.icpl[k+3] * cosarg;
      }
      nutlo[0] += dpsi * Swe.Swenut2000a.O1MAS2DEG;
      nutlo[1] += deps * Swe.Swenut2000a.O1MAS2DEG;

      /* changes required by adoption of P03 precession
       * according to Capitaine et al. A & A 412, 366 (2005) = IAU 2006 */
      dpsi = -8.1 * Math.sin(OM) - 0.6 * Math.sin(2 * F - 2 * D + 2 * OM);
      dpsi += T * (47.8 * Math.sin(OM) + 3.7 * Math.sin(2 * F - 2 * D + 2 * OM) + 0.6 * Math.sin(2 * F + 2 * OM) - 0.6 * Math.sin(2 * OM));
      deps = T * (-25.6 * Math.cos(OM) - 1.6 * Math.cos(2 * F - 2 * D + 2 * OM));
      nutlo[0] += dpsi / (3600.0 * 1000000.0);
      nutlo[1] += deps / (3600.0 * 1000000.0);

    } /* NUT_IAU_2000A */ // Well, the C #define is a constant here
    nutlo[0] *= Swe.SwissData.DEGTORAD;
    nutlo[1] *= Swe.SwissData.DEGTORAD;
    return 0;
  }

  bessel(v, n, t) {
    var i, iy, k;
    var ans, p, B;
    var d = [0,0,0,0,0,0];
    if (t <= 0) {
      ans = v[0]; 
//      goto done;
      return ans;
    } 
    if (t >= n - 1) {
      ans = v[n - 1]; 
//      goto done;
      return ans;
    }
    p = Math.floor(t);
    iy = Math.floor( t );
    /* Zeroth order estimate is value at start of year */
    ans = v[iy];
    k = iy + 1;
    if (k >= n)
//      goto done;
      return ans;
    /* The fraction of tabulation interval */
    p = t - p;
    ans += p * (v[k] - v[iy]);
    if( (iy - 1 < 0) || (iy + 2 >= n) )
//      goto done; /* can't do second differences */
      return ans;
    /* Make table of first differences */
    k = iy - 2;
    for (i = 0; i < 5; i++) {
      if((k < 0) || (k + 1 >= n)) 
        d[i] = 0;
      else
        d[i] = v[k+1] - v[k];
      k += 1;
    }
    /* Compute second differences */
    for (i = 0; i < 4; i++ )
      d[i] = d[i+1] - d[i];
    B = 0.25 * p * (p - 1.0);
    ans += B * (d[1] + d[2]);

    if (iy + 2 >= n)
//      goto done;
      return ans;
    /* Compute third differences */
    for (i = 0; i < 3; i++ )
      d[i] = d[i + 1] - d[i];
    B = 2.0 * B / 3.0;
    ans += (p - 0.5) * B * d[1];

    if ((iy - 2 < 0) || (iy + 3 > n))
//      goto done;
      return ans;
    /* Compute fourth differences */
    for (i = 0; i < 2; i++)
      d[i] = d[i + 1] - d[i];
    B = 0.125 * B * (p + 1.0) * (p - 2.0);
    ans += B * (d[0] + d[1]);
//done:
    return ans;
  }

  swi_nutation(J, iflag, nutlo) {
    var n;
    var dpsi, deps, J2;
    var nut_model = this.swed.astro_models[Swe.SE_MODEL_NUT];
    var jplhor_model = this.swed.astro_models[Swe.SE_MODEL_JPLHOR_MODE];
    var jplhora_model = this.swed.astro_models[Swe.SE_MODEL_JPLHORA_MODE];
    if (nut_model == 0) nut_model = Swe.SEMOD_NUT_DEFAULT;
    if (jplhor_model == 0) jplhor_model = Swe.SEMOD_JPLHOR_DEFAULT;
    if (jplhora_model == 0) jplhora_model = Swe.SEMOD_JPLHORA_DEFAULT;
    if ((iflag & Swe.SEFLG_JPLHOR) != 0 /* && INCLUDE_CODE_FOR_DPSI_DEPS_IAU1980*/) {
      this.swi_nutation_iau1980(J, nutlo);
    } else if (nut_model == Swe.SEMOD_NUT_IAU_1980 || nut_model == Swe.SEMOD_NUT_IAU_CORR_1987) {
      swi_nutation_iau1980(J, nutlo);
    } else if (nut_model == Swe.SEMOD_NUT_IAU_2000A || nut_model == Swe.SEMOD_NUT_IAU_2000B) {
      this.swi_nutation_iau2000ab(J, nutlo);

      if ((iflag & Swe.SEFLG_JPLHOR_APPROX) != 0 && jplhora_model != Swe.SEMOD_JPLHORA_1) {
        nutlo[0] += -41.7750 / 3600.0 / 1000.0 * Swe.SwissData.DEGTORAD;
        nutlo[1] += -6.8192 / 3600.0 / 1000.0 * Swe.SwissData.DEGTORAD;
      }
    }
    if ((iflag & Swe.SEFLG_JPLHOR) != 0 ) {
      n = Math.floor (this.swed.eop_tjd_end - this.swed.eop_tjd_beg + 0.000001);
      J2 = J;
      if (J < this.swed.eop_tjd_beg_horizons)
        J2 = this.swed.eop_tjd_beg_horizons;
      dpsi = this.bessel(this.swed.dpsi, n + 1, J2 - this.swed.eop_tjd_beg);
      deps = this.bessel(this.swed.deps, n + 1, J2 - this.swed.eop_tjd_beg);
      nutlo[0] += dpsi / 3600.0 * Swe.SwissData.DEGTORAD;
      nutlo[1] += deps / 3600.0 * Swe.SwissData.DEGTORAD;
    }
    return Swe.OK;
  }


  swi_approx_jplhor(x, tjd, iflag, backward) {
    var t0, t1;
    var t = (tjd - this.DCOR_RA_JPL_TJD0) / 365.25;
    var dofs = this.OFFSET_JPLHORIZONS;
    var jplhor_model = this.swed.astro_models[Swe.SE_MODEL_JPLHOR_MODE];
    var jplhora_model = this.swed.astro_models[Swe.SE_MODEL_JPLHORA_MODE];
    if (jplhor_model == 0) jplhor_model = Swe.SEMOD_JPLHOR_DEFAULT;
    if (jplhora_model == 0) jplhora_model = Swe.SEMOD_JPLHORA_DEFAULT;
    if ((iflag & Swe.SEFLG_JPLHOR_APPROX) == 0)
      return;
    if (jplhora_model != Swe.SEMOD_JPLHORA_1)
      return;
    if (t < 0) {
      t = 0;
      dofs = this.dcor_ra_jpl[0];
    } else if (t >= this.NDCOR_RA_JPL - 1) {
      t = this.NDCOR_RA_JPL;
      dofs = this.dcor_ra_jpl[NDCOR_RA_JPL - 1];
    } else {
      t0 = Math.floor( t );
      t1 = t0 + 1;
      dofs = this.dcor_ra_jpl[Math.floor(t0)];
      dofs = (t - t0) * (this.dcor_ra_jpl[Math.floor(t0)] - this.dcor_ra_jpl[Math.floor(t1)]) + this.dcor_ra_jpl[Math.floor(t0)];
    }
    dofs /= (1000.0 * 3600.0);
    this.swi_cartpol(x, x);
    if (backward) 
      x[0] -= dofs * Swe.SwissData.DEGTORAD;
    else
      x[0] += dofs * Swe.SwissData.DEGTORAD;
    this.swi_polcart(x, x);
  }

  /* GCRS to J2000 */
  swi_bias( x, tjd, iflag, backward) {
    
    var xx=[0,0,0,0,0,0];
    var rb=[0,0,0];
    for(var i=0; i<3; i++){
      rb[i] = [0,0,0];
    }
    var i;
    var bias_model = this.swed.astro_models[Swe.SE_MODEL_BIAS];
    var jplhor_model = this.swed.astro_models[Swe.SE_MODEL_JPLHOR_MODE];
    var jplhora_model = this.swed.astro_models[Swe.SE_MODEL_JPLHORA_MODE];
    if (bias_model == 0) bias_model = Swe.SEMOD_BIAS_DEFAULT;
    if (jplhor_model == 0) jplhor_model = Swe.SEMOD_JPLHOR_DEFAULT;
    if (jplhora_model == 0) jplhora_model = Swe.SEMOD_JPLHORA_DEFAULT;
    /*if (FRAME_BIAS_APPROX_HORIZONS)*/
    if ((iflag & Swe.SEFLG_JPLHOR_APPROX) != 0 && jplhora_model != Swe.SEMOD_JPLHORA_1)
      return;
/* #if FRAME_BIAS_IAU2006 * frame bias 2006 */
    if (bias_model == Swe.SEMOD_BIAS_IAU2006) {
      rb[0][0] = +0.99999999999999412;
      rb[1][0] = -0.00000007078368961;
      rb[2][0] = +0.00000008056213978;
      rb[0][1] = +0.00000007078368695;
      rb[1][1] = +0.99999999999999700;
      rb[2][1] = +0.00000003306428553;
      rb[0][2] = -0.00000008056214212;
      rb[1][2] = -0.00000003306427981;
      rb[2][2] = +0.99999999999999634;
/* #else * frame bias 2000, makes no differentc in result */
    } else {
      rb[0][0] = +0.9999999999999942;
      rb[1][0] = -0.0000000707827974;
      rb[2][0] = +0.0000000805621715;
      rb[0][1] = +0.0000000707827948;
      rb[1][1] = +0.9999999999999969;
      rb[2][1] = +0.0000000330604145;
      rb[0][2] = -0.0000000805621738;
      rb[1][2] = -0.0000000330604088;
      rb[2][2] = +0.9999999999999962;
    }

    if (backward) {
      this.swi_approx_jplhor(x, tjd, iflag, true);
      for (i = 0; i <= 2; i++) {
        xx[i] = x[0] * rb[i][0] +
                x[1] * rb[i][1] +
                x[2] * rb[i][2];
        if ((iflag & Swe.SEFLG_SPEED) != 0)
          xx[i+3] = x[3] * rb[i][0] +
                x[4] * rb[i][1] +
                x[5] * rb[i][2];
      }
    } else {
      for (i = 0; i <= 2; i++) {
        xx[i] = x[0] * rb[0][i] +
                x[1] * rb[1][i] +
                x[2] * rb[2][i];
        if ((iflag & Swe.SEFLG_SPEED) != 0)
          xx[i+3] = x[3] * rb[0][i] +
                x[4] * rb[1][i] +
                x[5] * rb[2][i];
      }
      this.swi_approx_jplhor(xx, tjd, iflag, false);
    }
    for (i = 0; i <= 2; i++) x[i] = xx[i];
    if ((iflag & Swe.SEFLG_SPEED) != 0) {
      for (i = 3; i <= 5; i++) x[i] = xx[i];
    }
  }

  swi_icrs2fk5( x, iflag, backward) {
    var xx=[0,0,0,0,0,0];
    var rb=[0,0,0];
    for(var i=0; i<3; i++){
      rb[i] = [0,0,0];
    }
    var i;
    rb[0][0] = +0.9999999999999928;
    rb[0][1] = +0.0000001110223287;
    rb[0][2] = +0.0000000441180557;
    rb[1][0] = -0.0000001110223330;
    rb[1][1] = +0.9999999999999891;
    rb[1][2] = +0.0000000964779176;
    rb[2][0] = -0.0000000441180450;
    rb[2][1] = -0.0000000964779225;
    rb[2][2] = +0.9999999999999943;
    if (backward) {
      for (i = 0; i <= 2; i++) {
        xx[i] = x[0] * rb[i][0] +
                x[1] * rb[i][1] +
                x[2] * rb[i][2];
        if ((iflag & Swe.SEFLG_SPEED) != 0)
          xx[i+3] = x[3] * rb[i][0] +
                x[4] * rb[i][1] +
                x[5] * rb[i][2];
      }
    } else {
      for (i = 0; i <= 2; i++) {
        xx[i] = x[0] * rb[0][i] +
                x[1] * rb[1][i] +
                x[2] * rb[2][i];
        if ((iflag & Swe.SEFLG_SPEED) != 0)
          xx[i+3] = x[3] * rb[0][i] +
                x[4] * rb[1][i] +
                x[5] * rb[2][i];
      }
    }
    for (i = 0; i <= 5; i++) x[i] = xx[i];
  }

  sidtime_long_term(tjd_ut, eps, nut) {
    var tsid = 0, tjd_et;
    var dlon;
    var xs = [0,0,0,0,0,0];
    var xobl = [0,0,0,0,0,0];
    var dhour;
    var nutlo = [0,0];
    var dlt = Swe.SwephData.AUNIT / Swe.SwephData.CLIGHT / 86400.0;
    var t, t2, t3, t4, t5, t6;
    eps *= Swe.SwissData.RADTODEG;
    nut *= Swe.SwissData.RADTODEG;
    tjd_et = tjd_ut + this.sd.getDeltaT(tjd_ut);
    t = (tjd_et - Swe.SwephData.J2000) / 365250.0;
    t2 = t * t; t3 = t * t2; t4 = t * t3; t5 = t * t4; t6 = t * t5;
    /* mean longitude of earth J2000 */
    dlon = 100.46645683 + (1295977422.83429 * t - 2.04411 * t2 - 0.00523 * t3) / 3600.0;
    /* light time sun-earth */
    dlon = this.swe_degnorm(dlon - dlt * 360.0 / 365.2425);
    xs[0] = dlon * Swe.SwissData.DEGTORAD; xs[1] = 0; xs[2] = 1;
    /* to mean equator J2000, cartesian */
    xobl[0] = 23.45; xobl[1] = 23.45;
    xobl[1] = this.swi_epsiln(Swe.SwephData.J2000 + this.sd.getDeltaT(Swe.SwephData.J2000), 0) * Swe.SwissData.RADTODEG;
    this.swi_polcart(xs, xs);
    this.swi_coortrf(xs, xs, -xobl[1] * Swe.SwissData.DEGTORAD);
    /* precess to mean equinox of date */
    this.swi_precess(xs, tjd_et, 0, -1);
    /* to mean equinox of date */
    xobl[1] = this.swi_epsiln(tjd_et, 0) * Swe.SwissData.RADTODEG;
    this.swi_nutation(tjd_et, 0, nutlo);
    xobl[0] = xobl[1] + nutlo[1] * Swe.SwissData.RADTODEG;
    xobl[2] = nutlo[0] * Swe.SwissData.RADTODEG;
    this.swi_coortrf(xs, xs, xobl[1] * Swe.SwissData.DEGTORAD);
    this.swi_cartpol(xs, xs);
    xs[0] *= Swe.SwissData.RADTODEG;
    dhour = ((tjd_ut - 0.5) % 1) * 360;
    /* mean to true (if nut != 0) */ 
    if (eps == 0)
      xs[0] += xobl[2] * Math.cos(xobl[0] * Swe.SwissData.DEGTORAD);
    else
      xs[0] += nut * Math.cos(eps * Swe.SwissData.DEGTORAD);
    /* add hour */
    xs[0] = this.swe_degnorm(xs[0] + dhour);
    tsid = xs[0] / 15;
    return tsid;
  }



  sidtime_non_polynomial_part(tt) {
    var i, j;
    var delm = new Array(this.SIDTNARG);
    var dadd, darg;
    /* L Mean anomaly of the Moon.*/
    delm[0] = this.swe_radnorm(2.35555598 + 8328.6914269554 * tt);
    /* LSU Mean anomaly of the Sun.*/
    delm[1] = this.swe_radnorm(6.24006013 + 628.301955 * tt);
    /* F Mean argument of the latitude of the Moon. */
    delm[2] = this.swe_radnorm(1.627905234 + 8433.466158131 * tt);
    /* D Mean elongation of the Moon from the Sun. */
    delm[3] = this.swe_radnorm(5.198466741 + 7771.3771468121 * tt);
    /* OM Mean longitude of the ascending node of the Moon. */
    delm[4] = this.swe_radnorm(2.18243920 - 33.757045 * tt);

    delm[5] = this.swe_radnorm(4.402608842 + 2608.7903141574 * tt);
    delm[6] = this.swe_radnorm(3.176146697 + 1021.3285546211 * tt);
    delm[7] = this.swe_radnorm(1.753470314 +  628.3075849991 * tt);
    delm[8] = this.swe_radnorm(6.203480913 +  334.0612426700 * tt);
    delm[9] = this.swe_radnorm(0.599546497 +   52.9690962641 * tt);
    delm[10] = this.swe_radnorm(0.874016757 +   21.3299104960 * tt);
    delm[11] = this.swe_radnorm(5.481293871 +    7.4781598567 * tt);
    delm[12] = this.swe_radnorm(5.321159000 +    3.8127774000 * tt);
    /* PA General accumulated precession in longitude. */
    delm[13] = (0.02438175 + 0.00000538691 * tt) * tt;
    dadd = -0.87 * Math.sin(delm[4]) * tt;
    for (i = 0; i < this.SIDTNTERM; i++) {
      darg = 0;
      for (j = 0; j < this.SIDTNARG; j++) {
        darg += this.stfarg[i * this.SIDTNARG + j] * delm[j];
      }
      dadd += this.stcf[i * 2] * Math.sin(darg) + this.stcf[i * 2 + 1] * Math.cos(darg);
    }
    dadd /= (3600.0 * 1000000.0);
    return dadd;
  }

  swe_sidtime0(tjd, eps, nut) {
    var jd0;           /* Julian day at midnight Universal Time */
    var secs;          /* Time of day, UT seconds since UT midnight */
    var eqeq, jd, tu, tt, msday, jdrel;
    var gmst, dadd;
    var prec_model_short = this.swed.astro_models[Swe.SE_MODEL_PREC_SHORTTERM];
    var sidt_model = this.swed.astro_models[Swe.SE_MODEL_SIDT];
    if (prec_model_short == 0) prec_model_short = Swe.SEMOD_PREC_DEFAULT_SHORT;
    if (sidt_model == 0) sidt_model = Swe.SEMOD_SIDT_DEFAULT;
    if (true && this.sidt_model == Swe.SEMOD_SIDT_LONGTERM) {
      if (tjd <= this.SIDT_LTERM_T0 || tjd >= this.SIDT_LTERM_T1) {
        gmst = this.sidtime_long_term(tjd, eps, nut);
        if (tjd <= this.SIDT_LTERM_T0) gmst -= this.SIDT_LTERM_OFS0;
        else if (tjd >= this.SIDT_LTERM_T1) gmst -= this.SIDT_LTERM_OFS1;
        if (gmst >= 24) gmst -= 24;
        if (gmst < 0) gmst += 24;
//        goto sidtime_done;
        return gmst;
      }
    }
    /* Julian day at given UT */
    jd = tjd;
    jd0 = Math.floor(jd);
    secs = tjd - jd0;
    if( secs < 0.5 ) {
      jd0 -= 0.5;
      secs += 0.5;
    } else {
      jd0 += 0.5;
      secs -= 0.5;
    }
    secs *= 86400.0;
    tu = (jd0 - Swe.SwephData.J2000)/36525.0;
    if (sidt_model == Swe.SEMOD_SIDT_IERS_CONV_2010) {

      jdrel = tjd - Swe.SwephData.J2000;
      tt = (tjd + this.sd.getDeltaT(tjd) - Swe.SwephData.J2000) / 36525.0;
      gmst = this.swe_degnorm((0.7790572732640 + 1.00273781191135448 * jdrel) * 360);
      gmst += (0.014506 + tt * (4612.156534 +  tt * (1.3915817 + tt * (-0.00000044 + tt * (-0.000029956 + tt * -0.0000000368))))) / 3600.0;
      dadd = this.sidtime_non_polynomial_part(tt);
      gmst = this.swe_degnorm(gmst + dadd);
      /*printf("gmst iers=%f \n", gmst);*/
      gmst = gmst / 15.0 * 3600.0;

    } else if (prec_model_short >= Swe.SEMOD_PREC_IAU_2006) {
      tt = (jd0 + this.sd.getDeltaT(jd0) - Swe.SwephData.J2000)/36525.0; /* TT in centuries after J2000 */
      gmst = (((-0.000000002454*tt - 0.00000199708)*tt - 0.0000002926)*tt + 0.092772110)*tt*tt + 307.4771013*(tt-tu) + 8640184.79447825*tu + 24110.5493771;
      msday = 1 + ((((-0.000000012270*tt - 0.00000798832)*tt - 0.0000008778)*tt + 0.185544220)*tt + 8640184.79447825)/(86400.*36525.);
      gmst += msday * secs;
    } else {
      gmst = (( -6.2e-6*tu + 9.3104e-2)*tu + 8640184.812866)*tu + 24110.54841;
      msday = 1.0 + ((-1.86e-5*tu + 0.186208)*tu + 8640184.812866)/(86400.*36525.);
      gmst += msday * secs;
    }

    eqeq = 240.0 * nut * Math.cos(eps * Swe.SwissData.DEGTORAD);
    gmst = gmst + eqeq;
    gmst = gmst - 86400.0 * Math.floor( gmst/86400.0 );
    gmst /= 3600;
    return gmst;
  }


  swe_sidtime(tjd_ut) {
    var i;
    var eps, nutlo=new Array(2), tsid;
    var tjde = tjd_ut + this.sd.getDeltaT(tjd_ut);
    eps = this.swi_epsiln(tjde, 0) * Swe.SwissData.RADTODEG;
    this.swi_nutation(tjde, 0, nutlo);
    for (i = 0; i < 2; i++)
      nutlo[i] *= Swe.SwissData.RADTODEG;
    tsid = this.swe_sidtime0(tjd_ut, eps + nutlo[1], nutlo[0]);
    return tsid;
  }


  swi_gen_filename(jd, ipli) {
    //jdがSweDateクラスの場合
    if(typeof jd === "object" && jd.constructor === SweDate){
      return this.swi_gen_filename(jd.getJulDay(), ipli);
    }

    var icty;
    var ncties = Math.floor(Swe.SwephData.NCTIES);
    var sgn;
    var fname;

    switch(ipli) {
      case Swe.SwephData.SEI_MOON:
        fname="semo";
        break;
      case Swe.SwephData.SEI_EMB:
      case Swe.SwephData.SEI_MERCURY:
      case Swe.SwephData.SEI_VENUS:
      case Swe.SwephData.SEI_MARS:
      case Swe.SwephData.SEI_JUPITER:
      case Swe.SwephData.SEI_SATURN:
      case Swe.SwephData.SEI_URANUS:
      case Swe.SwephData.SEI_NEPTUNE:
      case Swe.SwephData.SEI_PLUTO:
      case Swe.SwephData.SEI_SUNBARY:
        fname="sepl";
        break;
      case Swe.SwephData.SEI_CERES:
      case Swe.SwephData.SEI_PALLAS:
      case Swe.SwephData.SEI_JUNO:
      case Swe.SwephData.SEI_VESTA:
      case Swe.SwephData.SEI_CHIRON:
      case Swe.SwephData.SEI_PHOLUS:
        fname="seas";
        break;
      default:    /* asteroid */

        var iplNr="00000" + (ipli - Swe.SE_AST_OFFSET);
        iplNr = iplNr.substring(iplNr.length()-6);
        var prefix = "s";
        if ((ipli - Swe.SE_AST_OFFSET <= 99999)) {
          iplNr = iplNr.substring(1);
          prefix = "se";
        }
        fname = "ast" + Math.floor((ipli - Swe.SE_AST_OFFSET) / 1000) +
                Swe.SwissData.DIR_GLUE + prefix + iplNr + "." + Swe.SwephData.SE_FILE_SUFFIX;
        return fname;   /* asteroids: only one file 3000 bc - 3000 ad */
        /* break; */
    }

    var sd = new SweDate(jd);
    if (sd.getJulDay() >= 2305447.5) {
      sd.setCalendarType(this.sd.SE_GREG_CAL, this.sd.SE_KEEP_JD);
    /* else julian calendar */
    } else {
      sd.setCalendarType(this.sd.SE_JUL_CAL, this.sd.SE_KEEP_JD);
    }
    /* start century of file containing tjd */
    var year = sd.getYear();
    if (year < 0) {
      sgn = -1;
    } else {
      sgn = 1;
    }
    icty = year / 100;
    if (sgn < 0 && year % 100 != 0) {
      icty -=1;
    }
    while(icty % ncties != 0) {
      icty--;
    }
    /* B.C. or A.D. */
    if (icty < 0) {
      fname+="m";
    } else {
      fname+="_";
    }
    icty = Math.abs(icty);
    fname+=(icty<10?"0":"")+icty+"."+Swe.SwephData.SE_FILE_SUFFIX;
    return fname;
  }

  swe_split_deg(ddeg, roundflag, ideg, imin, isec, dsecfr, isgn) {
    var dadd = 0;
    isgn.val = 1;
    if (ddeg < 0) {
      isgn.val = -1;
      ddeg = -ddeg;
    }
    if ((roundflag & Swe.SE_SPLIT_DEG_ROUND_DEG)!=0) {
      dadd = 0.5;
    } else if ((roundflag & Swe.SE_SPLIT_DEG_ROUND_MIN)!=0) {
      dadd = 0.5 / 60;
    } else if ((roundflag & Swe.SE_SPLIT_DEG_ROUND_SEC)!=0) {
      dadd = 0.5 / 3600;
    }
    if ((roundflag & Swe.SE_SPLIT_DEG_KEEP_DEG)!=0) {
      if (Math.floor(ddeg + dadd) - Math.floor( ddeg ) > 0) {
        dadd = 0;
      }
    } else if ((roundflag & Swe.SE_SPLIT_DEG_KEEP_SIGN)!=0) {
      if ((ddeg % 30) + dadd >= 30) {
        dadd = 0;
      }
    }
    ddeg += dadd;
    if ((roundflag & Swe.SE_SPLIT_DEG_ZODIACAL)!=0) {
      isgn.val = Math.floor(ddeg / 30);
      ddeg = ddeg % 30;
    }
    ideg.val = Math.floor(ddeg);
    ddeg -= ideg.val;
    imin.val = Math.floor(ddeg * 60);
    ddeg -= imin.val / 60.0;
    isec.val = Math.floor(ddeg * 3600);
    if ((roundflag & (Swe.SE_SPLIT_DEG_ROUND_DEG | Swe.SE_SPLIT_DEG_ROUND_MIN | Swe.SE_SPLIT_DEG_ROUND_SEC))==0) {
      dsecfr.val = ddeg * 3600 - isec.val;
    }
  }  /* end split_deg */

  swe_set_astro_models(imodel) {
    //int *pmodel = &(swed.astro_models[0]);
    //memcpy(pmodel, imodel, SEI_NMODELS * sizeof(int32));
    this.swed.astro_models = imodel;
  }

  swi_strcpy(to, from) {
    return from;
  }

  swi_strncpy(to, from, n) { 
    return from.substring(0, Math.min(from.length(), n));
  }
//////////////////////////////////////////////////////////////////////////////
// swejpl.c: /////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

  /*************************************
  double to int32 with rounding, no overflow check
  *************************************/
  swe_d2l(x) {
    if (x >=0.) {
      return (Math.floor(x + 0.5));
    } else {
      return (- Math.floor(0.5 - x));
    }
  }


  swe_difdeg2n(p1, p2) {
    var dif;
    dif = this.swe_degnorm(p1 - p2);
    if (dif  >= 180.0) {
      return (dif - 360.0);
    }
    return (dif);
  }

  swe_difrad2n(p1, p2) {
    var dif;
    dif = this.swe_radnorm(p1 - p2);
    if (dif  >= Swe.SwephData.TWOPI / 2) {
      return (dif - Swe.SwephData.TWOPI);
    }
    return (dif);
  }


  atof(src) {
    var idx=0;
    src=src.trim();
    while(idx<src.length() &&
         (Character.isDigit(src.charAt(idx)) || src.charAt(idx)=='.')) {
      idx++;
    }
    var sout=src.substring(0,idx).trim();
    if (sout.length()==0 || sout.replace('.',' ').trim().length()==0) {
      return 0.;
    }
    return Double.valueOf(sout).doubleValue();
  }


  atoi(src) {
    var idx=0;
    src=src.trim();
    while(idx<src.length() && Character.isDigit(src.charAt(idx))) {
      idx++;
    }
    var sout=src.substring(0,idx).trim();
    if (sout.length()==0 || sout.replace('.',' ').trim().length()==0) {
      return 0;
    }
    return Integer.valueOf(sout).intValue();
  }
}

class Swemmoon{

  constructor(swed, sl){
    this.swed=swed;
    this.sl=sl;
    if (this.swed ===undefined) { this.swed = Swe.SwissData; }
    if (this.sl   ===undefined) { this.sl   =new SwissLib(); }


    /* The following coefficients were calculated by a simultaneous least
     * squares fit between the analytical theory and DE404 on the finite
     * interval from -3000 to +3000.
     * The coefficients were estimated from 34,247 Lunar positions.
     */
    this.z = [
      /* The following are scaled in arc seconds, time in Julian centuries.
         They replace the corresponding terms in the mean elements.  */
      -1.312045233711e+01, /* F, t^2 */
      -1.138215912580e-03, /* F, t^3 */
      -9.646018347184e-06, /* F, t^4 */
       3.146734198839e+01, /* l, t^2 */
       4.768357585780e-02, /* l, t^3 */
      -3.421689790404e-04, /* l, t^4 */
      -6.847070905410e+00, /* D, t^2 */
      -5.834100476561e-03, /* D, t^3 */
      -2.905334122698e-04, /* D, t^4 */
      -5.663161722088e+00, /* L, t^2 */
       5.722859298199e-03, /* L, t^3 */
      -8.466472828815e-05, /* L, t^4 */
      /* The following longitude terms are in arc seconds times 10^5.  */
      -8.429817796435e+01, /* t^2 Math.cos(18V - 16E - l) */
      -2.072552484689e+02, /* t^2 Math.sin(18V - 16E - l) */
       7.876842214863e+00, /* t^2 Math.cos(10V - 3E - l) */
       1.836463749022e+00, /* t^2 Math.sin(10V - 3E - l) */
      -1.557471855361e+01, /* t^2 Math.cos(8V - 13E) */
      -2.006969124724e+01, /* t^2 Math.sin(8V - 13E) */
       2.152670284757e+01, /* t^2 Math.cos(4E - 8M + 3J) */
      -6.179946916139e+00, /* t^2 Math.sin(4E - 8M + 3J) */
      -9.070028191196e-01, /* t^2 Math.cos(18V - 16E) */
      -1.270848233038e+01, /* t^2 Math.sin(18V - 16E) */
      -2.145589319058e+00, /* t^2 Math.cos(2J - 5S) */
       1.381936399935e+01, /* t^2 Math.sin(2J - 5S) */
      -1.999840061168e+00, /* t^3 Math.sin(l') */
    ];


    /* Perturbation tables
     */
    this.NLR=118;
    this.LR=[
      /*
                     Longitude    Radius
       D  l' l  F    1"  .0001"  1km  .0001km */

       0, 0, 1, 0, 22639, 5858,-20905,-3550,
       2, 0,-1, 0,  4586, 4383, -3699,-1109,
       2, 0, 0, 0,  2369, 9139, -2955,-9676,
       0, 0, 2, 0,   769,  257,  -569,-9251,
       0, 1, 0, 0,  -666,-4171,    48, 8883,
       0, 0, 0, 2,  -411,-5957,    -3,-1483,
       2, 0,-2, 0,   211, 6556,   246, 1585,
       2,-1,-1, 0,   205, 4358,  -152,-1377,
       2, 0, 1, 0,   191, 9562,  -170,-7331,
       2,-1, 0, 0,   164, 7285,  -204,-5860,
       0, 1,-1, 0,  -147,-3213,  -129,-6201,
       1, 0, 0, 0,  -124,-9881,   108, 7427,
       0, 1, 1, 0,  -109,-3803,   104, 7552,
       2, 0, 0,-2,    55, 1771,    10, 3211,
       0, 0, 1, 2,   -45, -996,     0,    0,
       0, 0, 1,-2,    39, 5333,    79, 6606,
       4, 0,-1, 0,    38, 4298,   -34,-7825,
       0, 0, 3, 0,    36, 1238,   -23,-2104,
       4, 0,-2, 0,    30, 7726,   -21,-6363,
       2, 1,-1, 0,   -28,-3971,    24, 2085,
       2, 1, 0, 0,   -24,-3582,    30, 8238,
       1, 0,-1, 0,   -18,-5847,    -8,-3791,
       1, 1, 0, 0,    17, 9545,   -16,-6747,
       2,-1, 1, 0,    14, 5303,   -12,-8314,
       2, 0, 2, 0,    14, 3797,   -10,-4448,
       4, 0, 0, 0,    13, 8991,   -11,-6500,
       2, 0,-3, 0,    13, 1941,    14, 4027,
       0, 1,-2, 0,    -9,-6791,    -7,  -27,
       2, 0,-1, 2,    -9,-3659,     0, 7740,
       2,-1,-2, 0,     8, 6055,    10,  562,
       1, 0, 1, 0,    -8,-4531,     6, 3220,
       2,-2, 0, 0,     8,  502,    -9,-8845,
       0, 1, 2, 0,    -7,-6302,     5, 7509,
       0, 2, 0, 0,    -7,-4475,     1,  657,
       2,-2,-1, 0,     7, 3712,    -4,-9501,
       2, 0, 1,-2,    -6,-3832,     4, 1311,
       2, 0, 0, 2,    -5,-7416,     0,    0,
       4,-1,-1, 0,     4, 3740,    -3,-9580,
       0, 0, 2, 2,    -3,-9976,     0,    0,
       3, 0,-1, 0,    -3,-2097,     3, 2582,
       2, 1, 1, 0,    -2,-9145,     2, 6164,
       4,-1,-2, 0,     2, 7319,    -1,-8970,
       0, 2,-1, 0,    -2,-5679,    -2,-1171,
       2, 2,-1, 0,    -2,-5212,     2, 3536,
       2, 1,-2, 0,     2, 4889,     0, 1437,
       2,-1, 0,-2,     2, 1461,     0, 6571,
       4, 0, 1, 0,     1, 9777,    -1,-4226,
       0, 0, 4, 0,     1, 9337,    -1,-1169,
       4,-1, 0, 0,     1, 8708,    -1,-5714,
       1, 0,-2, 0,    -1,-7530,    -1,-7385,
       2, 1, 0,-2,    -1,-4372,     0,-1357,
       0, 0, 2,-2,    -1,-3726,    -4,-4212,
       1, 1, 1, 0,     1, 2618,     0,-9333,
       3, 0,-2, 0,    -1,-2241,     0, 8624,
       4, 0,-3, 0,     1, 1868,     0,-5142,
       2,-1, 2, 0,     1, 1770,     0,-8488,
       0, 2, 1, 0,    -1,-1617,     1, 1655,
       1, 1,-1, 0,     1,  777,     0, 8512,
       2, 0, 3, 0,     1,  595,     0,-6697,
       2, 0, 1, 2,     0,-9902,     0,    0,
       2, 0,-4, 0,     0, 9483,     0, 7785,
       2,-2, 1, 0,     0, 7517,     0,-6575,
       0, 1,-3, 0,     0,-6694,     0,-4224,
       4, 1,-1, 0,     0,-6352,     0, 5788,
       1, 0, 2, 0,     0,-5840,     0, 3785,
       1, 0, 0,-2,     0,-5833,     0,-7956,
       6, 0,-2, 0,     0, 5716,     0,-4225,
       2, 0,-2,-2,     0,-5606,     0, 4726,
       1,-1, 0, 0,     0,-5569,     0, 4976,
       0, 1, 3, 0,     0,-5459,     0, 3551,
       2, 0,-2, 2,     0,-5357,     0, 7740,
       2, 0,-1,-2,     0, 1790,     8, 7516,
       3, 0, 0, 0,     0, 4042,    -1,-4189,
       2,-1,-3, 0,     0, 4784,     0, 4950,
       2,-1, 3, 0,     0,  932,     0, -585,
       2, 0, 2,-2,     0,-4538,     0, 2840,
       2,-1,-1, 2,     0,-4262,     0,  373,
       0, 0, 0, 4,     0, 4203,     0,    0,
       0, 1, 0, 2,     0, 4134,     0,-1580,
       6, 0,-1, 0,     0, 3945,     0,-2866,
       2,-1, 0, 2,     0,-3821,     0,    0,
       2,-1, 1,-2,     0,-3745,     0, 2094,
       4, 1,-2, 0,     0,-3576,     0, 2370,
       1, 1,-2, 0,     0, 3497,     0, 3323,
       2,-3, 0, 0,     0, 3398,     0,-4107,
       0, 0, 3, 2,     0,-3286,     0,    0,
       4,-2,-1, 0,     0,-3087,     0,-2790,
       0, 1,-1,-2,     0, 3015,     0,    0,
       4, 0,-1,-2,     0, 3009,     0,-3218,
       2,-2,-2, 0,     0, 2942,     0, 3430,
       6, 0,-3, 0,     0, 2925,     0,-1832,
       2, 1, 2, 0,     0,-2902,     0, 2125,
       4, 1, 0, 0,     0,-2891,     0, 2445,
       4,-1, 1, 0,     0, 2825,     0,-2029,
       3, 1,-1, 0,     0, 2737,     0,-2126,
       0, 1, 1, 2,     0, 2634,     0,    0,
       1, 0, 0, 2,     0, 2543,     0,    0,
       3, 0, 0,-2,     0,-2530,     0, 2010,
       2, 2,-2, 0,     0,-2499,     0,-1089,
       2,-3,-1, 0,     0, 2469,     0,-1481,
       3,-1,-1, 0,     0,-2314,     0, 2556,
       4, 0, 2, 0,     0, 2185,     0,-1392,
       4, 0,-1, 2,     0,-2013,     0, 0,
       0, 2,-2, 0,     0,-1931,     0, 0,
       2, 2, 0, 0,     0,-1858,     0, 0,
       2, 1,-3, 0,     0, 1762,     0, 0,
       4, 0,-2, 2,     0,-1698,     0, 0,
       4,-2,-2, 0,     0, 1578,     0,-1083,
       4,-2, 0, 0,     0, 1522,     0,-1281,
       3, 1, 0, 0,     0, 1499,     0,-1077,
       1,-1,-1, 0,     0,-1364,     0, 1141,
       1,-3, 0, 0,     0,-1281,     0, 0,
       6, 0, 0, 0,     0, 1261,     0, -859,
       2, 0, 2, 2,     0,-1239,     0, 0,
       1,-1, 1, 0,     0,-1207,     0, 1100,
       0, 0, 5, 0,     0, 1110,     0, -589,
       0, 3, 0, 0,     0,-1013,     0,  213,
       4,-1,-3, 0,     0,  998,     0, 0,
    ];

    this.NMB=77;
    this.MB=[
      /*
                     Latitude
       D  l' l  F    1"  .0001" */

       0, 0, 0, 1,18461, 2387,
       0, 0, 1, 1, 1010, 1671,
       0, 0, 1,-1,  999, 6936,
       2, 0, 0,-1,  623, 6524,
       2, 0,-1, 1,  199, 4837,
       2, 0,-1,-1,  166, 5741,
       2, 0, 0, 1,  117, 2607,
       0, 0, 2, 1,   61, 9120,
       2, 0, 1,-1,   33, 3572,
       0, 0, 2,-1,   31, 7597,
       2,-1, 0,-1,   29, 5766,
       2, 0,-2,-1,   15, 5663,
       2, 0, 1, 1,   15, 1216,
       2, 1, 0,-1,  -12, -941,
       2,-1,-1, 1,    8, 8681,
       2,-1, 0, 1,    7, 9586,
       2,-1,-1,-1,    7, 4346,
       0, 1,-1,-1,   -6,-7314,
       4, 0,-1,-1,    6, 5796,
       0, 1, 0, 1,   -6,-4601,
       0, 0, 0, 3,   -6,-2965,
       0, 1,-1, 1,   -5,-6324,
       1, 0, 0, 1,   -5,-3684,
       0, 1, 1, 1,   -5,-3113,
       0, 1, 1,-1,   -5, -759,
       0, 1, 0,-1,   -4,-8396,
       1, 0, 0,-1,   -4,-8057,
       0, 0, 3, 1,    3, 9841,
       4, 0, 0,-1,    3, 6745,
       4, 0,-1, 1,    2, 9985,
       0, 0, 1,-3,    2, 7986,
       4, 0,-2, 1,    2, 4139,
       2, 0, 0,-3,    2, 1863,
       2, 0, 2,-1,    2, 1462,
       2,-1, 1,-1,    1, 7660,
       2, 0,-2, 1,   -1,-6244,
       0, 0, 3,-1,    1, 5813,
       2, 0, 2, 1,    1, 5198,
       2, 0,-3,-1,    1, 5156,
       2, 1,-1, 1,   -1,-3178,
       2, 1, 0, 1,   -1,-2643,
       4, 0, 0, 1,    1, 1919,
       2,-1, 1, 1,    1, 1346,
       2,-2, 0,-1,    1,  859,
       0, 0, 1, 3,   -1, -194,
       2, 1, 1,-1,    0,-8227,
       1, 1, 0,-1,    0, 8042,
       1, 1, 0, 1,    0, 8026,
       0, 1,-2,-1,    0,-7932,
       2, 1,-1,-1,    0,-7910,
       1, 0, 1, 1,    0,-6674,
       2,-1,-2,-1,    0, 6502,
       0, 1, 2, 1,    0,-6388,
       4, 0,-2,-1,    0, 6337,
       4,-1,-1,-1,    0, 5958,
       1, 0, 1,-1,    0,-5889,
       4, 0, 1,-1,    0, 4734,
       1, 0,-1,-1,    0,-4299,
       4,-1, 0,-1,    0, 4149,
       2,-2, 0, 1,    0, 3835,
       3, 0, 0,-1,    0,-3518,
       4,-1,-1, 1,    0, 3388,
       2, 0,-1,-3,    0, 3291,
       2,-2,-1, 1,    0, 3147,
       0, 1, 2,-1,    0,-3129,
       3, 0,-1,-1,    0,-3052,
       0, 1,-2, 1,    0,-3013,
       2, 0, 1,-3,    0,-2912,
       2,-2,-1,-1,    0, 2686,
       0, 0, 4, 1,    0, 2633,
       2, 0,-3, 1,    0, 2541,
       2, 0,-1, 3,    0,-2448,
       2, 1, 1, 1,    0,-2370,
       4,-1,-2, 1,    0, 2138,
       4, 0, 1, 1,    0, 2126,
       3, 0,-1, 1,    0,-2059,
       4, 1,-1,-1,    0,-1719,
    ];

    this.NLRT=38;
    this.LRT=[
      /*
      Multiply by T
                     Longitude    Radius
       D  l' l  F   .1"  .00001" .1km  .00001km */

       0, 1, 0, 0,    16, 7680,    -1,-2302,
       2,-1,-1, 0,    -5,-1642,     3, 8245,
       2,-1, 0, 0,    -4,-1383,     5, 1395,
       0, 1,-1, 0,     3, 7115,     3, 2654,
       0, 1, 1, 0,     2, 7560,    -2,-6396,
       2, 1,-1, 0,     0, 7118,     0,-6068,
       2, 1, 0, 0,     0, 6128,     0,-7754,
       1, 1, 0, 0,     0,-4516,     0, 4194,
       2,-2, 0, 0,     0,-4048,     0, 4970,
       0, 2, 0, 0,     0, 3747,     0, -540,
       2,-2,-1, 0,     0,-3707,     0, 2490,
       2,-1, 1, 0,     0,-3649,     0, 3222,
       0, 1,-2, 0,     0, 2438,     0, 1760,
       2,-1,-2, 0,     0,-2165,     0,-2530,
       0, 1, 2, 0,     0, 1923,     0,-1450,
       0, 2,-1, 0,     0, 1292,     0, 1070,
       2, 2,-1, 0,     0, 1271,     0,-6070,
       4,-1,-1, 0,     0,-1098,     0,  990,
       2, 0, 0, 0,     0, 1073,     0,-1360,
       2, 0,-1, 0,     0,  839,     0, -630,
       2, 1, 1, 0,     0,  734,     0, -660,
       4,-1,-2, 0,     0, -688,     0,  480,
       2, 1,-2, 0,     0, -630,     0,    0,
       0, 2, 1, 0,     0,  587,     0, -590,
       2,-1, 0,-2,     0, -540,     0, -170,
       4,-1, 0, 0,     0, -468,     0,  390,
       2,-2, 1, 0,     0, -378,     0,  330,
       2, 1, 0,-2,     0,  364,     0,    0,
       1, 1, 1, 0,     0, -317,     0,  240,
       2,-1, 2, 0,     0, -295,     0,  210,
       1, 1,-1, 0,     0, -270,     0, -210,
       2,-3, 0, 0,     0, -256,     0,  310,
       2,-3,-1, 0,     0, -187,     0,  110,
       0, 1,-3, 0,     0,  169,     0,  110,
       4, 1,-1, 0,     0,  158,     0, -150,
       4,-2,-1, 0,     0, -155,     0,  140,
       0, 0, 1, 0,     0,  155,     0, -250,
       2,-2,-2, 0,     0, -148,     0, -170,
    ];

    this.NBT=16;
    this.BT=[
      /*
      Multiply by T
                   Latitude
       D  l' l  F  .00001"  */

       2,-1, 0,-1, -7430,
       2, 1, 0,-1,  3043,
       2,-1,-1, 1, -2229,
       2,-1, 0, 1, -1999,
       2,-1,-1,-1, -1869,
       0, 1,-1,-1,  1696,
       0, 1, 0, 1,  1623,
       0, 1,-1, 1,  1418,
       0, 1, 1, 1,  1339,
       0, 1, 1,-1,  1278,
       0, 1, 0,-1,  1217,
       2,-2, 0,-1,  -547,
       2,-1, 1,-1,  -443,
       2, 1,-1, 1,   331,
       2, 1, 0, 1,   317,
       2, 0, 0,-1,   295,
    ];

    this.NLRT2=25;
    this.LRT2=[
      /*
      Multiply by T^2
                 Longitude    Radius
       D  l' l  F  .00001" .00001km   */

       0, 1, 0, 0,  487,   -36,
       2,-1,-1, 0, -150,   111,
       2,-1, 0, 0, -120,   149,
       0, 1,-1, 0,  108,    95,
       0, 1, 1, 0,   80,   -77,
       2, 1,-1, 0,   21,   -18,
       2, 1, 0, 0,   20,   -23,
       1, 1, 0, 0,  -13,    12,
       2,-2, 0, 0,  -12,    14,
       2,-1, 1, 0,  -11,     9,
       2,-2,-1, 0,  -11,     7,
       0, 2, 0, 0,   11,     0,
       2,-1,-2, 0,   -6,    -7,
       0, 1,-2, 0,    7,     5,
       0, 1, 2, 0,    6,    -4,
       2, 2,-1, 0,    5,    -3,
       0, 2,-1, 0,    5,     3,
       4,-1,-1, 0,   -3,     3,
       2, 0, 0, 0,    3,    -4,
       4,-1,-2, 0,   -2,     0,
       2, 1,-2, 0,   -2,     0,
       2,-1, 0,-2,   -2,     0,
       2, 1, 1, 0,    2,    -2,
       2, 0,-1, 0,    2,     0,
       0, 2, 1, 0,    2,     0,
    ];

    this.NBT2=12;
    this.BT2=[
      /*
      Multiply by T^2
                 Latitiude
       D  l' l  F  .00001" */

       2,-1, 0,-1,  -22,
       2, 1, 0,-1,    9,
       2,-1, 0, 1,   -6,
       2,-1,-1, 1,   -6,
       2,-1,-1,-1,   -5,
       0, 1, 0, 1,    5,
       0, 1,-1,-1,    5,
       0, 1, 1, 1,    4,
       0, 1, 1,-1,    4,
       0, 1, 0,-1,    4,
       0, 1,-1, 1,    4,
       2,-2, 0,-1,   -2,
    ];

    /* corrections for mean lunar node in degrees, from -13100 to 17200,
     * in 100-year steps. corrections are set to 0 between the years 0 and 3000 */
    this.mean_node_corr = [
    -2.56,
    -2.473, -2.392347, -2.316425, -2.239639, -2.167764, -2.095100, -2.024810, -1.957622, -1.890097, -1.826389,
    -1.763335, -1.701047, -1.643016, -1.584186, -1.527309, -1.473352, -1.418917, -1.367736, -1.317202, -1.267269,
    -1.221121, -1.174218, -1.128862, -1.086214, -1.042998, -1.002491, -0.962635, -0.923176, -0.887191, -0.850403,
    -0.814929, -0.782117, -0.748462, -0.717241, -0.686598, -0.656013, -0.628726, -0.600460, -0.573219, -0.548634,
    -0.522931, -0.499285, -0.476273, -0.452978, -0.432663, -0.411386, -0.390788, -0.372825, -0.353681, -0.336230,
    -0.319520, -0.302343, -0.287794, -0.272262, -0.257166, -0.244534, -0.230635, -0.218126, -0.206365, -0.194000,
    -0.183876, -0.172782, -0.161877, -0.153254, -0.143371, -0.134501, -0.126552, -0.117932, -0.111199, -0.103716,
    -0.096160, -0.090718, -0.084046, -0.078007, -0.072959, -0.067235, -0.062990, -0.058102, -0.053070, -0.049786,
    -0.045381, -0.041317, -0.038165, -0.034501, -0.031871, -0.028844, -0.025701, -0.024018, -0.021427, -0.018881,
    -0.017291, -0.015186, -0.013755, -0.012098, -0.010261, -0.009688, -0.008218, -0.006670, -0.005979, -0.004756,
    -0.003991, -0.002996, -0.001974, -0.001975, -0.001213, -0.000377, -0.000356, 5.779e-05, 0.000378, 0.000710,
    0.001092, 0.000767, 0.000985, 0.001443, 0.001069, 0.001141, 0.001321, 0.001462, 0.001695, 0.001319,
    0.001567, 0.001873, 0.001376, 0.001336, 0.001347, 0.001330, 0.001256, 0.000813, 0.000946, 0.001079,
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    -0.000364, -0.000452, -0.001091, -0.001159, -0.001136, -0.001798, -0.002249, -0.002622, -0.002990, -0.003555,
    -0.004425, -0.004758, -0.005134, -0.006065, -0.006839, -0.007474, -0.008283, -0.009411, -0.010786, -0.011810,
    -0.012989, -0.014825, -0.016426, -0.017922, -0.019774, -0.021881, -0.024194, -0.026190, -0.028440, -0.031285,
    -0.033817, -0.036318, -0.039212, -0.042456, -0.045799, -0.048994, -0.052710, -0.056948, -0.061017, -0.065181,
    -0.069843, -0.074922, -0.079976, -0.085052, -0.090755, -0.096840, -0.102797, -0.108939, -0.115568, -0.122636,
    -0.129593, -0.136683, -0.144641, -0.152825, -0.161044, -0.169758, -0.178916, -0.188712, -0.198401, -0.208312,
    -0.219395, -0.230407, -0.241577, -0.253508, -0.265640, -0.278556, -0.291330, -0.304353, -0.318815, -0.332882,
    -0.347316, -0.362895, -0.378421, -0.395061, -0.411748, -0.428666, -0.447477, -0.465636, -0.484277, -0.504600,
    -0.524405, -0.545533, -0.567020, -0.588404, -0.612099, -0.634965, -0.658262, -0.683866, -0.708526, -0.734719,
    -0.761800, -0.788562, -0.818092, -0.846885, -0.876177, -0.908385, -0.939371, -0.972027, -1.006149, -1.039634,
    -1.076135, -1.112156, -1.148490, -1.188312, -1.226761, -1.266821, -1.309156, -1.350583, -1.395223, -1.440028,
    -1.485047, -1.534104, -1.582023, -1.631506, -1.684031, -1.735687, -1.790421, -1.846039, -1.901951, -1.961872,
    -2.021179, -2.081987, -2.146259, -2.210031, -2.276609, -2.344904, -2.413795, -2.486559, -2.559564, -2.634215,
    -2.712692, -2.791289, -2.872533, -2.956217, -3.040965, -3.129234, -3.218545, -3.309805, -3.404827, -3.5008,
    -3.601, -3.7, -3.8,
    ];

    /* corrections for mean lunar apsides in degrees, from -13100 to 17200,
     * in 100-year steps. corrections are set to 0 between the years 0 and 3000 */
    this.mean_apsis_corr = [
      7.525,
      7.290, 7.057295, 6.830813, 6.611723, 6.396775, 6.189569, 5.985968, 5.788342, 5.597304, 5.410167,
      5.229946, 5.053389, 4.882187, 4.716494, 4.553532, 4.396734, 4.243718, 4.094282, 3.950865, 3.810366,
      3.674978, 3.543284, 3.414270, 3.290526, 3.168775, 3.050904, 2.937541, 2.826189, 2.719822, 2.616193,
      2.515431, 2.419193, 2.323782, 2.232545, 2.143635, 2.056803, 1.974913, 1.893874, 1.816201, 1.741957,
      1.668083, 1.598335, 1.529645, 1.463016, 1.399693, 1.336905, 1.278097, 1.220965, 1.165092, 1.113071,
      1.060858, 1.011007, 0.963701, 0.916523, 0.872887, 0.829596, 0.788486, 0.750017, 0.711177, 0.675589,
      0.640303, 0.605303, 0.573490, 0.541113, 0.511482, 0.483159, 0.455210, 0.430305, 0.404643, 0.380782,
      0.358524, 0.335405, 0.315244, 0.295131, 0.275766, 0.259223, 0.241586, 0.225890, 0.210404, 0.194775,
      0.181573, 0.167246, 0.154514, 0.143435, 0.131131, 0.121648, 0.111835, 0.102474, 0.094284, 0.085204,
      0.078240, 0.070697, 0.063696, 0.058894, 0.052390, 0.047632, 0.043129, 0.037823, 0.034143, 0.029188,
      0.025648, 0.021972, 0.018348, 0.017127, 0.013989, 0.011967, 0.011003, 0.007865, 0.007033, 0.005574,
      0.004060, 0.003699, 0.002465, 0.002889, 0.002144, 0.001018, 0.001757, -9.67e-05, -0.000734, -0.000392,
      -0.001546, -0.000863, -0.001266, -0.000933, -0.000503, -0.001304, 0.000238, -0.000507, -0.000897, 0.000647,
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      0.000514, 0.000683, 0.002228, 0.001974, 0.003485, 0.004280, 0.005409, 0.007468, 0.007938, 0.011012,
      0.012525, 0.013757, 0.016757, 0.017932, 0.020780, 0.023416, 0.026386, 0.030428, 0.033512, 0.038789,
      0.043126, 0.047778, 0.054175, 0.058891, 0.065878, 0.072345, 0.079668, 0.088238, 0.095307, 0.104873,
      0.113533, 0.122336, 0.133205, 0.142922, 0.154871, 0.166488, 0.179234, 0.193928, 0.207262, 0.223089,
      0.238736, 0.254907, 0.273232, 0.291085, 0.311046, 0.331025, 0.351955, 0.374422, 0.396341, 0.420772,
      0.444867, 0.469984, 0.497448, 0.524717, 0.554752, 0.584581, 0.616272, 0.649744, 0.682947, 0.719405,
      0.755834, 0.793780, 0.833875, 0.873893, 0.917340, 0.960429, 1.005471, 1.052384, 1.099317, 1.149508,
      1.200130, 1.253038, 1.307672, 1.363480, 1.422592, 1.481900, 1.544111, 1.607982, 1.672954, 1.741025,
      1.809727, 1.882038, 1.955243, 2.029956, 2.108428, 2.186805, 2.268697, 2.352071, 2.437370, 2.525903,
      2.615415, 2.709082, 2.804198, 2.901704, 3.002606, 3.104412, 3.210406, 3.317733, 3.428386, 3.541634,
      3.656634, 3.775988, 3.896306, 4.020480, 4.146814, 4.275356, 4.408257, 4.542282, 4.681174, 4.822524,
      4.966424, 5.114948, 5.264973, 5.419906, 5.577056, 5.737688, 5.902347, 6.069138, 6.241065, 6.415155,
      6.593317, 6.774853, 6.959322, 7.148845, 7.340334, 7.537156, 7.737358, 7.940882, 8.149932, 8.361576,
      8.579150, 8.799591, 9.024378, 9.254584, 9.487362, 9.726535, 9.968784, 10.216089, 10.467716, 10.725293,
      10.986, 11.25, 11.52,
    ];


    /* The following times are set up by update() and refer
     * to the same instant.  The distinction between them
     * is required by altaz().
     */
    this.ss = new Array(5);
    for(var i=0; i<5; i++){
      this.ss[i] = new Array(8).fill(0.0);
    }
    this.cc = new Array(5);
    for(var i=0; i<5; i++){
      this.cc[i] = new Array(8).fill(0.0);
    }

    this.l;                /* Moon's ecliptic longitude */
    this.B;                /* Ecliptic latitude */

    this.moonpol = new Array(3);

    /* Orbit calculation begins.
     */
    this.SWELP;
    this.M;
    this.MP;
    this.D;
    this.NF;
    this.T;
    this.T2;
    this.T3;
    this.T4;
    this.f;
    this.g;
    this.Ve;
    this.Ea;
    this.Ma;
    this.Ju;
    this.Sa;
    this.cg;
    this.sg;
    this.l1;
    this.l2;
    this.l3;
    this.l4;

    this.CORR_MAPOG_JD_T0GREG = -3063616.5;   /* 1 jan -13100 greg. */
    this.CORR_MAPOG_JD_T1GREG = 1209720.5;   /* 1 jan  -1400 greg. */
    this.CORR_MAPOG_JD_T2GREG = 2780263.5;   /* 1 jan   2900 greg. */
    this.CORR_MAPOG_JD_T3GREG = 7930182.5;   /* 1 jan  17000 greg. */

    this.CORR_MNODE_JD_T0GREG = -3063616.5;   /* 1 jan -13100 greg. */
    this.CORR_MNODE_JD_T1GREG =   844477.5;   /* 1 jan  -2400 jul. */
    this.CORR_MNODE_JD_T2GREG =  2780263.5;   /* 1 jan   2900 jul. */
    this.CORR_MNODE_JD_T3GREG =  7930182.5;   /* 1 jan  17000 greg. */

  }

  /* Calculate geometric coordinates of Moon
   * without light time or nutation correction.
   */
  swi_moshmoon2(J, pol) {
    this.T = (J-Swe.SwephData.J2000)/36525.0;
    this.T2 = this.T*this.T;
    this.mean_elements();
    this.mean_elements_pl();
    this.moon1();
    this.moon2();
    this.moon3();
    this.moon4();
    for(var i=0; i<3; i++ ){
      pol[i] = this.moonpol[i];
    }
    return(0);
  }

  /* Moshier's moom
   * tjd          julian day
   * xpm          array of 6 doubles for moon's position and speed vectors
   */
  swi_moshmoon(tjd, do_save, xpmret) {
    var a = new Array(6);
    var b = new Array(6);
    var x1 = new Array(6);
    var x2 = new Array(6);
    var t = 0.0;
    var xx = new Array(6);
    var xpm = 0.0;
    var pdp = this.swed.pldat[Swe.SwephData.SEI_MOON];
    if (do_save) {
      xpm = pdp.x;
    } else {
      xpm = xx;
    }
    /* allow 0.2 day tolerance so that true node interval fits in */
    if (tjd < Swe.SwephData.MOSHLUEPH_START - 0.2 || tjd > Swe.SwephData.MOSHLUEPH_END + 0.2) {
      var s="jd "+tjd+" outside Moshier's Moon range "+
          Swe.SwephData.MOSHLUEPH_START+" .. "+
          Swe.SwephData.MOSHLUEPH_END+" ";
      console.error(s);
      return(Swe.ERR);
    }
    /* if moon has already been computed */
    if (tjd == pdp.teval && pdp.iephe == Swe.SEFLG_MOSEPH) {
      if (xpmret != null) {
        for (var i = 0; i <= 5; i++) {
          xpmret[i] = pdp.x[i];
        }
      }
      return(Swe.OK);
    }
    /* else compute moon */
    this.swi_moshmoon2(tjd, xpm);
    if (do_save) {
      pdp.teval = tjd;
      pdp.xflgs = -1;
      pdp.iephe = Swe.SEFLG_MOSEPH;
    }

    this.ecldat_equ2000(tjd, xpm);
    t = tjd + Swe.SwephData.MOON_SPEED_INTV;
    this.swi_moshmoon2(t, x1);
    this.ecldat_equ2000(t, x1);
    t = tjd - Swe.SwephData.MOON_SPEED_INTV;
    this.swi_moshmoon2(t, x2);
    this.ecldat_equ2000(t, x2);
    for (var i = 0; i <= 2; i++) {
      b = (x1[i] - x2[i]) / 2;
      a = (x1[i] + x2[i]) / 2 - xpm[i];
      xpm[i+3] = (2 * a + b) / Swe.SwephData.MOON_SPEED_INTV;
    }
    if (xpmret != null) {
      for(var i = 0; i <= 5; i++) {
        xpmret[i] = xpm[i];
      }
    }
    return(Swe.OK);
  }

  moon1() {
    var a;
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 8; j++) {
        this.ss[i][j] = 0;
        this.cc[i][j] = 0;
      }
    }
    /* End of code addition */
    this.sscc( 0, Swe.SwephData.STR*this.D, 6 );
    this.sscc( 1, Swe.SwephData.STR*this.M,  4 );
    this.sscc( 2, Swe.SwephData.STR*this.MP, 4 );
    this.sscc( 3, Swe.SwephData.STR*this.NF, 4 );
    this.moonpol[0] = 0.0;
    this.moonpol[1] = 0.0;
    this.moonpol[2] = 0.0;
    /* terms in T^2, scale 1.0 = 10^-5" */
    this.chewm( this.LRT2, this.NLRT2, 4, 2, this.moonpol );
    this.chewm( this.BT2, this.NBT2, 4, 4, this.moonpol );
    this.f = 18 * this.Ve - 16 * this.Ea;
    this.g = Swe.SwephData.STR*(this.f - this.MP );  /* 18V - 16E - l */
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l = 6.367278 * this.cg + 12.747036 * this.sg;  /* t^0 */
    this.l1 = 23123.70 * this.cg - 10570.02 * this.sg;  /* t^1 */
    this.l2 = this.z[12] * this.cg + this.z[13] * this.sg;        /* t^2 */
    this.moonpol[2] += 5.01 * this.cg + 2.72 * this.sg;
    this.g = Swe.SwephData.STR * (10.*this.Ve - 3.*this.Ea - this.MP);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += -0.253102 * this.cg + 0.503359 * this.sg;
    this.l1 += 1258.46 * this.cg + 707.29 * this.sg;
    this.l2 += this.z[14] * this.cg + this.z[15] * this.sg;
    this.g = Swe.SwephData.STR*(8.*this.Ve - 13.*this.Ea);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += -0.187231 * this.cg - 0.127481 * this.sg;
    this.l1 += -319.87 * this.cg - 18.34 * this.sg;
    this.l2 += this.z[16] * this.cg + this.z[17] * this.sg;
    a = 4.0*this.Ea - 8.0*this.Ma + 3.0*this.Ju;
    this.g = Swe.SwephData.STR * a;
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += -0.866287 * this.cg + 0.248192 * this.sg;
    this.l1 += 41.87 * this.cg + 1053.97 * this.sg;
    this.l2 += this.z[18] * this.cg + this.z[19] * this.sg;
    this.g = Swe.SwephData.STR*(a - this.MP);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += -0.165009 * this.cg + 0.044176 * this.sg;
    this.l1 += 4.67 * this.cg + 201.55 * this.sg;
    this.g = Swe.SwephData.STR*this.f;  /* 18V - 16E */
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += 0.330401 * this.cg + 0.661362 * this.sg;
    this.l1 += 1202.67 * this.cg - 555.59 * this.sg;
    this.l2 += this.z[20] * this.cg + this.z[21] * this.sg;
    this.g = Swe.SwephData.STR*(this.f - 2.0*this.MP );  /* 18V - 16E - 2l */
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += 0.352185 * this.cg + 0.705041 * this.sg;
    this.l1 += 1283.59 * this.cg - 586.43 * this.sg;
    this.g = Swe.SwephData.STR * (2.0*this.Ju - 5.0*this.Sa);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += -0.034700 * this.cg + 0.160041 * this.sg;
    this.l2 += this.z[22] * this.cg + this.z[23] * this.sg;
    this.g = Swe.SwephData.STR * (this.SWELP - this.NF);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += 0.000116 * this.cg + 7.063040 * this.sg;
    this.l1 +=  298.8 * this.sg;
    /* T^3 terms */
    this.sg = Math.sin( Swe.SwephData.STR * this.M );
    /* l3 +=  this.z[24] * sg;                   moshier! l3 not initialized! */
    this.l3 =  this.z[24] * this.sg;
    this.l4 = 0;
    this.g = Swe.SwephData.STR * (2.0*this.D - this.M);
    this.sg = Math.sin(this.g);
    this.cg = Math.cos(this.g);
    this.moonpol[2] +=  -0.2655 * this.cg * this.T;
    this.g = Swe.SwephData.STR * (this.M - this.MP);
    this.moonpol[2] +=  -0.1568 * Math.cos( this.g ) * this.T;
    this.g = Swe.SwephData.STR * (this.M + this.MP);
    this.moonpol[2] +=  0.1309 * Math.cos( this.g ) * this.T;
    this.g = Swe.SwephData.STR * (2.0*(this.D + this.M) - this.MP);
    this.sg = Math.sin(this.g);
    this.cg = Math.cos(this.g);
    this.moonpol[2] +=   0.5568 * this.cg * this.T;
    this.l2 += this.moonpol[0];
    this.g = Swe.SwephData.STR*(2.0*this.D - this.M - this.MP);
    this.moonpol[2] +=  -0.1910 * Math.cos( this.g ) * this.T;
    this.moonpol[1] *= this.T;
    this.moonpol[2] *= this.T;
    /* terms in T */
    this.moonpol[0] = 0.0;
    this.chewm( this.BT, this.NBT, 4, 4, this.moonpol );
    this.chewm( this.LRT, this.NLRT, 4, 1, this.moonpol );
    this.g = Swe.SwephData.STR*(this.f - this.MP - this.NF - 2355767.6); /* 18V - 16E - l - F */
    this.moonpol[1] +=  -1127. * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.f - this.MP + this.NF - 235353.6); /* 18V - 16E - l + F */
    this.moonpol[1] +=  -1123. * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ea + this.D + 51987.6);
    this.moonpol[1] +=  1303. * Math.sin(this.g);
    this.g = Swe.SwephData.STR*this.SWELP;
    this.moonpol[1] +=  342. * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(2.*this.Ve - 3.*this.Ea);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l +=  -0.343550 * this.cg - 0.000276 * this.sg;
    this.l1 +=  105.90 * this.cg + 336.53 * this.sg;
    this.g = Swe.SwephData.STR*(this.f - 2.*this.D); /* 18V - 16E - 2D */
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += 0.074668 * this.cg + 0.149501 * this.sg;
    this.l1 += 271.77 * this.cg - 124.20 * this.sg;
    this.g = Swe.SwephData.STR*(this.f - 2.*this.D - this.MP);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += 0.073444 * this.cg + 0.147094 * this.sg;
    this.l1 += 265.24 * this.cg - 121.16 * this.sg;
    this.g = Swe.SwephData.STR*(this.f + 2.*this.D - this.MP);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += 0.072844 * this.cg + 0.145829 * this.sg;
    this.l1 += 265.18 * this.cg - 121.29 * this.sg;
    this.g = Swe.SwephData.STR*(this.f + 2.*(this.D - this.MP));
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += 0.070201 * this.cg + 0.140542 * this.sg;
    this.l1 += 255.36 * this.cg - 116.79 * this.sg;
    this.g = Swe.SwephData.STR*(this.Ea + this.D - this.NF);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += 0.288209 * this.cg - 0.025901 * this.sg;
    this.l1 += -63.51 * this.cg - 240.14 * this.sg;
    this.g = Swe.SwephData.STR*(2.*this.Ea - 3.*this.Ju + 2.*this.D - this.MP);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += 0.077865 * this.cg + 0.438460 * this.sg;
    this.l1 += 210.57 * this.cg + 124.84 * this.sg;
    this.g = Swe.SwephData.STR*(this.Ea - 2.*this.Ma);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += -0.216579 * this.cg + 0.241702 * this.sg;
    this.l1 += 197.67 * this.cg + 125.23 * this.sg;
    this.g = Swe.SwephData.STR*(a + this.MP);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += -0.165009 * this.cg + 0.044176 * this.sg;
    this.l1 += 4.67 * this.cg + 201.55 * this.sg;
    this.g = Swe.SwephData.STR*(a + 2.*this.D - this.MP);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += -0.133533 * this.cg + 0.041116 * this.sg;
    this.l1 +=  6.95 * this.cg + 187.07 * this.sg;
    this.g = Swe.SwephData.STR*(a - 2.*this.D + this.MP);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += -0.133430 * this.cg + 0.041079 * this.sg;
    this.l1 +=  6.28 * this.cg + 169.08 * this.sg;
    this.g = Swe.SwephData.STR*(3.*this.Ve - 4.*this.Ea);
    this.cg = Math.cos(this.g);
    this.sg = Math.sin(this.g);
    this.l += -0.175074 * this.cg + 0.003035 * this.sg;
    this.l1 +=  49.17 * this.cg + 150.57 * this.sg;
    this.g = Swe.SwephData.STR*(2.*(this.Ea + this.D - this.MP) - 3.*this.Ju + 213534.);
    this.l1 +=  158.4 * Math.sin(this.g);
    this.l1 += this.moonpol[0];
    a = 0.1 * this.T; /* set amplitude scale of 1.0 = 10^-4 arcsec */
    this.moonpol[1] *= a;
    this.moonpol[2] *= a;
  }

  moon2() {
    /* terms in T^0 */
    this.g = Swe.SwephData.STR*(2*(this.Ea-this.Ju+this.D)-this.MP+648431.172);
    this.l += 1.14307 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ve-this.Ea+648035.568);
    this.l += 0.82155 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(3*(this.Ve-this.Ea)+2*this.D-this.MP+647933.184);
    this.l += 0.64371 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ea-this.Ju+4424.04);
    this.l += 0.63880 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.SWELP + this.MP - this.NF + 4.68);
    this.l += 0.49331 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.SWELP - this.MP - this.NF + 4.68);
    this.l += 0.4914 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.SWELP+this.NF+2.52);
    this.l += 0.36061 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(2.*this.Ve - 2.*this.Ea + 736.2);
    this.l += 0.30154 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(2.*this.Ea - 3.*this.Ju + 2.*this.D - 2.*this.MP + 36138.2);
    this.l += 0.28282 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(2.*this.Ea - 2.*this.Ju + 2.*this.D - 2.*this.MP + 311.0);
    this.l += 0.24516 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ea - this.Ju - 2.*this.D + this.MP + 6275.88);
    this.l += 0.21117 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(2.*(this.Ea - this.Ma) - 846.36);
    this.l += 0.19444 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(2.*(this.Ea - this.Ju) + 1569.96);
    this.l -= 0.18457 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(2.*(this.Ea - this.Ju) - this.MP - 55.8);
    this.l += 0.18256 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ea - this.Ju - 2.*this.D + 6490.08);
    this.l += 0.16499 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ea - 2.*this.Ju - 212378.4);
    this.l += 0.16427 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(2.*(this.Ve - this.Ea - this.D) + this.MP + 1122.48);
    this.l += 0.16088 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ve - this.Ea - this.MP + 32.04);
    this.l -= 0.15350 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ea - this.Ju - this.MP + 4488.88);
    this.l += 0.14346 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(2.*(this.Ve - this.Ea + this.D) - this.MP - 8.64);
    this.l += 0.13594 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(2.*(this.Ve - this.Ea - this.D) + 1319.76);
    this.l += 0.13432 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ve - this.Ea - 2.*this.D + this.MP - 56.16);
    this.l -= 0.13122 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ve - this.Ea + this.MP + 54.36);
    this.l -= 0.12722 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(3.*(this.Ve - this.Ea) - this.MP + 433.8);
    this.l += 0.12539 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ea - this.Ju + this.MP + 4002.12);
    this.l += 0.10994 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(20.*this.Ve - 21.*this.Ea - 2.*this.D + this.MP - 317511.72);
    this.l += 0.10652 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(26.*this.Ve - 29.*this.Ea - this.MP + 270002.52);
    this.l += 0.10490 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(3.*this.Ve - 4.*this.Ea + this.D - this.MP - 322765.56);
    this.l += 0.10386 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.SWELP+648002.556);
    this.B =  8.04508 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.Ea+this.D+996048.252);
    this.B += 1.51021 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.f - this.MP + this.NF + 95554.332);
    this.B += 0.63037 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.f - this.MP - this.NF + 95553.792);
    this.B += 0.63014 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.SWELP - this.MP + 2.9);
    this.B +=  0.45587 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.SWELP + this.MP + 2.5);
    this.B +=  -0.41573 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.SWELP - 2.0*this.NF + 3.2);
    this.B +=  0.32623 * Math.sin(this.g);
    this.g = Swe.SwephData.STR*(this.SWELP - 2.0*this.D + 2.5);
    this.B +=  0.29855 * Math.sin(this.g);
  }

  moon3() {
    /* terms in T^0 */
    this.moonpol[0] = 0.0;
    this.chewm( this.LR, this.NLR, 4, 1, this.moonpol );
    this.chewm( this.MB, this.NMB, 4, 3, this.moonpol );
    this.l += (((this.l4 * this.T + this.l3) * this.T + this.l2) * this.T + this.l1) * this.T * 1.0e-5;
    this.moonpol[0] = this.SWELP + this.l + 1.0e-4 * this.moonpol[0];
    this.moonpol[1] = 1.0e-4 * this.moonpol[1] + this.B;
    this.moonpol[2] = 1.0e-4 * this.moonpol[2] + 385000.52899; /* kilometers */
  }


  /* Compute final ecliptic polar coordinates
   */
  moon4() {
    this.moonpol[2] /= Swe.AUNIT / 1000;
    this.moonpol[0] = Swe.SwephData.STR * this.mods3600( this.moonpol[0] );
    this.moonpol[1] = Swe.SwephData.STR * this.moonpol[1];
    this.B = this.moonpol[1];
  }

  corr_mean_node(J) {
    var J0, dJ, dayscty, dcor, dcor0, dcor1, dfrac;
    var i;
    J0 = this.CORR_MNODE_JD_T0GREG; /* 1-jan--13000 greg */
    dayscty = 36524.25; /* days per Gregorian century */
    if (J < Swe.SwephData.JPL_DE431_START) return 0;
    if (J > Swe.SwephData.JPL_DE431_END) return 0;
  /*if (J > this.CORR_MNODE_JD_T1GREG && J < this.CORR_MNODE_JD_T2GREG) return 0;*/
    dJ = J - J0;
    i = Math.floor(dJ / dayscty); /* centuries = index of lower correction value */
    dfrac = (dJ - i * dayscty) / dayscty;
    dcor0 = this.mean_node_corr[i];
    dcor1 = this.mean_node_corr[i + 1];
    dcor = dcor0 + dfrac * (dcor1 - dcor0);
    return dcor;
  }

  swi_mean_node(J, pol, offs) {
    if(offs === undefined){
      return this.swi_mean_node(J, pol, 0);
    }

    var dcor;
    this.T = (J-Swe.SwephData.J2000)/36525.0;
    this.T2 = this.T*this.T;
    this.T3 = this.T*this.T2;
    this.T4 = this.T2*this.T2;
    /* with elements from swi_moshmoon2(), which are fitted to jpl-ephemeris */
    if (J < Swe.SwephData.MOSHNDEPH_START || J > Swe.SwephData.MOSHNDEPH_END) {
      var s="jd "+J+" outside mean node range "+
                Swe.SwephData.MOSHNDEPH_START+" .. "+
                Swe.SwephData.MOSHNDEPH_END+" ";
      console.error(s);
      return Swe.ERR;
    }
    this.mean_elements();
    dcor = this.corr_mean_node(J) * 3600;
    /* longitude */
    pol[offs] = this.sl.swi_mod2PI((this.SWELP - this.NF - dcor) * Swe.SwephData.STR);
    /* latitude */
    pol[offs+1] = 0.0;
    /* distance */
    pol[offs+2] = Swe.SwephData.MOON_MEAN_DIST / Swe.AUNIT; /* or should it be derived from mean
                                      * orbital ellipse? */
    return Swe.OK;
  }


  corr_mean_apog(J) {
    var J0, dJ, dayscty, dcor, dcor0, dcor1, dfrac;
    var i;
    J0 = this.CORR_MAPOG_JD_T0GREG; /* 1-jan--13000 greg */
    dayscty = 36524.25; /* days per Gregorian century */
    if (J < Swe.SwephData.JPL_DE431_START) return 0;
    if (J > Swe.SwephData.JPL_DE431_END) return 0;
    /*if (J > this.CORR_MAPOG_JD_T1GREG && J < this.CORR_MAPOG_JD_T2GREG) return 0;*/
    dJ = J - J0;
    i = Math.floor(dJ / dayscty); /* centuries = index of lower correction value */
    dfrac = (dJ - i * dayscty) / dayscty;
    dcor0 = this.mean_apsis_corr[i];
    dcor1 = this.mean_apsis_corr[i + 1];
    dcor = dcor0 + dfrac * (dcor1 - dcor0);
    return dcor;
  }

  swi_mean_apog(J, pol, offs) {
    if(offs === undefined){
      return this.swi_mean_apog(J, pol, 0);
    }

    var node, dcor;
    this.T = (J-Swe.SwephData.J2000)/36525.0;
    this.T2 = this.T*this.T;
    this.T3 = this.T*this.T2;
    this.T4 = this.T2*this.T2;
    /* with elements from swi_moshmoon2(), which are fitted to jpl-ephemeris */
    if (J < Swe.SwephData.MOSHNDEPH_START || J > Swe.SwephData.MOSHNDEPH_END) {
      var s="jd "+J+" outside mean apogee range "+
                Swe.SwephData.MOSHNDEPH_START+" .. "+
                Swe.SwephData.MOSHNDEPH_END+" ";
      console.error(s);
      return Swe.ERR;
    }
    this.mean_elements();
    pol[offs] = this.sl.swi_mod2PI((this.SWELP - this.MP) * Swe.SwephData.STR + Math.PI);
    pol[offs+1] = 0;
    pol[offs+2] = Swe.SwephData.MOON_MEAN_DIST * (1 + Swe.SwephData.MOON_MEAN_ECC) / Swe.AUNIT; /* apogee */
    dcor = this.corr_mean_apog(J) * Swe.SwissData.DEGTORAD;
    pol[offs] = this.sl.swi_mod2PI(pol[offs] - dcor);
    /* apogee is now projected onto ecliptic */
    node = (this.SWELP - this.NF) * Swe.SwephData.STR;
    dcor = this.corr_mean_node(J) * Swe.SwissData.DEGTORAD;
    node = this.sl.swi_mod2PI(node - dcor);
    pol[offs] = this.sl.swi_mod2PI(pol[offs] - node);
    this.sl.swi_polcart(pol, offs, pol, offs);
    this.sl.swi_coortrf(pol, offs, pol, offs, -Swe.SwephData.MOON_MEAN_INCL * Swe.SwissData.DEGTORAD);
    this.sl.swi_cartpol(pol, offs, pol, offs);
    pol[offs] = this.sl.swi_mod2PI(pol[offs] + node);
    return Swe.OK;
  }

  /* Program to step through the perturbation table
   */
  chewm(pt, nlines, nangles, typflg, ans ) {
    var npt=0;
    var i, j, k, k1, m;
    var cu, su, cv, sv, ff;
    for( i=0; i<nlines; i++ ) {
      k1 = 0;
      sv = 0.0;
      cv = 0.0;
      for( m=0; m<nangles; m++ ) {
        j = pt[npt++]; /* multiple angle factor */
        if( j!=0 ) {
          k = j;
          if( j < 0 ) {
            k = -k; /* make angle factor > 0 */
          }
          /* sin, cos (k*angle) from lookup table */
          su = this.ss[m][k-1];
          cu = this.cc[m][k-1];
          if( j < 0 ) {
            su = -su; /* negative angle factor */
          }
          if( k1 == 0 ) {
            /* Set sin, cos of first angle. */
            sv = su;
            cv = cu;
            k1 = 1;
          }
          else {
            /* Combine angles by trigonometry. */
            ff =  su*cv + cu*sv;
            cv = cu*cv - su*sv;
            sv = ff;
          }
        }
      }
      /* Accumulate
       */
      switch( typflg ) {
      /* large longitude and radius */
      case 1:
        j = pt[npt++];
        k = pt[npt++];
        ans[0] += (10000.0 * j  + k) * sv;
        j = pt[npt++];
        k = pt[npt++];
        if( k!=0 ) {
          ans[2] += (10000.0 * j  + k) * cv;
        }
        break;
      /* longitude and radius */
      case 2:
        j = pt[npt++];
        k = pt[npt++];
        ans[0] += j * sv;
        ans[2] += k * cv;
        break;
      /* large latitude */
      case 3:
        j = pt[npt++];
        k = pt[npt++];
        ans[1] += ( 10000.0*j + k)*sv;
        break;
      /* latitude */
      case 4:
        j = pt[npt++];
        ans[1] += j * sv;
        break;
      }
    }
  }

  /* Prepare lookup table of sin and cos ( i*Lj )
   * for required multiple angles
   */
  sscc(k, arg, n ) {
    var cu, su, cv, sv, s;
    var i;
    su = Math.sin(arg);
    cu = Math.cos(arg);
    this.ss[k][0] = su;                        /* sin(L) */
    this.cc[k][0] = cu;                        /* cos(L) */
    sv = 2.0*su*cu;
    cv = cu*cu - su*su;
    this.ss[k][1] = sv;                        /* sin(2L) */
    this.cc[k][1] = cv;
    for( i=2; i<n; i++ ) {
      s =  su*cv + cu*sv;
      cv = cu*cv - su*sv;
      sv = s;
      this.ss[k][i] = sv;              /* sin( i+1 L ) */
      this.cc[k][i] = cv;
    }
  }

  /* converts from polar coordinates of ecliptic of date
   *          to   cartesian coordinates of equator 2000
   * tjd          date
   * x            array of position
   */
  ecldat_equ2000(tjd, xpm) {
    /* cartesian */
    this.sl.swi_polcart(xpm, xpm);
    /* equatorial */
    this.sl.swi_coortrf2(xpm, xpm, -this.swed.oec.seps, this.swed.oec.ceps);
    /* j2000 */
    this.sl.swi_precess(xpm, tjd, 0, Swe.SwephData.J_TO_J2000);/**/
  }

  /* Reduce arc seconds modulo 360 degrees
   * answer in arc seconds
   */
  mods3600(x) {
    var lx;
    lx = x;
    lx = lx - 1296000.0 * Math.floor( lx/1296000.0 );
    return( lx );
  }

  mean_elements() {
    var fracT = this.T%1.;
    /* Mean anomaly of sun = l' (J. Laskar) */
    this.M =  this.mods3600(129600000.0 * fracT - 3418.961646 * this.T +  1287104.76154);
    this.M += ((((((((
      1.62e-20 * this.T
    - 1.0390e-17 ) * this.T
    - 3.83508e-15 ) * this.T
    + 4.237343e-13 ) * this.T
    + 8.8555011e-11 ) * this.T
    - 4.77258489e-8 ) * this.T
    - 1.1297037031e-5 ) * this.T
    + 1.4732069041e-4 ) * this.T
    - 0.552891801772 ) * this.T2;

    /* Mean distance of moon from its ascending node = F */
    /*NF = mods3600((1739527263.0983 - 2.079419901760e-01) * T +335779.55755);*/
    this.NF = this.mods3600(1739232000.0 * fracT + 295263.0983 * this.T -
                  2.079419901760e-01 * this.T + 335779.55755);
    /* Mean anomaly of moon = l */
    this.MP = this.mods3600(1717200000.0 * fracT + 715923.4728 * this.T -
                  2.035946368532e-01 * this.T + 485868.28096);
    /* Mean elongation of moon = D */
    this.D = this.mods3600(1601856000.0 * fracT + 1105601.4603 * this.T +
                 3.962893294503e-01 * this.T + 1072260.73512);
    /* Mean longitude of moon, referred to the mean ecliptic and equinox of date */
    this.SWELP = this.mods3600(1731456000.0 * fracT + 1108372.83264 * this.T - 6.784914260953e-01 * this.T +  785939.95571);
    /* Higher degree secular terms found by least squares fit */
    this.NF += ((this.z[2]*this.T + this.z[1])*this.T + this.z[0])*this.T2;
    this.MP += ((this.z[5]*this.T + this.z[4])*this.T + this.z[3])*this.T2;
    this.D  += ((this.z[8]*this.T + this.z[7])*this.T + this.z[6])*this.T2;
    this.SWELP += ((this.z[11]*this.T + this.z[10])*this.T + this.z[9])*this.T2;
  }
  
  mean_elements_pl() {
    /* Mean longitudes of planets (Laskar, Bretagnon) */
    this.Ve = this.mods3600( 210664136.4335482 * this.T + 655127.283046 );
    this.Ve += ((((((((
      -9.36e-023 * this.T
     - 1.95e-20 ) * this.T
     + 6.097e-18 ) * this.T
     + 4.43201e-15 ) * this.T
     + 2.509418e-13 ) * this.T
     - 3.0622898e-10 ) * this.T
     - 2.26602516e-9 ) * this.T
     - 1.4244812531e-5 ) * this.T
     + 0.005871373088 ) * this.T2;
    this.Ea = this.mods3600( 129597742.26669231  * this.T +  361679.214649 );
    this.Ea += (((((((( -1.16e-22 * this.T
     + 2.976e-19 ) * this.T
     + 2.8460e-17 ) * this.T
     - 1.08402e-14 ) * this.T
     - 1.226182e-12 ) * this.T
     + 1.7228268e-10 ) * this.T
     + 1.515912254e-7 ) * this.T
     + 8.863982531e-6 ) * this.T
     - 2.0199859001e-2 ) * this.T2;
    this.Ma = this.mods3600(  68905077.59284 * this.T + 1279559.78866 );
    this.Ma += (-1.043e-5*this.T + 9.38012e-3)*this.T2;
    this.Ju = this.mods3600( 10925660.428608 * this.T +  123665.342120 );
    this.Ju += (1.543273e-5*this.T - 3.06037836351e-1)*this.T2;
    this.Sa = this.mods3600( 4399609.65932 * this.T + 180278.89694 );
    this.Sa += (( 4.475946e-8*this.T - 6.874806E-5 ) * this.T + 7.56161437443E-1)*this.T2;
  }
  
  /* Calculate geometric coordinates of true interpolated Moon apsides
   */
  swi_intp_apsides(J, pol, ipli) {
    var dd;
    var rsv = new Array(3);
    var sNF, sD, sLP, sMP, sM, sVe, sEa, sMa, sJu, sSa, fM, fVe, fEa, fMa, fJu, fSa, cMP, zMP, fNF, fD, fLP;
    var dMP, mLP, mNF, mD, mMP;
    var i, ii, iii, niter = 4;    /* niter: silence compiler warning */
    ii=1;
    zMP=27.55454988;
    fNF = 27.212220817/zMP;/**/
    fD  = 29.530588835/zMP;/**/
    fLP = 27.321582/zMP;/**/
    fM  = 365.2596359/zMP;
    fVe = 224.7008001/zMP;
    fEa = 365.2563629/zMP;
    fMa = 686.9798519/zMP;
    fJu = 4332.589348/zMP;
    fSa = 10759.22722/zMP;
    this.T = (J-Swe.SwephData.J2000)/36525.0;
    this.T2 = this.T*this.T;
    this.T4 = this.T2*this.T2;
    this.mean_elements();
    this.mean_elements_pl();
    sNF = this.NF;
    sD  = this.D;
    sLP = this.SWELP;
    sMP = this.MP;
    sM  = this.M ;
    sVe = this.Ve;
    sEa = this.Ea;
    sMa = this.Ma;
    sJu = this.Ju;
    sSa = this.Sa;
    sNF = this.mods3600(this.NF);
    sD  = this.mods3600(this.D);
    sLP = this.mods3600(this.SWELP);
    sMP = this.mods3600(this.MP);
    if (ipli == Swe.SwephData.SEI_INTP_PERG) {this.MP = 0.0; niter = 5;}
    if (ipli == Swe.SwephData.SEI_INTP_APOG) {this.MP = 648000.0; niter = 4;}
    cMP = 0;
    dd = 18000.0;
    for (iii= 0; iii<=niter; iii++) {/**/
      dMP = sMP - this.MP;
      mLP = sLP - dMP;
      mNF = sNF - dMP;
      mD  = sD  - dMP;
      mMP = sMP - dMP;
      for (ii = 0; ii <=2; ii++) {/**/
        this.MP = mMP + (ii-1)*dd;       /**/
        NF = mNF + (ii-1)*dd/fNF;
        this.D  = mD  + (ii-1)*dd/fD;
        this.SWELP = mLP + (ii-1)*dd/fLP;
        this.M  = sM  + (ii-1)*dd/fM ;
        this.Ve = sVe + (ii-1)*dd/fVe;
        this.Ea = sEa + (ii-1)*dd/fEa;
        this.Ma = sMa + (ii-1)*dd/fMa;
        this.Ju = sJu + (ii-1)*dd/fJu;
        this.Sa = sSa + (ii-1)*dd/fSa;
        this.moon1();
        this.moon2();
        this.moon3();
        this.moon4();
        if (ii==1) {
          for( i=0; i<3; i++ ) pol[i] = this.moonpol[i];
        }
        rsv[ii] = this.moonpol[2];
      }
      cMP = (1.5*rsv[0] - 2*rsv[1] + 0.5*rsv[2]) / (rsv[0] + rsv[2] - 2*rsv[1]);/**/
      cMP *= dd;
      cMP = cMP - dd;
      mMP += cMP;
      this.MP = mMP;
      dd /= 10;
    }
    return(0);
  }

}

class SwemptabMer{
  constructor(){

  this.mertabl = [
          35.85255,        -163.26379, 53810162857.56026,      908082.18475,

           0.05214,          -0.07712,

           1.07258,           0.04008,           0.49259,           0.00230,
           0.02324,           0.05869,

           0.24516,           0.22898,          -0.06037,           0.13023,

           0.00331,          -0.03576,

           0.06464,           0.00089,

           0.03103,           0.05078,

          -0.01133,           0.01520,

           0.14654,           0.07538,           0.25112,          -0.24473,
          -0.17928,          -0.53366,

          -0.06367,           0.20458,          -0.42985,           0.14848,
          -0.35317,          -0.61364,

           0.00325,          -0.08617,          -0.23180,           0.08576,
           0.22995,           0.43569,

           1.92114,           2.89319,          -5.55637,           4.70329,
          -4.91411,          -5.45521,

           0.02607,           0.04468,

          -0.05439,           0.13476,          -0.07329,          -0.00985,

          -0.00278,           0.05377,

           0.07474,          -0.09658,           0.29818,           0.20422,
          -0.29074,           0.44962,

          -0.15411,          -0.04287,           0.29907,          -1.02948,
           3.62183,           0.84869,

          -0.08157,           0.02754,

          -0.03610,          -0.12909,           0.09195,          -0.04424,

          -0.08845,           0.09347,

          -0.27140,           0.08185,

           0.24783,           0.19543,          -0.25154,           0.41371,

          -0.00046,           0.01524,

           0.04127,           0.06663,

           0.43023,           0.11790,

           0.04427,           0.05329,

           0.00411,          -0.71074,

          -0.07111,          -0.09824,

           0.01264,          -0.02075,

          -0.00068,          -0.01678,

           0.01186,           0.00181,

           0.00302,          -0.21963,

          -0.06412,          -0.10155,          -0.36856,           0.20240,
           0.32282,           0.65133,

          -0.07178,          -0.01876,           0.13399,          -0.39522,
           1.28413,           0.33790,

           0.05040,          -0.01679,

          -0.00794,           0.01117,

           0.02630,           0.00575,

          -0.07113,          -0.11414,           0.16422,          -0.23060,
           0.35198,           0.05409,

           1.11486,          -0.35833,           0.87313,           1.66304,
          -1.28434,           0.72067,

           0.01400,           0.00971,

           0.21044,          -0.87385,           3.20820,           0.67957,

          -0.01716,           0.00111,

          -0.13776,          -0.02650,

          -0.06778,           0.00908,           0.00616,          -0.04520,

          -0.31625,          -0.61913,

           0.36184,           0.09373,

           0.00984,          -0.03292,

           0.01944,           0.00530,

           0.00243,          -0.00123,

           0.01589,           0.02223,

          -0.02992,          -0.01086,

        4356.04809,       -5859.86328,        2918.27323,       -4796.67315,
         510.24783,       -1220.02233,         127.48927,         250.10654,
        3250.43013,        -904.27614,       -5667.40042,      -22634.00922,
      -82471.79425,       18615.92342,

           0.01941,           0.00372,

           0.01830,          -0.00652,

          -0.02548,          -0.01157,

           0.00635,           0.02343,

          -0.00980,           0.00961,

           0.12137,           0.10068,           0.16676,          -0.07257,

          -0.07267,          -0.13761,           0.25305,          -0.28112,

          -0.07974,           0.07866,

          -0.41726,           0.49991,          -1.55187,          -1.14150,
           1.54754,          -2.35141,

          -0.00862,           0.00808,

           0.00218,          -0.03726,

           0.06914,          -0.08986,

          -0.00501,           2.09577,

          -0.01409,          -0.01842,

           0.04138,           0.05961,

          -0.12276,          -0.04929,

          -0.03963,          -0.06080,

          -0.27697,          -0.09329,

          -0.01011,           0.00295,

          -0.01374,           0.01328,

          -0.00171,           0.25815,

           0.01446,           0.00782,

           0.17909,          -0.04683,

           0.03765,          -0.04990,

           0.00036,           0.00528,

           0.05508,          -0.01369,

          -0.11751,          -0.10624,          -0.14448,           0.10522,

          -0.00884,           0.43006,

           0.01162,           0.01659,

          -0.00076,           0.10143,

           0.55779,           0.05510,           0.12350,          -0.34025,

           0.01320,           0.92985,
          -0.00026,          -0.03426,

           0.01305,           0.00041,

           0.13187,          -0.11903,

           0.00058,           0.09877,

         -33.10230,         -41.96782,        -268.28908,         174.29259,
         731.20089,        1508.07639,        5223.99114,       -3008.08849,
       -3909.34957,       -9646.69156,

           0.02988,           0.03182,

           0.07149,           0.04513,

          -0.02356,          -0.01641,

          -0.03188,          -0.03711,           0.15084,          -0.22436,
           0.61987,           0.25706,

           0.02425,           0.01200,

          -0.05543,          -0.14435,          -0.53398,           0.10997,

           0.00465,          -0.01893,

           0.01260,          -0.01314,

           0.00650,          -0.05499,

          -0.06804,           0.01608,

           0.02134,           0.04160,

           0.00636,           0.01293,

          -0.03470,          -0.02697,

          -0.11323,           0.02409,

          -0.02618,           0.00827,

           0.01879,           0.16838,           0.08978,           0.01934,

          -0.23564,           0.05565,

           0.03686,           0.02644,

          -0.02471,           0.00558,

        -140.22669,        -120.40692,        -501.88143,         434.05868,
        1044.54998,        1162.72084,        1527.78437,        -882.37371,

          -0.00768,           0.02213,

          -0.04090,           0.16718,

          -0.05923,          -0.12595,

           0.01154,          -0.00025,

          -0.00776,          -0.01653,

          -0.01213,          -0.02773,

           0.00344,           0.02180,

          -0.02558,          -0.05682,

          -0.00490,           0.01050,

          38.75496,         -78.17502,        -189.90700,        -136.33371,
        -249.94062,         319.76423,         205.73478,         272.64549,

          -0.01132,          -0.01071,          -0.04607,          -0.00390,

           0.02903,          -0.02070,

           0.01326,          -0.00901,

          35.38435,           7.45358,          31.08987,         -70.52685,
         -92.13879,         -51.58876,         -51.80016,          48.98102,

          -0.00124,          -0.01159,

           0.47335,          13.71886,          23.71637,           5.55804,
          10.06850,         -25.65292,         -11.85300,         -10.20802,

          -4.72861,           1.27151,          -0.47322,           7.46754,
           6.99528,           1.79089,           2.05336,          -2.90866,

          -1.97528,           0.72236,          -0.25084,           1.90269,
           0.72127,           0.41354,

          -0.30286,          -0.53125,          -0.50883,          -0.01200,
          -0.08301,           0.18083,

          -0.04286,          -0.10963,          -0.04544,          -0.01645,

          -0.00013,          -0.00986,

  ];
  this.mertabb = [
          68.33369,         422.77623,       -2057.26405,       -2522.29068,

          -0.00030,          -0.00009,

           0.02400,          -0.06471,           0.02074,          -0.00904,
           0.00044,           0.00261,

          -0.00174,          -0.00088,          -0.00027,           0.00003,

           0.00005,          -0.00004,

          -0.00036,           0.00200,

           0.01432,           0.01199,

           0.00006,          -0.00004,

           0.00236,           0.00803,           0.01235,           0.00406,
          -0.03253,           0.00179,

          -0.00243,           0.00132,          -0.00352,           0.00011,
          -0.00146,          -0.01154,

           0.00824,          -0.01195,          -0.01829,          -0.00465,
           0.12540,           0.09997,

           0.00400,           0.00288,          -0.02848,           0.01094,
          -0.02273,          -0.07051,

           0.01305,           0.01078,

          -0.00119,           0.00136,          -0.00107,          -0.00066,

           0.00097,          -0.00315,

           0.00120,           0.00430,          -0.00710,          -0.00157,
           0.06052,          -0.04777,

           0.00192,          -0.00229,          -0.02077,           0.00647,
           0.06907,           0.07644,

          -0.00717,           0.00451,

           0.00052,          -0.00262,           0.00345,           0.00039,

          -0.00674,           0.00346,

          -0.02880,           0.00807,

           0.00054,           0.00206,          -0.01745,           0.00517,

          -0.00044,           0.00049,

           0.01749,           0.01230,

           0.01703,           0.01563,

           0.00934,           0.02372,

           0.01610,          -0.01136,

           0.00186,          -0.00503,

           0.00082,          -0.00673,

           0.00170,          -0.00539,

           0.00042,           0.00037,

           0.00415,          -0.00430,

           0.00258,          -0.00914,          -0.01761,          -0.00251,
           0.15909,           0.13276,

           0.02436,          -0.00791,           0.00491,           0.03890,
          -0.02982,           0.05645,

          -0.00003,           0.00427,

          -0.00363,           0.00221,

           0.00077,           0.00130,

           0.00131,          -0.00071,           0.00796,           0.00453,
           0.01186,           0.01631,

           0.12949,          -0.02546,           0.03613,           0.32854,
          -0.43001,           0.01417,

           0.00034,           0.00095,

          -0.03268,           0.04034,           0.11407,           0.15049,

          -0.00079,          -0.00052,

          -0.04009,           0.00988,

          -0.00259,          -0.00085,           0.00221,          -0.00133,

           0.00003,          -0.01733,

           0.01055,           0.01976,

           0.00222,           0.00085,

           0.00089,           0.00087,

           0.00014,           0.00001,

           0.00145,           0.00802,

           0.00122,           0.00068,

         947.79367,       -1654.39690,         542.00864,       -1281.09901,
          90.02068,        -318.36115,         -87.67090,          92.91960,
         376.98232,        -419.10705,        5094.60412,        2476.97098,
      -18160.57888,       16010.48165,

           0.00621,          -0.00128,

           0.00186,          -0.00153,

          -0.00790,           0.00011,

          -0.00032,           0.00165,

          -0.00277,           0.00539,

           0.00552,           0.00682,           0.01086,          -0.00978,

          -0.02292,          -0.01300,           0.02940,          -0.04427,

          -0.02051,           0.04860,

          -0.05020,           0.29089,          -0.50763,          -0.04900,
           0.11177,          -0.41357,

          -0.00222,           0.00504,

          -0.00006,          -0.00459,

          -0.00175,          -0.02691,

           0.05921,           0.18938,

          -0.00181,          -0.00154,

           0.00322,           0.00586,

          -0.01098,          -0.00520,

          -0.00861,          -0.01342,

          -0.02694,          -0.00706,

          -0.00103,           0.00012,

          -0.00284,           0.00797,

           0.00743,           0.02523,

           0.00872,           0.00096,

           0.03155,          -0.01644,

           0.00414,          -0.00583,

           0.00029,           0.00066,

           0.00935,          -0.00619,

          -0.02498,          -0.01600,          -0.03545,           0.07623,

           0.01649,           0.06498,

           0.00148,           0.00209,

           0.00621,           0.02014,

           0.17407,          -0.05022,          -0.03485,          -0.17012,

           0.06164,           0.20059,

          -0.00804,          -0.01475,

           0.00296,          -0.00068,

           0.01880,          -0.03797,

           0.00608,           0.02270,

           5.89651,          -6.62562,         -37.41057,         -10.51542,
         -47.22373,          95.76862,         494.45951,          -5.37252,
       -3991.04809,       -2886.97750,

           0.01232,           0.00487,

           0.03163,           0.00561,

          -0.01847,          -0.00207,

          -0.10138,           0.01430,          -0.04269,          -0.22338,
           0.24955,          -0.02066,

           0.01119,          -0.00186,

           0.03416,           0.01805,          -0.12498,           0.10385,

          -0.00210,          -0.01011,

           0.00346,          -0.00682,

          -0.00683,          -0.02227,

          -0.01649,           0.01259,

           0.01392,           0.01174,

           0.00440,           0.00351,

          -0.02871,          -0.00375,

          -0.03170,           0.02246,

          -0.00833,           0.00596,
           0.04081,           0.06666,           0.05400,          -0.02387,

          -0.07852,           0.05781,

           0.01881,           0.00324,

          -0.00868,           0.00606,

          -6.52157,         -19.74446,         -72.46009,          43.12366,
         321.78233,         215.45201,         452.61804,       -1025.05619,

           0.00119,           0.01169,

           0.02239,           0.09003,

          -0.05329,          -0.03974,

           0.00688,          -0.00421,

          -0.00676,          -0.00515,

          -0.01171,          -0.00952,

           0.01337,           0.01270,

          -0.02791,          -0.02184,

           0.00058,           0.00679,

           8.42102,         -11.87757,         -49.07247,         -25.34584,
         -43.54829,         161.26509,         261.70993,          56.25777,

           0.00568,           0.00871,          -0.02656,           0.01582,

           0.00875,          -0.02114,

           0.00464,          -0.01075,

           9.08966,           1.37810,           3.44548,         -27.44651,
         -59.62749,          -0.73611,          -0.77613,          65.72607,

          -0.00664,          -0.00723,

           1.04214,           4.78920,          11.67397,          -1.84524,
          -4.16685,         -19.14211,         -16.14483,           3.02496,

          -1.98140,           1.16261,           1.81526,           4.21224,
           5.59020,          -2.55741,          -1.54151,          -3.85817,

          -1.08723,           1.23372,           1.12378,           1.51554,
           0.88937,          -0.57631,

          -0.50549,          -0.25617,          -0.37618,           0.42163,
           0.18902,           0.19575,

          -0.15402,          -0.04062,          -0.04017,           0.05717,

          -0.01665,          -0.00199,

  ];
  this.mertabr = [
          -8.30490,         -11.68232,          86.54880,        4361.05018,

           0.00002,          -0.00001,

          -0.01102,           0.00410,           0.00007,          -0.00276,
           0.00117,           0.00082,

           0.00049,           0.00007,           0.00003,          -0.00001,

           0.00012,           0.00005,

          -0.00186,          -0.00534,

          -0.03301,           0.01808,

           0.00008,           0.00005,

          -0.00394,           0.00202,           0.02362,          -0.00359,
           0.00638,          -0.06767,

           0.00422,          -0.00493,           0.00660,           0.00513,
          -0.00417,           0.00708,

           0.05849,          -0.00213,          -0.07647,          -0.16162,
          -0.30551,           0.13856,

          -0.02789,           0.01811,          -0.04155,          -0.06229,
           0.05729,          -0.03694,

          -0.03087,           0.01610,

          -0.00297,          -0.00167,           0.00041,          -0.00157,

          -0.00115,           0.00058,

           0.00796,           0.00436,          -0.01393,           0.02921,
          -0.05902,          -0.02363,

           0.00459,          -0.01512,           0.10038,           0.02964,
          -0.08369,           0.34570,

          -0.00749,          -0.02653,

           0.01361,          -0.00326,           0.00406,           0.00952,

          -0.00594,          -0.00829,

          -0.02763,          -0.09933,

          -0.04143,           0.05152,          -0.08436,          -0.05294,

          -0.00329,          -0.00016,

          -0.04340,           0.02566,

          -0.03027,           0.10904,

           0.03665,          -0.03070,

           0.23525,           0.00182,

           0.03092,          -0.02212,

           0.01255,           0.00777,

          -0.01025,           0.00042,

          -0.00065,           0.00440,

           0.08688,           0.00136,

           0.05700,          -0.03616,          -0.11272,          -0.20838,
          -0.37048,           0.18314,

           0.00717,          -0.02911,           0.15848,           0.05266,
          -0.13451,           0.51639,

           0.00688,           0.02029,

           0.00596,           0.00423,

          -0.00253,           0.01196,

           0.05264,          -0.03301,           0.10669,           0.07558,
          -0.02461,           0.16282,

          -0.18481,          -0.57118,           0.85303,          -0.44876,
           0.37090,           0.65915,

          -0.00458,           0.00660,

           0.41186,           0.09829,          -0.31999,           1.51149,

          -0.00052,          -0.00809,

           0.01384,          -0.07114,

          -0.00435,          -0.03237,           0.02162,           0.00294,

           0.29742,          -0.15430,

          -0.04508,           0.17436,

           0.01577,           0.00485,

          -0.00258,           0.00946,

           0.00061,           0.00119,

           0.01095,          -0.00788,

           0.00530,          -0.01478,

        2885.06380,        2152.76256,        2361.91098,        1442.28586,
         602.45147,         251.18991,        -121.68155,          71.20167,
         404.94753,        1607.37580,       11211.04090,       -2905.37340,
       -9066.27933,      -40747.62807,

          -0.00189,           0.00957,

           0.00332,           0.00907,

           0.00574,          -0.01255,

          -0.01134,           0.00291,

          -0.00666,          -0.00615,

          -0.04947,           0.06182,           0.03965,           0.08091,

           0.06846,          -0.03612,           0.13966,           0.12543,

          -0.05494,          -0.05043,

          -0.24454,          -0.20507,           0.56201,          -0.75997,
           1.15728,           0.76203,
          -0.00559,          -0.00536,

           0.01872,           0.00104,

           0.03044,           0.02504,

          -1.07241,          -0.00288,

           0.00950,          -0.00760,

          -0.03211,           0.02261,

           0.02678,          -0.06868,

           0.03008,          -0.02062,

           0.04997,          -0.15164,

          -0.00176,          -0.00580,

          -0.00730,          -0.00676,

          -0.13906,          -0.00089,

          -0.00362,           0.00817,

           0.02021,           0.07719,

           0.02788,           0.02061,

          -0.00274,           0.00016,

           0.00566,           0.02293,

           0.04691,          -0.05005,          -0.05095,          -0.06225,

          -0.19770,          -0.00456,

          -0.00848,           0.00595,

          -0.04506,          -0.00172,

          -0.01960,           0.22971,           0.14459,           0.04362,

          -0.40199,           0.00386,

           0.01442,          -0.00088,

          -0.00020,           0.00544,

           0.04768,           0.05222,

          -0.04069,          -0.00003,

          15.71084,         -12.28846,         -66.23443,        -109.83758,
        -586.31996,         311.09606,        1070.75040,        2094.34080,
        3839.04103,       -1797.34193,

          -0.01216,           0.01244,

          -0.01666,           0.02627,

           0.00687,          -0.01291,

           0.00939,          -0.01905,           0.09401,           0.05027,
          -0.09398,           0.23942,

          -0.00379,           0.00834,

           0.05632,          -0.01907,          -0.04654,          -0.21243,

           0.00255,           0.00179,

           0.00540,           0.00497,

           0.01427,           0.00243,

          -0.00697,          -0.02792,

          -0.01524,           0.00810,

          -0.00461,           0.00238,

           0.00899,          -0.01515,

          -0.01011,          -0.04390,

          -0.00447,          -0.00992,

          -0.06110,           0.00975,          -0.00261,           0.03415,

          -0.02336,          -0.08776,

          -0.00883,           0.01346,

          -0.00229,          -0.00895,

          42.18049,         -48.21316,        -148.61588,        -171.57236,
        -414.27195,         343.09118,         394.59044,         511.79914,

          -0.00911,          -0.00220,

          -0.06315,          -0.00988,

           0.04357,          -0.02389,

           0.00004,           0.00232,

           0.00581,          -0.00317,

           0.00948,          -0.00497,

          -0.00734,           0.00300,

           0.01883,          -0.01055,

          -0.00365,          -0.00126,

          24.18074,          12.28004,          43.18187,         -58.69806,
        -102.40566,         -79.48349,         -74.81060,          89.71332,

           0.00241,          -0.00135,          -0.00136,          -0.01617,

           0.00818,           0.00873,

           0.00368,           0.00383,

          -2.25893,          10.18542,          20.73104,           9.07389,
          13.73458,         -29.10491,         -20.62071,         -10.63404,

           0.00382,          -0.00143,

          -3.77385,           0.12725,          -1.30842,           6.75795,
           7.94463,           1.79092,           1.24458,          -4.73211,

          -0.36978,          -1.25710,          -2.06373,           0.06194,
          -0.00509,           2.08851,           1.07491,           0.04112,

          -0.28582,          -0.51413,          -0.53312,           0.11936,
           0.04447,           0.23945,

           0.12450,          -0.11821,          -0.06100,          -0.12924,
          -0.05193,           0.02219,

           0.01977,          -0.02933,          -0.00771,          -0.01077,

           0.00109,          -0.00273,

  ];

  this.merargs=[
    0,  3,
    3,  1,  1,-10,  3, 11,  4,0,
    2,  2,  5, -5,  6,  2,
    3,  5,  1,-14,  2,  2,  3,1,
    3,  1,  1, -5,  2,  4,  3,0,
    1,  1,  6,  0,
    1,  2,  6,  0,
    3,  2,  1, -7,  2,  3,  3,0,
    1,  1,  5,  2,
    2,  1,  1, -4,  3,  2,
    1,  2,  5,  2,
    2,  2,  1, -5,  2,  2,
    1,  3,  5,  0,
    2,  4,  1,-10,  2,  1,
    2,  3,  1, -8,  2,  0,
    2,  1,  1, -3,  2,  2,
    2,  1,  1, -2,  2,  2,
    1,  1,  3,  0,
    2,  3,  1, -7,  2,  1,
    2,  1,  1, -3,  3,  0,
    1,  1,  2,  0,
    2,  2,  1, -4,  2,  1,
    2,  4,  1, -9,  2,  0,
    1,  2,  3,  0,
    2,  1,  1, -2,  3,  0,
    2,  1,  1, -4,  2,  0,
    2,  1,  1, -1,  2,  0,
    2,  3,  1, -6,  2,  0,
    1,  3,  3,  0,
    2,  2,  1, -7,  2,  0,
    2,  1,  1, -2,  4,  0,
    2,  1,  1, -1,  3,  0,
    1,  2,  2,  2,
    2,  2,  1, -3,  2,  2,
    2,  4,  1, -8,  2,  0,
    2,  3,  1,-10,  2,  0,
    2,  1,  1, -4,  5,  0,
    2,  1,  1, -3,  5,  2,
    2,  1,  1, -5,  2,  2,
    2,  1,  1, -5,  6,  0,
    2,  1,  1, -2,  5,  1,
    3,  1,  1, -4,  5,  5,  6,0,
    1,  4,  3,  0,
    2,  1,  1, -3,  6,  1,
    2,  1,  1, -1,  5,  0,
    2,  1,  1, -2,  6,  0,
    2,  1,  1, -1,  6,  0,
    2,  1,  1, -2,  7,  0,
    2,  1,  1, -1,  7,  0,
    3,  4,  1,-14,  2,  2,  3,0,
    3,  1,  1,  2,  5, -5,  6,0,
    1,  1,  1,  6,
    3,  2,  1,-10,  3, 11,  4,0,
    3,  1,  1, -2,  5,  5,  6,0,
    3,  6,  1,-14,  2,  2,  3,0,
    2,  1,  1,  1,  6,  0,
    2,  1,  1,  2,  6,  0,
    2,  1,  1,  1,  5,  1,
    2,  2,  1, -4,  3,  1,
    2,  1,  1,  2,  5,  0,
    2,  3,  1, -5,  2,  2,
    2,  1,  1,  3,  5,  0,
    2,  5,  1,-10,  2,  0,
    1,  3,  2,  0,
    2,  2,  1, -2,  2,  0,
    2,  1,  1,  1,  3,  0,
    2,  4,  1, -7,  2,  0,
    2,  2,  1, -3,  3,  0,
    2,  1,  1,  1,  2,  0,
    2,  3,  1, -4,  2,  0,
    2,  5,  1, -9,  2,  0,
    2,  1,  1,  2,  3,  0,
    2,  2,  1, -2,  3,  0,
    1,  4,  2,  0,
    2,  2,  1, -1,  2,  0,
    2,  4,  1, -6,  2,  0,
    2,  2,  1, -2,  4,  0,
    2,  2,  1, -1,  3,  0,
    2,  1,  1,  2,  2,  1,
    2,  3,  1, -3,  2,  0,
    2,  5,  1, -8,  2,  0,
    2,  2,  1, -3,  5,  0,
    1,  5,  2,  1,
    2,  2,  1, -2,  5,  0,
    2,  1,  1,  4,  3,  0,
    2,  2,  1, -3,  6,  0,
    2,  2,  1, -1,  5,  0,
    2,  2,  1, -2,  6,  0,
    1,  2,  1,  4,
    2,  2,  1,  1,  5,  0,
    2,  3,  1, -4,  3,  0,
    2,  2,  1,  2,  5,  0,
    2,  4,  1, -5,  2,  2,
    2,  1,  1,  3,  2,  0,
    2,  3,  1, -2,  2,  1,
    2,  3,  1, -3,  3,  0,
    2,  2,  1,  1,  2,  0,
    2,  4,  1, -4,  2,  0,
    2,  3,  1, -2,  3,  0,
    2,  3,  1, -1,  2,  0,
    2,  3,  1, -1,  3,  0,
    2,  2,  1,  2,  2,  0,
    2,  4,  1, -3,  2,  0,
    2,  3,  1, -3,  5,  0,
    2,  1,  1,  5,  2,  1,
    2,  3,  1, -2,  5,  0,
    2,  3,  1, -1,  5,  0,
    2,  3,  1, -2,  6,  0,
    1,  3,  1,  3,
    2,  4,  1, -4,  3,  0,
    2,  5,  1, -5,  2,  0,
    2,  4,  1, -2,  2,  0,
    2,  5,  1, -4,  2,  0,
    2,  4,  1, -2,  3,  0,
    2,  5,  1, -3,  2,  0,
    2,  2,  1,  5,  2,  0,
    2,  4,  1, -2,  5,  0,
    2,  4,  1, -1,  5,  0,
    1,  4,  1,  3,
    2,  6,  1, -5,  2,  1,
    2,  5,  1, -2,  2,  0,
    2,  5,  1, -2,  5,  0,
    1,  5,  1,  3,
    2,  7,  1, -5,  2,  0,
    1,  6,  1,  3,
    1,  7,  1,  3,
    1,  8,  1,  2,
    1,  9,  1,  2,
    1, 10,  1,  1,
    1, 11,  1,  0,
   -1
    ];

    this.mer404 = new Plantbl(
      [11, 14, 10, 11,  4,  5,  2,  0,  0],
                               6,
                               this.merargs,
                               this.mertabl,
                               this.mertabb,
                               this.mertabr,
                            3.8709830979999998e-01
      );

  }
}

class SwemptabVen{
  constructor(){
    this.ventabl = [
           9.08078,          55.42416, 21066413644.98911,      655127.20186,

           0.00329,           0.10408,

           0.00268,          -0.01908,

           0.00653,           0.00183,

           0.15083,          -0.21997,

           6.08596,           2.34841,           3.70668,          -0.22740,
          -2.29376,          -1.46741,

          -0.03840,           0.01242,

           0.00176,           0.00913,

           0.00121,          -0.01222,

          -1.22624,           0.65264,          -1.15974,          -1.28172,
           1.00656,          -0.66266,

           0.01560,          -0.00654,           0.00896,           0.00069,

           0.21649,          -0.01786,

           0.01239,           0.00255,

           0.00084,          -0.06086,

          -0.00041,           0.00887,

           0.13453,          -0.20013,           0.08234,           0.01575,

           0.00658,          -0.00214,

           0.00254,           0.00857,

          -0.01047,          -0.00519,

           0.63215,          -0.40914,           0.34271,          -1.53258,

           0.00038,          -0.01437,

          -0.02599,          -2.27805,          -0.36873,          -1.01799,
          -0.36798,           1.41356,

          -0.08167,           0.01368,           0.20676,           0.06807,

           0.02282,          -0.04691,

           0.30308,          -0.20218,           0.24785,           0.27522,

           0.00197,          -0.00499,

           1.43909,          -0.46154,           0.93459,           2.99583,
          -3.43274,           0.05672,

          -0.06586,           0.12467,           0.02505,          -0.08433,

           0.00743,           0.00174,

          -0.04013,           0.17715,

          -0.00603,          -0.01024,

           0.01542,          -0.02378,

           0.00676,           0.00002,

          -0.00168,          -4.89487,

           0.02393,          -0.03064,

           0.00090,           0.00977,

           0.01223,           0.00381,

           0.28135,          -0.09158,           0.18550,           0.58372,
          -0.67437,           0.01409,

          -0.25404,          -0.06863,

           0.06763,          -0.02939,

          -0.00009,          -0.04888,

           0.01718,          -0.00978,

          -0.01945,           0.08847,

          -0.00135,         -11.29920,

           0.01689,          -0.04756,

           0.02075,          -0.01667,

           0.01397,           0.00443,

          -0.28437,           0.07600,           0.17996,          -0.44326,

           0.29356,           1.41869,          -1.58617,           0.03206,

           0.00229,          -0.00753,

          -0.03076,          -2.96766,

           0.00245,           0.00697,

           0.01063,          -0.02468,

          -0.00351,          -0.18179,

          -0.01088,           0.00380,

           0.00496,           0.02072,

          -0.12890,           0.16719,          -0.06820,          -0.03234,

         -60.36135,         -11.74485,         -11.03752,          -3.80145,
         -21.33955,        -284.54495,        -763.43839,         248.50823,
        1493.02775,        1288.79621,       -2091.10921,       -1851.15420,

          -0.00922,           0.06233,

           0.00004,           0.00785,

           0.10363,          -0.16770,           0.45497,           0.24051,
          -0.28057,           0.61126,

          -0.02057,           0.00010,

           0.00561,           0.01994,

           0.01416,          -0.00442,

           0.03073,          -0.14961,

          -0.06272,           0.08301,

           0.02040,           7.12824,

          -0.00453,          -0.01815,

           0.00004,          -0.00013,

          -0.03593,          -0.18147,           0.20353,          -0.00683,

           0.00003,           0.06226,

          -0.00443,           0.00257,

           0.03194,           0.03254,

           0.00282,          -0.01401,

           0.00422,           1.03169,

          -0.00169,          -0.00591,

          -0.00307,           0.00540,

           0.05511,           0.00347,

           0.07896,           0.06583,

           0.00783,           0.01926,

           0.03109,           0.15967,

           0.00343,           0.88734,

           0.01047,           0.32054,

           0.00814,           0.00051,

           0.02474,           0.00047,

           0.00052,           0.03763,

         -57.06618,          20.34614,         -45.06541,        -115.20465,
         136.46887,         -84.67046,          92.93308,         160.44644,

          -0.00020,          -0.00082,

           0.02496,           0.00279,

           0.00849,           0.00195,

          -0.05013,          -0.04331,

          -0.00136,           0.14491,

          -0.00183,          -0.00406,

           0.01163,           0.00093,

          -0.00604,          -0.00680,

          -0.00036,           0.06861,

          -0.00450,          -0.00969,

           0.00171,           0.00979,

          -0.00152,           0.03929,

           0.00631,           0.00048,

          -0.00709,          -0.00864,

           1.51002,          -0.24657,           1.27338,           2.64699,
          -2.40990,          -0.57413,

          -0.00023,           0.03528,

           0.00268,           0.00522,

          -0.00010,           0.01933,

          -0.00006,           0.01100,

           0.06313,          -0.09939,           0.08571,           0.03206,

          -0.00004,           0.00645,

  ];
  this.ventabb = [
         -23.91858,          31.44154,          25.93273,         -67.68643,

          -0.00171,           0.00123,

           0.00001,          -0.00018,

          -0.00005,           0.00018,

          -0.00001,           0.00019,

           0.00733,           0.00030,          -0.00038,           0.00011,
           0.00181,           0.00120,

           0.00010,           0.00002,

          -0.00012,           0.00002,

           0.00021,           0.00004,

          -0.00403,           0.00101,           0.00342,          -0.00328,
           0.01564,           0.01212,

           0.00011,           0.00010,          -0.00002,          -0.00004,

          -0.00524,           0.00079,

           0.00011,           0.00002,

          -0.00001,           0.00003,

           0.00001,           0.00000,

           0.00108,           0.00035,           0.00003,           0.00064,

          -0.00000,          -0.00002,

          -0.00069,           0.00031,

           0.00020,           0.00003,

           0.00768,           0.03697,          -0.07906,           0.01673,

          -0.00003,          -0.00001,

          -0.00198,          -0.01045,           0.01761,          -0.00803,
          -0.00751,           0.04199,

           0.00280,          -0.00213,          -0.00482,          -0.00209,

          -0.01077,           0.00715,

           0.00048,          -0.00004,           0.00199,           0.00237,

           0.00017,          -0.00032,

          -0.07513,          -0.00658,          -0.04213,           0.16065,
           0.27661,           0.06515,

           0.02156,          -0.08144,          -0.23994,          -0.05674,

           0.00167,           0.00069,

           0.00244,          -0.01247,

          -0.00100,           0.00036,

           0.00240,           0.00012,

           0.00010,           0.00018,

           0.00208,          -0.00098,

          -0.00217,           0.00707,

          -0.00338,           0.01260,

          -0.00127,          -0.00039,

          -0.03516,          -0.00544,          -0.01746,           0.08258,
           0.10633,           0.02523,

           0.00077,          -0.00214,

          -0.02335,           0.00976,

          -0.00019,           0.00003,

           0.00041,           0.00039,

           0.00199,          -0.01098,

           0.00813,          -0.00853,

           0.02230,           0.00349,

          -0.02250,           0.08119,

          -0.00214,          -0.00052,

          -0.00220,           0.15216,           0.17152,           0.08051,

          -0.01561,           0.27727,           0.25837,           0.07021,

          -0.00005,          -0.00000,

          -0.02692,          -0.00047,

          -0.00007,          -0.00016,

           0.01072,           0.01418,

          -0.00076,           0.00379,

          -0.00807,           0.03463,

          -0.05199,           0.06680,

          -0.00622,           0.00787,           0.00672,           0.00453,

         -10.69951,         -67.43445,        -183.55956,         -37.87932,
        -102.30497,        -780.40465,        2572.21990,        -446.97798,
        1665.42632,        5698.61327,      -11889.66501,        2814.93799,

           0.03204,          -0.09479,

           0.00014,          -0.00001,

          -0.04118,          -0.04562,           0.03435,          -0.05878,
           0.01700,           0.02566,

          -0.00121,           0.00170,

           0.02390,           0.00403,

           0.04629,           0.01896,

          -0.00521,           0.03215,

          -0.01051,           0.00696,

          -0.01332,          -0.08937,

          -0.00469,          -0.00751,

           0.00016,          -0.00035,

           0.00492,          -0.03930,          -0.04742,          -0.01013,

           0.00065,           0.00021,

          -0.00006,           0.00017,

           0.06768,          -0.01558,

          -0.00055,           0.00322,

          -0.00287,          -0.01656,

           0.00061,          -0.00041,

           0.00030,           0.00047,

          -0.01436,          -0.00148,

           0.30302,          -0.05511,

          -0.00020,          -0.00005,

           0.00042,          -0.00025,

           0.01270,           0.00458,

          -0.00593,          -0.04480,

           0.00005,          -0.00008,

           0.08457,          -0.01569,

           0.00062,           0.00018,

           9.79942,          -2.48836,           4.17423,           6.72044,
         -63.33456,          34.63597,          39.11878,         -72.89581,

          -0.00066,           0.00036,

          -0.00045,          -0.00062,

          -0.00287,          -0.00118,

          -0.21879,           0.03947,

           0.00086,           0.00671,

          -0.00113,           0.00122,

          -0.00193,          -0.00029,

          -0.03612,           0.00635,

           0.00024,           0.00207,

          -0.00273,           0.00443,

          -0.00055,           0.00030,

          -0.00451,           0.00175,

          -0.00110,          -0.00015,

          -0.02608,           0.00480,

           2.16555,          -0.70419,           1.74648,           0.97514,
          -1.15360,           1.73688,

           0.00004,           0.00105,

           0.00187,          -0.00311,

           0.00005,           0.00055,

           0.00004,           0.00032,

          -0.04629,           0.02292,          -0.00363,          -0.03807,

           0.00002,           0.00020,
  ];
  this.ventabr = [
          -0.24459,           3.72698,          -6.67281,           5.24378,

           0.00030,           0.00003,

          -0.00002,          -0.00000,

          -0.00000,           0.00001,

           0.00032,           0.00021,

          -0.00326,           0.01002,           0.00067,           0.00653,
           0.00243,          -0.00417,

          -0.00004,          -0.00010,

          -0.00002,          -0.00001,

           0.00004,          -0.00002,

          -0.00638,          -0.01453,           0.01458,          -0.01235,
           0.00755,           0.01030,

           0.00006,           0.00014,           0.00000,           0.00009,

           0.00063,           0.00176,

           0.00003,          -0.00022,

           0.00112,           0.00001,

          -0.00014,          -0.00001,

           0.00485,           0.00322,          -0.00035,           0.00198,

           0.00004,           0.00013,

          -0.00015,          -0.00003,

           0.00011,          -0.00025,

           0.00634,           0.02207,           0.04620,           0.00160,

           0.00045,           0.00001,

          -0.11563,           0.00643,          -0.05947,           0.02018,
           0.07704,           0.01574,

          -0.00090,          -0.00471,          -0.00322,           0.01104,

           0.00265,          -0.00038,

           0.01395,           0.02165,          -0.01948,           0.01713,

          -0.00057,          -0.00019,

           0.04889,           0.13403,          -0.28327,           0.10597,
          -0.02325,          -0.35829,

           0.01171,          -0.00904,           0.00747,           0.02546,

           0.00029,          -0.00190,

          -0.03408,          -0.00703,

           0.00176,          -0.00109,

           0.00463,           0.00293,

           0.00000,           0.00148,

           1.06691,          -0.00054,

          -0.00935,          -0.00790,

           0.00552,          -0.00084,

          -0.00100,           0.00336,

           0.02874,           0.08604,          -0.17876,           0.05973,
          -0.00720,          -0.21195,

           0.02134,          -0.07980,

           0.01500,           0.01398,

           0.01758,          -0.00004,

           0.00371,           0.00650,

          -0.03375,          -0.00723,

           4.65465,          -0.00040,

           0.02040,           0.00707,

          -0.00727,          -0.01144,

          -0.00196,           0.00620,

          -0.03396,          -0.12904,           0.20160,           0.08092,

          -0.67045,           0.14014,          -0.01571,          -0.75141,

           0.00361,           0.00110,

           1.42165,          -0.01499,

          -0.00334,           0.00117,

           0.01187,           0.00507,

           0.08935,          -0.00174,

          -0.00211,          -0.00525,

           0.01035,          -0.00252,

          -0.08355,          -0.06442,           0.01616,          -0.03409,

           5.55241,         -30.62428,           2.03824,          -6.26978,
         143.07279,         -10.24734,        -125.25411,        -380.85360,
        -644.78411,         745.02852,         926.70000,       -1045.09820,

          -0.03124,          -0.00465,

          -0.00396,           0.00002,

           0.08518,           0.05248,          -0.12178,           0.23023,
          -0.30943,          -0.14208,

          -0.00005,          -0.01054,

          -0.00894,           0.00233,

          -0.00173,          -0.00768,

           0.07881,           0.01633,

          -0.04463,          -0.03347,

          -3.92991,           0.00945,

           0.01524,          -0.00422,

          -0.00011,          -0.00005,

           0.10842,          -0.02126,           0.00349,           0.12097,

          -0.03752,           0.00001,

          -0.00156,          -0.00270,

          -0.01520,           0.01349,

           0.00895,           0.00186,

          -0.67751,           0.00180,

           0.00516,          -0.00151,

          -0.00365,          -0.00210,

          -0.00276,           0.03793,

          -0.02637,           0.03235,

          -0.01343,           0.00541,

          -0.11270,           0.02169,

          -0.63365,           0.00122,

          -0.24329,           0.00428,

          -0.00040,           0.00586,

           0.00581,           0.01112,

          -0.02731,           0.00008,

          -2.69091,           0.42729,           2.78805,           3.43849,
          -0.87998,          -6.62373,           0.56882,           4.69370,

           0.00005,          -0.00008,

          -0.00181,           0.01767,

          -0.00168,           0.00660,

           0.01802,          -0.01836,

          -0.11245,          -0.00061,

           0.00199,          -0.00070,

          -0.00076,           0.00919,

           0.00311,          -0.00165,

          -0.05650,          -0.00018,

           0.00121,          -0.00069,

          -0.00803,           0.00146,

          -0.03260,          -0.00072,

          -0.00042,           0.00524,

           0.00464,          -0.00339,

          -0.06203,          -0.00278,           0.04145,           0.02871,
          -0.01962,          -0.01362,

          -0.03040,          -0.00010,

           0.00085,          -0.00001,

          -0.01712,          -0.00006,

          -0.00996,          -0.00003,

          -0.00029,           0.00026,           0.00016,          -0.00005,

          -0.00594,          -0.00003,

  ];

  this.venargs = [
  0,  3,
  2,  2,  5, -5,  6,  0,
  3,  2,  2,  1,  3, -8,  4,  0,
  3,  5,  1,-14,  2,  2,  3,  0,
  3,  3,  2, -7,  3,  4,  4,  0,
  2,  8,  2,-13,  3,  2,
  3,  6,  2,-10,  3,  3,  5,  0,
  1,  1,  7,  0,
  2,  1,  5, -2,  6,  0,
  2,  1,  2, -3,  4,  2,
  2,  2,  5, -4,  6,  1,
  1,  1,  6,  0,
  3,  3,  2, -5,  3,  1,  5,  0,
  3,  3,  2, -5,  3,  2,  5,  0,
  2,  1,  5, -1,  6,  0,
  2,  2,  2, -6,  4,  1,
  2,  2,  5, -3,  6,  0,
  1,  2,  6,  0,
  2,  3,  5, -5,  6,  0,
  1,  1,  5,  1,
  2,  2,  5, -2,  6,  0,
  2,  3,  2, -5,  3,  2,
  2,  5,  2, -8,  3,  1,
  1,  2,  5,  0,
  2,  2,  1, -5,  2,  1,
  2,  6,  2,-10,  3,  0,
  2,  2,  2, -3,  3,  2,
  2,  1,  2, -2,  3,  1,
  2,  4,  2, -7,  3,  0,
  2,  4,  2, -6,  3,  0,
  1,  1,  4,  0,
  2,  1,  2, -2,  4,  0,
  2,  2,  2, -5,  4,  0,
  2,  1,  2, -1,  3,  0,
  2,  1,  1, -3,  2,  0,
  2,  2,  2, -4,  3,  0,
  2,  6,  2, -9,  3,  0,
  2,  3,  2, -4,  3,  2,
  2,  1,  1, -2,  2,  0,
  1,  1,  3,  0,
  2,  1,  2, -1,  4,  0,
  2,  2,  2, -4,  4,  0,
  2,  5,  2, -7,  3,  0,
  2,  2,  2, -2,  3,  0,
  2,  1,  2, -3,  5,  0,
  2,  1,  2, -3,  3,  0,
  2,  7,  2,-10,  3,  0,
  2,  1,  2, -2,  5,  1,
  2,  4,  2, -5,  3,  1,
  3,  1,  2,  1,  5, -5,  6,  0,
  2,  1,  2, -1,  5,  0,
  3,  1,  2, -3,  5,  5,  6,  0,
  2,  1,  2, -2,  6,  0,
  2,  1,  2, -1,  6,  0,
  1,  3,  4,  0,
  2,  7,  2,-13,  3,  0,
  3,  1,  2,  2,  5, -5,  6,  1,
  1,  1,  2,  5,
  2,  9,  2,-13,  3,  0,
  3,  1,  2,  1,  5, -2,  6,  0,
  2,  2,  2, -3,  4,  2,
  2,  3,  2, -6,  4,  0,
  2,  1,  2,  1,  5,  0,
  2,  2,  2, -5,  3,  0,
  2,  6,  2, -8,  3,  0,
  2,  2,  1, -4,  2,  0,
  2,  3,  2, -3,  3,  0,
  1,  2,  3,  0,
  2,  3,  2, -7,  3,  0,
  2,  5,  2, -6,  3,  1,
  2,  2,  2, -2,  4,  0,
  2,  3,  2, -5,  4,  0,
  2,  2,  2, -1,  3,  0,
  2,  7,  2, -9,  3,  0,
  2,  4,  2, -4,  3,  0,
  2,  1,  2,  1,  3,  0,
  2,  3,  2, -4,  4,  0,
  2,  6,  2, -7,  3,  0,
  2,  3,  2, -2,  3,  0,
  2,  2,  2, -4,  5,  0,
  2,  2,  2, -3,  5,  0,
  2,  2,  2, -2,  5,  0,
  2,  5,  2, -5,  3,  0,
  2,  2,  2, -3,  6,  0,
  2,  2,  2, -1,  5,  0,
  2,  2,  2, -2,  6,  0,
  1,  2,  2,  3,
  2,  2,  2,  1,  5,  0,
  2,  7,  2, -8,  3,  0,
  2,  2,  1, -3,  2,  0,
  2,  4,  2, -3,  3,  0,
  2,  6,  2, -6,  3,  0,
  2,  3,  2, -1,  3,  0,
  2,  8,  2, -9,  3,  0,
  2,  5,  2, -4,  3,  0,
  2,  7,  2, -7,  3,  0,
  2,  4,  2, -2,  3,  0,
  2,  3,  2, -4,  5,  0,
  2,  3,  2, -3,  5,  0,
  2,  9,  2,-10,  3,  0,
  2,  3,  2, -2,  5,  0,
  1,  3,  2,  2,
  2,  8,  2, -8,  3,  0,
  2,  5,  2, -3,  3,  0,
  2,  9,  2, -9,  3,  0,
  2, 10,  2,-10,  3,  0,
  1,  4,  2,  1,
  2, 11,  2,-11,  3,  0,
 -1
  ];
    /*this.ven404 = new Plantbl(
      {5, 14, 13,  8,  4,  5,  1,  0,  0},
      (short)5,
      venargs,
      ventabl,
      ventabb,
      ventabr,
      7.2332982000000001e-01
      );*/

  this.ven404 = new Plantbl(
      [5, 14, 13,  8,  4,  5,  1,  0,  0],
      5,
      this.venargs,
      this.ventabl,
      this.ventabb,
      this.ventabr,
      7.2332982000000001e-01
      );

  }
}

class SwemptabEar{
  constructor(){

    this.eartabl = [
         -65.54655,        -232.74963, 12959774227.57587,      361678.59587,

           2.52679,          -4.93511,           2.46852,          -8.88928,
           6.66257,          -1.94502,

           0.66887,          -0.06141,           0.08893,           0.18971,

           0.00068,          -0.00307,

           0.03092,           0.03214,          -0.14321,           0.22548,

           0.00314,          -0.00221,

           8.98017,           7.25747,          -1.06655,           1.19671,
          -2.42276,           0.29621,           1.55635,           0.99167,

          -0.00026,           0.00187,

           0.00189,           0.02742,

           0.00158,           0.01475,

           0.00353,          -0.02048,

          -0.01775,          -0.01023,           0.01927,          -0.03122,

          -1.55440,          -4.97423,           2.14765,          -2.77045,
           1.02707,           0.55507,          -0.08066,           0.18479,

           0.00750,           0.00583,

          -0.16977,           0.35555,           0.32036,           0.01309,

           0.54625,           0.08167,           0.10681,           0.17231,
          -0.02287,           0.01631,

          -0.00866,          -0.00190,

           0.00016,          -0.01514,

          -0.00073,           0.04205,

          -0.00072,           0.01490,

          -0.38831,           0.41043,          -1.11857,          -0.84329,
           1.15123,          -1.34167,

           0.01026,          -0.00432,

          -0.02833,          -0.00705,          -0.00285,           0.01645,

          -0.01234,           0.05609,          -0.01893,          -0.00171,

          -0.30527,           0.45390,           0.56713,           0.70030,
           1.27125,          -0.76481,           0.34857,          -2.60318,

          -0.00160,           0.00643,

           0.28492,          -0.37998,           0.23347,           0.00540,
           0.00342,           0.04406,

           0.00037,          -0.02449,

           0.01469,           1.59358,           0.24956,           0.71066,
           0.25477,          -0.98371,

          -0.69412,           0.19687,          -0.44423,          -0.83331,
           0.49647,          -0.31021,

           0.05696,          -0.00802,          -0.14423,          -0.04719,

           0.16762,          -0.01234,           0.02481,           0.03465,

           0.01091,           0.02123,

           0.08212,          -0.07375,           0.01524,          -0.07388,

           0.06673,          -0.22486,           0.10026,          -0.00559,

           0.14711,          -0.11680,           0.05460,           0.02749,

          -1.04467,           0.34273,          -0.67582,          -2.15117,
           2.47372,          -0.04332,

           0.05016,          -0.03991,           0.01908,           0.00943,

           0.07321,          -0.23637,           0.10564,          -0.00446,

          -0.09523,          -0.30710,           0.17400,          -0.10681,

           0.05104,          -0.14078,           0.01390,           0.07288,

          -0.26308,          -0.20717,           0.20773,          -0.37096,

          -0.00205,          -0.27274,

          -0.00792,          -0.00183,

           0.02985,           0.04895,           0.03785,          -0.14731,

           0.02976,          -0.02495,          -0.02644,          -0.04085,

          -0.00843,           0.00027,

           0.00090,           0.00611,

           0.00040,           4.83425,

           0.01692,          -0.01335,

           0.04482,          -0.03602,           0.01672,           0.00838,

           0.03682,          -0.11206,           0.05163,          -0.00219,

          -0.08381,          -0.20911,           0.16400,          -0.13325,

          -0.05945,           0.02114,          -0.00710,          -0.04695,

          -0.01657,          -0.00513,

          -0.06999,          -0.23054,           0.13128,          -0.07975,

           0.00054,          -0.00699,

          -0.01253,          -0.04007,           0.00658,          -0.00607,

          -0.48696,           0.31859,          -0.84292,          -0.87950,
           1.30507,          -0.94042,

          -0.00234,           0.00339,

          -0.30647,          -0.24605,           0.24948,          -0.43369,

          -0.64033,           0.20754,          -0.43829,          -1.31801,
           1.55412,          -0.02893,

          -0.02323,           0.02181,          -0.00398,          -0.01548,

          -0.08005,          -0.01537,          -0.00362,          -0.02033,

           0.00028,          -0.03732,          -0.14083,          -7.21175,

          -0.07430,           0.01886,          -0.00223,           0.01915,

          -0.02270,          -0.03702,           0.10167,          -0.02917,

           0.00879,          -2.04198,

          -0.00433,          -0.41764,

           0.00671,          -0.00030,

           0.00070,          -0.01066,

           0.01144,          -0.03190,

          -0.29653,           0.38638,          -0.16611,          -0.07661,

           0.22071,           0.14665,           0.02487,           0.13524,

        -275.60942,        -335.52251,        -413.89009,         359.65390,
        1396.49813,        1118.56095,        2559.41622,       -3393.39088,
       -6717.66079,       -1543.17403,

          -1.90405,          -0.22958,          -0.57989,          -0.36584,
          -0.04547,          -0.14164,

           0.00749,          -0.03973,

           0.00033,           0.01842,

          -0.08301,          -0.03523,          -0.00408,          -0.02008,

           0.00008,           0.00778,

          -0.00046,           0.02760,

          -0.03135,           0.07710,           0.06130,           0.04003,

          -0.04703,           0.00671,          -0.00754,          -0.01000,

          -0.01902,          -0.00125,

          -0.00264,          -0.00903,

          -0.02672,           0.12765,

          -0.03872,           0.03532,          -0.01534,          -0.00710,

          -0.01087,           0.01124,

          -0.01664,           0.06304,          -0.02779,           0.00214,

          -0.01279,          -5.51814,

           0.05847,          -0.02093,           0.03950,           0.06696,
          -0.04064,           0.02687,

           0.01478,          -0.02169,           0.05821,           0.03301,
          -0.03861,           0.07535,

           0.00290,          -0.00644,

           0.00631,           0.12905,

           0.02400,           0.13194,          -0.14339,           0.00529,

           0.00343,           0.00819,

           0.02692,          -0.03332,          -0.07284,          -0.02064,

           0.07038,           0.03999,           0.02759,           0.07599,

           0.00033,           0.00641,

           0.00128,           0.02032,          -0.00852,           0.00680,

           0.23019,           0.17100,           0.09861,           0.55013,

          -0.00192,           0.00953,

          -0.00943,           0.01783,

           0.05975,           0.01486,           0.00160,           0.01558,

          -0.01629,          -0.02035,           0.01533,           2.73176,

           0.05858,          -0.01327,           0.00209,          -0.01506,

           0.00755,           0.03300,

          -0.00796,          -0.65270,

           0.02305,           0.00165,

          -0.02512,           0.06560,           0.16108,          -0.02087,

           0.00016,           0.10729,

           0.04175,           0.00559,

           0.01176,           0.00110,

          15.15730,          -0.52460,         -37.16535,         -25.85564,
         -60.94577,           4.29961,          57.11617,          67.96463,
          31.41414,         -64.75731,

           0.00848,           0.02971,          -0.03690,          -0.00010,

          -0.03568,           0.06325,           0.11311,           0.02431,

          -0.00383,           0.00421,

          -0.00140,           0.00680,

           0.00069,          -0.21036,

           0.00386,           0.04210,

          -0.01324,           0.16454,

          -0.01398,          -0.00109,

           0.02548,          -0.03842,          -0.06504,          -0.02204,

           0.01359,           0.00232,

           0.07634,          -1.64648,          -1.73103,           0.89176,
           0.81398,           0.65209,

           0.00021,          -0.08441,

          -0.00012,           0.01262,

          -0.00666,          -0.00050,

          -0.00130,           0.01596,

          -0.00485,          -0.00213,

           0.00009,          -0.03941,

          -0.02266,          -0.04421,          -0.01341,           0.01083,

          -0.00011,           0.00004,           0.00003,          -0.02017,

           0.00003,          -0.01096,

           0.00002,          -0.00623,

  ];
  this.eartabb = [
         -41.97860,         -48.43539,          74.72897,           0.00075,

          -0.12774,          -0.10188,          -0.00943,          -0.04574,
           0.00265,          -0.00217,

           0.00254,           0.00168,           0.00008,           0.00026,

          -0.00000,          -0.00000,

           0.00004,          -0.00003,           0.00001,          -0.00003,

          -0.00002,          -0.00006,

           0.03351,          -0.02699,           0.00896,          -0.01315,
          -0.00019,          -0.00054,          -0.00020,          -0.00003,

           0.00002,           0.00001,

          -0.00000,           0.00000,

          -0.00002,          -0.00001,

          -0.00001,           0.00003,

           0.00017,          -0.00008,           0.00000,          -0.00003,

           0.00501,          -0.00083,           0.00414,           0.00202,
           0.00051,           0.00060,           0.00002,           0.00000,

          -0.00002,           0.00002,

          -0.00016,          -0.00443,          -0.00083,          -0.00031,

          -0.00394,           0.00148,          -0.00035,           0.00099,
           0.00005,           0.00009,

           0.00004,          -0.00002,

          -0.00001,          -0.00002,

           0.00012,          -0.00005,

           0.00001,           0.00001,

          -0.00577,          -0.00631,          -0.00017,           0.01993,
          -0.00234,          -0.00218,

          -0.00001,           0.00002,

          -0.00101,          -0.00044,          -0.00036,           0.00041,

           0.00294,          -0.00109,           0.00043,          -0.00006,

           0.09650,           0.15003,           0.01087,           0.04905,
           0.00093,          -0.06986,          -0.01471,          -0.00221,

          -0.00002,          -0.00003,

           0.00440,          -0.00083,           0.00102,          -0.00024,
           0.00005,          -0.00002,

          -0.00004,           0.00001,

           0.00505,           0.00930,          -0.01609,          -0.00183,
          -0.00113,           0.00214,

           0.00439,          -0.00295,          -0.00280,           0.00402,
          -0.00047,          -0.00145,

          -0.00114,          -0.00178,           0.00097,           0.00022,

           0.00019,           0.00002,           0.00009,          -0.00005,

          -0.00002,           0.00006,

          -0.01618,          -0.01033,          -0.00372,           0.00301,

          -0.00199,           0.00003,           0.00012,          -0.00068,

          -0.00027,          -0.00011,           0.00009,          -0.00020,

          -0.00618,           0.00129,           0.00452,           0.00620,
          -0.06411,          -0.01524,

          -0.00207,          -0.00140,           0.00005,          -0.00036,

          -0.00009,           0.00005,           0.00012,          -0.00053,

           0.00050,          -0.00068,          -0.00059,          -0.00132,

           0.00719,          -0.13368,          -0.08789,          -0.02072,

           0.00031,          -0.00360,          -0.00241,          -0.00182,

           0.00284,           0.00196,

           0.00083,           0.00008,

           0.00203,          -0.00097,          -0.00120,           0.00748,

           0.00326,          -0.00145,          -0.00276,           0.00236,

          -0.00048,          -0.00258,

           0.00011,           0.00001,

          -0.00284,           0.00795,

          -0.00156,           0.00106,

          -0.00040,          -0.00069,           0.00026,          -0.00039,

          -0.00102,          -0.00098,           0.00017,          -0.00125,

          -0.00180,          -0.01103,          -0.01854,           0.00742,

          -0.02751,          -0.00773,          -0.00263,           0.01059,

           0.00152,           0.00047,

          -0.00106,          -0.00034,          -0.00126,          -0.00291,

          -0.00014,           0.00006,

           0.00069,           0.00316,          -0.00087,           0.00022,

           0.05381,           0.03791,           0.05011,          -0.15168,
          -0.16315,           0.03037,

           0.00068,          -0.00067,

          -0.00457,          -0.00146,          -0.00643,          -0.00451,

           0.07806,           0.00729,           0.03356,          -0.16465,
          -0.20388,          -0.04854,

          -0.00163,          -0.00178,           0.00185,           0.00405,

          -0.00009,           0.00068,          -0.00003,           0.00005,

          -0.01186,           0.00347,          -0.01776,           0.00258,

           0.00081,          -0.00014,           0.00003,          -0.00021,

          -0.01218,          -0.03048,          -0.03109,           0.01387,

          -0.00740,          -0.00113,

          -0.00155,           0.00679,

          -0.00053,          -0.00007,

          -0.00004,          -0.00002,

           0.00248,           0.00127,

          -0.00386,           0.00394,           0.01213,           0.00748,

          -0.04669,          -0.00319,           0.00315,           0.00010,

          85.02966,         -55.85765,         215.62111,         519.00334,
       -1941.10461,         508.68393,        -419.80123,       -4679.60117,
          -0.00916,           0.00204,

          -0.13900,          -0.08473,          -0.07614,          -0.03445,
           0.00359,          -0.00136,

          -0.00111,           0.01028,

           0.00021,          -0.00002,

           0.00039,           0.00246,          -0.00084,          -0.00007,

          -0.00191,           0.00491,

           0.00474,          -0.00676,

          -0.00549,           0.02234,           0.02087,           0.00575,

          -0.00011,           0.00079,          -0.00060,           0.00029,

          -0.00239,          -0.00257,

           0.00020,           0.00163,

           0.00301,          -0.01723,

           0.00049,           0.00086,          -0.00046,           0.00057,

          -0.00049,           0.00024,

           0.00103,          -0.00072,          -0.00005,           0.00095,

           0.00598,          -0.01127,

          -0.00538,           0.00317,          -0.00178,          -0.00010,
           0.00061,           0.00132,

          -0.00001,           0.00318,          -0.00206,           0.00113,
           0.00153,           0.00097,

           0.00161,          -0.00363,

           0.00142,          -0.00047,

          -0.00281,           0.03085,           0.02895,           0.00688,

           0.00025,          -0.00016,

          -0.00197,          -0.08112,           0.02859,          -0.00683,

           0.00004,           0.00016,           0.00158,          -0.00065,

           0.00004,          -0.00001,

           0.00002,          -0.00008,           0.00019,           0.00039,

          -0.00344,           0.00364,           0.00579,          -0.00144,

           0.00031,          -0.00190,

           0.00066,           0.00025,

           0.00011,          -0.00069,           0.00001,          -0.00011,

          -0.01202,           0.00842,           0.00067,          -0.00297,

          -0.00000,           0.00008,           0.00005,           0.00000,

           0.00086,          -0.00057,

           0.00354,          -0.00548,

           0.00009,          -0.00003,

           0.00179,           0.07922,           0.00490,           0.00065,

          -0.00005,          -0.00059,

           0.00061,          -0.00319,

           0.00007,          -0.00048,

           3.49661,          -1.52414,          -6.26431,          -1.76193,
         -26.45666,           7.62583,          77.77395,          10.67040,
           0.00032,           0.00090,

          -0.00026,           0.00680,           0.00827,           0.00199,

          -0.00271,           0.04278,           0.02257,          -0.00532,

           0.00006,           0.00011,

           0.00006,           0.00010,

          -0.00017,          -0.00081,

           0.00050,           0.00001,

           0.00012,           0.00082,

           0.00326,           0.00040,

          -0.00003,          -0.03209,           0.00042,           0.00008,

           0.01059,          -0.00218,

          -0.87557,          -1.06369,          -0.52928,           1.38498,
           0.00082,          -0.00040,

           0.00009,          -0.00047,

           0.00007,           0.00007,

           0.00155,           0.00019,

           0.00002,           0.00008,

           0.00001,           0.00023,

           0.00010,          -0.00029,

          -0.03336,          -0.00987,           0.00012,          -0.00006,

          -0.00198,           0.00333,          -0.00004,           0.00026,

           0.00042,           0.00006,

           0.00025,           0.00021,

  ];
  this.eartabr = [
           0.64577,          -2.90183,         -14.50280,          28.85196,

           0.08672,          -0.05643,           0.02353,          -0.00404,
           0.00019,          -0.00137,

           0.00128,          -0.00310,           0.00143,           0.00050,

           0.00000,           0.00000,

          -0.00023,          -0.00003,          -0.00057,          -0.00032,

          -0.00002,           0.00009,

          -0.09716,           0.04111,          -0.03108,           0.00633,
          -0.00220,          -0.00595,          -0.00279,           0.00491,

          -0.00004,          -0.00003,

          -0.00010,          -0.00004,

          -0.00013,          -0.00010,

           0.00017,          -0.00010,

          -0.00075,           0.00002,          -0.00054,          -0.00025,

           0.12572,           0.00948,           0.05937,           0.04900,
          -0.00785,           0.01815,          -0.00303,          -0.00120,

          -0.00010,           0.00010,

          -0.00317,          -0.00143,           0.00068,           0.00213,

          -0.00043,          -0.00420,           0.00406,          -0.00041,
           0.00048,           0.00062,

          -0.00005,           0.00029,

           0.00043,          -0.00002,

          -0.00126,          -0.00009,

          -0.00040,           0.00000,

           0.03557,           0.02143,          -0.02196,           0.04671,
          -0.05571,          -0.03425,

           0.00016,           0.00031,

           0.00020,          -0.00153,          -0.00142,          -0.00051,

          -0.00214,           0.00001,           0.00002,          -0.00061,

          -0.06824,           0.00030,          -0.05717,           0.04196,
           0.05887,           0.07531,           0.12313,          -0.04113,

           0.00025,           0.00021,

           0.02218,           0.01747,           0.00011,           0.01367,
          -0.00247,           0.00029,

           0.00120,          -0.00003,

           0.13373,          -0.02072,           0.06706,          -0.01009,
          -0.09515,          -0.01901,

           0.01767,           0.06939,          -0.06702,           0.04159,
          -0.02809,          -0.03968,

           0.00257,           0.00553,           0.00411,          -0.01309,

           0.00139,           0.01591,          -0.00322,           0.00245,

          -0.00202,           0.00093,

           0.01845,          -0.00018,          -0.00247,          -0.00771,

          -0.02834,          -0.00691,          -0.00154,          -0.01244,

           0.01512,           0.01884,          -0.00359,           0.00731,

          -0.05395,          -0.18108,           0.36303,          -0.12751,
           0.01877,           0.43653,

          -0.00725,          -0.00692,           0.00115,          -0.00327,

           0.04030,           0.01171,           0.00107,           0.01793,

           0.06335,          -0.02171,           0.02229,           0.03533,

          -0.06038,          -0.00356,           0.01325,          -0.03798,

           0.04963,          -0.06258,           0.08931,           0.04904,

           0.07115,          -0.00073,

          -0.00104,           0.00354,

          -0.01549,           0.00647,           0.04418,           0.01061,

           0.00568,           0.00957,           0.01102,          -0.00819,

          -0.00089,           0.00368,

          -0.00214,           0.00031,

          -1.11935,          -0.00029,

           0.00457,           0.00550,

           0.01409,           0.01664,          -0.00306,           0.00629,

           0.04531,           0.01460,           0.00092,           0.02074,

           0.07900,          -0.03241,           0.05122,           0.06151,

           0.01319,           0.03075,          -0.02814,           0.00329,

           0.00208,          -0.00681,

           0.09887,          -0.02956,           0.03410,           0.05617,

           0.00295,           0.00022,

           0.01727,          -0.00666,           0.00255,           0.00256,

          -0.14161,          -0.20656,           0.36936,          -0.35793,
           0.40122,           0.54675,

          -0.00109,          -0.00135,

           0.11179,          -0.13803,           0.19591,           0.11327,

          -0.08785,          -0.29929,           0.60319,          -0.20484,
           0.01418,           0.71392,

          -0.01039,          -0.01041,           0.00694,          -0.00183,

           0.00707,          -0.03745,           0.00943,          -0.00174,

           0.01781,           0.00069,           3.35806,          -0.06731,

          -0.01015,          -0.03402,          -0.00913,          -0.00094,

           0.01682,          -0.01066,           0.01361,           0.04752,

           0.97349,           0.00504,

           0.20303,          -0.00206,

           0.00012,           0.00327,

           0.00504,           0.00040,

          -0.01599,          -0.00570,

          -0.19375,          -0.14714,           0.03820,          -0.08283,

          -0.07716,           0.10543,          -0.06772,           0.01131,

         163.23023,        -126.90743,        -183.43441,        -201.49515,
        -559.82622,         698.28238,        1696.58461,        1279.45831,
         771.51923,       -3358.57619,

          -0.05911,           0.89279,          -0.15861,           0.28577,
          -0.06958,           0.02406,

           0.01999,           0.00382,

          -0.00934,           0.00014,

           0.01792,          -0.04249,           0.01019,          -0.00210,

          -0.00386,           0.00009,

          -0.01353,           0.00101,

          -0.03828,          -0.01677,          -0.02026,           0.03079,

          -0.00285,          -0.02484,           0.00537,          -0.00397,

          -0.00064,           0.00906,

          -0.00411,           0.00100,

          -0.06940,          -0.01482,

          -0.01966,          -0.02171,           0.00388,          -0.00840,

          -0.00621,          -0.00597,

          -0.03690,          -0.00959,          -0.00115,          -0.01557,

           3.24906,          -0.00580,

           0.00745,           0.03347,          -0.04023,           0.02174,
          -0.01544,          -0.02389,

           0.00935,          -0.00141,          -0.02018,           0.03258,
          -0.04479,          -0.02360,

          -0.00542,          -0.00194,

          -0.07906,           0.00273,

          -0.08439,           0.01534,          -0.00264,          -0.09205,

          -0.00539,           0.00220,

           0.01263,           0.01593,           0.01103,          -0.03324,

          -0.02720,           0.04749,          -0.05099,           0.01807,

          -0.00443,           0.00024,

          -0.01386,           0.00029,          -0.00443,          -0.00591,

          -0.11899,           0.15817,          -0.37728,           0.06552,

          -0.00669,          -0.00140,

          -0.01168,          -0.00690,

          -0.01032,           0.04315,          -0.01082,           0.00123,

           0.01192,          -0.01071,          -1.90746,           0.00700,

           0.00779,           0.04261,           0.01052,           0.00173,

          -0.02138,           0.00307,

           0.50118,          -0.00330,

          -0.00111,           0.01624,

          -0.02601,           0.00305,           0.02348,           0.07058,

          -0.07622,           0.00006,

          -0.00183,           0.01636,

          -0.00037,           0.00564,

           4.72127,           3.53639,          13.37363,          -6.68745,
         -12.29946,         -22.51893,         -27.18616,          22.85033,
          25.89912,          12.56594,

          -0.02566,           0.00307,          -0.00064,          -0.02727,

          -0.02634,          -0.01101,          -0.01029,           0.04755,

          -0.00372,          -0.00292,

          -0.00582,          -0.00053,

           0.17840,           0.00027,

          -0.03400,           0.00357,

          -0.13428,          -0.00611,

           0.00099,          -0.01169,

           0.01909,           0.01338,           0.01302,          -0.03071,

          -0.00051,           0.00577,

           0.61945,          -0.32627,          -0.30811,          -0.60197,
          -0.22597,           0.28183,

           0.07739,           0.00011,

           0.01336,          -0.00010,

           0.00049,          -0.00592,

          -0.01407,          -0.00081,

           0.00146,          -0.00280,

           0.03795,           0.00003,

           0.01173,          -0.00655,          -0.00344,          -0.00403,

           0.00036,          -0.00047,           0.02000,           0.00001,

           0.01105,           0.00002,

           0.00620,          -0.00052,

  ];

  this.earargs = [
  0,  3,
  3,  4,  3, -8,  4,  3,  5,  2,
  2,  2,  5, -5,  6,  1,
  3,  2,  2,  1,  3, -8,  4,  0,
  3,  3,  2, -7,  3,  4,  4,  1,
  3,  7,  3,-13,  4, -1,  5,  0,
  2,  8,  2,-13,  3,  3,
  3,  1,  2, -8,  3, 12,  4,  0,
  1,  1,  8,  0,
  1,  1,  7,  0,
  2,  1,  5, -2,  6,  0,
  3,  3,  3, -6,  4,  2,  5,  1,
  2,  8,  3,-15,  4,  3,
  2,  2,  5, -4,  6,  0,
  1,  1,  6,  1,
  2,  9,  3,-17,  4,  2,
  3,  3,  2, -5,  3,  1,  5,  0,
  3,  2,  3, -4,  4,  2,  5,  0,
  3,  3,  2, -5,  3,  2,  5,  0,
  2,  1,  5, -1,  6,  0,
  2,  1,  3, -2,  4,  2,
  2,  2,  5, -3,  6,  0,
  1,  2,  6,  1,
  2,  3,  5, -5,  6,  1,
  1,  1,  5,  3,
  2,  1,  5, -5,  6,  0,
  2,  7,  3,-13,  4,  2,
  2,  2,  5, -2,  6,  0,
  2,  3,  2, -5,  3,  2,
  2,  2,  3, -4,  4,  2,
  2,  5,  2, -8,  3,  1,
  2,  6,  3,-11,  4,  1,
  2,  1,  1, -4,  3,  0,
  1,  2,  5,  1,
  2,  3,  3, -6,  4,  1,
  2,  5,  3, -9,  4,  1,
  2,  2,  2, -3,  3,  2,
  2,  4,  3, -8,  4,  1,
  2,  4,  3, -7,  4,  1,
  2,  3,  3, -5,  4,  1,
  2,  1,  2, -2,  3,  1,
  2,  2,  3, -3,  4,  1,
  2,  1,  3, -1,  4,  0,
  2,  4,  2, -7,  3,  0,
  2,  4,  2, -6,  3,  1,
  1,  1,  4,  1,
  2,  1,  3, -3,  4,  0,
  2,  7,  3,-12,  4,  0,
  2,  1,  2, -1,  3,  0,
  2,  1,  3, -4,  5,  0,
  2,  6,  3,-10,  4,  1,
  2,  5,  3, -8,  4,  1,
  2,  1,  3, -3,  5,  1,
  2,  2,  2, -4,  3,  1,
  2,  6,  2, -9,  3,  0,
  2,  4,  3, -6,  4,  1,
  3,  1,  3, -3,  5,  2,  6,  0,
  2,  1,  3, -5,  6,  1,
  2,  1,  3, -2,  5,  2,
  3,  1,  3, -4,  5,  5,  6,  0,
  2,  3,  3, -4,  4,  1,
  2,  3,  2, -4,  3,  2,
  2,  1,  3, -3,  6,  1,
  3,  1,  3,  1,  5, -5,  6,  1,
  2,  1,  3, -1,  5,  1,
  3,  1,  3, -3,  5,  5,  6,  1,
  2,  1,  3, -2,  6,  1,
  2,  2,  3, -2,  4,  0,
  2,  1,  3, -1,  6,  0,
  2,  1,  3, -2,  7,  0,
  2,  1,  3, -1,  7,  0,
  2,  8,  2,-14,  3,  0,
  3,  1,  3,  2,  5, -5,  6,  1,
  3,  5,  3, -8,  4,  3,  5,  1,
  1,  1,  3,  4,
  3,  3,  3, -8,  4,  3,  5,  2,
  2,  8,  2,-12,  3,  0,
  3,  1,  3,  1,  5, -2,  6,  0,
  2,  9,  3,-15,  4,  1,
  2,  1,  3,  1,  6,  0,
  1,  2,  4,  0,
  2,  1,  3,  1,  5,  1,
  2,  8,  3,-13,  4,  1,
  2,  3,  2, -6,  3,  0,
  2,  1,  3, -4,  4,  0,
  2,  5,  2, -7,  3,  0,
  2,  7,  3,-11,  4,  1,
  2,  1,  1, -3,  3,  0,
  2,  6,  3, -9,  4,  1,
  2,  2,  2, -2,  3,  0,
  2,  5,  3, -7,  4,  2,
  2,  4,  3, -5,  4,  2,
  2,  1,  2, -3,  3,  0,
  2,  3,  3, -3,  4,  0,
  2,  4,  2, -5,  3,  1,
  2,  2,  3, -5,  5,  0,
  1,  1,  2,  1,
  2,  2,  3, -4,  5,  1,
  3,  2,  3, -4,  5,  2,  6,  0,
  2,  6,  3, -8,  4,  1,
  2,  2,  3, -3,  5,  1,
  2,  6,  2, -8,  3,  0,
  2,  5,  3, -6,  4,  0,
  2,  2,  3, -5,  6,  1,
  2,  2,  3, -2,  5,  1,
  3,  2,  3, -4,  5,  5,  6,  1,
  2,  4,  3, -4,  4,  0,
  2,  3,  2, -3,  3,  0,
  2,  2,  3, -3,  6,  0,
  2,  2,  3, -1,  5,  1,
  2,  2,  3, -2,  6,  0,
  2,  3,  3, -2,  4,  0,
  2,  2,  3, -1,  6,  0,
  1,  2,  3,  4,
  2,  5,  2, -6,  3,  1,
  2,  2,  2, -1,  3,  1,
  2,  6,  3, -7,  4,  0,
  2,  5,  3, -5,  4,  0,
  2,  4,  2, -4,  3,  0,
  2,  3,  3, -4,  5,  0,
  2,  3,  3, -3,  5,  0,
  2,  6,  2, -7,  3,  0,
  2,  3,  3, -2,  5,  1,
  2,  3,  2, -2,  3,  0,
  1,  3,  3,  2,
  2,  5,  2, -5,  3,  0,
  2,  1,  1, -1,  3,  0,
  2,  7,  2, -8,  3,  0,
  2,  4,  3, -4,  5,  0,
  2,  4,  3, -3,  5,  0,
  2,  6,  2, -6,  3,  0,
  1,  4,  3,  1,
  2,  7,  2, -7,  3,  1,
  2,  8,  2, -8,  3,  0,
  2,  9,  2, -9,  3,  0,
 -1
  ];

  this.ear404 = new Plantbl(
      [1,  9, 14, 17,  5,  5,  2,  1,  0],
                               4,
                               this.earargs,
                               this.eartabl,
                               this.eartabb,
                               this.eartabr,
                               1.0
      );

  }
}

class SwemptabMar{
  constructor(){

  this.martabl = [
       43471.66140,       21291.11063,        2033.37848,  6890507597.78366,
     1279543.73631,

         317.74183,         730.69258,         -15.26502,         277.56960,
         -62.96711,          20.96285,

           1.01857,          -2.19395,

           3.75708,           3.65854,           0.01049,           1.09183,

          -0.00605,          -0.04769,

           0.41839,           0.10091,           0.03887,           0.11666,

          -0.03301,           0.02664,

           0.38777,          -0.56974,

           0.02974,          -0.15041,           0.02179,          -0.00808,

           0.08594,           0.09773,

          -0.00902,          -0.04597,           0.00762,          -0.03858,

          -0.00139,           0.01562,

           0.02019,           0.01878,

          -0.01244,           0.00795,

           0.00815,           0.03501,

          -0.00335,          -0.02970,

          -0.00518,          -0.01763,

           0.17257,           0.14698,          -0.14417,           0.26028,

           0.00062,          -0.00180,

          13.35262,          39.38771,         -15.49558,          22.00150,
          -7.71321,          -4.20035,           0.62074,          -1.42376,

           0.07043,          -0.06670,           0.16960,          -0.06859,
           0.07787,           0.01845,

          -0.01608,          -0.00914,

           5.60438,          -3.44436,           5.88876,           6.77238,
          -5.29704,           3.48944,

           0.01291,           0.01280,

          -0.53532,           0.86584,           0.79604,           0.31635,

          -3.92977,          -0.94829,          -0.74254,          -1.37947,
           0.17871,          -0.12477,

           0.00171,           0.11537,

           0.02281,          -0.03922,

          -0.00165,           0.02965,

           1.59773,           1.24565,          -0.35802,           1.37272,
          -0.44811,          -0.08611,

           3.04184,          -3.39729,           8.86270,           6.65967,
          -9.10580,          10.66103,

           0.02015,          -0.00902,

          -0.01166,          -0.23957,          -0.12128,          -0.04640,

          -0.07114,           0.14053,          -0.04966,          -0.01665,

           0.28411,          -0.37754,          -1.26265,           1.01377,
           3.70433,          -0.21025,

          -0.00972,           0.00350,

           0.00997,           0.00450,

          -2.15305,           3.18147,          -1.81957,          -0.02321,
          -0.02560,          -0.35188,

           0.00003,          -0.01110,

           0.00244,          -0.05083,

          -0.00216,          -0.02026,

           0.05179,           0.04188,

           5.92031,          -1.61316,           3.72001,           6.98783,
          -4.17690,           2.61250,

           0.04157,           2.76453,          -1.34043,           0.74586,
          -0.20258,          -0.30467,

           0.00733,           0.00376,

           1.72800,           0.76593,           1.26577,          -2.02682,
          -1.14637,          -0.91894,

          -0.00002,           0.00036,

           2.54213,           0.89533,          -0.04166,           2.36838,
          -0.97069,           0.05486,

           0.46927,           0.04500,           0.23388,           0.35005,

           1.61402,           2.30209,          -0.99859,           1.63349,
          -0.51490,          -0.26112,

           0.27848,          -0.26100,          -0.07645,          -0.22001,

           0.92901,           1.12627,          -0.39829,           0.77120,
          -0.23716,          -0.11245,

          -0.02387,           0.03960,

          -0.00802,           0.02179,

           2.86448,           1.00246,          -0.14647,           2.80278,
          -1.14143,           0.05177,

           1.68671,          -1.23451,           3.16285,           0.70070,
           0.25817,           3.17416,

           0.07447,          -0.08116,          -0.03029,          -0.02795,

           0.00816,           0.01023,

           0.00685,          -0.01075,

          -0.34268,           0.03680,          -0.05488,          -0.07430,

          -0.00041,          -0.02968,

           3.13228,          -0.83209,           1.95765,           3.78394,
          -2.26196,           1.38520,

          -0.00401,          -0.01397,

           1.01604,          -0.99485,           0.62465,           0.22431,
          -0.05076,           0.12025,

           4.35229,          -5.04483,          14.87533,           9.00826,
         -10.37595,          19.26596,

           0.40352,           0.19895,           0.09463,          -0.10774,

          -0.17809,          -0.08979,          -0.00796,          -0.04313,

           0.01520,          -0.03538,

           1.53301,          -1.75553,           4.87236,           3.23662,
          -3.62305,           6.42351,

          -0.00439,          -0.01305,

           0.17194,          -0.64003,           0.26609,           0.06600,

           0.01767,          -0.00251,

          -0.08871,          -0.15523,           0.01201,          -0.03408,

          -0.29126,          -0.07093,          -0.00998,          -0.07876,

           1.05932,         -25.38650,

          -0.29354,           0.04179,          -0.01726,           0.07473,

          -0.07607,          -0.08859,           0.00842,          -0.02359,

           0.47858,          -0.39809,           1.25061,           0.87017,
          -0.82453,           1.56864,

          -0.00463,           0.02385,

          -0.29070,           8.56535,

          -0.12495,           0.06580,          -0.03395,          -0.02465,

          -1.06759,           0.47004,          -0.40281,          -0.23957,
           0.03572,          -0.07012,

           0.00571,          -0.00731,

           0.18601,          -1.34068,

           0.03798,          -0.00532,           0.00448,          -0.01147,

           1.41208,          -0.00668,           0.25883,           1.23788,
          -0.57774,           0.09166,

          -2.49664,          -0.25235,          -0.53582,          -0.80126,
           0.10827,          -0.08861,

          -0.03577,           0.06825,

          -0.00143,           0.04633,

           0.01586,          -0.01056,

          -0.02106,           0.03804,

          -0.00088,          -0.03458,

          -0.00033,          -0.01079,

           0.05821,          -0.02445,

           0.00602,           0.00721,

          -0.00315,          -0.01021,

          -0.65454,           1.08478,          -0.44593,          -0.21492,

          -1.35004,           4.47299,          -4.19170,           3.51236,

        1946.04629,       13960.88247,         576.24572,        8023.81797,
        2402.48512,        -753.87007,       -6376.99217,      -10278.88014,
      -25743.89874,       15506.87748,       15609.59853,       35173.63133,

          -3.70370,           6.29538,          -4.84183,          -0.76942,

          -0.02465,          -0.03840,

           0.00565,          -0.06071,

           0.01174,           0.00253,

          -0.00230,           0.05252,

          -0.02813,           0.01359,

           0.23208,           0.03393,           0.01734,           0.04838,

          -0.46340,          -0.18941,           0.25428,          -0.56925,

           0.05213,           0.24704,           0.12922,          -0.01531,

           0.06885,          -0.08510,           0.01853,          -0.00390,

           0.01196,          -0.30530,           0.13117,          -0.03533,

           1.79597,          -0.42743,           0.98545,           2.13503,
          -1.32942,           0.68005,

          -0.01226,           0.00571,

           0.31081,           0.34932,           0.34531,          -0.32947,

          -0.00548,           0.00186,          -0.00157,          -0.00065,

           0.30877,          -0.03864,           0.04921,           0.06693,

           0.01761,          -0.04119,

           1.28318,           0.38546,           0.06462,           1.18337,
          -0.48698,           0.07086,

           0.26031,          -0.22813,           0.10272,           0.04737,

          -0.04506,          -0.38581,          -0.16624,          -0.04588,

           0.00992,           0.00722,

          -0.21041,           0.20560,          -0.09267,          -0.03438,

           0.32264,          -0.07383,

           0.09553,          -0.38730,           0.17109,          -0.01342,

          -0.02336,          -0.01286,

           0.00230,           0.04626,

           0.01176,           0.01868,

          -0.15411,          -0.32799,           0.22083,          -0.14077,

           1.98392,           1.68058,

          -0.02526,          -0.13164,          -0.04447,          -0.00153,

           0.01277,           0.00553,

          -0.26035,          -0.11362,           0.14672,          -0.32242,

           0.16686,          -0.69957,           0.40091,          -0.06721,
           0.00837,           0.09635,

          -0.08545,           0.25178,          -0.22486,          16.03256,

           0.34130,          -0.06313,           0.01469,          -0.09012,

          -0.00744,          -0.02510,

          -0.08492,          -0.13733,

          -0.07620,          -0.15329,           0.13716,          -0.03769,

           2.01176,          -1.35991,          -1.04319,          -2.97226,

          -0.01433,           0.61219,

          -0.55522,           0.38579,           0.31831,           0.81843,

          -0.04583,          -0.14585,

          -0.10218,           0.16039,          -0.06552,          -0.01802,

           0.06480,          -0.06641,           0.01672,          -0.00287,

           0.00308,           0.09982,          -0.05679,          -0.00249,

          -0.36034,           0.52385,          -0.29759,           0.59539,

          -3.59641,          -1.02499,

        -547.53774,         734.11470,         441.86760,        -626.68255,
       -2255.81376,       -1309.01028,       -2025.69590,        2774.69901,
        1711.21478,        1509.99797,

          -0.99274,           0.61858,          -0.47634,          -0.33034,

           0.00261,           0.01183,

          -0.00038,           0.11687,

           0.00994,          -0.01122,

           0.03482,          -0.01942,

          -0.11557,           0.38237,          -0.17826,           0.00830,

           0.01193,          -0.05469,

           0.01557,           0.01747,

           0.02730,          -0.01182,

          -0.11284,           0.12939,          -0.05621,          -0.01615,

           0.04258,           0.01058,

          -0.01723,           0.00963,

           0.20666,           0.11742,

           0.07830,          -0.02922,

          -0.10659,          -0.05407,           0.07254,          -0.13005,

          -0.02365,           0.24583,           0.31915,           1.27060,

           0.00009,          -0.21541,

          -0.55324,          -0.45999,          -1.45885,           0.86530,
           0.85932,           1.92999,

          -0.00755,          -0.00715,

          -0.02004,          -0.00788,

           0.01539,           0.00837,

           0.27652,          -0.50297,          -0.26703,          -0.28159,

           0.03950,           0.07182,

          -0.07177,           0.14140,           0.07693,           0.07564,

          -0.01316,          -0.01259,

           0.01529,           0.07773,

         -90.74225,        -378.15784,        -510.30190,         -52.35396,
         -89.15267,         415.56828,         181.52119,          54.01570,

          -0.01093,          -0.05931,

          -0.01344,          -0.02390,

           0.01432,          -0.02470,

          -0.01509,          -0.01346,

           0.03352,           0.02248,

           0.02588,          -0.00948,

           0.03610,           0.17238,

           0.02909,          -0.04065,

           0.00155,          -0.07025,

          -0.09508,           0.14487,           0.12441,           0.16451,

           0.00001,          -0.00005,

          -0.00982,          -0.01895,

          -0.16968,           0.36565,           0.20234,           0.17789,

          -0.04519,          -0.00588,

           0.01268,           0.00107,

         -56.32137,         -58.22145,         -80.55270,          28.14532,
          11.43301,          52.05752,          17.79480,          -2.61997,

          -0.00005,          -0.02629,

           0.01080,          -0.00390,

           0.00744,           0.03132,

           0.01156,          -0.01621,

           0.02162,           0.02552,

           0.00075,          -0.02497,

           0.02495,           0.00830,

           0.03230,           0.00103,

         -14.84965,          -4.50200,          -9.73043,           9.40426,
           4.08054,           5.38571,           1.53731,          -1.01288,

           0.21076,           1.74227,           0.79760,           0.39583,
           0.09879,          -0.16736,

          -0.00723,          -0.01536,

  ];
  this.martabb = [
        -364.49380,         -47.17612,        -554.97858,        -430.63121,
         596.44312,

          -3.94434,          -7.43169,          -0.06665,          -2.23987,
           0.10366,          -0.05567,

          -0.01463,           0.01908,

          -0.02611,          -0.00350,          -0.01057,          -0.00610,

          -0.00015,           0.00002,

           0.00010,           0.00033,           0.00007,          -0.00000,

          -0.00010,          -0.00004,

           0.00012,           0.00002,

          -0.00014,          -0.00048,          -0.00003,          -0.00007,

           0.00008,          -0.00005,

          -0.00043,          -0.00003,          -0.00010,          -0.00004,

           0.00001,           0.00001,

          -0.00003,          -0.00003,

           0.00004,           0.00007,

          -0.00041,           0.00031,

           0.00076,           0.00062,

           0.00001,          -0.00002,

           0.00035,           0.00053,           0.00026,           0.00019,

           0.00020,           0.00010,

           0.02936,           0.09624,          -0.01153,           0.01386,
           0.00551,          -0.00690,           0.00196,           0.00148,

          -0.00408,          -0.00673,          -0.00067,          -0.00152,
          -0.00014,          -0.00005,

           0.00000,           0.00005,

          -0.00116,           0.00276,          -0.00391,           0.00983,
          -0.01327,          -0.01986,

          -0.00003,           0.00001,

           0.01104,           0.00631,          -0.01364,           0.01152,

          -0.00439,           0.01103,          -0.00546,           0.00181,
          -0.00039,          -0.00083,

           0.00007,           0.00002,

          -0.00010,          -0.00008,

           0.00005,           0.00002,

          -0.00584,           0.00512,          -0.00722,          -0.00174,
           0.00101,          -0.00316,

          -0.02229,          -0.02797,          -0.10718,           0.05741,
           0.11403,           0.10033,

           0.00036,          -0.00022,

           0.00787,           0.01191,           0.01756,          -0.02121,

          -0.00169,          -0.00364,           0.00070,          -0.00051,

           0.01850,          -0.06836,           0.21471,           0.00162,
          -0.29165,           0.16799,

          -0.00002,           0.00011,

          -0.00075,          -0.00077,

          -0.00675,          -0.00814,           0.00029,          -0.00599,
           0.00107,           0.00013,

           0.00010,          -0.00002,

           0.00005,           0.00020,

           0.00355,           0.00306,

          -0.00013,          -0.00061,

          -0.02950,          -0.00847,           0.01037,          -0.04783,
           0.04237,           0.11662,

          -0.00331,           0.00207,          -0.00107,          -0.00264,
           0.00072,          -0.00023,

          -0.00151,           0.00146,

          -0.12847,           0.02294,           0.03611,           0.19705,
           0.16855,          -0.28279,

          -0.00000,          -0.00002,

          -0.00525,          -0.03619,           0.05048,          -0.00481,
          -0.00745,           0.04618,

           0.00286,           0.00443,           0.00521,          -0.00351,

           0.00200,           0.00474,          -0.00149,           0.00031,
          -0.00003,           0.00029,

           0.00686,           0.02467,           0.04275,          -0.02223,

           0.02282,          -0.04228,           0.03312,           0.01847,
          -0.01253,           0.01601,

           0.00076,           0.00091,

           0.00045,           0.00035,

           0.00658,           0.01586,          -0.00310,           0.00628,
          -0.00045,           0.00316,

          -0.01602,          -0.00340,          -0.01744,           0.04907,
           0.06426,           0.02275,

          -0.00217,          -0.00377,          -0.00091,           0.00037,

           0.00040,          -0.00003,

          -0.00017,          -0.00027,

           0.00366,           0.02693,          -0.00934,           0.00386,

           0.00616,          -0.00037,

           0.02028,           0.02120,          -0.01768,           0.02421,
           0.00102,           0.00877,

           0.00012,           0.00030,

          -0.00019,          -0.02165,           0.01245,          -0.00742,
           0.00172,           0.00320,

          -0.17117,          -0.12908,          -0.43134,           0.15617,
           0.21216,           0.56432,

           0.01139,          -0.00937,          -0.00058,          -0.00337,

          -0.00999,           0.01862,          -0.00621,          -0.00080,

          -0.00025,          -0.00140,

           0.09250,           0.01173,          -0.03549,           0.14651,
          -0.01784,           0.00945,

           0.00000,          -0.00006,

          -0.00500,           0.00086,           0.01079,          -0.00002,

          -0.00012,          -0.00029,

          -0.02661,           0.00140,          -0.00524,          -0.00460,

          -0.00352,          -0.00563,          -0.00277,          -0.00052,

          -0.10171,          -0.02001,

           0.00045,           0.00265,          -0.00082,           0.00160,

          -0.00302,          -0.00434,          -0.00022,          -0.00134,

           0.03285,           0.02964,          -0.05612,          -0.00668,
          -0.01821,           0.06590,

           0.00039,           0.00061,

          -0.13531,          -0.03831,

           0.02553,           0.02130,          -0.00336,           0.00468,

          -0.04522,          -0.05540,           0.00129,          -0.01767,
           0.00181,           0.00031,

          -0.00011,          -0.00034,

          -0.00146,           0.01101,

          -0.00030,           0.00240,          -0.00039,           0.00072,

          -0.01954,          -0.03822,           0.09682,          -0.04541,
          -0.01567,           0.09617,

          -0.03371,           0.33028,          -0.12102,           0.05874,
          -0.00990,          -0.02236,

           0.00109,           0.00158,

          -0.00482,           0.00019,

          -0.00036,           0.00004,

           0.00024,           0.00201,

           0.00017,           0.00011,

          -0.00012,           0.00002,

          -0.00323,          -0.01062,

          -0.00130,           0.00091,

           0.00056,          -0.00017,

           0.00774,           0.00601,           0.02550,           0.01700,

          -0.84327,           0.77533,          -0.71414,          -0.50643,

        -473.30877,       -1504.79179,        -458.52274,        -865.82237,
        -417.34994,        -681.03976,         765.50697,       -1653.67165,
        4427.33176,         710.53895,       -5016.39367,        4280.60361,

           0.33957,           0.38390,          -0.38631,           0.81193,

           0.00154,          -0.00043,

           0.01103,          -0.00017,

          -0.00046,           0.00221,

           0.00059,           0.00014,

           0.00160,           0.00475,

           0.06191,          -0.13289,           0.02884,          -0.00566,

          -0.01572,           0.23780,          -0.05140,          -0.03228,

          -0.00716,          -0.00978,          -0.01048,           0.01317,

          -0.01267,          -0.01198,           0.00037,          -0.00330,

          -0.02305,           0.00355,          -0.00121,          -0.00496,

          -0.04369,          -0.01343,           0.05347,          -0.12433,
           0.02090,           0.17683,

           0.00028,          -0.00490,

          -0.02778,          -0.05587,          -0.01658,           0.05655,

           0.00204,          -0.00092,           0.00020,           0.00014,

          -0.00603,          -0.03829,           0.00778,          -0.00588,

          -0.00266,           0.00097,

          -0.02158,          -0.07742,           0.09306,          -0.01827,
          -0.01048,           0.07885,

          -0.02485,          -0.02505,           0.00471,          -0.01026,

           0.06663,           0.01110,           0.00469,          -0.05347,

          -0.00016,          -0.00013,

           0.02622,           0.02273,          -0.01009,           0.01391,

          -0.01042,          -0.00444,

          -0.04293,          -0.00767,          -0.00154,          -0.01739,

           0.00353,          -0.00763,

          -0.00060,           0.00010,

          -0.00053,          -0.00146,

          -0.05317,           0.05760,          -0.01801,          -0.02099,

          -0.02611,          -0.01836,

          -0.00256,           0.00812,          -0.00145,           0.00054,

          -0.00008,           0.00015,

          -0.04087,           0.08860,          -0.05385,          -0.02134,

           0.02771,           0.02441,          -0.00234,           0.01571,
          -0.00260,           0.00097,

           0.10151,           0.49378,          -0.28555,           0.11428,

          -0.00286,           0.01224,           0.00160,           0.00069,

           0.00000,          -0.00040,

          -0.13286,           0.00448,

           0.01225,          -0.00568,           0.00341,           0.00224,

          -0.23483,          -0.07859,           0.30733,          -0.21548,

          -0.02608,           0.00756,

           0.09789,           0.02878,          -0.11968,           0.08981,

           0.02046,          -0.00888,

           0.02955,           0.01486,          -0.00981,           0.01542,

          -0.01674,          -0.01540,           0.00019,          -0.00449,

          -0.02140,           0.00638,           0.00112,          -0.00730,

          -0.08571,           0.13811,          -0.16951,          -0.02917,

          -0.03931,          -0.32643,

         -68.64541,         -81.00521,         -47.97737,          15.75290,
         181.76392,         -36.00647,         -48.32098,        -259.02226,
        -265.57466,         554.05904,

           0.09017,           0.18803,          -0.12459,           0.10852,

           0.00211,           0.00002,

           0.00304,          -0.00370,

           0.00174,           0.00279,

           0.00139,           0.00095,

           0.04881,           0.00262,          -0.01020,           0.03762,

           0.00987,           0.00612,

           0.00054,          -0.00036,

           0.00009,          -0.00094,

           0.02279,           0.01785,          -0.00778,           0.01263,

           0.00040,          -0.00112,

          -0.00452,          -0.00662,

           0.00483,          -0.00030,

          -0.00054,          -0.00205,

          -0.00052,          -0.00362,          -0.00215,          -0.00247,

           0.02893,          -0.01965,          -0.00004,           0.04114,

          -0.00284,          -0.00103,

           0.01827,          -0.07822,           0.18010,           0.04805,
          -0.21702,           0.18808,

           0.00095,          -0.00132,

          -0.01488,           0.00746,

           0.00198,           0.00190,

           0.01032,           0.03392,           0.04318,          -0.07332,

          -0.01004,           0.00787,

          -0.00308,          -0.01177,          -0.01431,           0.02659,

           0.00273,          -0.00374,

          -0.02545,           0.00644,

          28.68376,          13.74978,          29.60401,         -47.98255,
         -65.91944,         -18.48404,          -1.73580,          64.67487,

          -0.02492,           0.00104,

          -0.00829,          -0.00134,

           0.00077,           0.00005,

          -0.00513,           0.00403,

           0.00071,          -0.00047,

          -0.00023,          -0.00063,

           0.00120,           0.00370,

          -0.00038,          -0.00037,

           0.00080,          -0.00018,

           0.00866,           0.00156,          -0.01064,           0.02131,

           0.00000,          -0.00001,

           0.00038,          -0.00068,

          -0.00909,          -0.02187,          -0.02599,           0.05507,

          -0.00022,          -0.01468,

           0.00032,           0.00500,

           9.86233,          -2.85314,          -2.25791,         -13.83444,
         -12.38794,           3.79861,           2.76343,           6.63505,

           0.00066,           0.00007,

          -0.00016,          -0.00039,

           0.00014,           0.00059,

          -0.00031,          -0.00024,

          -0.00168,           0.00259,

           0.00007,          -0.00005,

          -0.00052,           0.00558,

           0.00110,           0.01037,

           1.59224,          -2.37284,          -2.00023,          -2.28280,
          -1.49571,           1.48293,           0.60041,           0.56376,

          -0.54386,           0.03568,          -0.10392,           0.31005,
           0.09104,           0.03015,

           0.00826,          -0.00524,

  ];
  this.martabr = [
        -816.07287,        -381.41365,         -33.69436,         177.22955,
           0.18630,

          -8.29605,         -11.15519,          -0.57407,          -3.53642,
           0.16663,          -0.06334,

          -0.03056,           0.02767,

          -0.04161,           0.03917,          -0.02425,           0.00204,

          -0.00034,           0.00023,

           0.00058,          -0.00111,           0.00039,          -0.00015,

           0.00006,          -0.00023,

           0.00237,           0.00191,

           0.00154,          -0.00029,           0.00009,           0.00011,

          -0.00041,           0.00037,

          -0.00010,          -0.00064,           0.00015,          -0.00005,

           0.00012,          -0.00003,

          -0.00034,           0.00026,

           0.00011,          -0.00007,

          -0.00158,           0.00087,

           0.00278,           0.00137,

           0.00024,          -0.00020,

           0.00530,          -0.00448,           0.00780,           0.00408,

           0.00062,           0.00035,

          -1.35261,           0.79891,          -0.81597,          -0.43774,
           0.14713,          -0.27415,           0.05298,           0.02230,

          -0.02089,          -0.01070,          -0.00374,           0.00342,
          -0.00142,           0.00270,

          -0.00039,           0.00063,

           0.16024,           0.27088,          -0.32127,           0.27467,
          -0.16615,          -0.24460,

          -0.00073,           0.00032,

          -0.05710,          -0.05265,          -0.06025,           0.05120,

          -0.05295,           0.23477,          -0.08211,           0.04575,
          -0.00769,          -0.01067,

          -0.00570,           0.00015,

          -0.00251,          -0.00140,

          -0.00131,          -0.00018,

          -0.12246,           0.15836,          -0.13065,          -0.03222,
           0.00795,          -0.04232,

          -0.36585,          -0.31154,           0.68504,          -0.96006,
           1.19304,           0.88631,

           0.00132,           0.00046,

           0.13105,           0.04252,           0.05164,          -0.06837,

          -0.01351,          -0.01458,           0.00376,          -0.00557,

           0.28532,          -0.17290,          -0.53946,          -0.79365,
          -0.95246,           0.74984,

           0.00019,           0.00132,

          -0.00163,          -0.00295,

          -0.40106,          -0.26573,          -0.00155,          -0.22655,
           0.04349,          -0.00376,

           0.00149,          -0.00001,

           0.00523,           0.00078,

           0.01203,           0.00558,

          -0.00708,           0.00520,

          -0.36428,          -1.28827,           1.50845,          -0.83063,
           0.58802,           0.89998,

          -0.55256,           0.01255,          -0.15169,          -0.26715,
           0.06061,          -0.04122,

          -0.00397,           0.00534,

          -0.52576,           1.22031,           1.44098,           0.92406,
           0.67214,          -0.85486,

          -0.00010,           0.00001,

           0.28820,          -0.84198,           0.78291,           0.00251,
           0.02398,           0.32093,

          -0.02331,           0.10109,          -0.07555,           0.03557,

          -0.61580,           0.43399,          -0.43779,          -0.26390,
           0.06885,          -0.13803,

           0.17694,           0.19245,           0.15119,          -0.05100,

           0.49469,          -0.45028,           0.33590,           0.15677,
          -0.04702,           0.10265,

          -0.00942,          -0.00580,

          -0.00555,          -0.00252,

          -0.32933,           0.92539,          -0.91004,          -0.04490,
          -0.01812,          -0.37121,

           0.34695,           0.50855,          -0.24721,           0.86063,
          -0.84747,           0.01983,

           0.01948,           0.02039,           0.00748,          -0.00727,

          -0.00271,           0.00220,

           0.00309,           0.00196,

           0.02030,           0.17201,          -0.03716,           0.02801,

           0.01871,           0.00002,

           0.31736,           1.17319,          -1.42245,           0.73416,
          -0.52302,          -0.85056,

           0.00522,          -0.00126,

           0.33571,           0.34594,          -0.07709,           0.21114,
          -0.04066,          -0.01742,

           1.72228,           1.46934,          -3.06437,           5.06723,
          -6.53800,          -3.55839,

          -0.06933,           0.13815,           0.03684,           0.03284,

          -0.04841,           0.09571,          -0.02350,           0.00418,

           0.01302,           0.00579,

           0.73408,           0.64718,          -1.37437,           2.04816,
          -2.70756,          -1.52808,

           0.00523,          -0.00166,

           0.25915,           0.06900,          -0.02758,           0.10707,

           0.00062,           0.00744,

          -0.08117,           0.04840,          -0.01806,          -0.00637,

           0.03034,          -0.12414,           0.03419,          -0.00388,

          10.92603,           0.48169,

          -0.01753,          -0.12853,          -0.03207,          -0.00801,

           0.03904,          -0.03326,           0.01033,           0.00366,

           0.17249,           0.20846,          -0.38157,           0.54639,
          -0.68518,          -0.36121,

          -0.01043,          -0.00186,

          -3.33843,          -0.16353,

           0.03462,           0.06669,          -0.01305,           0.01803,

          -0.22703,          -0.52219,           0.11709,          -0.19628,
           0.03410,           0.01741,

           0.00338,           0.00265,

           0.63213,           0.08944,

           0.00236,           0.01829,           0.00546,           0.00218,

           0.00073,          -0.72570,           0.63698,          -0.13340,
           0.04698,           0.29716,

          -0.13126,           1.27705,          -0.40980,           0.27400,
          -0.04525,          -0.05529,

          -0.03249,          -0.01696,

          -0.02314,          -0.00076,

           0.00510,           0.00764,

          -0.01847,          -0.01021,

           0.01688,          -0.00044,

           0.00531,          -0.00016,

          -0.01219,          -0.02903,

          -0.00361,           0.00299,

           0.00504,          -0.00153,

          -0.53625,          -0.32460,           0.10642,          -0.22070,

          -2.21651,          -0.66036,          -1.74652,          -2.08198,

       -6810.78679,         967.02869,       -3915.97140,         291.65905,
         372.99563,        1196.01966,        5108.01033,       -3172.64698,
       -7685.78246,      -12789.43898,      -17474.50562,        7757.84703,

           3.13224,           1.84743,          -0.38257,           2.40590,

           0.01860,          -0.01217,

           0.03004,           0.00278,

          -0.00125,           0.00579,

          -0.02673,          -0.00112,

           0.00662,           0.01374,

          -0.02729,           0.13109,          -0.02836,           0.00877,

           0.12171,          -0.27475,           0.34765,           0.15882,

          -0.12548,           0.02603,           0.00710,           0.06538,

          -0.04039,          -0.03257,          -0.00186,          -0.00880,

           0.16643,           0.00707,           0.01918,           0.07156,

          -0.20459,          -0.85107,           1.01832,          -0.47158,
           0.32582,           0.63002,

          -0.00282,          -0.00711,

          -0.19695,           0.15053,           0.15676,           0.17847,

           0.00071,           0.00286,          -0.00039,           0.00083,

           0.02009,           0.17859,          -0.03894,           0.02805,

           0.02379,           0.00752,

           0.17529,          -0.57783,           0.53257,          -0.02829,
           0.03211,           0.21777,

           0.13813,           0.16305,          -0.02996,           0.06303,

           0.21058,          -0.02659,           0.02596,          -0.08808,

          -0.00389,           0.00586,

           0.08986,           0.09204,          -0.01480,           0.04031,

           0.06115,           0.18366,

           0.25636,           0.06905,           0.00719,           0.11391,

           0.00636,          -0.01113,

          -0.02808,           0.00150,

          -0.01219,           0.00832,

           0.28626,          -0.09573,           0.10481,           0.16559,

          -0.94578,           1.26394,

           0.08846,          -0.01623,           0.00082,          -0.02640,

          -0.00347,           0.00798,

           0.12873,          -0.21248,           0.27999,           0.14348,

           0.44082,           0.10453,           0.04362,           0.25332,
          -0.06077,           0.00555,

          -0.06947,          -0.05511,         -10.08703,          -0.10614,

           0.04059,           0.21355,           0.05632,           0.00871,

           0.01599,          -0.00531,

           0.36835,          -0.03530,

           0.09519,          -0.04961,           0.02568,           0.08613,

           0.57033,           0.84599,           1.27123,          -0.41266,

          -0.36937,          -0.00655,

          -0.16547,          -0.24000,          -0.35213,           0.13345,

           0.05870,          -0.01524,

           0.06419,           0.04136,          -0.00681,           0.02606,

          -0.02519,          -0.02732,          -0.00105,          -0.00677,

          -0.03891,           0.00106,           0.00087,          -0.02256,

          -0.20834,          -0.14624,          -0.23178,          -0.11786,

           0.32479,          -1.41222,

        -303.74549,        -202.79324,         260.20290,         184.84320,
         536.68016,        -881.56427,       -1125.64824,        -791.09928,
        -596.61162,         659.35664,

           0.24561,           0.39519,          -0.12601,           0.18709,

          -0.00700,           0.00136,

           0.30750,           0.00009,

           0.00443,           0.00384,

           0.01170,           0.02078,

           0.15043,           0.04802,           0.00386,           0.06942,

           0.02107,           0.00495,

          -0.01067,           0.00951,

           0.00937,           0.01996,

           0.04922,           0.04337,          -0.00583,           0.02110,

          -0.00691,           0.02793,

          -0.00364,          -0.00682,

          -0.09143,           0.15369,

           0.02043,           0.05451,

           0.04053,          -0.08179,           0.09645,           0.05330,

          -0.10149,          -0.01594,          -0.96773,           0.13660,

           0.17326,           0.00013,

           0.20990,          -0.23184,          -0.38407,          -0.64733,
          -0.84754,           0.38889,

           0.00310,          -0.00340,

           0.00970,          -0.00788,

          -0.01111,           0.00677,

           0.18147,           0.09968,           0.10170,          -0.09233,

          -0.03165,           0.01790,

          -0.04727,          -0.02364,          -0.02546,           0.02451,

           0.00442,          -0.00426,

          -0.02540,           0.00471,

         130.42585,         -31.30051,          17.99957,        -174.75585,
        -142.96798,         -27.89752,         -19.42122,          59.14872,

          -0.01899,           0.00388,

          -0.01265,           0.00694,

           0.01966,           0.01140,

          -0.00439,           0.00503,

          -0.01867,           0.02826,

           0.00752,           0.02012,

          -0.14734,           0.01909,

           0.03312,           0.02327,

           0.05843,           0.00061,

          -0.06958,          -0.05798,          -0.09174,           0.06242,

           0.00003,           0.00001,

           0.00670,          -0.00305,

          -0.13637,          -0.06058,          -0.06372,           0.07257,

           0.00209,          -0.01369,

          -0.00044,           0.00355,

          17.90079,         -17.48270,          -8.77915,         -24.54483,
         -15.67123,           3.62668,           0.52038,           5.13220,

           0.02574,           0.00003,

           0.00339,           0.00919,

          -0.02778,           0.00464,

           0.01429,           0.01003,

          -0.01661,           0.01327,

           0.02216,           0.00034,

          -0.00389,           0.01076,

          -0.00035,           0.00983,

           1.23731,          -4.18017,          -2.61932,          -2.66346,
          -1.45540,           1.10310,           0.23322,           0.40775,

          -0.43623,           0.06212,          -0.09900,           0.19456,
           0.03639,           0.02566,

           0.00309,          -0.00116,

  ];

  this.marargs = [
  0,  4,
  3,  4,  3, -8,  4,  3,  5,  2,
  3,  5,  2, -6,  3, -4,  4,  0,
  2,  2,  5, -5,  6,  1,
  3, 12,  3,-24,  4,  9,  5,  0,
  3,  2,  2,  1,  3, -8,  4,  1,
  3, 11,  3,-21,  4,  2,  5,  0,
  3,  3,  2, -7,  3,  4,  4,  0,
  3,  7,  3,-13,  4, -1,  5,  1,
  3,  1,  3, -2,  4,  2,  6,  0,
  3,  1,  2, -8,  3, 12,  4,  1,
  3,  1,  4, -8,  5,  4,  6,  0,
  3,  1,  4, -7,  5,  2,  6,  0,
  3,  1,  4, -9,  5,  7,  6,  0,
  1,  1,  7,  0,
  2,  1,  5, -2,  6,  0,
  3,  1,  3, -2,  4,  1,  5,  0,
  3,  3,  3, -6,  4,  2,  5,  1,
  3, 12,  3,-23,  4,  3,  5,  0,
  2,  8,  3,-15,  4,  3,
  2,  1,  4, -6,  5,  2,
  3,  2,  2, -7,  3,  7,  4,  0,
  2,  1,  2, -3,  4,  2,
  2,  2,  5, -4,  6,  0,
  1,  1,  6,  1,
  2,  9,  3,-17,  4,  2,
  3,  2,  3, -4,  4,  2,  5,  0,
  3,  2,  3, -4,  4,  1,  5,  0,
  2,  1,  5, -1,  6,  0,
  2,  2,  2, -6,  4,  2,
  2,  1,  3, -2,  4,  2,
  2,  2,  5, -3,  6,  0,
  1,  2,  6,  1,
  2,  3,  5, -5,  6,  1,
  1,  1,  5,  2,
  3,  4,  3, -8,  4,  2,  5,  0,
  2,  1,  5, -5,  6,  0,
  2,  7,  3,-13,  4,  2,
  2,  3,  2, -9,  4,  0,
  2,  2,  5, -2,  6,  0,
  1,  3,  6,  0,
  2,  1,  4, -5,  5,  0,
  2,  2,  3, -4,  4,  2,
  2,  6,  3,-11,  4,  2,
  2,  4,  5, -5,  6,  0,
  1,  2,  5,  2,
  3,  1,  4, -3,  5, -3,  6,  0,
  2,  3,  3, -6,  4,  2,
  2,  1,  4, -4,  5,  1,
  2,  5,  3, -9,  4,  2,
  1,  3,  5,  1,
  2,  4,  3, -8,  4,  2,
  3,  1,  4, -4,  5,  2,  6,  0,
  3,  1,  4, -1,  5, -5,  6,  0,
  2,  4,  3, -7,  4,  2,
  2,  1,  4, -3,  5,  2,
  3,  1,  4, -5,  5,  5,  6,  1,
  3,  1,  4, -4,  5,  3,  6,  0,
  3,  1,  4, -3,  5,  1,  6,  0,
  2,  5,  3,-10,  4,  1,
  1,  4,  5,  0,
  2,  3,  3, -5,  4,  2,
  3,  1,  4, -3,  5,  2,  6,  0,
  2,  1,  4, -5,  6,  2,
  2,  1,  4, -2,  5,  2,
  3,  1,  4, -4,  5,  5,  6,  1,
  2,  6,  3,-12,  4,  1,
  2,  1,  4, -4,  6,  0,
  2,  2,  3, -3,  4,  2,
  2, 10,  3,-18,  4,  0,
  2,  1,  4, -3,  6,  1,
  3,  1,  4, -2,  5,  2,  6,  0,
  2,  7,  3,-14,  4,  1,
  3,  1,  4,  1,  5, -5,  6,  1,
  2,  1,  4, -1,  5,  0,
  3,  1,  4, -3,  5,  5,  6,  1,
  3,  1,  4,  2,  5, -7,  6,  1,
  2,  1,  4, -2,  6,  2,
  3,  1,  4, -2,  5,  3,  6,  0,
  2,  1,  3, -1,  4,  0,
  2,  2,  2, -7,  4,  1,
  2,  9,  3,-16,  4,  2,
  2,  1,  4, -3,  7,  0,
  2,  1,  4, -1,  6,  0,
  3,  1,  4, -2,  5,  4,  6,  1,
  2,  1,  2, -4,  4,  2,
  2,  8,  3,-16,  4,  2,
  2,  1,  4, -2,  7,  0,
  3,  3,  3, -5,  4,  2,  5,  0,
  3,  1,  4,  1,  5, -3,  6,  0,
  2,  1,  4, -2,  8,  0,
  2,  1,  4, -1,  7,  0,
  2,  1,  4, -1,  8,  0,
  3,  3,  2, -7,  3,  3,  4,  0,
  3,  2,  2,  1,  3, -7,  4,  0,
  3,  1,  4,  1,  6, -3,  7,  0,
  3,  1,  4,  2,  5, -5,  6,  1,
  3,  4,  3, -7,  4,  3,  5,  1,
  1,  1,  4,  5,
  3,  4,  3, -9,  4,  3,  5,  1,
  3,  1,  4, -2,  5,  5,  6,  0,
  3,  3,  2, -7,  3,  5,  4,  0,
  3,  1,  3, -1,  4,  2,  6,  0,
  3,  1,  4,  1,  5, -2,  6,  0,
  3,  3,  3, -7,  4,  2,  5,  0,
  2,  8,  3,-14,  4,  1,
  2,  1,  2, -2,  4,  1,
  2,  1,  4,  1,  6,  1,
  2,  9,  3,-18,  4,  1,
  2,  2,  2, -5,  4,  1,
  2,  1,  3, -3,  4,  2,
  2,  1,  4,  2,  6,  0,
  2,  1,  4,  1,  5,  1,
  3,  4,  3, -9,  4,  2,  5,  1,
  2,  7,  3,-12,  4,  1,
  2,  2,  4, -5,  5,  0,
  2,  2,  3, -5,  4,  2,
  2,  6,  3,-10,  4,  1,
  2,  1,  4,  2,  5,  1,
  3,  2,  4, -5,  5,  2,  6,  0,
  2,  3,  3, -7,  4,  1,
  2,  2,  4, -4,  5,  0,
  2,  5,  3, -8,  4,  1,
  2,  1,  4,  3,  5,  0,
  3,  2,  4, -4,  5,  2,  6,  0,
  3,  2,  4, -1,  5, -5,  6,  0,
  2,  4,  3, -6,  4,  1,
  2,  2,  4, -3,  5,  0,
  3,  2,  4, -5,  5,  5,  6,  1,
  3,  2,  4, -4,  5,  3,  6,  0,
  2,  3,  3, -4,  4,  1,
  2,  2,  4, -5,  6,  2,
  2,  2,  4, -2,  5,  1,
  3,  2,  4, -4,  5,  5,  6,  1,
  2,  2,  4, -4,  6,  0,
  2,  2,  3, -2,  4,  0,
  2,  2,  4, -3,  6,  1,
  2,  2,  4, -1,  5,  1,
  2,  2,  4, -2,  6,  0,
  1,  1,  3,  1,
  2,  2,  4, -1,  6,  0,
  2,  1,  2, -5,  4,  1,
  2,  8,  3,-17,  4,  1,
  3,  2,  4,  2,  5, -5,  6,  1,
  3,  4,  3, -6,  4,  3,  5,  1,
  3, 10,  3,-17,  4,  3,  6,  0,
  1,  2,  4,  4,
  3,  4,  3,-10,  4,  3,  5,  1,
  2,  8,  3,-13,  4,  0,
  2,  1,  2, -1,  4,  0,
  2,  2,  4,  1,  6,  0,
  2,  2,  2, -4,  4,  0,
  2,  1,  3, -4,  4,  1,
  2,  2,  4,  1,  5,  0,
  2,  7,  3,-11,  4,  0,
  2,  3,  4, -5,  5,  0,
  2,  2,  3, -6,  4,  1,
  2,  6,  3, -9,  4,  0,
  2,  2,  4,  2,  5,  0,
  2,  3,  4, -4,  5,  0,
  2,  5,  3, -7,  4,  0,
  2,  4,  3, -5,  4,  1,
  2,  3,  4, -3,  5,  1,
  2,  3,  3, -3,  4,  0,
  2,  3,  4, -2,  5,  2,
  3,  3,  4, -4,  5,  5,  6,  0,
  2,  2,  3, -1,  4,  0,
  2,  3,  4, -3,  6,  0,
  2,  3,  4, -1,  5,  1,
  2,  3,  4, -2,  6,  0,
  2,  1,  3,  1,  4,  1,
  2,  3,  4, -1,  6,  0,
  3,  4,  3, -5,  4,  3,  5,  0,
  1,  3,  4,  3,
  3,  4,  3,-11,  4,  3,  5,  0,
  1,  1,  2,  0,
  2,  2,  2, -3,  4,  0,
  2,  1,  3, -5,  4,  0,
  2,  4,  4, -5,  5,  0,
  2,  6,  3, -8,  4,  0,
  2,  4,  4, -4,  5,  0,
  2,  5,  3, -6,  4,  0,
  2,  4,  3, -4,  4,  0,
  2,  4,  4, -3,  5,  1,
  3,  6,  3, -8,  4,  2,  5,  0,
  2,  3,  3, -2,  4,  0,
  2,  4,  4, -2,  5,  1,
  2,  4,  4, -1,  5,  0,
  2,  1,  3,  2,  4,  0,
  1,  4,  4,  3,
  2,  2,  2, -2,  4,  0,
  2,  7,  3, -9,  4,  0,
  2,  5,  4, -5,  5,  0,
  2,  6,  3, -7,  4,  0,
  2,  5,  4, -4,  5,  0,
  2,  5,  3, -5,  4,  0,
  2,  5,  4, -3,  5,  0,
  2,  5,  4, -2,  5,  0,
  1,  5,  4,  3,
  1,  6,  4,  2,
  1,  7,  4,  0,
 -1
  ];

    this.mar404 = new Plantbl(
                               [0,  5, 12, 24,  9,  7,  3,  2,  0],
                               5,
                               this.marargs,
                               this.martabl,
                               this.martabb,
                               this.martabr,
                               1.5303348827100001e+00
      );

  }
}

class SwemptabJup{
  constructor(){

  this.juptabl = [
      153429.13855,      130818.16897,       18120.42948,       -8463.12663,
       -5058.91447,  1092566021.02148,      123671.25097,

          -5.43364,          12.06012,

       30428.31077,      -74667.61443,       46848.16236,      -66373.44474,
       24312.54264,      -26045.64766,       18353.92564,       -4022.13679,
        4037.97936,       10059.82468,       -4622.55896,        1383.21617,
        -187.25468,       -1171.66028,

          -0.00062,          -0.21713,

       -1198.83945,        1178.62445,       -1492.07393,         153.07155,
        -245.57966,        -391.94010,          82.26400,         -40.92104,
           3.72520,          10.57242,

          -0.04720,          -0.04448,          -0.04329,          -0.06043,

          -0.03905,           0.15712,

          -0.05644,          -0.00129,

          -0.00342,           0.02473,

           0.00434,          -0.01862,

           0.00431,          -0.03993,

          -0.03159,          -0.15982,

          -0.09928,           0.04430,          -0.00357,           0.31312,

          -0.01346,          -0.00180,

          -0.09107,           0.01215,

           0.02485,           0.01024,

          27.29869,           2.70896,          12.91956,          19.21726,
          -6.91384,           5.12954,          -1.07533,          -1.71691,

          -0.01423,           0.03121,

         -32.48652,         -26.13483,          46.78162,         -62.02701,
          94.96809,          81.73791,         -20.13673,         131.05065,

          -0.00798,           0.01786,

          13.99591,          16.87756,          -8.51726,          21.59490,
         -14.28833,          -9.45530,           7.73954,          -6.53078,

           0.03175,          -0.04295,

           3.06742,          -0.11838,           1.03630,           0.94004,
          -0.14085,           0.14434,

          -0.03363,           0.00993,

          -0.00007,          -0.02748,

          26.01507,          -7.37178,          16.96955,           6.24203,
          -0.40481,           3.72456,          -0.53597,          -0.14938,

          37.82081,          26.15887,          -2.82115,          78.26478,
         -63.39155,          -5.52419,          13.11482,         -43.54977,
          15.64940,           6.67505,

         -10.25616,          -7.39672,         -12.37441,          12.24417,
           8.54922,           9.68451,

          -0.03658,          -0.00963,

           1.65523,           0.43093,           0.32023,           0.71365,
          -0.12226,           0.03759,

           0.10388,           0.47212,          -0.02791,           0.09929,

          -0.04116,          -0.03125,

          -0.10240,          -0.23199,          -0.03524,          -0.13625,

           7.52726,           6.86314,           0.01239,          13.46530,
          -5.22256,           1.56116,          -0.15925,          -1.19571,

           3.26302,           0.06097,          -0.14444,          -0.20301,
           1.93822,         -80.12566,

           0.98665,          -7.52986,           3.86703,          -2.43028,
           0.64180,           0.78351,

           0.00190,          -0.00633,

          -0.00321,          -0.04403,

           0.19018,           0.14335,           0.10315,           0.53154,

          -0.00062,          -0.00464,

          -0.00109,           0.02150,

           1.19993,          47.21638,         -24.56067,          25.06332,
          -7.50751,          -6.36250,           1.39443,          -1.23806,

           0.04951,           0.02176,

           0.02802,          -0.01665,

          -0.10698,          -0.13635,

          73.54797,         -52.34968,          74.98754,          86.56283,
         -69.01463,          44.56866,

           0.04387,          -0.05925,

          -0.03732,          -0.03264,

           0.00967,           0.02143,

          10.59429,          26.48226,          34.03470,           3.96160,
           4.15919,         -20.22616,          -5.25903,          -3.40177,

           0.05111,          -0.06788,

           0.06497,           1.21024,          -0.29607,           0.49991,
          -0.06055,          -0.03464,

           0.02950,           0.16429,

           0.00722,          -0.90806,

          -0.02161,           0.00902,

          -0.00261,           0.00077,

           0.00434,          -0.29231,

           0.00456,           0.04781,

           1.33214,          -2.62015,           0.79761,          -0.81850,
           0.06371,           0.00119,

           0.03049,          -0.03553,           0.02373,          -0.01411,

        -189.06132,        -169.17940,           5.27464,        -227.72664,
          83.72511,         -12.04794,           0.23965,          23.75496,
          -3.43532,          -0.34276,

          -1.35880,           0.45053,          -0.34298,          -0.11441,

          -0.16328,           0.07423,

         481.48150,          79.82461,         453.82764,         941.94205,
        -635.83924,         397.29087,         -81.54066,        -417.22420,
         149.91822,          10.53490,

          -0.13210,           0.36740,

           0.33777,           0.15893,

       -2562.04968,        2442.77844,       -2602.66709,        2838.87348,
         723.50715,       -1284.58208,       -4557.23362,       -4514.61100,
       -8960.81693,        4663.55087,       -4947.61530,       19377.42027,

          -0.16786,          -0.19514,

           0.32100,           0.91502,

           4.96600,          -1.11836,

         307.38057,         175.14618,          16.02093,         444.42376,
        -219.80047,          62.39286,         -18.14266,         -52.23698,

           0.02111,           0.00469,

         -20.97409,         -34.48296,          -2.03906,         -27.07560,
           3.73818,          -3.00599,           0.24112,           0.41430,

          -0.03552,           0.00394,

          -0.00217,           0.02307,

           0.03686,           0.00510,

          34.46537,          10.23293,           9.99520,          28.88781,
         -11.31210,           3.52646,          -0.48062,          -2.93641,

          -0.00987,          -0.05310,

         -38.39539,           0.04568,         -31.73684,          -1.83151,
         -24.97332,          -1.71244,           0.33498,           7.03899,
          -4.15247,         200.43434,

          -0.00800,           0.04462,

          37.83113,         -13.40661,           9.49434,         -35.41588,
         -14.72767,          -3.84674,          -0.31412,           3.97734,

           0.02908,          -0.00353,

           1.89935,         -14.31774,           7.77051,          -7.08945,
           1.90915,           1.78908,          -0.41445,           0.30506,

         -14.43121,           7.30707,         -11.97842,         -17.64121,
          13.38962,          -7.20982,

          -5.23362,           2.11364,          -0.45605,           4.08835,
           1.42683,           0.24838,

          -0.00605,           0.03199,

          -0.17609,          -1.43091,           0.32444,          -0.51371,
           0.06182,           0.03733,

           0.00696,          -0.13438,

           4.67581,           4.42379,          -1.52602,           4.20659,
          -1.31757,          -0.72910,

           1.29012,           0.97780,           2.25895,          -0.85306,
           1.74120,          -5.09507,

           0.28107,          -0.05040,           0.05508,          -0.06349,

          -0.00061,           0.48249,

          -2.37749,           1.78180,          -1.67423,          -0.35618,
           0.05789,          -0.35287,

           0.56252,          -0.66584,           0.61979,           4.84016,
          -4.64462,          17.48002,

           0.40982,          -4.19214,          -1.55252,          -1.87505,
          -0.31070,           0.15554,

          -0.00034,           0.11102,

           0.01116,          -0.04166,

           9.27689,          -4.32090,           6.84888,           1.78741,
          -0.09306,           1.68391,          -0.27482,          -0.04197,

          -7.83068,          37.71086,         -37.53346,           7.18559,
           0.74427,         -24.29751,          10.87837,           1.35503,

           0.00998,          -0.03395,

        -133.52206,        -150.11329,           4.27494,        -173.79469,
         150.87961,        -356.29181,        -330.17873,        -426.29809,
        -607.98186,         126.35464,        -299.69623,         556.41055,

          -0.00342,           0.04411,

          44.65946,          42.07312,          85.71397,           5.95130,
          24.98064,         -41.20026,         -14.05970,         -10.46101,
          -2.24038,           2.89211,

           0.06175,           0.08128,           0.00705,           0.01939,

          -1.08361,          -0.08213,          -0.20868,          -0.36268,

          -4.96489,          -2.05966,          -6.16586,           3.65514,
          -3.12555,          12.20821,

          -1.11236,          -1.73772,          -1.34045,          -0.22774,
          -0.08639,           0.27355,

          -0.07700,           1.06260,          -0.46013,           0.31916,
          -0.04969,          -0.09488,

          -1.54000,           0.04949,          -0.07616,          -0.95933,
           0.93303,           3.43183,

          -0.82917,          -0.82042,          -0.68158,           0.17083,
           0.06942,           0.17491,

          -0.02699,          -0.01051,

           0.00657,           0.03063,

          -0.52595,           0.84035,          -0.88323,          -0.70188,
           0.60928,          -0.48179,

           0.38290,           0.04482,           0.26456,          -0.32369,

          -0.00615,           0.03218,

          -0.32943,           0.14675,          -0.10782,          -0.09036,

          -0.58003,           0.72888,          -0.46654,           1.17977,

           0.00222,           0.01541,

          -0.19226,          -0.07770,          -0.01829,          -0.05070,

          -1.75385,          -1.32969,           0.52361,          -1.36036,
           0.67222,           1.34612,

           6.96841,         -29.24025,         -23.76900,         -39.91647,
         -41.01215,          -2.23638,         -18.81024,          20.77095,

          -0.68592,          -2.26212,          -1.14065,          -0.76493,
          -0.18044,           0.15193,

          -0.20669,          -0.44387,           0.25697,          -0.17880,

          -0.53097,           0.43181,          -0.35187,           0.71934,

          -0.14962,           0.09220,          -0.05031,          -0.03924,

           0.06571,           0.29487,

           0.05170,           0.36847,

           0.02754,          -0.00411,

          -0.08313,          -0.16907,           0.10273,          -0.07315,

          -0.02312,           0.04912,

          -0.01062,          -0.02713,

           0.03806,           0.13401,

          -1.79865,          -2.04540,          -2.69965,          -0.65706,
          -1.17916,           0.79292,

           0.02415,           0.14001,

          -0.01767,           0.04209,

           0.05212,          -0.01795,

           0.01285,           0.04028,

           0.01075,           0.05533,

           0.02323,          -0.00864,

          -0.04691,           0.03128,

           0.00548,           0.02254,

           0.00011,           0.12033,

  ];
  this.juptabb = [
         548.59659,         594.29629,         219.97664,          59.71822,
          23.62157,          40.77732,         227.07380,

           0.00293,          -0.00745,

        -307.33226,        -347.92807,        -309.49383,        -428.18929,
         -96.59506,        -191.36254,           2.11014,         -34.44145,
           2.23085,           6.77110,          -5.43468,          -0.28391,
           0.28355,          -1.81690,

           0.00036,           0.00078,

          -1.83259,           1.17464,          -2.66976,          -0.92339,
          -0.23645,          -1.20623,           0.25248,          -0.04958,
           0.00064,           0.03599,

          -0.00079,           0.00004,          -0.00005,          -0.00010,

          -0.00024,           0.00051,

           0.00001,           0.00005,

           0.00015,           0.00010,

           0.00017,          -0.00004,

           0.00113,          -0.00011,

           0.00021,           0.00087,

           0.00120,          -0.00114,          -0.00881,          -0.00020,

          -0.00005,           0.00009,

           0.00005,           0.00007,

           0.00002,          -0.00033,

          -0.00554,          -0.32274,           0.23695,          -0.11184,
           0.04050,           0.09929,          -0.02189,           0.00305,

          -0.00142,          -0.00055,

           0.66623,           0.34590,           0.74913,          -0.23202,
          -1.08316,          -1.40407,           1.72287,          -0.07604,

           0.00024,           0.00004,

           0.03592,           0.91143,          -1.11848,          -0.17473,
           0.91500,          -1.34912,           0.85229,           0.69029,

          -0.00019,           0.00075,

           0.03615,           0.30768,          -0.08733,           0.12016,
          -0.01716,          -0.01138,

           0.00021,           0.00004,

           0.00531,           0.00098,

          -0.14354,          -0.02364,          -0.05559,          -0.07561,
           0.01419,          -0.01141,           0.00014,           0.00218,

          -0.36564,           0.13498,          -0.13283,          -0.11462,
           0.23741,           0.14960,          -0.23173,           0.25148,
           0.00763,          -0.05987,

          -0.00857,           0.20312,          -0.29399,           0.34831,
          -1.33166,          -0.46808,

          -0.00027,           0.00046,

           0.15729,           0.01367,           0.04093,           0.07447,
          -0.01598,           0.00785,

           0.00583,           0.00324,           0.00053,           0.00160,

          -0.00030,           0.00043,

          -0.00208,           0.00334,          -0.00316,           0.00136,

           0.23086,           0.05711,           0.19558,           0.05897,
           0.01070,           0.05021,          -0.00818,          -0.02242,

           0.06301,          -0.26483,           0.66177,           0.02125,
           0.13477,           0.19376,

          -0.36520,           0.83588,          -0.69848,          -0.00877,
           0.01626,          -0.23878,

          -0.00373,           0.00044,

           0.00008,          -0.00004,

          -0.00374,          -0.00283,           0.01104,          -0.00619,

           0.00004,           0.00015,

           0.00026,           0.00013,

           0.04630,          -0.11815,           0.00773,           0.03796,
          -0.05172,           0.00149,           0.00444,          -0.01493,

          -0.00064,          -0.00044,

          -0.00033,           0.00002,

          -0.00012,           0.00284,

          -0.15622,          -0.92158,          -0.82690,          -1.52101,
          -0.55934,           0.69375,

          -0.00171,           0.00031,

           0.00129,          -0.00013,

          -0.00024,          -0.00083,

           0.66101,          -0.21764,          -0.43967,           0.30157,
           0.53389,           1.59141,           1.94286,           0.14146,

          -0.00064,          -0.00006,

           0.21850,          -0.02912,           0.08594,           0.08734,
          -0.01678,           0.01629,

           0.00133,           0.00562,

           0.00128,          -0.00025,

          -0.00005,           0.00027,

           0.00032,           0.00001,

           0.00037,           0.00042,

           0.00070,           0.00003,

           0.00275,          -0.13096,           0.02329,          -0.05582,
           0.00405,          -0.00251,

           0.01316,          -0.01165,           0.00279,          -0.00374,

         -39.62783,          20.91467,         -28.97236,           3.77560,
          -3.30029,           0.11472,          -0.48216,           1.05814,
          -0.21607,          -0.03055,

          -0.64162,          -0.57355,          -0.05861,          -0.18592,

          -0.12207,          -0.06279,

         -38.55325,        -125.74207,         -47.22357,          41.75842,
        -119.38841,          18.88515,         -11.04830,         -50.98851,
          16.64895,           1.76553,

           0.09474,           0.03714,

           0.02593,           0.07967,

       -1187.61854,       -1094.91786,       -1011.21939,       -1102.25998,
        -575.88672,        -107.84860,        -890.58889,        -807.06589,
         971.78461,       -1287.24560,       -4601.44669,        -849.54329,

          -0.00904,           0.06233,

          -0.19456,          -0.05521,

          -0.36915,           1.15363,

          32.64763,         -85.19705,         114.34437,         -13.37747,
          15.92865,          55.84857,         -13.10538,           3.07629,

          -0.00327,           0.00104,

          -7.81035,           6.19960,          -6.36096,           1.00493,
          -0.66971,          -0.84572,           0.09943,          -0.04583,

           0.00200,          -0.00032,

          -0.00265,           0.00047,

          -0.00053,           0.00046,

          -0.24396,           0.20664,          -0.30820,          -0.04917,
           0.06184,          -0.12642,           0.03053,           0.05054,

           0.00035,           0.00012,

           0.42063,          -0.58254,           0.90517,          -0.66276,
           0.64765,           0.39338,          -1.40645,           0.33017,
          -1.43377,          -0.67089,

          -0.00045,          -0.00036,

           0.23690,           0.07185,           0.28386,          -0.04397,
           0.02836,          -0.13082,          -0.00978,           0.00108,

           0.00046,           0.00083,

          -0.01665,           0.32499,          -0.09980,           0.18611,
          -0.02561,           0.00239,          -0.00084,          -0.00110,

           0.46854,          -0.35113,           0.69908,           0.53244,
           0.12875,           0.01115,

           0.13930,           0.02747,          -0.10587,          -0.17759,
          -0.26850,           0.04400,

           0.00010,          -0.00015,

           0.00164,          -0.01308,           0.00488,          -0.01046,
           0.00170,           0.00024,

           0.00084,           0.00014,

          -0.08481,          -0.02547,          -0.02290,          -0.02281,
          -0.03946,          -0.02810,

           0.01298,           0.08658,           0.05575,          -0.01081,
           1.09695,           0.35441,

          -0.03127,           0.07946,           0.01245,           0.02578,

          -0.00524,          -0.00027,

           0.08217,          -0.31742,           0.15273,          -0.07804,
           0.01197,           0.03053,

           0.81596,           0.38640,          -0.89777,           0.59499,
          -0.39581,          -0.87375,

           0.02096,           0.49772,           0.29986,           0.24210,
           0.14038,          -0.03016,

          -0.00208,           0.00045,

           0.01024,           0.00114,

           1.23010,           1.75663,          -0.12741,           1.44996,
          -0.31607,           0.03151,           0.00259,          -0.04741,

         -11.57091,           8.00331,          -9.24028,          -6.36906,
           4.71248,          -2.43695,           0.38630,           1.90625,

           0.01401,           0.00114,

          33.56690,         -55.17784,          33.21425,         -52.57002,
          27.04138,          13.78610,          69.60307,         -81.16312,
          27.53960,        -158.28336,        -205.94418,         -95.08051,

          -0.01407,          -0.00364,

         -18.56128,           6.02270,         -10.11059,          24.69471,
          12.31878,           9.94393,           3.81994,          -4.84109,
          -1.08440,          -0.72136,

           0.03731,          -0.02094,           0.00789,          -0.00176,

           0.09673,          -0.11181,           0.03112,          -0.00065,

          -0.29167,          -0.82083,           0.40866,          -0.77487,
          -2.23349,          -0.46973,

           0.41024,          -0.14274,           0.07755,          -0.24895,
          -0.04965,          -0.01197,

          -0.02264,           0.05917,          -0.02817,           0.01242,
          -0.00250,          -0.00247,

          -0.14414,          -0.03739,           0.14708,          -0.07908,
           0.05843,           0.15173,

          -0.01601,          -0.07844,          -0.05957,          -0.03143,
          -0.01830,           0.01257,

          -0.00109,          -0.00000,

           0.00174,           0.00050,

          -0.02119,           0.06918,          -0.02470,           0.00185,
           0.02372,          -0.02417,

           0.01081,           0.05222,           0.09820,           0.05931,

          -0.00588,          -0.00086,

           0.01688,          -0.00133,          -0.00073,           0.00041,

          -0.02280,          -0.05706,          -0.17694,          -0.12027,

           0.00196,          -0.00060,

           0.00051,          -0.02426,           0.00314,          -0.00302,

           0.17923,          -0.78343,           0.52073,          -0.02398,
          -0.03978,           0.20841,

           6.51325,           3.37139,          12.88844,          -6.72098,
           3.40949,         -14.34313,          -9.68278,          -7.85143,

           1.06886,          -0.21727,           0.36675,          -0.49815,
          -0.07289,          -0.07537,

           0.01107,          -0.00644,           0.01013,          -0.00306,

          -0.00708,          -0.13488,          -0.23041,          -0.10698,

          -0.00049,          -0.00692,          -0.00142,          -0.00211,

          -0.04021,           0.01805,

           0.00479,           0.00620,

           0.00739,           0.00566,

          -0.00101,          -0.00022,           0.00261,          -0.00188,

          -0.01812,          -0.01205,

          -0.00061,          -0.00061,

          -0.02479,           0.01157,

           0.91642,          -0.65781,           0.39969,          -1.13699,
          -0.43337,          -0.57828,

           0.00145,           0.00281,

          -0.01675,          -0.00975,

           0.00119,          -0.00074,

          -0.00343,           0.00139,

           0.00061,           0.00086,

           0.00054,          -0.00046,

          -0.01996,          -0.02689,

           0.00034,           0.00037,

          -0.00006,           0.00001,

  ];
  this.juptabr = [
        -734.58857,       -1081.04460,        -551.65750,        -148.79782,
         -25.23171,         164.64781,         248.64813,

          -0.05163,          -0.02413,

       -1306.61004,         560.02437,       -1622.58047,         589.92513,
        -812.39674,         166.85340,        -157.92826,        -107.14755,
          68.98900,         -18.95875,          -0.16183,          36.24345,
          -9.19972,          -2.29315,

          -0.00316,           0.00222,

          10.95234,          21.37177,          -6.29550,          21.83656,
          -7.70755,           1.38228,          -0.21770,          -1.49525,
           0.17951,           0.01043,

           0.00062,           0.00208,          -0.00066,           0.00050,

           0.00313,           0.00187,

           0.00010,           0.00131,

           0.00102,           0.00047,

           0.00102,           0.00012,

           0.00012,          -0.00037,

           0.00808,           0.00027,

          -0.01219,          -0.00961,          -0.04166,          -0.00327,

          -0.00001,          -0.00146,

          -0.00092,          -0.00989,

          -0.00135,           0.00196,

           0.19216,           2.48442,          -1.43599,           1.39651,
          -0.48549,          -0.53272,           0.14066,          -0.10352,

           0.00141,           0.00066,

           2.96838,          -3.09575,           6.27741,           5.24306,
          -8.77080,           9.03247,         -10.98350,          -3.58579,

          -0.00168,          -0.00100,

           0.20234,          -0.75737,           0.36838,          -0.58241,
           0.41430,          -0.35784,           0.47038,          -0.10586,

           0.00539,           0.00490,

          -0.01375,          -0.01950,           0.00145,           0.00723,
          -0.00391,           0.00391,

          -0.00131,          -0.00568,

           0.01317,           0.00319,

           1.31006,           5.89394,          -1.61753,           3.68814,
          -0.80644,          -0.14747,           0.04481,          -0.11361,

          -4.36130,           7.92488,         -16.29047,          -1.52163,
           2.14492,         -14.38028,           9.65573,           3.56881,
          -1.87208,           3.36213,

           1.84499,          -2.41575,          -2.77076,          -3.23915,
          -3.34573,           1.40979,

           0.00217,          -0.00841,

           0.29313,          -0.36246,           0.22043,           0.02328,
          -0.01182,           0.04074,

          -0.15728,           0.02468,          -0.03185,          -0.01099,

           0.01059,          -0.01274,

           0.07362,          -0.02642,           0.04035,          -0.00968,

          -2.14457,           2.53297,          -4.34196,          -0.11421,
          -0.38757,          -1.73872,           0.39784,          -0.01397,

          -0.03311,           0.97723,           0.16060,          -0.07486,
          25.96413,           0.75088,

          -3.04736,           0.30340,          -1.43451,          -1.35136,
           0.26526,          -0.40247,

          -0.00460,          -0.00056,

           0.01633,          -0.00128,

          -0.05197,           0.07002,          -0.19450,           0.03737,

           0.00188,          -0.00037,

          -0.00903,          -0.00059,

         -19.73809,           0.58424,         -10.42034,         -10.14579,
           2.65990,          -3.07889,           0.50884,           0.58508,

          -0.00970,           0.02099,

           0.00716,           0.01161,

           0.05751,          -0.04515,

          22.08042,          30.82415,         -36.27430,          31.40265,
         -18.30150,         -29.16403,

           0.02454,           0.01834,

          -0.01312,           0.01576,

          -0.00928,           0.00330,

         -11.78094,           4.06738,          -2.51590,          15.05277,
           9.12747,           2.88088,           2.32916,          -2.08271,

           0.02872,           0.02194,

           0.60494,          -0.04597,           0.24749,           0.15971,
          -0.02185,           0.03384,

          -0.07075,           0.01287,

           0.40201,           0.00347,

          -0.00410,          -0.00998,

          -0.00005,          -0.00121,

           0.13770,           0.00186,

          -0.02268,           0.00210,

           1.26291,           0.65546,           0.38885,           0.38880,
          -0.00184,           0.03067,

           0.01273,           0.01136,           0.00557,           0.01117,

          94.13171,         -88.37882,         120.53292,           8.32903,
           7.77313,          43.46523,         -11.66698,           0.44639,
           0.15092,          -1.68367,

          -0.30833,          -0.49030,           0.01971,          -0.14144,

          -0.04019,          -0.05110,

         -39.70024,         272.91667,        -468.46263,         256.77696,
        -200.63130,        -307.98554,         206.56301,         -41.76039,
          -4.74242,          74.19909,

           0.18474,           0.05547,

          -0.06732,           0.16515,

       -1156.31285,       -1102.97666,       -1346.99288,       -1121.01090,
         666.84550,         421.92305,        2259.49740,       -2268.69758,
       -2325.87639,       -4476.46256,       -9683.77583,       -2472.92565,

          -0.10400,           0.08075,

          -0.45225,           0.16621,

           0.57789,           2.43804,

          85.21675,        -154.17208,         219.91042,          -9.71116,
          31.13240,         108.60117,         -25.85622,           8.98402,

          -0.00233,           0.01030,

         -17.01324,          10.41588,         -13.34449,           1.08782,
          -1.48199,          -1.81734,           0.20334,          -0.11734,

          -0.00230,          -0.01869,

          -0.01182,          -0.00129,

          -0.00281,           0.02021,

          -5.75973,          19.13309,         -16.13690,           5.53382,
          -1.96585,          -6.29211,           1.63105,          -0.26089,

           0.02935,          -0.00555,

           0.30700,         -19.96182,           0.99825,         -16.32664,
           0.83052,         -13.76201,          -3.15609,           0.17360,
        -111.81423,          -2.05419,

          -0.02455,          -0.00478,

           7.45114,          21.53296,          19.90263,           5.69420,
           2.31253,          -8.15116,          -2.17440,          -0.23014,

           0.00168,           0.01590,

           8.78005,           0.71418,           4.48561,           4.50680,
          -1.05713,           1.17880,          -0.19327,          -0.24877,

          -5.00870,          -8.66354,          10.51902,          -7.71011,
           4.65486,           8.05673,

          -1.39635,          -3.07669,          -2.40347,          -0.11167,
          -0.04064,           0.83512,

          -0.02041,          -0.00351,

           0.97375,          -0.15795,           0.36361,           0.19913,
          -0.02142,           0.04193,

           0.08801,           0.00475,

          -2.81010,           3.11341,          -2.79191,          -0.93313,
           0.44570,          -0.88287,

          -0.51815,           0.54776,           0.29736,           0.99779,
           2.28957,           0.82183,

           0.03386,           0.12855,           0.03124,           0.02454,

          -0.31958,           0.00070,

          -1.48184,          -1.28195,           0.03965,          -1.12026,
           0.23910,           0.01293,

           0.36146,          -0.64483,          -1.88470,           0.21469,
         -11.79819,          -1.87287,

           2.65699,          -0.36287,           0.88148,          -1.26883,
          -0.19657,          -0.14279,

          -0.07536,          -0.00004,

           0.01496,           0.00537,

           2.48352,           3.75581,          -0.34909,           3.26696,
          -0.82105,           0.11287,          -0.00755,          -0.13764,

         -15.34429,          -2.79957,          -3.22976,         -15.46084,
          10.66793,          -0.26054,          -0.12188,           5.06211,

           0.01313,           0.00424,

          84.34332,         -57.05646,          92.68150,          -0.02024,
         149.62698,          59.14407,         174.04569,        -129.26785,
         -55.99789,        -238.01484,        -212.51618,        -115.94914,

          -0.01720,          -0.00158,

         -13.65602,          17.47396,           0.16714,          32.66367,
          16.30095,           9.18345,           3.98555,          -5.39985,
          -1.09958,          -0.86072,

           0.02752,          -0.02474,           0.00671,          -0.00278,

          -0.21030,          -0.73658,           0.20708,          -0.21378,

           0.78462,          -2.14051,          -1.60070,          -2.60915,
          -5.02441,          -1.19246,

           0.67622,          -0.41889,           0.07430,          -0.53204,
          -0.11214,          -0.03417,

          -0.72636,          -0.15535,          -0.16815,          -0.35603,
           0.07530,          -0.02521,

          -0.01261,          -0.94883,           0.39930,          -0.05370,
          -2.77309,           0.38431,

           0.72127,          -0.52030,          -0.01804,          -0.51188,
          -0.11993,           0.02189,

           0.00928,          -0.02129,

          -0.02760,           0.00441,

          -0.56832,          -0.48114,           0.64192,          -0.65656,
           0.37483,           0.51883,

          -0.08474,           0.20324,           0.12783,           0.13041,

          -0.01545,          -0.00282,

          -0.16196,          -0.26980,           0.06584,          -0.09987,

          -0.36305,          -0.27610,          -0.57074,          -0.13607,

          -0.00824,           0.00369,

           0.06094,          -0.12214,           0.03581,          -0.00876,

           0.49346,          -0.74596,           0.47814,           0.18201,
          -1.00640,           0.24465,

          10.09808,           2.30496,          13.63359,          -7.94007,
           0.29792,         -13.55724,          -6.48556,          -5.99581,

           0.69686,          -0.22434,           0.23198,          -0.35579,
          -0.04736,          -0.05683,

           0.36710,          -0.16571,           0.14876,           0.21824,

          -0.18940,          -0.15063,          -0.23692,          -0.09990,

          -0.08923,          -0.12222,           0.02998,          -0.04560,

          -0.16229,           0.04552,

          -0.33051,           0.02585,

          -0.00622,           0.01583,

           0.15436,          -0.07109,           0.06429,           0.09218,

          -0.01277,          -0.00019,

           0.02345,          -0.01057,

          -0.07294,           0.02506,

           0.62063,          -0.52533,           0.16814,          -0.77168,
          -0.20614,          -0.31828,

          -0.12856,           0.01316,

          -0.01522,          -0.00126,

           0.01558,           0.04765,

          -0.02776,           0.01166,

          -0.05185,           0.00674,

           0.00754,           0.02183,

          -0.00645,          -0.01050,

          -0.02155,           0.00375,

           0.12040,          -0.00004,

  ];

  this.jupargs = [
  0,  6,
  3,  2,  5, -6,  6,  3,  7,  0,
  2,  2,  5, -5,  6,  6,
  3,  1,  5, -2,  6, -3,  8,  0,
  2,  4,  5,-10,  6,  4,
  3,  2,  5, -4,  6, -3,  7,  1,
  3,  3,  5,-10,  6,  7,  7,  0,
  2,  6,  5,-15,  6,  0,
  3,  1,  5, -4,  6,  4,  7,  0,
  3,  3,  5, -8,  6,  2,  7,  0,
  3,  1,  5, -3,  6,  1,  7,  0,
  3,  1,  5, -3,  6,  2,  7,  0,
  1,  1,  7,  1,
  2,  5,  5,-12,  6,  0,
  3,  2,  5, -7,  6,  7,  7,  0,
  3,  1,  5, -1,  6, -3,  7,  0,
  2,  3,  5, -7,  6,  3,
  3,  1,  5, -4,  6,  3,  7,  0,
  2,  1,  5, -2,  6,  3,
  3,  3,  5, -8,  6,  3,  7,  0,
  2,  1,  5, -3,  6,  3,
  3,  1,  5, -3,  6,  3,  7,  0,
  2,  3,  5, -8,  6,  2,
  3,  2,  5, -5,  6,  2,  7,  0,
  1,  2,  7,  0,
  2,  4,  5, -9,  6,  3,
  2,  2,  5, -4,  6,  4,
  1,  1,  6,  2,
  3,  2,  5, -5,  6,  3,  7,  0,
  2,  2,  5, -6,  6,  2,
  2,  5,  5,-11,  6,  1,
  3,  1,  5, -2,  7, -2,  8,  0,
  2,  1,  5, -3,  7,  1,
  2,  3,  5, -6,  6,  3,
  2,  1,  5, -1,  6,  2,
  2,  1,  5, -4,  6,  2,
  2,  3,  5, -9,  6,  0,
  3,  2,  5, -4,  6,  2,  7,  0,
  2,  1,  5, -2,  7,  1,
  2,  6,  5,-13,  6,  0,
  3,  2,  5, -2,  6, -3,  7,  0,
  2,  4,  5, -8,  6,  3,
  2,  3,  6, -3,  7,  0,
  3,  6,  5,-14,  6,  3,  7,  0,
  3,  1,  5, -2,  7,  1,  8,  0,
  2,  2,  5, -3,  6,  2,
  3,  1,  5, -4,  7,  5,  8,  0,
  3,  2,  5, -8,  6,  3,  7,  0,
  3,  4,  5, -9,  6,  3,  7,  0,
  1,  2,  6,  3,
  3,  2,  5, -4,  6,  3,  7,  0,
  2,  2,  5, -7,  6,  2,
  2,  1,  5, -2,  8,  0,
  2,  1,  5, -1,  7,  0,
  3,  3,  5, -6,  6,  2,  7,  0,
  3,  4,  5, -8,  6,  2,  8,  0,
  2,  1,  5, -1,  8,  0,
  3,  2,  5, -3,  6,  1,  7,  0,
  2,  7,  5,-15,  6,  2,
  3,  3,  5, -4,  6, -3,  7,  1,
  2,  5,  5,-10,  6,  4,
  3,  1,  5,  1,  6, -3,  7,  1,
  3,  7,  5,-16,  6,  3,  7,  0,
  2,  3,  5, -5,  6,  4,
  3,  1,  5, -6,  6,  3,  7,  0,
  3,  5,  5,-11,  6,  3,  7,  0,
  1,  1,  5,  5,
  3,  3,  5,-11,  6,  3,  7,  0,
  3,  3,  5, -6,  6,  3,  7,  0,
  2,  2,  5, -7,  7,  0,
  2,  1,  5, -5,  6,  3,
  3,  1,  5, -1,  6,  3,  7,  0,
  2,  3,  5,-10,  6,  3,
  3,  2,  5, -3,  6,  2,  7,  0,
  2,  1,  5,  1,  7,  0,
  3,  2,  5, -1,  6, -3,  7,  0,
  2,  4,  5, -7,  6,  3,
  2,  4,  6, -3,  7,  0,
  2,  2,  5, -2,  6,  4,
  3,  4,  5, -8,  6,  3,  7,  0,
  1,  3,  6,  3,
  3,  2,  5, -3,  6,  3,  7,  0,
  2,  5,  5, -9,  6,  3,
  2,  3,  5, -4,  6,  2,
  2,  1,  5,  1,  6,  2,
  2,  2,  5, -4,  7,  0,
  2,  6,  5,-11,  6,  2,
  2,  2,  5, -3,  7,  0,
  2,  4,  5, -6,  6,  2,
  2,  2,  5, -1,  6,  2,
  1,  4,  6,  1,
  2,  2,  5, -2,  7,  0,
  2,  5,  5, -8,  6,  2,
  2,  3,  5, -3,  6,  2,
  2,  1,  5,  2,  6,  2,
  2,  2,  5, -2,  8,  0,
  2,  2,  5, -1,  7,  0,
  2,  6,  5,-10,  6,  3,
  2,  4,  5, -5,  6,  3,
  2,  6,  6, -3,  7,  0,
  1,  2,  5,  5,
  3,  4,  5, -6,  6,  3,  7,  0,
  1,  5,  6,  4,
  2,  2,  5,-10,  6,  1,
  2,  5,  5, -7,  6,  1,
  2,  3,  5, -2,  6,  2,
  2,  1,  5,  3,  6,  2,
  2,  6,  5, -9,  6,  2,
  2,  4,  5, -4,  6,  2,
  2,  2,  5,  1,  6,  2,
  2,  7,  5,-11,  6,  0,
  2,  3,  5, -3,  7,  0,
  2,  5,  5, -6,  6,  2,
  2,  3,  5, -1,  6,  1,
  2,  3,  5, -2,  7,  0,
  2,  6,  5, -8,  6,  1,
  2,  4,  5, -3,  6,  1,
  2,  2,  5,  2,  6,  0,
  2,  7,  5,-10,  6,  1,
  2,  5,  5, -5,  6,  2,
  1,  3,  5,  3,
  2,  1,  5,  5,  6,  2,
  2,  6,  5, -7,  6,  1,
  2,  4,  5, -2,  6,  1,
  2,  7,  5, -9,  6,  1,
  2,  5,  5, -4,  6,  0,
  2,  6,  5, -6,  6,  0,
  2,  4,  5, -1,  6,  0,
  2,  7,  5, -8,  6,  1,
  2,  5,  5, -3,  6,  0,
  2,  8,  5,-10,  6,  0,
  2,  6,  5, -5,  6,  0,
  1,  4,  5,  2,
  2,  7,  5, -7,  6,  0,
  2,  5,  5, -2,  6,  0,
  2,  8,  5, -9,  6,  0,
  2,  7,  5, -6,  6,  0,
  2,  8,  5, -8,  6,  0,
  2,  9,  5,-10,  6,  0,
  1,  5,  5,  0,
  2,  9,  5, -9,  6,  0,
  2,  1,  3, -1,  5,  0,
 -1
  ];

    this.jup404 = new Plantbl(
      [0,  0,  1,  0,  9, 16,  7,  5,  0],
                               6,
                               this.jupargs,
                               this.juptabl,
                               this.juptabb,
                               this.juptabr,
                               5.2026032092000003e+00

      );

  }
}

class SwemptabSat{
  constructor(){

  this.sattabl = [
     1788381.26240,     2460423.68044,     1370113.15868,      415406.99187,
       72040.39885,       12669.58806,   439960754.85333,      180256.80433,

          18.71177,         -40.37092,

       66531.01889,     -195702.70142,       57188.02694,     -179110.60982,
      -19803.06520,      -58084.15705,       -9055.13344,      -31146.10779,
       11245.43286,       -3247.59575,         459.48670,        2912.82402,

          -4.06749,         -13.53763,

         -30.55598,          -4.51172,

           1.48832,           0.37139,

         597.35433,        1193.44545,        -297.50957,         976.38608,
        -263.26842,          34.84354,          -6.77785,         -29.92106,

          -0.16325,          -0.18346,

          -0.15364,          -0.08227,

           0.20180,           0.02244,

           0.04672,          -0.29867,

          -0.04143,          -0.00760,

          -0.17046,          -0.00778,

           0.04200,           0.23937,          -0.00098,          -0.05236,

          -0.02749,          -0.01813,

           0.00637,           0.01256,

          -0.04506,           0.04448,

          -0.00105,           0.06224,

           0.01157,           0.17057,          -0.03214,           0.18178,

          -0.22059,          -0.01472,

          -0.24213,           0.04309,           0.03436,           0.44873,

           0.01350,          -0.01931,

          -0.80618,          -0.56864,           0.29223,          -0.03101,

           0.04171,           0.02264,

          -0.01264,          -0.01645,

           0.01774,           0.06374,

          -0.01925,          -0.03552,

           0.10473,          -0.04119,

           0.08045,           0.04635,

          -3.01112,          -9.26158,           8.13745,           1.88838,

          -0.15184,           0.16898,

          -0.22091,           0.29070,          -0.03259,           0.06938,

          -0.08499,          -0.21688,           0.01848,          -0.05594,

           0.50100,          -0.00027,           0.13300,           0.12055,

           0.03039,           0.03854,

          -1.55287,           2.55618,          -0.45497,          -0.29895,
          -0.93268,           0.83518,

          -0.32785,           7.03878,          -1.66649,           2.75564,
          -0.29459,           0.01050,

           0.08293,          -0.03161,

          -0.12750,          -0.04359,

           0.04217,           0.07480,

        -114.43467,          49.47867,         -66.52340,         -26.27841,
          15.48190,         -13.06589,           3.28365,           5.02286,

          -0.17155,          -0.07404,

           0.00924,          -0.07407,

          -0.02922,           0.06184,

         108.04882,          86.09791,        -155.12793,         208.10044,
        -311.72810,        -268.92703,          74.57561,        -420.03057,

          -0.07893,           0.09246,

          -0.66033,          -0.39026,          -0.13816,          -0.08490,

         -36.79241,         -78.88254,          71.88167,         -68.05297,
          51.71616,          65.77970,         -43.59328,          23.51076,

          -0.02029,          -0.32943,

          -8.82754,           1.48646,          -3.12794,           2.12866,
          -0.06926,           0.44979,

           0.00621,          -0.51720,

          -3.82964,          -1.48596,          -0.11277,          -3.21677,
           0.81705,          -0.19487,

          -0.06195,           0.10005,          -0.02208,           0.00108,

           0.00455,          -0.03825,

           0.01217,          -0.00599,

          -0.17479,          -0.47290,           0.85469,           1.12548,
          -0.80648,          -0.44134,

          -0.01559,          -0.07061,

           0.01268,          -0.01773,

           0.01308,          -0.03461,

          -0.71114,           1.97680,          -0.78306,          -0.23052,
           0.94475,          -0.10743,

           0.18252,          -8.03174,

           0.00734,           0.04779,

           0.12334,          -0.03513,

           0.01341,           0.02461,

           0.02047,          -0.03454,

           0.02169,          -0.01921,

          -1.12789,           0.09304,           0.14585,           0.36365,

           0.03702,           0.10661,          -0.00464,          -1.72706,

          -0.00769,          -0.04635,

          -0.01157,           0.00099,

          10.92646,           1.96174,           2.91142,           4.74585,
          -0.29832,           0.75543,

           0.05411,           1.05850,

           0.38846,          -0.16265,

           1.52209,           0.12185,           0.18650,           0.35535,

        -278.33587,         -82.58648,        -160.00093,        -225.55776,
          35.17458,         -77.56672,          10.61975,           3.33907,

           0.06090,           2.17429,

          -4.32981,          -5.84246,          11.43116,          20.61395,

          -0.65772,           1.28796,

        1224.46687,       -3113.15508,        3798.33409,        -137.28735,
        -256.89302,        2227.35649,        -779.78215,        -260.37372,

          11.73617,         -13.25050,          -0.75248,          -2.87527,

          -8.38102,          17.21321,

      -61784.69616,       39475.02257,      -54086.68308,       54550.85490,
      -16403.69351,       29602.70098,       14672.06363,       16234.17489,
       15702.37109,      -22086.30300,      -22889.89844,       -1245.88352,

           1.48864,          19.75000,           0.78646,           3.29343,

       -1058.13125,        4095.02368,       -2793.78506,        1381.93282,
        -409.19381,        -772.54270,         161.67509,         -34.15910,

        -514.27437,          27.34222,        -311.04046,          48.01030,
         -43.36486,          16.19535,          -0.73816,          -0.81422,

         287.32231,        -110.44135,         200.43610,          37.98170,
          17.73719,          34.40023,          -2.46337,           1.48125,

           0.09042,          -0.11788,

           0.37284,           0.51725,           0.00597,           0.14590,

          -0.01536,           0.00980,

           0.00721,           0.02023,

           0.00027,           0.02451,

          -0.72448,          -0.71371,           0.29322,           0.18359,

           0.72719,          -0.37154,           0.14854,          -0.02530,

           0.23052,           0.04258,

           4.82082,           0.01885,           3.11279,          -0.63338,
           0.10559,          -0.02146,

          -0.01672,           0.03412,

           0.00605,           0.06415,

          -0.89085,           1.51929,          -0.36571,           0.39317,

          12.05250,          -3.79392,           3.96557,          -3.51272,
          -0.17953,          12.30669,

          -0.05083,          -0.11442,

           0.02013,          -0.02837,

          -0.02087,          -0.01599,

           0.49190,           0.30360,           0.01316,           0.17649,

           0.21193,          -0.09149,          -0.07173,          -0.05707,

           4.24196,          -1.25155,           1.81336,           0.68887,
          -0.01675,           0.20772,

          -0.04117,          -0.03531,

          -0.02690,          -0.02766,

          37.54264,          10.95327,           8.05610,          30.58210,
         -12.68257,           1.72831,           0.13466,          -3.27007,

           0.01864,          -0.00595,

           0.03676,           0.14857,          -0.07223,           0.06179,

           0.44878,          -1.64901,         -20.06001,           0.63384,
          -4.97849,           4.78627,          29.87370,           7.29899,

           0.00047,          -0.00155,

           0.00314,           0.01425,

          -0.17842,          -0.08461,

          -1.61020,          -8.47710,           6.85048,          -4.38196,
           1.05809,           2.68088,

          -0.01027,          -0.00833,

           0.06834,          -0.04205,

           0.03330,          -0.01271,

           0.01301,          -0.01358,

           0.03537,           0.03612,           0.02962,           0.62471,
          -0.30400,          -0.64857,

           0.01773,           0.01890,

           0.01426,          -0.00226,

          -0.50957,          -0.01955,          -0.09702,           1.09983,

           0.64387,          -0.02755,

           0.26604,           0.30684,           0.06354,           0.05114,

          -0.00058,          -0.04672,

          -0.00828,           0.00712,

          -0.00440,           0.00029,

          -0.01601,           0.03566,

           0.13398,          -0.02666,

          -0.06752,          -0.43044,           0.07172,          -0.01999,

          -0.01761,          -0.05357,

           0.06104,           0.29742,          -0.08785,           0.05241,

          -6.57162,          -4.20103,           0.03199,          -6.46187,
           1.32846,          -0.51137,

           0.06358,           0.37309,

          -1.46946,           2.34981,

          -0.18712,           0.11618,

         240.62965,        -107.21962,         219.81977,          84.04246,
         -62.22931,          68.35902,          -9.48460,         -32.62906,

           5.57483,          -1.82396,           1.00095,          -0.39774,

           7.87054,          11.45449,

        -432.67155,       55064.72398,       12444.62359,       54215.28871,
        8486.03749,       12297.48243,        -333.27968,        1147.93192,
        1403.73797,         990.40885,          -3.84938,        -722.43963,

          16.83276,          96.48787,           7.04834,          38.22208,
           0.63843,           2.61007,

         230.73221,         171.64166,           1.96751,         287.80846,
         -85.21762,          31.33649,          -2.25739,         -11.28441,

           0.04699,           0.06555,

          -0.08887,           1.70919,           0.09477,           0.26291,

          -0.15490,           0.16009,

           1.93274,           1.01953,           0.36380,           1.29582,
          -0.13911,           0.14169,

          -0.00491,          -0.00030,

          -0.08908,          -0.10216,

          -0.03265,          -0.03889,

           0.40413,          -1.12715,          -0.94687,          -0.04514,

           0.02487,          -0.01048,

           0.39729,           2.82305,          -0.61100,           1.11728,
          -0.13083,          -0.04965,

          -0.00602,          -0.02952,

          -6.13507,          13.73998,         -15.70559,          -1.28059,
           2.64422,          -9.33798,           3.26470,           1.56984,

          -0.00572,           0.09992,

          -8.80458,          -8.23890,         -11.51628,           9.47904,
          11.31646,           4.29587,

          -2.41367,          -0.05883,          -0.80022,          -1.02706,
           0.21461,          -0.06864,

           0.01882,           0.01798,

           0.27614,          -0.01007,           0.04362,           0.07560,
           0.05519,           0.23435,

          -0.09389,           0.01613,

           0.01298,           0.04691,

          -0.02665,          -0.03582,

           0.60080,          -4.28673,           1.87316,          -1.05840,
           0.13248,           0.40887,

          -0.67657,           0.67732,           0.05522,           0.07812,
          -0.17707,          -0.07510,

           0.24885,          10.63974,          -7.40226,          -2.33827,
           2.75463,         -32.51518,

           0.05140,           0.01555,

         180.43808,         263.28252,         384.50646,         -76.53434,
         -93.50706,        -220.50123,         -81.91610,         103.92061,
          30.90305,          -2.89292,

          -0.06634,          -0.37717,          -0.01945,          -0.05936,

          29.27877,         -59.73705,          35.86569,         -18.36556,
           3.88812,           4.82090,          -0.70903,           0.06615,

           0.01558,          -0.01854,

           0.16209,           0.12682,           0.02508,           0.02406,

          -0.03078,          -0.01737,          -0.00033,          -0.00020,

           0.01023,           0.05972,

          -0.03373,          -0.07289,

          -2.08162,          -0.14717,          -0.64233,          -0.75397,
           0.11752,          -0.09202,

           4.42981,          -4.19241,           5.02542,           5.03467,
          -4.22983,           2.80794,

           3.03016,          -2.74373,          -1.11490,          -2.72378,
          -0.63131,           0.74864,

          -0.00759,          -0.00675,

           0.03615,          -0.01806,

          -2.71920,          -1.50954,           0.54479,          -1.92088,
           0.66427,           0.32228,

          -2.55188,          -0.65332,          -2.73798,           2.10182,
           1.54407,           3.01357,

          38.76777,          23.54578,          27.29884,         -14.93005,
          -7.50931,          -5.66773,           0.30142,           1.52416,

           0.00634,           0.09697,          -0.00748,           0.01433,

           0.02936,           0.53228,          -0.03603,           0.06345,

           0.30816,          -1.07925,           0.46709,          -0.21568,
           0.01663,           0.10810,

          -0.42511,           0.35872,          -0.19662,          -6.74031,

           1.05776,           1.86205,           1.08919,           0.10483,
          -0.03368,          -0.21535,

           0.07556,          -0.27104,           0.05142,          -0.03812,

           1.20189,          -1.36782,           1.35764,           1.39387,
          -1.19124,           0.77347,

          -0.54760,          -0.26295,          -0.07473,           0.23043,

           2.82621,          -0.23524,           0.47352,          -0.81672,
          -0.08515,           0.04700,

           0.55355,          -0.40138,           0.22255,           0.12236,

          -0.09110,           0.31982,           0.39404,          -0.17898,

          -0.00056,           0.00014,

          -0.02012,           0.03102,

           0.43236,          -0.10037,          -0.00961,           0.07440,
          -0.07076,          -1.97272,

           0.25555,          -0.21832,          -0.00837,          -0.08393,

           0.01531,           0.00627,

           0.33193,           0.70765,          -0.43556,           0.28542,

          -0.23190,          -0.04293,          -0.08062,           0.13427,

           0.23763,          -0.17092,           0.09259,           0.05155,

           0.08065,          -0.11943,

          -0.02174,          -0.68899,

          -0.01875,          -0.01746,

           0.13604,           0.29280,          -0.17871,           0.11799,

           0.02003,           0.04065,

           0.01343,          -0.06060,

          -0.01290,          -0.26068,

          -0.09033,           0.02649,

          -0.00092,          -0.03094,

          -0.00770,          -0.10447,

          -0.04113,           0.01259,

          -0.00469,          -0.04346,

          -0.00010,           0.06547,

  ];
  this.sattabb = [
     -567865.62548,     -796277.29029,     -410804.00791,      -91793.12562,
       -6268.13975,         398.64391,        -710.67442,         175.29456,

          -0.87260,           0.18444,

       -1314.88121,       20709.97394,       -1850.41481,       20670.34255,
        -896.96283,        6597.16433,        -179.80702,         613.45468,
          17.37823,         -13.62177,          -0.36348,          12.34740,

           0.47532,           0.48189,

           0.27162,          -0.20655,

          -0.23268,           0.05992,

          46.94511,          15.78836,          21.57439,          23.11342,
          -0.25862,           5.21410,          -0.22612,          -0.05822,

          -0.00439,          -0.01641,

          -0.01108,          -0.00608,

           0.00957,           0.00272,

          -0.00217,           0.00001,

          -0.00534,          -0.00545,

           0.00277,          -0.00843,

           0.00167,          -0.00794,           0.00032,          -0.00242,

          -0.00002,          -0.00041,

          -0.00025,           0.00031,

           0.00062,          -0.00060,

           0.00083,           0.00032,

           0.00527,          -0.00211,           0.00054,           0.00004,

          -0.02769,          -0.01777,

           0.00247,           0.00097,           0.00020,          -0.00232,

           0.00044,          -0.00035,

          -0.00072,           0.01341,           0.00325,          -0.01159,

           0.00079,          -0.00078,

          -0.00009,           0.00066,

           0.00222,           0.00002,

           0.00013,          -0.00161,

           0.01374,          -0.05305,

           0.00478,          -0.00283,

           0.16033,           0.13859,           0.33288,          -0.16932,

          -0.00316,           0.00625,

          -0.00309,           0.01687,           0.00001,           0.00486,

           0.00401,          -0.01805,          -0.00048,          -0.00407,

          -0.01329,           0.01311,          -0.00591,           0.00166,

           0.00830,           0.00665,

          -0.80207,           0.22994,          -0.34687,           0.08460,
          -0.11499,          -0.01449,

          -0.01574,           0.78813,          -0.03063,           0.28872,
          -0.00337,           0.01801,

          -0.01703,          -0.00929,

          -0.00738,           0.03938,

           0.05616,          -0.00516,

          -3.09497,          30.13091,          -3.14968,          17.62201,
          -0.73728,           2.46962,          -0.11233,           0.03450,

          -0.07837,          -0.01573,

          -0.01595,           0.00394,

           0.00174,           0.01470,

           6.83560,          -2.37594,           4.95125,           3.24711,
           2.44781,           5.17159,           1.99820,          -2.38419,

           0.00840,           0.03614,

          -0.00209,          -0.30407,          -0.02681,          -0.06128,

           1.50134,          11.82856,           4.39644,           6.98850,
          -4.17679,           5.73436,          -9.66087,           1.98221,

          -0.29755,           0.08019,

          -0.24766,          -8.54956,          -1.74494,          -3.36794,
          -0.32661,          -0.00722,

           0.14141,           0.01023,

          -1.21541,          -2.58470,           0.38983,          -1.70307,
           0.31209,          -0.10345,

           0.02593,           0.02178,           0.00289,           0.00393,

          -0.00236,          -0.00373,

          -0.00270,          -0.00049,

          -0.06282,          -0.00443,          -0.02439,          -0.02254,
          -0.02220,           0.03532,

          -0.00072,           0.00010,

          -0.00049,          -0.00112,

           0.00086,           0.00112,

           0.10135,          -0.10972,           0.08357,           0.00155,
           0.04363,          -0.00201,

          -0.01996,          -0.01341,

          -0.00039,          -0.00042,

          -0.00294,           0.00070,

           0.00005,          -0.00027,

           0.00070,          -0.00076,

           0.00234,          -0.00239,

          -0.08365,          -0.08531,          -0.03531,           0.15012,

          -0.01995,          -0.01731,          -0.00370,          -0.00745,

          -0.00315,          -0.00079,

          -0.00120,          -0.00145,

          -0.99404,          -1.31859,           0.03584,          -0.83421,
           0.10720,          -0.05768,

           0.06664,          -0.09338,

          -0.01814,          -0.00003,

          -0.05371,          -0.06458,          -0.00100,          -0.01298,

          -7.08710,         -23.13374,           4.18669,         -19.94756,
           4.85584,          -3.37187,           0.58851,           0.31363,

           0.01994,           0.27494,

          -1.37112,           2.61742,           0.52477,          -0.46520,

          -0.13183,           0.26777,

         836.90400,        -484.65861,         815.99098,         236.54649,
         -32.38814,         288.95705,         -68.17178,         -18.87875,

          -1.79782,          -3.68662,          -1.27310,          -0.65697,

          -3.67530,           2.10471,

      -13758.97795,        4807.62301,      -14582.14552,        9019.73021,
       -3202.60105,        4570.16895,        2078.68911,        2892.62326,
       -2399.35382,        3253.16198,       -8182.38152,       -3588.77680,

          -0.16505,           1.08603,           0.53388,           0.87152,

          61.53677,         538.43813,        -407.32927,         322.27446,
        -148.71585,        -179.37765,          54.07268,         -34.12281,

         -14.76569,         -17.95681,         -10.82061,          -6.39954,
          -2.10954,           0.67063,           0.22607,          -0.43648,

          20.90476,         -45.48667,          30.39436,         -14.20077,
           5.17385,           5.12726,          -0.66319,           0.55668,

           0.02269,          -0.00016,

           0.07811,           0.00111,           0.01603,           0.01020,

          -0.00107,           0.00494,

          -0.00077,          -0.00084,

          -0.00196,           0.00081,

          -0.03776,           0.01286,          -0.00652,          -0.01450,

           0.05942,          -0.08612,           0.01093,          -0.01644,

           0.02147,          -0.00592,

           0.36350,          -0.00201,           0.14419,          -0.10070,
          -0.00491,          -0.01771,

          -0.00053,          -0.00033,

           0.00146,           0.00048,

           0.00582,           0.04423,          -0.00549,           0.00983,

           0.27355,          -0.38057,           0.24001,          -0.05441,
          -0.07706,           0.14269,

          -0.00059,          -0.00154,

          -0.00013,          -0.00088,

          -0.00046,           0.00029,

          -0.00276,          -0.00507,           0.00075,          -0.00076,

           0.01806,           0.00862,          -0.00510,          -0.01364,

          -0.00029,          -0.12664,           0.03899,          -0.03562,
           0.00318,           0.00514,

           0.00057,           0.00201,

           0.00028,           0.00014,

          -0.47022,          -0.74561,           0.40155,          -0.16471,
          -0.18445,           0.34425,          -0.07464,          -0.13709,

          -0.01018,          -0.00748,

          -0.01210,          -0.04274,          -0.00579,          -0.00692,

         -11.09188,          -1.67755,          -6.62063,         -13.84023,
          12.75563,          -6.73501,           8.31662,           5.40196,

           0.00052,           0.00034,

           0.00128,           0.00085,

          -0.02202,          -0.00599,

          -0.33458,          -1.65852,           1.47003,          -1.02434,
           0.87885,           1.15334,

          -0.00241,          -0.00721,

           0.03154,           0.00612,

           0.00318,          -0.02521,

           0.00042,           0.00213,

          -0.01094,           0.05417,          -0.03989,          -0.00567,
           0.00123,          -0.00244,

           0.00108,           0.00242,

          -0.00138,          -0.00099,

           0.04967,           0.01643,          -0.00133,           0.02296,

           0.12207,           0.05584,

           0.00437,          -0.04432,          -0.00176,          -0.00922,

          -0.00252,           0.00326,

          -0.00020,          -0.00050,

          -0.00263,          -0.00084,

          -0.01971,           0.00297,

           0.03076,           0.01736,

          -0.01331,           0.01121,          -0.00675,           0.00340,

          -0.00256,           0.00327,

          -0.00946,           0.03377,          -0.00770,           0.00337,

           0.61383,           0.71128,          -0.02018,           0.62097,
          -0.07247,           0.04418,

          -0.02886,          -0.03848,

          -0.44062,           0.03973,

          -0.00999,          -0.04382,

          57.94459,         117.45112,         -71.22893,         126.39415,
         -62.33152,         -31.90754,          12.17738,         -16.46809,

          -1.13298,           0.08962,          -0.20532,           0.16320,

          -1.55110,          -1.44757,

       -3102.08749,       -7452.61957,       -5009.53858,       -7216.29165,
       -2476.87148,       -1880.58197,        -574.49433,         227.45615,
         144.50228,         379.15791,         225.36130,        -443.47371,

          -8.51989,          -3.75208,          -4.25415,          -1.59741,
          -0.43946,          -0.06595,

         150.42986,           6.54937,          87.67736,          92.32332,
         -21.97187,          29.87097,          -4.21636,          -5.72955,

          -0.03879,          -0.01071,

          -0.45985,           0.02679,          -0.02448,           0.02397,

          -0.06551,          -0.01154,

           1.97905,          -0.82292,           1.10140,           0.30924,
           0.03389,           0.14230,

           0.00003,           0.00119,

          -0.01117,           0.00665,

          -0.00132,          -0.00576,

          -0.08356,           0.08556,          -0.26362,          -0.12450,

           0.00509,           0.00165,

           0.02591,           0.16200,          -0.03318,           0.06463,
          -0.00899,          -0.00462,

           0.00102,           0.00004,

          -0.73102,           0.08299,          -0.52957,          -0.35744,
           0.14119,          -0.24903,           0.20843,           0.14143,

           0.00031,          -0.00234,

          -0.42643,          -2.02084,           1.58848,          -1.57963,
           0.68418,           2.07749,

          -0.45888,           0.19859,          -0.30277,          -0.22591,
           0.11607,          -0.09705,

           0.00040,           0.00431,

          -0.02683,           0.03158,          -0.01302,          -0.00541,
           0.01742,          -0.00006,

          -0.02231,          -0.01128,

          -0.00800,           0.02055,

          -0.00346,           0.00151,

           0.56732,          -0.68995,           0.27701,          -0.16748,
           0.01002,           0.00043,

           0.26916,          -0.57751,           0.15547,          -0.15825,
          -0.02074,          -0.07722,

          -8.23483,          -4.02022,           0.69327,          -5.91543,
           1.72440,           1.02090,

           0.00024,          -0.00053,

          20.03959,          14.79136,          76.43531,         -14.42019,
          -7.82608,         -69.96121,         -54.94229,          23.55140,
          26.60767,          14.68275,

           0.05118,          -0.10401,          -0.00075,          -0.01942,

          -3.84266,         -26.23442,          10.20395,         -14.77139,
           3.40853,           2.07297,          -0.53348,           0.40635,

           0.00716,          -0.00189,

           0.12472,          -0.02903,           0.02254,          -0.00183,

          -0.00175,          -0.01522,           0.00003,          -0.00339,

           0.00383,          -0.00168,

           0.01327,          -0.03657,

          -0.08458,          -0.00115,          -0.03991,          -0.02629,
           0.00243,          -0.00505,

           0.33875,          -0.16744,           0.05183,           0.01744,
          -0.24427,           0.15271,

           0.37550,          -0.17378,           0.09198,          -0.27966,
          -0.22160,           0.16426,

           0.00032,          -0.00310,

          -0.00022,          -0.00144,

          -0.06170,          -0.01195,          -0.00918,           0.02538,
           0.03602,           0.03414,

          -0.14998,          -0.44351,           0.45512,          -0.11766,
           0.35638,           0.27539,

           5.93405,          10.55777,          12.42596,          -1.82530,
          -2.36124,          -6.04176,          -0.98609,           1.67652,

          -0.09271,           0.03448,          -0.01951,           0.00108,

           0.33862,           0.21461,           0.02564,           0.06924,

           0.01126,          -0.01168,          -0.00829,          -0.00740,
           0.00106,          -0.00854,

          -0.08404,           0.02508,          -0.02722,          -0.06537,

           0.01662,           0.11454,           0.06747,           0.00742,
          -0.01975,          -0.02597,

          -0.00097,          -0.01154,           0.00164,          -0.00274,

           0.02954,          -0.05161,          -0.02162,          -0.02069,
          -0.06369,           0.03846,

           0.00219,          -0.01634,          -0.04518,           0.06696,

           1.21537,           0.99500,           0.68376,          -0.28709,
          -0.11397,          -0.06468,

           0.00607,          -0.00744,           0.01531,           0.00975,

          -0.03983,           0.02405,           0.07563,           0.00356,

          -0.00018,          -0.00009,

           0.00172,          -0.00331,

           0.01565,          -0.03466,          -0.00230,           0.00142,
          -0.00788,          -0.01019,

           0.01411,          -0.01456,          -0.00672,          -0.00543,

           0.00059,          -0.00011,

          -0.00661,          -0.00496,          -0.01986,           0.01271,

          -0.01323,          -0.00764,           0.00041,           0.01145,

           0.00378,          -0.00137,           0.00652,           0.00412,

           0.01946,          -0.00573,

          -0.00326,          -0.00257,

          -0.00225,           0.00090,

          -0.00292,          -0.00317,          -0.00719,           0.00468,

           0.00245,           0.00189,

           0.00565,          -0.00330,

          -0.00168,          -0.00047,

          -0.00256,           0.00220,

           0.00180,          -0.00162,

          -0.00085,          -0.00003,

          -0.00100,           0.00098,

          -0.00043,           0.00007,

          -0.00003,          -0.00013,

  ];
  this.sattabr = [
      -38127.94034,      -48221.08524,      -20986.93487,       -3422.75861,
          -8.97362,          53.34259,        -404.15708,          -0.05434,

           0.46327,           0.16968,

        -387.16771,        -146.07622,         103.77956,          19.11054,
         -40.21762,         996.16803,        -702.22737,         246.36496,
         -63.89626,        -304.82756,          78.23653,          -2.58314,

          -0.11368,          -0.06541,

          -0.34321,           0.33039,

           0.05652,          -0.16493,

          67.44536,         -29.43578,          50.85074,          18.68861,
           0.39742,          13.64587,          -1.61284,           0.11482,

           0.01668,          -0.01182,

          -0.00386,           0.01025,

           0.00234,          -0.01530,

          -0.02569,          -0.00799,

          -0.00429,          -0.00217,

          -0.00672,           0.00650,

           0.01154,           0.00120,          -0.00515,           0.00125,

           0.00236,          -0.00216,

          -0.00098,           0.00009,

          -0.00460,          -0.00518,

           0.00600,           0.00003,

           0.00834,           0.00095,           0.01967,           0.00637,

          -0.00558,          -0.06911,

          -0.01344,          -0.06589,          -0.05425,          -0.00607,

          -0.00247,          -0.00266,

           0.08790,          -0.08537,          -0.00647,           0.04028,

          -0.00325,           0.00488,

           0.00111,          -0.00044,

          -0.00731,           0.00127,

          -0.00417,           0.00303,

           0.05261,           0.01858,

          -0.00807,           0.01195,

           1.26352,          -0.38591,          -0.34825,           1.10733,

          -0.02815,          -0.02148,

          -0.05083,          -0.04377,          -0.01206,          -0.00586,

           0.03158,          -0.01117,           0.00643,           0.00306,

          -0.01186,          -0.05161,           0.01136,          -0.00976,

          -0.00536,           0.01949,

          -1.41680,          -0.81290,          -0.09254,          -0.24347,
          -0.14831,          -0.34381,

          -2.44464,           0.41202,          -0.99240,          -0.33707,
          -0.01930,          -0.08473,

           0.00830,           0.01165,

          -0.01604,          -0.02439,

           0.00227,           0.04493,

         -42.75310,         -22.65155,          -9.93679,         -18.36179,
           2.73773,           3.24126,          -1.20698,           1.07731,

           0.00434,          -0.10360,

          -0.02359,           0.00054,

          -0.02664,          -0.00122,

         -19.79520,          33.11770,         -53.56452,         -35.41902,
          67.95039,         -82.46551,         117.31843,          14.08609,

           0.06447,           0.03289,

           0.40365,          -0.33397,           0.07079,          -0.09504,

         -30.36873,           6.23538,         -14.25988,         -44.91408,
          38.53146,         -16.31919,           6.99584,          22.47169,

          -0.13313,           0.28016,

           6.83715,          -6.01384,           1.68531,          -3.62443,
          -0.22469,          -0.29718,

           0.25169,           0.13780,

          -3.64824,           1.22420,          -2.48963,          -1.12515,
          -0.01510,          -0.56180,

          -0.03306,           0.01848,          -0.00103,          -0.00077,

          -0.01681,          -0.00227,

          -0.00402,          -0.00287,

           0.04965,          -0.16190,          -0.40025,           0.20734,
           0.15819,          -0.25451,

           0.02467,          -0.00495,

           0.00597,           0.00490,

          -0.01085,          -0.00460,

          -0.71564,          -0.26624,           0.03797,          -0.28263,
           0.03510,           0.30014,

           2.79810,           0.07258,

          -0.01618,           0.00337,

           0.00876,           0.04438,

           0.00742,          -0.00455,

          -0.01163,          -0.00683,

           0.00950,           0.01275,

          -0.02124,          -0.67527,          -0.23635,           0.06298,

          -0.03844,           0.01010,           0.73588,          -0.00271,

           0.01742,          -0.00467,

           0.00017,          -0.00505,

          -0.27482,           5.00521,          -1.92099,           1.55295,
          -0.35919,          -0.09314,

          -0.47002,           0.06826,

           0.07924,           0.16838,

          -0.04221,           0.71510,          -0.16482,           0.08809,

          41.76829,        -125.79427,         106.65271,         -71.30642,
          36.18112,          17.36143,          -1.63846,           5.02215,

          -1.08404,           0.00061,

           2.45567,          -2.42818,          -9.88756,           5.36587,

          -0.61253,          -0.35003,

        1523.54790,         602.82184,          68.66902,        1878.26100,
       -1098.78095,        -120.72600,         127.30918,        -383.96064,

          -7.00838,          -6.09942,          -1.54187,           0.34883,

          -9.47561,          -4.35408,

      -21541.63676,      -32542.09807,      -29720.82604,      -28072.21231,
      -15755.56255,       -8084.58657,       -8148.87315,        7434.89857,
       11033.30133,        7827.94658,         610.18256,      -11411.93624,

          -9.87426,           0.94865,          -1.63656,           0.41275,

        1996.57150,         511.48468,         669.78228,        1363.67610,
        -379.72037,         198.84438,         -16.63126,         -79.37624,

          -2.30776,        -246.07820,         -16.85846,        -148.18168,
          -6.89632,         -20.49587,           0.39892,          -0.34627,

         -57.81309,        -136.96971,          15.25671,         -96.61153,
          16.09785,          -8.79091,           0.70515,           1.16197,

           0.05647,           0.04684,

           0.25032,          -0.19951,           0.07282,          -0.00696,

           0.00493,           0.00733,

          -0.01085,           0.00422,

          -0.01309,           0.00262,

           0.37616,          -0.36203,          -0.11154,           0.18213,

           0.15691,           0.29343,           0.00485,           0.06106,

          -0.01492,           0.09954,

           0.28486,           2.27190,           0.33102,           1.50696,
          -0.01926,           0.04901,

           0.01827,           0.00863,

          -0.03315,           0.00178,

          -0.77600,          -0.48576,          -0.21111,          -0.19485,

           1.90295,           6.44856,           1.71638,           2.12980,
          -7.19585,          -0.08043,

           0.07004,          -0.02764,

           0.01604,           0.01158,

           0.00936,          -0.01199,

           0.18396,          -0.29234,           0.10422,          -0.00720,

           0.05196,           0.10753,           0.02859,          -0.03602,

           0.63828,           1.96280,          -0.31919,           0.85859,
          -0.10218,          -0.00673,

           0.01748,          -0.02190,

           0.01266,          -0.02729,

          -4.80220,           8.90557,          -5.94059,           2.28577,
          -0.19687,          -1.28666,           0.32398,           0.14879,

          -0.02619,          -0.02056,

          -0.04872,          -0.07011,          -0.04082,          -0.04740,

           0.60167,          -2.20365,          -0.27919,          -0.45957,
          -1.31664,          -2.22682,         176.89871,          13.03918,

           0.00568,           0.00560,

           0.01093,           0.00486,

          -0.00948,          -0.31272,

         -11.87638,          -3.68471,          -1.74977,          -9.60468,
           2.94988,          -0.57118,

           0.00307,          -0.01636,

           0.02624,           0.03032,

          -0.00464,          -0.01338,

           0.00935,           0.00530,

          -0.11822,           0.03328,          -0.41854,           0.04331,
           0.41340,          -0.21657,

          -0.00865,           0.00849,

          -0.00374,          -0.00899,

           0.01227,          -0.23462,          -0.71894,          -0.04515,

           0.00047,           0.28112,

          -0.12788,           0.11698,          -0.02030,           0.02759,

           0.02967,          -0.00092,

           0.00454,           0.00565,

          -0.00026,           0.00164,

          -0.01405,          -0.00862,

           0.01088,           0.05589,

           0.18248,          -0.06931,          -0.00011,           0.03713,

           0.01932,          -0.00982,

          -0.13861,           0.09853,          -0.03441,          -0.02492,

           2.26163,          -5.94453,           4.14361,          -0.94105,
           0.39561,           0.75414,

          -0.17642,           0.03724,

          -1.32978,          -0.56610,

          -0.03259,          -0.06752,

          39.07495,          80.25429,         -28.15558,          82.69851,
         -37.53894,         -17.88963,           6.98299,         -13.04691,

          -0.48675,          -1.84530,          -0.07985,          -0.33004,

          -3.39292,           2.73153,

      -17268.46134,        1144.22336,      -16658.48585,        5252.94094,
       -3461.47865,        2910.56452,        -433.49442,        -305.74268,
        -383.45023,         545.16136,         313.83376,          27.00533,

         -31.41075,           7.90570,         -12.40592,           3.01833,
          -0.83334,           0.23404,

          59.26487,        -112.74279,         113.29402,         -15.37579,
          14.03282,          32.74482,          -4.73299,           1.30224,

          -0.00866,           0.01232,

          -0.53797,           0.00238,          -0.07979,           0.04443,

          -0.05617,          -0.05396,

           0.10185,          -1.05476,           0.43791,          -0.32302,
           0.06465,           0.03815,

           0.00028,          -0.00446,

           0.09289,          -0.06389,

           0.01701,          -0.01409,

           0.47101,           0.16158,           0.01036,          -0.39836,

           0.00477,           0.01101,

          -2.06535,           0.33197,          -0.82468,          -0.41414,
           0.03209,          -0.09348,

           0.00843,          -0.00030,

          -9.49517,          -3.82206,           0.66899,         -10.28786,
           6.33435,           1.73684,          -0.98164,           2.25164,

          -0.07577,          -0.00277,

           1.02122,           0.75747,           1.79155,          -0.77789,
          -2.56780,          -2.07807,

           0.19528,           0.77118,          -0.28083,           0.32130,
          -0.04350,          -0.07428,

          -0.01161,           0.01387,

           0.02074,           0.19802,          -0.03600,           0.04922,
          -0.19837,           0.02572,

          -0.00682,          -0.04277,

          -0.01805,           0.00299,

           0.03283,          -0.02099,

           3.57307,           1.17468,           0.65769,           1.88181,
          -0.39215,           0.08415,

          -0.53635,          -0.19087,          -0.12456,           0.02176,
           0.01182,          -0.07941,

          -2.43731,           2.44464,           1.03961,          -1.81936,
          30.33140,           0.92645,

           0.00508,          -0.01771,

         -81.06338,          66.43957,          33.16729,         131.44697,
          76.63344,         -34.34324,         -35.33012,         -28.04413,
          -1.47440,          13.09015,

           0.13253,          -0.01629,           0.02187,          -0.00963,

         -21.47470,          -9.44332,          -7.21711,         -12.59472,
           1.76195,          -1.63911,           0.09060,           0.28656,

           0.00635,           0.00536,

           0.03470,          -0.06493,           0.00666,          -0.01084,

           0.01116,          -0.01612,          -0.00102,           0.00208,

          -0.05568,           0.00628,

           0.02665,          -0.01032,

           0.21261,          -1.90651,           0.72728,          -0.57788,
           0.08662,           0.10918,

           3.39133,           3.97302,          -4.63381,           4.26670,
          -2.50873,          -3.76064,

           1.28114,           1.81919,           1.48064,          -0.37578,
          -0.26209,          -0.47187,

           0.00282,          -0.00499,

           0.01749,           0.03222,

           1.60521,          -1.79705,           1.61453,           0.68886,
          -0.29909,           0.55025,

          -0.07894,           0.19880,          -0.15635,           0.46159,
           2.09769,           1.52742,

          -7.60312,          11.34886,           4.35640,           8.61048,
           2.15001,          -2.15303,          -0.61587,          -0.11950,

          -0.03289,          -0.00520,          -0.00501,          -0.00445,

           0.15294,          -0.05277,           0.02455,           0.00408,

           1.19601,           0.43479,           0.20422,           0.57125,
          -0.12790,           0.01318,

          -0.15275,          -0.43856,           6.99144,          -0.08794,

          -1.69865,           0.82589,          -0.20235,           0.97040,
           0.20903,           0.00675,

           0.26943,           0.08281,           0.03686,           0.05311,

           1.28468,           1.21735,          -1.38174,           1.29570,
          -0.75899,          -1.17168,

           0.44696,          -0.32341,          -0.06378,          -0.27573,

          -0.06406,           0.87186,           0.21069,           0.19724,
           0.00119,          -0.04147,

           0.39279,           0.51437,          -0.11035,           0.21450,

          -0.04309,           0.02359,           0.20490,           0.14210,

           0.00007,          -0.00017,

          -0.03529,          -0.02644,

           0.10710,           0.44476,          -0.02632,          -0.01817,
           2.11335,          -0.04432,

           0.18206,           0.27335,           0.08867,           0.00313,

          -0.00692,           0.01595,

          -0.72957,           0.32080,          -0.29291,          -0.44764,

           0.12767,          -0.05778,           0.04797,          -0.00223,

           0.17661,           0.22427,          -0.04914,           0.09114,

           0.12236,           0.00708,

           0.74315,          -0.01346,

           0.02245,          -0.02555,

          -0.30446,           0.13947,          -0.12340,          -0.18498,

          -0.04099,           0.02103,

           0.06337,          -0.01224,

           0.28181,          -0.01019,

          -0.02794,          -0.09412,

           0.03272,          -0.01095,

           0.11247,          -0.00650,

          -0.01319,          -0.04296,

           0.04653,          -0.00423,

           0.06535,           0.00014,

  ];

  this.satargs = [
  0,  7,
  3,  2,  5, -6,  6,  3,  7,  0,
  2,  2,  5, -5,  6,  5,
  3,  1,  6, -4,  7,  2,  8,  0,
  2,  1,  6, -3,  7,  0,
  3,  1,  6, -2,  7, -2,  8,  0,
  2,  4,  5,-10,  6,  3,
  3,  1,  5, -1,  6, -4,  7,  0,
  3,  2,  5, -4,  6, -3,  7,  0,
  3,  2,  6, -8,  7,  4,  8,  0,
  3,  3,  5,-10,  6,  7,  7,  0,
  2,  6,  5,-15,  6,  0,
  2,  2,  6, -6,  7,  0,
  3,  1,  5, -4,  6,  4,  7,  1,
  3,  1,  5, -2,  6, -1,  7,  0,
  3,  2,  5, -5,  6,  1,  8,  0,
  3,  3,  5, -8,  6,  2,  7,  0,
  3,  1,  5, -3,  6,  2,  8,  0,
  3,  1,  5, -3,  6,  1,  7,  1,
  1,  1,  8,  0,
  3,  1,  5, -3,  6,  2,  7,  1,
  3,  1,  5, -2,  6, -2,  7,  0,
  2,  2,  6, -5,  7,  1,
  3,  2,  6, -6,  7,  2,  8,  0,
  3,  2,  6, -7,  7,  4,  8,  0,
  3,  2,  5, -4,  6, -2,  7,  0,
  3,  1,  5, -1,  6, -5,  7,  0,
  3,  2,  6, -7,  7,  5,  8,  0,
  3,  1,  6, -1,  7, -2,  8,  0,
  2,  1,  6, -2,  7,  1,
  3,  1,  6, -3,  7,  2,  8,  0,
  3,  1,  6, -4,  7,  4,  8,  1,
  3,  2,  5, -5,  6,  2,  8,  1,
  3,  2,  5, -6,  6,  2,  7,  1,
  2,  2,  7, -2,  8,  0,
  1,  1,  7,  2,
  2,  5,  5,-12,  6,  2,
  3,  2,  6, -5,  7,  1,  8,  0,
  3,  1,  5, -1,  6, -3,  7,  0,
  3,  7,  5,-18,  6,  3,  7,  0,
  2,  3,  5, -7,  6,  3,
  3,  1,  6,  1,  7, -5,  8,  0,
  3,  1,  5, -4,  6,  3,  7,  0,
  3,  5,  5,-13,  6,  3,  7,  0,
  2,  1,  5, -2,  6,  3,
  3,  3,  5, -9,  6,  3,  7,  0,
  3,  3,  5, -8,  6,  3,  7,  1,
  2,  1,  5, -3,  6,  3,
  3,  5,  5,-14,  6,  3,  7,  0,
  3,  1,  5, -3,  6,  3,  7,  2,
  2,  3,  6, -7,  7,  0,
  2,  3,  5, -8,  6,  2,
  3,  2,  5, -3,  6, -4,  7,  1,
  3,  2,  5, -8,  6,  7,  7,  0,
  2,  5,  5,-13,  6,  0,
  2,  2,  6, -4,  7,  2,
  3,  2,  6, -5,  7,  2,  8,  0,
  3,  2,  5, -4,  6, -1,  7,  0,
  3,  2,  5, -7,  6,  4,  7,  0,
  2,  1,  6, -2,  8,  2,
  2,  1,  6, -1,  7,  0,
  3,  1,  6, -2,  7,  2,  8,  0,
  3,  2,  5, -5,  6,  2,  7,  0,
  3,  2,  5, -6,  6,  2,  8,  0,
  3,  2,  5, -6,  6,  1,  7,  0,
  2,  3,  7, -2,  8,  0,
  1,  2,  7,  1,
  2,  1,  6, -1,  8,  1,
  3,  1,  5, -2,  6,  1,  7,  0,
  3,  1,  5, -2,  6,  2,  8,  0,
  2,  3,  6, -6,  7,  2,
  2,  6,  5,-14,  6,  0,
  3,  3,  6, -7,  7,  2,  8,  0,
  3,  2,  5, -3,  6, -3,  7,  1,
  2,  4,  5, -9,  6,  3,
  3,  2,  6, -2,  7, -2,  8,  0,
  2,  2,  6, -3,  7,  1,
  3,  2,  6, -4,  7,  2,  8,  0,
  2,  2,  5, -4,  6,  3,
  3,  2,  5, -7,  6,  3,  7,  1,
  3,  1,  6,  1,  7, -2,  8,  0,
  1,  1,  6,  5,
  3,  2,  5, -5,  6,  3,  7,  1,
  2,  2,  5, -6,  6,  3,
  1,  3,  7,  3,
  2,  4,  5,-11,  6,  3,
  2,  1,  5, -4,  7,  0,
  3,  2,  5, -5,  6, -3,  7,  1,
  2,  6,  5,-16,  6,  0,
  3,  3,  5, -7,  6,  2,  7,  0,
  3,  3,  6, -4,  7, -2,  8,  0,
  2,  3,  6, -5,  7,  1,
  3,  3,  6, -6,  7,  2,  8,  1,
  3,  3,  6, -7,  7,  4,  8,  0,
  3,  2,  5, -3,  6, -2,  7,  2,
  3,  2,  5, -8,  6,  5,  7,  0,
  2,  2,  6, -4,  8,  0,
  3,  2,  6, -1,  7, -2,  8,  1,
  2,  2,  6, -2,  7,  2,
  3,  2,  6, -3,  7,  2,  8,  0,
  3,  2,  5, -4,  6,  1,  7,  0,
  3,  2,  5, -4,  6,  2,  8,  0,
  3,  2,  5, -7,  6,  2,  7,  1,
  2,  1,  6,  1,  7,  1,
  2,  5,  5,-11,  6,  2,
  3,  1,  5, -2,  7, -2,  8,  0,
  2,  1,  5, -3,  7,  0,
  2,  3,  5, -6,  6,  3,
  3,  2,  6,  1,  7, -5,  8,  0,
  2,  2,  6, -3,  8,  1,
  2,  1,  5, -1,  6,  3,
  3,  2,  5, -7,  6,  3,  8,  0,
  3,  3,  5, -7,  6,  3,  7,  0,
  3,  2,  5, -1,  6, -7,  7,  0,
  2,  1,  5, -4,  6,  2,
  3,  1,  5, -2,  6,  3,  7,  0,
  2,  4,  6, -7,  7,  0,
  2,  3,  5, -9,  6,  0,
  3,  2,  5, -2,  6, -4,  7,  0,
  2,  3,  6, -4,  7,  2,
  3,  2,  5, -3,  6, -1,  7,  0,
  3,  2,  5, -8,  6,  4,  7,  0,
  2,  2,  6, -2,  8,  1,
  2,  2,  6, -1,  7,  0,
  3,  2,  6, -2,  7,  2,  8,  1,
  3,  2,  5, -4,  6,  2,  7,  0,
  3,  2,  5, -7,  6,  2,  8,  0,
  3,  2,  5, -7,  6,  1,  7,  0,
  2,  1,  6,  2,  7,  0,
  2,  2,  6, -1,  8,  0,
  2,  4,  6, -6,  7,  1,
  2,  6,  5,-13,  6,  0,
  3,  2,  5, -2,  6, -3,  7,  1,
  2,  4,  5, -8,  6,  2,
  3,  3,  6, -2,  7, -2,  8,  0,
  2,  3,  6, -3,  7,  0,
  3,  3,  6, -4,  7,  2,  8,  0,
  2,  2,  5, -3,  6,  3,
  3,  2,  5, -8,  6,  3,  7,  1,
  3,  2,  6,  1,  7, -2,  8,  0,
  1,  2,  6,  5,
  3,  2,  5, -4,  6,  3,  7,  2,
  2,  2,  5, -7,  6,  3,
  3,  1,  6,  4,  7, -2,  8,  0,
  2,  1,  6,  3,  7,  1,
  3,  1,  6,  2,  7,  2,  8,  0,
  2,  4,  5,-12,  6,  2,
  2,  5,  6, -8,  7,  0,
  2,  4,  6, -5,  7,  0,
  3,  2,  5, -2,  6, -2,  7,  0,
  2,  3,  6, -2,  7,  1,
  3,  3,  6, -3,  7,  2,  8,  0,
  2,  5,  5,-10,  6,  2,
  3,  1,  5,  1,  6, -3,  7,  0,
  2,  3,  5, -5,  6,  3,
  2,  3,  6, -3,  8,  0,
  1,  1,  5,  2,
  2,  1,  5, -5,  6,  2,
  2,  5,  6, -7,  7,  0,
  2,  4,  6, -4,  7,  2,
  2,  3,  6, -2,  8,  0,
  2,  3,  6, -1,  7,  0,
  2,  5,  6, -6,  7,  0,
  2,  4,  5, -7,  6,  2,
  2,  4,  6, -3,  7,  2,
  2,  2,  5, -2,  6,  2,
  3,  2,  6, -9,  7,  3,  8,  0,
  1,  3,  6,  4,
  3,  2,  5, -3,  6,  3,  7,  1,
  2,  2,  5, -8,  6,  3,
  3,  2,  6,  4,  7, -2,  8,  0,
  2,  4,  5,-13,  6,  1,
  2,  6,  6, -8,  7,  1,
  2,  5,  6, -5,  7,  0,
  2,  4,  6, -2,  7,  0,
  2,  5,  5, -9,  6,  2,
  2,  3,  5, -4,  6,  2,
  2,  1,  5,  1,  6,  2,
  2,  6,  5,-11,  6,  0,
  3,  6,  6, -7,  7,  2,  8,  0,
  2,  4,  5, -6,  6,  2,
  2,  2,  5, -1,  6,  2,
  1,  4,  6,  3,
  3,  2,  5, -2,  6,  3,  7,  1,
  2,  2,  5, -9,  6,  1,
  2,  5,  5, -8,  6,  2,
  2,  3,  5, -3,  6,  1,
  2,  1,  5,  2,  6,  2,
  2,  6,  5,-10,  6,  1,
  2,  4,  5, -5,  6,  2,
  1,  2,  5,  1,
  1,  5,  6,  2,
  2,  5,  5, -7,  6,  1,
  2,  3,  5, -2,  6,  1,
  3,  1,  5,  2,  6,  3,  7,  0,
  2,  6,  5, -9,  6,  0,
  2,  4,  5, -4,  6,  2,
  2,  2,  5,  1,  6,  1,
  2,  7,  5,-11,  6,  0,
  2,  5,  5, -6,  6,  1,
  2,  3,  5, -1,  6,  1,
  2,  6,  5, -8,  6,  1,
  2,  4,  5, -3,  6,  0,
  2,  5,  5, -5,  6,  0,
  1,  3,  5,  0,
  2,  6,  5, -7,  6,  1,
  2,  7,  5, -9,  6,  0,
  2,  5,  5, -4,  6,  0,
  2,  6,  5, -6,  6,  0,
  2,  7,  5, -8,  6,  0,
  2,  6,  5, -5,  6,  0,
  2,  7,  5, -7,  6,  0,
  2,  8,  5, -9,  6,  0,
  2,  8,  5, -8,  6,  0,
  2,  1,  3, -1,  6,  0,
 -1
  ];

    this.sat404 = new Plantbl(
      [0,  0,  1,  0,  8, 18,  9,  5,  0],
                               7,
                               this.satargs,
                               this.sattabl,
                               this.sattabb,
                               this.sattabr,
                               9.5575813548599999e+00
      );

  }
}

class SwemptabUra{
  constructor(){

  this.uratabl = [
          21.56000,       -4652.06828,   154246324.90417,     1130486.05080,

         330.11531,       -3020.20235,

          -8.03769,        -122.02019,

         212.45130,         254.23866,          25.39758,          60.08296,

        6949.85053,       51951.42606,       -1834.66531,       44481.91144,
       -3267.45825,       10776.65972,        -628.05388,         532.83011,
         -16.80583,         -30.05544,

        1420.33767,        2007.21040,         592.32842,        1541.61732,
        -163.55984,         121.14134,         114.74969,         -16.04944,

           0.06069,           0.00725,

          -0.16861,           0.28785,

           0.07399,          -0.09680,

           0.19936,          -0.41620,

           0.02922,           0.07398,

           0.17272,           0.05602,

           1.65461,          -0.68278,          -2.18745,          -0.85327,
           0.52467,          -0.30863,

           0.01598,           0.30017,

          -0.04190,          -0.03288,

          -0.02013,           0.02257,

          -0.54883,          -0.22701,          -0.09257,          -0.03921,

           0.02644,           0.04667,

           0.24773,          -0.16562,

       44242.85814,     -223163.54065,      123776.84417,     -206375.74884,
       70472.73820,      -27456.55173,        4065.74401,       13202.39154,
       -3260.72648,         802.50579,        -153.13236,        -503.81026,
          30.17812,         -31.91893,

         -65.14719,          77.78417,         -37.38185,          19.13337,
          -3.14043,          -0.21147,

           0.27143,           0.17424,

           0.04458,           0.10976,

          -0.41841,          -0.21887,          -0.09194,          -0.02303,

           0.02896,           0.10044,

           0.01385,           0.01723,

          -0.01126,          -0.09318,

         -57.95890,          29.69059,         -46.41390,           3.07177,
           0.42494,           2.33678,          -3.09621,           0.05256,

          -0.02134,          -0.35202,

          -0.44475,          -0.83135,

        1318.18265,       25605.86848,       -9168.38371,       18917.31507,
       -5145.74480,        2130.77612,        -485.25920,        -438.44867,
          19.97802,         -33.14800,

      -23383.91826,      -45133.19122,      -18520.80729,      -26549.95198,
       -2276.70124,       -2974.01604,         603.23665,         306.87616,
         -87.73070,         -32.49134,

      549975.14525,      261920.31896,      526261.09735,      362619.26839,
      150616.68873,      164643.90808,        9550.02662,       27381.83042,
       -1065.89047,        1024.20231,         -66.63822,         -44.75169,

         -92.10532,         -20.26930,

     -313205.95341,     1462242.64616,      112982.53079,     1865690.41965,
      308844.30901,      639864.93227,       89716.32843,       10378.80773,
        4395.08428,      -14565.35913,       -3016.07754,      -19348.64612,

        3838.36899,       -9813.42713,        6883.58821,       -6064.92588,
        2740.47455,        -176.29547,         241.91895,         268.44181,
          -6.13397,          17.92503,

          -0.01377,          -0.08742,

         387.51915,         257.03872,         152.81792,         221.56197,
         -22.94836,          29.56640,          -2.27801,           4.72805,
          -6.03420,          -0.36763,

           0.00667,           0.00443,

          -0.01405,           0.04658,

          -0.06533,          -0.01966,

           0.10738,           0.00443,

           0.02889,           0.01056,

           0.00900,          -0.02206,

           0.00013,           0.05281,

           0.03035,           0.34793,

           0.19460,           2.47360,

           0.18189,          -0.83895,           0.24983,          15.32050,

           0.46010,           2.79643,

          -0.45793,           0.96707,          -0.31226,           0.51911,
           0.04071,           0.39399,

           0.00038,           0.03854,

           0.22446,           0.13630,          -0.04357,           0.03635,

           0.00202,          -0.04502,

          -0.00458,          -0.03884,

           1.32597,           3.40849,          -1.67839,          -0.95411,

          -1.00116,          -0.72744,          -0.22484,          -0.27682,

          -0.18069,           0.00405,

          -0.01000,           0.27523,

          -0.07038,          -0.01051,

          -0.09064,           0.08518,

           0.02083,          -0.25406,

           0.17745,          -0.00944,

           0.21326,           0.20454,

          18.84894,          -7.64400,           0.62670,         -11.02728,
           8.91329,          20.67190,

           0.17757,          -0.15471,

          -0.11385,          -0.46057,

           6.23014,         -14.46025,           2.30012,          -2.22677,

           5.16823,          -1.64235,

        -274.58413,         833.33247,        -191.26241,         269.90157,
         -17.25965,           9.11368,

        -261.65136,      -18274.45858,       -2553.83872,      -10039.10490,
        -508.52567,         336.18172,          14.88587,         421.35954,
         162.43462,         544.92580,

          -0.44246,           0.23216,

          -0.29024,          -0.13057,

          -1.58438,           0.34032,          -0.31604,          -0.01166,

          -0.07112,           0.05721,

          -0.10813,           0.01064,

          -0.05413,           0.06705,

          -0.41582,          -0.47725,           0.31031,           0.08605,

           0.00409,           0.02373,

           0.08092,           0.06247,          -0.01026,           0.05863,

          -0.00238,           0.02948,

           0.00117,           0.02714,

           0.01720,           0.18261,

          -0.04067,           0.88639,

          -0.15502,          -0.96383,

          -0.05307,          -0.17319,

          -0.00486,          -0.02373,

          -0.14748,          -0.11884,           0.07798,          -0.00358,

           0.01104,           0.00805,

           0.15099,          -0.03453,           0.01846,           0.03459,

           0.02197,           0.07012,

          -0.43677,          -1.87445,           1.35202,           2.28294,

          -0.03592,           0.07679,

           0.16427,           0.03014,           0.02472,           0.05549,

          -0.04985,           0.05874,

           0.35361,           0.01144,          -0.57400,           1.34898,

           0.00265,           0.01540,

           0.00951,           0.08159,

          -0.00435,           0.34759,

          -0.12413,          -0.49848,

          -0.77075,          -2.73810,

         -31.77702,          12.16042,         -14.87605,          11.98287,
          12.69358,           1.31307,          -8.22911,         -21.47437,

          -0.24051,          -0.38332,

          -0.01162,          -0.03175,

           0.00556,           0.02454,

          -0.02297,          -0.01654,

           0.00707,           0.04828,

          -0.00309,           0.17381,

          -0.00500,          -0.07579,

           0.02008,           0.05356,

           0.00702,           0.01133,

          -0.00237,          -0.00612,

           0.18551,           0.22799,          -0.14194,          -0.08593,

           0.00002,          -0.01049,

          -0.17363,          -0.13986,           0.00078,          -0.06993,

          -0.00430,          -0.07795,

          -0.03232,          -4.13170,

           0.00311,           0.05356,

          -0.17324,          -0.15505,          -0.00590,          -0.06608,

           0.04257,          -0.04571,

           0.00501,           0.02141,

          -0.00037,           0.07845,

          -0.00381,          -0.03417,

           0.01834,           0.03349,

           0.07994,           0.15297,

          -0.82299,           0.24672,           0.51764,           0.96379,

           0.01729,           0.02489,

          -0.08581,           0.13252,

           0.00538,           0.01995,

          -0.00148,          -0.02261,

           0.00534,           0.01565,

          -0.07518,          -0.28114,           0.22386,           0.39023,

          -0.00864,           0.00964,

          -0.01923,          -0.02426,

          -0.00112,           0.00923,

          -0.00685,           0.02450,

           0.26733,          -0.99972,          -0.82005,           0.13725,

           0.01520,          -0.00790,

           0.00358,           0.00751,

          -0.00648,          -0.00605,

          -0.04966,          -0.04633,

           0.06394,          -0.01965,

           0.50185,           0.40553,          -0.25809,           0.28853,
           0.52545,          -3.41675,

          -0.00347,          -0.11848,

           0.02945,          -0.01061,

          -0.04160,          -0.03519,

          -0.03234,          -0.81852,

          -0.02156,          -0.00841,

           0.00029,           0.00020,

          -0.02281,          -0.00364,

           0.04738,          -0.04504,

          -0.19161,           0.37225,           0.05765,           0.11987,

           0.00050,           0.02012,

          -0.03806,           0.39498,

           0.29982,           0.00886,           0.01671,          53.04042,

          -0.04160,          -0.38856,

          -0.00174,          -0.01773,

          -0.47661,          -0.32010,          -0.01088,          -0.16231,

          -0.01584,          -0.00144,

           0.06659,           0.12734,

           0.04884,           0.02236,

           0.00146,           0.06030,

          -0.20660,          -0.03982,           0.15091,           1.24562,

          -0.01303,          -0.22426,

          -0.01518,          -0.03922,

          -0.00043,          -0.00047,

           0.02451,           0.04437,

           0.02380,          -0.00189,

          -0.00640,          -0.07114,

          -0.00320,          -0.02491,

          -0.00829,           0.07284,

           0.02846,          -0.28034,

          -0.00268,           0.00256,

          -0.43420,           0.39645,          -0.31053,           1.25916,

          -0.00371,          -0.00651,

          -0.00096,           0.02762,

          -0.00067,          -0.02503,

          -0.01517,           0.03748,

  ];
  this.uratabb = [
           0.00000,         107.91527,          83.39404,        -124.29804,

          -7.73277,          -3.99442,

          -0.08328,          -1.74251,

          -9.05659,         -22.88559,          -2.30655,          -4.40259,

        -470.94604,       -3648.43408,         326.28960,       -2972.91303,
         337.37285,        -650.33570,          57.18479,         -18.29130,
           1.13897,           2.70158,

         -13.64388,         -71.88619,           7.36408,         -43.79994,
           6.57463,          -5.81111,          -0.06451,           0.73379,

           0.00574,          -0.01635,

           0.00074,          -0.01496,

          -0.00418,           0.00647,

          -0.00407,           0.00548,

           0.00002,           0.00187,

          -0.00591,           0.00557,

           0.32568,          -0.01574,           0.19347,          -0.01705,
           0.00173,           0.02384,

          -0.00248,          -0.00103,

           0.00227,           0.00146,

           0.00307,          -0.00040,

           0.03886,           0.01987,           0.00546,           0.00345,

           0.00134,          -0.00609,

          -0.01502,          -0.01569,

      -10080.59325,       10806.67752,      -14013.76861,        9928.38683,
       -6540.83480,        2084.91597,       -1093.05006,        -305.34266,
          -9.04558,        -110.32310,           9.26094,          -3.93195,
           0.25552,           0.50327,

         -13.12170,          -4.19317,          -4.50857,          -3.37626,
          -0.26850,          -0.36028,

          -0.00357,           0.05862,

          -0.00828,           0.00926,

          -0.01515,          -0.03687,          -0.00224,          -0.00802,

          -0.00225,          -0.00158,

          -0.00022,          -0.00044,

          -0.00281,           0.00371,

           2.28259,          -4.29888,           1.74622,          -2.13604,
           0.37023,          -0.37022,           0.00886,           0.07081,

           0.01669,           0.00056,

          -0.02020,           0.01586,

       -4255.31929,        5978.03267,       -7264.48027,        1884.12585,
       -2353.93882,       -1593.23001,          17.57205,        -498.54139,
          33.28704,         -13.79498,

      -38416.64883,      -13774.09664,      -32822.03952,       -3983.42726,
       -7538.09822,        1906.66915,        -221.24439,         512.77046,
          32.26101,          12.46483,

      142710.47871,      -96584.83892,      145395.05981,      -86630.96423,
       48202.96749,      -23596.77676,        5286.16967,       -1626.44031,
         -16.53568,          95.15428,         -15.19472,           5.69207,

          -6.72181,           7.28683,

        9515.16142,     -166495.49381,        5588.84271,     -146260.29445,
        2023.55881,      -30687.22422,         243.64741,         971.58076,
         390.73247,        -236.13754,       -2684.56349,         739.81087,

        -597.39429,         474.89313,        -631.69166,         213.04947,
        -204.89515,         -33.09139,         -17.78004,         -22.21866,
           0.61083,          -1.41177,

          -0.00070,          -0.00501,

         -58.24552,          25.27978,         -36.39386,           0.36376,
          -2.21030,          -6.46685,          -0.58473,          -0.09357,
           0.12829,          -0.94855,

           0.00042,           0.00048,

           0.00411,           0.00101,

           0.00249,          -0.00865,

           0.00223,           0.00293,

           0.00041,          -0.00042,

           0.00104,          -0.00086,

           0.00126,          -0.00380,

           0.00906,          -0.02253,

           0.05998,          -0.10318,

           0.00004,          -0.03225,           0.14303,          -0.05273,

           0.32683,           0.09386,

          -0.17053,           0.60847,          -0.06190,           0.28166,
           0.06411,           0.05289,

           0.01138,           0.00128,

          -0.00930,           0.00272,           0.00037,           0.00215,

           0.00004,           0.00050,

           0.00114,          -0.00217,

           0.05358,          -0.06413,          -0.00124,           0.03842,

           0.01006,           0.22479,           0.00412,           0.04040,

           0.01708,           0.02164,

           0.02484,          -0.02463,

          -0.00103,           0.02633,

          -0.01303,          -0.03214,

           0.03613,           0.02205,

          -0.02677,          -0.02522,

          -0.00293,           0.03130,

          -1.87255,          -2.50308,          -1.53715,           0.36859,
          -0.17829,          -1.12095,

          -0.05652,          -0.00786,

          -0.06992,           0.07279,

          -2.95896,           0.55138,          -0.61498,          -0.11008,

          -0.87790,          -0.50965,

         119.73553,         -35.18217,          44.78683,          -4.22438,
           1.95723,           0.58033,

       -4077.02379,        -353.39110,       -2781.63273,         -75.23318,
        -312.50478,         -23.86495,          24.59887,          32.56837,
         120.09593,         -51.00495,

           0.09737,           0.09111,

           0.04799,          -0.05029,

           0.08351,          -0.33726,           0.03158,          -0.06435,

          -0.00523,          -0.01736,

           0.00751,          -0.01757,

          -0.00406,          -0.01198,

           0.16402,          -0.10986,          -0.02024,           0.07205,

          -0.00440,          -0.00072,

          -0.00465,           0.00310,          -0.00121,          -0.00121,

           0.00083,           0.00020,

           0.00140,          -0.00176,

           0.00381,          -0.00731,

          -0.01618,           0.01570,

          -0.10201,           0.05809,

          -0.03359,           0.01024,

          -0.00535,           0.00018,

           0.00024,           0.00509,          -0.00158,          -0.00466,

           0.00009,          -0.00083,

          -0.00700,          -0.00090,          -0.00011,          -0.00079,

           0.00133,          -0.00126,

           0.01416,           0.05553,           0.04283,          -0.06719,

           0.00119,           0.00291,

          -0.00263,           0.01282,          -0.00040,           0.00188,

          -0.00237,           0.00973,

          -0.39533,           0.18773,          -0.79821,          -0.40168,

           0.00151,          -0.00161,

           0.00123,          -0.00516,

          -0.01432,          -0.00293,

          -0.05477,           0.04130,

          -0.48837,           0.18944,

          -0.12552,           9.37098,           1.02045,           5.11382,
           0.72098,          -3.70049,          -5.80982,           3.30105,

          -0.09682,           0.09696,

          -0.00876,           0.00504,

           0.00318,           0.00245,

           0.00563,          -0.00665,

           0.00108,          -0.00233,

          -0.00117,           0.00177,

          -0.00343,           0.00503,

           0.01044,          -0.00651,

           0.00296,          -0.00162,

           0.00037,           0.00028,

          -0.00020,          -0.00786,           0.00029,           0.00836,

           0.00004,           0.00033,

          -0.00309,          -0.00086,          -0.00157,          -0.00086,

          -0.00058,           0.00105,

          -0.04557,           0.01794,

          -0.00122,          -0.00086,

           0.00420,          -0.00285,           0.00118,          -0.00020,

           0.00743,          -0.01217,

           0.00053,          -0.00084,

          -0.00075,           0.00097,

          -0.00107,           0.00314,

           0.00576,          -0.00505,

           0.03624,          -0.02546,

           0.05379,           0.30081,           0.29870,          -0.22106,

           0.00696,          -0.00801,

          -0.03995,          -0.01808,

          -0.00139,           0.00102,

          -0.00059,           0.00138,

           0.00019,          -0.00037,

           0.00274,           0.00658,           0.00672,          -0.01132,

           0.00023,           0.00051,

           0.00031,           0.00090,

          -0.00017,          -0.00001,

           0.00085,           0.00004,

           0.02221,          -0.01977,           0.07498,           0.03025,

          -0.00082,          -0.00022,

          -0.00073,          -0.00028,

          -0.00253,           0.00259,

          -0.01329,           0.01805,

           0.00096,           0.00833,

          -0.11836,           0.04277,          -0.10820,          -0.03018,
           0.34504,           0.09834,

          -0.00538,          -0.00231,

           0.00036,           0.00042,

          -0.00023,           0.00260,

          -0.01137,           0.00036,

           0.01081,          -0.03271,

          -0.00029,          -0.00028,

           0.00018,          -0.00003,

           0.00009,           0.00012,

           0.00127,           0.00343,           0.00100,          -0.00064,

           0.00014,           0.00004,

           0.00150,           0.00069,

          -0.01484,           0.00135,           0.03930,           0.01405,

           0.00064,           0.00029,

           0.00009,           0.00009,

           0.00054,          -0.00048,           0.00019,           0.00005,

          -0.00009,           0.00018,

           0.00192,          -0.00333,

           0.01824,           0.01071,

           0.00107,          -0.00341,

           0.25530,          -0.18414,          -0.84151,          -0.31475,

          -0.00400,          -0.00010,

          -0.00174,           0.00019,

           0.00006,          -0.00079,

           0.00066,          -0.00070,

           0.00599,           0.00330,

          -0.00160,          -0.00013,

          -0.00067,          -0.00006,

          -0.00176,          -0.00111,

           0.00652,           0.00368,

           0.00004,           0.00001,

          -0.00081,           0.00089,           0.00366,           0.00139,

           0.00002,           0.00001,

          -0.01870,          -0.00998,

          -0.00020,          -0.00007,

           0.00005,           0.00003,

  ];
  this.uratabr = [
           0.00000,         -53.23277,         -44.70609,         -62.54432,

         -19.15218,           0.10867,

          -1.91911,           1.47517,

          16.51994,           5.00458,           3.88980,           1.55740,

        3598.17109,        1831.07574,        2633.34851,        1775.69482,
         497.10486,         488.77343,           6.03892,          31.08365,
          -2.06585,          -1.12599,

         230.37762,        -113.95449,         162.40244,         -46.57185,
           6.70207,          17.27241,          -0.66092,         -14.42065,

          -0.01044,          -0.00287,

          -0.03894,          -0.01663,

           0.01629,           0.00496,

           0.08411,           0.02855,

           0.01795,          -0.00695,

           0.02426,          -0.03921,

          -0.24495,          -0.77369,          -0.31404,           0.38668,
          -0.05682,          -0.17197,

           0.06145,          -0.00510,

           0.00606,          -0.00886,

          -0.00370,          -0.00588,

           0.02173,          -0.11909,           0.00302,          -0.01796,

          -0.01067,           0.00990,

           0.05283,           0.06517,

       59710.89716,        -491.12783,       58672.38609,       19564.41947,
       10597.99050,       14313.02561,       -2585.52040,         766.78396,
        -138.39893,        -802.43403,         131.35006,         -31.97561,
           7.95978,           8.16075,

          28.72669,          31.72473,           6.45792,          16.50701,
           0.01066,           1.29718,

           0.11565,          -0.13240,

           0.05110,          -0.01543,

          -0.09994,           0.18864,          -0.01330,           0.04148,

           0.03510,          -0.00366,

           0.00604,          -0.00604,

           0.03752,          -0.00256,

          -7.00488,         -21.63748,           1.43064,         -17.10914,
          -0.62987,           0.48719,           0.00697,          -1.22665,

          -0.14435,          -0.00550,

           0.32008,          -0.19855,

      -13976.73731,       -3559.49432,       -7709.90803,       -9310.80334,
         749.31835,       -3491.50696,         540.94979,         -84.57550,
          16.96663,          35.53930,

       37214.64771,      -36361.15845,       21093.74492,      -31855.33076,
        1500.84653,       -7031.97901,        -453.40865,         -18.36692,
          -2.07726,         -17.92336,

      -56348.30507,      378512.71483,     -111444.43340,      370543.95160,
      -61893.70301,      112131.05507,      -11977.44617,        9156.15245,
        -567.61838,        -495.25760,          16.96202,         -44.06279,

           4.24760,         -48.83674,

     -643705.49516,     -131013.09649,     -838580.02217,       67627.11556,
     -288441.70339,      150227.25291,       -2500.57537,       42676.19888,
        7084.60505,        2043.65642,        9639.56835,       -1502.03390,

       -4126.00409,        -828.73564,       -2801.35204,       -2293.77751,
        -209.23365,       -1045.31476,          95.57334,        -102.74623,
           7.19216,           1.89593,

          -0.05661,           0.02166,

         120.38332,        -141.16507,          98.31386,         -40.23448,
          10.84269,          17.57713,           1.69239,           1.45065,
          -0.19626,           2.76108,

          -0.00270,           0.00360,

          -0.02333,          -0.00710,

          -0.01035,           0.02950,

           0.00737,          -0.06311,

          -0.00613,           0.01407,

           0.01377,           0.00879,

          -0.03287,           0.00012,

          -0.21667,           0.01793,

          -1.54865,           0.10953,

           0.54543,           0.12102,          -9.48047,           0.11477,

          -1.34966,           0.23199,

          -1.50834,           0.26567,          -0.64503,           0.10742,
          -0.21452,           0.04428,

          -0.01920,          -0.00906,

          -0.09378,           0.12773,          -0.02787,          -0.03090,

           0.03111,           0.00140,

           0.03771,          -0.01269,

          -1.94794,           1.22823,           0.64183,          -1.11467,

          -0.19301,          -0.27357,           0.05710,          -0.08115,

          -0.07318,           0.00806,

           0.14286,           0.20297,

           0.14920,          -0.07897,

           0.09682,           0.02379,

          -0.13928,           0.01679,

          -0.00774,           0.10060,

           0.24433,           0.16760,

          -2.88905,          -1.61439,           2.83052,          -3.41031,
          36.37048,           3.37867,

           0.29321,           0.09687,

           0.29324,          -0.14651,

           8.11116,           1.79211,           1.36421,           0.88111,

           1.21683,           2.37950,

        -357.76211,         -87.84636,        -117.55745,         -67.18338,
          -5.26029,          -6.27559,

        7509.94562,           3.68942,        4223.62097,       -1041.13557,
         -74.64464,        -251.41613,        -166.22180,          -1.68190,
        -214.55340,          62.79593,

          -0.08250,          -0.15936,

          -0.03830,           0.10857,

           0.21368,           0.50812,           0.00869,           0.09832,

           0.02158,           0.02045,

           0.01407,           0.03591,

           0.03460,           0.01171,

          -0.16400,           0.09751,           0.03521,          -0.12858,

           0.00700,          -0.00524,

           0.01698,          -0.04796,           0.04006,           0.00565,

          -0.02783,          -0.00205,

          -0.02296,           0.00153,

          -0.16139,           0.01514,

          -0.78136,          -0.01546,

           0.40374,          -0.06014,

           0.06212,          -0.01828,

           0.00831,          -0.00173,

           0.06857,          -0.11677,           0.00028,           0.05765,

          -0.00796,           0.00691,

           0.03764,           0.14902,          -0.02653,           0.02122,

          -0.05503,           0.01549,

           1.56630,          -0.35551,          -1.87960,           1.14303,

          -0.06063,          -0.03425,

           0.03367,          -0.11969,           0.04485,          -0.01651,

           0.04647,          -0.02097,

           0.22841,           0.47362,           0.99226,          -0.60660,

          -0.01249,           0.00134,

          -0.07435,           0.00722,

          -0.31796,          -0.00015,

           0.20533,          -0.04398,

           0.93944,          -0.26710,

          -5.60051,          -9.32918,          -5.13538,          -4.05130,
          -0.56529,           4.34112,           7.18308,          -2.66103,

           0.13241,          -0.07999,

           0.01046,          -0.00535,

          -0.04037,          -0.00455,

          -0.00510,           0.00731,

          -0.04576,           0.00513,

          -0.15846,          -0.00236,

           0.04628,          -0.00463,

          -0.01585,           0.00585,

          -0.00213,           0.00283,

           0.00778,          -0.00198,

          -0.17803,           0.18321,           0.07702,          -0.12325,

           0.01091,           0.00349,

           0.14211,          -0.21830,           0.07289,          -0.00994,

           0.07090,          -0.00079,

           4.18441,          -0.07413,

          -0.06247,          -0.00011,

          -0.15453,           0.14499,          -0.06557,          -0.00098,

           0.00290,           0.02921,

          -0.01923,           0.00457,

          -0.07538,          -0.00120,

           0.02263,          -0.00037,

          -0.01061,           0.00591,

          -0.04725,           0.02364,

          -0.07460,          -0.24108,          -0.28310,           0.14643,

          -0.00700,           0.00427,

           0.22963,           0.03713,

          -0.02062,           0.00478,

           0.01434,           0.00095,

          -0.01425,           0.00376,

           0.29611,          -0.08038,          -0.37811,           0.21703,

          -0.00723,          -0.00924,

          -0.02736,           0.01814,

           0.00934,           0.00731,

           0.00613,           0.00686,

          -0.91503,          -0.32009,          -0.15505,           0.79589,

          -0.00555,          -0.01536,

          -0.00698,           0.00480,

           0.00373,          -0.00046,

           0.00715,          -0.00470,

          -0.01970,          -0.05238,

           0.60649,          -0.32669,           0.17790,           0.33383,
          -2.74922,          -0.25827,

          -0.07862,           0.00406,

          -0.00948,          -0.02117,

           0.03127,          -0.04199,

           0.89670,          -0.02413,

           0.01954,           0.03990,

           0.00063,          -0.00071,

          -0.00226,           0.02009,

          -0.04407,          -0.05069,

           0.38230,           0.16101,           0.11893,          -0.06125,

           0.02051,          -0.00046,

           0.39211,           0.03679,

           0.01666,          -0.31336,          53.28735,          -0.01791,

          -0.39414,           0.04181,

          -0.01885,           0.00165,

           0.31349,          -0.47359,           0.16133,          -0.01023,

           0.00007,           0.01758,

          -0.13351,           0.07249,

           0.00977,           0.05445,

           0.11650,          -0.00191,

          -0.09824,           0.40106,           2.41155,          -0.30655,

           0.24975,          -0.01248,

          -0.03688,           0.01097,

           0.00038,          -0.00051,

          -0.04736,           0.02610,

           0.00968,           0.02634,

           0.07918,          -0.00606,

           0.02735,          -0.00320,

          -0.07544,          -0.00468,

           0.19996,          -0.01964,

           0.00201,           0.00267,

           0.39562,           0.43289,           1.24743,           0.31084,

          -0.00666,           0.00377,

           0.05668,           0.00148,

           0.03220,          -0.00026,

           0.03717,           0.01509,

  ];

  this.uraargs = [
  0,  3,
  2,  1,  7, -2,  8,  0,
  2,  2,  7, -4,  8,  0,
  2,  3,  7, -6,  8,  1,
  2,  2,  5, -5,  6,  4,
  2,  1,  6, -3,  7,  3,
  3,  1,  6, -1,  7, -4,  8,  0,
  3,  2,  5, -7,  6,  6,  7,  0,
  3,  2,  6, -6,  7,  1,  8,  0,
  3,  2,  6, -7,  7,  3,  8,  0,
  3,  2,  6, -8,  7,  4,  8,  0,
  3,  2,  6, -7,  7,  2,  8,  0,
  2,  2,  6, -6,  7,  2,
  3,  1,  5, -4,  6,  4,  7,  0,
  3,  1,  6, -2,  7, -1,  8,  0,
  3,  1,  6, -3,  7,  1,  8,  0,
  3,  1,  6, -4,  7,  3,  8,  1,
  2,  5,  7, -9,  8,  0,
  2,  4,  7, -7,  8,  0,
  2,  2,  7, -3,  8,  6,
  2,  1,  7, -3,  8,  2,
  2,  2,  7, -5,  8,  0,
  2,  3,  7, -7,  8,  0,
  3,  1,  6, -6,  7,  5,  8,  1,
  3,  1,  6, -5,  7,  3,  8,  0,
  3,  2,  5, -8,  6,  8,  7,  0,
  3,  1,  5, -4,  6,  5,  7,  0,
  2,  2,  6, -5,  7,  3,
  3,  1,  6,  1,  7, -9,  8,  0,
  3,  2,  5, -4,  6, -2,  7,  0,
  2,  1,  6, -4,  8,  4,
  2,  1,  6, -2,  7,  4,
  2,  5,  7, -8,  8,  5,
  2,  3,  7, -4,  8,  0,
  1,  1,  7,  5,
  2,  2,  7, -6,  8,  4,
  3,  1,  6, -6,  7,  4,  8,  0,
  2,  1,  6, -4,  7,  4,
  3,  2,  6, -5,  7,  1,  8,  0,
  3,  2,  6, -6,  7,  3,  8,  0,
  2,  2,  6, -7,  7,  0,
  3,  1,  5, -4,  6,  3,  7,  0,
  3,  1,  6, -1,  7, -1,  8,  0,
  2,  1,  5, -2,  6,  0,
  2,  6,  7, -9,  8,  0,
  2,  5,  7, -7,  8,  0,
  2,  4,  7, -5,  8,  0,
  2,  3,  7, -3,  8,  1,
  2,  2,  7, -1,  8,  0,
  2,  1,  7,  1,  8,  2,
  1,  3,  8,  0,
  2,  3,  6, -7,  7,  1,
  3,  2,  5, -3,  6, -4,  7,  0,
  3,  2,  6, -3,  7, -2,  8,  0,
  2,  2,  6, -4,  7,  1,
  3,  2,  6, -5,  7,  2,  8,  1,
  3,  5,  5, -9,  6, -8,  7,  0,
  3,  2,  5, -4,  6, -1,  7,  0,
  3,  1,  6,  3,  7, -8,  8,  0,
  3,  2,  6, -8,  7,  1,  8,  0,
  3,  2,  5, -7,  6,  4,  7,  0,
  3,  4,  5,-10,  6,  2,  7,  0,
  2,  1,  6, -2,  8,  0,
  2,  1,  6, -1,  7,  2,
  2,  8,  7,-12,  8,  0,
  2,  7,  7,-10,  8,  0,
  2,  6,  7, -8,  8,  1,
  2,  5,  7, -6,  8,  0,
  2,  4,  7, -4,  8,  2,
  1,  2,  7,  4,
  1,  4,  8,  0,
  2,  1,  7, -6,  8,  0,
  2,  2,  7, -8,  8,  1,
  2,  3,  7,-10,  8,  0,
  2,  4,  7,-12,  8,  0,
  3,  1,  6, -6,  7,  2,  8,  0,
  2,  1,  6, -5,  7,  1,
  3,  1,  6, -4,  7, -2,  8,  0,
  3,  1,  5, -4,  6,  2,  7,  1,
  3,  1,  5, -2,  6,  1,  7,  0,
  2,  7,  7, -9,  8,  0,
  2,  6,  7, -7,  8,  0,
  2,  5,  7, -5,  8,  0,
  2,  4,  7, -3,  8,  0,
  2,  3,  7, -1,  8,  0,
  2,  2,  7,  1,  8,  0,
  2,  3,  6, -6,  7,  1,
  3,  3,  6, -7,  7,  2,  8,  0,
  3,  2,  5, -3,  6, -3,  7,  1,
  3,  2,  6, -2,  7, -2,  8,  0,
  2,  2,  6, -3,  7,  1,
  3,  2,  6, -4,  7,  2,  8,  0,
  3,  2,  5, -7,  6,  3,  7,  1,
  3,  1,  6,  1,  7, -2,  8,  0,
  1,  1,  6,  1,
  2,  8,  7,-10,  8,  0,
  2,  7,  7, -8,  8,  0,
  2,  6,  7, -6,  8,  0,
  2,  5,  7, -4,  8,  0,
  2,  4,  7, -2,  8,  0,
  1,  3,  7,  3,
  2,  2,  7,  2,  8,  0,
  2,  1,  7,  4,  8,  0,
  2,  1,  5, -4,  7,  0,
  2,  1,  6, -6,  7,  0,
  2,  8,  7, -9,  8,  0,
  2,  7,  7, -7,  8,  0,
  2,  6,  7, -5,  8,  0,
  2,  5,  7, -3,  8,  0,
  2,  4,  7, -1,  8,  0,
  3,  3,  6, -4,  7, -2,  8,  0,
  2,  3,  6, -5,  7,  1,
  3,  3,  6, -6,  7,  2,  8,  0,
  3,  2,  5, -3,  6, -2,  7,  1,
  3,  2,  6, -1,  7, -2,  8,  0,
  2,  2,  6, -2,  7,  0,
  3,  2,  6, -3,  7,  2,  8,  0,
  3,  2,  5, -7,  6,  2,  7,  1,
  2,  1,  6,  1,  7,  0,
  2,  9,  7,-10,  8,  0,
  2,  8,  7, -8,  8,  0,
  2,  7,  7, -6,  8,  0,
  2,  6,  7, -4,  8,  0,
  2,  5,  7, -2,  8,  0,
  1,  4,  7,  1,
  2,  3,  7,  2,  8,  0,
  2,  1,  5, -3,  7,  0,
  2,  9,  7, -9,  8,  0,
  2,  8,  7, -7,  8,  0,
  3,  3,  6, -3,  7, -2,  8,  0,
  2,  3,  6, -4,  7,  1,
  3,  3,  6, -5,  7,  2,  8,  0,
  3,  2,  5, -3,  6, -1,  7,  0,
  3,  2,  5, -8,  6,  4,  7,  0,
  2,  2,  6, -2,  8,  0,
  2,  2,  6, -1,  7,  1,
  3,  2,  6, -2,  7,  2,  8,  0,
  3,  2,  5, -7,  6,  1,  7,  0,
  2,  6,  7, -2,  8,  0,
  1,  5,  7,  0,
  3,  3,  6, -4,  7,  1,  8,  0,
  2,  1,  5, -2,  7,  2,
  3,  1,  5, -3,  7,  2,  8,  0,
  3,  1,  5, -1,  6,  1,  7,  0,
  2,  4,  6, -6,  7,  0,
  2,  3,  6, -3,  7,  0,
  1,  2,  6,  0,
  3,  2,  5, -4,  6,  3,  7,  0,
  3,  1,  5,  1,  6, -4,  7,  0,
  3,  3,  5, -5,  6, -1,  7,  0,
  1,  6,  7,  1,
  3,  1,  5,  1,  7, -4,  8,  0,
  2,  1,  5, -2,  8,  0,
  2,  1,  5, -1,  7,  1,
  3,  1,  5, -2,  7,  2,  8,  0,
  3,  1,  5, -3,  7,  4,  8,  0,
  3,  1,  5, -5,  6,  1,  7,  1,
  3,  1,  5, -1,  6,  2,  7,  0,
  2,  4,  6, -5,  7,  0,
  2,  3,  6, -2,  7,  0,
  3,  1,  5,  1,  7, -2,  8,  0,
  1,  1,  5,  1,
  2,  4,  6, -4,  7,  0,
  2,  3,  6, -1,  7,  0,
  3,  3,  5, -5,  6,  1,  7,  0,
  2,  5,  6, -6,  7,  0,
  2,  4,  6, -3,  7,  0,
  2,  5,  6, -5,  7,  0,
  2,  6,  6, -6,  7,  0,
  2,  2,  5, -3,  7,  0,
  2,  2,  5, -2,  7,  0,
  2,  2,  5, -2,  8,  0,
  2,  2,  5, -1,  7,  1,
  3,  2,  5, -2,  7,  2,  8,  0,
  1,  2,  5,  0,
  2,  3,  5, -3,  7,  0,
  2,  3,  5, -1,  7,  0,
 -1
  ];


    this.ura404 = new Plantbl(
      [0,  0,  0,  0,  5, 10,  9, 12,  0],
                               6,
                               this.uraargs,
                               this.uratabl,
                               this.uratabb,
                               this.uratabr,
                               1.9218446061800002e+01
      );

  }
}

class SwemptabNep{
  constructor(){

  this.neptabl = [
       -1376.86480,         730.38970,    78655362.50948,     1095691.38676,

        -196.19023,        2086.77782,

        -122.04650,        -276.81592,

         184.56164,        -148.08924,

           3.39142,         -14.75027,

          -9.22741,           0.87688,

          -0.13903,          -0.44707,

          -0.17668,          -0.36299,

          -0.12682,          -0.26636,

          -0.51426,          -0.24667,

          -0.04965,          -0.03177,

           0.05050,          -0.00249,

          -0.80362,          -0.07363,          -0.15436,          -0.07180,

           2.45034,          -3.50145,           0.86698,           0.09777,

           7.72386,           7.16565,           2.10273,           8.86682,

           2.44705,          77.90155,

           0.28323,         -11.87157,         -13.64083,         252.70556,

          -4.94214,          -6.17988,        -305.60504,          51.23962,
       -2759.81719,        2476.20912,

          12.65762,          13.31543,

           0.36996,          -0.19077,           0.67363,           0.36737,

           0.02312,           0.02216,

           0.09953,           0.04777,

          -0.00572,          -0.02772,

          -0.02478,          -0.21920,

          -0.15289,          -1.50784,

          -0.17822,           0.34638,          -0.70473,          -8.61559,

          -2.65756,           1.25632,

          -0.31453,          -1.40348,          -4.02571,          -1.50467,
         -69.62308,           3.21315,

           0.69973,           0.08832,

          -0.00551,          -0.04964,

          -0.02264,          -0.34881,

           0.00762,          -1.85072,

           0.01407,          -0.30457,

          -0.09851,          -0.02372,

          -0.07729,          -0.11602,          -0.75995,          -0.71884,

          -0.08585,          -0.30406,           0.45818,           0.14921,

          -0.01033,          -0.11776,

           0.00640,          -0.57717,

          -0.01014,          -0.01357,          -0.00544,          -0.02168,

           0.40468,           0.28195,           0.00668,           0.14448,

           0.01245,          -0.08956,

          -0.26283,           0.01864,          -0.00641,          18.55347,

           0.01460,           0.08284,

          -0.04785,           0.11360,

          -0.33861,           0.01327,          -0.06392,          -0.18758,

           0.05449,          -0.05583,

          -0.00435,          -0.09869,

          -0.00286,          -0.04613,

          -0.00395,          -0.14564,

          -0.01385,          -0.01762,

           0.21160,          -0.61631,          -0.52100,          -0.04583,

           0.32812,           0.32138,

           0.04749,          -0.05724,

           0.11239,           0.13216,

          -0.01203,           0.40084,          -0.05207,          34.07903,

          -0.21457,          -0.34938,          -0.04594,           0.11198,

          -0.30662,          -0.20776,          -0.01076,          -0.10959,

           0.10891,          -0.10304,

          -0.28141,           0.25061,          -0.20293,           0.79930,

  ];
  this.neptabb = [
        -391.05987,        -243.95958,         -23.83558,          58.13857,

           5.04859,          -3.93183,

         -14.21914,           7.14247,

         -12.09415,          -9.70132,

           1.04307,           0.47323,

          -0.07504,           0.70575,

          -0.05239,           0.00482,

          -0.02916,           0.00877,

          -0.00528,          -0.00286,

           0.00028,          -0.00228,

          -0.00056,          -0.00149,

           0.00049,           0.00047,

          -0.18765,          -0.59571,           0.03742,          -0.14653,

           2.30535,           0.65092,           0.42216,           0.24521,

          -2.86932,           2.37808,          -0.58456,           0.27446,

          -1.12264,          -2.04413,

         -11.71318,          -1.41554,         -23.30671,         -24.70499,

           8.82738,          85.64657,         -90.02223,          22.42604,
       -4749.41359,       -4244.46820,

          25.20811,         -18.51469,

          -1.19892,          -0.61067,           0.67734,          -1.08912,

          -0.01607,           0.00626,

          -0.00008,           0.00126,

          -0.00330,          -0.00078,

          -0.01503,           0.00758,

          -0.13208,          -0.00218,

          -0.04522,           0.20297,          -0.94708,          -0.77897,

          -2.74075,          -3.01122,

          -1.03394,           0.00886,           1.55485,          -4.68416,
          -0.13244,         -57.26983,

           0.05589,          -0.55396,

          -0.00130,           0.00526,

          -0.01028,           0.02086,

           0.01334,           0.00699,

           0.08565,           0.02020,

           0.01001,          -0.08402,

           0.08558,          -0.04488,           0.57268,          -0.59574,

           0.00807,           0.00492,           0.21993,          -0.18949,

          -0.00396,           0.00735,

           0.00487,           0.00230,

           0.00699,          -0.00473,           0.01406,          -0.00139,

           0.00738,           0.00099,           0.00161,           0.00019,

          -0.00067,          -0.00047,

           0.00572,          -0.00486,          -0.00842,           0.00322,

           0.00018,          -0.00109,

          -0.00272,           0.00112,

          -0.00041,           0.00763,           0.00211,           0.00118,

          -0.46842,          -0.17877,

           0.00209,          -0.00179,

           0.00090,          -0.00075,

           0.00618,           0.00610,

           0.00015,           0.00032,

          -0.00123,           0.00026,           0.00332,           0.00135,

           0.39130,          -0.34727,

           0.00015,          -0.00027,

          -0.00026,          -0.00052,

           0.00162,           0.00913,          -0.00697,           0.00308,

          -0.00333,          -0.00258,          -0.00117,           0.00035,

           0.00766,           0.00194,           0.00135,           0.00067,

          -0.41171,           0.24241,

           0.00106,           0.00025,           0.00013,          -0.00019,

  ];
  this.neptabr = [
        -767.68936,        -460.59576,         -52.41861,        -273.85897,

          59.52489,           1.85006,

         -39.64750,          23.63348,

         -34.60399,         -23.41681,

           2.74937,           1.55389,

           0.20343,           2.15502,

          -0.12846,           0.07199,

          -0.07555,           0.05582,

          -0.04354,           0.01546,

          -0.03931,           0.07623,

          -0.00491,           0.00661,

           0.00322,           0.01540,

          -0.06741,          -0.35343,           0.00469,          -0.08073,

           1.94975,           0.66376,           0.06137,           0.31426,

          -2.93841,           4.27732,          -4.00342,           1.11157,

         -36.87785,           1.24960,

           4.69573,           2.15164,        -114.24899,          -6.69320,

          12.99919,          -9.47795,         -21.82350,        -156.88624,
       -1237.19769,       -1379.88864,

           6.54369,          -6.20873,

          -0.14163,          -0.32700,           0.17937,          -0.34864,

           0.01393,          -0.01286,

           0.02876,          -0.05767,

           0.02210,          -0.00128,

           0.16495,          -0.01242,

           1.15915,          -0.10365,

          -0.33224,          -0.10045,           6.83719,          -0.27499,

          -0.31284,          -0.94332,

           1.63704,          -0.33318,           1.48134,          -1.32257,
           0.96498,          -8.31047,

          -0.00402,          -0.09441,

           0.04292,          -0.00444,

           0.30325,          -0.02012,

           1.67999,           0.00353,

           0.00467,           0.03556,

           0.01393,          -0.01229,

           0.01188,          -0.01390,           0.04615,          -0.03509,

           0.32423,          -0.12491,           0.13682,           0.15131,

           0.11221,          -0.01201,

           0.57239,           0.00093,

           0.02068,          -0.01162,           0.00647,          -0.00325,

           0.27010,          -0.42993,           0.14314,          -0.01353,

          -0.08757,          -0.00699,

           0.00199,           0.31873,          18.80329,           0.01681,

           0.08009,          -0.00998,

          -0.14421,          -0.15912,

           0.37208,           0.49744,           0.35144,           0.06582,

          -0.11501,          -0.14037,

           0.10352,          -0.00768,

           0.04826,          -0.00423,

           0.19850,           0.00310,

          -0.01780,           0.01350,

          -0.61106,          -0.20525,          -0.04388,           0.52143,

           0.19300,          -0.21446,

          -0.05749,          -0.04776,

           0.12877,          -0.10908,

           0.39821,           0.00627,          34.03956,           0.04392,

          -0.34455,           0.22015,           0.11743,           0.04638,

           0.20723,          -0.30447,           0.10976,          -0.01008,

          -0.20778,          -0.21822,

           0.24939,           0.27976,           0.79790,           0.20200,

  ];

  this.nepargs = [
  0,  3,
  2,  1,  7, -2,  8,  0,
  3,  3,  5, -8,  6,  3,  8,  0,
  2,  2,  7, -4,  8,  0,
  3,  1,  5, -3,  6,  3,  8,  0,
  2,  3,  7, -6,  8,  0,
  2,  4,  7, -8,  8,  0,
  3,  1,  6, -6,  7,  6,  8,  0,
  3,  1,  6, -5,  7,  4,  8,  0,
  3,  1,  6, -4,  7,  2,  8,  0,
  2,  1,  6, -3,  7,  0,
  3,  1,  6, -2,  7, -1,  8,  0,
  2,  5,  7, -9,  8,  1,
  2,  4,  7, -7,  8,  1,
  2,  3,  7, -5,  8,  1,
  2,  2,  7, -3,  8,  0,
  2,  1,  7, -1,  8,  1,
  1,  1,  8,  2,
  2,  1,  7, -3,  8,  0,
  2,  2,  7, -5,  8,  1,
  3,  1,  6, -6,  7,  5,  8,  0,
  3,  1,  6, -5,  7,  3,  8,  0,
  2,  5,  7, -8,  8,  0,
  2,  4,  7, -6,  8,  0,
  2,  3,  7, -4,  8,  0,
  2,  2,  7, -2,  8,  1,
  1,  1,  7,  0,
  1,  2,  8,  2,
  2,  1,  7, -4,  8,  0,
  2,  5,  7, -7,  8,  0,
  2,  4,  7, -5,  8,  0,
  2,  3,  7, -3,  8,  0,
  2,  2,  7, -1,  8,  0,
  2,  1,  7,  1,  8,  0,
  1,  3,  8,  1,
  2,  1,  6, -2,  8,  1,
  2,  5,  7, -6,  8,  0,
  2,  4,  7, -4,  8,  0,
  1,  4,  8,  1,
  3,  2,  5, -4,  6, -1,  8,  1,
  3,  1,  6,  1,  7, -3,  8,  0,
  2,  1,  6, -1,  8,  1,
  3,  1,  6, -1,  7,  1,  8,  0,
  3,  2,  5, -6,  6,  1,  8,  0,
  2,  5,  7, -5,  8,  1,
  1,  1,  6,  0,
  2,  6,  7, -6,  8,  0,
  2,  7,  7, -7,  8,  0,
  2,  2,  6, -2,  8,  0,
  3,  2,  5, -3,  6, -1,  8,  0,
  2,  2,  6, -1,  8,  1,
  2,  1,  5, -2,  8,  0,
  3,  3,  5, -5,  6, -1,  8,  0,
  2,  4,  7,  5,  8,  0,
  2,  1,  5, -1,  8,  1,
  3,  1,  5, -1,  7,  1,  8,  1,
  3,  1,  5, -5,  6,  1,  8,  1,
  1,  1,  5,  0,
  2,  2,  5, -1,  8,  1,
 -1
  ];

    this.nep404 = new Plantbl(
      [0,  0,  0,  0,  3,  8,  7,  9,  0],
                               3,
                               this.nepargs,
                               this.neptabl,
                               this.neptabb,
                               this.neptabr,
                               3.0110386869399999e+01
      );

  }
}

class SwemptabPlu{
  constructor(){

  this.plutabl = [
    74986469.33577,   100898343.73690,    48199471.54076,     9520076.03177,
      690431.67340,     -427355.12716,    52266623.77862,      860190.70714,

         -21.08511,        -143.39295,

        -126.71124,          48.18528,

         -88.74508,          40.50942,

          51.29367,         -10.24075,

           0.63094,          32.03258,

        -410.00781,         399.90234,        -116.54319,          51.50329,

         116.84565,         687.76781,         -13.38605,         182.70107,

       -1668.12226,       -5162.22648,        -585.68297,       -2247.56041,
         -20.95875,        -193.13703,

         -57.12097,         -10.35058,

       -1778.01442,       -6463.73779,        -657.86093,       -2713.44436,
         -41.32560,        -211.82042,

        -107.16513,         -36.58628,

    97929588.08231,   -33582903.63417,   143382679.31770,   -47411568.92345,
    79428827.73581,   -24658834.87499,    19861233.17488,    -5755585.62084,
     1995060.95931,     -693507.08147,      135176.31467,      109360.38672,
       -8188.00598,       -1680.95072,       71020.19608,      -70785.39049,

         -24.56034,         -20.34919,

        1618.45976,       -2079.48538,         635.62954,        -850.87068,
          44.95257,         -64.04459,

         -18.61475,          -1.77734,

           9.38079,           5.19958,

       17422.08783,       -4872.53852,       10985.76629,       -1137.68569,
        1771.28893,         288.93745,          40.22664,          37.90027,

           6.81361,         -32.65868,

          16.97268,          11.76152,

          29.33024,         -12.92289,

         -55.13187,         -14.73791,

           7.52474,        -102.05060,

         182.53144,         -20.18960,

  -490237997.49400,   486646248.63360,  -781277018.26430,   602300460.57290,
  -463787999.46420,   249529525.96100,  -123964746.86420,    31353019.97807,
   -13353800.92159,    -3463382.63269,      -35469.17654,    -1035343.45385,
       65076.64025,      -38181.61312,      -16473.33813,        3928.44674,

         188.60263,        1000.42530,

     -208376.39376,     -700566.62363,      114839.84613,     -342407.71113,
       39467.04812,      -14553.84849,

      581895.26100,     1012499.16715,      406317.22416,      310804.78515,
       43625.07033,       -4157.26545,

       -5930.13795,       -2070.62413,

        3348.17582,      -10871.23729,

      144609.18550,       60383.63650,       27912.02226,       15254.61228,

      -98561.37758,      -67442.28158,      -15573.63338,      -19931.99773,

       24323.06905,      -37473.32558,        2840.64042,       -8911.23694,

      -19636.31898,       71725.21946,      -12280.54554,       12251.00101,

       88626.52260,        5513.68450,       18506.41546,       -6513.87434,

      -83350.14621,       44300.00743,      -22075.37353,        3731.57531,

      -29167.76020,      -21642.67384,

    56602666.72177,   -22225578.01823,    50576897.80669,   -50319847.79086,
     5689259.25622,   -29585299.79697,    -4249711.27661,    -4490830.29568,
     -727678.08724,      366050.85631,       19183.62792,       55647.98226,

        1897.78091,       -1091.03988,         432.38158,        -138.62556,

         101.38743,          25.67379,

         320.20735,         362.16615,          85.06067,          54.02616,

           2.39460,          18.70004,

          -8.43353,           2.72100,

          -3.11205,          -3.06201,

         136.31503,         -28.33620,          48.68781,         -18.45285,
           1.15302,          -1.52360,

          -0.13706,          -0.37489,

           0.08750,          -0.14579,

          -0.07051,          -0.06518,

           0.30237,          -0.00448,

           4.83172,           6.83684,

     1752447.78043,     -945086.75857,     2340978.12819,    -1963675.42559,
     1254147.25257,    -1274861.91191,      279459.60237,     -263954.01378,
       11835.62290,      -16344.44434,        9119.98960,       -2390.44218,
         -23.67909,          86.73916,        -642.78635,       -1290.12208,

          -0.43345,          -1.85348,

           0.03094,          -0.01655,

           0.12380,           0.31834,

           5.54756,          -1.63109,           1.10598,          -0.17578,

           2.66994,          -2.17573,           0.97360,          -0.92226,

          -0.18533,          -0.39747,

           0.45809,          -0.65286,

           0.26129,           0.91922,

           0.81068,           0.11183,

           6.32182,          14.16786,           0.20872,           3.28489,

          -1.47458,          -2.11724,

           1.70020,          -1.99889,

           3.13003,           1.90638,

    -4483669.52795,     -446454.90158,    -6586256.67478,     -671890.16779,
    -3620444.55554,     -499672.41074,     -855998.32655,     -191073.94266,
      -73186.69110,      -22649.38582,       -2414.81729,       -1294.40542,
         436.80907,         125.48109,         -81.16877,         458.86508,

         -11.57414,         -26.39114,          -4.00801,          -5.01054,

         -18.17569,          20.86879,          -4.80965,           3.10535,

          -4.71122,           1.18169,

          74.75544,         649.21464,         -26.55060,         272.35592,
          -8.06982,          16.86110,

         -26.54868,          26.75711,

         -35.82910,          38.51063,

          22.22814,          19.38336,

          -6.30462,           0.90602,

           0.62856,          -0.34981,

          -0.10232,          -0.00939,

           0.04439,          -0.18875,

           0.16025,           0.11306,

          -0.06803,           0.06004,

      -91305.66728,      262370.61704,     -194633.44577,      304838.17733,
     -124505.90904,       94111.75602,      -22317.18255,        1575.23438,
         748.66316,        -349.78711,         166.64450,         -89.05045,
         120.76207,        -100.26715,

           3.13806,           3.71747,

          -1.44731,          -0.35235,

          -0.51660,          -1.50621,

           2.81310,          -3.93573,           1.20292,          -0.36412,

          -0.03340,          -0.00561,

          -5.29764,          26.02941,           1.91382,           3.30686,
          -3.35265,          -3.20868,

           0.05807,          -0.11885,

          -0.78588,           0.34807,          -0.19038,           0.11295,

          -0.03642,          -0.03794,

           0.00251,           0.03449,

          -0.08426,          -0.00310,

           0.05297,          -0.09278,

           0.10941,           0.00099,

     -228688.56632,      312567.73069,     -331458.31119,      328200.19460,
     -143760.57524,      104182.01134,      -17313.30132,       12591.15513,
        -440.32735,        -105.67674,         104.35854,        -852.84590,
           0.95527,           0.30212,         -54.63983,           4.06948,

           0.07545,          -0.13429,

          16.21005,          29.24658,           9.23410,          50.48867,
          30.55641,          12.76809,           0.11781,           0.70929,
          -0.04100,          13.60859,

           0.04976,          -0.02083,

           0.36279,           0.30130,          -0.02129,           0.09363,

          -0.07812,           0.01570,

          -0.06217,          -0.37181,

      -29348.55031,       43889.87672,      -35765.41577,       33855.90070,
      -10128.69894,        4535.32148,         281.75353,        -218.49194,
          -7.55224,         134.28640,           2.11319,          -2.13109,
          15.71244,          11.07183,

          -0.05406,          -0.23337,

          -1.28949,           1.34281,

           0.04212,          -0.02080,

           0.08109,           0.14820,

       -6010.46564,        3639.41780,       -5973.16000,        1381.66999,
       -1177.36865,        -501.06937,         166.14792,        -103.36431,
          14.92766,           4.12877,          -2.20893,          -6.32033,

          -0.29038,          -0.43172,

          -0.59341,           0.20477,          -0.13143,          -0.03150,

           0.10992,           0.01976,

          -0.00254,           0.02028,

          -0.30044,          -0.44658,          -0.03409,          -0.10758,

           0.08349,           0.06153,

          -0.06055,           0.18249,

          -1.15341,          -8.68699,          -0.11348,          -3.30688,

           1.08604,           1.04018,

          -0.46892,          -0.69765,           0.21504,           0.01968,

          -0.00455,          -0.01678,

           3.95643,          -3.17191,           3.95220,          -2.12670,
           0.99305,          -0.16651,

           0.34839,          -0.49162,

           0.85744,           0.20173,          -0.00975,           0.20225,

          -0.02627,          -0.02281,

          -0.18002,          -0.01803,

          -0.06144,          -0.21510,

           0.15935,          -0.01251,

          -0.21378,           0.44806,          -0.01174,           0.05779,

           0.07646,          -0.19656,          -0.04044,          -0.02521,

           0.02996,           0.06169,

           0.16698,          -0.04710,          -0.06506,          -0.02114,

           0.05500,           0.00276,

           0.08433,           0.03160,

           0.08193,           0.35773,           0.05454,           0.10718,

          -0.02823,          -0.00839,

           0.54078,           0.49347,           0.09609,           0.11825,

          -0.16092,          -0.11897,

           0.09059,           0.08254,

           0.16712,           0.05860,

          -0.09547,          -0.03206,

           0.03876,           0.04719,

          -0.02345,           0.02240,

          -0.00609,          -0.00649,

           0.03859,           0.00077,

           0.47819,           0.26196,           0.09780,           0.08104,

          -0.16919,           0.05042,

          -0.42652,           0.30810,

          -0.03409,          -0.51452,

          -0.23120,          -0.01380,

          -0.01157,          -0.00143,

          -0.00512,          -0.01628,

          -0.00189,           0.00183,

          -0.01427,          -0.02861,

           0.00618,          -0.00015,

           0.13087,           0.13870,

           0.15158,          -0.21056,

          -3.94829,          -1.06028,          -1.36602,           0.77954,

           0.08709,          -0.03118,

         -44.74949,          91.17393,           8.78173,          45.84010,
           1.97560,         -15.02849,          -0.10755,          -0.02884,
           3.38670,           0.30615,

         130.92778,         -24.33209,          43.01636,         -40.81327,
         -19.43900,          22.18162,          -0.12691,           0.33795,
          -6.44790,          -6.23145,

           0.00319,           0.01141,

          -0.03252,           0.03872,

           0.04467,           0.01614,

          -0.00382,          -0.00019,

           0.05955,           0.01533,

          16.11371,          41.37565,          61.44963,           6.90615,
           1.41326,          -0.73920,          -0.03871,          24.81978,

          -0.10229,          -0.32775,          -0.05188,          -0.05628,

          -2.33618,           2.39053,

          -0.00584,           0.00436,

           0.20903,           0.02220,

          -0.01738,          -0.02765,

          -0.00217,           0.00613,

          -0.01772,           0.01903,

           0.07075,          -0.00530,

           0.15234,          -0.37760,          -0.11641,          -0.20102,

          -0.63675,           0.20525,          -0.15783,           0.58945,

          -0.06243,           0.04306,

  ];
  this.plutabb = [
   -35042727.30412,   -49049197.81293,   -25374963.60995,    -5761406.03035,
     -467370.57540,       14040.11453,        2329.15763,      -13978.69390,

          45.43441,          29.70305,

          32.33772,         -38.34012,

          26.43575,         -28.76136,

         -18.59040,          12.64837,

           5.56569,         -12.51581,

         248.37350,         -64.44466,          54.02618,           4.39466,

        -269.35114,        -290.63134,         -48.03841,         -52.83576,

        1508.94995,        1682.78967,         554.02336,         715.65819,
          34.37602,          58.44397,

          16.63685,          16.10176,

       -1069.51609,        2300.89166,        -437.16796,         927.89245,
         -33.17679,          68.74495,

          18.72022,          32.97640,

   -34004958.12619,   -17758805.77098,   -48416073.75788,   -24973405.03542,
   -25374996.23732,   -13351084.97340,    -5738294.54942,    -3082092.63350,
     -519989.39256,     -206440.89101,       44186.23548,      -87639.22630,
        2506.47602,        2327.01164,      -53878.47903,      -19670.13471,

           2.66934,          -3.86086,

         106.32427,         576.47944,          46.56388,         218.28339,
           4.35402,          15.04642,

           2.68717,          -2.86835,

           0.81728,          -2.34417,

       -1604.85823,       -1999.24986,        -631.47343,       -1382.19156,
         -15.74075,        -256.97077,           6.99648,          -4.54257,

           2.63478,           1.88838,

           0.17628,          -2.11518,

          -2.46735,          -1.48743,

           1.83456,           4.68487,

          -7.10919,           3.57046,

          -5.36342,          -7.70367,

    28395956.20816,   -37176795.74372,    48969952.83034,   -48145798.96248,
    31155823.23557,   -21163596.14822,     9057634.38260,    -3167688.51696,
     1167488.70078,      219103.97591,      -19017.97335,      107849.61195,
       -3814.43474,        4405.92120,        5800.13959,       12619.88708,

          22.18168,         -89.47801,

       52202.81929,       55119.44083,        5082.58907,       37955.06062,
       -3165.24355,        3316.67588,

     -113906.43970,      -69279.41495,      -57358.07767,      -10176.17329,
       -4179.79867,        2495.99374,

         787.87180,        -154.35591,

       -1148.62509,        1034.58199,

      -22194.95235,        3341.97949,       -4578.53994,         108.30832,

        7444.39789,       16646.40725,         509.75430,        3808.92686,

        -179.85869,        7408.76716,         340.65366,        1504.64227,

       -3783.09873,      -13505.60867,         875.74489,       -3181.27898,

      -16220.93983,        8041.37347,       -2631.07448,        2899.50781,

       18894.92095,      -20072.81471,        5925.05701,       -1947.91902,

       -6731.56601,        8014.52403,

     -987793.49463,     6491762.34471,     -279205.73643,     6117135.96868,
     -140925.91402,     2259422.06929,      114028.61646,      605600.90358,
       91858.00186,       56506.65187,        8949.15777,       -9782.67413,

        -394.66541,        -105.19208,         -76.54752,         -32.59411,

         -19.28741,          10.40013,

        -107.64003,          -7.36229,         -22.25126,           4.05952,

          -3.74402,          -2.79308,

           1.03337,          -2.13968,

           1.53794,          -0.02617,

          35.70756,          12.97733,          14.46213,           6.20518,
           1.79381,           1.65422,

          -0.31216,           0.29053,

          -0.03538,          -0.01584,

          -0.08934,           0.00079,

           0.05539,          -0.21591,

           2.86929,          -2.24724,

      320797.07455,       93342.16556,      -20903.39115,       79523.22083,
     -226588.37473,     -121017.23944,      -48472.25935,      -74195.36778,
       -7962.48081,       -4607.76339,       -4597.33274,       -7983.12541,
         -20.34500,          56.82999,       -1038.19507,         619.69624,

           1.08907,          -0.91278,

          -0.13391,           0.34956,

          -0.19982,          -0.18296,

          -0.97688,           2.36806,          -0.30127,           0.50980,

           0.96103,           1.96432,           0.43338,           0.87317,

           0.36997,          -0.01583,

          -0.44692,          -0.25159,

          -0.53525,           0.01154,

          -0.13231,           0.35562,

           3.88928,          -4.02882,           1.06967,          -0.56305,

          -0.45204,           0.77213,

          -0.82873,          -0.25854,

           0.21136,          -1.06696,

      458529.05491,      616790.47568,      698431.01349,     1124501.41713,
      300226.10339,      766533.33698,       26896.22954,      207880.75720,
        1116.29607,       21793.26153,        -850.64044,        3528.95568,
          29.61278,        -120.13367,         376.95131,          66.45758,

          -3.64868,           2.76062,          -0.85352,           0.95115,

           5.35056,           2.52803,           0.90026,           0.76403,

           0.43191,           0.83605,

         125.81792,         -39.65364,          50.14425,          -5.75891,
           2.78555,           2.05055,

          -4.27266,          -4.92428,

           6.78868,           5.73537,

           3.35229,          -3.70143,

           0.08488,           1.07465,

           0.10227,           0.06074,

           0.00291,           0.01522,

          -0.02274,           0.00297,

           0.01095,          -0.01856,

          -0.02862,           0.00178,

      143640.07486,         707.21331,      177163.08586,       53386.52697,
       56856.89297,       48268.74645,        1764.52814,        7711.76224,
         352.34159,        -968.03169,         -45.16568,         -81.60481,
         -76.35993,         -98.06932,

          -1.42185,           1.81425,

          -0.23427,           0.59023,

           0.57127,          -0.36335,

           1.89975,           0.66890,           0.28797,           0.43592,

          -0.03769,           0.03273,

          -6.06571,          -2.68515,          -0.55315,           0.86977,
           1.53840,          -0.59422,

          -0.05453,           0.02447,

          -0.12658,           0.22814,          -0.01715,           0.08497,

          -0.01288,          -0.00606,

           0.01547,          -0.00692,

           0.01157,           0.02407,

          -0.03883,           0.00835,

          -0.01542,          -0.04761,

      174386.39024,      158048.26273,      159192.81681,      220154.55148,
       33716.11953,       87537.86597,        -116.90381,        7535.83928,
        -962.06994,        -132.28837,        -644.90482,        -110.52332,
           3.42499,           3.74660,          -0.94008,          41.55548,

          -0.03824,          -0.05607,

          28.74787,         -37.31399,          30.87853,         -26.11940,
          10.79742,          -5.97905,           1.01237,          -0.04429,
           0.54402,           0.41905,

          -0.02440,          -0.03991,

          -0.00347,          -0.04362,          -0.00347,          -0.00469,

          -0.02707,           0.02761,

          -0.17773,          -0.11789,

       26475.02580,       35363.04345,       19877.11475,       41430.35940,
        2948.09998,       12983.41406,         281.93744,         570.70054,
         147.83157,          16.00090,          -1.62814,          -8.30846,
           9.29131,         -10.16496,

          -0.15799,           0.03843,

           1.44716,           0.46953,

          -0.02150,          -0.02502,

           0.08861,          -0.06690,

        2237.41551,        3739.08722,         753.74867,        3460.41553,
        -298.69226,         520.47031,         -33.62615,        -138.12767,
           3.61843,          -8.29860,          -4.56656,           0.79553,

           0.20041,          -0.25771,

          -0.35233,          -0.27913,          -0.02799,          -0.08328,

          -0.06889,          -0.16853,

           0.01701,          -0.00964,

          -0.37737,           0.18030,          -0.08525,           0.01906,

           0.05236,          -0.05155,

           0.11320,           0.05991,

          -5.66926,          -0.54402,          -2.08508,          -0.39407,

           0.82155,          -0.55975,

           0.39168,          -0.25551,           0.00623,           0.16162,

          -0.02519,           0.02420,

          -1.23293,          -3.19649,          -0.60519,          -2.79729,
           0.05362,          -0.61569,

          -0.25638,          -0.27033,

          -0.03987,           0.46623,          -0.12070,           0.00643,

           0.00849,          -0.00768,

          -0.03687,           0.10445,

          -0.13544,          -0.00592,

           0.02078,           0.09172,

           0.15824,           0.15815,           0.02020,           0.00747,

           0.10919,           0.09553,           0.01953,          -0.00135,

           0.04266,          -0.00218,

           0.02182,          -0.13742,          -0.01249,           0.01724,

          -0.02200,           0.02975,

          -0.01401,           0.03416,

          -0.28873,           0.04235,          -0.08137,           0.04223,

          -0.00326,           0.02144,

          -0.40423,           0.14281,          -0.08256,           0.02142,

           0.08116,          -0.03680,

          -0.02324,           0.07260,

          -0.06746,           0.11645,

           0.03233,          -0.05997,

          -0.03101,           0.02197,

          -0.00896,          -0.00491,

           0.00574,           0.00855,

           0.00052,           0.01209,

          -0.31828,           0.29955,          -0.08133,           0.04318,

           0.06787,          -0.08865,

          -0.13228,          -0.06507,

           0.34008,           0.06417,

          -0.00177,          -0.15116,

          -0.00553,          -0.01950,

           0.01144,          -0.00309,

          -0.00115,          -0.00153,

           0.02063,          -0.00791,

          -0.00314,           0.00493,

          -0.10614,           0.08338,

           0.08845,           0.20168,

           1.38955,          -2.52285,          -0.30475,          -1.05787,

           0.00580,           0.06623,

         -44.33263,         -47.70073,         -29.80583,          -8.77838,
           7.02948,           2.77221,           0.05248,          -0.13702,
          -0.78176,           1.77489,

         -16.32831,          46.68457,           2.54516,          21.78145,
          -5.09080,          -8.42611,          -0.24419,          -0.03315,
           2.80629,          -1.12755,

          -0.00402,           0.00053,

           0.00024,          -0.00043,

           0.00403,          -0.00210,

           0.00603,           0.00411,

          -0.00260,           0.00416,

           2.29235,           3.05992,           2.36465,          -0.58750,
           0.14030,           0.13523,           0.89998,           0.70156,

          -0.02188,           0.02003,          -0.00533,           0.00447,

           2.96411,           1.30183,

           0.01422,           0.00624,

          -0.10737,          -0.38316,

          -0.05968,           0.04379,

           0.01171,           0.01180,

          -0.00989,          -0.01375,

          -0.00845,           0.03782,

           0.09484,           0.09909,           0.07640,          -0.00898,

          -0.01076,           0.02760,           0.01630,           0.02198,

           0.05985,           0.04130,

  ];
  this.plutabr = [
    17990649.12487,    24806479.30874,    12690953.00645,     2892671.69562,
      249947.71316,       -5138.71425,        1142.68629,        6075.25751,

         -34.76785,         -19.72399,

         -15.81516,          30.47718,

         -11.73638,          21.87955,

           9.42107,         -10.40957,

          -5.59670,           6.85778,

        -167.06735,          -2.31999,         -32.42575,         -13.72714,

         130.16635,         117.97555,          31.33915,          39.64331,

       -1378.54934,        -395.83244,        -562.79856,        -167.74359,
         -45.12476,         -17.08986,

          -4.20576,         -16.56724,

        1762.12089,       -1148.86987,         736.55320,        -423.09108,
          56.13621,         -26.26674,

           9.77810,         -38.05151,

     4702224.98754,    27254904.94363,     5306232.25993,    39518429.29982,
     1725110.05669,    21833263.27069,       46010.62605,     5425411.66252,
       17238.09865,      536771.62156,      -61263.36051,       66270.70142,
        2084.66296,       -1936.71208,       35898.49503,       34885.28549,

           1.93276,          10.66292,

        -665.11445,           3.70467,        -265.68478,          16.16272,
         -19.45954,           2.32738,

           3.04237,           3.97339,

          -2.64312,           0.66308,

       -3207.68754,        3418.03720,       -2342.62310,        1729.15030,
        -450.84643,         179.00943,         -13.20367,          -1.86087,

          -4.95659,           7.22347,

          -5.08890,          -1.28891,

          -6.21713,           5.10551,

          13.97276,           0.44529,

           3.25177,          25.02775,

         -45.56672,          11.58470,

   124443355.55450,  -100018293.41775,   190506421.77863,  -118262753.40162,
   108199328.45091,   -45247957.63323,    27272084.41143,    -4125106.01144,
     2583469.66051,     1024678.12935,      -22702.55109,      199269.51481,
      -15783.14789,        5564.52481,        -427.22231,       -6330.86079,

         -97.50757,        -204.32241,

       -9060.54822,      156661.77631,      -47791.83678,       59725.58975,
       -8807.74881,         -92.38886,

      -28886.11572,     -244419.59744,      -53336.36915,      -92232.16479,
       -8724.89354,       -2446.76739,

         889.71335,         936.51108,

         494.80305,        2252.83602,

      -18326.60823,      -25443.13554,       -3130.86382,       -5426.29135,

       23494.08846,          91.28882,        4664.14726,        1552.06143,

       -8090.43357,        2843.48366,       -1445.73506,        1023.11482,

       11664.20863,       -7020.08612,        3100.21504,         -64.16577,

       -9724.97938,      -12261.47155,       -3008.08276,       -1523.06301,

        6788.74046,       10708.27853,         343.09434,        1701.52760,

       14743.99857,       -4781.96586,

   -15922236.41469,     1825172.51825,   -14006084.36972,    10363332.64447,
     -979550.91360,     6542446.18797,     1160614.26915,      570804.88172,
       89912.68112,     -171247.08757,      -13899.52899,       -6182.25841,

        -240.64725,         412.42581,         -66.24510,          71.30726,

         -15.81125,         -15.76899,

         -21.85515,        -102.12717,         -10.18287,         -19.38527,

           1.43749,          -3.87533,

           1.97109,           0.20138,

           0.32012,           1.02928,

         -40.22077,          20.80684,         -15.69766,           9.63663,
          -1.26010,           0.56197,

           0.08592,           0.18540,

          -0.07303,           0.03897,

           0.01438,          -0.08809,

           0.15479,           0.10354,

           0.19052,           2.08790,

      405480.24475,     -607986.83623,      582811.58843,     -915111.10396,
      258696.21023,     -493391.09443,       23403.62628,     -119503.67282,
       -4036.86957,       -9766.17805,        -663.93268,        2544.07799,
          40.36638,          76.26390,         246.67716,         -13.93440,

           0.12403,           0.25378,

           0.14004,          -0.08501,

           0.07904,           0.12731,

           1.02117,          -1.34663,           0.25142,          -0.26903,

           0.18135,          -0.57683,          -0.30092,          -0.36121,

          -0.09623,           0.05873,

          -0.05803,           0.02869,

          -0.01194,           0.04983,

           0.04250,           0.04894,

           1.34245,           0.70137,           0.24217,           0.25912,

          -0.32759,          -0.03575,

           0.06780,          -0.41277,

           0.43865,           0.17857,

     -763933.02226,      465658.17048,    -1082753.91241,      593319.68634,
     -553911.89340,      274748.95145,     -122250.71547,       56608.95768,
       -9914.17300,        2988.43709,         707.94605,        -765.01470,
          52.73260,         -34.22263,         -43.58300,         -38.43647,

          -4.95939,          -1.97173,          -1.04406,          -0.13072,

          -0.34281,           4.75202,          -0.35513,           0.93597,

          -0.54380,           0.70536,

          84.83116,         102.93003,          26.34884,          48.57746,
           0.02853,           2.91676,

          -8.07116,           1.66613,

          -2.07908,          11.62592,

           6.64704,           0.98291,

          -1.19192,           0.93791,

           0.18822,           0.00900,

          -0.03181,          -0.02000,

           0.02755,          -0.01398,

          -0.03971,          -0.03756,

           0.13454,          -0.04193,

      -18672.98484,       28230.75834,      -28371.58823,       26448.45214,
      -13352.09393,        7461.71279,       -2609.33578,         726.50321,
        -309.72942,         -86.71982,          12.48589,          -9.69726,
           1.82185,          14.92220,

          -0.04748,           0.42510,

          -0.20047,           0.00154,

           0.00176,          -0.26262,

           0.78218,          -0.73243,           0.23694,          -0.03132,

          -0.00290,          -0.03678,

          14.03094,           4.25948,           0.79368,          -0.78489,
          -2.30962,           2.31946,

           0.00158,          -0.04125,

          -0.01387,           0.28503,           0.00892,           0.05154,

           0.00184,          -0.01727,

          -0.00889,           0.03526,

          -0.00521,          -0.02093,

           0.00200,           0.04872,

          -0.02163,           0.00578,

       20699.27413,       -2175.57827,       31177.33085,        4572.02063,
       15486.28190,        8747.74091,        2455.51737,        3839.83609,
          51.31433,         507.91086,          15.90082,          44.75942,
          -0.98374,          -2.64477,           2.52336,          -3.09203,

          -0.08897,          -0.00083,

         -15.91892,           0.72597,          14.04523,          -3.16525,
           4.33379,         -30.82980,           0.40462,          -0.75845,
          13.14831,          -0.02721,

          -0.01779,           0.00481,

           0.42365,          -0.09048,           0.08653,           0.04391,

           0.00846,           0.01082,

          -0.04736,           0.02308,

        6282.21778,       -4952.70286,        7886.57505,       -5328.36122,
        3113.76826,       -1696.84590,         330.70011,        -155.51989,
         -18.31559,          -3.90798,          -3.11242,           1.87818,
          -1.05578,           0.11198,

           0.05077,          -0.01571,

           2.41291,           2.40568,

          -0.01136,          -0.00076,

          -0.00392,          -0.02774,

         634.85065,        -352.21937,         674.31665,        -260.73473,
         199.16422,         -28.44198,           6.54187,           6.44960,
          -1.55155,           0.29755,           0.16977,           0.17540,

          -0.02652,           0.03726,

          -0.00623,           0.11777,          -0.00933,           0.02602,

          -0.13943,          -0.24818,

           0.02876,          -0.01463,

          -0.07166,           0.06747,          -0.01578,           0.01628,

           0.00233,          -0.00686,

           0.00431,          -0.00276,

           0.21774,           0.09735,           0.07894,           0.07279,

          -0.01300,          -0.00268,

           0.10824,           0.09435,           0.00720,           0.02111,

          -0.01960,           0.06154,

           0.56867,          -0.07544,           0.18210,           0.06343,
          -0.00906,           0.01942,

          -0.00850,          -0.00351,

          -0.06988,           0.01713,          -0.01110,          -0.00663,

           0.00196,          -0.02064,

          -0.00008,           0.00043,

           0.00375,           0.00084,

          -0.00279,           0.00100,

           0.00271,          -0.02017,          -0.00074,          -0.00357,

           0.03793,          -0.10108,          -0.01083,          -0.03952,

           0.00030,           0.00012,

           0.01576,           0.01142,           0.00351,           0.00277,

           0.01409,          -0.00774,

          -0.00065,           0.01895,

           0.07350,          -0.02519,           0.01528,          -0.01057,

          -0.00099,          -0.00295,

           0.21347,          -0.17458,           0.04940,          -0.02757,

          -0.06243,           0.05203,

           0.01055,          -0.00109,

           0.00003,          -0.04201,

          -0.00263,           0.02387,

           0.00886,          -0.01168,

           0.00479,           0.00204,

          -0.00239,           0.00022,

          -0.00223,          -0.02029,

          -0.14130,          -0.15237,          -0.01827,          -0.04877,

           0.12104,           0.06796,

           0.16379,           0.31892,

          -0.15605,           0.07048,

          -0.00700,           0.07481,

          -0.00370,          -0.00142,

          -0.00446,           0.00329,

          -0.00018,           0.00117,

          -0.00910,           0.00510,

          -0.00055,          -0.00114,

           0.04131,          -0.04013,

          -0.13238,           0.02680,

          -0.10369,           1.38709,           0.35515,           0.41437,

          -0.01327,          -0.02692,

          38.02603,          13.38166,          15.33389,          -7.40145,
          -8.55293,          -0.13185,          -0.03316,           0.13016,
           0.04428,          -1.60953,

         -12.87829,         -76.97922,         -23.96039,         -22.45636,
          14.83309,          14.09854,           0.24252,           0.13850,
          -4.16582,           4.08846,

           0.00751,          -0.00051,

           0.03456,           0.02900,

           0.01625,          -0.04660,

           0.01390,          -0.00530,

           0.01665,          -0.04571,

          40.90768,         -14.11641,           7.46071,         -58.07356,
          -0.27859,          -1.33816,          23.76074,          -0.03124,

          -0.27860,           0.13654,          -0.04800,           0.05375,

           4.38091,           4.39337,

           0.02233,           0.00514,

          -0.25616,          -0.54439,

          -0.05155,           0.11553,

           0.02944,          -0.00818,

           0.00570,           0.00119,

          -0.00733,          -0.02700,

          -0.23759,          -0.08712,          -0.12433,           0.07397,

           0.20629,           0.60251,           0.56512,           0.14790,

           0.07778,           0.11614,

  ];

  this.pluargs = [
  0,  7,
  2,  3,  7, -9,  9,  0,
  2,  4,  7,-12,  9,  0,
  2,  4,  7, -8,  8,  0,
  3, -4,  7,  5,  8,  4,  9,  0,
  3,  3,  7, -5,  8, -1,  9,  0,
  2,  1,  6, -8,  9,  1,
  2,  3,  8, -5,  9,  1,
  2,  1,  6, -9,  9,  2,
  3,  6,  7, -6,  8, -8,  9,  0,
  3,  4,  7,-10,  8,  4,  9,  2,
  2,  3,  7, -8,  9,  0,
  1,  1,  9,  7,
  2,  3,  7,-10,  9,  0,
  3,  4,  7,-10,  8,  2,  9,  2,
  3,  5,  7,-12,  8,  2,  9,  0,
  2,  1,  6, -7,  9,  0,
  1,  1,  8,  3,
  2,  1,  6,-10,  9,  0,
  3,  6,  7,-12,  8,  2,  9,  0,
  3,  5,  7,-10,  8,  2,  9,  0,
  2,  5,  7,-13,  9,  0,
  2,  4,  7,-10,  9,  0,
  2,  3,  7, -7,  9,  0,
  1,  2,  9,  7,
  2,  3,  7,-11,  9,  0,
  3,  4,  7, -9,  8,  4,  9,  2,
  3,  3,  7, -5,  8,  1,  9,  2,
  2,  1,  6, -6,  9,  0,
  2,  7,  8,-13,  9,  0,
  2,  3,  8, -2,  9,  1,
  3,  1,  7, -5,  8,  2,  9,  1,
  3,  6,  7,-12,  8,  3,  9,  1,
  2,  5,  7,-12,  9,  1,
  2,  4,  7, -9,  9,  1,
  2,  2,  7, -3,  9,  1,
  1,  1,  7,  0,
  1,  3,  9,  5,
  2,  3,  7,-12,  9,  1,
  3,  5,  7, -9,  8,  2,  9,  0,
  3,  4,  7, -7,  8,  2,  9,  1,
  3,  3,  7, -5,  8,  2,  9,  0,
  3,  2,  7, -5,  8,  5,  9,  0,
  2,  1,  6, -5,  9,  0,
  2,  3,  8, -1,  9,  2,
  2,  1,  6,-12,  9,  0,
  3,  2,  7, -7,  8,  1,  9,  0,
  2,  5,  7,-11,  9,  0,
  2,  4,  7, -8,  9,  0,
  2,  2,  7, -2,  9,  0,
  1,  4,  9,  7,
  3,  2,  7, -8,  8,  2,  9,  0,
  3,  5,  7, -9,  8,  3,  9,  0,
  3,  4,  7, -9,  8,  6,  9,  0,
  3,  3,  7, -5,  8,  3,  9,  1,
  2,  2,  7, -1,  8,  1,
  2,  3,  8, -9,  9,  0,
  2,  9,  8, -9,  9,  0,
  2,  1,  6,-13,  9,  0,
  3,  2,  7, -5,  8, -3,  9,  0,
  2,  6,  7,-13,  9,  1,
  2,  5,  7,-10,  9,  0,
  2,  4,  7, -7,  9,  0,
  2,  3,  7, -4,  9,  0,
  1,  5,  9,  7,
  3,  6,  7, -9,  8,  1,  9,  1,
  3,  4,  7, -5,  8,  1,  9,  1,
  3,  3,  7, -3,  8,  1,  9,  0,
  2,  1,  6, -3,  9,  2,
  2,  3,  8,-10,  9,  0,
  2,  1,  8,  4,  9,  0,
  2,  5,  8, -2,  9,  0,
  2, 11,  8,-11,  9,  0,
  3,  1,  7, -9,  8,  5,  9,  0,
  2,  6,  7,-12,  9,  0,
  2,  5,  7, -9,  9,  0,
  2,  4,  7, -6,  9,  0,
  2,  3,  7, -3,  9,  0,
  1,  6,  9,  6,
  2,  2,  7,-12,  9,  0,
  3,  6,  7, -9,  8,  2,  9,  0,
  3,  3,  7,-12,  8,  3,  9,  0,
  3,  4,  7,-10,  8, -3,  9,  1,
  3,  3,  7, -3,  8,  2,  9,  0,
  2,  1,  6, -2,  9,  2,
  2,  1,  8,  5,  9,  0,
  2, 13,  8,-13,  9,  1,
  3,  2,  7, -9,  8,  1,  9,  0,
  2,  6,  7,-11,  9,  0,
  2,  5,  7, -8,  9,  0,
  2,  4,  7, -5,  9,  0,
  2,  3,  7, -2,  9,  0,
  1,  7,  9,  7,
  3,  6,  7, -9,  8,  3,  9,  0,
  2,  1,  6, -1,  9,  4,
  2,  3,  8,  3,  9,  0,
  2,  7,  7,-13,  9,  1,
  2,  3,  7, -1,  9,  0,
  2,  2,  7,  2,  9,  0,
  1,  8,  9,  6,
  3,  7,  7, -9,  8,  1,  9,  0,
  1,  1,  6,  0,
  1,  3,  7,  0,
  2,  2,  7,  3,  9,  0,
  1,  9,  9,  5,
  3,  1,  7,-10,  8,  3,  9,  0,
  3,  2,  7,-12,  8,  3,  9,  1,
  2,  1,  6,  1,  9,  0,
  3,  1,  7, -1,  8,  8,  9,  0,
  2,  3,  7,  1,  9,  1,
  2,  2,  7,  4,  9,  0,
  2,  1,  7,  7,  9,  0,
  2,  4,  8,  4,  9,  1,
  2, 12,  8, -8,  9,  0,
  3,  1,  7,-10,  8,  2,  9,  1,
  2,  1,  6,  2,  9,  0,
  1, 11,  9,  2,
  2, 12,  8, -7,  9,  0,
  3,  1,  7,-10,  8,  1,  9,  1,
  1,  4,  7,  0,
  1, 12,  9,  0,
  2,  6,  8,  3,  9,  0,
  3,  1,  7, -2,  8,-12,  9,  0,
  3,  7,  7, -7,  8,  2,  9,  1,
  2,  2,  6, -4,  9,  1,
  1, 13,  9,  0,
  2, 10,  8, -2,  9,  1,
  2,  4,  7,  2,  9,  0,
  2,  2,  6, -3,  9,  0,
  2,  2,  7,  8,  9,  1,
  2,  8,  8,  2,  9,  0,
  1,  5,  7,  1,
  2,  4,  7,  3,  9,  0,
  2,  3,  7,  6,  9,  0,
  2,  1,  5, -6,  9,  0,
  3,  2,  7,  8,  8, -3,  9,  0,
  3,  1,  7,  6,  8,  3,  9,  0,
  2,  6,  8,  6,  9,  0,
  3,  8,  7, -7,  8,  2,  9,  0,
  2,  9,  7,-11,  9,  0,
  2,  5,  7,  1,  9,  1,
  2,  4,  7,  4,  9,  0,
  2,  2,  6, -1,  9,  0,
  3,  2,  6, -1,  7,  2,  9,  0,
  2,  2,  7, 10,  9,  0,
  2,  1,  7, 13,  9,  0,
  2,  8,  7, -7,  9,  0,
  2,  7,  7, -4,  9,  0,
  2,  6,  7, -1,  9,  0,
  2,  5,  7,  3,  9,  0,
  2,  4,  7,  5,  9,  0,
  1,  2,  6,  0,
  2,  1,  5, -4,  9,  1,
  3,  1,  6,  9,  8, -5,  9,  0,
  2,  1,  5, -3,  9,  4,
  2,  1,  5, -2,  9,  4,
  3,  9,  7, -9,  8,  6,  9,  0,
  2,  8,  7, -4,  9,  0,
  2,  7,  7, -1,  9,  0,
  2,  1,  6,  3,  9,  0,
  2,  2,  6,  3,  9,  0,
  2,  1,  5, -1,  9,  3,
  3,  6,  7, -3,  8,  7,  9,  1,
  1,  1,  5,  0,
  2,  2,  6,  5,  9,  0,
  2,  1,  5,  1,  9,  0,
  2,  1,  5,  2,  9,  0,
  2,  1,  5,  3,  9,  0,
  2,  2,  5, -4,  9,  0,
  2,  2,  5, -3,  9,  0,
  2,  2,  5, -2,  9,  1,
  2,  2,  5, -1,  9,  1,
  1,  2,  5,  0,
 -1
  ];

    this.plu404 = new Plantbl(
      [0,  0,  0,  0,  2,  2,  9, 13, 13],
                               7,
                               this.pluargs,
                               this.plutabl,
                               this.plutabb,
                               this.plutabr,
                               3.9539999999999999e+01
      );

  }
}

class SwephMosh{
  constructor(sl, sw, swed){
    this.sl    = sl;
    this.sw    = sw;
    this.swed  = swed;
    if (this.sl   ==null) { this.sl   =new SwissLib(); }
    if (this.sw   ==null) { this.sw   =new SwissEph(); }
    if (this.swed ==null) { this.swed =Swe.SwissData; }
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

      [Swe.SwephData.J1900, Swe.SwephData.J1900, 163.7409, 40.99837, 0.00460, 171.4333, 129.8325, 1.0833],/* Cupido Neely */
      [Swe.SwephData.J1900, Swe.SwephData.J1900,  27.6496, 50.66744, 0.00245, 148.1796, 161.3339, 1.0500],/* Hades Neely */
      [Swe.SwephData.J1900, Swe.SwephData.J1900, 165.1232, 59.21436, 0.00120, 299.0440,   0.0000, 0.0000],/* Zeus Neely */
      [Swe.SwephData.J1900, Swe.SwephData.J1900, 169.0193, 64.81960, 0.00305, 208.8801,   0.0000, 0.0000],/* Kronos Neely */
      [Swe.SwephData.J1900, Swe.SwephData.J1900, 138.0533, 70.29949, 0.00000,   0.0000,   0.0000, 0.0000],/* Apollon Neely */
      [Swe.SwephData.J1900, Swe.SwephData.J1900, 351.3350, 73.62765, 0.00000,   0.0000,   0.0000, 0.0000],/* Admetos Neely */
      [Swe.SwephData.J1900, Swe.SwephData.J1900,  55.8983, 77.25568, 0.00000,   0.0000,   0.0000, 0.0000],/* Vulcanus Neely */
      [Swe.SwephData.J1900, Swe.SwephData.J1900, 165.5163, 83.66907, 0.00000,   0.0000,   0.0000, 0.0000],/* Poseidon Neely */
      /* Isis-Transpluto; elements from "Die Sterne" 3/1952, p. 70ff.
       * Strubell does not give an equinox. 1945 is taken to best reproduce
       * ASTRON ephemeris. (This is a strange choice, though.)
       * The epoch is 1772.76. The year is understood to have 366 days.
       * The fraction is counted from 1 Jan. 1772 */
      [2368547.66, 2431456.5, 0.0, 77.775, 0.3, 0.7, 0, 0],
      /* Nibiru, elements from Christian Woeltge, Hannover */
      [1856113.380954, 1856113.380954, 0.0, 234.8921, 0.981092, 103.966, -44.567, 158.708],
      /* Harrington, elements from Astronomical Journal 96(4), Oct. 1988 */
      [2374696.5, Swe.SwephData.J2000, 0.0, 101.2, 0.411, 208.5, 275.4, 32.4],
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

    T = (J - Swe.SwephData.J2000) / this.TIMESCALE;
    /* Calculate sin( i*MM ), etc. for needed multiple angles.  */
    for (i = 0; i < 9; i++) {
      if ((j = plan.max_harmonic[i]) > 0) {
        sr = (this.sm.mods3600 (this.freqs[i] * T) + this.phases[i]) * Swe.SwephData.STR;
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
    pobj[0] = Swe.SwephData.STR * sl;
    pobj[1] = Swe.SwephData.STR * sb;
    pobj[2] = Swe.SwephData.STR * plan.distance * sr + plan.distance;
    return Swe.OK;
  }

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
    var pedp = this.swed.pldat[Swe.SwephData.SEI_EARTH];
    var seps2000 = this.swed.oec2000.seps;
    var ceps2000 = this.swed.oec2000.ceps;

    if (do_save) {
      xp = pdp.x;
      xe = pedp.x;
    } else {
      xp = xxp;
      xe = xxe;
    }
    if (do_save || ipli == Swe.SwephData.SEI_EARTH || xeret != null) {
      do_earth = true;
    }
    /* tjd beyond ephemeris limits, give some margin for spped at edge */
    if (tjd < Swe.SwephData.MOSHPLEPH_START - 0.3 ||
        tjd > Swe.SwephData.MOSHPLEPH_END + 0.3) {

      s="jd "+tjd+" outside Moshier planet range "+
        Swe.SwephData.MOSHPLEPH_START+" .. "+
        Swe.SwephData.MOSHPLEPH_END+" ";
      console.error(s);

      return(Swe.ERR);
    }

    /* earth, for geocentric position */
    if (do_earth) {
      if (tjd == pedp.teval && pedp.iephe == Swe.SEFLG_MOSEPH) {
        xe = pedp.x;
      } else {
        /* emb */
        this.swi_moshplan2(tjd, this.pnoint2msh[Swe.SwephData.SEI_EMB], xe); /* emb hel. ecl. 2000 polar */
        this.sl.swi_polcart(xe, xe);                        /* to cartesian */
        this.sl.swi_coortrf2(xe, xe, -seps2000, ceps2000);/* and equator 2000 */
        this.embofs_mosh(tjd, xe);               /* emb -> earth */
        if (do_save) {
          pedp.teval = tjd;
          pedp.xflgs = -1;
          pedp.iephe = Swe.SEFLG_MOSEPH;
        }
        /* one more position for speed. */
        this.swi_moshplan2(tjd - Swe.SwephData.PLAN_SPEED_INTV, this.pnoint2msh[Swe.SwephData.SEI_EMB], x2);
        this.sl.swi_polcart(x2, x2);
        this.sl.swi_coortrf2(x2, x2, -seps2000, ceps2000);
        this.embofs_mosh(tjd - Swe.SwephData.PLAN_SPEED_INTV, x2);/**/
        for (i = 0; i <= 2; i++)
          dx[i] = (xe[i] - x2[i]) / Swe.SwephData.PLAN_SPEED_INTV;
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
    if (ipli == Swe.SwephData.SEI_EARTH) {
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

        dt = Swe.SwephData.PLAN_SPEED_INTV;
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


  embofs_mosh(tjd, xemb) {
    
    var T, M, a, L, B, p;
    var smp, cmp, s2mp, c2mp, s2d, c2d, sf, cf;
    var s2f, sx, cx, xyz=new Array(6);
    var seps = this.swed.oec.seps;
    var ceps = this.swed.oec.ceps;
    var i;
    /* Short series for position of the Moon
     */
    T = (tjd-Swe.SwephData.J1900)/36525.0;
    /* Mean anomaly of moon (MP) */
    a = this.sl.swe_degnorm(((1.44e-5*T + 0.009192)*T + 477198.8491)*T + 296.104608);
    a *= Swe.SwissData.DEGTORAD;
    smp = Math.sin(a);
    cmp = Math.cos(a);
    s2mp = 2.0*smp*cmp;           /* sin(2MP) */
    c2mp = cmp*cmp - smp*smp;     /* cos(2MP) */
    /* Mean elongation of moon (D) */
    a = this.sl.swe_degnorm(((1.9e-6*T - 0.001436)*T + 445267.1142)*T + 350.737486);
    a  = 2.0 * Swe.SwissData.DEGTORAD * a;
    s2d = Math.sin(a);
    c2d = Math.cos(a);
    /* Mean distance of moon from its ascending node (F) */
    a = this.sl.swe_degnorm((( -3.e-7*T - 0.003211)*T + 483202.0251)*T + 11.250889);
    a  *= Swe.SwissData.DEGTORAD;
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
          - 0.185596*Math.sin( Swe.SwissData.DEGTORAD * M )
          - 0.114336*s2f;
    /* Ecliptic latitude of the moon */
    a = smp*cf;
    sx = cmp*sf;
    B =     5.128189*sf
          + 0.280606*(a+sx)               /* sin(MP+F) */
          + 0.277693*(a-sx)               /* sin(MP-F) */
          + 0.173238*(s2d*cf - c2d*sf);   /* sin(2D-F) */
    B *= Swe.SwissData.DEGTORAD;
    /* Parallax of the moon */
    p =    0.950724
          +0.051818*cmp
          +0.009531*cx
          +0.007843*c2d
          +0.002824*c2mp;
    p *= Swe.SwissData.DEGTORAD;
    /* Elongation of Moon from Sun
     */
    L = this.sl.swe_degnorm(L);
    L *= Swe.SwissData.DEGTORAD;
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
    this.sl.swi_precess(xyz, tjd, 0, Swe.SwephData.J_TO_J2000);/**/
    /* now emb -> earth */
    for (i = 0; i <= 2; i++)
      xemb[i] -= xyz[i] / (Swe.SwephData.EARTH_MOON_MRAT + 1.0);
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

  swi_osc_el_plan(tjd, xp, ipl, ipli, xearth, xsun) {
    var pqr = new Array(9);
    var x = new Array(9);
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
    var pedp = this.swed.pldat[Swe.SwephData.SEI_EARTH];
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
    dmot = 0.9856076686 * Swe.SwissData.DEGTORAD / sema.val / Math.sqrt(sema.val);
                                                            /* daily motion */
    if ((fict_ifl.val & FICT_GEO) != 0) {
      dmot /= Math.sqrt(Swe.SwephData.SUN_EARTH_MRAT);
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
      M2 = M * Swe.SwissData.RADTODEG;
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
        M2 *= Swe.SwissData.DEGTORAD;
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
      K = Swe.SwephData.KGAUSS_GEO / Math.sqrt(sema.val); 
    } else {
      K = Swe.SwephData.KGAUSS / Math.sqrt(sema.val);
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
    if (tequ.val != Swe.SwephData.J2000) {
      this.sl.swi_precess(xp, tequ.val, 0, Swe.SwephData.J_TO_J2000);
      this.sl.swi_precess(xp, 3, tequ.val, 0, Swe.SwephData.J_TO_J2000);
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
        mano.val = this.plan_oscu_elem[ipl][2] * Swe.SwissData.DEGTORAD; /* mean anomaly */
      }
      if (sema != null) {
        sema.val = this.plan_oscu_elem[ipl][3];                   /* semi-axis */
      }
      if (ecce != null) {
        ecce.val = this.plan_oscu_elem[ipl][4];                   /* eccentricity */
      }
      if (parg != null) {
        parg.val = this.plan_oscu_elem[ipl][5] * Swe.SwissData.DEGTORAD; /* arg. of peri. */
      }
      if (node != null) {
        node.val = this.plan_oscu_elem[ipl][6] * Swe.SwissData.DEGTORAD;  /* asc. node */
      }
      if (incl != null) {
        incl.val = this.plan_oscu_elem[ipl][7] * Swe.SwissData.DEGTORAD; /* inclination*/
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

/**
* This class does all the calculations that are related to astrological
* houses.
* <P><I><B>You will find the complete documentation for the original
* SwissEphemeris package at <A HREF="http://www.astro.ch/swisseph/sweph_g.htm">
* http://www.astro.ch/swisseph/sweph_g.htm</A>. By far most of the information 
* there is directly valid for this port to Java as well.</B></I>
* @version 1.0.0a
*/
class SweHouse{

  constructor(sl, sw, swed){
    this.MILLIARCSEC = 1.0 / 3600000.0;
    this.VERY_SMALL=1E-10;
    this.sd = new SweDate;
    this.sl   = sl;
    this.sw   = sw;
    this.swed = swed;
    if (this.sl   ==null) { this.sl   =new SwissLib(); }
    if (this.sw   ==null) { this.sw   =new SwissEph(); }
    if (this.swed ==null) { this.swed =Swe.SwissData; }
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
    retc = swe_houses_armc(armc, lat, eps, ihs2, cusp, ascmc, aOffs);
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
  swe_house_pos(armc, geolat, doubleeps, hsys, doublexpin) {
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

/**
* Constructs a new SwissEph object with the default search path for the
* Swiss Ephemeris data files.
* @see SweConst#SE_EPHE_PATH
*/
class SwissEph{
  constructor(){
    
    this.swed = Swe.SwissData;
    this.sl = new SwissLib(this.swed);
    this.sc = null;
    this.sm = new Swemmoon(this.swed, this.sl);
    this.smosh = new SwephMosh(this.sl, this, this.swed);
    this.sh = new SweHouse(this.sl, this, this.swed);
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

  swe_calc(tjd, ipl, iflag, xx) {
    var ret = 0;
    try {
      ret = this._calc(tjd, ipl, iflag, xx);
    } catch (e) {
      console.error(e);
    }
    return ret;
  };

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

    if (ipl == Swe.SE_AST_OFFSET + 134340) {
      ipl = Swe.SE_PLUTO;
    }

    epheflag = iflag & Swe.SEFLG_EPHMASK;
    if ((epheflag & Swe.SEFLG_DEFAULTEPH)!=0) {
      epheflag = 0;
    }
    if (this.swe_calc_epheflag_sv != epheflag && ipl != Swe.SE_ECL_NUT) {
      this.free_planets();
      this.swe_calc_epheflag_sv = epheflag;
    }
    if ((iflag & Swe.SEFLG_SPEED3)!=0 && (iflag & Swe.SEFLG_SPEED)!=0) {
      iflag = iflag & ~Swe.SEFLG_SPEED3;
    }
    if (((iflag & Swe.SEFLG_XYZ)!=0) && ((iflag & Swe.SEFLG_RADIANS)!=0)) {
      iflag = iflag & ~Swe.SEFLG_RADIANS;
    }
    if (ipl < Swe.SE_NPLANETS && ipl >= Swe.SE_SUN) {
      sd = this.swed.savedat[ipl];
    } else {
      sd = this.swed.savedat[Swe.SE_NPLANETS];
    }
    iflgcoor = Swe.SEFLG_EQUATORIAL | Swe.SEFLG_XYZ | Swe.SEFLG_RADIANS;

    try {
      if (sd.tsave != tjd || tjd == 0 || ipl != sd.ipl ||
        ((sd.iflgsave & ~iflgcoor) != (iflag & ~iflgcoor))) {
        if ((iflag & Swe.SEFLG_SPEED3) == 0) {
          sd.tsave = tjd;
          sd.ipl = ipl;
          if ((sd.iflgsave = this.swecalc(tjd, ipl, iflag, sd.xsaves)) == Swe.ERR) {
            return this.swe_calc_error(xx);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }

    var xsOffset=0;
    xs=sd.xsaves;
    if (ipl == Swe.SE_ECL_NUT) {
      i = 4;
    } else {
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
      for(i=0;i<Swe.SwephData.SEI_NPLANETS;i++) {
        this.swed.pldat[i].clearData();
      }
      for (i=0; i <= Swe.SE_NPLANETS; i++) {/* "<=" is correct! see decl.*/
        this.swed.savedat[i].clearData();
      }
      /* clear node data space */
      for(i=0;i<Swe.SwephData.SEI_NNODE_ETC;i++) {
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
    for(var a = 0; a < Swe.SwephData.SEI_NMODELS; a++) {
      this.swed.astro_models[a] = 0;
    }
    this.swed.jpldenum = 0;
    var sd = new SweDate;
    sd.swe_set_tid_acc(Swe.SE_TIDAL_AUTOMATIC);
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

  swe_set_sid_mode(sid_mode) {
    this.swe_set_sid_mode(sid_mode, 0, 0);
  }

  swe_set_sid_mode(sid_mode, t0, ayan_t0) {
    if (sid_mode < 0) sid_mode = 0;

    var sip = this.swed.sidd;
    sip.sid_mode = sid_mode;
    if (sid_mode >= Swe.SE_SIDBITS) {
      sid_mode %= Swe.SE_SIDBITS;
    }
 
    this.swed.ayana_is_set = true;
    if (sid_mode == Swe.SE_SIDM_USER) {
      sip.t0 = t0;
      sip.ayan_t0 = ayan_t0;
    } else {
      sip.t0 = Swe.SwephData.ayanamsa[sid_mode].t0;
      sip.ayan_t0 = Swe.SwephData.ayanamsa[sid_mode].ayan_t0;
    }
    this.swi_force_app_pos_etc();
  }

  swe_get_ayanamsa(tjd_et) {
    var x=new Array(6), eps;
    var sip = this.swed.sidd;
    if (!this.swed.ayana_is_set) {
      this.swe_set_sid_mode(Swe.SE_SIDM_FAGAN_BRADLEY, 0, 0);
    }
    /* vernal point (tjd), cartesian */
    x[0] = 1;
    x[1] = x[2] = 0;
    /* to J2000 */
    if (tjd_et != Swe.SwephData.J2000) {
      this.sl.swi_precess(x, tjd_et, 0, Swe.SwephData.J_TO_J2000);
    }
    /* to t0 */
    this.sl.swi_precess(x, sip.t0, 0, Swe.SwephData.J2000_TO_J);
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

  swe_get_ayanamsa_name(isidmode) {
    isidmode %= SweConst.SE_SIDBITS;
    if (isidmode < SwissData.SE_NSIDM_PREDEF)
      return SwissData.ayanamsa_name[isidmode];
    return null;
  }

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


  swe_azalt(tjd_ut, calc_flag, geopos, atpress, attemp, xin, xaz) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed);
    }
    this.sc.swe_azalt(tjd_ut, calc_flag, geopos, atpress, attemp, xin, xaz);
  }


  swe_azalt_rev(tjd_ut, calc_flag, geopos, xin, xout) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed);
    }
    this.sc.swe_azalt_rev(tjd_ut, calc_flag, geopos, xin, xout);
  }


  swe_refrac(inalt, atpress, attemp, calc_flag) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed);
    }
    return this.sc.swe_refrac(inalt, atpress, attemp, calc_flag);
  }

  swe_refrac_extended(inalt, geoalt, atpress, lapse_rate, attemp, calc_flag, dret) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed);
    }
    return this.sc.swe_refrac_extended(inalt, geoalt, atpress, lapse_rate, attemp, calc_flag, dret);
  }

  swe_rise_trans(tjd_ut, ipl, starname, epheflag, rsmi, geopos, atpress, attemp, tret) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed);
    }
    return this.sc.swe_rise_trans(tjd_ut, ipl, starname, epheflag, rsmi, geopos,
                             atpress, attemp, tret);
  }

  swe_rise_trans_true_hor(tjd_ut, ipl, starname, epheflag, rsmi, geopos, atpress, attemp, horhgt, tret) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed);
    }
    return this.sc.swe_rise_trans_true_hor(tjd_ut, ipl, starname, epheflag, rsmi, geopos, atpress, attemp, horhgt, tret);
  }

  swe_gauquelin_sector(t_ut, ipl, starname, iflag, imeth, geopos, atpress, attemp, dgsect) {
    if (this.sc===null) {
      this.sc=new Swecl(this, this.sl, this.sm, this.swed);
    }
    return this.sc.swe_gauquelin_sector(t_ut, ipl, starname, iflag, imeth, geopos, atpress, attemp, dgsect);
  }

  swe_house_name(hsys) {
    if (this.sh==null) {
      this.sh=new SweHouse(sl, this, this.swed);
    }
    return this.sh.swe_house_name(Math.float(hsys));
  }

  swe_house_pos(armc, geolat, eps, hsys, xpin) {
    if (this.sh==null) {
      this.sh=new SweHouse(sl, this, this.swed);
    }
    if (xpin.length != 6) {
      xpin = [xpin[0], xpin[1], 0, 0, 0, 0];
    }
    return this.sh.swe_house_pos(armc, geolat, eps, hsys, xpin);
  }

  swe_houses_armc(armc, geolat, eps, hsys, cusp, ascmc) {
    if (this.sh==null) {
      this.sh=new SweHouse(sl, this, this.swed);
    }
    return this.sh.swe_houses_armc(armc, geolat, eps, hsys, cusp, ascmc, 0);
  }

  swe_houses(tjd_ut, iflag, geolat, geolon, hsys, cusp, ascmc, aOffs) {
    if(aOffs === undefined){
      return this.swe_houses(tjd_ut, iflag, geolat, geolon, hsys, cusp, ascmc, 0);
    }
    if (this.sh===null) {
      this.sh = new SweHouse(this.sl, this, this.swed);
    }
    return this.sh.swe_houses(tjd_ut, iflag, geolat, geolon, hsys, cusp, ascmc, aOffs);
  }

  getIterateCount() {
    if (this.ext===null) { this.ext=new Extensions(this); }
    return this.ext.getIterateCount();
  }

  getTransitET(tc, jdET, backwards, jdLimit){
    if(jdLimit === undefined){
      return this.getTransitET(tc,
                        jdET,
                        backwards,
                        (backwards?-Double.MAX_VALUE:Double.MAX_VALUE));
    }

    if (ext==null) { ext=new Extensions(this); }
    var calcUT = (tc instanceof TCHouses);
    return ext.getTransit(tc, jdET - (calcUT ? SweDate.getDeltaT(jdET) : 0), backwards, jdLimit) +
            (calcUT ? SweDate.getDeltaT(jdET) : 0);
  }

  getTransitUT(tc, jdUT, backwards, jdLimit){
    if(jdLimit === undefined){
      if (ext==null) { ext=new Extensions(this); }
      var calcUT = (tc instanceof TCHouses);
      var jdET = ext.getTransit(
                            tc,
                            jdUT + (calcUT ? 0 : SweDate.getDeltaT(jdUT)),
                            backwards,
                            (backwards?-Double.MAX_VALUE:Double.MAX_VALUE));
      return jdET - (calcUT ? 0 : SweDate.getDeltaT(jdET));
    }

    if (ext==null) { ext=new Extensions(this); }
    var jdET = ext.getTransit(
                          tc,
                          jdUT + SweDate.getDeltaT(jdUT),
                          backwards,
                          jdLimit + SweDate.getDeltaT(jdLimit));
    return jdET - SweDate.getDeltaT(jdET);
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
    var pedp = this.swed.pldat[Swe.SwephData.SEI_EARTH];
    var psdp = this.swed.pldat[Swe.SwephData.SEI_SUNBARY];
    var ndp;
    var xp, xp2;
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
    } else if (ipl == Swe.SE_MOON) {

      /* internal planet number */
      ipli = Swe.SwephData.SEI_MOON;
      pdp = this.swed.pldat[ipli];
      xp = pdp.xreturn;
      switch(epheflag) {
        case Swe.SEFLG_MOSEPH:
          retc = this.moshier_moon(tjd, Swe.SwephData.DO_SAVE, null);
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

    } else if (ipl == Swe.SE_SUN 
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
      } else if ((iflag & Swe.SEFLG_BARYCTR)!=0) {

      } else {    /* geocentric */
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

    } else if (ipl == Swe.SE_MEAN_NODE) {
      if (((iflag & Swe.SEFLG_HELCTR)!=0) ||
          ((iflag & Swe.SEFLG_BARYCTR)!=0)) {
        for (i = 0; i < 24; i++) {
          x[i] = 0;
        }
        return iflag;
      }
      ndp = this.swed.nddat[Swe.SwephData.SEI_MEAN_NODE];
      xp = ndp.xreturn;
      xp2 = ndp.x;
      retc = this.sm.swi_mean_node(tjd, xp2);
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }

      retc = this.sm.swi_mean_node(tjd - Swe.SwephData.MEAN_NODE_SPEED_INTV, xp2, 3);
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }
      xp2[3] = this.sl.swe_difrad2n(xp2[0], xp2[3]) / Swe.SwephData.MEAN_NODE_SPEED_INTV;
      xp2[4] = xp2[5] = 0;
      ndp.teval = tjd;
      ndp.xflgs = -1;
      /* lighttime etc. */
      retc = this.app_pos_etc_mean(Swe.SwephData.SEI_MEAN_NODE, iflag);
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

    } else if (ipl == Swe.SE_MEAN_APOG) {
      if (((iflag & Swe.SEFLG_HELCTR)!=0) ||
          ((iflag & Swe.SEFLG_BARYCTR)!=0)) {

        for (i = 0; i < 24; i++) {
          x[i] = 0;
        }
        return iflag;
      }
      ndp = this.swed.nddat[Swe.SwephData.SEI_MEAN_APOG];
      xp = ndp.xreturn;
      xp2 = ndp.x;
      retc = this.sm.swi_mean_apog(tjd, xp2);
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }

      retc = this.sm.swi_mean_apog(tjd - Swe.SwephData.MEAN_NODE_SPEED_INTV, xp2, 3);
      if (retc == Swe.ERR) {
        return this.swecalc_error(x);
      }
      for(i = 0; i <= 1; i++) {
        xp2[3+i] = this.sl.swe_difrad2n(xp2[i], xp2[3+i]) / Swe.SwephData.MEAN_NODE_SPEED_INTV;
      }
      xp2[5] = 0;
      ndp.teval = tjd;
      ndp.xflgs = -1;
      /* lighttime etc. */
      if ((retc = this.app_pos_etc_mean(Swe.SwephData.SEI_MEAN_APOG, iflag)) !=
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
    } else if (ipl == Swe.SE_TRUE_NODE) {
      if (((iflag & Swe.SEFLG_HELCTR)!=0) ||
          ((iflag & Swe.SEFLG_BARYCTR)!=0)) {
        /* heliocentric/barycentric lunar node not allowed */
        for (i = 0; i < 24; i++) {
          x[i] = 0;
        }
        return iflag;
      }
      ndp = this.swed.nddat[Swe.SwephData.SEI_TRUE_NODE];
      xp = ndp.xreturn;
      retc = this.lunar_osc_elem(tjd, Swe.SwephData.SEI_TRUE_NODE, iflag);
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
     * minor planets                               *
     ***********************************************/
    } else if (ipl == Swe.SE_CHIRON
      || ipl == Swe.SE_PHOLUS
      || ipl == Swe.SE_CERES   /* Ceres - Vesta */
      || ipl == Swe.SE_PALLAS
      || ipl == Swe.SE_JUNO
      || ipl == Swe.SE_VESTA
      || ipl > Swe.SE_AST_OFFSET) {

      if (ipl < Swe.SE_NPLANETS) {
        ipli = this.swed.pnoext2int[ipl];
      } else if (ipl <= Swe.SE_AST_OFFSET + Swe.SwephData.MPC_VESTA) {
        ipli = Swe.SwephData.SEI_CERES + ipl - Swe.SE_AST_OFFSET - 1;
        ipl = Swe.SE_CERES + ipl - Swe.SE_AST_OFFSET - 1;
      } else {
        ipli = Swe.SwephData.SEI_ANYBODY;
      }
      if (ipli == Swe.SwephData.SEI_ANYBODY) {
        ipli_ast = ipl;
      } else {
        ipli_ast = ipli;
      }
      pdp = this.swed.pldat[ipli];
      xp = pdp.xreturn;
      if (ipli_ast > Swe.SE_AST_OFFSET) {
        ifno = Swe.SwephData.SEI_FILE_ANY_AST;
      } else {
        ifno = Swe.SwephData.SEI_FILE_MAIN_AST;
      }
      if (ipli == Swe.SwephData.SEI_CHIRON && (tjd < Swe.SwephData.CHIRON_START || tjd > Swe.SwephData.CHIRON_END)) {
        console.error("Chiron's ephemeris is restricted to JD " +
                      Swe.SwephData.CHIRON_START + " - JD " + Swe.SwephData.CHIRON_EN);
        return Swe.ERR;
      }
      if (ipli == Swe.SwephData.SEI_PHOLUS && (tjd < Swe.SwephData.PHOLUS_START || tjd > Swe.SwephData.PHOLUS_END)) {
        console.error("Pholus's ephemeris is restricted to JD " +
                  Swe.SwephData.PHOLUS_START + " - JD " + Swe.SwephData.PHOLUS_END);
        return Swe.ERR;
      }
      while (true) {
        retc = this.main_planet(tjd, Swe.SwephData.SEI_EARTH, epheflag, iflag);
        if (retc == Swe.ERR) {
          return this.swecalc_error(x);
        }

        iflag = this.swed.pldat[Swe.SwephData.SEI_EARTH].xflgs;
        return;
      }

    /***********************************************
     * invalid body number                         *
     ***********************************************/
    } else {
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
    retc = this.smosh.swi_moshplan(tjd, Swe.SwephData.SEI_EARTH, do_save, null, null);/**/
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



  sweph_moon(tjd, ipli, iflag) {
    var retc;

        retc = sweplan(tjd, ipli, Swe.SwephData.SEI_FILE_MOON, iflag, Swe.SwephData.DO_SAVE,
                        null, null, null, null);
    if (retc == Swe.ERR) {
      return Swe.ERR;
    }
    /* if sweph file not found, switch to moshier */
    if (retc == Swe.SwephData.NOT_AVAILABLE) {
      return Swe.ERR;
    }
    return Swe.OK;
  }

  calc_epsilon(tjd, iflag, e) {
    e.teps = tjd;
    e.eps = this.sl.swi_epsiln(tjd, iflag);
    e.seps = Math.sin(e.eps);
    e.ceps = Math.cos(e.eps);
  }

  main_planet(tjd, ipli, epheflag, iflag){
    var retc;
    var calc_swieph=false;
    var calc_moshier=false;

    if (epheflag == Swe.SEFLG_MOSEPH || calc_moshier) {
      retc = this.smosh.swi_moshplan(tjd, ipli, Swe.SwephData.DO_SAVE, null, null);
      if (retc == Swe.ERR) {
        return Swe.ERR;
      }
      if (ipli == Swe.SwephData.SEI_SUN) {
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

  sweplan(tjd, ipli, ifno, iflag, do_save,
              xpret, xperet, xpsret,
              xpmret) {
    var i, retc;
    var do_earth = false, do_moon = false, do_sunbary = false;
    var pdp = this.swed.pldat[ipli];
    var pebdp = this.swed.pldat[Swe.SwephData.SEI_EMB];
    var psbdp = this.swed.pldat[Swe.SwephData.SEI_SUNBARY];
    var pmdp = this.swed.pldat[Swe.SwephData.SEI_MOON];
    var xxp=new Array(6), xxm=new Array(6),
           xxs=new Array(6), xxe=new Array(6);
    var xp, xpe, xpm, xps;
    var speedf1, speedf2;
    /* xps (barycentric sun) may be necessary because some planets on sweph
     * file are heliocentric, other ones are barycentric. without xps,
     * the heliocentric ones cannot be returned barycentrically.
     */
    if (do_save || ipli == Swe.SwephData.SEI_SUNBARY
        || (pdp.iflg & Swe.SwephData.SEI_FLG_HELIO)!=0
        || xpsret != null || (iflag & Swe.SEFLG_HELCTR)!=0) {
      do_sunbary = true;
    }
    if (do_save || ipli == Swe.SwephData.SEI_EARTH || xperet != null) {
      do_earth = true;
    }
    if (ipli == Swe.SwephData.SEI_MOON) {
        do_earth = true;
        do_sunbary = true;
    }
    if (do_save || ipli == Swe.SwephData.SEI_MOON || ipli == Swe.SwephData.SEI_EARTH ||
        xperet != null || xpmret != null) {
      do_moon = true;
    }
    if (do_save) {
      xp = pdp.x;
      xpe = pebdp.x;
      xps = psbdp.x;
      xpm = pmdp.x;
    } else {
      xp = xxp;
      xpe = xxe;
      xps = xxs;
      xpm = xxm;
    }
    speedf2 = iflag & Swe.SEFLG_SPEED;
    /* barycentric sun */
    if (do_sunbary) {
      speedf1 = psbdp.xflgs & Swe.SEFLG_SPEED;
        retc = this.sweph(tjd, Swe.SwephData.SEI_SUNBARY, Swe.SwephData.SEI_FILE_PLANET, iflag,
                     null, do_save, xps);/**/
        if (retc != Swe.OK) {
          return(retc);
        }
      if (xpsret != null) {
        for (i = 0; i <= 5; i++) {
          xpsret[i] = xps[i];
        }
      }
    }
    /* moon */
    if (do_moon) {
      speedf1 = pmdp.xflgs & Swe.SEFLG_SPEED;
        retc = this.sweph(tjd, Swe.SwephData.SEI_MOON, Swe.SwephData.SEI_FILE_MOON, iflag, null,
                     do_save, xpm);
        if (retc == Swe.ERR) {
          return(retc);
        }
          return Swe.ERR;

      if (xpmret != null) {
        for (i = 0; i <= 5; i++) {
          xpmret[i] = xpm[i];
        }
      }
    }
    /* barycentric earth */
    if (do_earth) {
      speedf1 = pebdp.xflgs & Swe.SEFLG_SPEED;
        retc = this.sweph(tjd, Swe.SwephData.SEI_EMB, Swe.SwephData.SEI_FILE_PLANET, iflag, null,
                     do_save, xpe);
        if (retc != Swe.OK) {
          return(retc);
        }
        /* earth from emb and moon */
        embofs(xpe, 0, xpm, 0);
        /* speed is needed, if
         * 1. true position is being computed before applying light-time etc.
         *    this is the position saved in pdp->x.
         *    in this case, speed is needed for light-time correction.
         * 2. the speed flag has been specified.
         */
        if (xpe == pebdp.x || ((iflag & Swe.SEFLG_SPEED)!=0)) {
          embofs(xpe, 3, xpm, 3);
        }

      if (xperet != null) {
        for (i = 0; i <= 5; i++) {
          xperet[i] = xpe[i];
        }
      }
    }
    if (ipli == Swe.SwephData.SEI_MOON) {
      for (i = 0; i <= 5; i++) {
        xp[i] = xpm[i];
      }
    } else if (ipli == Swe.SwephData.SEI_EARTH) {
      for (i = 0; i <= 5; i++) {
        xp[i] = xpe[i];
      }
    } else if (ipli == Swe.SwephData.SEI_SUN) {
      for (i = 0; i <= 5; i++) {
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
        if ((pdp.iflg & Swe.SwephData.SEI_FLG_HELIO)!=0) {
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
      for (i = 0; i <= 5; i++) {
        xpret[i] = xp[i];
      }
    }
    return Swe.OK;
  }

  sweph(tjd, ipli, ifno, iflag, xsunb, do_save, xpret) {
    var i, ipl, retc, subdirlen;
    var s="", subdirnam, fname;
    var t, tsv;
    var xemb=new Array(6), xx=new Array(6), xp;
    var pdp;
    var pedp = this.swed.pldat[Swe.SwephData.SEI_EARTH];
    var psdp = this.swed.pldat[Swe.SwephData.SEI_SUNBARY];
    var fdp = this.swed.fidat[ifno];
    var speedf1, speedf2;
    var need_speed;
    ipl = ipli;
    if (ipli > Swe.SE_AST_OFFSET) {
      ipl = Swe.SwephData.SEI_ANYBODY;
    }
    pdp = this.swed.pldat[ipl];
    if (do_save) {
      xp = pdp.x;
    } else {
      xp = xx;
    }
    /* if planet has already been computed for this date, return.
     * if speed flag has been turned on, recompute planet */
    speedf1 = pdp.xflgs & Swe.SEFLG_SPEED;
    speedf2 = iflag & Swe.SEFLG_SPEED;

    return(Swe.SwephData.NOT_AVAILABLE);
  }

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
    var pedp = this.swed.pldat[Swe.SwephData.SEI_EARTH];
    var pdp;
    var oe = this.swed.oec2000;
    var epheflag = iflag & Swe.SEFLG_EPHMASK;

    t = dtsave_for_defl = 0;      /* dummy assignment to silence gcc */
    /* ephemeris file */
    if (ipli > Swe.SE_AST_OFFSET) {
      ifno = Swe.SwephData.SEI_FILE_ANY_AST;
      ibody = Swe.SwephData.IS_ANY_BODY;
      pdp = this.swed.pldat[Swe.SwephData.SEI_ANYBODY];
    } else if (ipli == Swe.SwephData.SEI_CHIRON
        || ipli == Swe.SwephData.SEI_PHOLUS
        || ipli == Swe.SwephData.SEI_CERES
        || ipli == Swe.SwephData.SEI_PALLAS
        || ipli == Swe.SwephData.SEI_JUNO
        || ipli == Swe.SwephData.SEI_VESTA) {
      ifno = Swe.SwephData.SEI_FILE_MAIN_AST;
      ibody = Swe.SwephData.IS_MAIN_ASTEROID;
      pdp = this.swed.pldat[ipli];
    } else {
      ifno = Swe.SwephData.SEI_FILE_PLANET;
      ibody = Swe.SwephData.IS_PLANET;
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
    for (i = 0; i <= 5; i++) {
      xx[i] = pdp.x[i];
    }
    /* if heliocentric position is wanted */
    if ((iflag & Swe.SEFLG_HELCTR)!=0) {
        for (i = 0; i <= 5; i++) {
          xx[i] -= this.swed.pldat[Swe.SwephData.SEI_SUNBARY].x[i];
        }
    }

    /************************************
     * observer: geocenter or topocenter
     ************************************/
    /* if topocentric position is wanted  */
    if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
      if (this.swed.topd.teval != pedp.teval
        || pedp.teval == 0) {
        if (this.swi_get_observer(pedp.teval, iflag | Swe.SEFLG_NONUT, Swe.SwephData.DO_SAVE, xobs) != Swe.OK) {
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
    } else {
      /* barycentric position of geocenter */
      for (i = 0; i <= 5; i++) {
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
          dt = Math.sqrt(this.sl.square_sum(dx)) * Swe.AUNIT / Swe.SwephData.CLIGHT / 86400.0;
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
        dt = Math.sqrt(this.sl.square_sum(dx)) *Swe.AUNIT / Swe.SwephData.CLIGHT / 86400.0;
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
            if (ibody == Swe.SwephData.IS_PLANET) {
              retc = this.smosh.swi_moshplan(t, ipli, Swe.SwephData.NO_SAVE, xxsv,xearth);
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
            xx[i] -= this.swed.pldat[Swe.SwephData.SEI_SUNBARY].x[i];
          }
        }
      }

      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        /* observer position for t(light-time) */
        if ((iflag & Swe.SEFLG_TOPOCTR)!=0) {
          if (this.swi_get_observer(t, iflag | Swe.SEFLG_NONUT, Swe.SwephData.NO_SAVE, xobs2) != Swe.OK) {
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
      this.sl.swi_precess(xx, pdp.teval, iflag, Swe.SwephData.J2000_TO_J);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.swi_precess_speed(xx, pdp.teval, iflag, Swe.SwephData.J2000_TO_J);
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
      this.sl.swi_cartpol_sp(pdp.xreturn, 6, pdp.xreturn, 0);
      pdp.xreturn[0] -= this.swe_get_ayanamsa(pdp.teval) * this.swed.DEGTORAD;
      this.sl.swi_polcart_sp(pdp.xreturn, 0, pdp.xreturn, 6);
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

  swi_precess_speed(xx, xOffs, t, iflag, direction) {
    if(direction === undefined){
      this.swi_precess_speed(xx, 0, xOffs, t, iflag);
      return;
    }
    

    var oe;
    var fac, dpre = new Array(1), dpre2 = new Array(1);
    var tprec = (t - Swe.SwephData.J2000) / 36525.0;
    var prec_model = this.swed.astro_models[Swe.SE_MODEL_PREC_LONGTERM];
    if (prec_model == 0) prec_model = Swe.SEMOD_PREC_DEFAULT;
    if (direction == Swe.SwephData.J2000_TO_J) {
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
        xx[3+i+offs] = x[3+i] + (x[i] - xv[i]) / Swe.SwephData.NUT_SPEED_INTV;
      }
    }
    /* new position */
    for (i = 0; i <= 2; i++) {
      xx[i+offs] = x[i];
    }
  }

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
    var intv = Swe.SwephData.PLAN_SPEED_INTV;
    for (i = 0; i <= 5; i++) {
      u[i] = xxs[i] = xx[i+xxOffs];
    }
    ru = Math.sqrt(this.sl.square_sum(u));
    for (i = 0; i <= 2; i++) {
      v[i] = xe[i+3] / 24.0 / 3600.0 / Swe.SwephData.CLIGHT * Swe.AUNIT;
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
    var pedp = this.swed.pldat[Swe.SwephData.SEI_EARTH];
    var psdp = this.swed.pldat[Swe.SwephData.SEI_SUNBARY];
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
    sin_sunr = Swe.SwephData.SUN_RADIUS / re;   /* sine of sun radius (= sun radius) */
    if (sina < sin_sunr) {
      meff_fact = this.meff(sina / sin_sunr);
    } else {
      meff_fact = 1;
    }
    g1 = 2.0 * Swe.SwephData.HELGRAVCONST * meff_fact / Swe.SwephData.CLIGHT / Swe.SwephData.CLIGHT / Swe.AUNIT / re;
    g2 = 1.0 + qe;
    /* compute deflected position */
    for (i = 0; i <= 2; i++) {
      xx2[i] = ru * (u[i] + g1/g2 * (uq * e[i] - ue * q[i]));
    }

    if ((iflag & Swe.SEFLG_SPEED)!=0) {
      dtsp = -Swe.SwephData.DEFL_SPEED_INTV;
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
      sin_sunr = Swe.SwephData.SUN_RADIUS / re; /* sine of sun radius (= sun radius) */
      if (sina < sin_sunr) {
        meff_fact = this.meff(sina / sin_sunr);
      } else {
        meff_fact = 1;
      }
      g1 = 2.0 * Swe.SwephData.HELGRAVCONST * meff_fact / Swe.SwephData.CLIGHT /
           Swe.SwephData.CLIGHT / Swe.AUNIT / re;
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

  app_pos_etc_sun(iflag) {
    
    var i, j, niter, retc = Swe.OK;
    var flg1, flg2;
    var xx=new Array(6), xxsv=new Array(6), dx=new Array(3), dt, t = 0;
    var xearth=new Array(6), xsun=new Array(6), xobs=new Array(6);
    var pedp = this.swed.pldat[Swe.SwephData.SEI_EARTH];
    var psdp = this.swed.pldat[Swe.SwephData.SEI_SUNBARY];
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
        if (this.swi_get_observer(pedp.teval, iflag | Swe.SEFLG_NONUT, Swe.SwephData.DO_SAVE, xobs)
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
    } else {
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
    } else {
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
          dt = Math.sqrt(this.sl.square_sum(dx)) * Swe.AUNIT / Swe.SwephData.CLIGHT / 86400.0;
          t = pedp.teval - dt;
          /* new position */
          switch(pedp.iephe) {
            /* if geocentric sun, new sun at t'
             * if heliocentric or barycentric earth, new earth at t' */

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
      this.sl.swi_precess(xx, pedp.teval, iflag, Swe.SwephData.J2000_TO_J);/**/
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.swi_precess_speed(xx, pedp.teval, iflag, Swe.SwephData.J2000_TO_J);/**/
      }
      oe = this.swed.oec;
    } else
      oe = this.swed.oec2000;

    var ret = this.app_pos_rest(pedp, iflag, xx, xxsv, oe);
    
    return ret;
  }

  app_pos_etc_moon(iflag) {
    
    var i;
    var flg1, flg2;
    var xx=new Array(6), xxsv=new Array(6), xobs=new Array(6),
           xxm=new Array(6), xs=new Array(6), xe=new Array(6),
           xobs2=new Array(6), dt;
    var pedp = this.swed.pldat[Swe.SwephData.SEI_EARTH];
    var psdp = this.swed.pldat[Swe.SwephData.SEI_SUNBARY];
    var pdp = this.swed.pldat[Swe.SwephData.SEI_MOON];
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
        if (this.swi_get_observer(pdp.teval, iflag | Swe.SEFLG_NONUT, Swe.SwephData.DO_SAVE, xobs, null) != Swe.OK) {
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
      dt = Math.sqrt(this.sl.square_sum(xxm)) * Swe.AUNIT / Swe.SwephData.CLIGHT / 86400.0;
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
        if (this.swi_get_observer(t, iflag | Swe.SEFLG_NONUT, Swe.SwephData.NO_SAVE, xobs2, null) != Swe.OK) {
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
      this.sl.swi_precess(xx, pdp.teval, iflag, Swe.SwephData.J2000_TO_J);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.swi_precess_speed(xx, pdp.teval, iflag, Swe.SwephData.J2000_TO_J);
      }
      oe = this.swed.oec;
    } else {
      oe = this.swed.oec2000;
    }

    var ret = this.app_pos_rest(pdp, iflag, xx, xxsv, oe);
    
    return ret;
  }

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

    /*****************************************************
     * if no precession, equator of date -> equator 2000 *
     *****************************************************/
    if ((iflag & Swe.SEFLG_J2000)!=0) {
      this.sl.swi_precess(xx, pdp.teval, iflag, Swe.SwephData.J_TO_J2000);
      if ((iflag & Swe.SEFLG_SPEED)!=0) {
        this.swi_precess_speed(xx, pdp.teval, iflag, Swe.SwephData.J_TO_J2000);
      }
      oe = this.swed.oec2000;
    } else {
      oe = this.swed.oec;
    }

    var ret =  this.app_pos_rest(pdp, iflag, xx, xxsv, oe);
    
    return ret
  }

  rot_back(ipli) {
    var i;
    var t, tdiff;
    var qav, pav, dn;
    var omtild, com, som, cosih2;
    var x = new Array(Swe.SwephData.MAXORD+1);
    for(var i=0; i<Swe.SwephData.MAXORD+1; i++){
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
    if (ipli == Swe.SwephData.SEI_MOON) {
      dn = pdp.prot + tdiff * pdp.dprot;
      i = Math.float(dn / Swe.SwephData.TWOPI);
      dn -= i * Swe.SwephData.TWOPI;
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
    if ((pdp.iflg & Swe.SwephData.SEI_FLG_ELLIPSE)!=0) {
      refepx = pdp.refep;
      refepyOffs = nco;
      omtild = pdp.peri + tdiff * pdp.dperi;
      i = Math.float(omtild / Swe.SwephData.TWOPI);
      omtild -= i * Swe.SwephData.TWOPI;
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
      if (ipli == Swe.SwephData.SEI_MOON) {
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

  embofs(xemb, eOffs, xmoon, mOffs) {
    var i;
    for (i = 0; i <= 2; i++) {
      xemb[i+eOffs] -= xmoon[i+mOffs] / (Swe.SwephData.EARTH_MOON_MRAT + 1.0);
    }
  }

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

  lunar_osc_elem(tjd, ipl, iflag) {
    var i, j, istart;
    var epheflag = Swe.SEFLG_DEFAULTEPH;
    var retc = Swe.ERR;
    var flg1, flg2;
    var ndp, ndnp, ndap;
    var oe;
    var speed_intv = Swe.SwephData.NODE_CALC_INTV;   /* to silence gcc warning */
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
    var oectmp=null;
    if ((iflag & Swe.SEFLG_SIDEREAL)!=0) {
      this.calc_epsilon(sip.t0, iflag, oectmp);
      oe = oectmp;
    } else if ((iflag & Swe.SEFLG_J2000)!=0) {
      oe = this.swed.oec2000;
    } else
      oe = this.swed.oec;

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
    this.swed.pldat[Swe.SwephData.SEI_MOON].teval = 0;
    if ((iflag & Swe.SEFLG_SPEED)!=0) {
      istart = 0;
    } else {
      istart = 2;
    }

    /*********************************************
     * node with speed                           *
     *********************************************/
    /* node is always needed, even if apogee is wanted */
    ndnp = this.swed.nddat[Swe.SwephData.SEI_TRUE_NODE];
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
    ndap = this.swed.nddat[Swe.SwephData.SEI_OSCU_APOG];
    Gmsm = Swe.SwephData.GEOGCONST * (1 + 1 / Swe.SwephData.EARTH_MOON_MRAT) /
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
        ndp = this.swed.nddat[Swe.SwephData.SEI_TRUE_NODE];
      } else {
        ndp = this.swed.nddat[Swe.SwephData.SEI_OSCU_APOG];
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
        this.sl.swi_precess(ndp.xreturn, 18, sip.t0, iflag, Swe.SwephData.J_TO_J2000);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.swi_precess_speed(ndp.xreturn, 21, sip.t0, iflag, Swe.SwephData.J_TO_J2000);
        }
        if ((iflag & Swe.SEFLG_J2000)==0) {
          /* to tjd */
          this.sl.swi_precess(ndp.xreturn, 18, tjd, iflag, Swe.SwephData.J2000_TO_J);
          if ((iflag & Swe.SEFLG_SPEED)!=0) {
            this.swi_precess_speed(ndp.xreturn, 21, tjd, iflag, Swe.SwephData.J2000_TO_J);
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
        /* node and apogee are referred to t;
         * the ecliptic position must be transformed to t0 */
        /* rigorous algorithm */
        if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_ECL_T0)!=0
          || (this.swed.sidd.sid_mode & Swe.SE_SIDBIT_SSY_PLANE)!=0) {
          for (i = 0; i <= 5; i++) {
            x[i] = ndp.xreturn[18+i];
          }
          /* remove nutation */
          if ((iflag & Swe.SEFLG_NONUT)==0) {
            this.swi_nutate(x, 0, iflag, true);
          }
          /* precess to J2000 */
          this.sl.swi_precess(x, tjd, iflag, Swe.SwephData.J_TO_J2000);
          if ((iflag & Swe.SEFLG_SPEED)!=0) {
            this.swi_precess_speed(x, tjd, iflag, Swe.SwephData.J_TO_J2000);
          }
          if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_ECL_T0)!=0) {
            this.swi_trop_ra2sid_lon(x, ndp.xreturn, 6, ndp.xreturn, 18, iflag,
                                null);
          /* project onto solar system equator */
          } else if ((this.swed.sidd.sid_mode & Swe.SE_SIDBIT_SSY_PLANE)!=0) {
            this.swi_trop_ra2sid_lon_sosy(x, ndp.xreturn, 6, ndp.xreturn, 18, iflag,
                                     null);
          }
          /* to polar */
          this.sl.swi_cartpol_sp(ndp.xreturn, 6, ndp.xreturn, 0);
          this.sl.swi_cartpol_sp(ndp.xreturn, 18, ndp.xreturn, 12);
        /* traditional algorithm;
         * this is a bit clumsy, but allows us to keep the
         * sidereal code together */
        } else {
          this.sl.swi_cartpol_sp(ndp.xreturn, 6, ndp.xreturn, 0);
          ndp.xreturn[0] -= this.swe_get_ayanamsa(ndp.teval) * SwissData.DEGTORAD;
          this.sl.swi_polcart_sp(ndp.xreturn, 0, ndp.xreturn, 6);
        }
      } else if ((iflag & Swe.SEFLG_J2000)!=0) {
        /* node and apogee are referred to t;
         * the ecliptic position must be transformed to J2000 */
        for (i = 0; i <= 5; i++) {
          x[i] = ndp.xreturn[18+i];
        }
        /* precess to J2000 */
        this.sl.swi_precess(x, tjd, iflag, Swe.SwephData.J_TO_J2000);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.swi_precess_speed(x, tjd, iflag, Swe.SwephData.J_TO_J2000);
        }
        for (i = 0; i <= 5; i++) {
          ndp.xreturn[18+i] = x[i];
        }
        this.sl.swi_cartpol_sp(ndp.xreturn, 18, ndp.xreturn, 12);
        this.sl.swi_coortrf2(ndp.xreturn, 18, ndp.xreturn, 6, swed.oec2000.seps,
                        swed.oec2000.ceps);
        if ((iflag & Swe.SEFLG_SPEED)!=0) {
          this.sl.swi_coortrf2(ndp.xreturn, 21, ndp.xreturn, 9, swed.oec2000.seps,
                          swed.oec2000.ceps);
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
    if (tjd < Swe.SwephData.MOSHLUEPH_START || tjd > Swe.SwephData.MOSHLUEPH_END) {
      var s = "jd "+tjd+" outside Moshier's Moon range "+
          Swe.SwephData.MOSHLUEPH_START+" .. "+
          Swe.SwephData.MOSHLUEPH_END+" ";
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
      dt = Math.sqrt(this.sl.square_sum(xx)) * Swe.AUNIT / Swe.SwephData.CLIGHT / 86400.0;     
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
      this.sl.swi_cartpol_sp(ndp.xreturn, 6, ndp.xreturn, 0); 
      ndp.xreturn[0] -= this.swe_get_ayanamsa(ndp.teval) * this.swed.DEGTORAD;
      this.sl.swi_polcart_sp(ndp.xreturn, 0, ndp.xreturn, 6); 
      this.sl.swi_cartpol_sp(ndp.xreturn, 18, ndp.xreturn, 12);
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
      this.sl.swi_precess(xx, tjd, iflag, Swe.SwephData.J2000_TO_J);
      this.sl.swi_precess(xx, 3, tjd, iflag, Swe.SwephData.J2000_TO_J);
      this.calc_epsilon(tjd, iflag, oectmp);
      oe = oectmp;
    } else if ((iflag & Swe.SEFLG_J2000)==0) {

      this.sl.swi_precess(xx, tjd, iflag, Swe.SwephData.J2000_TO_J);
      this.sl.swi_precess(xx, 3, tjd, iflag, Swe.SwephData.J2000_TO_J);
      /* epsilon */
      if (tjd == this.swed.oec.teps) {
        oe = this.swed.oec;
      } else if (tjd == Swe.SwephData.J2000) {
        oe = this.swed.oec2000;
      } else {
        this.calc_epsilon(tjd, iflag, oectmp);
        oe = oectmp;
      }

    } else {      /* if SEFLG_J2000 */
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
      } else if (tjd == Swe.SwephData.J2000) {
        nutp = this.swed.nut2000;
      } else if (tjd == this.swed.nutv.tnut) {
        nutp = this.swed.nutv;
      } else {
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
      xx[0] -= sip.ayan_t0;
      this.sl.swi_polcart_sp(xx, xx);
    } else

    if ((iflag & Swe.SEFLG_NONUT) == 0) {
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



  swi_check_ecliptic(tjd, iflag) {
    
    if (this.swed.oec2000.teps != Swe.SwephData.J2000) {
      this.calc_epsilon(Swe.SwephData.J2000, iflag, this.swed.oec2000);
    }
    if (tjd == Swe.SwephData.J2000) {
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
        t = tjd - Swe.SwephData.NUT_SPEED_INTV;
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
        || ipl == Swe.SE_INTP_APOG || ipl == Swe.SE_INTP_PERG) 
      iflag = iflag & ~(Swe.SEFLG_JPLHOR | Swe.SEFLG_JPLHOR_APPROX);
    if (ipl >= Swe.SE_FICT_OFFSET && ipl <= Swe.SE_FICT_MAX)
      iflag = iflag & ~(Swe.SEFLG_JPLHOR | Swe.SEFLG_JPLHOR_APPROX);
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

  swi_force_app_pos_etc() {
    var i;
    for (i = 0; i < Swe.SwephData.SEI_NPLANETS; i++) {
      this.swed.pldat[i].xflgs = -1;
    }
    for (i = 0; i < Swe.SwephData.SEI_NNODE_ETC; i++) {
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
    var f = Swe.SwephData.EARTH_OBLATENESS;
    var re = Swe.SwephData.EARTH_RADIUS;
    var cosfi, sinfi, cc, ss, cosl, sinl, h;
    if (!this.swed.geopos_is_set) {
      console.error("geographic position has not been set");
      return Swe.ERR;
    }
    delt = SweDate.getDeltaT(tjd);
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
    xobs[3] = Swe.SwephData.EARTH_ROT_SPEED;
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
    this.sl.swi_precess(xobs, tjd, iflag, Swe.SwephData.J_TO_J2000);
    if ((iflag & Swe.SEFLG_SPEED)!=0) {
      this.swi_precess_speed(xobs, tjd, iflag, Swe.SwephData.J_TO_J2000);
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
$pl = {};

$pl.swe = new SwissEph();
$pl.swe.init();

$pl.timezone = (function(){
  var dt = new Date();
  return dt.getTimezoneOffset() / -60;
})();

$pl.planets = {};
$pl.houses = {};
$pl.iflag = Swe.SEFLG_MOSEPH|Swe.SEFLG_SPEED;
$pl.julian_utc = 0;
$pl.longitude = 0;
$pl.latitude = 0;
$pl.house = "";

$pl.planetNames = {
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
  //MeanNode: Swe.SE_MEAN_NODE,
  //TrueNode: Swe.SE_TRUE_NODE,
  //Chiron: Swe.SE_CHIRON, 
  //Lilith: Swe.SE_MEAN_APOG,
  //Juno: Swe.SE_JUNO,
};

$pl.setTimezone = function(timezone){
  $pl.timezone = timezone;
}

$pl.setCurrentDate = function(){
  var date = new Date();
  $pl.setJsUtcDate(date);
}

$pl.setDate = function(year, month, day, hours, minutes, seconds, timezone){
  if($pl._func.isNull(timezone)) timezone = $pl.timezone;

  $pl.sd = new SweDate(
    parseInt(year),
    parseInt(month),
    parseInt(day),
    parseInt(hours) + parseInt(minutes) / 60 + parseFloat(seconds) / 3600 - parseFloat(timezone)
  );

  $pl.julian_utc = $pl.sd.getJulDay();
}

$pl.getJulDay = function(){
  return $pl.julian_utc;
}

$pl.setJulDay = function(newJD){
  $pl.julian_utc = newJD;
  $pl.sd.jd = newJD;
  $pl.sd.deltatIsValid = false;
  var dt = $pl.sd.swe_revjul(newJD, $pl.sd.calType);
  $pl.sd.year = dt.year;
  $pl.sd.month = dt.month;
  $pl.sd.day = dt.day;
  $pl.sd.hour = dt.hour;
}

$pl.setJsUtcDate = function(date){
  $pl.setDate(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    0
  );
}

$pl.getUtcDate = function(){
  var dt = new Date(
    $pl.sd.year,
    $pl.sd.month,
    $pl.sd.day,
    parseInt($pl.sd.hour),
    parseInt($pl.sd.hour % 1 * 60),
    $pl.sd.hour * 60 % 1 * 60,
    $pl.sd.hour * 60 % 1 * 60 % 1 * 1000,
  );

  var res = {
    year: dt.getFullYear(),
    month: dt.getMonth(),
    day: dt.getDate(),
    hour: dt.getHours(),
    minute: dt.getMinutes(),
    second: Math.round(dt.getSeconds() + dt.getMilliseconds() / 1000),
  }
  return res;
}

$pl.setGeoPosition = function(latitude, longitude){
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);
  if(latitude > -90 && latitude < 90) $pl.latitude = latitude;
  if(longitude > -180 && longitude < 180) $pl.longitude = longitude;
}

$pl.setHouseSystem = function(house){
  $pl.house = house;
}

$pl.getPositions = function(planet){
  $pl.planets = {};

  for(var planet in $pl.planetNames){
    //var planet = $pl.planetNames[i];
    $pl._func.getPosition(planet);
  }
  return $pl.planets;
}

$pl.getHouses = function(house){
  if($pl._func.isset(house)) $pl.house = house;

  var cusp = Array(13);
  var ascmc = Array(10);
  $pl.swe.swe_houses($pl.julian_utc,$pl.iflag, $pl.latitude, $pl.longitude, $pl.house, cusp, ascmc, 0);
  $pl.houses = cusp;
}

$pl._func = {
  isNull: function(val){
    if(val === null || val === undefined) return true;
    return false;
  },

  isset: function(val){
    if(val === null || val === undefined) return false;
    return true;
  },

  getPosition: function(planet){
    var ret = {};
    var ret_matrix = new Array(6);

    $pl.swe.calc($pl.julian_utc, $pl.planetNames[planet], $pl.iflag, ret_matrix);
    var longitude = ret_matrix[0];
    var latitude = ret_matrix[1];
    var distance = ret_matrix[2];
    var longitudeSpeed = ret_matrix[3];
    var latitudeSpeed = ret_matrix[4];
    var distanceSpeed = ret_matrix[5];

    $pl.planets[planet] = {
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

    return $pl.planets[planet];
  },
}

