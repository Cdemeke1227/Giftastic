// Giftastic

$(function () {
    console.log("hello chris");

    var topic = "NBA Player";
    var topics = ["Stephen Curry", "Micheal Jordan", "LeBron James", "Kobe Byrant", "James Harden", "Chris Paul"];
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
        var APIKey = "dVeZE1jTUX9IzYurR1xbjnVHWuWBSLH1";
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + value + '&api_key=' + APIKey + '&limit=' + limit;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
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