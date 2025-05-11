# Help4Every1
Group 2. Help4Every1 WebApp.
<!DOCTYPE html>
<html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Help4Every1 - Worker Interface</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        body {
            background-color: #f2f2f2;
            color: #333;
            margin: 0 auto;
            position: relative;
        }

        .app-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        /* Status bar - only visible on mobile */
        .status-bar {
            background-color: #000;
            color: white;
            padding: 5px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
        }

        .header {
            display: flex;
            align-items: center;
            padding: 15px;
            background-color: white;
            border-bottom: 1px solid #e0e0e0;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .logo {
            font-weight: bold;
            font-size: 1.2rem;
            margin-right: 15px;
            color: #0066cc;
            display: none;
        }

        .back-button {
            font-size: 20px;
            margin-right: 10px;
            color: #333;
            cursor: pointer;
        }

        .search-bar {
            flex: 1;
            position: relative;
            max-width: 600px;
        }

        .search-bar input {
            width: 100%;
            padding: 10px 15px 10px 40px;
            border-radius: 20px;
            border: none;
            background-color: #f0f0f0;
            font-size: 16px;
        }

        .search-bar .search-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #888;
            font-size: 18px;
        }

        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .location-bar {
            background-color: white;
            padding: 15px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e0e0e0;
            cursor: pointer;
        }

        .flag {
            margin-right: 10px;
            font-size: 20px;
        }

        .location-text {
            color: #0066cc;
            font-weight: 500;
        }

        .section-title {
            font-size: 24px;
            font-weight: bold;
            margin: 20px 15px 15px;
        }

        .filter-container {
            background-color: white;
            padding: 15px;
            margin-bottom: 15px;
            display: none; /* Hidden by default */
        }

        .filter-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 15px;
        }

        .filter-label {
            font-weight: bold;
            margin-bottom: 5px;
            width: 100%;
        }

        .filter-option {
            background-color: #f0f0f0;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .filter-option:hover {
            background-color: #e0e0e0;
        }

        .filter-option.active {
            background-color: #0066cc;
            color: white;
        }

        .salary-filter {
            width: 100%;
        }

        .range-container {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .range-slider {
            flex: 1;
        }

        .range-value {
            min-width: 70px;
            text-align: right;
        }

        .filter-controls {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 10px;
        }

        .filter-button {
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            border: none;
        }

        .apply-filter {
            background-color: #0066cc;
            color: white;
        }

        .reset-filter {
            background-color: #f0f0f0;
        }

        .categories-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            background-color: white;
            cursor: pointer;
        }

        .categories-title {
            font-size: 18px;
            font-weight: bold;
        }

        .categories-arrow {
            font-size: 20px;
            color: #888;
        }

        .category-scroll {
            display: flex;
            overflow-x: auto;
            padding: 10px 15px 20px;
            gap: 15px;
            background-color: white;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .category-scroll::-webkit-scrollbar {
            display: none;
        }

        .category {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 80px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s;
            padding: 5px;
            border-radius: 8px;
        }

        .category:hover {
            background-color: #f0f0f0;
            transform: translateY(-2px);
        }

        .category.active {
            background-color: #e6f0ff;
            color: #0066cc;
        }

        .category-icon {
            font-size: 24px;
            margin-bottom: 5px;
        }

        .tasks-container {
            display: flex;
            flex-direction: column;
            gap: 1px;
        }

        .task-card {
            background-color: white;
            padding: 15px;
            margin-bottom: 1px;
            border-bottom: 1px solid #e0e0e0;
            cursor: pointer;
            transition: all 0.2s;
        }

        .task-card:hover {
            background-color: #f9f9f9;
        }

        .task-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        .task-title {
            font-size: 18px;
            font-weight: bold;
        }

        .task-price {
            font-size: 18px;
            font-weight: bold;
            background-color: white;
            padding: 5px 10px;
            border-radius: 15px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .task-location {
            margin-bottom: 5px;
            font-weight: 500;
        }

        .task-time {
            margin-bottom: 10px;
        }

        .task-description {
            color: #666;
            margin-bottom: 15px;
        }

        .worker-info {
            display: flex;
            align-items: center;
        }

        .worker-avatar {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background-color: #ff6347;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 10px;
        }

        .worker-name {
            font-weight: bold;
        }

        .worker-status {
            color: #888;
            font-size: 14px;
        }

        .bottom-nav {
            background-color: white;
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
            border-top: 1px solid #e0e0e0;
            width: 100%;
            position: sticky;
            bottom: 0;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #888;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
            padding: 5px 10px;
            border-radius: 5px;
        }

        .nav-item:hover {
            background-color: #f0f0f0;
        }

        .nav-item.active {
            color: #0066cc;
        }

        .nav-icon {
            font-size: 24px;
            margin-bottom: 3px;
        }

        /* Modal styling */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
        }

        .modal-title {
            font-size: 20px;
            font-weight: bold;
        }

        .close-modal {
            font-size: 24px;
            cursor: pointer;
        }

        .map-container {
            height: 300px;
            background-color: #e9e9e9;
            margin-bottom: 15px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #666;
        }

        .filter-toggle {
            display: inline-flex;
            align-items: center;
            padding: 5px 10px;
            background-color: #f0f0f0;
            border-radius: 20px;
            margin-left: auto;
            cursor: pointer;
            transition: all 0.2s;
        }

        .filter-toggle:hover {
            background-color: #e0e0e0;
        }

        .filter-icon {
            margin-right: 5px;
        }

        /* Loading and no results states */
        .loading, .no-tasks {
            padding: 30px;
            text-align: center;
            color: #888;
            font-size: 16px;
            display: none;
        }

        .loading span {
            display: inline-block;
            animation: spin 1s infinite linear;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* Responsive design */
        @media (min-width: 768px) {
            .status-bar {
                display: none;
            }

            .logo {
                display: block;
            }

            .main-content {
                flex-direction: row;
            }

            .sidebar {
                width: 280px;
                padding: 15px;
                background-color: white;
                border-right: 1px solid #e0e0e0;
                height: calc(100vh - 60px);
                position: sticky;
                top: 60px;
                overflow-y: auto;
            }

            .filter-container {
                display: block;
                margin-bottom: 15px;
                box-shadow: none;
                border-radius: 0;
                padding: 0;
                background-color: transparent;
            }

            .tasks-section {
                flex: 1;
            }

            .category-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 10px;
            }

            .category-scroll {
                display: none;
            }

            .categories-container {
                margin-bottom: 20px;
            }

            .tasks-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 15px;
                padding: 15px;
            }

            .task-card {
                margin-bottom: 0;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            .task-details {
                flex: 1;
            }

            .bottom-nav {
                position: static;
                justify-content: flex-start;
                padding: 15px;
                border-top: none;
                border-bottom: 1px solid #e0e0e0;
            }

            .nav-item {
                flex-direction: row;
                font-size: 14px;
                margin-right: 15px;
            }

            .nav-icon {
                margin-bottom: 0;
                margin-right: 5px;
            }

            .header {
                padding: 10px 20px;
            }
        }

        @media (min-width: 1024px) {
            .sidebar {
                width: 320px;
            }

            .header {
                padding: 15px 30px;
            }
        }
    </style>
</head>
<body>
    <div class="app-container">
        <!-- Status Bar (mobile only) -->
        <div class="status-bar">
            <div class="time">18:25</div>
            <div class="icons">
                <span>•</span>
                <span>📶</span>
                <span>🔋</span>
            </div>
        </div>

        <!-- Header with Search -->
        <div class="header">
            <div class="back-button">←</div>
            <div class="logo">Help4Every1</div>
            <div class="search-bar">
                <span class="search-icon">🔍</span>
                <input type="text" placeholder="Search for tasks...">
            </div>
            <div class="filter-toggle">
                <span class="filter-icon">🔍</span>
                <span>Filter</span>
            </div>
        </div>

        <div class="main-content">
            <!-- Sidebar (appears on tablets/desktops) -->
            <div class="sidebar">
                <div class="filter-container">
                    <div class="filter-label">Location</div>
                    <div class="location-selector" id="desktop-location">
                        <div class="flag">🇪🇸</div>
                        <div class="location-text">Madrid, Spain • 40km</div>
                    </div>
                    
                    <div class="filter-label" style="margin-top: 15px;">Distance</div>
                    <div class="filter-row">
                        <div class="filter-option" data-distance="5">5km</div>
                        <div class="filter-option" data-distance="10">10km</div>
                        <div class="filter-option" data-distance="20">20km</div>
                        <div class="filter-option active" data-distance="40">40km</div>
                    </div>
                    
                    <div class="filter-label" style="margin-top: 15px;">Categories</div>
                    <div class="category-grid">
                        <div class="filter-option active" data-category="all">All</div>
                        <div class="filter-option" data-category="cleaning">Cleaning</div>
                        <div class="filter-option" data-category="home">Home Services</div>
                        <div class="filter-option" data-category="groceries">Groceries</div>
                        <div class="filter-option" data-category="errands">Errands</div>
                        <div class="filter-option" data-category="food">Food & Catering</div>
                        <div class="filter-option" data-category="beauty">Beauty & Health</div>
                        <div class="filter-option" data-category="others">Others</div>
                    </div>
                    
                    <div class="filter-label" style="margin-top: 15px;">Salary Range</div>
                    <div class="salary-filter">
                        <div class="range-container">
                            <input type="range" min="5" max="100" value="5" class="range-slider" id="salary-slider">
                            <div class="range-value">€5+</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Task Section -->
            <div class="tasks-section">
                <!-- Location Bar (mobile only) -->
                <div class="location-bar" id="location-selector">
                    <div class="flag">🇪🇸</div>
                    <div class="location-text">Madrid, Spain • 40km</div>
                </div>

                <!-- Mobile Filters -->
                <div class="filter-container" id="mobile-filters">
                    <div class="filter-label">Distance</div>
                    <div class="filter-row">
                        <div class="filter-option" data-distance="5">5km</div>
                        <div class="filter-option" data-distance="10">10km</div>
                        <div class="filter-option" data-distance="20">20km</div>
                        <div class="filter-option active" data-distance="40">40km</div>
                    </div>
                    
                    <div class="filter-label" style="margin-top: 15px;">Salary Range</div>
                    <div class="salary-filter">
                        <div class="range-container">
                            <input type="range" min="5" max="100" value="5" class="range-slider" id="mobile-salary-slider">
                            <div class="range-value">€5+</div>
                        </div>
                    </div>
                    
                    <div class="filter-controls">
                        <button class="filter-button reset-filter">Reset</button>
                        <button class="filter-button apply-filter">Apply</button>
                    </div>
                </div>

                <!-- Tasks Section -->
                <div class="section-title">Tasks nearby</div>

                <!-- Categories Section (mobile only) -->
                <div class="categories-header">
                    <div class="categories-title">Categories</div>
                    <div class="categories-arrow">›</div>
                </div>
                <div class="category-scroll">
                    <div class="category active" data-category="all">
                        <div class="category-icon">🔍</div>
                        <div>All</div>
                    </div>
                    <div class="category" data-category="cleaning">
                        <div class="category-icon">🧹</div>
                        <div>Cleaning</div>
                    </div>
                    <div class="category" data-category="home">
                        <div class="category-icon">🔧</div>
                        <div>Home Services</div>
                    </div>
                    <div class="category" data-category="groceries">
                        <div class="category-icon">🛒</div>
                        <div>Groceries</div>
                    </div>
                    <div class="category" data-category="errands">
                        <div class="category-icon">🏃</div>
                        <div>Errands</div>
                    </div>
                    <div class="category" data-category="food">
                        <div class="category-icon">🍔</div>
                        <div>Food & Catering</div>
                    </div>
                    <div class="category" data-category="beauty">
                        <div class="category-icon">💇</div>
                        <div>Beauty & Health</div>
                    </div>
                    <div class="category" data-category="others">
                        <div class="category-icon">📦</div>
                        <div>Others</div>
                    </div>
                </div>

                <!-- Loading State -->
                <div class="loading"><span>⏳</span> Loading tasks...</div>
                
                <!-- No Results State -->
                <div class="no-tasks">No tasks match your current filters. Try adjusting your search criteria.</div>

                <!-- Task Cards -->
                <div class="tasks-container">
                    <!-- Task 1 -->
                    <div class="task-card" data-category="others" data-price="10" data-location="Arroyomolinos" data-distance="25">
                        <div class="task-header">
                            <div class="task-title">Paseadores de Perros</div>
                            <div class="task-price">• €10</div>
                        </div>
                        <div class="task-details">
                            <div class="task-location">Arroyomolinos</div>
                            <div class="task-time">When: I am flexible</div>
                            <div class="task-description">Pasear perros</div>
                        </div>
                        <div class="worker-info">
                            <div class="worker-avatar">AE</div>
                            <div>
                                <div class="worker-name">Abderrahman El mousssaoui</div>
                                <div class="worker-status">Active 4 hours ago</div>
                            </div>
                        </div>
                    </div>

                    <!-- Task 2 -->
                    <div class="task-card" data-category="home" data-price="40" data-location="Madrid" data-distance="15">
                        <div class="task-header">
                            <div class="task-title">niñera</div>
                            <div class="task-price">• €40</div>
                        </div>
                        <div class="task-details">
                            <div class="task-location">Madrid</div>
                            <div class="task-time">When: I am flexible</div>
                            <div class="task-description">Acompañar a un niño de 11 años de 22 a 6 para que no esté solo. Niño que no da ningún tipo de problema, es solo hacerle compañía</div>
                        </div>
                        <div class="worker-info">
                            <div class="worker-avatar" style="background-image: url('/api/placeholder/36/36'); background-size: cover;"></div>
                            <div>
                                <div class="worker-name">Jorge D. Migliorisi Giordano</div>
                                <div class="worker-status">Active 2 hours ago</div>
                            </div>
                        </div>
                    </div>

                    <!-- Task 3 -->
                    <div class="task-card" data-category="cleaning" data-price="25" data-location="Madrid" data-distance="10">
                        <div class="task-header">
                            <div class="task-title">Limpieza de hogar</div>
                            <div class="task-price">• €25</div>
                        </div>
                        <div class="task-details">
                            <div class="task-location">Madrid</div>
                            <div class="task-time">When: Tomorrow, 10:00-14:00</div>
                            <div class="task-description">Limpieza general de un apartamento de 2 habitaciones. Se necesitan 4 horas aproximadamente.</div>
                        </div>
                        <div class="worker-info">
                            <div class="worker-avatar">LS</div>
                            <div>
                                <div class="worker-name">Laura Sánchez</div>
                                <div class="worker-status">Active 1 hour ago</div>
                            </div>
                        </div>
                    </div>

                    <!-- Task 4 -->
                    <div class="task-card" data-category="groceries" data-price="15" data-location="Getafe" data-distance="30">
                        <div class="task-header">
                            <div class="task-title">Compra semanal</div>
                            <div class="task-price">• €15</div>
                        </div>
                        <div class="task-details">
                            <div class="task-location">Getafe</div>
                            <div class="task-time">When: Today, 16:00-18:00</div>
                            <div class="task-description">Necesito que alguien haga la compra semanal y la entregue en mi domicilio. Lista de 20 productos aproximadamente.</div>
                        </div>
                        <div class="worker-info">
                            <div class="worker-avatar">MR</div>
                            <div>
                                <div class="worker-name">Miguel Rodríguez</div>
                                <div class="worker-status">Active 30 minutes ago</div>
                            </div>
                        </div>
                    </div>

                    <!-- Task 5 -->
                    <div class="task-card" data-category="food" data-price="45" data-location="Madrid" data-distance="5">
                        <div class="task-header">
                            <div class="task-title">Preparación de cena</div>
                            <div class="task-price">• €45</div>
                        </div>
                        <div class="task-details">
                            <div class="task-location">Madrid</div>
                            <div class="task-time">When: Friday, 18:00-21:00</div>
                            <div class="task-description">Busco a alguien que prepare una cena para 4 personas en mi casa. Menú a acordar con el chef.</div>
                        </div>
                        <div class="worker-info">
                            <div class="worker-avatar">CP</div>
                            <div>
                                <div class="worker-name">Carmen Pérez</div>
                                <div class="worker-status">Active 3 hours ago</div>
                            </div>
                        </div>
                    </div>

                    <!-- Task 6 -->
                    <div class="task-card" data-category="beauty" data-price="30" data-location="Alcorcón" data-distance="35">
                        <div class="task-header">
                            <div class="task-title">Manicura a domicilio</div>
                            <div class="task-price">• €30</div>
                        </div>
                        <div class="task-details">
                            <div class="task-location">Alcorcón</div>
                            <div class="task-time">When: Saturday, 11:00</div>
                            <div class="task-description">Busco profesional para manicura semipermanente a domicilio. Material incluido.</div>
                        </div>
                        <div class="worker-info">
                            <div class="worker-avatar">AM</div>
                            <div>
                                <div class="worker-name">Ana Martínez</div>
                                <div class="worker-status">Active 1 day ago</div>
                            </div>
                        </div>
                    </div>

                    <!-- Task 7 -->
                    <div class="task-card" data-category="errands" data-price="20" data-location="Madrid" data-distance="8">
                        <div class="task-header">
                            <div class="task-title">Recogida de paquete</div>
                            <div class="task-price">• €20</div>
                        </div>
                        <div class="task-details">
                            <div class="task-location">Madrid</div>
                            <div class="task-time">When: Today, 15:00-19:00</div>
                            <div class="task-description">Necesito que alguien recoja un paquete en oficina de correos y lo entregue en mi domicilio.</div>
                        </div>
                        <div class="worker-info">
                            <div class="worker-avatar">JL</div>
                            <div>
                                <div class="worker-name">Juan López</div>
                                <div class="worker-status">Active 5 hours ago</div>
                            </div>
                        </div>
                    </div>

                    <!-- Task 8 -->
                    <div class="task-card" data-category="home" data-price="50" data-location="Leganés" data-distance="25">
                        <div class="task-header">
                            <div class="task-title">Montaje de muebles</div>
                            <div class="task-price">• €50</div>
                        </div>
                        <div class="task-details">
                            <div class="task-location">Leganés</div>
                            <div class="task-time">When: Next Tuesday, 10:00-13:00</div>
                            <div class="task-description">Necesito ayuda para montar 3 muebles de IKEA (una cama, una estantería y un escritorio).</div>
                        </div>
                        <div class="worker-info">
                            <div class="worker-avatar">PG</div>
                            <div>
                                <div class="worker-name">Pablo García</div>
                                <div class="worker-status">Active yesterday</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Navigation -->
        <div class="bottom-nav">
            <div class="nav-item active" data-page="tasks">
                <div class="nav-icon">📋</div>
                <div>Tasks</div>
            </div>
            <div class="nav-item" data-page="map">
                <div class="nav-icon">🗺️</div>
                <div>Map</div>
            </div>
            <div class="nav-item" data-page="chat">

    <script src="workerInterface.js"></script>


  
