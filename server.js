const http = require('http');
const https = require('https');

const server = http.createServer(async (req, res) => {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.url === '/api/app') {
    try {
      https.get('https://app.vc/mentharutina', (response) => {
        let html = '';
        
        response.on('data', (chunk) => {
          html += chunk;
        });
        
        response.on('end', () => {
          // Remove propaganda
          html = html.replace(
            /<div[^>]*>[\s\S]*?Este é mais um App criado na FabApp[\s\S]*?<\/div>/gi,
            ''
          );
          
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(html);
        });
      }).on('error', (e) => {
        console.error('Erro:', e);
        res.writeHead(500);
        res.end('Erro ao carregar');
      });
    } catch (error) {
      res.writeHead(500);
      res.end('Erro');
    }
  } else {
    // Serve a página principal
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Méntha</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:linear-gradient(135deg,#eef3f9,#ffffff);
min-height:100vh;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
padding:40px 20px;
}

.container{
width:100%;
max-width:1100px;
text-align:center;
}

.logo{
width:85px;
border-radius:18px;
box-shadow:0 15px 35px rgba(0,0,0,0.2);
margin-bottom:15px;
}

.title{
font-size:34px;
font-weight:600;
color:#1d1d1d;
}

.subtitle{
margin-top:8px;
font-size:16px;
color:#666;
}

.phone-wrapper{
display:flex;
justify-content:center;
align-items:center;
margin-top:40px;
width:100%;
}

.phone{
width:360px;
height:720px;
background:#000;
border-radius:50px;
padding:14px;
box-shadow:
0 40px 80px rgba(0,0,0,0.25),
inset 0 0 0 2px #333;
position:relative;
animation:float 4s ease-in-out infinite;
}

@keyframes float{
0%{transform:translateY(0px);}
50%{transform:translateY(-10px);}
100%{transform:translateY(0px);}
}

.notch{
position:absolute;
top:8px;
left:50%;
transform:translateX(-50%);
width:120px;
height:24px;
background:#000;
border-radius:20px;
z-index:10;
}

.screen{
width:100%;
height:100%;
border-radius:36px;
overflow:hidden;
background:#fff;
position:relative;
}

.screen::before{
content:"";
position:absolute;
top:0;
left:0;
width:100%;
height:70px;
background:linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0));
z-index:4;
pointer-events:none;
}

iframe{
width:100%;
height:100%;
border:none;
}

.loader{
position:absolute;
width:100%;
height:100%;
background:white;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
z-index:5;
transition:opacity .6s ease;
}

.spinner{
width:42px;
height:42px;
border:4px solid #e5e5e5;
border-top:4px solid #28c76f;
border-radius:50%;
animation:spin 1s linear infinite;
margin-bottom:12px;
}

@keyframes spin{
0%{transform:rotate(0deg);}
100%{transform:rotate(360deg);}
}

.loader-text{
font-size:14px;
color:#666;
}

.cta{
margin-top:40px;
font-size:18px;
color:#222;
}

.footer{
margin-top:25px;
font-size:13px;
color:#777;
}

@media(max-width:480px){
.phone{
width:92vw;
height:80vh;
}

.title{
font-size:26px;
}
}
</style>
</head>
<body>
<div class="container">
<img class="logo" src="https://assets-fabapp.com/3282574/6db3220d808188f837999b0b15c4f0efa43adf64">
<div class="title">Méntha</div>
<div class="subtitle">
Recetas naturales personalizadas para el control de la glucosa
</div>

<div class="phone-wrapper">
<div class="phone">
<div class="notch"></div>
<div class="screen">
<div class="loader" id="loader">
<div class="spinner"></div>
<div class="loader-text">
Preparando tu rutina personalizada...
</div>
</div>
<iframe
src="/api/app"
onload="document.getElementById('loader').style.opacity='0'; setTimeout(()=>{document.getElementById('loader').style.display='none'},600)">
</iframe>
</div>
</div>
</div>

<div class="cta">
Responde algunas preguntas y descubre tu rutina natural personalizada.
</div>

<div class="footer">
© Méntha
</div>
</div>
</body>
</html>`;
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`🚀 Servidor rodando na porta \${PORT}\`);
});
