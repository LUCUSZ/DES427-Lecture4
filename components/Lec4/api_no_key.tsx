const API_KEY = 'GWS935OOYB0BFGBA'; // Your API key

export default function fetchStockData(code: string, isWeekly: boolean = false): Promise<any> {
  const functionType = isWeekly ? "TIME_SERIES_WEEKLY" : "TIME_SERIES_DAILY";
  const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${code}&apikey=${API_KEY}`;

  console.log("API URL:", url); // Debugging URL

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      console.log("API Response:", text); // Debugging response
      const json = JSON.parse(text);
      return json;
    })
    .catch(error => {
      console.error("API Fetch Error:", error);
      return null;
    });
}

