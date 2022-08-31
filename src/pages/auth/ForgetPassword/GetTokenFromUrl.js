const constgetTokenFromURL = () => {
  return window.location.href
    .substring(1)
    .split('=')
    .reduce((initial, item) => {
      // var get_token = item.split('=');
      // initial[get_token[0]] = decodeURIComponent(get_token[1]);
      // console.log(initial);
      return item;
    }, {});
};

export default constgetTokenFromURL;

// console.log(getTokenFromURL);
