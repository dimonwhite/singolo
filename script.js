// header

let links = document.querySelectorAll('.navigation_link'),
    sections = document.querySelectorAll('.section');

const scrollSections = () => {
    let posScroll = window.scrollY;
    sections.forEach((item) => {
        if(item.offsetTop <= posScroll && (item.offsetTop + item.offsetHeight) > posScroll) {
            links.forEach((link) => {
                let parent = link.parentElement;
                parent.classList.remove('active');
                if(item.getAttribute('id') === link.getAttribute('href').substring(1)) {
                    parent.classList.add('active');
                }
            });
        }
    })
};

window.addEventListener('scroll', scrollSections);

// carousel

let carousel_items = document.querySelectorAll('.carousel_item'),
    currentItem = 0,
    isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + carousel_items.length) % carousel_items.length;
}

function hideItem(direction) {
    isEnabled = false;
    carousel_items[currentItem].classList.add(direction);
    carousel_items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    });
}

function showItem(direction) {
    carousel_items[currentItem].classList.add('next', direction);
    carousel_items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}

function nextItem(n) {
    hideItem('to_left');
    changeCurrentItem(n + 1);
    showItem('from_right');
}

function previousItem(n) {
    hideItem('to_right');
    changeCurrentItem(n - 1);
    showItem('from_left');
}

document.querySelector('.carousel_nav').addEventListener('click', (e) => {
    if (isEnabled) {
        if(e.target.classList.contains('carousel_nav_left')) {
            previousItem(currentItem);
        }
        if(e.target.classList.contains('carousel_nav_right')) {
            nextItem(currentItem);
        }
    }
});

// phone

let phones = document.querySelectorAll('.phone');

const clickPhone = function(e) {
    if (!this.querySelector('.shadow').contains(e.target)) {
        if (this.classList.contains('op')) {
            this.classList.remove('op');
        }
        else {
            this.classList.add('op');
        }
    }
};

phones.forEach(item => {
    item.addEventListener('click', clickPhone);
});

// portfolio

let portfolioImagesBlock = document.querySelector('.portfolio_block'),
    portfolioImages = portfolioImagesBlock.querySelectorAll('.portfolio_item');

const clickPortfolioImage = (e) => {
    if(e.target.tagName === 'IMG') {
        let elemClass = e.target.classList;
        if(elemClass.contains('active')) {
            elemClass.remove('active');
        }
        else {
            portfolioImagesBlock.querySelectorAll('.portfolio_item').forEach((item) => {
                item.classList.remove('active');
            });
            elemClass.add('active');
        }
    }
};

portfolioImagesBlock.addEventListener('click', clickPortfolioImage);

let portfolioLinks = document.querySelector('.portfolio_nav');

const filterBlocks = (topic) => {
        if(topic === 'All') {
            portfolioImages.forEach(item => {           
                portfolioImagesBlock.append(item);
            });
        }
        else {
            portfolioImages.forEach(item => {
                if(item.dataset.topic === topic) {
                    portfolioImagesBlock.prepend(item);
                }
            });
        }
    },
    clickPortfolioLink = (e) => {
    if( e.target.tagName === 'A' && !e.target.classList.contains('active') ) {
        e.preventDefault();
        portfolioLinks.querySelectorAll('.portfolio_nav_item .link').forEach((item) => {
            item.parentElement.classList.remove('active');
        });
        e.target.parentElement.classList.add('active');
        filterBlocks(e.target.dataset.link)
    }
};

portfolioLinks.addEventListener('click', clickPortfolioLink);

// form

let form = document.querySelector('.form'),
    popup = document.querySelector('.popup_wrapper');

popup.addEventListener('click', function(e) {
    if (!this.children[0].contains(e.target) || this.querySelector('.popup_close').contains(e.target)) {
        this.classList.remove('active');
        form.reset();
    }
});

const sendForm = e => {
    e.preventDefault();
    let formData = new FormData(e.target),
        subject = formData.get('subject') ? `Тема: ${formData.get('subject')}` : 'Без темы',
        message = formData.get('message') ? `Описание: ${formData.get('message')}` : 'Без описания';

    popup.querySelector('.subject').innerText = subject;
    popup.querySelector('.message').innerText = message;
    popup.classList.add('active');
} ;

form.addEventListener('submit', sendForm);

// burger

let burger = document.querySelector('.burger'),
    nav = document.querySelector('.navigation'),
    nav_wrapper = nav.querySelector('.navigation_wrapper');

const closeMenu = (burgerBtn) => {
    burgerBtn.classList.remove('active');
    nav_wrapper.classList.remove('active');
    nav.classList.remove('opacity');
    setTimeout(() => {
        nav.classList.remove('active');
    }, 600);
},
openMenu = (burgerBtn) => {
    burgerBtn.classList.add('active');
    nav_wrapper.classList.add('active');
    nav.classList.add('opacity', 'active');
};

burger.addEventListener('click', function() {
    if(this.classList.contains('active')) {
        closeMenu(this);
    }
    else {
        openMenu(this);
    }
});

nav.addEventListener('click', (e) => {
    if(!nav_wrapper.contains(e.target)) {
        closeMenu(burger);
    }
});

if(window.innerWidth < 768) {
    links.forEach(item => {
        item.addEventListener('click', () => {
            closeMenu(burger);
        });
    });
}