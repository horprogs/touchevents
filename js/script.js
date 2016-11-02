'use strict';
(function () {
    let mc = new Hammer.Manager(document.querySelector('.js-grid'));
    let info = document.querySelector('.js-info');
    let arr = [];
    mc.add(new Hammer.Pan({threshold: 5}));
    mc.on('pan', (ev) => {
        console.log(ev)
        let target = ev.target;
        let attr = target.getAttribute('data-id');
        target.style.backgroundColor = '#CCC';
        if (arr.indexOf(attr) === -1) {
            arr.push(attr);
            document.querySelector('.js-result').innerHTML = arr.toString();
        }
    })
}());