const searchBook = () => {
    const searchInput = document.getElementById('search-feild');
    const searchText = searchInput.value;
    searchInput.value = '';
    /* toggole-Spinner-Part(Add) */
    toggoleSpinner('block');
    /* Previous-Result-Part(remove) */
    previousResult('none');
    // console.log(searchText)
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySeacrhBook(data.docs.slice(0, 30)))
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
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 'Cover img can not found'}-M.jpg" class="card-img-top" alt="Cover img can not found">
                         <div class="card-body">
                              <h5 class="card-title">${book.title}</h5>
                              <p class="card-text">Author: ${book.author_name[0]}</p>
                              <p class="card-text">Publisher: ${book.publisher[0]}</p>
                              <p class="card-text">First Publishe Year: ${book.first_publish_year}</p>
                           
                         </div>
                </div>
                `;
            displayBook.appendChild(div);
        })
        /* toggole-Spinner-Part(Remove) */
        toggoleSpinner('none');
        /* New-Result-Part(Add) */
        previousResult('block');
        /* search-details-Part(Remove) */
        searchDetails('none');
    }
}

/* search details  part */
const toggoleSpinner = displayStyle => {
    document.getElementById('loading').style.display = displayStyle;
}
/* Remove Previous Result  Part */
const previousResult = displayStyle => {
    document.getElementById('remove-result').style.display = displayStyle;
}
/* Unexpected Typing Error Result  Part */
const searchDetails = displayStyle => {
    document.getElementById('search-details').style.display = displayStyle;
}


// num_found