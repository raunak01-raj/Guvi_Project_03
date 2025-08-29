# Create a comprehensive temperature-clothing mapping based on the research findings
import pandas as pd
import json

# Create temperature thresholds and clothing recommendations based on research
temperature_clothing_mapping = {
    "temperature_celsius": [-40, -20, -10, 0, 5, 10, 15, 20, 25, 30, 35, 40],
    "temperature_fahrenheit": [-40, -4, 14, 32, 41, 50, 59, 68, 77, 86, 95, 104],
    "base_layer": [
        "Thermal underwear (polypropylene/merino wool)",
        "Thermal underwear (polypropylene/merino wool)", 
        "Thermal underwear (polypropylene/merino wool)",
        "Long-sleeve base layer",
        "Long-sleeve shirt",
        "Long-sleeve shirt",
        "Short/long-sleeve shirt",
        "Short-sleeve shirt",
        "Short-sleeve shirt/tank",
        "Tank top/breathable shirt",
        "Lightweight tank",
        "Ultra-light breathable shirt"
    ],
    "mid_layer": [
        "Insulated jacket + fleece",
        "Insulated jacket + fleece",
        "Down/synthetic insulated jacket",
        "Fleece jacket/wool sweater",
        "Light sweater/fleece",
        "Light jacket/cardigan",
        "Light sweater (optional)",
        "Light cardigan (optional)",
        "None needed",
        "None needed", 
        "None needed",
        "None needed"
    ],
    "outer_layer": [
        "Extreme cold parka (-60°F rated)",
        "Heavy winter coat/parka",
        "Winter jacket",
        "Winter coat/jacket",
        "Medium jacket",
        "Light jacket/windbreaker",
        "Light jacket (optional)",
        "Light cardigan/zip-up",
        "None needed",
        "Sun protection shirt (optional)",
        "Sun protection (optional)",
        "Sun protection recommended"
    ],
    "bottom_layer": [
        "Thermal underwear + insulated pants",
        "Thermal underwear + insulated pants",
        "Thermal leggings + warm pants",
        "Thermal leggings + jeans/pants",
        "Long pants/jeans",
        "Long pants/jeans",
        "Long pants/light pants",
        "Long pants/capris",
        "Pants/shorts",
        "Shorts/light pants",
        "Shorts",
        "Lightweight shorts"
    ],
    "accessories": [
        "Balaclava, insulated gloves, winter boots, thick socks",
        "Winter hat, insulated gloves, winter boots, warm socks",
        "Beanie, warm gloves, winter boots, wool socks",
        "Hat, gloves, warm boots, thick socks",
        "Light hat, light gloves, boots, warm socks",
        "Light hat (optional), light gloves, closed shoes",
        "Light hat (optional), closed shoes",
        "Closed shoes/sneakers",
        "Sunglasses (optional), comfortable shoes",
        "Sunglasses, hat, breathable shoes",
        "Sunglasses, sun hat, breathable shoes",
        "Sunglasses, wide-brim hat, breathable/ventilated shoes"
    ],
    "activity_level_modifier": [
        "Add extra insulation for low activity",
        "Add extra insulation for low activity", 
        "Reduce layers for high activity",
        "Reduce layers for high activity",
        "Adjust based on activity",
        "Adjust based on activity",
        "Adjust based on activity",
        "Standard recommendations",
        "Standard recommendations",
        "Increase ventilation for high activity",
        "Increase ventilation for high activity",
        "Maximum ventilation needed"
    ]
}

# Create DataFrame
clothing_df = pd.DataFrame(temperature_clothing_mapping)
print("Temperature-Clothing Mapping Table:")
print(clothing_df.to_string(index=False))

# Save as CSV for potential app use
clothing_df.to_csv("temperature_clothing_mapping.csv", index=False)
print("\nSaved temperature mapping to CSV file")

# Create weather condition mappings
weather_conditions = {
    "sunny": {
        "modifier": "Add sun protection",
        "additional_items": ["sunglasses", "sun hat", "UV protection clothing"],
        "fabric_preference": "Light colors, UV-resistant fabrics"
    },
    "rainy": {
        "modifier": "Add waterproof layer", 
        "additional_items": ["waterproof jacket", "rain boots", "umbrella"],
        "fabric_preference": "Water-resistant, quick-dry materials"
    },
    "snowy": {
        "modifier": "Add insulation and waterproofing",
        "additional_items": ["waterproof boots", "warm gloves", "winter hat"],
        "fabric_preference": "Insulated, waterproof outer layer"
    },
    "windy": {
        "modifier": "Add windproof layer",
        "additional_items": ["windbreaker", "wind-resistant jacket"],
        "fabric_preference": "Wind-resistant fabrics, fitted clothing"
    },
    "humid": {
        "modifier": "Increase breathability",
        "additional_items": ["moisture-wicking base layers"],
        "fabric_preference": "Breathable, moisture-wicking materials"
    }
}

# Convert to JSON for easy storage
weather_json = json.dumps(weather_conditions, indent=2)
print("\nWeather Condition Modifiers:")
print(weather_json)

# Save weather conditions mapping
with open("weather_conditions_mapping.json", "w") as f:
    json.dump(weather_conditions, f, indent=2)
print("\nSaved weather conditions mapping to JSON file")