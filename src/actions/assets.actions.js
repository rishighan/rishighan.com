import FormData from "form-data";
import { ASSETS_SERVICE_URI } from "../constants/endpoints";
import axios from "axios";

/**
 * Generic API call to assets microservice.
 * @param {Object} options - A hash of options to configure the call.
 * @return {Array} - The response from the call
 */
export const assetsAPICall = async (options) => {
  try {
    const fd = new FormData();
    let uploadResponse = {};
    let deleteResponse = {};
    switch (options.callURIAction) {
      case "upload":
        fd.append("fileData", options.file[0]);
        fd.append("fileName", options.file[0].name);

        uploadResponse = await axios.post(
          ASSETS_SERVICE_URI + options.callURIAction,
          fd,
          {
            headers: {
              "content-type": `multipart/form-data; boundary=${fd._boundary}`,
            },
          }
        );
        return uploadResponse;

      case "delete":
        deleteResponse = await axios({
          method: options.method,
          url: ASSETS_SERVICE_URI + options.callURIAction,
          params: {
            fileName: options.fileName,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: {},
        });
        return deleteResponse;
      default:
        return false;
    }
  } catch (error) {
    console.log(error)
    return error;
  }
};
