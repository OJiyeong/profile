
// 클립보드 복사 기능
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
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const elements = document.querySelectorAll('.card, .experience-card, .project-card');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                    }
                });
            },
            { threshold: 0.1 }
        );

        elements.forEach(el => observer.observe(el));
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new ClipboardManager();
    new ScrollAnimator();
});