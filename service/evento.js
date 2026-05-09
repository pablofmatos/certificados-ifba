const fs = require("fs")
const URL_JSON = "./json/evento.json"

async function getTodosEventos() {
    return JSON.parse(fs.readFileSync(URL_JSON))
}

async function getEventoPorId(id) {
    const registros = await getTodosEventos()
    return registros.find(registro => registro.id == id || registro._id == id)
}

async function insereEvento(novoRegistro) {
    const registros = await getTodosEventos()
    registros.push(novoRegistro)
    fs.writeFileSync(URL_JSON, JSON.stringify(registros))
}

async function modificaEvento(modificacoes, id) {
    let registrosAtuais = await getTodosEventos()

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

async function removeEventoPorId(id) {
    const registros = await getTodosEventos()

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
    getTodosEventos,
    getEventoPorId,
    insereEvento,
    modificaEvento,
    removeEventoPorId
}
