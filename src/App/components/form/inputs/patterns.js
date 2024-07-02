const Regexp = {
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
    message: 'Некорректный email',
  },

  password: {},

  name: {
    pattern: /^.{3,}$/g,
    message: 'Минимум 3 символа',
  },

  repassword: {
    pattern: /./g,
    message: "Don't be empty",
  },

  isLongEnough: {
    pattern: [8, 32],
    message: 'Количество символов от 8 до 32',
  },

  hasNumber: {
    pattern: /\d/,
    message: 'Пароль должен содержать хотя бы одну цифру',
  },

  hasUpperCase: {
    pattern: /[A-Z]/,
    message: 'Пароль должен содержать хотя бы одну заглавную букву',
  },

  hasLowerCase: {
    pattern: /[a-z]/,
    message: 'Пароль должен содержать хотя бы одну строчную букву',
  },

  hasSymbol: {
    pattern: /[.,:;?!*+%\-<>@[\]{}/\\_{}$#]/,
    message: 'Пароль должен содержать хотя бы один специальный символ',
  },
};

export default Regexp;
