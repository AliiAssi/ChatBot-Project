// api.js
export const sendRequest = async (message) => {
    const URL = "https://510e-35-227-51-53.ngrok-free.app";
    const response = await fetch(`${URL}/predict?input=${encodeURIComponent(message)}`, {
      method: 'GET',
      headers: { 'ngrok-skip-browser-warning': 'true' },
      mode: 'cors'
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${errorText}`);
    }
  
    const data = await response.json();
    return { 
      id: Date.now() + 1, 
      text: data.result, 
      isBot: true 
    };
  };