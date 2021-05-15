import axios from 'axios'
const URL = "https://api.thedogapi.com/v1/images/"

export async function fetchDogPhoto(dogID) {
    if (dogID === undefined) return undefined;
    if (dogID === "") return undefined;
    const rawImageData = await axios.get(`${URL}${dogID}`);
    return rawImageData.data.url;
}