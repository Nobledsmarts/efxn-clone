// betHeader
let betHeaderItems = [... document.querySelectorAll('.betHeader .item')];

let betDivs = [... document.querySelectorAll('.betDiv')];
let openGameHamburger = document.querySelector('.svg-icon.icon-zhankai_1');
let closeGameHamburger = document.querySelector('.svg-icon.icon-zhankai_2');
let topBoxToggler = document.querySelector('.right .dot');
let exitGameIcon = document.querySelector('.svg-icon.icon-close');
let gameDetailsIcon = document.querySelector('.svg-icon.icon-explain');
let gameInput = document.querySelector('.betOrder .input');
let selections = [];
let iconDelete = document.querySelector('.svg-icon.icon-delete');
let gameScrollBoxToggler = document.querySelector('.issue-wrap .hash');

let quickComputeBtns = document.querySelectorAll('.input-wrap .active');

let filterList = [... document.querySelectorAll('.filter-list .filter-item')];

let addresses = [... document.querySelectorAll('.address')];



betHeaderItems.forEach((betHeaderItem) => {
    betHeaderItem.addEventListener('click', (e) => {
        el = e.currentTarget;
        betHeaderItems.forEach((betHeaderItem2) => {
            let target = betHeaderItem.dataset.target;
            if(el === betHeaderItem2){
                betHeaderItem2.classList.add('active');
                document.querySelector(target).style.display = "block";
                return document.querySelector(target == '#cashed-out' ? '#ongoing' : '#cashed-out').style.display = 'none';
            } else{
                let target = betHeaderItem.dataset.target;
                betHeaderItem2.classList.remove('active');
            }
        });
    });
});

filterList.forEach((filterItem) => {
    filterItem.addEventListener('click', (e) => {
        filterList.forEach((filterItem2) => {
            if(e.currentTarget == filterItem2){
                filterItem2.classList.add('active');
            } else{
                filterItem2.classList.remove('active');
            }
        })
    });
});



const truncateToDecimal = (n, dec = 3) => {
    return (Math.floor(1000 * n) / 1000).toFixed(dec);
}

quickComputeBtns.forEach((quickComputeBtn) => {
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


// gameDetailsIcon.addEventListener('click', () => location.href = 'game-details.html');



let calculateValue = () => {
    inputValue = gameInput.value;
    let nums = [... document.querySelectorAll('.betMoneyInfo .num')];
    let result = inputValue * selections.length;

    nums[1].textContent = inputValue ? inputValue : '0.000';
    nums[2].textContent = result ? truncateToDecimal(result) : '0.000';
}

gameInput.addEventListener('input', () => calculateValue());



exitGameIcon.addEventListener('click', () => history.go(-1));

topBoxToggler.addEventListener('click', (e) => {
    let topBox = document.querySelector('.topBox.rule');
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

openGameHamburger.addEventListener('click', (e) => {
    document.querySelector('.sidePage').classList.add('showSidePage');
});
closeGameHamburger.addEventListener('click', (e) => {
    document.querySelector('.sidePage').classList.remove('showSidePage');
});

iconDelete.addEventListener('click', () => {
    [... document.querySelectorAll('.betMoneyInfo .num')].forEach((num, i) => {
        num.textContent = i == 2 ? '0.000' : 0;
    });
    gameInput.value = "";
    clearSelection();
});

// svg-icon icon-delete

betDivs.forEach((betDiv) => {
    betDiv.addEventListener('click', (e) => {
        let el = e.currentTarget;
        let targetClass = 'sel';
        classList = el.classList;
        let selection = {
            label : el.querySelector('.label').textContent.trim(),
            num : el.querySelector('.num')?.textContent.trim(),
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
    });
});

// svg-icon icon-delete

