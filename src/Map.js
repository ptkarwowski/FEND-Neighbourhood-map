import React, { Component } from 'react';
import * as IdAPIFoursquare from './IdAPIFoursquare';

class GoogleMaps extends Component {
    state = {
        currentMap: {},
        markers: [],
        infoWindow: {}
    }

    componentWillMount() {
        let bodyEl = document.querySelector('body');
        let mapElement = document.createElement('div');
        mapElement.id = 'map';
        bodyEl.appendChild(mapElement);
        let scriptElement = document.createElement('script');
        scriptElement.async = true;
        scriptElement.defer = true;
        scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.myKey}&v=3&callback=initMap`;
        bodyEl.appendChild(scriptElement);
        window.initMap = this.initMap;
        document.head.append(scriptElement);
        scriptElement.onerror = function() {
        alert("Error loading " + this.src); 
          };
    }
    
    // Initializes the map,info window and all  markers
    initMap = () => {
        const mapWindow = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: this.props.home.lat, lng: this.props.home.lng },
            zoom: 10
        })
        
        const infoWindow = new window.google.maps.InfoWindow({
            maxWidth: 190
        });
        
        this.setState({infoWindow}, (() =>
            this.setState({currentMap: mapWindow}, ( () => {
                const locations = this.props.locations;
                const mainMap = this.state.currentMap
                const bounds = new window.google.maps.LatLngBounds();
                let markers = locations.map((pos, i) => {
                    const marker = new window.google.maps.Marker({
                        map: mainMap,
                        position: pos.location,
                        title: pos.name,
                        animation: window.google.maps.Animation.DROP,
                        id: pos.id
                    });
                    
                    bounds.extend(marker.position);
                    marker.addListener('click', () => {
                        this.populateInfoWindow(marker, infoWindow, mainMap);
                    });
                    return marker
                    
                })
                mainMap.fitBounds(bounds);
                this.setState({markers});
                
            }))
        ))
        
    }
    
    //Take the API data from Foursquare and populates the info window with data
    populateInfoWindow = (marker, infoWindow, mainMap) =>{
        infoWindow.setContent('Loading...');
        IdAPIFoursquare.getVenueDetails(marker.id)
            .then(venue => {
                const vDetails = venue.response.venue
                const infoContent = this.buildInfoWindowContent(vDetails);
                infoWindow.setContent(infoContent);
                infoWindow.open(mainMap, marker);
                
            })
            .catch(err => {
                infoWindow.setContent(`<div><span>Error while Getting Venue Details FourSquareService May Be un reachable or unavailable</span><p>Error: ${err}</p></div>`)
                infoWindow.open(mainMap, marker);
            })
    };

    // Created the data to the info content
    buildInfoWindowContent = (vDetails) => {
        let content = '<div class="info-window">'
        content += vDetails.name ? `<h3>${vDetails.name}</h3>` : '';
        content += vDetails.categories[0].name ? `<h4>${vDetails.categories[0].name}</h4>` : '';
        content += vDetails.description ? `<h5>${vDetails.description}</h5>` : '';
        content += vDetails.bestPhoto.prefix && vDetails.bestPhoto.suffix ? `<img src="${vDetails.bestPhoto.prefix}150x90${vDetails.bestPhoto.suffix}" alt="Restaurant image ${vDetails.name}" class="info-window-pic">` : '';
        content += '<p><ul>'
        content += vDetails.contact.formattedPhone && vDetails.hours.status ? `<li>Phone: ${vDetails.contact.formattedPhone} ${vDetails.hours.status}</li>` : '';
        content += vDetails.rating && vDetails.likes.summary ? `<li class="rating">Rating: ${vDetails.rating} with ${vDetails.likes.summary}</li>` : '';
        content += vDetails.menu && vDetails.price.message ? `<li><a href="${vDetails.menu.url}">Menu</a> Price: ${vDetails.price.message}</li>` : '';
        content += vDetails.canonicalUrl && vDetails.url ? `<li><a href="${vDetails.canonicalUrl}">Open on Foursquare</a>, <a href="${vDetails.url}>Home Page</a></li>` : '';
        content += '</p></ul></div>'
        return content;
    };
    //Adds or remove animation jump to a marker
    isSelected = (marker) => {
        const selectPos = this.props.currentMarker;
        const infoWindow = this.state.infoWindow;
        if(marker.id === selectPos.id){
        this.populateInfoWindow(marker, infoWindow, this.state.currentMap);
        setTimeout(() => { infoWindow.close(); }, 4000);
        return window.google.maps.Animation.BOUNCE
    }
    return null
};
    render() {
        const {filteredLocations} = this.props;
        const markers = this.state.markers
        let filteredMarkers = markers.filter(mark => {
            mark.setMap(null);
            return filteredLocations.some(pos => pos.id === mark.id)
        })

        return (
            <div>
                {
                    filteredMarkers.forEach( mark => {
                        mark.setAnimation(this.isSelected(mark));
                        mark.setMap(this.state.currentMap);
                    })
                }
            </div>
        );
        
    }
}

export default GoogleMaps
