let ind = 0
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('#github-form')
    submitBtn.addEventListener('submit', handleSubmit)
})

function handleSubmit(e) {
    e.preventDefault();
    getAllResults(e.target.search.value)
} 

function handleRepoList(e) {
    e.preventDefault();
    getRepoList(e.target.innerHTML)
}

function renderSearch(login) {
     const userList = document.querySelector('#user-list')
     const userLogins = document.createElement('li')
     userLogins.className = `test${ind}`
     userLogins.innerHTML = `
        <button>${login}</button>
     `
     userList.appendChild(userLogins)
     document.querySelector(`li.test${ind}`).addEventListener('click', handleRepoList)
     ind++
 }

 function renderRepoList(repos){
    const repoUl = document.querySelector('#repos-list')
    const userRepos = document.createElement('li')
    userRepos.innerHTML = `
        <span>${repos}</span>
    `
    repoUl.appendChild(userRepos)
 }

function getAllResults(search) {
    fetch(`https://api.github.com/search/users?q=${search}`)
    .then(res => res.json())
    .then(data => {
        let testArr = [...data.items]
        testArr.forEach(item => renderSearch(item.login))
    })
}

function getRepoList(user) {
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(res => res.json())
    .then(data => {
        data.forEach(item => renderRepoList(item.archive_url))
    })
}

