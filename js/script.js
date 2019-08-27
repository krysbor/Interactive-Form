

const nameInput = $('#name')
nameInput.focus()

const otherJobInput = $('#other-title')
otherJobInput.hide()

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

/* Updates color field */
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

const selectPaymentElement = $('#payment')
selectPaymentElement.on('change', (event) => {
    let inputValue = $(event.target).val()
    console.log(inputValue)
    if (inputValue === 'Credit Card') {
        $('#credit-card').show()
        $('#paypal').hide()
        $('#bitcoin').hide()
    } else if (inputValue === 'PayPal') {
        $('#paypal').show()
        $('#bitcoin').hide()
        $('#credit-card').hide()
    } else if (inputValue === 'Bitcoin') {
        $('#bitcoin').show()
        $('#credit-card').hide()
        $('#paypal').hide()
    }
})


