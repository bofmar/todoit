import { createWithClass, createAndAppendText, createProjectLi } from '../helpers';

export default function upcomingPage(items) {
  const content = createWithClass('div', 'project-wrapper');

  const div = createWithClass('div', 'title-div');
  createAndAppendText('h2', div, 'Upcoming');
  content.appendChild(div);

  if (items.length === 0) {
    const noItemsMessage = document.createElement('p');
    noItemsMessage.innerText = 'No tasks left for this week!';
    noItemsMessage.classList.add('no-items-left');
    content.appendChild(noItemsMessage);
    return content;
  }

  const ul = createWithClass('ul', 'items-list');
  createProjectLi(ul, items);
  content.appendChild(ul);

  return content;
}
