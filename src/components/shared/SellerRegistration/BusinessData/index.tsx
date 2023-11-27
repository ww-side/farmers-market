import { FC } from 'react';
import RegistrationField from '../../../common/RegistrationField';
import UploadAndDisplayImage from '../../../common/FileUpload';
import RegistrationFieldArea from '../../../common/RegistrationFieldArea';
import RadioChoice from '../../../common/RadioChoice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { sellerRegistrationSlice } from '../../../../store/reducers/sellerSlice';

const BusinessData: FC = () => {
  const { companyName, typeSeller, aboutUs, contactPerson, image, logo } =
    useAppSelector(state => state.sellerRegistration);

  const dispatch = useAppDispatch();

  const handleChange = (field: string, value: string) => {
    dispatch(sellerRegistrationSlice.actions.SET_FIELD({ field, value }));
  };

  return (
    <div className="flex flex-col w-[558px] mt-20 mx-auto">
      <div className="flex flex-col gap-6 mb-7">
        <div>
          <h3 className="pb-3">Виберіть тип підприємства *</h3>
          <div className="flex gap-28 mb-4">
            <RadioChoice
              label="Юридична особа/ФОП"
              value="business"
              selectedOption={typeSeller}
              handleOptionChange={e =>
                handleChange('typeSeller', e.target.value)
              }
            />
            <RadioChoice
              label="Приватна особа"
              value="privatePerson"
              selectedOption={typeSeller}
              handleOptionChange={e =>
                handleChange('typeSeller', e.target.value)
              }
            />
          </div>
        </div>
        {typeSeller === 'business' && (
          <RegistrationField
            label={`Назва підприємства *`}
            inputType="text"
            inputId="factoryName"
            value={companyName}
            placeholder="Будь-ласка введіть дійсну назву"
            onChange={value => handleChange('companyName', value)}
          />
        )}
        {typeSeller === 'business' ? (
          <>
            <UploadAndDisplayImage
              label={'Фотографія підприємства *'}
              inputId={'image'}
              hint="Зображення має бути не більшим ніж 2 МБ,
          та розміром не більше 1024х1024 пікселей."
              selectedImage={image}
            />
            <UploadAndDisplayImage
              label={'Логотип підприємства'}
              inputId={'logo'}
              hint="Зображення має бути не більшим ніж 2 МБ,
          та розміром не більше 1024х1024 пікселей."
              selectedImage={logo}
            />
          </>
        ) : (
          <UploadAndDisplayImage
            label={'Фото'}
            inputId={'image'}
            hint="Зображення має бути не більшим ніж 2 МБ,
          та розміром не більше 1024х1024 пікселей."
            selectedImage={image}
          />
        )}
        <RegistrationFieldArea
          label={typeSeller === 'business' ? 'Про нас *' : 'Про мене'}
          fieldId="aboutUs"
          value={aboutUs}
          placeholder="Розкажіть будь ласка про себе"
          onChange={value => handleChange('aboutUs', value)}
        />
        <RegistrationField
          label="Ім’я та прізвище контактної особи"
          inputType="text"
          inputId="contactPerson"
          value={contactPerson}
          placeholder="Будь-ласка наешіть ім’я та прізвище контактної особи"
          onChange={value => handleChange('contactPerson', value)}
        />
      </div>
    </div>
  );
};

export default BusinessData;
