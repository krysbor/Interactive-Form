
/* sets focus on name input by default */
const nameInput = $('#name')
nameInput.focus()

/* hides input for other job option until user selects 'Other' option in 'Job Role' menu */
const otherJobInput = $('#other-title')
otherJobInput.hide()

/* When user selects 'Other' job option additional text input appears */
const selectJobElement = $('#title')
selectJobElement.on('change', () => {
    if (selectJobElement.val() === 'other') {
        otherJobInput.show()
    }
})

/* Hides first option element*/
const selectDesignElement = $('#design')
const selectDesignElementOptions = $('#design').children()
const hideElement = selectDesignElementOptions.eq(0)
hideElement.hide()

/*Displays a hint to choose a T-shirt theme.
Hides all t-shirt color options until the user chooses a theme. */
$('#color').children().eq(0).text('Please select a T-shirt theme')
$('#color').children().each((index) => {
    $('#color').children().eq(index).hide()
})

/* Creates alert elements to show if a user makes a mistake or skips a field */
const nameAlert = $('<p class="alert" id="name-alert">The name field cannot be empty</p>')
const emailAlert = $('<p class="alert" id="email-alert">Please enter a valid email address</p>')
const activitiesAlert = $('<p class="alert" id="activities-alert">Please select at least one activity from list</p>')
const cardNumberAlert = $('<p class="alert" id="card-number-alert">Please enter a valid card number</p>')
const cardZipAlert = $('<p class="alert" id="zip-number-alert">Please enter a valid zip number</p>')
const cardCvvAlert = $('<p class="alert" id="cvv-code-alert">Please enter a valid cvv code</p>')

/* Hides all alert elements by default */
$('label[for="name"]').after(nameAlert)
nameAlert.hide()
$('label[for="mail"]').after(emailAlert)
emailAlert.hide()
$('.activities').children().eq(0).before(activitiesAlert)
activitiesAlert.hide()
$('label[for="cc-num"]').after(cardNumberAlert)
cardNumberAlert.hide()
$('label[for="zip"]').after(cardZipAlert)
cardZipAlert.hide()
$('label[for="cvv"]').after(cardCvvAlert)
cardCvvAlert.hide()


/* Updates color field when the user selects design theme.
The color options change depending on the theme you choose.
*/
const updateColorField = () => {
    if (selectDesignElement.val() === 'js puns') {
        $('#color').children().eq(0).text('Cornflower Blue (JS Puns shirt only)')
        $('#color').val('cornflowerblue')
        $('#color').children().each((index) => {
            if (index < 3) {
            $('#color').children().eq(index).show()
            } else {
                $('#color').children().eq(index).hide()
            }
        })
    } else {
        $('#color').children().eq(0).text('Tomato (JS shirt only)')
        $('#color').val('tomato')
        $('#color').children().each((index) => {
            if (index > 2) {
            $('#color').children().eq(index).show()
            } else {
                $('#color').children().eq(index).hide()
            }
        })
    }
}

/* Updates the color field when the user changes the theme */
selectDesignElement.on('change', updateColorField)

/* Creates an item to display the total cost of the selected activities.
Sets the cost to 0 by default
*/
const totalCostElement = $('<p>Total cost: 0</p>')
let totalCost = 0
$('.activities').append(totalCostElement)

/* When the user selects an option, other conflicting activities (which are at the same time) are disabled */
$('.activities').on('change', (event) => {
    let targetElement = event.target
    let cost = parseInt($(targetElement).attr('data-cost').replace('$', ''))
    let date = $(targetElement).attr('data-day-and-time')
    let activeCheckbox = $(targetElement)
    console.log(date)
    if ($(event.target).is(':checked')) {
        totalCost += cost
    } else {
        totalCost -= cost
    }
    totalCostElement.text('Total cost: $' + totalCost)


    let checkboxes = $('input[type="checkbox"]')
    checkboxes.each((index) => {
        let currentElement = checkboxes.eq(index)
        let eventData = currentElement.attr('data-day-and-time')
        console.log(eventData)
        if (eventData === date) {
            if ($(event.target).is(':checked')) {
                 currentElement.attr('disabled', 'true')
                } else {
                currentElement.removeAttr('disabled')
            }
        }

    })
activeCheckbox.removeAttr('disabled')
})


$('option[value="select method"]').remove()
$('#paypal').hide()
$('#bitcoin').hide()


/* Stores the boolean value:
- true when the user chooses to pay by credit card
- false if user chooses another method */
let creditCardPayment = true

/* Hides or shows relevant items depending on the selected payment method.
e.g When the user selects the paypal method, all credit card fields are hidden*/
const selectPaymentElement = $('#payment')
selectPaymentElement.on('change', (event) => {
    let inputValue = $(event.target).val()
    console.log(inputValue)
    if (inputValue === 'Credit Card') {
        creditCardPayment = true
        $('#credit-card').show()
        $('#paypal').hide()
        $('#bitcoin').hide()
    } else if (inputValue === 'PayPal') {
        creditCardPayment = false
        $('#paypal').show()
        $('#bitcoin').hide()
        $('#credit-card').hide()
    } else if (inputValue === 'Bitcoin') {
        creditCardPayment = false
        $('#bitcoin').show()
        $('#credit-card').hide()
        $('#paypal').hide()
    }
})

/* Checks if at least one checkbox under the
"Register for Activities" section of the form is selected.
Returns the number of selected checkboxes,
If the returned value is 0 - none of the checkboxes is selected */
const checkboxIsChecked = () => {
    const checkboxes = $('input[type="checkbox"]')
    let checkedCount = 0
    checkboxes.each((index) => {
        let currentCheckbox = checkboxes.eq(index)
        if (currentCheckbox.is(":checked")){
            checkedCount += 1
        }
    })
    return checkedCount
}

/* Uses regular expressions to check that the user has entered the correct information in the required fields
Displays messages near the invalid fields and changes the borders color of the input elements
*/
const validation = () => {
    /* Stores the boolean value:
    false - if one of the conditions does not meet the requirements
    true - if all conditions meet the requirements */
    let isCompleted = false

    /* Stores points required to successfully complete the validation process */
    let validationSuccess = 6

    /* Stores current points of completed conditions */
    let validationCompleted = 0

    /* Regex objects */
    const preventEmptyRegex = /^[^\s].*/
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const cardNumberRegex = /^\d{13,16}$/
    const zipCodeRegex = /^\d{5}$/
    const cvvRegex = /^\d{3}$/

    /* Values entered to be process by regular expressions */
    const name = $('#name').val()
    const email = $('#mail').val()
    const cardNumber = $('#cc-num').val()
    const zipCode = $('#zip').val()
    const cvv = $('#cvv').val()

    /* Stores the number of selected checkboxes */
    let checkboxesChecked = checkboxIsChecked()

    if (preventEmptyRegex.test(name)) {
        validationCompleted += 1
        $('#name').css('border', '2px solid #6F9DDC')
        nameAlert.hide()
    } else {
        $('#name').css('border', '3px solid red')
        nameAlert.show()
    }

    if (emailRegex.test(email) && preventEmptyRegex.test(email)) {
        validationCompleted += 1
        $('#mail').css('border', '2px solid #6F9DDC')
        emailAlert.hide()
    } else {
        $('#mail').css('border', '3px solid red')
        emailAlert.show()
    }

    /* Checks if the user has chosen a credit card payment method, and if so, checks the values entered */
    if (creditCardPayment === true) {
        if (cardNumberRegex.test(cardNumber) && preventEmptyRegex.test(cardNumber)) {
            validationCompleted += 1
            $('#cc-num').css('border', '2px solid #6F9DDC')
            cardNumberAlert.hide()
        } else {
            $('#cc-num').css('border', '3px solid red')
            cardNumberAlert.show()
        }
        if (zipCodeRegex.test(zipCode) && preventEmptyRegex.test(zipCode)) {
            validationCompleted += 1
            $('#zip').css('border', '2px solid #6F9DDC')
            cardZipAlert.hide()
        } else {
            $('#zip').css('border', '3px solid red')
            cardZipAlert.show()
        }
        if (cvvRegex.test(cvv) && preventEmptyRegex.test(cvv)) {
            validationCompleted += 1
            $('#cvv').css('border', '2px solid #6F9DDC')
            cardCvvAlert.hide()
        } else {
            $('#cvv').css('border', '3px solid red')
            cardCvvAlert.show()
        }
    } else {
        /* Changes the requirements for full verification
        when the user chooses a different payment method than the credit card */
        validationSuccess = 3
    }

    /* Checks if the user has selected at least one of the ckeckbox fields */
    if (checkboxesChecked > 0) {
        validationCompleted += 1
        $('.activities > legend').css('border', '')
        activitiesAlert.hide()
    } else {
        $('.activities > legend').css('border', '3px solid red')
        activitiesAlert.show()
    }


    /* If all conditions are met successfully, returns true */
    if (validationCompleted == validationSuccess) {
        isCompleted = true
    }
    return isCompleted
}


$('button[type="submit"]').on('click', (event) => {
    if (!validation()) {
        event.preventDefault()
    }
})
