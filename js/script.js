const searchBook = () => {
    const searchInput = document.getElementById('search-feild');
    const searchText = searchInput.value;
    searchInput.value = '';
    /* toggole-Spinner-Part(Display) */
    toggoleSpinner('block');
    /* Previous-Result-Part(Remove) */
    previousResult('none');

    // console.log(searchText)
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySeacrhBook(data))
}
const displaySeacrhBook = data => {
    /* Total-Book-Found-Part(Display) */
    const showResult = document.getElementById('show-result');
    showResult.innerHTML = `
      <h3>  >>Total Books Found:(${data.numFound})</h3>
      `;
    const displayBook = document.getElementById('display-card');
    displayBook.textContent = '';
    const books = data.docs.slice(0, 30);
    // console.log(books);
    if (books.length === 0) {
        /* Search-Result-Part(Display) */
        searchDetails('block');
        /* toggole-Spinner-Part(Remove) */
        toggoleSpinner('none');
        /* Total-Book-Found-Part(Remove) */
        const showResult = document.getElementById('show-result');
        showResult.innerHTML = '';
    } else {
        books?.forEach(book => {
            // console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card" style="width: 18rem;">

                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 'Cover img can not found'}-M.jpg" class="card-img-top" alt="Cover img can not found">
                         <div class="card-body">
                              <h5 class="card-title">${book.title}</h5>
                              <p class="card-text">Author: ${book.author_name}</p>
                              <p class="card-text">Publisher: ${book.publisher}</p>
                              <p class="card-text">First Publishe Year: ${book.first_publish_year}</p>
                           
                         </div>
                </div>
                `;
            displayBook.appendChild(div);
        });
        /* toggole-Spinner-Part(Remove) */
        toggoleSpinner('none');
        /* New-Result-Part(Display) */
        previousResult('block');
        /* Search-Result-Part(Remove) */
        searchDetails('none');
    }
}
/* search details  part */
const toggoleSpinner = displayStyle => {
    document.getElementById('loading').style.display = displayStyle;
}
/* Remove Previous Result  Part */
const previousResult = displayStyle => {
    document.getElementById('display-card').style.display = displayStyle;
}
/* Unexpected Typing Error Result  Part */
const searchDetails = displayStyle => {
    document.getElementById('search-details').style.display = displayStyle;
}
/* Unexpected Typing Error Result  Part */
/* const totalResult = displayStyle => {
    document.getElementById('show-result').style.display = displayStyle;
} */


// num_found