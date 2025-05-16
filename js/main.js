/**
 * Studio Q Website Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // スライダー機能
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    
    // スライダーの初期化
    function initSlider() {
        if (sliderItems.length > 0) {
            // 最初のスライドをアクティブに
            sliderItems[0].classList.add('active');
            if (sliderDots.length > 0) {
                sliderDots[0].classList.add('active');
            }
            
            // 最初のスライドを表示
            showSlide(0);
            
            // 自動スライド開始
            startSlideInterval();
            
            // ドットのクリックイベント
            sliderDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                    resetSlideInterval();
                });
            });
            
            // 前へボタンのクリックイベント
            if (sliderPrev) {
                sliderPrev.addEventListener('click', () => {
                    prevSlide();
                    resetSlideInterval();
                });
            }
            
            // 次へボタンのクリックイベント
            if (sliderNext) {
                sliderNext.addEventListener('click', () => {
                    nextSlide();
                    resetSlideInterval();
                });
            }
            
            // スライダーにマウスオーバーしたとき自動スライドを停止
            const slider = document.querySelector('.slider');
            if (slider) {
                slider.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                });
                
                slider.addEventListener('mouseleave', () => {
                    startSlideInterval();
                });
            }
        }
    }
    
    // スライドを表示する関数
    function showSlide(index) {
        // 現在のスライドを非表示
        sliderItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // ドットの選択状態を更新
        sliderDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // 指定されたスライドを表示
        sliderItems[index].classList.add('active');
        sliderDots[index].classList.add('active');
        
        // 現在のスライドインデックスを更新
        currentSlide = index;
    }
    
    // 次のスライドを表示
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % sliderItems.length;
        showSlide(nextIndex);
    }
    
    // 前のスライドを表示
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
        showSlide(prevIndex);
    }
    
    // 自動スライド開始
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // 5秒ごとに切り替え
    }
    
    // 自動スライドのリセット
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // スライダーの初期化を実行
    initSlider();
    
    // モバイルメニュー
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const videoTriggers = document.querySelectorAll('.video-trigger');
    const videoModal = document.querySelector('.video-modal');
    const videoModalClose = document.querySelector('.video-modal-close');
    const videoFrame = document.querySelector('.video-frame');
    
    if (videoTriggers.length && videoModal && videoModalClose && videoFrame) {
        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                const videoUrl = this.getAttribute('data-video-url');
                if (videoUrl) {
                    videoFrame.src = videoUrl;
                    videoModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        videoModalClose.addEventListener('click', function() {
            videoModal.classList.remove('active');
            videoFrame.src = '';
            document.body.style.overflow = '';
        });
        
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                videoFrame.src = '';
                document.body.style.overflow = '';
            }
        });
    }
    
    const chatBot = document.querySelector('.chat-bot');
    const chatWindow = document.querySelector('.chat-window');
    
    if (chatBot && chatWindow) {
        chatBot.addEventListener('click', function() {
            chatWindow.classList.toggle('active');
        });
    }
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                
                const errorMessage = document.querySelector('.form-error-message');
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                }
                
                const firstErrorField = contactForm.querySelector('.error');
                if (firstErrorField) {
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstErrorField.focus();
                }
            }
        });
        
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                    
                    const errorFields = contactForm.querySelectorAll('.error');
                    if (errorFields.length === 0) {
                        const errorMessage = document.querySelector('.form-error-message');
                        if (errorMessage) {
                            errorMessage.style.display = 'none';
                        }
                    }
                }
            });
        });
    }
});

/**
 * ビデオサムネイルをクリックした時に動画を表示する関数
 */
function playIntroVideo(element) {
    // サムネイル要素を非表示にする
    element.style.display = 'none';
    
    // 親要素を取得
    const container = element.closest('.video-container');
    
    // iframe要素を含む要素を表示
    const videoIframe = container.querySelector('.video-iframe');
    videoIframe.style.display = 'block';
    
    // iframeのsrc属性を設定して動画を読み込む
    const iframe = videoIframe.querySelector('iframe');
    iframe.src = iframe.getAttribute('data-src');
}
