import React, { useState, useEffect } from 'react';

const Hostel = () => {
  const locations = ["All", "Hyderabad", "Bangalore", "Mumbai", "Delhi"];

  const initialHostels = [
    { name: "hostel1", description: "Cozy place in Hyderabad", Rating: 4.5, cost: 15, location: "Hyderabad", image: "https://picsum.photos/200/150?random=1" },
    { name: "hostel2", description: "Affordable stay in Bangalore", Rating: 3.0, cost: 10, location: "Bangalore", image: "https://picsum.photos/200/150?random=2" },
    { name: "hostel3", description: "Luxury living in Mumbai", Rating: 4.0, cost: 25, location: "Mumbai", image: "https://picsum.photos/200/150?random=3" },
    { name: "hostel4", description: "Quiet place in Delhi", Rating: 3.5, cost: 12, location: "Delhi", image: "https://picsum.photos/200/150?random=4" },
    { name: "hostel5", description: "Charming spot in Hyderabad", Rating: 4.8, cost: 20, location: "Hyderabad", image: "https://picsum.photos/200/150?random=5" },
    { name: "hostel6", description: "Budget-friendly in Bangalore", Rating: 2.5, cost: 7, location: "Bangalore", image: "https://picsum.photos/200/150?random=6" },
    { name: "hostel7", description: "Modern hostel in Mumbai", Rating: 3.8, cost: 18, location: "Mumbai", image: "https://picsum.photos/200/150?random=7" },
    { name: "hostel8", description: "Traditional style in Delhi", Rating: 4.1, cost: 22, location: "Delhi", image: "https://picsum.photos/200/150?random=8" },
    { name: "hostel9", description: "Chic stay in Hyderabad", Rating: 4.3, cost: 17, location: "Hyderabad", image: "https://picsum.photos/200/150?random=9" },
    { name: "hostel10", description: "Comfy and affordable in Bangalore", Rating: 3.2, cost: 9, location: "Bangalore", image: "https://picsum.photos/200/150?random=10" },
    { name: "hostel11", description: "Stylish hostel in Mumbai", Rating: 3.9, cost: 16, location: "Mumbai", image: "https://picsum.photos/200/150?random=11" },
    { name: "hostel12", description: "Quiet and peaceful in Delhi", Rating: 4.7, cost: 21, location: "Delhi", image: "https://picsum.photos/200/150?random=12" },
    { name: "hostel13", description: "Comfortable spot in Hyderabad", Rating: 3.6, cost: 13, location: "Hyderabad", image: "https://picsum.photos/200/150?random=13" },
    { name: "hostel14", description: "Central location in Bangalore", Rating: 4.4, cost: 19, location: "Bangalore", image: "https://picsum.photos/200/150?random=14" }
  ];

  const [hostel, setHostel] = useState(initialHostels);
  const [sortedFilteredHostels, setSortedFilteredHostels] = useState(initialHostels);
  const [filters, setFilters] = useState({
    ratingLowToHigh: false,
    ratingHighToLow: false,
    priceLowToHigh: false,
    priceHighToLow: false
  });
  const [selectedLocation, setSelectedLocation] = useState('All');

  useEffect(() => {
    let filteredHostels = [...hostel];

    // Filter by selected location
    if (selectedLocation !== 'All') {
      filteredHostels = filteredHostels.filter(h => h.location === selectedLocation);
    }

    // Apply sorting based on checkboxes
    if (filters.ratingLowToHigh) {
      filteredHostels.sort((a, b) => a.Rating - b.Rating);
    } else if (filters.ratingHighToLow) {
      filteredHostels.sort((a, b) => b.Rating - a.Rating);
    } else if (filters.priceLowToHigh) {
      filteredHostels.sort((a, b) => a.cost - b.cost);
    } else if (filters.priceHighToLow) {
      filteredHostels.sort((a, b) => b.cost - a.cost);
    }

    setSortedFilteredHostels(filteredHostels);
  }, [filters, selectedLocation]);

  const handleSortChange = (event) => {
    const { name, checked } = event.target;

    // Ensure only one sorting filter is active
    setFilters(prevFilters => ({
      ratingLowToHigh: false,
      ratingHighToLow: false,
      priceLowToHigh: false,
      priceHighToLow: false,
      [name]: checked
    }));
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleResetFilters = () => {
    setSelectedLocation('All');
    setFilters({
      ratingLowToHigh: false,
      ratingHighToLow: false,
      priceLowToHigh: false,
      priceHighToLow: false
    });
  };

  const viewDetails = (hostel) => {
    // Open a new window with hostel details encoded in URL parameters
    const url = new URL(window.location.href);
    url.pathname = '/view-page';
    url.search = new URLSearchParams({
      name: hostel.name,
      description: hostel.description,
      Rating: hostel.Rating,
      cost: hostel.cost,
      location: hostel.location,
      image: hostel.image
    }).toString();
    window.open(url.toString(), '_blank');
  };

  return (
    <div>
      <div>
        <label>Sort By:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="ratingLowToHigh"
              checked={filters.ratingLowToHigh}
              onChange={handleSortChange}
            />
            Rating Low to High
          </label>
          <label>
            <input
              type="checkbox"
              name="ratingHighToLow"
              checked={filters.ratingHighToLow}
              onChange={handleSortChange}
            />
            Rating High to Low
          </label>
          <label>
            <input
              type="checkbox"
              name="priceLowToHigh"
              checked={filters.priceLowToHigh}
              onChange={handleSortChange}
            />
            Price Low to High
          </label>
          <label>
            <input
              type="checkbox"
              name="priceHighToLow"
              checked={filters.priceHighToLow}
              onChange={handleSortChange}
            />
            Price High to Low
          </label>
        </div>
      </div>
      <div>
        <label>
          Filter By Location:
          <select value={selectedLocation} onChange={handleLocationChange}>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleResetFilters}>Reset Filters</button>
      {sortedFilteredHostels.map((h, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <img src={h.image} alt={h.name} style={{ width: '200px', height: '150px', objectFit: 'cover' }} />
          <h2>{h.name}</h2>
          <p>{h.description}</p>
          <p>Rating: {h.Rating}</p>
          <p>Cost: ${h.cost}</p>
          <p>Location: {h.location}</p>
        </div>
      ))}
    </div>
  );
};


export default Hostel;

