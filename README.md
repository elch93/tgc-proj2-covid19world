# COVIDWORLD - COVID-19 Stats Tracker
The website can be viewed [here](https://elch93.github.io/tgc-proj2-covid19world/)) [https://elch93.github.io/tgc-proj2-covid19world/].

In light of the current situation, I have decided to make a website that tracks the statistics of the COVID-19 in countries around the world for Code Institute's Interactive Frontend Development Milestone Project. The statistics provide a quick insight into the total cases, recovered and deaths of each available country in each day.
 
## UX

### Concept
The target audience for this website are users who are interested in looking at numbers related to the COVID-19 cases in various countries around the world. A Boostrap modal is used to explain the key interactive functions of the website. The website allows users to look for their country of interest through either the Leaflet map, or the search button. The button with a globe as icon provides global statistics while the list icon provides an overview of statistics in each country as a list format. 

In mobile devices, the details panel on the right will be hidden due to space constraint. It can be toggled by the details button.

### Color Scheme
The colors used are mainly black and white, with orange, red and green to represent confirmed cases, deaths and recovered cases respectively.

### User Stories
- As a curious visitor, I want to know the daily/total number of cases in a particular country so that I can gain more insight into the situation.
- As a curious visitor, I want to know the number of cases/ranking in various countries so that I can compare the situation between countries and understand the severity or effectiveness of government strategies in those countries.
- As a concerned visitor, I want to know the global number of cases to understand the severity of the situation.

## Features
### Existing Features
- Map Navigation: Search for your country of interest through the Leaflet map. The markers provide an overview of the total and daily confirmed, recovered, death cases (note that daily numbers are in brackets).
- Search button: Search for the country of interest through a list of available countries. Date-specific results are also available (past 60 days only).
- Globe button: Check out the global statistics and trend through numbers and charts!
- List button: Provides the list of available countries with their summarised stats in alphabetical order, or in ranking order.
- Details button (in mobile/small devices mode): Toggles the detailed statistics panel.

### Features Left to Implement
- News widget: Provides news articles for users to read and keep up to date with the current situation
- WHO tips & advice: Provides tips and guides on personal hygiene by WHO.

## Technologies Used

- HTML
- CSS
- Javascript
- Jquery
- AJAX
- Axios
- Bootstrap
- Leaflet Map
- Chart JS
- DC D3 JS
- Google Fonts ('Yantramanav', 'Heebo', 'Oswald', 'Noto Sans SC')
- Font Awesome
- Visual Studio Code
- Git
- Github
- Google Chrome



## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

### Content
- COVID-19 Time Series API by [Pomber](https://github.com/pomber/covid19).
- Countries information (e.g. flag pictures, country coordinates) API by [Apilayer](https://github.com/apilayer/restcountries).
- W3Schools for various tutorials: bootstrap modal, custom carousel.
- Stackoverflow for various helpful answers in helping me create my dc d3 js charts and modifying the Leaflet map.


### Media
- Country flags are credited to restcountries API as stated above.

### Acknowledgements

- I received inspiration for this project from the global pandemic situation and Pomber's API.
