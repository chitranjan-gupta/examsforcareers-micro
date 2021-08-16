import React, { useState, useEffect } from 'react';
import PageNumber from './PageNumber';
import { NavLink } from 'react-router-dom';
import Footer from './Footer';

function State_Exams(){
  const [loading,setLoading] = useState(false);
  document.title = "State Exams";
  const [states, setState] = useState([]);
  const getState = async () => {
    const res = await fetch("/api/exams/state");
    setState(await res.json());  
  }
  useEffect(() => {
    if(!loading){
      getState();
    }
    return function cleanup(){
      setLoading(true);
      console.log('[log]Cleanup');
    }
  },[]);
  return(
    <div>
      <div className="card-container">
        {
          states.map((state) => {
            return(
              <div className="card" key={state._id}>
                <h1>
                  <NavLink exact to={`/state_exams/${state.name.replace(/ /g,'_')}`}>{state.name}</NavLink>
                </h1>
              </div>
            )
          })
        }
      </div>
      <PageNumber/>
      <Footer/>
    </div>
  );
}

export default State_Exams;