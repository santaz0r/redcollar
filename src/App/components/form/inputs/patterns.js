const Regexp = {
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
    message: 'Некорректный email',
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
