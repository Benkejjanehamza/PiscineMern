import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRouteAdmin = ({ element: Element, ...rest }) => {
    const admin = localStorage.getItem('admin') === 'true';


    return admin ? <Element {...rest} /> : <Navigate to="/shop" />;
};

ProtectedRouteAdmin.propTypes = {
    element: PropTypes.elementType.isRequired,
};

export default ProtectedRouteAdmin;
