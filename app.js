// Weather-Responsive Clothing Advisor Application

// Application state
const appState = {
    currentLocation: '',
    currentWeather: null,
    isMetric: true,
    settings: {
        activityLevel: 'moderate',
        personalPreference: 'normal'
    },
    temperatureMapping: [
        {"temp_c": -40, "temp_f": -40, "base": "Thermal underwear (polypropylene/merino wool)", "mid": "Insulated jacket + fleece", "outer": "Extreme cold parka (-60°F rated)", "bottom": "Thermal underwear + insulated pants", "accessories": "Balaclava, insulated gloves, winter boots, thick socks"},
        {"temp_c": -20, "temp_f": -4, "base": "Thermal underwear (polypropylene/merino wool)", "mid": "Insulated jacket + fleece", "outer": "Heavy winter coat/parka", "bottom": "Thermal underwear + insulated pants", "accessories": "Winter hat, insulated gloves, winter boots, warm socks"},
        {"temp_c": -10, "temp_f": 14, "base": "Thermal underwear (polypropylene/merino wool)", "mid": "Down/synthetic insulated jacket", "outer": "Winter jacket", "bottom": "Thermal leggings + warm pants", "accessories": "Beanie, warm gloves, winter boots, wool socks"},
        {"temp_c": 0, "temp_f": 32, "base": "Long-sleeve base layer", "mid": "Fleece jacket/wool sweater", "outer": "Winter coat/jacket", "bottom": "Thermal leggings + jeans/pants", "accessories": "Hat, gloves, warm boots, thick socks"},
        {"temp_c": 5, "temp_f": 41, "base": "Long-sleeve shirt", "mid": "Light sweater/fleece", "outer": "Medium jacket", "bottom": "Long pants/jeans", "accessories": "Light hat, light gloves, boots, warm socks"},
        {"temp_c": 10, "temp_f": 50, "base": "Long-sleeve shirt", "mid": "Light jacket/cardigan", "outer": "Light jacket/windbreaker", "bottom": "Long pants/jeans", "accessories": "Light hat (optional), light gloves, closed shoes"},
        {"temp_c": 15, "temp_f": 59, "base": "Short/long-sleeve shirt", "mid": "Light sweater (optional)", "outer": "Light jacket (optional)", "bottom": "Long pants/light pants", "accessories": "Light hat (optional), closed shoes"},
        {"temp_c": 20, "temp_f": 68, "base": "Short-sleeve shirt", "mid": "Light cardigan (optional)", "outer": "Light cardigan/zip-up", "bottom": "Long pants/capris", "accessories": "Closed shoes/sneakers"},
        {"temp_c": 25, "temp_f": 77, "base": "Short-sleeve shirt/tank", "mid": "None needed", "outer": "None needed", "bottom": "Pants/shorts", "accessories": "Sunglasses (optional), comfortable shoes"},
        {"temp_c": 30, "temp_f": 86, "base": "Tank top/breathable shirt", "mid": "None needed", "outer": "Sun protection shirt (optional)", "bottom": "Shorts/light pants", "accessories": "Sunglasses, hat, breathable shoes"},
        {"temp_c": 35, "temp_f": 95, "base": "Lightweight tank", "mid": "None needed", "outer": "Sun protection (optional)", "bottom": "Shorts", "accessories": "Sunglasses, sun hat, breathable shoes"},
        {"temp_c": 40, "temp_f": 104, "base": "Ultra-light breathable shirt", "mid": "None needed", "outer": "Sun protection recommended", "bottom": "Lightweight shorts", "accessories": "Sunglasses, wide-brim hat, breathable/ventilated shoes"}
    ],
    weatherConditions: {
        "sunny": {"modifier": "Add sun protection", "items": ["sunglasses", "sun hat", "UV protection clothing"], "fabric": "Light colors, UV-resistant fabrics"},
        "rainy": {"modifier": "Add waterproof layer", "items": ["waterproof jacket", "rain boots", "umbrella"], "fabric": "Water-resistant, quick-dry materials"},
        "snowy": {"modifier": "Add insulation and waterproofing", "items": ["waterproof boots", "warm gloves", "winter hat"], "fabric": "Insulated, waterproof outer layer"},
        "windy": {"modifier": "Add windproof layer", "items": ["windbreaker", "wind-resistant jacket"], "fabric": "Wind-resistant fabrics, fitted clothing"},
        "humid": {"modifier": "Increase breathability", "items": ["moisture-wicking base layers"], "fabric": "Breathable, moisture-wicking materials"},
        "cloudy": {"modifier": "Standard recommendations", "items": [], "fabric": "Standard fabric choices"}
    },
    cities: ["New York", "London", "Tokyo", "Mumbai", "Delhi", "Moscow", "Sydney", "Toronto", "Paris", "Berlin", "Dubai", "Singapore", "Los Angeles", "Chicago", "Miami"]
};

// Weather simulation functions
function generateWeatherData(location) {
    const conditions = ['sunny', 'rainy', 'snowy', 'windy', 'humid', 'cloudy'];
    const seasonalTemp = getSeasonalTemperature(location);
    
    const temp_c = Math.round(seasonalTemp + (Math.random() - 0.5) * 10);
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    // Adjust conditions based on temperature
    let finalCondition = condition;
    if (temp_c < 0 && Math.random() < 0.7) finalCondition = 'snowy';
    if (temp_c > 30 && Math.random() < 0.6) finalCondition = 'sunny';
    if (temp_c > 15 && temp_c < 25 && Math.random() < 0.4) finalCondition = 'rainy';
    
    const feelsLike_c = temp_c + Math.round((Math.random() - 0.5) * 6);
    const humidity = Math.round(30 + Math.random() * 60);
    const windSpeed = Math.round(Math.random() * 25);
    
    return {
        location,
        temp_c,
        temp_f: Math.round((temp_c * 9/5) + 32),
        feelsLike_c,
        feelsLike_f: Math.round((feelsLike_c * 9/5) + 32),
        condition: finalCondition,
        humidity,
        windSpeed,
        timestamp: new Date()
    };
}

function getSeasonalTemperature(location) {
    const month = new Date().getMonth();
    const locationTemps = {
        'New York': [-2, 0, 6, 13, 19, 24, 27, 26, 22, 16, 10, 4],
        'London': [4, 4, 7, 9, 13, 16, 18, 18, 15, 11, 7, 5],
        'Tokyo': [3, 4, 8, 14, 19, 22, 26, 28, 24, 18, 12, 7],
        'Mumbai': [24, 25, 28, 30, 32, 30, 27, 27, 28, 30, 28, 25],
        'Delhi': [15, 18, 24, 30, 36, 39, 35, 34, 32, 28, 22, 16],
        'Moscow': [-9, -6, -1, 7, 15, 19, 21, 19, 13, 6, -1, -6],
        'Sydney': [22, 22, 20, 18, 15, 12, 11, 13, 16, 18, 20, 22],
        'Toronto': [-4, -2, 3, 10, 17, 22, 25, 24, 20, 13, 7, 1],
        'Paris': [3, 4, 8, 11, 15, 18, 20, 20, 17, 12, 7, 4],
        'Berlin': [-1, 1, 5, 10, 15, 18, 20, 19, 15, 10, 5, 1],
        'Dubai': [19, 21, 25, 29, 35, 38, 40, 41, 38, 33, 27, 22],
        'Singapore': [26, 27, 28, 28, 29, 28, 28, 28, 28, 27, 27, 26],
        'Los Angeles': [14, 15, 16, 18, 20, 22, 24, 25, 24, 21, 17, 14],
        'Chicago': [-4, -2, 4, 10, 16, 22, 25, 24, 20, 13, 6, 0],
        'Miami': [20, 21, 23, 25, 27, 29, 30, 30, 29, 27, 24, 21]
    };
    
    return locationTemps[location] ? locationTemps[location][month] : 20;
}

// Recommendation engine
function findTemperatureRecommendation(temperature) {
    let closest = appState.temperatureMapping[0];
    let minDiff = Math.abs(temperature - closest.temp_c);
    
    for (const mapping of appState.temperatureMapping) {
        const diff = Math.abs(temperature - mapping.temp_c);
        if (diff < minDiff) {
            minDiff = diff;
            closest = mapping;
        }
    }
    
    return closest;
}

function adjustForSettings(recommendation) {
    const { activityLevel, personalPreference } = appState.settings;
    let adjusted = { ...recommendation };
    
    // Activity level adjustments
    if (activityLevel === 'active') {
        adjusted.base = adjusted.base.replace('Long-sleeve', 'Short-sleeve');
        adjusted.mid = adjusted.mid.includes('None') ? 'Light layer recommended for warm-up' : adjusted.mid;
    } else if (activityLevel === 'sedentary') {
        adjusted.outer = adjusted.outer.includes('None') ? 'Light jacket recommended' : adjusted.outer;
    }
    
    // Personal preference adjustments
    if (personalPreference === 'cold') {
        if (adjusted.mid.includes('None')) adjusted.mid = 'Light cardigan/sweater';
        if (adjusted.outer.includes('None')) adjusted.outer = 'Light jacket available';
    } else if (personalPreference === 'hot') {
        adjusted.mid = adjusted.mid.replace('fleece', 'light layer');
        adjusted.outer = adjusted.outer.replace('jacket', 'optional light layer');
    }
    
    return adjusted;
}

function generateRecommendations(weatherData) {
    const baseRec = findTemperatureRecommendation(weatherData.temp_c);
    const adjustedRec = adjustForSettings(baseRec);
    const weatherMod = appState.weatherConditions[weatherData.condition];
    
    return {
        base: adjustedRec,
        weather: weatherMod,
        summary: generateSummary(weatherData, adjustedRec, weatherMod)
    };
}

function generateSummary(weather, rec, weatherMod) {
    const temp = appState.isMetric ? `${weather.temp_c}°C` : `${weather.temp_f}°F`;
    const condition = weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1);
    
    let summary = `${weather.location} Today: ${temp} and ${condition} - `;
    
    // Key recommendations
    const keyItems = [];
    if (!rec.base.includes('None')) keyItems.push(rec.base.split(' ')[0]);
    if (!rec.outer.includes('None')) keyItems.push(rec.outer.split(' ')[0]);
    if (weatherMod.items.length > 0) keyItems.push(weatherMod.items[0]);
    
    summary += keyItems.join(', ');
    
    return summary;
}

// Weekly forecast generation
function generateWeeklyForecast() {
    const forecast = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const weather = generateWeatherData(appState.currentLocation);
        weather.temp_c += Math.round((Math.random() - 0.5) * 8); // Add some variation
        weather.temp_f = Math.round((weather.temp_c * 9/5) + 32);
        
        const recommendations = generateRecommendations(weather);
        
        forecast.push({
            date,
            weather,
            recommendations
        });
    }
    
    return forecast;
}

// UI Update functions
function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function updateWeatherDisplay(weatherData) {
    const tempDisplay = appState.isMetric ? `${weatherData.temp_c}°C` : `${weatherData.temp_f}°F`;
    const feelsLike = appState.isMetric ? `${weatherData.feelsLike_c}°C` : `${weatherData.feelsLike_f}°F`;
    
    const temperatureEl = document.getElementById('temperature');
    const feelsLikeEl = document.getElementById('feelsLike');
    const locationNameEl = document.getElementById('locationName');
    const weatherConditionEl = document.getElementById('weatherCondition');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('windSpeed');
    
    if (temperatureEl) temperatureEl.textContent = tempDisplay;
    if (feelsLikeEl) feelsLikeEl.textContent = `Feels like ${feelsLike}`;
    if (locationNameEl) locationNameEl.textContent = weatherData.location;
    if (weatherConditionEl) weatherConditionEl.textContent = weatherData.condition.charAt(0).toUpperCase() + weatherData.condition.slice(1);
    if (humidityEl) humidityEl.textContent = `Humidity: ${weatherData.humidity}%`;
    if (windSpeedEl) windSpeedEl.textContent = `Wind: ${weatherData.windSpeed} km/h`;
    
    showElement('weatherDisplay');
    showElement('tabNavigation');
}

function updateRecommendations(recommendations) {
    const { base, weather } = recommendations;
    
    const baseLayerEl = document.getElementById('baseLayer');
    const midLayerEl = document.getElementById('midLayer');
    const outerLayerEl = document.getElementById('outerLayer');
    const bottomLayerEl = document.getElementById('bottomLayer');
    const accessoriesEl = document.getElementById('accessories');
    const weatherModifiersEl = document.getElementById('weatherModifiers');
    const fabricAdviceEl = document.getElementById('fabricAdvice');
    
    if (baseLayerEl) baseLayerEl.textContent = base.base;
    if (midLayerEl) midLayerEl.textContent = base.mid;
    if (outerLayerEl) outerLayerEl.textContent = base.outer;
    if (bottomLayerEl) bottomLayerEl.textContent = base.bottom;
    if (accessoriesEl) accessoriesEl.textContent = base.accessories;
    
    // Weather modifiers
    let modifierText = weather.modifier;
    if (weather.items.length > 0) {
        modifierText += `: ${weather.items.join(', ')}`;
    }
    if (weatherModifiersEl) weatherModifiersEl.textContent = modifierText;
    if (fabricAdviceEl) fabricAdviceEl.textContent = `Fabric recommendation: ${weather.fabric}`;
}

function updateWeeklyForecast(forecast) {
    const container = document.getElementById('weeklyForecast');
    if (!container) return;
    
    container.innerHTML = '';
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    forecast.forEach((day, index) => {
        const dayElement = document.createElement('div');
        dayElement.className = 'forecast-day';
        
        const tempClass = getTemperatureClass(day.weather.temp_c);
        const tempDisplay = appState.isMetric ? `${day.weather.temp_c}°C` : `${day.weather.temp_f}°F`;
        
        const keyRecommendation = generateKeyRecommendation(day.recommendations.base, day.weather);
        
        dayElement.innerHTML = `
            <div class="forecast-date">
                <span class="day">${index === 0 ? 'Today' : days[day.date.getDay()]}</span>
                <span class="date">${day.date.toLocaleDateString()}</span>
            </div>
            <div class="forecast-weather">
                <div class="forecast-temp">${tempDisplay}</div>
                <div class="forecast-condition">${day.weather.condition}</div>
            </div>
            <div class="forecast-recommendations">${keyRecommendation}</div>
            <div class="temperature-indicator ${tempClass}">${Math.round(day.weather.temp_c)}°</div>
        `;
        
        container.appendChild(dayElement);
    });
}

function getTemperatureClass(temp) {
    if (temp < 0) return 'temp-cold';
    if (temp < 15) return 'temp-cool';
    if (temp < 25) return 'temp-mild';
    if (temp < 35) return 'temp-warm';
    return 'temp-hot';
}

function generateKeyRecommendation(rec, weather) {
    const items = [];
    if (!rec.base.includes('None')) items.push(rec.base.split(' ')[0]);
    if (!rec.outer.includes('None')) items.push(rec.outer.split(' ')[0]);
    
    const weatherMod = appState.weatherConditions[weather.condition];
    if (weatherMod.items.length > 0) items.push(weatherMod.items[0]);
    
    return items.slice(0, 3).join(', ');
}

// Export functionality
function exportWeeklyPlan() {
    if (!appState.currentWeather) {
        alert('Please get weather recommendations first before exporting.');
        return;
    }
    
    const forecast = generateWeeklyForecast();
    let exportText = `Weather-Responsive Clothing Plan for ${appState.currentLocation}\n`;
    exportText += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    
    forecast.forEach((day, index) => {
        const dayName = index === 0 ? 'Today' : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day.date.getDay()];
        const temp = appState.isMetric ? `${day.weather.temp_c}°C` : `${day.weather.temp_f}°F`;
        
        exportText += `${dayName} (${day.date.toLocaleDateString()}):\n`;
        exportText += `Temperature: ${temp}, Condition: ${day.weather.condition}\n`;
        exportText += `Base Layer: ${day.recommendations.base.base}\n`;
        exportText += `Mid Layer: ${day.recommendations.base.mid}\n`;
        exportText += `Outer Layer: ${day.recommendations.base.outer}\n`;
        exportText += `Bottom Layer: ${day.recommendations.base.bottom}\n`;
        exportText += `Accessories: ${day.recommendations.base.accessories}\n`;
        exportText += `Weather Notes: ${day.recommendations.weather.modifier}\n\n`;
    });
    
    // Create and download file
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clothing-plan-${appState.currentLocation.toLowerCase().replace(' ', '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event handlers
function initializeApp() {
    console.log('Initializing app...');
    
    // Populate city dropdown
    const locationSelect = document.getElementById('location');
    if (locationSelect) {
        // Clear existing options first
        locationSelect.innerHTML = '<option value="">Select a city...</option>';
        
        appState.cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            locationSelect.appendChild(option);
        });
        console.log('Cities populated:', appState.cities.length);
    } else {
        console.error('Location select element not found');
    }
    
    // Set up event listeners with error handling
    const getRecommendationsBtn = document.getElementById('getRecommendations');
    if (getRecommendationsBtn) {
        getRecommendationsBtn.addEventListener('click', handleGetRecommendations);
    }
    
    const refreshWeatherBtn = document.getElementById('refreshWeather');
    if (refreshWeatherBtn) {
        refreshWeatherBtn.addEventListener('click', handleRefreshWeather);
    }
    
    const toggleUnitsBtn = document.getElementById('toggleUnits');
    if (toggleUnitsBtn) {
        toggleUnitsBtn.addEventListener('click', handleToggleUnits);
    }
    
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showElement('settingsModal');
        });
    }
    
    const closeSettings = document.getElementById('closeSettings');
    if (closeSettings) {
        closeSettings.addEventListener('click', () => {
            hideElement('settingsModal');
        });
    }
    
    const saveSettings = document.getElementById('saveSettings');
    if (saveSettings) {
        saveSettings.addEventListener('click', handleSaveSettings);
    }
    
    const exportWeeklyBtn = document.getElementById('exportWeekly');
    if (exportWeeklyBtn) {
        exportWeeklyBtn.addEventListener('click', exportWeeklyPlan);
    }
    
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetTab = e.target.dataset.tab;
            switchTab(targetTab);
        });
    });
    
    // Modal close on backdrop click
    const settingsModal = document.getElementById('settingsModal');
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target.id === 'settingsModal') {
                hideElement('settingsModal');
            }
        });
    }
    
    // Show current tab by default
    switchTab('current');
    
    console.log('App initialization complete');
}

function handleGetRecommendations() {
    console.log('Getting recommendations...');
    const locationSelect = document.getElementById('location');
    const location = locationSelect ? locationSelect.value : '';
    
    if (!location) {
        alert('Please select a location first.');
        return;
    }
    
    appState.currentLocation = location;
    const weatherData = generateWeatherData(location);
    appState.currentWeather = weatherData;
    
    console.log('Weather data generated:', weatherData);
    
    updateWeatherDisplay(weatherData);
    
    const recommendations = generateRecommendations(weatherData);
    updateRecommendations(recommendations);
    
    // Generate and update weekly forecast
    const weeklyForecast = generateWeeklyForecast();
    updateWeeklyForecast(weeklyForecast);
    
    console.log('Recommendations updated');
}

function handleRefreshWeather() {
    if (appState.currentLocation) {
        handleGetRecommendations();
    } else {
        alert('Please select a location first.');
    }
}

function handleToggleUnits() {
    appState.isMetric = !appState.isMetric;
    const toggleBtn = document.getElementById('toggleUnits');
    if (toggleBtn) {
        toggleBtn.textContent = appState.isMetric ? '°F / °C' : '°C / °F';
    }
    
    if (appState.currentWeather) {
        updateWeatherDisplay(appState.currentWeather);
        const weeklyForecast = generateWeeklyForecast();
        updateWeeklyForecast(weeklyForecast);
    }
}

function handleSaveSettings() {
    const activitySelect = document.getElementById('activityLevel');
    const preferenceSelect = document.getElementById('personalPreference');
    
    if (activitySelect) {
        appState.settings.activityLevel = activitySelect.value;
    }
    if (preferenceSelect) {
        appState.settings.personalPreference = preferenceSelect.value;
    }
    
    hideElement('settingsModal');
    
    // Refresh recommendations if weather data exists
    if (appState.currentWeather) {
        const recommendations = generateRecommendations(appState.currentWeather);
        updateRecommendations(recommendations);
        const weeklyForecast = generateWeeklyForecast();
        updateWeeklyForecast(weeklyForecast);
    }
    
    console.log('Settings saved:', appState.settings);
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Update tab content
    hideElement('currentTab');
    hideElement('weeklyTab');
    
    if (tabName === 'current') {
        showElement('currentTab');
    } else if (tabName === 'weekly') {
        showElement('weeklyTab');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});