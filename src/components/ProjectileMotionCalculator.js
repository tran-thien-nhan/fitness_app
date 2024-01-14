import React, { useState, useEffect } from 'react';

function ProjectileMotionCalculator() {
    const [initialVelocity, setInitialVelocity] = useState(0);
    const [launchAngle, setLaunchAngle] = useState(0);
    const [result, setResult] = useState(null);
    const [freeFallResult, setFreeFallResult] = useState(null);
    const [initialHeightProjectileMotion, setInitialHeightProjectileMotion] = useState(0);
    const [initialHeight, setInitialHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [freeweight, setFreeWeight] = useState(0);

    useEffect(() => {
        const calculateProjectileMotion = () => {
            const g = 9.8; // gia tốc rơi tự do

            // Chuyển đổi góc ném từ độ sang radian
            const theta = (launchAngle * Math.PI) / 180;

            // Tính chuyển động theo chiều dọc
            const y0 = parseFloat(initialHeightProjectileMotion); // vị trí ban đầu theo chiều dọc

            // Tính gia tốc do trọng lượng
            const gWithWeight = g * (weight / 1000); // Chuyển trọng lượng từ gram sang kilogram và nhân với gia tốc rơi tự do

            // Tính chuyển động theo chiều dọc
            const v0y = initialVelocity * Math.sin(theta);
            const t = (v0y + Math.sqrt(v0y ** 2 + 2 * gWithWeight * y0)) / gWithWeight;
            const y = y0 + v0y * t - (1 / 2) * gWithWeight * t ** 2;

            // Tính chuyển động theo chiều ngang
            const v0x = initialVelocity * Math.cos(theta);
            const x = v0x * t;

            // Kiểm tra giá trị của biến launchAngle
            if (launchAngle < 0 || launchAngle > 90) {
                throw new Error("Góc ném phải nằm trong khoảng từ 0 đến 90 độ");
            }

            // Đặt kết quả
            setResult({
                time: t.toFixed(2),
                distance: x.toFixed(2),
                verticalPosition: y.toFixed(2),
            });
        };

        const calculateFreeFall = () => {
            const g = 9.8; // gia tốc rơi tự do

            // Tính gia tốc do trọng lượng
            const gWithWeight = g * (freeweight / 1000); // Chuyển trọng lượng từ gram sang kilogram và nhân với gia tốc rơi tự do

            // Tính thời gian rơi tự do
            const freeFallTime = Math.sqrt((2 * initialHeight) / gWithWeight);

            // Tính vị trí theo chiều dọc khi rơi tự do
            const freeFallVerticalPosition = (1 / 2) * gWithWeight * freeFallTime ** 2;

            // Đặt kết quả
            setFreeFallResult({
                freeFallTime: freeFallTime.toFixed(2),
                freeFallVerticalPosition: freeFallVerticalPosition.toFixed(2),
            });
        };


        calculateProjectileMotion();
        calculateFreeFall();
    }, [initialVelocity, launchAngle, initialHeight, initialHeightProjectileMotion, weight, freeweight]);

    return (
        <>
            <div className='container d-flex'>
                <div className="container col-4">
                    <h2>Trình tính chuyển động ném xiên</h2>
                    <div className="form-group">
                        <label>
                            Chiều cao ban đầu (m):
                            <input
                                type="number"
                                className="form-control"
                                value={initialHeightProjectileMotion}
                                onChange={(e) => setInitialHeightProjectileMotion(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Vận tốc ban đầu (m/s):
                            <input
                                type="number"
                                className="form-control"
                                value={initialVelocity}
                                onChange={(e) => setInitialVelocity(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="form-group my-2">
                        <label>
                            Góc ném (độ):
                            <input
                                type="number"
                                className="form-control"
                                value={launchAngle}
                                onChange={(e) => setLaunchAngle(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="form-group my-2">
                        <label>
                            khối lượng vật (kg):
                            <input
                                type="number"
                                className="form-control"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </label>
                    </div>
                    {result && (
                        <div className="my-4" style={{ border: '1px solid white', padding: '10px', width: 'fit-content', margin: '0 auto' }}>
                            <h3>Kết quả:</h3>
                            <p>Thời gian bay: {result.time} giây</p>
                            <p>Quãng đường ngang: {result.distance} mét</p>
                        </div>
                    )}
                </div>
                <div className="container col-4">
                    <h2>Trình tính chuyển động rơi tự do</h2>
                    <div className="container">
                        <div className="form-group my-2">
                            <label>
                                Chiều cao ban đầu (m):
                                <input
                                    type="number"
                                    className="form-control"
                                    value={initialHeight}
                                    onChange={(e) => setInitialHeight(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="form-group my-2">
                            <label>
                                khối lượng vật (kg):
                                <input
                                    type="number"
                                    className="form-control"
                                    value={freeweight}
                                    onChange={(e) => setFreeWeight(e.target.value)}
                                />
                            </label>
                        </div>
                        {freeFallResult && (
                            <div className="my-4" style={{ border: '1px solid white', padding: '10px', width: 'fit-content', margin: '0 auto' }}>
                                <h3>Kết quả rơi tự do:</h3>
                                <p>Thời gian rơi tự do: {freeFallResult.freeFallTime} giây</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectileMotionCalculator;
