//json links
//https://pomber.github.io/covid19/timeseries.json
//https://covidapi.info/api/v1/country/SGP/latest




//adds comma to thousands places
function thousands_separators(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

//get flag picture based on country name displayed
function getCountryFlag() {
    axios.get("https://restcountries.eu/rest/v2/all").then(function (r) {
        $("#flagdisplay2").empty()
        countrydisplayed = $("#countrydisplay").text()

        //console.log("flag", r.data)

        for (let i of r.data) {
            if (countrydisplayed == i.name || countrydisplayed == i.alpha2Code) {
                $("#flagdisplay").css("background-image", "url(" + i.flag + ")")
                $("#flagdisplay2").append(`<img src="${i.flag}">`)
                break
            }

            //exceptions due to naming differences
            else if (countrydisplayed == "Taiwan*") {
                $("#flagdisplay").css("background-image", "url(" + r.data[221].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[221].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Vietnam") {
                $("#flagdisplay").css("background-image", "url(" + r.data[244].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[244].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Korea, South") {
                $("#flagdisplay").css("background-image", "url(" + r.data[210].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[210].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Czechia") {
                $("#flagdisplay").css("background-image", "url(" + r.data[61].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[61].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "North Macedonia") {
                $("#flagdisplay").css("background-image", "url(" + r.data[132].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[132].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Laos") {
                $("#flagdisplay").css("background-image", "url(" + r.data[122].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[122].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Bolivia") {
                $("#flagdisplay").css("background-image", "url(" + r.data[26].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[26].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Brunei") {
                $("#flagdisplay").css("background-image", "url(" + r.data[36].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[36].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Iran") {
                $("#flagdisplay").css("background-image", "url(" + r.data[107].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[107].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Moldova") {
                $("#flagdisplay").css("background-image", "url(" + r.data[146].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[146].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Russia") {
                $("#flagdisplay").css("background-image", "url(" + r.data[185].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[185].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Tanzania") {
                $("#flagdisplay").css("background-image", "url(" + r.data[223].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[223].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "United Kingdom") {
                $("#flagdisplay").css("background-image", "url(" + r.data[238].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[238].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Venezuela") {
                $("#flagdisplay").css("background-image", "url(" + r.data[243].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[243].flag}" style="height:50px">`)
                break
            }

            else if (countrydisplayed == "Syria") {
                $("#flagdisplay").css("background-image", "url(" + r.data[220].flag + ")")
                $("#flagdisplay2").append(`<img src="${r.data[220].flag}" style="height:50px">`)
                break
            }


        }


    })//axios end

}//get country flag end


function convertDates(countrydata) {
    //converting dates to ISO format
    for (let i of countrydata) {
        if (i.date[6] === "-") {
            i.date = i.date.substr(0, 5) + "0" + i.date.substr(5);
        }
        if (i.date.length < 10) {
            i.date = i.date.substr(0, 8) + "0" + i.date.substr(8);
        }
        i.date = moment(i.date).format("DD/MM/YY")
    }
}



let countryname = "Singapore" //SG by default

//obtaining latest date, the json is 1,2 days behind
let todaydate = new Date()
console.log(todaydate.getDay())
let loaddate = moment(todaydate).subtract(1, "day")
if (todaydate.getHours() <= 8) {
    loaddate = moment(todaydate).subtract(2, "day")
}
loaddate = moment(loaddate).format("DD/MM/YY")
console.log(loaddate)
let countrymap = "Singapore"

//#1 load latest info
function loadLatest() {

    getMap()
    if (countryname == "Taiwan") {
        countryname = "Taiwan*"
    }

    if (countryname == "United States of America") {
        countryname = "US"
    }


    $("#ctoday").empty(), $("#rtoday").empty(), $("#dtoday").empty(),
        $("#datedisplay").empty(), $("#countrydisplay").empty(), $("#totalconfirmed").empty(),
        $("#totalrecovered").empty(), $("#totaldeaths").empty();

    axios.get("https://pomber.github.io/covid19/timeseries.json").then(function (response) {
        //get the daily data
        let countrydata = response.data[`${countryname}`].reverse()

        convertDates(countrydata)

        let numofc = 0
        for (let i in response.data) {
            numofc += 1
        }

        console.log(numofc)

        for (let i = 0; i < 60; i++) {
            if (countrydata[i].date == loaddate) {
                $("#datedisplay").append(`${countrydata[i].date}`)
                $("#countrydisplay").append(`${countryname}`)
                if (countryname == "US") {
                    $("#countrydisplay").empty()
                    $("#countrydisplay").append("United States of America")
                }

                if (countryname == "Taiwan*") {
                    $("#countrydisplay").empty()
                    $("#countrydisplay").append("Taiwan")
                }


                let dailyIncrease = parseInt(countrydata[i].confirmed) - parseInt(countrydata[i + 1].confirmed)
                let dailyRecovered = parseInt(countrydata[i].recovered) - parseInt(countrydata[i + 1].recovered)
                let dailyDeaths = parseInt(countrydata[i].deaths) - parseInt(countrydata[i + 1].deaths)

                if (dailyIncrease > 0) {
                    $("#ctoday").append(`(+${thousands_separators(dailyIncrease)})`)
                    $("#ctoday").append(`<i class="fas fa-angle-double-up red"></i>`)
                }

                if (dailyRecovered > 0) {
                    $("#rtoday").append(`(+${thousands_separators(dailyRecovered)})`)
                    $("#rtoday").append(`<i class="fas fa-angle-double-up green"></i>`)
                }

                if (dailyDeaths > 0) {
                    $("#dtoday").append(`(+${thousands_separators(dailyDeaths)})`)
                    $("#dtoday").append(`<i class="fas fa-angle-double-up red"></i>`)
                }

                $("#totalconfirmed").append(`${thousands_separators(countrydata[i].confirmed)}`)
                $("#totalrecovered").append(`${thousands_separators(countrydata[i].recovered)}`)
                $("#totaldeaths").append(`${thousands_separators(countrydata[i].deaths)}`)







                //get the data for past 7 days
                let weeklydata = countrydata.slice(i, i + 7)
                //reduce date length on x axis by removing YY
                for (let i of weeklydata) {
                    i.date = moment(i.date, "DD/MM/YY").format("MM/DD")
                }


                // linechart combined
                let cArr = []
                let rArr = []
                let dArr = []
                let dateArr = []


                for (let i of weeklydata) {
                    cArr.unshift(i.confirmed)
                    rArr.unshift(i.recovered)
                    dArr.unshift(i.deaths)
                    dateArr.unshift(i.date)
                }



                let countryline = new Chart(document.getElementById("combined"), {
                    type: 'line',
                    data: {
                        labels: dateArr,
                        datasets: [{
                            data: cArr,
                            label: "Total",
                            borderColor: "#F2471F",
                            pointBackgroundColor: "gold",
                            fill: false
                        }, {
                            data: rArr,
                            label: "Recovered",
                            borderColor: "#049090",
                            pointBackgroundColor: "#01D1B3",
                            fill: false
                        }, {
                            data: dArr,
                            label: "Deaths",
                            borderColor: "#82124A",
                            pointBackgroundColor: "#EC4E6D",
                            fill: false
                        }
                        ]
                    },
                    options: {
                        title: {
                            fontColor: '#F3F3F3',
                            fontSize: 20,
                            display: true,
                            text: 'Trend (Past 7 Days)',
                            padding: 30,
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                fontColor: '#F3F3F3',
                            }
                        },
                        scales: {

                            xAxes: [{
                                ticks: {
                                    fontColor: '#e3e3e3',
                                },
                                gridLines: {
                                    zeroLineWidth: 1,
                                    zeroLineColor: " #e3e3e3",
                                    color: "rgba(255,255,255,0.2)",
                                },
                            }],
                            yAxes: [{
                                ticks: {

                                    fontColor: '#e3e3e3',
                                },
                                gridLines: {
                                    zeroLineWidth: 1,
                                    zeroLineColor: " #e3e3e3",
                                    color: "rgba(255,255,255,0.2)",
                                },
                            }],
                        }

                    }
                });



                $("#getData").click(function () {
                    $("#cccontainer").empty()
                    countryline.destroy()
                    $("#cccontainer").append(`<canvas id="combined" width="300" height="370"></canvas>`)
                })







                //console.table(weeklydata)
                let maxcweekly = weeklydata[0].confirmed
                let mincweekly = weeklydata[6].confirmed


                let cfconfirmed = crossfilter(weeklydata)
                let weeklycx = cfconfirmed.dimension(f => f.date)
                let weeklycy = weeklycx.group().reduceSum(f => f.confirmed)

                let cgraph = new dc.LineChart("#linegraphc")
                cgraph.width(300) //make mobile responsive later!
                    .height(230)
                    .brushOn(true)
                    .dimension(weeklycx)
                    .group(weeklycy)
                    .x(d3.scaleBand())
                    .xUnits(dc.units.ordinal)
                    //.xAxisLabel("Date")
                    .y(d3.scaleLinear().domain([mincweekly * 0.95, maxcweekly * 1.05]))
                    // .yAxisLabel("Cases")
                    .yAxis().ticks(4)



                let maxrweekly = weeklydata[0].recovered
                let minrweekly = weeklydata[6].recovered
                let weeklyry = weeklycx.group().reduceSum(f => f.recovered)

                let rgraph = new dc.LineChart("#linegraphr")
                rgraph.width(300) //make mobile responsive later!
                    .height(230)
                    .brushOn(true)
                    .dimension(weeklycx)
                    .group(weeklyry)
                    .x(d3.scaleBand())
                    .xUnits(dc.units.ordinal)
                    //.xAxisLabel("Date")
                    .y(d3.scaleLinear().domain([minrweekly * 0.95, maxrweekly * 1.05]))
                    // .yAxisLabel("Cases")
                    .yAxis().ticks(4)



                let maxdweekly = weeklydata[0].deaths
                let mindweekly = weeklydata[6].deaths

                let weeklydy = weeklycx.group().reduceSum(f => f.deaths)

                let dgraph = new dc.LineChart("#linegraphd")
                dgraph.width(300) //make mobile responsive later!
                    .height(230)
                    .brushOn(true)
                    .dimension(weeklycx)
                    .group(weeklydy)
                    .x(d3.scaleBand())
                    .xUnits(dc.units.ordinal)
                    //.xAxisLabel("Date")
                    .y(d3.scaleLinear().domain([mindweekly * 0.95, maxdweekly * 1.05]))
                    // .yAxisLabel("Cases")
                    .yAxis().ticks(4)

                dc.renderAll()









                //rr & dr chart
                let recoveryrate = ((countrydata[i].recovered / countrydata[i].confirmed) * 100).toFixed(2)
                let remainderr = 100 - recoveryrate
                //recovery rates chart
                let crr = new Chart(document.getElementById("rrdonut"), {
                    type: 'doughnut',
                    data: {
                        labels: [],
                        datasets: [
                            {
                                backgroundColor: ["#049090", "#F3F3F3"],
                                data: [recoveryrate, remainderr],
                                borderWidth: 0,
                            }
                        ]
                    },
                    options: {
                        events: [],
                        title: {
                            fontColor: '#F3F3F3',
                            fontSize: 18,
                            display: true,
                            text: 'Recovery Rate:' + " " + recoveryrate + "%"
                        }
                    }
                });


                let deathrate = ((countrydata[i].deaths / countrydata[i].confirmed) * 100).toFixed(2)
                let remainderd = 100 - recoveryrate
                //death rates chart
                let cdr = new Chart(document.getElementById("drdonut"), {
                    type: 'doughnut',
                    data: {
                        labels: [],
                        datasets: [
                            {
                                backgroundColor: ["#82124A", "#F3F3F3"],
                                data: [deathrate, remainderd],
                                borderWidth: 0
                            }
                        ]
                    },
                    options: {
                        events: [],
                        title: {
                            fontColor: '#F3F3F3',
                            fontSize: 18,
                            display: true,
                            text: 'Death Rate:' + " " + deathrate + "%"
                        }
                    }
                });
            }
        }//for loop end


        setTimeout(function () { getCountryFlag() }, 800)
    })//axios end 





}//function loadlatest end

// get global stats
function getGlobalTotalByDate() {
    axios.get("https://pomber.github.io/covid19/timeseries.json").then(function (r) {
        let data = r.data
        $("#totalc").empty(), $("#totalr").empty(), $("#totald").empty(),
            $("#worldCIncrease").empty(), $("#worldRIncrease").empty(), $("#worldDIncrease").empty()

        //converting dates to ISO format
        for (let i in data) {
            convertDates(data[i])
        }


        let totalc = 0
        let totalr = 0
        let totald = 0
        let past7global = []

        for (let i in data) {
            for (let j = 0; j < data[i].length; j++) {
                if (loaddate == data[i][j].date) {
                    totalc += data[i][j].confirmed
                    totalr += data[i][j].recovered
                    totald += data[i][j].deaths
                    past7global.push(data[i].slice(j - 6, j + 1))
                }

            }
        }

        $("#totalc").append(`${thousands_separators(totalc)}`)
        $("#totalr").append(`${thousands_separators(totalr)}`)
        $("#totald").append(`${thousands_separators(totald)}`)

        let past7cArr = []
        let past7rArr = []
        let past7dArr = []
        let dateArr = []

        for (let j = 0; j < 7; j++) {
            let totalc2 = 0
            let totalr2 = 0
            let totald2 = 0

            for (let i in past7global) {
                totalc2 += (past7global[i][j].confirmed)
                totalr2 += (past7global[i][j].recovered)
                totald2 += (past7global[i][j].deaths)
                past7global[i][j].date = moment(past7global[i][j].date, "DD/MM/YY").format("MM/DD")
            }

            past7cArr.push(totalc2)
            past7rArr.push(totalr2)
            past7dArr.push(totald2)
            dateArr.push(past7global[0][j].date)
        }

        let worldCIncrease = past7cArr[6] - past7cArr[5]
        let worldRIncrease = past7rArr[6] - past7rArr[5]
        let worldDIncrease = past7dArr[6] - past7dArr[5]

        if (worldCIncrease > 0) {
            $("#worldCIncrease").append(`(+${thousands_separators(worldCIncrease)})`)
            $("#worldCIncrease").append(`<i class="fas fa-angle-double-up red"></i>`)
        }

        if (worldRIncrease > 0) {
            $("#worldRIncrease").append(`(+${thousands_separators(worldRIncrease)})`)
            $("#worldRIncrease").append(`<i class="fas fa-angle-double-up green"></i>`)
        }

        if (worldDIncrease > 0) {
            $("#worldDIncrease").append(`(+${thousands_separators(worldDIncrease)})`)
            $("#worldDIncrease").append(`<i class="fas fa-angle-double-up red"></i>`)
        }

        let worldline = new Chart(document.getElementById("worldstats"), {
            type: 'line',
            data: {
                labels: dateArr,
                datasets: [{
                    data: past7cArr,
                    label: "Total",
                    borderColor: "#303841",
                    fill: false
                }, {
                    data: past7rArr,
                    label: "Recovered",
                    borderColor: "#01D1B3",
                    fill: false
                }, {
                    data: past7dArr,
                    label: "Deaths",
                    borderColor: "#EC4E6D",
                    fill: false
                }
                ]
            },
            options: {
                title: {
                    fontColor: '#303841',
                    fontSize: 20,
                    display: true,
                    text: 'World Trend (Past 7 Days)'
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: '#303841',
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: '#303841',
                        }
                    }],
                }
            }
        });

        let worldRR = ((past7rArr[6] / past7cArr[6]) * 100).toFixed(2)
        let worldDR = ((past7dArr[6] / past7cArr[6]) * 100).toFixed(2)

        let worldRRDonut = new Chart(document.getElementById("wrrdonut"), {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [
                    {
                        backgroundColor: ["#01D1B3", "#303841"],
                        data: [worldRR, (100 - worldRR)],
                        borderWidth: 0,
                    }
                ]
            },
            options: {
                events: [],
                title: {
                    fontColor: '#303841',
                    fontSize: 20,
                    display: true,
                    text: 'Recovery Rate:' + " " + worldRR + "%"
                }
            }
        });

        let worldDRDonut = new Chart(document.getElementById("wdrdonut"), {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [
                    {
                        backgroundColor: ["#EC4E6D", "#303841"],
                        data: [worldDR, (100 - worldDR)],
                        borderWidth: 0,
                    }
                ]
            },
            options: {
                events: [],
                title: {
                    fontColor: '#303841',
                    fontSize: 20,
                    display: true,
                    text: 'Recovery Rate:' + " " + worldDR + "%"
                }
            }
        });

        $("#getData").click(function () {
            worldline.destroy()
            worldRRDonut.destroy()
            worldDRDonut.destroy()
        })

    })//axios end
}//get global stats end

//get map
// let coordinates = [1.35, 103.85] sg default

function getMap() {
    axios.all([axios.get("https://restcountries.eu/rest/v2/all"), axios.get("https://pomber.github.io/covid19/timeseries.json")]).then(function (r) {
        let restcountries = r[0].data
        let pomberdata = r[1].data
        let clist = []


        if (countrymap == "Taiwan") {
            countrymap = "Taiwan*"
        }

        if (countrymap == "United States of America") {
            countrymap = "US"
        }

        for (let i in pomberdata) {
            pomberdata[i].reverse()
        }

        let count = 0
        for (let i in pomberdata) {
            count += 1
        }

        for (let i in pomberdata) {
            convertDates(pomberdata[i])
        }

        for (let r = 0; r < 60; r++) {
            if (loaddate == pomberdata['Singapore'][r].date) {
                for (let i in pomberdata) {
                    for (let j in restcountries) {
                        if (i == restcountries[j].name || i == restcountries[j].alpha2Code) {
                            clist.push([i, restcountries[j].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Malaysia") {
                            clist.push([i, [4.2105, 101.9758], pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Taiwan*") {
                            clist.push([i, restcountries[221].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Vietnam") {
                            clist.push([i, restcountries[244].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Korea, South") {
                            clist.push([i, restcountries[210].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Czechia") {
                            clist.push([i, restcountries[61].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "North Macedonia") {
                            clist.push([i, restcountries[132].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Laos") {
                            clist.push([i, restcountries[122].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Bolivia") {
                            clist.push([i, restcountries[26].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Brunei") {
                            clist.push([i, restcountries[36].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Iran") {
                            clist.push([i, restcountries[107].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Moldova") {
                            clist.push([i, restcountries[146].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Russia") {
                            clist.push([i, restcountries[185].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Tanzania") {
                            clist.push([i, restcountries[223].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "United Kingdom") {
                            clist.push([i, restcountries[238].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Venezuela") {
                            clist.push([i, restcountries[243].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }

                        else if (i == "Syria") {
                            clist.push([i, restcountries[220].latlng, pomberdata[i][r].confirmed, pomberdata[i][r].recovered, pomberdata[i][r].deaths])
                            break
                        }



                    }

                }
            }//load date
        }//loop end




        let buglist = []
        let list180 = []
        let count2 = 0
        let count3 = 0

        for (let j in pomberdata) {
            list180.push(j)
        }

        // console.log("list180", list180)
        // console.log("before", clist)


        for (let i in list180) {
            for (let j of clist) {
                if (list180[i] == j[0]) {
                    count2 += 1
                    delete list180[i]
                }
            }
        }

        for (let i of list180) {
            if (i != undefined) {
                buglist.push(i)
                count3 += 1
            }
        }




        // console.log("after", list180)
        // console.log("map count", count2)
        // console.log("bug count",count3)



        let coordinates = undefined
        for (let i in clist) {
            if (countrymap == clist[i][0]) {
                coordinates = clist[i][1]
            }
        }

        //console.log("mapped list", clist)
        console.log("bugged", buglist)

        //removes data without flag/map location
        for (let i = 0; i < $("#countryselect option").length; i++) {
            if (buglist.includes($("#countryselect option").eq(i).text())) {
                //console.log(i)
                $("#countryselect option").eq(i).remove()

            }

        }

        let setViewCoordinates = undefined

        for (let i of clist) {
            if ($("#countryselect").val() == i[0]) {
                setViewCoordinates = i[1]
            }
        }


        let map = L.map("map1", { zoomControl: true }).setView(setViewCoordinates, 5.5)

        var LeafIcon = L.Icon.extend({
            options: {
                // shadowUrl: 'leaf-shadow.png',
                iconSize: [38, 38],
                shadowSize: [0, 0],
                iconAnchor: [22, 35],
                shadowAnchor: [4, 62],
                popupAnchor: [0, -20]
            }
        });

        customIcon = new LeafIcon({ iconUrl: 'https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/4482957981557740362-512.png' })

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
        }).addTo(map);

        let markers = []

        let countrycluster = L.markerClusterGroup()
        for (let i = 0; i < clist.length; i++) {
            let m = L.marker([clist[i][1][0], clist[i][1][1]], { title: clist[i][0], icon: customIcon })

            if (clist[i][0] == "Taiwan*") {
                clist[i][0] = "Taiwan"
            }

            if (clist[i][0] == "US") {
                clist[i][0] = "United States of America"
            }



            m.bindPopup(`
                    <div class="container-fluid" id="popup">
                        <div class="mb-2" id="flagdisplay2"></div>
                        <h5 id="countryOnMap"><b>${clist[i][0]}</b></h5>
                        <div class="row justify-content-center" id="overview">
                            <div class="col-12 col-lg-4 pt-3">
                                <p class="pt-2 pb-3">Total Cases</p>
                                <p>
                                    <span id="totalconfirmed"></span>
                                </p>
                                <p class="pt-2">
                                    <span id="ctoday"></span>
                                </p>
                            </div>
                            <div class="col-12 col-lg-4 pt-3">
                                <p class="pt-2 pb-3">Recovered</p>
                                <p>
                                    <span id="totalrecovered"></span>
                                </p>
                                <p class="pt-2">
                                    <span id="rtoday"></span>
                                </p>
                            </div>
                            <div class="col-12 col-lg-4 pt-3">
                                <p class="pt-2 pb-3">Deaths</p>
                                <p>
                                    <span id="totaldeaths"></span>
                                </p>
                                <p class="pt-2">
                                    <span id="dtoday"></span>
                                </p>
                            </div>
                        </div>
                    </div>
        `)

            markers.push(m)

            m.on("click", function () {
                getDataFromMap()
            })
            countrycluster.addLayer(m)
        }//markers add loop end






        function markerPopup(country) {
            for (let i in markers) {
                if (markers[i].options.title == country) {
                    markers[i].openPopup()

                }
            }
            //console.log(markers)
        }



        map.addLayer(countrycluster)





        markerPopup(countrymap)

        //allows map navigation
        function getDataFromMap() {
            setTimeout(function () {
                let countryselected = $("#countryOnMap").text()
                console.log("marker", countryselected)
                countrymap = countryselected

                let dateselected = $("#dateselect").val()
                countryname = countryselected
                loaddate = dateselected
                countrymap = countryselected

                loadLatest()
            }, 800)



        }

    })
}//map end





// load world list
function getGlobalList() {
    axios.all([axios.get("https://restcountries.eu/rest/v2/all"), axios.get("https://pomber.github.io/covid19/timeseries.json")]).then(function (r) {
        let restcountries = r[0].data
        let pomberdata = r[1].data
        //sort by data
        let data = []
        $("#globallist").empty()



        for (let i in pomberdata) {
            pomberdata[i].reverse()
            convertDates(pomberdata[i])
            data.push(i)
        }

        data.sort()

        

        for (let i = 0; i < data.length; i++) {
            for (let j in pomberdata) {
                if (data[i] == j) {
                    for (let k = 0; k < 60; k++) {
                        if (loaddate == pomberdata[j][k].date) {
                            data[i] = {
                                "country": data[i],
                                "confirmed": pomberdata[j][k].confirmed,
                                "recovered": pomberdata[j][k].recovered,
                                "deaths": pomberdata[j][k].deaths
                            }
                        }
                    }
                }
            }
        }


        console.log("new data", data)

        for (let i of data) {
            for (let j in restcountries) {
                if (i.country == restcountries[j].name || i.country == restcountries[j].alpha2Code) {
                    $("#globallist").append(`
                    <div class="container-fluid mb-3">
                        <img src="${restcountries[j].flag}">
                        <span>${i['country']}</span>
                        <div class="row">
                            <div class="col-4">
                                <p>Total Cases: ${i.confirmed}</p>
                            </div>
                            <div class="col-4">
                                <p>Recovered: ${i.recovered}</p>
                            </div>
                            <div class="col-4">
                                <p>Deaths: ${i.deaths}</p>
                            </div>
                        </div>
                        
                    </div>

                    `)
                }
            }
                
            

        }



    })//axios end
}//get list end


//loadonclick
function getData() {
    $('#map').empty()
    $('#map').append(`<div id="map1"></div>`)
    getMap()
    let countryselected = $("#countryselect").val()
    let dateselected = $("#dateselect").val()
    countryname = countryselected
    loaddate = dateselected
    countrymap = countryselected
    loadLatest()
    getGlobalTotalByDate()
    getGlobalList()
}