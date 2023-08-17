export function checkFields(
  name: string,
  surname: string,
  numberPhone: string,
  email: string,
  password: string,
  repeatPassword: string,
  isCheckRules: boolean,
) {
  if (name.trim() === '') {
    return alert(`Введіть ім'я`);
  }

  if (surname.trim() === '') {
    return alert('Введіть прізвище');
  }

  if (numberPhone.trim() === '') {
    return alert('Введіть номер телефону');
  }

  if (email.trim() === '') {
    return alert('Введіть email');
  }

  if (password.trim() === '') {
    return alert('Введіть пароль');
  }

  if (repeatPassword !== password) {
    return alert('Паролі не співпадають');
  }

  if (!isCheckRules) {
    return alert('Підтвердіть умови використання');
  }

  console.log({
    name,
    surname,
    numberPhone,
    email,
    password,
  });
}
