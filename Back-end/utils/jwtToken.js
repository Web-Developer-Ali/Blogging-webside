export const jwtToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  res
    .status(statusCode)
    .cookie("User", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV, // Secure cookies in production
      sameSite: 'None' // Necessary for cross-site cookie sharing
    })
    .json({
      success: true,
      message: message,
      user
    });
};
