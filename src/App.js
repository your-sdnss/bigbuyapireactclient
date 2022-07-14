import './App.css';
import React, {useEffect, useState} from 'react';

import axios from "axios";


function App() {

    let pth;
  const [resp, setResp] = useState([]);
  const [date, setDates] = useState([]);


  const [basePath, setBasePath] = useState('');

  const [checkingPath, setCheckingPath] = useState('');

  //
  //   const getBase=()=>{
  //   fetch(`./${basePath}.json`
  //       ,{
  //         headers : {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //         }
  //       }
  //   )
  //       .then(function(response){
  //         console.log(response)
  //         return response.json();
  //       })
  //       .then(function(myJson) {
  //         console.log(myJson);
  //         setBaseArray(myJson)
  //       });
  // }

  // const getCheck=()=>{
  //   fetch(`./${checkingPath}.json`
  //       ,{
  //         headers : {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //         }
  //       }
  //   )
  //       .then(function(response){
  //         console.log(response)
  //         return response.json();
  //       })
  //       .then(function(myJson) {
  //         console.log(myJson);
  //         setCheckingArray(myJson)
  //       });
  // }


    useEffect(() => {
        getItem();
    }, [])




    const searchItem = async (path) => {
        await axios.post('http://localhost:5000/new-items', {
            name: path
        })
    }

    const getItem = async () => {
        try {
                const { data } = await axios.get('http://localhost:5000/get-items');
                data.sort((a, b) => (a.diff > b.diff ? -1 : 1)) //НЕ МЕШАЙТЕ ПОЖИЛОМУ БУЛЬБОЗАВРУ ОН И ТАК ЕЛЕ РАБОТАЕТ БЕЗ ЗАРПЛАТЫ
                setResp(data);
                await getItem();
        } catch (e) {
            setTimeout(() => {
                getItem();
            }, 1000)
        }
    }
    //
    // const getDates = async () => {
    //     try {
    //             const dates = await axios.get('http://localhost:5000/get-dates');
    //             console.log(dates);
    //             setDates(dates);
    //             await getDates();
    //     } catch (e) {
    //         setTimeout(() => {
    //             getDates();
    //         }, 100000)
    //     }
    // }

    const getDatesOnce = async () => {
        const { data } = await axios.get('http://localhost:5000/get-dates');
        setDates(data);
    }

    function compareData(e){
        pth = basePath+"and"+checkingPath;
        e.preventDefault();
        searchItem(pth);
  }

  return (
    <div className={"container"}>
      <form>
          <div className={"data"}>
        <input id={"baseData"} onChange={event => setBasePath(event.target.value)} className={"date"} type={"datetime-local"}/>
        <input id={"checkData"} onChange={event => setCheckingPath(event.target.value)} className={"date"} type={"datetime-local"}/>
          </div>
      </form>
        <button className={"button"} onClick={compareData}> COMPARE </button>
        <button className={"button"} onClick={getDatesOnce}> GET DATES </button>
        <button className={"button"} onClick={() => window.location.reload()}> RELOAD </button>

        <div className={"containerChanges"}>
        <div className="changes">
            {resp.map(function (data){
                return (
                    <ul>
                        <li>SKU = {data.sku}</li>
                        <li>Продано = {data.diff}</li>
                        <li>Количество = {data.quantity}</li>
                    </ul>
                )
                    })
            }
        </div>
        <div className="dates">
            <ul>
                ВСЕ ДАННЫЕ
                {
                date.map(function (par) {
                    return <li>{par}</li>
                })
            }
            </ul>
        </div>
        </div>
    </div>
  );
}

export default App;
