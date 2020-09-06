const buttonSearch = document.querySelector("#search");
const inputName = document.querySelector("#user-name");
const listRepositories = document.querySelector("#app ul");
const avatarDivElement = document.querySelector("#avatar");

function resetFields() {
  listRepositories.innerHTML = "";
  avatarDivElement.innerHTML = "";
}

function searchUser(repositories) {
  let AVATAR_URL = repositories.data[0].owner.avatar_url;
  let NAME_AUTHOR = repositories.data[0].owner.login;
  let avatarImg = document.createElement("img");

  avatarImg.setAttribute("src", AVATAR_URL);
  avatarImg.setAttribute("alt", NAME_AUTHOR);
  avatarDivElement.appendChild(avatarImg);

  for (repository of repositories.data) {
    let REPOSITORY_NAME = document.createTextNode(repository.name);
    let REPOSITORY_ADDRESS = repository.html_url;

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", REPOSITORY_ADDRESS);
    linkElement.setAttribute("target", "_blank");
    linkElement.appendChild(REPOSITORY_NAME);

    let repositoryDescription = document.createElement("p");
    let DESCRIPTION_TEXT = document.createTextNode(repository.description);
    repositoryDescription.appendChild(DESCRIPTION_TEXT);

    let liElement = document.createElement("li");
    liElement.appendChild(linkElement);
    liElement.appendChild(repositoryDescription);

    listRepositories.appendChild(liElement);
  }
}

buttonSearch.onclick = function () {
  document.querySelector("#loading").innerHTML = "Carregando...";

  resetFields();

  let userName = inputName.value;

  axios
    .get(`https://api.github.com/users/${userName}/repos`)
    .then(function (data) {
      searchUser(data);
    })
    .catch(() => alert("Usuário inválido"));

  inputName.value = "";

  document.querySelector("#loading").innerHTML = "";
};
