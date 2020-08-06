import React, { useEffect, useState } from "react";

import Modal from "../components/UI/Modal";
import Auxiliary from "./Auxiliary";

const WithErrorHandler = (WrappedComponent, axios) => {
  const WithErrorHandler= props => {
    const [error, setError] = useState(null);

    const requestInterceptor = axios.interceptors.request.use((req) => {
      setError(null); //clear any errors, if a request is successful
      return req;
    });
    const responseInterceptor = axios.interceptors.response.use(res => res, (error) => {
      setError(error);
    });

    
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      }
    },
    [requestInterceptor, responseInterceptor]
    );
    
    return (
      <Auxiliary>
        <Modal show={error} modalClose={() => setError(null)}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Auxiliary>
    );
  };
  return WithErrorHandler
};

export default WithErrorHandler;
