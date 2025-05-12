# Financial Dashboard

A modern, real-time financial dashboard that displays market data, stock information, and market news using Yahoo Finance API.

![Financial Dashboard](https://via.placeholder.com/800x400?text=Financial+Dashboard)

## Features

- 📊 Real-time market indices (S&P 500, NASDAQ, DOW JONES, RUSSELL 2000)
- 💹 Live stock prices and market data
- 📈 Top tech stocks tracking
- 🔥 Trending stocks section
- 📰 Latest market news
- 🔍 Search functionality
- 🌙 Modern dark theme
- 📱 Fully responsive design

## Tech Stack

- **Frontend:**
  - HTML5
  - CSS3 (with CSS Variables)
  - Vanilla JavaScript
  - Font Awesome Icons

- **Backend:**
  - Python 3.x
  - Flask
  - Yahoo Finance API (yfinance)
  - Pandas

## Project Structure

```
financial-dashboard/
├── src/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── components/
│   ├── assets/
│   └── index.html
├── public/
├── main.py
└── requirements.txt
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/financial-dashboard.git
cd financial-dashboard
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

1. Start the Flask backend server:
```bash
python src/main.py
```

2. Open `src/index.html` in your web browser

The dashboard will automatically fetch and update data every 30 seconds.

## Features in Detail

### Market Overview
- Real-time market indices
- Price changes with color coding
- Percentage changes

### Stock Information
- Current stock prices
- Market capitalization
- P/E ratios
- Dividend yields
- Trading volume
- Price changes

### Search Functionality
- Search stocks by symbol or company name
- Real-time filtering
- Responsive search results

### Responsive Design
- Mobile-friendly layout
- Adaptive grid system
- Collapsible sidebar on mobile
- Touch-friendly interface

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Yahoo Finance API for providing market data
- Font Awesome for the icons
- Flask for the backend framework

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/financial-dashboard](https://github.com/yourusername/financial-dashboard) 