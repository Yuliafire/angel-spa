document.addEventListener('DOMContentLoaded', function () {

    document.querySelector(".header").classList.remove("open");
    document.body.classList.remove("menu-open");
    document.querySelector(".header__nav").style.display = "none";


    document.getElementById("burger").addEventListener("click", () => {
        window.scrollTo({
            top: 0,
        });
        document.querySelector(".header").classList.toggle("open");
        document.querySelector(".header__nav").style.display = "flex";
        document.body.classList.toggle("menu-open");
    });

    document.querySelectorAll(".header__menu-link").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetUrl = link.getAttribute("href");

            document.querySelector(".header").classList.remove("open");
            document.body.classList.remove("menu-open");
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    });

    const cards = document.querySelectorAll('.card');
    const slider = document.querySelector('.cards-accordion');
    const actionButton = document.getElementById('actionButton');
    const descriptionElement = document.getElementById('description');
    const segments = document.querySelectorAll('.scroll-segment');

    const buttonTexts = {
        'косметология': 'Записаться на консультацию по косметологии',
        'коррекция фигуры': 'Записаться на коррекцию фигуры',
        'SPA массажи': 'Забронировать SPA процедуры',
        'Wellness программы': 'Записаться на Wellness программу',
        'Beauty услуги': 'Записаться на Beauty услуги',
        'экзотические массажи': 'Забронировать массаж'
    };

    const descriptionText = {
        'косметология': 'data1',
        'коррекция фигуры': 'data2',
        'SPA массажи': 'data3',
        'Wellness программы': 'data4',
        'Beauty услуги': 'data5',
        'экзотические массажи': 'data6'
    };

    function closeAllCards() {
        cards.forEach(card => {
            card.classList.remove('active');
        });
    }

    function updateServiceInfo(service) {
        if (actionButton) {
            actionButton.textContent = buttonTexts[service] || 'Записаться на консультацию';
            actionButton.innerHTML = actionButton.textContent + ' <i class="fas fa-arrow-right"></i>';
        }
        if (descriptionElement) {
            descriptionElement.textContent = descriptionText[service] || 'data1';
        }
    }

    function setBeforeWidth(segment, isMobile) {
        const beforeWidths = {
            true: '40px',
            false: '5.625rem'
        };
        segment.style.setProperty('--before-width', beforeWidths[isMobile.toString()]);
    }

    function updateActiveSegment(index) {
        const isMobile = window.innerWidth <= 1000;
        const baseWidth = isMobile ? 40 : 142.4;
        const activeWidth = isMobile ? 40 : 260;

        segments.forEach((segment, i) => {
            segment.classList.remove('active');
            segment.style.width = `${isMobile ? 40 : 142.4}px`;
            setBeforeWidth(segment, isMobile);
            if (i === index) {
                segment.classList.add('active');
                segment.style.width = `${isMobile ? 40 : 260}px`;
                setBeforeWidth(segment, isMobile);
            }
        });
    }

    function scrollToCard(index) {
        if (!cards[index]) return;

        closeAllCards();
        cards[index].classList.add('active');

        let scrollLeft = 0;
        const gap = 4;
        for (let i = 0; i < index; i++) {
            scrollLeft += cards[i].offsetWidth + gap;
        }

        slider.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });

        const service = cards[index].getAttribute('data-service');
        updateServiceInfo(service);
        updateActiveSegment(index);
    }

    cards.forEach((card, index) => {
        card.addEventListener('click', function () {
            const service = this.getAttribute('data-service');
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                if (actionButton) {
                    actionButton.textContent = 'Записаться на консультацию';
                    actionButton.innerHTML = actionButton.textContent + ' <i class="fas fa-arrow-right"></i>';
                }
                if (descriptionElement) descriptionElement.textContent = 'data1';
                updateActiveSegment(-1);
            } else {
                closeAllCards();
                this.classList.add('active');
                scrollToCard(index);
            }
        });
    });

    segments.forEach((segment, index) => {
        segment.addEventListener('click', () => {
            scrollToCard(index);
        });
    });

    function updateScrollProgress() {
        let activeIndex = 0;
        let currentLeft = 0;
        const gap = 4;
        const scrollLeft = slider.scrollLeft;

        for (let i = 0; i < cards.length; i++) {
            const width = cards[i].offsetWidth + gap;
            if (scrollLeft < currentLeft + width / 2) {
                activeIndex = i;
                break;
            }
            currentLeft += width;
        }

        closeAllCards();
        cards[activeIndex].classList.add('active');
        updateServiceInfo(cards[activeIndex].getAttribute('data-service'));
        updateActiveSegment(activeIndex);
    }

    slider.addEventListener('scroll', updateScrollProgress);

    if (cards.length > 0) {
        const firstCard = cards[0];
        firstCard.classList.add('active');
        updateServiceInfo(firstCard.getAttribute('data-service'));
        updateActiveSegment(0);
    }

    window.addEventListener('resize', () => {
        const activeCard = document.querySelector('.card.active');
        if (activeCard) {
            const index = Array.from(cards).indexOf(activeCard);
            updateActiveSegment(index);
        }
    });
});
