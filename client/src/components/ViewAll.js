import React,{ useState, useEffect }from 'react';
import { NavLink } from 'react-router-dom';
import PageNumber from './PageNumber';
import Footer from './Footer';
import '../componentscss/ListBox.css';

function ViewAll({match}){
    const [loading,setLoading] = useState(false);
    document.title = `${match.params.type.replace(/_/g,' ')}`;
    const [updates,setUpdates] = useState([]);
    const request = async (type) => {
        const res = await fetch('/api/exams/updates',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({type:type})
        });
        if(res.status === 200){
            setUpdates(await res.json());
        }
    }
    useEffect(() => {
        if(!loading){
          request(`${match.params.type}`);
        }
        return function cleanup(){
          setLoading(true);
          console.log('[log]Cleanup');
        }
      },[]);
    return(
        <>
            <div className="ListBox-Container">
                <div className="ListBox">
                    {
                        updates.map((update) =>{
                            return(
                                <li key={update._id}><NavLink exact to={`/details/${update.name.replace(/ /g,'_')}`}>{update.name}</NavLink></li>
                            );
                        })
                    }
                </div>
            </div>
            <PageNumber/>
            <Footer/>
        </>
    );
}

export default ViewAll;