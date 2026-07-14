/**
 * Tanya Rathore - AI/ML Portfolio Product Store Logic
 * Handles:
 * 1. Product dataset definition
 * 2. Search filtering
 * 3. Category checking/unchecking
 * 4. Price range slider dynamic filtering
 * 5. Multi-criteria sorting
 * 6. Live DOM rendering & empty states
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mock Product Dataset
    // ==========================================
    const products = [
        {
            id: 'prod-llm-api',
            name: 'DeepText-Instruct 7B API',
            category: 'APIs',
            description: 'Fine-tuned LLM instruction endpoint optimized for classification, summarization, and translation tasks. Ultra low latency.',
            price: 49.00,
            rating: 4.8,
            iconClass: 'fa-solid fa-cloud-bolt',
            gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
        },
        {
            id: 'prod-resnet-weights',
            name: 'PneumoniaDetect ResNet50 Weights',
            category: 'Computer Vision',
            description: 'Pre-trained ResNet50 weights in ONNX/PyTorch format, optimized for pediatric chest X-ray scans. Achieves 94.6% recall.',
            price: 120.00,
            rating: 4.9,
            iconClass: 'fa-solid fa-file-medical',
            gradient: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)'
        },
        {
            id: 'prod-reviews-data',
            name: 'E-Commerce Reviews Dataset',
            category: 'Datasets',
            description: 'Clean, balanced text corpus containing 50,000 retail product reviews, fully annotated for sentiment analysis modeling.',
            price: 15.00,
            rating: 4.5,
            iconClass: 'fa-solid fa-database',
            gradient: 'linear-gradient(135deg, #ff9f43 0%, #f57c00 100%)'
        },
        {
            id: 'prod-style-api',
            name: 'ArtStyle Neural Canvas API',
            category: 'APIs',
            description: 'Fast style transfer API endpoint to paint static user photographs in style matrices (famous paintings) in under 2 seconds.',
            price: 29.00,
            rating: 4.6,
            iconClass: 'fa-solid fa-palette',
            gradient: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)'
        },
        {
            id: 'prod-lane-seg',
            name: 'LaneSegment PyTorch UNet Weights',
            category: 'Computer Vision',
            description: 'Trained model weights of a modified UNet neural net for real-time lane segmentation in autonomous vehicle systems.',
            price: 180.00,
            rating: 4.7,
            iconClass: 'fa-solid fa-car-side',
            gradient: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)'
        },
        {
            id: 'prod-ithaca-model',
            name: 'Ithaca Greek Epigraphy Model',
            category: 'Natural Language Processing',
            description: 'Seq2Seq Transformer model designed for restoration and chronological dating of ancient Greek epigraphic text fragments.',
            price: 0.00, // Free
            rating: 4.9,
            iconClass: 'fa-solid fa-scroll',
            gradient: 'linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%)'
        }
    ];

    // ==========================================
    // DOM Elements Cache
    // ==========================================
    const productGrid     = document.getElementById('product-grid');
    const searchInput     = document.getElementById('search-input');
    const categoryChecks  = document.getElementsByName('category');
    const priceRange      = document.getElementById('price-range');
    const priceValue      = document.getElementById('price-value');
    const sortSelect      = document.getElementById('sort-select');
    const resultsCount    = document.getElementById('results-count');
    const emptyState      = document.getElementById('store-empty-state');
    const resetBtn        = document.getElementById('reset-filters-btn');
    const emptyResetBtn   = document.getElementById('empty-reset-btn');

    // Guard — if not on products page
    if (!productGrid) return;

    // ==========================================
    // Rendering Function
    // ==========================================
    function renderProducts() {
        // 1. Get filter values
        const searchTerm = searchInput.value.trim().toLowerCase();
        const maxPrice = parseFloat(priceRange.value);
        
        const selectedCategories = [];
        categoryChecks.forEach(check => {
            if (check.checked) {
                selectedCategories.push(check.value);
            }
        });

        // 2. Filter products
        let filtered = products.filter(item => {
            // Search text matches name or description or category
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                                  item.description.toLowerCase().includes(searchTerm) ||
                                  item.category.toLowerCase().includes(searchTerm);
            
            // Category matches
            const matchesCategory = selectedCategories.includes(item.category);
            
            // Price is under maximum limit
            const matchesPrice = item.price <= maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        });

        // 3. Sort products
        const sortBy = sortSelect.value;
        filtered.sort((a, b) => {
            if (sortBy === 'rating-desc') {
                return b.rating - a.rating; // Highest rating first
            }
            if (sortBy === 'price-asc') {
                return a.price - b.price; // Cheapest first
            }
            if (sortBy === 'price-desc') {
                return b.price - a.price; // Most expensive first
            }
            if (sortBy === 'name-asc') {
                return a.name.localeCompare(b.name); // Alphabetical A-Z
            }
            return 0;
        });

        // 4. Update count text
        resultsCount.textContent = filtered.length === 1 
            ? 'Showing 1 asset' 
            : `Showing ${filtered.length} assets`;

        // 5. Clear grid
        productGrid.innerHTML = '';

        // 6. Handle empty state or render cards
        if (filtered.length === 0) {
            emptyState.style.display = 'flex';
            productGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            productGrid.style.display = 'grid';

            filtered.forEach(item => {
                const card = createProductCard(item);
                productGrid.appendChild(card);
            });
        }
    }

    // ==========================================
    // Card Helper
    // ==========================================
    function createProductCard(item) {
        const div = document.createElement('div');
        div.className = 'api-card'; // Reuses card styles
        div.style.height = '100%';
        div.style.opacity = '0';
        div.style.transform = 'translateY(15px)';
        div.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        const priceText = item.price === 0 ? 'FREE' : `$${item.price.toFixed(2)}`;
        
        // Generate Star Rating HTML
        let starsHtml = '';
        const fullStars = Math.floor(item.rating);
        const hasHalf = item.rating % 1 !== 0;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += '<i class="fa-solid fa-star" style="color: #fbbf24; font-size: 0.85rem; margin-right: 2px;"></i>';
            } else if (i === fullStars && hasHalf) {
                starsHtml += '<i class="fa-solid fa-star-half-stroke" style="color: #fbbf24; font-size: 0.85rem; margin-right: 2px;"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star" style="color: #cbd5e1; font-size: 0.85rem; margin-right: 2px;"></i>';
            }
        }

        div.innerHTML = `
            <div class="api-card-header">
                <div class="api-card-icon" style="background: ${item.gradient};">
                    <i class="${item.iconClass}"></i>
                </div>
                <div style="flex: 1;">
                    <p class="api-card-title">${item.name}</p>
                    <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                        <span class="api-badge" style="margin: 0; background: transparent; padding: 0.1rem 0.5rem; font-size: 0.7rem; border-color: rgba(79, 70, 229, 0.15);">${item.category}</span>
                        <div style="display: flex; align-items: center;">
                            ${starsHtml}
                            <span style="font-size: 0.8rem; font-weight: 600; margin-left: 0.25rem; color: var(--color-text-secondary);">${item.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="api-card-body" style="min-height: 80px; justify-content: flex-start; padding: 0.25rem 0;">
                <p class="api-text" style="font-size: 0.9rem; line-height: 1.5; color: var(--color-text-secondary);">${item.description}</p>
            </div>
            <div class="api-card-footer" style="margin-top: auto; align-items: center;">
                <span style="font-size: 1.35rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-heading);">${priceText}</span>
                <button class="api-refresh-btn" style="background: var(--gradient-primary); border-radius: 8px; font-weight: 600; padding: 0.5rem 1rem; font-size: 0.82rem;">
                    <i class="fa-solid fa-cloud-arrow-down"></i> Get Asset
                </button>
            </div>
        `;

        // Trigger reveal fade-in effect sequentially
        setTimeout(() => {
            div.style.opacity = '1';
            div.style.transform = 'translateY(0)';
        }, 50);

        // Bind Buy Button click simulation
        const buyBtn = div.querySelector('.api-refresh-btn');
        buyBtn.addEventListener('click', () => {
            alert(`Simulated Action: Fetching details / downloading weights for "${item.name}"!`);
        });

        return div;
    }

    // ==========================================
    // Event Listeners for Filters
    // ==========================================

    // 1. Search text typing
    searchInput.addEventListener('input', renderProducts);

    // 2. Category selection changes
    categoryChecks.forEach(check => {
        check.addEventListener('change', renderProducts);
    });

    // 3. Price slider changes
    priceRange.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        priceValue.textContent = `$${val}`;
        renderProducts();
    });

    // 4. Sort selection changes
    sortSelect.addEventListener('change', renderProducts);

    // 5. Reset button handler
    function resetFilters() {
        searchInput.value = '';
        priceRange.value = 250;
        priceValue.textContent = '$250';
        categoryChecks.forEach(check => check.checked = true);
        sortSelect.value = 'rating-desc';
        renderProducts();
    }

    resetBtn.addEventListener('click', resetFilters);
    emptyResetBtn.addEventListener('click', resetFilters);

    // ==========================================
    // Initial Render
    // ==========================================
    renderProducts();

});
