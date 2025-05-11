// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let activeCategory = 'all';
    let activeDistance = 40;
    let minSalary = 5;
    let currentLocation = {
        text: 'Madrid, Spain',
        emoji: '🇪🇸'
    };

    // Cache DOM elements
    const taskCards = document.querySelectorAll('.task-card');
    const categoryOptions = document.querySelectorAll('.category');
    const filterOptions = document.querySelectorAll('.filter-option');
    const distanceOptions = document.querySelectorAll('[data-distance]');
    const salarySliders = document.querySelectorAll('.range-slider');
    const rangeValues = document.querySelectorAll('.range-value');
    const filterToggle = document.querySelector('.filter-toggle');
    const mobileFilters = document.getElementById('mobile-filters');
    const applyFilterBtn = document.querySelector('.apply-filter');
    const resetFilterBtn = document.querySelector('.reset-filter');
    const locationSelectors = document.querySelectorAll('#location-selector, #desktop-location');
    const tasksContainer = document.querySelector('.tasks-container');
    const loadingIndicator = document.querySelector('.loading');
    const noTasksMessage = document.querySelector('.no-tasks');
    const navItems = document.querySelectorAll('.nav-item');

    // Location Modal
    const modal = createLocationModal();
    document.body.appendChild(modal);

    // Show loading state initially
    showLoading(true);
    
    // Simulate loading delay then show tasks
    setTimeout(() => {
        showLoading(false);
        filterTasks();
    }, 1000);

    // Event Listeners
    
    // Category selection (mobile)
    categoryOptions.forEach(option => {
        option.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update UI
            categoryOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update desktop filter options to match
            document.querySelectorAll('.filter-option[data-category]').forEach(opt => {
                opt.classList.toggle('active', opt.getAttribute('data-category') === category);
            });
            
            // Update active category and filter tasks
            activeCategory = category;
            filterTasks();
        });
    });

    // Filter options (desktop)
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            const filterType = this.getAttribute('data-category') ? 'category' : 'distance';
            
            if (filterType === 'category') {
                const category = this.getAttribute('data-category');
                
                // Update desktop UI
                document.querySelectorAll('.filter-option[data-category]').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update mobile UI
                categoryOptions.forEach(opt => {
                    opt.classList.toggle('active', opt.getAttribute('data-category') === category);
                });
                
                // Update active category
                activeCategory = category;
            } else if (filterType === 'distance') {
                const distance = parseInt(this.getAttribute('data-distance'));
                
                // Update UI
                distanceOptions.forEach(opt => opt.classList.remove('active'));
                document.querySelectorAll(`[data-distance="${distance}"]`).forEach(opt => {
                    opt.classList.add('active');
                });
                
                // Update active distance
                activeDistance = distance;
                
                // Update location text
                updateLocationText();
            }
            
            // Filter tasks
            filterTasks();
        });
    });

    // Salary range sliders
    salarySliders.forEach((slider, index) => {
        slider.addEventListener('input', function() {
            const value = this.value;
            minSalary = parseInt(value);
            
            // Update all range value displays
            rangeValues.forEach(display => {
                display.textContent = `€${value}+`;
            });
            
            // Update all sliders to the same value
            salarySliders.forEach(s => {
                s.value = value;
            });
        });
    });

    // Filter toggle (mobile)
    if (filterToggle) {
        filterToggle.addEventListener('click', function() {
            mobileFilters.style.display = mobileFilters.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Apply filter button (mobile)
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            mobileFilters.style.display = 'none';
            filterTasks();
        });
    }

    // Reset filter button (mobile)
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function() {
            // Reset distance
            activeDistance = 40;
            distanceOptions.forEach(opt => {
                opt.classList.toggle('active', opt.getAttribute('data-distance') === '40');
            });
            
            // Reset salary
            minSalary = 5;
            salarySliders.forEach(slider => {
                slider.value = 5;
            });
            rangeValues.forEach(display => {
                display.textContent = '€5+';
            });
            
            // Update location text
            updateLocationText();
        });
    }

    // Location selector
    locationSelectors.forEach(selector => {
        selector.addEventListener('click', function() {
            openLocationModal();
        });
    });

    // Task cards
    taskCards.forEach(card => {
        card.addEventListener('click', function() {
            openTaskModal(this);
        });
    });

    // Navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Update active state
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Handle navigation (simplified for demo)
            if (page === 'map') {
                alert('Map view would open here. Not implemented in this demo.');
            } else if (page === 'chat') {
                alert('Chat would open here. Not implemented in this demo.');
            }
            // Default is 'tasks' which is already shown
        });
    });

    // Functions

    // Filter tasks based on current selections
    function filterTasks() {
        showLoading(true);
        
        // Simulate delay for filtering
        setTimeout(() => {
            let visibleCount = 0;
            
            taskCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const cardPrice = parseInt(card.getAttribute('data-price'));
                const cardDistance = parseInt(card.getAttribute('data-distance'));
                
                // Check if card meets all filter criteria
                const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
                const priceMatch = cardPrice >= minSalary;
                const distanceMatch = cardDistance <= activeDistance;
                
                // Show or hide card
                if (categoryMatch && priceMatch && distanceMatch) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show message if no tasks match
            if (visibleCount === 0) {
                noTasksMessage.style.display = 'block';
            } else {
                noTasksMessage.style.display = 'none';
            }
            
            showLoading(false);
        }, 500);
    }

    // Show or hide loading indicator
    function showLoading(isLoading) {
        if (isLoading) {
            loadingIndicator.style.display = 'block';
            tasksContainer.style.opacity = '0.5';
        } else {
            loadingIndicator.style.display = 'none';
            tasksContainer.style.opacity = '1';
        }
    }

    // Update location text with current location and distance
    function updateLocationText() {
        const locationTextElements = document.querySelectorAll('.location-text');
        locationTextElements.forEach(element => {
            element.textContent = `${currentLocation.text} • ${activeDistance}km`;
        });
        
        const flagElements = document.querySelectorAll('.flag');
        flagElements.forEach(element => {
            element.textContent = currentLocation.emoji;
        });
    }

    // Create location modal element
    function createLocationModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'location-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">Select Location</div>
                    <div class="close-modal">&times;</div>
                </div>
                <div class="map-container">
                    Interactive Map Would Be Here
                </div>
                <div style="margin-bottom: 15px;">
                    <input type="text" placeholder="Search location..." style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                </div>
                <div style="font-weight: bold; margin-bottom: 10px;">Popular locations:</div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    <div class="location-option" data-location="Madrid, Spain" data-emoji="🇪🇸">
                        <span>🇪🇸</span> Madrid, Spain
                    </div>
                    <div class="location-option" data-location="Barcelona, Spain" data-emoji="🇪🇸">
                        <span>🇪🇸</span> Barcelona, Spain
                    </div>
                    <div class="location-option" data-location="Valencia, Spain" data-emoji="🇪🇸">
                        <span>🇪🇸</span> Valencia, Spain
                    </div>
                    <div class="location-option" data-location="Seville, Spain" data-emoji="🇪🇸">
                        <span>🇪🇸</span> Seville, Spain
                    </div>
                    <div class="location-option" data-location="Bilbao, Spain" data-emoji="🇪🇸">
                        <span>🇪🇸</span> Bilbao, Spain
                    </div>
                    <div class="location-option" data-location="Malaga, Spain" data-emoji="🇪🇸">
                        <span>🇪🇸</span> Malaga, Spain
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners to modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Location option selection
        modal.querySelectorAll('.location-option').forEach(option => {
            option.addEventListener('click', function() {
                const locationName = this.getAttribute('data-location');
                const emoji = this.getAttribute('data-emoji');
                
                currentLocation = {
                    text: locationName,
                    emoji: emoji
                };
                
                updateLocationText();
                modal.style.display = 'none';
                
                // Re-filter tasks based on new location
                filterTasks();
            });
            
            // Add some styling
            option.style.padding = '10px';
            option.style.border = '1px solid #e0e0e0';
            option.style.borderRadius = '5px';
            option.style.cursor = 'pointer';
            
            option.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#f0f0f0';
            });
            
            option.addEventListener('mouseout', function() {
                this.style.backgroundColor = 'white';
            });
        });
        
        return modal;
    }

    // Open location modal
    function openLocationModal() {
        const modal = document.getElementById('location-modal');
        modal.style.display = 'flex';
    }

    // Open task detail modal
    function openTaskModal(taskCard) {
        // Extract task information
        const title = taskCard.querySelector('.task-title').textContent;
        const price = taskCard.querySelector('.task-price').textContent;
        const location = taskCard.querySelector('.task-location').textContent;
        const time = taskCard.querySelector('.task-time').textContent;
        const description = taskCard.querySelector('.task-description').textContent;
        
        // Create worker info
        let workerAvatar, workerName, workerStatus;
        
        if (taskCard.querySelector('.worker-avatar')) {
            workerAvatar = taskCard.querySelector('.worker-avatar').outerHTML;
            workerName = taskCard.querySelector('.worker-name').textContent;
            workerStatus = taskCard.querySelector('.worker-status').textContent;
        }
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">${title}</div>
                    <div class="close-modal">&times;</div>
                </div>
                
                <div class="task-price" style="margin-bottom: 15px; display: inline-block;">${price}</div>
                <div style="margin-bottom: 20px;">
                    <div style="margin-bottom: 5px;"><strong>Location:</strong> ${location}</div>
                    <div style="margin-bottom: 15px;"><strong>${time}</strong></div>
                </div>
                
                <div class="map-container">Map with task location would be here</div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 10px;">Description</h3>
                    <p>${description}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 10px;">Client</h3>
                    <div class="worker-info">
                        ${workerAvatar || '<div class="worker-avatar">--</div>'}
                        <div>
                            <div class="worker-name">${workerName || 'Unknown'}</div>
                            <div class="worker-status">${workerStatus || ''}</div>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                    <button style="padding: 10px 20px; background-color: #f0f0f0; border: none; border-radius: 5px; cursor: pointer;">Message</button>
                    <button style="padding: 10px 20px; background-color: #0066cc; color: white; border: none; border-radius: 5px; cursor: pointer;">Apply for Task</button>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Add modal to body
        document.body.appendChild(modal);
        
        // Add event listeners to buttons
        modal.querySelector('button:first-of-type').addEventListener('click', function() {
            alert('Messaging functionality would be implemented here');
        });
        
        modal.querySelector('button:last-of-type').addEventListener('click', function() {
            alert('Application sent successfully!');
            document.body.removeChild(modal);
        });
    }

    // Initialize UI
    updateLocationText();

    // Add this code to your existing JavaScript file

// Add Google Maps API script to head
function loadGoogleMapsAPI() {
    // Note: In a production environment, you should use your own API key
    const mapsScript = document.createElement('script');
    mapsScript.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_VALID_API_KEY&callback=initMaps";
    mapsScript.defer = true;
    mapsScript.async = true;
    document.head.appendChild(mapsScript);
    
    // Define the callback function
    window.initMaps = function() {
        console.log("Google Maps API loaded");
        // Initialize any maps that are currently in the DOM
        initializeAllMaps();
    };
}

// Initialize all map containers in document
function initializeAllMaps() {
    const mapContainers = document.querySelectorAll('.map-container:not(.initialized)');
    mapContainers.forEach(container => initializeMap(container));
}

// Initialize a specific map container
function initializeMap(container, latLng = null) {
    // Set default coordinates to Madrid, Spain if not provided
    const defaultLatLng = { lat: 40.4168, lng: -3.7038 }; // Madrid coordinates
    const position = latLng || defaultLatLng;
    
    // Mark as initialized
    container.classList.add('initialized');
    
    // Clear any "Map would be here" placeholder text
    container.innerHTML = '';
    
    // Only proceed if Google Maps API is loaded
    if (window.google && window.google.maps) {
        // Create the map
        const map = new google.maps.Map(container, {
            center: position,
            zoom: 12,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });
        
        // Add a marker at the center position
        const marker = new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP
        });
        
        // For location selection modal, add click event to set new location
        if (container.closest('#location-modal')) {
            const searchInput = container.closest('.modal-content').querySelector('input');
            
            // Initialize search autocomplete if input exists
            if (searchInput && window.google.maps.places) {
                const autocomplete = new google.maps.places.Autocomplete(searchInput, {
                    types: ['geocode'],
                    fields: ['place_id', 'geometry', 'name', 'formatted_address']
                });
                
                autocomplete.bindTo('bounds', map);
                
                autocomplete.addListener('place_changed', function() {
                    const place = autocomplete.getPlace();
                    
                    if (!place.geometry) {
                        return;
                    }
                    
                    // Update map view
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);
                    }
                    
                    // Update marker position
                    marker.setPosition(place.geometry.location);
                    
                    // Store the selected place data
                    window.selectedPlace = {
                        text: place.formatted_address || place.name,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        emoji: '📍'
                    };
                });
            }
            
            // Allow clicking on map to set location
            map.addListener('click', function(event) {
                marker.setPosition(event.latLng);
                
                // Reverse geocode to get address
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: event.latLng }, function(results, status) {
                    if (status === 'OK' && results[0]) {
                        // Get country code for emoji flag
                        let countryCode = '';
                        for (let component of results[0].address_components) {
                            if (component.types.includes('country')) {
                                countryCode = component.short_name;
                                break;
                            }
                        }
                        
                        // Convert country code to flag emoji (works in most modern browsers)
                        const countryFlag = countryCode 
                            ? countryCode.toUpperCase().replace(/./g, char => 
                                String.fromCodePoint(char.charCodeAt(0) + 127397))
                            : '📍';
                        
                        // Store the selected place data
                        window.selectedPlace = {
                            text: results[0].formatted_address,
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng(),
                            emoji: countryFlag
                        };
                        
                        // Update search input with the address
                        if (searchInput) {
                            searchInput.value = results[0].formatted_address;
                        }
                    }
                });
            });
            
            // Add a confirm location button
            const confirmBtn = document.createElement('button');
            confirmBtn.textContent = 'Confirm Location';
            confirmBtn.className = 'filter-button apply-filter';
            confirmBtn.style.position = 'absolute';
            confirmBtn.style.bottom = '10px';
            confirmBtn.style.right = '10px';
            confirmBtn.style.zIndex = '100';
            container.appendChild(confirmBtn);
            
            confirmBtn.addEventListener('click', function() {
                if (window.selectedPlace) {
                    // Update current location
                    currentLocation = {
                        text: window.selectedPlace.text.split(',')[0], // Just use the first part of the address
                        emoji: window.selectedPlace.emoji,
                        lat: window.selectedPlace.lat,
                        lng: window.selectedPlace.lng
                    };
                    
                    // Update the UI
                    updateLocationText();
                    
                    // Close the modal
                    const modal = document.getElementById('location-modal');
                    modal.style.display = 'none';
                    
                    // Re-filter tasks
                    filterTasks();
                }
            });
        }
        
        // Store map instance on the container for future reference
        container.map = map;
        container.marker = marker;
        
        // Return the map instance
        return map;
    } else {
        // If Google Maps API not loaded yet, show message
        container.innerHTML = 'Map loading...';
        // Try again in a moment
        setTimeout(() => initializeMap(container, latLng), 1000);
        return null;
    }
}

// Create location modal with interactive map
function createLocationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'location-modal';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; width: 90%;">
            <div class="modal-header">
                <div class="modal-title">Select Location</div>
                <div class="close-modal">&times;</div>
            </div>
            <div class="map-container" style="height: 300px; position: relative;">
                Interactive Map Loading...
            </div>
            <div style="margin: 15px 0;">
                <input type="text" placeholder="Search location..." style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div style="font-weight: bold; margin-bottom: 10px;">Popular locations:</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                <div class="location-option" data-location="Madrid, Spain" data-emoji="🇪🇸" data-lat="40.4168" data-lng="-3.7038">
                    <span>🇪🇸</span> Madrid, Spain
                </div>
                <div class="location-option" data-location="Barcelona, Spain" data-emoji="🇪🇸" data-lat="41.3851" data-lng="2.1734">
                    <span>🇪🇸</span> Barcelona, Spain
                </div>
                <div class="location-option" data-location="Valencia, Spain" data-emoji="🇪🇸" data-lat="39.4699" data-lng="-0.3763">
                    <span>🇪🇸</span> Valencia, Spain
                </div>
                <div class="location-option" data-location="Seville, Spain" data-emoji="🇪🇸" data-lat="37.3891" data-lng="-5.9845">
                    <span>🇪🇸</span> Seville, Spain
                </div>
                <div class="location-option" data-location="Bilbao, Spain" data-emoji="🇪🇸" data-lat="43.2630" data-lng="-2.9350">
                    <span>🇪🇸</span> Bilbao, Spain
                </div>
                <div class="location-option" data-location="Malaga, Spain" data-emoji="🇪🇸" data-lat="36.7213" data-lng="-4.4213">
                    <span>🇪🇸</span> Malaga, Spain
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners to modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Location option selection
    modal.querySelectorAll('.location-option').forEach(option => {
        option.addEventListener('click', function() {
            const locationName = this.getAttribute('data-location');
            const emoji = this.getAttribute('data-emoji');
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            
            // Update the map to show the selected location
            const mapContainer = modal.querySelector('.map-container');
            if (mapContainer.map) {
                const latLng = { lat, lng };
                mapContainer.map.setCenter(latLng);
                mapContainer.marker.setPosition(latLng);
            }
            
            // Store the selected place data
            window.selectedPlace = {
                text: locationName,
                lat: lat,
                lng: lng,
                emoji: emoji
            };
            
            currentLocation = {
                text: locationName,
                emoji: emoji,
                lat: lat,
                lng: lng
            };
            
            updateLocationText();
            modal.style.display = 'none';
            
            // Re-filter tasks based on new location
            filterTasks();
        });
        
        // Add some styling
        option.style.padding = '10px';
        option.style.border = '1px solid #e0e0e0';
        option.style.borderRadius = '5px';
        option.style.cursor = 'pointer';
        
        option.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#f0f0f0';
        });
        
        option.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'white';
        });
    });
    
    return modal;
}

// Open task detail modal with interactive map
function openTaskModal(taskCard) {
    // Extract task information
    const title = taskCard.querySelector('.task-title').textContent;
    const price = taskCard.querySelector('.task-price').textContent;
    const location = taskCard.querySelector('.task-location').textContent;
    const time = taskCard.querySelector('.task-time').textContent;
    const description = taskCard.querySelector('.task-description').textContent;
    
    // Extract task location coordinates (for demo, generate some nearby coordinates)
    const baseCoords = currentLocation.lat && currentLocation.lng ? 
        { lat: currentLocation.lat, lng: currentLocation.lng } : 
        { lat: 40.4168, lng: -3.7038 }; // Madrid by default
    
    // Create slight variance for task location (within the search radius)
    const taskCoords = {
        lat: baseCoords.lat + (Math.random() - 0.5) * 0.05,
        lng: baseCoords.lng + (Math.random() - 0.5) * 0.05
    };
    
    // Create worker info
    let workerAvatar, workerName, workerStatus;
    
    if (taskCard.querySelector('.worker-avatar')) {
        workerAvatar = taskCard.querySelector('.worker-avatar').outerHTML;
        workerName = taskCard.querySelector('.worker-name').textContent;
        workerStatus = taskCard.querySelector('.worker-status').textContent;
    }
    
    // Generate a unique ID for this task
    const taskId = 'task_' + Math.random().toString(36).substring(2, 11);
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'task-modal-' + taskId;
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">${title}</div>
                <div class="close-modal">&times;</div>
            </div>
            
            <div class="task-price" style="margin-bottom: 15px; display: inline-block;">${price}</div>
            <div style="margin-bottom: 20px;">
                <div style="margin-bottom: 5px;"><strong>Location:</strong> ${location}</div>
                <div style="margin-bottom: 15px;"><strong>${time}</strong></div>
            </div>
            
            <div class="map-container" style="height: 250px; position: relative;">
                Map loading...
            </div>
            
            <div style="margin-bottom: 20px; margin-top: 15px;">
                <h3 style="margin-bottom: 10px;">Description</h3>
                <p>${description}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="margin-bottom: 10px;">Client</h3>
                <div class="worker-info" data-worker-id="${taskId}">
                    ${workerAvatar || '<div class="worker-avatar">--</div>'}
                    <div>
                        <div class="worker-name">${workerName || 'Unknown'}</div>
                        <div class="worker-status">${workerStatus || ''}</div>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                <button class="message-button" data-worker-id="${taskId}" style="padding: 10px 20px; background-color: #f0f0f0; border: none; border-radius: 5px; cursor: pointer;">Message</button>
                <button class="apply-button" style="padding: 10px 20px; background-color: #0066cc; color: white; border: none; border-radius: 5px; cursor: pointer;">Apply for Task</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    modal.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Initialize the map
    const mapContainer = modal.querySelector('.map-container');
    setTimeout(() => {
        initializeMap(mapContainer, taskCoords);
    }, 300);
    
    // Add event listeners to buttons
    modal.querySelector('.message-button').addEventListener('click', function() {
        const workerId = this.getAttribute('data-worker-id');
        const workerName = modal.querySelector(`.worker-info[data-worker-id="${workerId}"] .worker-name`).textContent;
        openChatModal(workerId, workerName, title);
        
        // Keep the task modal open or close it (depends on UX preference)
        // document.body.removeChild(modal);
    });
    
    modal.querySelector('.apply-button').addEventListener('click', function() {
        // Show success notification
        showNotification('Application sent successfully!');
        
        // Close the modal
        document.body.removeChild(modal);
    });
}

// Create and open chat modal
function openChatModal(workerId, workerName, taskTitle) {
    // Check if chat already exists
    const existingChat = document.getElementById('chat-modal-' + workerId);
    if (existingChat) {
        existingChat.style.display = 'flex';
        return;
    }
    
    // Create a new chat modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'chat-modal-' + workerId;
    modal.style.display = 'flex';
    
    // Create some example messages
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                   now.getMinutes().toString().padStart(2, '0');
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px; padding: 0; display: flex; flex-direction: column; height: 80vh;">
            <div class="modal-header" style="padding: 15px; margin-bottom: 0; position: relative;">
                <div style="display: flex; align-items: center;">
                    <div class="back-button close-chat">&lt;</div>
                    <div style="margin-left: 10px;">
                        <div class="modal-title">${workerName}</div>
                        <div style="font-size: 14px; color: #888;">Online now</div>
                    </div>
                </div>
            </div>
            
            <div class="chat-messages" style="flex: 1; overflow-y: auto; padding: 15px; background: #f5f5f5;">
                <div class="chat-date" style="text-align: center; margin: 10px 0; color: #888; font-size: 12px;">Today</div>
                
                <div class="system-message" style="text-align: center; margin: 20px 0; color: #666; font-size: 14px;">
                    You matched for task "${taskTitle}"
                </div>
                
                <div class="message received" style="margin-bottom: 15px; max-width: 80%;">
                    <div class="message-bubble" style="background: white; padding: 10px 15px; border-radius: 18px; display: inline-block; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                        Hello! I see you're interested in the task. Do you have any questions about it?
                    </div>
                    <div class="message-time" style="font-size: 12px; color: #888; margin-top: 5px;">${timeStr}</div>
                </div>
                
                <!-- More messages will be added here when sent -->
            </div>
            
            <div class="chat-input" style="padding: 15px; border-top: 1px solid #e0e0e0; display: flex; align-items: center;">
                <input type="text" placeholder="Type a message..." style="flex: 1; padding: 10px 15px; border-radius: 20px; border: 1px solid #e0e0e0; outline: none;">
                <button class="send-button" style="background: #0066cc; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; margin-left: 10px; cursor: pointer; font-size: 18px;">→</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    modal.querySelector('.close-chat').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Stop propagation for modal content clicks
    modal.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Send message functionality
    const chatMessages = modal.querySelector('.chat-messages');
    const messageInput = modal.querySelector('input');
    const sendButton = modal.querySelector('.send-button');
    
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Get current time
            const now = new Date();
            const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                           now.getMinutes().toString().padStart(2, '0');
            
            // Add message to chat
            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            messageElement.style.marginBottom = '15px';
            messageElement.style.maxWidth = '80%';
            messageElement.style.marginLeft = 'auto';
            messageElement.style.textAlign = 'right';
            
            messageElement.innerHTML = `
                <div class="message-bubble" style="background: #0066cc; color: white; padding: 10px 15px; border-radius: 18px; display: inline-block; text-align: left; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                    ${message}
                </div>
                <div class="message-time" style="font-size: 12px; color: #888; margin-top: 5px;">${timeStr}</div>
            `;
            
            chatMessages.appendChild(messageElement);
            
            // Clear input
            messageInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate reply after a delay
            setTimeout(function() {
                simulateReply(chatMessages, message);
            }, 1000 + Math.random() * 2000);
        }
    }
    
    // Send button click event
    sendButton.addEventListener('click', sendMessage);
    
    // Send on Enter key
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Focus input
    setTimeout(() => messageInput.focus(), 300);
}

// Simulate a reply in the chat
function simulateReply(chatContainer, userMessage) {
    // Array of possible responses
    const responses = [
        "Thanks for your message! I'll get back to you soon.",
        "Great! When would you be available to discuss the details?",
        "Perfect, I appreciate your interest in this task.",
        "Do you have any experience with similar tasks?",
        "Would you like me to provide more information about this job?",
        "Great to hear from you! When could you start?",
        "Thanks for reaching out! I look forward to working with you."
    ];
    
    // Special responses based on user message
    let response = '';
    const messageLower = userMessage.toLowerCase();
    
    if (messageLower.includes('price') || messageLower.includes('pay') || messageLower.includes('money')) {
        response = "The price listed is what I'm offering for this task. Does that work for you?";
    } else if (messageLower.includes('when') || messageLower.includes('time') || messageLower.includes('schedule')) {
        response = "I'm flexible with the timing. When would you be available?";
    } else if (messageLower.includes('where') || messageLower.includes('location') || messageLower.includes('address')) {
        response = "I can send you the exact address once we agree on the details.";
    } else if (messageLower.includes('hi') || messageLower.includes('hello') || messageLower.includes('hey')) {
        response = "Hello! Thank you for your interest in this task. How can I help you?";
    } else {
        // Random response
        response = responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Get current time
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                   now.getMinutes().toString().padStart(2, '0');
    
    // Create typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.style.marginBottom = '15px';
    typingIndicator.style.maxWidth = '80%';
    
    typingIndicator.innerHTML = `
        <div class="message-bubble" style="background: #e6e6e6; padding: 10px 15px; border-radius: 18px; display: inline-block; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
            <span style="display: inline-block; width: 6px; height: 6px; background: #888; border-radius: 50%; margin-right: 4px; animation: typing 1s infinite;"></span>
            <span style="display: inline-block; width: 6px; height: 6px; background: #888; border-radius: 50%; margin-right: 4px; animation: typing 1s infinite 0.3s;"></span>
            <span style="display: inline-block; width: 6px; height: 6px; background: #888; border-radius: 50%; animation: typing 1s infinite 0.6s;"></span>
        </div>
    `;
    
    // Add typing indicator
    chatContainer.appendChild(typingIndicator);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Remove typing indicator and add actual message after a delay
    setTimeout(function() {
        chatContainer.removeChild(typingIndicator);
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message received';
        messageElement.style.marginBottom = '15px';
        messageElement.style.maxWidth = '80%';
        
        messageElement.innerHTML = `
            <div class="message-bubble" style="background: white; padding: 10px 15px; border-radius: 18px; display: inline-block; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                ${response}
            </div>
            <div class="message-time" style="font-size: 12px; color: #888; margin-top: 5px;">${timeStr}</div>
        `;
        
        chatContainer.appendChild(messageElement);
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1500);
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('app-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'app-notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.color = 'white';
        notification.style.fontSize = '14px';
        notification.style.fontWeight = 'bold';
        notification.style.zIndex = '2000';
        notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        document.body.appendChild(notification);
    }
    
    // Set type-specific styling
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#F44336';
    } else if (type === 'warning') {
        notification.style.backgroundColor = '#FF9800';
    } else if (type === 'info') {
        notification.style.backgroundColor = '#2196F3';
    }
    
    // Set message
    notification.textContent = message;
    
    // Show notification
    notification.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Add keyframe animation for typing dots
function addTypingAnimation() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.textContent = `
        @keyframes typing {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Call necessary functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load Google Maps API
    loadGoogleMapsAPI();
    
    // Add typing animation
    addTypingAnimation();
    
    // Make sure to call the existing event initialization functions
    // Note: These functions should be defined in your existing code
});

});
