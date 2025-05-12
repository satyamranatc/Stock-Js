// Stock Market Viewer Application
document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const API_BASE_URL = 'http://127.0.0.1:5100/api';

    // DOM Elements
    const elements = {
        companySelect: document.getElementById('companySelect'),
        fetchButton: document.getElementById('fetchButton'),
        dataDisplay: document.getElementById('dataDisplay'),
        loader: document.getElementById('loader')
    };

    // Utility Functions
    const utils = {
        // Format number with abbreviations
        formatNumber(number) {
            if (number === null || number === undefined) return 'N/A';
            
            const absNum = Math.abs(number);
            if (absNum >= 1e12) return (number / 1e12).toFixed(2) + 'T';
            if (absNum >= 1e9) return (number / 1e9).toFixed(2) + 'B';
            if (absNum >= 1e6) return (number / 1e6).toFixed(2) + 'M';
            if (absNum >= 1e3) return (number / 1e3).toFixed(2) + 'K';
            
            return number.toFixed(2);
        },

        // Format currency values
        formatCurrency(value) {
            if (value === null || value === undefined) return 'N/A';
            
            const absValue = Math.abs(value);
            if (absValue >= 1e12) return '$' + (value / 1e12).toFixed(2) + 'T';
            if (absValue >= 1e9) return '$' + (value / 1e9).toFixed(2) + 'B';
            if (absValue >= 1e6) return '$' + (value / 1e6).toFixed(2) + 'M';
            if (absValue >= 1e3) return '$' + (value / 1e3).toFixed(2) + 'K';
            
            return '$' + value.toFixed(2);
        }
    };

    // UI Management
    const ui = {
        // Show loading state
        showLoader() {
            elements.loader.style.display = 'block';
            elements.fetchButton.disabled = true;
        },

        // Hide loading state
        hideLoader() {
            elements.loader.style.display = 'none';
            elements.fetchButton.disabled = false;
        },

        // Display error message
        showError(message) {
            elements.dataDisplay.innerHTML = `
                <div class="error-message">
                    <span style="color: var(--error-color);">Error: ${message}</span>
                </div>
            `;
        },

        // Show notification
        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Auto remove notification
            setTimeout(() => {
                notification.classList.add('hide');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        }
    };

    // Data Processing
    const dataProcessor = {
        // Process and render company data
        renderCompanyData(data) {
            // Defensive check for data
            if (data.error) {
                ui.showError(data.error);
                return;
            }

            // Prepare HTML for company data
            let html = this.createCompanyHeader(data);
            html += this.createFinancialMetrics(data);

            // Render the content
            elements.dataDisplay.innerHTML = html;
            
            // Fade-in effect
            elements.dataDisplay.style.opacity = 0;
            setTimeout(() => {
                elements.dataDisplay.style.transition = 'opacity 0.5s ease';
                elements.dataDisplay.style.opacity = 1;
            }, 100);
        },

        // Create company header section
        createCompanyHeader(data) {
            return `
            <div class="company-header">
                <div class="company-info">
                    <div class="company-name">${data["Company Name"] || 'N/A'}</div>
                    <div class="company-details">
                        <span>${data["Symbol"] || 'N/A'}</span>
                        <span>${data["Sector"] || 'N/A'}</span>
                        <span>${data["Industry"] || 'N/A'}</span>
                    </div>
                </div>
                <div class="price-info">
                    <div class="current-price">${utils.formatCurrency(data["Current Price"])}</div>
                </div>
            </div>`;
        },

        // Create financial metrics section
        createFinancialMetrics(data) {
            const metricsToShow = [
                "Market Cap", 
                "PE Ratio (TTM)", 
                "EPS (TTM)"
            ];

            let metricsHtml = `
            <div class="data-card">
                <div class="data-category">
                    <span class="data-category-icon">💹</span>
                    <span class="data-category-title">Financial Metrics</span>
                </div>
                <div class="data-grid">`;

            metricsToShow.forEach(key => {
                if (data[key] !== undefined && data[key] !== null) {
                    let displayValue = data[key];
                    
                    // Format numeric values
                    if (typeof displayValue === 'number') {
                        if (key.includes("Price") || key.includes("Cash") || 
                            key.includes("Debt") || key.includes("Cap")) {
                            displayValue = utils.formatCurrency(displayValue);
                        } else if (key.includes("Margins") || key.includes("Yield")) {
                            displayValue = (displayValue * 100).toFixed(2) + '%';
                        } else {
                            displayValue = utils.formatNumber(displayValue);
                        }
                    }
                    
                    metricsHtml += `
                    <div class="data-item">
                        <span class="data-label">${key}</span>
                        <span class="data-value">${displayValue}</span>
                    </div>`;
                }
            });

            metricsHtml += `</div></div>`;
            return metricsHtml;
        }
    };

    // Data Fetching
    const dataFetcher = {
        // Fetch list of companies
        async fetchCompanies() {
            try {
                ui.showLoader();
                const response = await fetch(`${API_BASE_URL}/companies`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch companies');
                }
                
                const companies = await response.json();
                this.populateCompanySelect(companies);
            } catch (error) {
                console.error('Fetch Companies Error:', error);
                ui.showError(`Network Error: ${error.message}`);
            } finally {
                ui.hideLoader();
            }
        },

        // Populate company dropdown
        populateCompanySelect(companies) {
            elements.companySelect.innerHTML = '<option value="">Select a company...</option>';
            
            for (let symbol in companies) {
                const option = document.createElement('option');
                option.value = symbol;
                option.textContent = `${companies[symbol]} (${symbol})`;
                elements.companySelect.appendChild(option);
            }
            
            elements.companySelect.classList.add('loaded');
        },

        // Fetch data for selected company
        async fetchCompanyData() {
            const symbol = elements.companySelect.value;
            
            if (!symbol) {
                ui.showNotification('Please select a company first', 'error');
                return;
            }
            
            try {
                ui.showLoader();
                elements.dataDisplay.textContent = '';
                
                const response = await fetch(`${API_BASE_URL}/company-data?symbol=${symbol}`);
               
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch company data');
                }
                
                const data = await response.json();
                dataProcessor.renderCompanyData(data);
                
            } catch (error) {
                console.error('Fetch Data Error:', error);
                ui.showError(`Error: ${error.message}`);
            } finally {
                ui.hideLoader();
            }
        }
    };

    // Initialize Event Listeners
    function initEventListeners() {
        elements.fetchButton.addEventListener('click', () => {
            dataFetcher.fetchCompanyData();
        });
    }

    // Application Initialization
    function init() {
        dataFetcher.fetchCompanies();
        initEventListeners();
    }

    // Start the application
    init();
});