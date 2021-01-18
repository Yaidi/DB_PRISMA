const valid = (props) => ({
  email: 'some@email.com',
  password: 'mySup3rS3cuR3P@ssw0rd',
  ...props,
});

export { valid as validUser };
