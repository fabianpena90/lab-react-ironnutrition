import React, { useState } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import foodsJSON from './foods.json';
import FoodBox from './FoodBox.js'

function App() {
  const [toggle, setToggle] = useState(false);
  const [foods, setFoods] = useState(foodsJSON)
  const [foodName, setFoodName] = useState('')
  const [foodCalories, setFoodCalories] = useState('')
  const [foodImages, setfoodImages] = useState('')
  const [allFoods, setallFoods] = useState(foodsJSON);


  const showFoods = () => {
    return foods.map((eachfood) => {
      return <FoodBox {...eachfood} />;
    });
  };

  const showFields = () => {
    setToggle(!toggle);
  };


  const showForm = () => {
    return toggle ? (
      <form onClick={submitFood}>
        <input
          placeholder="Enter food"
          type="text"
          name="food"
        ></input>
        <input
          placeholder="Enter calories"
          type="text"
          name="calories"
        ></input>
        <input
          placeholder="Enter image"
          type="url"
          name="image"
        ></input>
        <button>Submit</button>
      </form>
    ) : null;
  };

  const submitFood = (e) => {
    e.preventDefault();
    // console.log('clicked');
    let newFood = [...foods]
    // console.log(newFood)
    newFood.unshift({
      name: foodName,
      calories: foodCalories,
      image: foodImages
    });
    setFoods(newFood)
    setallFoods(newFood)
  }

  const searchFood = (e) => {
    console.log(e.target.value)
    const result = [...allFoods].filter((food) => food.name.toLowerCase().includes(e.target.value));
    setFoods(result)
  }


  return (
    <div className="App">
      <button onClick={showFields}>Add New Food</button>
      <input
        onChange={searchFood}
        type="text"
        name="search"
        placeholder="Search"
        style={{ width: '100%' }}
      />
      {showForm()}
      {showFoods()}
     </div>
  )
}
export default App;
