import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import UseAdmin from '../UseHook/UseAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRout = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation()

    if(loading || isAdminLoading){
        return <p>loading...</p>
    }
    if(user&& isAdmin){
        return children
    }
    return (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default AdminRout;