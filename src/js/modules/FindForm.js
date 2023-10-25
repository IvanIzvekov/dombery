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

        let min = 100;
        let max = 1000*100;

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

        from = from;
        to = to;

        let result = `от ${from} до ${to} тыс.₽`;

        this.outputNode.innerText = result;
    }

    calcSquare(inputs) {
        let fromInput = inputs[0];
        let toInput = inputs[1];

        let from = Number(fromInput.value);
        let to = Number(toInput.value);

        let min = 10;
        let max = 1000;

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

        let result = `от ${from} до ${to} м²`;

        this.outputNode.innerText = result;
    }

    calcSize(inputs) {
        const sizes = ["Студии", "1-к", "2-к", "3-к", "4+", "Таунхаус"];
        let count = 0;
        let result = ""
        inputs.forEach(item => {
            if(item.checked){
                result += sizes[count] + ", "; 
            }
            count++;
        });
        if(result.length>0){
            this.outputNode.innerText = result.slice(0, -2);
        }else{
            this.outputNode.innerText = "Кол-во комнат";
        }
        
    }

    calcAddress(inputs) {
        const addresses = ["Дзер.", "Калин.", "Кир.", "Лен.", "Октяб.", "Перв.", "Сов.", "Центр.", "Заель.", "Железн."];
        const full_name_addresses = ["Дзержинский", "Калининский", "Кировский", "Ленинский", "Октябрьский", "Первомайский", "Советский", "Центральный", "Заельцовский", "Железнодорожный"];
        let count = 0;
        let count_checked = 0;
        let result = "";
        inputs.forEach(item => {
            if(item.checked){
                count_checked++;
            }
        });
        if(count_checked<4){
            inputs.forEach(item => {
                if(item.checked){
                    result += full_name_addresses[count] + ", ";
                }
                count++;
            });
        }
        else if(count_checked = 0){
            result="Район";
            this.outputNode.innerText = result
            return;
        }
        else{
            inputs.forEach(item => {
                if(item.checked){
                    result += addresses[count] + "  ";
                }
                count++;
            });
        }
        this.outputNode.innerText = result.slice(0, -2);
    }

    calc(inputs) {
        switch (this.mode) {
            case 'price':
                this.calcPrice(inputs);
                break;
            case 'square':
                this.calcSquare(inputs);
                break;
            case 'size':
                this.calcSize(inputs);
                break;
            case 'address':
                this.calcAddress(inputs);
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