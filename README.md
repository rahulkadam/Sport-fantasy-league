# Sport Fantasy League Platform

This repository contains the backend code for the Sport Fantasy League platform, a real-time fantasy sports application specifically designed for the Indian Premier League (IPL). This platform allows users to create virtual teams, participate in leagues, and compete based on the real-time performance of IPL players.

**Platform Description:**

The Sport Fantasy League platform aimed to provide an engaging and interactive experience for IPL fans. Users could:

* **Create and Manage Teams:** Select players from different IPL teams to form their own fantasy squads.
* **Participate in Leagues:** Join public or private leagues to compete against other users.
* **Real-time Scoring:** Track player performance during live IPL matches and see their fantasy scores update in real-time.
* **Leaderboards and Rankings:** View league standings and individual player rankings.
* **User Profiles and Management:** Manage user accounts and profiles.

## Technology Stack

* **Backend:**
    * Java: Core application logic and API development.
    * MySQL: Relational database for storing user data, game data, and player statistics.
    * Google Cloud Platform (GCP): Cloud infrastructure for hosting and scaling the application.
* **Frontend:**
    * TypeScript: Typed JavaScript for building a robust and maintainable frontend.
    * React: JavaScript library for creating dynamic and interactive user interfaces.
    * Bootstrap: CSS framework for responsive design and UI components.
    * Mobile Support (Responsive Design): Ensuring the platform is accessible and functional on various mobile devices.
* **Analytics:**
    * Google Analytics: Tracking user behavior, engagement, and key performance indicators.

## Functionality

This backend service handles:

* **User Management:** Registration, login, profile management, and authentication.
* **Game Logic:** Real-time scoring calculations based on IPL match data, league management, and player statistics.
* **API Endpoints:** Providing data to the frontend application for user interfaces and interactions.
* **Data Storage:** Managing and retrieving data from the MySQL database.
* **Cloud Infrastructure:** Utilizing GCP services for scalability and reliability.

## Getting Started

To run this application, you will need:

1.  **Java Development Kit (JDK):** Install the latest JDK on your system.
2.  **MySQL Database:** Set up a MySQL database and create the necessary tables. (Schema details will be provided later.)
3.  **Google Cloud Platform (GCP) Account:** Configure your GCP credentials for cloud deployment.
4.  **Maven or Gradle:** Use a build tool like Maven or Gradle to build the project.

**Steps:**

1.  Clone the repository:

    ```bash
    git clone [https://github.com/rahulkadam/Sport-fantasy-league.git](https://www.google.com/search?q=https://github.com/rahulkadam/Sport-fantasy-league.git)
    cd Sport-fantasy-league
    ```

2.  Configure Database:
    * Create a MySQL database and update the `application.properties` or `application.yml` file with your database credentials.
    * (Database schema details to be added here later)

3.  Build the project:
    * Using Maven: `mvn clean install`
    * Using Gradle: `gradle build`

4.  Run the application:
    * `java -jar target/your-app.jar` (or the appropriate command for your build tool)

5.  Configure GCP (if needed):
    * If deploying to GCP, configure your GCP project and deployment settings.

## API Endpoints

(Detailed API documentation to be added here later)

* `/users`: User registration, login, and profile management.
* `/leagues`: League creation, joining, and management.
* `/players`: Player data and statistics.
* `/scores`: Real-time scoring updates.
* `/teams`: User team management.

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## Contact

[Kadamrahul581@gmail.com]
[https://www.linkedin.com/in/rahul-kadam-19211022/]
