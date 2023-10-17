import { authors } from "../data.js"


// /**
//  * Takes a book object and converts it to a DOM element.
//  * @param {{}} - a book object literal.
//  * @returns {HTMLElement} - an html element that can be appended to the DOM
//  */
// export function previewHTML({ author, id, image, title }) {
//     const element = document.createElement('button')
//     element.classList = 'preview'
//     element.setAttribute('data-preview', id)

//     element.innerHTML = (`
//     <img
//         class="preview__image"
//         src="${image}"
//     />
    
//     <div class="preview__info">
//         <h3 class="preview__title">${title}</h3>
//         <div class="preview__author">${authors[author]}</div>
//     </div>
// `)

//     return element
// }

const template = document.createElement('template')

template.innerHTML = /* HTML */ `
<style>
    .preview {
        border-width: 0;
        width: 100%;
        font-family: Roboto, sans-serif;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-align: left;
        border-radius: 8px;
        border: 1px solid rgba(var(--color-dark), 0.15);
        background: rgba(var(--color-light), 1);
    }
    
    @media (min-width: 60rem) {
        .preview {
        padding: 1rem;
        }
    }
    
    .preview_hidden {
        display: none;
    }
    
    .preview:hover {
        background: rgba(var(--color-blue), 0.05);
    }
    
    .preview__image {
        width: 48px;
        height: 70px;
        object-fit: cover;
        background: grey;
        border-radius: 2px;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    }
    
    .preview__info {
        padding: 1rem;
    }
    
    .preview__title {
        margin: 0 0 0.5rem;
        font-weight: bold;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        color: rgba(var(--color-dark), 0.8)
    }
    
    .preview__author {
        color: rgba(var(--color-dark), 0.4);
    }
</style>

<button class="preview">
    <img
        data-image
        class="preview__image"        
    />
    
    <div class="preview__info">
        <h3 id='title' class="preview__title"></h3>
        <div id='author' class="preview__author"></div>
    </div>
</button>
`

class Book extends HTMLElement {
    #shadow = this.attachShadow({ mode:"closed" })

    constructor() {
        super();
        const { content } = template
        this.#shadow.appendChild(content.cloneNode(true));        
    }

    
    
    connectedCallback() {
        const srcAtt = this.getAttribute('src')
        const titleAtt = this.getAttribute('title')
        const authorAtt = this.getAttribute('author')

        const image = this.#shadow.querySelector("[data-image]")
        const title = this.#shadow.querySelector('#title')
        const author = this.#shadow.querySelector('#author')
        
        
        image.setAttribute('src',srcAtt);
        title.innerText = titleAtt;
        author.innerText = authors[authorAtt]
    }
}

customElements.define('book-preview', Book)