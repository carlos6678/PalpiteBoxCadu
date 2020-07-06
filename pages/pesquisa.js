import React,{useState} from 'react';
import PageTitle from '../components/PagesTitle'

function Pesquisa() {
  const [form,setForm] = useState({
    Nome:'',
    Whatsapp:'',
    Email:'',
    Nota:5,
  })
  const [success,setSuccess] = useState(false)
  const [retorno,setRetorno] = useState({})

  const save = async ()=>{
     try{
      const response = await fetch('/api/save',{
        method:"post",
        body:JSON.stringify(form)
      })
 
      const data = await response.json()
      setSuccess(true)
      setRetorno(data)
     }catch(err){

     }
  }
  const onChange = e=>{
    const value = e.target.value
    const key = e.target.name

    setForm(old => ({
      ...old,
      [key]:value
    }))
  }
  return (
      <div className="pt-6">
          <PageTitle page="Pesquisa"/>
          <h1 className="text-center font-bold my-4 text-2xl">Sugestões e Criticas</h1>
          <p className="mt-12 text-center mb-6">O nosso Restaurante sempre busca atender melhor os clientes.<br/>
            Nos presamos por seu paladar e estamos sempre ovuindo sua opinião
          </p>

          {!success && <div className="w-1/5 mx-auto">
            <label className="font-bold">Seu nome:</label>
            <input type="text" className="p-4 block shadow-lg bg-blue-200 rounded my-2" placeholder="Nome" onChange={onChange} name="Nome" value={form.Nome}/>
            
            <label className="font-bold">Seu WhatsApp:</label>
            <input type="text" className="p-4 block shadow-lg bg-blue-200 rounded my-2" placeholder="WhatsApp" onChange={onChange} name="Whatsapp" value={form.Whatsapp}/>

            <label className="font-bold">Seu Email:</label>
            <input type="text" className="p-4 block shadow-lg bg-blue-200 rounded my-2" placeholder="E-mail" onChange={onChange} name="Email" value={form.Email}/>
            
            <label className="font-bold">Nota:</label>
            <div className="flex py-6">
              {[0,1,2,3,4,5].map(nota=>(
                <label className="block w-1/6 text-center">{nota}<br/><input type="radio" name="Nota" value={nota} onChange={onChange}/></label>
              ))}
            </div>
            <button onClick={save} className="bg-blue-400 px-6 py-4 font-bold rounded-lg shadow-lg hover:shadow">Salvar</button>

          </div>}
          {success && <div>
            <div class=" text-center mb-6 flex items-center bg-blue-400 text-white text-sm font-bold px-4 py-3" role="alert">
              <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
              <p>Muito obrigado por sua sugestão</p>
            </div>
            {
              retorno.cupomExists && <div className="text-center border p-4 mb-4">
                Seu Cupom:<br/>
                <strong className="text-4xl">{retorno.Cupom}</strong>
                </div>
            }
            {
              retorno.cupomExists && <div className="text-center border p-4 mb-4">
                Sua Promoção:<br/>
                <strong>{retorno.Promo}</strong>
                <br/>
                Tire uma foto dessa tela e apresente a o garçon
                </div>
            }
          </div>}
      </div>
  );
}
 
export default Pesquisa;