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

   For any questions or comments regarding this port to Java, you should
   ONLY contact me and not Astrodienst, as the Astrodienst AG is not involved
   in this port in any way.

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
/* start */
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
