import React, { useEffect, useState} from 'react';
import '../componentscss/Open.css';
import iLogo from '../images/logo_main.png';
import Footer from './Footer';

function Open({match}){
  const [loading,setLoading] = useState(false);
  document.title = `${match.params.exam.replace(/_/g,' ')}`;
  const [details,setDetails] = useState([{name:match.params.exam.replace(/_/g,' ')}]);
  const getDetail = async (value) =>{
      const res = await fetch("/api/exams/get",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({abbreviation:value})
      });
      return await res.json();
  };
  useEffect(() => {
      if(!loading){
          getDetail(match.params.exam.replace(/_/g,' ')).then((detail) => {
            setDetails(detail);
          });
      }
      return function cleanup(){
        setLoading(true);
        console.log('[log]Cleanup');
      }
    },[]);
  return(
    <>
      <div className="DetailBox-Container">
          <div className="Detail-Container">
            <section className="aboutBox">
              <h1>{details[0].name}</h1>
              <div className="iLogoBox">
              <img alt="Exam Logo" src={iLogo}/>
              </div>
            </section>
            <section className="introBox">
              <h1>Intro</h1>
              <p>
                {details[0].intro}
              </p>
              <h1>Abbreviation</h1>
              <p>{details[0].abbreviation}</p>
              <h1>Type</h1>
              <p>{details[0].type}</p>
              <h1>Duration</h1>
              <p>{details[0].duration}</p>
              <h1>Times</h1>
              <p>{details[0].times}</p>
              <h1>Prerequisites / Eligibility Criteria</h1>
              <p>{details[0].eligibility}</p>
              <h1>Question Language</h1>
              <p>{details[0].language}</p>
              <h1>Website</h1>
              <p><a href={details[0].link}>{details[0].link}</a></p>
              <h1>Wikipedia</h1>
              <p><a href={details[0].wikipedia}>{details[0].wikipedia}</a></p>
            </section>
            <section className="tableBox">
              <h1>Table</h1>
              <div>
                <h1>Bachelor of Engineering / Bachelor of Technology </h1>
                <section className="table">
                  <p>Subjects</p>
                  <p>Physics</p>
                  <p>Chemistry</p>
                  <p>Mathematics</p>
                  <p>Marks</p>
                  <p>100</p>
                  <p>100</p>
                  <p>100</p>
                  <p>No of Questions</p>
                  <p>25</p>
                  <p>25</p>
                  <p>25</p>
                  <p>Type</p>
                  <p>Computer Based</p>
                  <p>Computer Based</p>
                  <p>Computer Based</p>
                </section>
              </div>
              <div>
                <h1>Bachelor of Architecture</h1>
                <section className="table">
                  <p>Subjects</p>
                  <p>Mathematics</p>
                  <p>Aptitude Test</p>
                  <p>Drawing Test</p>
                  <p>Marks</p>
                  <p>100</p>
                  <p>100</p>
                  <p>100</p>
                  <p>No of Questions</p>
                  <p>25</p>
                  <p>25</p>
                  <p>25</p>
                  <p>Type</p>
                  <p>Computer Based</p>
                  <p>Computer Based</p>
                  <p>Offline on a drawing sheet</p>
                </section>
              </div>
              <div>
                <h1>Bachelor of Planning </h1>
                <section className="table">
                  <p>Subjects</p>
                  <p>Mathematics</p>
                  <p>Aptitude Test</p>
                  <p>Planning Based On Questions</p>
                  <p>Marks</p>
                  <p>100</p>
                  <p>100</p>
                  <p>100</p>
                  <p>No of Questions</p>
                  <p>25</p>
                  <p>25</p>
                  <p>25</p>
                  <p>Type</p>
                  <p>Computer Based</p>
                  <p>Computer Based</p>
                  <p>Computer Based</p>
                </section>
              </div>
            </section>
            <section className="dateBox">
              <h1>Important Dates</h1>
              <section className="table">
                <p>Registration Starting Date</p>
                <p>{details[0].regSdate}</p>
                <p>Registration Ending Date</p>
                <p>{details[0].regEdate}</p>
                <p>Last Date Of Fee Payment</p>
                <p>{details[0].lfeedate}</p>
                <p>Admit Card</p>
                <p>{details[0].admit}</p>
                <p>Exam Date</p>
                <p>{details[0].examdate}</p>
              </section>
            </section>
            <section className="feeBox">
              <h1>Application Fee</h1>
              <section className="table">
                <p>General, OBC</p>
                <p>{details[0].genobcfee}</p>
                <p>SC,ST</p>
                <p>{details[0].scstfee}</p>
                <p>PH</p>
                <p>{details[0].phfee}</p>
              </section>
            </section>
          </div>
      </div>
      <Footer/>
    </>
  );
}

export default Open;