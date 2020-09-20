import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css';
import foodsJSON from './foods.json';
import FoodBox from './FoodBox.js';

function App() {
  let [toggle, setToggle] = useState(false);
  let [foodName, setFoodName] = useState('');
  let [foods, setFoods] = useState(foodsJSON);
  let [allFoods, setallFoods] = useState(foodsJSON);
  let [foodCalories, setFoodCalories] = useState('');
  let [newImage, setNewImage] = useState('');
  let [todaysFood, setTodaysFood] = useState({});

  const summonFields = () => {
    setToggle(!toggle);
  };

  const addTodaysFood = (food) => {
    console.log('addTodaysFood', food);
    // todaysFood.food = food
    let todaysFoodCopy = { ...todaysFood };
    todaysFoodCopy[food.name] = food;
    setTodaysFood(todaysFoodCopy);
  };

  const showTodaysFood = () => {
    let html = [];
    let totalCaloires = 0;
    let todaysFoodCopy = { ...todaysFood };
    for (let food in todaysFoodCopy) {
      html.push(
        <ul>
          <li>
            Name: <h3>{food}</h3>
          </li>
          <li>Quantity: {todaysFoodCopy[food].quantity}</li>
          <li>Calories: {todaysFoodCopy[food].calories}</li>
          <li>
            <img src={todaysFoodCopy[food].image} alt="" />
          </li>
        </ul>
      );
      totalCaloires +=
        Number(todaysFoodCopy[food].quantity) *
        Number(todaysFoodCopy[food].calories);
    }

    // return html;
    return (
      <div>
        totalCaloires {totalCaloires} {html}
      </div>
    );
  };
  const showFoods = () => {
    return foods.map((eachfood) => {
      return <FoodBox {...eachfood} addTodaysFoodProp={addTodaysFood} />;
    });
  };

  const showForm = () => {
    return toggle ? (
      <form onSubmit={submitFood}>
        <input
          placeholder="Enter food"
          type="text"
          name="food"
          onChange={(e) => setFoodName(e.target.value)}
        ></input>
        <input
          placeholder="Enter calories"
          type="text"
          name="calories"
          onChange={(e) => setFoodCalories(e.target.value)}
        ></input>
        <input
          placeholder="Enter image"
          type="url"
          name="image"
          onChange={(e) => setNewImage(e.target.value)}
        ></input>
        <button>Submit</button>
      </form>
    ) : null;
  };

  const submitFood = (e) => {
    e.preventDefault();
    let foodsCopy = [...foods];
    foodsCopy.unshift({
      name: foodName,
      calories: foodCalories,
      image: newImage,
    });
    setFoods(foodsCopy);
    setallFoods(foodsCopy);
  };
  //console.log(foodName, foodCalories)

  const searchFood = (e) => {
    console.log(e.target.value);
    let result = [...allFoods].filter((food) =>
      food.name.toLowerCase().includes(e.target.value)
    );
    setFoods(result);
  };
  console.log(todaysFood);
  return (
    <div className="App">
      <button onClick={summonFields}>Add New Food</button>
      <input
        onChange={searchFood}
        type="text"
        name="search"
        placeholder="Search"
        style={{ width: '100%' }}
      />
      {showTodaysFood()}
      {showForm()}
      {showFoods()}
    </div>
  );
}

export default App;