export function dragEvent(dayname = false) {
    const slider = document.querySelector('.items');
    let isDown = false;
    let startX;
    let scrollLeft;

    if(slider) {
        if(dayname != ''){
            // Create the event
            var event = new CustomEvent("trigger-item", { "dayname": dayname });

            // Dispatch/Trigger/Fire the event
            slider.dispatchEvent(event);
            
            slider.addEventListener('trigger-item', (e) => {
                var id = "#item-" + dayname
                var elmnt = document.querySelector(id);                
                if(elmnt != null){
                    slider.scrollLeft = elmnt.offsetLeft - 40
                    // elmnt.classList.add('latency')
                    // setTimeout(function() { elmnt.classList.remove('latency') }, 1000)
                }
                // var x = elmnt.scrollLeft;
                // console.log(x)
            })
        }

        slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
        });
    }
}