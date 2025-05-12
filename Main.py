import yfinance as yf
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# List of 20 famous companies
companies = {
    "AAPL": "Apple Inc.",
    "MSFT": "Microsoft Corp.",
    "GOOGL": "Alphabet Inc.",
    "AMZN": "Amazon.com Inc.",
    "TSLA": "Tesla Inc.",
    "META": "Meta Platforms Inc.",
    "NFLX": "Netflix Inc.",
    "NVDA": "NVIDIA Corp.",
    "BRK-B": "Berkshire Hathaway Inc.",
    "JNJ": "Johnson & Johnson",
    "JPM": "JPMorgan Chase & Co.",
    "V": "Visa Inc.",
    "PG": "Procter & Gamble Co.",
    "DIS": "Walt Disney Co.",
    "PFE": "Pfizer Inc.",
    "KO": "Coca-Cola Co.",
    "PEP": "PepsiCo Inc.",
    "TCS.NS": "Tata Consultancy Services (India)",
    "INFY.NS": "Infosys Ltd (India)",
    "RELIANCE.NS": "Reliance Industries (India)"
}

# API to get list of companies
@app.route('/api/companies', methods=['GET'])
def get_companies():
    return jsonify(companies)

# API to get data for selected company
@app.route('/api/company-data', methods=['GET'])
def get_company_data():
    symbol = request.args.get('symbol')
    print(symbol)
    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400

    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info

        if not info or "longName" not in info:
            return jsonify({"error": f"No data found for the symbol: {symbol}"}), 404

        data = {
            "Company Name": info.get('longName', 'N/A'),
            "Sector": info.get('sector', 'N/A'),
            "Industry": info.get('industry', 'N/A'),
            "Market Cap": info.get('marketCap', 'N/A'),
            "PE Ratio (TTM)": info.get('trailingPE', 'N/A'),
            "EPS (TTM)": info.get('trailingEps', 'N/A'),
            "Current Price": info.get('currentPrice', 'N/A')
        }

        return jsonify(data)

    except Exception as e:
        print(f"Error fetching data for {symbol}: {str(e)}")
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5100)