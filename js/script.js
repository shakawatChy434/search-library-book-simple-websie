const searchBook = () => {
    const searchInput = document.getElementById('search-feild');
    const searchText = searchInput.value;
    searchInput.value = '';
    /* toggole-Spinner-Part(Display) */
    toggoleSpinner('block');
    /* Previous-Result-Part(remove) */
    previousResult('none');

    // console.log(searchText)
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySeacrhBook(data.docs))
}
const displaySeacrhBook = books => {
    console.log(books);
    const displayBook = document.getElementById('display-card');
    displayBook.textContent = '';

    // console.log(books);
    if (books.length === 0) {
        searchDetails('block');
        toggoleSpinner('none');
    } else {
        books?.forEach(book => {
            // console.log(book);
            const showResult = document.getElementById('show-result');
            showResult.innerHTML = `
            <h1>Total  Books Found:${books.length}</h1>
            `;
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
        })
        /* toggole-Spinner-Part(Remove) */
        toggoleSpinner('none');
        /* New-Result-Part(Display) */
        previousResult('block');
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
const totalResult = displayStyle => {
    document.getElementById('show-result').style.display = displayStyle;
}


// num_found