import './Product.css';

const Product = (props: any) => {
    const {imageURL, name, price, description, category} = props.props;
    return (
        <div className="productCard">
            <img alt="product image" src={imageURL}
                 width="50%"/>
            <h4>{name}</h4>
            <p>{description}</p>
            <div>
                <a className='productPrice'>${price}</a>
                <a>{category}</a>
            </div>
            <p>
                <button>Add to Cart</button>
            </p>
        </div>
    )
}

export default Product;