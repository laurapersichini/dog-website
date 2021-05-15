import { useState } from 'react';
import './App.css';
import { fetchDogInformation } from "./api/dog";
import { fetchDogPhoto } from './api/image';

function App() {
  const [dogData, setDogData] = useState(undefined);
  const [breedName, setBreedName] = useState("");
  const [handleClickBeenCalled, setHandleClickBeenCalled] = useState(false);
  const [imageURL, setImageURL] = useState("");

  async function handleClick() {
    setHandleClickBeenCalled(true);
    const data = await fetchDogInformation(breedName);
    if (data === undefined) {
      setDogData(undefined);
      return;
    };
    console.log(data);
    getImage(data.reference_image_id);
    setDogData(data);
  }

  async function getImage(imageID) {
    if (imageID === undefined) return undefined;
    const URL = await fetchDogPhoto(imageID);
    setImageURL(URL);
  }

  function handleChange(event) {
    setBreedName(event.target.value);
  }

  // returns welcome message, error, or information
  function provideInformation(handleClick) {
    if(handleClickBeenCalled===false) {
      return (<h1>Welcome! Search for any dog breed to find the related information.</h1>)
    }
    else if(dogData===undefined) {
      return (<h1>Sorry, there are no results that match your search. Please try searching something else!</h1> )
    }
    else {
      return (<div>
      <h2>{dogData.name}</h2>
      <p>Life Span: {dogData.life_span}</p>
      {dogData.bred_for !== undefined ? <p>Bred for: {dogData.bred_for}</p> : <p> Bred for: no data available</p>}
      {dogData.temperament !== undefined ? <p> Temperament: {dogData.temperament}</p> : <p> Temperament: no data available</p>}
      <p>Height: {dogData.height.metric}cm </p>
      <p>Weight: {dogData.weight.metric}kg</p>
      
      {dogData.reference_image_id !== undefined && dogData.reference_image_id !== "" ? <img className="dog-image" src={imageURL} alt="dog" /> : ""}
      
    </div>)
  }
}
  


  return (
    <div className="App">
      <h1 className="title"> Dog Information Website</h1>
      <div>
        <input className="searchBar" onChange={handleChange}/>
        <button className="button" onClick={handleClick}>Search!</button>
      </div>
      {provideInformation()}
      <div><p className="footer">  Made by Laura Persichini</p></div>
    </div>
  )

}

export default App;


// function f(a) {
//   if (a == 10) {
//     return "yes";
//   } else {
//     return "no";
//   }
// }

// function f(a) {
//   return a == 10 ? "yes" : "no"
// }