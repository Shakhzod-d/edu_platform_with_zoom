import { Instance } from "../instance";
import { endpoints } from "../endpoints";

const config = {
  baseURL: endpoints.user,
};

class AuthApi extends Instance {
  constructor(config) {
    super(config);
  }
  
  // user auth
  signIn = (params) => this.post(endpoints.login, params);
  signUp = (params) => this.post(endpoints.signUp, params);

  // user register otp
  otp = (params) => this.post(`${endpoints.otp}/${params.id}`,params);
  
  resetPassword = (email) => this.post(endpoints.resetPsw, email);
  changePassword = (params) => this.post(endpoints.changePsw, params);

  // facebook auth
  signUpWidthFacebook = () => this.get(endpoints.signUpFacebook)
  signInWidthFacebook = () => this.get(endpoints.signInFacebook)




  // resetVerify = (params) => this.post(endpoints.resetVerify, params);
}

export const authApi = new AuthApi(config);




class AuthGoogle extends Instance {
  constructor(config){
    super(config)
  }

    // google auth
    signUpWidthGoogle = () => this.get(endpoints.signUpGoogle)
    signInWidthGoogle = () => this.get(endpoints.signInGoogle)
}


export const authGoogleApi = new AuthGoogle({baseURL:endpoints.google});
