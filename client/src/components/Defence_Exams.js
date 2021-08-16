import React, { useState, useEffect } from 'react';
import PageNumber from './PageNumber';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';

function Defence_Exams(){
  const [loading,setLoading] = useState(false);
  document.title = "Defence Exams";
  const [exams, setExams] = useState([]);
  const getExams = async () => {
    const res = await fetch("/api/exams/category",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({categoryBase:"Defence Exams"})
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
                  <NavLink exact to={`/defence_exams/${exam.abbreviation.replace(/ /g,'_')}`}>{exam.abbreviation}</NavLink>
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

export default Defence_Exams;