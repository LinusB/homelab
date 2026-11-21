
if (!window.shadowHookHooked) {
    const originalAttach = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function(options) {
        return originalAttach.call(this, { mode: 'open' }); 
    };
    window.shadowHookHooked = true;
}

function closeMermaidOverlay() {
    const overlay = document.getElementById('custom-mermaid-overlay');
    if (overlay) overlay.remove();
    document.body.style.overflow = ''; 
}

if (typeof document$ !== "undefined") {
    document$.subscribe(closeMermaidOverlay);
}

document.body.addEventListener("click", function(e) {
    
    if (e.target.closest('.glightbox')) return;

    if (e.target.id === 'custom-mermaid-overlay' || e.target.classList.contains('mermaid-close-btn')) {
        closeMermaidOverlay();
        return;
    }

    const mermaidBlock = e.target.closest('.mermaid');
    if (!mermaidBlock) return;
    
    const svg = mermaidBlock.shadowRoot 
                ? mermaidBlock.shadowRoot.querySelector('svg') 
                : mermaidBlock.querySelector('svg');

    if (!svg) return;

    if (document.getElementById('custom-mermaid-overlay')) return;

    // --- THEME DETECTION ---
    let isDarkMode = false;
    const colorScheme = document.body.getAttribute('data-md-color-scheme');
    if (colorScheme === 'slate') {
        isDarkMode = true;
    } else if (colorScheme === 'default') {
        isDarkMode = false;
    } else {
        isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    const bgColor = isDarkMode ? 'rgba(15, 17, 21, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    const closeBtnColor = isDarkMode ? 'white' : '#1a1a1a';
    // -----------------------

    const svgClone = svg.cloneNode(true);
    svgClone.removeAttribute('width');
    svgClone.removeAttribute('height');

    const overlay = document.createElement('div');
    overlay.id = 'custom-mermaid-overlay';
    
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${bgColor};
        z-index: 999999;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(2px); /* Gibt dem Hintergrund eine schöne Tiefe */
    `;


    svgClone.style.cssText = `
        cursor: zoom-in;
        width: 95vw;
        height: 95vh;
        max-width: none;
        object-fit: contain;
        transition: width 0.3s ease;
        display: block;
        margin: auto;
    `;

    svgClone.addEventListener('click', function(evt) {
        evt.stopPropagation(); 
        
        const isZoomed = this.classList.toggle('zoomed');
        if (isZoomed) {
            this.style.width = '100vw'; 
            this.style.height = 'auto';
            this.style.cursor = 'zoom-out';

            overlay.style.alignItems = 'flex-start'; 
            overlay.style.justifyContent = 'flex-start';
        } else {
            this.style.width = '95vw';
            this.style.height = '95vh';
            this.style.cursor = 'zoom-in';

            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
        }
    });


    const closeBtn = document.createElement('div');
    closeBtn.className = 'mermaid-close-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: fixed;
        top: 25px;
        right: 35px;
        color: ${closeBtnColor};
        font-size: 30px;
        font-family: sans-serif;
        cursor: pointer;
        z-index: 1000000;
        opacity: 0.7;
    `;
    closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
    closeBtn.onmouseout = () => closeBtn.style.opacity = '0.7';


    overlay.appendChild(closeBtn);
    overlay.appendChild(svgClone);
    document.body.appendChild(overlay);
    

    document.body.style.overflow = 'hidden'; 
});