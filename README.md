# ArcGIS Projection Widget

**ArcGIS Projection Widget** is a custom widget for **ArcGIS Web AppBuilder- v2.30	** that allows users to **project and draw points and polygons** directly on the map. The widget supports multiple coordinate systems, including **WGS 84**, **Nord Maroc**, and **Nord Maroc Degrés**, enabling easy integration of diverse coordinate data into your GIS applications.

## Features

- **Multiple Coordinate System Support**:  
  Project points and polygons between **WGS 84** (latitude/longitude), **Nord Maroc** (X/Y), and **Nord Maroc Degrés** (X/Y) coordinate systems.
  
- **Point and Polygon Projection**:  
  Users can input **longitude/latitude** or **X/Y** coordinates for points, and draw polygons on the map.

- **Customizable Styling**:  
  Adjust the appearance of your shapes with customizable options for:
  - Point size, color, and outline
  - Polygon fill color, stroke color, and stroke width
  - Transparency for polygons
  
- **Interactive UI**:  
  A responsive and user-friendly interface allows for easy coordinate entry and projection, along with instant feedback on the map.

- **Clear Graphics**:  
  Easily clear all drawn shapes from the map with a click of a button.

## Installation

1. **Download the Widget**:  
   Clone or download the ZIP file of the repository.

2. **Extract the Widget**:  
   Extract the ZIP file contents to the `widgets` directory of your **ArcGIS Web AppBuilder** project.

3. **Add the Widget to Your App**:  
   Open **Web AppBuilder**, then add the **Projection Widget** from the "Custom" widget section.

## Usage

- **Select the Coordinate System**:  
  Choose from **WGS 84**, **Nord Maroc**, or **Nord Maroc Degrés** from the dropdown menu in the widget.

- **For Point Projection**:
  - Input the **X (Longitude)** and **Y (Latitude or X/Y)** coordinates.
  - The widget will automatically project and plot the point on the map in the selected coordinate system.
  
- **For Polygon Projection**:
  - Enter the coordinates in **JSON format**: `[[[X1, Y1], [X2, Y2], [X3, Y3], ...]]`.
  - The widget will project and draw the polygon in the selected coordinate system.
  - Customize the **line style**, **color**, and **fill transparency** using the provided controls.

- **Clear Graphics**:  
  To remove all geometries, click the "Clear All" button, and all the points and polygons drawn on the map will be removed.

## Author

- **Reyabi Souhail**

## License

This project is licensed under the **MIT License**. See the LICENSE file for more details.

## Contributing

Contributions are welcome! If you find any bugs, have feature requests, or want to improve the project, feel free to create an issue or submit a pull request.

1. Fork the repository
2. Create a new branch for your feature or fix
3. Commit your changes
4. Push to your forked repository
5. Create a pull request to the main repository

## Acknowledgements

- **ArcGIS Web AppBuilder**: For providing a flexible and extensible platform for custom widget development.
- **Esri Documentation**: For providing helpful resources in building and deploying widgets.
