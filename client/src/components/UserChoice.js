import React, { useEffect, useState } from 'react';
import '../componentscss/Userhome.css';
import user from '../images/user.svg';
import man from '../images/girl.svg';
import mile from '../images/mile.svg';
import Prize from '../images/Prize.svg';
import {useHistory} from 'react-router-dom';

function UserChoice({match}){
    const [loading,setLoading] = useState(false);
    const history = useHistory();
    const callAdminPage = async () => {
        try{
            const res = await fetch('/api/users/user',{
                    method:"GET",
                    headers:{
                        Accept:"application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
            });
            if(res.status === 401){
                history.push('/signin');
                console.log('Unauthorized');
                return;
            }
            const data = await res.json();
            console.log(data);
            await submit(match.params.exams.trim().toUpperCase().replace(/_/g,' '));
        }catch(err){
            console.log(err);
            history.push('/signin');
        }
    };
    const submit = async (data) => {
        var json = await fetch('/api/exams/user', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({data:data})
        })
        console.log(await json.json());
    }
    useEffect(() => {
        if(!loading){
          callAdminPage();
        }
        return function cleanup(){
          setLoading(true);
          console.log('[log]Cleanup');
        }
      },[]);
    return(
        <div>
            <div className="Userhome">
                <div>
                    <img className="Userhome-bg" alt="" src={user}/>
                    <img className="Userhome-man" alt="" src={man}/>
                    <img className="Userhome-Prize" alt="" src={Prize}/>
                    <div className="Userhome-mile mile-one">
                        <img className="" alt="" src={mile}/>
                        <label className="">{match.params.exams.trim().toUpperCase().replace(/_/g,' ')}</label>
                    </div>
                    <div className="Userhome-mile mile-two">
                        <img className="" alt="" src={mile}/>
                        <label className="">12th Science(Math)</label>
                    </div>
                    <div className="Userhome-mile mile-three">
                        <img className="" alt="" src={mile}/>
                        <label className="">10th</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserChoice;