// daily https://api.covid19api.com/summary
// since day 1, confirmed https://api.covid19api.com/total/dayone/country/singapore/status/confirmed

$(function () {
    loadLC() //loadLC at first



    //making list of countries for user to select
    axios.get(apisummaryurl).then(function(response){
        //console.log(response.data.Countries)
        
        let countrylist = []
        let countrynamelist = []
        for (let i in response.data.Countries){
           countrylist.push(response.data.Countries[i].Slug)
           countrynamelist.push(response.data.Countries[i].Country.trim())
        }

        countrylist.shift()
        countrynamelist.shift()
        //console.log(countrylist)
        //console.log(countrynamelist)
        //appending to options
        for (let i in countrylist) {
            $("#countryselect").append(
                `
                <option value="${countrylist[i]}">${countrynamelist[i]}</option> 
                `
            )
        }

    })//axios end get country list

    




    //button function
    $("#getLC").click(function(){
        countryname = $("#countryselect").val()
        console.log(countryname)
        loadLC()
    })















})//jquery end