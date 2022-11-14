<h1 align="center"> Football Advisor </h1>
<h3 align="center"> A European Football/Soccer Match Scheduling Application for Superfans </h3> 

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project"> ➤ About The Project</a></li>
    <li><a href="#implementation"> ➤ Implementation</a></li>
    <li><a href="#application-instructions"> ➤ Application Instructions</a></li>
    <li><a href="#roadmap"> ➤ Roadmap</a></li>
  </ol>
</details>

<hr>

<!-- ABOUT THE PROJECT -->
<h2 id="about-the-project">About The Project</h2>

<p align="justify"> 
  This project aims to provide football/soccer superfans with an application to quickly and easily plan their trips around European match schedules. Keeping track of matches across different soccer leagues, dates, and times can often be a difficult task for fans, especially those traveling from outside of Europe. The application will allow users to select matches they want to watch from any league, and will automatically deselect any games with conflicting times. In the future, a trip-planning feature will be added that can store these selections and form an itinerary with each game. This project is a work-in-process and will continue to be updated and improved going forward.
</p>

<hr>

<!-- IMPLEMENTATION -->
<h2 id="implementation">Implementation Details</h2>

* Front-end UI implemented using Vercel’s **Next.js React** JavaScript UI framework and Adobe’s **React-Spectrum** UI component library
* Back-end match scheduling logic also implemented using the Next.js React framework, integrating with a **MongoDB** database to yield on-demand, detailed information about upcoming matches
* Fully automated deployment process using Vercel’s **CICD** feature
* Match and geocoding data retrieved from **RapidAPI**

<hr>

<!-- APPLICATION INSTRUCTIONS -->
<h2 id="application-instructions"> Application Instructions</h2>

Follow the link in the top right of this Github page, or click [here](https://football-advisor-next.vercel.app/). 
1. Select a trip date range (when you will be traveling)
2. Select the soccer leagues you are willing/able to watch (multiple selections are allowed)
3. Click on the "Retrieve matches" button
4. The table will populate with all matches that are being played in that time frame. Select matches you are interested in, and any matches that have conflicting times will be grayed out.
5. Once you have chosen all games you are interested in, click on the "Itinerary" tab to view a possible trip itinerary.

<hr>

<!-- ROADMAP -->
<h2 id="roadmap"> Roadmap</h2>

1. A "Generate Itinerary" feature that allows users to visualize all the matches they selected for their trip.
2. A user profile system, so that users can create profiles and save their itineraries.
3. Automate match data gathering (so that our data is always up to date)

<hr>
