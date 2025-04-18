document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageSpan = document.getElementById('currentPage');
    let currentPageIndex = 0;
    
    // Function to update page indicator and button states
    function updatePageControls() {
        currentPageSpan.textContent = currentPageIndex + 1;
        
        // Enable/disable previous button
        prevBtn.disabled = currentPageIndex === 0;
        
        // Enable/disable next button
        nextBtn.disabled = currentPageIndex === pages.length - 1;
    }
    
    // Function to flip to next page
    function nextPage() {
        if (currentPageIndex < pages.length - 1) {
            pages[currentPageIndex].classList.add('flipped');
            currentPageIndex++;
            updatePageControls();
            playPageTurnSound();
        }
    }
    
    // Function to flip to previous page
    function prevPage() {
        if (currentPageIndex > 0) {
            pages[currentPageIndex - 1].classList.remove('flipped');
            currentPageIndex--;
            updatePageControls();
            playPageTurnSound();
        }
    }
    
    // Function to play page turn sound
    function playPageTurnSound() {
        const pageTurnSound = new Audio();
        pageTurnSound.src = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAFhpbmcAAAAPAAAAAwAAA3QAlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaW19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19f///////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAYcAAAAAAAAdINpxrywAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxHYAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
        pageTurnSound.play().catch(error => {
            // Handle autoplay restrictions on mobile devices
            console.log("Audio playback error:", error);
        });
    }
    
    // Handle swipe gestures for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    function checkSwipeDirection() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left (next page)
            nextPage();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right (previous page)
            prevPage();
        }
    }
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        checkSwipeDirection();
    });
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);
    
    // Allow page clicking too
    pages.forEach((page, index) => {
        page.addEventListener('click', function(e) {
            // Only flip if clicking near the edge of the page
            const pageRect = page.getBoundingClientRect();
            const clickX = e.clientX - pageRect.left;
            
            // If clicking on the right third of the page and it's the current page
            if (index === currentPageIndex && clickX > (pageRect.width * 0.7)) {
                nextPage();
            }
        });
    });
    
    // Initialize page controls
    updatePageControls();

    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
            nextPage();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            prevPage();
        }
    });

    // Fix for handling text selection on mobile
    const book = document.querySelector('.book');
    book.addEventListener('selectstart', function(e) {
        e.preventDefault(); // Prevent text selection when turning pages
    });
});