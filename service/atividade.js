const fs = require("fs")
const URL_JSON = "./json/atividade.json"

async function getTodosAtividades() {
    return JSON.parse(fs.readFileSync(URL_JSON))
}

async function getAtividadePorId(id) {
    const registros = await getTodosAtividades()
    return registros.find(registro => registro.id == id || registro._id == id)
}

async function insereAtividade(novoRegistro) {
    const registros = await getTodosAtividades()
    registros.push(novoRegistro)
    fs.writeFileSync(URL_JSON, JSON.stringify(registros))
}

async function modificaAtividade(modificacoes, id) {
    let registrosAtuais = await getTodosAtividades()

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

async function removeAtividadePorId(id) {
    const registros = await getTodosAtividades()

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
    getTodosAtividades,
    getAtividadePorId,
    insereAtividade,
    modificaAtividade,
    removeAtividadePorId
}
