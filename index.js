document.addEventListener('DOMContentLoaded', function () {
    



        document.querySelector(".header").classList.remove("open");
        document.body.classList.remove("menu-open");
       
        document.getElementById("burger").addEventListener("click", () => {
            window.scrollTo({
                top: 0,
            });
            document.querySelector(".header").classList.toggle("open");
            document.body.classList.toggle("menu-open");
        });
       
        // document.querySelectorAll(".header__menu-link").forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const targetUrl = link.getAttribute("href");
       
                document.querySelector(".header").classList.remove("open");
                document.body.classList.remove("menu-open");
       
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300);
            });
        // });


















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
            }
            
            function closeAllCards() {
                cards.forEach(card => {
                    card.classList.remove('active');
                });
            }
            
            function updateServiceInfo(service, description) {
                actionButton.textContent = buttonTexts[service] || 'Записаться на консультацию';
                actionButton.innerHTML = actionButton.textContent + ' <i class="fas fa-arrow-right"></i>';
                
                descriptionElement.textContent = descriptionText[service] || "data1";
            }
            
            function updateActiveSegment(index) {
                segments.forEach(segment => {
                    segment.classList.remove('active');
                });
                segments[index].classList.add('active');
            }
            
            function scrollToCard(index) {
                const cardWidth = cards[0].offsetWidth + 4; 
                slider.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
                
                closeAllCards();
                cards[index].classList.add('active');
                
                const service = cards[index].getAttribute('data-service');
                updateServiceInfo(service, description);
                
                updateActiveSegment(index);
            }
            
            cards.forEach((card, index) => {
                card.addEventListener('click', function() {
                    const service = this.getAttribute('data-service');
                    
                    if (this.classList.contains('active')) {
                        this.classList.remove('active');
                        actionButton.textContent = 'Записаться на консультацию';
                        actionButton.innerHTML = actionButton.textContent + ' <i class="fas fa-arrow-right"></i>';
                        descriptionElement.textContent = 'data1';
                    } else {
                        closeAllCards();
                        this.classList.add('active');
                        updateServiceInfo(service, description);
                        
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
                const scrollWidth = slider.scrollWidth - slider.clientWidth;
                const scrollLeft = slider.scrollLeft;
                const progress = (scrollLeft / scrollWidth) * 100;
                
                const cardWidth = cards[0].offsetWidth + 4; 
                const activeIndex = Math.round(slider.scrollLeft / cardWidth);
                updateActiveSegment(activeIndex);
            }
            
            slider.addEventListener('scroll', updateScrollProgress);
            
            if (cards.length > 0) {
                const firstCard = cards[0];
                firstCard.classList.add('active');
                updateServiceInfo(
                    firstCard.getAttribute('data-service'),
                );
            }
        });