import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import { handleResponse, isOkStatus } from '../utils/handleRestApiResponse';
import usePrevious from '../utils/usePrevious';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const serviceRequestSubCategoryPOSTStatusAndText = (
  Constants,
  { action },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const serviceRequestSubCategoryPOST = (
  Constants,
  { action },
  handlers = {}
) =>
  serviceRequestSubCategoryPOSTStatusAndText(
    Constants,
    { action },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useServiceRequestSubCategoryPOST = ({ action }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchServiceRequestSubCategoryPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  action,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchServiceRequestSubCategory: refetch,
  });
};

export const aNNOUNCEMENTSPOSTStatusAndText = (
  Constants,
  _args,
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'ANNOUNCEMENTS',
        method: 'POST',
        req: { action: 'ANNOUNCEMENTS' },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const aNNOUNCEMENTSPOST = (Constants, _args, handlers = {}) =>
  aNNOUNCEMENTSPOSTStatusAndText(Constants, {}, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useANNOUNCEMENTSPOST = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'ANNOUNCEMENTS',
        method: 'POST',
        req: { action: 'ANNOUNCEMENTS' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchANNOUNCEMENTSPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'ANNOUNCEMENTS',
        method: 'POST',
        req: { action: 'ANNOUNCEMENTS' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchANNOUNCEMENTS: refetch });
};

export const aftersentOTPforgorpasswordPOSTStatusAndText = (
  Constants,
  { accno, newPassword, otp, transid },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'forgotPassword',
        method: 'POST',
        req: {
          accno: accno,
          otp: otp,
          type: 'EMAIL',
          action: 'forgotPassword',
          transid: transid,
          newPassword: newPassword,
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const aftersentOTPforgorpasswordPOST = (
  Constants,
  { accno, newPassword, otp, transid },
  handlers = {}
) =>
  aftersentOTPforgorpasswordPOSTStatusAndText(
    Constants,
    { accno, newPassword, otp, transid },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useAftersentOTPforgorpasswordPOST = ({
  accno,
  newPassword,
  otp,
  transid,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'forgotPassword',
        method: 'POST',
        req: {
          accno: accno,
          otp: otp,
          type: 'EMAIL',
          action: 'forgotPassword',
          transid: transid,
          newPassword: newPassword,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchAftersentOTPforgorpasswordPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accno,
  newPassword,
  otp,
  transid,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'forgotPassword',
        method: 'POST',
        req: {
          accno: accno,
          otp: otp,
          type: 'EMAIL',
          action: 'forgotPassword',
          transid: transid,
          newPassword: newPassword,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchAftersentOTPforgorpassword: refetch,
  });
};

export const bANNERSPOSTStatusAndText = (Constants, _args, handlers = {}) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'BANNERS',
        method: 'POST',
        req: { action: 'BANNERS' },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const bANNERSPOST = (Constants, _args, handlers = {}) =>
  bANNERSPOSTStatusAndText(Constants, {}, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useBANNERSPOST = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'BANNERS',
        method: 'POST',
        req: { action: 'BANNERS' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchBANNERSPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'BANNERS',
        method: 'POST',
        req: { action: 'BANNERS' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchBANNERS: refetch });
};

export const billingHistoryPrepaidPOSTStatusAndText = (
  Constants,
  { action },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: action,
        method: 'GET',
        auth: 'TOKEN',
        baseUrlName: '',
        environmentName: 'SPM_ADANI',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const billingHistoryPrepaidPOST = (
  Constants,
  { action },
  handlers = {}
) =>
  billingHistoryPrepaidPOSTStatusAndText(Constants, { action }, handlers).then(
    res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json)
  );

export const useBillingHistoryPrepaidPOST = ({ action }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: action,
        method: 'GET',
        auth: 'TOKEN',
        baseUrlName: '',
        environmentName: 'SPM_ADANI',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchBillingHistoryPrepaidPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  action,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: action,
        method: 'GET',
        auth: 'TOKEN',
        baseUrlName: '',
        environmentName: 'SPM_ADANI',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchBillingHistoryPrepaid: refetch,
  });
};

export const billingHistoryPOSTStatusAndText = (
  Constants,
  { action },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const billingHistoryPOST = (Constants, { action }, handlers = {}) =>
  billingHistoryPOSTStatusAndText(Constants, { action }, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useBillingHistoryPOST = ({ action }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchBillingHistoryPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  action,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchBillingHistory: refetch });
};

export const complaintCategoryPOSTStatusAndText = (
  Constants,
  _args,
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTypeFocc/',
        method: 'GET',
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const complaintCategoryPOST = (Constants, _args, handlers = {}) =>
  complaintCategoryPOSTStatusAndText(Constants, {}, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useComplaintCategoryPOST = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTypeFocc/',
        method: 'GET',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchComplaintCategoryPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTypeFocc/',
        method: 'GET',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchComplaintCategory: refetch });
};

export const complaintSubCategoryPOSTStatusAndText = (
  Constants,
  { action },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const complaintSubCategoryPOST = (
  Constants,
  { action },
  handlers = {}
) =>
  complaintSubCategoryPOSTStatusAndText(Constants, { action }, handlers).then(
    res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json)
  );

export const useComplaintSubCategoryPOST = ({ action }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchComplaintSubCategoryPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  action,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchComplaintSubCategory: refetch,
  });
};

export const complaintSavePOSTStatusAndText = (
  Constants,
  { consumerNo, requestDetails1, requestnatureId1 },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTsave',
        method: 'POST',
        req: {
          requestnatureId1: requestnatureId1,
          consumerNo: consumerNo,
          requestDetails1: requestDetails1,
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const complaintSavePOST = (
  Constants,
  { consumerNo, requestDetails1, requestnatureId1 },
  handlers = {}
) =>
  complaintSavePOSTStatusAndText(
    Constants,
    { consumerNo, requestDetails1, requestnatureId1 },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useComplaintSavePOST = ({
  consumerNo,
  requestDetails1,
  requestnatureId1,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTsave',
        method: 'POST',
        req: {
          requestnatureId1: requestnatureId1,
          consumerNo: consumerNo,
          requestDetails1: requestDetails1,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchComplaintSavePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  consumerNo,
  requestDetails1,
  requestnatureId1,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTsave',
        method: 'POST',
        req: {
          requestnatureId1: requestnatureId1,
          consumerNo: consumerNo,
          requestDetails1: requestDetails1,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchComplaintSave: refetch });
};

export const deleteAccountPOSTStatusAndText = (
  Constants,
  { accountNumber, consumerNumber },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'DeleteAccount',
        method: 'POST',
        req: {
          accountNumber: accountNumber,
          consumerNumber: consumerNumber,
          action: 'DeleteAccount',
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const deleteAccountPOST = (
  Constants,
  { accountNumber, consumerNumber },
  handlers = {}
) =>
  deleteAccountPOSTStatusAndText(
    Constants,
    { accountNumber, consumerNumber },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useDeleteAccountPOST = ({ accountNumber, consumerNumber }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'DeleteAccount',
        method: 'POST',
        req: {
          accountNumber: accountNumber,
          consumerNumber: consumerNumber,
          action: 'DeleteAccount',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchDeleteAccountPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accountNumber,
  consumerNumber,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'DeleteAccount',
        method: 'POST',
        req: {
          accountNumber: accountNumber,
          consumerNumber: consumerNumber,
          action: 'DeleteAccount',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchDeleteAccount: refetch });
};

export const downloadPOSTStatusAndText = (Constants, _args, handlers = {}) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UPLOAD_FORMS',
        method: 'POST',
        req: { action: 'UPLOAD_FORMS' },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const downloadPOST = (Constants, _args, handlers = {}) =>
  downloadPOSTStatusAndText(Constants, {}, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useDownloadPOST = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UPLOAD_FORMS',
        method: 'POST',
        req: { action: 'UPLOAD_FORMS' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchDownloadPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UPLOAD_FORMS',
        method: 'POST',
        req: { action: 'UPLOAD_FORMS' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchDownload: refetch });
};

export const faqsPOSTStatusAndText = (Constants, _args, handlers = {}) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'FAQ',
        method: 'POST',
        req: { action: 'FAQ' },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const faqsPOST = (Constants, _args, handlers = {}) =>
  faqsPOSTStatusAndText(Constants, {}, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useFaqsPOST = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'FAQ',
        method: 'POST',
        req: { action: 'FAQ' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchFaqsPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'FAQ',
        method: 'POST',
        req: { action: 'FAQ' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchFaqs: refetch });
};

export const feedbackPOSTStatusAndText = (
  Constants,
  { email, name, response, suggestion },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'saveFeedback',
        method: 'POST',
        req: {
          name: name,
          email: email,
          suggestion: suggestion,
          response: response,
          action: 'saveFeedback',
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const feedbackPOST = (
  Constants,
  { email, name, response, suggestion },
  handlers = {}
) =>
  feedbackPOSTStatusAndText(
    Constants,
    { email, name, response, suggestion },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useFeedbackPOST = ({ email, name, response, suggestion }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'saveFeedback',
        method: 'POST',
        req: {
          name: name,
          email: email,
          suggestion: suggestion,
          response: response,
          action: 'saveFeedback',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchFeedbackPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
  name,
  response,
  suggestion,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'saveFeedback',
        method: 'POST',
        req: {
          name: name,
          email: email,
          suggestion: suggestion,
          response: response,
          action: 'saveFeedback',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchFeedback: refetch });
};

export const forgotpasswordPOSTStatusAndText = (
  Constants,
  { accno },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'forgotPassword',
        method: 'POST',
        req: { accno: accno, otp: '', type: 'EMAIL', action: 'forgotPassword' },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const forgotpasswordPOST = (Constants, { accno }, handlers = {}) =>
  forgotpasswordPOSTStatusAndText(Constants, { accno }, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useForgotpasswordPOST = ({ accno }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'forgotPassword',
        method: 'POST',
        req: { accno: accno, otp: '', type: 'EMAIL', action: 'forgotPassword' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchForgotpasswordPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accno,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'forgotPassword',
        method: 'POST',
        req: { accno: accno, otp: '', type: 'EMAIL', action: 'forgotPassword' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchForgotpassword: refetch });
};

export const guestRaiseTicketSendOTPPOSTStatusAndText = (
  Constants,
  { accno },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'sendEmailOTP',
        method: 'POST',
        req: { action: 'sendEmailOTP', accno: accno },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const guestRaiseTicketSendOTPPOST = (
  Constants,
  { accno },
  handlers = {}
) =>
  guestRaiseTicketSendOTPPOSTStatusAndText(Constants, { accno }, handlers).then(
    res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json)
  );

export const useGuestRaiseTicketSendOTPPOST = ({ accno }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'sendEmailOTP',
        method: 'POST',
        req: { action: 'sendEmailOTP', accno: accno },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchGuestRaiseTicketSendOTPPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accno,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'sendEmailOTP',
        method: 'POST',
        req: { action: 'sendEmailOTP', accno: accno },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchGuestRaiseTicketSendOTP: refetch,
  });
};

export const guestRaiseTicketAfterSendOTPPOSTStatusAndText = (
  Constants,
  { otp, transid },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'validateOTP',
        method: 'POST',
        req: { action: 'validateOTP', transid: transid, otp: otp },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const guestRaiseTicketAfterSendOTPPOST = (
  Constants,
  { otp, transid },
  handlers = {}
) =>
  guestRaiseTicketAfterSendOTPPOSTStatusAndText(
    Constants,
    { otp, transid },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useGuestRaiseTicketAfterSendOTPPOST = ({ otp, transid }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'validateOTP',
        method: 'POST',
        req: { action: 'validateOTP', transid: transid, otp: otp },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchGuestRaiseTicketAfterSendOTPPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  otp,
  transid,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'validateOTP',
        method: 'POST',
        req: { action: 'validateOTP', transid: transid, otp: otp },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchGuestRaiseTicketAfterSendOTP: refetch,
  });
};

export const languagePOSTStatusAndText = (
  Constants,
  { action },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'LANGUAGE',
        method: 'POST',
        req: { action: action },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const languagePOST = (Constants, { action }, handlers = {}) =>
  languagePOSTStatusAndText(Constants, { action }, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useLanguagePOST = ({ action }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'LANGUAGE',
        method: 'POST',
        req: { action: action },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchLanguagePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  action,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'LANGUAGE',
        method: 'POST',
        req: { action: action },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchLanguage: refetch });
};

export const loadPatternPOSTStatusAndText = (
  Constants,
  { mtrno },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'loadPattern',
        method: 'POST',
        req: {
          action: 'loadPattern',
          mtrno: mtrno,
          accountno: '258582414',
          consType: 'PRE',
          contactedLoad: '5.00',
          loadUnit: 'kW',
          days: '7',
          metering_mode: 'NORMAL',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const loadPatternPOST = (Constants, { mtrno }, handlers = {}) =>
  loadPatternPOSTStatusAndText(Constants, { mtrno }, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useLoadPatternPOST = ({ mtrno }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'loadPattern',
        method: 'POST',
        req: {
          action: 'loadPattern',
          mtrno: mtrno,
          accountno: '258582414',
          consType: 'PRE',
          contactedLoad: '5.00',
          loadUnit: 'kW',
          days: '7',
          metering_mode: 'NORMAL',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchLoadPatternPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  mtrno,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'loadPattern',
        method: 'POST',
        req: {
          action: 'loadPattern',
          mtrno: mtrno,
          accountno: '258582414',
          consType: 'PRE',
          contactedLoad: '5.00',
          loadUnit: 'kW',
          days: '7',
          metering_mode: 'NORMAL',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchLoadPattern: refetch });
};

export const loginPOSTStatusAndText = (
  Constants,
  { accountno, pwd },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'Login',
        method: 'POST',
        req: { action: 'Login', accountno: accountno, pwd: pwd },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const loginPOST = (Constants, { accountno, pwd }, handlers = {}) =>
  loginPOSTStatusAndText(Constants, { accountno, pwd }, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useLoginPOST = ({ accountno, pwd }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'Login',
        method: 'POST',
        req: { action: 'Login', accountno: accountno, pwd: pwd },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchLoginPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accountno,
  pwd,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'Login',
        method: 'POST',
        req: { action: 'Login', accountno: accountno, pwd: pwd },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchLogin: refetch });
};

export const loginWithOTPPOSTStatusAndText = (
  Constants,
  { accno },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'LoginWithOTP',
        method: 'POST',
        req: { accno: accno, action: 'LoginWithOTP', otp: '' },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const loginWithOTPPOST = (Constants, { accno }, handlers = {}) =>
  loginWithOTPPOSTStatusAndText(Constants, { accno }, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useLoginWithOTPPOST = ({ accno }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'LoginWithOTP',
        method: 'POST',
        req: { accno: accno, action: 'LoginWithOTP', otp: '' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchLoginWithOTPPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accno,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'LoginWithOTP',
        method: 'POST',
        req: { accno: accno, action: 'LoginWithOTP', otp: '' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchLoginWithOTP: refetch });
};

export const manageAccountsPOSTStatusAndText = (
  Constants,
  { accountNumber },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'getAddedAccountList',
        method: 'POST',
        req: { accountNumber: accountNumber, action: 'getAddedAccountList' },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const manageAccountsPOST = (
  Constants,
  { accountNumber },
  handlers = {}
) =>
  manageAccountsPOSTStatusAndText(Constants, { accountNumber }, handlers).then(
    res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json)
  );

export const useManageAccountsPOST = ({ accountNumber }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'getAddedAccountList',
        method: 'POST',
        req: { accountNumber: accountNumber, action: 'getAddedAccountList' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchManageAccountsPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accountNumber,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'getAddedAccountList',
        method: 'POST',
        req: { accountNumber: accountNumber, action: 'getAddedAccountList' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchManageAccounts: refetch });
};

export const notificationsPOSTStatusAndText = (
  Constants,
  _args,
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'NOTIFICATIONS',
        method: 'POST',
        req: { action: 'NOTIFICATIONS' },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const notificationsPOST = (Constants, _args, handlers = {}) =>
  notificationsPOSTStatusAndText(Constants, {}, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useNotificationsPOST = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'NOTIFICATIONS',
        method: 'POST',
        req: { action: 'NOTIFICATIONS' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchNotificationsPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'NOTIFICATIONS',
        method: 'POST',
        req: { action: 'NOTIFICATIONS' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchNotifications: refetch });
};

export const oTPEmailUpdatePOSTStatusAndText = (
  Constants,
  { accno, newEmail, oldEmail, otp, txid, userId },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateEmail',
        method: 'POST',
        req: {
          oldEmail: oldEmail,
          newEmail: newEmail,
          otp: otp,
          accno: accno,
          userId: userId,
          type: 'UPDATEEMAIL',
          action: 'UpdateEmail',
          txid: txid,
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const oTPEmailUpdatePOST = (
  Constants,
  { accno, newEmail, oldEmail, otp, txid, userId },
  handlers = {}
) =>
  oTPEmailUpdatePOSTStatusAndText(
    Constants,
    { accno, newEmail, oldEmail, otp, txid, userId },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useOTPEmailUpdatePOST = ({
  accno,
  newEmail,
  oldEmail,
  otp,
  txid,
  userId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateEmail',
        method: 'POST',
        req: {
          oldEmail: oldEmail,
          newEmail: newEmail,
          otp: otp,
          accno: accno,
          userId: userId,
          type: 'UPDATEEMAIL',
          action: 'UpdateEmail',
          txid: txid,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchOTPEmailUpdatePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accno,
  newEmail,
  oldEmail,
  otp,
  txid,
  userId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateEmail',
        method: 'POST',
        req: {
          oldEmail: oldEmail,
          newEmail: newEmail,
          otp: otp,
          accno: accno,
          userId: userId,
          type: 'UPDATEEMAIL',
          action: 'UpdateEmail',
          txid: txid,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchOTPEmailUpdate: refetch });
};

export const oTPMobileUpdatePOSTStatusAndText = (
  Constants,
  { accno, newMobile, oldMobile, otp, txid, userId },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateMobile',
        method: 'POST',
        req: {
          action: 'UpdateMobile',
          newMobile: newMobile,
          oldMobile: oldMobile,
          otp: otp,
          accno: accno,
          userId: userId,
          type: 'UPDATEMOBILE',
          txid: txid,
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const oTPMobileUpdatePOST = (
  Constants,
  { accno, newMobile, oldMobile, otp, txid, userId },
  handlers = {}
) =>
  oTPMobileUpdatePOSTStatusAndText(
    Constants,
    { accno, newMobile, oldMobile, otp, txid, userId },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useOTPMobileUpdatePOST = ({
  accno,
  newMobile,
  oldMobile,
  otp,
  txid,
  userId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateMobile',
        method: 'POST',
        req: {
          action: 'UpdateMobile',
          newMobile: newMobile,
          oldMobile: oldMobile,
          otp: otp,
          accno: accno,
          userId: userId,
          type: 'UPDATEMOBILE',
          txid: txid,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchOTPMobileUpdatePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accno,
  newMobile,
  oldMobile,
  otp,
  txid,
  userId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateMobile',
        method: 'POST',
        req: {
          action: 'UpdateMobile',
          newMobile: newMobile,
          oldMobile: oldMobile,
          otp: otp,
          accno: accno,
          userId: userId,
          type: 'UPDATEMOBILE',
          txid: txid,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchOTPMobileUpdate: refetch });
};

export const payemntServicePOSTStatusAndText = (
  Constants,
  {
    accno,
    amount,
    billid,
    consid,
    email,
    from,
    gateway,
    mobile,
    name,
    officeName,
    officeid,
    scno,
    ucode,
  },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'callPgRequest',
        method: 'POST',
        req: {
          action: 'callPgRequest',
          email: email,
          accno: accno,
          mobile: mobile,
          amount: amount,
          scno: scno,
          consid: consid,
          name: name,
          billid: billid,
          ucode: ucode,
          officeid: officeid,
          officeName: officeName,
          from: from,
          paymentType: 'POST',
          gateway: gateway,
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const payemntServicePOST = (
  Constants,
  {
    accno,
    amount,
    billid,
    consid,
    email,
    from,
    gateway,
    mobile,
    name,
    officeName,
    officeid,
    scno,
    ucode,
  },
  handlers = {}
) =>
  payemntServicePOSTStatusAndText(
    Constants,
    {
      accno,
      amount,
      billid,
      consid,
      email,
      from,
      gateway,
      mobile,
      name,
      officeName,
      officeid,
      scno,
      ucode,
    },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const usePayemntServicePOST = ({
  accno,
  amount,
  billid,
  consid,
  email,
  from,
  gateway,
  mobile,
  name,
  officeName,
  officeid,
  scno,
  ucode,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'callPgRequest',
        method: 'POST',
        req: {
          action: 'callPgRequest',
          email: email,
          accno: accno,
          mobile: mobile,
          amount: amount,
          scno: scno,
          consid: consid,
          name: name,
          billid: billid,
          ucode: ucode,
          officeid: officeid,
          officeName: officeName,
          from: from,
          paymentType: 'POST',
          gateway: gateway,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchPayemntServicePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accno,
  amount,
  billid,
  consid,
  email,
  from,
  gateway,
  mobile,
  name,
  officeName,
  officeid,
  scno,
  ucode,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'callPgRequest',
        method: 'POST',
        req: {
          action: 'callPgRequest',
          email: email,
          accno: accno,
          mobile: mobile,
          amount: amount,
          scno: scno,
          consid: consid,
          name: name,
          billid: billid,
          ucode: ucode,
          officeid: officeid,
          officeName: officeName,
          from: from,
          paymentType: 'POST',
          gateway: gateway,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchPayemntService: refetch });
};

export const powerQualityCurrentPOSTStatusAndText = (
  Constants,
  { mtrno },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'PQCURRENT',
        method: 'POST',
        req: {
          action: 'PQCURRENT',
          mtrno: mtrno,
          accountno: '258951461',
          days: '30',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const powerQualityCurrentPOST = (Constants, { mtrno }, handlers = {}) =>
  powerQualityCurrentPOSTStatusAndText(Constants, { mtrno }, handlers).then(
    res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json)
  );

export const usePowerQualityCurrentPOST = ({ mtrno }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'PQCURRENT',
        method: 'POST',
        req: {
          action: 'PQCURRENT',
          mtrno: mtrno,
          accountno: '258951461',
          days: '30',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchPowerQualityCurrentPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  mtrno,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'PQCURRENT',
        method: 'POST',
        req: {
          action: 'PQCURRENT',
          mtrno: mtrno,
          accountno: '258951461',
          days: '30',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchPowerQualityCurrent: refetch,
  });
};

export const powerQualityPowerFactorPOSTStatusAndText = (
  Constants,
  { mtrno },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'AVGPF',
        method: 'POST',
        req: {
          action: 'AVGPF',
          mtrno: mtrno,
          accountno: '258951461',
          days: '30',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const powerQualityPowerFactorPOST = (
  Constants,
  { mtrno },
  handlers = {}
) =>
  powerQualityPowerFactorPOSTStatusAndText(Constants, { mtrno }, handlers).then(
    res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json)
  );

export const usePowerQualityPowerFactorPOST = ({ mtrno }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'AVGPF',
        method: 'POST',
        req: {
          action: 'AVGPF',
          mtrno: mtrno,
          accountno: '258951461',
          days: '30',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchPowerQualityPowerFactorPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  mtrno,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'AVGPF',
        method: 'POST',
        req: {
          action: 'AVGPF',
          mtrno: mtrno,
          accountno: '258951461',
          days: '30',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchPowerQualityPowerFactor: refetch,
  });
};

export const powerQualityVoltagePOSTStatusAndText = (
  Constants,
  { mtrno },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'PQVoltage',
        method: 'POST',
        req: {
          action: 'PQVoltage',
          mtrno: mtrno,
          accountno: '258951461',
          days: '30',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const powerQualityVoltagePOST = (Constants, { mtrno }, handlers = {}) =>
  powerQualityVoltagePOSTStatusAndText(Constants, { mtrno }, handlers).then(
    res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json)
  );

export const usePowerQualityVoltagePOST = ({ mtrno }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'PQVoltage',
        method: 'POST',
        req: {
          action: 'PQVoltage',
          mtrno: mtrno,
          accountno: '258951461',
          days: '30',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchPowerQualityVoltagePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  mtrno,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'PQVoltage',
        method: 'POST',
        req: {
          action: 'PQVoltage',
          mtrno: mtrno,
          accountno: '258951461',
          days: '30',
        },
        consType: 'PRE',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchPowerQualityVoltage: refetch,
  });
};

export const rechargeHistoryPrepaidPOSTStatusAndText = (
  Constants,
  { action },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: action,
        method: 'GET',
        auth: 'TOKEN',
        baseUrlName: '',
        environmentName: 'SPM_ADANI',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const rechargeHistoryPrepaidPOST = (
  Constants,
  { action },
  handlers = {}
) =>
  rechargeHistoryPrepaidPOSTStatusAndText(Constants, { action }, handlers).then(
    res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json)
  );

export const useRechargeHistoryPrepaidPOST = ({ action }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: action,
        method: 'GET',
        auth: 'TOKEN',
        baseUrlName: '',
        environmentName: 'SPM_ADANI',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchRechargeHistoryPrepaidPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  action,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: action,
        method: 'GET',
        auth: 'TOKEN',
        baseUrlName: '',
        environmentName: 'SPM_ADANI',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchRechargeHistoryPrepaid: refetch,
  });
};

export const registeredPOSTStatusAndText = (
  Constants,
  { accno, email, mobilenumber, password },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'createWssUser',
        method: 'POST',
        req: {
          action: 'createWssUser',
          mobilenumber: mobilenumber,
          accno: accno,
          address: null,
          billgroup: null,
          caNumber: null,
          email: email,
          firstName: null,
          lastName: null,
          password: password,
          role: 'consumer',
          otp: '',
          type: 'REGISTRATION',
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const registeredPOST = (
  Constants,
  { accno, email, mobilenumber, password },
  handlers = {}
) =>
  registeredPOSTStatusAndText(
    Constants,
    { accno, email, mobilenumber, password },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useRegisteredPOST = ({ accno, email, mobilenumber, password }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'createWssUser',
        method: 'POST',
        req: {
          action: 'createWssUser',
          mobilenumber: mobilenumber,
          accno: accno,
          address: null,
          billgroup: null,
          caNumber: null,
          email: email,
          firstName: null,
          lastName: null,
          password: password,
          role: 'consumer',
          otp: '',
          type: 'REGISTRATION',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchRegisteredPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accno,
  email,
  mobilenumber,
  password,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'createWssUser',
        method: 'POST',
        req: {
          action: 'createWssUser',
          mobilenumber: mobilenumber,
          accno: accno,
          address: null,
          billgroup: null,
          caNumber: null,
          email: email,
          firstName: null,
          lastName: null,
          password: password,
          role: 'consumer',
          otp: '',
          type: 'REGISTRATION',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchRegistered: refetch });
};

export const serviceRequestSavePOSTStatusAndText = (
  Constants,
  { requestDetails, requestnatureId, scNo },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTCommercialsave',
        method: 'POST',
        req: {
          requestnatureId: requestnatureId,
          scNo: scNo,
          requestDetails: requestDetails,
          newOwnerName: '',
          newOwnerFname: '',
          newOwnerphone: '',
          newOwnerEmail: '',
          newCat: '',
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const serviceRequestSavePOST = (
  Constants,
  { requestDetails, requestnatureId, scNo },
  handlers = {}
) =>
  serviceRequestSavePOSTStatusAndText(
    Constants,
    { requestDetails, requestnatureId, scNo },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useServiceRequestSavePOST = ({
  requestDetails,
  requestnatureId,
  scNo,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTCommercialsave',
        method: 'POST',
        req: {
          requestnatureId: requestnatureId,
          scNo: scNo,
          requestDetails: requestDetails,
          newOwnerName: '',
          newOwnerFname: '',
          newOwnerphone: '',
          newOwnerEmail: '',
          newCat: '',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchServiceRequestSavePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  requestDetails,
  requestnatureId,
  scNo,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTCommercialsave',
        method: 'POST',
        req: {
          requestnatureId: requestnatureId,
          scNo: scNo,
          requestDetails: requestDetails,
          newOwnerName: '',
          newOwnerFname: '',
          newOwnerphone: '',
          newOwnerEmail: '',
          newCat: '',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchServiceRequestSave: refetch });
};

export const serviceRequestCategoryPOSTStatusAndText = (
  Constants,
  _args,
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTypeCommercial/',
        method: 'GET',
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const serviceRequestCategoryPOST = (Constants, _args, handlers = {}) =>
  serviceRequestCategoryPOSTStatusAndText(Constants, {}, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useServiceRequestCategoryPOST = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTypeCommercial/',
        method: 'GET',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchServiceRequestCategoryPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'csc/rest/RequestTypeCommercial/',
        method: 'GET',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchServiceRequestCategory: refetch,
  });
};

export const updateEmailPOSTStatusAndText = (
  Constants,
  { accno, newEmail, oldEmail, userId },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateEmail',
        method: 'POST',
        req: {
          oldEmail: oldEmail,
          newEmail: newEmail,
          otp: '',
          accno: accno,
          userId: userId,
          type: 'UPDATEEMAIL',
          action: 'UpdateEmail',
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const updateEmailPOST = (
  Constants,
  { accno, newEmail, oldEmail, userId },
  handlers = {}
) =>
  updateEmailPOSTStatusAndText(
    Constants,
    { accno, newEmail, oldEmail, userId },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useUpdateEmailPOST = ({ accno, newEmail, oldEmail, userId }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateEmail',
        method: 'POST',
        req: {
          oldEmail: oldEmail,
          newEmail: newEmail,
          otp: '',
          accno: accno,
          userId: userId,
          type: 'UPDATEEMAIL',
          action: 'UpdateEmail',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchUpdateEmailPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accno,
  newEmail,
  oldEmail,
  userId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateEmail',
        method: 'POST',
        req: {
          oldEmail: oldEmail,
          newEmail: newEmail,
          otp: '',
          accno: accno,
          userId: userId,
          type: 'UPDATEEMAIL',
          action: 'UpdateEmail',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchUpdateEmail: refetch });
};

export const updateProfileMobileNumberPOSTStatusAndText = (
  Constants,
  { accno, newMobile, oldMobile, userId },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateMobile',
        method: 'POST',
        req: {
          action: 'UpdateMobile',
          newMobile: newMobile,
          oldMobile: oldMobile,
          otp: '',
          accno: accno,
          userId: userId,
          type: 'UPDATEMOBILE',
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const updateProfileMobileNumberPOST = (
  Constants,
  { accno, newMobile, oldMobile, userId },
  handlers = {}
) =>
  updateProfileMobileNumberPOSTStatusAndText(
    Constants,
    { accno, newMobile, oldMobile, userId },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useUpdateProfileMobileNumberPOST = ({
  accno,
  newMobile,
  oldMobile,
  userId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateMobile',
        method: 'POST',
        req: {
          action: 'UpdateMobile',
          newMobile: newMobile,
          oldMobile: oldMobile,
          otp: '',
          accno: accno,
          userId: userId,
          type: 'UPDATEMOBILE',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchUpdateProfileMobileNumberPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accno,
  newMobile,
  oldMobile,
  userId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'UpdateMobile',
        method: 'POST',
        req: {
          action: 'UpdateMobile',
          newMobile: newMobile,
          oldMobile: oldMobile,
          otp: '',
          accno: accno,
          userId: userId,
          type: 'UPDATEMOBILE',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchUpdateProfileMobileNumber: refetch,
  });
};

export const viewBillDetailsPOSTStatusAndText = (
  Constants,
  { action },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const viewBillDetailsPOST = (Constants, { action }, handlers = {}) =>
  viewBillDetailsPOSTStatusAndText(Constants, { action }, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useViewBillDetailsPOST = ({ action }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchViewBillDetailsPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  action,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchViewBillDetails: refetch });
};

export const addAccountConfirmOTPForNewScnoAddingPOSTStatusAndText = (
  Constants,
  { existAcct, newAcct, otp, txid },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'WssAddAccount',
        method: 'POST',
        req: {
          newAcct: newAcct,
          existAcct: existAcct,
          otp: otp,
          txid: txid,
          type: 'EMAIL',
          action: 'WssAddAccount',
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const addAccountConfirmOTPForNewScnoAddingPOST = (
  Constants,
  { existAcct, newAcct, otp, txid },
  handlers = {}
) =>
  addAccountConfirmOTPForNewScnoAddingPOSTStatusAndText(
    Constants,
    { existAcct, newAcct, otp, txid },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useAddAccountConfirmOTPForNewScnoAddingPOST = ({
  existAcct,
  newAcct,
  otp,
  txid,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'WssAddAccount',
        method: 'POST',
        req: {
          newAcct: newAcct,
          existAcct: existAcct,
          otp: otp,
          txid: txid,
          type: 'EMAIL',
          action: 'WssAddAccount',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchAddAccountConfirmOTPForNewScnoAddingPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  existAcct,
  newAcct,
  otp,
  txid,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'WssAddAccount',
        method: 'POST',
        req: {
          newAcct: newAcct,
          existAcct: existAcct,
          otp: otp,
          txid: txid,
          type: 'EMAIL',
          action: 'WssAddAccount',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchAddAccountConfirmOTPForNewScnoAdding: refetch,
  });
};

export const addServiceConnectionAccountPOSTStatusAndText = (
  Constants,
  { existAcct, newAcct },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'WssAddAccount',
        method: 'POST',
        req: {
          newAcct: newAcct,
          existAcct: existAcct,
          otp: '',
          type: 'EMAIL',
          action: 'WssAddAccount',
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const addServiceConnectionAccountPOST = (
  Constants,
  { existAcct, newAcct },
  handlers = {}
) =>
  addServiceConnectionAccountPOSTStatusAndText(
    Constants,
    { existAcct, newAcct },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useAddServiceConnectionAccountPOST = ({ existAcct, newAcct }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'WssAddAccount',
        method: 'POST',
        req: {
          newAcct: newAcct,
          existAcct: existAcct,
          otp: '',
          type: 'EMAIL',
          action: 'WssAddAccount',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchAddServiceConnectionAccountPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  existAcct,
  newAcct,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'WssAddAccount',
        method: 'POST',
        req: {
          newAcct: newAcct,
          existAcct: existAcct,
          otp: '',
          type: 'EMAIL',
          action: 'WssAddAccount',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({
    loading,
    data,
    error,
    refetchAddServiceConnectionAccount: refetch,
  });
};

export const confirmOTPscreenPOSTStatusAndText = (
  Constants,
  { otp, transid },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'forgotPassword',
        method: 'POST',
        req: {
          accno: '341201210711',
          otp: otp,
          type: 'EMAIL',
          action: 'forgotPassword',
          transid: transid,
          newPassword: 'Test@1234444',
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const confirmOTPscreenPOST = (
  Constants,
  { otp, transid },
  handlers = {}
) =>
  confirmOTPscreenPOSTStatusAndText(Constants, { otp, transid }, handlers).then(
    res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json)
  );

export const useConfirmOTPscreenPOST = ({ otp, transid }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'forgotPassword',
        method: 'POST',
        req: {
          accno: '341201210711',
          otp: otp,
          type: 'EMAIL',
          action: 'forgotPassword',
          transid: transid,
          newPassword: 'Test@1234444',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchConfirmOTPscreenPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  otp,
  transid,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'forgotPassword',
        method: 'POST',
        req: {
          accno: '341201210711',
          otp: otp,
          type: 'EMAIL',
          action: 'forgotPassword',
          transid: transid,
          newPassword: 'Test@1234444',
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchConfirmOTPscreen: refetch });
};

export const consumerDetailsPOSTStatusAndText = (
  Constants,
  { action },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const consumerDetailsPOST = (Constants, { action }, handlers = {}) =>
  consumerDetailsPOSTStatusAndText(Constants, { action }, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useConsumerDetailsPOST = ({ action }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchConsumerDetailsPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  action,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchConsumerDetails: refetch });
};

export const getticketdeatilsPOSTStatusAndText = (
  Constants,
  { consId },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'getAllTickets',
        method: 'POST',
        req: { consId: consId, action: 'getAllTickets' },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const getticketdeatilsPOST = (Constants, { consId }, handlers = {}) =>
  getticketdeatilsPOSTStatusAndText(Constants, { consId }, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const useGetticketdeatilsPOST = ({ consId }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'getAllTickets',
        method: 'POST',
        req: { consId: consId, action: 'getAllTickets' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchGetticketdeatilsPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  consId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'getAllTickets',
        method: 'POST',
        req: { consId: consId, action: 'getAllTickets' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchGetticketdeatils: refetch });
};

export const loginConfirmOTPPOSTStatusAndText = (
  Constants,
  { accno, otp, transid },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'LoginWithOTP',
        method: 'POST',
        req: {
          accno: accno,
          action: 'LoginWithOTP',
          otp: otp,
          transid: transid,
        },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const loginConfirmOTPPOST = (
  Constants,
  { accno, otp, transid },
  handlers = {}
) =>
  loginConfirmOTPPOSTStatusAndText(
    Constants,
    { accno, otp, transid },
    handlers
  ).then(res => (!isOkStatus(res.status) ? Promise.reject(res) : res.json));

export const useLoginConfirmOTPPOST = ({ accno, otp, transid }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'LoginWithOTP',
        method: 'POST',
        req: {
          accno: accno,
          action: 'LoginWithOTP',
          otp: otp,
          transid: transid,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchLoginConfirmOTPPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  accno,
  otp,
  transid,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'LoginWithOTP',
        method: 'POST',
        req: {
          accno: accno,
          action: 'LoginWithOTP',
          otp: otp,
          transid: transid,
        },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchLoginConfirmOTP: refetch });
};

export const paymentGatewayPOSTStatusAndText = (
  Constants,
  _args,
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'PAYMENT_CONFIG',
        method: 'POST',
        req: { action: 'PAYMENT_CONFIG' },
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const paymentGatewayPOST = (Constants, _args, handlers = {}) =>
  paymentGatewayPOSTStatusAndText(Constants, {}, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const usePaymentGatewayPOST = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'PAYMENT_CONFIG',
        method: 'POST',
        req: { action: 'PAYMENT_CONFIG' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchPaymentGatewayPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({
        action: 'PAYMENT_CONFIG',
        method: 'POST',
        req: { action: 'PAYMENT_CONFIG' },
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchPaymentGateway: refetch });
};

export const paymentHistoryPOSTStatusAndText = (
  Constants,
  { action },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const paymentHistoryPOST = (Constants, { action }, handlers = {}) =>
  paymentHistoryPOSTStatusAndText(Constants, { action }, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const usePaymentHistoryPOST = ({ action }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchPaymentHistoryPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  action,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service`,
    {
      body: JSON.stringify({ action: action, method: 'GET', auth: 'NO' }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchPaymentHistory: refetch });
};

export const prepaidApiPOSTStatusAndText = (
  Constants,
  { mtrno },
  handlers = {}
) =>
  fetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'ProfileBasicDetails',
        method: 'POST',
        req: { action: 'ProfileBasicDetails', mtrno: mtrno },
        consType: 'PRE',
        auth: 'NO',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const prepaidApiPOST = (Constants, { mtrno }, handlers = {}) =>
  prepaidApiPOSTStatusAndText(Constants, { mtrno }, handlers).then(res =>
    !isOkStatus(res.status) ? Promise.reject(res) : res.json
  );

export const usePrepaidApiPOST = ({ mtrno }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'ProfileBasicDetails',
        method: 'POST',
        req: { action: 'ProfileBasicDetails', mtrno: mtrno },
        consType: 'PRE',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchPrepaidApiPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  mtrno,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `http://mbackend.fluentgrid.com:9887/fgweb/web/json/plugin/com.fluentgrid.cp.api.ExtIntegrationService/service.`,
    {
      body: JSON.stringify({
        action: 'ProfileBasicDetails',
        method: 'POST',
        req: { action: 'ProfileBasicDetails', mtrno: mtrno },
        consType: 'PRE',
        auth: 'NO',
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    const f = handlers.onData ?? onData;
    if (data && f) {
      f(data);
    }
  }, [data, onData, handlers]);

  return children({ loading, data, error, refetchPrepaidApi: refetch });
};
