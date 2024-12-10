function search(event){
    event.preventDefault(); // prevents it from loading into another page
    let searchInput = document.querySelector("#search-text-input");
    console.log(searchInput.value);
}

let form = document.querySelector("#search-input");
form.addEventListener ("submit", search);
