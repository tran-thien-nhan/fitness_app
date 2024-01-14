import React, { useState, useEffect } from 'react';

function Fitness() {
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [activityLevel, setActivityLevel] = useState(1.2);
    const [bmr, setBmr] = useState(0);
    const [tdee, setTdee] = useState(0);
    const [bodyFatPercentage, setBodyFatPercentage] = useState(0);
    const [leanBodyMass, setLeanBodyMass] = useState(0);
    const [weightToLose, setWeightToLose] = useState(0);
    const [weightToGain, setWeightToGain] = useState(0);
    const [exercise, setExercise] = useState('squat');
    const [weightPlate, setWeightPlate] = useState(0);  // 20 kg
    const [reps, setReps] = useState(0);
    const [oneRepMax, setOneRepMax] = useState(0);
    const [recommendation, setRecommendation] = useState('');

    useEffect(() => {
        const calculateBMR = () => {
            const genderFactor = gender === 'male' ? 5 : -161;
            const calculatedBmr =
                88.362 + 13.397 * weight + 4.799 * height - 5.677 * age + genderFactor;
            setBmr(calculatedBmr);
        };

        const calculateTDEE = () => {
            const calculatedTdee = bmr * activityLevel;
            setTdee(calculatedTdee);
        };

        const calculateBodyFatPercentage = () => {
            const bmi = weight / Math.pow(height / 100, 2);
            const calculatedBodyFatPercentage =
                (0.29669 * bmi) +
                (0.00043 * Math.pow(bmi, 2)) -
                (0.000128 * age) -
                0.0000055;
            setBodyFatPercentage(calculatedBodyFatPercentage);
        };

        const calculateLeanBodyMass = () => {
            // Lean mass estimation based on activity level
            const leanMass = weight * (1 - 0.05 * activityLevel);
            setLeanBodyMass(leanMass);
        };

        const calculateWeightToLose = () => {
            // Assume target body fat percentage is 20% for example
            const targetBodyFatPercentage = 20;
            const targetBodyFatDecimal = targetBodyFatPercentage / 100;
            const targetWeight = weight - weight * targetBodyFatDecimal;
            setWeightToLose(weight - targetWeight);
        };

        const calculateWeightToGain = () => {
            // If the person is too lean (arbitrary threshold, e.g., body fat < 10%)
            if (bodyFatPercentage < 10) {
                const targetBodyFatPercentage = 20; // Target healthy body fat percentage
                const targetBodyFatDecimal = targetBodyFatPercentage / 100;
                const targetWeight = leanBodyMass / (1 - targetBodyFatDecimal);
                setWeightToGain(targetWeight - weight);
            } else {
                setWeightToGain(0); // If not too lean, no weight to gain
            }
        };

        const calculateOneRepMax = () => {
            // Using Wendler's 1RM Formula
            const OneRepMax = weightPlate * (0.9849 + 0.0328 * reps);
            setOneRepMax(OneRepMax);
        };

        const calculateRecommendation = () => {
            let newRecommendation = '';

            if (gender === 'male') {
                if (weight > 90) {
                    newRecommendation = `You should focus on losing weight. Consider reducing your calorie intake and incorporating cardio exercises like ${exercise} into your routine.`;
                } else if (weight < 50) {
                    newRecommendation = `You should focus on gaining weight. Try increasing your calorie intake and incorporating strength training exercises like ${exercise} into your routine.`;
                } else {
                    newRecommendation = `Your weight is within a healthy range. Maintain your current weight by continuing your current exercise and diet regimen.`;
                }
            } else if (gender === 'female') {
                if (weight > 70) {
                    newRecommendation = `You should focus on losing weight. Consider reducing your calorie intake and incorporating cardio exercises like ${exercise} into your routine.`;
                } else if (weight < 40) {
                    newRecommendation = `You should focus on gaining weight. Try increasing your calorie intake and incorporating strength training exercises like ${exercise} into your routine.`;
                } else {
                    newRecommendation = `Your weight is within a healthy range. Maintain your current weight by continuing your current exercise and diet regimen.`;
                }
            }

            setRecommendation(newRecommendation);
        };
        calculateRecommendation();

        calculateBMR();
        calculateTDEE();
        calculateBodyFatPercentage();
        calculateLeanBodyMass();
        calculateWeightToLose();
        calculateWeightToGain();
        calculateOneRepMax();
        calculateRecommendation();
    }, [gender, weight, height, age, activityLevel, leanBodyMass, bodyFatPercentage, weightPlate, reps]);

    return (
        <>
            <div className='d-flex'>
                <div className="container col-4">
                    <form>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select className="form-control" onChange={(e) => setGender(e.target.value)}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Weight (kg):</label>
                            <input
                                type="number"
                                className="form-control"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Height (cm):</label>
                            <input
                                type="number"
                                className="form-control"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Age:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Activity Level:</label>
                            <select className="form-control" onChange={(e) => setActivityLevel(parseFloat(e.target.value))}>
                                <option value="1.2">Ít hoạt động</option>
                                <option value="1.375">Nhẹ nhàng</option>
                                <option value="1.55">Vừa phải</option>
                                <option value="1.725">Năng động</option>
                                <option value="1.9">Rất năng động/ hoạt động nhiều</option>
                            </select>
                        </div>
                    </form>

                    <div className='my-2' style={{ border: '1px solid white', padding: '10px' }}>
                        <h2>Results</h2>
                        <p>BMR: {bmr.toFixed(2)} kCal</p>
                        <p>TDEE: {tdee.toFixed(2)} kCal</p>
                        <p>Lean Body Mass: {leanBodyMass.toFixed(2)} kg</p>
                        {weight < 60 ? (
                            <p>Weight to <strong>Gain</strong>: {weightToGain.toFixed(2)} kg</p>
                        ) : (
                            <p>Weight to <strong>Lose</strong>: {weightToLose.toFixed(2)} kg</p>
                        )}
                        <p>Recommendation: {recommendation}</p>
                    </div>
                </div>

                <div className="container col-4">
                    <div className="form-group">
                        <label>Trọng Lượng Tạ (kg):</label>
                        <input
                            type="number"
                            className="form-control"
                            value={weightPlate}
                            onChange={(e) => setWeightPlate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Repetions (reps):</label>
                        <input
                            type="number"
                            className="form-control"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Exercise:</label>
                        <select className="form-control" onChange={(e) => setExercise(e.target.value)}>
                            <option value="squat">Squat</option>
                            <option value="deadlift">Deadlift</option>
                            <option value="bench press">Bench Press</option>
                            <option value="chin up">Chin Up</option>
                            {/* Add more exercise options here */}
                        </select>
                    </div>
                    <div className='my-2' style={{ border: '1px solid white', padding: '10px' }}>
                        <h2>Results</h2>
                        <p>1RM ({exercise}): {oneRepMax.toFixed(2)} kg</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Fitness;
