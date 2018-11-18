//Code taken from https://www.tutorialspoint.com/d3js/d3js_graphs.htm with a few small changes

var svg = d3.select("svg"),
width = svg.attr("width"),
height = svg.attr("height"),
radius = Math.min(width, height) / 2;

var g = svg.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal([
'gray', 'green', 'brown', 'orange', 'yellow', 'red', 'purple'
]);

var pie = d3.pie().value(function(d) { 
return d.percent; 
});

var path = d3.arc()
.outerRadius(radius - 10).innerRadius(0);

var label = d3.arc()
.outerRadius(radius).innerRadius(radius - 80);

d3.csv("./static/dummyData.csv", function(error, data) {
if (error) {
   throw error;
}

var arc = g.selectAll(".arc")
   .data(pie(data))
   .enter()
   .append("g")
   .attr("class", "arc");

arc.append("path")
   .attr("d", path)
   .attr("fill", function(d) { return color(d.data.states); });

console.log(arc)

arc.append("text").attr("transform", function(d) { 
   return "translate(" + label.centroid(d) + ")"; 
})

.text(function(d) { return d.data.states; });
});

svg.append("g")
.attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
.append("text").text("Sample most used programming languages")
.attr("class", "title")
