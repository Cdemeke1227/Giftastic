// Giftastic

$(function () {
    console.log("hello chris");

    var topic = "NBA Player";
    var topics = ["Micheal Jordan", "LeBron James", "Kobe Byrant", "Shaquille O'neal", "Stephen Curry", "Charles Barkley", "Kevin Durant", "Tim Duncan", "Carmelo Anthony", "James Harden", "Chris Paul", "Hakeem Olajuwon"];

    function displayGif() {
        $(".topicGifs").empty();
        var value = $(this).attr("data-name").split(' ').join('+');
        var limit = 10
        var APIKey = "dVeZE1jTUX9IzYurR1xbjnVHWuWBSLH1";
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + value + '&api_key=' + APIKey + '&limit=' + limit;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            for (var i = 0; i < limit; i++) {
                var result = response.data
                var rating = result[i].rating;
                var pOne = $("<p>")
                var gifDiv = $("<div>");
                var gifImage = $("<img>");

                pOne.text("Rating : " + rating);
                gifDiv.addClass("gif");
                gifImage.addClass("gifImage");
                gifImage.attr("src", result[i].images.fixed_height_small_still.url);
                gifImage.attr("alt", value);
                gifImage.attr("data-animate", result[i].images.fixed_height_small.url);
                gifImage.attr("data-still", result[i].images.fixed_height_small_still.url);
                gifImage.attr("data-state", "still");
                gifDiv.append(gifImage);
                gifDiv.append(pOne);
                $(".topicGifs").append(gifDiv);
            }
            $(".gifImage").on("click", function () {
                var state = $(this).attr('data-state');
                if (state == "still") {
                    $(this).attr("src", $(this).data("animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).data("still"));
                    $(this).attr("data-state", "still");
                }
            })
        });
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

    $(".navbarTitle").text("Giftastic: " + topic + " Edition");
    $("#itemInputLabel").text("Add " + topic);
    $(document).on("click", ".topicButton", displayGif);

    createButtons();
});