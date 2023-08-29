import { FC } from 'react';
import HeadPageContent from '../HeadPageContent';
import ButtonArrow from '../../../common/ButtonArrow';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { registrationSlice } from '../../../../store/reducers/registrationSlice';
import PageNavigation from '../PageNavigation';

const HeadPage: FC = () => {
  const dispatch = useAppDispatch();
  const { registrationPage } = useAppSelector((state) => state.registration);
  const { setRegistrationPage } = registrationSlice.actions;

  const handlerRightButton = () => {
    dispatch(setRegistrationPage(registrationPage + 1));
  };

  const handlerLeftButton = () => {
    dispatch(setRegistrationPage(registrationPage - 1));
  };

  return (
    <div className="flex flex-col gap-6 mb-7">
      <PageNavigation page={registrationPage} />
      <HeadPageContent />
      <div className="flex items-center justify-between">
        <ButtonArrow
          children="Назад"
          direction={'left'}
          onClick={handlerLeftButton}
          hide={registrationPage === 1}
        ></ButtonArrow>
        <ButtonArrow
          children="Далі"
          direction={'right'}
          onClick={handlerRightButton}
          hide={registrationPage === 3}
        ></ButtonArrow>
      </div>
    </div>
  );
};

export default HeadPage;