import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import PageNumber from './PageNumber';
import { NavLink } from 'react-router-dom';

function Central_Exams(){
  const [loading,setLoading] = useState(false);
  document.title = "Central Exams";
  const [exams, setExams] = useState([]);
  const getExams = async () => {
    const res = await fetch("/api/exams/category",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({categoryMain:"Central"})
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
        <div id="mainContent">
            <div className="card-container">
              {
                exams.map((exam) => {
                  return(
                    <div className="card" key={exam._id}>
                      <h1>
                        <NavLink exact to={`/central_exams/${exam.abbreviation.replace(/ /g,'_')}`}>{exam.abbreviation}</NavLink>
                      </h1>
                    </div>
                  )
                })
              }
            </div>
            <PageNumber/>
        </div>
        <Footer/>
    </div>
  );
}

export default Central_Exams;