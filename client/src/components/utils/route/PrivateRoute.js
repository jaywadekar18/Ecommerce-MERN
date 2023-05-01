import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const PrivateRoute = (props) => {
    let history = useHistory();
    const [auth, setAuth] = useState(false);


    useEffect(() => {
        if (localStorage.accessToken) {
            setAuth(true)

        } else {

            history.push("/login")
        }
    }, [localStorage.accessToken]);

    return (
        <>
            {auth &&
                <Route
                    {...props}
                    component={props.component} />}
        </>
    );
}

export default withRouter((PrivateRoute));