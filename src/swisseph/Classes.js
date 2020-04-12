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
