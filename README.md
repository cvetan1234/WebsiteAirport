# Airport Flight Schedule

A web application for managing and displaying daily airport arrivals and departures.

The website allows users to manually enter flight information or automatically generate random flights. Flights are displayed in an interactive table that can be sorted and modified, while statistics about the current flight schedule are calculated automatically.

This project was originally developed as a university web programming project for Ostbayerische Technische Hochschule Amberg-Weiden (OTH Amberg-Weiden).

## Features

- Add flight information manually
- Generate up to 250 random flight entries
- Manage both arrivals and departures
- Display flight time, destination/origin, duration, and aircraft type
- Sort the flight table by clicking column headings
- Delete individual rows
- Delete the first n rows of the table
- Automatically update row numbers after deletion
- Calculate statistics for the current flight schedule
- Generate a print-friendly view of the flight table
- Navigate between sections of the page

## Flight Information

Each flight entry contains:

- Flight number
- Time
- Arrival or departure
- Destination or origin
- Flight duration
- Aircraft type

The available aircraft types include:

- Airbus A320
- Airbus A350
- Boeing 737
- Boeing 777

## Statistics

The website automatically calculates and displays:

- Average flight duration
- Earliest flight time
- Latest flight time
- Most frequently used aircraft type

The statistics are updated whenever flights are added or removed.

## Technologies

- HTML5
- CSS3
- JavaScript
- DOM manipulation

The application runs entirely in the browser and does not require a backend or database.

## Project Structure

- `airport.html` – main webpage and user interface
- `style.css` – layout and visual styling
- `script.js` – flight management, table operations, statistics, random generation, and print functionality
- `airplaneImg.jpg` – image used on the webpage

## Running the Website

No installation or compilation is required.

Download or clone the repository and open:

```text
airport.html
```

in a web browser.

The website runs locally using HTML, CSS, and JavaScript.

## Usage

1. Enter the flight time, arrival/departure type, destination/origin, duration, and aircraft type.
2. Click **Add to the table** to add the flight.
3. Alternatively, enter the number of flights to generate and click **Create rows** to generate random flight data.
4. Click a column heading to sort the table by that column.
5. Enter a row number and use **Delete single row** to remove a specific flight.
6. Use **Delete first n rows** to remove multiple flights from the beginning of the table.
7. View automatically calculated flight statistics below the table.
8. Click **Open print view** to open a printable version of the current flight schedule.
