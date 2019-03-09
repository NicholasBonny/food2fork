import React, { Component } from 'react';
import './App.css';
import { recipes } from "./tempList"
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'

class App extends Component {
  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=0ac35f9e9bed427c4b3d0997a6a5f318",
    base_url:"https://www.food2fork.com/api/search?key=0ac35f9e9bed427c4b3d0997a6a5f318",
    details_id:35382,
    pageIndex: 1, 
    search:"",
    query:'&q=',
    error: ''
  }

  async getRecipes(){
    try{
      const data = await fetch(this.state.url)
      const JsonData = await data.json()
      if(JsonData.recipes.length === 0){
        this.setState(()=>{
          return{error:'Sorry but your search did not return any result'}
        })
      }
      else{
        this.setState(()=>{
          return{
            recipes: JsonData.recipes
          }
        })
      }
    }catch (error){
      console.log(error)
    }
  }

  componentDidMount() {
    this.getRecipes()
  }

  handleIndex = index =>{
    this.setState({
      pageIndex:index
    })
  }

  handleDetails = (index, id)=>{
    this.setState({
      pageIndex:index,
      details_id: id
    })
  }

  handleChange = (e)=>{
    this.setState({
      search: e.target.value
    },
      console.log(this.state.search)
    )
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    const{base_url, query, search} = this.state
    this.setState(
      ()=>{
        return{url:`${base_url}${query}${search}`, search:""}
      },
      () =>{
        this.getRecipes()
      }
    )
  }

  displayPage = (index) =>{
    switch(index){
      default:
      case 1:
        return(<RecipeList 
          recipes={this.state.recipes}
          handleDetails={this.handleDetails}
          value={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          error={this.state.error} />)
      case 0:
        return (<RecipeDetails id={this.state.details_id} handleIndex={this.handleIndex} />)
    }
  }

  render() {
    // console.log(this.state.recipes)
    return (
      <React.Fragment>
        {this.displayPage(this.state.pageIndex)}
      </React.Fragment>
    );
  }
}

export default App;
