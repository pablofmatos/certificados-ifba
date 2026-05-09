const express = require("express")
const app = express()
app.use(express.json()) // para habilitar o uso do req.body em formato JSON

const port = 3000
const rota_evento = require("./router/evento.js")
const rota_atividade = require("./router/atividade.js")
const rota_tipoatividade_funcao = require("./router/tipoatividade_funcao.js")
const rota_certificado_modelo = require("./router/certificado_modelo.js")
const rota_certificado_usuario = require("./router/certificado_usuario.js")
const rota_configuracao = require("./router/configuracao.js")


app.use('/evento', rota_evento)
app.use('/atividade', rota_atividade)
app.use('/tipoatividade-funcao', rota_tipoatividade_funcao)
app.use('/certificado-modelo', rota_certificado_modelo)
app.use('/certificado-usuario', rota_certificado_usuario)
app.use('/configuracao', rota_configuracao)

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`)
})
