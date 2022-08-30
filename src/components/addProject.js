import {
  createAndAppendText, createLabel, setFieldAttributes, createWithClass,
} from '../helpers';

export default function addProject() {
  const modal = document.createElement('dialog');
  modal.classList.add('modal', 'add-project-modal');

  const form = document.createElement('form');
  createAndAppendText('h3', form, 'New Project');

  // Add the title field
  const titleDiv = createWithClass('div', 'project-title-div');
  const titleLabel = createLabel('Title', 'project-title');
  titleDiv.appendChild(titleLabel);
  const titleField = document.createElement('input');
  setFieldAttributes(titleField, 'text', 'project-title', 'title');
  titleField.required = true;
  titleField.setAttribute('pattern', '.+');
  titleField.setAttribute('maxlength', '15');
  titleDiv.appendChild(titleField);
  form.appendChild(titleDiv);

  // Add text area
  const areaDiv = createWithClass('div', 'project-area-div');
  const areaLabel = createLabel('Description', 'project-description');
  areaDiv.appendChild(areaLabel);
  const areaField = document.createElement('textarea');
  areaField.setAttribute('id', 'project-description');
  areaField.setAttribute('name', 'description');
  areaField.setAttribute('placeholder', 'No description...');
  areaField.setAttribute('rows', '7');
  areaField.setAttribute('maxlength', '130');
  areaDiv.appendChild(areaField);
  form.appendChild(areaDiv);

  // Add the buttons
  const buttonsDiv = createWithClass('div', 'project-modal-buttons-div');
  const cancel = createWithClass('button', 'project-modal-cancel', 'Cancel');
  const add = createWithClass('button', 'project-modal-add', 'Add Item');
  buttonsDiv.appendChild(cancel);
  buttonsDiv.appendChild(add);
  form.appendChild(buttonsDiv);

  modal.appendChild(form);
  return modal;
}
