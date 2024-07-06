import React, { useState } from 'react';
import MyMap from './components/MyMap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Example list of international airports with coordinates
const airports = [

    { code: 'JFK', name: 'John F. Kennedy International Airport', coords: [-73.7781, 40.6413] },
    { code: 'LHR', name: 'London Heathrow Airport', coords: [-0.4543, 51.4700] },
    { code: 'DXB', name: 'Dubai International Airport', coords: [55.3644, 25.2532] },
    { code: 'NRT', name: 'Narita International Airport', coords: [140.3929, 35.7656] },
    { code: 'SYD', name: 'Sydney Kingsford Smith Airport', coords: [151.1772, -33.9399] },
    { code: 'CDG', name: 'Charles de Gaulle Airport', coords: [2.55, 49.0097] },
    { code: 'HND', name: 'Tokyo Haneda Airport', coords: [139.7798, 35.5494] },
    { code: 'LAX', name: 'Los Angeles International Airport', coords: [-118.4085, 33.9416] },
    { code: 'ORD', name: "O'Hare International Airport", coords: [-87.9048, 41.9742] },
    { code: 'FRA', name: 'Frankfurt Airport', coords: [8.5706, 50.0333] },
    { code: 'SIN', name: 'Singapore Changi Airport', coords: [103.9915, 1.3644] },
    { code: 'PEK', name: 'Beijing Capital International Airport', coords: [116.5871, 40.0799] },
    { code: 'AMS', name: 'Amsterdam Airport Schiphol', coords: [4.7634, 52.3091] },
    { code: 'IST', name: 'Istanbul Airport', coords: [28.8146, 41.2757] },
    { code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport', coords: [-3.5699, 40.4719] },
    { code: 'ICN', name: 'Incheon International Airport', coords: [126.4505, 37.4692] },
    { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', coords: [-84.4277, 33.6407] },
    { code: 'CAN', name: 'Guangzhou Baiyun International Airport', coords: [113.3051, 23.3924] },
    { code: 'DFW', name: 'Dallas/Fort Worth International Airport', coords: [-97.0372, 32.8975] },
    { code: 'DEN', name: 'Denver International Airport', coords: [-104.6732, 39.8561] },
    { code: 'CLT', name: 'Charlotte Douglas International Airport', coords: [-80.9431, 35.2140] },
    { code: 'ABE', name: 'Lehigh Valley International Airport', coords: [40.65236, -75.44040] },
    { code: 'ABI', name: 'Abilene Regional Airport', coords: [32.41132, -99.68190] },
    { code: 'ABQ', name: 'Albuquerque International Sunport', coords: [35.04022, -106.60919] },
    { code: 'ABR', name: 'Aberdeen Regional Airport', coords: [45.44906, -98.42183] },
    { code: 'ABY', name: 'Southwest Georgia Regional Airport', coords: [31.53552, -84.19447] },
    { code: 'ACK', name: 'Nantucket Memorial Airport', coords: [41.25305, -70.06018] },
    { code: 'ACT', name: 'Waco Regional Airport', coords: [31.61129, -97.23052] },
    { code: 'ACV', name: 'Arcata Airport', coords: [40.97812, -124.10862] },
    { code: 'ACY', name: 'Atlantic City International Airport', coords: [39.45758, -74.57717] },
    { code: 'ADK', name: 'Adak Airport', coords: [51.87796, -176.64603] },
    { code: 'ADQ', name: 'Kodiak Airport', coords: [57.74997, -152.49386] },
    { code: 'AEX', name: 'Alexandria International Airport', coords: [31.32737, -92.54856] },
    { code: 'AGS', name: 'Augusta Regional Airport (Bush Field)', coords: [33.36996, -81.96450] },
    { code: 'AKN', name: 'King Salmon Airport', coords: [58.67680, -156.64922] },
    { code: 'ALB', name: 'Albany International Airport', coords: [42.74812, -73.80298] },
    { code: 'ALO', name: 'Waterloo Regional Airport', coords: [42.55708, -92.40034] },
    { code: 'AMA', name: 'Rick Husband Amarillo International Airport', coords: [35.21937, -101.70593] },
    { code: 'ANC', name: 'Ted Stevens Anchorage International Airport', coords: [61.17432, -149.99619] },
    { code: 'APN', name: 'Alpena County Regional Airport', coords: [45.07807, -83.56029] },
    { code: 'ASE', name: 'Aspen-Pitkin County Airport', coords: [39.22316, -106.86885] },
    { code: 'ATW', name: 'Appleton International Airport', coords: [44.25741, -88.51948] },
    { code: 'AUS', name: 'Austin-Bergstrom International Airport', coords: [30.19453, -97.66987] },
    { code: 'AVL', name: 'Asheville Regional Airport', coords: [35.43619, -82.54181] },
    { code: 'AVP', name: 'Wilkes-Barre/Scranton International Airport', coords: [41.33815, -75.72427] },
    { code: 'AZO', name: 'Kalamazoo/Battle Creek International Airport', coords: [42.23488, -85.55206] },
    { code: 'BDL', name: 'Bradley International Airport', coords: [41.93887, -72.68323] },
    { code: 'BET', name: 'Bethel Airport', coords: [60.77978, -161.83800] },
    { code: 'BFL', name: 'Meadows Field', coords: [35.43360, -119.05677] },
    { code: 'BGM', name: 'Greater Binghamton Airport', coords: [42.20848, -75.97961] },
    { code: 'BGR', name: 'Bangor International Airport', coords: [44.80744, -68.82814] },
    { code: 'BHM', name: 'Birmingham-Shuttlesworth International Airport', coords: [33.56294, -86.75355] },
    { code: 'BIL', name: 'Billings Logan International Airport', coords: [45.80766, -108.54286] },
    { code: 'BIS', name: 'Bismarck Municipal Airport', coords: [46.77411, -100.74672] },
    { code: 'BJI', name: 'Bemidji Regional Airport', coords: [47.50942, -94.93372] },
    { code: 'BLI', name: 'Bellingham International Airport', coords: [48.79275, -122.53753] },
    { code: 'BMI', name: 'Central Illinois Regional Airport at Bloomington-Normal', coords: [40.47799, -88.91595] },
    { code: 'BNA', name: 'Nashville International Airport', coords: [36.12448, -86.67818] },
    { code: 'BOI', name: 'Boise Airport (Boise Air Terminal)', coords: [43.56444, -116.22278] },
    { code: 'BOS', name: 'Gen. Edward Lawrence Logan International Airport', coords: [42.36435, -71.00518] },
    { code: 'BPT', name: 'Jack Brooks Regional Airport (Southeast Texas Regional)', coords: [29.95083, -94.02069] },
    { code: 'BQK', name: 'Brunswick Golden Isles Airport', coords: [31.25903, -81.46631] },
    { code: 'BQN', name: 'Rafael Hernández Airport', coords: [18.49486, -67.12944] },
    { code: 'BRD', name: 'Brainerd Lakes Regional Airport', coords: [46.39833, -94.13767] },
    { code: 'BRO', name: 'Brownsville/South Padre Island International Airport', coords: [25.90694, -97.42694] },
    { code: 'BRW', name: 'Wiley Post-Will Rogers Memorial Airport', coords: [71.28545, -156.77507] },
    { code: 'BTM', name: 'Bert Mooney Airport', coords: [45.95481, -112.49739] },
    { code: 'BTR', name: 'Baton Rouge Metropolitan Airport', coords: [30.53285, -91.14965] },
    { code: 'BTV', name: 'Burlington International Airport', coords: [44.47186, -73.15333] },
    { code: 'BUF', name: 'Buffalo Niagara International Airport', coords: [42.94053, -78.73587] },
    { code: 'BUR', name: 'Hollywood Burbank Airport (Bob Hope Airport)', coords: [34.20062, -118.35850] },
    { code: 'BWI', name: 'Baltimore/Washington International Thurgood Marshall Airport', coords: [39.17997, -76.66867] },
    { code: 'BZN', name: 'Bozeman Yellowstone International Airport', coords: [45.77591, -111.15367] },
    { code: 'CAE', name: 'Columbia Metropolitan Airport', coords: [33.93887, -81.11954] },
    { code: 'CAK', name: 'Akron-Canton Airport', coords: [40.91404, -81.44045] },
    { code: 'CDV', name: 'Merle K. (Mudhole) Smith Airport', coords: [60.49382, -145.47765] },
    { code: 'CEC', name: 'Del Norte County Airport', coords: [41.78008, -124.23653] },
    { code: 'CHA', name: 'Chattanooga Metropolitan Airport (Lovell Field)', coords: [35.03736, -85.19660] },
    { code: 'CHO', name: 'Charlottesville-Albemarle Airport', coords: [38.13864, -78.45286] },
    { code: 'CHS', name: 'Charleston International Airport/Charleston AFB', coords: [32.88535, -80.03510] },
    { code: 'CID', name: 'The Eastern Iowa Airport (Cedar Rapids Airport)', coords: [41.88953, -91.70009] },
    { code: 'CLD', name: 'McClellan-Palomar Airport', coords: [33.12670, -117.27898] },
    { code: 'CLE', name: 'Cleveland Hopkins International Airport', coords: [41.41068, -81.83752] },
    { code: 'CLL', name: 'Easterwood Airport (Easterwood Field)', coords: [30.59237, -96.36382] },
    { code: 'CMH', name: 'John Glenn Columbus International Airport', coords: [39.99800, -82.89188] },
    { code: 'CMI', name: 'University of Illinois Willard Airport', coords: [40.03922, -88.27543] },
    { code: 'CMX', name: 'Houghton County Memorial Airport', coords: [47.16717, -88.48907] },
    { code: 'COS', name: 'Colorado Springs Airport', coords: [38.80581, -104.70099] },
    { code: 'COU', name: 'Columbia Regional Airport', coords: [38.81704, -92.21838] },
    { code: 'CPR', name: 'Casper-Natrona County International Airport', coords: [42.90507, -106.46124] },
    { code: 'CRP', name: 'Corpus Christi International Airport', coords: [27.77474, -97.50266] },
    { code: 'CRW', name: 'Yeager Airport', coords: [38.37315, -81.59333] },
    { code: 'CSG', name: 'Columbus Metropolitan Airport', coords: [32.51634, -84.93888] },
    { code: 'CVG', name: 'Cincinnati/Northern Kentucky International Airport', coords: [39.05528, -84.66111] },
    { code: 'CWA', name: 'Central Wisconsin Airport', coords: [44.78150, -89.67400] },
    { code: 'DAB', name: 'Daytona Beach International Airport', coords: [29.18418, -81.05618] },
    { code: 'DAL', name: 'Dallas Love Field', coords: [32.84722, -96.85194] },
    { code: 'DAY', name: 'Dayton International Airport', coords: [39.90236, -84.21937] },
    { code: 'DBQ', name: 'Dubuque Regional Airport', coords: [42.40208, -90.70947] },
    { code: 'DCA', name: 'Ronald Reagan Washington National Airport', coords: [38.85208, -77.03772] },
    { code: 'DEN', name: 'Denver International Airport', coords: [39.8561, -104.6732] },
    { code: 'DFW', name: 'Dallas/Fort Worth International Airport', coords: [32.8975, -97.0372] },
    { code: 'DLH', name: 'Duluth International Airport', coords: [46.8421, -92.1936] },
    { code: 'DSM', name: 'Des Moines International Airport', coords: [41.5339, -93.6581] },
    { code: 'DTW', name: 'Detroit Metropolitan Wayne County Airport', coords: [42.2123, -83.3534] },
    { code: 'DVL', name: 'Devils Lake Regional Airport', coords: [48.1126, -98.9086] },
    { code: 'EAU', name: 'Chippewa Valley Regional Airport', coords: [44.8658, -91.4846] },
    { code: 'ECP', name: 'Northwest Florida Beaches International Airport', coords: [30.3583, -85.7956] },
    { code: 'EGE', name: 'Eagle County Regional Airport', coords: [39.6425, -106.9154] },
    { code: 'EKO', name: 'Elko Regional Airport', coords: [40.8244, -115.7910] },
    { code: 'ELM', name: 'Elmira/Corning Regional Airport', coords: [42.1594, -76.8916] },
    { code: 'ELP', name: 'El Paso International Airport', coords: [31.7988, -106.3967] },
    { code: 'ERI', name: 'Erie International Airport (Tom Ridge Field)', coords: [42.0817, -80.1763] },
    { code: 'EUG', name: 'Eugene Airport (Mahlon Sweet Field)', coords: [44.1197, -123.2146] },
    { code: 'EVV', name: 'Evansville Regional Airport', coords: [38.0382, -87.5320] },
    { code: 'EWN', name: 'Coastal Carolina Regional Airport', coords: [35.0737, -77.0420] },
    { code: 'EWR', name: 'Newark Liberty International Airport', coords: [40.6895, -74.1745] },
    { code: 'EYW', name: 'Key West International Airport', coords: [24.5567, -81.7581] },
    { code: 'FAI', name: 'Fairbanks International Airport', coords: [64.8158, -147.8563] },
    { code: 'FAR', name: 'Hector International Airport', coords: [46.9205, -96.8158] },
    { code: 'FAT', name: 'Fresno Yosemite International Airport', coords: [36.7762, -119.7181] },
    { code: 'FAY', name: 'Fayetteville Regional Airport (Grannis Field)', coords: [34.9912, -78.8804] },
    { code: 'FCA', name: 'Glacier Park International Airport', coords: [48.3093, -114.2556] },
    { code: 'FLG', name: 'Flagstaff Pulliam Airport', coords: [35.1385, -111.6747] },
    { code: 'FLL', name: 'Fort Lauderdale-Hollywood International Airport', coords: [26.0722, -80.1528] },
    { code: 'FNT', name: 'Bishop International Airport',coords: [42.9736, -83.7374] },
    { code: 'FSD', name: 'Sioux Falls Regional Airport (Joe Foss Field)', coords: [43.5785, -96.7413] },
    { code: 'FSM', name: 'Fort Smith Regional Airport', coords: [35.3366, -94.3665] },
    { code: 'FWA', name: 'Fort Wayne International Airport', coords: [40.9784, -85.1964] },
    { code: 'GCK', name: 'Garden City Regional Airport', coords: [37.9277, -100.7244] },
    { code: 'GEG', name: 'Spokane International Airport', coords: [47.6205, -117.5338] },
    { code: 'GFK', name: 'Grand Forks International Airport', coords: [47.9470, -97.1753] },
    { code: 'GGG', name: 'East Texas Regional Airport', coords: [32.3846, -94.7111] },
    { code: 'GJT', name: 'Grand Junction Regional Airport (Walker Field)', coords: [39.1232, -108.5292] },
    { code: 'GNV', name: 'Gainesville Regional Airport', coords: [29.6900, -82.2717] },
    { code: 'GPT', name: 'Gulfport-Biloxi International Airport', coords: [30.4119, -89.0817] },
    { code: 'GRB', name: 'Austin Straubel International Airport', coords: [44.4851, -88.1295] },
    { code: 'GRI', name: 'Central Nebraska Regional Airport', coords: [40.9693, -98.3101] },
    { code: 'GRK', name: 'Killeen-Fort Hood Regional Airport / Robert Gray Army Airfield', coords: [31.0618, -97.8289] },
    { code: 'GRR', name: 'Gerald R. Ford International Airport', coords: [42.8809, -85.5222] },
    { code: 'GSO', name: 'Piedmont Triad International Airport', coords: [36.1001, -79.9415] },
    { code: 'GSP', name: 'Greenville-Spartanburg International Airport (Roger Milliken Field)', coords: [34.8968, -82.2172] },
    { code: 'GST', name: 'Gustavus Airport', coords: [58.4253, -135.7075] },
    { code: 'GTF', name: 'Great Falls International Airport', coords: [47.4827, -111.3700] },
    { code: 'GTR', name: 'Golden Triangle Regional Airport', coords: [33.4503, -88.5914] },
    { code: 'GUC', name: 'Gunnison-Crested Butte Regional Airport', coords: [38.5333, -106.9320] },
    { code: 'GUM', name: 'Antonio B. Won Pat International Airport', coords: [13.4834, 144.7975] },
    { code: 'HDN', name: 'Yampa Valley Airport', coords: [40.4817, -107.2175] },
    { code: 'HIB', name: 'Range Regional Airport', coords: [47.3866, -92.8381] },
    { code: 'HLN', name: 'Helena Regional Airport', coords: [46.6073, -111.9825] },
    { code: 'HNL', name: 'Daniel K. Inouye International Airport', coords: [21.3187, -157.9225] },
    { code: 'HOB', name: 'Lea County Regional Airport', coords: [32.6871, -103.2179] },
    { code: 'HOU', name: 'William P. Hobby Airport', coords: [29.6454, -95.2788] },
    { code: 'HPN', name: 'Westchester County Airport', coords: [41.0681, -73.7076] },
    { code: 'HSV', name: 'Huntsville International Airport (Carl T. Jones Field)', coords: [34.6405, -86.7751] },
    { code: 'HTS', name: 'Tri-State Airport (Milton J. Ferguson Field)', coords: [38.3657, -82.5543] },
    { code: 'HVN', name: 'Tweed New Haven Airport', coords: [41.2637, -72.8867] },
    { code: 'HYS', name: 'Hays Regional Airport', coords: [38.8474, -99.2730] },
    { code: 'IAD', name: 'Washington Dulles International Airport', coords: [38.9556, -77.4484] },
    { code: 'IAH', name: 'George Bush Intercontinental Airport', coords: [29.9844, -95.3414] },
    { code: 'ICT', name: 'Wichita Dwight D. Eisenhower National Airport', coords: [37.6486, -97.4333] },
    { code: 'IDA', name: 'Idaho Falls Regional Airport', coords: [43.5175, -112.0708] },
    { code: 'ILG', name: 'New Castle Airport', coords: [39.6787, -75.6065] },
    { code: 'ILM', name: 'Wilmington International Airport', coords: [34.2673, -77.9105] },
    { code: 'IND', name: 'Indianapolis International Airport', coords: [39.7173, -86.2943] },
    { code: 'INL', name: 'Falls International Airport', coords: [48.5662, -93.4031] },
    { code: 'ISN', name: 'Sloulin Field International Airport', coords: [48.1788, -103.6403] },
    { code: 'ISP', name: 'Long Island MacArthur Airport', coords: [40.7932, -73.1006] },
    { code: 'ITO', name: 'Hilo International Airport', coords: [19.7190, -155.0485] },
    { code: 'JAC', name: 'Jackson Hole Airport', coords: [43.6075, -110.7378] },
    { code: 'JAN', name: 'Jackson-Medgar Wiley Evers International Airport', coords: [32.3131, -90.0759] },
    { code: 'JAX', name: 'Jacksonville International Airport', coords: [30.4856, -81.6993] },
    { code: 'JFK', name: 'John F. Kennedy International Airport', coords: [40.6423, -73.7762] },
    { code: 'JLN', name: 'Joplin Regional Airport', coords: [37.1493, -94.4983] },
    { code: 'JMS', name: 'Jamestown Regional Airport', coords: [46.9301, -98.6789] },
    { code: 'JNU', name: 'Juneau International Airport', coords: [58.3548, -134.5763] },
    { code: 'KOA', name: 'Ellison Onizuka Kona International Airport at Keahole', coords: [19.7370, -156.0436] },
    { code: 'KTN', name: 'Ketchikan International Airport', coords: [55.3561, -131.7111] },
    { code: 'LAN', name: 'Capital Region International Airport', coords: [42.7741, -84.5874] },
    { code: 'LAS', name: 'McCarran International Airport', coords: [36.0850, -115.1492] },
    { code: 'LAW', name: 'Lawton-Fort Sill Regional Airport', coords: [34.5690, -98.4162] },
    { code: 'LAX', name: 'Los Angeles International Airport', coords: [33.9416, -118.4085] },
    { code: 'LBB', name: 'Lubbock Preston Smith International Airport', coords: [33.6540, -101.8220] },
    { code: 'LBE', name: 'Arnold Palmer Regional Airport', coords: [40.2759, -79.4003] },
    { code: 'LCH', name: 'Lake Charles Regional Airport', coords: [30.1264, -93.2235] },
    { code: 'LCK', name: 'Rickenbacker International Airport', coords: [39.8135, -82.9278] },
    { code: 'LEX', name: 'Blue Grass Airport', coords: [38.0368, -84.6041] },
    { code: 'LFT', name: 'Lafayette Regional Airport', coords: [30.2086, -91.9931] },
    { code: 'LGA', name: 'LaGuardia Airport', coords: [40.7769, -73.8740] },
    { code: 'LGB', name: 'Long Beach Airport', coords: [33.8165, -118.1533] },
    
];

const App = () => {
  const [startAirport, setStartAirport] = useState(null);
  const [endAirport, setEndAirport] = useState(null);

  const handleAirportChange = (e, setAirport) => {
    const selectedAirport = airports.find(airport => airport.code === e.target.value);
    setAirport(selectedAirport);
  };

  return (
    <div className="container-fluid" style={{ width: '100vw', height: '100vh' }}>
      <div className="row justify-content-center mt-3">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="startAirport">Start Airport:</label>
            <select className="form-control" id="startAirport" onChange={(e) => handleAirportChange(e, setStartAirport)}>
              <option value="">Select an airport</option>
              {airports.map(airport => (
                <option key={airport.code} value={airport.code}>{airport.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="endAirport">End Airport:</label>
            <select className="form-control" id="endAirport" onChange={(e) => handleAirportChange(e, setEndAirport)}>
              <option value="">Select an airport</option>
              {airports.map(airport => (
                <option key={airport.code} value={airport.code}>{airport.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {startAirport && endAirport && (
        <MyMap
          route={{
            start: startAirport.coords,
            end: endAirport.coords,
          }}
          airports={airports} // Pass airports array as prop to MyMap
        />
      )}
    </div>
  );
};

export default App;
