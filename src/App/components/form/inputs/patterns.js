const Regexp = {
  email: {
    pattern: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: "It's must be email",
  },

  password: {
    pattern: /^\S{4,}$/g,
    message: 'Minimus 4 chars',
  },

  name: {
    pattern: /./g,
    message: "Don't be empty",
  },

  repassword: {
    pattern: /./g,
    message: "Don't be empty",
  },
};

export default Regexp;
