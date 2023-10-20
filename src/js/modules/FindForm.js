class FindForm {
    constructor(root) {
        this.root = root;
        this.init();
    }

    init() {
        const outputs = this.root.querySelectorAll('.input-group__elem');
        if(outputs.length > 0) {
            outputs.forEach((output) => {
                const href = output.getAttribute('data-href');
                const input = this.root.querySelector('#' + href);

                
                new FindFormElem(input, output, href.replace('find-', ''));
            })
        }
    }
}

class FindFormElem {
    constructor(input, output, mode) {
        this.inputNode = input;
        this.outputNode = output;
        this.lastInput;
        this.mode = mode;

        this.bindListeners();
    }

    calcPrice(inputs) {
        let fromInput = inputs[0];
        let toInput = inputs[1];

        let from = Number(fromInput.value);
        let to = Number(toInput.value);

        let min = 100000;
        let max = 1000*1000*100;

        if(from < min) {
            fromInput.value = min;
            from = min;
        }
        if(from > max) {
            fromInput.value = max;
            from = max;
        }

        if(to < min) {
            toInput.value = min;
            to = min;
        }
        if(to > max) {
            toInput.value = max;
            to = max;
        }

        if(from > to) {
            fromInput.value = this.lastInput.value;
            toInput.value = this.lastInput.value;
            from = Number(this.lastInput.value);
            to = Number(this.lastInput.value);
        }

        from = from / 1000000;
        to = to / 1000000;

        let result = `от ${from} до ${to} млн.₽`;

        this.outputNode.innerText = result;
    }

    calc(inputs) {
        switch (this.mode) {
            case 'price':
                this.calcPrice(inputs);
                break;
        }
    }

    bindListeners() {
        const inputs = this.inputNode.querySelectorAll('input');
        if(inputs.length > 0) {
            inputs.forEach((input) => {
                input.addEventListener('blur', (event) => {
                    this.lastInput = input;
                    this.calc(inputs);
                })
            })
        }
        console.log(this.inputNode, this.outputNode);
    }
}

export default FindForm;