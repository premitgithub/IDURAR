import { notification } from 'antd';
import codeMessage from './codeMessage';

const successHandler = (
  response,
  options = { notifyOnSuccess: false, notifyOnFailed: true }
) => {
  const { data, status } = response; // ✅ Added `status` here

  // ✅ CHANGED LINE: Accepts status 200 or 201 as success, even if `data.success` is not set
  const isSuccess =
    (data && data.success === true) || status === 201 || status === 200;

  if (isSuccess) {
    const message = data?.message || codeMessage[status] || 'Operation successful'; // ✅ fallback message
    if (options.notifyOnSuccess) {
      notification.config({
        duration: 2,
        maxCount: 2,
      });
      notification.success({
        message: `Request success`,
        description: message,
      });
    }
  } else {
    const errorText = data?.message || codeMessage[status] || 'An error occurred'; // ✅ fallback error message
    if (options.notifyOnFailed) {
      notification.config({
        duration: 4,
        maxCount: 2,
      });
      notification.error({
        message: `Request error ${status}`, // ✅ Will now show 400, 404, etc. but not 201 falsely
        description: errorText,
      });
    }
  }
};

export default successHandler;
