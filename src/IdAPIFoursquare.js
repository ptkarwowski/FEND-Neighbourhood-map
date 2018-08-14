const ClientId = '2RDHAH4NVRHTCGFS2QMXDYHW3AJDAYYJ5SLIDDSRYWEHQAMW';
const ClientSecret = '10W4HZG3PSB1DDVQ3JRGJTY2Z0HWJK50FIJKSI4MDCTWLUU5';
const v = '20180806'

export const getVenueDetails = (venue) =>
    fetch(`https://api.foursquare.com/v2/venues/${venue}?client_id=${ClientId}&client_secret=${ClientSecret}&v=${v}`, {
        headers: {}
    })
    .then(response => response.json())
    .then(respo => respo)

export const getVenueLists = (venue) =>
    fetch(`https://api.foursquare.com/v2/venues/${venue}/listed?client_id=${ClientId}&client_secret=${ClientSecret}&v=${v}`, {
        headers: {}
    })
    .then(response => response.json())
    .then(respo => respo)