$(function () {



    let countrylist = []
    loadLatest()

    //adding countries & dates to options
    axios.get("https://pomber.github.io/covid19/timeseries.json").then(function (r) {

        for (let i in r.data) {
            countrylist.push(i)
        }
        countrylist.sort()


        //console.log(countrylist)
        for (let i of countrylist) {
            $("#countryselect").append(`<option value="${i}">${i}</option>`)
        }




        //adding dates to options
        let sgdata = r.data["Singapore"].reverse()

        //converting dates to ISO format
        for (let i of sgdata) {
            if (i.date[6] === "-") {
                i.date = i.date.substr(0, 5) + "0" + i.date.substr(5);
            }
            if (i.date.length < 10) {
                i.date = i.date.substr(0, 8) + "0" + i.date.substr(8);
            }
            i.date = moment(i.date).format("DD/MM/YY")
        }

        for (let i = 0; i < 60; i++) {
            $("#dateselect").append(`<option>${sgdata[i].date}</option>`)
        }

    })//axios for country list

    getTop5()


    //loadCountryFlag 
    function loadDefaultCountryFlag() {
        axios.get("https://restcountries.eu/rest/v2/all").then(function (r) {
            $("#flagdisplay").empty()
            //console.log(r.data)
            countrydisplayed = "Singapore"
            for (let i of r.data) {
                if (countrydisplayed == i.name) {
                    $("#flagdisplay").append(`<img src="${i.flag}">`)
                    break
                }
            }


            //For Debugging (11 out of 178 countries have no flag)
            // for (let i in countrylist) {
            //     for (let j of r.data) {
            //         if (countrylist[i] == j.name || j.name.includes(countrylist[i]) || countrylist[i] == j.alpha2Code ) {
            //             delete countrylist[i]
            //         }
            //     }
            // }

            // let unlist = []
            // for (let i of countrylist) {
            //     if (i != undefined) {
            //         unlist.push(i)
            //     }
            // }

            // console.log(unlist)




        })//axios end

    }//get country end

    loadDefaultCountryFlag()
    
    $("#obbtn").click(function(){
        $("#optionbar").toggle()
    })
    $("#getData").click(function(){
        $("#optionbar").toggle()
    })




})//jquery end