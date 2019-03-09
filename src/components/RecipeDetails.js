import React, { Component } from 'react'

import { recipe } from '../tempDetails'

export default class RecipeDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            recipe:recipe,
            url:`https://www.food2fork.com/api/get?key=0ac35f9e9bed427c4b3d0997a6a5f318&rId=${this.props.id}`
        }
    }

  async componentDidMount() {
    try{
        const data = await fetch(this.state.url)
        const JsonData = await data.json()
        this.setState({
          recipe: JsonData.recipe
        })
      }catch (error){
        console.log(error)
      }
  }

  render() {
    const{
        image_url,
        publisher,
        publisher_url,
        source_url,
        title,
        ingredients
    } = this.state.recipe
    
    const{handleIndex} = this.props

    return (
      <React.Fragment>
        <div className="container">
        <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
                <button
                type="button"
                className="btn btn-warning mb-5 text-capitalize"
                onClick={() => handleIndex(1)}
                >
                    back to recipe list
                </button>
                <img src={ image_url } className= "d-block w-100" alt="recipe" />                    
            </div>
            <div className="col-10 mx-auto col-md-6 my-3">
                <h6 className="text-uppercase">{ title }</h6>
                <h6 className="text-warning text-capitalize text_font">
                    provided by { publisher }
                </h6>
                <a 
                href={ publisher_url } 
                className="btn btn-primary mt-2 text-capitalize"
                target="_blank"
                ref="noopener noreferrer">
                    publisher webpage
                </a>
                <a 
                href={ source_url } 
                className="btn btn-success mt-2 mx-3 text-capitalize"
                target="_blank"
                ref="noopener noreferrer">
                    recipe url
                </a>
                <ul className="list-group mt-4">
                    <h2 className="mt-3 mb-4">Ingredients</h2>
                    {ingredients.map((item, index) =>{
                        return(
                            <li key={index} className="list-group-item text_font">
                                {item}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
        </div>
      </React.Fragment>
    )
  }
}
