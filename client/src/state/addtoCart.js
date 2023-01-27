const [cart, setCart] = useState()

const addToCart = (productId, variantInfo) => {

    if(variantInfo) {
        commerce.cart.add(productId, 1, variantInfo)
            .then(res => {
                setCart(res.cart)
            })
    } else {
        window.alert('Please Select a Coffee')
    }
}