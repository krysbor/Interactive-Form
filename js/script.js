

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
        $('#color').children().each((index) => {
            if (index < 3) {
            $('#color').children().eq(index).show()
            } else {
                $('#color').children().eq(index).hide()
            }
        })
    } else {
        $('#color').children().eq(0).text('Tomato (JS shirt only)')
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

$('.activities').on('change', (event) => {
    let targetElement = event.target
    let cost = parseInt($(targetElement).attr('data-cost').replace('$', ''))
    console.log(cost)
    if ($(event.target).is(':checked')) {
        totalCost += cost
        console.log(cost + 'added')
    } else {
        totalCost -= cost
        console.log(cost + 'substracted')
    }
    totalCostElement.text('Total cost: ' + totalCost)
})


