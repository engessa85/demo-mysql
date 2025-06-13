"""
Python module providing functions that return JSON strings with embedded JavaScript Chart.js configuration templates.
Each function returns a JSON object with a `schema` field containing the raw JavaScript chart configuration as a string.
"""

def get_line_chart_schema() -> str:
    """Return a JSON string embedding the JS line chart schema inside the `schema` field."""
    return '''```json
{
  "schemas": [{
  type: "line" as const,
  data: {
    labels: ["<Label1>", "<Label2>", "<Label3>", "<Label4>"],
    datasets: [
      {
        label: "<Dataset Label>",
        data: [<Value1>, <Value2>, <Value3>, <Value4>],
        backgroundColor: "<RGBA Background Color>",
        borderColor: "<RGBA Border Color>",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "<Chart Title>" },
    },
  },
}
}, ...
]
}
```
'''


def get_pie_chart_schema() -> str:
    """Return a JSON string embedding the JS pie chart schema inside the `schema` field."""
    return '''```json
{
  "schemas": [{
  type: "pie" as const,
  data: {
    labels: ["<Category1>", "<Category2>", "<Category3>", "<Category4>"],
    datasets: [
      {
        label: "<Dataset Label>",
        data: [<Value1>, <Value2>, <Value3>, <Value4>],
        backgroundColor: [
          "<RGBA Color 1>",
          "<RGBA Color 2>",
          "<RGBA Color 3>",
          "<RGBA Color 4>"
        ],
        borderColor: [
          "<RGBA Border 1>",
          "<RGBA Border 2>",
          "<RGBA Border 3>",
          "<RGBA Border 4>"
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "<Chart Title>" },
      legend: { position: "<Legend Position>" },
    },
  },
}
}, ...
]
}
```
'''


def get_bar_chart_schema() -> str:
    """Return a JSON string embedding the JS bar chart schema inside the `schema` field."""
    return '''```json
{
  "schemas": [{
  type: "bar" as const,
  data: {
    labels: ["<Month1>", "<Month2>", "<Month3>", "<Month4>", "<Month5>", "<Month6>"],
    datasets: [
      {
        label: "<Dataset Label>",
        data: [<Value1>, <Value2>, <Value3>, <Value4>, <Value5>, <Value6>],
        backgroundColor: "<RGBA Background Color>",
        borderColor: "<RGBA Border Color>",
        borderWidth: 1,
      },
    ],
  }, ...
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: "<Chart Title>" },
      legend: { display: true, position: "<Legend Position>" },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "<Y Axis Title>" },
      },
      x: {
        title: { display: true, text: "<X Axis Title>" },
      },
    },
  },
}
}, ...
]
}
```
'''


def get_scatter_chart_schema() -> str:
    """Return a JSON string embedding the JS scatter chart schema inside the `schema` field."""
    return '''```json
{
  "schemas": [{
  type: "scatter" as const,
  data: {
    datasets: [
      {
        label: "<Dataset Label>",
        data: [
          { x: <X1>, y: <Y1> },
          { x: <X2>, y: <Y2> },
          ...
        ],
        backgroundColor: "<RGBA Color>",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: "<Chart Title>" },
      legend: { position: "<Legend Position>" },
    },
    scales: {
      x: {
        title: { display: true, text: "<X Axis Title>" },
        min: <X Min>,
        max: <X Max>,
      },
      y: {
        title: { display: true, text: "<Y Axis Title>" },
        min: <Y Min>,
        max: <Y Max>,
      },
    },
  },
}
}, ...
]
}
```
'''


