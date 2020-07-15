const searchedImagesSection = document.querySelector(".searchedImages");
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