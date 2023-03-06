import axios from "axios";
import * as vscode from "vscode";
import outputChannel from "../outputChannel";

const config = vscode.workspace.getConfiguration('collection-completions');
console.log('[apiUrl]:',config.get('apiUrl'));
outputChannel.appendLine('[apiUrl]: ' + config.get('apiUrl'));
const fetch = axios.create({
  baseURL: config.get('apiUrl'),
});

const interceptors = fetch.interceptors.request.use(async (axiosReq) => {
  fetch.interceptors.request.eject(interceptors);
  return axiosReq;
});

fetch.interceptors.response.use(
  (axiosRes) => {
    return axiosRes.data;
  },
  (axiosErr) => {
    return Promise.reject(axiosErr.response);
  }
);

export default fetch;
