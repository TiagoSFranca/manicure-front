import appActions from "@/actions/appActions"

const getCancelToken = (requestKey) => {
  let controller = new AbortController();

  appActions.addCancelToken(controller, requestKey);

  return controller;
}

const cancelPendingTokens = () => appActions.cancelPendingRequests();

const cancelToken = (requestKey) => appActions.cancelToken(requestKey);

export default {
  getCancelToken,
  cancelPendingTokens,
  cancelToken
};