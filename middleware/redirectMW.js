const redirectMW = (redirectUrl) => (req, res, next) => {
  res.redirect(redirectUrl);
};

export default redirectMW;
