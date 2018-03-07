// Giftastic

$(function () {
    console.log("hello chris");

    var topic = "NBA Player";
    var topics = ["James Harden", "Chris Paul", "Clint Capela", "Trevor Ariza"];
    var teams = [
        {
          "abbreviation": "ATL",
          "teamName": "Atlanta Hawks",
          "simpleName": "Hawks",
          "location": "Atlanta"
        },
        {
          "abbreviation": "BOS",
          "teamName": "Boston Celtics",
          "simpleName": "Celtics",
          "location": "Boston"
        },
        {
          "abbreviation": "BKN",
          "teamName": "Brooklyn Nets",
          "simpleName": "Nets",
          "location": "Brooklyn"
        },
        {
          "abbreviation": "CHA",
          "teamName": "Charlotte Hornets",
          "simpleName": "Hornets",
          "location": "Charlotte"
        },
        {
          "abbreviation": "CHI",
          "teamName": "Chicago Bulls",
          "simpleName": "Bulls",
          "location": "Chicago"
        },
        {
          "abbreviation": "CLE",
          "teamName": "Cleveland Cavaliers",
          "simpleName": "Cavaliers",
          "location": "Cleveland"
        },
        {
          "abbreviation": "DAL",
          "teamName": "Dallas Mavericks",
          "simpleName": "Mavericks",
          "location": "Dallas"
        },
        {
          "abbreviation": "DEN",
          "teamName": "Denver Nuggets",
          "simpleName": "Nuggets",
          "location": "Denver"
        },
        {
          "abbreviation": "DET",
          "teamName": "Detroit Pistons",
          "simpleName": "Pistons",
          "location": "Detroit"
        },
        {
          "abbreviation": "GSW",
          "teamName": "Golden State Warriors",
          "simpleName": "Warriors",
          "location": "Golden State"
        },
        {
          "abbreviation": "HOU",
          "teamName": "Houston Rockets",
          "simpleName": "Rockets",
          "location": "Houston"
        },
        {
          "abbreviation": "IND",
          "teamName": "Indiana Pacers",
          "simpleName": "Pacers",
          "location": "Indiana"
        },
        {
          "abbreviation": "LAC",
          "teamName": "Los Angeles Clippers",
          "simpleName": "Clippers",
          "location": "Los Angeles"
        },
        {
          "abbreviation": "LAL",
          "teamName": "Los Angeles Lakers",
          "simpleName": "Lakers",
          "location": "Los Angeles"
        },
        {
          "abbreviation": "MEM",
          "teamName": "Memphis Grizzlies",
          "simpleName": "Grizzlies",
          "location": "Memphis"
        },
        {
          "abbreviation": "MIA",
          "teamName": "Miami Heat",
          "simpleName": "Heat",
          "location": "Miami"
        },
        {
          "abbreviation": "MIL",
          "teamName": "Milwaukee Bucks",
          "simpleName": "Bucks",
          "location": "Milwaukee"
        },
        {
          "abbreviation": "MIN",
          "teamName": "Minnesota Timberwolves",
          "simpleName": "Timberwolves",
          "location": "Minnesota"
        },
        {
          "abbreviation": "NOP",
          "teamName": "New Orleans Pelicans",
          "simpleName": "Pelicans",
          "location": "New Orleans"
        },
        {
          "abbreviation": "NYK",
          "teamName": "New York Knicks",
          "simpleName": "Knicks",
          "location": "New York"
        },
        {
          "abbreviation": "OKC",
          "teamName": "Oklahoma City Thunder",
          "simpleName": "Thunder",
          "location": "Oklahoma City"
        },
        {
          "abbreviation": "ORL",
          "teamName": "Orlando Magic",
          "simpleName": "Magic",
          "location": "Orlando"
        },
        {
          "abbreviation": "PHI",
          "teamName": "Philadelphia 76ers",
          "simpleName": "76ers",
          "location": "Philadelphia"
        },
        {
          "abbreviation": "PHX",
          "teamName": "Phoenix Suns",
          "simpleName": "Suns",
          "location": "Phoenix"
        },
        {
          "abbreviation": "POR",
          "teamName": "Portland Trail Blazers",
          "simpleName": "Trail Blazers",
          "location": "Portland"
        },
        {
          "abbreviation": "SAC",
          "teamName": "Sacramento Kings",
          "simpleName": "Kings",
          "location": "Sacramento"
        },
        {
          "abbreviation": "SAS",
          "teamName": "San Antonio Spurs",
          "simpleName": "Spurs",
          "location": "San Antonio"
        },
        {
          "abbreviation": "TOR",
          "teamName": "Toronto Raptors",
          "simpleName": "Raptors",
          "location": "Toronto"
        },
        {
          "abbreviation": "UTA",
          "teamName": "Utah Jazz",
          "simpleName": "Jazz",
          "location": "Utah"
        },
        {
          "abbreviation": "WAS",
          "teamName": "Washington Wizards",
          "simpleName": "Wizards",
          "location": "Washington"
        }
      ]

    var addTenMore = false;
    var value = null;
    var selectedButton = null;
    var limit = 100;
    var gifNum = 0;
    var showCount = 10;

    function displayGif() {
        // $(".topicGifs").empty();
        if (addTenMore == true) {
            value = selectedButton;
            gifNum = gifNum + 10;
            showCount = showCount + 10;
        } else {
            $(".topicGifs").empty();
            var value = $(this).attr("data-name").split(' ').join('+');
            selectedButton = value;
            createButtons();
            $(".topicArray").append('<button type="button" class="btn btn-danger addMore">Add 10 More Gifs</button>');
        }
        var eventId = "Houston+Rockets";
        var ticketMaster_APIKey = "LArupGEb8gAMQ2uWg9JAZbXzTHjcEMY5";
        // var ticketMaster_APIKey = "dVeZE1jTUX9IzYurR1xbjnVHWuWBSLH1";
        var ticketmaster_queryURL = 'http://app.ticketmaster.com/discovery/v2/events.json?keyword=' + eventId + '&countryCode=US&apikey=' + ticketMaster_APIKey;
        console.log(value);

        $.ajax({
            type: "GET",
            url: ticketmaster_queryURL,
            async: true,
            dataType: "json",
            success: function (json) {
                console.log(json);
                // $(".topicTickets").text(JSON.stringify(json));
                $(".topicTickets").append(' <div id="ticketList"></div>');
                for (var i = 0; i < 10; i++) {
                    var eventList = json._embedded.events[i]
                    var eventName = json._embedded.events[i].name;
                    var eventDate = json._embedded.events[i].dates.start.localDate;
                    var eventLink = json._embedded.events[i].url;
                    if (json._embedded.events[i].images[0].width === 305) {
                        var eventImage = json._embedded.events[i].images[0].url;
                    }
                    else if (json._embedded.events[i].images[1].width === 305 ) {
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
            // Parse the response.
            // Do other things.
        },
            error: function (xhr, status, err) {
                // This time, we do not end up here!
            }
        });

var giphy_APIKey = "dVeZE1jTUX9IzYurR1xbjnVHWuWBSLH1";
var giphy_queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + value + '&api_key=' + giphy_APIKey + '&limit=' + limit;
$.ajax({
    url: giphy_queryURL,
    method: "GET"
}).then(function (response) {
    // console.log(response);
    console.log(gifNum);
    $(".topicGifs").append(' <div id="gifList"></div>');

    for (var i = gifNum; i < showCount; i++) {
        var result = response.data
        var rating = result[i].rating;
        var title = result[i].title;
        var type = result[i].type;
        //---
        var gifList = $("#gifList");
        var aList = $("<a>");
        //---
        var aOne = $("<a>");
        var pOne = $("<p>");
        var pTwo = $("<p>");
        var pThree = $("<p>");
        var gifDiv = $("<div>");
        var gifImage = $("<img>");
        //---
        aList.addClass("list-group-item");
        // aList.attr("href", "#list-item-" + (i + 1));
        // gifDiv.attr("id", "list-item-" + (i + 1));
        //---
        aOne.addClass("btn");
        aOne.addClass("btn-dark");
        aOne.addClass("btn-sm");
        aOne.attr("href", result[i].images.fixed_height.url);
        aOne.attr("download", "gif.gif")
        aOne.text("Download gif " + (i + 1));
        pOne.text("Title : " + title);
        pTwo.text("Rating : " + rating);
        pThree.text("Type : " + type);
        gifDiv.addClass("card");
        gifDiv.addClass("gif");
        gifImage.addClass("gifImage");
        gifImage.attr("src", result[i].images.fixed_height_still.url);
        gifImage.attr("alt", value);
        gifImage.attr("data-animate", result[i].images.fixed_height.url);
        gifImage.attr("data-still", result[i].images.fixed_height_small_still.url);
        gifImage.attr("data-state", "still");
        gifDiv.append(pOne, gifImage);
        // gifDiv.append(gifImage, pOne, pTwo, pThree, aOne);
        // $(".topicGifs").append(gifDiv);
        gifList.append(aList);
        aList.append(gifDiv, pOne, pTwo, pThree, aOne);
    }
});
addTenMore = false;
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
$(document).on("click", ".topicButton", displayGif);
$(document).on("click", ".gifImage", animateImage);
$(document).on("click", ".addMore", addTenMoreGifs);
createButtons();
});