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
