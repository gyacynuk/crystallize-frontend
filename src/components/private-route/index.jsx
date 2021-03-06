  
import React from "react";
import { useSelector } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import { isLoading, isUserSignedIn } from "../../store/selectors";
import PageLoadingAnimation from "../page-loading-animation";

const PrivateRoute = ({ component, children, ...props }) => {
    const loading = useSelector(isLoading);
    const userSignedIn = useSelector(isUserSignedIn);

    // Extract the computed matched from the Route, and pass them as props to all children, or single child
    const routeComponent = !!children
        ? React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, props.computedMatch.params || {});
            }
            return child;
        })
        : component(props.computedMatch.params || {});

    return (
        <Route {...props}>
            {
                loading
                    ? <PageLoadingAnimation centerOnScreen={true}/>
                    : userSignedIn
                        ? routeComponent
                        : <Redirect to={"/login"} />
            }
        </Route>
    )
};

PrivateRoute.propTypes = {};

export default PrivateRoute;