
export const CONFIG = {
  // Toggle this to 'api' to use the real backend in production
  // In a real Vite/React app, this would be: import.meta.env.VITE_DATA_SOURCE || 'mock'
  SOURCE: 'mock' as 'mock' | 'api', 
  
  // The URL of your separate backend (e.g., Node, Python, Go)
  API_BASE_URL: 'http://localhost:3001/v1',
  
  // Simulation delay for mock data
  MOCK_DELAY: 400,
};