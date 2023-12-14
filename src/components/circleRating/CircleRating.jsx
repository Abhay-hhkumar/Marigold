import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./style.scss";

const CircleRating = ({ rating }) => {

    return (

        <div className="circleRating">
             <CircularProgressbar
                value={rating}

                // maxValue={10} set the we have to get rating out of 10 if we dont give maxvalue then rating will be taken out of 100
                maxValue={10}

                // text={rating} is use to show rating 7.1 ,7.2 1.3 etc
                text={rating}

                // we have to give custom style 
                // we take 'buildStyles' from library react-circular-progressbar/dist/styles.css
                styles={buildStyles({
                    // 'pathcolor' is color of progress bar which is in the form of circle
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;