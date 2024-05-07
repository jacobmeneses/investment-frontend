import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useShoppingCartStore = defineStore('shopping_cart', {
    state: () => ({ items_map:{ }, items: [], total: 0 }),
    actions: {
        add(item) {
            const existent_item = this.items_map[item.id]
            if ( existent_item ) {
                // just update
                this.total -= existent_item.item.total
                this.items_map[item.id].item = item
                this.items[ this.items_map[item.id].index_at_array ] = item
                this.total += item.total

            } else {
                this.items_map[item.id] = {
                    item,
                    index_at_array: this.items.length
                }
                this.items.push(item)
                this.total += item.total
            }
        },
        remove(item) {
            const existent_item = this.items_map[item.id]

            if ( existent_item ) {
                this.items.splice( existent_item.index_at_array, 1)
                this.total -= existent_item.item.total
                delete this.items_map[item.id]
            }
        }
    }
})
