import * as API from ".";
export default {
  login: params => {
    return API.POST("user/login", params);
  },
  getUserInfo: params => {
    return API.GET("user/getUserInfo", params);
  }
};
