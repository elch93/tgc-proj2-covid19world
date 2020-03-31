$(function () {

    loadLatest()

    //adding countries & dates to options
    axios.get("https://pomber.github.io/covid19/timeseries.json").then(function (r) {
        let countrylist = []
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

        for (let i = 0; i < 30; i++) {
            $("#dateselect").append(`<option>${sgdata[i].date}</option>`)
        }

    })//axios for country list

    getTop5()


    getCountryFlag()














})//jquery end