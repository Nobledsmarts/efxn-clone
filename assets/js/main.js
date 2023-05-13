// let descItem = document.querySelectorAll('.desc-item');

// ScrollReveal().reveal('.scroll-reveal', {
//     reset : true
// });

AOS.init();

window.addEventListener('scroll', () => {
    let links = [... document.querySelectorAll('.menu-bar .tabName')];
    let homeSection = document.querySelector('#index');
    let spotSection = document.querySelector('#exchange');
    let swapSection = document.querySelector('#swap');
    let optionSection = document.querySelector('#option');
    let gameSection = document.querySelector('#game');

    if(isInViewport(homeSection)){
        return links.forEach((link) => {
            let lnk = link.getAttribute('href');
            if(lnk.slice(1) == homeSection.getAttribute('id')){
                link.classList.add('active');
            } else{
                link.classList.remove('active');
            }
        })
    }
    if(isInViewport(spotSection)){
        return links.forEach((link) => {
            let lnk = link.getAttribute('href');
            if(lnk.slice(1) == spotSection.getAttribute('id')){
                link.classList.add('active');
            } else{
                link.classList.remove('active');
            }
        })
    }
    if(isInViewport(swapSection)){
        console.log('swap');
        return links.forEach((link) => {
            let lnk = link.getAttribute('href');
            console.log('here');
            if(lnk.slice(1) == swapSection.getAttribute('id')){
                link.classList.add('active');
            } else{
                console.log('else');
                link.classList.remove('active');
            }
        })
    }
    else if(isInViewport(optionSection)){
        return links.forEach((link) => {
            let lnk = link.getAttribute('href');
            if(lnk.slice(1) == optionSection.getAttribute('id')){
                link.classList.add('active');
            } else{
                link.classList.remove('active');
            }
        })
    }


    // links.forEach((link) => {
    //     // console.log(link.getAttribute('href'));
    //     let section = document.querySelector(link.getAttribute('href'));
    //     console.log(section);
    //     if(section){
    //         if(isInViewport(section)){
    //             link.classList.add('active');
    //         } else{
    //             link.classList.remove('active');
    //         }
    //     }
    // })
});

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}
function isElementVisible(el) {
    var rect     = el.getBoundingClientRect(),
        vWidth   = window.innerWidth || document.documentElement.clientWidth,
        vHeight  = window.innerHeight || document.documentElement.clientHeight,
        efp      = function (x, y) { return document.elementFromPoint(x, y) };     

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 
            || rect.left > vWidth || rect.top > vHeight)
        return false;

    // Return true if any of its four corners are visible
    return (
          el.contains(efp(rect.left,  rect.top))
      ||  el.contains(efp(rect.right, rect.top))
      ||  el.contains(efp(rect.right, rect.bottom))
      ||  el.contains(efp(rect.left,  rect.bottom))
    );
}