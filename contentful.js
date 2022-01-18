const spaceId = "";
const environmentId = "";
const accessToken = "";

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&order=-fields.order&content_type=menuItem`;

const sectionTag = document.querySelector("section.grid");

const fetchData = () => {
    return fetch(url)
    .then(response => response.json())
    .then(data => {

        const assets = data.includes.Asset;

        return data.items.map(item => {

            let imageUrl = null;
            const imageId = item.fields.image.sys.id;

            const imageData = assets.find(asset => {
                return asset.sys.id == imageId;
            })

            if(imageData) {
                imageUrl = imageData.fields.file.url;
            }

            item.fields.image = imageUrl
            return item.fields
        })
    })
}

fetchData().then(data => {
    sectionTag.innerHTML = ""

    data.map(item => {
        sectionTag.innerHTML = sectionTag.innerHTML + `
            <div class="item">
                <img src="${item.image}" />
                <div class="title">
                    <h2>${item.title}</h2>
                    <p>${item.price}</p>
                </div>
                <p>${item.description}</p>
            </div>
        `
    })
})

