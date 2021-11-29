import React, { useEffect } from "react";
import { useHistory } from "react-router";
import "./style.css";

export default function PreLoad() {

    const history = useHistory();
    
    useEffect(() => {
        if(localStorage.getItem('token')){
            history.push('/dashboard')
        }
    }, [history])


    return(

        <div>

        <div class="bodu">

            <div class="bouncer">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            </div>


        </div>
            

    );

}