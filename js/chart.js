
class ChartBuilder {
    constructor(id) {
        this.options = {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    type: 'x',
                    enabled: false
                },
                toolbar: {
                    autoSelected: 'zoom'
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 1000,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            series: [

            ],
            markers: {
                size: 0,
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            tooltip: {
                enabled: true
            },
            xaxis: {
                type: 'numeric',
                labels: {
                    min: 1,
                    show: true,
                    formatter: function (val, timestamp, index) {
                        return Math.floor(val);
                    }
                },
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true
                }
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

    enableZoom() {
        this.options.chart.zoom.enabled = true;
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