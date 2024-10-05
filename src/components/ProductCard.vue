<template>
  <div class="product-card">
    <img :src="getImagePath(currentProduct.image)" />
    <div class="product-info">
      <div class="info-content">
        <h5>{{ currentProduct.name }}</h5>
        <h6>${{ currentProduct.price }}</h6>
      </div>
      <button
        class="cart-btn"
        @click="addToCart"
        :disabled="isInCart"
        :class="{ disabled: isInCart }"
      >
        {{ isInCart ? 'Item in Cart' : 'Add to Cart' }}
      </button>
    </div>
  </div>
</template>

<script>
import { checkoutModule } from '@joacod/microfrontends-utility'
import { products } from './products.ts'

export default {
  name: 'ProductCard',
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isInCart: false,
    }
  },
  methods: {
    addToCart() {
      this.isInCart = true
      const currentProduct = this.currentProduct
      const newItem = {
        id: this.productId,
        name: currentProduct.name,
        price: currentProduct.price,
        image: this.getImagePath(currentProduct.image),
      }
      checkoutModule.addItem(newItem)
    },
    getImagePath(imageName) {
      return require(`@images/${imageName}`)
    },
  },
  computed: {
    // Select an item from the products array
    currentProduct() {
      let computedIndex = this.productId
      if (computedIndex > 5) {
        computedIndex = (computedIndex % 5) + 1
      }
      return products[computedIndex]
    },
  },
  mounted() {
    const cartItems = checkoutModule.getItems()
    this.isInCart = cartItems.some((item) => item.id === this.productId)
  },
}
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.product-card {
  margin: 2%;
  flex: 1 100%;
  border: 1px solid #a3a3a3;
  background-color: #fff;
  border-radius: 10px;
  transition: all 0.3s ease;

  @media screen and (min-width: 600px) {
    flex: 1 50%;
  }
  @media screen and (min-width: 800px) {
    flex: 1 25%;
  }
  @media screen and (min-width: 1080px) {
    flex: 1 20%;
  }

  .product-info {
    margin-top: auto;
    padding: 10px 20px 15px 20px;
    display: flex;
    justify-content: space-between;
  }

  .info-content {
    color: #5f5f5f;
  }

  .cart-btn {
    margin-left: auto;
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 8px;
    text-align: center;
    text-decoration: none;
    font-size: 13px;
    border-radius: 5px;
  }
  .cart-btn:hover {
    background-color: #2e8b57; /* Dark Sea Green for hover */
  }
  .cart-btn:active {
    background-color: #228b22; /* Forest Green for click */
  }
  .cart-btn.disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  &:hover {
    box-shadow: 0 0 30px #4caf50;
    border-color: #4caf50;
  }
}
</style>
