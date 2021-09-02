
const searchFood = () => {
    const searchFoodName = document.getElementById('search-feild')
    const searchFoodText = searchFoodName.value;

    /* Add a toggole spinner */
    // Show Spinner 
    toggleSpinner('block')
    searchResultPart('none')
    /* Clear Data */
    searchFoodName.value = '';
    if (searchFoodText == '') {
        // console.log('Search Valid Food.')
        //create a div & add this error text on display.
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFoodText}
    `;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchFood(data.meals))
    }
    // console.log(searchFoodText)
    /* Load Data */

}
const displaySearchFood = meals => {
    // console.log(meals)
    const searchResult = document.getElementById('search-result');

    /* Cleare Previous Data */
    searchResult.textContent = '';
    /* Provide Condistion */
    if (!meals) {
        emptySrearch('block')
        toggleSpinner('none')
        //create a div & add this error text on display.
    } else {
        meals?.forEach(meal => {
            // console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="loadMealDetails(${meal.idMeal})" class="card" h-100>
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                         <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 100)}
                        </p>
                 </div>
            </div>
            `;
            searchResult.appendChild(div)
        })
        /* Remove a toggole spinner */
        // Remove Spinner
        toggleSpinner('none');
        searchResultPart('block');
        emptySrearch('none')
    }
}
const loadMealDetails = async mealId => {
    // console.log(mealId)  
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`

    /* Async & await system */
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
    /* fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0])) */
}
const displayMealDetails = meal => {
    console.log(meal)
    const mealDetails = document.getElementById('meal-perDetails');

    /* Cleare Previous Data */
    mealDetails.textContent = '';

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Let's Start.</a>
    </div>
     `;
    mealDetails.appendChild(div);
}


/* Letest Work Part-01 */
/* Toggole Spinner Part Js Start */
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
/* Toggole Spinner Part Js End. */

/* Letest Work Part-02 */
/* Show Meals Part Js Start */
const searchResultPart = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}
/* Show Meals Part Js End. */

/* Letest Work Part-03 */
/* Show ERROR massege Part Js Start. */
const emptySrearch = displayStyle => {
    document.getElementById('error').style.display = displayStyle;
}
/* Show ERROR massege Part Js End. */
