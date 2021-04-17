import React from "react"

export default function Article(props) {
    return(
        <article>
        <div>
          <h4>Titulo: {props.article.title}</h4>
          <p>
            <strong>Autor: </strong>
            {props.article.author}
          </p>

          <a href={props.article.url} target="_blank">
            ¡Ir al artículo!
          </a>
        </div>
      </article>
    )
}