import axios from 'axios'
import appActions from "@/actions/appActions"

const getCancelToken = () => {
  let controller = new AbortController();

  appActions.addCancelToken(controller);

  return controller;
}

const cancelTokens = () => appActions.cancelPendingRequests();

export default {
  getCancelToken,
  cancelTokens
};