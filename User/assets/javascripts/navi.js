

function toggleDiv() {
    divShow = document.getElementById('content-of-mail');
    if (divShow.classList.contains('show')) {
        divShow.classList.remove('show');
        divShow.classList.toggle('close');
        divShow.style.transform = 'translateX(100%)';
    } else if (divShow.classList.contains('close')) {
        divShow.classList.remove('close');
        divShow.classList.toggle('show');
        divShow.style.transform = 'translateX(0)';
    } else {
        divShow.classList.toggle('show');
        divShow.style.transform = 'translateX(0)';
    }
};

function toggleDivBell() {
    divShow = document.getElementById('content-of-notice');
    if (divShow.classList.contains('show')) {
        divShow.classList.remove('show');
        divShow.classList.toggle('close');
        divShow.style.transform = 'translateX(100%)';
    }
    else if (divShow.classList.contains('close')){
        divShow.classList.remove('close');
        divShow.classList.toggle('show');
        divShow.style.transform = 'translateX(0%)';
    }
    else {
        divShow.classList.toggle('show');
        divShow.style.transform = 'translateX(0)';
    }
}

