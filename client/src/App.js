import './App.css';
import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader"
import useFetch from './components/useFetch';
import PriceChart from "./components/CryptoComponents/PriceChart"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import dollarFormatter from './utils/dollarFormatter';
import SentimentChart from './components/CryptoComponents/SentimentChart';
function App() {

  const [tweet, setTweet] = useState("");
  const [uuid, setUuid] = useState("");
  const [cryptoName, setCryptoName] = useState("");

  const columns = [
    { headerName: "Crypto Symbol", field: "symbol", sortable: true, filter: true},
    { headerName: "Crypto Name", field: "name", sortable: true, filter: true},
    { headerName: "Market Capitalization", field: "marketCap", sortable: true, filter: true}
  ]

  let rowData = [];
            
  let {items, isLoading, error} = useFetch('/coin/Topcoins/10')

  if(error) {
    console.log("App.js Error", error)
  }
  if(!isLoading) {
    items.map((item) => {
      return rowData = [...rowData, {"symbol": item.symbol, "name": item.name, "marketCap": dollarFormatter(item.marketCap), "uuid": item.uuid}]
    })
  }

  return (
    <div className="App">
        { isLoading ? <ClipLoader loading={isLoading} size={100} /> : 
        <div className="ag-theme-balham">
            <AgGridReact
                onRowClicked={
                  (e) => {
                    setTweet(e.data.name); 
                    setUuid(e.data.uuid);
                    setCryptoName(e.data.name)
                }}
                columnDefs={columns} 
                rowData={rowData} 
                pagination={true} 
                rowSelection={'single'}/>
        </div> }
        { uuid ? <PriceChart name={cryptoName} symbol={uuid}/> : null }
        { uuid ? <SentimentChart topic={tweet} nums={100}/> : null}
    </div>
  );
}

export default App;

