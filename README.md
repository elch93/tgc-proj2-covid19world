# COVIDWORLD - COVID-19 Stats Tracker
The website can be viewed [here](https://elch93.github.io/tgc-proj2-covid19world/).

In light of the current situation, I have decided to make a website that tracks the statistics of the COVID-19 in countries around the world for Code Institute's Interactive Frontend Development Milestone Project. The statistics provide a quick insight into the total cases, recovered and deaths of the available countries (according to the Pomber's API) in each of the past 60 days. The main goal of this website is to spread awareness about the COVID-19 situation. It is mainly for visitors who want to keep updated and make sense of the COVID-19 situation across the world.
 
## UX

### Concept
The target audience for this website are users who are interested in looking at numbers related to the COVID-19 cases in various countries around the world. A Boostrap modal is used to explain the key interactive functions of the website. The website allows users to look for their country of interest through either the Leaflet map, or the search button. The button with a globe as icon provides global statistics while the list icon provides an overview of statistics in each country as a list format. Note: The default map view is set on Singapore.

In mobile devices, the details panel on the right will be hidden due to space constraint. It can be toggled by the details button.

### Color Scheme
The colors used are mainly black background and white text, with orange, red and green to represent confirmed cases, deaths and recovered cases respectively. The black background symbolises the glumness of the COVID-19 pandemic.

### User Stories
- As a curious visitor, I want to be updated with the daily/total number of cases in a particular country so that I can gain more insight into the situation.
- As a curious visitor, I want to know the number of cases/ranking in various countries so that I can compare the situation between countries and understand the severity or effectiveness of government strategies in those countries.
- As a concerned visitor, I want to know the global number of cases to have a grasp on the severity of the situation.

## Features
### Existing Features
- Map Navigation: Search for your country of interest through the Leaflet map. The markers provide an overview of the total and daily confirmed, recovered, death cases (note that daily numbers are in brackets).
- Search button: Search for the country of interest through a list of available countries. Date-specific results are also available (past 60 days only).
- Globe button: Check out the global statistics and trend through numbers and charts!
- List button: Provides the list of available countries with their summarised stats in alphabetical order, or in ranking order.
- Mobile friendly: Suitable for large devices such as computers and laptops, medium-sized devices such as tablets and small-sized devices such as smartphones.
- Details button (in mobile/small devices mode): Toggles the detailed statistics panel.

### Features Left to Implement
- News widget: Provides news articles for users to read and keep up to date with the current situation
- WHO tips & advice: Provides tips and guides on personal hygiene by WHO.
- Comparison feature: Compares statistics between two countries of interest.

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
- Google Chrome, Firefox

## Testing
### Website Functions
- On page load, a Bootstrap modal will appear and it can be closed by clicking on either the 'Close' button or cross icon on the top right.

- Clicking on the grey search button on the top left makes the search options available. Clicking on the yellow search will make the overlap shrink and loads the desired data across the website. If not, clicking on the cross icon on the top left exits the overlay.

- Clicking on the globe button displays the global statistics. Clicking on the legends of the World Trend Chart JS filters the graph accordingly. Again, the cross icon will allow the user to exit the overlay.

- Clicking on the list button displays the countries in a list format. Clicking on the ranking button will sort the list according to their total cases. Clicking on the 'A-Z' button will sort the list according to alphabetical order. Clicking on the back to top button will bring the user to the top of the list. The cross icon will allow the user to exit the overlay as well.

- On click, the markers on the Leaflet map will load the flag image and case results for that particular country on a popup. The zoom controls allow the user to zoom in and out of the map. Clicking the x on the top right of the popup will close the popup.

- The left and right buttons on the carousel will allow the previous and next panels to be shown respectively. Clicking on the indicators below will also display the selected panel. Indicators are lighted up according to the current panel displayed. Indicators and the (prev/next) buttons change color upon hover as well. 

- Both Chart JS and DC JS graphs will allow the user to see details upon hover along the plotted points in the line.

### Known Bugs
- For the line chart in the Global Statistics section, the latest plot on the line does not display its details on hover.

- The console will have error messages regarding the initialisation of the Leaflet map but this does not affect the functions of the website or obstruct its goal.

- Since the API by Pomber is updated daily according to his Timezone, I have to deduct 1-2 days from the current date in order to retrieve the 'latest' data due to our Timezone differences. That being said, the numbers shown on the website will definitely be slightly behind that of those reported by the news or governments.

- Certain country names between the 2 APIs are named differently and I had to either manually rename each of them or exclude them from the data. Stats from cruise ships such as Diamond Princess were also excluded.

- I am aware that my codes, especially Javascript codes, can be further optimized.

### Main Challenges
- Previously, the statistics on the page usually did not display on the first time the website is loaded. This could be due to the clash in load timings of the map and APIs. To combat this issue, I deployed some setTimeout functions to allow the map to load properly first before appending statistics across the page and this seemed to have worked.

- Working on the DC JS, its syntax can be very challenging for beginner coders like me. On the other hand, Chart JS is more beginner friendly. Both have their own perks and cons. I chose to use both in this website in order to practice my coding. Arguably, I should be consistent and stick to one type next time.

## Deployment
### My Process
1. The project is based on Code Institute's template and was cloned upon initialisation to my local drive through git clone in the command prompt.

2. Visual Studio Code was employed to code the website. Chrome browser was my go to browser to preview my website. 

3. The master branch of the website was deployed through Github.

### Running My Code
1. You can either use the fork function on github or clone/download button to duplicate the files in my master branch. For cloning, type git clone https://github.com/elch93/tgc-proj2-covid19world.git in your system's command prompt.

2. Use a code editor/IDE such as Visual Studio Code or Gitpod to open the folder and preview the website by running the code.


## Credits

### Content
- COVID-19 Time Series API by [Pomber](https://github.com/pomber/covid19).
- Countries information (e.g. flag pictures, country coordinates) API by [Apilayer](https://github.com/apilayer/restcountries).
- W3Schools for various tutorials: bootstrap modal, custom carousel.
- Stackoverflow for helpful answers in helping me create my dc d3 js charts and modifying the Leaflet map, as well as teaching me the code for thousands separator.
- Leaflet Map tutorial by my [lecturer](https://github.com/kunxin-chor/tgc5-leaflet). 


### Media
- Country flags are credited to restcountries API as stated above.

### Acknowledgements

- I received inspiration for this project from the current global pandemic situation and Pomber's API.

- This is for educational use.
