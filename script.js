$(function () {

    loadLatest()

    //adding countries to options
    axios.get("https://pomber.github.io/covid19/timeseries.json").then(function (r) {
        let countrylist = []
        for (let i in r.data) {
            countrylist.push(i)
        }
        countrylist.sort()
        //console.log(countrylist)
        for (let i of countrylist){
            $("#countryselect").append(`<option value="${i}">${i}</option>`)
        }

    })//axios for country list


















})//jquery end