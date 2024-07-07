export const htmlContent = (nombreEstudio) => {
  return `<html>
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
      <h1>Transforme su Estudio Jurídico con una Presencia Web Sólida</h1>
    </header>
    <main class="content">
      <p>Estimado/a ${nombreEstudio}:</p>
  
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
}
