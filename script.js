$(function () {

    //menu
    let menudisplay = "off"
    let detailsdisplay = "off"

    $("#searchbtn").click(function () {
        if (menudisplay == "off") {
            $("#selectbg").css("transform", "scale(70)")
            $("#globalbtn").hide(),$("#listbtn").hide()
            $(".fa-search").eq(0).hide()
            $("#searchx").show()
            setTimeout(function () { $("#searchbar").fadeToggle(1000) }, 200)
            menudisplay = "on"
        }

        else if (menudisplay == "on") {
            $("#selectbg").css("transform", "scale(1)")
            $(".fa-search").eq(0).show()
            $("#searchx").hide()
            $("#searchbar").fadeToggle()
            $("#globalbtn").fadeToggle(900), $("#listbtn").fadeToggle()
            menudisplay = "off"
        }
    })

    $("#globalbtn").click(function () {
        if (menudisplay == "off") {
            $("#globalbg").css("transform", "scale(70)")
            $(".fa-globe-americas").hide()
            $("#globalx").show()
            $("#searchbtn").hide(),$("#listbtn").hide()
            $("#globalbtn").css("position", "absolute")
            setTimeout(function () { $("#globalstats").fadeToggle(1000) }, 400)
            menudisplay = "on"
        }

        else if (menudisplay == "on") {
            $("#globalbg").css("transform", "scale(1)")
            $(".fa-globe-americas").show()
            $("#globalbtn").css("position", "fixed")
            $("#globalx").hide()
            $("#globalstats").fadeToggle()
            $("#searchbtn").fadeToggle(900), $("#listbtn").fadeToggle()
            menudisplay = "off"
        }
    })

    $("#listbtn").click(function () {
        if (menudisplay == "off") {
            $("#listbg").css("transform", "scale(70)")
            $(".fa-list-ul").hide()
            $("#listx").show()
            $("#searchbtn").hide(),$("#globalbtn").hide()
            $("#listbtn").css("position", "absolute")
            setTimeout(function () { $("#globallist").fadeToggle(1000) }, 400)
            menudisplay = "on"
        }

        else if (menudisplay == "on") {
            $("#listbg").css("transform", "scale(1)")
            $(".fa-list-ul").show()
            $("#listbtn").css("position", "fixed")
            $("#listx").hide()
            $("#globallist").fadeToggle()
            $("#searchbtn").fadeToggle(900),$("#globalbtn").fadeToggle(900)
            menudisplay = "off"
        }
    })


    $("#detailsbtn").click(function () {
        if (detailsdisplay == "off") {
            $(".fa-info-circle").hide()
            $("#detailsx").show()
            $("#panel").fadeToggle()
            detailsdisplay = "on"
        }

        else if (detailsdisplay == "on") {
            $(".fa-info-circle").show()
            $("#detailsx").hide()
            $("#panel").fadeToggle()
            detailsdisplay = "off"
        }
    })

    $("#getData").click(function () {
        $("#searchbar").fadeToggle()
        $("#globalbtn").show()
        $("#listbtn").fadeToggle()
        $(".fa-search").eq(0).show()
        $("#searchx").hide()
        $("#selectbg").css("transform", "scale(1)")
        menudisplay = "off"
    })

    //carousell code
    let n = 0
    showSlide(n)

    function showSlide(x) {
        for (let i = 0; i < $(".mycarousel").length; i++) {
            $(".mycarousel").eq(i).hide()
            $(".cindicator").eq(i).css("background-color", "grey")
            $(".cindicator").eq(i).mouseover(function () {
                $(this).css("background-color", "gold")
            })
            $(".cindicator").eq(i).mouseout(function () {
                $(this).css("background-color", "grey")
            })
        }



        $(".mycarousel").eq(x).show()
        $(".cindicator").eq(x).css("background-color", "white")
        $(".cindicator").eq(x).mouseover(function () {
            $(this).css("background-color", "gold")
        })
        $(".cindicator").eq(x).mouseout(function () {
            $(this).css("background-color", "white")
        })
    }

    $("#next").click(function () {
        if (n == $(".mycarousel").length - 1) {
            n = -1
        }
        showSlide(n += 1)
    })

    $("#prev").click(function () {
        if (n == 0) {
            n = $(".mycarousel").length
        }
        showSlide(n -= 1)
    })

    for (let i = 0; i < $(".mycarousel").length; i++) {
        $(".cindicator").eq(i).click(function () {
            showSlide(i)
        })
    }
    //carousel code end

    getMap()
    let countrylist = []
    setTimeout(function () { loadLatest() }, 600)

    //adding countries & dates to options
    axios.get("https://pomber.github.io/covid19/timeseries.json").then(function (r) {

        for (let i in r.data) {
            countrylist.push(i)
        }
        countrylist.sort()

        //console.log(countrylist)
        for (let i of countrylist) {
            if (i == "Congo (Kinshasa)") {
                continue
            }
            if (i == "US") {
                $("#countryselect").append(`<option value="US">United States of America</option>`)
                continue
            }
            if (i == "Taiwan*") {
                $("#countryselect").append(`<option value="Taiwan*">Taiwan</option>`)
                continue
            }
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

   
    getGlobalTotalByDate()
    getGlobalList()

})//jquery end