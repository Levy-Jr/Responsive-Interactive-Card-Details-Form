const form = document.querySelector('form')
const button = document.querySelector('.button')
const completeStateBtn = document.querySelector('.continue')
const completeState = document.querySelector('.complete-state')

// cards
const cards = document.querySelectorAll('.card')
const cardName = document.querySelector('.card__user')
const cardNumber = document.querySelector('.card__number')
const cardDate = document.querySelector('.card__date')
const cvc = document.querySelector('.card__cvc')
const monthCard = document.querySelector('.month')
const year = document.querySelector('.year')

// inputs
const inputs = document.querySelectorAll('input')
const cardHolder = document.querySelector('#cardholder')
const number = document.querySelector('#cardnumber')
const monthInput = document.querySelector('#MM')
const yearInput = document.querySelector('#YY')
const cardVerification = document.querySelector('#CVC')

//this oninput event occurs immediately when the value of an input element is changed
cardHolder.oninput = () => cardName.innerText = cardHolder.value
number.oninput = () => cardNumber.innerText = number.value
monthInput.oninput = () => monthCard.innerText = monthInput.value
yearInput.oninput = () => year.innerText = yearInput.value
cardVerification.oninput = () => cvc.innerText = cardVerification.value

const resetForm = () => {
  inputs.forEach((e)=>{
    e.value = ''
    e.style.border = '1px solid var(--Light-grayish-violet)'
    e.style.outline = '1px solid var(--Light-grayish-violet)'
  })
}


completeStateBtn.addEventListener('click', ()=>{
  form.style.display = 'block'
  completeState.style.display = 'none'
  
  resetForm()
})

form.addEventListener('submit', (e)=>{
  e.preventDefault()

  validateForm()
})

button.addEventListener('click', ()=>{
  validateForm()
})

let passes;

const validateForm = () => {
  passes = 0;

  validateUserCard()

  validateNumberCard()

  validateMonthInput()

  validateYearInput()

  validateCvcInput()

  if(passes == 5){
    form.style.display = 'none'
    completeState.style.display = 'block'
  }
}

const setSuccessFor = (input, message) => {
  const parentElement = input.parentElement
  const textError = parentElement.querySelector('.textError')

  input.style.border = '2px solid hsl(80, 88%, 57%)'
  textError.innerText = message
}

const setErrorFor = (input, message) => {
  const parentElement = input.parentElement
  const textError = parentElement.querySelector('.textError')

  input.style.border = '2px solid hsl(0, 100%, 66%)'
  textError.innerText = message
  textError.style.color = 'hsl(0, 100%, 66%)'
}

const validateUserCard = () => {
  if(cardHolder.value.trim() === ''){
    setErrorFor(cardHolder, `Can't be blank`)
  }
   else if (isString(cardHolder.value.trim())) {
    setErrorFor(cardHolder, 'Wrong format, letters only')
  }
   else if (validateNames(cardHolder.value.trim())){
    setErrorFor(cardHolder, 'At least 2 names')
  } 
  else{
    setSuccessFor(cardHolder, '')
    passes++
  }
}

const validateNumberCard = () => {
  if(number.value.trim() === ''){
    setErrorFor(number, `Can't be blank`)
  } else if(!onlyNumbers(number.value.trim())){
    setErrorFor(number, `Wrong format, numbers only`)
  } else if(number.value.trim().length !== 19){
    setErrorFor(number, 'Must be spaced every 4 characters and have at least 16 numbers')
  }
  else {
    setSuccessFor(number, '')
    passes++
  }
}

const validateMonthInput = () => {
  if(monthInput.value.trim() === ''){
    setErrorFor(monthInput, `Can't be blank`)
  } else if(monthInput.value.trim() > 12){
    setErrorFor(monthInput, `Invalid month`)
  }
  else if(monthInput.value.trim().length < 2){
    setErrorFor(monthInput, 'Incomplete')
  } else if (isNaN(monthInput.value.trim())){
    setErrorFor(monthInput, `Wrong format, numbers only`)
  }
   else {
    setSuccessFor(monthInput, '')
    passes++
  }
}

const validateYearInput = () => {
if(yearInput.value.trim() === ''){
  setErrorFor(yearInput, `Can't be blank`)
} else if(yearInput.value.trim() < 22){
  setErrorFor(yearInput, 'expired')
} 
else if(yearInput.value.trim().length < 2){
  setErrorFor(yearInput, `Incomplete`)
} else if(isNaN(yearInput.value.trim())){
  setErrorFor(yearInput, `Wrong format, numbers only`)
} 
else {
  setSuccessFor(yearInput, '')
  passes++
}
}

const validateCvcInput = () => {
  if(cardVerification.value.trim() === ''){
    setErrorFor(cardVerification, `Can't be blank`)
  } else if(cardVerification.value.trim().length < 3){
    setErrorFor(cardVerification, `Incomplete`)
  } else if(isNaN(cardVerification.value.trim())){
    setErrorFor(cardVerification, `Wrong format, numbers only`)
  }
  else{
    setSuccessFor(cardVerification, '')
    passes++
  }
}

//regex to check whether it contains an alphabet and space or not. It'll return true or false
const isString = (str) =>{
  return (/[^a-zA-Z\s]/.test(str))
}

//regex to check whether it contains only numbers and space or not.
const onlyNumbers = (str) => {
  return /^[0-9\s]+$/.test(str)
}

//this arrow function checks the length of the value using the method split, which separates a string when certain character is used and turn it into an array.
const validateNames = (value) => {
  const values = value.split(' ')

  if(values.length <= 1) {
    return true
  } else {
    return false
  }
}