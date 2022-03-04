function dynamicColors() {
    const
        r = Math.floor(Math.random() * 255),
        g = Math.floor(Math.random() * 255),
        b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b}, 1)`;
}

function poolColors(a) {
    return [...new Array(a)].map(() => dynamicColors());
}

const FONT_FAMILY = 'Helvetica';
const configPie = {
    type: 'doughnut',
    data: {
        labels: null,
        datasets: null,
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 15, // to avoid overlapping von umliegenden div when hover
        },
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

function get_chart_config(data, label) {
    let config = JSON.parse(JSON.stringify(configPie));
    config.data.labels = Object.keys(data);
    config.options.plugins.title.text = label
    config.data.datasets = [{
        label: label,
        data: Object.values(data),
        backgroundColor: poolColors(Object.keys(data).length),
        hoverOffset: 10
    }];
    return config;
}

window.onload = () => {
    window.dashboard_plot_2 = new Chart($('#dashboard-plot-canvas-2'), get_chart_config({}, 'Smile State'));
    window.dashboard_plot_3 = new Chart($('#dashboard-plot-canvas-3'), get_chart_config({}, 'Gender Distribution'));
    window.dashboard_plot_4 = new Chart($('#dashboard-plot-canvas-4'), get_chart_config({}, 'Pleasure State'));
    window.dashboard_plot_5 = new Chart($('#dashboard-plot-canvas-5'), get_chart_config({}, 'Emotion State'));
}

export default function updatePieChart(topic, data) {
    let charts = {
        'smile_state': window.dashboard_plot_2,
        'gender': window.dashboard_plot_3,
        'pleasure_state': window.dashboard_plot_4,
        'emotion_state': window.dashboard_plot_5,
    }
    const labels = ['Smile State', 'Gender Distribution', 'Pleasure State', 'Emotion State'];

    let cntr = 0;
    $.each(charts, (key, val) => {
        if (topic === key) {
            const label = labels.at(cntr);
            let config = get_chart_config(data, label)
            try {
                val.data.labels = config.data.labels;
                val.data.datasets = config.data.datasets;
                val.update();
                return;
            } catch (e) {
                console.log('nicht mein Problem')
            }
        }
        cntr++;
    });

}