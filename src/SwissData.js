import { Swe } from "./Swe"
import { SwephData } from "./SwephData"
import { Epsilon, Nut, TopoData, SidData, FileData, PlanData, SavePositions } from "./Classes"

export const SwissData = {
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
      SwephData.SEI_SUN,
      SwephData.SEI_MOON,
      SwephData.SEI_MERCURY,
      SwephData.SEI_VENUS,
      SwephData.SEI_MARS,
      SwephData.SEI_JUPITER,
      SwephData.SEI_SATURN,
      SwephData.SEI_URANUS,
      SwephData.SEI_NEPTUNE,
      SwephData.SEI_PLUTO,
      0, 0, 0, 0,
      SwephData.SEI_EARTH,
      SwephData.SEI_CHIRON,
      SwephData.SEI_PHOLUS,
      SwephData.SEI_CERES,
      SwephData.SEI_PALLAS,
      SwephData.SEI_JUNO,
      SwephData.SEI_VESTA
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

    fidat : new Array(SwephData.SEI_NEPHFILES),
    gcdat :  null,
    //pldat : (new Array(SwephData.SEI_NPLANETS)).fill(new PlanData),
    pldat : new Array(SwephData.SEI_NPLANETS),
    nddat : new Array(SwephData.SEI_NNODE_ETC),
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
    astro_models : new Array(SwephData.SEI_NMODELS),
    timeout : 0,
};

for(var i=0; i<SwissData.fidat.length; i++){SwissData.fidat[i] = new FileData }
for(var i=0; i<SwissData.pldat.length; i++){SwissData.pldat[i] = new PlanData }
for(var i=0; i<SwissData.nddat.length; i++){SwissData.nddat[i] = new PlanData }
for(var i=0; i<SwissData.savedat.length; i++){SwissData.savedat[i] = new SavePositions }

