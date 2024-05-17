import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('token');

    return token ? <Element {...rest} /> : <Navigate to="/connexion" />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
