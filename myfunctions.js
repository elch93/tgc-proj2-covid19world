//https://pomber.github.io/covid19/timeseries.json
//https://covidapi.info/api/v1/country/SGP/latest


let countryname = "Singapore" //SG by default
let todaydate = new Date()
//console.log(todaydate.getHours())
let loaddate = moment(todaydate).subtract(1, "day")
if (todaydate.getHours() <= 7) {
    loaddate = moment(todaydate).subtract(2, "day")
}

loaddate = moment(loaddate).format("DD/MM/YY")

console.log(loaddate)



//load latest info
function loadLatest() {
    $("#ctoday").empty(), $("#rtoday").empty(), $("#dtoday").empty(),
        $("#datedisplay").empty(), $("#countrydisplay").empty(), $("#totalconfirmed").empty(),
        $("#totalrecovered").empty(), $("#totaldeaths").empty();
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




        for (let i = 0; i < 60; i++) {
            if (countrydata[i].date == loaddate) {
                //console.log(countrydata[i])
                //console.log(i)

                $("#datedisplay").append(`${countrydata[i].date}`)
                $("#countrydisplay").append(`${countryname}`)

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

                let maxcweekly = weeklydata[0].confirmed
                let mincweekly = weeklydata[6].confirmed
                let cfconfirmed = crossfilter(weeklydata)
                let weeklycx = cfconfirmed.dimension(f => f.date)
                let weeklycy = weeklycx.group().reduceSum(f => f.confirmed)

                dc.lineChart("#linegraphc")
                    .width(380) //make mobile responsive later!
                    .height(250)
                    .dimension(weeklycx)
                    .group(weeklycy)
                    .x(d3.scaleBand())
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Date")
                    .y(d3.scaleLinear().domain([mincweekly * 0.95, maxcweekly * 1.05]))
                    // .yAxisLabel("Cases")
                    .yAxis().ticks(4)

                dc.renderAll()

                let maxrweekly = weeklydata[0].recovered
                let minrweekly = weeklydata[6].recovered
                let cfrecovered = crossfilter(weeklydata)
                let weeklyrx = cfrecovered.dimension(f => f.date)
                let weeklyry = weeklyrx.group().reduceSum(f => f.recovered)

                dc.lineChart("#linegraphr")
                    .width(380) //make mobile responsive later!
                    .height(250)
                    .dimension(weeklyrx)
                    .group(weeklyry)
                    .x(d3.scaleBand())
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Date")
                    .y(d3.scaleLinear().domain([minrweekly * 0.95, maxrweekly * 1.05]))
                    // .yAxisLabel("Cases")
                    .yAxis().ticks(4)

                dc.renderAll()

                let maxdweekly = weeklydata[0].deaths
                let mindweekly = weeklydata[6].deaths
                let cfdeaths = crossfilter(weeklydata)
                let weeklydx = cfdeaths.dimension(f => f.date)
                let weeklydy = weeklydx.group().reduceSum(f => f.deaths)

                dc.lineChart("#linegraphd")
                    .width(380) //make mobile responsive later!
                    .height(250)
                    .dimension(weeklydx)
                    .group(weeklydy)
                    .x(d3.scaleBand())
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Date")
                    .y(d3.scaleLinear().domain([mindweekly * 0.95, maxdweekly * 1.05]))
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
        }//for loop end

    })//axios end 
}//function loadlatest end



//loadonclick
function getData() {
    let countryselected = $("#countryselect").val()
    let dateselected = $("#dateselect").val()
    countryname = countryselected
    loaddate = dateselected
    countrymap = countryselected
    getMap()
    loadLatest()
    getCountryFlag()
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
                    "Latest Total": alldata[i][maxindex].confirmed,
                    "Latest Recovered": alldata[i][maxindex].recovered,
                    "Latest Deaths": alldata[i][maxindex].deaths,
                })
            j++
        }
        countriesdata.sort(function (a, b) {
            return b["Latest Total"] - a["Latest Total"]
        })

        console.log("countries data: ",countriesdata)

        let totalc = 0
        let totalr = 0
        let totald = 0

        for (let i of countriesdata) {
            totalc += i["Latest Total"]
            totalr += i["Latest Recovered"]
            totald += i["Latest Deaths"]
        }

        $("#totalc").append(`${totalc}`)
        $("#totalr").append(`${totalr}`)
        $("#totald").append(`${totald}`)

        let top5 = countriesdata.slice(0, 5)
        //console.log(top5)
        let maxcases = top5[0]["Latest Total"]
        let mincases = top5[4]["Latest Total"]

        for (let i of top5) {
            $("#worldranking").append(
                `<div class="col-12">
                    <p>Country: ${i.Country}</p>
                    <p>Total Cases: ${i["Latest Total"]}</p>
                </div>`
            )
        }

        let cf = crossfilter(top5)
        let top5x = cf.dimension(f => f.Country)
        let top5y = top5x.group().reduceSum(f => f["Latest Total"])

        dc.barChart("#top5chart")
            .width(350)
            .height(300)
            .dimension(top5x)
            .group(top5y)
            .x(d3.scaleBand().domain(top5.map((s) => s.Country)))
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Countries")
            .y(d3.scaleLinear().domain([mincases * 0.8, maxcases * 1.05]))
            .yAxis().ticks(5)

        dc.renderAll()


    })//axios end
}//top 5 function end


//get flag picture
function getCountryFlag() {
    axios.get("https://restcountries.eu/rest/v2/all").then(function (r) {
        $("#flagdisplay").empty()
        //console.log(r.data)
        countrydisplayed = document.getElementById("countrydisplay").innerText
        for (let i of r.data) {
            if (countrydisplayed == i.name || countrydisplayed == i.alpha2Code) {
                $("#flagdisplay").append(`<img src="${i.flag}">`)
                break
            }

            else if (countrydisplayed == "Taiwan*") {
                $("#flagdisplay").append(`<img src="${r.data[221].flag}">`)
                break
            }

            else if (countrydisplayed == "Vietnam") {
                $("#flagdisplay").append(`<img src="${r.data[244].flag}">`)
                break
            }

            else if (countrydisplayed == "Korea, South") {
                $("#flagdisplay").append(`<img src="${r.data[210].flag}">`)
                break
            }

            else if (countrydisplayed == "Czechia") {
                $("#flagdisplay").append(`<img src="${r.data[61].flag}">`)
                break
            }

            else if (countrydisplayed == "North Macedonia") {
                $("#flagdisplay").append(`<img src="${r.data[132].flag}">`)
                break
            }

            else if (countrydisplayed == "Laos") {
                $("#flagdisplay").append(`<img src="${r.data[122].flag}">`)
                break
            }

            else if (countrydisplayed == "Bolivia") {
                $("#flagdisplay").append(`<img src="${r.data[26].flag}">`)
                break
            }

            else if (countrydisplayed == "Brunei") {
                $("#flagdisplay").append(`<img src="${r.data[36].flag}">`)
                break
            }

            else if (countrydisplayed == "Iran") {
                $("#flagdisplay").append(`<img src="${r.data[107].flag}">`)
                break
            }

            else if (countrydisplayed == "Moldova") {
                $("#flagdisplay").append(`<img src="${r.data[146].flag}">`)
                break
            }

            else if (countrydisplayed == "Russia") {
                $("#flagdisplay").append(`<img src="${r.data[185].flag}">`)
                break
            }

            else if (countrydisplayed == "Tanzania") {
                $("#flagdisplay").append(`<img src="${r.data[223].flag}">`)
                break
            }

            else if (countrydisplayed == "United Kingdom") {
                $("#flagdisplay").append(`<img src="${r.data[238].flag}">`)
                break
            }

            else if (countrydisplayed == "Venezuela") {
                $("#flagdisplay").append(`<img src="${r.data[243].flag}">`)
                break
            }

            else if (countrydisplayed == "Syria") {
                $("#flagdisplay").append(`<img src="${r.data[220].flag}">`)
                break
            }


        }


    })//axios end

}//get country flag end





// let coordinates = [1.35, 103.85] //sg default

let countrymap = "Singapore"
//get map
function getMap() {
    axios.all([axios.get("https://restcountries.eu/rest/v2/all"), axios.get("https://pomber.github.io/covid19/timeseries.json")]).then(function (r) {
        console.log(r[0].data)
        console.log(r[1].data)

        let restcountries = r[0].data
        let pomberdata = r[1].data
        let clist = []

        for (let i in pomberdata) {
            pomberdata[i].reverse()
        }

        let count = 0
        for (let i in pomberdata) {
            count += 1
        }
        console.log("today's data", count)



        // for (let i in pomberdata){
        //     for (let j in restcountries){
        //         if(i == restcountries[j].name || i == restcountries[j].alpha2Code){
        //             clist.push([restcountries[j].name,restcountries[j].latlng, pomberdata[i][0].confirmed,  pomberdata[i][0].recovered,  pomberdata[i][0].deaths])
        //             break
        //         }

        //         else if (i == "Taiwan*") {
        //             clist.push([restcountries[221].name,restcountries[221].latlng, pomberdata[i][0].confirmed,  pomberdata[i][0].recovered,  pomberdata[i][0].deaths])
        //             break
        //         }

        //         else if (i == "Vietnam") {
        //             clist.push([restcountries[244].name,restcountries[244].latlng, pomberdata[i][0].confirmed,  pomberdata[i][0].recovered,  pomberdata[i][0].deaths])
        //             break
        //         }

        //         else if (i == "Korea, South") {
        //             clist.push([restcountries[210].name,restcountries[210].latlng, pomberdata[i][0].confirmed,  pomberdata[i][0].recovered,  pomberdata[i][0].deaths])
        //             break
        //         }

        //         else if (i == "Czechia") {
        //             clist.push([restcountries[61].name,restcountries[61].latlng, pomberdata[i][0].confirmed,  pomberdata[i][0].recovered,  pomberdata[i][0].deaths])
        //             break
        //         }

        //         else if (i == "North Macedonia") {
        //             clist.push([restcountries[132].name,restcountries[132].latlng, pomberdata[i][0].confirmed,  pomberdata[i][0].recovered,  pomberdata[i][0].deaths])
        //             break
        //         }

        //         else if (i == "Laos") {
        //             clist.push([restcountries[122].name,restcountries[122].latlng, pomberdata[i][0].confirmed,  pomberdata[i][0].recovered,  pomberdata[i][0].deaths])
        //             break
        //         }



        //     }

        // }

        for (let i in pomberdata) {
            for (let j in restcountries) {
                if (i == restcountries[j].name || i == restcountries[j].alpha2Code) {
                    clist.push([i, restcountries[j].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Taiwan*") {
                    clist.push([i, restcountries[221].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Vietnam") {
                    clist.push([i, restcountries[244].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Korea, South") {
                    clist.push([i, restcountries[210].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Czechia") {
                    clist.push([i, restcountries[61].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "North Macedonia") {
                    clist.push([i, restcountries[132].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Laos") {
                    clist.push([i, restcountries[122].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Bolivia") {
                    clist.push([i, restcountries[26].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Brunei") {
                    clist.push([i, restcountries[36].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Iran") {
                    clist.push([i, restcountries[107].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Moldova") {
                    clist.push([i, restcountries[146].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Russia") {
                    clist.push([i, restcountries[185].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Tanzania") {
                    clist.push([i, restcountries[223].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "United Kingdom") {
                    clist.push([i, restcountries[238].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Venezuela") {
                    clist.push([i, restcountries[243].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }

                else if (i == "Syria") {
                    clist.push([i, restcountries[220].latlng, pomberdata[i][0].confirmed, pomberdata[i][0].recovered, pomberdata[i][0].deaths])
                    break
                }



            }

        }

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
                console.log(clist[i][0], clist[i][1])
                coordinates = clist[i][1]
            }
        }

        $("#coo").empty()
        $("#coo").append(`${coordinates}`)


        console.log("HERE", coordinates)
        console.log("mapped list", clist)
        console.log("bugged", buglist)


        let map = L.map("map1").setView([1.35, 103.85], 12)
        //console.log(map)

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
        }).addTo(map);

        let countrycluster = L.markerClusterGroup()
        for (let i = 0; i < clist.length; i++) {
            let m = L.marker([clist[i][1][0], clist[i][1][1]])
            m.bindPopup(`<p>${clist[i][0]}</p>
                        <p>total: ${clist[i][2]}</p>
                        <p>recovered: ${clist[i][3]}</p>
                        <p>deaths: ${clist[i][4]}</p>
                        `)
            countrycluster.addLayer(m)
        }

        map.addLayer(countrycluster)

        document.getElementById("getData").addEventListener("click", function goTo() {
                setTimeout(
                    function gotTo2(){
                        let x = $("#coo").text().split(",")
                console.log("x",x)
                map.flyTo([parseFloat(x[0]), parseFloat(x[1])], 6)
                    },1000
                )
                
            }
        )

        









    })
}//map end

