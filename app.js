document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector("#movie-list ul");
    const forms = document.forms;
    let movieArray = JSON.parse(localStorage.getItem('movies')) || [];

    function saveMovies() {
        localStorage.setItem('movies', JSON.stringify(movieArray));
    }

    // Render the loaded movies
    movieArray.forEach(movie => {
        createMovieElement(movie.name, movie.genre);
    });

    function createMovieElement(name, genre) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class ="name">${name}</span>
            <select class="genre">                   
                <option value="action" ${genre === 'Action' ? 'selected' : ''}>Action</option>
                <option value="comedy" ${genre === 'Comedy' ? 'selected' : ''}>Comedy</option>
                <option value="comedy" ${genre === 'Documentary' ? 'selected' : ''}>Documentary</option>
                <option value="drama" ${genre === 'Thriller' ? 'selected' : ''}>Thriller</option>
                <option value="horror" ${genre === 'horror' ? 'selected' : ''}>Horror</option>
                <option value="romance" ${genre === 'romance' ? 'selected' : ''}>Romance</option>
                <option value="romance" ${genre === 'Crime' ? 'selected' : ''}>Crime</option>
            </select>
            <div class="buttons">
                <span class="delete">Delete</span>
                <span class="edit">Edit</span>
            </div>
        `;
        list.appendChild(li);
    }    // Add movie
    const addForm = forms["add-movie"];
    addForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get input values
        const value = addForm.querySelector("input[type='text']").value;
        const genre = addForm.querySelector("select").value;

        // Create and add new movie element
        createMovieElement(value, genre);

        // Update movie array and save
        movieArray.push({ name: value, genre: genre });
        saveMovies();

        // Clear input
        addForm.querySelector("input[type='text']").value = "";
    });

    

    // Edit movie
    list.addEventListener("click", (e) => {
        if (e.target.className === "edit") {
            const li = e.target.closest('li');
            const movieNameSpan = li.querySelector('.name');
            const newName = prompt("Edit Movie Name:", movieNameSpan.textContent);
            if (newName) {
                const movieIndex = movieArray.findIndex(movie => movie.name === movieNameSpan.textContent);
                movieArray[movieIndex].name = newName;
                movieNameSpan.textContent = newName;
                saveMovies();
            }
        }
    });

    // Delete movie
    list.addEventListener("click", (e) => {
        if (e.target.className === "delete") {
            const li = e.target.closest('li');
            const movieName = li.querySelector('.name').textContent;
            movieArray = movieArray.filter(movie => movie.name !== movieName);
            saveMovies();
            li.remove();
        }
    });

    // Search movies
    const searchInput = document.querySelector('#search-movies');
    searchInput.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        const movies = document.querySelectorAll('#movie-list li');
        movies.forEach((movie) => {
            const title = movie.querySelector('.name').textContent.toLowerCase();
            movie.style.display = title.includes(term) ? 'flex' : 'none';
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Add event listener to the toggle button
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        themeToggle.innerHTML = body.classList.contains("dark-mode") ? "🌙" : "☀️";
    });
});
