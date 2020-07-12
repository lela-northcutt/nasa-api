window.onload = function () {
    // image of the day stuff

    const dailyImageSection = document.querySelector(".imageOfTheDay");
    const dailyImageTitle = document.querySelector(".imageTitle");
    const dailyImageDate = document.querySelector(".imageDate");
    const dailyImageDescription = document.querySelector(".imageDescription");

    async function imageOfTheDay() {
        const request = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        const imageOfTheDayUrl = request.data.url
        const mediaType = request.data.media_type;

        //display image or video
        if (mediaType === "image") {
            const mainImg = document.createElement("img");
            mainImg.setAttribute('src', imageOfTheDayUrl);
            mainImg.className = "mainImg";
            dailyImageSection.prepend(mainImg);

        } else {
            const mainImg = document.createElement("iframe");
            mainImg.setAttribute('src', imageOfTheDayUrl);
            mainImg.className = "mainImg";
            dailyImageSection.prepend(mainImg);
        }

        //add title, date, and description
        dailyImageTitle.innerHTML = `${request.data.title}`
        dailyImageDate.innerHTML = `${request.data.date}`
        dailyImageDescription.innerHTML = `${request.data.explanation}`
    }
    imageOfTheDay();

    // search stuff
    const searchBar = document.querySelector("input");

    const button = document.querySelector("button");
    button.addEventListener("click", async function (evt) {
        const searchPicked = searchBar.value;

        evt.preventDefault();
        searchResults = await axios.get(`https://images-api.nasa.gov/search?q=${searchPicked}&media_type=image`);
        renderResults(searchResults);
    })

    function renderResults(results) {
        const images = results.data.collection.items;

        if (images.length > 0) {
            images.forEach(image => {
                const imageDiv = document.createElement("div");
                imageDiv.className = "imageDiv";

                const thumbnail = document.createElement("div");
                thumbnail.className = "thumbnail";
                thumbnail.setAttribute('ID', image.data[0].nasa_id);
                thumbnail.innerHTML = `<a href="${image.links[0].href}" target="_blank" ><img src="${image.links[0].href}"
                                     style="max-width:200px; max-height:220px; margin:0 auto;"></a>`;

                const imageTitle = document.createElement("div");
                imageTitle.className = "info";
                imageTitle.innerHTML = `${image.data[0].title}`;

                const imageDate = document.createElement("div");
                imageDate.className = "info";
                imageDate.innerHTML = `${image.data[0].date_created.slice(0, 10)}`;

                imageDiv.append(thumbnail);
                imageDiv.append(imageTitle);
                imageDiv.append(imageDate);

                searchedImagesSection.append(imageDiv);
            })

        } else {
            alert(`no images found for ${searchBar.value}`);
        }
    }

}