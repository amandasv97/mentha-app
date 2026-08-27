export default async function handler(req, res) {
  try {
    const response = await fetch('https://app.vc/mentharutina');
    let html = await response.text();

    // Remove o modal/propaganda do FabApp
    // Remove divs que contêm "FabApp" ou "Crie seu próprio"
    html = html.replace(
      /<div[^>]*>[\s\S]*?Este é mais um App criado na FabApp[\s\S]*?<\/div>/gi,
      ''
    );

    // Remove outros elementos de propaganda comuns
    html = html.replace(/<div[^>]*class="[^"]*fabapp[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
    html = html.replace(/<div[^>]*id="[^"]*modal[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar a aplicação');
  }
}
