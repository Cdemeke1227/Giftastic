// Giftastic

$(function () {
    console.log("hello chris");
    var topic = "NBA";
    var topics = ["Stephen Curry", "Micheal Jordan", "LeBron James", "Kobe Byrant", "James Harden", "Chris Paul"];
    var teams = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Bobcats", "Chicago Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "LA Clippers", "LA Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Hornets", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia Sixers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"];
    var topicFavorites = [];
    var teamId = null;
    var addTenMore = false;
    var value = null;
    var selectedButton = null;
    var limit = 100;
    var gifNum = 0;
    var showCount = 10;
    var title;

    function displayGif() {
        // $(".topicGifs").empty();
        if (addTenMore == true) {
            value = selectedButton;
            gifNum = gifNum + 10;
            showCount = showCount + 10;
        } else {
            $(".topicGifs").empty();
            var value = $(this).attr("data-name").split(' ').join('+').trim();
            selectedButton = value;
            createButtons();
            $(".topicArray").append('<button type="button" class="btn btn-danger addMore">Add 10 More Gifs</button>');
        }



        var giphy_APIKey = "dVeZE1jTUX9IzYurR1xbjnVHWuWBSLH1";
        var giphy_queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + value + '&api_key=' + giphy_APIKey + '&limit=' + limit;
        $.ajax({
            url: giphy_queryURL,
            method: "GET"
        }).then(function (response) {
            $(".topicGifs").append(' <div id="gifList"></div>');

            for (var i = gifNum; i < showCount; i++) {
                var result = response.data
                var rating = result[i].rating;
                var type = result[i].type;
                var gifUrl = result[i].images.fixed_height.url
                var gifUrlStill = result[i].images.fixed_height_still.url;
                title = result[i].title;
                //---
                var gifList = $("#gifList");
                var aList = $("<a>");
                //---
                var aOne = $("<a>");
                var aTwo = $("<a>");
                var pOne = $("<p>");
                var pTwo = $("<p>");
                var pThree = $("<p>");
                var gifDiv = $("<div>");
                var gifImage = $("<img>");
                //---
                aList.addClass("list-group-item");
                //---
                aOne.addClass("btn btn-dark btn-sm downloadButton");
                aTwo.addClass("btn btn-secondary btn-sm savFavButton")
                pOne.addClass("card-title")
                aOne.attr("href", gifUrl);
                aOne.attr("download", "gif.gif")
                aTwo.attr("value",title) 
                aOne.text("Download gif " + (i + 1));
                aTwo.text("Save to Favorites");
                pOne.text("Title : " + title);

                if (rating !== "R") {pTwo.text("Rating : " + rating);}

                pThree.text("Type : " + type);
                gifDiv.addClass("card");
                gifDiv.addClass("gif");
                gifImage.addClass("gifImage");
                gifImage.attr("src", gifUrlStill);
                gifImage.attr("alt", value);
                gifImage.attr("data-animate", gifUrl);
                gifImage.attr("data-still", gifUrlStill);
                gifImage.attr("data-state", "still");
                gifDiv.append(pOne, gifImage);
                gifList.append(aList);
                aList.append(gifDiv, pOne, pTwo, pThree, aOne);
            }
        });
        addTenMore = false;
    }

    function findTickets() {
        $(".topicTickets").empty();
        var ticketMaster_APIKey = "LArupGEb8gAMQ2uWg9JAZbXzTHjcEMY5";
        var ticketmaster_queryURL = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=' + teamId + '&countryCode=US&apikey=' + ticketMaster_APIKey;
        $.ajax({
            type: "GET",
            url: ticketmaster_queryURL,
            async: true,
            dataType: "json",
            success: function (json) {
                $(".topicTickets").append(' <div id="ticketList"></div>');
                for (var i = 0; i < 10; i++) {
                    var eventList = json._embedded.events[i]
                    var eventName = json._embedded.events[i].name;
                    var eventDate = json._embedded.events[i].dates.start.localDate;
                    var eventLink = json._embedded.events[i].url;
                    if (json._embedded.events[i].images[0].width === 305) {
                        var eventImage = json._embedded.events[i].images[0].url;
                    }
                    else if (json._embedded.events[i].images[1].width === 305) {
                        var eventImage = json._embedded.events[i].images[2].url;
                    }
                    else if (json._embedded.events[i].images[2].width === 305) {
                        var eventImage = json._embedded.events[i].images[3].url;
                    }
                    else if (json._embedded.events[i].images[3].width === 305) {
                        var eventImage = json._embedded.events[i].images[4].url;
                    }
                    else if (json._embedded.events[i].images[4].width === 305) {
                        var eventImage = json._embedded.events[i].images[4].url;
                    }
                    else if (json._embedded.events[i].images[5].width === 305) {
                        var eventImage = json._embedded.events[i].images[5].url;
                    }
                    else if (json._embedded.events[i].images[6].width === 305) {
                        var eventImage = json._embedded.events[i].images[6].url;
                    }
                    var ticketList = $("#ticketList");
                    var aTicketList = $("<a>");
                    //---
                    var aTicketOne = $("<a>");
                    var pTicketOne = $("<p>");
                    var pTicketTwo = $("<p>");
                    var pTicketThree = $("<p>");
                    var ticketDiv = $("<div>");
                    var ticketImage = $("<img>");
                    //---
                    aTicketList.addClass("list-group-item");
                    aTicketOne.addClass("btn btn-dark btn-sm");
                    aTicketOne.attr("href", eventLink);
                    aTicketOne.text("Buy Tickets");
                    pTicketOne.text("Title : " + eventName);
                    pTicketTwo.text("Date : " + eventDate);
                    ticketDiv.addClass("card");
                    ticketDiv.addClass("tickets");
                    ticketImage.addClass("ticketImage");
                    ticketImage.attr("src", eventImage);
                    ticketDiv.append(ticketImage);
                    ticketList.append(aTicketList);
                    aTicketList.append(ticketDiv, pTicketOne, pTicketTwo, aTicketOne);
                    $(".topicTickets").append(aTicketList);
                }
            },
            error: function (xhr, status, err) {
                // This time, we do not end up here!
            }
        });
    }


    function findTeam() {
        for (var i = 0; i < teams.length; i++) {
            var aTeam = $("<a>");
            aTeam.addClass("dropdown-item");
            aTeam.attr("value", teams[i]);
            aTeam.text(teams[i]);
            $(".dropdown-menu").append(aTeam);
        }
    }
    function showTeam() {
        teamId = $(this).attr("value").split(' ').join('+').trim();
        findTickets();
    }
function addFav() {

    favpick = $(this).val();
    console.log(favpick);
    
    topicFavorites.push(favpick);
    console.log(topicFavorites);
    
}
    function animateImage() {
        var state = $(this).attr('data-state');
        console.log(state);

        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    }

    function createButtons() {
        $(".topicArray").empty();
        for (var i = 0; i < topics.length; i++) {
            var topicButton = $("<button>s")
            topicButton.addClass("btn");
            topicButton.addClass("btn-secondary");
            topicButton.addClass("topicButton");
            topicButton.attr("data-name", topics[i]);
            topicButton.text(topics[i]);
            $(".topicArray").append(topicButton);
        }
    }
    $("#addItem").on("click", function () {
        event.preventDefault();
        var newTopic = $("#inputItem").val().trim();
        topics.push(newTopic);
        createButtons();
    });
    function addTenMoreGifs() {
        if (selectedButton === null) {
            console.log(selectedButton);
        } else {
            addTenMore = true;
            displayGif();
        }
    }
    $(".navbarTitle").text("Giftastic: " + topic + " Edition");
    $("#itemInputLabel").text("Add " + topic);
    findTeam();
    $(document).on("click", ".dropdown-item", showTeam);
    $(document).on("click", ".savFavButton", addFav);
    $(document).on("click", ".topicButton", displayGif);
    $(document).on("click", ".gifImage", animateImage);
    $(document).on("click", ".addMore", addTenMoreGifs);
    createButtons();
});