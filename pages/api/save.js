import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'

const doc = new GoogleSpreadsheet(process.env.DOC_ID)

function generateCupom(){
    const code = parseInt(moment().format('DDMMYYHHmmssSSS')).toString(16).toUpperCase()
    return code.substr(0,4) + '-' + code.substr(4,4) + '-' + code.substr(8,4)
}

export default async(req,res)=>{
    await doc.useServiceAccountAuth({
        client_email:process.env.CLIENT_EMAIL,
        private_key:process.env.PRIVATE_KEY
    })
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[1]

    const data = JSON.parse(req.body)

    const sheetConfig = doc.sheetsByIndex[2]
    await sheetConfig.loadCells('A2:B2')

    const mostrarPromocao = sheetConfig.getCell(1,0)
    const textoCell = sheetConfig.getCell(1,1)

    let Cupom = ''
    let Promo = ''

    if(mostrarPromocao.value === "VERDADEIRO"){
        // GERAÇÃO DE CUPOM
        Cupom=generateCupom()
        Promo=textoCell.value
    }

    await sheet.addRow({
        Nome:data.Nome,
        Email:data.Email,
        Whatsapp:data.Whatsapp,
        Cupom,
        Promo,
        'Data de Preenchimento':moment().format('DD/MM/YYYY HH:mm:ss'),
        Nota:parseInt(data.Nota)
    })

    res.end(JSON.stringify({
        cupomExists:Cupom !== '',
        Cupom,
        Promo
    }))
}