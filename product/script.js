document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            name: 'Samsung 32" LED TV',
            category: 'electronics',
            price: 99999.99,
            rating: 4.8,
            image:"https://images-cdn.ubuy.co.in/67c16783dcab667e6d1ef1a8-samsung-32-class-fhd-1080p-smart-led.jpg"
        },
        {
            id: 2,
            name: 'Cricket kit',
            category: 'sports',
            price: 9999.00,
            rating: 4.5,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Riw3VokPGI2ZLQF2nXQQBQ9GI8xileK7Og&s'
        },
        {
            id: 3,
            name: 'The Great Adventure',
            category: 'books',
            price: 150.50,
            rating: 4.5,
            image: "https://i.postimg.cc/RZnHdRjw/book.jpg"
        },
        {
            id: 4,
            name: 'Smart Coffee Maker',
            category: 'home & kitchen',
            price: 890.99,
            rating: 4.7,
            image: 'https://i.postimg.cc/NFG8Qx3Q/coffee.jpg'
        },
        {
            id: 5,
            name: 'Wireless Headphones',
            category: 'electronics',
            price: 1490.99,
            rating: 4.6,
            image: 'https://i.postimg.cc/bYTrbPtC/headphones.jpg'
        },
        {
            id: 6,
            name: 'vintage shirts',
            category: 'clothing',
            price: 410.99,
            rating: 3.9,
            image: 'https://m.media-amazon.com/images/I/51BBZAp4jAL.jpg'
        },
        {
            id: 7,
            name: 'Science Fiction Epic (DUNE)',
            category: 'books',
            price: 220.00,
            rating: 4.9,
            image: 'https://i.postimg.cc/D0mgqgBB/dune.jpg'
        },
        {
            id: 8,
            name: 'Blender Pro 1000',
            category: 'home & kitchen',
            price: 3000.00,
            rating: 4.1,
            image: 'https://i.postimg.cc/v8kHFtpy/blender.png'
        },
        {
            id: 9,
            name: 'Gaming Mouse RGB',
            category: 'electronics',
            price: 450.00,
            rating: 4.3,
            image: 'https://i.postimg.cc/yxkhGCk0/mouse.jpg'
        },
        {
            id: 10,
            name: 'Summer Dress Floral',
            category: 'clothing',
            price: 3500.00,
            rating: 4.0,
            image: 'https://i.postimg.cc/3rD8CbwG/dress.jpg'
        },
        {
            id: 11,
            name: 'Cookbook Italian Cuisine',
            category: 'books',
            price: 280.00,
            rating: 4.4,
            image: 'https://i.postimg.cc/6pvKX8Dm/cookbook.jpg'
        },
        {
            id: 12,
            name: 'Air Fryer XL',
            category: 'home & kitchen',
            price: 1500.00,
            rating: 4.8,
            image: 'https://i.postimg.cc/Znh5yrp2/fryer.webp'
        },
        {
            id: 13,
            name: 'Ultra HD Monitor',
            category: 'electronics',
            price: 39900.99,
            rating: 4.7,
            image: 'https://i.postimg.cc/qMJCbT6Y/monitor.jpg'
        },
        {
            id: 14,
            name: 'Winter Coat Warm',
            category: 'clothing',
            price: 850.00,
            rating: 4.5,
            image: 'https://i.postimg.cc/Bnxx16x8/coat.jpg'
        },
        {
            id: 15,
            name: 'Fantasy Novel Series',
            category: 'books',
            price: 600.00,
            rating: 4.9,
            image: 'https://i.postimg.cc/d3qpZ1Nw/novel.jpg'
        }
    ];

    let filteredProducts = [...products];
    let currentCategory = 'all';
    let currentMinPrice = 0;
    let currentMaxPrice = 100000;
    let currentSortOrder = 'none';

    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyPriceFilterBtn = document.getElementById('apply-price-filter');
    const sortRatingSelect = document.getElementById('sort-rating');
    const noProductsMessage = document.getElementById('no-products-message');

    function displayProducts(productsToDisplay) {
        // Clear existing product cards before displaying new ones
        productList.innerHTML = '';

        if (productsToDisplay.length === 0) {
            noProductsMessage.classList.remove('hidden');
        } else {
            noProductsMessage.classList.add('hidden');
            productsToDisplay.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p class="price">₹${product.price.toFixed(2)}</p>
                    <p class="rating">${'★'.repeat(Math.floor(product.rating))} (${product.rating.toFixed(1)})</p>
                    <p class="category">${product.category}</p>
                `;
                productList.appendChild(productCard);
            });
        }
    }

    function applyFiltersAndSort() {
        let tempProducts = [...products];

        if (currentCategory !== 'all') {
            tempProducts = tempProducts.filter(product => product.category === currentCategory);
        }

        tempProducts = tempProducts.filter(product =>
            product.price >= currentMinPrice && product.price <= currentMaxPrice
        );

        if (currentSortOrder === 'high-to-low') {
            tempProducts.sort((a, b) => b.rating - a.rating);
        } else if (currentSortOrder === 'low-to-high') {
            tempProducts.sort((a, b) => a.rating - b.rating);
        }

        filteredProducts = tempProducts;
        displayProducts(filteredProducts);
    }


    categoryFilter.addEventListener('change', (event) => {
        currentCategory = event.target.value;
        applyFiltersAndSort();
    });

    minPriceInput.addEventListener('change', (event) => {
        currentMinPrice = parseFloat(event.target.value);
        if (isNaN(currentMinPrice)) currentMinPrice = 0;
    });

    maxPriceInput.addEventListener('change', (event) => {
        currentMaxPrice = parseFloat(event.target.value);
        if (isNaN(currentMaxPrice)) currentMaxPrice = 100000;
    });

    applyPriceFilterBtn.addEventListener('click', () => {
        applyFiltersAndSort();
    });


    sortRatingSelect.addEventListener('change', (event) => {
        currentSortOrder = event.target.value;
        applyFiltersAndSort();
    });

    // Initial display of all products
    applyFiltersAndSort();
});