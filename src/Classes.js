export class IntObj{
  constructor(val){
    this.val = val;
    if(val === undefined) this.val = 0;
  }
};

export class DblObj{
  constructor(val){
    this.val = val;
    if(val === undefined) this.val = 0.0;
  }
};

export class Epsilon{
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

export class FileData{
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

export class IDate{
  constructor(){
    this.year;
    this.month;
    this.day;
    this.hour;
  }
}

export class MeffEle{
  constructor(r, m){
    this.r = r;
    this.m = m;
  }
};

export class Nut{
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

export class Plantbl{
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
export class PlanData{
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

export class SarosData{
  constructor(series_no, tstart){
    this.series_no = series_no;
    this.tstart = tstart;
  }
};


export class SavePositions{
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

export class SidData{
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

export class TopoData{
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

export class Houses{
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

