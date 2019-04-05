const log = console.log;

function addComment(id, comment) {
  log(`/addcomment/${id}`);
  axios
    .post(`/addcomment/${id}`, { comment })
    .then((response) => location.reload())
    .catch((err) => log(err));
}

let commentField = document.querySelectorAll('.commentForm');

commentField.forEach((el) =>
  el.addEventListener('submit', (event) => {
    event.preventDefault();
    let id = event.target.getAttribute('data-mongoid')
    log(id)
    let children = event.target.childNodes;
    let comment = children.item(1).childNodes.item(0).nextElementSibling.value;
    log(comment);
    addComment(id, comment);

    //  block for adding new comments`<p class="card-text"></p>`
  }),
);
