let firstNameBox = document.getElementById('firstNameBox')
console.log(firstNameBox)

let lastNameBox = document.getElementById('lastNameBox')
console.log(lastNameBox)

let fullName = document.getElementById('fullName')

let btnSubmit = document.getElementById('btnSubmit')
btnSubmit.addEventListener('click', function(){
    fullName.innerHTML = `${firstNameBox.value} ${lastNameBox.value}`
})