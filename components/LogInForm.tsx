import React, { FC, ReactElement } from "react";
import { Outlet, Route, Routes} from "react-router-dom";
import ResetPassword from './ResetPassword';

export const LogInForm: FC = (): ReactElement => {
  return (

    <form>
    <label>
      Usuario:
      <input type="text" name="user" />
    </label>
    <br/>
    <label>
      Contraseña:
      <input type="password" name="password" />
    </label>
    <br/>
    <input type="submit" value="Ingresar" />
    <br/>
    <a href="">¿Olvidó su contraseña?</a>
    
    {/* <Routes>
        <Route path="/resetPassword" element={<ResetPassword />} />
  </Routes> */}
    
    
  </form> 
  );
};

export default LogInForm;