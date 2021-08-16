import React from 'react';
import '../componentscss/Error.css';
import { useHistory } from 'react-router-dom';

function Error(){
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    };
    return(
        <div className="erro-home">
            <h1>WE ARE SORRY, PAGE NOT FOUND!</h1>
            <span>THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED, HAD ITS NAME CHANGED OR ITS TEMPORARY UNAVAILABLE</span>
            <div>
                <button onClick={goBack}>BACK TO PREVIOUS PAGE</button>
            </div>
        </div>
    );
}

export default Error;