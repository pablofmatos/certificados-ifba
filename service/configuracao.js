const fs = require("fs")
const URL_JSON = "./json/configuracao.json"

async function getTodosConfiguracaos() {
    return JSON.parse(fs.readFileSync(URL_JSON))
}

async function getConfiguracaoPorId(id) {
    const registros = await getTodosConfiguracaos()
    return registros.find(registro => registro.id == id || registro._id == id)
}

async function insereConfiguracao(novoRegistro) {
    const registros = await getTodosConfiguracaos()
    registros.push(novoRegistro)
    fs.writeFileSync(URL_JSON, JSON.stringify(registros))
}

async function modificaConfiguracao(modificacoes, id) {
    let registrosAtuais = await getTodosConfiguracaos()

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

async function removeConfiguracaoPorId(id) {
    const registros = await getTodosConfiguracaos()

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
    getTodosConfiguracaos,
    getConfiguracaoPorId,
    insereConfiguracao,
    modificaConfiguracao,
    removeConfiguracaoPorId
}
