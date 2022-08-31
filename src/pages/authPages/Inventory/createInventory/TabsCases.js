import GeneralTab from './tabs/generals/index';
import WeighAndDimention from './tabs/weight&dimentions';
import Certifications from './tabs/certifications';
import Detail from './tabs/details';
import Image from './tabs/images';
import PropTypes from 'prop-types';

const TabsCases = ({prodDetails, handleProductId, setProdDetails}) => {
  const {activeTabId, productId} = prodDetails;

  const nextTab = () => {
    if (activeTabId < 105) {
      setProdDetails((prevState) => ({
        ...prevState,
        activeTabId: activeTabId + 1,
      }));
    }
  };

  switch (activeTabId) {
    case 101:
      return (
        <GeneralTab
          handleProductId={handleProductId}
          nextTab={nextTab}
          tabId={activeTabId}
        />
      );
    case 102:
      return <WeighAndDimention productId={productId} nextTab={nextTab} />;
    case 103:
      return <Certifications productId={productId} nextTab={nextTab} />;
    case 104:
      return <Image productId={productId} nextTab={nextTab} />;
    case 105:
      return <Detail />;
    default:
      return <GeneralTab handleProductId={handleProductId} />;
  }
};
TabsCases.propTypes = {
  prodDetails: PropTypes.object,
  setProdDetails: PropTypes.func,
  handleProductId: PropTypes.func,
};

export default TabsCases;
