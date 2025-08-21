document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.social-link img');

    function updateScale() {
        const center = window.innerHeight / 2;
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const imgCenter = rect.top + rect.height / 2;
            const distance = Math.abs(center - imgCenter);
            const maxDistance = center + rect.height / 2;
            const scale = Math.max(0.3, 1 - distance / maxDistance);
            img.style.transform = `scale(${scale})`;
        });
    }

    updateScale();
    window.addEventListener('scroll', updateScale);
    window.addEventListener('resize', updateScale);
});
