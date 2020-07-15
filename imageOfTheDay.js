window.onload = function () {
    const apiKey = "O8qJMaMqL1pycdkeRvnmyufl1JK0RIXdfR5s4lbh";

    // image of the day stuff
    const dailyImageSection = document.querySelector(".imageOfTheDay");
    const dailyImageTitle = document.querySelector(".imageTitle");
    const dailyImageDate = document.querySelector(".imageDate");
    const dailyImageDescription = document.querySelector(".imageDescription");

    async function imageOfTheDay() {
        const request = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        const imageOfTheDayUrl = request.data.url
        const mediaType = request.data.media_type;

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

        dailyImageTitle.innerHTML = `${request.data.title}`
        dailyImageDate.innerHTML = `${request.data.date}`
        dailyImageDescription.innerHTML = `${request.data.explanation}`
    }

    imageOfTheDay();
}