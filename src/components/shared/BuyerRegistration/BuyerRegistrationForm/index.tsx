import { FC } from 'react';
import RegistrationField from '../../../common/RegistrationField';
import Checkbox from '../../../common/Checkbox';
import Button from '../../../common/Button';
import CheckboxLabel from '../../../common/CheckboxLabel';
import ConsentProcessPersonalData from '../../../common/ConsentProcessPersonalData';
import useHandleChange from '../../../../hooks/useHandleChange.ts';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.ts';
import { checkFields } from '../utils/registration.util.ts';
import {
  buyersRegistrationSlice,
  thunkBuyersSignUp,
} from '../../../../store/reducers/buyersSlice.ts';
import ModalError from '../../../common/ModalError/index.tsx';
import ModalConfirmationEmail from '../../ModalConfirmationEmail/index.tsx';

const BuyerRegistrationForm: FC = () => {
  const {
    email,
    phoneNumber,
    name,
    lastName,
    password,
    repeatPassword,
    isCheckRules,
    modalConfirmationEmailIsOpen,
    error,
  } = useAppSelector(state => state.buyersRegistration);
  const {
    setEmail,
    setPhoneNumber,
    setLastName,
    setName,
    setPassword,
    setRepeatPassword,
    setIsCheckRules,
    setModalConfirmationEmailIsOpen,
  } = buyersRegistrationSlice.actions;

  const handleChange = useHandleChange();
  const dispatch = useAppDispatch();

  const handleRegistration = async () => {
    const userData = {
      name,
      lastName,
      phoneNumber,
      email,
      password,
    };
    if (checkFields({ ...userData, repeatPassword, isCheckRules })) {
      dispatch(thunkBuyersSignUp(userData));
    }
  };

  return (
    <>
      <ModalConfirmationEmail
        isModalOpen={modalConfirmationEmailIsOpen}
        setIsModalOpen={setModalConfirmationEmailIsOpen}
      />
      {error && <ModalError>{error}</ModalError>}
      <div className="flex flex-col gap-6 mb-7">
        <h2 className="text-2xl text-gray-700 font-medium">Реєстрація</h2>
        <RegistrationField
          label={`Ім'я`}
          inputType="text"
          inputId="name"
          value={name}
          placeholder="Введіть ім'я використовуючи українську або латинську абетку"
          onChange={value => handleChange(setName, value)}
        />
        <RegistrationField
          label="Прізвище"
          inputType="text"
          inputId="surname"
          value={lastName}
          placeholder="Введіть прізвище використовуючи українську або латинську абетку"
          onChange={value => handleChange(setLastName, value)}
        />
        <RegistrationField
          label="Номер телефону"
          inputType="number"
          inputId="numberPhone"
          value={phoneNumber !== '' ? phoneNumber : ''}
          hint="Ваш номер будет використано тільки для підтвердження"
          placeholder="Будь-ласка введіть вірний номер"
          onChange={value => handleChange(setPhoneNumber, value)}
        />
        <RegistrationField
          label="Електрона пошта"
          inputType="text"
          inputId="email"
          value={email.trim() !== '' ? email : ''}
          placeholder="Будь-ласка введіть дійсну адресу"
          onChange={value => handleChange(setEmail, value)}
        />
        <RegistrationField
          label="Пароль"
          inputType="password"
          inputId="password"
          value={password}
          placeholder="Будь-ласка введіть дійсні значення"
          hint="Пароль має містити мінімум 8 символів, одну маленьку літеру та одну велику літеру"
          onChange={value => handleChange(setPassword, value)}
        />
        <RegistrationField
          label="Пароль"
          inputType="password"
          inputId="passwordRepeat"
          value={repeatPassword}
          placeholder="Підтвердіть пароль"
          onChange={value => handleChange(setRepeatPassword, value)}
        />
        <Checkbox
          label={<CheckboxLabel />}
          inputId="rulesCheckbox"
          onChange={() => dispatch(setIsCheckRules(!isCheckRules))}
        />
        <ConsentProcessPersonalData />
      </div>
      <span className="flex justify-center mb-7">
        <Button color="green" size="w-9/12" onClick={handleRegistration}>
          Створити аккаунт
        </Button>
      </span>
    </>
  );
};

export default BuyerRegistrationForm;
