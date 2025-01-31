// Script for the extension user interface and settings

// Set to run after popup window has loaded
document.addEventListener("DOMContentLoaded", function() {

    // refrence elements of the window
    let keywordsInputBox = document.getElementById("keywords");
    let saveButton = document.getElementById("save");
    let toggleFilter = document.getElementById("toggle-filter");

    // load keywords from chrome memory and fill in input box set filter
    chrome.storage.local.get(["keywords", "filterEnabled"], function(data){
        if(data.keywords){
            // convert return from array to string and place them in input box
            keywordsInputBox.value = data.keywords.join(", ");
        }

        // Set toggle to ture by default
        toggleFilter.checked = data.filterEnabled !== false;

    });

    saveButton.addEventListener("click", function(){
        // take input and conver to array
        let keywords = keywordsInputBox.value.split(",").map(word => word.trim());

        // store the array of keywords in chrome memory
        chrome.storage.local.set({keywords : keywords}, function (){});
    });


    toggleFilter.addEventListener("change", function() {
        chrome.storage.local.set({filterEnabled: toggleFilter.checked});
    });

})