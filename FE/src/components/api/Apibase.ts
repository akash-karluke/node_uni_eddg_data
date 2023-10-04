import Axios, { AxiosPromise } from "axios";

class ApiBaseClass {
  /**
   * @param {string} url - Url of Get call
   * @param {Object} params - params object of Get call
   */
  get(url: string, params?: object): AxiosPromise {
    return Axios.get(url, { params });
  }

  /**
   * @param {string} url - Url of Post call
   * @param {Object} payload - payload object of Post call
   */
  post(url: string, payload: object): AxiosPromise {
    return Axios.post(url, payload);
  }

  /**
   * @param {string} url - Url of Patch call
   * @param {Object} payload - payload object of Patch call
   */
  patch(url: string, payload: object): AxiosPromise {
    return Axios.patch(url, payload);
  }

  /**
   * @param {string} url - Url of Put call
   * @param {Object} payload - payload object of Put call
   */
  put(url: string, payload: object): AxiosPromise {
    return Axios.put(url, payload);
  }

  /**
   * @param {string} url - Url of Delete call
   * @param {Object} payload - payload object of Delete call
   */
  delete(url: string, payload: object): AxiosPromise {
    return Axios.delete(url, { data: payload });
  }
}

const ApiBase = new ApiBaseClass();
export default ApiBase;
