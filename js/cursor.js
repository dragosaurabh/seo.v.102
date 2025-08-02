// Enhanced Custom Cursor Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');
    
    if (!cursor || !cursorOutline) return;
    
    // Function to update cursor position
    const updateCursorPosition = (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Use requestAnimationFrame for smoother animation
        window.requestAnimationFrame(() => {
            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;
            
            // Slightly delayed outline movement for trailing effect
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });
    };
    
    // Show cursor when mouse moves
    document.addEventListener('mousemove', (e) => {
        updateCursorPosition(e);
        
        // Check if opacity is still 0 (initial state)
        if (cursor.style.opacity === '0' || cursor.style.opacity === '') {
            cursor.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        }
    });
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    // Show cursor when mouse enters the window
    document.addEventListener('mouseenter', (e) => {
        updateCursorPosition(e);
        cursor.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .case-study, .social-icon, input, textarea, select, .contact-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            // Add hover class to body to trigger CSS changes
            document.body.classList.add('cursor-hover');
            cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseout', () => {
            document.body.classList.remove('cursor-hover');
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Add click animation
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}); 