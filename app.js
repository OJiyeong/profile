// copy 기능
class ClipboardManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                const targetId = e.target.dataset.copy;
                this.copyToClipboard(targetId, e.target);
            }
        });
    }

    async copyToClipboard(elementId, button) {
        const element = document.getElementById(elementId);
        const text = element.textContent;

        try {
            await navigator.clipboard.writeText(text);
            this.showTooltip(button, 'Copied!');
        } catch (err) {
            console.error('복사 실패:', err);
            this.showTooltip(button, 'Copy failed');
        }
    }

    showTooltip(element, message) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = message;

        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top + window.scrollY}px`;

        document.body.appendChild(tooltip);

        requestAnimationFrame(() => {
            tooltip.classList.add('tooltip--show');
        });

        setTimeout(() => {
            tooltip.classList.remove('tooltip--show');
            setTimeout(() => tooltip.remove(), 300);
        }, 1500);
    }
}

// 스크롤 효과
class ScrollAnimator {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.current = 0;
        this.isScrolling = false;
        this.navHeight = document.querySelector('nav').offsetHeight; // 네비 높이 계산
        this.init();
    }

    init() {
        window.addEventListener('wheel', (e) => this.onScroll(e), { passive: false });
    }

    onScroll(e) {
        const currentSection = this.sections[this.current];
        const sectionRect = currentSection.getBoundingClientRect();

        const remainingScroll = sectionRect.bottom - window.innerHeight;

        if ((e.deltaY > 0 && remainingScroll > 0) || (e.deltaY < 0 && sectionRect.top < 0)) {
            return; // 남은 영역 있으면 자연 스크롤
        }

        e.preventDefault();
        if (this.isScrolling) return;

        this.isScrolling = true;
        if (e.deltaY > 0) {
            this.current = Math.min(this.current + 1, this.sections.length - 1);
        } else {
            this.current = Math.max(this.current - 1, 0);
        }

        const targetSection = this.sections[this.current];
        const targetPosition = targetSection.offsetTop - this.navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        setTimeout(() => this.isScrolling = false, 800);
    }
}
new ScrollAnimator();




// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new ClipboardManager();
    new ScrollAnimator();
});