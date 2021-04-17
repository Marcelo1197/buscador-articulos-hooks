import React, { useState, useEffect } from "react";
import "../assets/styles/Home.css";
import Article from "../components/Article";
/* 

*/
export default function Home() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("react");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=react"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ err: false, errorMessage: "" });

  useEffect(() => {
    const getArticlesByTopic = async (anyUrl) => {
      setIsLoading(true);
      try {
        const res = await fetch(anyUrl);
        if (!res.ok) {
          throw { err: true, errorMessage: res.message };
        }
        const topics = await res.json();
        setData({ hits: topics.hits });
        setError({err: false})
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError({ err: true });
      }
    };
    getArticlesByTopic(url);
  }, [url]);

  const handleClickBuscar = (e) => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
    document.getElementById("topicArticle").value = "";
  };

  const handleChangeInputTopic = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <section className="intro">
        <div>
          <h1>Búsqueda de artículos por temas</h1>
          <p>
            Artículos de todo tópico: programación, finanzas, políticas,
            tecnología, gaming, etc.
          </p>
          <p>
            Por favor busca <strong>palabras en minuscula</strong> como: react,
            kotlin, playstation, mac, etc.
          </p>
        </div>
        <form>
          <label htmlFor="topicArticle">Ingrese un tema preferido</label>
          <input
            onChange={handleChangeInputTopic}
            type="text"
            id="topicArticle"
          />
          <button onClick={handleClickBuscar}>Buscar</button>
        </form>
      </section>
      <hr />
      <section className="articleList">
        {isLoading 
          ? <div>Loading...</div>
          : error.err
            ? <div className="errorMessage">Ups hubo un error...</div>
            : data.hits.map((article) => {
              return (
              <Article key={article.objectID} article={article}/>
            );
        })}
      </section>
    </>
  );
}
