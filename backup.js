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

        console.log("HERE", coordinates)
        console.log("mapped list", clist)
        console.log("bugged", buglist)


        function goToLocation() {
            console.log("HEERERERE", coordinates)
            map.flyTo(coordinates,8)
        }

        



        let map = L.map("map1").setView(coordinates, 12)

        

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

        



    })
}//map end