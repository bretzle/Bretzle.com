
class ChartBuilder {
    constructor(id) {
        this.options = {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 10
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            series: [

            ],
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            tooltip: {
                enabled: true
            }
        };
        this.element = document.querySelector("#" + id);
    }

    setType(type) {
        this.options.chart.type = type;
        return this;
    }

    addSeries(name, array) {
        this.options.series.push({
            name: name,
            data: array
        });
        return this;
    }

    setStrokeCurve(curve) {
        this.options.stroke.curve = curve;
        return this;
    }

    disableTooltip() {
        this.options.tooltip.enabled = false;
        return this;
    }

    build() {
        this.chart = new ApexCharts(this.element, this.options);
        this.chart.render();
        return this;
    }

    render() {
        this.element.innerHTML = "";
        this.build();
    }
}