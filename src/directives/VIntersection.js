export default {
    name: "intersection",
    mounted(el, binding) {
        console.log(el)
        const options = {
            rootMargin: '0px',
            threshold: 0,
        };

        const callback = (entries, observer) => {
            if (entries[0].isIntersecting) {
                binding.value()
            }
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    }
}