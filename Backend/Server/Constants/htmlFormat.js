export const htmlContent = (nombreEstudio) => {
  //refactorizar pagina
  const messageImprove = `<html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
        }
        .container {
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #007BFF;
          color: #fff;
          padding: 10px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
        }
        .footer {
          background-color: #f4f4f4;
          padding: 10px;
          text-align: center;
          border-radius: 0 0 5px 5px;
          font-size: 12px;
          color: #aaa;
        }
      </style>
    </head>
    <body>
      <div class="container">
      <header class="header">
        <h1>Transforme su Estudio Jurídico con una Presencia Web Sólida: REFACCIONAR PAGINA</h1>
      </header>
      <main class="content">
        <p>Estimado ${nombreEstudio}:</p>
    
        <p>Mi nombre es Gino Ciancia y llevo más de un año especializándome en tecnologías relacionadas con el mundo web. Mi experiencia abarca tanto el ámbito del marketing digital como la creación de sitios web. Mi objetivo es impulsar negocios web, y me dedico específicamente a apoyar estudios jurídicos como el suyo.</p>
    
        <p>Estoy convencido de que una presencia web sólida puede transformar la forma en que su estudio se conecta con clientes potenciales y actuales. Al optimizar su sitio web y utilizar estrategias de marketing digital efectivas, su estudio no solo aumentará su visibilidad en línea, sino que también podrá ofrecer una experiencia más profesional y accesible para sus clientes.</p>
    
        <p>Me encantaría tener la oportunidad de discutir cómo puedo ayudar a su estudio a alcanzar estos objetivos. Estoy a su disposición para una reunión en la que podamos explorar las mejores soluciones para su caso específico.</p>
    
        <p>Agradezco de antemano su tiempo y consideración, y quedo a la espera de su respuesta para coordinar un encuentro.</p>
    
        
      </main>
      <footer class="footer">
        <p>Saludos cordiales,</p>
        <p>Gino Ciancia</p>
      </footer>
    </div>
    </body>
    </html>
     `
  const subjectImprove = `Lleve su Página Web al Siguiente Nivel: Refactorización y Modernización`

  //crear pagina
  const messageNewPage = `<html>
  <head>
        <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        width: 100%
      }
      .container {
        background-color: rgba(248, 248, 248, 0.7);
        max-width:50em;
        margin:auto;
        border-radius: 5px;
      }
      .header {
        background-color: #007BFF;
        color: #fff;
        padding: 10px;
        text-align: center;
        border-radius: 5px 5px 0 0;
        margin-bottom: 10px;
      }
      .container > p, h3 {
        padding: 0px 20px;
      }

      a{
        display:block;
        padding: 10px 15px;
        border-radius: 7px;
        background-color: #007BFF;
        color:white !important;
        text-decoration: none;
        text-align:center;
        max-width: 60%;
        margin: 30px auto;
        transition: scale 200ms, background-color 200ms;
      }

      a:hover{
        scale: 1.05;
        background-color: #006fe6;
      }

      .footer {
        background-color: #004a99;
        padding: 10px;
        text-align: center;
        border-radius: 0 0 5px 5px;
        font-size: 12px;
        color: #fff;
        margin-top: 20px;
      }      

    </style>
  </head>
  <body>
    <div class="container">
    <header class="header">
      <h1>Su Estudio Jurídico con una Presencia Web Sólida</h1>
    </header>
    <main class="content">
      <p>Estimado/a <b>${nombreEstudio}:</b></p>
  
      <p>Mi nombre es Gino Ciancia y soy desarrollador web. Llevo más de un año especializándome en tecnologías relacionadas con el mundo web, con experiencia en la creación de sitios web mediante código. Mi objetivo es impulsar negocios web, dedicándome específicamente a apoyar estudios jurídicos como el suyo.</p>
  
      <p>Estoy convencido de que una presencia web sólida puede transformar la forma en que su estudio se conecta con clientes potenciales y actuales. Al optimizar su sitio web, su estudio no solo aumentará su visibilidad en línea, sino que también podrá ofrecer una experiencia más profesional y accesible para sus clientes.</p>
      
      <p>He desarrollado un prototipo para que pueda observar las funcionalidades que se pueden aplicar en su proyecto. Cabe aclarar, es un prototipo que carece de contenido específico.</p>

      <h3>Ofrece: </h3>

      <ol>
        <li>
          <strong>
            Diseño Web Moderno y Responsivo:
          </strong>
          <p>
            Crearemos un sitio web que no solo sea visualmente atractivo, sino también <b>funcional y fácil de navegar desde cualquier dispositivo.</b>
          <p/>
        </li>
        <li>
          <strong>
            Optimización SEO:
          </strong>
          <p>
            Implementaremos estrategias SEO para asegurar que su estudio se destaque en los resultados de búsqueda, atrayendo así más tráfico y clientes potenciales.
          <p/>
        </li>
        <li>
          <strong>
            Experiencia del Usuario (UX): 
          </strong>
          <p>
            Mejoraremos la experiencia del usuario para que cada visitante de su sitio web encuentre la información que necesita de manera rápida y sencilla.
          <p/>
        </li>
      </ol>
  
      <a href="https://estudiojuridico-prototipo.netlify.app">Ir al prototipo</a>

      <p>Me encantaría tener la oportunidad de discutir cómo puedo ayudar a su estudio a alcanzar estos objetivos. Estoy a su disposición para una reunión en la que podamos explorar las mejores soluciones para su caso específico.</p>
  
      <p>Agradezco de antemano su tiempo y consideración, y quedo a la espera de su respuesta para coordinar un encuentro.</p>
  
      
    </main>
    <footer class="footer">
      <p>Saludos cordiales</p>
      <p>Gino Ciancia</p>
    </footer>
  </div>
  </body>
  </html>
   `
  const subjectNewPage = `Transforme su Presencia Online: Creación de Páginas Web para Estudios Jurídicos`

  return { messageImprove, subjectImprove, messageNewPage, subjectNewPage }
}
