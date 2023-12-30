// GLOBAL FUNCTIONS
// display input value simultaneously
function displayDynamicUserInput (input,display) {
    input.addEventListener('input',(e) => {
        let userInput = input.value;
        display.textContent = userInput;
    })
}
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

// Sync Dynamically
const inputSync = (function () {
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
    function syncDynamically () {
        // sync display with input
        inputTextArray.forEach(input => displayDynamicUserInput(input.input,input.display));
    }
    return {syncDynamically};
})();
inputSync.syncDynamically();

// image
const imagePreview = (function () {
    function previewImg () {
        let imageInput = document.querySelector('#image-input');
        let imageDisplay = document.querySelector('#image-display');
        imageInput.addEventListener('change', (e) => {
            let input = e.target;
            let cur = e;
            if (e.target.files && e.target.files[0]) {
                let reader = new FileReader();
                reader.onload = function(load) {
                    imageDisplay.src = load.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
        })
    }
    return {previewImg}
})();
imagePreview.previewImg();

// education section
const educationSection = (function () {
    const addEducationRow = document.querySelector('#add-education-row-btn'); // add btn
    const removeEducationRow = document.querySelector('#remove-education-row-btn'); // minus btn
    const educationRows = document.querySelector('.input-section-education-rows'); // input education rows
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

    function initialiize () {
        educationInputDateArray.forEach((row) => {
            attachEventListener(row);
        });
    
        // add new education row
        addEducationRow.addEventListener('click',(e) => {
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
    
        // remove education row
        removeEducationRow.addEventListener('click', (e) => {
            if (educationRows.childElementCount === 1) {
                return
            }else {
                educationInputDateArray.pop();
                educationRows.lastElementChild.remove();
                displayEducation.lastElementChild.remove();
                displayEducation.lastElementChild.remove();
            }
        })
    } 
    return {initialiize};
})();
educationSection.initialiize();

// experience
const experienceSection = (function () {
    const addExperienceRow = document.querySelector('#add-experience-row-btn'); // add btn
    const removeExperienceRow = document.querySelector('#remove-experience-row-btn'); // minus btn
    const experienceRows = document.querySelector('.input-section-experience-rows'); // input education row
    const displayExperience = document.querySelector('#display-experience-info'); // ul list of display education

    // education data row
    let experienceInputDateArray = [
        [
            {
                fromInput : document.querySelector('#experience-from-input-1'),
                fromDisplay : document.querySelector('#experience-from-display-1'),
            },
            {
                toInput : document.querySelector('#experience-to-input-1'),
                toDisplay : document.querySelector('#experience-to-display-1'),
            },
            {
                whereInput : document.querySelector('#experience-where-input-1'),
                whereDisplay : document.querySelector('#experience-where-display-1')
            }
        ]
    ];

    function initialiize () {
        experienceInputDateArray.forEach((row) => {
            attachEventListener(row);
        });
    
        // add new education row
        addExperienceRow.addEventListener('click',(e) => {
            // to use in class name base how many row in educationArray
            let index = experienceInputDateArray.length + 1;
            
            // add new row in input section (UI)
            let inputHtml = `
                <div>
                    <label for="experience-from-input-${index}">From</label>
                    <input type="date" name="from" id="experience-from-input-${index}">
                </div>
                <div>
                    <label for="experience-to-input-${index}">To</label>
                    <input type="date" id="experience-to-input-${index}">
                </div>
                <div class="input-group">
                    <input type="text" name="where" id="experience-where-input-${index}" class="custom-input" placeholder="Where">
                    <label id="experience-where-input-${index}" class="custom-input-label" >Where</label>
                </div>
            `;
            let curRowDiv = document.createElement('div');
            curRowDiv.setAttribute('class','input-section-experience-row');
            curRowDiv.innerHTML = inputHtml;
            experienceRows.appendChild(curRowDiv);
    
            // add new row in display section (UI)
            let displayDateHtml = `
            <span id="experience-from-display-${index}">0000-00-00</span> / <span id="experience-to-display-${index}">0000-00-00</span>
            `;
            let displayWhereHtml = `
            <span id="experience-where-display-${index}">Lorem ipsum dolor sit amet</span>
            `;
            let displayDateSpan = document.createElement('span');
            let displayDateLi = document.createElement('li');
            displayDateSpan.innerHTML = displayDateHtml;
            displayDateLi.innerHTML = displayWhereHtml;
            displayExperience.append(displayDateSpan,displayDateLi)
    
            // add new row(array) to educationInputDateArray
            let curRowArray = [
                {
                    fromInput : document.querySelector(`#experience-from-input-${index}`),
                    fromDisplay : document.querySelector(`#experience-from-display-${index}`),
                },
                {
                    toInput : document.querySelector(`#experience-to-input-${index}`),
                    toDisplay : document.querySelector(`#experience-to-display-${index}`),
                },
                {
                    whereInput : document.querySelector(`#experience-where-input-${index}`),
                    whereDisplay : document.querySelector(`#experience-where-display-${index}`)
                }
            ]
            experienceInputDateArray.push(curRowArray);
            attachEventListener(curRowArray)
        });
    
        // remove education row
        removeExperienceRow.addEventListener('click', (e) => {
            if (experienceRows.childElementCount === 1) {
                return
            }else {
                experienceInputDateArray.pop();
                experienceRows.lastElementChild.remove();
                displayExperience.lastElementChild.remove();
                displayExperience.lastElementChild.remove();
            }
        })
    } 
    return {initialiize};
})();
experienceSection.initialiize();


// social media
const socialMediaSection = (function () {
    // add new social input btn
    const addSocialBtn = document.querySelector('#add-social-media-btn');
    const removeSocialBtn = document.querySelector('#remove-social-media');
    // input social media section layout
    const socialMediaInputLayout = document.querySelector('#input-section-social-media');
    const socialMediaDisplayLayout = document.querySelector('#social-media-display-layout');

    const socailMediaInputArray = [
        [
            {
                input : document.querySelector('#social-media-name-input-1'),
                display : document.querySelector('#socail-media-name-display-1')
            },
            {
                input : document.querySelector('#acc-link-input-1'),
                display : document.querySelector('#acc-link-display-1')
            }
        ]
    ];

    function initialiize () {
        socailMediaInputArray.forEach(socialMedia => {
            socialMedia.forEach(social => {
                displayDynamicUserInput(social.input,social.display);
            })
        });
    
        // add new social
        addSocialBtn.addEventListener('click', (e) => {
            let index = socailMediaInputArray.length + 1;
    
            // add new input UI
            let inputHtml = `
                <div class="input-group">
                    <input type="text" name="name" id="social-media-name-input-${index}" class="custom-input" placeholder="Social Media Name">
                    <label for="social-media-name-input-${index}" class="custom-input-label">Social Media Name</label>
                </div>
                <div class="input-group">
                    <input type="text" id="acc-link-input-${index}"  class="custom-input" placeholder="Acc-link">
                    <label for="acc-link-input-${index}" class="custom-input-label">Acc-link</label>
                </div>
            `;
            let curDiv = document.createElement('div');
            curDiv.setAttribute('class','input-section-intro');
            curDiv.innerHTML = inputHtml;
            socialMediaInputLayout.appendChild(curDiv);
    
            // add new display UI
            let displayHtml = `
            <span id="socail-media-name-display-${index}">Facebook </span> : <a href="https://www.facebook.com/example" id="acc-link-display-${index}">https://www.facebook.com/example</a>
            `;
            let curLi = document.createElement('li');
            curLi.innerHTML = displayHtml;
            
            socialMediaDisplayLayout.appendChild(curLi);
    
            // attach event listener
            let curArray = [
                {
                    input : document.querySelector(`#social-media-name-input-${index}`),
                    display : document.querySelector(`#socail-media-name-display-${index}`)
                },
                {
                    input : document.querySelector(`#acc-link-input-${index}`),
                    display : document.querySelector(`#acc-link-display-${index}`)
                }
            ];
            socailMediaInputArray.push(curArray);
            curArray.forEach(social => {
                displayDynamicUserInput(social.input,social.display);
            })
        }) 

        // remove social media
        removeSocialBtn.addEventListener('click', (e) => {
            socailMediaInputArray.pop();
            socialMediaInputLayout.lastElementChild.remove();
            socialMediaDisplayLayout.lastElementChild.remove();
        })
    }

    return {initialiize}
})();
socialMediaSection.initialiize();

// default btn
const defaultBtns = (function () {
    function showExample () {
        const example = document.querySelector('#exampleBtn');
        example.addEventListener('click',() => {
            window.location.reload();
        })
    }

    function printResume () {
        const print = document.querySelector('#print-resume');
        print.addEventListener('click', () => {
            window.print();
        })
    }
    return {showExample,printResume}
})();
defaultBtns.showExample();
defaultBtns.printResume();

