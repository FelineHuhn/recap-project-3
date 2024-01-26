import CharacterCard from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States

let maxPage = 1;
let page = 1;
const searchQuery = "";

async function fetchCharacters() {
  cardContainer.innerHTML = "";

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();
    const characters = data.results;
    maxPage = data.info.pages;
    pagination.textContent = `${page} / ${maxPage}`;

    characters.forEach((character) => {
      const characterCard = CharacterCard(character);
      cardContainer.append(characterCard);
    });
  } catch (error) {
    console.error(error);
  }
}

fetchCharacters();

nextButton.addEventListener("click", () => {
  if (page === maxPage) return;

  page++;
  fetchCharacters();
});

prevButton.addEventListener("click", () => {
  if (page === 1) return;

  page--;
  fetchCharacters();
});
