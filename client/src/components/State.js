import React, { useState, useEffect } from 'react';
import PageNumber from './PageNumber';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';

function State({match}){
  const [loading,setLoading] = useState(false);
  document.title = `${match.params.state.replace(/_/g,' ')}`;
  const [exams, setExams] = useState([]);
  const getExams = async () => {
    const res = await fetch("/api/exams/category",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({categoryMain:match.params.state.replace(/_/g,' ')})
    });
    setExams(await res.json());
  }
  useEffect(() => {
    if(!loading){
      getExams();
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
          exams.map((exam) => {
            return(
              <div className="card" key={exam._id}>
                <h1>
                  <NavLink exact to={`/state_exams/${match.params.state}/${exam.abbreviation.replace(/ /g,'_')}`}>{exam.abbreviation}</NavLink>
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

export default State;