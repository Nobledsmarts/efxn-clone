// topModePanel
let topBetItems = [... document.querySelectorAll('.topModePanel .topBetItem')];
let modeItems = [... document.querySelectorAll('.wrapBox .modeItem')];
let betDivs = [... document.querySelectorAll('.betDiv')];
let openGameHamburger = document.querySelector('.svg-icon.icon-zhankai_1');
let closeGameHamburger = document.querySelector('.svg-icon.icon-zhankai_2');
let topBoxToggler = document.querySelector('.right .dot');
let exitGameIcon = document.querySelector('.svg-icon.icon-close');
let detailsBackIcon = document.querySelector('.backIcon');
let gameDetailsIcon = document.querySelector('.svg-icon.icon-explain');
let gameInput = document.querySelector('.betOrder .input');
let selections = [];
let iconDelete = document.querySelector('.svg-icon.icon-delete');
let gameScrollBoxToggler = document.querySelector('.issue-wrap .hash');


topBetItems.length && topBetItems.forEach((topBetItem) => {
    topBetItem.addEventListener('click', () => {
        topBetItems.forEach((topBetItem2) => {
            if(topBetItem2 == topBetItem){
                topBetItem2.classList.add('activeMode');
                console.log(topBetItem2.textContent.trim());
                getBetPanelTemplate(topBetItem2.textContent.trim());
            } else {
                topBetItem2.classList.remove('activeMode')   
            }
        })
    });
});

modeItems.length && modeItems.forEach((modeItem) => {
    modeItem.addEventListener('click', () => {
        modeItems.forEach((modeItem2) => {
            if(modeItem2 == modeItem){
                modeItem2.classList.add('activeMode')
            } else {
                modeItem2.classList.remove('activeMode')   
            }
        })
    });
});

let quickComputeBtns = document.querySelectorAll('.input-wrap .active');

const truncateToDecimal = (n, dec = 3) => {
    return (Math.floor(1000 * n) / 1000).toFixed(dec);
}

quickComputeBtns && quickComputeBtns.forEach((quickComputeBtn) => {
    quickComputeBtn.addEventListener('click', (e) => {
        let action = e.currentTarget.textContent;
        if(action == '/3'){
            gameInput.value = truncateToDecimal((gameInput.value / 3));
        } else if (action == 'x3'){
            gameInput.value = truncateToDecimal((gameInput.value * 3));
        }
        calculateValue();
    });
});

// input-wrap


gameScrollBoxToggler && gameScrollBoxToggler.addEventListener('click', () => {
    let scrollBox = document.querySelector('.scrollBox.LK28_STYLE');
    if(scrollBox.style.display == 'none'){
        document.querySelector('.mask.mask_history').style.display = "";
        scrollBox.style.display = "block";
    } else {
        document.querySelector('.mask.mask_history').style.display = "none";
        scrollBox.style.display = "none";
    }
    // scrollBox LK28_STYLE
});

gameDetailsIcon && gameDetailsIcon.addEventListener('click', () => location.href = 'game-details.html');

detailsBackIcon && detailsBackIcon.addEventListener('click',  () => history.go(-1));

let calculateValue = () => {
    inputValue = gameInput.value;
    let nums = [... document.querySelectorAll('.betMoneyInfo .num')];
    let result = inputValue * selections.length;

    nums[1].textContent = inputValue ? inputValue : '0.000';
    nums[2].textContent = result ? truncateToDecimal(result) : '0.000';
}

gameInput && gameInput.addEventListener('input', () => calculateValue());



exitGameIcon && exitGameIcon.addEventListener('click', () => history.go(-1));

topBoxToggler && topBoxToggler.addEventListener('click', (e) => {
    let topBox = document.querySelector('.topBox');
    if(topBox.style.display == 'none'){
        document.querySelector('.mask.mask_top').style.display = "";
        topBox.style.display = "";
    } else {
        document.querySelector('.mask.mask_top').style.display = "none";
        topBox.style.display = "none";
    }
})

const removeSelections = () => {
    betDivs.forEach((betDiv) => betDiv.classList.remove('sel'));
}

const clearSelection = () => {
    selections = [];
    removeSelections();
    updateSelectionCount();
}

const updateSelectionCount = () => {
    document.querySelector('.betMoneyInfo .num').textContent = selections.length;
}

openGameHamburger && openGameHamburger.addEventListener('click', (e) => {
    document.querySelector('.sidePage').classList.add('showSidePage');
});
closeGameHamburger && closeGameHamburger.addEventListener('click', (e) => {
    document.querySelector('.sidePage').classList.remove('showSidePage');
});

iconDelete && iconDelete.addEventListener('click', () => {
    [... document.querySelectorAll('.betMoneyInfo .num')].forEach((num, i) => {
        num.textContent = i == 2 ? '0.000' : 0;
    });
    gameInput.value = "";
    clearSelection();
});

// svg-icon icon-delete

betDivs && betDivs.forEach((betDiv) => {
    betDiv.addEventListener('click', betDivClickEvent);
});

function betDivClickEvent (e){
    let el = event.currentTarget;
        let targetClass = 'sel';
        classList = el.classList;
        let selection = {
            label : el.querySelector('.label').textContent.trim(),
            num : el.querySelector('.num').textContent.trim(),
        };
        if(classList.contains(targetClass)){
            selIdx = selections.findIndex((sel) => sel['label'] == selection['label'] && sel['num'] == selection['num']);
            selections.splice(selIdx, 1);
        } else {
            selections.push(selection);
        }
        el.classList[classList.contains(targetClass) ? 'remove' : 'add'](targetClass);
        updateSelectionCount();
        calculateValue();
}


function getBetPanelTemplate(activePanel){
    const wrapBoxItems = getWrapBoxItems();
    const betPanelContent = getPanelContent();
    let wrapBoxItemsTemplate = "";
    let betPanelTemplate = "";
    document.querySelector('.secondMode').style.display = "";


    if(activePanel == "Two sides"){
        wrapBoxItemsTemplate = wrapBoxItems['two-sides'].reduce((prev, curr) => {
            return prev+=`<div data-v-8566e9ca="" id="CRS" class="modeItem"> ${curr} </div>`

        }, "");
        betPanelTemplate = betPanelContent['two-sides'].reduce((prev, curr) => {
            return prev+=`<div data-v-8566e9ca="" class="betDiv">
                            <span data-v-8566e9ca="" class="label">${curr}</span>
                            <span data-v-8566e9ca="" class="num">2.07x</span>
                        </div>
                        `
        }, "");
        
    } else if( activePanel == '1st-10th'){
        wrapBoxItemsTemplate = wrapBoxItems['1st-10th'].reduce((prev, curr) => {
            return prev+=`<div data-v-8566e9ca="" id="CRS" class="modeItem"> ${curr} </div>`

        }, "");
        // let panelLabel = Object.
        betPanelTemplate = [...new Array(10)].reduce((prev, curr, idx) => {
            return prev+=`<div data-v-8566e9ca="" class="betDiv" onclick="betDivClickEvent()">
                            <span data-v-8566e9ca="" class="label">${idx + 1}</span>
                            <span data-v-8566e9ca="" class="num">9.75x</span>
                        </div>
                        `
        }, "");
    } else if(activePanel == 'Sum of 1st & 2nd'){
        betPanelTemplate = betPanelContent['Sum of 1st & 2nd'].reduce((prev, curr) => {
            return prev+=`<div data-v-8566e9ca="" class="betDiv" onclick="betDivClickEvent()">
                            <span data-v-8566e9ca="" class="label">${curr.label}</span>
                            <span data-v-8566e9ca="" class="num">${curr.num}</span>
                        </div>
                        `
        }, "");
        document.querySelector('.secondMode').style.display = "none";
    }
    document.querySelector('.secondMode .wrapBox').innerHTML = wrapBoxItemsTemplate;
    document.querySelector('.thirdMode .betPanel').innerHTML = betPanelTemplate;
}
function getWrapBoxItems(){
    return {
        'two-sides' : ['Sum of 1st & 2nd', 'Champions', 'Runner-up', '3rd place', '4th place', '5th place', '6th place', '7th place', '8th place', '9th place', '10th place'],
        '1st-10th' : ['Champions', 'Runner-up', '3rd place', '4th place', '5th place', '6th place', '7th place', '8th place', '9th place', '10th place']
    }
}
function getPanelContent(){
    return {
        'two-sides' : [ 'Big', 'Small', 'Odd', 'Even', 'Dragon', 'Tiger'],
        'Sum of 1st & 2nd' : [
            { label : 'Big', num : '2.07x' },
            { label : 'Small', num : '1.84x' },
            { label : 'Odd', num : '1.84x' },
            { label : 'Even', num : '2.07x' },
            { label : '3', num : '43.87x' },
            { label : '4', num : '43.87x' },
            { label : '5', num : '21.93x' },
            { label : '6', num : '21.93x' },
            { label : '7', num : '14.62x' },
            { label : '8', num : '14.62x' },
            { label : '9', num : '10.96x' },
            { label : '10', num : '10.96x' },
            { label : '11', num : '8.77x' },
            { label : '12', num : '10.96x' },
            { label : '13', num : '10.96x' },
            { label : '14', num : '14.62x' },
            { label : '15', num : '14.62x' },
            { label : '16', num : '21.93x' },
            { label : '17', num : '21.93x' },
            { label : '18', num : '43.87x' },
            { label : '19', num : '43.87x' },
        ],
    }
}
// svg-icon icon-delete

