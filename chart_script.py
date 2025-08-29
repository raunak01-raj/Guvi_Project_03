import pandas as pd
import plotly.graph_objects as go

# Load the data
df = pd.read_csv("temperature_clothing_mapping.csv")

# Create clothing intensity scores based on the text descriptions
def score_base_layer(text):
    if 'Thermal underwear' in text and 'merino wool' in text:
        return 4
    elif 'Thermal underwear' in text:
        return 3
    elif 'Long-sleeve base layer' in text:
        return 2
    elif 'Long-sleeve shirt' in text:
        return 1
    else:
        return 0

def score_mid_layer(text):
    if 'Insulated jacket + fleece' in text:
        return 4
    elif 'Down/synthetic insulated jacket' in text:
        return 3
    elif 'Fleece jacket/wool sweater' in text:
        return 2
    elif 'Light sweater/fleece' in text:
        return 1
    else:
        return 0

def score_outer_layer(text):
    if 'Extreme cold parka' in text:
        return 4
    elif 'Heavy winter coat/parka' in text:
        return 3
    elif 'Winter jacket' in text or 'Winter coat/jacket' in text:
        return 2
    elif 'Medium jacket' in text:
        return 1
    else:
        return 0

def score_accessories(text):
    # Count key items mentioned
    items = ['balaclava', 'hat', 'beanie', 'gloves', 'boots', 'socks']
    score = 0
    text_lower = text.lower()
    for item in items:
        if item in text_lower:
            score += 1
    # Add extra weight for heavy items
    if 'insulated gloves' in text_lower:
        score += 1
    if 'winter boots' in text_lower:
        score += 1
    if 'thick socks' in text_lower:
        score += 1
    return min(score, 4)  # Cap at 4

# Apply scoring functions
df['base_score'] = df['base_layer'].apply(score_base_layer)
df['mid_score'] = df['mid_layer'].apply(score_mid_layer)
df['outer_score'] = df['outer_layer'].apply(score_outer_layer)
df['accessories_score'] = df['accessories'].apply(score_accessories)

# Create the line chart
fig = go.Figure()

# Define colors following the brand palette order
colors = ['#1FB8CD', '#DB4545', '#2E8B57', '#5D878F']

# Add traces for each clothing layer
layers = [
    ('base_score', 'Base Layer'),
    ('mid_score', 'Mid Layer'),
    ('outer_score', 'Outer Layer'),
    ('accessories_score', 'Accessories')
]

for i, (column, name) in enumerate(layers):
    fig.add_trace(go.Scatter(
        x=df['temperature_celsius'],
        y=df[column],
        mode='lines+markers',
        name=name,
        line=dict(color=colors[i], width=3),
        marker=dict(size=8),
        hovertemplate=f'{name}: %{{y}}<br>Temp: %{{x}}°C<extra></extra>'
    ))

# Update layout
fig.update_layout(
    title="Temp vs Clothing Layers",
    xaxis_title="Temp (°C)",
    yaxis_title="Layer Intensity",
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Update traces for line charts
fig.update_traces(cliponaxis=False)

# Update y-axis to show integer ticks only
fig.update_yaxes(dtick=1)

# Save the chart
fig.write_image("temperature_clothing_chart.png")

print("Chart saved successfully!")
print(f"Temperature range: {df['temperature_celsius'].min()}°C to {df['temperature_celsius'].max()}°C")