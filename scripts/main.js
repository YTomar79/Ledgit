document.addEventListener('DOMContentLoaded', function () {
    function isUserSignedIn() {
        return localStorage.getItem('token') !== null;
    }

    function login() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.reload();
            } else {
                alert(data.message);
            }
        });
    }

    function signup() {
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message === 'User registered successfully!') {
                window.location.href = 'auth.html'; // Redirect to login page
            }
        });
    }

    function logout() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    if (isUserSignedIn()) {
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('homepage').style.display = 'none';
        document.getElementById('auth-links').style.display = 'none';
        document.getElementById('dashboard-link').style.display = 'flex';
    } else {
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('homepage').style.display = 'block';
        document.getElementById('auth-links').style.display = 'flex';
        document.getElementById('dashboard-link').style.display = 'none';
    }

    document.getElementById('logout').addEventListener('click', logout);

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            login();
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            signup();
        });
    }

    const reviews = [
        { user: 'John Doe', review: 'Great app! Really helps me organize my bookmarks.' },
        { user: 'Jane Smith', review: 'Very useful tool, easy to use.' },
        { user: 'Sam Wilson', review: 'I love the features and the UI is fantastic.' },
    ];

    function renderReviews(containerId, limit) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear the container first
        const reviewsToRender = limit ? reviews.slice(0, limit) : reviews;

        reviewsToRender.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `<strong>${review.user}</strong><p>${review.review}</p>`;
            container.appendChild(reviewItem);
        });
    }

    if (document.getElementById('reviewsContainer')) {
        renderReviews('reviewsContainer');
    }

    if (document.getElementById('reviews-preview-container')) {
        renderReviews('reviews-preview-container', 2);
    }

    const reviewFormSection = document.getElementById('reviewFormSection');
    if (isUserSignedIn() && reviewFormSection) {
        reviewFormSection.style.display = 'block';
    }

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const bookId = document.getElementById('bookId').value;
            const reviewText = document.getElementById('reviewText').value;

            if (bookId && reviewText) {
                reviews.unshift({ user: `User ${bookId}`, review: reviewText });
                renderReviews('reviewsContainer');
                renderReviews('reviews-preview-container', 2);
                reviewForm.reset();
            }
        });
    }
});
