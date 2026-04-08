export default async function handler(req, res) {
  const { resource_id, limit } = req.query;
  const url = `https://dados.recife.pe.gov.br/api/action/datastore_search?resource_id=${resource_id}&limit=${limit}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Adiciona headers de cache para performance
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro no Proxy da API:', error);
    res.status(500).json({ error: 'Erro ao buscar dados da prefeitura' });
  }
}
