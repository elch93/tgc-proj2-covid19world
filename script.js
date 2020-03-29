// daily https://api.covid19api.com/summary
// since day 1, confirmed https://api.covid19api.com/total/dayone/country/singapore/status/confirmed

$(function () {
    let countryname = "singapore"; //sg by default, dynamic
    let casetype = "confirmed"; //confirmed, recovered, deaths
    let apisummaryurl = "https://api.covid19api.com/summary"
    let countrycasesurl = "https://api.covid19api.com/total/dayone/country/"
        + countryname + "/status/" + casetype;





    //making main line chart (default:sg past 7 days)
    function loadLC() {
        axios.get("https://api.covid19api.com/total/dayone/country/"
        + countryname + "/status/" + casetype).then(function (response) {
            response.data.reverse();
            //console.log(response.data);
            let xCases = response.data;
            //convert dates
            for (let i in xCases) {
                xCases[i].Date = moment(xCases[i].Date).format("DD/MM/YY");
            };
    
            let xPast7Days = xCases.slice(0, 7);
            //console.log(xPast7Days);
            let maxweekly = xCases[0].Cases
            //console.log(maxweekly)
    
    
    
            //make line chart
            let cfPast7Days = crossfilter(xPast7Days);
            let xPast7DaysX = cfPast7Days.dimension(f => f.Date);
            let xPast7DaysY = xPast7DaysX.group().reduceSum(f => f.Cases);
    
            dc.lineChart("#linegraphx")
                .width(500) //make mobile responsive later!
                .height(300)
                .dimension(xPast7DaysX)
                .group(xPast7DaysY)
                .x(d3.scaleBand())
                .xUnits(dc.units.ordinal)
                .xAxisLabel("Date")
                .y(d3.scaleLinear().domain([0, maxweekly + 200]))
                .yAxisLabel("Cases")
                .yAxis().ticks(5)
    
            dc.renderAll()
    
        })//axios end get country's cases since day1
    }
    



    loadLC() //loadLC at first



    //making list of countries for user to select
    axios.get(apisummaryurl).then(function(response){
        //console.log(response.data.Countries)
        
        let countrylist = []
        for (let i in response.data.Countries){
           countrylist.push(response.data.Countries[i].Country.trim())
        }
        countrylist.shift()
        //console.log(countrylist)
        //appending to options
        for (let i in countrylist) {
            $("#countryselect").append(
                `
                <option>${countrylist[i]}</option> 
                `
            )
        }

    })//axios end get country list

    




    //button function
    $("#getLC").click(function(){
        countryname = $("#countryselect").val()
        //console.log(countryname)
        loadLC()
    })















})//jquery end