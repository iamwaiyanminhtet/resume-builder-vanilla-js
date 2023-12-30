// wrap input styling in module pattern to avoid error of reusing the same variable twice
const inputStyle = (function () {
    const inputs = document.querySelectorAll('.custom-input');
    function checkPlaceholder () {
        inputs.forEach(input =>  {
            let label = input.nextElementSibling;
            input.addEventListener('input', () => {
                if (input.value === '') {
                    label.style.top = '0';
                    label.style.fontSize = '1rem';
                    label.style.visibility = 'hidden';
                } else {
                    label.style.top = '-13px';
                    label.style.fontSize = '0.6rem';
                    label.style.visibility = 'visible';
                    label.style.fontFamily = 'Arial, Helvetica, sans-serif';
                }
            });
        })
    }
    return {checkPlaceholder}
})();
// call checkPlaceholder function to activate
inputStyle.checkPlaceholder();

// display input value simultaneously
function displayDynamicUserInput (input,display) {
    input.addEventListener('input',(e) => {
        let userInput = input.value;
        display.textContent = userInput;
    })
}

// all type text input array
let inputTextArray = [
    {
        'input' : document.querySelector('#name-input'),
        'display' : document.querySelector('#name-display')
    },
    {
        'input' : document.querySelector('#position-input'),
        'display' : document.querySelector('#position-display')
    },
    {
        'input' : document.querySelector('#email-input') ,
        'display' : document.querySelector('#email-display')
    },
    {
        'input' : document.querySelector('#phone-number-input'),
        'display' : document.querySelector('#phone-number-display')
    },
    {
        'input' : document.querySelector('#address-input'),
        'display' : document.querySelector('#address-display')
    },
    {
        'input' : document.querySelector('#about-me-input'),
        'display' : document.querySelector('#about-me-display')
    }
];
// sync display with input
inputTextArray.forEach(input => displayDynamicUserInput(input.input,input.display));

const educationRowAddBtn = document.querySelector('#add-education-row-btn'); // add btn
const educationRows = document.querySelector('.input-section-eduation-rows'); // input education rows
const educationRow = document.querySelector('.input-section-education-row'); // input education row
const displayEducation = document.querySelector('#display-education-info'); // ul list of display education

// education data row
let educationInputDateArray = [
    [
        {
            fromInput : document.querySelector('#education-from-input-1'),
            fromDisplay : document.querySelector('#education-from-display-1'),
        },
        {
            toInput : document.querySelector('#education-to-input-1'),
            toDisplay : document.querySelector('#education-to-display-1'),
        },
        {
            whereInput : document.querySelector('#education-where-input-1'),
            whereDisplay : document.querySelector('#education-where-display-1')
        }
    ]
];

// attach event listener to given row
function attachEventListener(row) {
    let curRowFrom = row[0];
    let curRowTo = row[1];
    let curRowWhere = row[2];

    curRowFrom.fromInput.addEventListener('change',(e) => {
        curRowFrom.fromDisplay.textContent = curRowFrom.fromInput.value;
    });

    curRowTo.toInput.addEventListener('change',(e) => {
        curRowTo.toDisplay.textContent = curRowTo.toInput.value;
    });

    displayDynamicUserInput(curRowWhere.whereInput,curRowWhere.whereDisplay)
}

educationInputDateArray.forEach((row) => {
    attachEventListener(row);
});


// add new education row
educationRowAddBtn.addEventListener('click',(e) => {
    // to use in class name base how many row in educationArray
    let index = educationInputDateArray.length + 1;
    
    // add new row in input section (UI)
    let inputHtml = `
        <div>
            <label for="education-from-input-${index}">From</label>
            <input type="date" name="from" id="education-from-input-${index}">
        </div>
        <div>
            <label for="education-to-input-${index}">To</label>
            <input type="date" id="education-to-input-${index}">
        </div>
        <div class="input-group">
            <input type="text" name="where" id="education-where-input-${index}" class="custom-input" placeholder="Where">
            <label id="education-where-input-${index}" class="custom-input-label" >Where</label>
        </div>
    `;
    let curRowDiv = document.createElement('div');
    curRowDiv.setAttribute('class','input-section-education-row');
    curRowDiv.innerHTML = inputHtml;
    educationRows.appendChild(curRowDiv);

    // add new row in display section (UI)
    let displayDateHtml = `
    <span id="education-from-display-${index}">0000-00-00</span> / <span id="education-to-display-${index}">0000-00-00</span>
    `;
    let displayWhereHtml = `
    <span id="education-where-display-${index}">Lorem ipsum dolor sit amet</span>
    `;
    let displayDateSpan = document.createElement('span');
    let displayDateLi = document.createElement('li');
    displayDateSpan.innerHTML = displayDateHtml;
    displayDateLi.innerHTML = displayWhereHtml;
    displayEducation.append(displayDateSpan,displayDateLi)

    // add new row(array) to educationInputDateArray
    let curRowArray = [
        {
            fromInput : document.querySelector(`#education-from-input-${index}`),
            fromDisplay : document.querySelector(`#education-from-display-${index}`),
        },
        {
            toInput : document.querySelector(`#education-to-input-${index}`),
            toDisplay : document.querySelector(`#education-to-display-${index}`),
        },
        {
            whereInput : document.querySelector(`#education-where-input-${index}`),
            whereDisplay : document.querySelector(`#education-where-display-${index}`)
        }
    ]
    educationInputDateArray.push(curRowArray);
    attachEventListener(curRowArray)
    console.log(displayDateHtml,inputHtml,curRowArray)
});

