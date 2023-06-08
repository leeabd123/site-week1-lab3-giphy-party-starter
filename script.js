// Global Constants
const apiKey = "9sDuABTTrxi3RIQhFOcAlVGQn9pM71Nd"
const limit = '10'
const rating = "g"
let limi = 10
let page_number  = 0
let offset = 10
/**
 * Update the DOM to display results from the Giphy API query.
 *
 * @param {Object} results - An array of results containing each item
 *                           returned by the response from the Giphy API.
 *
 */

// DOM Elements

const btn = document.querySelector('#search-button');
const search_form = document.querySelector('#search-form');
const search_input = document.querySelector('#search-input');
const show_more = document.querySelector(".show-more-button.hidden");
const preview_window = document.querySelector('#preview');

// const preview_window = document.querySelector('#preview');


function displayResults(results) {
  // YOUR CODE HERE



  results.data.forEach((element, i) => {
    let img = document.createElement('img');
    img.src = element.images.original.url
    preview_window.innerHTML += 
    
    `
    <img src="${img.src}" alt="image">
    `
  });

  show_more.classList.remove('hidden')

}

/**
 * Make the actual `fetch` request to the Giphy API
 * and appropriately handle the response.
 *
 * @param {String} searchTerm - The user input text used as the search query
 *
 */
async function getGiphyApiResults(searchTerm) {
  // YOUR CODE HERE

  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=10&offset=${offset}&rating=g&lang=en`)
  const data = await response.json()
  console.log(data)

  displayResults(data)
  return data

}

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
  // YOUR CODE HERE

  preview_window.innerHTML = '';
  show_more.classList.add('hidden')


  event.preventDefault()
  console.log(search_input.value)
  await getGiphyApiResults(search_input.value)


  

}

search_form.addEventListener("submit", handleFormSubmit)

/**
 * Handle fetching the next set of results from the Giphy API
 * using the same search term from the previous query.
 *
 * @param {MouseEvent} event - The 'click' MouseEvent triggered by clicking the 'Show more' button
 *
 */
async function handleShowMore(event) {
  // YOUR CODE HERE
  offset+=10
  page_number+=1

  const data = await getGiphyApiResults(search_input.value)
  displayResults(data)
  // console.log(page_number)
}

window.onload = function () {
  // YOUR CODE HERE
  // Add any event handlers here

  btn.addEventListener('click', handleFormSubmit)
  // btn.addEventListener('click', handleFormSubmit)
  show_more.addEventListener('click', handleShowMore)






}
