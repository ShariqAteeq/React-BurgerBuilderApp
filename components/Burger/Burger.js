import React from 'react';
import BurgerIng from './BurgerIng/BurgerIng';
import classes from './Burger.css';



const Burger = (props) => {

    let DynamicIng = Object.keys(props.ingredients).map(igkey => {  //this return keys like salad,bacon ..etc
        return [...Array(props.ingredients[igkey])].map((_,val)=>{ //tis return how many salad or meat etc will run
            return <BurgerIng key = {igkey+val} type = {igkey}  />;
        });
    }).reduce((arr,ele)=>{      //this is used to calculate all ingreduents
            return arr.concat(ele);     
            
    },[]);

//console.log(DynamicIng);

    if(DynamicIng.length === 0){
        DynamicIng = <h4>Please Add Ingredients!!</h4>;
    }

    return(
        <div className = {classes.Burger}>
            <BurgerIng type = "bread-top"  />
            {DynamicIng}
            <BurgerIng type = "bread-bottom" />
        </div>
    );
};

export default Burger;

/*
--keys methods take the object and return its keys not values in an array see e.g below
const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};

console.log(Object.keys(object1));
 output: Array ["a", "b", "c"]  


--reduce method When the loop starts the 
total value is the number on the far left (29.76) and the
 current amount is the one next to it (41.85).

const euros = [29.76, 41.85, 46.5];

const sum = euros.reduce((total, amount) => total + amount); 

output : sum  118.11

*/
