import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setcurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      });

    return () => {
      cancel();
    };
  }, [currentPageUrl]);

  function gotoNextPage() {
    setcurrentPageUrl(nextPageUrl);
  }

  function gotoPreviousPage() {
    setcurrentPageUrl(prevPageUrl);
  }

  if (loading) return "loading....";

  return (
    <div>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={gotoNextPage}
        gotoPreviousPage={gotoPreviousPage}
      />
      ;
    </div>
  );
};

export default App;
