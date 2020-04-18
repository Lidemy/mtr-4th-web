import Chart from 'chart.js';

// options
const options = {
  maintainAspectRatio: false,
  devicePixelRatio: 2,
  radius: 10,
  layout: {
    padding: {
      top: 20,
    }
  },
  legend: {
    align: 'center',
    position: 'top',
    fullWidth: false,
    labels: {
      fontColor: '#666',
      fontSize: 12,
    }
  },
}

// data
const data = {
  labels: ['第三期', '第二期', '第一期'],
  scaleLabel: {
    labelString: '###'
  },
  datasets: [
    {
      label: '時限內求職成功人數',
      backgroundColor: '#D26B6B',
      hoverBackgroundColor: '#C25A5A',
      borderColor: '#FFD9D9',
      data: [14, 8, 2],
      barThickness: 'flex',
      maxBarThickness: 30,

    },
    {
      label: '結業人數',
      backgroundColor: '#FC849A',
      hoverBackgroundColor: '#F28397',
      borderColor: '#E27474',
      data: [39, 29, 3],
      barThickness: 'flex',
      maxBarThickness: 30,
    },
    {
      label: '學生總人數',
      backgroundColor: '#FFD2D2',
      hoverBackgroundColor: '#F6CCCC',
      borderColor: '#E27474',
      data: [56, 38, 12],
      barThickness: 'flex',
      maxBarThickness: 30,
    },
  ]
}

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'horizontalBar', data, options,
});

let isTablet = false;
const updateChartLayout = () => {
  if (window.innerWidth < 480) {
    if (isTablet) return

    chart.options.legend.align = 'start'
    chart.update()
    isTablet = true

  } else if (isTablet) {

    chart.options.legend.align = 'center'
    chart.update()
    isTablet = false
  }
}

// binding events
['resize', 'DOMContentLoaded'].forEach(function (item) {
  window.addEventListener(item, updateChartLayout);
});

