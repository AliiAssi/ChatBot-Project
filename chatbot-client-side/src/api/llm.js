// api.js
export const sendRequest = async (message) => {
    const URL = "https://28d9-34-16-177-86.ngrok-free.app";
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