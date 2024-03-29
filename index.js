import CharacterCard from "./components/CharacterCard/CharacterCard.js";
import NavButton from "./components/NavButton/NavButton.js";
import NavPagination from "./components/NavPagination/NavPagination.js";
import SearchBar from "./components/SearchBar/SearchBar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const navigation = document.querySelector('[data-js="navigation"]');

// States

let maxPage = 42;
let page = 1;
let searchQuery = "";

// Components

const prevButton = NavButton("previous", () => {
  if (page === 1) return;

  page--;
  fetchCharacters();
});

const nextButton = NavButton("next", () => {
  if (page === maxPage) return;

  page++;
  fetchCharacters();
});

const pagination = NavPagination();

const searchBar = SearchBar((event) => {
  event.preventDefault();

  const inputValue = event.target.elements.query.value;
  searchQuery = inputValue;

  page = 1;
  fetchCharacters();
});

navigation.append(prevButton, pagination, nextButton);
searchBarContainer.append(searchBar);

// Data Fetching

async function fetchCharacters() {
  cardContainer.innerHTML = "";

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
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
