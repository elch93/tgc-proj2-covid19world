//https://pomber.github.io/covid19/timeseries.json
//https://covidapi.info/api/v1/country/SGP/latest


let countryname = "Singapore" //SG by default
let todaydate = new Date()
console.log(todaydate)
let loaddate = moment(todaydate).subtract(1, "day")
loaddate = moment(loaddate).format("DD/MM/YY")

console.log(loaddate)

//load latest info
function loadLatest() {
    $("#ctoday").empty(), $("#rtoday").empty(), $("#dtoday").empty(),
        $("#datedisplay").empty(), $("#totalconfirmed").empty(),
        $("#totalrecovered").empty(), $("#totaldeaths").empty(), $("#dateselect").empty();
    axios.get("https://pomber.github.io/covid19/timeseries.json").then(function (response) {
        //get the daily data
        let countrydata = response.data[`${countryname}`].reverse()

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


        for (let i = 0; i < 30; i++) {
            $("#dateselect").append(`<option>${countrydata[i].date}</option>`)
        }

        for (let i = 0; i < 30; i++) {
            if (countrydata[i].date == loaddate) {
                //console.log(countrydata[i])
                //console.log(i)

                $("#datedisplay").append(`${countrydata[i].date}`)

                let dailyIncrease = parseInt(countrydata[i].confirmed) - parseInt(countrydata[i + 1].confirmed)
                let dailyRecovered = parseInt(countrydata[i].recovered) - parseInt(countrydata[i + 1].recovered)
                let dailyDeaths = parseInt(countrydata[i].deaths) - parseInt(countrydata[i + 1].deaths)
                //console.log(countrydata)

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

                $("#totalconfirmed").append(`${countrydata[i].confirmed}`)
                $("#totalrecovered").append(`${countrydata[i].recovered}`)
                $("#totaldeaths").append(`${countrydata[i].deaths}`)





                //get the data for past 7 days
                let weeklydata = countrydata.slice(i, i + 7)
                //reduce date length on x axis by removing YY
                for (let i of weeklydata) {
                    i.date = moment(i.date, "DD/MM/YY").format("MM/DD")
                }
                //console.log(weeklydata)

                let maxweekly = weeklydata[0].confirmed
                let minweekly = weeklydata[6].confirmed
                let cf = crossfilter(weeklydata)
                let weeklyx = cf.dimension(f => f.date)
                let weeklyy = weeklyx.group().reduceSum(f => f.confirmed)

                dc.lineChart("#linegraphx")
                    .width(380) //make mobile responsive later!
                    .height(250)
                    .dimension(weeklyx)
                    .group(weeklyy)
                    .x(d3.scaleBand())
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Date")
                    .y(d3.scaleLinear().domain([minweekly * 0.95, maxweekly * 1.05]))
                    // .yAxisLabel("Cases")
                    .yAxis().ticks(4)

                dc.renderAll()


                let recoveryrate = ((countrydata[i].recovered / countrydata[i].confirmed) * 100).toFixed(2)
                let remainderr = 100 - recoveryrate
                //recovery rates chart
                new Chart(document.getElementById("rrdonut"), {
                    type: 'doughnut',
                    data: {
                        labels: [],
                        datasets: [
                            {
                                backgroundColor: ["green", "grey"],
                                data: [recoveryrate, remainderr]
                            }
                        ]
                    },
                    options: {
                        events: [],
                        title: {
                            display: true,
                            text: 'Recovery Rate' + " " + recoveryrate + "%"
                        }
                    }
                });


                let deathrate = ((countrydata[i].deaths / countrydata[i].confirmed) * 100).toFixed(2)
                let remainderd = 100 - recoveryrate
                //death rates chart
                new Chart(document.getElementById("drdonut"), {
                    type: 'doughnut',
                    data: {
                        labels: [],
                        datasets: [
                            {
                                backgroundColor: ["red", "grey"],
                                data: [deathrate, remainderd]
                            }
                        ]
                    },
                    options: {
                        events: [],
                        title: {
                            display: true,
                            text: 'Death Rate' + " " + deathrate + "%"
                        }
                    }
                });
            }
        }










    })//axios end 
}//function loadlatest end



//loadonclick
function getData() {
    let countryselected = $("#countryselect").val()
    let dateselected = $("#dateselect").val()
    //console.log(countryselected)
    countryname = countryselected
    loaddate = dateselected
    loadLatest()
}


//load ranking
function getTop5() {
    axios.get("https://pomber.github.io/covid19/timeseries.json").then(function (r) {
        let alldata = r.data
        let countriesdata = []
        let maxindex = alldata["Singapore"].length - 1
        //console.log(maxindex)
        for (let i in alldata) {
            let j = 0
            //console.log(alldata[i][maxindex])
            countriesdata.push(
                j = {
                    "Country": i,
                    "Latest Total": alldata[i][maxindex].confirmed
                })
            j++
        }
        countriesdata.sort(function(a,b){
            return b["Latest Total"] - a["Latest Total"]
        })
        
        let top5 = countriesdata.slice(0,5)
        console.log(top5)

        for (let i of top5) {
            console.log(i.Country)
            $("#worldranking").append(
                `<div class="col-12">
                    <p>Country: ${i.Country}</p>
                    <p>Total Cases: ${i["Latest Total"]}</p>
                </div>`
            )
        }




    })//axios end
}//top 5 function end