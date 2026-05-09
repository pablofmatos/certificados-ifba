const {
    getCertificadoModelos,
    getCertificadoModelo,
    postCertificadoModelo,
    patchCertificadoModelo,
    removeCertificadoModelo
} = require("../controller/certificado_modelo.js")

const { Router } = require("express")

const router = Router()

router.get('/', getCertificadoModelos)
router.get('/:id', getCertificadoModelo)
router.post('/', postCertificadoModelo)
router.patch('/:id', patchCertificadoModelo)
router.delete('/:id', removeCertificadoModelo)

module.exports = router
