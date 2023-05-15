
    let documentElement = document.documentElement;
    let pixelRatio = window.devicePixelRatio || 1;
    let detailsBackIcon = document.querySelector('.backIcon');

    detailsBackIcon && detailsBackIcon.addEventListener('click',  () => history.go(-1));

    try {
        $(document).ready(function () {
            $('#records').DataTable();
        });
    } catch(err){
    
    }
    
    function setBodyFontSize() {
        document.body ? (document.body.style.fontSize = 12 * pixelRatio + "px") : document.addEventListener("DOMContentLoaded", n);
    }
    function setHtmlFontSize() {
        let e = documentElement.clientWidth / 10;
        e = e > 64 ? 64 : e;
        documentElement.style.fontSize = e + "px";
    }
    

    if(document.documentElement.classList.contains('hairlines')){
        setBodyFontSize(); setHtmlFontSize();
        window.addEventListener("resize", setHtmlFontSize);

        window.addEventListener("pageshow", (event) => {
            event.persisted && setHtmlFontSize();
        });
    if (pixelRatio >= 2) {
            let body = document.createElement("body"),
            s = document.createElement("div"); (s.style.border = ".5px solid transparent"),
            body.appendChild(s),
            documentElement.appendChild(body),
            1 === s.offsetHeight && documentElement.classList.add("hairlines"),
            documentElement.removeChild(body);
        }
    }
