import React, { FC, ReactElement } from "react";


export const ResetPassword: FC = (): ReactElement => {
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
     
    
      
    </form> 
    );
  };
  
  export default ResetPassword;