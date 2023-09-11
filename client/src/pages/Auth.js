import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = (props) => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyMyToken();
  }, []);

  const verifyMyToken = async () => {
    try {
      // const response = await axios.get('/api/verify');

      const response = await axios.get('/api/verify', {
        withCredentials: true, // Add this line to send cookies with the request
      });


      if (response.status === 200) return setRedirect(true);
      setRedirect(false)
    //   navigate("/login");
    } catch (error) {
      setRedirect(true);
      navigate("/");
    }
  };
  return redirect ? props.children : null;
};
export default Auth;
