var signs = [
    "Aries",
    "Tauros",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scopio",
    "Sagiterius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

calc();

function $_(id){
  return document.getElementById(id);
}

function calc(){
  var start_ms = new Date().getTime();

  $_("planet_result").innerHTML = "";
  $_("house_result").innerHTML = "";

  var year = $_("year").value;
  var month = $_("month").value;
  var day = $_("day").value;
  var hour = $_("hour").value;
  var minute = $_("minute").value;
  var timezone = $_("timezone").value;
  var latitude = $_("latitude").value;
  var longitude = $_("longitude").value;
  var sidereal_type = parseInt(document.querySelector(".sidereal_type:checked").value);
  var house = document.querySelector(".house_system:checked").value;

  if($_("siderial").checked){
    $pl.setSiderial(sidereal_type);
  }
  else{
    $pl.unsetSiderial();
  }

  if($_("heliocentric").checked){
    $pl.setHeliocentric();
  }
  else{
    $pl.unsetHeliocentric();
  }

  $pl.setDate(year, month, day, hour, minute, 0, timezone);
  var planets = $pl.getPlanets();

  $pl.setGeoPosition(latitude, longitude);
  var houses = $pl.getHouses(house);

  for(var planet in $pl.planetNames){
    var text = "";

    text += '<tr>';
    text += '<td>' + planet + '</td>';
    text += '<td>'+getDigit60(planets[planet].longitude);
    text += ' ('+(planets[planet].longitude).toFixed(6)+')</td>';
    text += '<td>'+getDigit60(planets[planet].longitudeSpeed);
    text += ' ('+(planets[planet].longitudeSpeed).toFixed(6)+')</td>';
    text += '<td>'+getDigit60(planets[planet].latitude);
    text += ' ('+(planets[planet].latitude).toFixed(6)+')</td>';
    text += '<td>'+getDigit60(planets[planet].latitudeSpeed);
    text += ' ('+(planets[planet].latitudeSpeed).toFixed(6)+')</td>';
    text += '<td>'+(planets[planet].distance).toFixed(6)+'</td>';
    text += '<td>'+(planets[planet].distanceSpeed).toFixed(6)+'</td>';
    text += "</tr>";

    $_("planet_result").innerHTML += text;
  } 


  for(var i=1; i<=12; i++){
    var text = "";

    text += '<tr>';
    text += '<td>House ' + i + '</td>';
    text += '<td>'+getDigit60(houses[i]);
    text += ' ('+houses[i].toFixed(6)+')</td>';
    text += "</tr>";

    $_("house_result").innerHTML += text;
  }

  $_("ayanamsha").innerHTML = $pl.getAyanamsha();

  let tret = new Array(10);
  let attr = new Array(20);
  let backward =　0;
  //let geopos = [148.8, 10.1, 0];
  let geopos_ = [135, 35, 0];
  let geopos = new Array(6);
  //let a = $pl.swe.swe_sol_eclipse_how(2457456.58216435, $pl.iflag, geopos, attr);
  //let z = $pl.swe.swe_sol_eclipse_when_loc($pl.getJulDay()+365.25*37+200, $pl.iflag, geopos_, tret, attr, 0);
  //let y = $pl.swe.swe_lun_occult_when_loc($pl.getJulDay()+365.25*37+200, 4, null, $pl.iflag, geopos_, tret, attr, 0);
  let y = $pl.swe.swe_lun_eclipse_when_loc($pl.getJulDay()+365.25*37+100, $pl.iflag, geopos_, tret, attr, 0);
//  let a = $pl.swe.swe_sol_eclipse_when_glob($pl.getJulDay()+365.25*37+200, $pl.iflag, 0, tret, backward);
  //let b = $pl.swe.swe_sol_eclipse_how(tret[0], $pl.iflag, geopos_, attr);
  //let c = $pl.swe.swe_sol_eclipse_where(tret[0], $pl.iflag, geopos, attr);
  //let a = $pl.swe.swe_fixstar('deLeo', $pl.getJulDay()+365.25*35, $pl.iflag, xx);

  let pheno = $pl.swe.swe_pheno($pl.getJulDay(), 4, $pl.iflag, attr);

  console.error($pl.getJulDay(), tret, attr, geopos);
  var elapsed_ms = new Date().getTime() - start_ms;
  console.log('seconds：' + elapsed_ms);
}

function getDigit60(degree){
  var minus = degree < 0 ? "-" : "";
  degree = Math.abs(degree);
  return minus + parseInt(degree) + "° " + parseInt(degree % 1 * 60) + "' " + (degree * 60 % 1 * 60 ).toFixed(4);
}