document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector("#books-section");
    const errorProvider = document.querySelector("#error-message");
    const loadingText = document.querySelector("#loadingText");

    if (!section) {
        console.error("Could not find element with id 'books-section'");
        return;
    }

    // Add grid styles to the section
    section.style.display = "grid";
    section.style.gridTemplateColumns = "repeat(3, 1fr)"; // Creates 3 equal columns
    section.style.gap = "20px"; // Adds space between grid items
    section.style.padding = "20px";
    section.style.backgroundColor = "rgb(0, 0, 0)";
    section.style.height = "max-content";

    function showLoading() {
        section.style.color = "azure";
        section.innerText = "Loading books...";
    }

    function showError(message) {
        errorProvider.innerText = message;
        section.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }

    function createBookElements(book) {

        // Create container for each book
        const bookContainer = document.createElement('div');
        bookContainer.style.backgroundColor = "#E2E2E2"; // Add background to book container
        bookContainer.style.padding = "15px";
        bookContainer.style.borderRadius = "8px";
        bookContainer.style.textAlign = "center";
        
        // Create image element
        const img = document.createElement('img');
        img.src = book.image;
        img.alt = book.title;
        img.style.width = '150px';
        img.style.margin = '0 auto 10px auto'; // Center the image
        img.style.border = '3px solid black'; // Combines width, style, and color

        
        // Create text nodes wrapped in paragraph elements for better styling
        const titleP = document.createElement('p');
        titleP.textContent = `Title: ${book.title}`;
        titleP.style.margin = '10px 0';
        titleP.style.fontWeight = 'bold';

        const authorP = document.createElement('p');
        authorP.textContent = `Author: ${book.authors}`;
        authorP.style.margin = '10px 0';
        
        // Create link element
        const link = document.createElement('a');
        link.href = book.url;
        link.textContent = 'Learn More';
        link.target = '_blank';
        link.style.color = 'blue';
        link.style.display = 'inline-block';
        link.style.marginTop = '10px';
        
        // Append everything to book container
        bookContainer.appendChild(img);
        bookContainer.appendChild(titleP);
        bookContainer.appendChild(authorP);
        bookContainer.appendChild(link);
        
        // Return the container with the book content
        return bookContainer;
    }

    async function getBooks(url) {
        showLoading();

        try {
            const res = await fetch(url);
            const data = await res.json();
            
            // Clear loading message
            section.innerText = '';
            section.style.color = "black";
            // Create and append elements for each book
            data.books.forEach(book => {
                const bookElement = createBookElements(book);
                section.appendChild(bookElement);
            });

        } catch (error) {
            showError("The input value is invalid or empty.");
            console.error('Error:', error);
        }
    };

    getBooks("https://www.dbooks.org/api/recent");
    document.addEventListener("keydown", function(event) {
        const inputElement = document.querySelector("#search-books");
        if (event.key === "Enter") {
            // Your function or code here
            //inputElement.value = inputElement.split(" ").join(""); // Removes spaces
            errorProvider.innerText = "";
            let clearQuery = inputElement.value.replace(/\s+/g, "-");
            getBooks(`https://www.dbooks.org/api/search/${clearQuery}`);
            // Call your custom function
        }
        document.querySelector(".btn-outline-warning").addEventListener('click', function() {
            errorProvider.innerText = "";
            let clearQuery = inputElement.value.replace(/\s+/g, "-");
            getBooks(`https://www.dbooks.org/api/search/${clearQuery}`);
        });
    });
});

