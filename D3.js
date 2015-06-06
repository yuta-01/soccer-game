

// file読み込み制御用
var readDatafileDone = false;
var readPassfileDone = false;
// filedata格納変数
var datadata;
var passdata; 

function readDatafile(json) {
    datadata = json;
    readDatafileDone = true;
}
function readPassfile(json) {
    passdata = json;
    readPassfileDone = true;
}

d3.json("data.json", function(error, json) {
    if(error) return console.warn(error);
        readDatafile(json);
        if (readDatafileDone && readPassfileDone) {
            main(datadata, passdata);
        }
    });

d3.json("pass.json", function(error, json) {
    if(error) return console.warn(error);
        readPassfile(json);
        if (readDatafileDone && readPassfileDone) {
            main(datadata, passdata);
        }
    });


var w = window.innerWidth;
var h = window.innerHeight;

    var scaleh = d3.scale.linear();
    var scalev = d3.scale.linear();


function main(d,p){

//svg要素を生成
d3.xml("field.svg", function(xml) {
    svgdom = document.body.appendChild(xml.documentElement);

    var svg = d3.select("svg");
    var defs = d3.select("defs");
    
    scaleh.domain([0, w]);
    scaleh.range([0, 900]);
    scalev.domain([0, h]);
    scalev.range([0, 600]);
 

var grp = svg.selectAll(".node")
        .data(d)
        .enter().append("g")
        .attr("class", "node")
        .style("pointer-events", "all")

 //グラフの生成
    grp.append("circle")
    .transition()
    .attr("cx", function(d){ return d.cx })
    .attr("cy", function(d){ return d.cy })
    .each("start",function(){
        d3.select(this)
        .attr({
            fill:"#FF6736",
            r: 30
        });
    })
    .duration(1000)
    .attr({
        r: 40
    })
    .each("end",function(){
        d3.select(this)
            .transition()
            .duration(1000)
            .attr({
                r: 30
            });
    });

//テキストの生成   
    grp.append("text")
    .text(function(d){ return d.number })
    .attr("x", function(d){ return d.cx })
    .attr("y", function(d){ return d.cy })
    .attr({
      'text-anchor': "middle",
      'dy': ".25em",
      'fill': "#ddd",
      "font-size": "40px"
    });


});
};