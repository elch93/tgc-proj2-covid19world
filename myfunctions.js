//https://pomber.github.io/covid19/timeseries.json
//https://covidapi.info/api/v1/country/SGP/latest


let countryname = "Singapore" //SG by default

//load latest info
function loadLatest() {
        $("#ctoday").empty(), $("#rtoday").empty(), $("#dtoday").empty(), $("#datedisplay").empty();
    axios.get("https://pomber.github.io/covid19/timeseries.json").then(function (response) {
        //get the daily data
        let countrydata = response.data[`${countryname}`].reverse()
        let dailyIncrease = parseInt(countrydata[0].confirmed) - parseInt(countrydata[1].confirmed)
        let dailyRecovered = parseInt(countrydata[0].recovered) - parseInt(countrydata[1].recovered)
        let dailyDeaths = parseInt(countrydata[0].deaths) - parseInt(countrydata[1].deaths)
        console.log(countrydata)

        $("#ctoday").append(`${dailyIncrease}`)
        if (dailyIncrease > 0) {
            $("#ctoday").append(`<i class="fas fa-angle-double-up red"></i>`)
        }

        $("#rtoday").append(`${dailyRecovered}`)
        if (dailyRecovered > 0) {
            $("#rtoday").append(`<i class="fas fa-angle-double-up green"></i>`)
        }

        $("#dtoday").append(`${dailyDeaths}`)
        if (dailyDeaths > 0) {
            $("#dtoday").append(`<i class="fas fa-angle-double-up red"></i>`)
        }
        
        



        //converting dates to ISO format
        for (let i of countrydata) {
            //console.log(i.date[6])
            if (i.date[6] === "-") {
                i.date = i.date.substr(0, 5) + "0" + i.date.substr(5);
            }
            if (i.date.length < 10) {
                i.date = i.date.substr(0, 8) + "0" + i.date.substr(8);
            }
            //console.log(i.date)
            i.date = moment(i.date).format("DD/MM/YY")
        }
        
        $("#datedisplay").append(`${countrydata[0].date}`)

        //get the data for past 7 days
        let weeklydata = countrydata.slice(0, 7)
        //console.log(weeklydata)
        let maxweekly = weeklydata[0].confirmed
        let minweekly = weeklydata[6].confirmed
        //console.log(minweekly)
        let cf = crossfilter(weeklydata)
        let weeklyx = cf.dimension(f => f.date)
        //console.table(weeklyx.top(5))
        let weeklyy = weeklyx.group().reduceSum(f => f.confirmed)

        dc.lineChart("#linegraphx")
            .width(380) //make mobile responsive later!
            .height(250)
            .dimension(weeklyx)
            .group(weeklyy)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Date")
            .y(d3.scaleLinear().domain([minweekly*0.95, maxweekly*1.05]))
            .yAxisLabel("Cases")
            .yAxis().ticks(4)

        dc.renderAll()

        



    })//axios end 
}//function loadlatest end


//loadonclick
function getData(){
    let countryselected = $("#countryselect").val()
    console.log(countryselected)
    countryname = countryselected
    loadLatest()
}

