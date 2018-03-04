// Giftastic

$(function () {
    console.log("hello chris");

    var topic = "NBA Player";
    var topics = ["Stephen Curry", "Micheal Jordan", "LeBron James", "Kobe Byrant", "James Harden", "Chris Paul"];
    var addTenMore = false;
    var value = null;
    var selectedButton = null;
    var limit = 10

    function displayGif() {
        $(".topicGifs").empty();
        if (addTenMore == true) {
            value = selectedButton;
            limit = limit + 10;
        } else {
            var value = $(this).attr("data-name").split(' ').join('+');
            selectedButton = value;
        }
        var APIKey = "dVeZE1jTUX9IzYurR1xbjnVHWuWBSLH1";
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + value + '&api_key=' + APIKey + '&limit=' + limit;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < limit; i++) {
                var result = response.data
                var rating = result[i].rating;
                var title = result[i].title;
                var type = result[i].type;
                var pOne = $("<p>");
                var pTwo = $("<p>");
                var pThree = $("<p>");
                var gifDiv = $("<div>");
                var gifImage = $("<img>");
                pOne.text("Title : " + title);
                pTwo.text("Rating : " + rating);
                pThree.text("Type : " + type);
                gifDiv.addClass("gif");
                gifImage.addClass("gifImage");
                gifImage.attr("src", result[i].images.fixed_height_small_still.url);
                gifImage.attr("alt", value);
                gifImage.attr("data-animate", result[i].images.fixed_height_small.url);
                gifImage.attr("data-still", result[i].images.fixed_height_small_still.url);
                gifImage.attr("data-state", "still");
                gifDiv.append(gifImage);
                gifDiv.append(pOne);
                gifDiv.append(pTwo);
                gifDiv.append(pThree);
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
        addTenMore = false;
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

    $(".addMore").on("click", function () {
        if (selectedButton === null) {
            console.log(selectedButton);
        } else {
            addTenMore = true;
            displayGif();
        }
    });


    $(".navbarTitle").text("Giftastic: " + topic + " Edition");
    $("#itemInputLabel").text("Add " + topic);
    $(document).on("click", ".topicButton", displayGif);

    createButtons();
});