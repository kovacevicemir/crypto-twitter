import './App.css';
import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader"
import useFetch from './components/useFetch';
import PriceChart from "./components/CryptoComponents/PriceChart"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import dollarFormatter from './utils/dollarFormatter';
import TwitterSentiment from './components/CryptoComponents/TwitterSentiment';

// Main place to load componenets
function App() {

  const initialCoin = "Bitcoin";
  const initialUuid = "Qwsogvtv82FCd";

  // Set states
  const [tweet, setTweet] = useState(initialCoin);
  const [uuid, setUuid] = useState(initialUuid); // Uuid refers to a code that referes to a certain cryptocurrency.
  const [cryptoName, setCryptoName] = useState(initialCoin);

  // Prep to create a table of top 10 cryptocurrency.
  const columns = [
    { headerName: "Crypto Symbol", field: "symbol", sortable: true, filter: true},
    { headerName: "Crypto Name", field: "name", sortable: true, filter: true},
    { headerName: "Market Capitalization", field: "marketCap", sortable: true, filter: true}
  ]
  let rowData = [];
  let {items, isLoading, error} = useFetch('/coin/Topcoins/10')

  // Error handling for fetching api
  if(error) {
    console.error(error)
        return (
            <div>
                <h2>Error detected while loading top 10 cryptocurrencies</h2>
                <h2>Please refer to console</h2>
            </div>
        )
  }
  // Top Cryptocurrencies loded without error
  if(!isLoading) {
    items.map((item) => {
      return rowData = [...rowData, 
        {"symbol": item.symbol, "name": item.name, "marketCap": dollarFormatter(item.marketCap), "uuid": item.uuid}
      ]
    })
  }

  const handleRowClick = (e) => {
    setTweet(e.data.name); 
    setUuid(e.data.uuid);
    setCryptoName(e.data.name)
  }

  return (
    <div className="App">
        { isLoading ? 
        <ClipLoader loading={isLoading} size={100} /> :
            <div className="ag-theme-balham">
              <AgGridReact
                  onRowClicked={handleRowClick}
                  columnDefs={columns} 
                  rowData={rowData} 
                  pagination={true} 
                  rowSelection={'single'}
              />
              <PriceChart name={cryptoName} symbol={uuid}/>
              <TwitterSentiment topic={tweet} tweetNums={100}/>
          </div>
        } 
        
    </div>
  );
}

export default App;

