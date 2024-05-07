<script >
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { useShoppingCartStore } from '@/stores/shopping_cart'

import { defineComponent, computed } from 'vue';

const store = useShoppingCartStore();
const totalShoppingCart = computed(() => store.total)

export default defineComponent({
    components: { ShoppingCartOutlined, CloseOutlined },

    data() {
        return {
            totalShoppingCart,
            items: [
                { id: 1, company_name: 'CocaCola', total: 100000.50, days_limit: 30 },
                { id: 2, company_name: 'Nestle', total: 200000.50, days_limit: 60  },
                { id: 3, company_name: 'Pepsi', total: 80000.50, days_limit: 90  }
            ]
        };
    },
    methods: {
        add(e, item) {
            e.preventDefault()
            store.add(item)
            item.added = true
            console.log(item)
        },
        remove(e, item) {
            e.preventDefault()
            item.added = false
            store.remove(item)
        }
    }
});
</script>
<template>
    <div class="marketplace">
        <a-row>
            <a-col :span="20">
                <a-card v-for="(item, index) in items" :key="index" :title="item.company_name" :bordered="false" style="width: 300px">
                    <p>{{ item.total }}</p>
                    <p>Plazo: {{ item.days_limit }}</p>
                    <a-button v-if="item.added" @click="(e) => remove(e, item)" type="primary" danger shape="round" :size="size">
                        <template #icon>
                        <close-outlined />
                        </template>
                        Remove
                    </a-button>
                    <a-button v-else @click="(e) => add(e, item)" type="primary" shape="round" :size="size">
                        <template #icon>
                        <shopping-cart-outlined />
                        </template>
                        Invest
                    </a-button>
                </a-card>
            </a-col>
            <a-col :span="4">
                <p>Summary</p>
                <p>Total: {{ totalShoppingCart }}</p>
                <p>Earnings: </p>
                <p>Total + Earnings: </p>
                <a-button type="primary" shape="round" :size="size">
                        <template #icon>
                        <ShoppingCartOutlined />
                        </template>
                        Checkout
                </a-button>
            </a-col>
        </a-row>
    </div> 
</template>
<style>
.marketplace {
    min-height: 100vh;
    width: 100%;
}
</style>