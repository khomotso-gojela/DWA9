import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import { page, matches } from './scripts.js';

/**
 * updates the showmore button inner Text
 * @returns {string}
 */
export function showmoreHtml() {
    return `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
}

/**
 * fetch a html element
 * @param {string} element 
 * @returns {HTMLElement}
 */
export function getElement(element) {
    return document.querySelector(`[data-${element}]`)
}

/**
 * sets theme to night theme
 */
export function setNightTheme() {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
}

/**
 * sets theme to day theme
 */
export function setDayTheme() {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

/**
 * Takes a book object and converts it to a DOM element.
 * @param {{}} - a book object literal.
 * @returns {HTMLElement} - an html element that can be appended to the DOM
 */
export function previewHTML({ author, id, image, title }) {
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = (`
    <img
        class="preview__image"
        src="${image}"
    />
    
    <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
    </div>
`)

    return element
}

/**
 * Populates form select input with options
 * @param {object} obj - object with select input options
 * @returns {DocumentFragment}
 */
export function formOptions(obj) {

    const frag = document.createDocumentFragment()
    const firstGenreElement = document.createElement('option')
    firstGenreElement.value = 'any'
    firstGenreElement.innerText = 'All'
    frag.appendChild(firstGenreElement)
    
    for (const [id, name] of Object.entries(obj)) {
        const element = document.createElement('option')
        element.value = id
        element.innerText = name
        frag.appendChild(element)
    }
    
    return frag
    
}

/**
 * Opens and closes overlays
 * @param {HTMLElement} element 
 */
export function openClose(element,overlay) {
    element.addEventListener('click',()=>{
        if (overlay.open == true) {
            overlay.open = false
        } else {
            overlay.open = true
        }
    })
}

/**
 * @param {Event} event
 * @props 
 */
export const filterBooks = (event) => {
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const results = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            results.push(book)
        }
    }

    return ({
        get result() {
            return results
        }
    })

}