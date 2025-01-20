
interface ApiData {
  id: string; 
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
}
  
  const fetchUserData = async (): Promise<ApiData[] | null> => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-UrQ8rDcqgt6qBE99EkPqqVqV',
      },
    };
  
    try {
      const res = await fetch(url, options);
  
      if (!res.ok) {
        console.error('Error fetching data:', res.statusText);
        return null;
      }
  
      const data: ApiData[] = await res.json();
      return data; 
    } catch (error) {
      console.error('Fetch error:', error);
      return null; 
    }
  };

  export const apiData = async (): Promise<ApiData[] | null> => {
    return await fetchUserData();
  };
  