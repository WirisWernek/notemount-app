async function convertUrlToEpub(link, email) {
  try {
    const response = await fetch('http://192.168.18.39:3000/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link: link,
        email: email
      })
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Conversão bem-sucedida:', result);
    return result;
    
  } catch (error) {
    console.error('Erro ao converter URL para EPUB:', error);
    throw error;
  }
}

export { convertUrlToEpub };
