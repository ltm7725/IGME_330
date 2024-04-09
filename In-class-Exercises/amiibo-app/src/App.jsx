import { useState } from "react";
import './App.css'

// app "globals" and utils
const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";

const loadXHR = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => callback(xhr);
  xhr.open("GET", url);
  xhr.send();
};

const searchAmiibo = (name, callback) => {
  loadXHR(`${baseurl}${name}`, callback);
}

const parseAmiiboResult = xhr => {
  
  const string = xhr.responseTest;

  let json;

  console.log(string);

  json = JSON.parse(string);

  console.log(`Number of results = ${json.amiibo.length}`);

  for(let obj of json.amiibo) {
    console.log(obj.character);
  }

  setResults(obj.character);
};

const App = () => {
  const [term, setTerm] = useState("isabelle");
  const [results, setResults] = useState([]);

  return <>
    <header>
      <h1>Amiibo Finder</h1>
    </header>
    <hr />
    <main>
      <button onClick={() => searchAmiibo(term, parseAmiiboResult)}>Search</button>
      <label>
        Name: 
        <input value={term} onChange={e => setTerm(e.target.value)}/>
      </label>
    </main>
    <hr />
    <footer>
      <p>&copy; 2023 Ace Coder</p>
    </footer>
  </>;
};

export default App;