
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

const selectDesignElement = $('#design')
const selectDesignElementOptions = $('#design').children()
const hideElement = selectDesignElementOptions.eq(0)
hideElement.hide()



$('#color').children().eq(0).text('Please select a T-shirt theme')
$('#color').children().each((index) => {
    $('#color').children().eq(index).hide()
})

/* Updates color field when the user selects design theme */
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

selectDesignElement.on('change', updateColorField)


const totalCostElement = $('<p>Total cost: 0</p>')
let totalCost = 0
$('.activities').append(totalCostElement)

/* When the user selects an option, other conflicting activities are disabled */
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


let creditCardPayment = true
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
/* Checks if at least one checkbox under the "Register for Activities" section of the form is selected */
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


const validation = () => {
    let isCompleted = false
    const validationSuccess = 6
    let validationCompleted = 0
    const preventEmptyRegex = /^[^\s].*/
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const cardNumberRegex = /^\d{13,16}$/
    const zipCodeRegex = /^\d{5}$/
    const cvvRegex = /^\d{3}$/

    const name = $('#name').val()
    const email = $('#mail').val()
    const cardNumber = $('#cc-num').val()
    const zipCode = $('#zip').val()
    const cvv = $('#cvv').val()

    let checkboxesChecked = checkboxIsChecked()

    if (preventEmptyRegex.test(name)) {
        validationCompleted += 1
    }

    if (emailRegex.test(email) && preventEmptyRegex.test(email)) {
        validationCompleted += 1
    }

    if (creditCardPayment === true) {
        if (cardNumberRegex.test(cardNumber) && preventEmptyRegex.test(cardNumber)) {
            validationCompleted += 1
        }
        if (zipCodeRegex.test(zipCode) && preventEmptyRegex.test(zipCode)) {
            validationCompleted += 1
        }
        if (cvvRegex.test(cvv) && preventEmptyRegex.test(cvv)) {
            validationCompleted += 1
        }

    if (checkboxesChecked > 0) {
        validationCompleted += 1
    }

    }

    if (validationCompleted == validationSuccess) {
        isCompleted = true
    }
    return isCompleted
}



/* BUTTON ONLY FOR TESTING */
const testButton = $('<button id="test">VALtest</button>')
$('.container').append(testButton)

$('#test').on('click', () => {
    console.log(validation())
})