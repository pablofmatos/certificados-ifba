const fs = require("fs")
const URL_JSON = "./json/tipoatividade_funcao.json"

async function getTodosTipoAtividadeFuncaos() {
    return JSON.parse(fs.readFileSync(URL_JSON))
}

async function getTipoAtividadeFuncaoPorId(id) {
    const registros = await getTodosTipoAtividadeFuncaos()
    return registros.find(registro => registro.id == id || registro._id == id)
}

async function insereTipoAtividadeFuncao(novoRegistro) {
    const registros = await getTodosTipoAtividadeFuncaos()
    registros.push(novoRegistro)
    fs.writeFileSync(URL_JSON, JSON.stringify(registros))
}

async function modificaTipoAtividadeFuncao(modificacoes, id) {
    let registrosAtuais = await getTodosTipoAtividadeFuncaos()

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

async function removeTipoAtividadeFuncaoPorId(id) {
    const registros = await getTodosTipoAtividadeFuncaos()

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
    getTodosTipoAtividadeFuncaos,
    getTipoAtividadeFuncaoPorId,
    insereTipoAtividadeFuncao,
    modificaTipoAtividadeFuncao,
    removeTipoAtividadeFuncaoPorId
}
