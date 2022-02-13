export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = null
      for (let item of context.state.cartList) {
        if (payload.iid === item.iid){
          oldProduct = item
        }
      }
      if (oldProduct){
        context.commit('addCounter',oldProduct)
        resolve('商品数量+1')
        // oldProduct.count++
      }else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
        // state.cartList.push(payload)
      }
    })
  }
}
