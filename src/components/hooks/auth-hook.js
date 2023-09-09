import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authAction = async (payload, type) => {
    try {
      let res;

      if (type === "signup") {
        res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIP_fgeCark4e6aD2yyK8qrrcfhxdJmDo`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (type === "login") {
        res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIP_fgeCark4e6aD2yyK8qrrcfhxdJmDo`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (type === "forgotPassword") {
        res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCIP_fgeCark4e6aD2yyK8qrrcfhxdJmDo`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      const data = await res.json();
      if (res.ok) {
        if (type === "signup") {
          navigate("/login");
        }

        if (type === "login") {
          dispatch(
            authActions.login({ token: data.idToken, email: data.email })
          );
          navigate("/home");
        }

        if(type === 'forgotPassword') {
          navigate('/');
        }
      } else {
        let errorMessage = "Something went wrong! Try again.";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return [authAction];
};

export default useAuth;
