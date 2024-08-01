import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../redux/slice/authSlice";

const ProtectedRoutes = ({ children }) => {
  const { accessToken } = useSelector((state) => state.authSliceReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      const localStorageToken = localStorage.getItem("accessToken");
      if (!localStorageToken) {
        navigate("/");
      } else {
        dispatch(setAccessToken(localStorageToken));
      }
    }
  }, [dispatch, navigate, accessToken]);

  return <>{children}</>;
};

export default ProtectedRoutes;
