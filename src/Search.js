import React from 'react';

const Search = (props) => {
    const {locations, filteredLocations, currentMarker, selectLocation, queryUpdate} = props; 
    let locs = filteredLocations === [] ? locations : filteredLocations;   
    
    return (
        <section className="filter-box">
				<form
					className="filter-form"
					onSubmit={(event) => event.preventDefault()}
				>
					<button
						className="list-btn"
						onClick={() => this.toggleDisplayedList()}
					>List</button>
					<input
						className="filter-input"
						type="text"
						placeholder="Filter locations..."
						value={0}
                    onChange={event => queryUpdate(event.target.value)}/>
            	/>
				</form>
            <ul>
                {
                    locs.map((location, index) => {
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

export default Search;