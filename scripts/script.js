document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewForm = document.getElementById('review-form');

    // Fetch and display reviews
    fetch('/reviews')
        .then(response => response.json())
        .then(reviews => {
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review';
                reviewElement.innerHTML = `<strong>${review.username} on ${review.title}</strong><p>${review.review}</p>`;
                reviewsContainer.appendChild(reviewElement);
            });
        });

    // Handle review form submission
    reviewForm.addEventListener('submit', event => {
        event.preventDefault();
        
        const user_id = document.getElementById('user_id').value;
        const book_id = document.getElementById('book_id').value;
        const review = document.getElementById('review').value;

        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id, book_id, review })
        })
        .then(response => response.json())
        .then(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `<strong>${review.username} on ${review.title}</strong><p>${review.review}</p>`;
            reviewsContainer.appendChild(reviewElement);

            // Clear the form
            reviewForm.reset();
        });
    });
});
