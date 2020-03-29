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

        //converting dates to ISO format
        for (let i of countrydata) {
            //console.log(i.date[6])
            if (i.date[6] === "-") {
                i.date = i.date.substr(0,5) + "0" + i.date.substr(5);
                
            }
            if (i.date.length < 10) {
                i.date = i.date.substr(0,8) + "0" + i.date.substr(8);
            }
            console.log(i.date)
            i.date = moment(i.date).format("DD/MM/YY")
        }

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


