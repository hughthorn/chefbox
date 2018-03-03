'use strict';

import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
class ProductDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            quantity: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderWithReviews = this.renderWithReviews.bind(this)
        this.numberToBuy = this.numberToBuy.bind(this)
    }

    render(){
        const product = this.props.product
        // const reviewsForOne = this.props.reviewsForOne
        // const categoriesForOne = this.props.categoriesForOne
        return (
            <div>
                {
                    this.props.product === undefined ?
                    <div /> : (
                    <div>
                        <img src={product.productImages[0].imageUrl} />
                        <div>
                            <div>
                                <div>
                                    <h1>{product.name}</h1>
                                    <span>{product.numberInStock} Available</span>
                                </div>
                                {/* <h2>{categoriesForOne}</h2> */}
                                <Link
                                    to={`/products/${product.id}/edit`}
                                >
                                    <button>Edit</button>
                                </Link>
                            </div>
                            <ul>
                                {product.ingredients
                                    .map(ingredient =>
                                        <li key={ingredient}>{ingredient}</li>
                                    )
                                }
                            </ul>
                            <h5>{product.timeToPrep} minutes</h5>
                            <h5>{product.calories} kcal</h5>
                            <h4>$ {product.price} + tax</h4>
                            <h3>{product.availability}</h3>
                            <p>{product.description}</p>
                            <div>
                                {
                                    product.availability === 'available' ?
                                    (
                                        <form onChange={this.handleChange} >
                                            <select name="quantity" >
                                                {
                                                    this.numberToBuy()
                                                }
                                            </select>
                                            <button onClick={this.handleSubmit}>
                                                Add to Cart
                                            </button>
                                        </form>
                                    ) : (
                                        <div />
                                    )
                                }
                            </div>
                            <div>
                                <h3>Customer Reviews</h3>
                                {
                                    this.props.reviewsForOne === undefined ?
                                    <p>There are no customer reviews yet.</p> :
                                    this.renderWithReviews()
                                }
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        )
    }


    numberToBuy(){
        const num = this.props.product.numberInStock
        let result = []
        for (var i = 0; i <= num; i++){
            result.push(<option key={i} >{i}</option>)
        }
        return result
    }

    handleChange(event){
        const quantity = event.target.quantity.value
        this.setState({ quantity })
    }

    handleSubmit(event){
        event.preventDefault()
        // const { updateCart } = this.props
        // updateCart(this.state)
    }

    renderWithReviews(){
        const reviewsForOne = this.props.reviewsForOne
        const product = this.props.product
        return (
            <div>
                <div>
                    {
                        reviewsForOne
                            .reduce((accu, curr, index, array) =>
                                (accu  + (curr/array.length)), 0)
                            .toFixed(1)
                    }
                </div>
                <div>{reviewsForOne.length} customer reviews</div>
                <ul>
                    {
                        reviewsForOne
                            .sort((pre, next) => pre.createdAt - next.createdAt)
                            .slice(0, 5)
                            .map(review => (
                                    <li key={review.id}>
                                        <div>
                                            <div>{review.rating}</div>
                                            <div>{review.title}</div>
                                        </div>
                                        <div>{review.createdAt}</div>
                                        <div>Verified Purchase</div>
                                        <div>{review.content}</div>
                                    </li>
                                ))
                            }
                        })
                    }
                </ul>
                <Link to={`/products/${product.id}/reviews`}>
                    See all 66 reviews
                </Link>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = ({ products, user }, ownProps) => {
    // <=== need review, cart, categories as well
    const paramId = Number(ownProps.match.params.productId)
    const product = products.find(product => product.id === paramId)
    // const reviewsForOne = reviews.filter(review => review.productId === paramId)
    return {
        user,
        product,
        // reviewsForOne,
        // categoriesForOne,
    }
}

// const mapDispatch = dispatch => {
// }

export default connect(mapState)(ProductDetail)
