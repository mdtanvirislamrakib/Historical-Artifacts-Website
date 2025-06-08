import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router';
import Loader from '../Components/Loader';

const PrivetRoute = ({children}) => {

    const {user, loading} = use(AuthContext)


    if(loading) {
        return <Loader></Loader>
    }

    if(user && user.email) {
        return children;
    }
    return <Navigate to={"/login"}></Navigate>


    
};

export default PrivetRoute;