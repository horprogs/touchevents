(function () {
    'use strict';
    const Hammer = window.Hammer;
    class Game {
        constructor() {
            this.mc = new Hammer.Manager(document.querySelector('.js-grid'));
            this.arrResultId = [];
            this.itemsDOM = document.querySelectorAll('.js-item');
            this.resultDOM = document.querySelector('.js-result');
            this.init();
        }

        init() {
            this.mc.add(new Hammer.Pan({threshold: 5}));
            this.mc.on('pan', (ev) => {
                this.onPan(ev);
            });
        }

        onPan(ev) {
            this.location = ev.changedPointers[0];
            this.target = document.elementFromPoint(this.location.clientX, this.location.clientY);
            this.attr = this.target.getAttribute('data-id');
            if (!this.target.classList.contains('js-item')) {
                return;
            }
            this.target.classList.add('grid__item--selected');

            if (this.arrResultId.indexOf(this.attr) === -1) {
                this.addNewItem(this.attr);
            } else if (this.arrResultId[this.arrResultId.length - 2] === this.attr) {
                this.removePrevItem();
            }

            if (ev.isFinal) {
                this.onComplete();
            }

        }

        addNewItem(item) {
            this.arrResultId.push(item);
            this.render();
        }

        removePrevItem() {
            let items = this.itemsDOM;
            for (let i = 0; i < items.length; ++i) {
                if (items[i].getAttribute('data-id') === this.arrResultId[this.arrResultId.length - 1]) {
                    this.arrResultId.splice(this.arrResultId.length - 1, 1);
                    items[i].classList.remove('grid__item--selected');
                }
            }
            this.render();
        }

        render() {
            let result = [];
            this.arrResultId.forEach((el) => {
                let items = this.itemsDOM;
                for (let i = 0; i < items.length; ++i) {
                    if (items[i].getAttribute('data-id') === el) {
                        result.push(items[i].innerHTML);
                    }
                }
            });
            this.resultDOM.innerHTML = result.join('');
        }

        onComplete() {
            let items = this.itemsDOM;
            for (let i = 0; i < items.length; ++i) {
                items[i].classList.remove('grid__item--selected');
            }
            this.render();
            this.clear();
        }

        clear() {
            this.arrResultId.length = 0;
        }

    }

    let game = new Game();


}());