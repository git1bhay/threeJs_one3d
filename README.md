# 3D Car Viewer

## Overview
This project is a 3D car viewer application that allows users to interact with a 3D model of a SUV. It uses the ONE3D library to render and manipulate the 3D model.

## Features
- Toggle between interior and exterior views
- Switch between front and back views when in interior mode
- Change car colors
- Responsive design (auto-resizes on window resize)



## Usage

### Initialization
The script initializes automatically when the DOM is fully loaded. It sets up the 3D model with the following default parameters:
- Model ID: "SUV"
- Variant ID: "SUV"
- Default Color: "RedCrystalMetallic"

### User Interface
The script dynamically creates the following UI elements:
- A button to toggle between interior and exterior views
- A button to switch between front and back views (visible only in interior mode)
- A dropdown menu to select car colors

### Available Colors
- Red Crystal
- Blue Crystal
- Gray Metallic
- Snowflex White
- Silver Metallic
- Jet Black

### Interactivity
- Click on the "Interior View" button to switch to the interior view, and vice versa.
- In interior view, use the "Back View" button to switch between front and back seats.
- Use the color dropdown to change the car's color.

### Event Handling
The script registers click actions and handles various events such as view changes and color changes.

## Note
Make sure to replace the URL for the 3D model files with your actual hosting URL if different from the one provided in the code.

## Troubleshooting
Check the browser console for any error messages or logs. The script provides detailed console outputs for successful operations and errors.
