// Aplicação Vue.js da Calculadora
const { createApp } = Vue

createApp({
    data() {
        return {
            display: '0',
            numeroAnterior: null,
            operadorAtual: null,
            esperandoNovoNumero: false
        }
    },
    methods: {
        // Função para inserir números
        numero(num) {
            if (this.esperandoNovoNumero) {
                this.display = num
                this.esperandoNovoNumero = false
            } else {
                if (this.display === '0') {
                    this.display = num
                } else {
                    this.display = this.display + num
                }
            }
        },

        // Função para inserir ponto decimal
        decimal() {
            if (this.esperandoNovoNumero) {
                this.display = '0.'
                this.esperandoNovoNumero = false
            } else if (this.display.indexOf('.') === -1) {
                this.display = this.display + '.'
            }
        },

        // Função para operações matemáticas
        operacao(op) {
            const numeroAtual = parseFloat(this.display)

            if (this.numeroAnterior === null) {
                this.numeroAnterior = numeroAtual
            } else if (this.operadorAtual) {
                const resultado = this.executarCalculo()
                this.display = String(resultado)
                this.numeroAnterior = resultado
            }

            this.esperandoNovoNumero = true
            this.operadorAtual = op
        },

        // Função para calcular o resultado
        calcular() {
            if (this.operadorAtual && this.numeroAnterior !== null) {
                const resultado = this.executarCalculo()
                this.display = String(resultado)
                this.numeroAnterior = null
                this.operadorAtual = null
                this.esperandoNovoNumero = true
            }
        },

        // Função que executa o cálculo baseado no operador
        executarCalculo() {
            const anterior = this.numeroAnterior
            const atual = parseFloat(this.display)

            if (this.operadorAtual === '+') {
                return anterior + atual
            } else if (this.operadorAtual === '-') {
                return anterior - atual
            } else if (this.operadorAtual === '*') {
                return anterior * atual
            } else if (this.operadorAtual === '/') {
                if (atual === 0) {
                    return 'Erro'
                }
                return anterior / atual
            }
            return atual
        },

        // Função para limpar a calculadora
        limpar() {
            this.display = '0'
            this.numeroAnterior = null
            this.operadorAtual = null
            this.esperandoNovoNumero = false
        }
    }
}).mount('#app')
