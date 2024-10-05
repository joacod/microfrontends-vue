<template>
  <section :class="{ 'section-border': showTech }">
    <div class="main-title">
      <h1>Our Products</h1>
      <img v-if="showTech" :src="vueLogo" alt="Vue Logo" />
      <p v-if="showTech">
        Vue version: <strong>{{ vueVersion }}</strong>
      </p>
    </div>
    <div class="products">
      <ProductCard v-for="index in 12" :key="index" :productId="index" />
    </div>
  </section>
</template>

<script>
import ProductCard from './ProductCard.vue'
import {
  checkoutModule,
  techToggleModule,
} from '@joacod/microfrontends-utility'
import VueLogo from '@images/logo.png'
import packageJson from '../../package.json'

export default {
  name: 'ProductsPage',
  components: { ProductCard },
  data() {
    return {
      checkoutCount: checkoutModule.getItems().length,
      checkoutSubscription: null,
      showTech: techToggleModule.getTechOn(),
      toggleSubscription: null,
      vueLogo: VueLogo,
      vueVersion: packageJson.dependencies.vue.replace('^', ''),
    }
  },
  created() {
    this.checkoutSubscription = checkoutModule.items$.subscribe(() => {
      this.checkoutCount = checkoutModule.getItems().length
    })
    this.toggleSubscription = techToggleModule.techOn$.subscribe(() => {
      this.showTech = techToggleModule.getTechOn()
    })
  },
  beforeUnmount() {
    if (this.checkoutSubscription) {
      this.checkoutSubscription.unsubscribe()
    }
    if (this.toggleSubscription) {
      this.toggleSubscription.unsubscribe()
    }
  },
}
</script>

<style scoped>
section {
  border: 3px solid #fff;
}

.section-border {
  border: 3px solid #42b883;
}
.main-title {
  display: flex;
  align-items: center;
}

.main-title p {
  margin-left: 5px;
}

h1 {
  display: flex;
  align-items: center;
  font-size: 60px;
  color: #000;
  letter-spacing: 4px;
  text-shadow: 0.5px 0.5px #898989, 1px 1px #898989, 2px 2px #898989,
    2.5px 2.5px #5f5f5f, 3px 3px #5f5f5f, 3.5px 3.5px #5f5f5f, 4px 4px #5f5f5f,
    4.5px 4.5px #5f5f5f, 5px 5px #5f5f5f, 5.5px 5.5px #5f5f5f, 6px 6px #5f5f5f,
    6.5px 6.5px #5f5f5f, 7px 7px #5f5f5f, 7.5px 7.5px #5f5f5f;
}
img {
  width: 50px;
  margin-top: 10px;
  margin-left: 20px;
}
.products {
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  background-color: rgb(222, 222, 222);
  border-radius: 10px;
  box-shadow: 0 0 10px #666666;
  padding: 20px;
}
</style>
