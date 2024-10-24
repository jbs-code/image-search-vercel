const form = document.querySelector('form');
const output = document.getElementById('output');
const btnRecent = document.getElementById('recentSearch');
const endpoint = document.querySelector('#endpoint');
const inputSearch = document.getElementById('search');
const inputPage = document.getElementById('page');

const position = window.location.host;

const getEndpoint = (what) => {
  const search = inputSearch.value;
  const page = inputPage.value;
  let link = '';

  if (what === 'search')
    link = `${position}/search?q=${encodeURI(search)}${page !== '' ? '&page=' + page : ''}`
  else
    link = `${position}/recent-search`

  endpoint.textContent = `Endpoint: ${link}`;
}

const handleError = (message) => {
  endpoint.textContent = message;
}

inputSearch.addEventListener('input', () => {
  getEndpoint('search');
});

inputPage.addEventListener('input', () => {
  getEndpoint('search');
});

const isLoadind = () => {
  output.textContent = '';
  const loading = document.createElement('h3');
  loading.setAttribute('id', 'loading')
  loading.textContent = 'Loading...';
  output.appendChild(loading);
}

const isLoadindEnd = () => {
  const loading = document.getElementById('loading');
  loading.remove();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (inputSearch.value === '') {
    handleError('"q" is required');
    return;
  }

  isLoadind();
  const res = await fetch(`/search?q=${e.target.search.value}`);
  const data = await res.json();
  isLoadindEnd();

  output.textContent = JSON.stringify(data, null, 2);
  inputSearch.value = '';
  inputPage.value = '';
})

btnRecent.addEventListener('click', async () => {
  isLoadind();
  const res = await fetch('/recent-search');
  const data = await res.json();
  isLoadindEnd();

  output.textContent = JSON.stringify(data, null, 2);
  getEndpoint('recent');
})
