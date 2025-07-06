const BASE_URL = 'https://veryfast.io/t/front_test_api.php';

class ProductService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchProducts() {
    try {
      const response = await fetch(this.baseUrl);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result.elements;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}

export default new ProductService(BASE_URL);
