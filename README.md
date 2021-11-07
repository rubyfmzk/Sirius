# Sirius.js is
Sirius.js is ephemeris calculator for Sun, Moon and Planets.  
This file is made from the Swiss Ephemeris Free Edition,  
Version 2.00.00 of Astrodienst AG, Switzerland  
from the original C Code to JAVA and JAVA to JavaScript.  

# Example
### Planets' position
```
$pl.setDate(year, month, day, hour, minute, second, timezone);
var planetPositions = $pl.getPositions();
```
### Houses
```
$pl.setGeoPosition(latitude, longitude);
var houses = $pl.getHouses(house);
```

# Demo
https://rubyfmzk.com/pluto/demo/

# License
GNU General Public License v2.0  
https://www.gnu.org/licenses/old-licenses/gpl-2.0.html

# Contributers
### original C Code
ASTRO DIENST  
https://www.astro.com/swisseph/   
### C Code to JAVA
Thomas Mack  
http://www.th-mack.de/international/download/
