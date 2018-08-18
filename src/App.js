import React from 'react';
import './App.css';
import Map from './Map';
import SearchBar from './SearchBar';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state.locations = [

      { name: 'The Elysee Restaurant and Roof Garden', id: '4ac518caf964a520bda520e3', location: {lat: 51.51827036363987, lng: -0.1329544186592102} },
      { name: 'Mahdi Restaurant', id: '4bdf03b6c3392d7ff1e39bd5', location: {lat: 51.49291727471048, lng: -0.23509582621175504} },
      { name: 'Zuma Restaurant', id: '4ac518bff964a5202da320e3', location: {lat: 51.501061172224645, lng: -0.16313086296648005} },
      { name: 'Society Bar & Restaurant', id: '4ec8a140e30071991683c0ef', location: {lat: 51.496390055467586, lng: -0.20688094664719545} },
      { name: 'Gola restaurant', id: '4be2a73f99feb7138fe781f6', location: {lat: 51.47624838213826 , lng: -0.2046435891891829} },
      { name: 'Colbeh Restaurant', id: '4b69ead9f964a52007bc2be3', location: {lat: 51.514797985232526 , lng: -0.16514838878436164} },
      { name: 'Bills Restaurant', id: '5001b8e6e4b05e79b0b3b84d', location: {lat: 51.51183377093123 , lng: -0.13508045829141016} },
      { name: 'Al Hamra Restaurant', id: '4beb16d2183895212eed0acf', location: {lat: 51.506434359335465 , lng: -0.14714163481880016} },
      
    ];

    this.state.filteredLocations = this.state.locations;
    // Detecting internet connection and send alert
    let isOnline = window.navigator.onLine;
    if (isOnline) {
      console.log('internet online');
    } else {
      alert("Google Map error. There is no internet connetion");
    }
  }

  state = {
    locations: [],
    filteredLocations: [],
    currentMarker: '',
    highlightedIcon: null,
  }
// Adds or remove the state of current markers
currentMarker = (location) => {
    if (location.id === this.state.currentMarker.id) {
      this.setState({
        currentMarker: ''
      });
    } else {
      this.setState({currentMarker: location});
      
  }
}
// Filter the list and update filtered location
queryUpdate = (value) => {
  this.setState(currentState => {
    let filteredLocations = [];
    const curLocations = currentState.locations;
    if(value !== '') {
      filteredLocations = curLocations.filter(pos => {
        return pos.name.toLowerCase().includes(value.toLowerCase());
      })
    } else {
      filteredLocations = curLocations;
    }
    return({filteredLocations});
  });
  
}
toggleHide = () => {
  const list = document.querySelector('.filter-box');
  list.classList.toggle('hidden');
  const map = document.querySelector('#map');
  map.classList.toggle('full');
}
// Set up hamburger button, main title,  map, search bar
render() {
    return (
      
      <div>

          <div className='header'>
                    <a id="menu" className="burger" role="button" onClick={() => this.toggleHide()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
                        </svg>
                    </a>

                    <div className='title'>
                        <h1>London Restaurant</h1>
                    </div>

            </div>
        <Map
            locations={this.state.locations}
            filteredLocations={this.state.filteredLocations}
            currentMarker={this.state.currentMarker}
            myKey={'AIzaSyCd4edZm7nUOXGYirdXP-DtSE0qU6UELms'}
            home={{ lat: 51.4833148, lng: -0.2171193 }}
          />
          <SearchBar
            locations={this.state.locations}
            filteredLocations={this.state.filteredLocations}
            currentMarker={this.state.currentMarker}
            selectLocation={this.currentMarker}
            queryUpdate={this.queryUpdate}
          />

      </div>
    );
  }
  
};
export default App;