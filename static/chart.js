function dynamicColors() {
    const
        r = Math.floor(Math.random() * 255),
        g = Math.floor(Math.random() * 255),
        b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b}, 1)`;
}

function poolColors(a) {
    const pool = [...new Array(a)].map(() => dynamicColors());
    return pool;
}

function avg(grades) {
    const total = grades.reduce((acc, c) => acc + c, 0);
    return total / grades.length;

}
const FONT_FAMILY = 'Helvetica';
const configPie = {
    type: 'doughnut',
    data: {
        labels: null,
        datasets: null,
    },
    options: {
        responsive: false,
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: true,
                text: null,
                font: {
                    Family: FONT_FAMILY,
                    size: 18,
                },
            },
            legend: {
                position: 'top',
                display: true,
            },
            tooltip: {
                usePointStyle: true,
                callbacks: {
                    labelPointStyle: (context) => {
                        return {
                            pointStyle: 'rectRot',
                            rotation: 0,
                        };
                    },
                },
            },
        },
    },
};

export default function updatePieChart(topic, data) {
    if (topic === 'smile_state') {
        let configSmilePie = JSON.parse(JSON.stringify(configPie));
        configSmilePie.data.labels = Object.keys(data);
        configSmilePie.data.datasets = [{
            label: 'Smile State',
            data: Object.values(data),
            backgroundColor: poolColors(Object.keys(data).length),
            hoverOffset: 4
        }];
        configSmilePie.options.plugins.title.text = 'Smile State';
        const ctxEmotion = $('#dashboard-plot-canvas-2');
        try {
            window.dashboard_plot_2.data.labels = configSmilePie.data.labels;
            window.dashboard_plot_2.data.datasets = configSmilePie.data.datasets;
            window.dashboard_plot_2.update();
        } catch (e) {
            window.dashboard_plot_2 = new Chart(ctxEmotion, configSmilePie);
        }
    } else if (topic === 'gender') {
        let configGenderPie = JSON.parse(JSON.stringify(configPie));
        configGenderPie.data.labels = Object.keys(data);
        configGenderPie.data.datasets = [{
            label: 'Gender Distribution',
            data: Object.values(data),
            backgroundColor: poolColors(Object.keys(data).length),
            hoverOffset: 4
        }];
        configGenderPie.options.plugins.title.text = 'Gender Distribution';
        const ctxGender = $('#dashboard-plot-canvas-3');
        try {
            window.dashboard_plot_3.data.labels = configGenderPie.data.labels;
            window.dashboard_plot_3.data.datasets = configGenderPie.data.datasets;
            window.dashboard_plot_3.update();
        } catch (e) {
            window.dashboard_plot_3 = new Chart(ctxGender, configGenderPie);
        }
    } else if (topic === 'pleasure_state') {
        let configPleasurePie = JSON.parse(JSON.stringify(configPie));
        configPleasurePie.data.labels = Object.keys(data);
        configPleasurePie.data.datasets = [{
            label: 'Pleasure State',
            data: Object.values(data),
            backgroundColor: poolColors(Object.keys(data).length),
            hoverOffset: 4
        }];
        configPleasurePie.options.plugins.title.text = 'Pleasure State';
        const ctxPleasure = $('#dashboard-plot-canvas-4');
        try {
            window.dashboard_plot_4.data.labels = configPleasurePie.data.labels;
            window.dashboard_plot_4.data.datasets = configPleasurePie.data.datasets;
            window.dashboard_plot_4.update();
        } catch (e) {
            window.dashboard_plot_4 = new Chart(ctxPleasure, configPleasurePie);
        }
    } else if (topic === 'emotion_state') {
        let configEmotionPie = JSON.parse(JSON.stringify(configPie));
        configEmotionPie.data.labels = Object.keys(data);
        configEmotionPie.data.datasets = [{
            label: 'Basic Emotion',
            data: Object.values(data),
            backgroundColor: poolColors(Object.keys(data).length),
            hoverOffset: 4
        }];
        configEmotionPie.options.plugins.title.text = 'Basic Emotion';
        const ctxEmotion = $('#dashboard-plot-canvas-5');
        try {
            window.dashboard_plot_5.data.labels = configEmotionPie.data.labels;
            window.dashboard_plot_5.data.datasets = configEmotionPie.data.datasets;
            window.dashboard_plot_5.update();
        } catch (e) {
            window.dashboard_plot_5 = new Chart(ctxEmotion, configEmotionPie);
        }
    }
}