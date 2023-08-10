# Football Manager Application

> This repository contains the solution for the "Football Manager" test task. The application is designed to manage football teams and players using Java 17, Spring Boot, and Angular.

## Table of Contents

- [Requirements](#requirements)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Requirements

The application supports the following functionalities:

### Backend

- Basic CRUD operations for teams and players following REST style.
- Player transfer operation:
    - Transfer cost = (player's experience in months * 100000) / player's age in years.
    - Team commission (0% to 10% of the transfer cost) - specified in team information.
    - The total amount (transfer cost + commission) should be deducted from the buying team's account and added to the selling team's account.

### Frontend

- Display a list of teams with basic information (team name, city, country) and the ability to add/remove teams.
- Display a list of all players with basic information (name, surname, career start date, team) and the ability to add/remove players.
- Navigate to a detailed team page with a list of its players (with links to individual player pages) and the ability to edit team details.
- Navigate to a detailed player page with the ability to edit player details and perform transfer operations, and navigate to the player's team page.

Both client-side and server-side operations should be validated.

## Technologies Used

The application utilizes the following technologies:

- Java 17
- Spring Boot
- Angular 16.1.0

## Project Structure

The project follows a standard architecture:

- **Backend**:
    - Controllers: Handle incoming HTTP requests.
    - Services: Implement business logic.
    - Repositories: Manage database interactions.

- **Frontend**:
    - Components: Define UI components and interactions.
    - Services: Communicate with the backend.
    - Views: Render UI elements.

## Getting Started

### Backend

1. Clone the repository.
2. Navigate to the backend directory.
3. Set up the database configuration in `application.properties`.
4. Build and run the Spring Boot application.

### Frontend

1. Navigate to the frontend directory.
2. Install Angular CLI if not already installed: `npm install -g @angular/cli`.
3. Install dependencies: `npm install`.
4. Start the Angular development server: `ng serve`.

### Or with Docker
1. Clone the repository
2. Run commands at [build.sh](build.sh) file
3. Then run in terminal command - docker-compose up

## Usage

- Access the frontend application by navigating to `http://localhost:4200` (http://localhost - with docker) in your web browser.
- Explore team and player lists, perform edits, transfers, and other functionalities as described in the requirements.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for improvements or fixes.

