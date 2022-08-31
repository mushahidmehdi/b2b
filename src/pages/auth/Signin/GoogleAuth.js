import GoogleLogin from 'react-google-login';
import {useAuthMethod} from '@shipsavvy/utility/AuthHooks';
import PropTypes from 'prop-types';

const GoogleAuth = ({buttonName}) => {
  const {googleLogin} = useAuthMethod();

  const handleOnSuccess = (success) => {
    const {tokenId} = success;
    const body = {tokenId: tokenId};
    if (tokenId) {
      googleLogin(body);
    }
  };
  const handleOnFailure = (fail) => {
    console.log('Google login fail', fail);
  };

  return (
    <div>
      <GoogleLogin
        buttonText={buttonName}
        style={{backgroundColor: '#000'}}
        clientId='928516734148-j3h69g05370vk7viifq3htujd0ptngbl.apps.googleusercontent.com'
        onSuccess={handleOnSuccess}
        onFailure={handleOnFailure}
        cookiePolicy='single_host_origin'
      />
    </div>
  );
};

GoogleAuth.propTypes = {
  buttonName: PropTypes.any,
};

export default GoogleAuth;
