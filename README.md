# Sirius.js is
Sirius.js is ephemeris calculator for Sun, Moon and Planets.  
This file is made from the Swiss Ephemeris Free Edition,  
Version 2.00.00 of Astrodienst AG, Switzerland  
from the original C Code to JAVA and JAVA to JavaScript.  

# Example
### Planets' position
```
const sirius = new Sirius()
sirius.set_datetime(year, month, day, hour, minute, timezone)
const planet_positions = sirius.get_planets()
```
### Houses
```
sirius.set_geo_position(latitude, longitude)
const houses = sirius.get_houses(house)
```

# Demo
dist/index.html

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
