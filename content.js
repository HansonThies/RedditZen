/*
Filters reddit posts based on user defined keywords in title
Designed for use with oldreddit
*/


chrome.storage.local.get(["keywords", "filterEnabled"], function (data) {

    let blockedKeywords = data.keywords || [];
    let filterEnabled = data.filterEnabled !== false;

    function filterRedditPosts() {

        // This gets all the thing objects from the dom which are the posts
        let posts = document.querySelectorAll("#siteTable .thing"); 

        // For each post get the title and check if it contains a keyword
        posts.forEach(post =>{

            // The title is stored in <a> inside <p class="title" within each post
            let titleElement = post.querySelector(".top-matter p.title a")
            
            if(titleElement){

                let titleText = titleElement.innerText.toLowerCase();
                
                // Check if there are keywords this avoids a bug where it would otherwise remove all posts if no keywords found
                if(blockedKeywords.length > 0){
                    // Check if post contains keywords and remove if so
                    if(blockedKeywords.some(keyword => titleText.includes(keyword.toLowerCase()))) {
                        if(filterEnabled){
                            console.log("Removed post titled: " + titleText);
                            post.style.display = "none"; // hide the post
                        } else {
                            console.log("Restored post titled: " + titleText);
                            post.style.display = "" // unhide the post
                        }
                        
                    }
                }

            }

        });
    }

    // Call the filter function
    filterRedditPosts();

    // Listen for toggle changes or keyword changes and reload content
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.filterEnabled !== undefined) {
            filterEnabled = changes.filterEnabled.newValue;
            filterRedditPosts();
        }
        if (changes.keywords !== undefined) {
            blockedKeywords = changes.keywords.newValue;
            filterRedditPosts();
        }
    });

})