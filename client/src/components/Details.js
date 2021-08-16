import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import '../componentscss/Details.css';

function Details({match}){
    const [loading,setLoading] = useState(false);
    const param = `${match.params.exam.replace(/_/g,' ')}`;
    document.title = param;
    const [details,setDetails] = useState([{name:param}]);
    const getDetail = async (name,type) =>{
        const res = await fetch("/api/exams/type",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({name:name,type:type})
        });
        return await res.json();
    };
    useEffect(() => {
        if(!loading){
            getDetail(param,'New_Updates').then((detail) => {
                if(!detail.message){
                    setDetails(detail);
                }
            });
        }
        return function cleanup(){
          setLoading(true);
          console.log('[log]Cleanup');
        }
    },[]);
    return(
        <>
            <div className="UpdateBox-Container">
                {
                    details.map((detail) => {
                        const key = detail._id?detail._id:Math.random().toString()+'ABC';
                        return(
                                <div className="UpdateBox" key={key}>
                                    <section className="aboutBox">
                                        <h1>{param}</h1>
                                    </section>
                                    <section className="introBox">
                                        <h1>Intro</h1>
                                        <p>
                                            {detail.intro}
                                        </p>
                                    </section>
                                    <div className="struct" key={key}>
                                        <section className="dateBox">
                                            <h1>Important Dates</h1>
                                            <p>
                                                {detail.date}
                                            </p>
                                        </section>
                                        <section className="feeBox">
                                            <h1>Application Fee</h1>
                                            <p>
                                                {detail.fee}
                                            </p>
                                        </section>
                                        <section className="eligibilityBox">
                                            <h1>Eligibility</h1>
                                            <p>
                                                {detail.req}
                                            </p>
                                        </section>
                                    </div>
                                </div>
                        );
                    })
                }
            </div>
            <Footer/>
        </>
    );
}

export default Details;