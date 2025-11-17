// acessando o jsPDF
const { jsPDF } = window.jspdf

function criarPdf(qrDiv) {
    
    // buscando a img
    const QrElemento = qrDiv.querySelector('img') || qrDiv.querySelector('canvas')

    // convertendo para base64
    let imgData
    if (QrElemento.tagName === 'IMG') {
        imgData = QrElemento.src // img já está em base64
    } else if (QrElemento.tagName === 'CANVAS') {
        imgData = QrElemento.toDataURL('image/png') // converte canvas para base64
    }

    // criando o pdf
    const lado = 150
    const doc = new jsPDF({
        unit: 'mm',
        format: [lado, lado] // array com largura e altura
    })

    // inserir a imagem do qrcode no pdf
    const qrHeight = 100
    const qrWidth = 100

    const x = (lado - qrWidth) / 2
    const y = (lado - qrHeight) / 2

    doc.addImage(imgData, 'PNG', x, y, qrWidth, qrHeight)

    // salvar o pdf
    doc.save('QRCode.pdf')
}

function baixarQrCode() {
    // acessando a div que está o qrcode gerado
    const qrDiv = document.getElementById('qr-code')

    criarPdf(qrDiv) // chama a função que vai gerar o pdf e baixar
}

function gerarQrCode() {
    // pegando o link digitado
    const link = document.getElementById('link-input').value

    // validando link
    try {
        new URL(link)
        // link válido

        // pegando a div onde o qrcode será inserido
        let div = document.getElementById('qr-code')
        
        // limpando a div qrcode
        div.innerHTML = ''
        
        // criando o qrcode
        new QRCode(div, {
            text: link,
            colorDark: '#343A40',
            colorLight: 'transparent',
        })

        // limpando o input
        document.querySelector('#link-input').value = ''

        // pegando o obtao de baixar
        let botaoBaixar = document.getElementById('baixar-btn')
        botaoBaixar.disabled = false // deixa o botão clicavel
    } catch (error) {
        // link inválido
        const input = document.getElementById('link-input')

        // adiciona classe de erro
        input.classList.add('input-erro')

        //remove a classe após animação para poder repetir
        input.addEventListener('animationend', () => {
            input.classList.remove('input-erro')
            input.value = ''
        }, { once: true })
    }
}