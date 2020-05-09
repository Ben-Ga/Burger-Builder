import React, { useEffect, useState } from "react";

import Modal from "../components/UI/Modal";
import Auxiliary from "./Auxiliary";

const WithErrorHandler = (WrappedComponent, axios) => {
  const WithErrorHandler= props => {
    const [error, setError] = useState(null);

    useEffect(() => {
      axios.interceptors.request.use((req) => {
        setError(null); //clear any errors, if a request is successful
        return req;
      });
      axios.interceptors.response.use(res => res, (error) => {
        setError(error);
      });
    });
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
