import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler'

const SearchBar = (props) => {
    const {locations, filteredLocations, currentMarker, selectLocation, queryUpdate} = props; 
    let place = filteredLocations === [] ? locations : filteredLocations;   
    
    return (
        <section className="filter-box">
				<form
					className="filter-form"
				>
					
					<input
						className="filter-input"
						type="text"
						placeholder="Search Restaurant...."
						
                    onChange={event => queryUpdate(event.target.value)}
            	/>
				</form>
            <ul>
                {
                    place.map((location, index) => {
                        const isSelected = (location.id === currentMarker.id ? 'row-selected' : '');
                        return (
                            <li 
                                key={index} 
                                onClick={ () => selectLocation(location)}
                                onKeyDown={(event) => event.keyCode !== 13 || selectLocation(location)}
                                className={isSelected}
                                tabIndex={0}
                            >
                                <span>{location.name}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    );
}

export default SearchBar;
