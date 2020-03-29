//https://pomber.github.io/covid19/timeseries.json
//https://covidapi.info/api/v1/country/SGP/latest


let countryname = "Singapore" //SG by default

function loadLatest() {

    
    axios.get("https://pomber.github.io/covid19/timeseries.json").then(function (response){
        //get the daily data
        let countrydata = response.data[`${countryname}`].reverse()
        let dailyIncrease = parseInt(countrydata[0].confirmed) - parseInt(countrydata[1].confirmed)
        //console.log(countrydata)
        
        $("#ctoday").append(`${dailyIncrease}`)
        $("#rtoday").append(`${countrydata[0].recovered}`)
        $("#dtoday").append(`${countrydata[0].deaths}`)

        //get the data for past 7 days
        let weeklydata = countrydata.slice(0,7)
        console.log(weeklydata)
        let maxweekly = weeklydata[0].confirmed
        let minweekly = weeklydata[6].confirmed
        console.log(minweekly)
        let cf = crossfilter(weeklydata)
        let weeklyx = cf.dimension(f => f.date)
        //console.table(weeklyx.top(5))
        let weeklyy = weeklyx.group().reduceSum(f => f.confirmed)

        dc.lineChart("#linegraphx")
            .width(500) //make mobile responsive later!
            .height(300)
            .dimension(weeklyx)
            .group(weeklyy)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Date")
            .y(d3.scaleLinear().domain([minweekly, maxweekly+200]))
            .yAxisLabel("Cases")
            .yAxis().ticks(4)

        dc.renderAll()
        













    })//axios end 
}//function loadlatest end




// making main line chart (default:sg past 7 days)
// function loadLC() {
//     axios.get("https://api.covid19api.com/total/dayone/country/"
//     + countryname + "/status/" + casetype).then(function (response) {
//         response.data.reverse();
//         console.log(response.data);
//         let xCases = response.data;
//         //convert dates
//         for (let i in xCases) {
//             xCases[i].Date = moment(xCases[i].Date).format("DD/MM/YY");
//         };

//         let xPast7Days = xCases.slice(0, 7);
//         console.log(xPast7Days);
//         let maxweekly = xCases[0].Cases
//         let minweekly = xCases[6].Cases
//         console.log(maxweekly)
//         console.log(minweekly)


//         //make line chart
//         let cfPast7Days = crossfilter(xPast7Days);
//         let xPast7DaysX = cfPast7Days.dimension(f => f.Date);
//         let xPast7DaysY = xPast7DaysX.group().reduceSum(f => f.Cases);

//         dc.lineChart("#linegraphx")
//             .width(500) //make mobile responsive later!
//             .height(300)
//             .dimension(xPast7DaysX)
//             .group(xPast7DaysY)
//             .x(d3.scaleBand())
//             .xUnits(dc.units.ordinal)
//             .xAxisLabel("Date")
//             .y(d3.scaleLinear().domain([minweekly, maxweekly+200]))
//             .yAxisLabel("Cases")
//             .yAxis().ticks(4)

//         dc.renderAll()

//     })//axios end get country's cases since day1
// }

// //load details function
// function loadDetails() {
    
// }