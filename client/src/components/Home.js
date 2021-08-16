import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import search from '../images/search.svg';
import exam from '../images/exam.svg';
import { NavLink,useHistory } from 'react-router-dom';
import '../componentscss/Home.css';

function Home(){
  const [loading,setLoading] = useState(false);
  document.title = "examsforcareers.com";
  const history = useHistory();
  const [searchWord, getWord] = useState('');
  const [updates,setUpdates] = useState([]);
  const [admits,setAdmit] = useState([]);
  const [results,setResult] = useState([]);
  const handleSearch = (e) => {
    getWord(e.target.value);
  };
  const request = async (type) => {
    const res = await fetch('/api/exams/updates',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({type:type})
    });
    return {
      status:res.status,
      data:await res.json()
    };
  }
  const getUpdates = async () =>{
    const value = await request('New_Updates');
    if(value.status === 404){
      
    }else if(value.status === 200){
      setUpdates(await value.data);
    }
  };
  const getAdmit = async () =>{
    const value = await request('Admit_Card');
    if(value.status === 404){
      
    }else if(value.status === 200){
      setAdmit(await value.data);
    }
  };
  const getResults = async () =>{
    const value = await request('Result');
    if(value.status === 404){
      
    }else if(value.status === 200){
      setResult(await value.data);
    }
  };
  useEffect(() => {
    if(!loading){
      getUpdates();
      getAdmit();
      getResults();
    }
    return function cleanup(){
      setLoading(true);
      console.log('[log]Cleanup');
    }
  },[]);
  const getResult = async (e) => {
    if(searchWord){
      try{
        const res = await fetch('/api/exams/s',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({abbreviation:searchWord})
        });
        if(res.status === 404){
          history.push("/404");
          return;
        }else if(res.status === 200){
          history.push(`/search/${searchWord.replace(/ /g,'_')}`);
        }
      }catch(err){
        
      }
    }else{
      window.alert('Type The Word');
    }
  }
  const goTo = (type) => {
    history.push(type);
  }
  return(
    <div>
      <div className="extra">
        <div className="extra-info">
          <div>
            <img alt="" src={exam}/>
          </div>
        </div>
        <div className="extra-for">
          <h1>Welcome</h1>
          <div className="searchbar">
            <input type="text" value={searchWord} onChange={handleSearch} onSubmit={getResult} placeholder="Exams Search"/>
            <button className="sicon" onClick={getResult}>
              <img alt="Search" src={search}/>
            </button>
          </div>
        </div>
      </div>
      <div className="Update-container">
        <div className="Update-card">
              <p>New Updates</p>
              <div>
                {
                  updates.map((update) =>{
                    return(
                      <li key={update._id}><NavLink exact to={`/details/${update.name.replace(/ /g,'_')}`}>{update.name}</NavLink></li>
                    );
                  })
                }
              </div>
              <button onClick={() => goTo('/show/New_Updates')}>
                <b className="viewAll">View All</b>
              </button>
        </div>
        <div className="Update-card">
              <p>Admit Card</p>
              <div>
                {
                  admits.map((admit) =>{
                    return(
                      <li key={admit._id}><NavLink exact to={`/details/${admit.name.replace(/ /g,'_')}`}>{admit.name}</NavLink></li>
                    );
                  })
                }
              </div>
              <button onClick={() => goTo('/show/Admit_Card')}>
                <b className="viewAll">View All</b>
              </button>
        </div>
        <div className="Update-card">
              <p>Results</p>
              <div>
                {
                  results.map((result) =>{
                    return(
                      <li key={result._id}><NavLink exact to={`/details/${result.name.replace(/ /g,'_')}`}>{result.name}</NavLink></li>
                    );
                  })
                }
              </div>
              <button onClick={() => goTo('/show/Result')}>
                <b className="viewAll">View All</b>
              </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;