const FILTER_API_KEY = "https://www.themealdb.com/api/json/v1/1/filter.php?i="
const input = document.querySelector(".meal__input");
const btn = document.querySelector(".search__button");
const cards = document.querySelector(".meal__cards");
const noResultBtn = document.querySelector(".no--results");

function response(url) {
    fetch(url)
        .then(data => data.json())
        .then(response => {
            if (!response.meals) {
                noResultBtn.classList.replace("hidden","visible")
            } else {
                noResultBtn.classList.replace("visible","hidden");
                cards.innerHTML = "";
                response.meals.forEach(item => {
                    cards.innerHTML += `
                <div class="meal__card">
                <div class="meal__card-imgbox">
                    <img src="${item.strMealThumb}" alt="image...">
                </div>
                <h3 class="meal__card-title">${item.strMeal}</h3>
                <button class="meal__card-button">Get Recipe</button>
                </div> `
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}

btn.addEventListener('click', () => {
    cards.innerHTML = "";
    response(FILTER_API_KEY + input.value.trim().toLowerCase());
});
input.addEventListener('keypress', (e) => {
    if (e.code == "Enter") {
        cards.innerHTML = "";
        response(FILTER_API_KEY + input.value.trim().toLowerCase());
    }
});