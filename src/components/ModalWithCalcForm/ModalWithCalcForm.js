import React from 'react';
import uuid from 'react-uuid';

import Modal from '../Modal/Modal';

import useFormWithValidation from '../../hooks/useFormWithValidation';

import getArrDataAnnualTaxDeductions from '../../utils/getArrDataAnnualTaxDeductions';

import getOrdinal from '../../utils/getOrdinal';

function ModalWithForm({
  isOpen,
  onClose,
}) {

  const STYLE_SETTINGS = {
    overlay: 'modal-with-calc-form',
    container: 'modal-with-calc-form__container',
    content: 'modal-with-calc-form__content',
    header: 'modal-with-calc-form__header',
    headerTextContainer: 'modal-with-calc-form__header-text-container',
    headerTitle: 'modal-with-calc-form__header-title',
    headerText: 'modal-with-calc-form__header-text',
    closeButton: 'modal-with-calc-form__close-button',
    main: 'modal-with-calc-form__main',
    form: 'modal-with-calc-form__form',
    fieldsetCheckbox: 'modal-with-calc-form__form-checkbox-fieldset',
    fieldsetRadio: 'modal-with-calc-form__form-fieldset-radio',
    fieldsetRadioContainer: 'modal-with-calc-form__form-fieldset-radio-container',
    fieldsetLegend: 'modal-with-calc-form__form-fieldset-legend',
    labelNumberField: 'modal-with-calc-form__form-label-number-field',
    labelRadioButton: 'modal-with-calc-form__form-label-radio-button',
    inputNumberField: 'modal-with-calc-form__form-input-number',
    inputNumberFieldError: 'modal-with-calc-form__form-input-number-error',
    labelCheckbox: 'modal-with-calc-formm__form-label-checkbox',
    labelCheckboxSpan: 'modal-with-calc-form__form-label-checkbox-span',
    inputCheckbox: 'modal-with-calc-form__form-input-checkbox',
    visibleInputCheckbox: 'modal-with-calc-form__form-input-checkbox-visible',
    inputRadioContainer: 'modal-with-calc-form__form-input-radio-container',
    inputRadio: 'modal-with-calc-form__form-input-radio',
    visibleInputRadio: 'modal-with-calc-form__form-input-radio-visible',
    formTextButton: 'modal-with-calc-form__form-text-button',
    submitButton: 'modal-with-calc-form__form-submit-button',
    footer: 'modal-with-calc-form__footer',
  };

  const TEXT_SETTINGS = {
    headerTitle: 'Налоговый вычет',
    headerText: 'Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего официального годового дохода.',
    labelTextField: 'Ваша зарплата в месяц',
    formTextButton: 'Рассчитать',
    fieldsetCheckboxLegend: 'Итого можете внести в качестве досрочных:',
    fieldsetRadioLegend: 'Что уменьшаем?',
    labelCheckbox: ' рублей в',
    spanLabelCheckbox: 'год',
    radioInput: ['Платёж', 'Срок'],
    submitButton: 'Добавить',
  };

  const FORM_NUMBER_FIELDS_DATA = [
    {
      id: 1,
      label: 'Ваша зарплата в месяц',
      placeholder: 'Введите данные',
      errorText: 'Поле обязательно для заполнения',
      name: 'salary',
      type: 'number',
      required: true,
    },
  ];

  const FORM_RADIO_BUTTONS_DATA = [
    {
      id: 1,
      label: 'Платёж',
      name: 'subject',
      value: 'payment',
      type: 'radio',
    },
    {
      id: 2,
      label: 'Срок',
      name: 'subject',
      value: 'time',
      type: 'radio',
    },
  ];

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  const [taxDeductionData, setTaxDeductionData] = React.useState([]);

  const [checkboxMarkup, setCheckBoxMarkup] = React.useState(null);

  const formNumberFieldsMarkup = FORM_NUMBER_FIELDS_DATA.map((elem) => (
    <label
      key={elem.id}
      name={elem.name}
      type={elem.type}
      className={STYLE_SETTINGS.labelNumberField}
    >
      {elem.label}
      <input
        className={STYLE_SETTINGS.inputNumberField}
        placeholder={elem.placeholder}
        required={elem.required}
        name={elem.name}
        type={elem.type}
        value={values[elem.name] || ''}
        onChange={handleChange}
      />
      {!isValid && (
        <span
          className={STYLE_SETTINGS.inputNumberFieldError}
          aria-live="polite"
        >
          {errors[elem.name]}
        </span>
      )}

    </label>
  ));

  const formRadioButtonsMarkup = FORM_RADIO_BUTTONS_DATA.map((elem) => (
    <label
      key={elem.id}
      className={STYLE_SETTINGS.labelRadioButton}
    >
      <input
        className={STYLE_SETTINGS.inputRadio}
        name={elem.name}
        value={elem.value}
        checked={elem.value === values[elem.name]}
        onChange={handleChange}
        type={elem.type}
      />
        <span className={STYLE_SETTINGS.visibleInputRadio}>{elem.label}</span>
    </label>
  ));

  const getFormCheckboxMarkup = (data) => data.map((elem, index) => (
    <label
      key={uuid()}
      className={STYLE_SETTINGS.labelCheckbox}
    >
      <input
        className={STYLE_SETTINGS.inputCheckbox}
        type="checkbox"
      />
      <span className={STYLE_SETTINGS.visibleInputCheckbox}></span>
      {Intl.NumberFormat('ru-RU').format(elem) + TEXT_SETTINGS.labelCheckbox}
      <span
        className={STYLE_SETTINGS.labelCheckboxSpan}
      >
        {` ${index + 1}` + getOrdinal(index + 1) + TEXT_SETTINGS.spanLabelCheckbox}
      </span>
    </label>
  ));

  const handleSubmit = (evt) => {
    evt.preventDefault();
    resetForm();
    setCheckBoxMarkup(null);
    onClose();
  };

  const handleClickCalcTaxDeduction = () => {
    if (values.salary) {
      setCheckBoxMarkup(getFormCheckboxMarkup(getArrDataAnnualTaxDeductions(values.salary)));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      styleSettings={STYLE_SETTINGS}
    >
      <Modal.Header>
        <h2
          className={STYLE_SETTINGS.headerTitle}
        >
          {TEXT_SETTINGS.headerTitle}
        </h2>
        <p
          className={STYLE_SETTINGS.headerText}
        >
          {TEXT_SETTINGS.headerText}
        </p>
      </Modal.Header>
      <Modal.Body>
        <form
          className={STYLE_SETTINGS.form}
          noValidate
          onSubmit={handleSubmit}
        >
          {formNumberFieldsMarkup}
          <button
            className={STYLE_SETTINGS.formTextButton}
            onClick={handleClickCalcTaxDeduction}
            type="button"
          >
            {TEXT_SETTINGS.formTextButton}
          </button>
          {checkboxMarkup && (
            <fieldset
              className={STYLE_SETTINGS.fieldsetCheckbox}
            >
              <legend
                className={STYLE_SETTINGS.fieldsetLegend}
              >
                {TEXT_SETTINGS.fieldsetCheckboxLegend}
              </legend>
              {checkboxMarkup}
            </fieldset>
          )}

          <fieldset
            className={STYLE_SETTINGS.fieldsetRadio}
          >
            <div
              className={STYLE_SETTINGS.fieldsetRadioContainer}
            >
            <legend
              className={STYLE_SETTINGS.fieldsetLegend}
            >
              {TEXT_SETTINGS.fieldsetRadioLegend}
            </legend>
            <div
              className={STYLE_SETTINGS.inputRadioContainer}
            >
              {formRadioButtonsMarkup}
            </div>
            </div>

          </fieldset>
          <button
            className={STYLE_SETTINGS.submitButton}
            type="submit"
            disabled={!isValid}
          >
            {TEXT_SETTINGS.submitButton}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalWithForm;
