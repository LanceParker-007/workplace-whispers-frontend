import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setUser } from "../redux/slice/authSlice";

const ProtectedRoutes = ({ children }) => {
  const { accessToken, user } = useSelector((state) => state.authSliceReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      const localStorageToken = localStorage.getItem("accessToken");
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!localStorageToken) {
        navigate("/");
      } else {
        dispatch(setAccessToken(localStorageToken));
        dispatch(setUser(userData));
      }
    }
  }, [dispatch, navigate, accessToken]);

  return <>{children}</>;
};

export default ProtectedRoutes;
