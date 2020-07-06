import React from 'react';

function Footer() {
  return (
      <div className="bg-gray-700 p-4">
          <div className="container mx-auto text-center font-bold text-white">
            Projeto desenvolvido por:<span> </span>  
            <a className="hover:underline" href="">Carlos Eduardo</a> / 
            <a className="hover:underline" href="">Linkedin</a> / 
            <a className="hover:underline" href="">GitHub</a>
            <div className="mt-4"> 
                <h1 className="inline p-4">Fullstack</h1>
                <h1 className="inline p-4">WebMaster</h1>
            </div>
          </div>
      </div>
  );
}

export default Footer;