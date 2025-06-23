
document.addEventListener('DOMContentLoaded', function() {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const btnText = document.querySelector('.btn-text');
    const loadingSpinner = document.querySelector('.loading-spinner');

    // Function to fetch a new quote
    async function fetchNewQuote() {
        try {
            // Show loading state
            newQuoteBtn.disabled = true;
            btnText.style.display = 'none';
            loadingSpinner.style.display = 'block';

            // Use a CORS proxy to avoid CORS issues
            const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://stoic.tekloon.net/stoic-quote'));
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const proxyData = await response.json();
            const data = JSON.parse(proxyData.contents);
            
            // Add fade-in animation
            quoteText.classList.remove('fade-in');
            quoteAuthor.classList.remove('fade-in');
            
            // Update the quote and author
            setTimeout(() => {
                quoteText.textContent = data.data.quote;
                quoteAuthor.textContent = `— ${data.data.author}`;
                
                quoteText.classList.add('fade-in');
                quoteAuthor.classList.add('fade-in');
            }, 100);
            
        } catch (error) {
            console.error('Error fetching quote:', error);
            
            // Show error message
            setTimeout(() => {
                quoteText.textContent = "Sorry, we couldn't fetch a new quote right now. Please try again later.";
                quoteAuthor.textContent = "— Error";
                
                quoteText.classList.add('fade-in');
                quoteAuthor.classList.add('fade-in');
            }, 100);
        } finally {
            // Hide loading state
            setTimeout(() => {
                newQuoteBtn.disabled = false;
                btnText.style.display = 'block';
                loadingSpinner.style.display = 'none';
            }, 1000); // Minimum loading time for better UX
        }
    }

    // Add click event listener to the button
    newQuoteBtn.addEventListener('click', fetchNewQuote);

    // Optional: Fetch a new quote when the page loads
    // Uncomment the line below if you want a fresh quote on every page load
    // fetchNewQuote();
});
