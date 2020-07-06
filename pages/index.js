import React from 'react'
import PageTitle from '../components/PagesTitle'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res=>res.json())

const Index = () =>{
    const {data,error} = useSWR('/api/getPromo',fetcher)
    return(
        <div>
           <PageTitle page="Home"/>
           <p className="mt-12 text-center">O nosso Restaurante sempre busca atender melhor os clientes.<br/>
            Nos presamos por seu paladar e estamos sempre ovuindo sua opinião
           </p>
           <div className="text-center my-12">
               <Link href="/pesquisa">
                   <a className="bg-blue-400 px-6 py-4 font-bold rounded-lg shadow-lg hover:shadow">Dê sua opinião ou sugestão</a>
               </Link>
           </div>
           {!data && <p>Carregando...</p>}
           {!error && data && data.cupomExists && (
               <p className="mt-12 text-center">
                    {data.message}
                </p>
           )}
        </div>
    )
}
 
export default Index