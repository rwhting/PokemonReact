import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [randomgName, setRandomName] = useState("");
  const [randomgImage, setRandomImage] = useState("");
  const [guessName, setGuessName] = useState("");
  const [guessImage, setGuessImage] = useState("");
  const [whoGuess, setWhoGuess] = useState("");
  const [guessLabel, setGuessLabel] = useState("Who's That Pokemon?");
  const [query, setQuery] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchImage, setSearchImage] = useState("");

  //do this from automatic generation range later
  const pokeMap = {
    "a": {"arbok": 24, "arcanine": 59, "abra": 63, "alakazam": 65, "aerodactyl": 142, "articuno": 144},
    "b": {"bulbasaur": 1, "blastoise": 9, "butterfree": 12, "beedrill": 15, "bellsprout": 69},
    "c": {"charmander": 4, "charmeleon": 5, "charizard": 6, "caterpie": 10, "clefairy": 35, "clefable": 36, "cloyster": 91, "cubone": 104, "chansey": 113},
    "d": {"diglett": 50, "dugtrio": 51, "doduo": 84, "dodrio": 85, "dewgong": 87, "drowzee": 96, "ditto": 132, "dratini": 147, "dragonair": 148, "dragonite": 149},
    "e": {"ekans": 23, "electrode": 101, "exeggcute": 102, "exeggutor": 103, "electabuzz": 125, "eevee": 133},
    "f": {"fearow": 22, "farfetch'd": 83, "flareon": 136},
    "g": {"golbat": 42, "gloom": 44, "golduck": 55, "growlithe": 58, "geodude": 74, "graveler": 75, "golem": 76, "grimer": 88, "gastly": 92, "gengar": 94,
     "goldeen": 118, "gyarados": 130
    },
    "h": {"haunter": 93, "hypno": 97, "hitmonlee": 106, "hitmonchan": 107, "horsea": 116},
    "i": {"ivysaur": 2},
    "j": {"jigglypuff": 39, "jynx": 124, "jolteon": 135},
    "k": {"kakuna": 14, "kadabra": 64, "krabby": 98, "kingler": 99, "koffing": 109, "kangaskhan": 115, "kabuto": 140, "kabutops": 141},
    "l": {"lickitung": 108, "lapras": 131},
    "m": {"metapod": 11, "meowth": 52, "mankey": 56, "machop": 66, "machoke": 67, "machamp": 68, "magnemite": 81, "magneton": 82, "muk": 89, "marowak": 105,
     "mr-mime": 122, "magmar": 126, "magikarp": 129, "moltres": 146, "mewtwo": 150
    },
    "n": {"nidoran-f": 29, "nidorina": 30, "nidoqueen": 31, "nidoran-m": 32, "nidorino": 33, "nidoking": 34, "ninetales": 38},
    "o": {"oddish": 43, "onix": 95, "omanyte": 138, "omastar": 139},
    "p": {"pidgey": 16, "pidgeotto": 17, "pidgeot": 18, "pikachu": 25, "paras": 46, "parasect": 47, "persian": 53, "psyduck": 54, "primeape": 57, "poliwag": 60,
     "poliwhirl": 61, "poliwrath": 62, "ponyta": 77, "pinsir": 127, "porygon": 137
    },
    "q": {},
    "r": {"rattata": 19, "raticate": 20, "raichu": 26, "rapidash": 78, "rhyhorn": 111, "rhydon": 112},
    "s": {"squirtle": 7, "spearow": 21, "sandshrew": 27, "sandslash": 28, "slowpoke": 79, "slowbro": 80, "seel": 86, "shellder": 90, "seadra": 117, "seaking": 119,
     "staryu": 120, "starmie": 121, "scyther": 123, "snorlax": 143
    },
    "t": {"tentacool": 72, "tentacruel": 73, "tangela": 114, "tauros": 128},
    "u": {},
    "v": {"venasaur": 3, "vulpix": 37, "vileplume": 45, "venonat": 48, "venomoth": 49, "victreebel": 71, "voltorb": 100, "vaporeon": 134},
    "w": {"wartortle": 8, "weedle": 13, "wigglytuff": 40, "weepinbell": 70, "weezing": 110},
    "x": {},
    "y": {},
    "z": {"zubat": 41, "zapdos": 145},
  }
  
  //recommendation field logic
  if(query){
    var seek = query[0].toLowerCase();
    var arr = pokeMap[seek];
    var searchRes = Object.keys(arr).filter((que) => que.startsWith(query)).map(poke => <p>{poke}</p>);
  }
  
  function GeneratePokemon(){
    const id = (Math.random() * 150 + 1).toFixed();
    const pokeString = "https://pokeapi.co/api/v2/pokemon/" + id;
  
    makeAPICall(pokeString, setRandomName, setRandomImage);
  };

  function GenerateGuessPokemon(){
    const id = (Math.random() * 150 + 1).toFixed();
    const pokeString = "https://pokeapi.co/api/v2/pokemon/" + id;
    setGuessLabel("Who's That Pokemon?")
    makeAPICall(pokeString, setGuessName, setGuessImage);
  };
  
  function makeAPICall(strAPI, setName, setImage){
    fetch(strAPI)
    .then(response => response.json())
    .then(data => {setName(data.name); setImage(data.sprites.front_default)})
    .catch(error => console.error(error));
    
  }
  
  function SubmitGuess(event){
    event.preventDefault();
    if(whoGuess.toLowerCase() === guessName.toLowerCase()){
      setGuessLabel("That's Correct");
      setTimeout(GenerateGuessPokemon, 1000);
    }
    else{
      setGuessLabel("Not Quite");
    }

    setWhoGuess("");
  }

  function SearchQuery(event){
    event.preventDefault();
    if(pokeMap[seek][query]){
      let pokeString = "https://pokeapi.co/api/v2/pokemon/" + pokeMap[seek][query];
      makeAPICall(pokeString, setSearchName, setSearchImage);
    }

    setQuery("");
  }

  return (
    <div className="Main">
      <div className="row">

        <div className="column">
          <div className="Item">
            <h1>Random Pokemon</h1>
            <button onClick={GeneratePokemon}>
              Generate
            </button>

            <h4>{randomgName}</h4>
            <img src={randomgImage} alt={randomgName}></img>
          </div>
        </div>

        <div className="column">
          <div className="Item">
            <h1>Search Pokemon</h1>
              <h4>{searchName}</h4>
              <img src={searchImage} alt="misingo"></img>
              <form onSubmit={SearchQuery}>
                <label>Search: </label>
                <input
                  className="searchInput"
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
              <div className="recomendation">
                {searchRes}
              </div>
          </div>
        </div>

        <div className="column">
          <div className="Item">
            <h1>Guess Pokemon</h1>
            
            <button onClick={GenerateGuessPokemon}>
              Generate
            </button>
            <br></br>

            <img className="silhouette" src={guessImage}></img>
            <form onSubmit={SubmitGuess}>
              <div className="guess-form">
                <label>{guessLabel}</label>
                <input
                  type="text"
                  required
                  value={whoGuess}
                  onChange={(e) => setWhoGuess(e.target.value)}
                />
              </div>
              <button type="submit">Guess</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}



export default App;
