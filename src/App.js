import React, { useState } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import foodsJson from './foods.json';
function App() {
  let [foods, setFoods] = useState(foodsJson);
  let [allFoods, setAllFoods] = useState(foodsJson);
  let [toggle, setToggle] = useState(false);
  let [newFoodName, setNewFoodName] = useState('');
  let [newFoodCalories, setNewFoodCalories] = useState('');



  return (
    <div className="App">
      <button onClick={handleFoodOrder}>Add New Add</button>
      {toggle ? (
        <form onSubmit={newFood}>
          <input
            style={{ marginTop: '40px' }}
            placeholder="Enter Food"
            onChange={foodName}
            type="text"
            name="food"
          />
          <input
            style={{ marginTop: '40px' }}
            placeholder="Enter Calories"
            onChange={foodCalories}
            type="text"
            name="calories"
          />
          <button>Submit</button>
        </form>
      ) : null}
      <input onChange={Search} type="text" name="search" placeholder="Search" style={{width: '100%'}} />
      <FoodBox />
    </div>
  );
  function FoodBox() {
    return foods.map((eachFood) => {
      return (
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={eachFood.image} alt="food pics" />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{eachFood.name}</strong> <br />
                  <small>{eachFood.calories} cal</small>
                </p>
              </div>
            </div>
            <div className="media-right">
              <div className="field has-addons">
                <div className="control">
                  <input className="input" type="number" value="1" />
                </div>
                <div className="control">
                  <button className="button is-info">+</button>
                </div>
              </div>
            </div>
          </article>
        </div>
      );
    });
  }
  function handleFoodOrder() {
    setToggle(!toggle);
  }
  function foodName(e) {
    setNewFoodName(e.target.value);
  }
  function foodCalories(e) {
    setNewFoodCalories(e.target.value);
  }
  function newFood(e) {
    e.preventDefault();
    let newFoods = [...foods];
    let someNewFoods = {
      name: newFoodName,
      calories: newFoodCalories,
      image: 'https://i.imgur.com/DupGBz5.jpg',
      quantity: 0,
    };
    newFoods.unshift(someNewFoods);
    setFoods(newFoods);
    setAllFoods(newFoods);
  }

  function Search(e){
    console.log(e.target.value)
    let results = [...allFoods].filter(food => food.name.toLowerCase().includes(e.target.value));
    setFoods(results)
    
  }
}
export default App;
