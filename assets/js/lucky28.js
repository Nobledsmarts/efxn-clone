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
let betBtn = document.querySelector('.betBtn');

let quickComputeBtns = document.querySelectorAll('.input-wrap .active');

let filterList = [... document.querySelectorAll('.filter-list .filter-item')];

let addresses = [... document.querySelectorAll('.address')];

let betModal = document.querySelector('.bet-modal');

let closeModal = betModal.querySelector('.svg-icon.icon-close');

const modal = {
    showModal(){
        backdrop('flex');
    },
    hideModal(){
        backdrop('none')
    }
}

closeModal.addEventListener('click', () => {
    timer.reset();
    modal.hideModal();
})

if(window.ClipboardJS){
    let clipboard = new ClipboardJS('.clipboard');

    clipboard.on('success', function(e) {
        let copied = tippy(e.trigger, {
            content: 'Copied!',
        });
        copied.show();

        let timeout = setTimeout(() => {
            copied.destroy();
            clearTimeout(timeout);
        }, 500);

        e.clearSelection();
    });
}



filterList.length && filterList.forEach((filterItem) => {
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

// input-wrap


gameScrollBoxToggler && gameScrollBoxToggler.addEventListener('click', () => {
    let scrollBox = document.querySelector('.scrollBox');
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

betBtn.addEventListener('click', (e) => {
    timer.start();
    document.querySelector('.selections')
        .innerHTML = selections.reduce((template, selection) => {
            return `
                ${template}
                <div class="selection">
                    <span class="label">${selection.label}</span>
                    <span class="num">${selection.num}</span>
                </div>
            `
    }, "");
    modal.showModal();
    sendToServer(selections);
});

function backdrop(action){
    betModal.style.display = action;
}

async function sendToServer(selections){
    try {
        let response = await fetch('apiEndPoint', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json",
                "X-Requested-With"  : "XMLHttpRequest"
              },
            body : JSON.stringify(selections)
        });
        let data = await response.json();
        
        console.log(data);
        
    } catch (err){
        console.log(err.message);
    } finally {
       //hide modal
        //modal.hideModal();
    }
}
// svg-icon icon-delete

