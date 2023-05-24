import { useState } from 'react'
import { Button, Container, Loader } from 'components/shared'
import { RadioList } from 'components/features';
import useWindowDimensions from 'services/hooks/useWindowDimensions'
import * as validateImg from 'services/helpers/validateImg';
import s from './form.module.scss'

const formInitialState = {
  name: '',
  email: '',
  phone: '',
  position_id: '',
  photo: ''
}

const initialStateErrors = {
  name: true,
  email: true,
  phone: true
}

const Form = ({ 
  title,
  positions,
  onSubmit,
  isLoading,
  registerStatus,
  errorPositions
}) => {
  const { width } = useWindowDimensions()
  const [state, setState] = useState(formInitialState)
  const [formErrors, setFormErrors] = useState(initialStateErrors)
  const [photoName, setPhotoName] = useState('')
  const [photoError, setPhotoError] = useState('')

  const handleChange = ({ target }) => {
    const { type, name, value, files, validationMessage } = target;

    const newValue = () => {
      if (type === 'radio') {
        return Number(value);
      }
      if (type === 'file') {
        if (files.length === 0) {
          setPhotoName('');
          setPhotoError('');
          return;
        }
        const file = files[0];
        if (validateImg.typeError(file)) {
          setPhotoError("Image type must be '.jpg' or '.jpeg'.");
          return;
        }
        if (validateImg.maxAllowedSizeError(file)) {
          setPhotoError('Image size must be 5MB or less.');
          return;
        }
        if (validateImg.maxWidthAndHeightError(file)) {
          setPhotoError('Image height and width must be not less 70px.');
          return;
        }

        setPhotoName(file.name);
        setPhotoError('');
        return file;
      }
      return value.trim();
    };
    setFormErrors(prevState => ({
      ...prevState,
      [name]: validationMessage,
    }));
    setState(prevState => ({
      ...prevState,
      [name]: newValue(),
    }));
  };

  const handleSubmit = e => {
    e.preventDefault()

    onSubmit(state)
    setFormErrors(initialStateErrors)
    setPhotoName('')
  }

  const { name, email, position_id, phone } = state

  const isDisabled = 
    formErrors.name ||
    formErrors.email ||
    formErrors.phone ||
    !photoName ||
    !position_id ||
    registerStatus;

    const uploadBtnStyle = photoError ? s.errorUploadBtn : s.validUploadBtn; // стили для кастомного input type['file'] в случае не прохождения валидации они меняютмя.
    const uploadInputStyle = photoError ? s.errorUploadCustomInput : s.validUploadCustomInput; // состоит из двух span_ов: визуально кнопка и инпут

  return (
    <section id='sign-up'>
      <Container>
        <h2 className={s.title}>{title}</h2>
        <form className={s.form} onSubmit={handleSubmit}>

          <div className={s.inputBlock}>
            <label htmlFor='username'>
              <input
                id='username'
                className={s.input}
                name='name'
                value={name}
                onChange={handleChange}
                required={true}
                type='text'
                minLength='2'
                maxLength='60'
                placeholder=' '
              />
              <span className={s.label}>Your name</span>
              <span className={s.error}>Username should contain 2-60 characters</span>
            </label>
          </div>

          <div className={s.inputBlock}>
            <label htmlFor='user-email'>
              <input
                id='user-email'
                className={s.input}
                name='email'
                value={email}
                onChange={handleChange}
                required={true}
                type='email'
                minLength='2'
                maxLength='100'
                placeholder=' '
                title='example@gmail.com'
                pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
              />
              <span className={s.label}>Email</span>
              <span className={s.error}>
                User email, must be a valid email according to RFC2822
              </span>
            </label>
          </div>

          <div className={s.inputBlock}>
            <label htmlFor='user-phone'>
              <input
                id='user-phone'
                className={s.input}
                name='phone'
                value={phone}
                onChange={handleChange}
                required={true}
                type='tel'
                placeholder=' '
                pattern='^[\+]{0,1}380([0-9]{9})$'
              />
              <span className={s.label}>Phone</span>
              <span className={s.error}>
                User phone number should start with code of Ukraine +380
              </span>
              <span className={s.helperText}>+38 (XXX) XXX - XX - XX</span>
            </label>
          </div>

          {isLoading ? (
            <Loader height={141} marginBottom={50} />
          ) : (
            <RadioList 
              title='Select your position'
              handleChange={handleChange}
              positions={positions}
              name='position_id'
              position_id={position_id}
              error={errorPositions}
            />
          )}

          <label htmlFor="user-photo" className={s.uploadBlock}>
            <input
              id="user-photo"
              type="file"
              name="photo"
              accept="image/jpg, image/jpeg"
              onChange={handleChange}
              className={s.uploadInput}
            />
            <span className={uploadBtnStyle}>Upload</span>
            {!photoName ? (
              <span className={`${uploadInputStyle} + ' ' + ${s.uploadTextColor}`}>
                Upload your photo
              </span>
            ) : validateImg.checkImgName(width, photoName).tooltip ? (
              <span
                className={uploadInputStyle}
                style={{ pointerEvents: 'auto' }}
                tooltip={photoName}
              >
                {validateImg.checkImgName(width, photoName).value}
              </span>
            ) : (
              <span className={uploadInputStyle}>{photoName}</span>
            )}

            {photoError && <span className={s.fileError}>{photoError}</span>}
          </label>

          <div className={s.btnContainer}>
            <Button title='Sign up' disabled={isDisabled} />
          </div>

        </form>
      </Container>
    </section>
  )
}

export default Form
