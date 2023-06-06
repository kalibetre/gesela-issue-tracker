import React, { useEffect, useRef } from 'react';

export const CHART_COLORS = {
    PENDING: '#ce8e88',
    'IN-PROGRESS': '#caeff4',
    CLOSED: '#93c2cc',
};

const PieChart = ({ data }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const total = Object.values(data).reduce((acc, val) => acc + val, 0);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 2 - 10;
        let startAngle = 0;

        for (const key in data) {
            const value = data[key];
            const sliceAngle = (2 * Math.PI * value) / total;

            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(
                centerX,
                centerY,
                radius,
                startAngle,
                startAngle + sliceAngle
            );
            context.closePath();
            context.fillStyle = CHART_COLORS[key];
            context.fill();

            startAngle += sliceAngle;
        }
    }, [data]);

    return <canvas ref={canvasRef} width={150} height={150} />;
};

export default PieChart;
