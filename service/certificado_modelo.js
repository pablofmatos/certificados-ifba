const fs = require("fs")
const URL_JSON = "./json/certificado_modelo.json"

async function getTodosCertificadoModelos() {
    return JSON.parse(fs.readFileSync(URL_JSON))
}

async function getCertificadoModeloPorId(id) {
    const registros = await getTodosCertificadoModelos()
    return registros.find(registro => registro.id == id || registro._id == id)
}

async function insereCertificadoModelo(novoRegistro) {
    const registros = await getTodosCertificadoModelos()
    registros.push(novoRegistro)
    fs.writeFileSync(URL_JSON, JSON.stringify(registros))
}

async function modificaCertificadoModelo(modificacoes, id) {
    let registrosAtuais = await getTodosCertificadoModelos()

    const indiceModificado = registrosAtuais.findIndex(
        registro => registro.id == id || registro._id == id
    )

    const conteudoMudado = {
        ...registrosAtuais[indiceModificado],
        ...modificacoes
    }

    registrosAtuais[indiceModificado] = conteudoMudado

    fs.writeFileSync(URL_JSON, JSON.stringify(registrosAtuais))

    return conteudoMudado
}

async function removeCertificadoModeloPorId(id) {
    const registros = await getTodosCertificadoModelos()

    const registrosFiltrados = registros.filter((registro) => {
        if (!registro || (registro.id != id && registro._id != id)) {
            return registro
        }
    })

    if (registros.length == registrosFiltrados.length) {
        return false
    } else {
        fs.writeFileSync(URL_JSON, JSON.stringify(registrosFiltrados))
        return true
    }
}

module.exports = {
    getTodosCertificadoModelos,
    getCertificadoModeloPorId,
    insereCertificadoModelo,
    modificaCertificadoModelo,
    removeCertificadoModeloPorId
}
