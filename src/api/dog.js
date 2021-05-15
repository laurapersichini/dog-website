import axios from 'axios';

const API_KEY = "f3ff28d5-1c9b-4bcf-9e93-eb1fc97bc812";
const URL = "https://api.thedogapi.com/v1/breeds/search";

export async function fetchDogInformation(dogName) {
    const rawData = await axios.get(`${URL}?api_key=${API_KEY}&q=${dogName}`);
    const wantedData = rawData.data[0];
    return wantedData;
}

